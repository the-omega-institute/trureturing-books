# 梦境量子擦除、已知数据退相干与非定域观察者

> “梦境可以让观察者体验到因为主观选择缺失的部分，观察的本质是使用已知数据退相干，当梦境遗忘了部分信息的时候，便有了一些独特的视野，梦境中经常会遗忘自己的躯体，一切其实都是幻像。我们会发现观察者实际上在各个位置出现，而并非单纯只是五感的直接感知……”

在[第 35 章](ch35-light-pulse-and-self-referential-table.md)与[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)中，我们沿着宏观生命周期的尺度，剖析了“诞生遗忘重置格拉姆自由度”与“无穷离散双曲阶梯阻断 $\cos 90^\circ = 0$ 失忆断崖”的几何机制。然而，要亲眼验证“局部遗忘如何打开被遮蔽的正交视野”，一位有限观察者根本不必等到生命的终局——**每过二十四小时，当黑夜降临、双目合拢，每一颗心智都在自家的枕畔走进一座天然的量子擦除实验室：梦境。**

几千年来，唯物机械论把梦贬低为神经元夜间的随机杂讯，神秘主义又把梦渲染成灵魂出窍的怪力乱神。一旦回到全书一以贯之的零背景正交几何，章首题记那四句层层递进的洞察连同“选择未来与既视感预编译”推论便将白昼与黑夜同时照得通体透明（在本书认识论契约中，关于清醒感知、梦境遗忘、非定域本觉与既视感快表命中的跨领域几何综合明确标定为 **`MODEL`（模型诠释）**，底层量子信道、记忆逆转、切投模型集（Delone）、正交逃逸与信息逃逸新颖度定理由十七条冻结的 Lean 4 内核声明严格锚定，量子光学、计算机体系结构与睡眠及认知神经科学背景则严密封装于归属注记框内）：

1. **观察即“使用已知数据退相干”**：清醒世界的坚硬与狭窄，源于观察者调动高权重历史锚点对全局叠加场施加持续的投影捏合，将分支间的相干剪入 $90^\circ$ 非对角盲区；
2. **梦境即“夜间可逆量子擦除”**：局部搁置若干条记忆约束会抬升格拉姆相容行列式，并在相干逆转下赎回白天因主观选择而缺失的正交分支；
3. **无身之梦证伪“容器幻觉”**：当躯体先验锚点在深梦中归零，没有肉身与感官的观察依然澄明运转，揭示白昼的砖石骨肉与夜间的飞翔山海同为内积渲染的表象；
4. **超越五感针孔的非定域多点涌现**：五感只是锁死单一坐标的局域节流阀；撤去针孔后，观察者沿着黄金切投超平面的整族 Delone 切投模型集节点在各个位置同步浮现；
5. **选择未来而非看见未来与既视感快表命中**：梦境在编年史时间戳挂起时将先行逻辑超前去相干预编译；当醒后未触发高新颖度流水线冲刷而沿同一把逻辑尺重投影时，零新增捏合熵与空时间戳共同碰撞出既视感。

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

