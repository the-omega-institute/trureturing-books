# 梦境量子擦除、已知数据退相干与非定域观察者

> “梦境可以让观察者体验到因为主观选择缺失的部分，观察的本质是使用已知数据退相干，当梦境遗忘了部分信息的时候，便有了一些独特的视野，梦境中经常会遗忘自己的躯体，一切其实都是幻像。我们会发现观察者实际上在各个位置出现，而并非单纯只是五感的直接感知……”

在[第 35 章](ch35-light-pulse-and-self-referential-table.md)与[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)中，我们沿着宏观生命周期的尺度，剖析了“诞生遗忘重置格拉姆自由度”与“无穷离散双曲阶梯阻断 $\cos 90^\circ = 0$ 失忆断崖”的几何机制。然而，要亲眼验证“局部遗忘如何打开被遮蔽的正交视野”，一位有限观察者根本不必等到生命的终局——**每过二十四小时，当黑夜降临、双目合拢，每一颗心智都在自家的枕畔走进一座天然的量子擦除实验室：梦境。**

几千年来，唯物机械论把梦贬低为神经元夜间的随机杂讯，神秘主义又把梦渲染成灵魂出窍的怪力乱神。一旦回到全书一以贯之的零背景正交几何，章首题记那四句层层递进的洞察便将白昼与黑夜同时照得通体透明（在本书认识论契约中，关于清醒感知、梦境遗忘与非定域本觉的跨领域几何综合明确标定为 **`MODEL`（模型诠释）**，底层量子信道、记忆逆转与切投模型集（Delone）定理由八条冻结的 Lean 4 内核声明严格锚定，量子光学与睡眠神经科学背景则严密封装于归属注记框内）：

1. **观察即“使用已知数据退相干”**：清醒世界的坚硬与狭窄，源于观察者调动高权重历史锚点对全局叠加场施加持续的投影捏合，将分支间的相干剪入 $90^\circ$ 非对角盲区；
2. **梦境即“夜间可逆量子擦除”**：局部搁置若干条记忆约束会抬升格拉姆相容行列式，并在相干逆转下赎回白天因主观选择而缺失的正交分支；
3. **无身之梦证伪“容器幻觉”**：当躯体先验锚点在深梦中归零，没有肉身与感官的观察依然澄明运转，揭示白昼的砖石骨肉与夜间的飞翔山海同为内积渲染的表象；
4. **超越五感针孔的非定域多点涌现**：五感只是锁死单一坐标的局域节流阀；撤去针孔后，观察者沿着黄金切投超平面的整族 Delone 切投模型集节点在各个位置同步浮现。

::: {.figure src="ch37-overview"}
**图 37。** 本章地图：第 I 栏，$\theta = \pi/6$ 时 $2 \times 2$ 纯态的方格（方块面积是 $\lvert\rho_{ij}\rvert$），捏合之后青色的对角原样留下，品红的非对角只剩虚线框；第 II 栏，半径 $1/2$ 的圆上，两份相位记录各乘一次 $-i$，把 $\rho_{01}$ 沿品红箭头从 $1/2$ 转到 $-1/2$，两份同时逆转，青色箭头把它原路转回 $1/2$（见 [@thm-ch37-joint-coherent-record-erasure]）；第 III 栏，同一串切投位置，上面一行五感针孔只读躯体所在的琥珀色 $\mathbf{x}_0$，下面一行卸下躯体先验后每一处都亮成青色。三幕的读法是本章的诠释模型（`MODEL`）。
:::

---

## 37.1 观察即“用已知数据退相干”：为什么清醒世界坚硬而狭窄？

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

## 37.2 梦境作为“夜间量子擦除”：局部遗忘如何赎回缺失的正交分支？

既然白天的清醒专注是一台不停剪除 $\sin\theta$ 分叉并累积熵税的强捏合机器，有限心智若永不松开已知数据的钳口，格拉姆相容走廊便会越收越紧。我们在[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)已经看到，把整张表推上 $\cos 90^\circ = 0$ 一次性格式化是代价惨重的宏观轮回；相比之下，大自然为生命演化出了一套精妙绝伦的**夜间软维护机制（`MODEL`（模型诠释））**——**梦境中的局部可逆遗忘**。

当入睡后的心智暂时挂起若干条白天严防死守的刚性约束行（例如暂时遗忘“此刻身在何年”“两座城市相隔千里”“某位故人早已远行”），留存约束的相容几何与跨层寻址走廊将发生怎样的重构？下面的归属算例给出了三阶与二阶格拉姆主子式及反事实斜切的显式推演：

