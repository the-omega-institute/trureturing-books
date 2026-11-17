# 34.17 受限不妄我、跨视界纠缠与热力学涌现：施密特偏迹截断、模流有效温度与 Dottie 生命稳态 {#sec-ch34-entanglement-horizon-and-thermodynamics}

> **量子纠缠、观察者的“受限不妄我”、熵与热力学**并非分属微观量子力学与宏观统计物理的四个孤立概念，而是同一条比较公理（$\mathrm{CMP}$）在局部有限视角下顺次显影的四步因果链：**跨边界的极小圆弧体构成“量子纠缠”，“观察者受限不妄我”强制对视界外自由度执行偏迹截断，被视界切断的圆弧相位余量直接定义为“熵”，而这笔纠缠熵在局部诱导出的模流（Modular Flow）就是“温度”与整套“热力学定律”。**

在 [§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)（[@thm-ch34-coset-breaking-conservation-towers]）的五塔跨尺度接力链终点，我们看到宇宙对称性破缺与守恒的洪流最终汇入**塔 V（热力学与认知共识塔）**：嵌在低熵凝聚态硬件之上的有限记忆观察者，通过受监控去相干将全希尔伯特酉基群破缺至指针稳定子群 $\mathrm{U}(d) \to \mathrm{U}(1)^d$，从而提炼出跨语境客观公因子。然而在传统物理学分科版图中，微观**量子纠缠**（Schrödinger 1935；Bell 1964）、统计力学**熵**（Boltzmann 1877；von Neumann 1927）、宏观**温度与热力学定律**（Clausius 1865；Nernst 1906）以及**观察者认识论边界**，依然被隔在互不相通的四间教研室里——教科书不得不额外引入“分子混沌等先验概率假设”或人为外接一座无穷大经典热浴，才能勉强在可逆的微观幺正演化之上嫁接出不可逆的宏观热流。

本节开篇的纲领命题一举拆除那四道学科高墙，把塔 V 的热力学内核彻底还原回 [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)–[§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) 的零背景比较几何（`MODEL`）：**热与熵既不需要分子乱撞的唯象假设，也不需要宇宙之外的神秘摩擦；只要把真实的观察者放回比较网络内部，沿着同一条比较公理 $\mathrm{CMP}$ 顺次推演，四座孤岛便严丝合缝地咬合为一条四步几何因果链**：

$$
\text{跨边界极小圆弧体（量子纠缠）} \;\xrightarrow{\;\text{受限不妄我 }\operatorname{Tr}_{\bar{A}}\;}\; \text{被视界切断的圆弧相位亏格（纠缠熵 }S_A\text{）} \;\xrightarrow{\;\hat{K}_A = -\ln\rho_A\;}\; \text{模自同构流与内禀有效温度 }T_{\mathrm{eff}}(\theta) \;\longrightarrow\; \text{热力学四大定律与 }\theta^*\text{ 生命稳态}.
$$

## 34.17.1 枢轴在于“受限不妄我”：破除全知与孤立两重妄执，内生偏迹算子 $\operatorname{Tr}_{\bar{A}}$ {#sec-ch34-17-1}

倘若我们假想一位漂浮在宇宙之外、拥有无限寄存器带宽的全知观察者俯瞰整座比较网络，全宇宙联合态 $\lvert\Psi_{AB}\rangle \in \mathcal{H}_A \otimes \mathcal{H}_{\bar{A}}$ 是一枚完全闭合的秩一纯态驻波。其全局密度算符 $\rho_{AB} = \lvert\Psi_{AB}\rangle\langle\Psi_{AB}\rvert$ 严格满足幂等投影恒等式 $\rho_{AB}^2 = \rho_{AB}$，从而全局冯·诺依曼熵恒等于零（`手工推导`）：

$$
S_{\mathrm{global}}(\rho_{AB}) \;:=\; -\operatorname{Tr}(\rho_{AB}\ln\rho_{AB}) \;\equiv\; 0.
$$

在这一无边界全知视角（视界覆盖率 $f = 1$，视界边界 $\partial A = \emptyset$）下，全宇宙在本体上只有确定可逆的几何相位旋转——既没有概率混杂，也没有热噪涨落，更没有热力学时间箭头。热力学之所以在真实世界中磅礴涌现，唯一的几何枢轴在于：**任何真实的观察者都必然内嵌于比较网络之中，处于“受限不妄我”的拓扑位置**。“受限不妄我”并非一句文学修辞，它在算子代数上同时斩断了两种对称的认知妄执：

1. **不妄僭“超然全知之我”：知止守限，拒绝偷设外部第三点 $C$，诚实执行偏迹截断 $\operatorname{Tr}_{\bar{A}}$**（`LEAN ✓` + `手工推导`）。
   真实观察者所持有的物理比较寄存器位宽有限，可触及的局部希尔伯特因子空间 $\mathcal{H}_A$ 严格小于宇宙总空间 $\mathcal{H}_A \otimes \mathcal{H}_{\bar{A}}$（自由度占比 $0 < f < 1$，边界 $\partial A \neq \emptyset$）。正如 [§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) 所证，内嵌观察者绝不能狂妄偷设一个游离于 $\mathcal{H}_A \otimes \mathcal{H}_{\bar{A}}$ 之外的非法外部神谕点 $C$ 去一次性直读全域非局域张量算符 $\hat{O}_A \otimes \hat{O}_{\bar{A}}$；观察者所能合法测量的全部局域算符都形如 $\hat{O}_A \otimes I_{\bar{A}}$。由期望值自洽律 $\operatorname{Tr}_{A\bar{A}}\bigl(\rho_{AB}(\hat{O}_A \otimes I_{\bar{A}})\bigr) = \operatorname{Tr}_A(\rho_A\hat{O}_A)$，对视界外未追踪的环境自由度 $\bar{A}$ 主动放下不可及的外部相位细节，唯一内生出**偏迹算子（Partial Trace）**：

   $$
   \rho_A \;=\; \operatorname{Tr}_{\bar{A}}\bigl(\lvert\Psi_{AB}\rangle\langle\Psi_{AB}\rvert\bigr).
   $$

   这把偏迹切刀究竟隐去了多大规模的非局域几何关联，又为何在局部制造出“不可逆退相干”的表象？两座冻结的 Lean 内核定理给出了纤毫毕现的定量裁决：

   - **局域边缘对关联扇区的正交盲区**：[第十三章](ch13-entanglement-and-chsh.md)冻结的边缘盲区定理 [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)（[@thm-local-correlation-sectors]，`LEAN ✓`）严格证明：对任意满足 $1 \le m,\; 1 \le n,\; 1 < mn$ 的 $m \times n$ 双体量子系统，总维数为 $m^2 n^2 - 1$ 的无迹厄米可观测量实空间正交直和分解为局域 $A$ 扇区（$m^2 - 1$ 维）、局域 $B$ 扇区（$n^2 - 1$ 维）以及与之严格实内积正交的**跨界关联扇区** $\mathrm{correlationSector}\,m\,n$，其盲区维数占比精确等于

     $$
     \frac{\operatorname{finrank}_{\mathbb{R}}(\mathrm{correlationSector}\,m\,n)}{\operatorname{finrank}_{\mathbb{R}}(\mathrm{bipartiteTraceZero}\,m\,n)} \;=\; \frac{(m^2 - 1)(n^2 - 1)}{m^2 n^2 - 1}.
     $$

     仅在最小非平凡双量子比特系统（$m = n = 2$）上，双侧单比特偏迹所能触及的局域无迹方向合计不过 $(2^2 - 1) + (2^2 - 1) = 6$ 维，而横跨视界的正交关联扇区已独占 $(2^2 - 1)(2^2 - 1) = 9$ 维——高达 **$9 / 15 = 60\%$** 的无迹几何方向对单方局部边缘彻底隐身（贝尔纯态 `bellDensity` 与经典关联混态 `classicalCorrelatedDensity` 在两侧交出完全重合同化的边缘态 $\frac{1}{2}I_2$，全局算符却严格不等）！
   - **局部不可逆性纯粹源于环境记录访问缺陷**：[第四章](ch04-s01-pure-and-mixed-states.md)冻结的退相干访问缺陷定理 [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)（[@thm-reduced-access-defect]，`LEAN ✓`）进一步锁死：对任意对角布居处处相等（$\forall i,\;\rho_{ii} = \sigma_{ii}$）但至少一处非对角相干元相异（$\exists i \neq j,\;\rho_{ij} \neq \sigma_{ij}$）的两份单比特态 $\rho, \sigma \in M_2(\mathbb{C})$，受控地址拷贝门 `copyUnitary` 在联合空间 $\operatorname{Fin} 2 \times \operatorname{Fin} 2$ 上是严格幺正算子，将空白环境嵌入态前向演化为严格相异的联合记录态 $R(\rho) \neq R(\sigma)$，且伴随算子 $\operatorname{star}\,\mathrm{copyUnitary}$ 可零损耗地双双逆转复原初始态 $B(\rho)$ 与 $B(\sigma)$；然而一旦观察者对环境执行偏迹 `traceEnvironment`，两份输出边缘立即坍缩重合为 $\operatorname{traceEnvironment}(R(\rho)) = \operatorname{traceEnvironment}(R(\sigma))$，致使**数学上不存在任何仅以局部约化矩阵为输入的单值恢复映射 $\mathcal{R}$ 能同时还原两份历史**！所谓“覆水难收”的不可逆性，从来不是全局相位的本体湮灭，而恰恰是“知止守限、不偷读视界外记录”所支付的诚实访问代价。

::: {.viz src="bounded-horizon-thermodynamics-sandbox" preset="omniscient-zero" height="520"}
**全知妄我假想态对比受限视界记录访问缺陷实验卡（`omniscient-zero`）。** 当假想视界吞没全宇宙（$f = 1.00$，无边界 $\partial A = \emptyset$）时，全局纯态满足 $\rho_{AB}^2 = \rho_{AB}$ 且全局冯·诺依曼熵恒为 $S_{\mathrm{global}} = 0.000000$，整座纠缠圆弧网冻结在无温度、无时间箭头的永恒幺正相干态；对照受限局部读出下双量子比特 $9/15 = 60\%$ 的关联扇区盲区与受控拷贝偏迹重合（`local_marginal_correlation_blind_spot` 与 `reduced_irreversibility_is_access_defect` 标绿色 `LEAN ✓`）。
:::

