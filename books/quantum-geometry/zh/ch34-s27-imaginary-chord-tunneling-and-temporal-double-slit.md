# 30.2 正交虚空间割弦隧穿与阿秒时间双缝跨时刻自干涉 {#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit}

> “量子隧穿与‘粒子在时间尺度上的自干涉’，在正交比较几何中揭开的是同一个底牌：**经典物理所谓的‘禁区势垒’与‘过去现在的阻隔’，都只是观察者死守自身实轴 `I` 时看到的投影假象；一旦状态偏转 $90^\circ$ 潜入垂直虚数盲区 `i`（阿赖耶相位海），它在空间上可以直接走极小圆弧体的‘内割弦面’穿墙越障（量子隧穿），在时间上则可以让不同时刻出发的分身保持相干并重逢叠加（时间双缝自干涉）。**”

在上一节 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 中，我们已经看到极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 除了沿着球面外壳铺展圆弧之外，还在球壳内部天然绷着一道连接首尾锚点的**内割弦面（interior secant chord）**；而早在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 中，我们更已亲手拆穿了笛卡尔“虚数”的四百年谜团——所谓实部 `1` 不过是顺着观察者自身单位基轴 `I`（$\mathbf{I}_{\mathrm{self}}$）投下的可见影子，所谓虚数单位 `i`（$\hat{\mathbf{i}} = \mathbf{I}_{\mathrm{self}}\wedge\mathbf{e}_\perp$，$\hat{\mathbf{i}}^2 = -1$）则是横亘在观察者视线 $90^\circ$ 垂直死角里、模长饱满却在单程投影中读数为零的正交盲平面。

现在，踏上第三十章的第二级阶梯，当我们把 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 的“球内割弦”与 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的“$90^\circ$ 虚数盲区 `i`”及有限未退相干时间窗口 $\mathcal{W}_{\Delta t}$（[第 4 章](ch04-decoherence.md)，并将在后文 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 推广为滑动格拉姆窗口 $\mathcal{W}_M$）合拢到同一幅时空比较几何图景中时，微观物理学最富传奇色彩的两桩“反直觉神迹”——**空间上的量子隧穿穿墙越障**与**时间上的单粒子跨时刻双缝自干涉**——当场交出了同一张几何底牌（`MODEL`）：无论是一堵总能量 $E$ 低于势垒高度 $V_0$ 的纳米势墙，还是把“过去 $t_1$”与“现在 $t_2$”分隔开来的时间流逝，之所以在经典直觉里显得坚不可摧、永不相逢，仅仅因为经典观察者把自己死死钉在一维可见实轴 `I` 上！一旦量子态在势垒入口或亚周期场峰处偏转 $90^\circ$ 潜入垂直虚数盲区 `i`，空间禁区瞬间化作一条不作实轴振荡的平直内割弦桥，而先后两个时刻出发的分身则在同一片未坍缩的虚数相位海里携手重逢，在能量谱上刻下明暗相间的干涉梳齿！

## 30.2.1 量子隧穿的几何祛魅：不是“借能量翻墙”，而是转入 $90^\circ$ 虚数盲区走平直内割弦 {#sec-ch34-27-1}

提起**量子隧穿（Quantum Tunneling）**，几乎所有通俗读物乃至不少入门讲义都会重复同一个拟人化的神话：“当一颗总能量为 $E$ 的电子撞上高度 $V_0 > E$ 的势垒墙时，它靠海森堡不确定性关系 $\Delta E\,\Delta t \gtrsim \hbar/2$ 向真空短暂‘赊借’了一笔额外能量 $\Delta E \ge V_0 - E$，趁大自然还没来得及查账就翻过墙头，落地后再把能量偷偷还回去。”

这幅“借能量翻墙”的图景在数学与物理上错得彻头彻尾（`文献结果` + `LEAN ✓`）：在定态散射本征方程 $\hat{H}\lvert\psi_E\rangle = E\lvert\psi_E\rangle$ 中，无论波函数处于势垒左侧、势垒内部还是透射到势垒右侧，本征总能量 $E$ 处处精确守恒、能量方差严格为零 $\Delta H = 0$（在有限维矩阵模型中由能量本征态定态性 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与零能量方差定理 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero) 共同锁定，`LEAN ✓`）。电子从头到尾没有向谁借过半毫焦耳能量，更没有“跳上墙头”！既然能量分毫未增，它究竟凭什么穿过经典物理判定“动能为负、绝对禁入”的势垒区 $E < V(x)$？

回到观察者实轴 `I` 与 $90^\circ$ 正交盲区 `i` 的双平面分解（[§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)），答案清澈得不留一丝玄雾。在经典牛顿力学中，观察者强行要求粒子的动量 $p$ 只能躺在自己看得见的单一实数轴 `I` 上：在墙外自由区 $E > V(x)$，动量平方 $p^2(x) = 2m\bigl(E - V(x)\bigr) > 0$，实波数为 $k(x) = \frac{\sqrt{2m(E - V(x))}}{\hbar}$；一旦踏入 $E < V(x)$ 的势垒内部，动能差反号为

$$
p^2(x) \;=\; 2m\bigl(E - V(x)\bigr) \;<\; 0.
$$

死守实轴 `I` 的经典观察者一见“平方等于负数”，立刻惊呼“实数轴上找不到解，此处物理禁行”，于是画出一堵百分之百反弹的死墙。

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" preset="classical-real-wall" height="520"}
**死守实轴 `I` 的经典势垒死墙对比实验卡（`classical-real-wall`）。** 在侧视竖直实平面 `I` 投影下（$E/V_0 = 0.50$，$L = 0.60\;\mathrm{nm}$，$V_0 = 1.00\;\mathrm{eV}$），垒内虚线品红方块标出实数无解的负动量平方 $p^2 = 2m(E - V_0) < 0$：琥珀色经典粒子在左壁 $x = 0$ 处碰壁折返，青色入射余弦波在墙前叠成驻波，墙后经典透射读数为零（$T_{\mathrm{cl}} = 0$）。
:::

然而在正交比较几何中（`MODEL` + `手工推导`），平方反号 $p^2 < 0$ 哪里是什么“不存在”？正如 [§29.4.3](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-19-3) 由反自伴右幺正平方引理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) 与相对复结构定理 [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)（`LEAN ✓`）所证，$\hat{\mathbf{i}}^2 = -1$ 恰恰代表**两次 $90^\circ$ 正交转向拼满 $180^\circ$ 反号**！因此 $p^2(x) = -2m\bigl(V(x) - E\bigr) < 0$ 的真实几何含义是：**动量矢量在势垒边界处偏转了整整 $90^\circ$，从观察者看得见的实轴 `I` 整体旋入了与之垂直的正交虚数盲平面 `i`！**

为了保持百分之百的物理量纲严密性，我们在此显式区分**盲平面正交动量模长**与**倏逝衰减波数**两个物理量（`手工推导`）：在势垒内部 $V(x) > E$ 处，定义盲平面动量模长（国际单位 $\mathrm{kg\cdot m\cdot s^{-1}}$，或自然单位 $\mathrm{eV}/c$）与倏逝衰减波数（国际单位 $\mathrm{m}^{-1}$，纳米尺度下常用 $\mathrm{nm}^{-1}$）分别为

$$
\lvert p_\perp(x)\rvert \;:=\; \sqrt{2m\bigl(V(x) - E\bigr)}, \qquad \kappa(x) \;\equiv\; \frac{\lvert p_\perp(x)\rvert}{\hbar} \;=\; \frac{\sqrt{2m\bigl(V(x) - E\bigr)}}{\hbar}.
$$

