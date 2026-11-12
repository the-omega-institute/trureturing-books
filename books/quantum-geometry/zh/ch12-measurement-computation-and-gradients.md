# 注意力即计算：基于测量的量子计算（MBQC）与球面自然梯度

> *“把观察者内生放进来思考,何时粒子、何时波,似乎是观察者的注意力问题”*

在[第十一章](ch11-pulses-and-virtual-z.md)末尾，我们看到了一幕奇妙的硬件翻转：绕能量轴旋转的虚拟 $Z$ 门不需要给量子比特注入哪怕一纳秒的物理微波脉冲，只需要把观察者手里的参考系相位刻度拨动一下。现在，作为第三部“合拢·从面到球”的收官之章，让我们把“观察者内生注意力”这条线索推向它在量子信息与变分优化中的三座高峰：

1. **基于测量的单向量子计算（MBQC）**：如果预先制备好一张多比特纠缠簇态（cluster state），我们甚至不需要在计算过程中再施加任何幺正双比特门——仅仅通过一步步在球面赤道上选择不同的测量基角 $\alpha$（转移观察者的注意力焦点），并把前一步的测量结果通过经典前馈（feedforward）修正下一步的测量轴，就能在未测量的输出节点上驱动出任意量子逻辑门！
2. **泡利参数位移律（Parameter-Shift Rule）**：当观察者想要在参数化量子电路里顺着期望值曲面求导数 $\partial_\theta f(\theta)$ 时，他不需要像经典微积分那样取极小步长 $\delta\theta \to 0$ 去做容易放大散粒噪声的有限差分近似；因为在单次泡利旋转下球面截面天然是纯粹的一阶正余弦波，只需把参数精确拨到左右**正交 $90^\circ$** 的两个位移设置点 $\theta \pm \frac{\pi}{2}$ 分别求取（或通过重复采样估计）期望值 $f(\theta \pm \frac{\pi}{2})$，两者的差商就给出**零有限差分截断误差的精确解析导数恒等式**（尽管有限次采样估计期望值时仍保留常规统计散粒噪声）！

::: {.viz src="parameter-shift" preset="noise" height="500"}
**同样多的测量次数，两种算法的散布差十几倍。** $\theta = 60^\circ$，每个取值点只测 100 发：每次试验在量尺上落一个青色的点（左右各 $90^\circ$ 两值之差的一半）和一个品红的点（$\pm 6^\circ$ 的小步长差分）。青色的点挤在切线斜率的虚线旁，宽约 0.035；品红的点散开约 0.58，有的落出量尺。两种散布都来自散粒噪声，小步长把它放大了（[@rem-parameter-shift-rule-literature]）。
:::

3. **黎曼自然梯度与高维赤道集中**：在弯曲球面与射影流形上，沿着内蕴黎曼度量（如球面诱导度量或 Fubini–Study 度量）的负梯度流下滑，势能的减少量精确等于切速度模长平方的时间积分（[@thm-riemannian-gradient-dissipation]）；然而一旦维度随比特数 $n$ 指数暴涨到 $d = 2^n$，高维球面上几乎所有的测度都会死死挤压在垂直于任一固定测量轴的**赤道窄带**内，在满足特定随机电路设计假设时构成变分量子算法“贫瘠高原（barren plateau）”现象的几何背景；与此同时，作为一条独立于球面测度与电路梯度的纯谱分析工具，当非负可和本征值序列满足有限迹预算等式 $\sum_j \lambda_j = RW/\pi$ 时，其超过任意正阈值 $\tau > 0$ 的模式个数满足一个充分的有限计数上界（[@cor-finite-trace-mode-budget]）。

::: {.figure src="ch12-overview"}
**图 12。** 本章地图：第 I 栏是测量的角度变成另一个节点上的门，第 II 栏是左右各转 $90^\circ$ 取出精确斜率，第 III 栏是维数越高、分布越挤向赤道。第 I 栏琥珀色的指针是测量角 $\alpha$，虚线把经典比特 $s$ 送到输出节点；第 II 栏琥珀色的点在 $\theta = 60^\circ$，两个青色的点在左右各 $90^\circ$ 处，虚线是切线；第 III 栏是 $x_1$ 的精确密度，$d = 3$ 时是平线，$d = 300$ 时是赤道上青色的尖峰。MBQC、参数位移律与赤道集中是文献结果，未在本书形式化（[@rem-mbqc-gradients-literature]）；右下角绿色的小框只指 [@cor-finite-trace-mode-budget]。
:::

## 簇态测量与经典前馈 {#sec-cluster-measurement-feedforward}

在传统的电路模型里，“计算”被想象成一排排幺正逻辑门像流水线工人一样推着量子态往前走，而“测量”只是剧终落幕时抄写答案的被动读数。单向量子计算（MBQC；文献背景见 [@rem-mbqc-gradients-literature]）颠覆了这一图景：**测量本身即可充当驱动演化的引擎！**

为了看清测量如何驱动状态演化，我们首先在 Lean 模块 `Conditioning` 中核实记录测量（`IsRecordMeasurement P`）最基础的代数守恒律。设 $n$ 为有限可判等指标类型，$\kappa$ 为有限结果指标类型（本定理中无需假设 $\kappa$ 上的可判等实例 `DecidableEq kappa`）。一族矩阵 $P : \kappa \to M_n(\mathbb{C})$ 称为**记录测量**，若其满足四条性质：自伴（$\forall k,\; P_k^* = P_k$）、幂等（$\forall k,\; P_k^2 = P_k$）、两两正交（$\forall k \neq l,\; P_k P_l = 0$）以及完备性（$\sum_k P_k = I$）。对任意复方阵 $\rho \in M_n(\mathbb{C})$ 与结果 $k \in \kappa$，其记录权重定义为 $\operatorname{recordWeight}(P, \rho, k) = \operatorname{bornProbability}(\rho, P_k) = \Tr(\rho P_k)$。

