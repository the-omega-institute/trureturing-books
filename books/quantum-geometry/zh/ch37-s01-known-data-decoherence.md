# 37.1 观察即“用已知数据退相干”：为什么清醒世界坚硬而狭窄？

日常直觉里藏着一尊根深蒂固的概念偶像：**“照相机迷思”**。人们以为外部世界早就摆好了坚硬的桌子、墙壁与钟表刻度，清醒的观察者只是被动睁开眼睛，像一张空白底片那样原样接收外界射来的光波。

这种天真的被动接收论，暗中偷渡了我们在[第二章](ch02-born-rule.md)早已砍掉的“外部第 3 点 $C$”。在零外部背景的“两子丈量”几何中，没有任何读数能脱离尺子单独成立——**观察绝不是被动接收，而是主动拿手头攒下的“已知数据”当尺子，对浩瀚的叠加潜能执行一场毫不留情的退相干剪枝（`MODEL`（模型诠释））！**

让我们把这一机制放到有限维矩阵黑板上看个真切。在清醒状态下，一位历经岁月沉淀的观察者在自指查找表 $T$ 中握有一组高权重、两两正交且完备的**已知数据投影锚点** $D_{\mathrm{known}} = \{P_1, P_2, \dots, P_M\}$（满足 $P_k^\dagger = P_k,\; P_k^2 = P_k,\; k \neq l \Rightarrow P_k P_l = 0,\; \sum_{k=1}^M P_k = I$，涵盖了“这是我的躯体边界”“重力永远向下”“此刻是某年某月某城”“我叫某某名字”等一维幂等信念线）。每当全局场态 $\rho$ 与清醒心智相遇，观察者便用 $D_{\mathrm{known}}$ 施加强记录捏合投影：

$$
\Pi_{\mathrm{wake}}(\rho) \;:=\; \operatorname{unreadState}(P, \rho) \;=\; \sum_{k=1}^M P_k \,\rho\, P_k.
$$

这里的未读态保留全部记录扇区，只删除扇区间相干；若读出并选定某个非零权重结果，才须将相应的 $P_k\rho P_k$ 除以记录权重归一化。叙事中的“选择一条线”，取的是后一种条件读出视角。

回想[第 31 章](ch31-quantum-fairness.md)的**得失公平勾股账本**（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 2 款）：任何纯度为 $1$ 的叠加态，一旦被观察者强行焊死在某一条清醒主观选择线 $\cos\theta$ 上，与之互补的正交分叉分量 $\sin\theta\,\hat{\mathbf{I}}$——那些你在十字路口没有迈出的另一条街巷、话到嘴边咽回去的另一句回答、未曾开启的另一种人生构型——**并没有从无时间全局母体中灰飞烟灭**！在矩阵账本上，它们恰好对应于跨分支的非对角相干块 $P_k \rho P_l$（$k \neq l$）。