::: {.example #ex-ch37-gram-constraint-release title="局部约束卸载扩增格拉姆相容行列式与反事实斜切走廊的三阶显式算例（已形式化）" lean="D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff"}
**已形式化。** `trureturing@dev` 已冻结三锚点格拉姆矩阵、其行列式展开，以及行列式严格为正当且仅当三向量线性无关的精确声明（[`threeAnchorGram`](lean:D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram)、[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)、[`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)）。下述走廊数值是单位锚点与 $c_{12}=x_1=4/5$ 的特例；Lean 覆盖格拉姆恒等式与独立性判据，梦境诠释仍属于模型应用。

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
**挂起时空锚 $\mathbf{u}_2$，相容行列式从 $0.104$ 升到 $0.36$，且不再含 $x_2$。** 取 $c_{12} = x_1 = \frac{4}{5}$：墨色的抛物线是三锚俱在时的 $\det G_3$，只在 $x_2 \in [0.28, 1]$ 的清醒窄窗里不小于 $0$（圆点是 $x_2 = 0.8$ 处的 $0.104$），在 $x_2 = 0$ 处为 $-0.28$，被打叉；青色的水平虚线是挂起 $\mathbf{u}_2$ 后只剩 $\mathbf{u}_1$ 与 $\mathbf{v}$ 的 $\det G_2 = 0.36$，青色箭头是这一步跃升。挂起只是让 $x_2$ 退出约束，$x_2 = 0$ 的三元组仍不是可实现的格拉姆矩阵，所以那个叉还在。行列式恒等式与正性边界由 [@ex-ch37-gram-constraint-release] 的三锚点冻结声明覆盖，图中数值是本章的应用。
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

而在把这座“同一静态晶格切换不同寻址掩码”的图景推进到下一章的宇宙硬件架构之前，前四节铺就的记录捏合与睡眠门控代数还顺手解开了人类日常意识经验中最扑朔迷离的一桩悬案：为什么清醒中的观察者偶尔会在某个陌生瞬间，撞上一股“这一幕我以前在梦里见过”的强烈既视感（Déjà Vu）？

---

## 37.5 选择未来而非看见未来：梦境前置逻辑超前去相干与既视感快表命中 {#sec-ch37-dream-pre-decoherence-deja-vu}

走完前四节从“清醒已知数据捏合”（§37.1）、“浅梦相位擦除”（§37.2）到“无身深梦与黄金切投非定域涌现”（§37.3–§37.4）的几何旅程，人类日常意识经验中最扑朔迷离、最容易被宿命论或神秘主义误读的一桩悬案，终于迎来了水落石出的时刻——**为什么一个人有时会在清醒现实的某个瞬间，猛然撞上一股毫无来由却异常笃定的“这一幕我以前在梦里见过”的既视感（Déjà Vu）？**

面对这一体验，传统解释长期分裂在两个极端之间：一端是宿命论式的“预知迷信”，幻想未来早已像一盘拍好的胶片那样封存在前方的铁轨上，而做梦的灵魂趁夜色偷偷翻看了明天的剧本；另一端则是把一切主观熟悉感简单归结为神经突触偶然串线的随机噪声。立足全书的无时间格拉姆相容几何（[第 29 章](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field)）、开放正交维度扩张（[第 31 章 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)）与本章的记录捏合代数，本书提出如下核心命题（完整原文同时载入[附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) `A73`）：

> *“实际上并不是观察者看到了未来，而是观察者选择了未来，既视感是因为之前的逻辑在梦境中去相干。”*

短短三句话，完成了一次从“宿命窥探”到“主动选基与投机预编译”的范式翻转。在本书严密的认识论契约下，我们将这一跨越量子算子代数、概念逃逸动力学、计算机体系结构与认知神经心理学的综合机制明确标定为本章的诠释沙盘 **`MODEL`（模型诠释，代号 `ORTHO//DEJAVU`）**：其中正交余项逃逸、可观测克雷洛夫秩增长上界、语境不动点分岔、正交补投影六恒等式、正算子格拉姆实现、信息逃逸唯一捕获与冲突修正非对易性等骨架定理由 `trureturing@dev` 冻结的 Lean 4 内核声明严格背书（`LEAN ✓`）；同轴重投影零新增熵专化、三向量格拉姆行列式区间与单比特布洛赫捏合公式标定为**手工推导**；延迟选择干涉、处理器分支预测与流水线冲刷、准晶帝国效应及既视感双加工/元认知心理学理论严格封装于**文献结果**注记框内；具体矩阵元、熵值与有限格点计数则标定为**数值计算（`NUM`）**。下面沿着命题自身的四环逻辑链条逐环展开。

### 37.5.1 破除“预知”迷思：开放正交余项锥、延迟选基与“选择未来” {#sec-ch37-p2g-open-choice}

为什么说“看见早已注定的唯一未来”在几何上从一开始就是一个伪命题？因为这一幻想暗中假设：有限观察者当前手头握有的那张有限子空间截面 $S$，已经把全部宇宙自由度封死在一只闭合铁盒里，盒外再无任何尚未落定的正交余项。

然而，`trureturing` 的量子代数、可观测克雷洛夫子空间动力学与语境不动点模块联手给出了截然相反的四重严格定理：只要当前已观测闭子空间 $S \subset V$ 尚未耗尽背景空间（$S^\perp \neq \{0\}$），盒外就必然矗立着到 $S$ 距离恒为 $1$、对 $S$ 投影恒为 $0$ 的单位正交逃逸方向；在任何固定的有限维背景空间 $V$ 内，单靠固定线性演化 $T$ 与固定读出算子 $C$ 所能生成的严格新维度步数被缺秩 $\dim V - \operatorname{rank} C$ 封顶；而在完全相同的底层文本与解释规则下，切换语境准入、背景与评估目标参数即可锁定截然相异的自洽不动点（对照[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md) [@thm-ch33-contextual-attractor-and-common-factor]）：

::: {.theorem #thm-ch37-p2g-open-escape-and-krylov title="非满闭子空间正交单位逃逸、有限维可观测克雷洛夫严格增长上界、语境参数分岔与正交补投影六恒等式" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
在 `trureturing` 冻结的量子代数投影逃逸、观察者记忆克雷洛夫动力学、概念解释不动点与正交补投影模块中，以下四项定理同时成立：

1. **非零正交余项下的单位逃逸向量存在性**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $\mathbb{K}$ 为实数或复数域（`[RCLike 𝕜]`），$V$ 为 $\mathbb{K}$ 上的完备内积空间，$S \le V$ 为闭子空间（`[IsClosed (S : Set V)]`），记 $P_S := S.\mathrm{starProjection}$ 为到 $S$ 的有界正交投影。**若**正交补非平凡（$S^\perp \neq \bot$），则存在单位逃逸向量 $e \in V$ 同时满足：

   $$
   e \in S^\perp \;\land\; \lVert e\rVert = 1 \;\land\; P_S e = 0 \;\land\; \operatorname{infDist}(e, S) = 1 \;\land\; \lVert \mathrm{id}_V - P_S\rVert = 1;
   $$

2. **有限维可观测克雷洛夫子空间链的严格增长步数上界**（[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)）：设 $V, Y$ 为 $\mathbb{K}$ 上的有限维内积空间，$T : V \to_{\mathbb{K}} V$ 与 $C : V \to_{\mathbb{K}} Y$ 为线性映射，定义第 $m$ 阶可观测克雷洛夫子空间为 $O_m := \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\{(T^*)^k C^* y \mid 0 \le k \le m,\; y \in Y\}$。则使子空间严格扩张的步数基数（`Set.encard`）受缺秩刚性限制：

   $$
   \operatorname{Set.encard}\{m \in \mathbb{N} \mid O_m < O_{m+1}\} \;\le\; \bigl(\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C) : \mathbb{N}\bigr);
   $$

3. **相同规则下切换语境参数选择不同不动点意义的显式见证**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)）：在二元解释语境类型 `BinaryInterpretationContext` 上，显式定义的基准语境 `baselineContext` 与替换语境 `alternateContext` 具有完全相同的底层文本与解释规则（`text` 与 `interpretationRule` 相等），但两者的读者准入（`readerAdmission`）、背景（`background`）与评估目标（`evaluationGoal`）三项参数两两不等，分别将二元不动点意义锁定在 $(0, 0, 0)$（即 `(false, false, false)`）与 $(1, 1, 1)$（即 `(true, true, true)`）上，且两不动点严格相异：$(0, 0, 0) \neq (1, 1, 1)$；

4. **闭子空间与正交补投影算子的完备六重代数恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $E$ 为 $\mathbb{K}$ 上的完备内积空间，$M \le E$ 为闭子空间，记连续线性算子 $P := M.\mathrm{starProjection}$ 与 $Q := M^\perp.\mathrm{starProjection}$，则以下六重算子恒等式同时成立：

   $$
   Q = \mathrm{id}_E - P, \quad P \circ_L P = P, \quad Q \circ_L Q = Q, \quad P \circ_L Q = 0, \quad Q \circ_L P = 0, \quad P + Q = \mathrm{id}_E.
   $$
:::

::: proof
第 1 款由非零余项假设 $S^\perp \neq \bot$ 取出非零向量 $v \in S^\perp$ 并按范数归一化为 $e = \lVert v\rVert^{-1} v \in S^\perp$，立得 $\lVert e\rVert = 1$ 与 $P_S e = 0$；对任意 $s \in S$，正交性给出勾股展开 $\lVert e - s\rVert^2 = \lVert e\rVert^2 + \lVert s\rVert^2 = 1 + \lVert s\rVert^2 \ge 1$，且在 $s = 0 \in S$ 处取等，故下确界距离 $\operatorname{infDist}(e, S) = 1$；算子 $\mathrm{id}_V - P_S = P_{S^\perp}$ 为非零正交投影，在 $e$ 上达到范数 $1$ 而对一切 $x$ 满足 $\lVert P_{S^\perp} x\rVert \le \lVert x\rVert$，故算子范数等于 $1$。第 2 款利用单调递增子空间链 $O_0 \le O_1 \le \cdots \le V$ 的维数单调性：首项 $O_0 = \operatorname{range}(C^*)$ 的维数等于 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$，每一次严格真包含 $O_m < O_{m+1}$ 至少使有限维数加 $1$，而总维数不超过 $\operatorname{finrank}_{\mathbb{K}} V$，故严格增长下标集合的基数至多为 $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$。第 3 款直接展开两显式二元语境记录与 `IsBinaryFixedMeaning` 的分量等式，逐项核验八条合取式。第 4 款由完备内积空间闭子空间的正交直和分解 $x = Px + Qx$ 给出 $P + Q = \mathrm{id}_E$ 与 $Q = \mathrm{id}_E - P$，再由值域归属 $Px \in M$、$Qx \in M^\perp$ 及核包含关系 $M^\perp \subseteq \ker P$、$M \subseteq \ker Q$ 得出各自幂等律与互正交消去律。完整证明由 Lean 内核检查。
:::

请留意 [@thm-ch37-p2g-open-escape-and-krylov] 的精确形式边界：第 1 款是在非零余项前提 $S^\perp \neq \bot$ 下的存在性定理，并不提供构造逃逸向量的算法，也不声称固定有限维空间内可无限扩张；第 2 款给出固定环境空间 $V$ 内可观测秩严格增长的有限上限，因此[第 31 章 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)的“开放维度扩张 $D \to D + 1$”要求显式扩展环境空间（属 `MODEL` 规则）；第 3 款在布尔解释语境上严格展示了“同一输入文本因语境参数切换而落入不同不动点”，将其映射到观察者在量子叠加态上的测量基选择则是本节的 `MODEL` 桥梁。

在单量子比特沙盘上，这道桥梁可以用最透明的数字手算核对（**手工推导，未作为独立声明在本书形式化**；小数为 `NUM`）：固定同一枚未经扰动的纯态输入 $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$（取默认倾角 $\theta = \pi/6$，对应布洛赫向量 $\mathbf{r} = (\sin 2\theta, 0, \cos 2\theta) = (\frac{\sqrt{3}}{2}, 0, \frac{1}{2})$）。此时宇宙并未替观察者预填唯一结果，而是取决于观察者选择哪一根测量轴 $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$ 构成互补正交投影对 $Q_\pm(\beta) = \frac{1}{2}(I \pm \mathbf{n}_\beta\cdot\boldsymbol{\sigma})$（满足第 4 款的 $Q_+ + Q_- = I$、$Q_\pm^2 = Q_\pm$ 与 $Q_+ Q_- = 0$）：

- 若观察者选定计算基轴 $\beta = 0$（$\mathbf{n}_0 = (0, 0, 1)$），正向结果权重为 $p_+(0) = \frac{1 + \mathbf{r}\cdot\mathbf{n}_0}{2} = \frac{3}{4} = 0.75$；
- 若观察者在同一输入态上改选横向轴 $\beta = \pi/2$（$\mathbf{n}_{\pi/2} = (1, 0, 0)$），正向结果权重当场改写为 $p_+(\pi/2) = \frac{1 + \sqrt{3}/2}{2} = \frac{2 + \sqrt{3}}{4} \approx 0.933013$！

与此同时，在三维实空间 $V = \mathbb{R}^3$ 的辅助内嵌图中，若当前已观测平面为 $S = \operatorname{span}(e_1, e_2)$，则正交轴 $e = e_3 \in S^\perp$ 精确兑现 $P_S e_3 = 0$ 与 $\lVert e_3\rVert = \operatorname{dist}(e_3, S) = \lVert I - P_S\rVert = 1$；取循环置换演化 $T(e_1) = e_2,\; T(e_2) = e_3,\; T(e_3) = e_1$ 与首坐标读出 $C(v) = v_1$，可观测克雷洛夫链依次为 $O_0 = \operatorname{span}(e_1)$、$O_1 = \operatorname{span}(e_1, e_3)$、$O_2 = \mathbb{R}^3$，维数按 $1 \to 2 \to 3$ 经历恰好 $2 = 3 - \operatorname{rank} C$ 次严格增长后触顶饱和。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="choose-context" height="500"}
**选基而非窥探：同一输入态在两把尺子下给出不同权重。** 输入纯态固定在 $\theta = \pi/6$，测量轴从 $\beta = 0$ 切到琥珀色当前选择 $\beta = \pi/2$ 时，正向读出权重由 $0.75$ 变为 $(2 + \sqrt{3})/4 \approx 0.9330$；一旁小图展示三维正交逃逸轴 $e_3 \in S^\perp$ 与克雷洛夫秩增长 $1 \to 2 \to 3$（[@thm-ch37-p2g-open-escape-and-krylov]）。把选基读作“选择未来截面”是本章的诠释模型（`MODEL`）。
:::