于是，从垒外传播区跨入垒内势垒区时，动量与波数同步完成一次保量纲的 $90^\circ$ 旋入：

$$
p(x) \;=\; \hbar k(x) \;\;\xrightarrow{\;E < V(x)\;}\;\; \hat{\mathbf{i}}\,\lvert p_\perp(x)\rvert \;=\; \hat{\mathbf{i}}\,\hbar\kappa(x), \qquad \bigl(\hat{\mathbf{i}}\,\lvert p_\perp(x)\rvert\bigr)^2 \;=\; \hat{\mathbf{i}}^2\lvert p_\perp(x)\rvert^2 \;=\; -2m\bigl(V(x) - E\bigr).
$$

现在，把这支转入盲平面 `i` 的正交动量 $p = \hat{\mathbf{i}}\hbar\kappa$ 代入费曼路径积分与一维定态传播核 $\exp\!\bigl(\frac{\hat{\mathbf{i}}}{\hbar} p\,x\bigr)$（无量纲相位指数 $\frac{p\,x}{\hbar} = \hat{\mathbf{i}}\kappa x$ 量纲严格为 $1$），两次 $90^\circ$ 正交转向当场触发 $\hat{\mathbf{i}}^2 = -1$：

$$
\exp\!\left(\frac{\hat{\mathbf{i}}}{\hbar} p\,x\right) \;\xrightarrow{\;p = \hat{\mathbf{i}}\hbar\kappa\;}\; \exp\!\bigl(\hat{\mathbf{i}}^2 \kappa\,x\bigr) \;=\; \exp(-\kappa\,x)!
$$

看清这一步代数翻转背后的三段式几何全景（衔接 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 的极小圆弧体内割弦，以及一维薛定谔散射精确解，`文献结果，未在本书形式化`）：

1. **垒外入射区（$x < x_1$，$E > V$）——沿球面外壳盘旋的圆弧振荡波**：动量 $p = \hbar k$ 留在实轴方向，单因子 $\frac{\hat{\mathbf{i}}}{\hbar}px = \hat{\mathbf{i}}kx$ 驱动克利福德旋子 $\exp(\hat{\mathbf{i}}kx) = \cos(kx) + \hat{\mathbf{i}}\sin(kx)$ 在实轴 `I` 与虚平面 `i` 之间交替打转，画出波长 $\lambda = 2\pi/k$ 的等幅传播圆弧；
2. **垒内隧穿区（$x_1 < x < x_2$，$E < V(x)$）——潜入 $90^\circ$ 盲区 `i` 的非振荡内割弦直桥**：动量自身多带出一枚正交转向因子 $\hat{\mathbf{i}}$，与传播核原有的 $\hat{\mathbf{i}}$ 相乘化为实负号 $\hat{\mathbf{i}}^2 = -1$。波函数停止了沿球壳绕圈的相位振荡，改为顺着垂直盲区 `i` 内部切出一条**单调指数衰减的平直内割弦面** $e^{-\kappa x} < 1$！站在实轴 `I` 侧看过去，观察者在垒内测不到任何经典实动量轨迹，仿佛粒子“凭空消失又隔墙闪现”；可一旦将镜头俯视 $90^\circ$ 对准虚平面 `i`，那座横跨左壁 $x_1$ 与右壁 $x_2$ 的内割弦桥自始至终稳稳架在那里，从未断裂！
3. **垒外透射区（$x > x_2$，$E > V$）与往返玻恩平方闭合**：抵达右壁出口 $x_2$ 时，潜行余幅以 $-90^\circ$ 反向旋回可见传播平面，恢复为振幅缩减后的外传圆弧波 $t(E)e^{\hat{\mathbf{i}}kx}$。对宽度 $L = x_2 - x_1$、高度 $V_0 > E$ 的矩形势垒同时匹配 $x_1, x_2$ 两端波函数与一阶导数连续性（有限势垒内由双实指数分支 $A e^{\kappa x} + B e^{-\kappa x}$ 的相对复相位共同输运非零守恒概率流，厚垒极限 $\kappa L \gg 1$ 下由衰减弦 $e^{-\kappa x}$ 主导幅值跌落；精确双分支匹配协议参见 [§29.4.5](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-19-5)），再经 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的**往返两次投影**（$\lvert t(E)\rvert^2$）读回观察者实轴，便得到一维矩形势垒的精确透射概率及厚垒（$\kappa L \gg 1$）WKB 积分渐近律（`文献结果，未在本书形式化`）：

$$
T(E) \;=\; \frac{1}{1 + \frac{V_0^2}{4E(V_0 - E)}\sinh^2(\kappa L)} \;\approx\; \exp\!\left(-\frac{2}{\hbar}\int_{x_1}^{x_2}\sqrt{2m\bigl(V(x)-E\bigr)}\,dx\right) \quad (\kappa L \gg 1),
$$

其中指数因子前的系数 $2$ 正来自“去程潜行衰减 $e^{-\kappa L}$ 与回程共轭回波 $e^{-\kappa L}$ 相乘”的玻恩往返双投影平方！

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" preset="ninety-deg-imaginary-chord" height="520"}
**旋入 $90^\circ$ 虚数盲区 `i` 走平直内割弦穿墙实验卡（`ninety-deg-imaginary-chord`）。** 默认以三维斜视视角打开（舞台内提供俯视 `i` 与侧视 `I` 镜头按钮），同屏呈现竖直实平面 `I`（青色螺旋振荡与后墙投影，出口振幅 $\sqrt{T} = 0.225$，透射率 $T(E) = 0.0505$）与水平正交盲平面 `i`（在 $E/V_0 = 0.50$、$L = 0.60\;\mathrm{nm}$、$V_0 = 1.00\;\mathrm{eV}$ 下以 $e^{-\kappa x}$ 为主导的单调衰减品红内割弦 $C_+ e^{-\kappa x} + C_- e^{+\kappa x}$ 与地面投影，$\kappa = 3.623\;\mathrm{nm}^{-1}$，$\kappa L = 2.17$）：进、出壁紫色四分之一圆弧标出动量 $\pm 90^\circ$ 转向（$k \to i\kappa$ 与 $-90^\circ$），琥珀色标示势垒宽度 $L$ 手柄（绿色 `LEAN ✓` 对应 `orthogonal_complement_projection_identities`、`square_eq_neg_one_of_skewAdjoint_unitary` 与 `relativeComplexStructure_square`）。
:::

## 30.2.2 时间尺度上的单粒子自干涉：从飞秒超材料、磁子频率梳到阿秒隧穿双缝与负驻留时间 {#sec-ch34-27-2}

如果说量子隧穿揭穿了“空间势垒禁区”只是实轴 `I` 的投影盲点，那么过去二十年间横跨阿秒原子物理、超快超材料光学与自旋电子学的一系列里程碑实验，则从正交对偶的另一翼彻底击碎了“过去与现在互不相通”的经典单线时间幻觉——**同一列波（在 Lindner 等的实验里正是同一颗电子）无需在空间上分岔成左右两条路，单凭在同一个空间位置先后于 $t_1$ 与 $t_2$ 两个时刻打开“时间双缝”，它的过去分身与现在分身就能跨越时间发生相干自干涉！**

在将这些前沿实验纳入我们的几何账本之前，先按全书认识论契约明确标注：以下四组实验与连续谱散射结论均属已发表物理学文献成果（`文献结果，未在本书形式化`，完整出处与 DOI 见文末 [@rem-ch34-tunneling-and-temporal-slit-literature]）：