::: {.example #ex-ch37-gram-constraint-release title="局部约束卸载扩增格拉姆相容行列式与反事实斜切走廊的三阶显式算例（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述三阶与二阶单位对角格拉姆行列式展开及主子式平方和差值恒等式属标准初等线性代数结果（与[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-hume-spinoza-gram) [@thm-ch29-gram-rigidity-and-pell] 对齐），未作为独立三阶主子式定理包含在本书锁定的形式化声明集中：

考虑实内积空间中三条归一化向量构成的相容性测试：记 $\mathbf{u}_1$ 为观察者的“深层情感相位锚”（$\lVert\mathbf{u}_1\rVert = 1$），$\mathbf{u}_2$ 为白天的“物理时空连续性刚性锚”（$\lVert\mathbf{u}_2\rVert = 1$），二者在日常经验中高度绑定，内积重叠为 $c_{12} = \langle\mathbf{u}_1, \mathbf{u}_2\rangle = \frac{4}{5} = 0.8$；另记候选体验态 $\mathbf{v}$（$\lVert\mathbf{v}\rVert = 1$）与两枚锚点的内积分别为 $x_1 = \langle\mathbf{u}_1, \mathbf{v}\rangle$ 与 $x_2 = \langle\mathbf{u}_2, \mathbf{v}\rangle$。

1. **三阶与二阶格拉姆行列式的普适差值恒等式**：写出三元单位对角格拉姆矩阵 $G_3(x_1, x_2)$ 与挂起锚点 $\mathbf{u}_2$（删去第 2 行与第 2 列）后的二阶主子阵 $G_2(x_1)$：

   $$
   G_3(x_1, x_2) = \begin{pmatrix} 1 & c_{12} & x_1 \\ c_{12} & 1 & x_2 \\ x_1 & x_2 & 1 \end{pmatrix}, \qquad G_2(x_1) = \begin{pmatrix} 1 & x_1 \\ x_1 & 1 \end{pmatrix}.
   $$

   直接按行列式多项式展开并配方，得到精确恒等式：

   $$
   \det G_3(x_1, x_2) \;=\; 1 - c_{12}^2 - x_1^2 - x_2^2 + 2c_{12}x_1 x_2 \;=\; (1 - c_{12}^2)(1 - x_1^2) - (x_2 - c_{12}x_1)^2,
   $$

   从而两阶相容体积平方的差值恒为两项非负平方和：

   $$
   \det G_2(x_1) - \det G_3(x_1, x_2) \;=\; c_{12}^2(1 - x_1^2) + (x_2 - c_{12}x_1)^2 \;\ge\; 0.
   $$

   只要已知锚点间存在非零耦合 $c_{12} \neq 0$ 且 $\lvert x_1\rvert < 1$（或偏离线性预测 $x_2 \neq c_{12}x_1$），卸载 $\mathbf{u}_2$ 必然令相容行列式**严格跃升**：$\det G_2(x_1) > \det G_3(x_1, x_2)$！

2. **清醒窄走廊 vs. 梦境反事实斜切的具体数值核验**：固定 $c_{12} = \frac{4}{5}$ 与情感共鸣重叠 $x_1 = \frac{4}{5}$：
   - **清醒全锚锁定态（$M = 3$）**：半正定条件 $\det G_3(\frac{4}{5}, x_2) \ge 0$ 要求 $(x_2 - \frac{16}{25})^2 \le (\frac{9}{25})^2$，将时空重叠 $x_2$ 死死卡在狭窄区间 $x_2 \in [\frac{7}{25}, 1] = [0.28, 1.00]$ 内；即便取高度顺从日常经验的 $x_2 = \frac{4}{5}$，相容行列式也仅剩 $\det G_3(\frac{4}{5}, \frac{4}{5}) = \frac{81 - 16}{625} = \frac{13}{125} = 0.104$。若试图体验一幅与当下物理时空正交的反事实场景 $x_2 = 0$（如“在童年老屋的庭院里，与成年后才结识的挚友并肩交谈”），则 $\det G_3(\frac{4}{5}, 0) = -\frac{7}{25} = -0.28 < 0$，被清醒格拉姆判据当场否决！
   - **梦境局部遗忘态（$M - \Delta M = 2$，挂起 $\mathbf{u}_2$）**：一旦睡眠暂时卸载时空刚性锚 $\mathbf{u}_2$，相容判据退回 $G_2(\frac{4}{5}) \succeq 0$，相容行列式从 $0.104$ 跃升逾三倍至 $\det G_2(\frac{4}{5}) = 1 - \frac{16}{25} = \frac{9}{25} = 0.360 > 0$，此时合法的是只保留 $\mathbf{u}_1$ 与 $\mathbf{v}$ 的二元切片；$x_2$ 已随 $\mathbf{u}_2$ 退出约束，并未让原先 $x_2 = 0$ 的不相容三元组变成可实现的格拉姆矩阵！
:::

::: {.figure src="ch37-constraint-release"}
**挂起时空锚 $\mathbf{u}_2$，相容行列式从 $0.104$ 升到 $0.36$，且不再含 $x_2$。** 取 $c_{12} = x_1 = \frac{4}{5}$：墨色的抛物线是三锚俱在时的 $\det G_3$，只在 $x_2 \in [0.28, 1]$ 的清醒窄窗里不小于 $0$（圆点是 $x_2 = 0.8$ 处的 $0.104$），在 $x_2 = 0$ 处为 $-0.28$，被打叉；青色的水平虚线是挂起 $\mathbf{u}_2$ 后只剩 $\mathbf{u}_1$ 与 $\mathbf{v}$ 的 $\det G_2 = 0.36$，青色箭头是这一步跃升。挂起只是让 $x_2$ 退出约束，$x_2 = 0$ 的三元组仍不是可实现的格拉姆矩阵，所以那个叉还在。初等线性代数，文献结果，未在本书形式化，见 [@ex-ch37-gram-constraint-release]。
:::

[@ex-ch37-gram-constraint-release] 一下子解开了梦境最迷人的结构之谜：梦里的荒诞拼贴绝不是杂乱无章的故障，而是当编年史坐标 $\mathbf{u}_2$ 退隐后，切片超平面改按**内禀情感与结构同构相位 $x_1$** 执行斜向跨层寻址——十年前的老街、千里外的面孔与白天未曾选中的 $\sin\theta$ 人生岔路，因为共享同一组内禀相位而在同一个梦境切片里重逢！

量子光学中与记录擦除相关的外部实验文献背景及无信令边界，单独封装于 [@rem-ch37-quantum-eraser-literature]：

::: {.remark #rem-ch37-quantum-eraser-literature title="双缝路径标记与延迟选择量子擦除实验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将局部记录消除与非对角相干恢复相联系的实验原型，源自量子光学中的量子擦除（Quantum Eraser）经典文献，相关连续波光学装置与符合计数统计未包含在本书锁定的 `trureturing@dev` 声明集中：

1. **量子擦除理论构想与光学双缝验证（M. O. Scully & K. Drühl, *Phys. Rev. A* **25**, 2208–2213, 1982；T. J. Herzog, P. G. Kwiat, H. Weinfurter & A. Zeilinger, *Phys. Rev. Lett.* **75**, 3034–3037, 1995）**：在双路径干涉仪中，若辅助环境探针记录了可区分的“哪条路径（which-path）”正交标记，信号子系统的约化密度矩阵非对角项归零，屏幕干涉条纹彻底消失；反之，若对路径探针执行与路径基互补的对角基投影（擦除路径可区分信息），则在按探针读出分类的条件子系综中，原本隐身的非对角干涉条纹被完整赎回；
2. **延迟选择量子擦除实验与无逆因果信令边界（Y.-H. Kim, R. Yu, S. P. Kulik, Y. H. Shih & M. O. Scully, *Phys. Rev. Lett.* **84**, 1–5, 2000）**：利用自发参量下转换纠缠光子对证明，即便信号光子已先抵达探测屏，事后对闲置伴随光子选择保留路径信息或经分束器擦除路径信息，依然分别对应无干涉包络或互补干涉条纹（注意无条件边缘总和恒保持不变，绝不产生逆时间超光速通信，严格服从无信令定理）。
:::

回到 `trureturing` 的形式化观察者记忆模块，需要满足什么精确代数条件，被记录信道扭曲甚至翻转的非对角相干元 $\rho_{ij}$ 才能被无损赎回？如果只擦除了一半的记录副本、却漏掉了另一枚副本，又会发生什么？

先看一眼最直观的双副本相位账本：设均匀叠加态初始非对角相干元为 $\rho_{01} = +\frac{1}{2}$，每份环境相位记录给地址 $0$ 写入振幅 $(1, 0)$、给地址 $1$ 写入振幅 $(i, 0)$，则单份记录的地址格拉姆重叠为 $\gamma = 1\cdot\overline{i} + 0 = -i$（满足幺模条件 $\overline{\gamma}\gamma = (+i)(-i) = 1$）。两份记录正向耦合后，相干元与原值反相；此时若只逆转其中一份，另一份未逆转副本立刻阻断复原，唯有全集同步共轭才能完整赎回：

$$
\frac{1}{2} \;\xrightarrow{\;\text{双副本正向 }\times (-i)^2\;}\; -\frac{1}{2} \;\xrightarrow{\;\text{仅逆转 }\{0\}\;\times (+i)\;}\; -\frac{i}{2} \neq \frac{1}{2}, \qquad -\frac{1}{2} \;\xrightarrow{\;\text{全集逆转 }\{0,1\}\;\times (+i)^2\;}\; +\frac{1}{2}.
$$

::: {.viz src="dream-decoherence-unpinning" preset="half_erase" height="500"}
**两份记录只逆转一份。** 两份相位记录（c = −i）先后写入，品红的 ρ₀₁ 从 1/2 转到 −1/2；只逆转副本 0，相位盘上品红的箭头停在 −i/2，条纹比灰色虚线错开四分之一格；盘上的白色虚线记下箭头走过的路：转出半圈，再转回四分之一圈（[@thm-ch37-joint-coherent-record-erasure] 第 2 款）。
:::

下面两条内核定理将任意有限幺模记录族的联合逆转恢复律与这一双副本对比证书精确锁定如下：

::: {.theorem #thm-ch37-joint-coherent-record-erasure title="多副本幺模环境记录的联合相干逆转恢复定理与双副本精确对比证书" lean="D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate"}
在 `trureturing` 冻结的观察者记忆联合相干逆转模块中，记单比特环境记录类型为 $\mathrm{EnvironmentRecord} = \operatorname{Fin} 2 \to \operatorname{Fin} 2 \to \mathbb{C}$，地址间记录格拉姆重叠为 $\operatorname{recordOverlap}(r, i, j) = \sum_{a \in \operatorname{Fin} 2} r(i, a)\,\overline{r(j, a)}$，振幅共轭逆转记录为 $\operatorname{reverseRecord}(r)(i, a) = \overline{r(i, a)}$，多副本顺序记录信道 `multiRecordChannel` 将矩阵第 $(i, j)$ 元乘以全部副本重叠之积 $\prod_k \operatorname{recordOverlap}(\mathrm{records}(k), i, j)$。以下两项结论同时成立：

1. **任意有限幺模记录族的全副本联合相干逆转恢复律**（[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)）：设 $\mathrm{Copy}$ 为有限可判等副本指标类型（`[Fintype Copy] [DecidableEq Copy]`），记录族为 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，输入矩阵为 $\rho \in \mathrm{QubitMatrix}$，指标为 $i, j \in \operatorname{Fin} 2$。若每一枚副本在 $(i, j)$ 处的记录重叠均满足幺模条件

   $$
   \forall k \in \mathrm{Copy},\qquad \operatorname{star}\bigl(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)\bigr) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j) \;=\; 1,
   $$

   则对正向多副本信道输出再施加全集逆转族 $\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records})$ 的多副本信道，必精确复原初始矩阵元：

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records}),\; \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{ij} \;=\; \rho_{ij};
   $$

