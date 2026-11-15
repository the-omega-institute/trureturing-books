# 4.3 最大混合死点（$\vv{r} = \vv{0}$） {#sec-ch04-3}

顺着这张几何形变表往下看：先用标准基捏合彻底抹掉赤道相干元（把球压到竖直主轴上），再连竖直主轴上的粒子偏置 $r_z$ 也一并消磨殆尽，整根布洛赫向量就会彻底缩进球的几何中心——**最大混合死点** $\vv{r} = \vv{0}$。

::: {.viz src="bloch-noise" preset="centre" height="500"}
**球心：从哪来都一样。** 强度为 $1$ 的去极化把整颗球缩成紫色的球心一点：北极的 $\rho$ 与 $+x$ 的 $\sigma$ 落在同一处，白线长度为零。
:::

让我们先用一条紧接 [@thm-pinching-pythagorean] 的推论，把“赤道相干彻底清零”的代数判据钉死。

::: {.corollary #cor-pinching-zero-offdiag title="单比特零丢弃相干质量与捏合不动点的副对角归零判据" lean="D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero D5/S3/QuantumChannels/CoherenceMassBridge.pinching_discarded_mass_eq_zero_iff"}
对任意单比特矩阵 $\rho \in M_2(\mathbb{C})$，记其副对角元有序对为 $\operatorname{offDiag}(\rho) = (\rho_{01}, \rho_{10}) \in \mathbb{C} \times \mathbb{C}$。则以下三条陈述两两等价：

1. $\rho$ 是标准基捏合映射的不动点：$\mathcal{P}(\rho) = \rho$；
2. 捏合丢弃的希尔伯特—施密特相干质量为零：$\langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$；
3. $\rho$ 的两个副对角元同时为零：$\operatorname{offDiag}(\rho) = (0, 0)$。
:::

::: proof
（$1 \Leftrightarrow 3$）：$\mathcal{P}(\rho)$ 与 $\rho$ 在对角位置 $(0, 0), (1, 1)$ 恒相等，而在副对角位置 $(0, 1), (1, 0)$ 处 $\mathcal{P}(\rho)$ 取 $0$，故矩阵相等 $\mathcal{P}(\rho) = \rho$ 当且仅当 $\rho_{01} = 0$ 且 $\rho_{10} = 0$。（$2 \Leftrightarrow 3$）：由 [@thm-pinching-pythagorean] 的结论 2，丢弃相干质量等于两个非负实数之和 $|\rho_{01}|^2 + |\rho_{10}|^2$；两个非负实数之和为 $0$ 当且仅当每一项各自为 $0$，这又当且仅当 $\rho_{01} = \rho_{10} = 0$。完整证明由 Lean 内核检查。
:::

现在，在副对角元归零（$r_x = r_y = 0$）的基础上再令对角粒子偏置归零（$\rho_{00} = \rho_{11} = \frac{1}{2}$，即 $r_z = 0$），我们便抵达了单量子比特世界最对称、也最沉寂的奇点：$\rho_* = \frac{1}{2}I$。让我们在下面的综合剖析中仔细端详这颗球心死点——它既是第一部“从点到线”的终点，也是通往后续双矢量面积与多体纠缠的秘密虫洞！

::: {.example #ex-maximally-mixed-center title="球心最大混合态的全方位几何诊断与多球纠缠伏笔"}
取布洛赫球心向量 $\vv{r} = (0, 0, 0)$，由[第一章](ch01-measurement.md) [@prop-qubit-bloch-core] 知 $B(\vv{0}) = 0$，对应的单比特密度矩阵为单位矩阵的一半：

$$
\rho_* = \frac{1}{2}\bigl(I + B(\vv{0})\bigr) = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}.
$$

这颗球心死点集齐了四重意味深长的几何特征：

1. **全向各向同性失明**：任取球面上**任何一根**单位探测方向 $\vv{n} \in S^2$（对应投影尺 $P_{\vv{n}} = \frac{1}{2}(I + B(\vv{n}))$），按[第二章](ch02-born-rule.md) [@ex-bloch-half-angle] 计算玻恩通过率：

   $$
   \Tr(\rho_* P_{\vv{n}}) = \frac{1 + \vv{0}\cdot\vv{n}}{2} = \frac{1}{2}.
   $$

   无论你把偏振片或斯特恩—革拉赫磁铁转到东南西北哪个角度，探测器永远只吐出毫无倾向的 $50\% : 50\%$ 白噪声！正如[序曲](README.md)第四重盲区所言，当你放弃一切特定方向、把整颗球面不偏不倚地平均揉成一团（$\frac{1}{4\pi}\int_{S^2} \vv{a}\,d\Omega = \vv{0}$）时，“全知”瞬间坍缩成了“全盲”。
2. **零纯度盈余**：计算 $\rho_*^2 = \frac{1}{4}I$，纯度跌至二维空间的绝对下限 $\Tr(\rho_*^2) = \frac{1}{2}$。代入[第三章](ch03-projectors-and-duality.md)的互补勾股定理 [@thm-complementary-pythagoras]（$|d| = 2$），左端纯度盈余 $\Tr(\rho_*^2) - \frac{1}{2} = 0$，意味着无论可见粒子偏离还是正交波动余量都一滴不剩。
3. **经典系综拆解的无穷歧义**：把五成北极与五成南极混在一起，$\frac{1}{2}\rho_{+\vv{e}_3} + \frac{1}{2}\rho_{-\vv{e}_3} = \frac{1}{2}I$；把五成东极与五成西极混在一起，$\frac{1}{2}\rho_{+\vv{e}_1} + \frac{1}{2}\rho_{-\vv{e}_1} = \frac{1}{2}I$！一旦缩成球心一点，任何实验都无法倒推它当初是由南北对冲还是东西对冲混合而成的——因为密度矩阵只记录合成后的净几何重心 $\vv{r}$，从不替历史保存混配配方。
4. **通往第四部“多球纠缠”的惊天伏笔**：最奇妙的一幕还在后头！回到本章 4.1 节开头的双比特联合纯态，令 $\theta_{\mathrm{env}} = 90^\circ$，即著名的**最大纠缠贝尔态（Bell state）** $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$，其密度矩阵展开为 $\rho_{AB} = \frac{1}{4}(I \otimes I + \sigma_x \otimes \sigma_x - \sigma_y \otimes \sigma_y + \sigma_z \otimes \sigma_z)$。整个双比特系统明明处在最纯粹、零熵、模长为 $1$ 的全局纯态（$\Tr(\rho_{AB}^2) = 1$），可是当你单独去量第一颗比特 $A$ 时，$\rho_A = \frac{1}{2}I$（$\vv{r}_A = \vv{0}$）；单独去量第二颗比特 $B$ 时，$\rho_B = \frac{1}{2}I$（$\vv{r}_B = \vv{0}$）！两颗局部球心里空空如也，单比特局域泡利分量 $\sigma_i \otimes I$ 与 $I \otimes \sigma_j$ 全部为零——那么那整整 $100\%$ 的非平凡纯度藏到哪儿去了？答案一清二楚：**它百分之百储存在联合双比特泡利关联扇区 $\sigma_i \otimes \sigma_j$ 之中（第四部第十三章将在几何上把这组跨球张量关联阐释为横跨两颗球的共享关联平面）！**
:::

::: {.figure src="ch04-centre-mixtures"}
**球心不记得自己是怎么混出来的。** 南北两极各取 $\frac{1}{2}$、东西两极各取 $\frac{1}{2}$，或者斜虚线两端的另一对对径点各取 $\frac{1}{2}$，混出的布洛赫向量都是弦的中点，全都落在紫色的球心 $\frac{1}{2}I$（[@ex-maximally-mixed-center] 第 3 条）。
:::

---

## 4.3.1 第一部小结：从“点”站成“线”，下一步向“面”展翼 {#第一部小结从点站成线下一步向面展翼}

回望第一部走过的四章征程，我们用经 Lean 4 内核逐条核验的定理级结论及其锁定的形式化声明，完成了量子几何地基的第一轮重塑；各条对应关系列在本书的形式化验证账本中：

- **第一章**拆穿了孤立单子与外部第 3 点 $C$ 的双重幻觉，证明单比特矩阵代数无特征标（[@thm-qubit-no-character]），并用幺正射线刚性（[@thm-ray-phase-rigidity]）与布洛赫展开（[@prop-qubit-bloch-core]）把双分量复列向量（四个实坐标）还原为球面上的三维实单位线 $\vv{a} \in S^2$；
- **第二章**以已知态自身为基，把“点 $C$”还原为内生相融影子 $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$，从迹配对与勾股模长守恒严格导出玻恩模平方定则（[@thm-born-modulus-square]、[@thm-rank-one-born-pairing]）及半角换算 $\cos^2(\theta/2) = \frac{1 + \cos\theta}{2}$，并证明在探针上为正的读数可由最小确认逐层剥出（[@thm-positive-dual-generation]），以及有限维里效应上可加的概率必是某个密度矩阵的迹配对（[@thm-busch-effect-density]）；
- **第三章**指出粒子、概念与经典时间刻度全都是幂等投影线 $P^2 = P$ 的不动点（[@thm-pinching-idempotent]、[@thm-unread-fixed-iff]、[@thm-conditional-state-valid]），用互补勾股定理（[@thm-complementary-pythagoras]）揭示了粒子轴与霍奇对偶波平面的伴生宿命，并给出 $d$ 维系统的记录容量上界 $N \le d$（[@prop-record-capacity]）与互补语境的熵不确定关系（[@prop-collision-entropy-uncertainty]）；
- **第四章**追踪了视线移开后的偏迹边缘化（[@thm-nonselective-marginal]），证明局部不可逆只是环境访问缺陷（[@thm-reduced-access-defect]），给出了相位阻尼、振幅阻尼与捏合投影的几何收缩图像（[@thm-pinching-pythagorean]、[@prop-phase-damping-decay]、[@prop-amplitude-damping-contraction]、[@cor-pinching-zero-offdiag]），以 Stinespring 扩张（[@thm-stinespring-dilation]）说明表示压缩的结构，以 Sz.-Nagy 酉幂扩张（[@thm-unitary-power-dilation]）说明任意多步的压缩仍是同一个酉演化的影子，并由迹距离在同一有限指标类型上的量子信道下不增（[@prop-trace-distance-metric-contraction]）刻画两态可分辨性的限制。

::: {.viz src="bloch-noise" height="560"}
**完整实验室。** 切换三种噪声、调每一步的强度与 $T_2 / T_1$，或在球皮上拖动 $\rho$ 与 $\sigma$，沿时间轴看青色的球怎样变形、白线怎样只缩不长。
:::

至此，第一重帷幕“从点到线”已彻底落下。在接下来的**第二部《展翼·从线到面》**中，我们将把目光从静态的一维投影线 $\vv{a} \cdot \vv{b} = \cos\theta$ 抬高三寸，正面迎向那片在第一部里已经频频显露锋芒的**二维有向面积** $\vv{a} \wedge \vv{b} = \sin\theta\,\hat{I}$——看清虚数单位 $i$ 为什么其实就是平面 $90^\circ$ 正交转向算子，并用一行克利福德几何积恒等式 $AB = A\cdot B + A\wedge B$ 将全部单比特量子门与量子力学五大公理一举合拢！

::: {.film src="002-pairwise-born"}
**两子丈量：从一对箭头到玻恩权重（1 分 26 秒）。** 两支相隔 $60^\circ$ 的箭头由平行四边形的两条对角线读出夹角（[@thm-parallelogram-norm-law]）；让 $A$ 自己当轴，垂足 $C$ 成了 $B$ 落在 $A$ 上的青色影子 $\cos\theta$；把影子从 $[-1, 1]$ 压进 $[0, 1]$，就是权重 $\cos^2(\theta/2)$（[@thm-born-modulus-square]）；只有平方能让快门与它的补分完全部权重（[@thm-born-probability-skeleton]）；最后环境记下分支，箭头缩成球内竖轴上的一截短线（[@thm-nonselective-marginal]）。
:::