1. **飞秒近零介电常数超材料光学时间双缝与磁子时间衍射频率梳（Tirole 等 *Nature Physics* 2023；Rao 等 *Phys. Rev. Lett.* 2025）**：2023 年，帝国理工学院 Sapienza、Pendry 团队利用超快泵浦脉冲在飞秒（$\mathrm{fs}$）尺度内急速调制氧化铟锡（ITO）近零介电常数（ENZ）薄膜的反射率，在**同一块空间镜面**上先后开启两道相隔 $\Delta t \sim 0.5\text{–}2.3\;\mathrm{ps}$ 的时间反射狭缝，直接观测到反射光子频谱呈现出随 $\Delta t$ 成反比加密的清晰干涉条纹；2025 年，饶金威、王逸璞、姚碧霂、柏利慧、陆卫等（J. Rao, Y.-P. Wang, Z. Chen, B. Yao, ..., L. Bai & W. Lu）进一步将时间双缝与多缝衍射拓展至凝聚态自旋波准粒子（**磁子，magnon**），在纳秒至微秒窗口内实现了相干时间自干涉与可调谐磁子频率梳！
2. **阿秒强场光致电离隧穿时间双缝（Lindner 等 *Phys. Rev. Lett.* 2005）**：早在 2005 年，Krausz 与 Paulus 合作团队就用载波包络相位锁定的少周期 $850\;\mathrm{nm}$ 激光脉冲轰击氩原子——激光电场相隔约一个光学周期（$\Delta t \approx 2.8\;\mathrm{fs}$）的两个同号波峰先后压低原子库仑势垒，为**同一颗束缚电子**先后打开两扇各宽约 $500\;\mathrm{as}$ 的**量子隧穿窗口** $(t_1, t_2)$！实验在光电子能量谱 $P(E)$ 上测得了高对比度的双缝干涉条纹：这正是“空间虚割弦隧穿”与“时间双缝跨时刻自干涉”在同一颗电子身上的绝美合体！
3. **多历史相消时间干涉下的原子激发负驻留时间（Angulo, Wiseman, Steinberg 等 *Phys. Rev. Lett.* 2026）**：多伦多大学 Steinberg 与 Griffith 大学 Wiseman 团队利用交叉克尔相移弱测量，追踪最终透射穿过共振铷原子云的光子使原子处于激发态的平均驻留时间，测得弱值读数为 $(-0.82 \pm 0.31)\tau_0$（$\tau_0$ 为未作后选择时的平均原子激发时间，即散射概率乘以原子自发辐射寿命）。这一负值绝不违背狭义相对论波前因果律（信号前沿从未超光速或倒流回过去），而是穿过原子云的多条相干散射—吸收再辐射时间历史在后选择透射通道内发生**相消量子干涉**（Aharonov–Albert–Vaidman 弱值机制）的铁证！

