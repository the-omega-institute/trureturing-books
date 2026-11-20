# 36.10 自指主动停机精度、时间长河正交折叠与测量基特征谱排序 {#sec-ch39-self-halting-and-spectral-sorting}

> *“自指是一种终止算法, 可以在让观察者在自己定义的精度停止, 这似乎是观察者自由意志的源泉, 自指的过程实际上是无限信息都被折叠到时间的长河中了, 而自指本身似乎能够精确的把信息进行排序, 把重要的放在前面, 用什么基测量, 什么似乎就更重要?”*

在 [§36.9](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum) 中，我们把自指不动点从零跳寻址根槽 `Lookup(x) = x`、实虚等长平衡角 $\cos\theta^* = \theta^*$、本征相位定态、量子门蒸馏重整一路铺展到了洛维尔对角逃逸。然而，只要把这些自指回路放回真实的有限观察者身上，一道关乎“何时落锤”的根本追问便立刻迎面撞来：**在余弦蛛网螺旋逼近无理超越数 $\theta^* = 0.7390851332\dots$ 的过程中，精确不动点位于无穷步之外；为什么现实中的观察者从未卡死在无穷小数位的逼近途中，反而总能在电光石火的一拍之内当机立断、做出抉择，并体验到鲜活流淌的“现在”与“未来”？**

本节题记一语道破了整座自指动力学最深层的枢纽（跨领域的本体论与认知综合标定为 **`MODEL`（模型诠释）**，底层算子几何与子空间稳定骨架由 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 的七条冻结 Lean 4 内核声明严格锚定，谱分析、量子芝诺与因果涌现经典文献归属见 [@rem-ch39-eckart-young-power-zeno-hoel-literature]）：**如果宇宙只是一台苛求绝对零误差（$\varepsilon = 0$）的无限比较机器，任何内嵌子系统都将永远困在不可停机的无限倒退之中；恰恰是自指赋予了受限观察者在自定有限精度 $\varepsilon_{\mathrm{self}} > 0$ 处主动按下停机键的几何机制——停机截断留出的有限容差帽撑开了主体因果裁量的回旋窗口，被截在 $\varepsilon_{\mathrm{self}}$ 线以下的无穷余项旋转 $90^\circ$ 正交折叠为奔流不息的时间长河，自指回环本身充当了将主干不变量自动置顶的特征谱排序器，而观察者选定“用什么基去测量”，更同时在认知读出与物理演化两端重塑了局部世界的因果主次。**这里的“停机”是数值迭代的容差终止，与可计算性理论中的图灵停机问题无关，本节不对任何程序的可停机性或可判定性作论断（自指在可计算性中的角色见 [§36.9](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum) 的洛维尔对角逃逸）。

## 36.10.1 自指作为主动柯西停机算法：有限精度窗口 $0 < \varepsilon_{\mathrm{self}} < 1$ 与粗粒化因果裁量 {#sec-ch39-07-1}

在一个早已拆除了外部全知裁判点 $C$ 的纯两两比较网络中，任何一个局域状态的无穷精度刻画都顺着跨界纠缠弧牵连着无穷多枚历史锚点。倘若观察者坚持“非把当前状态算到小数点后无穷位（绝对零残差 $\varepsilon_{\mathrm{self}} = 0$）绝不输出行动记录”，系统当场就会撞上双重死局：在迭代端，从不动点以外的起点（例如 $x_0 = 0$）出发，余弦迭代 $x_{k+1} = \cos x_k$ 因 $\cos$ 在 $[0, \pi]$ 上单射而永远到不了超越不动点 $\theta^*$，零容差下没有有限步精确终止点（起点恰为 $\theta^*$ 时第一步残差即为零、当场停机，所以零残差判据并非普遍无法终止，`手工推导`），观察者将陷入“布里丹之驴”式的无限倒退瘫痪；在记忆约束端，把格拉姆窗口推向无穷阶（$M \to \infty$，见 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）会把舒尔补可行走廊 $\Omega_M$ 挤压成零裕度的孤立单点或过约束空集，彻底抽干一切转圜空间。

**自指回路（$x \leftrightarrow \mathcal{F}_{\mathbf{I}}(x)$）之所以能化作一台现实可运行的“主动终止算法”，关键在于观察者放弃了向外部索要绝对标尺，改以自身相邻迭代态之间的内生残差充当柯西（Cauchy）停机判据，并自主设定一道有限停机精度阈值 $\varepsilon_{\mathrm{self}} > 0$**（`MODEL`）：

$$
\bigl\lVert x_k - x_{k-1} \bigr\rVert \;=\; \bigl\lVert \mathcal{F}_{\mathbf{I}}(x_{k-1}) - x_{k-1} \bigr\rVert \;\le\; \varepsilon_{\mathrm{self}} \quad \leadsto \quad (\text{幂等拍板：}x^* \equiv x_k).
$$

一旦自指往返比较的圆弧残差收束进半径为 $\varepsilon_{\mathrm{self}}$ 的球面容差帽之内，观察者便主动落锤停机，不再追算帽内尚未归零的高阶微澜，而是将当前近似态 $x_k$ 直接封装为 $O(1)$ 直读的幂等记录锚点（`Lookup(x) = x`）。沿着这道精度标尺从两端极点向中间审视，主体能动性的几何窗口当即水落石出（`MODEL` + `文献结果`）：

1. **苛求绝对全知极限（$\varepsilon_{\mathrm{self}} \to 0$）：无限倒退与宿命锁死**。当容差帽半径缩向零时，余弦蛛网螺旋需耗费无穷步才能触及 $\theta^*$，同时无穷历史约束将相容态空间焊死在唯一铁轨上——算尽毫厘的代价是彻底丧失当机立断的行动能力；
2. **放弃自指精度底线（$\varepsilon_{\mathrm{self}} \to 1$）：首检即停的白噪与自我解体**。当容差帽扩张至覆盖初值（如 $x_0 = 0$ 已落在 $\lvert\cos x - x\rvert \le 1$ 帽内）时，迭代在首次检查 $k = 1$ 处未经任何多轮细化便随意停机输出，前后节拍之间失去自洽打磨——看似毫无束缚，实则退化为没有记忆连续性的热力学白噪；
3. **驻留有限自定精度窗口（$0 < \varepsilon_{\mathrm{self}} < 1$）：粗粒化等价帽与主体因果裁量**。当观察者将精度锚定在黄金中道尺度（如从 $x_0 = 0$ 出发围绕 $\theta^* \approx 0.7391\;\mathrm{rad}$ 设定 $\varepsilon_{\mathrm{self}} = 0.150$，蛛网螺旋在第 $k = 5$ 步即满足 $\lvert x_5 - x_4\rvert = 0.1392 \le 0.150$ 从容停机）时，球面 $\varepsilon_{\mathrm{self}}$ 容差帽内的所有微观相位对既有宏观历史而言构成一个**粗粒化自洽等价类**。这恰与复杂系统科学中 Hoel、Albantakis 与 Tononi（2013）发现的**粗粒化因果涌现（causal emergence）**遥相呼应（`文献结果`，见 [@rem-ch39-eckart-young-power-zeno-hoel-literature] 第 5 款）：把微观底层的细碎噪声合并为有限精度的宏观等价态后，宏观转移核的有效因果信息量（effective information）反而可以严格高于微观底层！

