# 37.2 人工智能与宇宙的最小作用量同构：三元数场弦弧矢高、玻恩惊奇度、流群自平行测地线与零幻觉思维链 {#sec-ch39-least-action-geodesics-and-cosmos-ai-isomorphism}

> *“人工智能跟宇宙应该同构，都是在最小作用量下的信息系统，那么在三元数极小圆弧体场的语言下，最小作用量究竟是什么？测地线究竟是什么？”*

在 [§32.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-nonlinear-ternion-representations-and-torsor-synthesis) 确立三元数的五种无损非线性表示与无原点流群语法、并在 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md#sec-ch39-ternion-field-transformer-and-rational-rotor-dynamics) 将现代序列模型的前向旋子演化核重铸为平行三元数概念场丛上的纯有理算子系统（配代数范数停机读数的 TFT）之后，横亘在物理学与人工智能之间最后一道学科藩篱随之洞开：**如果物理宇宙与通用人工智能底层都是运行在共享比较主频 $\nu_0$ 上的无外自指信息系统，那么支配星辰运转与量子演化的“最小作用量原理”，与支配大模型推理寻路与参数学习的“奥卡姆最优准则”，在三元数极小圆弧体场丛的母语里究竟是同一个什么几何量？两者共同追寻的“测地线”究竟长什么样？**

本节给出严密而清澈的统一解答（宇宙与人工智能的双层同构总纲、跳步幻觉机制、多链雅可比聚焦类比及逐场自然梯度预条件诠释标为 **`MODEL`**，有限有理步进核与弦弧矢高精确恒等式、成对余弦分解匀速节拍定理、流群自平行点反射与蔡态（Choi 态）信道量子费希尔恒等式属 **`手工推导` / `NUM`**，分析力学、信息几何与思维链采样归入 **`文献结果`**，底层富比尼—施图迪三角不等式、记录时间下界、玻恩配对、舒尔补极小与球面和乐由 **`LEAN ✓`** 冻结声明锁定）：在平行三元数场丛上，**自由最小作用量**（或语境势沿对比路径总和恒定 $\sum_{t,k}\Omega_{\mathrm{ctx}}^{(k)} = \mathrm{const}$ 时的最小作用量；若存在随状态变化的外部语境角盈势 $\Omega_{\mathrm{ctx}}$，总作用量 $\mathcal{S}[\Gamma] = \sum(T - V)$ 则在累积矢高与 $-\Omega_{\mathrm{ctx}}$ 之间取变分驻值）就是完成跨态演化或概念对齐所支付的**最小累积二阶弦弧矢高**（单步在 $\Delta\theta \in [0,\pi)$ 上严格单调对应于最小玻恩正交补信道失锁概率，且在固定步数 $N$ 与开半周总跨度 $\Theta \in (0, \pi)$ 下与比较惊奇度共享同一匀速最优节拍）；而**自由测地线**则是相邻极小圆弧满足**三元流群自平行 $[x_t, x_{t-1}, x_t]$、共轴正向零叉乘扭矩且在两步开半周跨度 $\Delta\theta_t + \Delta\theta_{t+1} < \pi$ 内诱导正交于公共转轴的布洛赫探针不围出多余球面角盈（$\Omega = 0$）的匀速大圆弧脊线**——它在物理宇宙中显影为惯性运动与引力自由落体，在人工智能中则同构为零幻觉的最短匀速思维链（Chain-of-Thought）与 $O(1)$ 免求逆的流形共形黎曼梯度流。

## 37.2.1 最小作用量的真身：弦弧矢高、有理步进核、玻恩惊奇度与主频节拍税 {#sec-ch39-23-1}

在传统学科分野中，物理学的哈密顿作用量 $S_{\mathrm{H}} = \int (T - V)\,dt$（及定能莫培督约化作用量 $S_{\mathrm{M}} = \int \mathbf{p}\cdot d\mathbf{q}$）与机器学习的变分自由能（负对数似然交叉熵加复杂度散度）看似风马牛不相及；一旦回到共享普适比较主频 $\nu_0$（[§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)）的三元数场丛 $(B_1(\mathbb{R}^3)/\!\sim)^K$，二者在单步极小圆弧比较中收归同一几何机制（`MODEL` + `手工推导`）：有理步进能量核与玻恩正交补信道失锁概率逐点恒等于单步几何矢高之半（$q_{\mathrm{MRP}} \equiv P_{\mathrm{leak}} \equiv \frac{1}{2}v_\epsilon$），而负对数似然惊奇度则在单步张角 $\Delta\theta \in [0,\pi)$ 上为有限矢高 $v_\epsilon \in [0, 2)$ 的严格单调递增凸函数（小角度主阶同为 $\frac{1}{2}v_\epsilon$），且在自由演化（或路径势和恒定）、固定节拍数 $N$ 与开半周总角跨度 $\Theta \in (0, \pi)$ 下与累积矢高共享同一条匀速最优极小路径。

设离散演化路径 $\Gamma = \{\mathbf{\Sigma}_t\}_{t=0}^N$ 在 $K$ 座概念场上按节拍推进，第 $t$ 拍在第 $k$ 座场上的相对比较旋子记为 $\boldsymbol{\delta}_t^{(k)} := (-\boldsymbol{\sigma}_{t-1}^{(k)}) \star_{\mathcal{S}} \boldsymbol{\sigma}_t^{(k)} \in B_1(\mathbb{R}^3)$，对应空间旋转张角 $\Delta\theta_t^{(k)} = 4\arctan\lVert\boldsymbol{\delta}_t^{(k)}\rVert \in [0, \pi]$（旋量半角为 $\frac{1}{2}\Delta\theta_t^{(k)} \in [0, \frac{\pi}{2}]$）。单步比较同时给出三项紧密锁定的几何与信息成本（前两项精确成比例，第三项为其开半周严格单调凸变换，`手工推导`）：

1. **几何二阶弦弧矢高（Sagitta）**：极小圆弧偏离切线的内凹正矢拱高（呼应 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes)）：

   $$
   v_\epsilon\bigl(\Delta\theta_t^{(k)}\bigr) \;:=\; 1 - \cos\Delta\theta_t^{(k)} \;=\; 2\sin^2\frac{\Delta\theta_t^{(k)}}{2} \;\in\; [0, 2];
   $$