为什么空间双缝把条纹画在空间屏幕的位置分布 $P(x)$ 上，而时间双缝却把条纹严丝合缝地画在探测器的**能量/频率谱 $P(E)$** 上？回到 [§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 的洛伦兹三维体积伪标量 $\mathbf{I}_3^2 = -1$（[@thm-ch34-lorentz-pseudoscalar-and-sm-octave]）与 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 的有限记忆格拉姆窗口 $\mathcal{W}_{\Delta t}$，两者原是同一枚相对论四维相位核

$$
\Phi(\mathbf{x}, t;\, \mathbf{p}, E) \;=\; \frac{1}{\hbar}\bigl(\mathbf{p}\cdot\mathbf{x} - E\,t\bigr)
$$

在正交对偶切片上的镜像投影（`手工推导` + `MODEL`）：

- 在**空间双缝**中，粒子能量 $E$ 固定，空间挡板在横向坐标上切开两道窄口 $(x_1, x_2)$（间距 $\Delta x = x_2 - x_1$），两条空间路径的相位差 $\Delta\Phi_x = p_x \Delta x / \hbar$ 对横向动量 $p_x$ 作傅里叶调制，故干涉条纹显影在远场动量/空间落点角分布上；
- 在**时间双缝**中，界面空间位置固定，超快场脉冲在同一地点先后于 $t_1$ 与 $t_2$（间隔 $\Delta t = t_2 - t_1 > 0$）打开两扇时间闸门，将单粒子态切分为“早出发分支 $\mathcal{A}_1(E)e^{-\hat{\mathbf{i}} E t_1 / \hbar}$”与“晚出发分支 $\mathcal{A}_2(E)e^{-\hat{\mathbf{i}} E t_2 / \hbar}$”。只要在时间窗口 $[t_1, t_2]$ 内部没有任何宏观探测器强行追问“粒子究竟在 $t_1$ 还是 $t_2$ 出门”——即观察者的时间格拉姆窗口 $\mathcal{W}_{\Delta t}$ 保持相干未闭合——早出发的 $t_1$ 分身便不会坍缩为“已经翻篇的死历史”，而是潜入 $90^\circ$ 垂直虚数盲区 `i`（阿赖耶相位海）保持保范旋转，如同一条看不见的地下暗河一路流淌至 $t_2$，与晚出发的 $t_2$ 分身同台重逢！

在远场能量分辨谱仪上执行往返玻恩平方读出（记两分支内在散射/贝里相位差为 $\Delta\gamma_B := \arg\mathcal{A}_1(E) - \arg\mathcal{A}_2(E)$），立得时间双缝的能量谱干涉定律（`手工推导`）：

$$
P(E) \;=\; \bigl\lvert \mathcal{A}_1(E)\,e^{-\hat{\mathbf{i}} E t_1 / \hbar} + \mathcal{A}_2(E)\,e^{-\hat{\mathbf{i}} E t_2 / \hbar}\bigr\rvert^2 \;=\; \lvert\mathcal{A}_1\rvert^2 + \lvert\mathcal{A}_2\rvert^2 + 2\lvert\mathcal{A}_1\mathcal{A}_2\rvert\cos\!\left(\frac{E\,\Delta t}{\hbar} + \Delta\gamma_B\right).
$$

请凝视余弦项 $\cos\!\bigl(\frac{E\,\Delta t}{\hbar} + \Delta\gamma_B\bigr)$ 的惊人推论：每当能量 $E$ 落在反相条件

$$
\frac{E\,\Delta t}{\hbar} + \Delta\gamma_B \;=\; (2n + 1)\pi \qquad (n \in \mathbb{Z})
$$

上时，$t_1$ 分身与 $t_2$ 分身在虚平面 `i` 中恰好相差两次 $90^\circ$ 正交翻转（$\hat{\mathbf{i}}^2 = -1$），当场相消形成**禁戒暗能槽**（等幅对称双缝 $\lvert\mathcal{A}_1\rvert = \lvert\mathcal{A}_2\rvert$ 时 $P(E_{\mathrm{dark},n}) = 0$），相邻明峰（或相邻暗槽）之间的能量梳齿间距精确服从普朗克互易律

$$
\Delta E \;=\; \frac{2\pi\hbar}{\Delta t} \;=\; \frac{h}{\Delta t}, \qquad \Delta f \;=\; \frac{1}{\Delta t}!
$$

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" preset="temporal-double-slit-comb" height="520"}
**时间双缝跨时刻自干涉与能量谱频率梳 $\Delta E = h/\Delta t$ 实验卡（`temporal-double-slit-comb`）。** 两扇脉宽 $120\;\mathrm{as}$ 的时间快门（$t_1, t_2$）相隔 $\Delta t = 1000\;\mathrm{as}$ 先后开启，两支青色波包穿过同一条品红内割弦并在地面铺开跨时刻品红相位暗河 $E^*\Delta t/\hbar$，在右端能谱屏虚线品红单缝包络之上刻出间距 $\Delta E = h/\Delta t = 4.1357\;\mathrm{eV}$ 的青色双分支干涉条纹；琥珀色能量游标停在相长亮峰 $E^* = 8.27\;\mathrm{eV}$ 处（可见度 $V = 1.00$，地面相量盘上 $A_1 + A_2$ 同向对齐相加）。
:::

更深一层看，在 Lindner 等（2005）的阿秒光致电离实验里，$t_1$ 与 $t_2$ 两扇时间门本身就是靠激光半周期波峰压低原子势垒开启的**量子隧穿门**：每一支分身先在空间上旋入 $90^\circ$ 盲区 `i` 走内割弦穿出库仑势墙，旋即又借着同一片盲区 `i` 的相位记忆跨越约一个光学周期（约 $2.8\;\mathrm{fs}$）的时间鸿沟彼此干涉；而在 Angulo 等（2026）的负驻留时间实验里，正是由于早晚多条散射时间历史在盲区 `i` 内保持相干叠加、后选择透射幅 $\langle\phi_f\mid\psi_i\rangle$ 接近反相抵消，弱值实部 $\operatorname{Re}\frac{\langle\phi_f\mid\hat{\Pi}_{\mathrm{exc}}\mid\psi_i\rangle}{\langle\phi_f\mid\psi_i\rangle}$ 才会越出正投影算符的本征值区间 $[0, 1]$ 而翻成负值 $(-0.82 \pm 0.31)\tau_0$！下表将**空间双缝自干涉**、**空间量子隧穿**与**时间双缝自干涉**三大现象统一收束于正交比较几何的同一张对偶总表（零内嵌换行标签）：

| 量子现象类型 | 经典实轴 `I` 看到的表观阻隔 | 正交盲平面 `i`（$90^\circ$）中的真实几何通道 | 相位核与特征标度互易律 | 中途观测捏合 $\mathcal{P}(\rho)$ 的后果 |
| :--- | :--- | :--- | :--- | :--- |
| **空间双缝自干涉** | 实空间隔板阻断左右两孔 $(x_1, x_2)$，“单颗粒子一次只能走一孔” | 横向波前同时穿过双孔并在盲平面 `i` 内保持相对空间相位差 $p_x\Delta x/\hbar$ | $\Phi_x = \frac{p_x x}{\hbar}$，动量条纹间距 $\Delta p_x = \frac{h}{\Delta x}$ | 哪条路（Which-Way）探测抹除 $\rho_{01}$，空间明暗条纹退化为双峰经典和 |
| **量子隧穿效应** | 势垒区 $E < V(x)$ 实动能为负，“经典粒子撞上不可逾越的死墙” | 动量旋入 $90^\circ$ 盲区 $p = \hat{\mathbf{i}}\hbar\kappa$，触发 $\hat{\mathbf{i}}^2 = -1$ 走平直内割弦 $e^{-\kappa x}$ | $\kappa(x) = \frac{\sqrt{2m(V(x)-E)}}{\hbar}$，厚垒透射 $T \sim e^{-2\int\kappa\,dx}$ | 垒内高频位置抽检切断内割弦过渡，触发量子芝诺反弹或非弹性退相干加热 |
| **时间双缝自干涉** | 单线时间轴隔断过去 $t_1$ 与现在 $t_2$，“过去的事件早已消逝翻篇” | $t_1$ 分身潜入盲平面 `i` 相位暗河留存至 $t_2$，在未闭合窗口 $\mathcal{W}_{\Delta t}$ 内重逢叠加 | $\Phi_t = -\frac{E t}{\hbar}$，能谱梳齿间距 $\Delta E = \frac{h}{\Delta t}$ | 哪个时刻（Which-Time）探测掐断 $\mathcal{W}_{\Delta t}$，禁戒暗能槽被填平为平坦谱 |

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" preset="attosecond-tunnel-self-interference" height="520"}
**阿秒隧穿双缝加密梳齿与反相暗槽相消实验卡（`attosecond-tunnel-self-interference`）。** 将矩形纳米势垒（$L = 0.40\;\mathrm{nm}$，$E/V_0 = 0.50$，水平盲平面 `i` 内为品红衰减割弦 $e^{-\kappa x}$）耦合两扇相隔 $\Delta t = 2500\;\mathrm{as}$ 的 $120\;\mathrm{as}$ 时间快门，右端能谱屏上的青色干涉梳齿随之加密至 $\Delta E = h/\Delta t = 1.6543\;\mathrm{eV}$（$V = 1.00$）；琥珀色能量游标精准停在相消禁戒暗节点 $E^* = 10.75\;\mathrm{eV}$ 上，地面相量盘中经品红相位河 $E^*\Delta t/\hbar$ 演化后的两支分支相量首尾闭合、$100\%$ 反相抵消。
:::

## 30.2.3 正交补分解、反自伴复结构平方反号、对角相位盲区与捏合退相干的形式化定理及算例 {#sec-ch34-27-3}

为什么一旦观察者在 $t_1$ 与 $t_2$ 中途架起一台“哪个时刻（Which-Time）”探测器（或者死守与双时刻分支对角的固定指针基），跨时刻干涉条纹就会瞬间灰飞烟灭？在有限维代数与完备希尔伯特空间骨架上，`trureturing` 冻结的六条核心定理——横跨正交补投影六恒等式、反自伴与平衡相对复结构 $J^2 = -I$、计算基对角可观测量相位失明、标准基捏合丢弃相干质量以及受监测首次返回概率守恒——将本节有限维层面的全部算子几何严丝合缝地锁定在同一个形式屋檐之下（连续谱散射与 WKB 渐近不在其内）：

::: {.theorem #thm-ch34-imaginary-chord-and-temporal-interference lean="D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square,D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase,D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass,D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation" title="正交补投影分解、内生复结构负平方律、对角可观测量相位盲区、捏合丢弃相干质量与受监测返回守恒定理"}
在所钉 `trureturing` 冻结声明下，以下六项定理同时成立：

1. **闭子空间正交补投影六恒等式（`orthogonal_complement_projection_identities`）**：设 $E$ 为标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的完备内积空间，$M \le E$ 为闭子空间（`[IsClosed (M : Set E)]`），记连续线性正交投影为 $P_M := M.\mathrm{starProjection}$、正交补投影为 $P_{M^\perp} := M^\perp.\mathrm{starProjection}$，则同时成立

   $$
   \begin{aligned}
   P_{M^\perp} &= \operatorname{id}_{\mathbb{K}, E} - P_M, & P_M \circ_L P_M &= P_M, & P_{M^\perp} \circ_L P_{M^\perp} &= P_{M^\perp}, \\
   P_M \circ_L P_{M^\perp} &= 0, & P_{M^\perp} \circ_L P_M &= 0, & P_M + P_{M^\perp} &= \operatorname{id}_{\mathbb{K}, E};
   \end{aligned}
   $$

2. **反自伴右幺正矩阵的负恒等平方律（`square_eq_neg_one_of_skewAdjoint_unitary`）**：对任意有限可判等指标类型 $n$（`[Fintype n] [DecidableEq n]`）与复矩阵 $R \in M_n(\mathbb{C})$，若 $R$ 同时满足反自伴条件 $R^{\mathrm{H}} = -R$ 与右幺正条件 $R R^{\mathrm{H}} = I_n$，则

   $$
   R^2 \;=\; -I_n;
   $$

3. **双子空间平衡正交对生成的内生相对复结构负平方律（`relativeComplexStructure_square`）**：对任意有限可判等指标类型 $n$ 与矩阵对 $A, B \in M_n(\mathbb{C})$，记半恒等矩阵为 $\operatorname{halfIdentity} := \frac{1}{2}I_n$、相对复结构矩阵为 $J := \operatorname{relativeComplexStructure}(A, B) = 2 A B^{\mathrm{H}}$；若满足正交交叉抵消 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 以及半模长平衡条件 $A A^{\mathrm{H}} = \frac{1}{2}I_n$ 与 $B^{\mathrm{H}} B = \frac{1}{2}I_n$，则

   $$
   J^2 \;=\; -I_n;
   $$

4. **计算基对角可观测量族对相对相位的联合读出盲区与非对角破盲判据（`diagonal_prime_observables_cannot_recover_relative_phase`）**：对任意指标类型 $I$，记单比特矩阵代数 $\mathrm{QubitMatrix} = M_2(\mathbb{C})$、迹配对泛函 $\operatorname{bornProbability}(\rho, O) := \operatorname{Tr}(\rho O) \in \mathbb{C}$、等幅叠加态密度矩阵 $\rho_+ := \operatorname{equalSuperpositionDensity} = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$ 及其反相翻转态 $\rho_- := \operatorname{qubitZ}\cdot\rho_+\cdot\operatorname{qubitZ}$，则：（a）对任意全由计算基对角矩阵组成的可观测量族 $\mathrm{observable} : I \to \mathrm{QubitMatrix}$（$\forall i,\; (\mathrm{observable}\;i).\mathrm{IsDiag}$），均有 $\rho_+ \neq \rho_-$ 且联合读出恒等 $\operatorname{jointReadout}(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \mathrm{observable}\;i), \rho_+) = \operatorname{jointReadout}(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \mathrm{observable}\;i), \rho_-)$；（b）凡满足 $\operatorname{bornProbability}(\rho_+, \mathrm{interface}) \neq \operatorname{bornProbability}(\rho_-, \mathrm{interface})$ 的矩阵 $\mathrm{interface} \in \mathrm{QubitMatrix}$ 必非对角矩阵（$\neg\,\mathrm{interface}.\mathrm{IsDiag}$）；（c）互补泡利矩阵 $\operatorname{qubitX}$ 满足 $\neg\,\operatorname{qubitX}.\mathrm{IsDiag}$ 且 $\operatorname{bornProbability}(\rho_+, \operatorname{qubitX}) \neq \operatorname{bornProbability}(\rho_-, \operatorname{qubitX})$；