在物理学文献中，“较晚选定的测量装置决定哪一类统计问题成为现实、却绝不构成逆因果通信或宿命偷看”的思想原型，正是惠勒著名的延迟选择实验（与 §37.2 [@rem-ch37-quantum-eraser-literature] 互补）：

::: {.remark #rem-ch37-p2g-wheeler-delayed-choice-literature title="惠勒延迟选择双缝思想实验与非逆因果选基边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 约翰·阿奇博尔德·惠勒在经典论文（J. A. Wheeler, “The ‘Past’ and the ‘Delayed-Choice’ Double-Slit Experiment,” 载于 A. R. Marlow 编 *Mathematical Foundations of Quantum Theory*, Academic Press, 1978, pp. 9–48, DOI: `10.1016/B978-0-12-473250-6.50006-6`）中指出：在马赫—曾德尔干涉仪中，即便光子已经穿过第一块分束器进入双路径内部，实验者仍可在光子抵达终点前的最后一刻选择“撤走第二块分束器（测量哪条路径）”或“插入第二块分束器（测量双路径相对相位干涉）”。这一延迟设置决定的是**哪一组互斥的测量安排与统计分布得以实现**，既不向过去发送可控超光速信号，更不意味着实验者提前偷看了某条早已孤立写死的粒子轨迹。
:::

同样关键的是，在 §37.2 的多副本环境记录恢复定理（[@thm-ch37-joint-coherent-record-erasure]：[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal) 与 [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）中，当 $\theta = \pi/4$ 等幅叠加态的副对角元 $\rho_{01} = 1/2$ 经两份幺模相位记录（单份重叠 $\gamma = -i$，$\lvert\gamma\rvert^2 = 1$）写入后，复平面上的相干指针经历精确的四阶段离散轨迹 `1/2 → -1/2 → -i/2 → 1/2`：只逆转一份副本会停在 $-i/2$，两份全集逆转方能原路转回 $1/2$。但一旦环境写入的是完全正交的路径区分记录（重叠 $\gamma = 0$，违反幺模前提 $\lvert\gamma\rvert^2 = 1$），或者状态本身已经被局部捏合信道抹去了副对角元，单纯在局部施加共轭相位信道绝无可能无中生有地复原已被擦除的相干项。看清这条硬边界，正是理解下一小节“梦境前置去相干”如何落子的前提。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="unimodular-reversal" height="500"}
**幺模相位记录的四步逆转与零重叠禁区。** 在 $\theta = \pi/4$ 上，两份重叠为 $-i$ 的相位记录把 $\rho_{01}$ 从 $1/2$ 转到 $-1/2$；只逆转一份停在 $-i/2$，两份同逆才回到 $1/2$（[@thm-ch37-joint-coherent-record-erasure]）。若切换为零重叠路径记录，幺模前提失效，相干不可由该逆信道找回。
:::

### 37.5.2 之前的逻辑如何在梦境中超前去相干：感官门控卸载与投机幂等预编译 {#sec-ch37-p2g-dream-precompile}

既然不是“偷看未来”，那么命题后半句所说的**“之前的逻辑在梦境中去相干”**，在算子代数与系统架构上究竟发生了什么？

回看 §37.1 的清醒退相干方程（[@thm-ch37-known-data-pinching-and-entropy-tax]：[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)、[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 与 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：请注意区分**单个分支投影算子的幂等性** $Q_\pm(\beta)^2 = Q_\pm(\beta)$（[@thm-ch37-p2g-open-escape-and-krylov] 第 4 款）与**完备未读捏合信道的函数复合幂等性** $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)）。在白昼清醒态下，外周感官实时涌入海量预测误差，逼迫观察者在每一拍幺正演化 $U$ 之后都用沉重的物理与躯体锚点反复执行在线捏合，持续支付非负的相干删除相对熵税。

而当夜晚入睡、外周感觉输入门控与脊髓运动回路挂起时（参见 §37.3 [@rem-ch37-predictive-processing-rem-literature]），在我们的 **`MODEL`（模型诠释）** 中，观察者并没有停止运算——恰恰相反，卸下了高开销的外部实时 I/O 阻塞之后，心智内部早已积累成型的**“之前的逻辑”**（白天尚未走完的因果推演、深层目标倾角与人际结构先验，对应选定的测量轴 $\mathbf{n}_\beta$）得以像现代超标量处理器中的**分支预测与投机执行引擎**那样，在夜间的沙盘里超前跑完一轮完备未读捏合投影，将分叉叠加态 $\rho_{\mathrm{in}}$ 预先编译为关于该逻辑基块对角稳定的不动点截面 $\sigma_{\mathrm{dream}} = \Pi_\beta(\rho_{\mathrm{in}})$！相关计算机体系结构文献背景与严格区分如下：

::: {.remark #rem-ch37-p2g-speculative-execution-literature title="处理器分支预测、投机执行流水线冲刷与快表地址—上下文标签硬件规范（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将“梦境前置逻辑去相干、醒后新事实冲刷与既视感缓存命中”映射为体系结构原语（`MODEL`）时，所借用的硬件机制引自以下标准计算机体系结构文献，不代表生物神经元或量子熵之间存在已证实的物理等式：

1. **分支预测、投机执行与错误预测时的流水线冲刷（J. L. Hennessy & D. A. Patterson, *Computer Architecture: A Quantitative Approach*, 6th ed., Morgan Kaufmann, 2017，指令级并行与硬件推测执行章节）**：现代乱序超标量微处理器在条件分支结果尚未从慢速内存返回前，利用历史分支预测器（Branch Predictor）选定高概率路径并超前投机执行（Speculative Execution）后续指令，把计算结果暂存于重排序缓冲区；若后续真实条件验证通过，投机结果零重算开销直接退休提交；一旦验证发现分支预测失误，硬件立即触发**流水线冲刷（Pipeline Squash / Flush）**，作废投机结果并从正确分支重新取指执行；
2. **转译后备缓冲器（TLB）虚拟页地址标签与进程上下文标识符（Intel *64 and IA-32 Architectures Software Developer’s Manual*, Vol. 3A: *System Programming Guide*, “Translation Lookaside Buffers (TLBs)” 与 “Process-Context Identifiers (PCIDs)” 章节）**：以启用 PCID 的非全局 TLB 条目为例，一次合法命中不能仅凭有效位 `Valid = 1` 判定，还须匹配**虚拟页号（Address Tag）**与**当前 PCID**；全局 TLB 条目可跨 PCID 使用，其他缓存的标签规则则依具体架构而定。因此，§37.5.4 沙盘模型中的“缺失情景时间戳（`Time_Tag = NULL`）”绝不等于“无地址标签寻址”——模型仍严格核验地址标签与语境版本，缺失的仅仅是外显编年史时间戳元数据。
:::

让我们在单量子比特模型上把这笔“梦境首次预编译账”连同后续同轴复测与换轴重编的精确数值一次性算到底（**手工推导，未作为独立声明在本书形式化**；浮点值为 `NUM`）：对任意实倾角纯态 $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$（$0 \le \theta \le \pi/2$）与选定逻辑测量轴 $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$（$0 \le \beta < \pi$），完备未读捏合信道显式写为

$$
\Pi_\beta(\rho) \;=\; Q_+(\beta)\,\rho\,Q_+(\beta) + Q_-(\beta)\,\rho\,Q_-(\beta) \;=\; \frac{1}{2}\Bigl(I + (\mathbf{r}\cdot\mathbf{n}_\beta)\,\mathbf{n}_\beta\cdot\boldsymbol{\sigma}\Bigr),
$$

注意此处必须保留 $Q_+$ 与 $Q_-$ 两个正交分支之和（保迹且满足 $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$），绝不能用未归一化的单支 $Q_+\rho Q_+$ 冒充未读态。取默认参数 $\theta = \pi/6$、梦境前置逻辑基 $\beta = 0$：

$$
\rho_{\mathrm{in}} = \begin{pmatrix} 3/4 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/4 \end{pmatrix} \quad\xrightarrow{\;\Pi_0\;}\quad \sigma_{\mathrm{dream}} = \Pi_0(\rho_{\mathrm{in}}) = \begin{pmatrix} 3/4 & 0 \\ 0 & 1/4 \end{pmatrix}.
$$

在梦境完成这第一次去相干预编译的瞬间，两个副对角相干元（均为 $\sqrt{3}/4$）被当场剪除：按 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)，丢弃的希尔伯特—施密特平方相干质量为无量纲精确分数 $\operatorname{Tr}((\rho_{\mathrm{in}} - \sigma_{\mathrm{dream}})^2) = 2\times(\frac{\sqrt{3}}{4})^2 = \frac{3}{8} = 0.375$（注意这是矩阵残差平方范数，单位绝不是比特！）；按 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 除以 $\ln 2$ 换算为二进制比特后，这一步预编译已在夜间提前支付了二元香农熵 $h_2(3/4) = -\frac{3}{4}\log_2\frac{3}{4} - \frac{1}{4}\log_2\frac{1}{4} \approx 0.811278$ 比特。四阶段完整对比账本如下：

| 演化与检测阶段 | 密度矩阵状态 | 状态冯·诺依曼熵（比特） | 本步再捏合新增熵 $\Delta H_{\mathrm{bits}}$ | 丢弃相干质量 $\lVert\rho - \Pi_\beta(\rho)\rVert_{\mathrm{HS}}^2$ |
| :--- | :--- | ---: | ---: | ---: |
| **1. 分叉叠加输入** | $\rho_{\mathrm{in}}$（$\theta = \pi/6$ 纯态） | $0$ | — | — |
| **2. 梦境首次预编译（$\beta = 0$）** | $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ | $h_2(3/4) \approx 0.811278$ | $+0.811278$ | $3/8 = 0.375$ |
| **3. 清醒同轴再投影（$\beta = 0$，未升级）** | $\Pi_0(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$ | $0.811278$ | **$0$** | **$0$** |
| **4. 梦后逻辑升级换轴（$\beta = \pi/2$）** | $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$ | $1$ | $+0.188722$ | $1/8 = 0.125$ |

::: {.viz src="dream-pre-decoherence-deja-vu" preset="dream-precompile" height="500"}
**梦境首次预编译：副对角相干提前剪除，对角目标提前锁定。** 在 $\theta = \pi/6$、逻辑基 $\beta = 0$ 下，第一次捏合将 $\rho_{\mathrm{in}}$ 压成对角不动点 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$，丢弃相干质量 $3/8$，首次熵增约 $0.8113$ 比特（[@thm-ch37-known-data-pinching-and-entropy-tax]）。将此步读作夜间投机预编译属本章 `MODEL`。
:::

### 37.5.3 现实为何走入所选截面，以及为何并非美梦皆真：格拉姆相容漏斗 vs. 高新颖度流水线冲刷 {#sec-ch37-p2g-gram-funnel-and-flush}

推演到这里，每一位清醒而挑剔的读者都会立刻追问两个直击要害的问题：**第一，如果梦境只是观察者内部先验逻辑的一次超前去相干预编译，为什么醒来后的外部世界轨迹有时真的会严丝合缝地走进那块截面？第二，反过来问，既然梦里每天都在做各种预编译，为什么绝大多数荒诞的梦醒来后根本没有在现实中发生？**

先答第一问。在[第 29 章](ch29-timeless-causality-and-gram-space.md)的无时间格拉姆因果几何（[@thm-ch29-gram-rigidity-and-pell]）中，前后相继的清醒经验之所以显得“有因果牵引”，并不是有某种神秘力量从未来倒着拽你，而是因为**只要观察者在醒后继续沿用与昨夜同源的那套硬几何锚点与相容先验，任何合法的物理实现态都必须满足复希尔伯特空间正算子格拉姆可实现性与拉格朗日—格拉姆二元面积余项非负性**：

::: {.theorem #thm-ch37-p2g-gram-realizability title="复希尔伯特空间正算子格拉姆因式分解可实现性充要定理与拉格朗日—格拉姆恒等式" lean="D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
在 `trureturing` 冻结的量子界格拉姆可实现性与拉格朗日—格拉姆模块中，以下两项定理同时成立：

1. **有界连续正算子的格拉姆伴随平方根实现充要判据**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间（`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`），$Q : V \to_L[\mathbb{C}] V$ 为有界连续复线性自同态。则 $Q$ 在算子序下半正定（$0 \le Q$）当且仅当存在有界连续复线性算子 $O : V \to_L[\mathbb{C}] V$，使 $Q$ 分解为伴随复合且二次型处处实现为像向量的格拉姆内积：

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Qx, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}};
   $$

2. **有限实向量对的拉格朗日—格拉姆勾股余项恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，对照[第六章](ch06-geometric-product.md) [@thm-lagrange-gram-identity]）：对任意有限指标集 $s : \operatorname{Finset}\;\iota$ 与实坐标族 $u, v : \iota \to \mathbb{R}$，两向量模方乘积与内积平方之差恒等于二阶反对称外积分量平方和的一半：

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$
:::

::: proof
第 1 款反向若 $Q = O^\dagger \circ_L O$，伴随恒等式直接给出 $\langle Qx, y\rangle_{\mathbb{C}} = \langle O^\dagger O x, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}}$，故 $Q$ 自伴且对一切 $x$ 有 $\langle Qx, x\rangle_{\mathbb{C}} = \lVert Ox\rVert^2 \ge 0$，即 $0 \le Q$；正向对完备复希尔伯特空间上的半正定有界算子 $0 \le Q$，连续函数演算构造出自伴算子平方根 $O = Q^{1/2}$，满足 $O^\dagger = O$ 与 $O \circ_L O = Q$，从而同时兑现因式分解与内积等式。第 2 款将右端双重求和中的 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2u_i v_i u_j v_j + u_j^2 v_i^2$ 拆成三项，首尾两项重排求和指标后皆等于 $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2)$，交叉项化为 $-2(\sum_{i\in s} u_i v_i)^2$，合并除以 $2$ 即得左端。完整证明由 Lean 内核检查。
:::