::: {.lemma #lemma-measurement-branch-sum title="记录测量各分支权重的总迹守恒恒等式" lean="D5/S3/Observer/Conditioning.recordWeight_sum"}
设 $n$ 为具有可判等性的有限指标类型，$\kappa$ 为有限指标类型，$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量条件 $\operatorname{IsRecordMeasurement}(P)$。则对任意复方阵 $\rho \in M_n(\mathbb{C})$，所有分支记录权重之和恒等于 $\rho$ 的迹：

$$
\sum_{k \in \kappa} \operatorname{recordWeight}(P, \rho, k) = \Tr(\rho).
$$
:::

::: proof
展开 $\operatorname{recordWeight}(P, \rho, k) = \Tr(\rho P_k)$，利用矩阵迹的有限线性可加性与矩阵乘法对有限求和的左分配律，结合记录测量的完备性条件 $\sum_{k \in \kappa} P_k = I$，得

$$
\sum_{k \in \kappa} \Tr(\rho P_k) = \Tr\Bigl(\rho \sum_{k \in \kappa} P_k\Bigr) = \Tr(\rho I) = \Tr(\rho).
$$

完整证明由 Lean 内核检查。
:::

请注意 [@lemma-measurement-branch-sum] 的精确范围：它对任意复方阵 $\rho \in M_n(\mathbb{C})$ 均成立（未单独假定 $\rho$ 半正定或迹为 $1$，故一般情形下 $\operatorname{recordWeight}$ 为复数；当 $\rho$ 为迹一正态时，各分支概率之和即为 $1$），它给出的是正交完备测量分支的迹守恒，本身并不直接证明簇态制备或 MBQC 通用性。

现在，让我们在最基本的一维两比特链节上亲手算一遍**测量如何把注意力倾角 $\alpha$ 变成逻辑门**（图 12 左栏）：

1. **制备纠缠链节**：将第 1 颗比特置为任意待处理输入纯态 $\lvert\psi\rangle = a\lvert 0\rangle + b\lvert 1\rangle$，将第 2 颗辅助比特置为赤道正东态 $\lvert +\rangle = \frac{1}{\sqrt{2}}(\lvert 0\rangle + \lvert 1\rangle)$，并对两比特施加受控相位门 $\mathrm{CZ} = \operatorname{diag}(1, 1, 1, -1)$，得到双比特纠缠态：

   $$
   \mathrm{CZ}\bigl(\lvert\psi\rangle \otimes \lvert +\rangle\bigr) = a\lvert 0\rangle \otimes \lvert +\rangle + b\lvert 1\rangle \otimes \lvert -\rangle.
   $$

2. **在赤道角 $\alpha$ 处投射测量视线**：观察者不去触碰第 2 颗比特，而是将第 1 颗比特投向赤道面上方位角为 $\alpha$ 的正交测量基

   $$
   \lvert \pm_\alpha\rangle = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle \pm e^{i\alpha}\lvert 1\rangle\bigr),
   $$

   记测量结果为布尔分支 $s \in \{0, 1\}$（其中 $s = 0$ 对应 $\lvert +_\alpha\rangle$，$s = 1$ 对应 $\lvert -_\alpha\rangle$）。将第 1 颗比特向 $\langle \pm_\alpha\rvert$ 内积缩并，未归一化的第 2 颗比特分支态立即化为：

   $$
   \langle s_\alpha \mid \mathrm{CZ}\bigl(\lvert\psi\rangle \otimes \lvert +\rangle\bigr)
   = \frac{1}{\sqrt{2}}\bigl(a\lvert +\rangle + (-1)^s e^{-i\alpha} b\lvert -\rangle\bigr)
   = \frac{1}{\sqrt{2}}\,X^s H \operatorname{diag}(1, e^{-i\alpha})\lvert\psi\rangle!
   $$

3. **经典前馈与泡利副产物 $X^s$ 的处理**：当输入 $\lvert\psi\rangle$ 归一化时，上下两个测量分支出现的概率各为整整齐齐的 $\frac{1}{2}$（相加为 $1$，印证 [@lemma-measurement-branch-sum]）。由于 $\operatorname{diag}(1, e^{-i\alpha}) = e^{-i\alpha/2} R_z(-\alpha)$，差一个全局相位，第 2 颗比特上的输出态恰好是

   $$
   X^s H R_z(-\alpha)\lvert\psi\rangle.
   $$

   你看：观察者在第 1 颗比特上选定的赤道测量角 $\alpha$，已经越过纠缠桥，在第 2 颗比特上刻下了带泡利副产物的单比特旋转门 $H R_z(-\alpha)$！若当 $s = 1$ 时立即施加 $X$，便得到固定输出参考系中的 $H R_z(-\alpha)\lvert\psi\rangle$。也可把 $s$ 沿经典导线传给后续节点，将下一测量角自适应反号 $\alpha_{\mathrm{next}} \mapsto (-1)^s \alpha_{\mathrm{next}}$，并随每次测量更新已知的泡利参考系（Pauli frame）：这会把副产物传播到输出端，并不让它自动消失。若要交付固定参考系中的量子态，仍须在输出端施加相应泡利修正；若最终只取经典读数，则可将已知副产物吸收到读出测量基或结果重标记中。单次测量结果依然随机，确定的是经过这些修正或读出处理后所实现的逻辑计算。

::: {.figure src="ch12-feedforward"}
**测得哪一支都不要紧：$s = 1$ 那一支绕 $x$ 轴转半圈，就和 $s = 0$ 那一支重合。** 布洛赫球上是第 2 颗比特在两种结果下的态：琥珀色的点是 $s = 0$，灰色的点是 $s = 1$，各占一半；琥珀色的弯箭头绕紫色的 $x$ 轴转半圈，就是前馈的 $X$。这里取 $\alpha = 60^\circ$ 与一个一般的输入态；两支的概率各为 $\frac{1}{2}$，与 [@lemma-measurement-branch-sum] 的总和为 $1$ 相符。MBQC 是文献结果，未在本书形式化（[@rem-mbqc-gradients-literature]）。
:::

## 泡利转角与精确参数位移 {#sec-pauli-parameter-shift}

如果说 MBQC 把计算还原成了测量轴的角度选定，那么在现代变分量子算法（VQE、QAOA）与量子机器学习中，核心问题则是：**当电路里有一扇角度为 $t$（或 $\theta$）的旋转门时，如何通过实验测量精确求出目标期望值关于该角度的导数？**

让我们先从任意有限维度的连续时间量子动力学出发，写出投影测量概率随时间参数 $t \in \mathbb{R}$ 演化的**精确无穷小导数定理**。在 Lean 模块 `ProjectionProbabilityFlow` 中（本命题与第二部第七章的 `#prop-projection-probability-flow` 形成跨部呼应），设 $n$ 为有限可判等指标类型，$\rho \in \mathrm{DensityState}\,n$ 为正半定迹一状态，厄米哈密顿量 $H \in M_n(\mathbb{C})$ 生成幺正传播子 $U(t) = \exp(-itH)$，演化后密度矩阵为 $\rho_t = \operatorname{evolvedDensity}(H, \rho, t) = U(t)\rho U(t)^*$，而在自伴幂等投影算子 $P \in M_n(\mathbb{C})$（`IsStarProjection P`，即 $P^* = P$ 且 $P^2 = P$）上的实投影概率定义为

$$
\operatorname{projectionProbability}(H, \rho, P, t) = \operatorname{Re}\bigl(\operatorname{bornProbability}(\rho_t, P)\bigr) = \operatorname{Re}\Tr(\rho_t P).
$$