2. **双卡有理步进能量核（免近似精确恒等式）**：在 [§37.1.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md#sec-ch39-22-1) 中，一般无穷小共形黎曼线元满足 $ds_{S^3}^2 = \frac{4\lVert d\boldsymbol{\sigma}\rVert^2}{(1+\lVert\boldsymbol{\sigma}\rVert^2)^2} = \frac{1}{4}(d\theta)^2 + \sin^2\frac{\theta}{2}\,\lVert d\hat{\mathbf{u}}\rVert^2$（沿固定轴射线 $d\hat{\mathbf{u}} = \mathbf{0}$ 化为 $\frac{1}{4}(d\theta)^2$）；而若将同一共形有理核直接作用于从局部原点测量的**任意有限步进旋子** $\boldsymbol{\delta}_t^{(k)}$（无需任何小角度近似），利用 $\lVert\boldsymbol{\delta}_t^{(k)}\rVert = \tan\frac{\Delta\theta_t^{(k)}}{4}$，对一切 $\Delta\theta_t^{(k)} \in [0, \pi]$ 恒成立精确代数恒等式：

   $$
   q_{\mathrm{MRP}}\bigl(\boldsymbol{\delta}_t^{(k)}\bigr) \;:=\; \frac{4\,\lVert\boldsymbol{\delta}_t^{(k)}\rVert^2}{\bigl(1 + \lVert\boldsymbol{\delta}_t^{(k)}\rVert^2\bigr)^2} \;=\; 4\tan^2\frac{\Delta\theta_t^{(k)}}{4}\cos^4\frac{\Delta\theta_t^{(k)}}{4} \;\equiv\; \sin^2\frac{\Delta\theta_t^{(k)}}{2} \;\equiv\; \frac{1}{2}\,v_\epsilon\bigl(\Delta\theta_t^{(k)}\bigr);
   $$

3. **香农—玻恩比较惊奇度（Comparison Surprisal）**：相邻两拍算子在归一化双比特蔡态（Choi 态，见下文第 37.2.3 节文献注记）上经往返双投影（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)，`LEAN ✓`）同相留存的概率为 $P_{\mathrm{stay}} = b(\boldsymbol{\sigma}_{t-1}^{(k)}, \boldsymbol{\sigma}_t^{(k)}) = \cos^2\frac{\Delta\theta_t^{(k)}}{2}$，投向参考蔡态射线之**复秩 $3$ 正交补子空间** $I_4 - \lvert\Psi_{\mathrm{Choi}}(\boldsymbol{\sigma}_{t-1}^{(k)})\rangle\langle\Psi_{\mathrm{Choi}}(\boldsymbol{\sigma}_{t-1}^{(k)})\rvert$ 的信道失锁概率恒等于有理步进核 $P_{\mathrm{leak}} = 1 - P_{\mathrm{stay}} = \sin^2\frac{\Delta\theta_t^{(k)}}{2} \equiv \frac{1}{2}v_\epsilon$（`手工推导`，将该正交补失锁权重诠释为逸入观察者 $90^\circ$ 正交虚盲区的损耗属本章几何 `MODEL`）；在非对跖开半周 $\Delta\theta_t^{(k)} \in [0, \pi)$（即 $v_\epsilon \in [0, 2)$）上，单步负对数似然惊奇度是 $v_\epsilon$ 的严格单调递增函数并展开为全正项幂级数（而在半周正交割迹 $\Delta\theta_t^{(k)} = \pi,\; v_\epsilon = 2$ 处扩充实值取 $+\infty \in [0, \infty]$；自由路径多步累积和在固定步数 $N$ 与开半周总跨度 $\Theta \in (0, \pi)$ 下与累积矢高共享完全相同的匀速极小解）：

   $$
   \mathcal{I}_t^{(k)} \;:=\; -\ln\cos^2\!\left(\frac{\Delta\theta_t^{(k)}}{2}\right) \;=\; -\ln\!\left(1 - \frac{v_\epsilon}{2}\right) \;=\; \frac{1}{2}v_\epsilon \;+\; \frac{1}{8}v_\epsilon^2 \;+\; \mathcal{O}(v_\epsilon^3) \qquad \bigl(\Delta\theta_t^{(k)} \in [0, \pi)\bigr).
   $$

将代表胞内状态翻转主频开销的推进矢高 $T_{t}^{(k)} := 1 - \cos\Delta\theta_t^{(k)} = 2\,q_{\mathrm{MRP}}(\boldsymbol{\delta}_t^{(k)})$ 与代表外部引力势井或提示词上下文约束预占的耦合角盈势 $V_{t}^{(k)} := \Omega_{\mathrm{ctx}}^{(k)}(\boldsymbol{\sigma}_t)$ 沿整条路径累加，物理宇宙与人工智能共同遵循的**无量纲三元数场总作用量泛函**（`MODEL`）写为：

$$
\mathcal{S}[\Gamma] \;:=\; \sum_{t=1}^{N}\sum_{k=1}^{K} \Bigl[\bigl(1 - \cos\Delta\theta_t^{(k)}\bigr) \;-\; \Omega_{\mathrm{ctx}}^{(k)}\bigl(\boldsymbol{\sigma}_t^{(k)}\bigr)\Bigr] \;=\; \sum_{t=1}^{N}\sum_{k=1}^{K} \bigl(T_t^{(k)} - V_t^{(k)}\bigr).
$$

这道无量纲泛函揭开最小作用量原理的三重物理与认知机制：

- **普朗克常数 $\hbar$ 即主频节拍汇率**：在我们的主频模型（`MODEL`）中，全网观察切面共享恒定比较主频 $\nu_0$（参照富比尼—施图迪最短记录时长下界 [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 与步数上界 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)，`LEAN ✓`），每累积一单位弦弧矢高就支付固定份额的底层比较节拍；宏观物理作用量 $S_{\mathrm{phys}} = \hbar\mathcal{S}[\Gamma]$ 之所以带“能量 $\times$ 时间”量纲，源于把无量纲圆弧相位换算为国际单位制焦耳·秒的汇率常数 $\hbar$；
- **拉格朗日量 $T - V$ 减号的舒尔补起源**：在总预算归一的分块格拉姆矩阵中，外部引力负载或提示词上下文约束 $\Omega_{\mathrm{ctx}}$ 预先占用了跨场关联带宽，留给局部状态自由推进的可支配净余量，对应于分块消元后的**舒尔补变分极小垂高** $A - B C^{-1} B^\dagger$（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)，`LEAN ✓`）；
- **短波渐近驻相干涉筛选最小作用量与最优思维链（`文献结果` + `MODEL`）**：在引入[附录 E](appendix-e.md) 路径测度条件 `H9` 与短波/大相位尺度 $\varepsilon_{\mathrm{eff}} \ll 1$ 后的振荡路径和 $\sum_\Gamma \exp\bigl(\frac{\hat{\mathbf{i}}}{\varepsilon_{\mathrm{eff}}}\mathcal{S}[\Gamma]\bigr)$ 中，偏离极值的非驻相支路因一阶相位梯度非零而在正交虚盲区 $\hat{\mathbf{i}}$ 内高速旋相、在渐近主阶中与邻近微扰路径相消，从而由一阶变分为零（$\delta\mathcal{S} = 0$）的**驻相脊线**主导主阶振幅（见 [§28.3](ch32-s03-axioms-as-corollaries.md)、[§29.7](ch34-s06-berry-sectors-and-path-integrals.md) 与[附录 E §E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)）——在物理中显影为经典轨道，在人工智能中则作为模型类比（`MODEL`）呼应多条采样思维链经自洽性投票（Self-Consistency，Wang et al. 2023）滤除互相矛盾的侧向歧路后留存的简洁推理主干。