请注意 [@thm-ch37-p2g-gram-realizability] 的严格边界：第 1 款是抽象复希尔伯特空间算子的存在性因式分解，第 2 款是**二向量**拉格朗日余项；下面展示的三向量行列式可行走廊与嵌套收窄漏斗属于在此基础上的**手工推导，未作为独立声明在本书形式化**（数值点算为 `NUM`，与 §37.2 [@ex-ch37-gram-constraint-release] 的约定完全对齐）：

在 $\mathbb{R}^3$ 中固定三根显式单位向量——硬几何锚点 $B = (1, 0, 0)$、$A = (\frac{4}{5}, \frac{3}{5}, 0)$ 以及绕 $B$ 旋转二面角 $\phi$ 的候选方向 $C(\phi) = (\frac{4}{5}, \frac{3}{5}\cos\phi, \frac{3}{5}\sin\phi)$。三者的成对内积为 $x = A\cdot B = \frac{4}{5}$，$y = B\cdot C(\phi) = \frac{4}{5}$，以及待定目标重叠 $z = A\cdot C(\phi) = \frac{16}{25} + \frac{9}{25}\cos\phi$。三元单位格拉姆矩阵 $G$ 的行列式为

$$
\det G \;=\; \det\begin{pmatrix} 1 & x & z \\ x & 1 & y \\ z & y & 1 \end{pmatrix} \;=\; 1 - x^2 - y^2 - z^2 + 2xyz \;=\; \frac{81}{625} - \left(z - \frac{16}{25}\right)^2.
$$