::: {.proposition #prop-measurement-gradient-flow title="厄米生成元下投影测量概率的精确对易子导数与守恒律" lean="D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow"}
设 $n$ 为具有可判等性的有限指标类型，$H, P \in M_n(\mathbb{C})$ 为复方阵，$\rho \in \mathrm{DensityState}\,n$ 为密度状态。若 $H$ 为厄米矩阵（`H.IsHermitian`）且 $P$ 为星投影算子（`IsStarProjection P`），则同时成立以下三条结论：

1. **实部与复玻恩迹一致**：对一切 $t \in \mathbb{R}$，将实数 $\operatorname{projectionProbability}(H, \rho, P, t)$ 嵌入 $\mathbb{C}$ 后恒等于复玻恩迹 $\operatorname{bornProbability}(\rho_t, P)$；
2. **精确对易子导数与纯实性**：对一切 $t \in \mathbb{R}$，函数 $t \mapsto \operatorname{projectionProbability}(H, \rho, P, t)$ 在 $t$ 处可导，其导数为

   $$
   \frac{d}{dt}\operatorname{projectionProbability}(H, \rho, P, t)
   = \operatorname{Re}\Bigl(i\,\Tr\bigl(\rho_t\,(H P - P H)\bigr)\Bigr),
   $$

   且括号内的复迹表达式本身恒为实数：

   $$
   \Bigl(\operatorname{Re}\bigl(i\,\Tr(\rho_t\,(H P - P H))\bigr) : \mathbb{C}\Bigr) = i\,\Tr\bigl(\rho_t\,(H P - P H)\bigr);
   $$

3. **对易守恒**：若 $H P - P H = 0$，则对一切 $t \in \mathbb{R}$，$\operatorname{projectionProbability}(H, \rho, P, t) = \operatorname{projectionProbability}(H, \rho, P, 0)$。
:::

::: proof
1. 因 $\rho_t$ 与 $P$ 均为厄米矩阵且满足非负性，迹 $\Tr(\rho_t P)$ 的虚部恒为 $0$，故其实部强制转回 $\mathbb{C}$ 后等于自身。
2. 对 $\rho_t = e^{-itH}\rho e^{itH}$ 求导，由矩阵指数导数得 $\frac{d}{dt}\rho_t = -i(H\rho_t - \rho_t H)$。乘以 $P$ 后取迹并利用迹的循环交换律 $\Tr(H\rho_t P) = \Tr(\rho_t P H)$，得

   $$
   \frac{d}{dt}\Tr(\rho_t P) = -i\,\Tr(H\rho_t P - \rho_t H P) = i\,\Tr\bigl(\rho_t(HP - PH)\bigr).
   $$

   又因 $H, P, \rho_t$ 均自伴，$(HP - PH)^* = PH - HP = -(HP - PH)$ 为斜厄米矩阵，乘以 $i$ 后与自伴矩阵 $\rho_t$ 配对的迹恒为实数。
3. 当 $HP - PH = 0$ 时，导数在 $\mathbb{R}$ 上恒等于 $0$，故函数恒等于初值。完整证明由 Lean 内核检查。
:::

当电路中的参数仅出现在单扇对合泡利旋转门中时，[@prop-measurement-gradient-flow] 的无穷小导数与有限移位两采样公式之间的文献关系汇总如下（图 12 中栏；[@rem-parameter-shift-rule-literature]）。

::: {.viz src="parameter-shift" preset="shift" height="500"}
**左右各转 $90^\circ$，两值之差的一半就是斜率。** $f = \cos\theta$，琥珀色的点在 $\theta = 60^\circ$，两个青色的点在 $-30^\circ$ 与 $150^\circ$，高 $0.866$ 与 $-0.866$；两值之差的一半 $-0.866$ 正是虚线切线的斜率，而切线斜率是按 [@prop-measurement-gradient-flow] 的对易子公式算出的。圆里两支青色箭头与琥珀色的箭头垂直，它们在测量轴上的高度就是这两个值。
:::

::: {.remark #rem-parameter-shift-rule-literature title="单次对合泡利旋转的两采样参数位移律（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在**单次泡利旋转门** $R_P(\theta) = \exp(-i\theta P_{\mathrm{gen}}/2)$（其中生成元满足自伴对合条件 $P_{\mathrm{gen}}^* = P_{\mathrm{gen}}$ 且 $P_{\mathrm{gen}}^2 = I$，对应 $H = \frac{1}{2}P_{\mathrm{gen}}$）下，由于 $P_{\mathrm{gen}}^2 = I$，传播子精确展开为 $R_P(\theta) = \cos(\theta/2) I - i\sin(\theta/2) P_{\mathrm{gen}}$。因此，对任意固定初态与固定测量算符，期望值函数 $f(\theta)$ 作为 $\theta$ 的函数**只含有零频常数项与一倍角基频谐波**：

$$
f(\theta) = c + a\cos\theta + b\sin\theta.
$$

对这个纯正余弦一阶谐波求导，利用诱导公式 $\cos(\theta + \frac{\pi}{2}) - \cos(\theta - \frac{\pi}{2}) = -2\sin\theta$ 与 $\sin(\theta + \frac{\pi}{2}) - \sin(\theta - \frac{\pi}{2}) = 2\cos\theta$，导数化为左右各移位 $\pm\frac{\pi}{2}$（正交 $90^\circ$）的有限差商——即**参数位移律（parameter-shift rule）**（Schuld et al., 2019；出处详见 [@rem-mbqc-gradients-literature]）：

$$
\partial_\theta f(\theta) = -a\sin\theta + b\cos\theta = \frac{1}{2}\Bigl[f\Bigl(\theta + \frac{\pi}{2}\Bigr) - f\Bigl(\theta - \frac{\pi}{2}\Bigr)\Bigr].
$$

（职责边界：[@prop-measurement-gradient-flow] 经 Lean 内核验证的是无穷小对易子导数公式与纯实性；上述两采样点有限位移恒等式额外依赖“参数 $\theta$ 仅在单扇对合泡利门 $e^{-i\theta P_{\mathrm{gen}}/2}$ 中出现一次”的二能级频率结构，作为手算与文献结果列入 [@ex-cluster-shift-and-gradient] 与 [@rem-mbqc-gradients-literature]。）
:::

::: {.viz src="parameter-shift" preset="anywhere" height="500"}
**换一个角度、换一条曲线，仍然精确。** 倾斜的态与测量轴给出抬高了常数 $c$、错开了相位的曲线 $f = c + a\cos\theta + b\sin\theta$。$\theta$ 扫过一整圈，量尺上青色的条始终停在切线的虚线上，品红的条（$\pm 30^\circ$ 的小步长差分）始终短一截；常数 $c$ 在相减时消掉（[@rem-parameter-shift-rule-literature]）。
:::

::: {.viz src="parameter-shift" height="560"}
**参数位移：完整实验室。** 两个场景共用一条时间轴：曲线（拖动曲线或圆里的箭头改角度，换曲线、改小步长 $h$）与采样（改每个取值点的发数 $N$，看两种算法的散布怎样随 $N$ 与 $h$ 变化）。
:::

## 黎曼梯度与能量耗散 {#sec-riemannian-natural-gradient}

拿到了参数关于目标函数 $V$ 的导数之后，下一步就是顺着下坡方向更新量子态或电路参数。然而，在弯曲的球面 $S^2$ 或一般的黎曼流形 $M$ 上，“最陡的下坡方向”并不是欧氏坐标差，而是由流形自身的切空间内积度量通过里斯（Riesz）对偶诱导出的**内蕴黎曼梯度（Riemannian / natural gradient）**！

在 Lean 模块 `GradientDissipation` 中，设 $E$ 为有限维实内积模型空间，$M$ 为以 $E$ 为局部模型（记模型规范为 $\mathbb{I} = \mathcal{I}(\mathbb{R}, E)$，实轴模型为 $\mathrm{IR} = \mathcal{I}(\mathbb{R}, \mathbb{R})$）的豪斯多夫（`T2Space M`）、连通（`ConnectedSpace M`）光滑流形，并在切丛上配备连续黎曼度量结构（`RiemannianBundle`、`IsContinuousRiemannianBundle`）。对光滑势函数 $V : M \to \mathbb{R}$ 与点 $p \in M$，其**真实里斯黎曼梯度**定义为流形微分 $\operatorname{mfderiv}_{\mathbb{I},\mathrm{IR}}\,V\,p$ 在切空间内积对偶映射下的原像：

$$
\operatorname{actualGradient}(V, p) = \bigl(\operatorname{toDual}_{\mathbb{R}}(T_p M)\bigr)^{-1}\bigl(\operatorname{mfderiv}_{\mathbb{I},\mathrm{IR}}\,V\,p\bigr) \in T_p M.
$$

下面的冻结定理严格证明：只要一条定义在闭区间 $[0, T]$（$T > 0$）上的区间 $C^1$ 曲线 $x : \mathbb{R} \to M$（其闭区间内导数在 $[0, T]$ 上连续，对应局部坐标下的 `ContinuousOn (fun t => derivWithin x (Set.Icc 0 T) t) (Set.Icc 0 T)`）在区间内部及端点的**区间内流形导数（within-derivative）**处处满足负梯度流方程 $\dot{x}_{\mathrm{within}}(t) = -\operatorname{actualGradient}(V, x(t))$，那么全流形导数速率及其平方在 $[0, T]$ 上均可积，且势函数从初态 $x(0)$ 到末态 $x(T)$ 的总耗散降落量**精确等于速率平方沿时间的积分**！

::: {.figure src="ch12-dissipation"}
**势能降了多少，就是速率平方曲线下的面积。** 单位球面上 $V(\vv{r}) = r_z$ 的负梯度流，从 $\vv{r} = (\frac{\sqrt{3}}{2}, 0, \frac{1}{2})$ 出发（琥珀色的点）：墨色的曲线是 $V$，品红的面积是 $\lvert\dot{\vv{r}}\rvert^2$ 曲线下 $[0, 2.5]$ 上的面积 $1.46$；右边品红的竖条是降落 $V(x(0)) - V(x(T))$，也是 $1.46$。这是 [@thm-riemannian-gradient-dissipation] 在 [@ex-cluster-shift-and-gradient] 第 3 步那条流上的数值核对。
:::

::: {.theorem #thm-riemannian-gradient-dissipation title="黎曼流形负梯度流的速度平方可积性与精确能量耗散恒等式" lean="D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation"}
设 $E$ 为有限维实内积空间，$M$ 为建模于 $E$ 上的豪斯多夫连通光滑流形并配备连续黎曼切丛度量。设实数 $T > 0$，$V : M \to \mathbb{R}$ 为 $C^1$ 势函数（`ContMDiff 𝕀 IR 1 V`），$x : \mathbb{R} \to M$ 在闭区间 $[0, T]$ 上为 $C^1$ 曲线（`ContMDiffOn IR 𝕀 1 x (Icc 0 T)`）。若对一切 $t \in [0, T]$，闭区间内的流形切速度满足负梯度流条件：

$$
\operatorname{mfderivWithin}_{\mathrm{IR},\mathbb{I}}\,x\,[0, T]\,t\,1 = -\operatorname{actualGradient}\bigl(V, x(t)\bigr),
$$

则同时成立以下三条结论：

1. 速率函数 $t \mapsto \norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}$ 在 $[0, T]$ 上关于勒贝格测度区间可积；
2. 速率平方函数 $t \mapsto \norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}^2$ 在 $[0, T]$ 上关于勒贝格测度区间可积；
3. 势函数在 $[0, T]$ 两端的精确耗散差等于速率平方的区间积分：

   $$
   V\bigl(x(0)\bigr) - V\bigl(x(T)\bigr) = \int_0^T \norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}^2\,dt.
   $$