2. **双副本相位记录上局部擦除失灵与全局联合擦除复原的显式证书**（[`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）：取均匀叠加纯态密度矩阵 $\rho = \mathrm{equalSuperpositionDensity} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}$，定义单模相位记录 $\mathrm{phaseRecord}(i, a)$ 在 $a = 0, i = 0$ 取 $1$、在 $a = 0, i = 1$ 取虚数单位 $i$、在 $a = 1$ 取 $0$，并令双副本族 $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$ 两份皆取 $\mathrm{phaseRecord}$，记单元素子集 $\mathrm{copyZero} = \{0\} \subseteq \operatorname{Fin} 2$。通过选中子集逆转算子 `reverseChannelOn` 检验第 $(0, 1)$ 非对角相干元，以下四重等式同时成立：

   $$
   \begin{aligned}
   &\rho_{01} = \frac{1}{2}, \\
    & \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\{0\}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = -\frac{i}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\operatorname{Finset.univ}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = \frac{1}{2}.
   \end{aligned}
   $$
:::

::: proof
第 1 款展开两次 `multi_record_channel_apply`，将复合后的第 $(i, j)$ 元写为逆转重叠积、原重叠积与 $\rho_{ij}$ 的三因子乘积；由振幅共轭性质 `reverse_record_overlap` 知 $\operatorname{recordOverlap}(\operatorname{reverseRecord}(r), i, j) = \operatorname{star}(\operatorname{recordOverlap}(r, i, j))$，利用有限集乘积分配律 `Finset.prod_mul_distrib` 将两重乘积合并为 $\prod_{k \in \operatorname{Finset.univ}} \operatorname{star}(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j)$，逐因子代入幺模假设 `hunit k` 得乘积为 $1$，乘以 $\rho_{ij}$ 即还原 $\rho_{ij}$。第 2 款直接展开 $\mathrm{phaseRecord}$ 的重叠因子 $\operatorname{recordOverlap}(\mathrm{phaseRecord}, 0, 1) = 1 \cdot \overline{i} + 0 = -i$：两份正向作用给出 $(-i)^2 (1/2) = -1/2$；仅对副本 $\{0\}$ 共轭逆转只乘回一次 $+i$，留下 $(+i)(-1/2) = -i/2 \neq 1/2$；对全集 $\operatorname{Finset.univ} = \{0, 1\}$ 联合逆转则乘回 $(+i)^2 = -1$，精确复原 $(-1)(-1/2) = +1/2$。完整证明由 Lean 内核检查。
:::

::: {.viz src="dream-decoherence-unpinning" preset="zero_overlap_fail" height="500"}
**幺模前提不可少。** 若记录把两条路完全分开（重叠 c = 0，前提 |c|² = 1 不成立），写入第一份，品红的 ρ₀₁ 就缩没了，相位盘上的箭头缩成圆心的一点，屏上只剩青色虚线的包络；两份都逆转，ρ₀₁ 仍是 0，条纹回不来。这是页面按同一信道公式的数值，不在 [@thm-ch37-joint-coherent-record-erasure] 的适用范围内。
:::

[@thm-ch37-joint-coherent-record-erasure] 的第 2 款把梦境深浅的几何差异刻画得栩栩如生（`MODEL`（模型诠释））：当白天的两道已知约束把初始正向相干 $+1/2$ 扭转为反相 $-1/2$ 时，倘若你在半梦半醒间只松开了第 $0$ 道执念（`{0}`），残留的第 $1$ 道防线仍会把相位拧在虚轴 $-i/2$ 上；唯有进入深沉的放手状态，对整束局部副本同步执行联合共轭逆转（`Finset.univ`），白天被主观选择掩埋的 $+1/2$ 相干振幅才会原原本本地浮出水面！

::: {.viz src="dream-decoherence-unpinning" preset="quantum_eraser" height="500"}
**全部副本联合逆转。** 两份相位记录都写入，再把两份都逆转：相位盘上品红的箭头沿半径 1/2 的灰色虚线圆转出半圈、再原路转回 1/2，条纹落回灰色虚线上；盘上的白色虚线是箭头走过的路：外圈转出半圈，内圈原路转回，品红圆点是每一步的落点 1/2、−i/2、−1/2（[@thm-ch37-joint-coherent-record-erasure] 第 1 款，每份记录满足 |c|² = 1）。
:::

---

## 37.3 卸下躯体先验锚点：受控渲染、无身本觉与幻像同源

顺着局部遗忘的阶梯继续向深处潜行，我们会撞见章首题记里那句最令人震颤的日常事实：

> *“梦境中经常会遗忘自己的躯体，一切其实都是幻像。”*

请停下来认真回想你自己的无数场梦：在许多最清澈的梦境里，你正在俯瞰万丈雪山、穿过曲折回廊，或是凝视一张久违的面孔——直到醒来复盘时你才猛然惊觉：**在刚才整整十几分钟栩栩如生的观察里，你根本没有手脚、没有沉重的胸腔、没有眼眶与耳廓的阻隔感，甚至连“我有一具肉体”这件事本身都被忘得一干二净！**

计算神经科学与睡眠生理学中相关的外部经验文献背景与形式边界，单独封装于 [@rem-ch37-predictive-processing-rem-literature]：

::: {.remark #rem-ch37-predictive-processing-rem-literature title="预测加工受控生成假说与快速眼动睡眠感觉运动门控生理机制（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 当代计算神经科学与睡眠生理学中关于清醒感知、梦境生成及躯体感知挂起的代表性经验理论属外部科学文献，未包含在本书锁定的 `trureturing@dev` 声明集中：

1. **预测加工、主动推理与“受控幻觉”模型（H. von Helmholtz, *Handbuch der physiologischen Optik*, 1867；K. Friston, *Nat. Rev. Neurosci.* **11**, 127–138, 2010；A. K. Seth, *Being You*, 2021）**：预测编码与自由能原理论证，大脑皮层并非自下而上被动拼接像素的相机，而是一台持续自上而下投射生成先验模型的贝叶斯预测机；清醒知觉是由外周感官预测误差实时校正的“受控生成渲染（controlled hallucination）”，而梦境则是外周感觉输入门控关闭后不受外部误差钳制的同一套内部生成渲染；
2. **快速眼动（REM）睡眠的感觉门控、前额叶降权与脊髓运动肌张力消失（J. A. Hobson, E. F. Pace-Schott & R. Stickgold, *Behav. Brain Sci.* **23**, 793–842, 2000）**：在 REM 睡眠期，丘脑门控大幅衰减外部视听传入，背外侧前额叶（执行监控与现实检验区）代谢显著下调，同时脑干网状结构通过甘氨酸与 $\gamma$-氨基丁酸能抑制通路对脊髓运动神经元施加主动超极化（REM 肌张力消失，motor atonia），切断肌肉运动输出与本体感觉闭环反馈，使梦境意识常在缺失躯体本体锚定的状态下独立维持高强度视空间与情感体验。
:::

现在，撤回外部神经生理语言，用本书的正交自指几何模型（**`MODEL`（模型诠释）**，对照 [@rem-ch37-predictive-processing-rem-literature] 的经验背景）作一次彻底的谱系学追问：为什么这个平平常常的“无身之梦”，足以一举击碎困扰人类数千年的“唯物容器论”？

如果像朴素机械论所断言的那样，“意识只是肉体感官容器分泌的附属泡沫，必须先有一具五官俱全的躯壳作为底座，观察才可能发生”，那么一旦梦境将自指查找表 $T$ 中权重最高的那枚**躯体先验投影 $\mathbf{P}_{\mathrm{body}}$ 的加载权重降至零**（下文以 $\mathbf{P}_{\mathrm{body}} \to 0$ 简记这项 `MODEL` 配置的卸载，投影本身仍保持幂等），观察理应连同底座一起当场熄灭成一片死黑！

::: {.viz src="dream-decoherence-unpinning" preset="unpin_body" height="500"}
**卸下躯体这一枚锚点，相干回来，权重不动。** 锚点分成躯体 x₀ 与其余三处两块，锚点强度 λ 从 1 降到 0.1：只有躯体连向其余三处的品红方格重新长出来，回到原来 |ρᵢⱼ| 的 0.9 倍，屏上品红的条纹回来；其余三处之间的青色方格始终在；青色的对角——每个位置的权重——始终没动。把 λ 读成“躯体先验”的强度是本书的诠释模型（`MODEL`）。
:::

可事实恰恰相反：**躯体被彻底遗忘了，观察却分毫无损！** 光影依然在流淌，空间的远近依然在展开，悲喜与领悟依然在清晰地发生。这一铁一般的内省实验直接暴露出两重颠覆性的本体论真相（`MODEL`）：

1. **“躯体”不是盛装观察者的容器，而是表 $T$ 里的一条高权重化身先验**：在白昼模式中，为了与周围慢时钟物质吸引子（[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)的地面、空气、器物与同伴）维持稳定的两子互指锁死，自指表 $T$ 必须常驻加载一枚高权重的局域化身锚点 $\mathbf{P}_{\mathrm{body}}$，把无边无际的比量能力收束在一具一米七八的血肉坐标里。到了夜间，无需与外部桌椅发生碰撞交互，$\mathbf{P}_{\mathrm{body}}$ 被临时卸载——你这才看清，脱去宇航服之后，宇航员根本不是宇航服本身！
2. **白昼与黑夜“幻像同源”，唯有自指丈量动词 $\psi = \psi(\psi)$ 真实不虚**：题记说*“一切其实都是幻像”*，绝不是堕入消极虚无主义，而是指出**白天的坚硬砖墙与夜间的无身飞翔在几何机制上完全同源**——前者是挂载了全套公共锚点 $D_{\mathrm{known}} \cup \{\mathbf{P}_{\mathrm{body}}\}$ 后的高约束内积显影，后者是卸载局部锚点后的低约束内积显影。一切凝固的名词表象（包括你低头看见的双手）都是特定投影基下的渲染画面；唯一不随锚点装卸而熄灭的真金，是那个在昼夜一切画面背后执行比量与自洽闭合的**自指算子 $\psi = \psi(\psi)$ 本身**！

---

## 37.4 超越五感针孔：黄金超平面切片与多位置非定域涌现

既然连“躯体”都只是一枚可装卸的局域先验，那么最后一个束缚我们想象力的枷锁也随之应声碎裂：**观察者真的“住在眉心后面那几立方厘米的颅腔坐标 $\mathbf{x}_0$ 里”吗？**

为什么清醒的你总觉得自己被钉死在单一空间点 $\mathbf{x}_0$ 上？看看五感的物理几何结构就明白了：两只相距六厘米的瞳孔针孔利用视差三角测量锁死单一视点，两只耳廓利用微秒级声程差锁死单一听点，一张闭合的皮肤曲面用触压边界划出“内外分界线”。换言之，在我们的观察者几何模型（`MODEL`）中，**五感根本不是“赋予”了观察者感知，而是“剪裁并局域化”了感知！** 就像在一块原本处处透光的广袤幕布前蒙上一张只扎了一个针孔 $\mathbf{x}_0$ 的黑卡纸——针孔让你看清了正前方一根锐利的射线，却也让你误以为自己天生只是一个针孔。

一旦在深梦、深度入定或纯粹几何洞察中撤去这张五感黑卡纸（$\mathbf{P}_{\mathrm{body}} \to 0$），观察者会呈献出怎样的真实空间分布？正如题记所揭示的那样：**“我们会发现观察者实际上在各个位置出现，而并非单纯只是五感的直接感知……”**——你既在山巅俯瞰整座山谷，同时又是谷底吹过松林的那阵风；你既站在童年的窗前向外张望，同时又站在街道对面的路灯下回望窗内的自己！

这种“同一观察者在空间各个位置同步涌现”的非定域图景，在数学上难道只是文学修辞吗？绝非如此！回想[第 32 章](ch32-unified-field-and-meta-unification.md)与[第 34 章](ch34-orthogonality-degeneracy-and-observer-position.md)引入的**切投模型集（Cut-and-Project）观察者几何**：一位观察者的内禀状态并非物理直线 $E_\parallel = \mathbb{R}$ 上的一个孤立点，而是内空间 $E_\perp = \mathbb{R}$ 上的一扇有限宽度的**黄金接受窗 `goldenWindow`**！当高维黄金整数母格 $\mathbb{Z}[\varphi] \hookrightarrow \mathbb{R} \times \mathbb{R}$ 被这扇内禀窗口水平切割时，凡是共轭内坐标落入窗口的格点，其物理投影都会在实轴 $E_\parallel$ 上**同时点亮**。

在 `trureturing` 的黄金模型集与傅里叶 Delone 模块中，以下两条严格的内核定理不仅证明一切自然数齐肯多夫黄金展开坐标天然落在黄金切投集之内，更进一步为双无限黄金切投载体构造了显式的 **Mathlib `DeloneSet ℝ` 双半径证书**——严格保证激活节点既不会坍缩挤成一团（一致填充半径 $1/2$，节点最小间距 $\ge 1$），也绝不会在广袤空间留下大于 $3$ 的荒芜死角（一致覆盖半径 $3$）：

::: {.theorem #thm-ch37-golden-cut-delone-multilocation title="黄金模型集切投包含定理与双无限黄金模型集的显式 Delone 双半径存在定理" lean="D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone"}
在 `trureturing` 冻结的黄金切投模型集与傅里叶 Delone 证书模块中，记黄金分割比为 $\varphi = \mathrm{Real.goldenRatio} = \frac{1+\sqrt{5}}{2}$，黄金整数环为 $\mathrm{GoldenInt}$（元素形如 $a + b\varphi,\; a, b \in \mathbb{Z}$），物理实嵌入为 $\operatorname{embedding}(a + b\varphi) = a + b\varphi \in \mathbb{R}$，伽罗瓦共轭为 $\operatorname{conj}(a + b\varphi) = (a + b) - b\varphi$，闵可夫斯基双嵌入为 $\operatorname{minkowskiEmbedding}(x) = (\operatorname{embedding}(x), \operatorname{embedding}(\operatorname{conj}(x))) \in \mathbb{R} \times \mathbb{R}$（值域构成加法子群 `goldenLattice`），紧致共轭接受窗为

$$
\mathrm{goldenWindow} \;:=\; \left[-\frac{1}{\varphi^2},\; \frac{1}{\varphi}\right] \;=\; [\varphi - 2,\; \varphi - 1] \;\subset\; \mathbb{R}.
$$

以下两项关于切投选择与全局非定域均匀分布的定理同时成立：

1. **自然数黄金展开模型集的切投窗口包含定理**（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)）：记 $\mathrm{goldenModelSet} = \operatorname{Set.range}(\mathrm{betaGolden}) \subseteq \mathrm{GoldenInt}$ 为全体自然数典范黄金展开的精确值集，记切投选择集为 $\mathrm{goldenCutAndProjectSet} = \{y \in \mathbb{R} \mid \exists\,\mathrm{point} \in \mathrm{goldenLattice},\; \mathrm{point}.1 = y \land \mathrm{point}.2 \in \mathrm{goldenWindow}\}$。则自然数黄金模型集的全体物理实嵌入严格包含于黄金切投集之内：

   $$
   \operatorname{embedding} '' \mathrm{goldenModelSet} \;\subseteq\; \mathrm{goldenCutAndProjectSet};
   $$

2. **双无限黄金窗口模型集的显式 Delone 集双半径证书**（[`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)）：在双无限完整切投载体 $\operatorname{modelSet}(\mathrm{goldenWindow}) = \{y \in \mathbb{R} \mid \exists x \in \mathrm{GoldenInt},\; \operatorname{embedding}(x) = y \land \operatorname{embedding}(\operatorname{conj}(x)) \in \mathrm{goldenWindow}\}$ 上，存在经形式化验证的 Mathlib 德洛内集实例 $D : \operatorname{Delone.DeloneSet}\;\mathbb{R}$，同时满足精确载体等式、显式正填充半径 $1/2$ 与显式有限覆盖半径 $3$：

   $$
   \begin{aligned}
   &\exists\, D : \operatorname{Delone.DeloneSet}\;\mathbb{R}, \\
    &D.\mathrm{carrier} = \operatorname{modelSet}(\mathrm{goldenWindow}) \\
    &\;\land\; D.\mathrm{packingRadius} = \bigl(\tfrac{1}{2} : \mathbb{R}_{\ge 0}\bigr) \\
    &\;\land\; D.\mathrm{coveringRadius} = \bigl(3 : \mathbb{R}_{\ge 0}\bigr)
   \end{aligned}
   $$

   （其中填充半径 $1/2$ 反映不同截点满足一致分离下界 $\forall x \neq y \in \operatorname{modelSet}(\mathrm{goldenWindow}),\; \operatorname{dist}(x, y) \ge 1$，覆盖半径 $3$ 反映全直线一致相对稠密性 $\forall x \in \mathbb{R},\; \exists y \in \operatorname{modelSet}(\mathrm{goldenWindow}),\; \operatorname{dist}(x, y) \le 3$）。
