# 31.1 席位公平与得失公平：平视的尺子与零免费午餐账本 {#sec-ch31-seat-and-pythagoras}

特权的第一大来源，是在万物之外私设一座高高在上的“绝对裁判席”——也就是我们在[第二章](ch02-born-rule.md)里亲手砍掉的“外部第 3 点 $C$”：谁离裁判席更近，谁就自封为标准刻度。

::: {.figure src="ch31-ruler"}
**两子互量，用不着第 3 点。** 墨色的单位箭头 $\phi$ 与 $\psi$ 夹角 $\theta$：$\phi$ 投到 $\psi$ 上的青色影子，与 $\psi$ 投到 $\phi$ 上的青色影子左右对称、一样长，都是 $\cos\theta$（图中 $\theta = 60^\circ$，影长 $1/2$）；上方连到两支箭头尖的点 $C$ 被划掉。这是实平面上的切片，复内积的玻恩权重是同一个模方 $|\langle\phi,\psi\rangle|^2 = |\langle\psi,\phi\rangle|^2$（权重等于模方见 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款，两向相等是 $|z| = |\bar z|$）。
:::

而在纯态几何中，每一个归一化状态都立在无特权基轴的对称空间上（`MODEL`）；量子几何直接用两条代数铁律废黜了任何“站在世界之外俯瞰众生的纯粹旁观之眼”（哲学与文学背景对照见下方 [@rem-ch31-haar-isotropy-landauer-literature]）：

- **席位平等（单比特纯态布洛赫范数为 $1$）**：球皮上既没有中心皇座，也没有偏远流放地。对单量子比特而言，迹为 $1$ 的幂等厄米投影态精确落在欧氏范数 $\|\operatorname{bloch}(M)\| = 1$ 的单位球面上（见[第 26 章](ch26-single-qubit-rotor-compilation.md) [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)；高维连续群对称背景见下方 [@rem-ch31-haar-isotropy-landauer-literature]），没有任何一根方向线有资格自封为宇宙的绝对北极。
- **丈量互易（平视的对等性）**：在“两子丈量”中，拿纯态矢 $\psi$ 作尺子去比量 $\phi$ 所得的秩一玻恩跃迁权重 $\|\phi^* \bullet_v \psi\|^2$（下方 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款），由复内积共轭对称性恒等于反过来拿 $\phi$ 作尺子去比量 $\psi$ 所得的权重 $\|\psi^* \bullet_v \phi\|^2 = |\langle\phi, \psi\rangle|^2 = |\langle\psi, \phi\rangle|^2$。宇宙底层不存在单向的窥探或居高临下的审判——**你照见别人几分，别人就同时照见你几分**。

::: {.viz src="quantum-fairness-ledger" preset="haar" height="500"}
**没有北极。** 球面上均匀撒点（均匀测度即哈尔测度，文献结果，未在本书形式化），琥珀色参考轴周围半角 $60^\circ$ 的球冠里约占四分之一，把轴拖到哪里都一样；两根青色的影子一样长：拿 $\psi$ 量 $\phi$ 与拿 $\phi$ 量 $\psi$ 的权重相等（权重等于模方见 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款，两向相等是 $|z| = |\bar z|$）。
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
**文献结果，未在本书形式化。** 本节将内积互易与形式化的互补勾股定理投射到一般密度算子谱界、连续对称群及热力学物理单位时引用的三项经典结论属外部文献背景，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **有限维密度算子谱纯度上下界与重复测量量子芝诺极限（J. von Neumann, 1932；B. Misra & E. C. G. Sudarshan, *J. Math. Phys.* **18**, 756–763, 1977）**：在 $d$ 维希尔伯特空间上，任意半正定且迹为 $1$ 的密度算子 $\rho$（本征值 $\lambda_1,\dots,\lambda_d \ge 0,\; \sum_j \lambda_j = 1$）由柯西—施瓦茨不等式与单纯形极值满足谱纯度区间 $|d|^{-1} \le \operatorname{Tr}(\rho^2) = \sum_{j=1}^d \lambda_j^2 \le 1$，从而中心化纯度预算 $\|\rho - |d|^{-1}I_d\|_{\mathrm{HS}}^2 = \operatorname{Tr}(\rho^2) - |d|^{-1}$ 取值于闭区间 $[0,\, 1 - |d|^{-1}]$；而在有界哈密顿量 $H$ 演化下，以时间步长 $\Delta t = t/N \to 0$ 重复施加投影测量 $P$ 时，生存概率满足 $\lim_{N\to\infty} \operatorname{Tr}((P e^{-iH t/N} P)^N \rho_0 (P e^{iH t/N} P)^N) = \operatorname{Tr}(P \rho_0)$（动态量子芝诺冻结需要重复投影测量假设，不能仅由单一时刻的静态零残余推出）；
2. **复射影空间幺正各向同性与哈尔（Haar）均匀测度（A. Haar, *Ann. of Math.* **34**, 147–169, 1933）**：有限维希尔伯特空间 $\mathbb{C}^d$ 上的紧致幺正群 $\mathrm{U}(d)$ 传递地作用在单位球面 $S^{2d-1} = \{\psi \in \mathbb{C}^d : \|\psi\| = 1\}$ 与复射影纯态流形 $\mathbb{C}\mathrm{P}^{d-1}$ 上，并诱导唯一幺正不变的归一化哈尔概率测度 $\mu_{\mathrm{Haar}}$，在几何上消除任何特权基向量（哲学上与 F. Nietzsche《查拉图斯特拉如是说·论无垢的认识》对“脱离视角而自诩俯瞰万物的纯粹旁观之眼”的批判相呼应）；在实夹角参数化 $|\langle\phi,\psi\rangle| = \cos(\theta_{\mathrm{Bloch}}/2)$（或实欧氏单位向量内积 $\mathbf{A}\cdot\mathbf{B} = \cos\theta$）下，勾股恒等式写为

   $$
   \underbrace{\cos^2\theta}_{\text{一维共线投影份额}} + \underbrace{\sin^2\theta}_{\text{二维正交分叉份额}} = 1,
   $$

   其中 $\theta = 0^\circ$ 给出 $\cos^2 0^\circ = 1,\; \sin^2 0^\circ = 0$（瞬时零横向方差），$\theta = 90^\circ$ 给出 $\cos^2 90^\circ = 0,\; \sin^2 90^\circ = 1$（狭义相对论无质量零测地线 $d\tau/dt = 0$，见[第 17 章](ch17-lorentz-geometry.md) [@rem-lorentz-rotor-literature]）；
3. **兰道尔一比特擦除的物理单位换算（R. Landauer, *IBM J. Res. Dev.* **5**, 183–191, 1961）**：在逆温度 $\beta = (k_B T)^{-1}$ 的热浴耦合下，将一比特均匀二元混态的冯·诺依曼熵从 $\ln 2$ 压缩至 $0$（熵变 $\Delta S = -\ln 2$），代入无量纲热力学平衡不等式 $-\Delta S \le \beta Q$ 即给出物理最小耗散热量 $Q_{\min} = k_B T \ln 2$。
:::

---