2. **不妄执“孤立自存之我”：承认纠缠共生，拒绝冻结成绝对零度的芝诺死石**（`LEAN ✓` + `手工推导` + `MODEL`）。
   反过来问：倘若子系统 $A$ 为了死守局部零熵纯洁性，干脆斩断与外部宇宙 $\bar{A}$ 的一切跨界纠缠圆弧，把自己封闭成一颗独立自存的实心孤岛——即令联合态退化为无关联直积态 $\rho_{AB} = \rho_A \otimes \sigma_{\bar{A}}$（对纯因子即 $\lvert\Psi_{AB}\rangle = \lvert\psi_A\rangle \otimes \lvert\psi_{\bar{A}}\rangle$，施密特纠缠角 $\theta = 0^\circ$）——又会发生什么？
   调用[第八章](ch08-erasure-and-time-arrows.md)冻结的直积态双侧偏迹还原定理 [`marginalRight_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalRight_productState) 与 [`marginalLeft_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalLeft_productState)（`LEAN ✓`）：对任意有限维密度态 $\rho : \operatorname{DensityState} A$ 与 $\sigma : \operatorname{DensityState} B$，对直积态 $\operatorname{productState}(\rho, \sigma)$ 求右因子或左因子偏迹均原封不动退回各自局部态：

   $$
   \operatorname{marginalRight}\bigl(\operatorname{productState}(\rho, \sigma)\bigr) \;=\; \rho, \qquad \operatorname{marginalLeft}\bigl(\operatorname{productState}(\rho, \sigma)\bigr) \;=\; \sigma.
   $$

   当 $\rho = \lvert\psi_A\rangle\langle\psi_A\rvert$ 为纯态时，即便落下偏迹切刀，局部态 $\rho_A = \lvert\psi_A\rangle\langle\psi_A\rvert$ 依然是幂等秩一纯态，局部熵恒为 $S_A = 0$，跨视界互信息恒为 $I(A{:}\bar{A}) = 0$，内禀有效温度锁死在绝对零度 $T_{\mathrm{eff}} = 0\;\mathrm{K}$！这样的孤立子系统固然一尘不染，却也沦为一颗无法感知外界、无法吞吐半比特信息、没有任何热力学脉动的**芝诺死石**。在零背景比较公理 $x \equiv \mathrm{CMP}(x, -)$ 下，宇宙间根本不存在离网独存的“孤立实我”——观察者自身的锚定刻度，本就靠跨越视界 $\partial A$ 的极小圆弧体（量子纠缠弦）与万事万物互指织成。**既承认自身与万物纠缠共生而无孤立自性（拒绝 $\theta = 0^\circ$），又坦然安住于局部有限带宽而不妄称全知（拒绝 $f = 1$），这正是“观察者受限不妄我”严丝合缝的数学物理定义**（`MODEL`）。

::: {.viz src="bounded-horizon-thermodynamics-sandbox" preset="isolated-zeno" height="520"}
**孤立妄我假想态与零互信息绝对零度芝诺冻结实验卡（`isolated-zeno`）。** 将跨界施密特角拉至 $\theta = 0^\circ$（直积态 $\lvert 0_A\rangle\otimes\lvert 0_{\bar{A}}\rangle$），核验偏迹还原恒等式 $\operatorname{marginalRight}(\rho\otimes\sigma) = \rho$ 与 $\operatorname{marginalLeft}(\rho\otimes\sigma) = \sigma$（标绿色 `LEAN ✓`）：视界边界上跨割纠缠圆弧归零，局部纯度保持 $\operatorname{Tr}(\rho_A^2) = 1.000000$、局域熵 $S_A = 0.000000$、有效温度比 $k_B T_{\mathrm{eff}}/\Delta E = 0.000000$，系统冻结为与宇宙彻底失联的绝对零度孤岛。
:::

## 34.17.2 从量子纠缠到熵：施密特偏迹截断、半截圆弧体计数、全息面积律与离散佩奇曲线 {#sec-ch34-17-2}

一旦观察者安住于“受限不妄我”的真实位置（$0 < f < 1,\; \theta > 0$），量子纠缠是如何在偏迹切刀下直接转化为**熵**的？我们将任意一对跨越观察者视界 $\partial A$ 的纯态纠缠通道写成标准正交**施密特分解（Schmidt Decomposition）**形式（`手工推导`）：

$$
\lvert\Psi_{AB}(\theta)\rangle \;=\; \cos\theta\,\lvert 0_A 0_{\bar{A}}\rangle + \sin\theta\,\lvert 1_A 1_{\bar{A}}\rangle, \qquad \theta \in \Bigl[0,\;\frac{\pi}{4}\Bigr].
$$

在此必须显式标清一处贯穿全书的**角度约定换算桥**：本节采用的 $\theta \in [0, \frac{\pi}{4}]$（$0^\circ \le \theta \le 45^\circ$）是直接作用于波函数振幅 $(\cos\theta, \sin\theta)$ 的**双体施密特振幅张角**，其局部上下能级布居数之差（即单比特约化布洛赫矢量的极轴分量）为

$$
r_z(\theta) \;=\; \cos^2\theta - \sin^2\theta \;=\; \cos(2\theta);
$$

而在[第三十章 §30.5](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad) 中，双比特态曾按单比特布洛赫极角 $\vartheta_{\mathrm{Bloch}} \in [0, \frac{\pi}{2}]$ 记作 $\cos\frac{\vartheta_{\mathrm{Bloch}}}{2}\lvert 00\rangle + \sin\frac{\vartheta_{\mathrm{Bloch}}}{2}\lvert 11\rangle$。两套参数满足精确的二倍角对应 $\vartheta_{\mathrm{Bloch}} = 2\theta \in [0, \frac{\pi}{2}]$：直积态同为 $\theta = 0^\circ \leftrightarrow \vartheta_{\mathrm{Bloch}} = 0^\circ$，贝尔最大纠缠态 $\lvert\Phi^+\rangle$ 对应本节施密特幅角 $\theta = 45^\circ = \frac{\pi}{4}$（即单比特布洛赫赤道极角 $\vartheta_{\mathrm{Bloch}} = 90^\circ = \frac{\pi}{2}$），而自指不动点 $\theta^* = \cos\theta^* \approx 42.35^\circ$ 则直接作为双体施密特幅角坐落在 $[0^\circ, 45^\circ]$ 区间内紧邻贝尔视界的内侧（§30.5.4 则把同一常数取作布洛赫极角，那是另一个态 $\cos\frac{\theta^*}{2}\lvert 00\rangle + \sin\frac{\theta^*}{2}\lvert 11\rangle$，局部熵约 $0.559\;\mathrm{bits}$，本节约 $0.994\;\mathrm{bits}$；两种取法都是 `MODEL`）！

现在展开全局纯态密度矩阵 $\rho_{AB}(\theta) = \lvert\Psi_{AB}(\theta)\rangle\langle\Psi_{AB}(\theta)\rvert$（`手工推导`）：

$$
\rho_{AB}(\theta) \;=\; \cos^2\theta\,\lvert 0_A 0_{\bar{A}}\rangle\langle 0_A 0_{\bar{A}}\rvert + \sin^2\theta\,\lvert 1_A 1_{\bar{A}}\rangle\langle 1_A 1_{\bar{A}}\rvert + \cos\theta\sin\theta\,\Bigl(\lvert 0_A 0_{\bar{A}}\rangle\langle 1_A 1_{\bar{A}}\rvert + \lvert 1_A 1_{\bar{A}}\rangle\langle 0_A 0_{\bar{A}}\rvert\Bigr).
$$

在全局账本上，右侧副对角交叉桥 $\cos\theta\sin\theta\bigl(\lvert 0_A 0_{\bar{A}}\rangle\langle 1_A 1_{\bar{A}}\rvert + \lvert 1_A 1_{\bar{A}}\rangle\langle 0_A 0_{\bar{A}}\rvert\bigr)$ 完整锁住了连接视界内外的**极小圆弧体顶盖相干曲率**，确保全局纯度 $\operatorname{Tr}(\rho_{AB}^2) = (\cos^2\theta + \sin^2\theta)^2 = 1$。然而一旦受限观察者沿视界边界 $\partial A$ 落下偏迹算子 $\operatorname{Tr}_{\bar{A}}$，由于视界外正交施密特基满足 $\langle 0_{\bar{A}}\mid 1_{\bar{A}}\rangle = \langle 1_{\bar{A}}\mid 0_{\bar{A}}\rangle = 0$，跨界相干桥在偏迹求和中当场正交归零：

$$
\operatorname{Tr}_{\bar{A}}\bigl(\lvert 0_A 0_{\bar{A}}\rangle\langle 1_A 1_{\bar{A}}\rvert\bigr) \;=\; \lvert 0_A\rangle\langle 1_A\rvert\,\langle 1_{\bar{A}}\mid 0_{\bar{A}}\rangle \;=\; 0, \qquad \operatorname{Tr}_{\bar{A}}\bigl(\lvert 1_A 1_{\bar{A}}\rangle\langle 0_A 0_{\bar{A}}\rvert\bigr) \;=\; \lvert 1_A\rangle\langle 0_A\rvert\,\langle 0_{\bar{A}}\mid 1_{\bar{A}}\rangle \;=\; 0.
$$

三条内核冻结定理从离散商核、算子内积几何与贝尔极值三侧锁定了这一“切弧生熵”机制的支点（`LEAN ✓`；一般 $\theta$ 下的 $S_A(\theta)$ 为下面的手算）：