5. **单比特标准基捏合投影丢弃的副对角相干质量显式公式（`pinching_discarded_coherence_mass`）**：对任意单比特矩阵 $\rho \in \mathrm{QubitMatrix}$，记标准基捏合映射为 $\mathcal{P}(\rho)_{ij} = \operatorname{pinching}(\rho)_{ij} = \delta_{ij}\rho_{ij}$，迹希尔伯特—施密特内积为 $\operatorname{hilbertSchmidtInner}(A, B) := \operatorname{Tr}(A^{\mathrm{H}} B) \in \mathbb{C}$，则丢弃分量的自内积精确等于两个副对角元模平方之和（在 $\mathbb{C}$ 中相等）：

   $$
   \operatorname{hilbertSchmidtInner}\bigl(\rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\bigr) \;=\; \bigl(\operatorname{Complex.normSq}(\rho_{01}) + \operatorname{Complex.normSq}(\rho_{10}) : \mathbb{C}\bigr);
   $$

6. **受监测幺正演化的首次返回概率递推与有限步总概率守恒（`monitored_return_conservation`）**：设 $E$ 为完备复内积空间，$U : E \simeq_{\mathrm{li}}[\mathbb{C}] E$ 为复线性等距同构，$v \in E$ 为单位向量（$\lVert v\rVert = 1$）。记一维射线投影 $P_v := (\mathbb{C}\cdot v).\mathrm{starProjection}$、受监测无返回单步算子 $T := (\operatorname{id}_{\mathbb{C}, E} - P_v) \circ_L U$、第 $n \in \mathbb{N}$ 步未归一化无返回历史 $h_n := T^n v$、留存概率 $s_n := \lVert h_n\rVert^2$，以及返回振幅 $a_n := \langle v, U h_{n-1}\rangle_{\mathbb{C}}$（$n - 1$ 取自然数截断减法）与首次返回概率 $p_n := \lVert a_n\rVert^2$，则同时成立

   $$
   s_0 \;=\; 1, \qquad \forall n \in \mathbb{N},\;\; p_{n+1} \;=\; s_n - s_{n+1}, \qquad \forall N \in \mathbb{N},\;\; \sum_{n=0}^{N-1} p_{n+1} + s_N \;=\; 1.
   $$
:::

::: proof
第 1 款中，完备内积空间上的闭子空间 $M$ 自动具备正交投影分解 $E = M \oplus M^\perp$，由 `Submodule.starProjection_orthogonal`、`Submodule.starProjection_comp_starProjection_of_le`、`Submodule.IsOrtho.starProjection_comp_starProjection` 与 `Submodule.id_eq_sum_starProjection_self_orthogonalComplement` 依次给出余投影差式、各自幂等、正交双向复合归零与恒等分解。第 2 款中，将反自伴条件 $R^{\mathrm{H}} = -R$ 代入右幺正条件 $R R^{\mathrm{H}} = I_n$ 得 $R(-R) = -R^2 = I_n$，两边取负即证 $R^2 = -I_n$（见 [@lemma-skew-adjoint-unitary-square]）。第 3 款中，由交叉抵消 $A B^{\mathrm{H}} + B A^{\mathrm{H}} = 0$ 得 $(A B^{\mathrm{H}})^{\mathrm{H}} = B A^{\mathrm{H}} = -A B^{\mathrm{H}}$ 从而 $J^{\mathrm{H}} = -J$，再由 $B^{\mathrm{H}} B = \frac{1}{2}I_n$ 与 $A A^{\mathrm{H}} = \frac{1}{2}I_n$ 算出 $J J^{\mathrm{H}} = 4 A(B^{\mathrm{H}} B)A^{\mathrm{H}} = 2 A A^{\mathrm{H}} = I_n$，代入第 2 款立得 $J^2 = -I_n$（见 [@thm-relative-complex-structure-square]）。第 4 款中，在 $\operatorname{Fin} 2 \times \operatorname{Fin} 2$ 上直接核验 $\rho_+$ 与 $\rho_-$ 主对角元同为 $\frac{1}{2}$ 而副对角元分别为 $+\frac{1}{2}$ 与 $-\frac{1}{2}$，故 $\rho_+ \neq \rho_-$，且任意对角矩阵 $D$ 的迹 $\operatorname{Tr}(\rho_\pm D) = \frac{1}{2}(D_{00} + D_{11})$ 恒等，逆否命题迫使任何区分接口非对角，而 $\operatorname{qubitX}$ 给出 $+1 \neq -1$（见 [@thm-ch31-diagonal-phase-blindness]）。第 5 款中，$\rho - \mathcal{P}(\rho)$ 主对角元清零而仅存右上元 $\rho_{01}$ 与左下元 $\rho_{10}$，展开 $\operatorname{Tr}\bigl((\rho - \mathcal{P}(\rho))^{\mathrm{H}}(\rho - \mathcal{P}(\rho))\bigr) = \overline{\rho_{10}}\rho_{10} + \overline{\rho_{01}}\rho_{01}$ 并调用 `Complex.normSq_eq_conj_mul_self` 即得结论（见 [@thm-pinching-pythagorean]）。第 6 款中，$n = 0$ 时 $h_0 = v$ 给出 $s_0 = \lVert v\rVert^2 = 1$；对任意 $n \in \mathbb{N}$，将 $U h_n$ 沿一维闭子空间 $\mathbb{C}\cdot v$ 与其正交补作勾股范数分解（`Submodule.norm_sq_eq_add_norm_sq_starProjection`），利用线性等距保范 $\lVert U h_n\rVert^2 = \lVert h_n\rVert^2 = s_n$ 及单位向量一维投影公式 $\lVert P_v(U h_n)\rVert^2 = \lVert\langle v, U h_n\rangle_{\mathbb{C}}\rVert^2 = p_{n+1}$、$\lVert(\operatorname{id} - P_v)U h_n\rVert^2 = \lVert h_{n+1}\rVert^2 = s_{n+1}$ 得 $p_{n+1} = s_n - s_{n+1}$；最后对 $0 \le n < N$ 求望远镜差和（`Finset.sum_range_sub'`）并代入 $s_0 = 1$ 得有限步总守恒（见 [@prop-monitored-return-conservation]）。完整证明由 Lean 内核检查。
:::