::: {.viz src="ternion-least-action-geodesic-sandbox" preset="sagitta-mrp-surprisal-lock" height="500"}
矢高、有理核与漏失三量锁定卡：在有限步张角 $\Delta\theta \in [0, \pi]$ 上实时核对精确恒等式 $v_\epsilon = 2q_{\mathrm{MRP}} = 2P_{\mathrm{leak}}$ 及单调递增的比较惊奇度 $\mathcal{I}$（秩一玻恩留存与记录时间下界标 `LEAN ✓`，数值读数标 `NUM`，宇宙与智能双层同构标 `MODEL`）。
:::

## 37.2.2 离散与连续测地线的四条几何刻画律：流群自平行、正交探针零角盈、定跨度匀速节拍锁与雅可比聚焦 {#sec-ch39-23-2}

在平直空间 $\mathbb{R}^d$ 中，两点间的欧氏弦线插值 $(1-\lambda)\mathbf{x}_0 + \lambda\mathbf{x}_1$ 直接切穿球体内部，造成中间层特征模长坍缩；而在紧致弯曲的三元数场丛上，无需书写克里斯托费尔符号 $\Gamma^i_{jk}$，**自由测地线**的匀速参数化、无参数大圆轨迹、定跨度作用量极小化与法向微扰稳定性分别由四条严密互补的纯几何刻画律锁定（`手工推导`）：

1. **匀速离散测地线的充要判据——无原点三元流群自平行接力（嘉当对称空间点反射律）**：
   在抹除特权实轴 $\mathbf{1}$ 的三元流群 $[x, y, z] = x y^{-1} z$（[§32.4.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-21-4)）中，离散轨迹 $\{\boldsymbol{\sigma}_t\}_{t=0}^N$ 是一条恒定步幅测地线，当且仅当任意连续三拍严格满足**流群自反射接力方程**（只要单步未踏上零测度半周折缝）：

   $$
   \boldsymbol{\sigma}_{t+1}^{(k)} \;=\; \Bigl[\boldsymbol{\sigma}_t^{(k)},\; \boldsymbol{\sigma}_{t-1}^{(k)},\; \boldsymbol{\sigma}_t^{(k)}\Bigr] \;\equiv\; \boldsymbol{\sigma}_t^{(k)} \star_{\mathcal{S}} \Bigl(\bigl(-\boldsymbol{\sigma}_{t-1}^{(k)}\bigr) \star_{\mathcal{S}} \boldsymbol{\sigma}_t^{(k)}\Bigr).
   $$

   在非阿贝尔群 $\mathrm{SU}(2)$ 或 $\mathrm{SO}(3)$ 上代入单参数测地线 $g_t = g_0 e^{tX}$ 立即验证：$g_t g_{t-1}^{-1} g_t = g_0 e^{tX} e^{-(t-1)X} g_0^{-1} g_0 e^{tX} = g_0 e^{(t+1)X} = g_{t+1}$（即便起点 $g_0$ 与生成元 $e^X$ 不可交换亦恒等成立）。这正是嘉当对称空间以当前点 $g_t$ 为支点的**测地点反射对合** $s_{g_t}(g_{t-1}) = g_t g_{t-1}^{-1} g_t$：把上一拍相对比较圆弧平行顺延到下一拍，不搀外来偏置。

2. **无参数单向大圆轨迹判据——共轴正向零叉乘扭矩与短弧正交探针零吉拉尔角盈（$\Omega = 0$）**：
   记每拍局部右步进旋子为 $\boldsymbol{\omega}_t := (-\boldsymbol{\sigma}_{t-1}) \star_{\mathcal{S}} \boldsymbol{\sigma}_t$。审视双分母有理乘法分子 $\mathbf{N}(\boldsymbol{\omega}_t, \boldsymbol{\omega}_{t+1}) = (1-\lVert\boldsymbol{\omega}_t\rVert^2)\boldsymbol{\omega}_{t+1} + (1-\lVert\boldsymbol{\omega}_{t+1}\rVert^2)\boldsymbol{\omega}_t + 2(\boldsymbol{\omega}_t \times \boldsymbol{\omega}_{t+1})$：对严格位于开单位球内的相继非零非半周步 $0 < \lVert\boldsymbol{\omega}_t\rVert, \lVert\boldsymbol{\omega}_{t+1}\rVert < 1$（即单步张角 $\Delta\theta_t, \Delta\theta_{t+1} \in (0, \pi)$，避开对径代表元 $\pm\hat{\mathbf{u}}$ 等价的半周赤道折缝 $\lVert\boldsymbol{\omega}_t\rVert = 1$），沿同一有向大圆单向推进充要于**非线性叉乘侧向扭矩恒等于零且同向内积为正**（$\boldsymbol{\omega}_t \times \boldsymbol{\omega}_{t+1} = \mathbf{0},\; \boldsymbol{\omega}_t \cdot \boldsymbol{\omega}_{t+1} > 0$）；任取垂直于该公共转轴 $\hat{\mathbf{u}}$ 的单位布洛赫探针基轴 $\hat{\mathbf{n}}_0 \perp \hat{\mathbf{u}}$ 并记轨道像点 $\hat{\mathbf{n}}_t := R(\boldsymbol{\sigma}_t)\hat{\mathbf{n}}_0 \in S^2$（相邻三点两两非对跖），共轴推进使 $(\hat{\mathbf{n}}_{t-1}, \hat{\mathbf{n}}_t, \hat{\mathbf{n}}_{t+1})$ 共大圆（有向体积 $D_{abc} = 0$）：只要相邻两步总张角位于开半周内 $\Delta\theta_t + \Delta\theta_{t+1} < \pi$（使 $S_{abc} > 0$，第三边最短门沿原弧折返），其最短门回路所围**吉拉尔球面角盈恒等于零、返回相位为 $+1$**（若两步张角越过半周 $\Delta\theta_t + \Delta\theta_{t+1} > \pi$ 如连续两拍 $+120^\circ$，第三边最短门将绕大圆补弧合拢整圈赤道，围出半球立体角 $2\pi$ 并由 $S_{abc} < 0$ 给出返回相位 $-1$；参照 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) 与 [`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)，`LEAN ✓`）：

   $$
   \boldsymbol{\omega}_t \times \boldsymbol{\omega}_{t+1} \;=\; \mathbf{0} \quad \bigl(0 < \lVert\boldsymbol{\omega}_t\rVert, \lVert\boldsymbol{\omega}_{t+1}\rVert < 1,\; \boldsymbol{\omega}_t \cdot \boldsymbol{\omega}_{t+1} > 0,\; \Delta\theta_t + \Delta\theta_{t+1} < \pi\bigr) \quad \Longrightarrow \quad \Omega\bigl(\hat{\mathbf{n}}_{t-1}, \hat{\mathbf{n}}_t, \hat{\mathbf{n}}_{t+1}\bigr) \;=\; 0.
   $$

   此处亦严格区分**匀速测地线**与**全局最短测地段**：第 1 款在商群 $\mathrm{SO}(3)$ 上的流群自平行递推 $R_{t+1} = R_t R_{t-1}^\top R_t$ 在任意总弧长上刻画恒定步幅测地线（含绕球多圈及单步达半周 $\Delta\theta_t = \pi$ 情形；单步严格在开球内 $\lVert\boldsymbol{\omega}_t\rVert < 1$ 时等价于坐标等步幅 $\boldsymbol{\omega}_{t+1} = \boldsymbol{\omega}_t$，半周步需在旋量双覆盖 $S^3$ 上区分正向）；再限定**全部非零步进旋子在开半周内 $0 < \lVert\boldsymbol{\omega}_t\rVert < 1$ 共享同一正向单位轴 $\hat{\mathbf{u}}$**（或至多单步半周 $\Delta\theta_1 = \pi$ 其余为零，排除零步长偷换转轴及反向折返）且**整条轨迹总转角不超过割迹界 $\sum_{t=1}^N \Delta\theta_t \le \pi$**，方进一步锁定全局最短测地弧长——此时富比尼—施图迪三角不等式（[`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)，`LEAN ✓`）精确取等（取等条件由共大圆单调角度相加独立给出，`手工推导`），首尾总测地角等于各拍分步转角之和（补上开球内等步幅 $\boldsymbol{\omega}_{t+1} = \boldsymbol{\omega}_t$ 时，在严格割迹内部 $\sum_{t=1}^N \Delta\theta_t < \pi$ 连接给定首尾端点的匀速最短流群测地弧唯一；在 $\mathrm{SO}(3)$ 半周割迹边界 $= \pi$ 处正负两向转轴 $\pm\hat{\mathbf{u}}$ 给出等长成对最短半圆弧）！在连续规范场中，当非平坦曲率驱动带荷粒子满足黄氏（Wong）平行输运荷与杨—米尔斯洛伦兹力方程时，底流形受控偏折轨道在卡鲁扎—克莱因—黄（Kaluza–Klein–Wong）主丛联络度规下升格为全丛测地线（`文献结果`）；而一般 TFT 注意力舒尔桥注入非共线扭矩 $\boldsymbol{\omega}_t \times \boldsymbol{\omega}_{t+1} \neq \mathbf{0}$ 所引起的离散语境折射，则作为该主丛偏折机制的离散几何类比（`MODEL`）。