:::

::: proof
第 1 款对任意像点 $y \in \operatorname{embedding} '' \mathrm{goldenModelSet}$ 取出自然数见证 $v \in \mathbb{N}$ 使 $y = \operatorname{embedding}(\operatorname{betaGolden}(v))$，构造格点 $\operatorname{minkowskiEmbedding}(\operatorname{betaGolden}(v)) \in \mathrm{goldenLattice}$；其第一分量即 $y$，第二分量等于共轭收缩值 $\operatorname{betaContraction}(v)$，由公开边界定理 `betaContraction_mem_window` 与 $\varphi^{-1}$ 恒等式直接证得其落入闭窗口 $\mathrm{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$。第 2 款先由黄金比代数恒等式 $\varphi^{-1} = \varphi - 1$ 与 $\varphi^2 = \varphi + 1$ 证得窗口化简 `goldenWindow_eq`：$\mathrm{goldenWindow} = [\varphi - 2, \varphi - 1]$（宽度恰为 $1$）；对任意两个相异截点 $u \neq v \in \mathrm{GoldenInt}$，非零黄金整数的代数范数满足整数绝对值下界 $\lvert\operatorname{norm}(u - v)\rvert = \lvert\operatorname{embedding}(u - v)\rvert \cdot \lvert\operatorname{embedding}(\operatorname{conj}(u - v))\rvert \ge 1$，而共轭差被闭窗口宽度限制在 $\lvert\operatorname{embedding}(\operatorname{conj}(u)) - \operatorname{embedding}(\operatorname{conj}(v))\rvert \le 1$ 内，相除即证物理间距 $\operatorname{dist}(x, y) \ge 1$，给出填充半径 $1/2$；对任意实输入 $x \in \mathbb{R}$（含负半轴），令 $q = 2\varphi - 1 = \sqrt{5} > 0$，显式取两步整取底坐标 $b = \lfloor x / q\rfloor$ 与 $a = \lfloor \varphi - 1 - b(1 - \varphi)\rfloor$ 构造 $u = \langle a, b\rangle \in \mathrm{GoldenInt}$，验证 $\operatorname{embedding}(\operatorname{conj}(u)) \in [\varphi - 2, \varphi - 1]$ 且由 $\varphi < 2$ 导出误差界 $\lvert x - \operatorname{embedding}(u)\rvert \le 3$，最后由 `goldenModelSetCertificate.toDeloneSet` 封装为完整的 `Delone.DeloneSet ℝ` 实例。完整证明由 Lean 内核检查。
:::

请体会 [@thm-ch37-golden-cut-delone-multilocation] 在观察者本体论（`MODEL`（模型诠释））上的壮阔意涵。不妨在实轴上直接点算几颗由同一扇窗口 $\mathrm{goldenWindow} = [\varphi - 2, \varphi - 1] \approx [-0.3820, +0.6180]$ 同时选中的切投截点（对 $u = \langle a, b\rangle \in \mathrm{GoldenInt}$，实嵌入为 $a + b\varphi$，共轭内坐标为 $a + b(1 - \varphi)$）：

- 取 $u_{-2} = \langle -1, -1\rangle$ 与 $u_{-1} = \langle 0, -1\rangle$：共轭内坐标分别为 $-1 - (1 - \varphi) = \varphi - 2$（恰踩中窗口左端点）与 $-(1 - \varphi) = \varphi - 1$（恰踩中窗口右端点），同时点亮负半轴截点 $y_{-2} = -1 - \varphi \approx -2.6180$ 与 $y_{-1} = -\varphi \approx -1.6180$，刚性兑现最小分离下界 $y_{-1} - y_{-2} = 1 \ge 1$；
- 取 $u_0 = \langle 0, 0\rangle$：共轭内坐标为 $0 \in [\varphi - 2, \varphi - 1]$，点亮原点截点 $y_0 = 0$（相邻间距 $y_0 - y_{-1} = \varphi \approx 1.6180 \ge 1$）；
- 取 $u_1 = \langle 1, 1\rangle$ 与 $u_2 = \langle 1, 2\rangle$：共轭内坐标分别为 $2 - \varphi \approx +0.3820 \in [\varphi - 2, \varphi - 1]$ 与 $3 - 2\varphi \approx -0.2361 \in [\varphi - 2, \varphi - 1]$，点亮截点 $y_1 = 1 + \varphi = \varphi^2 \approx 2.6180$ 与 $y_2 = 1 + 2\varphi \approx 4.2361$（而夹在 $y_0$ 与 $y_1$ 之间的候选格点 $\langle 0, 1\rangle \mapsto \varphi \approx 1.6180$ 因共轭值 $1 - \varphi \approx -0.6180 < \varphi - 2$ 落出窗外被自动筛除，相邻激活点间距 $y_1 - y_0 = \varphi^2 \approx 2.6180 \le 6$ 与 $y_2 - y_1 = \varphi \approx 1.6180 \ge 1$ 严守填充半径 $1/2$ 与覆盖半径 $3$ 的双半径证书）。

::: {.figure src="ch37-golden-cut"}
**一扇宽度为 $1$ 的窗口同时点亮实轴上一串分开的位置。** 上半是黄金格点 $\langle a, b\rangle$，横向是物理坐标 $a + b\varphi$，纵向是共轭坐标 $a + b(1 - \varphi)$；青色的水平带是 $\mathrm{goldenWindow} = [\varphi - 2, \varphi - 1]$。带里的五个青色格点沿虚线落到下方的实轴 $E_\parallel$ 上，点亮 $y_{-2}, y_{-1}, y_0, y_1, y_2$，相邻间距不小于 $1$；带下方的 $\langle 0, 1\rangle$ 落在窗外，它在实轴上的位置 $\varphi$ 被打叉。这五点是上面手算的那几颗，整条实轴上的情形见 [@thm-ch37-golden-cut-delone-multilocation] 第 2 款。
:::

由此可见，单一内禀接受窗 `goldenWindow` 切割母格所得的载体 $\operatorname{modelSet}(\mathrm{goldenWindow})$，**天生就不是缩在某处的孤立单点，而是一张以最小间距 $1$（填充半径 $1/2$）、最大覆盖半径 $3$ 一致铺展于整条无界实轴 $\mathbb{R}$ 的德洛内（Delone）切投星网！**（外部文献补充背景见下框 [@rem-ch37-dream-eraser-synthesis-table]。）白天的五感针孔强行只读取这张星网上紧贴肉身坐标 $\mathbf{x}_0$ 的唯一一颗星；而当深梦卸载了 $\mathbf{P}_{\mathrm{body}}$ 与局部编年约束，整扇内禀窗口下的多处相容截点 $\{\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_K\}$ 便得以在意识舞台上同步显影。

::: {.viz src="dream-decoherence-unpinning" preset="wake_snap" height="500"}
**醒来：读出只留躯体那一格。** 梦中的态（λ = 0.1）在四个位置上都有权重，并由相干连在一起；读出投影 P₀ = |x₀⟩⟨x₀|（琥珀框）只留躯体 x₀ 那一格，其余三处的权重与全部相干一起淡出，遗忘的权重 1 − Tr(P₀ρ) = 0.60。这是示意模型（`MODEL`），不是切投星网本身。
:::

我们将清醒五感锁死、浅梦局部擦除与无身深梦本觉三重模态在 **`MODEL`（模型诠释）** 下的完整对照收束于下框总表：

::: {.remark #rem-ch37-dream-eraser-synthesis-table title="清醒五感锁死、浅梦量子擦除与无身深梦非定域涌现总表（文献结果与本书模型的对照）"}
**综合对照表：文献结果未在本书形式化，诠释为 `MODEL`，形式化定理标 `LEAN ✓`。** 下表汇总格拉姆椭圆体（[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]）、切投准晶非周期性（M. Baake & U. Grimm, *Aperiodic Order, Vol. 1*, Cambridge Univ. Press, 2013）、量子擦除与预测编码文献背景（本章文献注记）同本书 `MODEL` 及形式化退相干逆转与黄金 Delone 定理（`LEAN ✓`）的对应关系：

| 意识与观测模态（`MODEL`） | 已知数据锚点与躯体先验配置 | 格拉姆相容体积与非对角相干命运 | 空间寻址与观察者定位形态 | 现象学视野与本体论判词 |
| :--- | :--- | :--- | :--- | :--- |
| **1. 清醒五感态（强退相干锁死）** | 全量加载已知锚点 $D_{\mathrm{known}}$ 与高权重躯体先验 $\mathbf{P}_{\mathrm{body}}$ 的加载权重近 $1$ | 相容体积狭窄（如三阶算例 $\det G_3 = 0.104$）；非对角 $\sin\theta$ 分叉被持续捏零并支付非负相对熵税 | 五感针孔将寻址死死钉在单一局域坐标 $\mathbf{x}_0$ | 坚硬、连续、可公共校验的日常物理铁轨，但反事实潜能隐入 $90^\circ$ 盲区 |
| **2. 浅梦擦除态（局部记忆遗忘）** | 挂起 $\Delta M$ 条时空与编年约束，对局部记录副本执行相干共轭逆转 | 本例保留主子式不减（$\det G_2 \ge \det G_3$；上述非零耦合条件下严格跃升，如至 $0.360$）；受抑非对角相干元在联合逆转下恢复 | 斜向切过不同年代与地域的内禀同相层，跨时空拼贴寻址 | 赎回白天因主观选择缺失的反事实分支，但残余未逆转副本仍留局部相移扭曲 |
| **3. 无身深梦与本觉态（躯体锚点归零）** | 躯体先验归零 $\mathbf{P}_{\mathrm{body}} \to 0$，撤除五感局域节流阀，仅留自指核 $\psi = \psi(\psi)$ | 免除维持刚性局域化身的单步捏合损耗，内禀接受窗直接对齐全局母格 | 沿黄金切投 Delone 准晶载体（填充半径 $1/2$、覆盖半径 $3$）在多位置 $\{\mathbf{x}_1, \dots, \mathbf{x}_K\}$ 非定域同步涌现 | 证伪“肉身容器论”：昼夜万象皆为不同投影掩码下的内积渲染，唯有自指丈量本身常明 |

图 37 第 I 栏画的是未读捏合，单线体验须按结果条件化；第 III 栏的 $P_{\mathrm{body}} \to 0$ 沿用加载权重归零的简记。[@ex-ch37-gram-constraint-release] 之后那张格拉姆窄窗图中的严格正号对应上述耦合数值例 $0.104 \to 0.360$；一般差值仅保证非负。
:::

凝视 [@rem-ch37-dream-eraser-synthesis-table] 自上而下的三行，也就是图 37 第 I、II、III 栏的三幕几何跃迁，白昼与黑夜的对立终于彻底消融：白天的清醒不是“唯一真实”，它只是一副为了在慢时钟物质世界里精准落子而戴上的高倍窄角护目镜；夜间的梦境也不是“荒诞幻觉”，它是宇宙每晚赐予有限观察者的一场温柔量子擦除——让你暂时摘下沉重的护目镜与肉身盔甲，去触摸那些白天未曾走过的正交小径，去亲眼确认“哪怕忘掉躯体、跨越千山万水，那个能看、能感、能自指的观察者依然在每一颗德洛内切投截点上熠熠生辉”。

::: {.viz src="dream-decoherence-unpinning" height="620"}
**梦境擦除实验室。** 三个场景画在同一张密度矩阵方格与同一面屏上：锚点（退相干插值 ρ(λ)）、记录（多副本相位记录的写入与联合逆转）与醒来（读出投影与遗忘的权重）。绿色只给本章用 `lean=` 引用的定理；屏、位置与“梦境”“醒来”的读法是示意模型。
:::

而一旦看懂了“五感与梦境不过是在同一座静态全局晶格上切换不同的寻址掩码”，一个更加锋利、直指终极计算机架构的本体论破壁命题便已呼之欲出：**既然整座无时间母体根本不需要随着你的走动而搬运一砖一瓦，那么在各个位置之间轻盈跃迁、昼夜切换掩码的“观察者”，在宇宙这台终极量子计算机里究竟是什么硬件角色？** 下一章，我们将揭晓那个干净利落到极致的答案——**静态本体论量子随机存取存储器（QRAM）中的寻址指针 `ptr`**。