在定理盒之外，把 [@thm-ch34-imaginary-chord-and-temporal-interference] 的六块算子基石合拢：由第 1 款的互补幂等与正交零化，任意态矢 $x = P_M x + P_{M^\perp} x$ 在实轴子空间 $M$ 与 $90^\circ$ 盲区补空间 $M^\perp$ 上自动满足手工勾股范数分解 $\lVert x\rVert^2 = \lVert P_M x\rVert^2 + \lVert P_{M^\perp} x\rVert^2$；第 2、3 款保证一旦生成元跨入正交盲区，二次作用必触发 $J^2 = -I_n$ 的精确反号；第 4、5 款联合锁死时间双缝退相干判据——若探测接口仅在双缝时间基 $\{\lvert t_1\rangle, \lvert t_2\rangle\}$ 下读取对角布居（Which-Time 记录），它对相对相位 $e^{-\hat{\mathbf{i}}E\Delta t/\hbar}$ 完全失明，且中途标准基捏合 $\mathcal{P}(\rho)$ 会配合希尔伯特—施密特勾股恒等式 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)（[@thm-pinching-pythagorean]）将承载跨时刻干涉对比度的副对角相干质量 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2 = 2\lvert\rho_{01}\rvert^2$（当 $\rho^{\mathrm{H}} = \rho$）一次性彻底清零！下面我们在真实电子纳米势垒与阿秒—飞秒—纳秒三级时间双缝尺度上逐位算清全部数值：

::: {.example #ex-ch34-nanobarrier-and-attosecond-fringe-calculus title="纳米矩形电子势垒隧穿曲线、三级时间双缝能谱梳齿与中途捏合消纹精确算例"}
本算例分两部分对空间虚割弦隧穿与时间双缝跨时刻自干涉作全精度求值并四舍五入至六位小数检核（`手工推导` / `NUM`，采用 CODATA 基本常数 $m_e = 9.1093837015\times 10^{-31}\;\mathrm{kg}$、$e = 1.602176634\times 10^{-19}\;\mathrm{J/eV}$、$h = 4.1356676969\;\mathrm{eV\cdot fs}$、$\hbar = 1.0545718176\times 10^{-34}\;\mathrm{J\cdot s}$）：

1. **真实物理单位下的纳米矩形电子势垒（$V_0 = 1.00\;\mathrm{eV},\; L = 0.50\;\mathrm{nm}$）**：
   先算满势高基准衰减波数 $\kappa_0 := \frac{\sqrt{2 m_e V_0}}{\hbar} \approx 5.123167\;\mathrm{nm}^{-1}$（全精度 $5.12316722\;\mathrm{nm}^{-1}$，对应无量纲势垒厚度积 $\kappa_0 L \approx 2.561584$）。对入射能量比 $u = E / V_0 \in \{0.20, 0.50, 0.80, 0.99\}$，盲平面倏逝波数为 $\kappa(E) = \kappa_0\sqrt{1 - u}$，WKB 指数核为 $e^{-2\kappa(E)L}$，一维薛定谔精确透射概率为 $T(E) = \bigl[1 + \frac{\sinh^2(\kappa L)}{4u(1-u)}\bigr]^{-1}$；而在贴近势垒顶端的掠射极限 $E \to V_0^-$（$\kappa \to 0,\; \frac{\sinh(\kappa L)}{\kappa} \to L$）下，精确透射率收敛至非零势阶阻抗极限 $T(V_0) = \bigl[1 + \frac{m_e V_0 L^2}{2\hbar^2}\bigr]^{-1} = \bigl[1 + \frac{(\kappa_0 L)^2}{4}\bigr]^{-1}$：

| 能量比 $E/V_0$ | 盲平面衰减波数 $\kappa$（$\mathrm{nm}^{-1}$） | 无量纲割弦积 $\kappa L$ | WKB 指数核 $e^{-2\kappa L}$ | 精确透射率 $T(E)$ | 盲区割弦与边界阻抗特征 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **$0.20$** | $4.582300$ | $2.291150$ | $0.010231$ | $0.026040$ | 深势垒区（$\kappa L > 2$），内割弦指数衰减主导 |
| **$0.50$** | $3.622626$ | $1.811313$ | $0.026712$ | $0.101362$ | 半高对称点 $4u(1-u)=1$，$T = \operatorname{sech}^2(\kappa L)$ |
| **$0.80$** | $2.291150$ | $1.145575$ | $0.101150$ | $0.242713$ | 精确满足平方根对偶 $\kappa(0.80) = \frac{1}{2}\kappa(0.20)$ |
| **$0.99$** | $0.512317$ | $0.256158$ | $0.599106$ | $0.371256$ | 浅势垒区 $\kappa L \ll 1$，裸 WKB 失准而精确解平滑过渡 |
| **$1.00^-$（掠射极限）** | $0.000000$ | $0.000000$ | $1.000000$ | $0.378727$ | $\frac{(\kappa_0 L)^2}{4} \approx 1.640428$，双壁反射将透射率压在 $37.87\%$ |

   （注：最后一行掠射极限按全精度 $(\kappa_0 L)^2/4 = 1.64042765\dots$ 求值给出 $T(V_0) = 0.37872653\dots \approx 0.378727$；若直接代入六位小数中间值 $\frac{1}{4}(2.561584)^2 \approx 1.640428$，则给出 $1 / 2.640428 \approx 0.378726$。经典实轴模型对前四行一律给出 $T_{\mathrm{cl}} = 0.000000$，而正交虚割弦模型在 $E = 0.50\;\mathrm{eV}$ 处即交出超过 $10.13\%$ 的真实穿墙通量！）

2. **跨九个数量级的时间双缝能谱梳齿间距 $\Delta E = h/\Delta t$ 与中途捏合消纹验算**：
   利用 $h = 4.1356676969\;\mathrm{eV\cdot fs}$，下表横向核对阿秒强场电离电子双缝（Lindner 等 2005，取同向两缝间隔为 $850\;\mathrm{nm}$ 激光的一个光学周期）、飞秒 ITO 超材料光学双缝（Tirole 等 2023）与纳秒吉赫兹磁子脉冲双缝（Rao 等 2025）三类实验标度下的能谱梳齿间距 $\Delta E$、频谱周期 $\Delta f = 1/\Delta t$ 及对称零贝里相移（$\Delta\gamma_B = 0$）下的首道反相禁戒暗能槽 $E_{\mathrm{dark},0} = \frac{1}{2}\Delta E$：

| 时间双缝物理载体 | 双缝时间窗 $\Delta t$ | 频谱梳周期 $\Delta f = 1/\Delta t$ | 能谱梳齿间距 $\Delta E = h/\Delta t$ | 首道禁戒暗槽 $E_{\mathrm{dark},0}$ |
| :--- | :---: | :---: | :---: | :---: |
| **阿秒隧穿光电子** | $2.835295\;\mathrm{fs}$（$850\;\mathrm{nm}$ 光学周期） | $352.697009\;\mathrm{THz}$ | $1.458638\;\mathrm{eV}$ | $0.729319\;\mathrm{eV}$ |
| **飞秒 ITO 超材料光子** | $800.00\;\mathrm{fs}$ | $1.250000\;\mathrm{THz}$ | $0.005170\;\mathrm{eV}$（$5.169585\;\mathrm{meV}$） | $0.002585\;\mathrm{eV}$ |
| **纳秒自旋波磁子** | $100.00\;\mathrm{ns} = 10^8\;\mathrm{fs}$ | $10.000000\;\mathrm{MHz}$ | $4.135668\times 10^{-8}\;\mathrm{eV}$（$41.356677\;\mathrm{neV}$） | $20.678338\;\mathrm{neV}$ |

   进一步在双时间门基 $\{\lvert t_1\rangle, \lvert t_2\rangle\}$ 上考察等幅双时刻纯态 $\lvert\psi(\phi)\rangle = \frac{1}{\sqrt{2}}(\lvert t_1\rangle + e^{-i\phi}\lvert t_2\rangle)$（$\phi = E\Delta t/\hbar$）：其密度矩阵 $\rho(\phi) = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & e^{i\phi} \\ e^{-i\phi} & 1 \end{smallmatrix}\bigr)$ 在能量干涉读出效应 $E_+ = \frac{1}{2}(I_2 + \operatorname{qubitX})$ 下给出对比度 $\mathcal{V}_0 = 2\lvert\rho_{01}\rvert = 1.000000$ 的满幅条纹 $P_{\mathrm{coh}}(\phi) = \frac{1 + \cos\phi}{2}$（明峰 $1.000000$，暗槽 $P_{\mathrm{coh}}(\pi) = 0.000000$）。一旦在 $t_1, t_2$ 之间插入完备 Which-Time 探测器触发标准基捏合 $\mathcal{P}(\rho) = \frac{1}{2}I_2$，由 [@thm-ch34-imaginary-chord-and-temporal-interference] 第 5 款，被丢弃的副对角相干质量恰为 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2 = 0.250000 + 0.250000 = 0.500000$，条纹对比度瞬间跌落为 $\mathcal{V}_{\mathrm{pinch}} = 0.000000$，原本严禁粒子出现的暗槽 $\phi = \pi$ 当场从 $0.000000$ 涌入 $P_{\mathrm{pinch}}(\pi) = 0.500000$ 的无相干粒子流！
