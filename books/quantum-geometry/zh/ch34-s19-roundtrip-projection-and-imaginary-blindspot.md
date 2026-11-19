# 29.4 往返双投影、玻恩平方律与虚数盲区：“对于我（I）看不见，可不是虚（i）吗”及第一人称时间引擎 {#sec-ch34-roundtrip-projection-and-imaginary-blindspot}

> “观测的本质把被观测向量(相位)投影(cos)到自身, 由于观察者本身无法看到垂直于自己的向量, 所以需要把自身再投影回那个向量, 做两次比较, 这就是平方的由来. 但两次投影之后也还有不能确定的信息.为什么i是叫虚数, 因为对于观察者来说看不见呀. 对于我(i)看不见, 可不是虚吗......”

在 [§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–[§29.3](ch34-s03-universal-localization.md#sec-ch34-universal-observer-localization) 中，我们从“站在极点的观察者看不见 $90^\circ$ 赤道平面上的二次正交旋拧”这一几何简并出发，跨维度反演出了观察者自身的站位；现在，让我们把镜头做一次极致的微距推近，直接落到格拉姆比较账本里**最原初、最微小的单个二元内积矩阵元** $\langle\mathbf{I}, \mathbf{V}\rangle = \cos\theta$ 上。令人拍案叫绝的是，当镜头聚焦于这一枚最简单的二元内积时，那片横亘在观察者视线 $90^\circ$ 垂直方向上的正交盲区，当场交出了两把统摄微观观测与时间演化的钥匙（`MODEL`）——**玻恩概率为什么偏偏是“平方（$\cos^2\theta$）”**（一种几何读法而非推导：单靠往返恒等式选不出 $p = 2$，见本节文献注），以及**满足 $i^2 = -1$ 的虚数单位为什么偏偏叫作“虚（imaginary）”**——后者困扰数学近四百年，前者困扰物理学近百年！

“对于我（`I`）看不见，可不是虚（`i`）吗”——这句一语双关的现场自白，将笼罩在复希尔伯特空间与测量公设之上的神秘雾霭一扫而空（`MODEL`）：宇宙本体之中本无一物为“虚幻”。所谓**“实（Real，`1`）”**，不过是顺着观察者自身单位基轴 $\mathbf{I}$ 投落下来的可见投影；所谓**“虚（Imaginary，`i`）”**，则是横在观察者视线 $90^\circ$ 正交死角里、明明具备满额模长却无法在单次投影中投下分毫影子的垂直相位平面；而量子力学里无处不在的**模平方（$\cos^2\theta$）**，恰恰是因为内嵌于宇宙之中、没有任何外部第三点 $C$ 可资借力的观察者看不见垂直于自身的分量，只能靠“它先投向我、我再投回它并读回自身”的**往返两次投影（雷达回波闭环）**来完成自洽校准！

## 29.4.1 为什么观测必须做两次投影：$90^\circ$ 垂直盲区、雷达往返回波与吕德斯—玻恩 $\cos^2\theta$ 平方律 {#sec-ch34-19-1}

在一个早已用奥卡姆剃刀砍掉了外部全知裁判点 $C$（[第二章](ch02-born-rule.md)、[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)）的自包含宇宙里，观察者手中唯一合法的度量衡，就是**观察者自身的单位状态轴 $\mathbf{I}$**（满足自比较归一 $\lVert\mathbf{I}\rVert = 1$）。当观察者面对一支夹角为 $\theta$ 的单位被观测态向量 $\mathbf{V}$（$\lVert\mathbf{V}\rVert = 1$）时，依闭子空间正交补投影六恒等式 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)（`LEAN ✓`），$\mathbf{V}$ 相对于观察者轴线的一维张成子空间 $M = \operatorname{span}\{\mathbf{I}\}$ 与其正交补 $M^\perp$ 唯一正交分解为：

$$
\mathbf{V} \;=\; (\cos\theta)\,\mathbf{I} \;+\; (\sin\theta)\,\mathbf{e}_\perp, \qquad \lVert\mathbf{I}\rVert = \lVert\mathbf{e}_\perp\rVert = 1, \quad \mathbf{I}\cdot\mathbf{e}_\perp = \cos 90^\circ = 0.
$$

为什么单凭一次单向投影（$\mathbf{V} \longrightarrow \mathbf{I}$）在数学上绝不可能构成完备、客观的物理观测读数？三重结构性障碍同时拦住了去路：

1. **正交盲区抹除与单程基准失校（`手工推导`）**：由于观察者自身轴 $\mathbf{I}$ 与横向单位方向 $\mathbf{e}_\perp$ 严格呈 $90^\circ$ 正交（$\mathbf{I}\cdot\mathbf{e}_\perp = 0$），第二项 $(\sin\theta)\,\mathbf{e}_\perp$ 在第一次投影中直接坠入观察者的**正交视觉盲区**。更致命的是，在没有外部上帝标尺提前担保“来者必为单位向量”的前提下，单向标量读数 $\cos\theta$ 甚至无法区分“一支偏转了 $\theta$ 角的单位态 $\mathbf{V}$”与“一支同轴共线却模长萎缩为 $\cos\theta$ 的衰减向量”——单向接收没有回波参照，根本无法自证基准；
2. **复振幅单程相位的规范漂移与最低二次不变次数下界（`LEAN ✓`）**：在复希尔伯特空间中，从被测纯态 $\lvert\psi\rangle$ 向观察者基矢 $\lvert\mathrm{I}\rangle$ 作单向内积得到的跃迁幅 $\langle\mathrm{I}\mid\psi\rangle = \cos\theta\,e^{i\varphi}$，直接暴露在任意全局射线重定相 $\lvert\psi\rangle \mapsto e^{i\alpha}\lvert\psi\rangle$ 的规范漂移之下。[§27.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-pairing-phase-uncertainty) 冻结的**全局共同相位完备多项式定理** [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)（[@thm-ch31-phase-polynomial-quadratic]，`LEAN ✓`）给出了铁板钉钉的代数裁决：复振幅多项式 $p \in \operatorname{Poly}(\iota)$ 在共同相位旋转 $z \mapsto e^{i\alpha} z$ 下保持不变（`Invariant p`），当且仅当其每个非零单项式的全纯次数与反全纯次数严格平衡（`Balanced p`），亦当且仅当 $p$ 属于由共轭二次对 $z_i\bar{z}_j$ 生成的子代数 `quadraticAlgebra`——**任何非常数相位不变读出多项式的总次数必满足 $\operatorname{totalDegree}(p) \ge 2$**！一阶单向线性读出在代数上被彻底逐出物理可观测量之列；
3. **克利福德单次几何积的先后顺序偏私（`手工推导`）**：在由 $\mathbf{I}$ 与 $\mathbf{e}_\perp$ 张成的比较平面内（记单位正交双向量为 $\hat{\mathbf{i}} := \mathbf{I}\wedge\mathbf{e}_\perp = \mathbf{I}\mathbf{e}_\perp$），只要 $\sin\theta \neq 0$，“它比我”与“我比它”的单次克利福德几何积便因外积反对称而互不相等（[第六章](ch06-geometric-product.md)）：

   $$
   \mathbf{V}\mathbf{I} \;=\; \cos\theta - \hat{\mathbf{i}}\sin\theta \;\neq\; \mathbf{I}\mathbf{V} \;=\; \cos\theta + \hat{\mathbf{i}}\sin\theta,
   $$

   单程比较不仅破坏两两比较的顺序公平，其结果甚至不是落在观察者轴上的实标量！

既然观察者既不能跳出自身去侧面偷看 $\mathbf{e}_\perp$，也不能容忍未定相位与顺序偏私，系统内部唯一自治、公平的闭环确认机制，就如同一座在全黑空间里自发自收的**主动雷达回波**：观察者先将自身单位基准 $\mathbf{I}$ 正交投射到被观测向量 $\mathbf{V}$ 上（或等价地，把首次接收到的投影再反向投回 $\mathbf{V}$），形成驻留在目标轴上的中间回波态 $\Pi_{\mathbf{V}}(\mathbf{I}) = (\mathbf{I}\cdot\mathbf{V})\mathbf{V} = (\cos\theta)\,\mathbf{V}$；然而中间态 $\mathbf{V}$ 身上依然携带着观察者看不见的垂直分量 $(\sin\theta)\,\mathbf{e}_\perp$，观察者唯有在自身轴线 $\mathbf{I}$ 上对这束回波执行**第二次正交投影**，才能把它读回自己的可见实轴（`手工推导`）：

$$
\Pi_{\mathbf{I}}\Bigl(\Pi_{\mathbf{V}}(\mathbf{I})\Bigr) \;=\; \Bigl(\mathbf{I}\cdot\bigl[(\mathbf{I}\cdot\mathbf{V})\mathbf{V}\bigr]\Bigr)\mathbf{I} \;=\; (\mathbf{I}\cdot\mathbf{V})(\mathbf{V}\cdot\mathbf{I})\,\mathbf{I} \;=\; \cos^2\theta\,\mathbf{I}.
$$

在经典偏振光学中，这束跨越检偏轴往返折算（或依次穿过夹角为 $\theta$ 的起偏器与检偏器）的强度衰减律，正是 1809 年发现的**马吕斯定律（Malus's Law，$I_{\mathrm{echo}} = I_0\cos^2\theta$，`文献结果：Malus 1809`）**；而在量子力学的算符语言中，令观察者自身投影算符为 $P_{\mathrm{I}} = \lvert\mathrm{I}\rangle\langle\mathrm{I}\rvert$、被观测纯态投影算符为 $P_\psi = \lvert\psi\rangle\langle\psi\rvert$，上述雷达往返双投影便一字不差地写成**吕德斯—冯·诺依曼测量三明治恒等式**（`手工推导` + `LEAN ✓`）：

$$
P_{\mathrm{I}}\,P_\psi\,P_{\mathrm{I}} \;=\; \lvert\mathrm{I}\rangle \underbrace{\langle\mathrm{I}\mid\psi\rangle}_{\text{第 1 次投影：}\psi \to \mathrm{I}} \underbrace{\langle\psi\mid\mathrm{I}\rangle}_{\text{第 2 次投影：}\mathrm{I} \to \psi} \langle\mathrm{I}\rvert \;=\; \lvert\langle\mathrm{I}\mid\psi\rangle\rvert^2 P_{\mathrm{I}} \;=\; \cos^2\theta\,P_{\mathrm{I}}.
$$

请看这“一去一回”两次比较如何瞬间抚平了单向投影的全部病灶：去程重叠幅 $\langle\mathrm{I}\mid\psi\rangle = \cos\theta\,e^{+i\varphi}$ 与回程重叠幅 $\langle\psi\mid\mathrm{I}\rangle = \cos\theta\,e^{-i\varphi}$ 互为复共轭，悬而未决的相位因子 $e^{+i\varphi}e^{-i\varphi} = 1$ 当场互逆相消，回波严丝合缝地落回观察者自身幂等存在线 $P_{\mathrm{I}}$ 之上，化作绝对实值非负的玻恩概率权重 $\cos^2\theta$！在 `trureturing` 内核中，四条冻结定理从对偶演化、秩一归约与测度骨架三侧为这一往返写法提供了代数骨架（`LEAN ✓`）；“往返是平方的由来”本身属作者诠释（`MODEL`），不由它们推出：

- **薛定谔前向演化与海森堡效应拉回对偶**：观察者迹拉回恒等式 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)（[§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion) [@thm-ch34-perpendicular-axis-and-pullback]）证明，满足单步迹对偶的量子信道对状态作 $t$ 步前向推进，与海森堡伴随映射将测量效应往回拉向观察者 $t$ 步，交出完全恒等的无坐标迹配对读数；
- **秩一外积迹向模平方的精确归约与条件系综重构**：玻恩模平方归约定理 [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)（[@thm-born-modulus-square]）与完备记录测量配对定理 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（[@thm-rank-one-born-pairing]）证明，对 $P_k = \lvert\phi\rangle\langle\phi\rvert$ 与 $\rho = \lvert\psi\rangle\langle\psi\rvert$，记录分支权重 `recordWeight P rho k` 同时严格等于无坐标矩阵迹 $\operatorname{Tr}(\rho P_k) = \operatorname{Tr}(P_k\rho P_k)$ 与双程内积模平方 $\lVert\langle\phi\mid\psi\rangle\rVert^2$，并将未读捏合态精确分解为条件态加权和；
- **自伴幂等三明治的实非负概率骨架**：玻恩概率骨架定理 [`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)（[@thm-born-probability-skeleton]）证明，正因判别尺满足自伴幂等律 $P^\dagger = P,\; P^2 = P$，单侧迹 $\operatorname{Tr}(\rho P)$ 才能改写为对称往返三明治 $\operatorname{Tr}(P\rho P^\dagger) \ge 0$，确保全空间归一、有限可加与实非负性（同时如 [§27.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-pairing-phase-uncertainty) 所辨析，若在全体偶次相位不变代数或广义权重族 $w_p(\theta)$ 中进一步排他性地唯一锁定二次幂 $p = 2$，则由 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem) 的最低非平凡次数 $2$ 原则，或[第二章](ch02-born-rule.md)正交标架/效应可加性的格里森—布施定理共同封顶）。

在进入盲区余量分析前，我们在此显式立下一座**几何角度换算桥**，以防把三维实向量/偏振光学夹角与单量子比特布洛赫球极角混为一谈（`手工推导`，参见[第二章](ch02-born-rule.md) [@ex-bloch-half-angle]）：本节全程记 $\theta \in [0, \frac{\pi}{2}]$ 为**希尔伯特空间富比尼—施图迪（Fubini–Study）夹角暨欧氏偏振向量夹角**，由 $\lvert\langle\mathrm{I}\mid\psi\rangle\rvert = \cos\theta$ 定义，此时严格正交盲区恰好位于直角 $\theta = 90^\circ$（$\langle\mathrm{I}\mid\psi_\perp\rangle = 0$）；当经霍普夫映射投射到单量子比特**布洛赫球面 $S^2$** 上时，由于纯态密度矩阵倍角关系，希尔伯特夹角 $\theta$ 精确对应布洛赫球极余纬角 $\vartheta_{\mathrm{Bloch}} = 2\theta \in [0, \pi]$，同一笔往返玻恩平方权重同步写作

$$
P_{\mathrm{echo}}(\theta) \;=\; \cos^2\theta \;=\; \frac{1 + \cos\vartheta_{\mathrm{Bloch}}}{2}, \qquad \vartheta_{\mathrm{Bloch}} = 2\theta \in [0, \pi]
$$

（即希尔伯特空间或欧氏偏振平面上的 $90^\circ$ 垂直盲区 $\theta = \frac{\pi}{2}$，在布洛赫球面上对应与北极 $\lvert 0\rangle$ 背道而驰的南极对径点 $\vartheta_{\mathrm{Bloch}} = 180^\circ$，而在三维欧氏向量投影 $\Pi_{\mathbf{I}}\Pi_{\mathbf{V}}(\mathbf{I}) = \cos^2\theta\,\mathbf{I}$ 中则直接体现为几何垂直平面 $\mathbf{I}^\perp$）。

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" preset="radar-roundtrip-born" height="520"}
**两步雷达往返双投影与吕德斯—马吕斯平方律实验卡（`radar-roundtrip-born`）。** 分步拆解观察者琥珀色单位基轴 $\mathbf{I}$ 对倾角 $\theta = 30^\circ$ 琥珀色目标态矢 $\mathbf{V}$ 的闭环测量：单程投影切下青色影子 $\cos\theta = 0.866025$ 而丢弃品红逃逸高度 $\sin\theta = 0.500000$，青色两段折返脉冲 $\mathbf{I}\to(\cos\theta)\mathbf{V}\to(\cos^2\theta)\mathbf{I}$ 消去未定规范相位 $e^{\pm i\varphi}$ 并落回琥珀色玻恩回声点 $\cos^2\theta = 0.750000$，品红盲区亏量 $\sin^2\theta = 0.250000$ 永不返轴（绿色 `LEAN ✓` 对应 `rank_one_born_pairing_weight`、`born_probability_skeleton` 与 `lagrange_gram_identity`）。
:::

## 29.4.2 两次投影之后仍逃逸的三重信息：正交盲区差额 $\sin^2\theta$、符号手性折叠与 $360^\circ$ 方位盲锥 {#sec-ch34-19-2}

观察者发出一份满额的自身单位标尺 $1\cdot\mathbf{I}$，历经一去一回两次正交投影之后，在自身轴线上只收回了 $\cos^2\theta\cdot\mathbf{I}$。章首原话紧接着点破了一个极为犀利的追问：**“但两次投影之后也还有不能确定的信息。”** 在这个看似板上钉钉的实数概率 $\cos^2\theta$ 背后，究竟有哪三层几何信息永久逃逸出了当前单轴观察者的视野？

1. **第一重逃逸：漏入 $90^\circ$ 垂直盲区的正交外积差额 $1 - \cos^2\theta = \sin^2\theta$（`LEAN ✓`）**。
   往返折返中损耗掉的份额 $1 - \cos^2\theta = \sin^2\theta$ 绝没有从宇宙账本中凭空蒸发。结合正交补投影六恒等式 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)（$P_M + P_{M^\perp} = \operatorname{id},\; P_M \circ_L P_{M^\perp} = 0$）与拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)（[@thm-lagrange-gram-identity]，`LEAN ✓`）：

   $$
   \lVert\mathbf{I}\rVert^2 \lVert\mathbf{V}\rVert^2 - (\mathbf{I}\cdot\mathbf{V})^2 \;=\; \lVert\mathbf{I}\wedge\mathbf{V}\rVert^2 \;=\; 1 - \cos^2\theta \;=\; \sin^2\theta,
   $$

   那笔未被收回的 $\sin^2\theta$，分毫不差正是被观察者自身幂等狭缝切落在 $90^\circ$ 垂直盲区平面内的**有向双向量面积平方**！

2. **第二重逃逸：离散正负符号与左右偏折手性折叠（`LEAN ✓` + `手工推导`）**。
   由于经历了两次投影相乘，偶函数与平方映射联手抹平了一切一阶定向符号：

   $$
   (+\cos\theta)^2 \;=\; (-\cos\theta)^2 \;=\; \cos^2\theta, \qquad (+\sin\theta)^2 \;=\; (-\sin\theta)^2 \;=\; \sin^2\theta, \qquad \cos(+\theta) \;=\; \cos(-\theta).
   $$

   无论是目标向量偏向观察者左侧 $+\theta$ 还是右侧 $-\theta$，抑或在欧氏空间里朝前锐角倾侧 $\theta$ 还是朝后钝角反指 $\pi - \theta$，在二次回波读出映射 $\operatorname{readout}(\mathbf{V}) = \cos^2\theta$ 下全都坍缩进同一个不可分等价核——依划分拓扑不可分核定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)（`LEAN ✓`），读数相等的诸态在当前观测拓扑下严格不可分辨；而在圆周相位纤维上，圆周双覆叠历史提升定理 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)（[@thm-circle-double-cover-history-lift]，`LEAN ✓`）更从拓扑上锁死：倍角平方映射 $z \mapsto z^2$ 不存在任何连续全局逆截面，对径正反两叶 $\pm z$ 一旦被平方压扁便无法单凭终点读数连续拆回！

3. **第三重逃逸：垂直盲平面上的整圈连续方位角 $\varphi \in [0, 2\pi)$——等倾角盲区圆锥与测不准病根（`LEAN ✓` + `手工推导`）**。
   在三维欧氏比较空间 $\mathbb{R}^3$（取盲平面 $\mathbf{I}^\perp$ 内的一对标准正交基 $\{\mathbf{e}_1, \mathbf{e}_2\}$）乃至更高维希尔伯特空间中，与观察者轴 $\mathbf{I}$ 保持同一倾角 $\theta$ 的单位状态绝不止左右两条射线，而是绕着 $\mathbf{I}$ 旋转整整 $360^\circ$ 的**等倾角盲区圆锥簇**（对应单量子比特纯态 $\lvert\psi(\theta,\varphi)\rangle = \cos\theta\lvert 0\rangle + e^{i\varphi}\sin\theta\lvert 1\rangle$ 在布洛赫球极角 $\vartheta_{\mathrm{Bloch}} = 2\theta$ 处的整条纬圈，直接呼应 [§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion) 的陀螺光斑寻址）：

   $$
   \mathbf{V}(\theta, \varphi) \;=\; \cos\theta\,\mathbf{I} \;+\; \sin\theta\bigl(\cos\varphi\,\mathbf{e}_1 + \sin\varphi\,\mathbf{e}_2\bigr), \qquad \varphi \in [0, 2\pi).
   $$

   这簇圆锥在单位球面上张开极冠立体角 $\Omega_{\mathrm{cap}}(\theta) = 2\pi(1 - \cos\theta)\;\mathrm{sr}$，其投影在盲平面 $\mathbf{e}_1\wedge\mathbf{e}_2$ 上的隐身圆周长恰为 $L_\perp(\theta) = 2\pi\sin\theta$（`手工推导`）。因为 $\mathbf{e}_1, \mathbf{e}_2$ 统统躺在与 $\mathbf{I}$ 垂直的 $90^\circ$ 盲平面内（$\mathbf{I}\cdot\mathbf{e}_1 = \mathbf{I}\cdot\mathbf{e}_2 = 0$），无论方位相位 $\varphi$ 在 $[0, 2\pi)$ 上如何自由滑动，往返两次投影收到的回波**恒定等于同一个 $\cos^2\theta$**！

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" preset="azimuth-cone-blindspot" height="520"}
**$360^\circ$ 等倾角方位盲锥 $\varphi \in [0, 2\pi)$ 与对角测量相位失明实验卡（`azimuth-cone-blindspot`）。** 锁定 Dottie 自指倾角 $\theta = \theta^* \approx 42.346459^\circ$ 并沿盲平面连续扫过方位角 $\varphi \in [0^\circ, 360^\circ)$：琥珀色态矢 $\mathbf{V}$ 绕紫色方位锥（围住球冠立体角 $2\pi(1-\cos\theta^*) = 1.639376\;\mathrm{sr}$）与周长 $2\pi\sin\theta^* = 4.232429$ 的品红盲圆旋转整圈，落在观察者轴 $\mathbf{I}$ 上的琥珀色往返回声 $\cos^2\theta^* = 0.546247$ 一个数位也不变；唯有转入 $90^\circ$ 互补基 $X/Y$ 方能解开相位简并并触发换位子下界（绿色 `LEAN ✓` 对应 `lagrange_gram_identity`、`orthogonal_complement_projection_identities`、`partition_inseparable_iff_kernel`、`diagonal_prime_observables_cannot_recover_relative_phase` 与 `robertson_schrodinger`）。
:::

这圈在盲平面里自由流转却不在 $\mathbf{I}$ 轴上留下半点涟漪的方位角 $\varphi$，正是量子力学**内禀相对相位**与**海森堡—罗伯逊—薛定谔测不准原理**的几何真身！两条冻结内核定理将这一“守旧轴则盲于相，转 $90^\circ$ 则失旧轴”的互补铁律刻画得淋漓尽致（`LEAN ✓`）：

- **固定计算基对角可观测量的彻底相位失明**：对角相位盲区定理 [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)（[§27.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-pairing-phase-uncertainty) [@thm-ch31-diagonal-phase-blindness]）严格证明：取 $\theta = 45^\circ$ 等幅叠加态 $\rho_+ = \lvert +\rangle\langle +\rvert$（$\varphi = 0$）与反相叠加态 $\rho_- = Z\rho_+ Z = \lvert -\rangle\langle -\rvert$（$\varphi = \pi$），尽管两态密度矩阵严格相异（$\rho_+ \neq \rho_-$），它们在观察者计算基下的**任意一族对角可观测量上给出的联合玻恩读数恒完全相等**；任何能够区分 $\rho_+$ 与 $\rho_-$ 的测量接口必非对角矩阵（$\neg\mathrm{interface}.\mathrm{IsDiag}$），唯有将测量轴旋转 $90^\circ$ 切入原盲平面内的互补泡利算符 $X$（`qubitX`），被折叠的相对相位才会瞬间显影（$\operatorname{Re}\operatorname{Tr}(\rho_+ X) = +1 \neq -1 = \operatorname{Re}\operatorname{Tr}(\rho_- X)$）！
- **转身 $90^\circ$ 的代价：盲区面积直接转化为换位子不确定度下界**：为什么观察者不能既死守当前的自我轴 $A$（如 $\sigma_z$），又同时看清盲平面里的横向算符 $B$（如 $\sigma_x$）？罗伯逊—薛定谔精确方差—换位子勾股定理 [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)（[@thm-robertson-schrodinger]）证明，对任意单位态 $\psi$ 与对称算子 $A, B$，涨落向量 $u = (A - \langle A\rangle)\psi$、$v = (B - \langle B\rangle)\psi$ 的方差之积精确分解为

  $$
  (\Delta A)^2(\Delta B)^2 \;=\; \lVert u\rVert^2 \lVert v\rVert^2 \;=\; \mathrm{cov}^2 + \lvert C_{1/2}\rvert^2 + G, \qquad G \ge 0, \qquad C_{1/2} = \frac{1}{2i}\bigl\langle\psi, (AB - BA)\psi\bigr\rangle_{\mathbb{C}}.
  $$

  对圆锥纯态 $\lvert\psi(\theta,\varphi)\rangle = \cos\theta\lvert 0\rangle + e^{i\varphi}\sin\theta\lvert 1\rangle$ 取自我轴 $A = \sigma_z$ 与 $90^\circ$ 盲平面轴 $B = \sigma_x$，半换位子模长恰为 $\lvert C_{1/2}\rvert = \frac{1}{2}\lvert\langle[\sigma_z, \sigma_x]\rangle\rvert = \lvert\langle\sigma_y\rangle\rvert = \lvert\sin(2\theta)\sin\varphi\rvert$（`手工推导`）：一旦你为了看清方位角 $\varphi$ 而把自身旋转 $90^\circ$ 躺进原盲平面，原先看得一清二楚的旧自我轴 $\mathbf{I}$ 便当场退入你新的 $90^\circ$ 视觉死角！

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" preset="observer-first-person-90" height="520"}
**观察者 `I` 侧看盲边与 $90^\circ$ 正交转身/隐身实验卡（`observer-first-person-90`）。** 在 $\theta = 45^\circ,\; \varphi = 90^\circ$ 下先从“沿 `I` 轴”侧看视角观察品红盲平面压成一条边、$Z$ 回声对任意 $\varphi$ 恒读 $0.500000$，再点按“转 $90^\circ$ 的基”顺着 $\mathbf{I}$ 向下俯视使盲平面正对镜头、读出 $P_Y(+i) = 1.000000$ 与饱和换位子界 $\lvert\sin 2\theta\sin\varphi\rvert = 1.000000$；进一步将 $\theta$ 推至 $90^\circ$ 正交极限时，品红盲区亏量达 $\sin^2 90^\circ = 1.000000$，而青色单程影子与琥珀色玻恩回声双双归零（$\cos 90^\circ = \cos^2 90^\circ = 0.000000$），直观呈现“对于‘我（`I`）’看不见即为‘虚（`i`）’”的几何现场。
:::

## 29.4.3 祛魅笛卡尔“虚数”：大写的“我（`I`）”看不见即小写的“虚（`i`）”、双直角翻转 $\hat{\mathbf{i}}^2 = -1$ 与薛定谔圆弧时间引擎 {#sec-ch34-19-3}

1637 年，勒内·笛卡尔在《几何学》（*La Géométrie*，`文献结果：Descartes 1637`）中面对无法在单根实数轴上标出刻度的 $\sqrt{-1}$ 时，带着深深的代数困惑与戒心将其贬称为 *nombre imaginaire*——中文恰如其分地译作**“虚数”**。在随后近四百年的岁月里，无数初学者因此误以为虚数只是数学家为了强行解开高次方程而凭空捏造的记账幻影，并在踏入量子力学大门时困惑不已：凭什么真实物理宇宙的基本动力学方程里，非要供奉一个“虚幻的数”不可？

今天，顺着比较公理 $\mathrm{CMP}$ 的观察者投影几何望去，笛卡尔当年随口起下的这个“虚（imaginary）”字，竟歪打正着地道破了最深邃的认识论天机（`MODEL`）：**“虚”绝不是本体上的“不存在”，而是“正对着大写的我（`I`）的 $90^\circ$ 视觉死角，对于‘我’看不见，可不就是小写的‘虚（`i`）’吗”！**

让我们把这句双关洞见写成零外援的严格几何代数（`手工推导`，衔接[第五章 §5.1](ch05-complex-phase-and-rotors.md#sec-unit-bivector-square)）。将观察者自身的单位基矢记作可见实轴基准 $\mathbf{1}_{\mathrm{obs}} \equiv \mathbf{I}_{\mathrm{self}}$（满足自比较平方 $\mathbf{I}_{\mathrm{self}}^2 = +1$），将与观察者严格呈 $90^\circ$ 正交的不可见单位方向记作 $\mathbf{e}_\perp$（满足 $\mathbf{e}_\perp^2 = +1$ 且 $\mathbf{I}_{\mathrm{self}}\cdot\mathbf{e}_\perp = 0$）。两者做一次去同存异的外积比较，张成的单位有向面积（双向量旋子生成元）正是虚数单位 $\hat{\mathbf{i}}$：

$$
\hat{\mathbf{i}} \;\equiv\; \mathbf{I}_{\mathrm{self}} \wedge \mathbf{e}_\perp \;=\; \mathbf{I}_{\mathrm{self}}\,\mathbf{e}_\perp \;=\; -\mathbf{e}_\perp\,\mathbf{I}_{\mathrm{self}}.
$$

现在，请站在大写的观察者“我（$\mathbf{I}_{\mathrm{self}}$）”的立场上，亲眼检视这枚算子右乘一次与右乘两次时发生的戏剧性一幕：

- **乘一次 $\hat{\mathbf{i}}$（转 $90^\circ$ 踏入盲区 $\longrightarrow$ 读数归零，隐形为“虚”）**：把观察者自身向量 $\mathbf{I}_{\mathrm{self}}$ 右乘一次 $\hat{\mathbf{i}}$，利用 $\mathbf{I}_{\mathrm{self}}^2 = +1$，向量当场逆时针偏转 $90^\circ$ 变成垂直向量 $\mathbf{e}_\perp$：

  $$
  \mathbf{I}_{\mathrm{self}}\,\hat{\mathbf{i}} \;=\; \mathbf{I}_{\mathrm{self}}(\mathbf{I}_{\mathrm{self}}\mathbf{e}_\perp) \;=\; (\mathbf{I}_{\mathrm{self}}^2)\,\mathbf{e}_\perp \;=\; \mathbf{e}_\perp, \qquad \mathbf{I}_{\mathrm{self}}\cdot\bigl(\mathbf{I}_{\mathrm{self}}\,\hat{\mathbf{i}}\bigr) \;=\; \mathbf{I}_{\mathrm{self}}\cdot\mathbf{e}_\perp \;=\; 0!
  $$

  此时站在 $\mathbf{I}_{\mathrm{self}}$ 轴上的“我”去读取它在自身轴上的影子，信号干干净净等于 **$0$**！它明明就在身旁、模长分毫不减（$\lVert\mathbf{e}_\perp\rVert = 1$），却在“我”的标尺上连一丝投影都留不下——对于“我（`I`）”完全隐形，除了唤它作“虚（`i`）”还能叫什么？
- **乘两次 $\hat{\mathbf{i}}$（再转 $90^\circ$ 凑满 $180^\circ$ $\longrightarrow$ 从脚底反面破土重现为 `-1`）**：既然乘一次看不见，为什么 $\hat{\mathbf{i}}^2 = -1$ 却又能被观察者清清楚楚地看见了？因为在同一个平面内紧接着**再乘第二次 $\hat{\mathbf{i}}$**（利用正交基反对易 $\mathbf{e}_\perp\mathbf{I}_{\mathrm{self}} = -\mathbf{I}_{\mathrm{self}}\mathbf{e}_\perp$）：

  $$
  \bigl(\mathbf{I}_{\mathrm{self}}\,\hat{\mathbf{i}}\bigr)\hat{\mathbf{i}} \;=\; \mathbf{e}_\perp(\mathbf{I}_{\mathrm{self}}\mathbf{e}_\perp) \;=\; -\mathbf{e}_\perp(\mathbf{e}_\perp\mathbf{I}_{\mathrm{self}}) \;=\; -(\mathbf{e}_\perp^2)\,\mathbf{I}_{\mathrm{self}} \;=\; -\mathbf{I}_{\mathrm{self}}, \qquad \hat{\mathbf{i}}^2 \;=\; (\mathbf{I}_{\mathrm{self}}\mathbf{e}_\perp)(\mathbf{I}_{\mathrm{self}}\mathbf{e}_\perp) \;=\; -\mathbf{I}_{\mathrm{self}}^2\mathbf{e}_\perp^2 \;=\; -1!
  $$

  连续两次 $90^\circ$ 正交转向刚好拼满 $180^\circ$ 半圈，原本隐身在垂直盲区里的状态绕到了观察者自身实轴的**正反面（$-\mathbf{I}_{\mathrm{self}}$）**！它重新落回了观察者的可见视线之上，只是方向彻底倒置，交出了确定无疑的实数读数 $\mathbf{I}_{\mathrm{self}}\cdot(-\mathbf{I}_{\mathrm{self}}) = -1$（且往返平方回波恢复满额 $(-1)^2 = +1$）！

这里的 $\hat{\mathbf{i}}$ 是**实二维平面内的 $90^\circ$ 转向**，投影权重为 $0$；它不同于复希尔伯特空间里的**相位因子 $i$**——$i\lvert\mathrm{I}\rangle$ 与 $\lvert\mathrm{I}\rangle$ 是同一条射线，$\lvert\langle\mathrm{I}\mid i\,\mathrm{I}\rangle\rvert^2 = 1$；复空间里玻恩权重为 $0$ 的盲区是正交补 $\lvert\mathrm{I}\rangle^\perp$。二者的对应是本节的类比（`MODEL`）。

在 `trureturing` 的 `BalancedUnitaryComplexStructure` 模块中，在复矩阵代数 $M_n(\mathbb{C})$ 之内、无需预先指定哪个矩阵充当虚数单位，两条冻结的矩阵内核定理直接从正交与平衡条件内生铸造出了这一 $J^2 = -I$ 复结构（[第五章](ch05-complex-phase-and-rotors.md) [@lemma-skew-adjoint-unitary-square]、[@thm-relative-complex-structure-square]，`LEAN ✓`）：其一，反自伴右幺正平方引理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) 证明，任何同时满足反自伴性 $R^\dagger = -R$（代表无径向伸缩的 $90^\circ$ 纯正交转向）与右幺正性 $R R^\dagger = I_n$（代表单位面积模长）的算子 $R$，其二次作用必恒等于负单位阵 $R^2 = -I_n$；其二，相对复结构定理 [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) 证明，任意一对满足正交交叉抵消 $A B^\dagger + B A^\dagger = 0$ 及半模长平衡 $A A^\dagger = \frac{1}{2}I_n,\; B^\dagger B = \frac{1}{2}I_n$ 的分量 $A, B$，其交叉积自动张成典范相对复结构算子 $J := 2 A B^\dagger$，严格满足 $J^2 = -I_n$！下表将观察者视角下的可见实轴 `1`、单转盲区 `i`、双转反相重现 `i^2 = -1` 以及观察者基旋转 $90^\circ$ 的互补互换完整对照如下（纯单行单元格排版）：

| 观察者投影与转向模式 | 相对自我轴 `I` 几何夹角与变换 | 单程线性影子 vs. 往返玻恩回波 | 代数与内核形式化特征 | 物理宇宙中的核心职能 |
| :--- | :--- | :--- | :--- | :--- |
| **实轴同向基准 `1`（大写的 `I`）** | $0^\circ$ 共线同向锚定：$\mathbf{I}_{\mathrm{self}} \mapsto +\mathbf{I}_{\mathrm{self}}$ | 单程影子 $+1$；往返回波 $\cos^2 0^\circ = 1$ | $\mathbf{1}^2 = +1$，幂等存在线 $P_{\mathrm{I}}^2 = P_{\mathrm{I}}$（`born_probability_skeleton`） | 粒子落点锚定、能量本征值、去相干经典记录与纯实指数衰减/耗散 |
| **单次正交转向 `i`（小写的 `i` 盲平面）** | $90^\circ$ 严格正交入盲区：$\mathbf{I}_{\mathrm{self}}\hat{\mathbf{i}} = \mathbf{e}_\perp \perp \mathbf{I}_{\mathrm{self}}$ | 实平面内单程影子 **$0$**；往返回波 **$\cos^2 90^\circ = 0$**（对 `I` 彻底隐形；复相位 $i\lvert\mathrm{I}\rangle$ 则为同一射线，权重 $1$） | 反自伴正交转向 $R^\dagger = -R,\; R R^\dagger = I$（对角接口读出盲区） | 薛定谔方程 $-i\hat{H}/\hbar$ 保范切向速度、贝里几何相位与隐秘相干储备 |
| **两次正交转向 `i^2 = -1`（反相重现）** | $90^\circ + 90^\circ = 180^\circ$ 对径翻转：$(\mathbf{I}_{\mathrm{self}}\hat{\mathbf{i}})\hat{\mathbf{i}} = -\mathbf{I}_{\mathrm{self}}$ | 单程影子 **$-1$**（重返视线但反号）；往返回波 $(-1)^2 = 1$ | $R^2 = -I_n,\; J^2 = (2AB^\dagger)^2 = -I_n$（`relativeComplexStructure_square`） | 双缝干涉相消暗纹、二阶微扰反冲以及将隐藏换位子翻回实概率流（$i\times i = -1$） |
| **观察者自身转身 $90^\circ$（`i <-> 1` 互补互换）** | 测量基重定向 $\mathbf{I}_{\mathrm{self}} \mapsto \mathbf{e}_\perp$（如泡利 $Z \mapsto X$） | 昔日盲区 $\mathbf{e}_\perp$ 化实显影；旧实轴 $\mathbf{I}_{\mathrm{self}}$ 退入新盲区归零 | 非对角互补接口破盲（`robertson_schrodinger` 换位子下界） | 海森堡互补性：实与虚并非绝对本体割裂，而是随观察者站位互换的正交双翼 |

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" preset="imaginary-double-turn" height="520"}
**大写的“我（`I`）”与小写的“虚（`i`）”：两次 $90^\circ$ 正交旋转 $\hat{\mathbf{i}} \times \hat{\mathbf{i}} = -1$ 实验卡（`imaginary-double-turn`）。** 在紫色旋子平面内点击 `×i` 或拖动时间轴分步驱动琥珀色旋转态矢 $\mathbf{W}$：从可见实轴 $+\mathbf{I}$ 出发，第一次乘 $\hat{\mathbf{i}}$ 转 $90^\circ$ 落入品红垂直盲平面 $\mathbf{e}_\perp$（轴向读数 $\mathbf{I}\cdot\mathbf{W} = 0.000000$，对 `I` 彻底隐身），第二次乘 $\hat{\mathbf{i}}$ 再转 $90^\circ$ 凑满 $180^\circ$ 重返实轴反极点 $-\mathbf{I}$，单程读数翻为 $-1.000000$、往返回声恢复 $1.000000$（绿色 `LEAN ✓` 对应 `square_eq_neg_one_of_skewAdjoint_unitary`）。
:::

这一透视顺手揭开了整部量子动力学最核心的奥秘：**为什么薛定谔方程 $i\hbar\frac{\partial}{\partial t}\lvert\psi\rangle = \hat{H}\lvert\psi\rangle$ 的左边非要挂一个虚数单位 `i` 不可？**

不妨当场做一次去留 `i` 的生死对照（`手工推导`）：倘若抹去虚数 `i`，把演化方程改成纯实数一阶方程 $\frac{\partial\psi}{\partial t} = -\gamma\psi$（$\gamma > 0$），速度矢量与当前状态矢量处处共线同轴，解就只剩沿着观察者可见实轴原地坍缩的实指数衰减 $z_R(t) = e^{-\gamma t}$（或 $\gamma < 0$ 时指数爆炸）——状态模长 $\lvert z_R(t)\rvert = e^{-\gamma t}$ 与玻恩回波 $\lvert z_R(t)\rvert^2 = e^{-2\gamma t}$ 迅速溃散归零，连半度圆弧都转不出来！反之，一旦挂上 **`i`**，薛定谔方程改写为 $\frac{\partial}{\partial t}\lvert\psi\rangle = -\frac{i}{\hbar}\hat{H}\lvert\psi\rangle$：由于哈密顿量自伴（$\hat{H}^\dagger = \hat{H}$），演化生成元 $-\frac{i}{\hbar}\hat{H}$ 天然是**反自伴算子**，强制每一瞬间的演化速度矢量 $\partial_t\lvert\psi\rangle$ 都与当前状态 $\lvert\psi\rangle$ **严格呈 $90^\circ$ 正交切向**（$\operatorname{Re}\langle\psi\mid\partial_t\psi\rangle = 0$）！在实二维旋子图像中（`MODEL`），这意味着宇宙时间的每一次无穷小微步推进，都是朝着当前“我（`I`）”看不见的 $90^\circ$ 虚数盲区横向迈出一步极小圆弧 $z_S(t) = e^{-i\omega t} = \cos(\omega t) - i\sin(\omega t)$，在严守单位模长 $\lvert z_S(t)\rvert \equiv 1$ 的同时驱动永不枯竭的驻波回响！

更精妙的证据早已冻结在[第十二章](ch12-measurement-computation-and-gradients.md)的**投影测量概率流定理** [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow)（[@prop-measurement-gradient-flow]，`LEAN ✓`）之中：对任意厄米哈密顿量 $H$、星投影算符 $P$ 与演化密度态 $\rho_t = e^{-itH}\rho e^{+itH}$，可见玻恩投影概率 $\operatorname{projectionProbability}(H, \rho, P, t) = \operatorname{Re}\operatorname{Tr}(\rho_t P)$ 对时间的精确导数为

$$
\frac{d}{dt}\operatorname{projectionProbability}(H, \rho, P, t) \;=\; \operatorname{Re}\Bigl(i\,\operatorname{Tr}\bigl(\rho_t\,(H P - P H)\bigr)\Bigr), \qquad \Bigl(\operatorname{Re}\bigl(i\,\operatorname{Tr}(\rho_t(HP - PH))\bigr) : \mathbb{C}\Bigr) \;=\; i\,\operatorname{Tr}\bigl(\rho_t\,(H P - P H)\bigr)!
$$

细品这行等式里的代数神迹：两个自伴算符 $H$ 与 $P$ 的换位子 $HP - PH$ 是**反厄米算符**（若 $HP - PH = 0$，或系统处于能量本征态 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)、纯全局相位只在盲圆内空转，实轴概率导数恒为 $0$）；当 $HP - PH \neq 0$ 时，迹 $\operatorname{Tr}(\rho_t(HP - PH))$ 落在纯虚数盲区 $i\mathbb{R}$ 内，而薛定谔方程自带的前置因子 **`i`** 恰好对它施行了**第二次 $90^\circ$ 正交旋转**（$i \times i = -1$），把潜行在垂直盲区里的相位角速度分毫不差地翻回观察者的可见实轴，化作真实可测的概率涨落率！**看不见的“虚（`i`）”在幕后 $90^\circ$ 暗中拨动相位圆弧，看得见的“实（`I`）”在台前接收往返平方的驻波回响**——这就是单体复量子力学动力学一侧的秘密（`MODEL`）；复数在多体张量积结构中的不可替代性另见本节文献注所引 Renou 等 2021。

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" preset="schrodinger-arc-engine" height="520"}
**薛定谔 $i\hbar\partial_t\psi = \hat{H}\psi$ 保范圆弧时间引擎对比无 `i` 实指数衰减实验卡（`schrodinger-arc-engine`）。** 同屏对比两支随时间 $t$ 推进的轨迹（琥珀色标出当前时刻与态矢）：带 `i` 的反自伴生成元 $-i\hat{H}/\hbar$ 始终沿 $90^\circ$ 切向踏入虚平面，画出青色模长守恒圆弧 $e^{-i\omega t}$（$\lvert\psi(t)\rvert^2 = 1.000000$）并由 $i\,\operatorname{Tr}(\rho_t[H, P])$ 驱动实概率流；撤去 `i` 的纯实衰减虚线 $e^{-\gamma t}$ 则直指原点坍缩，$\lvert\psi(t)\rvert^2 = e^{-2t}$ 在 $t = 1$ 时仅剩 $0.135335$、$t = 2$ 时仅剩 $0.018316$（绿色 `LEAN ✓` 对应 `projection_probability_flow` 与 `energy_eigenstate_stationary`）。
:::

## 29.4.4 形式化锚点、往返回波与虚数双转基准算例、文献边界及前四阶正交闭环小结 {#sec-ch34-19-4}

我们将本节贯穿薛定谔—海森堡对偶迹拉回、秩一玻恩往返模平方归约与概率测度骨架、共同相位最低二次多项式定理、正交补投影与拉格朗日—格拉姆盲区余量、对角测量相位失明与罗伯逊—薛定谔换位子分解、反自伴与平衡相对复结构 $J^2 = -I$ 以及投影概率流精确对易子导数的十二项内核验证支点，汇列为本节第一至四阶正交盲区闭环的收束清单；它们彼此独立，各自只担保自己的陈述：

::: {#thm-ch34-roundtrip-born-and-imaginary-blindspot .theorem title="本节引用的十二条已验证声明：迹对偶、秩一玻恩归约、对角相位失明、投影概率流等" lean="D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction D5/S3/Quantum/FiniteDimensional.born_probability_skeleton D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow"}
在所钉 `trureturing` 冻结声明下，下列十二条彼此独立的数学陈述各自成立：

1. **状态—效应拉回迹对偶、秩一玻恩模平方归约、投影概率骨架与共同相位最低二次次数定理**：
   设 $d$ 为有限可判等类型（`[Fintype d] [DecidableEq d]`），量子信道 $\mathrm{channel} : \operatorname{QuantumChannel}\,d\,d$ 与完全正映射 $\mathrm{heisenberg} : \operatorname{MatrixAlgebra}\,d \to_{\mathrm{CP}} \operatorname{MatrixAlgebra}\,d$ 满足单步迹对偶 $\forall\,\mathrm{state}, \mathrm{effect},\; \operatorname{Tr}\bigl(\mathrm{channel.toCompletelyPositiveMap}(\mathrm{state})\cdot\mathrm{effect}\bigr) = \operatorname{Tr}\bigl(\mathrm{state}\cdot\mathrm{heisenberg}(\mathrm{effect})\bigr)$，则对一切步数 $t \in \mathbb{N}$、初态 $\rho : \operatorname{DensityState}\,d$ 与效应 $\mathrm{effect} \in \operatorname{MatrixAlgebra}\,d$，恒有

   $$
   \operatorname{Tr}\bigl((\operatorname{evolvedState}(\mathrm{channel}, t, \rho)).1 \cdot \mathrm{effect}\bigr) \;=\; \operatorname{Tr}\Bigl(\rho.1 \cdot \bigl((\lambda A,\, \mathrm{heisenberg}(A))^{[t]}(\mathrm{effect})\bigr)\Bigr).
   $$

   对有限可判等类型 $n$、指标类型 $\kappa$、矩阵族 $P : \kappa \to M_n(\mathbb{C})$、矩阵 $\rho \in M_n(\mathbb{C})$、分支 $k \in \kappa$ 及向量 $\phi, \psi : n \to \mathbb{C}$，只要 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 且 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，即有 $\operatorname{recordWeight}(P, \rho, k) = \bigl(\lVert\operatorname{star}\phi \mathbin{\cdot_{\mathrm{v}}} \psi\rVert^2 : \mathbb{C}\bigr)$；若进一步有 `[Fintype κ]`、`IsRecordMeasurement P` 且 $\rho.\mathrm{PosSemidef} \land \operatorname{Tr}(\rho) = 1$，则同时成立 $\operatorname{recordWeight}(P, \rho, k) = \operatorname{Tr}(\rho P_k)$ 与 $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\bullet\operatorname{conditionalState}(P, \rho, j)$；且对任意满足 $\rho.\mathrm{PosSemidef}$ 与 $\operatorname{Tr}(\rho) = 1$ 的 $\rho \in M_n(\mathbb{C})$，玻恩泛函满足 $\operatorname{bornProbability}(\rho, 1) = 1$、有限可加性 $\operatorname{bornProbability}(\rho, P + Q) = \operatorname{bornProbability}(\rho, P) + \operatorname{bornProbability}(\rho, Q)$，以及对一切满足 $P^\star = P$ 与 $P^2 = P$ 的投影矩阵成立 $0 \le \operatorname{bornProbability}(\rho, P)$。同时，在有限指标集 $\iota$（`[Fintype ι]`）上的形式复共轭多项式环 $\operatorname{Poly}(\iota)$ 中，每个 $p$ 存在唯一 $q$ 使 $\forall z,\; \operatorname{actual}(q, z) = \operatorname{eval}(\operatorname{cartesian}(z), p)$ 且 `toCartesian` 保持总次数与各阶齐次性，全局共同相位不变性满足 $\operatorname{Invariant}(p) \iff \operatorname{Balanced}(p) \iff p \in \operatorname{quadraticAlgebra}(\iota)$，任何非常数共同相位不变多项式必满足 $\operatorname{totalDegree}(p) \ge 2$（对角二次元 $z_i\bar{z}_i$ 精确取到次数 $2$），且每个 $2$ 阶齐次实值不变式唯一表为厄米二次型 $z^\dagger H z$（处处非负当且仅当 `H.PosSemidef`）。

2. **闭子空间正交补投影六恒等式与拉格朗日—格拉姆外积差额恒等式**：
   在标量域 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$ 上的完备内积空间 $E$ 中，任意闭子空间 $M \le E$ 的正交投影 $P_M = M.\mathrm{starProjection}$ 与正交补投影 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$ 同时满足 $P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E} - P_M$、$P_M \circ_L P_M = P_M$、$P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp}$、$P_M \circ_L P_{M^\perp} = 0$、$P_{M^\perp} \circ_L P_M = 0$ 及 $P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E}$；且对任意有限集 $s : \operatorname{Finset}\iota$ 与实序列 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \Bigl(\sum_{i \in s} u_i^2\Bigr)\Bigl(\sum_{i \in s} v_i^2\Bigr) - \Bigl(\sum_{i \in s} u_i v_i\Bigr)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s}(u_i v_j - u_j v_i)^2.
   $$

3. **计算基对角可观测量族相对相位失明与罗伯逊—薛定谔精确方差—换位子分解**：
   对任意指标类型 $I$ 与计算基对角单比特可观测量族 $\mathrm{observable} : I \to \mathrm{QubitMatrix}$（$\forall i,\; (\mathrm{observable}\;i).\mathrm{IsDiag}$），正负等幅叠加态满足 $\rho_+ := \operatorname{equalSuperpositionDensity} \neq \operatorname{qubitZ}\cdot\rho_+\cdot\operatorname{qubitZ} =: \rho_-$，但两者在该对角族上的联合玻恩读出完全重合；凡满足 $\operatorname{bornProbability}(\rho_+, \mathrm{interface}) \neq \operatorname{bornProbability}(\rho_-, \mathrm{interface})$ 的单比特矩阵 `interface` 必满足 $\neg\,\mathrm{interface}.\mathrm{IsDiag}$，且非对角泡利矩阵 `qubitX` 严格区分 $\rho_+$ 与 $\rho_-$。进一步在任意复内积空间 $E$ 上，对对称线性算子 $A, B : E \to_{\mathbb{C}} E$ 与单位向量 $\psi \in E$（$\lVert\psi\rVert = 1$），记 $u = A\psi - \langle\psi, A\psi\rangle_{\mathbb{C}}\psi$、$v = B\psi - \langle\psi, B\psi\rangle_{\mathbb{C}}\psi$、对称协方差 $\mathrm{cov}$、半换位子期望 $C_{1/2} = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$ 及余项 $G = \lVert u\rVert^2\lVert v\rVert^2 - \lvert\langle u, v\rangle_{\mathbb{C}}\rvert^2$，恒有

   $$
   \lVert u\rVert^2 \lVert v\rVert^2 \;=\; \mathrm{cov}^2 + \lvert C_{1/2}\rvert^2 + G, \qquad G \ge 0, \qquad \operatorname{Re}\langle u, v\rangle_{\mathbb{C}} = \mathrm{cov}, \qquad \bigl(\operatorname{Im}\langle u, v\rangle_{\mathbb{C}} : \mathbb{C}\bigr) = C_{1/2}.
   $$

4. **反自伴右幺正算子与平衡正交对相对复结构的平方负一恒等式及投影概率流对易子导数**：
   在有限可判等类型 $n$ 上，任意同时满足反自伴性 $R^{\mathrm{H}} = -R$ 与右幺正性 $R R^{\mathrm{H}} = I_n$ 的复矩阵 $R \in M_n(\mathbb{C})$ 恒满足 $R^2 = -I_n$；对任意满足正交交叉条件 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 及半模长平衡条件 $A A^{\mathrm{H}} = \frac{1}{2}I_n$、$B^{\mathrm{H}} B = \frac{1}{2}I_n$ 的矩阵 $A, B \in M_n(\mathbb{C})$，相对复结构矩阵 $J := \operatorname{relativeComplexStructure}(A, B) = 2 A B^{\mathrm{H}}$ 恒满足

   $$
   J^2 \;=\; -I_n.
   $$

   且对任意厄米哈密顿矩阵 $H \in M_n(\mathbb{C})$（`H.IsHermitian`）、星投影矩阵 $P \in M_n(\mathbb{C})$（`IsStarProjection P`）与初态 $\rho : \operatorname{DensityState}\,n$（记演化态 $\rho_t := \operatorname{evolvedDensity}(H, \rho, t)$），对一切实时间 $t \in \mathbb{R}$ 同时成立 $\bigl(\operatorname{projectionProbability}(H, \rho, P, t) : \mathbb{C}\bigr) = \operatorname{bornProbability}(\rho_t, P)$、精确时间导数恒等式

   $$
   \frac{d}{dt}\operatorname{projectionProbability}(H, \rho, P, t) \;=\; \operatorname{Re}\Bigl(i\,\operatorname{Tr}\bigl(\rho_t\,(H P - P H)\bigr)\Bigr), \qquad \Bigl(\operatorname{Re}\bigl(i\,\operatorname{Tr}(\rho_t(HP - PH))\bigr) : \mathbb{C}\Bigr) \;=\; i\,\operatorname{Tr}\bigl(\rho_t\,(H P - P H)\bigr),
   $$

   以及当 $H P - P H = 0$ 时对一切 $t \in \mathbb{R}$ 恒有 $\operatorname{projectionProbability}(H, \rho, P, t) = \operatorname{projectionProbability}(H, \rho, P, 0)$。
:::

::: proof
第 1 组中，`observer_pullback_trace_identity` 对离散步数 $t \in \mathbb{N}$ 关于任意矩阵 `effect` 施行泛化归纳，将信道前向一步与海森堡拉回一步沿单步对偶恒等式逐拍移位（见 [@thm-ch34-perpendicular-axis-and-pullback]）；`rank_one_pure_state_modulus_square_reduction` 展开秩一外积乘积 $\operatorname{vecMulVec}(\psi,\operatorname{star}\psi)\cdot\operatorname{vecMulVec}(\phi,\operatorname{star}\phi)$ 并取迹，将去程与回程内积共轭拼成 $\lVert\operatorname{star}\phi \mathbin{\cdot_{\mathrm{v}}} \psi\rVert^2$（见 [@thm-born-modulus-square]），`rank_one_born_pairing_weight` 结合记录测量的半正定迹归零性质核验零权重分支与非零权重分支的条件态求和重构（见 [@thm-rank-one-born-pairing]）；`born_probability_skeleton` 利用 $P = P^2 = P P^\star$ 与迹循环交换将 $\operatorname{Tr}(\rho P)$ 化为半正定三明治迹 $\operatorname{Tr}(P\rho P^\star) \ge 0$（见 [@thm-born-probability-skeleton]）；`complete_common_phase_polynomial_theorem` 通过实笛卡尔与全纯—反全纯可逆线性变换保持次数，由三角指数频率独立性锁定 $z \mapsto e^{i\alpha} z$ 不变充要于全纯与反全纯次数逐项相等 $a = b$，从而非平凡不变式总次数 $2a \ge 2$ 且二阶实齐次不变式由极化恒等式唯一对应厄米半正定二次型（见 [@thm-ch31-phase-polynomial-quadratic]）。第 2 组中，`orthogonal_complement_projection_identities` 直接由完备空间正交直和 $E = M \oplus M^\perp$ 导出互补幂等与正交消去；`lagrange_gram_identity` 展开双重反对称平方和并折半消去交叉项（见 [@thm-lagrange-gram-identity]）。第 3 组中，`diagonal_prime_observables_cannot_recover_relative_phase` 在二维计算基上直接核验 $\rho_+$ 与 $\rho_-$ 主对角元同为 $\frac{1}{2}$ 而非对角元反号 $\pm\frac{1}{2}$，故一切对角矩阵迹读数恒等，而 `qubitX` 读出 $+1 \neq -1$（见 [@thm-ch31-diagonal-phase-blindness]）；`robertson_schrodinger` 对中心化残差复内积 $\langle u, v\rangle_{\mathbb{C}}$ 拆出实部对称协方差与虚部半换位子，再叠加上非负柯西—施瓦茨余项 $G \ge 0$（见 [@thm-robertson-schrodinger]）。第 4 组中，`square_eq_neg_one_of_skewAdjoint_unitary` 将 $R^{\mathrm{H}} = -R$ 代入 $R R^{\mathrm{H}} = I_n$ 立得 $-R^2 = I_n \implies R^2 = -I_n$（见 [@lemma-skew-adjoint-unitary-square]），`relativeComplexStructure_square` 由 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 证得 $J^{\mathrm{H}} = -J$ 并由 $B^{\mathrm{H}} B = \frac{1}{2}I_n,\; A A^{\mathrm{H}} = \frac{1}{2}I_n$ 证得 $J J^{\mathrm{H}} = 4 A(\frac{1}{2}I_n)A^{\mathrm{H}} = I_n$，调用前者即得 $J^2 = -I_n$（见 [@thm-relative-complex-structure-square]）；`projection_probability_flow` 对矩阵指数演化 $\rho_t = e^{-itH}\rho e^{itH}$ 求 Fréchet 时间导数 $(-iH\rho_t + i\rho_t H)$，乘以自伴幂等 $P$ 后利用迹循环移位收束为 $i\,\operatorname{Tr}(\rho_t(HP - PH))$，并由 $(\rho_t(HP - PH))^{\mathrm{H}} = -(HP - PH)\rho_t$ 证明该复乘积迹恒等于自身共轭从而纯实（见 [@prop-measurement-gradient-flow]）。完整证明由 Lean 内核检查。
:::

下面我们通过一组三部曲高精度基准算例，将六档特征倾角下的马吕斯—玻恩往返回波与方位盲锥几何、罗伯逊—薛定谔换位子不确定度下界随盲平面相位 $\varphi$ 的显影曲线、以及带 `i` 薛定谔圆弧与去 `i` 实衰减轨迹逐项核算至小数点后六位：

::: {#ex-ch34-malus-echo-cone-and-imaginary-turn-benchmark .example title="马吕斯—玻恩往返回波与盲区圆锥、罗伯逊—薛定谔相位换位子下界及薛定谔圆弧对比实衰减精确基准算例"}
本算例对单量子比特圆锥纯态族 $\lvert\psi(\theta, \varphi)\rangle = \cos\theta\lvert 0\rangle + e^{i\varphi}\sin\theta\lvert 1\rangle$（相对观察者基矢 $\lvert\mathrm{I}\rangle = \lvert 0\rangle$，其中 Dottie 自指不动点行采用 $\cos\theta^* = \theta^*$ 的精确正根 $\theta^* \approx 0.7390851332\;\mathrm{rad} \approx 42.3464588341^\circ$ 求值后再四舍五入至六位小数）及时间演化因子作闭式解析与六位小数数值检核（`手工推导` / `NUM`）：

1. **六档倾角 $\theta \in \{0^\circ, 30^\circ, \theta^*, 45^\circ, 60^\circ, 90^\circ\}$ 下的单程振幅、往返玻恩回波、正交盲区差额与三维方位盲锥几何表**：
   逐档核算单程实轴投影 $\cos\theta$、单程正交振幅 $\sin\theta$、往返双投影回波 $\cos^2\theta$、漏入 $90^\circ$ 盲区的外积面积平方 $\sin^2\theta$、非对角相干模长 $\frac{1}{2}\sin(2\theta)$、对应布洛赫球极余纬角 $\vartheta_{\mathrm{Bloch}} = 2\theta$、盲锥极冠立体角 $2\pi(1 - \cos\theta)\;\mathrm{sr}$ 以及盲平面隐身纬圈周长 $2\pi\sin\theta$：

| 倾角 $\theta$（度） | 单程投影 $\cos\theta$ | 正交振幅 $\sin\theta$ | 往返回波 $\cos^2\theta$ | 盲区差额 $\sin^2\theta$ | 相干模 $\frac{\sin(2\theta)}{2}$ | 布洛赫角 $\vartheta_{\mathrm{Bloch}} = 2\theta$ | 盲锥立体角 $2\pi(1-\cos\theta)$（$\mathrm{sr}$） | 盲圆周长 $2\pi\sin\theta$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$0^\circ$** | $1.000000$ | $0.000000$ | $1.000000$ | $0.000000$ | $0.000000$ | $0.000000^\circ$ | $0.000000$ | $0.000000$ |
| **$30^\circ$** | $0.866025$ | $0.500000$ | $0.750000$ | $0.250000$ | $0.433013$ | $60.000000^\circ$ | $0.841787$ | $3.141593$（$\pi$） |
| **$\theta^* \approx 42.346459^\circ$** | $0.739085$ | $0.673612$ | $0.546247$ | $0.453753$ | $0.497857$ | $84.692918^\circ$ | $1.639376$ | $4.232429$ |
| **$45^\circ$** | $0.707107$ | $0.707107$ | $0.500000$ | $0.500000$ | $0.500000$ | $90.000000^\circ$ | $1.840302$ | $4.442883$ |
| **$60^\circ$** | $0.500000$ | $0.866025$ | $0.250000$ | $0.750000$ | $0.433013$ | $120.000000^\circ$ | $3.141593$（$\pi$） | $5.441398$ |
| **$90^\circ$** | $0.000000$ | $1.000000$ | $0.000000$ | $1.000000$ | $0.000000$ | $180.000000^\circ$ | $6.283185$（$2\pi$） | $6.283185$（$2\pi$） |

   每一行都严格满足往返预算守恒 $\cos^2\theta + \sin^2\theta = 1.000000$：在第一章引入并将于后文 [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics) 深化热力学意义的 Dottie 自指不动点 $\theta^* \approx 42.346459^\circ$ 处，单程可见余弦 $\cos\theta^* = 0.739085$ 恰等于弧度数本身，往返回波保住 $54.6247\%$ 可见锚定份额而将 $45.3753\%$ 留给正交虚平面相干储备（相干模长高达 $0.497857$，逼近理论极值 $0.500000$）；而在 $\theta = 90^\circ$ 正交极点处，盲平面隐身圆撑满单位大圆周长 $2\pi \approx 6.283185$，观察者轴上的单程投影与双程回波则双双精确归零！

2. **转向 $90^\circ$ 互补可观测量对 $(A, B) = (\sigma_z, \sigma_x)$ 时的罗伯逊—薛定谔换位子下界对照表**：
   固定自我轴算符 $\sigma_z$ 与 $90^\circ$ 盲平面探针算符 $\sigma_x$，由 $[\sigma_z, \sigma_x] = 2i\sigma_y$ 知半换位子不确定度下界为 $\frac{1}{2}\lvert\langle[\sigma_z, \sigma_x]\rangle\rvert = \lvert\langle\sigma_y\rangle\rvert = \lvert\sin(2\theta)\sin\varphi\rvert$（同时满足精确不等式 $\Delta\sigma_z\,\Delta\sigma_x = \sin(2\theta)\sqrt{1 - \sin^2(2\theta)\cos^2\varphi} \ge \lvert\sin(2\theta)\sin\varphi\rvert$）：

| 倾角 $\theta$（度） | $\varphi = 0$ 时换位子下界 | $\varphi = \frac{\pi}{4}$ 时换位子下界 | $\varphi = \frac{\pi}{2}$ 时换位子下界 | 盲平面相位互补特征 |
| :--- | :---: | :---: | :---: | :--- |
| **$0^\circ$** | $0.000000$ | $0.000000$ | $0.000000$ | 纯实轴本征态，$\Delta\sigma_z = 0$，盲圆缩为单点 |
| **$30^\circ$** | $0.000000$ | $0.612372$（$\frac{\sqrt{6}}{4}$） | $0.866025$（$\frac{\sqrt{3}}{2}$） | 随 $\varphi$ 旋入虚轴，换位子面积线性抬升 |
| **$\theta^* \approx 42.346459^\circ$** | $0.000000$ | $0.704076$ | $0.995713$ | 在 $\varphi = \frac{\pi}{2}$ 处达最大换位子面积的 $99.5713\%$ |
| **$45^\circ$** | $0.000000$ | $0.707107$（$\frac{\sqrt{2}}{2}$） | $1.000000$ | 赤道叠加态，$\varphi = \frac{\pi}{2}$（$\lvert +i\rangle$）饱和满额换位子界 $1$ |
| **$60^\circ$** | $0.000000$ | $0.612372$（$\frac{\sqrt{6}}{4}$） | $0.866025$（$\frac{\sqrt{3}}{2}$） | 与 $30^\circ$ 呈互补角对称 $\sin(120^\circ) = \sin(60^\circ)$ |
| **$90^\circ$** | $0.000000$ | $0.000000$ | $0.000000$ | 正交对径本征态 $\lvert 1\rangle$，$\Delta\sigma_z = 0$，全局相位归入射线核 |

3. **带虚数 `i` 的薛定谔保范圆弧演化 $z_S(t) = e^{-it}$ 对比抹去 `i` 的纯实衰减 $z_R(t) = e^{-t}$ 轨迹对账表（无量纲标度 $\omega = \gamma = 1$）**：

| 时间 $t$ | 薛定谔实部 $\cos t$ | 薛定谔虚部 $-\sin t$ | 薛定谔模长 $\lvert e^{-it}\rvert$ | 薛定谔回波 $\lvert e^{-it}\rvert^2$ | 去 `i` 实模长 $e^{-t}$ | 去 `i` 实回波 $e^{-2t}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$0.00$** | $1.000000$ | $0.000000$ | $1.000000$ | $1.000000$ | $1.000000$ | $1.000000$ |
| **$0.25$** | $0.968912$ | $-0.247404$ | $1.000000$ | $1.000000$ | $0.778801$ | $0.606531$ |
| **$0.50$** | $0.877583$ | $-0.479426$ | $1.000000$ | $1.000000$ | $0.606531$ | $0.367879$ |
| **$1.00$** | $0.540302$ | $-0.841471$ | $1.000000$ | $1.000000$ | $0.367879$ | $0.135335$ |
| **$2.00$** | $-0.416147$ | $-0.909297$ | $1.000000$ | $1.000000$ | $0.135335$ | $0.018316$ |

   对比触目惊心：一旦拿掉 `i`，到 $t = 2.00$ 时已有 **$98.1684\%$** 的玻恩回波原地湮灭（仅存 $0.018316$），且实坐标永远被困在正半轴上动弹不得；而保留 `i` 的薛定谔轨迹在全时段守住模长与总回波 $1.000000$ 分毫不损，并在跨过 $t = \frac{\pi}{2} \approx 1.570796$ 的纯虚盲区零点后翻转进入负实半轴（$\cos 2 \approx -0.416147$），完成生生不息的相位振荡！
:::

::: {#rem-ch34-born-luders-malus-descartes-complex-qm-literature .remark title="玻恩平方律、吕德斯测量、马吕斯偏振律、笛卡尔“虚数”词源、二向量复结构与复希尔伯特空间实验判据的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将往返双投影、玻恩平方定则、笛卡尔虚数命名与复量子力学动力学收束进观察者正交盲区几何时，严格恪守以下三道认识论边界：

1. **量子测量平方律、偏振光学、复数几何化、克利福德双向量与复量子力学不可替代性的经典及前沿文献**：波函数跃迁幅模平方概率诠释由 M. Born（*Z. Phys.* **37**, 863–867 & **38**, 803–827, 1926）提出；正交投影算符测量公理与保持子空间内相干的 $P\rho P$ 测后更新规则分别由 J. von Neumann（*Mathematische Grundlagen der Quantenmechanik*, Springer, 1932）与 G. Lüders（*Ann. Phys. (Leipzig)* **443**, 322–328, 1951）确立；线偏振光通过偏振片的 $\cos^2\theta$ 强度定律由 É.-L. Malus（*Mém. Phys. Chim. Soc. d'Arcueil* **2**, 143–158, 1809）发现；将负平方根命名为 *nombre imaginaire*（虚数）的词源出自 R. Descartes（*Discours de la méthode: La Géométrie*, Leiden, 1637），而复平面 $90^\circ$ 几何旋转表示则由 C. Wessel（1799）、J.-R. Argand（1806）与 C. F. Gauss（1831）相继建立；将虚数单位还原为实欧氏平面有向单位双向量 $\hat{\mathbf{i}} = \mathbf{e}_1\wedge\mathbf{e}_2$（$\hat{\mathbf{i}}^2 = -1$）的几何代数体系归功于 W. K. Clifford（*Amer. J. Math.* **1**, 350–358, 1878）与 D. Hestenes（*Space-Time Algebra*, Gordon and Breach, 1966）；在实希尔伯特空间重写单系统量子力学必须额外引入满足 $J^2 = -I$ 且与全体可观测量对易的全局反对称复结构算子 $J$，由 E. C. G. Stueckelberg（*Helv. Phys. Acta* **33**, 727–752, 1960）严格证明；进一步地，在保持独立源局域张量积结构的多体纠缠交换贝尔网络中，M.-O. Renou, D. Trillo, M. Weilenmann, T. P. Le, A. Tavakoli, N. Gisin, A. Acín & M. Navascués（*Nature* **600**, 625–629, 2021）从理论上证明、并由超导与光量子实验（M.-C. Chen 等，*Phys. Rev. Lett.* **128**, 040403, 2022；Z.-D. Li 等，*Phys. Rev. Lett.* **128**, 040402, 2022）直接证伪了不带局域复结构的纯实数标准张量积量子理论。
2. **内核已验证 `LEAN ✓` 定理、精确闭式演算（`手工推导` / `NUM`）与观察者第一人称“实/虚”诠释（`MODEL`）的严格界限**：[@thm-ch34-roundtrip-born-and-imaginary-blindspot] 所列十二条冻结声明——连同正文内联引用的划分拓扑不可分核 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)、圆周双覆叠历史提升 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift) 与能量本征态定态性 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)——均已在 Lean 4 内核中零公理缺口验证（`LEAN ✓`）；欧氏实向量双次投影回波 $\Pi_{\mathbf{I}}(\Pi_{\mathbf{V}}(\mathbf{I})) = \cos^2\theta\,\mathbf{I}$、克利福德双向量单转归零 $\mathbf{I}_{\mathrm{self}}\cdot(\mathbf{I}_{\mathrm{self}}\hat{\mathbf{i}}) = 0$ 与双转反相 $(\mathbf{I}_{\mathrm{self}}\hat{\mathbf{i}})\hat{\mathbf{i}} = -\mathbf{I}_{\mathrm{self}}$、布洛赫倍角换算 $\vartheta_{\mathrm{Bloch}} = 2\theta$ 及三组六位小数基准算例均属可直接复核的闭式数学推导与高精度数值计算（`手工推导` / `NUM`），且正文已明确交代：仅凭相位不变性会将多项式限制于偶次平衡代数 `quadraticAlgebra`（最低非平凡次数 $2$），排除四次及以上高偶次项还需叠加最低次数原则或格里森—布施正交/效应可加公理。在此之上，把实部 `1` 与虚数 `i` 诠释为第一人称观察者 `I` 轴向可见投影与 $90^\circ$ 正交视觉盲区的内生几何对偶（“对于我 `I` 看不见，可不是虚 `i` 吗”），并将玻恩平方定则诠释为无外部点 $C$ 下的自治雷达回波确认，属于本书提出的统一认识论与几何物理模型（`MODEL`）。
3. **复合系统数域遴选与背景无关量子引力测量的开放前沿（`OPEN`）**：在不预设连续张量积流形公设的前提下，纯粹从有限离散组合比较图第一性原理唯一导出复合量子系统为何排他性地遴选复希尔伯特空间（$\mathbb{C}$）而非四元数（$\mathbb{H}$）或八元数代数，以及在无固定时空背景的 `3+1D` 非微扰量子引力中严格调和内嵌观察者吕德斯相对投影更新与微分同胚规范约束（受制于[附录 E](appendix-e.md) 桥接假设 `H4`、`H8`、`H9`），在当代量子基础与数学物理中仍属未决开放问题（`OPEN`）。
:::

至此，我们已经走完了第二十九章前**四级**正交盲区反演与往返校准阶梯（[§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–§29.4）的完整闭环！从静态球面“正交一次”与“正交两次”的读数简并唯一反演出观察者的极点站位（[§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion)–[§29.3](ch34-s03-universal-localization.md#sec-ch34-universal-observer-localization)），直至在本节与 [§29.1](ch34-s01-spherical-addressing.md#sec-ch34-spherical-addressing-inversion) 的赤道盲区当场重逢——**认出那片对大写的“我（`I`）”正交隐身的 $90^\circ$ 盲平面原就是小写的“虚数（`i`）”，认出它的往返两次投影回波原就是玻恩平方律 $\cos^2\theta$，认出它的幕后直角切向拨动原就是薛定谔时间演化的圆弧脉搏**！所谓实与虚、可见的经典概率与不可见的量子相位，从来不是世界分裂成了两半，只是“我（`I`）”站在自己的轴线上，把照得见的回波记作了实，把撑在正交盲区里的半壁江山唤作了虚。

沿着这道正交盲区与往返回波的基座继续向上攀登，整座第八部乃至第九部的恢弘脉络已尽收眼底：紧接着在 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)–[§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop) 中，我们将由零背景“二生三”投影自举撑开宇宙最底层的几何原胞——**极小三角弧面体 $\Delta\mathcal{T}_\epsilon$**，贯通贝里扇锥体积、驻波节点成体、克利福德单胞 $\partial^2 = 0$ 筛分、五阶概念阻塞级联、三维空间刚性锁死以及“线·面·体 $\leftrightarrow$ 粒子·波·场”的三阶闭环；继而在[第 30 章](ch30-chord-tunneling-and-arc-calculus.md)–[第 33 章](ch33-unified-arc-forces-and-af-gut.md)展开内割弦隧穿、极小圆弧体微积分、黎曼路径积分、不可表三元数与极小圆弧场大统一（AF-GUT），并在第九部[第 34 章](ch33-all-beings-observers-and-mutual-attractors.md)集中审视有限观察者的偏迹热力学、滑动格拉姆窗口及选支、行动、学习与宇宙学时间箭头的认识论压力测试。先在下方 `ECHO//IMAGINARY` 完整交互沙盘中把夹角推到 $90^\circ$、切进“我（`I`）”的第一人称视角并亲手触发一次 `i × i = -1` 双直角翻转（并在下方第 29.4.5 小节核验有限势垒与时间双缝的可测散射协议），随后步入 [§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)，推开极小三角弧面体的大门：

::: {.viz src="roundtrip-born-imaginary-blindspot-sandbox" height="640"}
**往返双投影平方律（$\cos^2\theta$）与观察者 `I` 的正交虚数盲区（`i`）完整交互实验室（`ECHO//IMAGINARY`）。** 在同一座三维琥珀色自我轴 `I` 与 $90^\circ$ 品红垂直盲平面 `i` 舞台上自由切换“雷达往返双投影与玻恩回声—$\theta^*$ 紫色方位盲锥与对角相位失明—第一人称侧看盲边与转 $90^\circ$ 基显相—`×i` 双直角旋子翻转—薛定谔青色保范圆弧对比实数衰减”五张实验卡，连续拖动极角 $\theta \in [0^\circ, 90^\circ]$、盲平面初相 $\varphi_0 \in [0^\circ, 360^\circ)$ 与演化相位 $\omega t$（琥珀色标出当前选定态矢 $\mathbf{V}$ 与玻恩回声 $\cos^2\theta$），同屏核验青色单程影子 $\cos\theta$ 与往返折线、品红盲区亏量 $\sin^2\theta$ 及紫色方位锥/旋子平面如何统摄实与虚；右侧依据栏十枚绿色 `LEAN ✓` 徽章逐一对应舞台实时验算的十条 `trureturing` 内核定理实例。
:::

## 29.4.5 有限势垒与时间双缝：把虚数盲区放回可测协议 {#sec-ch34-19-5}

前四小节在有限维内积空间中讨论了 $90^\circ$ 正交盲区与往返平方读出。将这一视角延伸到连续波散射与时域干涉时，首先要把微分方程的解析结构与几何比喻严格分开：在一维定态薛定谔方程中，经典禁区（$E < V_0$）内出现虚数波数 $k_{\mathrm{in}} = i\kappa$ 是边值问题的标准**解析描述**；至于把势垒入口比作“波幅在实空间发生 $90^\circ$ 拐弯”或“沿正交盲区切出极小圆弧割弦”，则是本书的**作者几何诠释**，并未由相邻小节的 Lean 定理（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]）推出。任何关于隧穿相位或干涉可见度的物理判断，都必须落回边界条件完备、探针耦合明确的可测协议中检验。