由各阶主子式非负与显式向量构造可知，$G$ 可实现当且仅当 $z \in [\frac{7}{25}, 1] = [0.28, 1]$。在我们的 `MODEL` 漏斗中，当观察者的先验逻辑与日间环境持续相容、将二面角余弦 $q = \cos\phi$ 依次收紧在 $[-1, 1] \supseteq [0, \frac{2}{3}] \supseteq [\frac{1}{3}, \frac{1}{2}]$ 时，可行重叠带便呈现三级嵌套收窄：

$$
\left[\frac{7}{25},\; 1\right] \;\supseteq\; \left[\frac{16}{25},\; \frac{22}{25}\right] \;\supseteq\; \left[\frac{19}{25},\; \frac{41}{50}\right] \;=\; [0.76,\; 0.82],
$$

始终稳稳包裹着昨夜预编译的目标截面 $z_{\mathrm{dream}} = \frac{4}{5} = 0.8$（对应 $q = \frac{4}{9}$、$\det G = \frac{13}{125} = 0.104$；沙盘展示的示例清醒轨迹 $z(t) = \frac{19}{25} + \frac{t}{25},\; 0 \le t \le 1$ 是模型选定的一条相容路径，区间嵌套本身并不强迫轨迹唯一收敛到单点）。在切投空间一侧，若枚举有限黄金整数方盒 $(a, b) \in \{-12, \dots, 12\}^2$ 上的物理坐标 $x_\parallel = a + b\varphi$ 与共轭坐标 $x_\perp = a + b(1 - \varphi)$，围绕中心 $c = \varphi - \frac{3}{2}$ 取嵌套闭窗口 $W_s = [c - s/2, c + s/2]$（$s = 1$ 时 $W_1 = [\varphi - 2, \varphi - 1]$ 即 §37.4 [@thm-ch37-golden-cut-delone-multilocation] 第 1 款 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project) 所涉的黄金窗口），当窗口宽度按 $s = 1 \to \frac{1}{2} \to \frac{1}{4}$ 缩窄时，该有限方盒内被选中的相容格点数依次按 **$26 \to 11 \to 7$** 嵌套递减（`NUM`；子集嵌套来自窗口包含的手工推导，[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project) 本身仅认证自然数黄金展开在全宽窗口下的单向包含）。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="gram-funnel" height="500"}
**相容先验漏斗：旧逻辑未被打翻时，可行走廊收窄并保留预编译目标。** 固定 $x = y = 4/5$，三层相容带 $[0.28, 1] \supseteq [0.64, 0.88] \supseteq [0.76, 0.82]$ 嵌套包裹 $z_{\mathrm{dream}} = 0.8$（$\det G = 0.104$）；副图同步展示 $[-12, 12]^2$ 黄金窗口宽度 $1 \to 1/2 \to 1/4$ 时选中点数 $26 \to 11 \to 7$ 的嵌套收束。正算子格拉姆实现见 [@thm-ch37-p2g-gram-realizability]，三向量区间为手工推导，清醒路径属 `MODEL`。
:::

准晶几何文献中有一则与“局部相容条件向远方传播约束”遥相呼应的著名类比，在此单独界定其文献边界：