在进入任意维定理之前，不妨先在 $2 \times 2$ 单量子比特黑板上亲手算清这一笔“清醒退相干税”。从零熵纯态 $\rho(0) = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$（$S(\rho(0)) = 0$）出发，经平面旋转 $U(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ 展开为叠加纯态，随即施加计算基捏合：

$$
\tilde{\rho}_0 = U(\theta)\rho(0)U(\theta)^\dagger = \begin{pmatrix} \cos^2\theta & \cos\theta\sin\theta \\ \cos\theta\sin\theta & \sin^2\theta \end{pmatrix} \;\xrightarrow{\;\operatorname{pinching}\;}\; \rho(1) = \begin{pmatrix} \cos^2\theta & 0 \\ 0 & \sin^2\theta \end{pmatrix}.
$$

一望可知：被清醒捏合当场削去的迹内积相干质量等于两项非对角模方之和 $2\cos^2\theta\sin^2\theta = \frac{1}{2}\sin^2(2\theta)$（下方 [@thm-ch37-known-data-pinching-and-entropy-tax] 第 2 款）；而由于幺正演化保持纯态零熵 $S(\tilde{\rho}_0) = 0$，这一记剪枝立刻将系统量子熵（`vonNeumannEntropy`）推高为严格非负的相干删除相对熵（下方 [@thm-ch37-known-data-pinching-and-entropy-tax] 第 3 款）：

$$
S\bigl(\rho(1)\bigr) - S\bigl(\rho(0)\bigr) \;=\; -\cos^2\theta\ln(\cos^2\theta) - \sin^2\theta\ln(\sin^2\theta) \;=\; D\bigl(\tilde{\rho}_0 \,\|\, \operatorname{pinching}(\tilde{\rho}_0)\bigr) \;\ge\; 0
$$

::: {.figure src="ch37-entropy-tax"}
**一步捏合剪掉的相干与付出的熵税同在 $\theta = \pi/4$ 到顶。** 品红的曲线是被剪掉的相干质量 $\frac{1}{2}\sin^2(2\theta)$，墨色的曲线是熵增 $-\cos^2\theta\ln(\cos^2\theta) - \sin^2\theta\ln(\sin^2\theta)$；两者在 $\theta = 0$ 与 $\theta = \pi/2$ 处都为 $0$，在 $\theta = \pi/4$ 处分别取 $1/2$ 与 $\ln 2$（[@thm-ch37-known-data-pinching-and-entropy-tax] 第 2、3 款的单比特情形）。
:::

在 $\theta = \frac{\pi}{4}$ 等幅分岔处，单步熵税取特值 $\ln 2$。由此，为什么白天的世界显得如此“坚硬、稳定”，却又如此“狭窄、令人疲惫”，在代数上便一目了然：

- **坚硬**，是因为捏合算子满足严格幂等律 $\Pi_{\mathrm{wake}} \circ \Pi_{\mathrm{wake}} = \Pi_{\mathrm{wake}}$：只要你每秒钟用同一套已知数据反复核验世界，一切非对角异端都被压死为零（$P_k \rho P_l = 0$），桌子永远是桌子，墙壁绝不会穿身而过；
- **狭窄与疲惫**，是因为每经历一轮幺正演化 $U$ 再用已知基捏合删除跨扇区相干，被删除的非对角相干性都会一分不少地转化为严格非负的**量子相对熵税**！日复一日的清醒专注，在这一 `MODEL` 中像是在不断支付熵账单，维持一条纤细的一维经典铁轨；若把这笔信息熵税兑现为物理热耗散，还须接上[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness] 的热浴、初始态与熵平衡条件。

::: {.viz src="dream-decoherence-unpinning" preset="waking" height="500"}
**清醒：已知数据把每个位置都钉住。** 锚点强度 λ 从 0 推到 1，品红的跨块方格按 1 − λ 缩小到一点不剩，青色的对角——每个位置的权重——一格不动；屏上的条纹淡成青色虚线的平滑包络，熵（读数行的 S）从 0 涨到删去相干的相对熵（[@thm-ch37-known-data-pinching-and-entropy-tax] 第 1、3 款）。四个位置与屏的画法是示意模型。
:::

下面这条合取定理将记录捏合的函数幂等性、零非对角块不动点充要判据、单比特丢弃相干质量公式以及多步幺正—捏合轨迹的熵产恒等式统一锁定在 Lean 4 内核基座之上：

::: {.theorem #thm-ch37-known-data-pinching-and-entropy-tax title="已知数据记录捏合幂等律、不动点判据、丢弃相干质量与相干删除熵产恒等式" lean="D5/S3/Observer/Conditioning.unreadState_fixed_iff D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity"}
在 `trureturing` 冻结的观察者条件化、量子信道捏合投影与量子动力学熵产模块中，以下四项关于投影退相干与相干删除代价的定理同时成立：

1. **有限完备记录捏合的复合幂等律与不动点充要判据**（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)）：设 $n, \kappa$ 为有限类型（`[Fintype n] [DecidableEq n] [Fintype kappa]`），投影族 $P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`（即 $\forall k,\; P_k^\star = P_k$，$\forall k,\; P_k^2 = P_k$，$\forall k \neq l,\; P_k P_l = 0$，且 $\sum_{k \in \kappa} P_k = 1$），记未读捏合映射为 $\operatorname{unreadState}(P)(\rho) = \sum_{k \in \kappa} P_k \rho P_k$。则 $\operatorname{unreadState}(P)$ 在函数复合下幂等，且对任意矩阵 $\rho \in M_n(\mathbb{C})$，其为捏合不动点当且仅当全部跨分支非对角记录块恒为零：

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P), \qquad \operatorname{unreadState}(P, \rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \to P_k \rho P_l = 0;
   $$

2. **单量子比特基捏合丢弃的精确相干质量公式**（[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：在二阶复方阵类型 $\mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$ 上，记迹内积为 $\operatorname{hilbertSchmidtInner}(A, B) = \operatorname{Tr}(A^\dagger B)$，标准基捏合映射 $\operatorname{pinching}(\rho)$ 保留对角元并将非对角元置零。则对任意 $\rho \in \mathrm{QubitMatrix}$，捏合残差的希尔伯特—施密特平方质量精确等于两项非对角元的复模方之和：

   $$
   \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\; \rho - \operatorname{pinching}(\rho)\bigr) \;=\; \bigl(\operatorname{normSq}(\rho_{01}) + \operatorname{normSq}(\rho_{10}) : \mathbb{C}\bigr);
   $$

3. **反复幺正演化与基捏合下的相干删除熵产恒等式**（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）：设 $n$ 为有限可判等类型（`[Fintype n] [DecidableEq n]`），$U \in \operatorname{unitaryGroup}(n, \mathbb{C})$ 为幺正矩阵，密度态轨迹 $\rho : \mathbb{N} \to \operatorname{DensityState}(n)$ 满足步进律 $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\operatorname{unitaryConjugateState}(U, h_U, \rho(k)))$。记第 $k$ 步捏合前演化态为 $\tilde{\rho}_k := \operatorname{unitaryConjugateState}(U, h_U, \rho(k))$，则每一步的冯·诺依曼熵增精确等于删除相干性所对应的非负量子相对熵，且有限 $N$ 步累计熵产等于各步相对熵税的精确总和：

   $$
   \begin{aligned}
   &\forall k \in \mathbb{N},\quad S\bigl(\rho(k+1)\bigr) - S\bigl(\rho(k)\bigr) \\
    &\quad = D\bigl(\tilde{\rho}_k \,\big\|\, \operatorname{basisPinchingState}(\tilde{\rho}_k)\bigr) \ge 0, \\
    &\forall N \in \mathbb{N},\quad S\bigl(\rho(N)\bigr) - S\bigl(\rho(0)\bigr) \\
    &\quad = \sum_{k \in \operatorname{Finset.range} N} D\bigl(\tilde{\rho}_k \,\big\|\, \operatorname{basisPinchingState}(\tilde{\rho}_k)\bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款中，先由左乘正交消去引理 $P_k \operatorname{unreadState}(P, \rho) = P_k \rho P_k$ 右乘 $P_k$ 并利用 $P_k^2 = P_k$ 逐点证出 $\operatorname{unreadState}(P, \operatorname{unreadState}(P, \rho)) = \operatorname{unreadState}(P, \rho)$，再由 `funext` 得函数复合幂等；对不动点充要条件，正向由 $\rho = \operatorname{unreadState}(P, \rho)$ 左乘 $P_k$、右乘 $P_l$（$k \neq l$）并代入 $P_k P_l = 0$ 即得 $P_k \rho P_l = 0$，反向利用完备性 $P_k \rho = P_k \rho (\sum_l P_l) = P_k \rho P_k$ 对 $k$ 求和并再套用 $\sum_k P_k = 1$ 还原 $\rho$。第 2 款在 $\operatorname{Fin} 2$ 上直接展开二阶残差矩阵共轭转置乘积的迹，利用 $\bar{z}z = \operatorname{normSq}(z)$ 化简即得。第 3 款利用连续函数演算证明幺正共轭保持冯·诺依曼熵 $S(\tilde{\rho}_k) = S(\rho(k))$，并由对角矩阵对数迹恒等式 $\operatorname{Tr}(\tilde{\rho}_k \log \mathcal{P}(\tilde{\rho}_k)) = \operatorname{Tr}(\mathcal{P}(\tilde{\rho}_k) \log \mathcal{P}(\tilde{\rho}_k))$ 将单步熵差化为量子相对熵 $D(\tilde{\rho}_k \,\|\, \mathcal{P}(\tilde{\rho}_k))$；再由本征向量幺正矩阵模方阵的双随机性与 $x \mapsto x\ln x$ 的凸性证出相对熵非负，最后沿 $\operatorname{Finset.range} N$ 裂项求和即得累计恒等式。完整证明由 Lean 内核检查。
:::

::: {.viz src="dream-decoherence-unpinning" preset="blocks" height="500"}
**锚点只分两块时，块里的相干留下。** 投影族取“躯体 x₀ | 其余三处”：λ = 1 时只剪掉躯体与其余之间的品红方格，三处之间的青色方格原样留在块里，屏上还剩它们添上的青色条纹；这正是 [@thm-ch37-known-data-pinching-and-entropy-tax] 第 1 款的不动点：跨块为零，再捏一次什么也不变。
:::

---