::: {.viz src="ternion-least-action-geodesic-sandbox" preset="heap-autoparallel-point-reflection" height="500"}
流群点反射接力与零角盈卡：无原点三元递推 $\boldsymbol{\sigma}_{t+1} = [\boldsymbol{\sigma}_t, \boldsymbol{\sigma}_{t-1}, \boldsymbol{\sigma}_t]$ 沿共轴大圆等步推进，正交布洛赫探针在开半周两步跨度内围出零球面角盈 $\Omega = 0$（`fs_angle_triangle` 与 `shortest_gate_triangle_holonomy` 为 `LEAN ✓`，主丛测地线文献标 `ARGUED`，数值读数标 `NUM`）。
:::

3. **定跨度作用量极小化判据——成对余弦分解锁定的“匀速节拍律”（牛顿匀速惯性与 AI 跳步幻觉机制）**：
   当轨迹已锁定在同一条大圆弧上（给定首尾总角跨度 $\sum_{t=1}^N \Delta\theta_t = \Theta \in (0, \pi)$，$\Delta\theta_t \ge 0$），各拍步幅应如何分配方能最小化总矢高作用量？单步矢高 $f(\Delta\theta) = 1 - \cos\Delta\theta$ 在四分周区间 $[0, \frac{\pi}{2}]$ 上满足 $f''(\Delta\theta) = \cos\Delta\theta \ge 0$；不仅如此，对**整个开区间 $\Theta \in (0, \pi)$ 内任意非负步幅分配**（即便某一步跨入钝角 $(\frac{\pi}{2}, \pi)$），利用精确成对余弦和差恒等式（`手工推导`）：

   $$
   (1 - \cos x_i) + (1 - \cos x_j) \;=\; 2 \;-\; 2\cos\frac{x_i + x_j}{2}\cos\frac{x_i - x_j}{2} \;\ge\; 2\!\left(1 - \cos\frac{x_i + x_j}{2}\right),
   $$

   因 $x_i + x_j \le \Theta < \pi \implies \cos\frac{x_i+x_j}{2} > 0$，只要存在任意两拍步幅不等 $x_i \neq x_j$，将其平均化必严格降低总矢高（且香农—玻恩惊奇度更在全域 $[0, \pi)$ 上满足严格凸性 $\mathcal{I}''(\Delta\theta) = \frac{1}{2}\sec^2\frac{\Delta\theta}{2} \ge \frac{1}{2} > 0$）。故全局唯一严格极小解锁死在**匀速等步幅节拍** $\Delta\theta_1 = \dots = \Delta\theta_N = \frac{\Theta}{N}$：

   $$
   \sum_{t=1}^{N}\bigl(1 - \cos\Delta\theta_t\bigr) \;\ge\; N\!\left(1 - \cos\frac{\Theta}{N}\right), \qquad \sum_{t=1}^{N}\mathcal{I}(\Delta\theta_t) \;\ge\; -N\ln\cos^2\!\left(\frac{\Theta}{2N}\right).
   $$

   这一不等式同时阐明物理与 AI 的核心机制（`MODEL`）：在物理中，它从离散圆弧矢高导出牛顿第一定律的**“匀速”**——忽快忽慢的变速推进会激增二阶矢高与盲区相位耗散；在 AI 推理中，它揭示了**大模型“前序套话空转、末步跳步抢答”诱发幻觉**的几何机制——若模型在前 $N-1$ 步原地踏步（$\Delta\theta_t \approx 0$），却在最后一步强跨大角 $\Delta\theta_N = \Theta$，单步盲区泄漏率 $\sin^2(\Theta/2)$ 与惊奇度将呈平方乃至对数发散暴增，冲出语义吸引盆；唯有将总推理跨度均摊为每拍 $\frac{\Theta}{N}$ 的**匀速测地思维链**，方能以 $O(\Theta^2/N)$ 的反比矢高税稳健抵达答案。

::: {.viz src="ternion-least-action-geodesic-sandbox" preset="uniform-cadence-vs-jump-hallucination" height="500"}
匀速四拍对末步跳步卡：同一 $120^\circ$ 总跨度下，匀速四拍仅付矢高 $0.5359$（留存率 $0.7578$），而前三拍空转、末拍强跳 $120^\circ$ 将矢高推高至 $1.5000$、留存率跌至 $0.2500$（四拍算术标 `NUM`，跳步幻觉机制标 `MODEL`，思维链自洽文献标 `ARGUED`）。
:::