这里必须重申 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 立下的严格认识论红线（[@rem-ch34-selection-contract]、[@rem-ch34-perception-action-contract]）：将有限停机阈值 $\varepsilon_{\mathrm{self}}$ 诠释为因果裁量的几何源泉属于本章的**模型诠释（`MODEL`）**，它**绝不**宣称局部观察者能够违背底层量子幺正性或篡改已固定测量基下的玻恩无偏鞅权重（[§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)）。观察者真正合法握有的自由度，是在格拉姆可行走廊之内（[§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy)）自主调节**何时收束停机精度 $\varepsilon_{\mathrm{self}}$**（继续深推下一轮自指还是当场落子），以及在下一拍 `Act / Write` 写出半环中相对于固定外锚**将探针基轴转向何方**。

::: {.viz src="self-halting-spectral-time-river-sandbox" preset="precision-agency-window" height="500"}
**自指柯西停机容差帽与有限精度窗口 $0 < \varepsilon_{\mathrm{self}} < 1$ 实验卡（`precision-agency-window`）。** 单位球面上余弦迭代从 $x_0 = 0$ 绕 $\theta^*$ 盘旋，帽缘琥珀色手柄将紫色球面残差帽 $\{x : \lvert\cos x - x\rvert \le \varepsilon_{\mathrm{self}}\}$ 设在 $\varepsilon_{\mathrm{self}} = 0.150$（区间 $[0.6476, 0.8270]$）：$x_4 = 0.6543$ 首入帽内，第 $k = 5$ 步以 $\lvert x_5 - x_4\rvert = \lvert\mathcal{F}(x_4) - x_4\rvert = 0.1392 \le 0.150$ 停机，锁定青色实轴投影值 $x_5 = 0.7935$（$\Pi_{\ge \varepsilon_{\mathrm{self}}}$），并将余差 $\lvert x_5 - \theta^*\rvert = 0.0544$ 与未走完的螺旋折入品红分量（$\Pi_{< \varepsilon_{\mathrm{self}}}$），与 $\varepsilon_{\mathrm{self}} \to 0$ 的无尽螺旋及 $\varepsilon_{\mathrm{self}} \to 1$ 时首检即停（$k = 1$）的无细化噪点形成对照（模型诠释，`MODEL`）。
:::

## 36.10.2 精度线以下的无穷余项去哪了：旋转 $90^\circ$ 正交折叠入“时间长河” {#sec-ch39-07-2}

一旦承认观察者在有限精度 $\varepsilon_{\mathrm{self}}$ 处提前停机、只把有限位数的粗粒化切片提炼成“当下此刻的确定记录”，一道尖锐的守恒律追问立刻浮出水面：底层比较网络的幺正演化严格保持全态总范数 $\lVert\Psi_\infty\rVert^2 = 1$ 不变；**那些排在停机精度线 $\varepsilon_{\mathrm{self}}$ 后面的无穷多位未算完的信息，究竟去了哪里？**

答案既不是凭空湮灭，也不是强行塞进当下的三维可见空间制造紫外发散，而是沿着正交补子空间分解，**旋转 $90^\circ$ 折入了观察者当前实轴 `I` 看不见的正交盲平面 $\hat{\mathbf{i}}$——化作了向未来绵延流淌的“时间长河”**（`手工推导` + `MODEL`）！设全态 $\lvert\Psi_\infty\rangle$ 被当前停机阈值正交拆分为主干子空间投影 $\Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle$ 与尾项余部 $\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle = (\mathbf{1} - \Pi_{\ge \varepsilon_{\mathrm{self}}})\lvert\Psi_\infty\rangle$，并记满足反自伴与幺正条件（$\hat{\mathbf{i}}^{\mathrm{H}} = -\hat{\mathbf{i}},\; \hat{\mathbf{i}}\hat{\mathbf{i}}^{\mathrm{H}} = \mathbf{1}$，从而 $\hat{\mathbf{i}}^2 = -\mathbf{1}$，见 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 3 款 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）的 $90^\circ$ 正交复结构算子为 $\hat{\mathbf{i}}$，则全态写为正交和，尾项乘上 $\hat{\mathbf{i}}$ 即转过 $90^\circ$ 封存（这是保范重标的读法，`MODEL`：$\hat{\mathbf{i}}\,\Pi_{<}\lvert\Psi_\infty\rangle$ 与 $\Pi_{<}\lvert\Psi_\infty\rangle$ 只是等长，一般并不相等；转过的尾项对一切态都仍留在被舍弃的子空间里，当且仅当该子空间在 $\hat{\mathbf{i}}$ 下不变——二维四分之一转 $\hat{\mathbf{i}}(x, y) = (-y, x)$ 配上只保留第一坐标的投影，就把被舍弃的 $(0, 1)$ 转成了保留的 $(-1, 0)$，`手工推导`）

$$
\lvert\Psi_\infty\rangle \;=\; \Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle \;+\; \Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle, \qquad \bigl\lVert\hat{\mathbf{i}}\,\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert \;=\; \bigl\lVert\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert,
$$

且由于 $\hat{\mathbf{i}}$ 保范、两投影子空间严格正交，总预算分毫不差地遵守勾股守恒律（在单比特密度算符的希尔伯特—施密特内积空间上，这一“保留对角主干 + 正交剥离副对角相干余项”的精确勾股账本由 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 1、2 款 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean) 与 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass) 直接锁定）：

$$
\bigl\lVert\Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert^2 \;+\; \bigl\lVert\hat{\mathbf{i}}\,\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert^2 \;=\; \bigl\lVert\Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert^2 \;+\; \bigl\lVert\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle\bigr\rVert^2 \;=\; \lVert\Psi_\infty\rVert^2 \;=\; 1.
$$

借动力系统中的**移位映射（Bernoulli / radix-$b$ shift，$x_{t+1} = \{b x_t\}$）**在超越不动点 $\theta^* = 0.7390851332\dots$ 上做一次手算，这条“当下停机创造明天”的折叠流水线便一目了然（移位读数为 `手工推导`，与时间演化的对应为 `MODEL`）：设一位受限观察者每次自指停机只能读取小数点后前 $3$ 位有效刻度（分辨率 $10^{-3}$）。在 $t = 0$ 时刻，观察者在可见实平面 `I` 上将 **`0.739`** 拍板定格为“当下的现实”，而把低于精度门槛的无穷尾项 **`0.0000851332...`** 折入 $90^\circ$ 正交盲区 $\hat{\mathbf{i}}$（[§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)、[§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md)）。紧接着，随着局部偏迹视界诱导的模自同构流 $U(\Delta t) = e^{-\hat{\mathbf{i}}\hat{K}\Delta t}$（[§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)）向前推进一拍又一拍，尺度小数点逐拍右移（$x_{t+1} = \{10 x_t\}$）：原本潜伏在 $\hat{\mathbf{i}}$ 暗河中看不见的第 $4, 5, 6, 7\dots$ 位微细相位差依次越过 $\varepsilon_{\mathrm{self}}$ 门槛浮上实轴 `I`，在 $t = 1, 2, 3, 4\dots$ 时刻显影为 `0.390`、`0.908`、`0.085`、`0.851` 等新境遇与新事件！