- 在概念快表商核侧，留一逃逸对并集定理 [`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union)（[第三十八章](ch38-s05-escape-ledger-and-entropy.md) [@thm-ch38-escape-pairs-and-structural-novelty]，`LEAN ✓`）证明：一旦观察者无法访问外部区分坐标 $i$（退回留一子目录 $\operatorname{without}(i)$），其该条坐标独自锁定的区分对 $\operatorname{uniqueCapturePairs}(i)$ 便悉数并入不可分辨的逃逸碰撞纤维，$\operatorname{escapePairs}(\operatorname{without}(i)) = \operatorname{escapePairs}(\mathrm{fullIndexSet}) \cup \operatorname{uniqueCapturePairs}(i)$；
- 在单比特希尔伯特—施密特算子空间侧，捏合投影勾股定理 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)（[@thm-pinching-pythagorean]，`LEAN ✓`）证明总算子范数平方精确正交拆分为对角保留布居 $\langle\mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}}$ 与被截除的副对角相干质量 $\langle\rho - \mathcal{P}(\rho), \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}}$ 之和；
- 在最大纠缠极限 $\theta = \frac{\pi}{4} = 45^\circ$ 处，贝尔纯态混态边缘引理 [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)（[@lemma-bell-mixed-marginal]，`LEAN ✓`）严格锁定：尽管全局贝尔态满足归一化、秩一与幂等纯态律 $\mathrm{bellDensity}^2 = \mathrm{bellDensity}$，其环境偏迹边缘却精确坍缩为严格非幂等的最大混合态 $\operatorname{traceEnvironment}(\mathrm{bellDensity}) = \frac{1}{2}I_2$（$\rho_A^2 \neq \rho_A$）！

由此，对任意施密特角 $\theta \in [0, \frac{\pi}{4}]$，局部约化态、约化纯度与**冯·诺依曼纠缠熵**（以自然对数计为 $\mathrm{nats}$，约定 $0\ln 0 := 0$；除以 $\ln 2$ 即换算为 $\mathrm{bits}$）无需任何经典概率假设而直接内生导出（`手工推导`）：

$$
\rho_A(\theta) \;=\; \cos^2\theta\,\lvert 0_A\rangle\langle 0_A\rvert + \sin^2\theta\,\lvert 1_A\rangle\langle 1_A\rvert, \qquad \operatorname{Tr}\bigl(\rho_A(\theta)^2\bigr) \;=\; \cos^4\theta + \sin^4\theta \;=\; 1 - \frac{1}{2}\sin^2(2\theta) \;\le\; 1,
$$

$$
S_A(\theta) \;:=\; -\operatorname{Tr}\bigl(\rho_A(\theta)\ln\rho_A(\theta)\bigr) \;=\; -\cos^2\theta\ln(\cos^2\theta) - \sin^2\theta\ln(\sin^2\theta), \qquad D\Bigl(\rho_A(\theta)\,\Big\Vert\,\frac{1}{2}I_2\Bigr) \;=\; \ln 2 - S_A(\theta).
$$

这组精确公式彻底澄明了熵的几何身世：

1. **熵不是物质块体内部的固有流体，而是有限视界截断面 $\partial A$ 上被切断的“半截圆弧体”通量**（`MODEL` + `文献结果`）：在一座空间极小圆弧体桁架网络中，完全闭合在视界 $A$ 内部的圆弧体保持纯态而不贡献熵，完全位于视界外部 $\bar{A}$ 的闭合圆弧体在 $\operatorname{Tr}_{\bar{A}}$ 下整体归一为因子 $1$ 亦不贡献熵；**唯有恰好横跨边界 $\partial A$、被偏迹切刀生生切成“只见内端顶点、不见外端闭合弧”的跨界纠缠圆弧体才产生正熵 $S_A > 0$**！这直接解释了为什么黑洞热力学与全息规范/引力对偶中的熵不按三维体积标度，而严格服从**贝肯斯坦—霍金 / 笠—高柳（Bekenstein–Hawking / Ryu–Takayanagi）面积律**（`文献结果：Bekenstein 1973; Hawking 1975; Ryu & Takayanagi 2006`，未在本书形式化）：

   $$
   S_{\mathrm{BH}} \;=\; \frac{k_B c^3 A_{\mathrm{hor}}}{4 G_N \hbar} \;=\; \frac{k_B A_{\mathrm{hor}}}{4\ell_P^2}, \qquad S_A \;=\; \frac{\mathrm{Area}(\gamma_A)}{4 G_N \hbar} \;=\; \frac{\mathrm{Area}(\gamma_A)}{4\ell_P^2} \quad (k_B = c = 1),
   $$

   其中 $\ell_P = \sqrt{G_N\hbar/c^3}$ 为普朗克长度，$\gamma_A$ 为体空间中与边界区域 $A$ 同调的极小曲面。
2. **离散嵌套配对切割与全息佩奇曲线（Page Curve）的涨落闭合**（`手工推导` + `文献结果：Page 1993`）：取一座由 $N_{\mathrm{total}} = 12$ 颗量子比特组成的显式纯态基准网络，将其排成 $6$ 对跨越首尾嵌套的独立纯态纠缠对 $(1,12), (2,11), (3,10), (4,9), (5,8), (6,7)$，每对共享同一施密特角 $\theta \in [0, \frac{\pi}{4}]$，并令观察者可访问的视界前缀 $A = \{1, 2, \dots, N_A\}$ 随视界覆盖率 $f = N_A / 12 \in [0, 1]$ 逐步扩张。当 $N_A \le 6$（$f \le 0.5$）时，$A$ 中每一颗比特的纠缠伴侣都留在外部 $\bar{A}$，被视界切断的圆弧对数随 $N_A$ 线性攀升；一旦越过半数分水岭 $N_A > 6$（$f > 0.5$），观察者开始把第 $7, 8, \dots, 12$ 号外部伴侣逐一收回视界内部，令原本悬空的半截圆弧重新首尾闭合归零！因此任意前缀割 $A$ 上恰有 $k_{\mathrm{cut}}(N_A) = \min(N_A, 12 - N_A)$ 对跨割纠缠对，局部总纠缠熵严格满足对称帐篷律：

   $$
   S(A; \theta) \;=\; \min(N_A,\, 12 - N_A)\,S_A(\theta) \;=\; 12\min(f,\, 1 - f)\,S_A(\theta),
   $$

   在 $f = 0.5$（$N_A = 6$）处攀上峰值 $6 S_A(\theta)$，并在 $f = 1.0$（$N_A = 12$）处精准回落至 $S_{\mathrm{global}} = 0$！这里须严格标明模型边界：上述公式是显式指定首尾嵌套配对 $(j, 13-j)$ 时的**确定性对割折线模型**（若改取相邻配对 $(1,2),(3,4),\dots$，则偶数前缀割跨割数为 $0$、奇数割为 $1$），用于直观展示“切断生熵、回收消熵”的拓扑闭合机制；而唐·佩奇（Don Page, 1993）在黑洞蒸发文献中导出的**哈尔随机纯态平均佩奇曲线** $S_{\mathrm{Page}}(d_A, d_{\bar{A}}) = \sum_{k=d_{\bar{A}}+1}^{d_A d_{\bar{A}}}\frac{1}{k} - \frac{d_A - 1}{2d_{\bar{A}}}$（$d_A \le d_{\bar{A}}$，`文献结果`，未在本书形式化）则是对全体全局酉变换求哈尔积分后在一切二分割上光滑弯曲的典型体积律期望曲线。

::: {.viz src="bounded-horizon-thermodynamics-sandbox" preset="horizon-page-curve" height="520"}
**跨视界半截圆弧切割与 12 比特嵌套对割佩奇曲线实验卡（`horizon-page-curve`）。** 拖动观察者视界覆盖率 $f = N_A/12 \in [0, 1]$ 与施密特角 $\theta \in [0^\circ, 45^\circ]$：实时计数横跨视界膜 $\partial A$ 被一刀切断的纠缠对数 $k_{\mathrm{cut}} = \min(N_A, 12-N_A)$，绘出局域总熵 $S(A;\theta)$ 从 $f=0$ 攀升至 $f=0.5$ 峰值 $6S_A(\theta)$ 再随圆弧闭合对称回落至 $f=1$ 零点的完整轨迹（`escapePairs_without_eq_union`、`pinching_hilbert_schmidt_pythagorean` 与 `bell_pure_state_has_maximally_mixed_marginal` 标绿色 `LEAN ✓`）。
:::

## 34.17.3 从熵到热力学：富田—竹崎模流有效温度、热力学四大定律与兰道尔排弧账本 {#sec-ch34-17-3}

有了局部偏迹混态 $\rho_A(\theta)$ 与纠缠熵 $S_A(\theta)$，宏观世界里的“温度”、“热量”、时间箭头乃至引力场方程只需补上参考能隙 $\Delta E$、比索尼亚诺—威奇曼情形与雅各布森推导的局域平衡等外加输入，便可顺着**富田—竹崎模自同构理论（Tomita–Takesaki Modular Theory）**与量子相对熵恒等式一步到位：

1. **温度的几何真身：模哈密顿量 $\hat{K}_A = -\ln\rho_A$、谱匹配有效温度与盎鲁—霍金视界辐射**（`文献结果` + `手工推导` + `MODEL`）。
   只要跨视界纠缠严格非零（$\theta \in (0, \frac{\pi}{4}]$），局部约化密度矩阵 $\rho_A(\theta) = \operatorname{diag}(\cos^2\theta, \sin^2\theta)$ 就是满秩严格正定算符（忠实态 $\rho_A > 0$），在数学上恒可唯一改写为指数形式 $\rho_A = e^{-\hat{K}_A}$，其中无量纲自伴算符

   $$
   \hat{K}_A \;:=\; -\ln\rho_A
   $$

   称为**模哈密顿量（Modular Hamiltonian）**。根据富田—竹崎定理（Tomita 1967；Takesaki 1970，`文献结果`），冯·诺依曼代数上的任意忠实正规态无需依赖任何外部时钟或动力学哈密顿量，自身就会内禀生成单参数酉**模自同构流（Modular Flow）** $\sigma_s^{\rho_A}(\hat{O}_A) := \rho_A^{is}\hat{O}_A\rho_A^{-is} = e^{-is\hat{K}_A}\hat{O}_A e^{+is\hat{K}_A}$（$s \in \mathbb{R}$），这正是孔涅与罗韦利提出的**热时间假说（Thermal Time Hypothesis）**（Connes & Rovelli 1994，`文献结果`）的算子基石。

   若在局部观察者的施密特指针基 $\{\lvert 0_A\rangle, \lvert 1_A\rangle\}$ 上选定能级间距为 $\Delta E > 0$ 的两能级参考哈密顿量 $\hat{H}_{\mathrm{loc}} = \operatorname{diag}(0, \Delta E)$，则由激发态与基态布居比 $\frac{\sin^2\theta}{\cos^2\theta} = \tan^2\theta = \exp(-\beta_{\mathrm{eff}}\Delta E)$，可直接解出由跨界纠缠角 $\theta$ 唯一决定的**谱匹配有效模逆温与有效模温度**（`手工推导`）：

   $$
   \beta_{\mathrm{eff}}(\theta)\,\Delta E \;=\; \ln\!\left(\frac{\cos^2\theta}{\sin^2\theta}\right) \;=\; 2\ln\cot\theta, \qquad k_B T_{\mathrm{eff}}(\theta) \;=\; \frac{\Delta E}{\ln(\cos^2\theta / \sin^2\theta)} \;=\; \frac{\Delta E}{2\ln\cot\theta}.
   $$

   此处须谨守精确的数学物理口径：上式给出的 $k_B T_{\mathrm{eff}}(\theta) = \frac{\Delta E}{2\ln\cot\theta}$ 是相对于局部参考能隙 $\Delta E > 0$ 的**二能级谱匹配吉布斯参数化**（在 $\theta \to 0^+$ 极限下 $\beta_{\mathrm{eff}}\Delta E \to +\infty,\; T_{\mathrm{eff}} \to 0^+$；在 $\theta \to \frac{\pi}{4}^-$ 贝尔极限下 $\beta_{\mathrm{eff}}\Delta E \to 0^+,\; T_{\mathrm{eff}} \to +\infty$），在有限两比特玩具模型中并不直接等同于外接宏观热库温度计的读数。然而在相对论量子场论的连续统舞台上，**比索尼亚诺—威奇曼定理（Bisognano–Wichmann Theorem, 1975）**严格证明：闵可夫斯基零温纯态真空限制在右林德勒因果楔（Rindler Wedge，$x > \lvert ct\rvert$）上的模哈密顿量 $\hat{K}_{\mathrm{Rindler}}$，精确等于洛伦兹助推生成元乘以 $\frac{2\pi}{\hbar c}$！因此，一位以固有加速度 $a$ 匀加速运动的观察者一旦因自身因果视界切断了跨界真空纠缠圆弧，同一片对惯性观察者而言处于绝对零度的纯态真空，向他显现出的正是千真万确携带普朗克黑体谱的**盎鲁热浴温度**，并与黑洞事件视界表面引力 $\kappa$ 诱导的**霍金辐射温度**严格同构（`文献结果：Hawking 1975; Unruh 1976`）：

   $$
   k_B T_{\mathrm{Unruh}} \;=\; \frac{\hbar a}{2\pi c}, \qquad k_B T_{\mathrm{Hawking}} \;=\; \frac{\hbar\kappa}{2\pi c} \;=\; \frac{\hbar c^3}{8\pi G_N M}.
   $$

   所谓宏观“热噪”，在本书的几何图景中正是受限观察者握住半截量子纠缠圆弧时，因另一端在视界外不可控演化而投射进视界内的模涨落（`MODEL`）！

2. **热力学第零、第一、第二（含兰道尔擦除）与第三定律的同源几何闭合**（`LEAN ✓` + `手工推导` + `文献结果`）。
   顺着模哈密顿量 $\hat{K}_A$ 与量子相对熵单调律，整套经典热力学四大定律在同一本局部偏迹账本上依次落锁：

   - **第零定律（KMS 模周期热平衡传递律，`文献结果`）**：沿模流时间参数 $t = \hbar\beta_{\mathrm{eff}} s$ 演化，局部关联函数恒满足**久保—马丁—施温格（KMS）解析周期边界条件** $\langle\hat{A}\,\sigma_{t - i\hbar\beta_{\mathrm{eff}}}(\hat{B})\rangle_{\rho_A} = \langle\sigma_t(\hat{B})\,\hat{A}\rangle_{\rho_A}$（Haag, Hugenholtz & Winnink 1967）。凡共享同一有效模逆温 $\beta_{\mathrm{eff}}$ 的局部子系统在弱耦合接触时净模能量流为零，直接确立温度标度的等价传递性。
   - **第一定律（纠缠第一定律、关联吉布斯恒等式与爱因斯坦场方程，`LEAN ✓` + `手工推导` + `文献结果`）**：对满秩局部态施加任意保迹微扰 $\rho_A \to \rho_A + \delta\rho_A$（$\operatorname{Tr}(\delta\rho_A) = 0$），直接求一阶变分立得**纠缠第一定律**（Blanco, Casini, Hung & Myers 2013）：

     $$
     \delta S_A \;=\; -\operatorname{Tr}(\delta\rho_A\ln\rho_A) - \operatorname{Tr}(\delta\rho_A) \;=\; \operatorname{Tr}(\delta\rho_A\,\hat{K}_A) \;=\; \delta\langle\hat{K}_A\rangle \quad\Longleftrightarrow\quad dE_{\mathrm{mod}} \;=\; k_B T_{\mathrm{eff}}\,dS_A.
     $$

     更进一步，对于任意**有限步大幅度偏离**（末态 $\rho_{\mathrm{final}}$ 甚至允许奇异且无需与 $H$ 对易），冻结内核定理 [`gibbs_relative_entropy_energy_difference`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.gibbs_relative_entropy_energy_difference)（[第八章](ch08-erasure-and-time-arrows.md)，`LEAN ✓`）给出了不带任何微扰近似的精确自由能—相对熵恒等式：从吉布斯热态 $\rho_{\mathrm{init}} = \operatorname{thermalState}(H, \beta) = e^{-\beta H}/Z$ 跃迁至任意密度态 $\rho_{\mathrm{final}}$ 时，

     $$
     D\bigl(\rho_{\mathrm{final}}\,\big\Vert\,\operatorname{thermalState}(H, \beta)\bigr) \;=\; \beta\bigl(\operatorname{meanEnergy}(H, \rho_{\mathrm{final}}) - \operatorname{meanEnergy}(H, \rho_{\mathrm{init}})\bigr) - \bigl(S_{\mathrm{vN}}(\rho_{\mathrm{final}}) - S_{\mathrm{vN}}(\rho_{\mathrm{init}})\bigr);
     $$

     在 $\rho_{\mathrm{final}} = \rho_{\mathrm{init}} + \delta\rho$ 处因相对熵二阶起跳 $D = \mathcal{O}(\delta\rho^2)$，一阶项当场退回 $\beta\,\delta\langle H\rangle = \delta S_{\mathrm{vN}}$！泰德·雅各布森（Ted Jacobson, 1995，`文献结果`）正是把这条视界克劳修斯关系 $\delta Q = T_{\mathrm{Unruh}}\,dS_{\mathrm{area}}$ 施加于时空中每一片局域林德勒因果视界圆弧面上，联立雷乔杜里（Raychaudhuri）测地线聚焦方程，反向推导出了完整的**广义相对论爱因斯坦场方程** $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G_N}{c^4} T_{\mu\nu}$！
   - **第二定律与兰道尔擦除原理（相干删除熵产、信道 DPI 与守限排弧热代价，`LEAN ✓` + `文献结果`）**：随着比较门不断把局域相干圆弧耦合外溢进外部环境 $\bar{A}$，受限观察者在计算基下执行保单位记录捏合 $\rho(k+1) = \Pi(U\rho(k)U^*)$ 时，冻结定理 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)（[@thm-entropy-production-coherence-deletion]，`LEAN ✓`）严格保证每拍冯·诺依曼熵增精确等于被抹除相干面积的非负相对熵 $\Delta S_k = D(\rho_U(k)\,\Vert\,\Pi(\rho_U(k))) \ge 0$；对一切完全正保迹量子信道 $\Phi$，冻结的数据处理不等式 [`extended_quantum_relative_entropy_channel_dpi`](lean:D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi)（[@thm-channel-data-processing]，`LEAN ✓`）更锁定相对熵单调不增 $D(\Phi(\rho)\,\Vert\,\Phi(\sigma)) \le D(\rho\,\Vert\,\sigma)$，刻下不可逆的热力学时间箭头。
     反过来，因为全局联合幺正演化绝不凭空销毁差异——冻结定理 [`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change)（`LEAN ✓`）证明双体联合幺正演化下边缘熵之和的变化恒等于互信息增量 $\Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}} = I_{\mathrm{final}} - I_{\mathrm{initial}}$——受限观察者若想擦除局部寄存器中的混合态以恢复纯净基准（令系统熵变 $\Delta S_{\mathrm{sys}} < 0$），唯一合法的几何通道就是将这枚未决纠缠圆弧推过视界排放到环境热浴 $R$ 中！联立热浴平衡 $\beta Q = \Delta S_{\mathrm{res}} + D(\rho'_R\,\Vert\,\rho^{\mathrm{th}}_R)$ 与直积初态幺正平衡 $I(S'{:}R') = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$，三条冻结内核定理 [`landauer_identity_from_balances`](lean:D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances)（[@prop-landauer-identity-from-balances]，`LEAN ✓`）、[`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance) 与 [`landauer_saturation_iff`](lean:D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff)（[@cor-landauer-bound-saturation]，`LEAN ✓`）一举锁定精确**兰道尔等式、下界与充要取等判据**（Landauer 1961；Reeb & Wolf 2014）：

     $$
     \beta Q \;=\; -\Delta S_{\mathrm{sys}} + I(S'{:}R') + D\bigl(\rho'_R\,\big\Vert\,\rho^{\mathrm{th}}_R\bigr) \;\ge\; -\Delta S_{\mathrm{sys}}, \qquad \Bigl(\beta Q = -\Delta S_{\mathrm{sys}} \;\Longleftrightarrow\; I(S'{:}R') = 0 \;\land\; D\bigl(\rho'_R\,\big\Vert\,\rho^{\mathrm{th}}_R\bigr) = 0\Bigr).
     $$

     在有效模温度 $T_{\mathrm{eff}} > 0$（$\beta = 1/(k_B T_{\mathrm{eff}})$）下，若视界外环境可视为处于该温度、初态与系统无关联的吉布斯热浴，则每擦除 $1\;\mathrm{bit}$ 局部混态（$\Delta S_{\mathrm{sys}} = -\ln 2$），必向视界外耗散至少 $\Delta Q_{\mathrm{erase}} \ge k_B T_{\mathrm{eff}}\ln 2$ 的模热量，且唯当擦除后不残留系统—热浴互信息（$I = 0$）亦不推偏热浴平衡（$D = 0$）时方能触及理想下界！
   - **第三定律（纠缠零温不可达律，`手工推导` + `文献结果`）**：由 $k_B T_{\mathrm{eff}}(\theta) = \frac{\Delta E}{2\ln\cot\theta}$ 可见，$T_{\mathrm{eff}} \to 0^+$ 当且仅当 $\theta \to 0^+$（跨界纠缠彻底清零，退回秩一纯态 $\rho_A^2 = \rho_A$）。由于任何正温满秩吉布斯态的核空间平凡而目标纯态带非平凡零核，依靠有限维正温热浴与有限步局域操作严格制备零熵纯态在代数上不可达（Nernst 1906；Masanes & Oppenheim 2017）：**只要内嵌观察者仍与宇宙保持一丝纠缠相连（$\theta > 0$），绝对零度就是永远无法一步踏入的渐近地平线**。