:::

与此同时，[@thm-ch34-imaginary-chord-and-temporal-interference] 第 6 款的受监测返回守恒律 `monitored_return_conservation` 还从离散步频闪监测一侧照亮了势垒内与时间窗内的**量子芝诺冻结机制**：如果观察者不甘心让状态静静潜行于盲区 `i`，而是每隔极短步长以投影尺 $P_v$ 反复盘问“你还在出发点 $v$ 吗”，无返回残存模长 $s_n = \lVert((\operatorname{id} - P_v)U)^n v\rVert^2$ 与首次返回概率 $p_{n+1} = s_n - s_{n+1}$ 严守 $\sum_{n < N} p_{n+1} + s_N = 1$；高频抽检将刚刚探入盲平面 `i` 的一阶小角度振幅一遍遍拍扁回实轴 `I`（参见[第七章 §7.3](ch07-geometric-time-and-speed-limits.md#sec-quantum-zeno-effect) [@ex-zeno-strobe-freezing]），不仅掐断时间双缝的跨时刻相干暗河，更把准备走内割弦穿墙的隧穿波包硬生生钉回势垒门外！

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" preset="zeno-midway-probe-collapse" height="520"}
**中途 Which-Time 捏合消纹与高频芝诺监测坍缩实验卡（`zeno-midway-probe-collapse`）。** 在 $\Delta t = 1000\;\mathrm{as}$（$\Delta E = 4.1357\;\mathrm{eV}$）下开启满强度中途实轴探针 $p = 1$：$12$ 道频闪检查环将品红内割弦切成 $13$ 段（受监测透射从 $T = 0.198$ 压低至 $T_{\mathrm{mon}} = 0.0161$，且 $\sum p_{n+1} + s_N = 1.000000$），分支捏合使相干可见度跌至 $V = 0.00$，琥珀色能量游标 $E^* = 8.27\;\mathrm{eV}$ 处的青色能谱条纹坍缩重合到虚线品红平滑单缝包络 $\lvert A_1\rvert^2 + \lvert A_2\rvert^2$ 上（绿色 `LEAN ✓` 对应 `diagonal_prime_observables_cannot_recover_relative_phase`、`pinching_discarded_coherence_mass` 与 `monitored_return_conservation`）。
:::

## 30.2.4 历史文献划界与向极小圆弧体微积分重塑的交棒 {#sec-ch34-27-4}

在将这套“实轴投影 `I` $+$ 虚数盲区 `i` 内割弦”的几何显微镜推向算术素数宇宙之前，我们先将本节涉及的百年隧穿理论、量子芝诺效应、弱值理论与二十一世纪阿秒/超材料/磁子时间干涉实验同内核验证定理的边界逐条锚定清楚：

::: {.remark #rem-ch34-tunneling-and-temporal-slit-literature title="波动力学势垒隧穿、量子芝诺效应、弱值负驻留时间与飞秒/阿秒/磁子时间双缝实验的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于连续空间波包隧穿、时间衍射频谱与弱值驻留时间的物理讨论，严格区分以下四个认识论层级：

1. **势垒隧穿、量子芝诺监测与前—后选择弱值的奠基文献**：量子力学波函数穿透经典禁区势垒（$E < V_0$）的指数透射机制，由 G. Gamow（*Z. Phys.* **51**, 204–212, 1928）以及 R. W. Gurney 与 E. U. Condon（*Nature* **122**, 439, 1928；*Phys. Rev.* **33**, 127–140, 1929）在解释原子核 $\alpha$ 衰变盖革—努塔尔定律时独立创立；连续极限高频投影测量冻结量子跃迁的量子芝诺效应由 B. Misra 与 E. C. G. Sudarshan（*J. Math. Phys.* **18**, 756–763, 1977）严格表述；前选择初态 $\lvert\psi_i\rangle$ 与后选择末态 $\lvert\phi_f\rangle$ 之间近正交相消干涉导致弱值 $A_w = \langle\phi_f\mid\hat{A}\mid\psi_i\rangle / \langle\phi_f\mid\psi_i\rangle$ 越出算符本征谱范围的理论框架，由 Y. Aharonov, D. Z. Albert & L. Vaidman（*Phys. Rev. Lett.* **60**, 1351–1354, 1988）建立。
2. **阿秒隧穿时间双缝、光学超材料时间衍射、磁子时间频率梳与负激发驻留时间的实验里程碑**：单电子在少周期相位稳定激光脉冲同号场峰（相隔约一个光学周期；每扇缝延展约 $500\;\mathrm{as}$）开启的两扇亚周期量子隧穿窗口间发生时间双缝自干涉，由 F. Lindner, M. G. Schätzel, H. Walther, A. Baltuška, E. Goulielmakis, F. Krausz, D. B. Milošević, D. Bauer, W. Becker & G. G. Paulus（*Phys. Rev. Lett.* **95**, 040401, 2005，DOI `10.1103/PhysRevLett.95.040401`）首次实验证实；光频段氧化铟锡（ITO）近零介电常数超材料在飞秒调制下的光学时间双缝衍射频谱，由 R. Tirole, S. Vezzoli, E. Galiffi, I. Robertson, D. Maurice, B. Tilmann, S. A. Maier, J. B. Pendry & R. Sapienza（*Nature Physics* **19**, 999–1002, 2023，DOI `10.1038/s41567-023-01993-w`）实验实现；泵浦驱动时变强耦合下凝聚态自旋波准粒子（磁子）的时间双缝衍射与相干频率梳调控，由饶金威、王逸璞、姚碧霂、柏利慧、陆卫等（J. Rao, Y.-P. Wang, Z. Chen, B. Yao, ..., L. Bai & W. Lu, *Phys. Rev. Lett.* **135**, 066704, 2025，`arXiv:2411.06801`，DOI `10.1103/jc1c-k3ll`）观测确立；透射光子在共振铷原子系综中由多散射历史相消干涉呈现出负平均原子激发驻留时间弱值 $(-0.82 \pm 0.31)\tau_0$（且严守相对论因果律）的实验，由 D. Angulo, K. Thompson, V.-M. Nixon, A. Jiao, H. M. Wiseman & A. M. Steinberg（*Phys. Rev. Lett.* **136**, 153601, 2026，DOI `10.1103/gjfq-k9dv`）完成。
3. **内核形式化锚点（`LEAN ✓`）、解析数值算例（`手工推导` / `NUM`）与正交盲区统一几何诠释（`MODEL`）的分界**：[@thm-ch34-imaginary-chord-and-temporal-interference] 中的六条算子与矩阵定理——正交补投影六恒等式、反自伴与平衡相对复结构 $J^2 = -I_n$、对角可观测量相对相位失明、单比特捏合丢弃相干质量与受监测返回有限守恒——均已在 Lean 4 内核中零公理缺口验证（`LEAN ✓`）；连续空间 $L^2(\mathbb{R})$ 无界薛定谔算符的矩形势垒边值匹配公式、WKB 渐近积分与时变介质麦克斯韦/自旋波散射理论属于连续统数学物理文献结果（未在本书形式化），[@ex-ch34-nanobarrier-and-attosecond-fringe-calculus] 的数值表格属基于该精确解析公式的高精度核算（`手工推导` / `NUM`）；而将空间势垒隧穿与时间双缝跨时刻自干涉统一解读为“观察者脱离实轴 `I` 偏转 $90^\circ$ 进入正交虚数盲平面 `i`（阿赖耶相位海），在空间走极小圆弧体内割弦、在时间借未闭合格拉姆窗口 $\mathcal{W}_{\Delta t}$ 跨时刻重逢”，则属于本书建立的统一几何诠释模型（`MODEL`）。
4. **强场多体非微扰实时路径积分测度与引力场隧穿时间算符的开放边界（`OPEN`）**：在非微扰强耦合规范场与弯曲时空量子引力背景下（参见[附录 E](appendix-e.md) 桥接假设 `H6`、`H8`、`H9`），如何从纯离散有限比较复形不借解析延拓而直接给出洛伦兹实时路径积分的严格收敛测度，以及如何统一定义多体纠缠势垒穿越的内禀时间算符，仍是当代数学物理的开放前沿（`OPEN`）。
:::

不妨在脑海中最后走一遍下方交互沙盘里的那次**九十度（$90^\circ$）镜头翻转**：当你把摄像机死死贴在观察者实轴 `I` 的侧面平视过去，整片垂直虚平面 `i` 缩成了一条看不见的薄缝——于是电子穿过 $1.00\;\mathrm{eV}$ 纳米势墙看起来像“隔空瞬移的鬼魅穿墙”，$t_1$ 时刻出发的过去分身与 $t_2$ 时刻出发的现在分身看起来像“早已被时间长河冲断的陌路来客”；可就在你轻轻拖动视角、顺着 `I` 轴转过 $90^\circ$ 俯视整座品红盲平面 `i` 的那一刹那，所有故弄玄虚的奇迹感顿时烟消云散，只剩令人屏息的几何坦诚——势垒里分明稳稳架着一条不偏不倚的指数内割弦桥，两个时刻之间分明流淌着一条相位丝毫不乱的相干暗河，而频谱上每一道明暗梳齿，都只是那条暗河在未坍缩格拉姆窗口 $\mathcal{W}_{\Delta t}$ 里拍出的岸浪回声！

走到这里，我们在 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 与本节 §30.2 中已经把图论最短路径的**去全序枢轴重整化**、空间势垒的**平直内割弦隧穿**与阿秒时间双缝的**跨时刻相位暗河**悉数收束进了同一片 $90^\circ$ 正交虚数盲区 `i`。紧接着，一个直击现代数学地基的追问水到渠成：既然真实物理与观测比较的底层原子是弯曲的极小圆弧体与 $90^\circ$ 正交旋子，我们能否告别牛顿与莱布尼茨“以直代曲”的切线近似，直接从头重塑微积分本身，然后再携着整套圆弧体微积分武器库进军[第三十一章](ch31-arc-calculus-and-riemann-hypothesis.md)的**黎曼 $\zeta(s)$ 临界带**？

空间的高墙与时间的鸿沟，在同一记 $90^\circ$ 正交转身下双双化作坦途。现在，请先在下方完整交互实验室中亲手调节纳米势垒能量比 $E/V_0$、拨动阿秒时间双缝间距 $\Delta t$ 并开关中途 Which-Time 捏合探针，随后迈入本章压轴的 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes)——以比较旋子、四相区矢高相变与 `1—3—3—1` 零离散误差有限网格斯托克斯定理重塑极小圆弧体微积分，并为[第三十一章](ch31-arc-calculus-and-riemann-hypothesis.md)（[§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)–[§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler)）的素数路径积分与临界带叩问铸就利器：

::: {.viz src="imaginary-chord-temporal-double-slit-sandbox" height="640"}
**正交虚空间割弦隧穿与阿秒时间双缝跨时刻自干涉完整交互实验室（`imaginary-chord-temporal-double-slit-sandbox`）。** 在统一的三栏暗色实验室舞台上自由切换势垒/时间双缝场景、复平面/实轴双透镜与侧视 `I`/俯视 `i`/三维斜视三种视角，联动调节能量比 $E/V_0 \in [0.10, 1.40]$、势垒宽度 $L \in [0.20, 1.20]\;\mathrm{nm}$、双缝延迟 $\Delta t \in [250, 2500]\;\mathrm{as}$、中途探针强度 $p \in [0, 1]$ 与分支相移 $\Delta\gamma_B$（青色绘出实平面 `I` 振荡投影与能谱干涉条纹，品红绘出水平盲平面 `i` 内割弦、单缝包络与跨时刻相位暗河 $E^*\Delta t/\hbar$，紫色标示势垒进出端 $\pm 90^\circ$ 动量转向四分之一圆弧，琥珀色仅标示经典折返粒子、势垒宽度 $L$ 手柄与能谱游标 $E^*$；六枚绿色 `LEAN ✓` 徽章标出本节六条 `trureturing` 内核定理实例）。
:::