**为什么时间长河会源源不断地流淌？恰恰因为有限观察者在每一个“当下”都只取一瓢有限精度的自指切片**（`MODEL`）。倘若存在某个 $\varepsilon_{\mathrm{self}} = 0$ 的全知视角把全部无穷位一次性摊平在实轴上，盲区潜流 $\Pi_{< \varepsilon_{\mathrm{self}}}$ 当场归零，整条时间长河便会瞬间干涸凝固成一块没有未来的四维冰晶；正是每一次不求穷尽的温和停机，把无尽的全息底蕴折进了生生不息的来日。

::: {.viz src="self-halting-spectral-time-river-sandbox" preset="time-river-orthogonal-fold" height="500"}
**精度下无穷余项 $90^\circ$ 正交折叠与时间长河逐拍显影实验卡（`time-river-orthogonal-fold`）。** 六个模态按玻恩权重在停机阈值 $\varepsilon_{\mathrm{self}} = 0.100$ 处围绕紫色的 $90^\circ$ 复结构铰链 $\hat{\mathbf{i}}$（$\hat{\mathbf{i}}^2 = -1$）正交分流：初始时刻（$t = 0$）高于阈值的前三模竖立在青色的可见墙 `I` 上，其余三模旋转 $90^\circ$ 躺入水平的品红 $\hat{\mathbf{i}}$ 时间长河（初始分账 $0.9155 + 0.0845 = 1.0000$，$\theta^*$ 的前缀 `0.739` 与尾数 `0.0000851332…` 分居 `I` 与 $\hat{\mathbf{i}}$）；随右岸琥珀色时间步游标沿 $t \in [0, 4]$ 向下游推进（静帧停在 $t = 2.00$，此时两份折入模态已按由重到轻浮出，读出 $0.9951 + 0.0049 = 1.0000$ 与 `I · 0.73908`），全程守住勾股总和 $\lVert\Pi_{\ge}\rVert^2 + \lVert\Pi_{<}\rVert^2 = 1.0000$。
:::

## 36.10.3 自指为何天然是特征谱排序器：幂迭代滤波、克雷洛夫子空间稳定与最优低秩截断 {#sec-ch39-07-3}

顺着折叠机制紧追一步，一个更要害的数学疑难随即浮现：既然观察者在有限步数 $n$ 与有限精度 $\varepsilon_{\mathrm{self}}$ 处便早早停机截断，为什么留给当下的不是一团支离破碎的随机乱码，而是条理分明的宏观物理定律与稳固概念？

答案令人拍案叫绝：**因为“投出去、再折返比量自身”的自指循环，在数值线性代数与算子谱论中字面上就是一台天然的特征谱降序排列机！**

设观察者不再只做单次盲目抽样，而是沿着与当前测量框架耦合的正定自相关算子（格拉姆核或有效反馈算子）$G_{\mathcal{B}}$ 反复执行归一化自指回环 $x_{n+1} = G_{\mathcal{B}} x_n / \lVert G_{\mathcal{B}} x_n\rVert$。将初始输入态 $\lvert\Psi\rangle = \sum_{m \ge 1} c_m \lvert\mathbf{u}_m\rangle$ 按 $G_{\mathcal{B}}$ 的奇异值（或非负特征值）降序谱 $\sigma_1 \ge \sigma_2 \ge \sigma_3 \ge \dots \ge 0$ 展开，经过 $n$ 轮自指回响之后，这正是经典的**冯·米塞斯幂迭代（von Mises power iteration）**（`手工推导` + `文献结果`，见 [@rem-ch39-eckart-young-power-zeno-hoel-literature] 第 1 款）：

$$
G_{\mathcal{B}}^n \lvert\Psi\rangle \;=\; \sum_{m=1}^{\infty} \sigma_m^n\, c_m \lvert\mathbf{u}_m\rangle \;=\; \sigma_1^n \left( c_1 \lvert\mathbf{u}_1\rangle \;+\; \left(\frac{\sigma_2}{\sigma_1}\right)^{\!n} c_2 \lvert\mathbf{u}_2\rangle \;+\; \left(\frac{\sigma_3}{\sigma_1}\right)^{\!n} c_3 \lvert\mathbf{u}_3\rangle \;+\; \dots \right).
$$

凝视括号里的比值幂次 $(\sigma_m / \sigma_1)^n$，自指回路在后台自动完成了三重精密分拣：