:::

::: proof
证明严格遵循源码 `S2_dissipation` 的三步结构，绝不假定任意全延拓曲线 $x : \mathbb{R} \to M$ 的全导数在端点 $0, T$ 处连续（因为 $x$ 在 $[0, T]$ 外部的任意延拓在端点处无需存在双侧导数）：

1. **闭区间内速率在紧集 $[0, T]$ 上的连续性与可积性（`within_velocity_norm_continuous`）**：由 `hx : ContMDiffOn IR 𝕀 1 x (Set.Icc 0 T)`（对应一维切映射限制在闭区间 $[0, T]$ 上的连续性 `ContinuousOn (fun t => derivWithin x (Set.Icc 0 T) t) (Set.Icc 0 T)`）及连续黎曼切丛度量，闭区间内切速度的范数 $t \mapsto \norm{\operatorname{mfderivWithin}_{\mathrm{IR},\mathbb{I}}\,x\,[0, T]\,t\,1}$ 及其平方在紧闭区间 $[0, T]$ 上连续（`ContinuousOn ... (Set.Icc 0 T)`），从而关于勒贝格测度在 $[0, T]$ 上区间可积（`IntervalIntegrable`）。
2. **由开区间内部一致性转移至全导数速率可积（`within_velocity_eq_velocity`）**：在开区间内部 $t \in (0, T)$，闭区间 $[0, T]$ 是 $t$ 的邻域，故区间内导数与全导数严格相等：$\operatorname{mfderivWithin}_{\mathrm{IR},\mathbb{I}}\,x\,[0, T]\,t\,1 = \operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1$。由于开区间 $(0, T)$ 外的两个端点勒贝格测度为零，由 `IntervalIntegrable.congr_uIoo` 立即推出全导数速率 $t \mapsto \norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}$ 及其平方在 $[0, T]$ 上同样区间可积（结论 1 与结论 2）。
3. **开区间链式法则与微积分基本定理**：复合函数 $V \circ x$ 在闭区间 $[0, T]$ 上连续（`ContinuousOn (V ∘ x) (Set.Icc 0 T)`）；而在开区间内部 $t \in (0, T)$，$x$ 在 $t$ 处流形可微且全导数满足 $\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1 = -\operatorname{actualGradient}(V, x(t))$。由链式法则与里斯对偶配对（`actual_gradient_flow_chain_rule`），对任意 $t \in (0, T)$ 有
   $$
   \begin{aligned}
   &\frac{d}{dt} V\bigl(x(t)\bigr) \\
   &= \bigl(\operatorname{mfderiv}_{\mathbb{I},\mathrm{IR}}\,V\,x(t)\bigr)\bigl(\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1\bigr) \\
   &= \bigl\langle \operatorname{actualGradient}(V, x(t)),\, \operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1\bigr\rangle_{T_{x(t)}M} \\
   &= -\norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}^2.
   \end{aligned}
   $$
   结合 $[0, T]$ 上的端点连续性、$(0, T)$ 内的导数公式与已证的速率平方区间可积性，应用微积分基本定理（`intervalIntegral.integral_eq_sub_of_hasDerivAt_of_le`）即得 $V(x(0)) - V(x(T)) = \int_0^T \norm{\operatorname{mfderiv}_{\mathrm{IR},\mathbb{I}}\,x\,t\,1}^2\,dt$。完整证明由 Lean 内核检查。