::: {.remark #rem-ch37-p2g-empire-effect-literature title="康威准晶帝国效应（Empire Effect）与局部匹配传播边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在非周期拼砖与切投准晶文献中（见 M. Senechal, *Quasicrystals and Geometry*, Cambridge Univ. Press, 1995；以及 M. Baake & U. Grimm, *Aperiodic Order, Vol. 1: A Mathematical Invitation*, Cambridge Univ. Press, 2013），约翰·康威（John H. Conway）提出的**“帝国效应（Empire Effect）”**刻画了这样一种几何现象：在给定局部匹配规则下，敲定一小片合法拼砖补丁（patch），往往会通过全局相容性跨越补丁边界，强制敲定远方若干离散位置上必须摆放的砖块类型（其强制范围严格依赖于具体补丁与拼砖规则）。在本章中，这仅作为“局部先验约束收紧可行截面”的文献几何类比，绝不意味着任意局部梦境片段都能唯一锁死整座宇宙的未来，亦不意味着缩窄黄金窗口必退化为单点集。
:::

现在回答更犀利的**第二问：既然如此，为什么绝大多数梦并未能“成真”，也没有在醒来后变成既视感？**

答案在计算机体系结构与 `trureturing` 的概念信息逃逸及信念修正模块里清澈见底：**因为投机预编译只有在“醒来后没有学到推翻预测前提的结构性新信息”时才有效！** 一旦观察者在醒后的清晨读到了一条无法从旧知识闭包中推导出来的**高新颖度事实**，或者遭遇了与昨夜可废止先验正面冲突的新证据，旧预编译缓存就会像预测失败的处理器分支一样被当场**冲刷作废（Pipeline Flush）**。下面三条 `NEW_AT_PIN` 内核定理分别给出了结构新颖度的唯一捕获充要判据、不可由其余核语义恢复的闭包判据，以及冲突重置修正下更新顺序不可交换的精确反例：

::: {.theorem #thm-ch37-p2g-novelty-and-revision-noncommutation title="信息逃逸率严格下降的唯一捕获与语义闭包不可恢复充要定理及冲突修正非对易性定理" lean="D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation"}
在 `trureturing` 冻结的概念动力学信息逃逸精确率、结构新颖度与冲突修正模块中，以下两项定理同时成立：

1. **有限非退化竞技场上降低信息逃逸率的唯一捕获与语义新颖性双等价判据**（[`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)、[`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout)）：设 `arena : Arena.{u}` 为非退化有限状态竞技场（`arena.Nondegenerate`，即状态总数 $N \ge 2$，有序相异状态对总数为 $N(N - 1) > 0$），`catalog : Catalog.{u, v, w} arena` 为有限定理目录，`index : catalog.Index` 为其中任一条目。记 `LowersEscape index` 为完整目录的不可区分有序对逃逸率严格低于删去 `index` 后的逃逸率（$E(C) < E(C \setminus \{\mathrm{index}\})$），记 `uniqueCaptureCount index`（简记为 $U_{\mathrm{index}}$）为被其余全部条目一致认同、唯独被 `index` 成功区分的有序状态对数目，记 $K_{\mathrm{index}} := (\mathrm{catalog.theoremAt}\;\mathrm{index}).\mathrm{primitives.toKernel}$ 为该条目的可判定一致核，`semanticClosureWithout index` 为可由其余全部条目联合一致蕴涵的一致核语义闭包。则以下两条充要条件同时成立：

   $$
   \begin{aligned}
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; 0 < \operatorname{catalog.uniqueCaptureCount}(\mathrm{index}), \\
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; K_{\mathrm{index}} \notin \operatorname{catalog.semanticClosureWithout}(\mathrm{index});
   \end{aligned}
   $$

2. **证据优先冲突重置修正算子的显式顺序非对易证书**（[`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)）：在三世界集合 `Fin 3` $= \{0, 1, 2\}$ 上，定义证据优先冲突重置修正为：当先验集合 $A$ 与新证据集合 $P$ 相交非空（$A \cap P \neq \emptyset$）时取交集 $\operatorname{revision}(P, A) = A \cap P$，冲突为空时重置为新证据 $\operatorname{revision}(P, A) = P$。显式取初始世界集 $A = \{0\}$、新证据 $P = \{1, 2\}$ 与 $Q = \{0, 1\}$，则以下五重论断同时成立：

   $$
   \begin{aligned}
   &\operatorname{revision}(P, A) = P \;\land\; \operatorname{revision}(Q, A) = A \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) = \{1\} \;\land\; \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr) = P \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) \neq \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款在非退化假设 $N \ge 2$ 下，有序相异状态对总数 $N(N - 1)$ 严格为正；凡逃逸完整目录的有序相异对必同时逃逸删去 `index` 的子目录，而两逃逸集之差恰好是“其余条目全部同值、唯独 `index` 异值”的有序相异对集合，其基数即 `uniqueCaptureCount index`，除以正分母 $N(N - 1)$ 立得 $E(C) < E(C \setminus \{\mathrm{index}\}) \iff 0 < U_{\mathrm{index}}$。进一步，$U_{\mathrm{index}} = 0$ 当且仅当对一切状态 $x, y$（$x = y$ 时自反成立，$x \neq y$ 时无唯一捕获对），其余条目全部一致必蕴涵 $K_{\mathrm{index}}(x, y)$ 成立，即 $K_{\mathrm{index}} \in \operatorname{semanticClosureWithout}(\mathrm{index})$；两端同取否定即得第二条等价式。第 2 款在 `Fin 3` 上直接验算交集：$A \cap P = \{0\} \cap \{1, 2\} = \emptyset$ 触发冲突重置得 $\operatorname{revision}(P, A) = \{1, 2\} = P$；$A \cap Q = \{0\} \cap \{0, 1\} = \{0\} \neq \emptyset$ 保留交集得 $\operatorname{revision}(Q, A) = \{0\} = A$。按两种顺序复合，先 $P$ 后 $Q$ 给出 $\{1, 2\} \cap \{0, 1\} = \{1\}$，先 $Q$ 后 $P$ 给出对 $\{0\}$ 施 $P$ 的冲突重置 $P = \{1, 2\}$，而元素 $2 \in P$ 但 $2 \notin \{1\}$，证得两者不等。完整证明由 Lean 内核检查。
:::

用一座四状态有限竞技场 $X = \{00, 01, 10, 11\}$（$N = 4$，有序相异对总数 $N(N - 1) = 12$；注意此四世界特征竞技场与 [@thm-ch37-p2g-novelty-and-revision-noncommutation] 第 2 款独立展示的三世界 `Fin 3` 冲突修正反例分属两个不同状态集，切勿混同）即可把“冗余复读”与“高新颖度冲刷”的差别算得一清二楚（`NUM`）：设旧逻辑仅掌握首比特特征 $f_0(a, b) = a$，对比新特征 $f_1(a, b) = b$ 与冗余复读特征 $f_{\mathrm{dup}} = f_0$：

| 特征目录配置 | 未区分有序相异对数 | 信息逃逸率 $E$ | 新增条目的唯一捕获数 $U_i$ | 对梦境投机目标 `00`（在粗先验 $f_0 = 0$ 下）的影响（`MODEL`） |
| :--- | ---: | ---: | ---: | :--- |
| **旧先验目录 $\{f_0\}$** | $4$ | $1/3$ | — | 粗先验 $f_0 = 0$ 允许 $\{00, 01\}$；梦境投机预选目标 `00` |
| **冗余复读目录 $\{f_0, f_{\mathrm{dup}}\}$** | $4$ | $1/3$ | $U_{f_{\mathrm{dup}}} = 0$ | $K_{f_{\mathrm{dup}}}$ 落在旧语义闭包内；观测 $f_{\mathrm{dup}} = 0$ 不触发冲刷，缓存继续有效 |
| **高新颖度目录 $\{f_0, f_1\}$** | $0$ | $0$ | $U_{f_1} = 4 > 0$ | 若醒后新学得 $f_1 = 1$，真实世界落定在 `01`：虽未推翻粗先验 $f_0 = 0$，却当场证伪梦境投机猜测 `00`！ |

在交互沙盘 `ORTHO//DEJAVU` 中，这一机制被铸造为核心双语开关**“梦后逻辑升级 / 流水线冲刷 — Post-Dream Logic Upgrade / Pipeline Flush”**（布尔状态 `logicUpgrade`，默认 `false`；将特征学习连接至测量基旋转与格拉姆先验替换是沙盘选定的确定性 `MODEL` 规则）：

- **开关关闭（`logicUpgrade = false`）**：语境版本保持 `Context_Version = 0`，当前测量基保持 $\beta = 0$，旧目标 `00` 与 $z_{\mathrm{dream}} = 0.8$ 均与当前先验相容，缓存有效位 `Valid = 1`，流水线冲刷标志 `flush = 0`；
- **开关开启（`logicUpgrade = true`）**：模拟观察者在醒后学到高新颖度证据 $f_1 = 1$，语境版本升至 `Context_Version = 1`，旧缓存条目立即失效（`Valid = 0, flush = 1`，但历史预编译快照 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ 作为不可变档案原样保留，绝不事后篡改历史）。在格拉姆面板上，硬几何锚点 $A, B$ 保持不变，而旧的可废止先验 $q \in [\frac{1}{3}, \frac{1}{2}]$ 被新证据替换为 $q \in [-1, -\frac{1}{3}]$（不强行对不相容旧区间取空交集），可行重叠带当场迁往 $z \in [\frac{7}{25}, \frac{13}{25}] = [0.28, 0.52]$，将旧目标 $0.8$ 彻底排除在窗外并改选新端点 $z_{\mathrm{new}} = \frac{2}{5} = 0.4$（$q = -\frac{2}{3}$，$\det G = \frac{9}{125} = 0.072$）；在量子比特面板上，用升级后的正交新尺 $\beta = \pi/2$ 对历史快照 $\sigma_{\mathrm{dream}}$ 重新投影，输出变成最大混合态 $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$，当场产生 $\Delta H_{\mathrm{bits}} = 1 - h_2(3/4) \approx 0.188722$ 比特的真实重编译熵增与 $1/8$ 的残差质量！

::: {.viz src="dream-pre-decoherence-deja-vu" preset="logic-upgrade-flush" height="500"}
**梦后逻辑升级与流水线冲刷：新约束把旧目标挡在窗外。** 开启“梦后逻辑升级 / 流水线冲刷”开关后，可废止先验切至新证据区间，可行带移到 $[0.28, 0.52]$，旧目标 $0.8$ 变为空心失效轮廓，琥珀色当前选择迁至 $z_{\mathrm{new}} = 0.4$，同时换轴重投影付出约 $0.1887$ 比特新增熵（结构新颖度与冲突修正非对易定理见 [@thm-ch37-p2g-novelty-and-revision-noncommutation]；缓存冲刷联动属 `MODEL`）。
:::

### 37.5.4 既视感的沙盘精确特征：幂等重投影零新增熵与缺省情景时间戳的快表命中 {#sec-ch37-p2g-deja-vu-signature}

现在，让我们把开关拨回“未发生冲突逻辑升级”（`logicUpgrade = false`）的那一类珍稀清晨：昨晚梦境已经顺着旧逻辑基 $P$ 把分叉态预编译成了 $\sigma = \Pi_P(\rho)$，今天白天观察者果真没有遭遇推翻 $P$ 的新证据，而是端着**同一把逻辑标尺 $P$** 走进了现实的同一座十字路口。在这一瞬间，算子代数账本上会发生什么？

把 §37.1 [@thm-ch37-known-data-pinching-and-entropy-tax] 的四条内核定理联立用于已捏合态 $\sigma = \Pi_P(\rho)$，无需增添任何未验证假设，四行精确代数推演一气呵成（**手工推导，未作为独立声明在本书形式化**）：

1. **状态完全不变**：由完备记录捏合的函数复合幂等律 [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，用同一把尺子再量一次，输出态与输入态恒等：

   $$
   \Pi_P(\sigma) \;=\; \Pi_P\bigl(\Pi_P(\rho)\bigr) \;=\; \Pi_P(\rho) \;=\; \sigma;
   $$

2. **跨扇区残差与丢弃相干质量精确为零**：由不动点充要判据 [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)，对一切 $k \neq l$ 均有 $P_k \sigma P_l = 0$，故第二次捏合的矩阵残差恒为零矩阵 $\sigma - \Pi_P(\sigma) = 0$，希尔伯特—施密特残差平方范数精确为零：

   $$
   \lVert \sigma - \Pi_P(\sigma)\rVert_{\mathrm{HS}}^2 \;=\; 0
   $$

   （在单量子比特标准基情形下，[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass) 给出同一零值 $\lvert\sigma_{01}\rvert^2 + \lvert\sigma_{10}\rvert^2 = 0$）；
3. **无中间演化时的再捏合新增熵精确为零**：在没有穿插改变不动点块结构的中间幺正演化（即 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 中取恒等演化 $U = I$ 与常值计算基对角密度态序列 $\rho_k = \sigma$）的严格前提下，单步恒等式给出自然对数单位下的零熵产 $0 = S(\sigma) - S(\sigma) = D(\sigma \,\|\, \sigma)$；除以 $\ln 2$ 化为比特后，**再捏合新增熵（Additional Pinching Entropy）**精确为零：

   $$
   \Delta H_{\mathrm{bits}} \;:=\; \frac{S\bigl(\Pi_P(\sigma)\bigr) - S(\sigma)}{\ln 2} \;=\; 0.
   $$

这里必须立起一道毫不含糊的数学与物理防火墙：**$\Delta H_{\mathrm{bits}} = 0$ 指的仅仅是“在同一数学投影映射重复作用且无中间演化时，状态冯·诺依曼熵的增量等于零”！** 它既没有把状态 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ 自身原有的非零混合熵 $H(\sigma_{\mathrm{dream}}) \approx 0.811278$ 比特抹成零，也不等于单次读出具体分支结果时的事件自信息（Outcome Surprisal，在 $(3/4, 1/4)$ 分布下两分支的事件惊奇度分别为 $-\log_2(3/4) \approx 0.415037$ 比特与 $-\log_2(1/4) = 2$ 比特，均严格大于零！），更不代表大脑皮层零代谢耗能或热力学零功。

为什么这一记“$\Delta H_{\mathrm{bits}} = 0$ 的预编译命中”在主观体验上不会变成平平常常的“我想起来昨天做过这个梦”，反而会酿成既视感那种**“无比熟悉，却偏偏搜不到任何过去时间坐标”**的奇异震颤？在沙盘的 **`MODEL`（模型诠释）** 中，原因就藏在 §37.2–§37.3 揭示的睡眠门控特征里：昨夜那次预编译发生在外部五感编年史时钟锚点 $\mathbf{u}_2$ 与躯体坐标被挂起的离线状态，写入缓存条目时**情景时间戳字段留空（`Time_Tag = NULL`）**！把清醒世界中的三种认知相遇并排放在同一张对照表上，既视感的结构定位便一目了然：

| 认知比较维度（`MODEL`） | 1. 普通全新清醒体验（冷未命中） | 2. 普通显式往事回忆（带时间戳命中） | 3. 既视感体验（梦境预编译无时间戳命中） |
| :--- | :--- | :--- | :--- |
| **首次退相干编译发生地** | 当下清醒五感现场实时首次执行 | 过去某次清醒五感现场已完成编译并归档 | 昨夜或更早梦境离线沙盘已由前置逻辑预编译 |
| **当前同轴投影新增熵 $\Delta H_{\mathrm{bits}}$** | 非负；输入在所选基下有非零相干时严格为正（如默认算例 $+0.8113$ 比特，残差 $3/8$） | 同语境复现重投影增量为 $0$ | 同语境复现重投影增量为 **$0$**（零新增相干删除残差） |
| **地址与语境版本标签核验** | 无匹配历史条目（`Cache Miss`） | `Valid = 1`，地址标签与语境版本均匹配 | `Valid = 1`，地址标签与语境版本均匹配（`Cache Hit`） |
| **外显情景时间戳 `Time_Tag`** | 当下实时盖戳写入 `t = t_now` | 存有明确的过去清醒时空戳 `t = t_past` | **`Time_Tag = NULL`**（睡眠离线编译时编年锚点挂起） |
| **第一人称现象学质感** | 鲜活的陌生感与实时消解分叉的专注感 | 踏实的“我记得某年某月来过这里” | 零重算阻力触发强烈熟悉感，但回溯时间标签返回空值：“我明明经历过，却绝不可能经历过！” |

为了在交互沙盘中把上表第 3 列的硬件隐喻精确化而绝不越界，模型采用如下显式虚构的**情景缓存记录模式（`MODEL` Schema）**：

```text
Valid: 1
Address_Tag: event-0
Context_Version: 0
Payload: immutable compiled state / target
Time_Tag: NULL
```

在该模式中，缓存命中判据严格定义为四重合取 `hit = Valid && Address_Tag_matches && Context_Version_matches && Payload_compatible`（其中 `Payload_compatible` 指当前标尺使已存预编译态保持不动，即 $\Pi_\beta(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$），而沙盘的“无时间戳熟悉感”指示器定义为 `hit && Time_Tag == NULL`（正如 [@rem-ch37-p2g-speculative-execution-literature] 第 2 条所强调的，`Address_Tag` 与 `Context_Version` 必须全部匹配，仅凭 `Valid = 1` 或 `Time_Tag == NULL` 绝不构成命中；若将 `Address_Tag` 切至不匹配的 `event-1`，或在开启 `logicUpgrade` 使 `Valid = 0`、`Context_Version = 1` 的状态下手动把标尺拨回 $\beta = 0^\circ$，重投影虽仍保持已存态不变从而给出 $\Delta H_{\mathrm{bits}} = 0$ 与零残差，缓存依然严格判定为未命中 `MISS`，绝不虚报非零重投影代价）。至于[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)将深入展开的两条相关形式化定理——典范拷贝地址记录函数相等性 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)（[@thm-ch38-copied-address-dereference-and-access-defect]）与整行捕获扭转对角线时的自寻址不动点蕴涵 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)（[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@lem-diagonal-landing-fixed] 与 [@thm-ch38-self-mapped-diagonal-fixed-point]）——前者仅证明观察者边缘模块与退相干缺陷模块中两个克罗内克 $\delta$ 地址记录定义逐点相等，后者仅在“整行等于扭转对角线”的强前提下给出对角槽位不动点；两者均不声称构造了上述缓存字段或人类神经记忆寄存器。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="deja-vu-hit" height="500"}
**既视感沙盘命中：同轴重投影零新增熵与 `Time_Tag = NULL` 档案对照。** 在未触发逻辑升级（`Context_Version = 0`、`Valid = 1`）时，清醒端用同一把尺子 $\beta = 0$ 重测预编译态 $\sigma_{\mathrm{dream}}$，前后矩阵分毫不差，再捏合新增熵 $\Delta H_{\mathrm{bits}} = 0$、残差质量 $0$；右侧模型卡片同步显示地址与语境匹配而情景时间戳为空（`MODEL`）。拨动升级开关即可亲眼验证命中当场失效。
:::

最后，我们将实验心理学与认知神经心理学中关于既视感的代表性实证理论，连同整个 §37.5 与 `ORTHO//DEJAVU` 沙盘的四层认识论边界统一归档于下框：

::: {.remark #rem-ch37-dejavu-epistemic-boundary title="既视感认知神经心理学文献与 §37.5 四层认识论边界声明（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 当代实验心理学与认知神经心理学关于人类既视感（Déjà Vu）的实证研究与理论模型属外部科学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **既视感竞争性认知假说综述与双加工分离框架（A. S. Brown, “A review of the déjà vu experience,” *Psychological Bulletin* **129**(3), 394–413, 2003, DOI: `10.1037/0033-2909.129.3.394`）**：系统梳理了注意分裂、知觉微延迟、格式塔场景构型相似性以及双加工记忆模型（熟悉性 familiarity 与外显情景回想 recollection 两条通路的短暂解离）等多族竞争解释，指出熟悉感信号可以在缺乏具体情景来源回想的条件下单独被触发，但学界并未将单一机制确立为排他定论，更不存在“梦境窥探未来事件”的实证支持；
2. **既视感的元认知冲突检测账户（C. Moulin, *The Cognitive Neuropsychology of Déjà Vu*, 1st ed., Routledge, 版权年 2018 / 首发记录 2017 年 9 月, ISBN `9781138696266`）**：强调既视感区别于一般虚假记忆妄想的核心特征在于**两层元认知同时在场**——底层记忆系统发出了强烈的熟悉感信号，而高层元认知监控系统同时清醒地判定“这种熟悉感在当前个人编年史中是不合逻辑或错误的”，正是这种“熟悉感与情景上下文校验的冲突”塑造了既视感独特的惊讶体验（不可将其简化为已被神经解剖学定案的双硬件寄存器电路）。

**本节认识论四层硬边界汇总：**（i）绿色 `LEAN ✓` 严格限于 [@thm-ch37-known-data-pinching-and-entropy-tax]、[@thm-ch37-joint-coherent-record-erasure]、[@thm-ch37-golden-cut-delone-multilocation]、[@thm-ch37-p2g-open-escape-and-krylov]、[@thm-ch37-p2g-gram-realizability] 与 [@thm-ch37-p2g-novelty-and-revision-noncommutation]（及行内窄义引用的 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)、[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)）的精确核验陈述；（ii）同轴重投影 $\Delta H_{\mathrm{bits}} = 0$ 专化、单比特布洛赫捏合公式、三向量格拉姆行列式区间 $[0.28, 1]$ 与嵌套窗口包含属**手工推导**，惠勒延迟选择、分支预测/TLB 架构、康威帝国效应及 Brown/Moulin 既视感心理学属**文献结果**；（iii）具体矩阵元、熵比特数、12 对状态计数与 $26 \to 11 \to 7$ 黄金格点数属**数值计算（`NUM`）**；（iv）将梦境诠释为前置逻辑超前去相干、将醒后新知诠释为流水线冲刷以及用 `Valid = 1, Time_Tag = NULL` 刻画本沙盘中的既视感特征，全部属于本书构建的几何诠释模型（**`MODEL`**），绝不声称构成了人类生物既视感的充要神经判据或超自然预知证明。
:::

至此，那句曾经让人浮想联翩的体验终于褪尽了宿命论的迷雾，露出了清朗而刚健的几何筋骨：**未来从来不是一卷早就印死在前方等你偷看的旧账本；你在枕畔与白昼握住哪一把逻辑标尺去消解正交余项，你就在参天大树的无数相容枝桠间亲手选择了哪一片未来截面。而偶尔掠过心头的那一抹既视感，不过是你自己的先行逻辑昨夜在无时间沙盘里提前落过一子、留下一枚未盖日戳的清澈脚印而已。** 下面这台完整的交互沙盘实验室（代号 `ORTHO//DEJAVU`）将“选基、预编译、相容漏斗、逻辑升级冲刷与既视感命中”全部汇于同一舞台，供你亲手切换检验：

::: {.viz src="dream-pre-decoherence-deja-vu" height="640"}
**梦境预去相干与既视感沙盘实验室（`ORTHO//DEJAVU`）。** 三个联动视图——测量基与密度矩阵（`basis`）、格拉姆相容漏斗与黄金切投窄窗（`funnel`）以及多副本相位指针（`records`）——配合“梦后逻辑升级 / 流水线冲刷”开关，完整呈现同一把尺子重测零新增熵（$\Delta H_{\mathrm{bits}} = 0$）与换逻辑后旧缓存冲刷重编的精确分野。绿色仅授予经 `lean=` 锁定的内核定理；梦境预编译、流水线冲刷与 `Time_Tag = NULL` 档案卡为本章的示意模型（`MODEL`）。
:::

而一旦看懂了“清醒五感锁定、梦境离线预编译与无身多点涌现不过是在同一座静态全局晶格上切换不同的寻址掩码与上下文标签”，一个更加锋利、直指终极计算机架构的本体论破壁命题便已呼之欲出：**既然整座无时间母体根本不需要随着你的走动而搬运一砖一瓦，那么在各个位置之间轻盈跃迁、昼夜切换掩码并核验快表标签的“观察者”，在宇宙这台终极量子计算机里究竟是什么硬件角色？** 下一章（[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)），我们将揭晓那个干净利落到极致的答案——**静态本体论量子随机存取存储器（QRAM）中的寻址指针 `ptr`**。