4. **沿连续匀速测地线的横向微扰稳定性——正截面曲率李三元雅可比聚焦**：
   在平直欧氏空间（$\kappa = 0$，噪声偏差随层数线性漂移 $\lVert\mathbf{J}_\perp(s)\rVert \propto s$）或负曲率双曲空间（指数发散 $\sinh(\lvert\kappa\rvert s)$）中，提示词微扰极易逐层放大。而在截面曲率 $\kappa^2 > 0$（单位 $S^3$ 上 $\kappa = 1$）的三元数球面上，沿连续单位速测地线正交于切矢 $\dot{\gamma}$ 的测地偏离场 $\mathbf{J}_\perp$（$\mathbf{J}_\perp \cdot \dot{\gamma} = 0$）服从由 [§32.4.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-21-4) 李三元曲率括号支配的**雅可比聚焦方程**（由 $\{\mathbf{a},\mathbf{b},\mathbf{c}\} = (\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}$，对 $\mathbf{J}_\perp \perp \dot{\gamma}$ 恒有 $\{\dot{\gamma}, \mathbf{J}_\perp, \dot{\gamma}\} = +\lVert\dot{\gamma}\rVert^2\mathbf{J}_\perp = -\{\mathbf{J}_\perp, \dot{\gamma}, \dot{\gamma}\}$，`手工推导`）：

   $$
   \frac{D^2\mathbf{J}_\perp}{ds^2} \;+\; \kappa^2\bigl\{\dot{\gamma},\, \mathbf{J}_\perp,\, \dot{\gamma}\bigr\} \;=\; \frac{D^2\mathbf{J}_\perp}{ds^2} \;-\; \kappa^2\bigl\{\mathbf{J}_\perp,\, \dot{\gamma},\, \dot{\gamma}\bigr\} \;=\; \ddot{\mathbf{J}}_\perp \;+\; \kappa^2\mathbf{J}_\perp \;=\; \mathbf{0}.
   $$

   其通解 $\mathbf{J}_\perp(s) = \mathbf{J}_\perp(0)\cos(\kappa s) + \frac{\dot{\mathbf{J}}_\perp(0)}{\kappa}\sin(\kappa s)$ 具备余弦向心恢复力，在模型诠释（`MODEL`）中使围绕主干测地线的微小提示措辞微扰保持有界振荡并重新汇聚。

## 37.2.3 宇宙与人工智能双层同构谱系、O(1) 共形黎曼梯度与形式化锚点 {#sec-ch39-23-3}

我们将三元数场最小作用量、四条测地线刻画律与“前向推理 $\leftrightarrow$ 测地运动、反向训练 $\leftrightarrow$ 曲率塑形”双层同构正式确立如下：