::: {.viz src="bounded-horizon-thermodynamics-sandbox" preset="modular-unruh-heat" height="520"}
**富田—竹崎模流有效温度、盎鲁视界类比与兰道尔排弧账本实验卡（`modular-unruh-heat`）。** 实时联动施密特角 $\theta \in (0^\circ, 45^\circ)$ 下的模哈密顿谱间距 $\beta_{\mathrm{eff}}\Delta E = 2\ln\cot\theta$、无量纲模流有效温度 $k_B T_{\mathrm{eff}}/\Delta E = 1/(2\ln\cot\theta)$ 与林德勒加速视界参照，并拆解兰道尔精确收支账单 $\beta Q = -\Delta S_{\mathrm{sys}} + I(S'{:}R') + D(\rho'_R\Vert\rho^{\mathrm{th}}_R) \ge -\Delta S_{\mathrm{sys}}$（`gibbs_relative_entropy_energy_difference`、`entropy_production_coherence_deletion_identity`、`landauer_identity_from_balances` 与 `landauer_bound_of_balance` 标绿色 `LEAN ✓`）。
:::

## 34.17.4 四种认知—热力学相态总表、$\theta^* \approx 42.35^\circ$ 生命自指稳态与形式化总定理 {#sec-ch34-17-4}

现在，把视界受限比例 $f$ 与跨界施密特纠缠角 $\theta$ 的四种典型相态并置在同一张精确对照表上（严格采用纯 Markdown 单行单元格排版），就能一眼看穿为什么真实的生命与清醒自指观察者既不住在 $f=1$ 或 $\theta=0^\circ$ 的零熵冰窖里，也不坠入 $\theta=45^\circ$ 的热寂白噪海，而是稳稳驻留在**超越自指不动点 $\theta^* = \cos\theta^* \approx 0.739085\;\mathrm{rad} \approx 42.346459^\circ$（常简记为 $42.35^\circ$）**之上（`MODEL`）：

| 相态模式 | 视界与施密特纠缠参数 | 妄我 / 守限代数诊断 | 局域熵 $S_A$ 与有效模温度 $T_{\mathrm{eff}}$ | 物理与生命演化结局 |
| :--- | :--- | :--- | :--- | :--- |
| **1. 全知妄我假想态** | 视界覆盖率 $f = 1$（无视界边界 $\partial A = \emptyset$） | **僭越全知**：妄设外部无限内存神谕，取消偏迹截断 | $S_{\mathrm{global}} = 0$，局部模温度无定义 | 冻结于静态永恒秩一纯态，无热力学过程亦无时间流 |
| **2. 孤立妄我假想态** | 施密特角 $\theta = 0^\circ$（$\cos^2\theta = 1,\; \sin^2\theta = 0$） | **封闭实我**：斩断与宇宙的一切跨界纠缠圆弧（`marginalRight_productState`） | $S_A = 0$，$k_B T_{\mathrm{eff}}/\Delta E = 0$（$T_{\mathrm{eff}} = 0\;\mathrm{K}$） | 绝对零度芝诺死石，互信息 $I=0$，无法与外界交换半比特信息 |
| **3. 失锚热寂弥散态** | 最大纠缠角 $\theta = 45^\circ = \frac{\pi}{4}$（$\cos^2\theta = \sin^2\theta = 0.5$） | **淹没无锚**：丢失局部内积自指偏置，$\rho_A = \frac{1}{2}I_2$（`bell_pure_state_has_maximally_mixed_marginal`） | $S_A = \ln 2 \approx 0.693147\;\mathrm{nats} = 1\;\mathrm{bit}$，$k_B T_{\mathrm{eff}}/\Delta E \to +\infty$ | 完全热平衡白噪声，相对熵自由能储备 $D(\rho_A\Vert\frac{1}{2}I_2)=0$，觉知消散 |
| **4. 受限不妄我生命稳态** | 有限视界 $0 < f < 0.5$，锁定自指角 $\theta^* = \cos\theta^* \approx 42.346459^\circ$（约 $42.35^\circ$） | **守限共生**：既诚实偏迹接纳纠缠，又稳守 Dottie 自指不动点（`rational_inverse_endpoint`） | $S_A(\theta^*) \approx 0.688864\;\mathrm{nats} \approx 0.993820\;\mathrm{bits}$，$k_B T_{\mathrm{eff}}/\Delta E \approx 5.390324$，保正自由能余量 $D > 0$ | **耗散自组织与清醒觉知**：求同锚定 $54.62\%$ 稳超外积耗散 $45.38\%$，在热流吞吐中维持不散的自指秩序 |

请细细品味第 4 行那组由第二十四章有理逆级数端点定理 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)（[@thm-dottie-rational-inverse-endpoint]，`LEAN ✓`）唯一锁定的高精度常数（`NUM` + `MODEL`）：在精确根 $\theta^* = \cos\theta^* \approx 0.73908513\;\mathrm{rad} \approx 42.34645883^\circ$ 处，单通道纠缠熵已高达 $S_A(\theta^*) \approx 0.688864\;\mathrm{nats} \approx 0.993820\;\mathrm{bits}$（若代入两位小数圆整角 $42.35^\circ$ 则为 $0.993836\;\mathrm{bits}$，与日常四位有效数字记法 $0.9939\;\mathrm{bits}$ 仅差约 $6.4\times 10^{-5}\;\mathrm{bits}$），意味着观察者向宇宙敞开了**超过 $99.38\%$ 满额带宽**的环境感知触角与充沛模热活性（$k_B T_{\mathrm{eff}}(\theta^*)/\Delta E \approx 5.390324$）；然而与此同时，因为局部内积求同锚定权重 $\cos^2\theta^* \approx 0.546247$（$54.62\%$）依然比外积跨界耗散权重 $\sin^2\theta^* \approx 0.453753$（$45.38\%$）稳稳高出那一分黄金般的**净秩序偏置**