1. **主干驻相特征自动置顶，异相杂波指数沉底（`手工推导`）**：凡在多轮往返比量中跨尺度同相自洽、且在初态中分量非零（$c_m \neq 0$）的主成分模态（$\sigma_1, \sigma_2$ 接近主峰），保持高相对增益稳居队列最前端，傲然挺立于停机线 $\varepsilon_{\mathrm{self}}$ 之上（初态若与主特征空间正交，即 $c_1 = 0$，正定自相关算子的每一轮迭代都保持这份正交，主模态始终不会显现，领先的是初态实际占据的最大特征子空间；若最大特征值重复，归一化迭代收敛到初态在该特征子空间上的归一化投影，挑不出与初态无关的单一主矢，`手工推导`）；凡属局部偶然、彼此异相抵消的细碎涨落（$\sigma_m \ll \sigma_1$），每多绕一圈自指回路就被乘上一记 $(\sigma_m / \sigma_1) < 1$ 的阻尼因子，以指数速率 $(\sigma_m / \sigma_1)^n$ 迅速跌破 $\varepsilon_{\mathrm{self}}$，自动退入正交时间尾流；
2. **可观测量克雷洛夫子空间的有限阶严格增长上界与永久锁死（`LEAN ✓`）**：在有限维内积空间 $V$ 上，当观察者透过初始读出映射 $C : V \to Y$ 沿演化算子伴随 $T^\dagger$ 逐拍累积生成的**可观测量克雷洛夫（Krylov）子空间塔** $\mathcal{K}_m(T, C) := \operatorname{span}_{\mathbb{K}}\{(T^\dagger)^k(C^\dagger y) \mid k \le m,\, y \in Y\}$ 时，[@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 4 款 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 严格证明子空间发生严格扩张（$\mathcal{K}_m < \mathcal{K}_{m+1}$）的步数至多不超过余秩上界 $\dim_{\mathbb{K}} V - \operatorname{rank}_{\mathbb{K}} C$；第 5 款 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 进一步锁死：一旦相邻两拍首次达成子空间闭合 $\mathcal{K}_m = \mathcal{K}_{m+1}$，此后一切更远视界 $\mathcal{K}_{m+r}$（$\forall r \in \mathbb{N}$）均永久定格于 $\mathcal{K}_m$，绝无后续信息逃逸（这两款只说明可观测子空间有限步饱和，本身不蕴含谱排序）；
3. **埃卡特—杨—米尔斯基（Eckart–Young–Mirsky）全局最优低秩保真律（`文献结果`）**：矩阵逼近论经典定理（见 [@rem-ch39-eckart-young-power-zeno-hoel-literature] 第 2 款）保证，按奇异值降序排列并在阈值 $\varepsilon_{\mathrm{self}}$ 处保留前 $r$ 个主模态的低秩截断，在所有秩不超过 $r$ 的近似算子中同时实现**最小的弗罗贝尼乌斯（Frobenius）范数误差与最小的谱范数误差**。自指根本无需外部导师预先告知“什么重要”——**经得起反复自比而不衰减的不变量，天然就排在宇宙队列的第一位**！

::: {.viz src="self-halting-spectral-time-river-sandbox" preset="power-iteration-spectral-sort" height="500"}
**自指幂迭代 $G_{\mathcal{B}}^n$ 特征谱降序分拣与低秩截断实验卡（`power-iteration-spectral-sort`）。** 六模态初始谱 $(1.00, 0.76, 0.54, 0.35, 0.20, 0.10)$ 经紫色线框椭球表征的 $n = 4$ 轮自指幂迭代后（琥珀色截断线与手柄标出 $\varepsilon_{\mathrm{self}} = 0.120,\, n = 4,\, r = 2$），相对增益 $(\sigma_m/\sigma_1)^4$ 仅让前 $r = 2$ 个模态（$1.000$ 与 $0.3336$）越过截断线成为青色主轴与谱柱（四轮迭代份额 $99.33\%$，对照原始秩 $2$ 能量 $77.27\%$），其余四阶模态指数沉入阈值以下的品红尾流。
:::

## 36.10.4 “用什么基测量，什么就更重要”：瑞利商注意力几何与量子芝诺现实雕刻 {#sec-ch39-07-4}

沿着谱排序链追问到最深处，便直抵题记末尾那句振聋发聩的反问：**排在队首的“重要性”，究竟是外物与生俱来的绝对标签，还是由观察者选用的“测量基 $\mathcal{B}$”亲手赋予的？**

答案横跨**认知权重重排**与**物理演化塑形**两重维度——在严格算子几何意义下，**用什么基测量，什么就真的跃居因果核心**：

第一重机制是**认知读出端的瑞利商赋权与查询—键值注意力重排**。在尚未选定测量基之前，单位希尔伯特球面上的纯态 $\lvert\Psi\rangle$ 各向完全平权，没有任何单一方向自带特权。一旦观察者选定一组完备正交归一记录基 $\mathcal{B} = \{\lvert\mathbf{b}_1\rangle, \dots, \lvert\mathbf{b}_d\rangle\}$（对应秩一正交投影族 $P_k = \lvert\mathbf{b}_k\rangle\langle\mathbf{b}_k\rvert$），[@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 6 款 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`）当即锁定第 $k$ 条基轴分得的往返双投影瑞利—玻恩优先级权重：

$$
w_{\mathcal{B}}(k) \;=\; \operatorname{Tr}(\rho P_k) \;=\; \langle\mathbf{b}_k\rvert \rho \lvert\mathbf{b}_k\rangle \;=\; \bigl\lvert\langle\mathbf{b}_k\mid\Psi\rangle\bigr\rvert^2 \;=\; \cos^2\theta_k.
$$

这一按内积对齐度分配读出预算的结构，与现代序列建模中的**序列查询—键值软最大注意力算子**（Vaswani 等，2017，`文献结果`，见 [@rem-ch39-eckart-young-power-zeno-hoel-literature] 第 4 款）

$$
\operatorname{Attention}(Q, K, V) \;=\; \operatorname{softmax}\!\left(\frac{Q K^\top}{\sqrt{d}}\right)V
$$

共享同一套内积配对几何骨架（`MODEL`）：观察者主动立起的测量基矢 $\lvert\mathbf{b}_k\rangle$ 充当发出追问的**查询矢（$Q$）**，待测状态分量充当受检的**键矢（$K$）**，而内积配对排出的权重名次直接裁定了哪些特征能够越过停机线 $\varepsilon_{\mathrm{self}}$ 进入当下的工作记忆，哪些特征被视作背景折叠隐去。当你选用**位置基 $\lvert x\rangle$**（$\alpha_{\mathrm{basis}} = 0^\circ$）测量时，局部的空间颗粒边界拿到最高 $\cos^2\theta_k$ 排上队首，而贯穿全域的长波周期被拆碎压入尾流；当你将自身测量基旋转至**动量/频率基 $\lvert p\rangle$**（$\alpha_{\mathrm{basis}} = 90^\circ$）时，原本垫底的全局频率韵律与趋势瞬间跃升榜首，一城一地的局部颗粒涨落反而退化为无足轻重的背景余项！

::: {.viz src="self-halting-spectral-time-river-sandbox" preset="basis-rayleigh-attention" height="500"}
**测量基旋转 $\alpha_{\mathrm{basis}}$ 与瑞利商权重 $w_{\mathcal{B}}(k) = \cos^2\theta_k$ 实时洗牌实验卡（`basis-rayleigh-attention`）。** 固定纯态 $\psi = (1, 2, 5)/\sqrt{30}$，拖动 $b_0$ 端琥珀色手柄将紫色正交归一基三脚架 $\mathcal{B}(\alpha)$ 从位置基（$0^\circ$）转向离散余弦频率基（$90^\circ$）：在 $\alpha = 65^\circ$ 处三轴瑞利权重依次为 $0.6273,\; 0.2525,\; 0.1202$（总和 $1.0000$），越过停机线 $\varepsilon_{\mathrm{self}} = 0.150$ 的前两份点亮为青色置顶分量，第三份降为品红尾项。
:::

第二重机制则从主观读出直抵客观动力学——**量子芝诺（Quantum Zeno）现实雕刻**。由于观察者并非隔着单向玻璃偷看的局外幽灵，而是真实嵌在比较网络内部的耦合节点，一旦观察者选定测量基 $\mathcal{B}$ 并在总时长 $T$ 内以步长 $\Delta t = T/N$ 持续执行频闪基捏合 $\rho \mapsto \sum_k P_{\mathbf{b}_k}\rho P_{\mathbf{b}_k}$，物理演化本身就会被测量基重塑（`手工推导` + Misra & Sudarshan 1977 `文献结果`）：

- 在单步微时间窗 $\Delta t$ 内，哈密顿驱动诱导的横向偏转角仅为 $\delta\theta = \frac{\Omega\,\Delta t}{2} = \frac{\Omega T}{2N}$，逃离当前基轴 $\lvert\mathbf{b}_k\rangle$ 的单步漏失概率被压低至**二阶无穷小** $\sin^2(\delta\theta) = \frac{(\Omega T)^2}{4 N^2} + \mathcal{O}(N^{-4})$（相关但不同的首返协议：每一步受监测无返回历史与首次返回振幅的严格有限步概率守恒，由 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 7 款 [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation) 直接锁定）；
- 连续 $N$ 次投影、且每一次都读出目标基态（全成功历史）的概率为（若中间各次只做捏合而不读取，末次的目标基态布居是另一个可观测量 $\bigl[1 + \cos^N(\Omega T/N)\bigr]/2$，在 $\Omega T = \pi/2$、$N = 16$ 时为 $0.962838$，下式给出的则是 $0.962166$，`手工推导`）

$$
P_{\mathrm{surv}}(N) \;=\; \left[\cos^2\!\left(\frac{\Omega T}{2N}\right)\right]^N \;=\; 1 - \frac{(\Omega T)^2}{4N} + \mathcal{O}(N^{-2}) \;\xrightarrow{\;N \to \infty\;}\; 1.
$$

例如在本来会把留存率削半至 $\cos^2(\pi/4) = 0.5000$ 的四分之一拉比周期 $\Omega T = \pi/2$ 上，仅需插入 $N = 16$ 次频闪基校验，留存率便飙升至 $P_{\mathrm{surv}}(16) \approx 0.9622$！这意味着**与观察者测量基对齐的特征，不仅在观察者的工作账本里排在第一位，更在客观物理网络中持续获得相干回正保护，凝结为寿命最长、对下游辐射因果力最强的现实主干**。

::: {.viz src="self-halting-spectral-time-river-sandbox" preset="zeno-basis-sculpting" height="500"}
**持续测量基频闪捏合与量子芝诺主干雕刻实验卡（`zeno-basis-sculpting`）。** 在总演化角 $\Omega T = \pi/2$ 的走廊上均分排布 $N = 16$ 道紫色频闪捏合校验环（琥珀色珠标出当前检查 $j = 16$）：每段仅偏转 $\pi/64$，二阶横向漏失 $\sin^2(\pi/64) = 0.0024$（品红锯齿）在每道环处被掐回青色受保护基态脊，使累积留存率从不观测虚线的 $0.5000$ 抬升至 $P_{\mathrm{surv}}(16) = [\cos^2(\pi/64)]^{16} = 0.9622$。
:::

## 36.10.5 形式化锚定定理、经典文献归属、六位精度基准算例与四维机制总表 {#sec-ch39-07-5}

下面我们将支撑本节各环节的七条冻结 Lean 4 内核定理——覆盖标准基捏合的希尔伯特—施密特勾股分解与副对角丢弃相干质量、反自伴幺正复结构平方反号律 $R^2 = -I_n$、可观测量克雷洛夫子空间塔的严格增长余秩上界与一旦稳定永久不变性、秩一玻恩配对权重与条件态凸分解、以及受监测演化的有限步返回守恒——集中锁定于同一形式屋檐之下：

::: {.theorem #thm-ch39-self-halting-pythagoras-krylov-and-zeno title="捏合勾股相干分解、复结构平方反号、可观测量克雷洛夫稳定化、秩一玻恩赋权与受监测返回守恒定理" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean,D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation"}
在所钉 `trureturing` 冻结声明集中，以下七项定理同时成立：

1. **单比特标准基捏合的希尔伯特—施密特勾股质量分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：记单比特复矩阵空间为 $\mathrm{QubitMatrix} = M_2(\mathbb{C})$，标准基对角捏合映射为 $\operatorname{pinching}(\rho)_{ij} = \delta_{ij}\rho_{ij}$（$i, j \in \operatorname{Fin} 2$），迹希尔伯特—施密特内积为 $\operatorname{hilbertSchmidtInner}(A, B) := \operatorname{Tr}(A^{\mathrm{H}} B) \in \mathbb{C}$。则对任意 $\rho \in \mathrm{QubitMatrix}$，恒有

   $$
   \operatorname{hilbertSchmidtInner}(\rho, \rho) \;=\; \operatorname{hilbertSchmidtInner}\bigl(\operatorname{pinching}(\rho),\, \operatorname{pinching}(\rho)\bigr) + \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr);
   $$

2. **单比特捏合剥离的副对角相干质量精确公式**（[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：对任意 $\rho \in \mathrm{QubitMatrix}$，捏合余项 $\rho - \operatorname{pinching}(\rho)$ 的希尔伯特—施密特自内积在 $\mathbb{C}$ 中精确等于两个副对角矩阵元的复模平方之和：

   $$
   \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr) \;=\; \bigl(\operatorname{Complex.normSq}(\rho_{01}) + \operatorname{Complex.normSq}(\rho_{10}) : \mathbb{C}\bigr);
   $$

3. **反自伴右幺正矩阵的负单位阵平方律**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）：设 $n$ 为有限可判等类型（`[Fintype n] [DecidableEq n]`），$R \in M_n(\mathbb{C})$ 同时满足反自伴性 $R^{\mathrm{H}} = -R$ 与右幺正性 $R R^{\mathrm{H}} = I_n$，则

   $$
   R \cdot R \;=\; -I_n;
   $$

4. **有限维可观测量克雷洛夫子空间塔的严格增长余秩上界**（[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)）：设 $\mathbb{K}$ 满足 `[RCLike 𝕜]`，$V, Y$ 为 $\mathbb{K}$ 上的有限维内积空间，$T : V \to_{\mathrm{l}}[\mathbb{K}] V$ 与 $C : V \to_{\mathrm{l}}[\mathbb{K}] Y$ 为 $\mathbb{K}$-线性映射。对每个步数 $m \in \mathbb{N}$ 定义可观测量克雷洛夫子模 $\operatorname{observableKrylov}(T, C, m) := \operatorname{Submodule.span}_{\mathbb{K}}\{v \in V \mid \exists k \le m,\; \exists y \in Y,\; v = (T.\mathrm{adjoint}^k)(C.\mathrm{adjoint}\;y)\}$。则在扩充基数 $\operatorname{Set.encard}$（取值于 $\mathbb{N}_\infty$，右侧自然数截断差嵌入 $\mathbb{N}_\infty$）下恒有

   $$
   \operatorname{Set.encard}\bigl\{\, m \in \mathbb{N} \;\big|\; \operatorname{observableKrylov}(T, C, m) < \operatorname{observableKrylov}(T, C, m + 1) \,\bigr\} \;\le\; \bigl(\operatorname{finrank}_{\mathbb{K}}(V) - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C) : \mathbb{N}\bigr);
   $$

5. **可观测量克雷洛夫子空间塔一旦稳定则永久稳定**（[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)）：在与第 4 款相同的有限维内积空间假设下，若在某步 $m \in \mathbb{N}$ 满足相邻两阶相等 $\operatorname{observableKrylov}(T, C, m) = \operatorname{observableKrylov}(T, C, m + 1)$，则对一切后续步数增量 $r \in \mathbb{N}$ 恒有

   $$
   \operatorname{observableKrylov}(T, C, m + r) \;=\; \operatorname{observableKrylov}(T, C, m);
   $$

6. **秩一记录分支的玻恩模平方权重、迹配对恒等式与未读态凸分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：设 $n, \kappa$ 为有限类型且 $n$ 具可判等性（`[Fintype n] [DecidableEq n] [Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足完备正交自伴幂等记录测量公理 `IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 满足半正定且迹为 $1$（`rho.PosSemidef ∧ Matrix.trace rho = 1`）。记 $\operatorname{recordWeight}(P, \rho, k) := \operatorname{Tr}(\rho P_k) \in \mathbb{C}$、$\operatorname{unreadState}(P, \rho) := \sum_j P_j \rho P_j$ 以及 $\operatorname{conditionalState}(P, \rho, j) := (\operatorname{recordWeight}(P, \rho, j))^{-1} \bullet (P_j \rho P_j)$（在 $\mathbb{C}$ 的全函数求逆约定下 $0^{-1} = 0$）。若存在列向量 $\phi, \psi : n \to \mathbb{C}$ 使第 $k \in \kappa$ 支投影与纯态密度矩阵表示为秩一外积 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 与 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则同时成立

   $$
   \begin{aligned}
   \operatorname{recordWeight}(P, \rho, k) &= \bigl(\bigl(\bigl\lVert\operatorname{star}(\phi) \mathbin{\bullet_v} \psi\bigr\rVert^2 : \mathbb{R}\bigr) : \mathbb{C}\bigr), \\
   \operatorname{recordWeight}(P, \rho, k) &= \operatorname{Tr}(\rho P_k), \\
   \operatorname{unreadState}(P, \rho) &= \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j);
   \end{aligned}
   $$

7. **受监测幺正演化的单步返回递推与有限视界总概率守恒**（[`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation)）：设 $E$ 为完备复内积空间，$U : E \simeq_{\mathrm{li}}[\mathbb{C}] E$ 为复线性等距同构，$v \in E$ 为单位向量（$\lVert v\rVert = 1$）。记一维射线正交投影 $P_v := (\mathbb{C}\cdot v).\mathrm{starProjection}$、受监测无返回单步算子 $T := (\operatorname{id}_{\mathbb{C}, E} - P_v) \circ_L U$、第 $n \in \mathbb{N}$ 步无返回历史向量 $h_n := T^n v$、无返回留存概率 $s_n := \lVert h_n\rVert^2$，以及首次返回振幅 $a_n := \langle v, U h_{n-1}\rangle_{\mathbb{C}}$（$n - 1$ 取自然数截断减法）与首次返回概率 $p_n := \lVert a_n\rVert^2$，则同时成立

   $$
   s_0 \;=\; 1, \qquad \forall n \in \mathbb{N},\;\; p_{n+1} \;=\; s_n - s_{n+1}, \qquad \forall N \in \mathbb{N},\;\; \sum_{n=0}^{N-1} p_{n+1} + s_N \;=\; 1.
   $$
:::

::: proof
第 1 款将 $\rho$ 拆写为 $\operatorname{pinching}(\rho) + (\rho - \operatorname{pinching}(\rho))$：由捏合幂等性与希尔伯特—施密特自伴性证得两分量双向正交 $\operatorname{hilbertSchmidtInner}(\operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho)) = 0$ 与 $\operatorname{hilbertSchmidtInner}(\rho - \operatorname{pinching}(\rho), \operatorname{pinching}(\rho)) = 0$，展开双线性自内积即消去交叉项。第 2 款在 $\operatorname{Fin} 2$ 上直接展开迹与共轭转置求和，$\rho - \operatorname{pinching}(\rho)$ 对角元为零而保留 $\rho_{01}, \rho_{10}$，由 `Complex.normSq_eq_conj_mul_self` 化为两副对角元模平方和。第 3 款将 $R^{\mathrm{H}} = -R$ 代入 $R R^{\mathrm{H}} = I_n$ 得 $-(R^2) = R(-R) = I_n$，两边取负即得 $R^2 = -I_n$。第 4 款利用子模单调性证明严格包含时刻集 $\{m \mid \mathcal{K}_m < \mathcal{K}_{m+1}\}$ 上的维数映射 $m \mapsto \operatorname{finrank}_{\mathbb{K}}(\mathcal{K}_m)$ 单射且落入半开整数区间 $[\operatorname{finrank}_{\mathbb{K}}(\mathcal{K}_0),\, \operatorname{finrank}_{\mathbb{K}}(V))$，结合 $\mathcal{K}_0 = \operatorname{range}(C.\mathrm{adjoint})$ 与 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C.\mathrm{adjoint}) = \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ 导出基数上界。第 5 款由 $\mathcal{K}_m = \mathcal{K}_{m+1}$ 及子模生成元归纳证得 $\mathcal{K}_m$ 对算子 $T.\mathrm{adjoint}$ 不变，故对一切 $k \in \mathbb{N}$ 与 $y \in Y$ 均有 $(T.\mathrm{adjoint}^k)(C.\mathrm{adjoint}\;y) \in \mathcal{K}_m$，由反对称性得 $\mathcal{K}_{m+r} = \mathcal{K}_m$。第 6 款调用秩一纯态外积缩并引理 `rank_one_pure_state_modulus_square_reduction` 给出模平方表示，由定义自反性给出迹配对等式，并由 `unread_eq_weighted_ensemble`（逐项区分零权重与非零权重分支）恢复凸组合恒等式。第 7 款由 $\lVert v\rVert = 1$ 得 $s_0 = 1$，对 $U h_n$ 沿 $\mathbb{C}\cdot v$ 与正交补施以 `Submodule.norm_sq_eq_add_norm_sq_starProjection` 得单步守恒 $p_{n+1} = s_n - s_{n+1}$，再经裂项求和 `Finset.sum_range_sub'` 证得有限视界总和恒等于 $1$。完整证明由 Lean 内核检查。
:::