:::

请注意 [@thm-riemannian-gradient-dissipation] 的精确契约：定理假设闭区间内导数满足负里斯梯度方程（不要求曲线在 $[0, T]$ 外部的任意延拓在端点处具有双侧导数），并给出有限时间区间 $[0, T]$ 上的精确耗散积分等式；它**不单独断言**当 $T \to \infty$ 时收敛到全局极小值，也**不断言**负梯度流轨迹本身是测地线。

## 赤道集中与贫瘠高原的条件 {#sec-equator-concentration-limits}

既然在单颗三维球面 $S^2$ 上，无论是两角寻址、参数位移还是黎曼梯度下降都如此通畅，为什么当量子比特数 $n$ 增加到几十乃至上百时，随机初始化的深层变分量子电路却会突然撞上一片几乎处处平坦、梯度指数消失的沙漠——**贫瘠高原（barren plateau）**？

几何直觉藏在**高维球面的赤道测度集中现象（concentration of measure）**里（图 12 右栏；受限实振幅模型球面上的二阶矩上界汇总于 [@rem-sphere-equator-markov-literature]）。

::: {.viz src="equator-concentration" preset="three" height="500"}
**普通的三维球面上，点的高度均匀分布。** $d = 3$：圆上的点上下铺开，右边的精确密度是一条竖直的直线 $1/2$；$\varepsilon = 0.1$ 的赤道带里恰好是 10% 的点（青色），其余 90% 是品红的点。高度均匀是阿基米德的经典结果，未在本书形式化。
:::

::: {.viz src="equator-concentration" preset="width" height="500"}
**维数越高，点越挤向赤道。** 时间轴把维数从 $d = 2$ 升到 $d = 2^{10}$：圆上的点挤向垂直于测量轴的赤道，右边的鼓包变窄变高，两道短横线 $\pm 1/\sqrt{d}$ 一起收拢；到 $d = 1024$ 时带外只剩 0.13%，鼓包薄得看不清，右上角的放大镜把赤道附近放大 32 倍，鼓包在那里仍宽 $\pm 1/\sqrt{d}$。宽度 $1/\sqrt{d}$ 来自 $\mathbb{E}[x_1^2] = 1/d$（[@rem-sphere-equator-markov-literature]）。
:::