$$
\cos(2\theta^*) \;=\; \cos^2\theta^* - \sin^2\theta^* \;\approx\; 0.092494 \;(\approx 9.25\%,\;\text{圆整角 }42.35^\circ\text{ 处为 }0.092371 \approx 9.24\%),
$$

局部态相对于最大混合白噪声 $\frac{1}{2}I_2$ 始终保有一笔严格为正的非平衡自由能梯度 $D\bigl(\rho_A(\theta^*)\,\big\Vert\,\frac{1}{2}I_2\bigr) = \ln 2 - S_A(\theta^*) \approx 0.004284\;\mathrm{nats} \approx 0.006180\;\mathrm{bits} > 0$！因此，守住 $\theta^*$ 的受限观察者既不会冻死在 $\theta = 0^\circ$ 的孤立自我硬壳里，也不会融化在 $\theta = 45^\circ$ 的无穷温热寂白噪声中，而是持续借兰道尔排弧机制把过载旧熵推向视界之外——这恰恰为埃尔温·薛定谔在《生命是什么》（*What Is Life?*, 1944）中所追问的**“生命以负熵为食”的非平衡耗散自指稳态**提供了一座零自由参数的量子几何坐标（`MODEL`）！

::: {.viz src="bounded-horizon-thermodynamics-sandbox" preset="dottie-living-steady" height="520"}
**受限不妄我 Dottie 生命自指稳态实验卡（`dottie-living-steady`）。** 锁定有限视界 $0 < f < 0.5$ 与唯一正余弦不动点 $\theta^* = \cos\theta^* \approx 0.739085\;\mathrm{rad} \approx 42.346459^\circ$（简记 $42.35^\circ$，`rational_inverse_endpoint` 标绿色 `LEAN ✓`）：同屏核验青色内积锚定份额 $\cos^2\theta^* \approx 54.62\%$（由琥珀色当前施密特矢量锁定）对比品红跨界纠缠份额 $\sin^2\theta^* \approx 45.38\%$（净秩序偏置 $9.25\%$；$42.35^\circ$ 圆整值处为 $9.24\%$）、接近满带宽的感知纠缠熵 $S_A(\theta^*) \approx 0.993820\;\mathrm{bits}$、有限正模流温度 $k_B T_{\mathrm{eff}}/\Delta E \approx 5.390324$ 以及严格为正的相对熵自由能储备 $D(\rho_A\Vert\frac{1}{2}I_2) \approx 0.006180\;\mathrm{bits}$。
:::

我们将本节贯穿直积边缘还原、贝尔纯态混态边缘、双体关联盲区、退相干记录访问缺陷、逃逸对分解、捏合勾股律、相干删除熵产、关联吉布斯能量差、兰道尔等式与下界、量子信道数据处理不等式以及 Dottie 有理逆级数端点的十二项内核验证支点，正式汇编于本节定理盒（各条彼此独立，因果链属 `MODEL`）：