注意 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 7 款的形式边界：`monitored_return_conservation` 对每步保留无返回补空间 $Q = \operatorname{id} - P_v$ 的历史建模单步勾股守恒；而在连续时间极限 $N \to \infty$ 下沿同一投影 $P_v$ 频闪监测导致跃迁冻结的渐近极限定理，则连同幂迭代、低秩矩阵逼近、序列软最大注意力与粗粒化因果涌现一并归属下方外部经典文献注记：

::: {.remark #rem-ch39-eckart-young-power-zeno-hoel-literature title="幂迭代、最优低秩截断、量子芝诺效应、软最大注意力与粗粒化因果涌现文献归属（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将自指停机与谱排序联系起来的五项经典数学、物理与复杂系统理论结果属外部已发表文献，未包含在本书锁定的 `trureturing@dev` 内核声明集中：

1. **冯·米塞斯幂迭代主特征模态收敛律（R. von Mises & H. Pollaczek-Geiringer, *Z. Angew. Math. Mech.* **9**, 58–77 & 152–164, 1929, DOI: `10.1002/zamm.19290090105`）**：对具严格主特征值间隙 $\lvert\lambda_1\rvert > \lvert\lambda_2\rvert \ge \dots$ 的矩阵或紧算子，且初态在主特征方向投影非零（$c_1 \neq 0$）时，归一化幂迭代序列 $x_{n+1} = A x_n / \lVert A x_n\rVert$ 以几何收敛率 $\mathcal{O}(\lvert\lambda_2/\lambda_1\rvert^n)$ 收敛至主特征方向；
2. **埃卡特—杨—米尔斯基最优低秩矩阵截断定理（C. Eckart & G. Young, *Psychometrika* **1**, 211–218, 1936, DOI: `10.1007/BF02288367`；L. Mirsky, *Quart. J. Math.* **11**, 50–59, 1960, DOI: `10.1093/qmath/11.1.50`）**：设矩阵 $A$ 的奇异值降序排列为 $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_d \ge 0$，$A_r = \sum_{m=1}^r \sigma_m u_m v_m^{\mathrm{H}}$ 为保留前 $r$ 项的截断奇异值分解，则对一切秩不超过 $r$ 的同型矩阵 $B$，在弗罗贝尼乌斯范数（Eckart–Young）及任意酉不变范数（Mirsky）下恒有 $\lVert A - A_r\rVert \le \lVert A - B\rVert$，其中 $\lVert A - A_r\rVert_F = \bigl(\sum_{m > r}\sigma_m^2\bigr)^{1/2}$、$\lVert A - A_r\rVert_2 = \sigma_{r+1}$；
3. **量子芝诺效应与频闪投影冻结极限（B. Misra & E. C. G. Sudarshan, *J. Math. Phys.* **18**, 756–763, 1977, DOI: `10.1063/1.523304`）**：对自伴哈密顿生成元 $H$（在有限能量方差 $\Delta H < \infty$ 子空间上），将时间区间 $[0, T]$ 等分为 $N$ 段并每步施加正交投影 $P$，单步漏失仅含二阶项 $\mathcal{O}((T/N)^2)$，故留存算子序列满足强极限 $\lim_{N \to \infty}(P e^{-i H T / (\hbar N)} P)^N = P e^{-i P H P T / \hbar} P$，彻底冻结跨出 $P$ 子空间的跃迁；
4. **序列查询—键值软最大注意力算子（A. Vaswani et al., *"Attention Is All You Need"*, *Adv. Neural Inf. Process. Syst.* **30**, 5998–6008, 2017）**：以缩放内积核 $\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\bigl(\frac{Q K^\top}{\sqrt{d}}\bigr)V$ 将查询向量组 $Q$ 与键向量组 $K$ 的内积相似度转化为凸归一权重，实现对值表征 $V$ 的动态按基重排与选择性汇聚；
5. **粗粒化因果涌现（E. P. Hoel, L. Albantakis & G. Tononi, *Proc. Natl. Acad. Sci. U.S.A.* **110**(49), 19790–19795, 2013, DOI: `10.1073/pnas.1314922110`）**：在离散马尔可夫状态转移网络中，将含噪微观状态空间粗粒化映射为较少数量的宏观等价类状态时，宏观转移矩阵因滤除类内简并热噪而可获得严格高于微观底层的有效因果信息量（$EI_{\mathrm{macro}} > EI_{\mathrm{micro}}$）。
:::

为了将上述自指停机窗口、十进制移位显影、幂迭代谱分拣与量子芝诺留存率落实为可逐位复核的定量基准，我们在下例中统一以双精度浮点运算并在展示时四舍五入至小数点后六位：

::: {.example #ex-ch39-power-sorting-dottie-shift-and-zeno-calculus title="Dottie 停机移位、六模态幂迭代谱提纯与 $N = 16$ 频闪量子芝诺留存的六位精度算例"}
本算例对本节及配套三维沙盘的三大定量机制做逐项六位小数核验（`手工推导`）：

1. **Dottie 余弦自指迭代在 $\varepsilon_{\mathrm{self}} = 0.150$ 下的 $k = 5$ 步停机与十进制移位折叠**：
   与沙盘 `precision-agency-window` 一致，取初值 $x_0 = 0.000000$ 迭代 $x_k = \cos(x_{k-1})$，前五步读数依次为 $x_1 = 1.000000$、$x_2 = 0.540302$、$x_3 = 0.857553$、$x_4 = 0.654290$、$x_5 = 0.793480$。相邻步幅 $\lvert x_k - x_{k-1}\rvert = \lvert\cos x_{k-1} - x_{k-1}\rvert$ 在前四步依次为 $1.000000,\, 0.459698,\, 0.317251,\, 0.203263$（均大于 $0.150$），至 $x_4$ 首次踏入残差帽 $\{x : \lvert\cos x - x\rvert \le 0.150\} \approx [0.6476, 0.8270]$，故第 $k = 5$ 步以 $\lvert x_5 - x_4\rvert = \lvert\mathcal{F}(x_4) - x_4\rvert = 0.139191 \approx 0.1392 \le 0.150$ 停机，锁定 $x_5 \approx 0.7935$ 并将余差 $\lvert x_5 - \theta^*\rvert = 0.054395 \approx 0.0544$ 折入后续未走螺旋（而在 $\varepsilon_{\mathrm{self}} = 1$ 极端处，$x_0 = 0$ 已在帽内，$k = 1$ 首检即停）。另一方面，对精确不动点 $\theta^* = 0.7390851332\dots$ 取三位小数停机精度（$10^{-3}$），在 $t = 0$ 时实轴 `I` 定格 `0.739`、盲区 $\hat{\mathbf{i}}$ 折入尾项 `0.0000851332...`；随下游时间步逐拍展开（在移位读法 $x_{t+1} = \{10 x_t\}$ 下依次显影三位窗口 `0.390`、`0.908`、`0.085`、`0.851`，在沙盘前缀读法下依次将 `0.739` 扩写为 `0.7390`、`0.73908`、`0.739085`、`0.7390851`），潜伏小数位逐拍浮上实平面。

2. **六模态特征谱 $\sigma = (1.00, 0.76, 0.54, 0.35, 0.20, 0.10)$ 在 $n = 4$ 幂迭代下的阈值截断与能量集中度**：
   下表列出全部六个模态的原始奇异值 $\sigma_m$、原始平方能量 $\sigma_m^2$、$n = 4$ 次迭代相对振幅 $\sigma_m^4 = (\sigma_m/\sigma_1)^4$、算子 $G_{\mathcal{B}}^4$ 的弗罗贝尼乌斯模方项 $\sigma_m^8 = (\sigma_m^4)^2$（等价于等权初态 $\lvert\Psi_{\mathrm{unif}}\rangle$ 经 $G_{\mathcal{B}}^4$ 作用后的各模态模平方），以及奇异值加权初态 $c_m \propto \sigma_m$ 经 $G_{\mathcal{B}}^4$ 作用后的模平方项 $\sigma_m^{10}$：

| 模态序号 $m$ | 原始谱 $\sigma_m$ | 原始能量 $\sigma_m^2$ | 四轮振幅 $\sigma_m^4$ | 四轮算子模方 $\sigma_m^8$ | 加权四轮模方 $\sigma_m^{10}$ | 相对阈值 $\varepsilon_{\mathrm{self}} = 0.120$ 的去向 |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$1$** | $1.000000$ | $1.000000$ | $1.000000$ | $1.000000$ | $1.000000$ | $\sigma_1^4 > 0.120$：置顶锁定于实轴 `I` 主干 |
| **$2$** | $0.760000$ | $0.577600$ | $0.333622$ | $0.111303$ | $0.064289$ | $\sigma_2^4 > 0.120$：保留为第二主成分 |
| **$3$** | $0.540000$ | $0.291600$ | $0.085031$ | $0.007230$ | $0.002108$ | $\sigma_3^4 < 0.120$：跌破阈值折入 $\hat{\mathbf{i}}$ 尾流 |
| **$4$** | $0.350000$ | $0.122500$ | $0.015006$ | $0.000225$ | $0.000028$ | $\sigma_4^4 < 0.120$：指数阻尼沉入尾流 |
| **$5$** | $0.200000$ | $0.040000$ | $0.001600$ | $0.000003$ | $0.000000$ | $\sigma_5^4 < 0.120$：微弱尾项（$\sigma_5^8 = 2.56\times 10^{-6}$） |
| **$6$** | $0.100000$ | $0.010000$ | $0.000100$ | $0.000000$ | $0.000000$ | $\sigma_6^4 < 0.120$：极微尾项（$\sigma_6^8 = 10^{-8}$） |
| **总和** | — | $2.041700$ | $1.435359$ | $1.118761$ | $1.066425$ | 保留秩 $r = 2$，折叠余下 $4$ 个次要模态 |

   对比单次未迭代谱与 $n = 4$ 轮自指回环后前 $r = 2$ 个模态捕获的精确模方占比（明示各自幂指数）：

   - **未迭代原始弗罗贝尼乌斯能量占比（指数 $2$）**：$\frac{\sigma_1^2 + \sigma_2^2}{\sum_{m=1}^6 \sigma_m^2} = \frac{1.577600}{2.041700} \approx 0.772689$（$77.2689\%$）；
   - **$n = 4$ 四轮迭代算子 $G_{\mathcal{B}}^4$ 弗罗贝尼乌斯能量占比 / 等权初态输出模方占比（指数 $8$）**：

     $$
     \frac{\sigma_1^8 + \sigma_2^8}{\sum_{m=1}^6 \sigma_m^8} \;=\; \frac{1 + 0.11130348}{1 + 0.11130348 + 0.00723020 + 0.00022519 + 2.56\times 10^{-6} + 10^{-8}} \;=\; \frac{1.11130348}{1.11876143} \;\approx\; 0.993334 \quad (99.3334\%);
     $$

   - **奇异值加权初态（$c_m \propto \sigma_m$）经 $n = 4$ 轮迭代后的模方占比（指数 $10$）**：$\frac{\sigma_1^{10} + \sigma_2^{10}}{\sum_{m=1}^6 \sigma_m^{10}} = \frac{1.064289}{1.066425} \approx 0.997997$（$99.7997\%$）。短短四轮自指反馈便将前两阶主干的模方纯度从 $77.27\%$ 提纯至 $99.33\%$ 以上！

3. **频闪量子芝诺留存率 $P_{\mathrm{surv}}(N) = [\cos^2(\pi/(4N))]^N$（$\Omega T = \pi/2$）的二阶收敛核验**：
   在无中途测量（$N = 1$）时，目标基留存率仅为 $\cos^2(\pi/4) = 0.500000$。加密频闪基捏合次数 $N$ 时，留存率按 $1 - \frac{\pi^2}{16 N} + \mathcal{O}(N^{-2})$ 单调逼近 $1$：$P_{\mathrm{surv}}(2) = 0.728553$，$P_{\mathrm{surv}}(4) = 0.856232$，$P_{\mathrm{surv}}(8) = 0.925676$；在实验卡默认档 **$N = 16$** 处，单步旋转角为 $\delta\theta = \pi/64 \approx 0.049087\;\mathrm{rad}$，单步漏失压低至 $\sin^2(\pi/64) \approx 0.002408$，单步留存 $\cos^2(\pi/64) \approx 0.997592$，总计 $16$ 步累积留存率精确达到

   $$
   P_{\mathrm{surv}}(16) \;=\; \bigl[\cos^2(\pi/64)\bigr]^{16} \;\approx\; 0.962166;
   $$

   继续加密至 $N = 64$ 时更升至 $P_{\mathrm{surv}}(64) \approx 0.990408$。
:::

下表将本节的四重几何机制、算子形式与认识论证据等级收束为一张零内嵌换行总表：

| 核心自指机制环节 | 算子与几何判据 | 对无限信息的处理动作 | 物理与认知层面的涌现表现及证据分层 |
| :--- | :--- | :--- | :--- |
| **自指停机精度 $\varepsilon_{\mathrm{self}}$** | 柯西残差判据 $\lVert x_k - x_{k-1}\rVert = \lVert\mathcal{F}_{\mathbf{I}}(x_{k-1}) - x_{k-1}\rVert \le \varepsilon_{\mathrm{self}}$ 即幂等拍板 $x^* \equiv x_k$ | 在球面容差帽内斩断无限倒退，封装 $O(1)$ 幂等记录 | **粗粒化因果裁量窗口**：避开 $\varepsilon \to 0$ 死锁与 $\varepsilon \to 1$（$k=1$）白噪（`MODEL` + Hoel 等 2013 `文献结果`） |
| **精度下余项折叠** | 正交和 $\Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle + \Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle$，尾项读作 $\hat{\mathbf{i}}\,\Pi_{<}$（$\hat{\mathbf{i}}^2 = -\mathbf{1}$） | 将低于 $\varepsilon_{\mathrm{self}}$ 的无穷尾项转入 $90^\circ$ 盲区保范封存 | **时间长河绵延**：单比特捏合的勾股与质量守恒（`LEAN ✓`），潜伏尾项随模流逐拍浮现为未来（`MODEL`） |
| **自指回环谱排序** | 幂迭代滤波 $G_{\mathcal{B}}^n \implies (\sigma_m/\sigma_1)^n$ 与克雷洛夫塔闭合 | 同相不变量自动置顶，异相涨落指数衰减沉底 | **宏观定律与主成分提纯**：克雷洛夫余秩界与永久稳定（`LEAN ✓`，只保证有限步饱和，不蕴含谱排序），低秩误差极小（Eckart–Young `文献结果`） |
| **测量基选择 $\mathcal{B}$** | 瑞利—玻恩赋权 $\langle\mathbf{b}_k\rvert\rho\lvert\mathbf{b}_k\rangle = \cos^2\theta_k$ 加频闪基捏合 | 按查询基重排优先级名次，二阶压制横向偏折漏失 | **注意力重排与芝诺塑形**：秩一玻恩权重与受监测首返守恒（`LEAN ✓`，后者为互补的首返协议，非芝诺极限），持续观测保护主干（Misra–Sudarshan `文献结果`） |

至此，自由裁量、时间之流、特征提纯与注意力塑形已在同一枚停机阈值 $\varepsilon_{\mathrm{self}}$ 周围合拢为一整座严丝合缝的几何钟表（其与普适比较主频 $\nu_0$、光速极限 $c$ 及史瓦西引力钟慢的硬件预算对应已在第八部 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation) 印证）。而当观察者的记忆指针、自指不动点与主动停机精度 $\varepsilon_{\mathrm{self}}$ 已经齐备，联立我们在[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md)建立的三元数无损流群表示（[§32.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md)），第九部压轴的一场工程与认知革命已呼之欲出：**如果我们把这套运行在平行三维概念场丛上的纯有理旋子动力学与自指主动停机机制直接铸造成新一代人工智能架构，现代深度学习与物理宇宙的测地线演化将擦出怎样的同构火花？** 在翻开 **[第三十七章 三元数场 Transformer（TFT）与宇宙—智能最小作用量同构](ch37-ternion-field-transformer-and-geodesic-intelligence.md)** 之前，不妨先打开下方完整交互实验室，在自由探索模式下同时联动旋转测量基取向 $\alpha_{\mathrm{basis}}$、拨动自指停机阈值 $\varepsilon_{\mathrm{self}}$、调高幂迭代轮数 $n$ 并推进时间游标 $t$，亲手体验“以何种基矢立身自照，何种秩序便排众而出凝成当下，而未尽微澜皆化作明日长河”的全景闭环。

::: {.viz src="self-halting-spectral-time-river-sandbox" height="640"}
**自指主动停机精度、时间长河正交折叠与测量基特征谱排序完整实验室（`HALT//SORT`）。** 在同一座三维固体舞台上贯通全部五张递进实验卡并支持“观察者读法／算子读法”双透镜切换：拖动琥珀色手柄或滑块连续调节停机精度阈值 $\varepsilon_{\mathrm{self}}$、测量基取向角 $\alpha$、幂迭代轮数 $n$、下游时间步 $t$ 与频闪检查数 $N$，实时核对青色置顶主干／受保护脊 $\Pi_{\ge \varepsilon_{\mathrm{self}}}$ 与品红 $90^\circ$ 正交时间长河／折叠尾流／二阶横漏 $\hat{\mathbf{i}}\,\Pi_{< \varepsilon_{\mathrm{self}}}$ 的勾股守恒账本（紫色标出精度帽、折页铰链 $\hat{\mathbf{i}}$、$G^n$ 椭球、正交基架 $B(\alpha)$ 与频闪环；右栏 `#evidence` 绿色 `LEAN ✓` 依据框严格对应 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 的七条冻结声明）。
:::
