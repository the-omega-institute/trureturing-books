# 34.8 从平方权重到单次记录：球面吸引盆、鞅抽样律与选支边界 {#sec-ch34-single-outcome-attractor-basins}

> 往返两次投影（[§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)）解释了为什么可见实轴上的回声权重必为二次平方 $\cos^2\theta$，视界偏迹（[§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)）解释了为什么局部非对角干涉项会随环境纠缠归零；但把纯态 $\lvert\psi\rangle$ 变成对角矩阵 $\operatorname{diag}(\cos^2\theta, \sin^2\theta)$，仍然只是把相干叠加转换成了“各占一份权重的并列系综（*And*）”，而尚未跨出“单次实验只落定唯一一条经典记录（*Or*）”的最后半步。

在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 中，我们沿着观察者自身的单位基轴 $\mathbf{I}$ 走完了“去程投影消盲区、回程投影消相位”的雷达往返闭环，见证了内积模平方 $p_0 = \cos^2\theta$ 如何作为唯一无相位漂移的二阶实值回声落回观察者轴线。然而，当我们把镜头从统计系综的期望读数切回实验室里**单次闪烁的探测器光点**，一道自 1927 年索尔维会议延续至今的认识论断崖当即横亘在眼前（[附录 D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2)）：既然在 $\theta = 30^\circ$ 时，观察者轴线收回了 $p_0 = \cos^2 30^\circ = \frac{3}{4}$ 的同向回声，同时有 $1 - p_0 = \sin^2 30^\circ = \frac{1}{4}$ 的盲区份额留在正交补方向，为什么单次测量留下的宏观记录从来不是一枚带着 $\frac{3}{4}$ 灰度的折中指针，而必定非此即彼地跳入满额记录 `$0$`（$+\mathbf{I}$）或满额记录 `$1$`（$-\mathbf{I}$），且长期频率恰好收敛于 $\frac{3}{4} : \frac{1}{4}$？

要诚实地合拢这道关口，第一步不是急于用修辞掩盖裂痕，而是用内核已验证的代数铁律把**“线性演化 + 偏迹 + 往返平方回声能证明什么”**与**“单次结果选支额外要求什么动力学前提”**切割得一清二楚。

## 34.8.1 未读捏合不动点与“和 $\to$ 或”选支鸿沟：从玻恩平方回声到单次记录契约 {#sec-ch34-20-1}

回望 [第三十四章](ch33-all-beings-observers-and-mutual-attractors.md)（[§34.2](ch33-s02-self-sustaining-attractors.md)、[§34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer)）建立的自维持观察者本体论，物理记录之所以能抵抗环境扰动而持久留存，是因为观察者内部的记忆自由度构成了分立稳定的吸引子构型。但在量子测量代数的严格语境下，“分立记录基的选定（去相干捏合）”与“单次运行落入某一特定记录分支（条件化选支）”属于两个截然不同的数学映射。

设有限维希尔伯特空间上给定一组正交完备的记录投影测量族 $P = \{P_k\}_{k \in \kappa}$（满足 $P_k^\dagger = P_k$、$P_k P_l = \delta_{kl} P_k$ 及 $\sum_k P_k = I$）。对任意半正定迹一密度矩阵 $\rho$，未读取具体分支标签前的**非选择性捏合通道（unread pinching channel）**定义为

$$
\operatorname{unreadState}(P, \rho) \;:=\; \sum_{k \in \kappa} P_k \rho P_k \;=\; \sum_{k \in \kappa} \operatorname{recordWeight}(P, \rho, k)\,\operatorname{conditionalState}(P, \rho, k),
$$

其中分支权重 $\operatorname{recordWeight}(P, \rho, k) = \operatorname{Tr}(\rho P_k)$，而在 $\operatorname{recordWeight}(P, \rho, k) \neq 0$ 时的测后**条件态**为 $\operatorname{conditionalState}(P, \rho, k) = \operatorname{recordWeight}(P, \rho, k)^{-1} P_k \rho P_k$。为什么单靠上述非选择性通道与线性演化，在逻辑上绝不可能自动推出单次记录坍缩？下方形式契约将六条冻结内核定理与两项显式非选支反例并排锁定：