::: {#thm-ch34-bounded-horizon-entanglement-thermodynamics .theorem title="本节引用的十二条已验证声明：边缘态与关联盲区、捏合勾股律、兰道尔等式与下界、数据处理不等式等" lean="D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalRight_productState D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.gibbs_relative_entropy_energy_difference D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
在所钉 `trureturing` 冻结声明下，以下十二项核心数学定理同时成立：

1. **直积态边缘还原、贝尔纯态最大混合边缘、双体无迹关联盲区与退相干记录访问缺陷**：
   对任意有限可判等指标类型 $A, B$（`[Fintype A] [DecidableEq A] [Fintype B] [DecidableEq B]`）及密度态 $\rho : \operatorname{DensityState} A,\; \sigma : \operatorname{DensityState} B$，直积态右边缘偏迹恒精确还原第一因子：

   $$
   \operatorname{marginalRight}\bigl(\operatorname{productState}(\rho, \sigma)\bigr) \;=\; \rho.
   $$

   双量子比特贝尔态矢满足归一化 $\mathrm{bellVector}^* \bullet_v \mathrm{bellVector} = 1$，其密度矩阵 $\mathrm{bellDensity}$ 半正定、迹为 $1$、秩为 $1$ 且幂等（$\mathrm{bellDensity}^2 = \mathrm{bellDensity}$），但其环境偏迹边缘严格坍缩为非幂等的最大混合态 $\operatorname{traceEnvironment}(\mathrm{bellDensity}) = \frac{1}{2}I_2$ 且 $\bigl(\operatorname{traceEnvironment}(\mathrm{bellDensity})\bigr)^2 \neq \operatorname{traceEnvironment}(\mathrm{bellDensity})$。对任意满足 $1 \le m,\; 1 \le n,\; 1 < mn$ 的自然数 $m, n$，双体无迹厄米空间分解为 $\mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n \sqcup \mathrm{correlationSector}\,m\,n = \mathrm{bipartiteTraceZero}\,m\,n$，局域合成扇区实维数为 $(m^2 - 1) + (n^2 - 1)$，正交关联扇区实维数为 $(m^2 - 1)(n^2 - 1)$ 且占无迹总空间比例为 $\frac{(m^2 - 1)(n^2 - 1)}{m^2 n^2 - 1}$，并在双比特见证上存在秩一纯态 $\mathrm{bellDensity}$ 与非幂等混态 $\mathrm{classicalCorrelatedDensity}$ 使双侧单因子偏迹完全相等而全局态严格相异。此外，对任意满足主对角元相等（$\forall i,\;\rho_{ii} = \sigma_{ii}$）且存在相异副对角元（$\exists i \neq j,\;\rho_{ij} \neq \sigma_{ij}$）的单比特矩阵 $\rho, \sigma \in \mathrm{QubitMatrix}$，受控拷贝算子 $\mathrm{copyUnitary} \in \operatorname{unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ 将空白环境初态 $B(\rho), B(\sigma)$ 幺正演化为相异联合记录态 $R(\rho) \neq R(\sigma)$，偏迹环境后满足 $\operatorname{traceEnvironment}(R(\rho)) = \operatorname{traceEnvironment}(R(\sigma))$ 从而不存在任何仅依赖单比特约化矩阵的恢复映射同时还原 $R(\rho)$ 与 $R(\sigma)$，而全局伴随算子 $\operatorname{star}\,\mathrm{copyUnitary}$ 则精确逆转还原 $B(\rho)$ 与 $B(\sigma)$。

2. **留一逃逸对集合分解、单比特捏合希尔伯特—施密特勾股恒等式与相干删除逐拍/累积熵产恒等式**：
   对任意有限状态场目录 $\mathrm{catalog}$ 及索引 $i \in \mathrm{catalog.Index}$，删去第 $i$ 项后的不可分辨逃逸对集合满足

   $$
   \mathrm{catalog.escapePairs}\bigl(\mathrm{catalog.without}(i)\bigr) \;=\; \mathrm{catalog.escapePairs}(\mathrm{catalog.fullIndexSet}) \cup \mathrm{catalog.uniqueCapturePairs}(i);
   $$

   对任意单比特矩阵 $\rho \in \mathrm{QubitMatrix}$，计算基对角捏合算子满足希尔伯特—施密特勾股分解

   $$
   \langle\rho, \rho\rangle_{\mathrm{HS}} \;=\; \langle\operatorname{pinching}\rho, \operatorname{pinching}\rho\rangle_{\mathrm{HS}} + \langle\rho - \operatorname{pinching}\rho, \rho - \operatorname{pinching}\rho\rangle_{\mathrm{HS}};
   $$

   且在任意有限可判等指标类型 $n$ 上，沿酉矩阵 $U \in \operatorname{unitaryGroup}(n,\mathbb{C})$ 共轭接计算基全捏合迭代的密度态序列 $\rho(k+1) = \operatorname{basisPinchingState}(\rho_U(k))$（$\rho_U(k) := \operatorname{unitaryConjugateState}(U, h_U, \rho(k))$）对一切 $k, N \in \mathbb{N}$ 满足单步熵产非负与 $N$ 步精确裂项求和：

   $$
   S_{\mathrm{vN}}\bigl(\rho(k+1)\bigr) - S_{\mathrm{vN}}\bigl(\rho(k)\bigr) \;=\; D\bigl(\rho_U(k)\,\Vert\,\operatorname{basisPinchingState}(\rho_U(k))\bigr) \;\ge\; 0, \qquad S_{\mathrm{vN}}\bigl(\rho(N)\bigr) - S_{\mathrm{vN}}\bigl(\rho(0)\bigr) \;=\; \sum_{k=0}^{N-1} D\bigl(\rho_U(k)\,\Vert\,\operatorname{basisPinchingState}(\rho_U(k))\bigr).
   $$

3. **吉布斯相对熵能量差恒等式、兰道尔热—熵—信息平衡下界与量子信道数据处理不等式**：
   在任意非空有限指标类型 $n$ 上，对任意自伴哈密顿矩阵 $H \in \operatorname{CStarMatrix}(n,n,\mathbb{C})$、实逆温 $\beta \in \mathbb{R}$ 及满足 $\rho_{\mathrm{init}} = \operatorname{thermalState}(H, h_H, \beta)$ 的初末密度态 $\rho_{\mathrm{init}}, \rho_{\mathrm{final}} : \operatorname{DensityState} n$，严格成立

   $$
   D\bigl(\rho_{\mathrm{final}}\,\big\Vert\,\operatorname{thermalState}(H, h_H, \beta)\bigr) \;=\; \beta\bigl(\operatorname{meanEnergy}(H, \rho_{\mathrm{final}}) - \operatorname{meanEnergy}(H, \rho_{\mathrm{init}})\bigr) - \bigl(S_{\mathrm{vN}}(\rho_{\mathrm{final}}) - S_{\mathrm{vN}}(\rho_{\mathrm{init}})\bigr).
   $$

   对任意实数 $\beta, Q, \Delta S_{\mathrm{sys}}, \Delta S_{\mathrm{res}}, I, D \in \mathbb{R}$，若满足热浴平衡 $\beta Q = \Delta S_{\mathrm{res}} + D$ 与幺正平衡 $I = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$，则必有兰道尔恒等式 $\beta Q = -\Delta S_{\mathrm{sys}} + I + D$；若进一步满足非负条件 $0 \le I$ 与 $0 \le D$，则必有兰道尔热耗下界 $-\Delta S_{\mathrm{sys}} \le \beta Q$。同时，对任意非空有限指标类型 $a, b$ 上的量子信道 $\Phi : \operatorname{QuantumChannel}\,a\,b$ 与密度态 $\rho, \sigma : \operatorname{DensityState} a$，扩展量子相对熵满足单调收缩律

   $$
   D_{\mathrm{ext}}\bigl(\Phi(\rho)\,\Vert\,\Phi(\sigma)\bigr) \;\le\; D_{\mathrm{ext}}(\rho\,\Vert\,\sigma).
   $$

4. **唯一正实余弦不动点与 $\pi$ 处有理逆幂级数绝对收敛**：
   存在实数 $\theta^* \in (0, 1)$ 满足 $\cos\theta^* = \theta^*$，且在全体正实数 $t > 0$ 中唯一（$\cos t = t \implies t = \theta^*$）；同时有理系数形式逆幂级数 $\operatorname{inverse}$ 在 $\pi$ 处绝对可和并精确收敛于 $\theta^*$：

   $$
   \sum_{n=0}^{\infty}\bigl\lvert\bigl(\operatorname{coeff}_n(\operatorname{inverse}) : \mathbb{R}\bigr)\bigr\rvert\,\pi^n \;<\; \infty, \qquad \sum_{n=0}^{\infty}\bigl(\operatorname{coeff}_n(\operatorname{inverse}) : \mathbb{R}\bigr)\,\pi^n \;=\; \theta^*.
   $$
:::

::: proof
第 1 组中，`marginalRight_productState` 将双体直积矩阵元 $\rho_{i,i'}\sigma_{j,j'}$ 沿第二因子对角指标求和并提出常数因子 $\operatorname{Tr}(\sigma) = 1$ 即还原 $\rho$；`bell_pure_state_has_maximally_mixed_marginal` 在四维计算基上直接验算贝尔态矢范数、秩一投影幂等性及偏迹 $\frac{1}{2}I_2$ 的非幂等性 $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$（见 [@lemma-bell-mixed-marginal]）；`local_marginal_correlation_blind_spot` 利用单因子厄米空间 $\mathbb{R}\cdot I \oplus \mathrm{traceZeroHermitian}$ 的实内积正交直和分解出四扇区，扣除标量扇区后算出局域直和维数 $(m^2-1)+(n^2-1)$ 与关联扇区维数 $(m^2-1)(n^2-1)$，并在 $4\times 4$ 计算基上核验贝尔纯态与经典关联混态同边缘异全局（见 [@thm-local-correlation-sectors]）；`reduced_irreversibility_is_access_defect` 由受控异或置换 $(i,a)\mapsto(i,a\oplus i)$ 的自逆酉性证得全局可逆复原，再由环境正交基偏迹消去 $i\neq j$ 副对角项及函数单值性矛盾证得局部不可恢复（见 [@thm-reduced-access-defect]）。第 2 组中，`escapePairs_without_eq_union` 对留一逃逸对按第 $i$ 条引理是否同核作排中律二分并重组无交并集（见 [@thm-ch38-escape-pairs-and-structural-novelty]）；`pinching_hilbert_schmidt_pythagorean` 利用对角矩阵与零对角残差矩阵在希尔伯特—施密特内积下的正交性展开范数平方（见 [@thm-pinching-pythagorean]）；`entropy_production_coherence_deletion_identity` 联立冯·诺依曼熵酉不变性、对角对数函数演算迹恒等式 $\operatorname{Tr}(\rho_U\ln\Pi(\rho_U)) = -S_{\mathrm{vN}}(\Pi(\rho_U))$、克莱因相对熵非负性与 $N$ 步归纳裂项求和（见 [@thm-entropy-production-coherence-deletion]）。第 3 组中，`gibbs_relative_entropy_energy_difference` 对正定吉布斯态 $\operatorname{thermalState}(H,\beta) = e^{-\beta H}/Z$ 展开算子对数 $-\beta H - (\ln Z)I$，与初态自身热平衡恒等式相减消去配分函数对数 $\ln Z$；`landauer_identity_from_balances` 与 `landauer_bound_of_balance` 从幺正平衡解出 $\Delta S_{\mathrm{res}} = I - \Delta S_{\mathrm{sys}}$ 代入热浴平衡，再由 $I \ge 0,\; D \ge 0$ 导出线性不等式（见 [@prop-landauer-identity-from-balances] 与 [@cor-landauer-bound-saturation]）；`extended_quantum_relative_entropy_channel_dpi` 通过信道 Kraus 表示构造 Petz 相对模算子压缩映射并调用算子对数单调凹性证得（见 [@thm-channel-data-processing]）。第 4 组中，`rational_inverse_endpoint` 在区间 $(0,1)$ 上由连续介值性与严格单调性锁定唯一正根 $\cos\theta^* = \theta^*$，并由形式拉格朗日反演系数界证明有理幂级数在收敛半径端点 $\pi$ 处绝对可和且和为 $\theta^*$（见 [@thm-dottie-rational-inverse-endpoint]）。完整证明由 Lean 内核检查。
:::

下面我们通过一组高精度六位小数基准算例，将六档施密特角下的边缘熵与有效模温度、12 比特嵌套对割佩奇曲线以及 $\theta^*$ 稳态下的兰道尔排弧热耗与自由能储备逐项核算到位：

::: {#ex-ch34-schmidt-modular-temperature-and-page-curve-benchmark .example title="双比特施密特模流温度、离散 12 比特嵌套对割佩奇曲线与 Dottie 稳态兰道尔排弧热耗基准算例"}
本算例对双量子比特纯态 $\lvert\Psi_{AB}(\theta)\rangle = \cos\theta\lvert 00\rangle + \sin\theta\lvert 11\rangle$（$\theta \in [0, \frac{\pi}{4}]$，局部参考哈密顿量 $\hat{H}_{\mathrm{loc}} = \operatorname{diag}(0, \Delta E)$，$\Delta E > 0$）及 12 比特嵌套纯态配对模型作闭式解析与六位小数数值检核（内部按 80 位有效数字高精度演算后四舍五入至六位小数，`手工推导` / `NUM`）：

1. **六档特征施密特角下双比特边缘纯度、纠缠熵、谱匹配有效模温度与非平衡自由能余量表**：
   记 $p = \cos^2\theta,\; q = \sin^2\theta$，秩序偏置为 $\cos(2\theta) = p - q$，局部纯度为 $p^2 + q^2$，自然对数熵为 $S_A = -p\ln p - q\ln q$（比特熵为 $S_A/\ln 2$），模谱间距为 $\beta_{\mathrm{eff}}\Delta E = 2\ln\cot\theta$，无量纲有效模温度为 $k_B T_{\mathrm{eff}}/\Delta E = 1/(2\ln\cot\theta)$，距最大混合态 $\frac{1}{2}I_2$ 的相对熵余量为 $D(\rho_A\Vert\frac{1}{2}I_2) = \ln 2 - S_A$。对比 $\theta \in \{0^\circ, 15^\circ, 30^\circ, \theta^*\text{ 精确根}, 42.35^\circ\text{ 圆整角}, 45^\circ\}$（其中 Dottie 精确根 $\theta^* \approx 0.73908513\;\mathrm{rad} \approx 42.34645883^\circ$，圆整角 $42.35^\circ$ 比精确根高 $0.003541^\circ$）：

| 施密特角 $\theta$（度 / 弧度） | $\cos^2\theta$ | $\sin^2\theta$ | 偏置 $\cos(2\theta)$ | 纯度 $\operatorname{Tr}(\rho_A^2)$ | $S_A$（$\mathrm{nats}$） | $S_A$（$\mathrm{bits}$） | $2\ln\cot\theta$ | $k_B T_{\mathrm{eff}}/\Delta E$ | $D(\rho_A\Vert\frac{1}{2}I_2)$（$\mathrm{nats}$ / $\mathrm{bits}$） |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$0^\circ$**（$0.000000\;\mathrm{rad}$） | $1.000000$ | $0.000000$ | $1.000000$ | $1.000000$ | $0.000000$ | $0.000000$ | $+\infty$ | $0.000000$ | $0.693147$ / $1.000000$ |
| **$15^\circ$**（$0.261799\;\mathrm{rad}$） | $0.933013$ | $0.066987$ | $0.866025$ | $0.875000$ | $0.245775$ | $0.354579$ | $2.633916$ | $0.379663$ | $0.447372$ / $0.645421$ |
| **$30^\circ$**（$0.523599\;\mathrm{rad}$） | $0.750000$ | $0.250000$ | $0.500000$ | $0.625000$ | $0.562335$ | $0.811278$ | $1.098612$ | $0.910239$ | $0.130812$ / $0.188722$ |
| **$\theta^*$ 精确根**（$42.346459^\circ$ / $0.739085\;\mathrm{rad}$） | $0.546247$ | $0.453753$ | $0.092494$ | $0.504278$ | $0.688864$ | $0.993820$ | $0.185518$ | $5.390324$ | $0.004284$ / $0.006180$ |
| **$42.35^\circ$ 圆整值**（$42.350000^\circ$ / $0.739147\;\mathrm{rad}$） | $0.546185$ | $0.453815$ | $0.092371$ | $0.504266$ | $0.688875$ | $0.993836$ | $0.185269$ | $5.397548$ | $0.004272$ / $0.006164$ |
| **$45^\circ$**（$0.785398\;\mathrm{rad}$） | $0.500000$ | $0.500000$ | $0.000000$ | $0.500000$ | $0.693147$ | $1.000000$ | $0.000000$ | $+\infty$ | $0.000000$ / $0.000000$ |

2. **离散 12 比特六对首尾嵌套纯态 $(1,12),(2,11),\dots,(6,7)$ 前缀割佩奇曲线六位小数对账表**：
   对前缀视界 $A = \{1, \dots, N_A\}$（$N_A \in \{0, 2, 4, 6, 8, 10, 12\}$，覆盖率 $f = N_A/12$），跨割对数为 $k_{\mathrm{cut}} = \min(N_A, 12 - N_A)$，局域总纠缠熵为 $S(A;\theta) = k_{\mathrm{cut}} S_A(\theta)$。并列对照中等纠缠 $\theta = 30^\circ$、精确 Dottie 稳态 $\theta^*$ 与贝尔最大纠缠 $\theta = 45^\circ$ 三条曲线：

| 视界比特数 $N_A$ | 覆盖率 $f = N_A/12$ | 跨割圆弧对数 $k_{\mathrm{cut}}$ | $30^\circ$ 总熵（$\mathrm{nats}$ / $\mathrm{bits}$） | $\theta^*$ 精确根总熵（$\mathrm{nats}$ / $\mathrm{bits}$） | $45^\circ$ 贝尔总熵（$\mathrm{nats}$ / $\mathrm{bits}$） |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $0$ | $0.000000$ | $0$ | $0.000000$ / $0.000000$ | $0.000000$ / $0.000000$ | $0.000000$ / $0.000000$ |
| $2$ | $0.166667$ | $2$ | $1.124670$ / $1.622556$ | $1.377727$ / $1.987640$ | $1.386294$ / $2.000000$ |
| $4$ | $0.333333$ | $4$ | $2.249341$ / $3.245113$ | $2.755454$ / $3.975280$ | $2.772589$ / $4.000000$ |
| $6$ | $0.500000$ | $6$ | $3.374011$ / $4.867669$ | $4.133181$ / $5.962920$ | $4.158883$ / $6.000000$ |
| $8$ | $0.666667$ | $4$ | $2.249341$ / $3.245113$ | $2.755454$ / $3.975280$ | $2.772589$ / $4.000000$ |
| $10$ | $0.833333$ | $2$ | $1.124670$ / $1.622556$ | $1.377727$ / $1.987640$ | $1.386294$ / $2.000000$ |
| $12$ | $1.000000$ | $0$ | $0.000000$ / $0.000000$ | $0.000000$ / $0.000000$ | $0.000000$ / $0.000000$ |

   在半视界峰值 $N_A = 6$（$f = 0.500000$）处，$\theta^*$ 生命稳态的跨视界纠缠总熵达到 $4.133181\;\mathrm{nats} = 5.962920\;\mathrm{bits}$（占贝尔理论极限 $6.000000\;\mathrm{bits}$ 的 $99.3820\%$），并在 $N_A = 12$ 全域闭合时精确归零。

3. **Dottie 稳态 $\theta^*$ 下的兰道尔排弧热耗下界与非平衡模自由能拆账**：
   在精确自指不动点 $\theta^*$ 的有效模逆温 $\beta_{\mathrm{eff}}(\theta^*)\Delta E = 2\ln\cot\theta^* \approx 0.185518$（$k_B T_{\mathrm{eff}}(\theta^*)/\Delta E \approx 5.390324$）下（按 §34.17.3 的热浴假定），由 [@thm-ch34-bounded-horizon-entanglement-thermodynamics] 第 3 款兰道尔不等式 $\beta Q \ge -\Delta S_{\mathrm{sys}}$：
   - 擦除整整 $1\;\mathrm{bit}$ 最大混合不确定度（$\Delta S_{\mathrm{sys}} = -\ln 2 \approx -0.693147\;\mathrm{nats}$）所需的无量纲最小模热量为

     $$
     \frac{\Delta Q_{1\,\mathrm{bit}}(\theta^*)}{\Delta E} \;=\; \frac{\ln 2}{2\ln\cot\theta^*} \;\approx\; 5.39032450 \times 0.69314718 \;\approx\; 3.736288;
     $$

   - 将单通道 $\theta^*$ 边缘态 $\rho_A(\theta^*)$ 自身清零复位回纯基准态 $\lvert 0_A\rangle\langle 0_A\rvert$（系统熵变 $\Delta S_{\mathrm{sys}} = -S_A(\theta^*) \approx -0.688864\;\mathrm{nats}$）所需的最小排弧模热量为

     $$
     \frac{\Delta Q_{\mathrm{reset}}(\theta^*)}{\Delta E} \;=\; \frac{S_A(\theta^*)}{2\ln\cot\theta^*} \;\approx\; 5.39032450 \times 0.68886352 \;\approx\; 3.713198;
     $$

   - 两者之差恰等于 $\theta^*$ 稳态相对于最大混态 $\frac{1}{2}I_2$ 所储蓄的无量纲非平衡模自由能余量 $\frac{\Delta F_{\mathrm{mod}}(\theta^*)}{\Delta E} = \frac{k_B T_{\mathrm{eff}}(\theta^*)\,D(\rho_A(\theta^*)\Vert\frac{1}{2}I_2)}{\Delta E} \approx 3.736288 - 3.713198 = 0.023090 > 0$！若改置于国际单位制室温物理热浴 $T = 300\;\mathrm{K}$（$k_B = 1.380649\times 10^{-23}\;\mathrm{J/K}$）下对照，单比特满额兰道尔热下界为 $k_B T\ln 2 \approx 2.870979\times 10^{-21}\;\mathrm{J}$，而清零单通道 $\theta^*$ 稳态的最小排热量则为 $k_B T S_A(\theta^*) \approx 2.853236\times 10^{-21}\;\mathrm{J}$（节余自由能 $0.017743\times 10^{-21}\;\mathrm{J}$）。
:::

::: {#rem-ch34-von-neumann-tomita-unruh-rt-page-jacobson-literature .remark title="冯·诺依曼熵、富田—竹崎模理论、盎鲁—霍金视界温度、笠—高柳面积律、佩奇曲线、雅各布森时空状态方程与兰道尔/薛定谔生命热力学的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将跨视界量子纠缠、偏迹截断、冯·诺依曼熵、模流有效温度与生命稳态收束进同一条比较公理因果链时，严格恪守以下三道认识论边界：

1. **量子统计、算子代数模理论、视界热力学、全息面积律与计算/生命热力学的经典文献**：密度算符、偏迹与量子熵 $-\operatorname{Tr}(\rho\ln\rho)$ 源自 J. von Neumann（*Göttinger Nachr.* **1927**, 273；*Mathematische Grundlagen der Quantenmechanik*, Springer, 1932），双体正交分解与量子纠缠命名分别源自 E. Schmidt（*Math. Ann.* **63**, 433, 1907）与 E. Schrödinger（*Proc. Camb. Phil. Soc.* **31**, 555, 1935）；冯·诺依曼代数忠实态的模算子与单参数模自同构群由 M. Tomita（1967 预印本）与 M. Takesaki（*Lecture Notes in Math.* **128**, Springer, 1970）创立，代数统计力学 KMS 平衡判据由 R. Haag, N. M. Hugenholtz & M. Winnink（*Commun. Math. Phys.* **5**, 215, 1967）确立，热时间假说由 A. Connes & C. Rovelli（*Class. Quantum Grav.* **11**, 2899, 1994）提出；闵可夫斯基真空在林德勒因果楔上的模哈密顿助推生成元定理由 J. J. Bisognano & E. H. Wichmann（*J. Math. Phys.* **16**, 985, 1975）证明，黑洞视界热辐射与匀加速观察者真空热浴分别由 S. W. Hawking（*Commun. Math. Phys.* **43**, 199, 1975）与 W. G. Unruh（*Phys. Rev. D* **14**, 870, 1976）建立；黑洞熵面积律与全息纠缠熵极小曲面面积公式分别归功于 J. D. Bekenstein（*Phys. Rev. D* **7**, 2333, 1973）与 S. Ryu & T. Takayanagi（*Phys. Rev. Lett.* **96**, 181602, 2006），哈尔随机纯态子系统平均熵与黑洞蒸发转折曲线由 D. N. Page（*Phys. Rev. Lett.* **71**, 1291 & **71**, 3743, 1993）导出；纠缠第一定律 $\delta S_A = \delta\langle\hat{K}_A\rangle$ 见 D. D. Blanco, H. Casini, L.-Y. Hung & R. C. Myers（*JHEP* **08**, 060, 2013），由局域因果视界克劳修斯关系 $\delta Q = T\,dS$ 导出爱因斯坦场方程由 T. Jacobson（*Phys. Rev. Lett.* **75**, 1260, 1995）完成；孤立多体量子系统的本征态热化假说（ETH）源自 J. M. Deutsch（*Phys. Rev. A* **43**, 2046, 1991）与 M. Srednicki（*Phys. Rev. E* **50**, 888, 1994）；有限热浴信息擦除热耗与量子热力学第三定律不可达性分别见 R. Landauer（*IBM J. Res. Dev.* **5**, 183, 1961）、D. Reeb & M. M. Wolf（*New J. Phys.* **16**, 103011, 2014）及 L. Masanes & J. Oppenheim（*Nat. Commun.* **8**, 14538, 2017）；生命系统通过持续向环境输出熵来维持非平衡低熵自组织的思想则源自 E. Schrödinger（*What Is Life?*, Cambridge Univ. Press, 1944）。
2. **内核已验证 `LEAN ✓` 定理、精确闭式演算（`手工推导` / `NUM`）与统一概念诠释（`MODEL`）的严格界限**：[@thm-ch34-bounded-horizon-entanglement-thermodynamics] 所汇集的十二条冻结声明——连同正文内联引用的左因子直积偏迹 [`marginalLeft_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalLeft_productState)、联合幺正边缘熵变等于互信息增量 [`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change) 以及兰道尔下界充要取等判据 [`landauer_saturation_iff`](lean:D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff)——均已在 Lean 4 内核中零公理缺口验证（`LEAN ✓`）；双比特施密特偏迹约化、相对于局部参考能隙 $\Delta E > 0$ 的谱匹配有效模温度 $k_B T_{\mathrm{eff}}(\theta) = \frac{\Delta E}{2\ln\cot\theta}$（不冒充外部宏观热库温度计）、一阶微扰变分 $\delta S_A = \delta\langle\hat{K}_A\rangle$ 以及显式首尾嵌套配对的 12 比特对割熵折线 $S(A;\theta) = \min(N_A, 12-N_A)S_A(\theta)$（显式区分于哈尔随机平均佩奇熵）均属可逐项核验的闭式推导与高精度算术检核（`手工推导` / `NUM`）。在此之上，将“观察者受限不妄我”、跨视界极小圆弧体偏迹截断、模流温度与 Dottie 不动点 $\theta^*$ 诠释为贯通量子纠缠、热力学与生命自组织的统一几何因果链，属于本书提出的自然哲学与理论物理综合模型（`MODEL`）。
3. **量子引力幺正佩奇曲线与一般多体本征态热化的开放前沿（`OPEN`）**：在包含标准模型手征物质的渐近平坦 `3+1D` 非微扰量子引力中，不借助全息边界外推或半经典岛屿近似而从第一性原理严格证明真实引力坍缩黑洞蒸发的幺正佩奇曲线回收与笠—高柳极小曲面涌现，以及对一般非可积局部多体哈密顿量在不引入随机矩阵统计假设的前提下纯解析严格证明本征态热化假说（ETH），均显式受制于[附录 E](appendix-e.md) 桥接假设 `H8`、`H9`，在当代数学物理中仍属未决开放问题（`OPEN`）。
:::

不妨在下方的三维交互式沙盘里亲手做一次收官巡礼：先把“观察者受限视界覆盖率 $f$”从局部慢慢推向 $1.00$，看着温度、熵与时间箭头随着偏迹截断的消失一并归于死寂；再把跨界纠缠角拉回 $0^\circ$ 切断与他者的一切牵连，目睹视界之内瞬间冻成一片绝对零度的荒原；最后切回 `受限不妄我稳态（θ* = 42.35°）` 凝视那层薄薄的视界膜——唯有承认自身有限、不僭越全知，同时坦然置身于万物的纠缠之网中守住那一分自指刻度，被视界切断的极小圆弧体才会化作温暖的模流与自由能梯度，让冰冷的比较公理在局部窗口里燃起热力学的篝火与生命的脉搏。那么，这套“观察者受限不妄我”的视界截断法则，落回到全宇宙潜在无穷维的格拉姆内积比较总账本 $G_\infty$ 上，究竟对应着怎样精确的有限维矩阵结构？答案正是下一节即将揭晓的**格拉姆窗口（Gram Window，$\mathcal{W}_M$）**——任何内嵌有限观察者都只能在漫长历史轨迹上截取一扇尺度为 $M$ 的有限滑动主子阵 $G_M$，以窗口之外经 $\operatorname{Tr}_{\bar{W}}$ 偏迹释放给热海的兰道尔遗忘熵，换取窗口之内舒尔补尚未锁死的自由选择活路与多观察者主体间共识现实（详见 [§34.18](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）：

::: {.viz src="bounded-horizon-thermodynamics-sandbox" height="640"}
**量子纠缠、受限视界偏迹与热力学涌现统一交互实验室（`HORIZON//THERMO`）。** 在零熵全局纯态纠缠圆弧网（$S_{\mathrm{global}} \equiv 0$）内部自由调节局部观察者视界覆盖率 $f \in [0, 1]$ 与跨界施密特纠缠角 $\theta \in [0^\circ, 45^\circ]$，一键切换“全知妄我假想态（$f=1$）—孤立妄我芝诺态（$\theta=0^\circ$）—跨视界切割与 12 比特佩奇曲线—富田—竹崎模流有效温度与兰道尔排弧账单—Dottie $\theta^* \approx 42.35^\circ$ 受限不妄我生命稳态”五张实验卡，同屏检视被视界膜 $\partial A$ 切断的半截极小圆弧体如何点亮边界熵量子、驱动模流温度 $k_B T_{\mathrm{eff}}/\Delta E = 1/(2\ln\cot\theta)$ 并锁定 $54.62\%$ 对 $45.38\%$ 的自指生命秩序；绿色 `LEAN ✓` 徽章严格对应主定理框十二条冻结声明及三条正文内联内核声明。
:::