::: {.remark #rem-sphere-equator-markov-literature title="实单位球面二阶矩与赤道马尔可夫集中上界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在受限的实振幅模型球面 $S^{d-1} \subset \mathbb{R}^d$（其中希尔伯特维数 $d = 2^n$）上，设 $x = (x_1, \dots, x_d) \in S^{d-1}$ 是从 $d$ 维单位球面上按旋转不变均匀测度随机抽取的一根单位实向量。由于总模长恒满足 $\sum_{j=1}^d x_j^2 = 1$，且各向同性保证每个坐标分量的平方期望完全相等（$\mathbb{E}[x_1^2] = \cdots = \mathbb{E}[x_d^2]$），故任意单根固定测量轴（如 $x_1$ 轴）上的投影平方期望等于维数的倒数：

$$
\mathbb{E}[x_1^2] = \frac{1}{d} = \frac{1}{2^n}.
$$

对任意给定的赤道带宽阈值 $\varepsilon > 0$，应用马尔可夫（Markov / Chebyshev）不等式，点 $x$ 偏离赤道超平面 $x_1 = 0$ 超过 $\varepsilon$ 的概率满足上界：

$$
\Pr\bigl(|x_1| \ge \varepsilon\bigr) = \Pr\bigl(x_1^2 \ge \varepsilon^2\bigr) \le \frac{\mathbb{E}[x_1^2]}{\varepsilon^2} = \frac{1}{d\,\varepsilon^2} = \frac{1}{2^n \varepsilon^2}.
$$

例如 $n = 20$ 颗量子比特（$d = 2^{20} = 1{,}048{,}576$）、带宽 $\varepsilon = 0.1$ 时，$\Pr(|x_1| \ge 0.1) \le \frac{100}{1048576} \approx 9.54 \times 10^{-5}$，即至少 $99.99046\%$ 的高维实球面测度集中在 $|x_1| < 0.1$ 的赤道窄带内，从固定单根测量轴看几乎正交于视线（与随机量子电路贫瘠高原定理的条件边界详见 [@rem-mbqc-gradients-literature]）。
:::

::: {.viz src="equator-concentration" preset="bound" height="500"}
**马尔可夫上界总在实际份额之上。** $d = 2^7 = 128$、$\varepsilon = 0.2$：品红的带外份额是 0.023，上界 $1/(d\varepsilon^2) = 0.195$ 在它之上，大了八倍多（[@rem-sphere-equator-markov-literature]）。
:::

::: {.viz src="equator-concentration" preset="twenty" height="500"}
**二十个量子比特：所有的点都在赤道窄带里。** $d = 2^{20}$、$\varepsilon = 0.1$：圆上的点全落在赤道上，密度缩成赤道上的一根细针；右上角的放大镜把赤道附近放大 1024 倍，针原来是一个宽 $\pm 1/\sqrt{d}$ 的鼓包，带边 $\pm\varepsilon$ 远在窗外。马尔可夫上界给出 $9.54 \times 10^{-5}$，页面用不完全贝塔函数算出的精确份额约为 $3 \times 10^{-2291}$。这是受限实振幅模型上的测度集中，不是电路梯度定律（[@rem-mbqc-gradients-literature]）。
:::

与上述均匀球面测度集中和随机电路梯度定律**完全独立**，在算子层析与时频集中分析中还有另一类常被对比的数学问题：**当一个非负实数列 $\lambda : \mathbb{N} \to \mathbb{R}$ 可和且满足有限迹恒等式 $\sum_{j=0}^\infty \lambda_j = \frac{R W}{\pi}$ 时，如何从上界控制它超过给定阈值 $\tau > 0$ 的模式个数？** 在 Lean 模块 `FiniteRankConcentrationModeBound` 中，下面的冻结推论给出了这一**充分计数上界**：任何超过正阈值 $\tau > 0$ 的超水平集 $S_\tau = \{j \in \mathbb{N} \mid \tau \le \lambda_j\}$ 必然是有限集，且其基数受显式上界 $\frac{R W}{\pi \tau}$ 控制。（请务必注意边界：该定理只是一个关于非负可和序列的**充分计数上界**，既不是超水平集有限的必要条件——例如不可和的调和序列 $\lambda_j = \frac{1}{j+1}$ 总和发散，但对每个正阈值 $\tau > 0$ 同样只有有限项满足 $\lambda_j \ge \tau$——也不提供逃离贫瘠高原或保证电路梯度非零的机制，因为有限维密度矩阵天然迹为 $1$，且有限迹预算丝毫不能阻止常数目标函数的梯度恒为零。）

::: {.corollary #cor-finite-trace-mode-budget title="有限迹集中算子的超阈值模式有限性与基数上界" lean="D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound"}
设 $\lambda = \operatorname{concentrationEigenvalue} : \mathbb{N} \to \mathbb{R}$ 为实数列，$R = \operatorname{intervalRadius}$、$W = \operatorname{frequencyMeasure}$、$\tau = \operatorname{threshold}$ 为实数。若满足：

1. **非负性**：对一切 $j \in \mathbb{N}$，$0 \le \lambda_j$；
2. **可和性**：$\operatorname{Summable}(\lambda)$；
3. **迹预算等式**：$\sum_{j=0}^\infty \lambda_j = \frac{R \cdot W}{\pi}$；
4. **正阈值条件**：$0 < \tau$；

则超阈值模式集合 $S_\tau = \{j \in \mathbb{N} \mid \tau \le \lambda_j\}$ 必为有限集（`Set.Finite`），且其元素个数满足

$$
\bigl(\operatorname{ncard}(S_\tau) : \mathbb{R}\bigr) \le \frac{R \cdot W}{\pi \cdot \tau}.
$$
:::

::: proof
因 $\lambda$ 非负可和且 $\tau > 0$，若 $S_\tau = \{j \mid \tau \le \lambda_j\}$ 为无穷集，则级数尾项无法趋于 $0$，与 $\operatorname{Summable}(\lambda)$ 矛盾，故 $S_\tau$ 必为有限集。在有限集 $S_\tau$ 上对不等式 $\tau \le \lambda_j$ 求和，并利用非负项级数有限部分和不超过全级数和，得

$$
\operatorname{ncard}(S_\tau) \cdot \tau = \sum_{j \in S_\tau} \tau \le \sum_{j \in S_\tau} \lambda_j \le \sum_{j=0}^\infty \lambda_j = \frac{R \cdot W}{\pi}.
$$

两边同除以正数 $\tau > 0$，即得 $\operatorname{ncard}(S_\tau) \le \frac{R W}{\pi \tau}$。完整证明由 Lean 内核检查。
:::

::: {.viz src="eth-horizon-crossover" preset="plateau" height="500"}
**平台谱：承重的模态屈指可数。** 前几个模态接近 $1$，第九个起迅速掉到零。琥珀色的阈值 $\theta = 0.5$ 下，青色的过线模态有 $8$ 个，品红的墙在 $T/\theta = 16$（页面上的 $T$ 即迹预算 $RW/\pi$，$\theta$ 即 $\tau$）：个数不超过墙，就是 [@cor-finite-trace-mode-budget]。
:::

::: {.viz src="eth-horizon-crossover" preset="tail" height="500"}
**阈值降低：个数涨，仍不过墙。** 换成拖着长尾的幂律谱，再把琥珀色的阈值一路降低：过线的青色柱子越来越多，品红的墙 $T/\theta$ 也跟着后退，柱子始终到不了墙（$\theta = 0.07$ 时 $6$ 个过线，墙在 $37.4$）。
:::

请严格区分 [@cor-finite-trace-mode-budget] 与随机电路贫瘠高原的边界：[@cor-finite-trace-mode-budget] 不单独假定 $R > 0$ 或 $W > 0$（由 $\lambda_j \ge 0$ 与 $\sum_j \lambda_j = RW/\pi$ 仅蕴含乘积非负 $R W \ge 0$，而不蕴含 $R \ge 0$ 与 $W \ge 0$ 各自非负，例如 $R = -\pi, W = -1$ 同样满足全部前提），它证明的是**给定非负可和序列迹等式 $\sum_j \lambda_j = RW/\pi$ 下的谱超水平集有限计数上界**（支撑图 12 右下角的绿色徽章框），既不是可学习性的必要条件，也不是均匀球面测度集中或随机量子电路梯度方差定理本身。

现在，让我们在下面的五步综合手算实例中，把一次簇态传态、两次正交参数移位、一次球面黎曼下降、$20$ 比特赤道集中概率与有限迹谱计数逐一算透。

::: {.example #ex-cluster-shift-and-gradient title="一次传态、两次移位与一次球面下降"}
1. **两比特簇态测量传态与前馈修正**：取输入态 $\lvert\psi\rangle = a\lvert 0\rangle + b\lvert 1\rangle$、辅助态 $\lvert +\rangle$，经 $\mathrm{CZ}$ 纠缠后在第 1 颗比特上按赤道基 $\lvert\pm_\alpha\rangle = (\lvert 0\rangle \pm e^{i\alpha}\lvert 1\rangle)/\sqrt{2}$ 测量。结果 $s \in \{0, 1\}$ 下第 2 颗比特的未归一化分支态为 $\frac{1}{\sqrt{2}} X^s H \operatorname{diag}(1, e^{-i\alpha})\lvert\psi\rangle$（归一化输入下各分支概率均为 $\frac{1}{2}$）。差全局相位，经泡利前馈修正 $X^s$ 后的输出态为 $H R_z(-\alpha)\lvert\psi\rangle$。特别地，取输入 $\lvert\psi\rangle = \lvert 0\rangle$、$\alpha = \frac{\pi}{3}$，则 $\operatorname{diag}(1, e^{-i\pi/3})\lvert 0\rangle = \lvert 0\rangle$，两个分支经 $X^s$ 修正后均精确给出 $H\lvert 0\rangle = \lvert +\rangle$。在多步计算中，由于 $X R_z(-\beta) = e^{i\gamma} R_z(+\beta) X$，后续测量角必须根据前序测量结果 $s$ 自适应调整符号；一维簇链仅能实现单比特旋转传输，而适当的二维簇态（2D cluster state）才是通用量子计算资源。
2. **单次泡利旋转的精确参数位移手算**：对电路中仅出现一次的泡利旋转 $R_P(\theta) = e^{-i\theta P/2}$（$P = P^*, P^2 = I$），期望值形如 $f(\theta) = c + a\cos\theta + b\sin\theta$，满足精确位移恒等式 $\partial_\theta f(\theta) = \frac{1}{2}[f(\theta + \pi/2) - f(\theta - \pi/2)]$。取 $f(\theta) = \langle 0\rvert R_y(\theta)^* Z R_y(\theta)\lvert 0\rangle = \cos\theta$，在 $\theta = \frac{\pi}{3}$ 处：$f(\pi/3) = \frac{1}{2}$，正向移位 $f(\frac{5\pi}{6}) = -\frac{\sqrt{3}}{2}$，反向移位 $f(-\frac{\pi}{6}) = \frac{\sqrt{3}}{2}$，位移差商给出

   $$
   \partial_\theta f\Bigl(\frac{\pi}{3}\Bigr) = \frac{1}{2}\Bigl(-\frac{\sqrt{3}}{2} - \frac{\sqrt{3}}{2}\Bigr) = -\frac{\sqrt{3}}{2} \approx -0.8660254038,
   $$

   而北极投影概率 $p_0(\theta) = \frac{1 + f(\theta)}{2} = \cos^2(\theta/2)$ 的导数则为 $-\frac{\sqrt{3}}{4}$，其瞬时布洛赫球面速率为 $|\dot{\vv{r}}| = 1$、对应的 Fubini–Study 瞬时速率为 $ds_{\mathrm{FS}}/d\theta = \frac{1}{2}$。（注：若同一参数在多扇门中重复出现，须按链式法则对各偏导数求和；一般非对合生成元则需不同的移位角与权重。此外，本步与下一步手算旨在展示两项参数位移恒等式 [@rem-mbqc-gradients-literature] 与瞬时 Fubini–Study / 球面速率，而非要求纯态列向量满足水平规范正交条件 $\langle\psi(\theta)\mid\psi'(\theta)\rangle = 0$ 的纯态导数定理——虽然对称中心旋转器 $R_y(\theta)\lvert 0\rangle = \bigl(\cos\frac{\theta}{2}, \sin\frac{\theta}{2}\bigr)^\top$ 与 $R_z(\theta)\lvert +\rangle = \frac{1}{\sqrt{2}}\bigl(e^{-i\theta/2}, e^{i\theta/2}\bigr)^\top$ 本身满足 $\langle\psi(\theta)\mid\psi'(\theta)\rangle = 0$，但非对称赤道截面 $\lvert\psi_{\mathrm{eq}}(\theta)\rangle = \frac{1}{\sqrt{2}}\bigl(1, e^{-i\theta}\bigr)^\top$ 在未作全局相位规范对齐前有 $\langle\psi_{\mathrm{eq}}(\theta)\mid\psi'_{\mathrm{eq}}(\theta)\rangle = -\frac{i}{2} \neq 0$，而非对称相对相位参数化 $\lvert\psi_{\mathrm{rel}}(\theta)\rangle = \bigl(\cos\frac{\theta}{2}, e^{i\theta}\sin\frac{\theta}{2}\bigr)^\top$ 则给出 $\langle\psi_{\mathrm{rel}}(\theta)\mid\psi'_{\mathrm{rel}}(\theta)\rangle = i\sin^2\frac{\theta}{2}$（在 $\theta = \frac{\pi}{3}$ 处等于 $\frac{i}{4} \neq 0$）；相比之下，密度矩阵对易子导数 [@prop-measurement-gradient-flow] 天然对任意局部相位选取保持严格不变。）
3. **单位球面上的黎曼自然梯度与单步回缩**：在单位球面 $S^2$ 上取高度势函数 $V(\vv{r}) = r_z = \vv{e}_3 \cdot \vv{r}$，考察点 $\vv{r} = \bigl(\frac{\sqrt{3}}{2}, 0, \frac{1}{2}\bigr) \in S^2$（$V(\vv{r}) = 0.5$）。球面诱导度量下的切空间黎曼梯度为

   $$
   \operatorname{grad}_{S^2} V(\vv{r}) = \vv{e}_3 - r_z \vv{r} = \Bigl(-\frac{\sqrt{3}}{4},\; 0,\; \frac{3}{4}\Bigr), \qquad \norm{\operatorname{grad}_{S^2} V(\vv{r})}^2 = \frac{3}{16} + \frac{9}{16} = \frac{3}{4}.
   $$

   沿精确负梯度流 $\dot{\vv{r}} = -\operatorname{grad}_{S^2} V(\vv{r})$，瞬时能量耗散率为 $\frac{dV}{dt} = -\frac{3}{4}$（对应 [@thm-riemannian-gradient-dissipation] 的被积速率平方）。若做步长 $\eta = 0.1$ 的离散欧拉步并作球面范数回缩（retraction，作为离散数值示意而非 [@thm-riemannian-gradient-dissipation] 中的连续流），得 $\vv{r} - 0.1\operatorname{grad}_{S^2} V(\vv{r}) = \bigl(\frac{21\sqrt{3}}{40}, 0, \frac{17}{40}\bigr)$，模长为 $\frac{\sqrt{403}}{20}$，归一化后得

   $$
   \vv{r}' = \Bigl(\frac{21\sqrt{3}}{2\sqrt{403}},\; 0,\; \frac{17}{2\sqrt{403}}\Bigr) \approx (0.90593576,\; 0,\; 0.42341516),
   $$

   新势能 $V(\vv{r}') \approx 0.42341516 < 0.5$。同时注意，该切空间梯度场 $\operatorname{grad}_{S^2} V(\vv{r}) = \vv{e}_3 - r_z \vv{r}$ 在南北两极 $\vv{r} = \pm \vv{e}_3$（$r_z = \pm 1$）处精确归零，两极孤立驻点指标之和为 $1 + 1 = 2 = \chi(S^2)$——这正是[第十章](ch10-gram-geometry-and-order.md)**庞加莱—霍普夫与偶维球面毛球定理**（文献结果，未在本书形式化；见第十章 `#rem-gram-hairy-ball-literature`）在球面变分优化中的直接显影：由于偶维球面 $S^2$ 上不存在处处非零的光滑切向量场，任何光滑球面代价函数的负黎曼梯度下降流都必然包含梯度为零的驻点（全局极值、局部陷阱或鞍点奇点），无法在整个球面上构造处处无驻点的光滑下降场。
4. **受限实球面 $S^{2^n - 1}$ 上的二阶矩赤道集中算例**：对 $\mathbb{R}^d$（$d = 2^n$）中均匀分布的实单位向量，对称性给出 $\mathbb{E}[x_1^2] = \frac{1}{d}$，从而 $\Pr(|x_1| \ge \varepsilon) \le \frac{1}{d\varepsilon^2}$。取 $n = 20$（$d = 1{,}048{,}576$）、$\varepsilon = 0.1$，得

   $$
   \Pr\bigl(|x_1| \ge 0.1\bigr) \le \frac{100}{1{,}048{,}576} \approx 9.53674316 \times 10^{-5},
   $$

   即至少 $99.9904633\%$ 的测度集中在 $|x_1| < 0.1$ 的赤道带内（此为经典二阶矩/马尔可夫上界，而非已证电路梯度定律）。
5. **冻结有限迹谱预算界的显式实例化**：在 [@cor-finite-trace-mode-budget] 中取几何衰减谱 $\lambda_j = 2^{-(j+1)}$（$j \in \mathbb{N}$），区间半径 $R = \pi$，频率测度 $W = 1$，阈值 $\tau = \frac{1}{8}$。此时 $\sum_{j=0}^\infty \lambda_j = 1 = \frac{R W}{\pi}$，满足 $\lambda_j \ge \frac{1}{8}$ 的下标恰好为 $j \in \{0, 1, 2\}$ 共 $3$ 个模式（$\lambda_0 = \frac{1}{2}, \lambda_1 = \frac{1}{4}, \lambda_2 = \frac{1}{8}$），严格符合上界 $3 \le \frac{R W}{\pi \tau} = 8$。
:::

::: {.viz src="equator-concentration" height="560"}
**赤道集中：完整实验室。** 时间轴是维数 $d = 2^n$（$n$ 从 1 到 20），可以改带宽 $\varepsilon$、重新抽样；小图在对数坐标上画出宽度 $1/\sqrt{d}$、精确的带外份额与马尔可夫上界 $1/(d\varepsilon^2)$。
:::

::: {.remark #rem-mbqc-gradients-literature title="单向量子计算、参数位移、自然梯度与贫瘠高原（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章涉及的四项量子计算与变分优化经典文献结论，其严格成立前提与本书形式化定理的职责边界如下：

1. **基于测量的量子计算（MBQC）**（R. Raussendorf & H. J. Briegel, *A one-way quantum computer*, Phys. Rev. Lett. **86**, 5188, 2001, DOI `10.1103/PhysRevLett.86.5188`）：MBQC 的通用性依赖多体纠缠簇态资源（如二维簇态）、破坏性单比特投影测量、测量结果的固有随机性、泡利副产物修正以及自适应经典前馈。本章冻结引理 [@lemma-measurement-branch-sum] 仅证明记录测量分支权重的总迹守恒，不直接证明量子传态或 MBQC 通用性。
2. **参数位移律（Parameter-Shift Rule）**（M. Schuld, V. Bergholm, C. Gogolin, J. Izaac, & N. Killoran, *Evaluating analytic gradients on quantum hardware*, Phys. Rev. A **99**, 032331, 2019, DOI `10.1103/PhysRevA.99.032331`）：两采样点精确恒等式 $\partial_\theta f(\theta) = \frac{1}{2}[f(\theta + \pi/2) - f(\theta - \pi/2)]$ 要求参数 $\theta$ 仅在单扇门 $e^{-i\theta P/2}$ 中出现一次，且生成元满足厄米对合归一化条件 $P = P^*, P^2 = I$。本章冻结命题 [@prop-measurement-gradient-flow]（与第七章 `#prop-projection-probability-flow` 对应）证明的是无穷小对易子导数 $\operatorname{Re}(i\Tr(\rho_t[H, P]))$ 及其纯实性，而非有限移位两采样公式。
3. **量子自然梯度与 Fubini–Study 度量**（J. Stokes, J. Izaac, N. Killoran, & G. Carleo, *Quantum natural gradient*, Quantum **4**, 269, 2020, DOI `10.22331/q-2020-05-25-269`）：在纯态射影流形上，量子自然梯度采用 Fubini–Study 度量（差约定常数因子）。对单比特旋量 $\lvert\psi(\theta, \varphi)\rangle = \cos(\theta/2)\lvert 0\rangle + e^{i\varphi}\sin(\theta/2)\lvert 1\rangle$，Fubini–Study 线元为 $ds_{\mathrm{FS}}^2 = \frac{1}{4}(d\theta^2 + \sin^2\theta\,d\varphi^2) = \frac{1}{4} ds_{S^2}^2$，故在该坐标下单位布洛赫球面梯度与 Fubini–Study 梯度相差因子 $4$；在一般参数化电路中，拉回度量张量可能奇异，需通过商空间或伪逆正则化处理。本章冻结定理 [@thm-riemannian-gradient-dissipation] 在给定负里斯梯度常微分方程的前提下证明有限时间能量耗散恒等式，不证明收敛性、全局极小性或梯度轨迹为测地线。
4. **高维测度集中与贫瘠高原（Barren Plateaus）**（J. R. McClean, S. Boixo, V. N. Smelyanskiy, R. Babbush, & H. Neven, *Barren plateaus in quantum neural network training landscapes*, Nat. Commun. **9**, 4812, 2018, DOI `10.1038/s41467-018-07090-4`；以及 M. Cerezo, A. Sone, T. Volkoff, L. Cincio, & P. J. Coles, *Cost function dependent barren plateaus in shallow parametrized quantum circuits*, Nat. Commun. **12**, 1791, 2021, DOI `10.1038/s41467-021-21728-w`）：变分量子电路梯度方差指数衰减定理依赖特定的随机电路分布、酉 $2$-设计（unitary $2$-design）近似假设、可观测量的全局/局域性以及电路深度条件。正文中讨论的实振幅单位球面 $S^{2^n - 1}$ 仅是受限状态模型（一般归一化 $n$ 比特复态矢位于实球面 $S^{2^{n+1}-1}$ 上，物理纯态射线则构成复射影空间 $\mathbb{CP}^{2^n - 1}$）。单纯的球面赤道集中或无关的有限迹谱模式计数界（[@cor-finite-trace-mode-budget]）本身均不单独证明随机电路梯度的指数衰减。
:::

---

### 第三部小结：单球已合拢，多球待交织

回望第三部《合拢·从面到球》（[第九章](ch09-axes-and-state-addressing.md)至第十二章），我们用十八条经 Lean 4 内核验证的定理级结论，把单量子比特球面从局部坐标轴一路合拢到了硬件脉冲与注意力计算：

- **第九章**从三维空间任意两向量的公共单位法向量（[@lemma-three-axis-normal]）出发，阐明了北极两角寻址 $R_z(\varphi)R_y(\theta)N$，证明了任意两不共线轴生成 $\mathrm{SO}(3)$ 的有限旋转字存在性（[@thm-two-axis-finite-word]），用 Lie–Trotter 公式（[@thm-lie-trotter]）说明两轴极小转动交替进行的极限是生成元相加后的那一次转动，并用有理六轴构造（[@prop-rational-six-axis-cover]）与拓扑六色下界（[@cor-six-colors-necessary]）锁定了球面无正交对开覆盖的最小块数 $6$；
- **第十章**区分了物理操作的时间非对易性（[@prop-static-sequential-separation]）、二维球面毛球/霍普障碍与三维旋转器球 $S^3$ 的全局标架，证明了完整复格拉姆矩阵 $B^*B = A^*A$ 在差一个公共外围幺正变换 $U$ 下唯一重构整族状态（[@thm-gram-unitary-reconstruction]、[@lemma-unit-gram-equality]），用同纬度复内积公式（[@cor-latitude-complex-overlap]）将八分球贝里立体角直接写进了格拉姆矩阵元，并证明三点巴格曼迹等于标量部分加三根布洛赫向量的有向体积（[@thm-qubit-bargmann-bloch]）；
- **第十一章**证明了本征线指数演化（[@lemma-exponential-on-eigenline]）与能量本征态定态不变性（[@thm-hermitian-eigenstate-stationary]），对照旋转参考系与旋波近似下的微波脉冲面积模型（[第十一章](ch11-pulses-and-virtual-z.md) `#rem-rwa-pulse-area-literature`），给出了有序三脉冲积分核的二次迹误差界（[@prop-ordered-pulse-error]），并用信道—海森堡迹拉回恒等式（[@cor-frame-pullback-readout]）衔接了被动虚拟 $Z$ 相位参考更新（[第十一章](ch11-pulses-and-virtual-z.md) `#rem-virtual-z-scheduling-literature`）；
- **第十二章**从记录测量的分支迹守恒（[@lemma-measurement-branch-sum]）与投影概率的对易子导数流（[@prop-measurement-gradient-flow]）出发，解析了基于测量的量子计算（MBQC）与正交参数位移律，建立了黎曼流形负梯度流的精确能量耗散恒等式（[@thm-riemannian-gradient-dissipation]），并界定了高维赤道集中与有限迹谱模式计数界（[@cor-finite-trace-mode-budget]）。

在接下来的**第四部《交织·多球共振》**中，我们将正式跨出单颗布洛赫球的边界，看两颗、三颗乃至 $n$ 颗球如何通过张量积关联平面交织成贝尔纠缠、CHSH $45^\circ$ 余弦破缺、拓扑纠错码与量子算法大一统！