::: {.remark #rem-ch34-selection-contract title="希尔伯特—布洛赫倍角换算、记录条件化六锚点与“和到或”非选支边界契约"}
在连接 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的往返平方回声与单量子比特球面吸引盆动力学时，本节全程严格恪守以下几何换算与形式化认识论边界（`LEAN ✓` + `手工推导` + `MODEL`）：

1. **希尔伯特射线角 $\theta$ 与布洛赫极角 $2\theta$ 的精确换算（`手工推导`）**：记观察者自身纯态基矢 $\lvert 0\rangle$（对应球面北极 $+\mathbf{I} = +\mathbf{e}_z$）与被测纯态 $\lvert\psi(\theta, \varphi)\rangle = \cos\theta\lvert 0\rangle + e^{i\varphi}\sin\theta\lvert 1\rangle$ 之间的**希尔伯特空间富比尼—施图迪夹角**为 $\theta \in [0, \frac{\pi}{2}]$，则往返玻恩权重为 $p_0 = \lvert\langle 0\mid\psi\rangle\rvert^2 = \cos^2\theta \in [0, 1]$。映射到单量子比特**布洛赫球面 $S^2$** 时，极余纬角翻倍为 $\vartheta_{\mathrm{Bloch}} = 2\theta \in [0, \pi]$，沿观察者轴 $\mathbf{I}$ 的纵向坐标 $z_0$ 与平方权重 $p_0$ 呈精确仿射双射：

   $$
   z_0 \;=\; \cos(2\theta) \;=\; \cos^2\theta - \sin^2\theta \;=\; 2p_0 - 1 \;\in\; [-1, 1], \qquad p_0 \;=\; \cos^2\theta \;=\; \frac{1 + z_0}{2}.
   $$

   故北极 $z_0 = +1$ 对应 $\theta = 0^\circ$（$p_0 = 1$），赤道 $z_0 = 0$ 对应等幅叠加 $\theta = 45^\circ$（$p_0 = \frac{1}{2}$），而希尔伯特空间 $90^\circ$ 正交盲区 $\theta = 90^\circ$（$p_0 = 0$）则对应布洛赫球南极对径点 $z_0 = -1$（$2\theta = 180^\circ$）。
2. **记录权重、未读捏合幂等与有限收缩稳定的六项内核支点（`LEAN ✓`）**：在所钉 `trureturing` 冻结声明中，秩一玻恩配对定理 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) 证明对秩一投影 $P_k = \lvert\phi\rangle\langle\phi\rvert$ 与纯态 $\rho = \lvert\psi\rangle\langle\psi\rvert$，分支权重满足 $\operatorname{recordWeight}(P, \rho, k) = \lVert\langle\phi\mid\psi\rangle\rVert^2 = \operatorname{Tr}(\rho P_k)$，且未读态恒等于条件态按玻恩权重的凸组合 $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\bullet\operatorname{conditionalState}(P, \rho, j)$；权重守恒定理 [`recordWeight_sum`](lean:D5/S3/Observer/Conditioning.recordWeight_sum) 保证完备投影族下总权重守恒 $\sum_k \operatorname{recordWeight}(P, \rho, k) = \operatorname{Tr}(\rho)$；条件态合法性定理 [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) 保证凡满足 $\operatorname{recordWeight}(P, \rho, k) \neq 0$ 的归一化分支态 $\operatorname{conditionalState}(P, \rho, k)$ 仍为半正定迹一量子态；未读不动点充要判据 [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) 证明 $\operatorname{unreadState}(P, \rho) = \rho \iff \forall k \neq l,\; P_k \rho P_l = 0$；有限记录捏合幂等定理 [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent) 进一步锁死 $\operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P)$。在离散候选集一侧，有限收缩更新稳定定理 [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) 证明：在有限集合 $X$（`[Finite X]`）上，任何满足逐拍删减包含律 $\forall A,\; U(A) \subseteq A$ 的子集演化 $S_{n+1} = U(S_n)$，必在至多 $\lvert S_0\rvert$ 步内到达不动点 $S_N$（跃迁次数 $\le \lvert S_0\rvert$）——注意该定理的作用域严格限定于**有限集合上的单调子集删减映射**，绝不直接充当连续球面 $S^2$ 常微分方程的收敛性证明。
3. **两项显式非选支核验：为什么“线性 + 偏迹 + 捏合”跨不过“和 $\to$ 或”边界（`手工推导`）**：
   - **恒等非删减反例**：在 [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) 中取不淘汰任何分支的恒等更新 $U(A) = A$，包含条件 $U(A) \subseteq A$ 依然成立且序列在 $N = 0$ 步平凡“稳定”，但二元叠加支集 $S_0 = \{0, 1\}$ 永远停留在双支并存 $\{0, 1\}$，绝不会自行收缩为单点集 $\{0\}$ 或 $\{1\}$；
   - **对角假混合态捏合不动点核验**：取标志角 $\theta = 30^\circ$ 的已退相干对角态 $\rho_{30^\circ} = \operatorname{diag}(\frac{3}{4}, \frac{1}{4})$ 与计算基投影 $P_0 = \operatorname{diag}(1, 0),\; P_1 = \operatorname{diag}(0, 1)$。因非对角块恒为零 $P_0 \rho_{30^\circ} P_1 = P_1 \rho_{30^\circ} P_0 = 0$，由 [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff) 与 [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent) 立得

     $$
     \operatorname{unreadState}\bigl(P,\, \operatorname{diag}(3/4, 1/4)\bigr) \;=\; \operatorname{diag}(3/4, 1/4).
     $$

     这意味着无论把非选择性退相干捏合重复多少百万次，$\operatorname{diag}(\frac{3}{4}, \frac{1}{4})$ 都纹丝不动地停留在不动点上，永远不会变成纯态记录 $\operatorname{diag}(1, 0)$ 或 $\operatorname{diag}(0, 1)$！正如 [附录 D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2)（[@rem-appendix-d-puzzle-1]、[@rem-appendix-d-puzzle-2]）所立下的红线：线性薛定谔演化、偏迹与往返玻恩回声只给出了条件分支目录及其精确权重，若要从系综并列（`And`）进入单次实现（`Or`），必须显式引入一条**非线性吸引盆捕获或无偏随机选支动力学前提**（`MODEL`）。