### 29.4.5.1 有限方势垒的双分支匹配与幺正流守恒 {#sec-ch34-19-5-1}

取归一化单位 $\hbar = 1$、$m = \frac{1}{2}$、$V_0 = 1$（即 $2m = 1$、$\frac{\hbar^2}{2m} = 1$、$\frac{\hbar}{m} = 2$），考察区间 $[0, L]$ 上的实值矩形势垒：垒内 $V(x) = 1$，外侧 $x < 0$ 与 $x > L$ 同为零势且无吸收损耗。当入射能量满足 $0 < E < 1$ 时，记外侧实波数 $k = \sqrt{E}$、垒内实衰减率 $\kappa = \sqrt{1 - E}$。在仅从左侧单侧入射的散射边界条件下，全空间定态波函数分段写为

$$
\psi(x) \;=\; \begin{cases}
e^{ikx} + r\,e^{-ikx}, & x < 0, \\
A\,e^{\kappa x} + B\,e^{-\kappa x}, & 0 \le x \le L, \\
t\,e^{ikx}, & x > L.
\end{cases}
$$

在 $x = 0$ 与 $x = L$ 两处**同时连续匹配 $\psi$ 与一阶导数 $\psi'$**，四个线性方程把垒内增长分支 $A e^{\kappa x}$ 与衰减分支 $B e^{-\kappa x}$ 一并锁入解中。对垒内解 $\psi(x) = A e^{\kappa x} + B e^{-\kappa x}$ 直接计算概率流密度 $j = (\hbar/m)\operatorname{Im}(\overline{\psi}\,\psi') = 2\operatorname{Im}(\overline{\psi}\,\psi')$，实指数自乘项虚部恒消，交叉项给出

$$
j \;=\; -4\kappa\,\operatorname{Im}(\overline{A} B) \;=\; 4\kappa\,\operatorname{Im}(\overline{B} A).
$$

由此可见，单独任一实指数分支（$A = 0$ 或 $B = 0$）均为零流；唯有 $A, B$ 两支同时非零，且二者具有非平凡的**相对复相位**（$\overline{A} B \notin \mathbb{R}$）时，该相对相位决定的交叉流才非零。同时须注意：在左侧 $x < 0$ 区域，尽管入射波与反射波叠加形成部分驻波形态的模方空间起伏，只要 $|r| < 1$（非全反射），左侧叠加场的净流绝不为零，而是严格等于垒内交叉流与右侧透射流，即 $2k(1 - |r|^2) = 4\kappa\operatorname{Im}(\overline{B} A) = 2k|t|^2$。结合实势与外侧同势，反射率 $R = |r|^2$ 与透射率 $T = |t|^2$ 严格满足 $R + T = 1$，消去中间系数手算即得精确透射率：

$$
T \;=\; \left[1 + \frac{\sinh^2(\kappa L)}{4E(1 - E)}\right]^{-1}.
$$

::: {.example #ex-ch34-square-barrier-half-height title="半高方势垒 E = 0.5, L = 2 的精确闭式与 WKB 边界辨析"}
取 $E = 0.5$、$L = 2$，则 $k = \kappa = \frac{1}{\sqrt{2}}$，$4E(1 - E) = 1$，$\kappa L = \sqrt{2}$。代入上式无需任何小数近似，直接得到精确闭式

$$
T \;=\; \bigl[1 + \sinh^2(\sqrt{2})\bigr]^{-1} \;=\; \operatorname{sech}^2(\sqrt{2}), \qquad R \;=\; 1 - T \;=\; \tanh^2(\sqrt{2}),
$$

对应复透射幅 $t = e^{-i\sqrt{2}}\operatorname{sech}(\sqrt{2})$、反射幅 $r = -i\tanh(\sqrt{2})$。注意半经典 WKB 近似仅给出主指数因子 $\exp\bigl(-2\int_0^L \kappa(x)\,dx\bigr) = e^{-2\kappa L}$；矩形势垒在 $x = 0, L$ 处具有尖锐不连续边界，缓变势前提在此失效，完整渐近式的前因子（$\kappa L \gg 1$ 时精确式渐近于 $16E(1-E)e^{-2\kappa L}$）与光滑势转折点连接公式均须另行计算。
:::

::: {.viz src="scattering-temporal-bridge" preset="barrier" height="500"}
**有限方势垒双分支匹配的三维波场（`barrier`）。** 三维 $(x, \operatorname{Re}\psi, \operatorname{Im}\psi)$ 舞台沿紫色坐标轴同时绘出青色第一分支、品红色第二分支与紫色合成波函数曲线。仅紫色合成波函数 $\psi$ 与 $\psi'$ 在势垒界面处连续衔接，琥珀色标记指示当前选定位置。
:::

### 29.4.5.2 时间双缝的能量条纹、标记内积与探测协议边界 {#sec-ch34-19-5-2}

若把两道散射通道改置于时间轴上，在时刻 $t_1, t_2$ 开启的两扇理想超快时间窗便构成**时间双缝**。设两扇窗的复振幅分别为 $A_1 \neq 0$ 与 $A_2$，并各自携带归一化路径标记态 $\lvert m_1\rangle, \lvert m_2\rangle$。定义有向时差 $\Delta t := t_1 - t_2 \neq 0$，从总态矢量 $A_1 e^{-iEt_1/\hbar}\lvert m_1\rangle + A_2 e^{-iEt_2/\hbar}\lvert m_2\rangle$ 中提取公因子 $A_1 e^{-iEt_1/\hbar}$，即得第二支相对时间相位因子 $\exp[iE(t_1 - t_2)/\hbar] = \exp(iE\Delta t/\hbar)$（若改按正延时 $\tau := t_2 - t_1 > 0$ 记号，则有 $\Delta t = -\tau$，对应 $q = -E\tau/\hbar$，二者完全一致而无正负号冲突）。令幅值比 $a := |A_2 / A_1| \ge 0$，将一般复内积 $\langle m_1 \mid m_2\rangle$ 的辐角与 $\arg(A_2 / A_1)$ 一并并入总附加相位 $\varphi \in \mathbb{R}$，并记实非负标记重叠度 $\mu := |\langle m_1 \mid m_2\rangle| \in [0, 1]$ 以及无量纲相位变量 $q := E\Delta t/\hbar$，则约化双分支与交互媒体的归一化参数严格一致：$z_1 = 1$，$z_2 = a\exp\bigl(i(q + \varphi)\bigr)$。注意理想脉冲核下未归一化的两路合成模平方 $|A_1|^2\bigl(1 + a^2 + 2a\mu\cos(q + \varphi)\bigr)$ 在无穷能量轴 $E \in (-\infty, \infty)$ 上积分发散，**并不是对全能量归一的概率密度**；对标记空间求迹并除以不相干基线 $|A_1|^2(1 + a^2)$，得到**相对于不相干基线 $1 + a^2$ 的相对谱强度**：

$$
P(E) \;=\; \frac{1 + a^2 + 2a\mu\cos(q + \varphi)}{1 + a^2}, \qquad q \;=\; \frac{E\Delta t}{\hbar}.
$$

真实有限持续时间脉冲须在此相对调制因子之外再乘有限带宽频谱包络 $|f(E)|^2$ 方可作能量归一化。在本节正幅值比 $a > 0$、正标记重叠度 $\mu > 0$ 与相位 $\varphi$ **均与能量 $E$ 无关**的模型下，相位 $q + \varphi$ 随 $E$ 以常数斜率 $\Delta t/\hbar$ 线性推进；当 $\Delta t \ne 0$ 时，相邻干涉条纹具备恒定能量间距 $\Delta E = \frac{2\pi\hbar}{|\Delta t|} = \frac{h}{|\Delta t|}$。由恒等下界 $1 + a^2 + 2a\mu\cos(q + \varphi) \ge (1 - a)^2 + 2a(1 - \mu) \ge 0$ 可知，非平凡**完全相消** $P(E_0) = 0$ 当且仅当满足等幅 $a = 1$、完全不可区分 $\mu = 1$ 且 $q(E_0) + \varphi \equiv \pi \pmod{2\pi}$ 时成立；在上述常参量且 $\Delta t \ne 0$ 的条件下，此类相消仅在**孤立能量点 $E_0$** 处发生，绝不会在整个无限能量谱或具有非零谱宽的有限脉冲包络全频段上同时相消。

::: {.viz src="scattering-temporal-bridge" preset="cancel" height="500"}
**时间双缝在单一能量节点的等幅反相相消（`cancel`）。** 三维舞台沿紫色坐标轴展示等幅且无标记区分（$a = 1, \mu = 1$）下的青色第一分支、品红色第二分支与紫色合成轨迹。琥珀色标记指示当前选定状态点，在相对相位达 $\pi$ 的单一能量节点处两支反向抵消使紫色合成幅收拢至零轴。
:::

反之，当两扇时间窗留下正交可区分标记使 $\mu = 0$ 时，$P(E) \equiv 1$ 恒成立：这只是相对条纹消失的**消干涉**，不相干基线 $|A_1|^2(1 + a^2) > 0$ 依然保持正通量而非归零。同理，在势垒或双缝间引入探针能测得何种信号，取决于具体的**探针耦合强度、后选择条件、介质吸收与弱测量读出协议**，不能笼统泛称为“截桥”。尤其在共振原子系综透射光子的弱测量实验中，实验测得的**负弱值**对应**后选择子系综下的原子激发时间**（光子透射条件下原子处于激发态的时间弱值），绝不是负的粒子空间过垒飞行时间。

::: {.viz src="scattering-temporal-bridge" preset="marked" height="500"}
**正交路径标记消除时间双缝干涉起伏（`marked`）。** 三维舞台沿紫色坐标轴绘出正交路径标记（$a = 1, \mu = 0, \varphi = \pi, q = 0$）下的青色第一分支与品红色第二分支，琥珀色标记指示当前选定点。画中 $\sqrt{\mu}$ 加权合成幅归零，而紫色非相干本底 $(1 - \mu)(1 + a^2) > 0$ 仍保持，相对谱强度 $P = 1$。
:::

::: {.remark #rem-ch34-temporal-slit-and-weak-dwell-literature title="时间双缝衍射与后选择原子激发时间负弱值的文献索引（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 四项代表性时域衍射与弱值实验分别为：（1）阿秒光电离时间双缝实验：F. Lindner 等，*"Attosecond Double-Slit Experiment"*，*Phys. Rev. Lett.* **95**, 040401 (2005)，[https://doi.org/10.1103/PhysRevLett.95.040401](https://doi.org/10.1103/PhysRevLett.95.040401)；（2）光学频率超快时间双缝衍射：R. Tirole 等，*"Double-slit time diffraction at optical frequencies"*，*Nat. Phys.* (2023)，[https://doi.org/10.1038/s41567-023-01993-w](https://doi.org/10.1038/s41567-023-01993-w)（基于氧化铟锡 ITO 薄膜超快调制）；（3）泵浦驱动时变强耦合下的磁子模式时间衍射：*"Time-Varying Strong Coupling and the Induced Time Diffraction of Magnon Modes"* (2025)，[https://arxiv.org/abs/2411.06801](https://arxiv.org/abs/2411.06801) 与 [https://doi.org/10.1103/jc1c-k3ll](https://doi.org/10.1103/jc1c-k3ll)（系泵浦调控磁子模式实验，并非 2023 年 ITO 光学薄膜的同一装置）；（4）透射光子后选择下原子激发时间的负弱值实验：*"Experimental Observation of Negative Weak Values for the Time Atoms Spend in the Excited State as a Photon Is Transmitted"*，*Phys. Rev. Lett.* **136**, 153601 (2026)，[https://doi.org/10.1103/gjfq-k9dv](https://doi.org/10.1103/gjfq-k9dv)（预印本见 [https://arxiv.org/abs/2409.03680](https://arxiv.org/abs/2409.03680)，所测负弱值是后选择原子激发时间，而非负粒子过垒时间）。
:::

::: {.problem #prob-ch34-arc-scattering-falsifiability title="圆弧盲区诠释超出标准散射的可证伪协议要求（开放问题）"}
若将“正交盲区圆弧割弦”仅作为薛定谔边值问题与双通道干涉的几何重述，其可观测预言已完全由 $T(E, L)$ 与相对谱强度 $P(E)$ 决定。若主张该圆弧诠释蕴涵超出标准线性散射或弱测量理论的新物理效应，则必须明确给出探针耦合哈密顿量、吸收损耗与后选择读出协议，并在指定参数区间内导出与标准透射率 $T$ 或条纹可见度 $\frac{2a\mu}{1 + a^2}$ 定量可区分、可被实验直接证伪的预测。
:::

下方完整实验室将有限势垒匹配与双时间窗干涉各预设整合于同一三维交互主舞台，供读者切换核验分支相位与合成轨迹：

::: {.viz src="scattering-temporal-bridge" height="640"}
**有限势垒隧穿与时间双缝三维交互实验室（`scattering-temporal-bridge`）。** 三维主舞台沿紫色坐标轴统一呈现青色第一分支、品红色第二分支与紫色合成轨迹，覆盖有限势垒散射与双时间窗干涉各预设场景。琥珀色标记指示当前选定点，配合完整实验室控件可核对幅值比 $a$、标记重叠度 $\mu$ 与相对相位对合成幅的支配作用。
:::