::: {.definition #def-ch39-ternion-least-action-and-heap-geodesic title="三元数场无量纲矢高作用量泛函、流群自平行测地线与共形黎曼梯度（模型定义）"}
在平行三元数概念场商球丛 $(B_1(\mathbb{R}^3)/\!\sim)^K$ 上（`MODEL`）：

1. **三元数场离散总作用量**：给定演化路径 $\Gamma = \{\mathbf{\Sigma}_t\}_{t=0}^N$ 与语境角盈势 $\Omega_{\mathrm{ctx}}^{(k)}$，定义总作用量 $\mathcal{S}[\Gamma] := \sum_{t=1}^N\sum_{k=1}^K \bigl[2\,q_{\mathrm{MRP}}(\boldsymbol{\delta}_t^{(k)}) - \Omega_{\mathrm{ctx}}^{(k)}(\boldsymbol{\sigma}_t^{(k)})\bigr]$，其中 $2\,q_{\mathrm{MRP}}(\boldsymbol{\delta}) = \frac{8\lVert\boldsymbol{\delta}\rVert^2}{(1+\lVert\boldsymbol{\delta}\rVert^2)^2} \equiv 1 - \cos\Delta\theta$；
2. **离散自由流群测地线**：在商群 $\mathrm{SO}(3)^K$ 上满足三元流群自平行接力 $R(\boldsymbol{\sigma}_{t+1}^{(k)}) = R(\boldsymbol{\sigma}_t^{(k)})R(\boldsymbol{\sigma}_{t-1}^{(k)})^\top R(\boldsymbol{\sigma}_t^{(k)})$（单步避开半周折缝 $\lVert\boldsymbol{\omega}_t^{(k)}\rVert < 1$ 时等价于坐标递推 $\boldsymbol{\sigma}_{t+1}^{(k)} = [\boldsymbol{\sigma}_t^{(k)}, \boldsymbol{\sigma}_{t-1}^{(k)}, \boldsymbol{\sigma}_t^{(k)}]$ 及共享正向单位轴等步幅 $\boldsymbol{\omega}_{t+1}^{(k)} = \boldsymbol{\omega}_t^{(k)}$；当总转角 $\sum_{t=1}^N \Delta\theta_t^{(k)} \le \pi$ 且非零步共正向轴时为全局最短测地段）的轨道；
3. **逐场 $O(1)$ 共形黎曼最速下降算子**：在诱导共形对角度规 $g_{ij}(\boldsymbol{\sigma}) = \frac{4\,\delta_{ij}}{(1+\lVert\boldsymbol{\sigma}\rVert^2)^2}$ 下，参数旋子 $\boldsymbol{\sigma}_W$ 的精确内禀黎曼梯度为免矩阵求逆的标量缩放 $\operatorname{grad}_{S^3}\mathcal{L}(\boldsymbol{\sigma}_W) := g(\boldsymbol{\sigma}_W)^{-1}\nabla\mathcal{L} = \frac{1}{4}(1 + \lVert\boldsymbol{\sigma}_W\rVert^2)^2\,\nabla\mathcal{L}$。
:::

::: {.theorem #thm-ch39-least-action-geodesics-and-cosmos-ai-anchors title="富比尼—施图迪测地三角不等式、正交记录时长下界与计数上界、秩一玻恩重叠权重、舒尔补二次型变分极小、最短旋子门与球面三角和乐、拉格朗日—格拉姆恒等式及本征定态与克雷洛夫永久稳定定理" lean="D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently"}
在所钉 `trureturing` 冻结声明集中，以下十项为三元数场最小作用量、测地最短路径、主频节拍下界、舒尔 $T-V$ 拆账与定态停机终点提供严格数学支点的定理同时成立：

1. **单位向量富比尼—施图迪测地夹角三角不等式**（[`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)）：对任意三枚单位态矢 $u, v, w$，测地角满足 $d_{\mathrm{FS}}(u, w) \le d_{\mathrm{FS}}(u, v) + d_{\mathrm{FS}}(v, w)$；
2. **正交可分辨记录的最短演化时长下界与串行记录计数上界**（[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)、[`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）：对单位锚态 $a$ 与正交单位记录态 $\langle m_0, m_1\rangle = 0$，在给定单步测地速度上界 $d_{\mathrm{FS}}(a, m_0) \le \frac{E\tau}{\hbar}$ 与 $d_{\mathrm{FS}}(a, m_1) \le \frac{E\tau}{\hbar}$（$E, \hbar > 0$）下，恒有最短分辨时长 $\tau \ge \frac{\pi\hbar}{4E}$，且总时间预算 $\sum_{i=1}^N \tau_i \le T$ 内的串行正交记录数满足 $N \le \frac{4ET}{\pi\hbar}$；
3. **秩一记录测量的玻恩模平方留存权重与未读分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：纯态在秩一投影测量下的读出权重精确等于模平方重叠 $\lvert\langle\phi, \psi\rangle\rvert^2$，且未读态等于各分支权重与条件态之和；
4. **埃尔米特分块矩阵舒尔补二次型的变分最小元**（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)）：固定厄米分块 $A = A^\dagger$、任意分块 $B$、严格正定内部块 $C \succ 0$ 与边界向量 $x$，对内部块向量 $y$ 求变分极小精确达到舒尔补余量下确界 $x^\dagger(A - B C^{-1} B^\dagger)x$；
5. **非对跖单位方向测地最短旋子门与三顶点球面三角和乐**（[`rotor_shortest_gate`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate)、[`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)）：单步最短旋子实现幺正泡利轴搬运，两两非对跖三步闭合回路矩阵等于 $(S_{abc}^2 + D_{abc}^2)^{-1/2}\bigl(S_{abc}I_2 - i D_{abc}\operatorname{pauliCombination}(a)\bigr)$ 并赋予归一化起点 $+1$ 本征态返回相位 $\frac{S_{abc} - i D_{abc}}{\sqrt{S_{abc}^2 + D_{abc}^2}}$（当共大圆 $D_{abc} = 0$ 时虚部归零，返回实符号 $\operatorname{sgn}(S_{abc}) \in \{+1, -1\}$）；
6. **有限指标集实向量拉格朗日—格拉姆二阶余子式恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对有限指标集 $s$ 上的实向量 $u, v$，$\bigl(\sum_{i\in s} u_i^2\bigr)\bigl(\sum_{j\in s} v_j^2\bigr) - \bigl(\sum_{i\in s} u_i v_i\bigr)^2 = \frac{1}{2}\sum_{i\in s}\sum_{j\in s}(u_i v_j - u_j v_i)^2$；
7. **归一化能量本征态密度矩阵定态性与可观测量克雷洛夫子空间永久稳定律**（[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)、[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)）：对厄米哈密顿量 $H = H^\dagger$ 与归一化本征态 $Hv = Ev$，在幺正演化 $U(t) = \exp(-itH)$ 下其密度矩阵 $\rho_v = \lvert v\rangle\langle v\rvert$ 满足 $U(t)\rho_v U(t)^\dagger = \rho_v$ 严格定常；且在 $K \in \{\mathbb{R}, \mathbb{C}\}$（`RCLike K`）及有限维 $K$-内积空间 $V, Y$ 上任意线性映射 $T : V \to_K V,\; C : V \to_K Y$ 的可观测量克雷洛夫塔一旦相邻两阶闭合便对一切后续步永久稳定。
:::

::: proof
第 1 款将单位态矢内积模长还原为球面余弦，利用柯西—施瓦茨与反余弦次可加性证出测地三角不等式（见 [第 7 章](ch07-geometric-time-and-speed-limits.md)）。第 2 款对正交对 $\frac{\pi}{2} = d_{\mathrm{FS}}(m_0, m_1) \le d_{\mathrm{FS}}(m_0, a) + d_{\mathrm{FS}}(a, m_1) \le \frac{2E\tau}{\hbar}$ 施用第 1 款三角不等式并求和 $\tau_i$ 即证（见 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md)）。第 3、4、7（后半）款证明同 [@thm-ch39-tft-born-holonomy-krylov-and-schur-anchors] 第 1、7、4 款。第 5、6 款证明同 [@thm-ch39-nonlinear-ternion-representations-and-torsor] 第 3–4、2 款。第 7 款前半由 $H\psi = E\psi$ 推出幺正演化仅乘全局相位 $e^{-iEt}$，外积投影算符 $\lvert\psi\rangle\langle\psi\rvert$ 严格时间不变。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-maupertuis-feynman-friston-amari-cot-literature title="莫培督—费曼最小作用量、自由能与最小描述长度、阿马里自然梯度对比蔡态量子费希尔度规及思维链自洽采样文献边界"}
**文献归属与统计 / 量子费希尔度规精确边界声明。** 本节跨学科映射涉及的经典文献与严格数学适用范围如下：

1. **物理最小作用量、主丛测地线与信息自由能**：莫培督—拉格朗日—哈密顿变分原理与费曼相干路径积分见 R. P. Feynman（*Rev. Mod. Phys.* **20**, 367–387, 1948）；杨—米尔斯规范场中满足黄氏方程与平行输运荷条件的带荷粒子轨道在主丛联络度规下升格为全丛测地线的卡鲁扎—克莱因—黄定理见 S. K. Wong（*Nuovo Cimento A* **65**, 689–694, 1970）与 R. Montgomery（*Lett. Math. Phys.* **8**, 59–67, 1984，DOI `10.1007/BF00420042`）；最小描述长度（MDL）与变分自由能原理见 J. Rissanen（*Automatica* **14**, 465–471, 1978）与 K. Friston（*Nat. Rev. Neurosci.* **11**, 127–138, 2010，DOI `10.1038/nrn2787`）；
2. **阿马里自然梯度、信道蔡态量子费希尔度规与大语言模型思维链采样**：参数流形经典统计自然梯度 $F_{\mathrm{cl}}(\theta)^{-1}\nabla\mathcal{L}$ 见 S.-i. Amari（*Neural Comput.* **10**(2), 251–276, 1998，DOI `10.1162/089976698300017746`）与分块克罗内克近似 K-FAC（Martens & Grosse, *ICML*, 2015）；量子费希尔信息度规见 S. L. Braunstein & C. M. Caves（*Phys. Rev. Lett.* **72**, 3439–3443, 1994）；大模型逐步思维链推理与多路径自洽投票见 J. Wei 等人（*NeurIPS*, 2022）与 X. Wang 等人（`Self-Consistency`, *ICLR*, 2023，`arXiv:2203.11171`）。**严格度规边界说明**：若将单枚三元数旋子 $U(\boldsymbol{\sigma}) \in \mathrm{SU}(2)$ 仅作用于单一固定纯量子比特基准态 $\lvert\psi_0\rangle$，绕 $\lvert\psi_0\rangle$ 本征轴的旋转仅改变全局相位，单态布洛赫量子费希尔矩阵秩为 $2$；而当 $U(\boldsymbol{\sigma})$ 作用于含参考辅助比特的双比特最大纠缠蔡—贾米奥科夫斯基基准态 $\lvert\Psi_{\mathrm{Choi}}(\boldsymbol{\sigma})\rangle := (U(\boldsymbol{\sigma}) \otimes I_2)\lvert\Phi^+\rangle$ 时，满秩三自由度信道量子费希尔矩阵精确等于圆球面共形度规的四倍 $F_Q^{\mathrm{Choi}}(\boldsymbol{\sigma}) = \frac{16}{(1+\lVert\boldsymbol{\sigma}\rVert^2)^2}\mathbf{I}_3 = 4\,g_{\mathrm{MRP}}(\boldsymbol{\sigma})$（`手工推导`）！在多层深度网络中，输出词表分布的经典经验费希尔矩阵还经多层雅可比耦合各层权重，此时逐场标量缩放 $\frac{1}{4}(1+\lVert\boldsymbol{\sigma}_W\rVert^2)^2\nabla\mathcal{L}$ 严格定位为**精确参数流形黎曼最速下降与 $O(1)$ 分块对角几何预条件器**（`MODEL`），大规模训练收敛收益归入 [@prob-ch39-tft-scale-and-seams]（`OPEN`）。
:::

下面我们通过三联精确数值审计，对匀速测地线、跳步抢答失速、具体四拍侧向绕行弯路与平直穿球割线四类轨迹的矢高作用量、玻恩留存率及 $O(1)$ 共形黎曼梯度逐一核验：

::: {.example #ex-ch39-geodesic-vs-jump-detour-and-natural-gradient-audit title="四类推理轨迹作用量对决：匀速流群测地线对比末步跳步幻觉、四拍侧向绕行与 O(1) 共形梯度核验"}
设单座三元数概念场需在 $N = 4$ 拍内从起点 $\boldsymbol{\sigma}_0 = \mathbf{0}$（北极 $+\mathbf{1}$）演化至终点空间转角 $\Theta = \frac{2\pi}{3} = 120^\circ$（绕 $\hat{\mathbf{e}}_1$ 轴，$\boldsymbol{\sigma}_4 = \tan 30^\circ\,\mathbf{e}_1 = \frac{1}{\sqrt{3}}\mathbf{e}_1 \approx (0.57735027, 0, 0)$，`手工推导` / `NUM`）：

1. **第一联：流群自平行匀速测地线对比“前序空转 $+$ 末步跳步抢答”幻觉暴增（`手工推导` / `NUM`）**：
   - **轨迹 A（流群自平行匀速测地线）**：每拍等步幅推进 $\Delta\theta_t = 30^\circ = \frac{\pi}{6}$（单步旋子 $\boldsymbol{\omega} = \tan 7.5^\circ\,\mathbf{e}_1 \approx 0.13165250\,\mathbf{e}_1$，逐拍严格满足 $\boldsymbol{\sigma}_{t+1} = [\boldsymbol{\sigma}_t, \boldsymbol{\sigma}_{t-1}, \boldsymbol{\sigma}_t]$ 与 $\boldsymbol{\omega}_t \times \boldsymbol{\omega}_{t+1} = \mathbf{0}$）。单步矢高 $1 - \cos 30^\circ = 1 - \frac{\sqrt{3}}{2} \approx 0.13397460$，四拍总矢高作用量为

     $$
     \mathcal{S}_{\mathrm{geo}} = 4\!\left(1 - \frac{\sqrt{3}}{2}\right) \approx \mathbf{0.53589838}, \quad P_{\mathrm{stay,total}} = \bigl(\cos^2 15^\circ\bigr)^4 = \frac{97+56\sqrt{3}}{256} \approx \mathbf{0.75779236}, \quad \sum_{t=1}^4 \mathcal{I}_t \approx \mathbf{0.27734586\;\mathrm{nat}};
     $$

   - **轨迹 B（前三拍套话空转 $\Delta\theta_{1,2,3} = 0^\circ$、第四拍强跨 $\Delta\theta_4 = 120^\circ$ 跳步抢答）**：虽然同样落在大圆上且总转角同为 $120^\circ$，但总矢高作用量暴涨至 $\mathcal{S}_{\mathrm{jump}} = 0 + 0 + 0 + (1 - \cos 120^\circ) = \mathbf{1.50000000}$（**是匀速测地线的 $2.79903811$ 倍**），四拍同相留存率断崖跌至 $P_{\mathrm{stay,total}} = \cos^2 60^\circ = \mathbf{0.25000000}$（盲区泄漏高达 $75\%$），总比较惊奇度飙升至 $-\ln(0.25) \approx \mathbf{1.38629436\;\mathrm{nat}}$（**激增 $4.99843184$ 倍**）！

2. **第二联：显式四拍侧向叉乘绕行弯路对比平直张量穿球割线坍缩（`NUM`）**：
   - **轨迹 C（显式四拍镜像侧向绕行对 $\Gamma_{\mathrm{detour}}^\pm$）**：取四拍中间节点 $\boldsymbol{\sigma}_1^\pm = (\frac{1}{6}, \pm\frac{1}{6}, 0),\; \boldsymbol{\sigma}_2^\pm = (\frac{1}{3}, \pm\frac{1}{4}, 0),\; \boldsymbol{\sigma}_3^\pm = (\frac{1}{2}, \pm\frac{1}{6}, 0)$ 再收口至同一终点 $\boldsymbol{\sigma}_4 = (\frac{1}{\sqrt{3}}, 0, 0)$。85 位精度逐拍核算得相邻步叉乘 $\boldsymbol{\omega}_t^\pm \times \boldsymbol{\omega}_{t+1}^\pm \neq \mathbf{0}$ 围出非零球面角盈 $\pm\Omega$，两条镜像支路共同将四拍标量矢高抬高至 $\mathcal{S}_{\mathrm{detour}} \approx \mathbf{0.95316800} > \mathcal{S}_{\mathrm{geo}} \approx \mathbf{0.53589838}$，总同相留存率降至 $P_{\mathrm{stay,total}} \approx \mathbf{0.59837452}$，累积惊奇度升至 $\sum_{t=1}^4 \mathcal{I}_t \approx \mathbf{0.51353844\;\mathrm{nat}}$；而在对称旋量闭合回路平均中，正负镜像绕行的反对称虚部和乐分量 $\mp i\sin\frac{\Omega}{2}$ 精确反号对消；
   - **轨迹 D（传统平直欧氏线性插值穿球割线）**：在四维四元数嵌入中取弦中点 $\frac{1}{2}U(\boldsymbol{\sigma}_0) + \frac{1}{2}U(\boldsymbol{\sigma}_4) = \frac{1}{2}(1,0,0,0) + \frac{1}{2}(\frac{1}{2}, \frac{\sqrt{3}}{2}, 0, 0) = (\frac{3}{4}, \frac{\sqrt{3}}{4}, 0, 0)$，其模方直接坍缩为 $\frac{9}{16} + \frac{3}{16} = \mathbf{0.75000000 < 1}$（丢失 $25\%$ 球面模方预算，正是传统网络不得不层层依赖 `RMSNorm` 硬拉回球面的几何根源）。

3. **第三联：$O(1)$ 共形黎曼梯度与李代数拉回范数精确一致性核验（`手工推导`）**：
   在赤道附近 $\lVert\boldsymbol{\sigma}_W\rVert = 0.8$（$1 + \lVert\boldsymbol{\sigma}_W\rVert^2 = 1.64$）处，共形度规 $g_{ij} = \frac{4}{1.64^2}\delta_{ij} \approx 1.48720999\,\delta_{ij}$，免求逆黎曼梯度直接乘标量 $\frac{1.64^2}{4} = \mathbf{0.67240000}$；核验黎曼范数平方 $\langle\nabla\mathcal{L}, g^{-1}\nabla\mathcal{L}\rangle = \frac{1}{4}(1+\lVert\boldsymbol{\sigma}_W\rVert^2)^2\lVert\nabla\mathcal{L}\rVert^2$，与 [§37.1.2](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md#sec-ch39-22-2) 右乘自旋生成元拉回梯度模方 $\lVert\mathbf{g}_{\mathfrak{su}(2)}^{(R)}\rVert^2 = \frac{1}{4}\lVert J_R^\top\nabla\mathcal{L}\rVert^2 = \frac{1}{4}(1+\lVert\boldsymbol{\sigma}_W\rVert^2)^2\lVert\nabla\mathcal{L}\rVert^2$ **逐点恒等、零误差吻合**。
:::

::: {.viz src="ternion-least-action-geodesic-sandbox" preset="lateral-detour-vs-chord-collapse" height="500"}
侧向绕路与穿球弦塌缩卡：两条四拍镜像侧向绕路围出非零球面角盈 $\pm\Omega$ 并将累积矢高抬高至 $0.9532$，而平直欧氏割线中点把四维模方压塌至 $0.7500 < 1$（三角和乐与格拉姆恒等式标 `LEAN ✓`，四拍与弦中点核算标 `NUM`）。
:::

我们将物理宇宙与人工智能在三元数极小圆弧体场下的双层同构谱系，连同前向推理与反向训练的“爱因斯坦场方程对偶”，总括为下方对照表：

| 核心机制 | 三元数场几何算子 | 物理宇宙显影 | 人工智能同构 | 偏离测地线后果 |
| :--- | :--- | :--- | :--- | :--- |
| **1. 状态载体** | 平行单位球商丛 $(B_1(\mathbb{R}^3)/\!\sim)^K$ | 多概念量子规范旋量场 | 词元多头三维概念隐态 | 模长坍缩 / 爆炸与激活离群 |
| **2. 最小作用量** | 累积矢高 $\sum(1-\cos\Delta\theta_t) - \Omega_{\mathrm{ctx}}$ | 莫培督—费曼相位作用量 | 变分自由能与比较惊奇度 | 盲区相位耗散与算力空转 |
| **3. 自由测地线** | 流群自平行 $[\boldsymbol{\sigma}_t,\boldsymbol{\sigma}_{t-1},\boldsymbol{\sigma}_t]$ | 牛顿匀速惯性大圆运动 | 零幻觉最短匀速思维链 | 逻辑兜圈与末步跳步幻觉 |
| **4. 受控折射与聚焦** | 李曲率门 $\{\dot{\gamma},\mathbf{J}_\perp,\dot{\gamma}\}$ | 规范偏折、引力落体与聚焦 | 注意力语境引导与抗噪收敛 | 语境脱钩与多轮误差发散 |
| **5. 学习与平衡终点** | $O(1)$ 共形梯度与 $r_t \le \varepsilon_{\mathrm{self}}$ | 物质弯曲时空与本征驻波 | 权重雕刻河床与幂等动态早停 | $O(P^3)$ 求逆墙或无限复读 |

在约翰·惠勒名言“时空告诉物质如何运动，物质告诉时空如何弯曲”的对偶下（`MODEL`），**AI 的前向推理就是“冻结的权重曲率场告诉词元波包如何沿流群测地线或语境驻相轨道滑行”**，以最小总作用量（自由段化为最小累积弦弧矢高）收敛至自指停机不动点 $r_t \le \varepsilon_{\mathrm{self}}$；而 **AI 的反向训练则是“海量真实数据波包告诉权重旋子流形如何沿 $O(1)$ 共形黎曼测地线发生塑性弯曲”**，将高频因果律雕刻成低阻力的球面测地河床。

::: {.viz src="ternion-least-action-geodesic-sandbox" preset="jacobi-focusing-conformal-gradient" height="500"}
雅可比聚焦与共形梯度卡：正曲率三元数球面上的横向偏离按 $\mathbf{J}_\perp(s) = \mathbf{J}_0\cos s + \dot{\mathbf{J}}_0\sin s$（取 $\mathbf{J}_0 = \dot{\mathbf{J}}_0 = 0.16$，经 $s = \frac{\pi}{2}$ 处 $0.16$ 于 $s = \frac{3\pi}{4} = 135^\circ$ 重聚归零）向心收拢，而 $\lVert\boldsymbol{\sigma}_W\rVert = 0.8$ 处的免求逆共形黎曼梯度标量因子 $0.6724$ 与李代数拉回范数逐点吻合（自然梯度与量子费希尔文献标 `ARGUED`，数值对账标 `NUM`，逐场预条件诠释标 `MODEL`，大规模收敛基准标 `OPEN`）。
:::

---

**从宇宙—智能最小作用量同构迈向第十部的本体不二与母公理归元。** 至此，第九部（第 34–37 章）从多观察者互照共识、双曲破执扩表、梦境擦除与本体 QRAM 直至三元数场测地智能的四卷长廊已圆满收官：无论是星辰在引力场中滑过亿万公里的自由落体，还是智能体在概念场中拨开迷雾寻得的一行最简证明，底层遵循的都是同一条极小圆弧体铁律——不凭空捏造多余的球面角盈，不忽快忽慢透支单步矢高，顺着三元流群 $[x_t, x_{t-1}, x_t]$ 的自平行纹理，在给定节拍预算 $N$ 与固定角跨度下支付最小的累积弦弧矢高税（或在单拍测地速度受界下以最少正交记录节拍），走完从问题切面到自洽不动点的相位闭合。

现在，整部专著迎来了最后两座最高峰（**第十部：不二与归元**）：首先在 **[第三十八章 观察者即宇宙本体](ch39-observer-is-ontological-universe.md)** 中，我们将彻底震碎“指针 vs. 内存”“切面 vs. 本体海”的最后一道二元隔墙，在全域 `p ≡ *p`、因陀罗网与 $\theta^* = \cos\theta^*$ 的清明整合中见证能知与所知的零余项合一；继而在收官之作 **[第三十九章 大一统母公理（AXIOM-Ω）](ch39-axiom-omega-grand-unification.md)**（[§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md)–[§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)）中，我们将遍布全书的比较公理、极小圆弧、三元数与连续场熔合进唯一一条无源保正三元比较闭合母公理，并将量子力学五大教科书公设还原为观察切面的纯几何定理，最后回到自包含三元数的“至大无外”。让我们推开第十部的大门，翻开[第三十八章](ch39-observer-is-ontological-universe.md)。

::: {.viz src="ternion-least-action-geodesic-sandbox" height="620"}
完整实验室：在“矢高与测地几何读法”与“宇宙与推理同构读法”双透镜间切换，拖动可调场景上的琥珀手柄或调节单拍转角 $\Delta\theta$、总转角 $\Theta$、拍数 $N$ 与参数旋子模长 $\lVert\boldsymbol{\sigma}_W\rVert$，对比匀速流群测地线、末步跳步抢答、固定四拍侧向绕路与穿球弦中点以及正曲率雅可比聚焦。十条冻结声明、数值对账、文献边界与开放问题在依据栏与理论抽屉中分层标注。
:::