:::

## 34.8.2 球面双稳态吸引盆与阈值分布敏感性：为什么对称性不足以推出玻恩定则 {#sec-ch34-20-2}

既然有限维自维持观察者的宏观指针（如神经集群放电稳态、铁磁畴翻转或超导磁通量子态，见 [§34.2](ch33-s02-self-sustaining-attractors.md)）在物理上不允许长期悬停在半死半活的赤道斜坡上，最自然的想法便是在布洛赫球面 $S^2$ 上引入一套**双稳态自指捕获流（bistable pointer capture flow）**（`MODEL`）：把北极 $+\mathbf{e}_z$（记录 `$0$`）与南极 $-\mathbf{e}_z$（记录 `$1$`）设为两座渐近稳定吸引子，中间由一条纬线分水岭 $z = \lambda \in (-1, 1)$ 隔开，令初态沿着球面梯度流落入南北两个吸引盆之一。

然而，恰恰在这里潜伏着量子基础文献中最容易踩空的陷阱：**“只要有南北对称的双稳态非线性吸引盆，是否就能顺理成章导出玻恩概率 $p_0 = \cos^2\theta$？”** 下面的精确球面流反例给出了斩钉截铁的否定回答——吸引盆负责制造非此即彼的离散二值化（`Or`），但究竟以什么概率落入北极盆，完全取决于分水岭阈值 $\lambda$ 的测度结构！

::: {.example #ex-ch34-bistable-born-countermodel title="球面双稳态指针捕获流与三种阈值测度对决：确定性阶跃、纵向均匀玻恩律与对称非玻恩反例"}
考察单量子比特布洛赫球面 $S^2 = \{\mathbf{n} = (x, y, z)^\top \in \mathbb{R}^3 \mid x^2 + y^2 + z^2 = 1\}$ 上沿观察者轴 $\mathbf{e}_z = (0, 0, 1)^\top$ 建立的双稳态切向向量场（`MODEL` + `手工推导`）：

$$
\dot{\mathbf{n}} \;=\; \kappa(z - \lambda)(\mathbf{e}_z - z\mathbf{n}), \qquad \kappa > 0, \qquad \lambda \in (-1, 1).
$$

我们先核验该流严格保持单位球面 $S^2$ 不变并分离出纵向闭式方程：在 $\lVert\mathbf{n}\rVert^2 = 1$ 上计算径向内积，有 $\mathbf{n}\cdot\dot{\mathbf{n}} = \kappa(z - \lambda)(z - z\lVert\mathbf{n}\rVert^2) = 0$，故速度场处处与 $S^2$ 相切；取第三分量即得纵向坐标 $z(t) = \mathbf{e}_z\cdot\mathbf{n}(t)$ 的自治常微分方程

$$
\dot{z} \;=\; \kappa(z - \lambda)(1 - z^2).
$$

在开区间 $\lambda \in (-1, 1)$ 下，该方程恰有三个平衡态集：北极 $z = +1$（线性化特征值 $\frac{d\dot{z}}{dz}\big\rvert_{z=+1} = -2\kappa(1 - \lambda) < 0$，渐近稳定吸引子）、南极 $z = -1$（$\frac{d\dot{z}}{dz}\big\rvert_{z=-1} = -2\kappa(1 + \lambda) < 0$，渐近稳定吸引子）以及分水岭纬圈 $z = \lambda$（$\frac{d\dot{z}}{dz}\big\rvert_{z=\lambda} = \kappa(1 - \lambda^2) > 0$，不稳定排斥分界面）。因此对任意初值 $z_0 = \cos(2\theta) = 2p_0 - 1 \in [-1, 1]$（其中 $p_0 = \cos^2\theta$）：当 $z_0 > \lambda$ 时轨迹单调上升收敛于北极记录 $z(\infty) = +1$；当 $z_0 < \lambda$ 时轨迹单调下降收敛于南极记录 $z(\infty) = -1$。现在固定初态倾角，逐一检视三种阈值分布假设给出的北极捕获率 $p_+(z_0) := \mathbb{P}\bigl(z(\infty) = +1 \mid z(0) = z_0\bigr)$：

1. **确定性零阈值（$\lambda \equiv 0$，无随机微观涨落）——退化为经典多数决阶跃函数**：
   固定赤道 $z = 0$ 为刚性分水岭时，捕获律退化为确定性阶跃：对一切 $z_0 > 0$（$\theta < 45^\circ$）恒有 $p_+^{\det}(z_0) = 1$；对一切 $z_0 < 0$（$\theta > 45^\circ$）恒有 $p_+^{\det}(z_0) = 0$；而在赤道 $\theta = 45^\circ$（$z_0 = 0$）处则停留在 $\dot{z} = 0$ 的不稳定平衡分界线上无法自行破缺。代入标志角立即暴露定性偏差：在 $\theta = 30^\circ$（$z_0 = +\frac{1}{2}$）处给出 $p_+^{\det}(+\frac{1}{2}) = 1 \neq \frac{3}{4}$；在 $\theta = 60^\circ$（$z_0 = -\frac{1}{2}$）处给出 $p_+^{\det}(-\frac{1}{2}) = 0 \neq \frac{1}{4}$。这证明**纯确定性对称双稳态流只会做“赢家通吃”的符号阈值切割，彻底抹杀了量子叠加的连续概率信息**。
2. **纵向均匀阈值（$\lambda \sim \mathrm{Unif}(-1, 1)$，密度 $f_{\mathrm{unif}}(\lambda) = \frac{1}{2}$）——精确复现玻恩平方律 $\cos^2\theta$**：
   当仪器—环境微观初态诱导的有效分水岭阈值 $\lambda$ 在 $[-1, 1]$ 上服从均匀分布（注意由阿基米德球冠定理，$S^2$ 上的旋转不变刘维尔面积元 $d\Omega = dz\,d\varphi$ 投射到任意轴向坐标 $z \in [-1, 1]$ 上恰好给出均匀边缘密度 $\frac{1}{2}\,dz$）时，边界事件 $\{\lambda = z_0\}$ 勒贝格测度为零，北极捕获事件等价于 $\{\lambda < z_0\}$，其累积分布函数一字不差还原往返玻恩权重：

   $$
   p_+^{\mathrm{unif}}(z_0) \;=\; F_\lambda(z_0) \;=\; \int_{-1}^{z_0} \frac{1}{2}\,d\lambda \;=\; \frac{1 + z_0}{2} \;=\; \frac{1 + \cos(2\theta)}{2} \;=\; \cos^2\theta \;=\; p_0.
   $$

3. **南北对称二次非均匀阈值（$f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$，$\lambda \in [-1, 1]$）——满足全部南北对称性却严格违背玻恩定则**：
   取偶函数概率密度 $f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$：它严格满足非负归一 $\int_{-1}^1 \frac{3}{2}\lambda^2\,d\lambda = \bigl[\frac{1}{2}\lambda^3\bigr]_{-1}^1 = 1$ 与南北镜像对称 $f_{\mathrm{quad}}(-\lambda) = f_{\mathrm{quad}}(\lambda)$。直接积分计算其北极捕获概率，得精确三次多项式律：

   $$
   p_+^{\mathrm{quad}}(z_0) \;=\; \int_{-1}^{z_0} \frac{3}{2}\lambda^2\,d\lambda \;=\; \left[\frac{\lambda^3}{2}\right]_{-1}^{z_0} \;=\; \frac{1 + z_0^3}{2}.
   $$

   在三处对称端点 $\theta = 0^\circ, 45^\circ, 90^\circ$（$z_0 = +1, 0, -1$），该模型给出 $1, \frac{1}{2}, 0$，与玻恩定则真假莫辨；然而一旦离开平凡对称点，在 $\theta = 30^\circ$（$z_0 = +\frac{1}{2},\; p_0 = \frac{3}{4}$）处即得

   $$
   p_+^{\mathrm{quad}}\Bigl(+\frac{1}{2}\Bigr) \;=\; \frac{1 + (1/2)^3}{2} \;=\; \frac{9}{16} \;\neq\; \frac{3}{4},
   $$

   而在 $\theta = 60^\circ$（$z_0 = -\frac{1}{2},\; p_0 = \frac{1}{4}$）处则得

   $$
   p_+^{\mathrm{quad}}\Bigl(-\frac{1}{2}\Bigr) \;=\; \frac{1 + (-1/2)^3}{2} \;=\; \frac{7}{16} \;\neq\; \frac{1}{4}.
   $$

   这一初等反例一锤定音地揭示：南北交换对称性 $p_+(-z_0) = 1 - p_+(z_0)$ 只能锁住赤道中点 $p_+(0) = \frac{1}{2}$；在这条纬线阈值规则下、且同一阈值律用于一切输入射线时，要让吸引盆捕获频率在全区间 $[-1, 1]$ 上恒等于 $p_0 = \frac{1 + z_0}{2}$，充要条件是有效阈值密度几乎处处满足 $f_\lambda(z) \equiv \frac{1}{2}$！这条充要性只属于这条选支规则：三结果的累积阈值规则下，不变律给出频率 $\frac{5}{9}, \frac{1}{3}, \frac{1}{9}$（输入 $p = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$），而某个非不变律反倒对一切输入都给出玻恩频率（`手工推导`）。
:::

## 34.8.3 无偏有界鞅与吸收马尔可夫链：命中概率锁定 $\cos^2\theta$ 与偏移漂移反例 {#sec-ch34-20-3}

如果把静态一次性抽样的阈值 $\lambda \sim \mathrm{Unif}(-1, 1)$ 展开成沿时间逐拍推进的连续或离散记录博弈，上述“纵向均匀测度”在随机过程语言中对应什么？先要说清一点：阈值流本身在有限时刻并不保持系综期望，也不是仿射流——对高度 $z$、横向分量相反的两条射线的混合，均匀阈值下的平均初速度是 $\kappa z(1 - z^2)$，而按权重 $(1 \pm z)/2$ 混合南北两极的系综密度矩阵相同，平均初速度却是 $0$；它只保证终态律等于捏合后的密度（`手工推导`）。逐拍保持系综期望的序贯过程要由另一条性质刻画：**无偏鞅性质（unbiased martingale property）——观察者在尚未看清最终分支之前，多步微弱证据更新过程不得凭空替任何一个分支伪造净漂移！**

设观察者对记录分支 `$0$` 持有的实时平方权重估计序列为 $(P_n)_{n \ge 0}$，初值由 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的往返双投影回声钉死在 $P_0 = p_0 = \cos^2\theta \in [0, 1]$，且吸收边界位于已定格的纯记录态 $\{0, 1\}$。若序列几乎必然在有限或渐近时间内收敛到二值终点 $P_\infty \in \{0, 1\}$，由于二值随机变量的期望就是其取 $1$ 的概率 $\mathbb{E}[P_\infty] = 1\cdot\mathbb{P}(P_\infty = 1) + 0\cdot\mathbb{P}(P_\infty = 0) = \mathbb{P}(P_\infty = 1)$，只要演化全程保持**条件期望零漂移** $\mathbb{E}[P_{n+1} \mid \mathcal{F}_n] = P_n$（有界鞅），有界收敛与可选停时定理立即锁死终态命中概率：

$$
\mathbb{P}\bigl(P_\infty = 1 \;\big\vert\; P_0 = \cos^2\theta\bigr) \;=\; \mathbb{E}\bigl[P_\infty \;\big\vert\; P_0 = \cos^2\theta\bigr] \;=\; P_0 \;=\; \cos^2\theta.
$$

换言之，只要微观选支噪声对当前平方权重 $P_n$ 严格无偏，无论中间走了多少步曲折路径、噪声方差随位置如何调制，吸收终点的统计频率都**别无选择地锁死在往返玻恩平方律 $\cos^2\theta$ 上**；反之，一旦过程混入哪怕一丝系统性净漂移（次鞅或超鞅），玻恩定则当场破缺。下面我们在五态有理格点上把这一对比逐项算穿：

::: {.example #ex-ch34-martingale-selection-benchmark title="五态吸收马尔可夫链选支基准：无偏鞅命中律对比有偏漂移破缺与五档特征角有理对账表"}
在步长网格 $\{p_j = \frac{j}{4} \mid j = 0, 1, 2, 3, 4\}$（$N = 4$）上考察离散吸收马尔可夫链（`MODEL` + `手工推导`）：端点 $j = 0$（$p_0 = 0$，对应南极记录 `$1$`）与 $j = 4$（$p_4 = 1$，对应北极记录 `$0$`）为吸收态；对每个内部格点 $j \in \{1, 2, 3\}$，单步以概率 $r \in (0, 1)$ 向北跳至 $j + 1$，以概率 $1 - r$ 向南跳至 $j - 1$。这组五格点恰好一一覆盖单比特五档标志倾角 $\theta \in \{0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$（其玻恩平方权重依次为 $1, \frac{3}{4}, \frac{1}{2}, \frac{1}{4}, 0$）。

1. **无偏鞅情形（$r = \frac{1}{2}$）：精确复现玻恩命中率 $h_j^{(1/2)} = \frac{j}{4}$ 与有限吸收步数 $j(4 - j)$**：
   当 $r = \frac{1}{2}$ 时，内部格点的单步条件期望满足严格鞅恒等式

   $$
   \mathbb{E}\bigl[P_{n+1} \;\big\vert\; P_n = p_j\bigr] \;=\; \frac{1}{2}\cdot\frac{j + 1}{4} + \frac{1}{2}\cdot\frac{j - 1}{4} \;=\; \frac{j}{4} \;=\; p_j.
   $$

   记从格点 $j$ 出发最终被 $j = 4$（记录 `$0$`）吸收的命中概率为 $h_j^{(1/2)}$，它满足二阶调和差分方程 $h_j^{(1/2)} = \frac{1}{2}\bigl(h_{j+1}^{(1/2)} + h_{j-1}^{(1/2)}\bigr)$ 及边界条件 $h_0^{(1/2)} = 0,\; h_4^{(1/2)} = 1$，唯一解为线性斜坡 $h_j^{(1/2)} = \frac{j}{4} = p_j = \cos^2\theta$。同时，记平均吸收步数为 $\tau_j$，由首步分解方程 $\tau_0 = \tau_4 = 0$ 与 $\tau_j = 1 + \frac{1}{2}(\tau_{j+1} + \tau_{j-1})$（$j = 1, 2, 3$），代入二次型验证 $\frac{1}{2}\bigl[(j+1)(3-j) + (j-1)(5-j)\bigr] + 1 = (4j - j^2 - 1) + 1 = j(4 - j)$，得精确闭式吸收时间

   $$
   \tau_j \;=\; j(4 - j), \qquad (\tau_0, \tau_1, \tau_2, \tau_3, \tau_4) \;=\; (0, 3, 4, 3, 0).
   $$

   赤道等幅叠加态（$\theta = 45^\circ,\; j = 2$）距离南北两极最远，决策耗时最长（$\tau_2 = 4$ 步）；偏斜叠加态（$\theta = 30^\circ, 60^\circ,\; j = 3, 1$）缩短至 $\tau_3 = \tau_1 = 3$ 步；而已对齐本征态（$\theta = 0^\circ, 90^\circ,\; j = 4, 0$）零步直达定态记录（$\tau_4 = \tau_0 = 0$）。
2. **有偏次鞅反例（$r = \frac{2}{3},\; 1 - r = \frac{1}{3}$）：非零净漂移摧毁玻恩比例**：
   若选支机制偏向北极（$r = \frac{2}{3}$），单步条件漂移为 $\mathbb{E}[P_{n+1} - P_n \mid P_n = p_j] = \frac{2r - 1}{4} = +\frac{1}{12} > 0$。此时命中方程 $h_j^{(2/3)} = \frac{2}{3}h_{j+1}^{(2/3)} + \frac{1}{3}h_{j-1}^{(2/3)}$ 的特征根比为 $\frac{1 - r}{r} = \frac{1}{2}$，配合 $h_0^{(2/3)} = 0,\; h_4^{(2/3)} = 1$ 解得闭式公式

   $$
   h_j^{(2/3)} \;=\; \frac{1 - \bigl(\frac{1 - r}{r}\bigr)^j}{1 - \bigl(\frac{1 - r}{r}\bigr)^4} \;=\; \frac{1 - 2^{-j}}{1 - 2^{-4}} \;=\; \frac{16\bigl(1 - 2^{-j}\bigr)}{15}.
   $$

   逐格核算内部三点：$j = 1$（$\theta = 60^\circ$）给出 $h_1^{(2/3)} = \frac{16(1 - 1/2)}{15} = \frac{8}{15} \neq \frac{1}{4}$；$j = 2$（$\theta = 45^\circ$）给出 $h_2^{(2/3)} = \frac{16(1 - 1/4)}{15} = \frac{12}{15} = \frac{4}{5} \neq \frac{1}{2}$；$j = 3$（$\theta = 30^\circ$）给出 $h_3^{(2/3)} = \frac{16(1 - 1/8)}{15} = \frac{14}{15} \neq \frac{3}{4}$。
3. **五档特征倾角下的确定性阈值、非均匀吸引盆、无偏鞅与有偏链全有理对账表**：

| 射线角 $\theta$ | 布洛赫角 $2\theta$ | 纵向坐标 $z_0 = \cos(2\theta)$ | 往返权重 $p_0 = \cos^2\theta$（格点 $j$） | 确定性 $\lambda = 0$ | 二次密度 $f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$ | 无偏鞅命中率 $h_j^{(1/2)}$（步数 $\tau_j$） | 有偏链 $r = \frac{2}{3}$ 命中率 $h_j^{(2/3)}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$0^\circ$** | $0^\circ$ | $+1$ | $1$（$j = 4$） | $1$ | $1$ | $1$（$\tau_4 = 0$） | $1$ |
| **$30^\circ$** | $60^\circ$ | $+\frac{1}{2}$ | $\frac{3}{4}$（$j = 3$） | $1$ | $\frac{9}{16}$ | $\frac{3}{4}$（$\tau_3 = 3$） | $\frac{14}{15}$ |
| **$45^\circ$** | $90^\circ$ | $0$ | $\frac{1}{2}$（$j = 2$） | 鞍点未决 | $\frac{1}{2}$ | $\frac{1}{2}$（$\tau_2 = 4$） | $\frac{4}{5}$ |
| **$60^\circ$** | $120^\circ$ | $-\frac{1}{2}$ | $\frac{1}{4}$（$j = 1$） | $0$ | $\frac{7}{16}$ | $\frac{1}{4}$（$\tau_1 = 3$） | $\frac{8}{15}$ |
| **$90^\circ$** | $180^\circ$ | $-1$ | $0$（$j = 0$） | $0$ | $0$ | $0$（$\tau_0 = 0$） | $0$ |

这张纯有理数对照表把两条核心结论刻画得一目了然：在纬线阈值规则下、且同一阈值律用于一切输入时，唯有**纵向均匀分水岭测度**（在静态吸引盆图像中）做得到；在序贯证据累积图像中，**零漂移有界鞅律**等价于每一拍的条件权重都给出玻恩概率，可只要求终态频率时它并不必要：取 $a = p(1-p)$，第一拍令 $W(1) = p \pm a$（正负号等概率），第二拍起按概率 $p$ 独立抽取记录，从制备起的两步未读演化都是捏合信道（完全正、保迹、仿射），终态频率仍为 $p$，而 $\mathbb{E}[W(2) \mid \mathcal{F}_1] = p \neq W(1)$（`手工推导`）。两条途径都能在把连续叠加压缩为二值单次记录的同时，把 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的往返平方回声 $\cos^2\theta$ 分毫不差地兑现为长期观测频率。
:::

## 34.8.4 条件量子轨迹文献脉络与单次结果物理实现的开放前沿 {#sec-ch34-20-4}

在当代开放量子系统与量子测量理论中，上述“未读系综服从线性主方程、条件单次轨迹构成有界鞅”的双层结构并非孤立玩具，而是连续弱测量与动力学坍缩纲领共同交汇的数学脊梁：

::: {.remark #rem-ch34-conditioned-trajectory-literature title="退相干边界、连续测量条件随机主方程与动力学坍缩模型的文献坐标（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将本节球面吸引盆与有界鞅选支模型对照现代量子基础文献时，需明确区分以下三脉研究成果及其形式边界：

1. **环境退相干与假混合态的认识论边界**：M. Schlosshauer（*Rev. Mod. Phys.* **76**, 1267–1305, 2004；DOI: `10.1103/RevModPhys.76.1267`）系统总结了环境诱导超选择（einselection）如何筛出稳定的指针基并抹去局部约化态的非对角干涉项，同时明确指出：由于“系统 $+$ 仪器 $+$ 环境”联合态在线性薛定谔演化下仍为全局叠加纯态，偏迹所得约化密度矩阵仅是**假混合态（improper mixture）**，退相干本身并不单独解决单次测量结果选支问题（与本书 [附录 D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)–[§D.2.2](appendix-d.md#sec-appendix-d-puzzle-2) 及 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的边界声明严格一致）。
2. **连续量子测量与条件轨迹的无偏鞅机制**：K. Jacobs 与 D. A. Steck（*Contemp. Phys.* **47**, 279–303, 2006；DOI: `10.1080/00107510601101934`）在连续弱测量与量子轨迹导论中证明，对可观测量投影族 $\{\Pi_k\}$ 实施连续高斯监测时，以探测器记录流条件化的后验密度矩阵满足非线性随机主方程（SME），其对角玻恩权重过程 $p_k(t) = \operatorname{Tr}(\rho_c(t)\Pi_k)$ 在二值测量情形满足零漂移伊藤随机微分方程 $dp_k \propto p_k(1 - p_k)\,dW_t$——这正是 [@ex-ch34-martingale-selection-benchmark] 离散无偏鞅的连续时间原型：一方面乘积因子 $p_k(1 - p_k)$ 将纯记录端点 $p_k \in \{0, 1\}$ 锁定为吸引不动点，另一方面零漂移鞅守恒 $\mathbb{E}[p_k(t)] = p_k(0)$ 确保最终吸收概率严格等于初始玻恩权重 $\cos^2\theta$，且对全部测量记录求经典期望后精确退回线性的林德布拉德（Lindblad）未读演化，从而严格遵守无超光速信令约束。
3. **客观动力学坍缩纲领与非线性无信令约束**：A. Bassi, K. Lochan, S. Satin, T. P. Singh 与 H. Ulbricht（*Rev. Mod. Phys.* **85**, 471–527, 2013；DOI: `10.1103/RevModPhys.85.471`）综述了 GRW、连续自发定域化（CSL）与引力诱导坍缩模型及其宏观干涉实验检验界限，并强调了一条关键结构定理：若脱离恰当匹配的随机鞅噪声而直接引入确定性非线性薛定谔项（如 [@ex-ch34-bistable-born-countermodel] 中的纯确定性流），不仅会扭曲玻恩统计权重，还会破坏密度矩阵等价类而诱发超光速信令（Gisin 定理）；唯有让非线性漂移与布朗噪声精确配成保持未读主方程线性的鞅结构，单次定域化与相对论无信令才能共存。
:::

至此，我们把 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 的二次往返回声 $\cos^2\theta$ 稳稳送达了观察者的离散记录寄存器：往返双投影铸造出唯一无相位偏私的初始平方标尺 $P_0 = \cos^2\theta$，而沿观察者轴线的纵向均匀吸引盆（在纬线阈值规则下、阈值律与输入无关时，它只锁定终态频率，有限时刻的系综平均会移动）或另一条途径——零漂移有界鞅更新（每一拍都保持系综期望）——则在不改变终态记录频率的前提下（`手工推导`），把这枚连续权重兑现为非此即彼的单次经典记录。与此同时，遵循本书一贯的诚实标定准则，我们将单次选支背后尚未闭合的终极物理追问明确立为开放问题：

::: {.problem #prob-ch34-single-outcome-realization title="单次记录选支的微观物理机制、无偏测度非循环起源与嵌套维格纳朋友相容性"}
在完备闭合“从平方权重到单次经典记录”的物理地基时，以下三项核心问题在本书形式化体系与当代物理学中仍属未决开放前沿（`OPEN`）：

1. **单次选支的微观物理实现机制**：实验室单次测量中的有效随机阈值 $\lambda$ 或维纳新息 $dW_t$，究竟仅仅是受限观察者对未追踪环境/视界自由度作条件粗粒化后的有效描述（此时全宇宙联合态仍严格幺正演化），还是源自超越标准线性薛定谔演化的基本微观随机坍缩定律？两类纲领在宏观物质波干涉与光力学精密实验中的可证伪偏离界限何在？
2. **纵向均匀测度与零漂移鞅的非循环第一性原理起源**：在完全不预先假定外部环境系综已服从玻恩概率测度或球面旋转不变刘维尔先验的前提下，能否仅凭纯离散组合比较图与自指一致性，非循环地唯一推出有效分水岭测度必为纵向均匀分布 $\mathrm{Unif}(-1, 1)$（或更新过程必为零漂移鞅）？
3. **多级嵌套观测链中的跨视界客观性**：在扩展维格纳朋友协议（[附录 D §D.2.1](appendix-d.md#sec-appendix-d-puzzle-1)）中，当内部观察者已完成吸引盆捕获并写入单次记录，而外部超观察者仍保有对整个实验室连同记录寄存器的联合相干操控能力时，如何在无外部第三点 $C$ 的关系几何中给出兼容相对论因果结构的统一协变公理？
:::

单次记录一旦落定，观察者与世界的故事并没有在“被动拍下一张快照”处戛然而止。恰恰相反，一位真实存活于宇宙关系网中的具身观察者，之所以要耗费热力学代价去读取并定格一条局部记录（`Observe / Read`），正是为了凭这枚新鲜出炉的坐标锚点，在自己受格拉姆窗口 $\mathcal{W}_M$（[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）约束的可行走廊 $\Omega_M$ 内主动拨动下一拍的自我基轴 $\mathbf{I}_t \mapsto \mathbf{I}_{t+1}$（`Act / Write`）！下面让我们推开 [§34.9](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 的大门，见证被动观测与主动干预如何咬合成完整的**感知—行动—和乐闭环**。
