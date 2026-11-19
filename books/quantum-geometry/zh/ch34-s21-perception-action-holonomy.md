# 34.9 感知—行动闭环：格拉姆走廊内的因果干预、受约束控制与锚定和乐 {#sec-ch34-perception-action-holonomy}

> 倘若观察者只会沿着固定基轴 $\mathbf{I}$ 被动接收往返回声（`Observe / Read`），他至多只是宇宙影院里一台无法转头的胶片相机；唯有当单次记录（[§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)）反过来驱动观察者在格拉姆可行走廊 $\Omega_M$（[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）内沿极小圆弧主动拨动探针或重写外态（`Act / Write`），观测与行动才在锚定相位和乐中咬合成真正活着的**具身自指观察主体**。

在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 与 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins) 中，我们打通了从双程投影模平方 $\cos^2\theta$ 到单次经典记录定格的完整**读入半环（`Observe / Read`）**。然而，在自包含关系宇宙里，“读”从来不是单向悬空的终点：每一次测量之所以能区分真实物理转向与纯粹数学坐标重命名，恰恰因为观察者手握能够相对于**保持不动的外部目标锚点**主动转动自身基轴 $\mathbf{I}_t$（或对偶地对目标实施受控态制备）的**写出半环（`Act / Write`）**。

本节的任务，就是把“被动观测”与“主动因果干预”放在同一张算子迹账本与格拉姆窗口几何上严格对偶化：首先立下区分五种读写与换标架操作的形式契约；继而用 $2\times 2$ 单量子比特显式演算证明因果干预与被动共同换标架的操作鸿沟，并给出等富比尼—施图迪控制弧长下的生成模型选言基准；随后揭示格拉姆窗口 $\mathcal{W}_M$ 如何对双轴有限旋转控制施加两类截然不同的拓扑与维数阻塞；最后用锚定生成树相位分类定理锁定完整感知—行动闭环的规范不变和乐坐标。

## 34.9.1 读写对偶契约：被动观测（`Observe / Read`）、主动干预（`Act / Write`）与共同标架变换的操作判据 {#sec-ch34-21-1}

为什么在没有外部绝对参考系 $C$ 的宇宙中，“观察者主动转动测量仪器”与“在纸面上给希尔伯特空间换一组正交基”具有截然不同的物理后果？关键在于**是否保留至少一枚未被同步共轭旋转的外部锚点**。我们将具身观察者在离散控制拍 $t \in \mathbb{N}$ 上的闭环运行状态记为四元组 $(\rho_t, \mathbf{I}_t, \mathcal{W}_M, t)$——其中 $\rho_t$ 为目标系统密度态，$\mathbf{I}_t$（对应投影族 $P(\mathbf{I}_t)$）为观察者当前的探针基轴，$\mathcal{W}_M$ 为保存近期 $M$ 枚因果锚点的滑动格拉姆窗口（[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）。下方形式契约将读写对偶与先后次序不可交换性精确锚定：

::: {.remark #rem-ch34-perception-action-contract title="闭环感知—行动状态四元组、迹拉回读写对偶与五类操作判据契约"}
在相对于保持固定的外部目标态或外部基准检偏器定义因果干预时，本节建立以下闭环操作模型与形式判据（`MODEL` + `LEAN ✓`）：

1. **闭环状态元组与薛定谔—海森堡读写迹对偶（`MODEL` + `LEAN ✓`）**：在每一控制拍 $t$，观察者围绕状态元组 $(\rho_t, \mathbf{I}_t, \mathcal{W}_M, t)$ 执行两类互补耦合——在**读入相（`Observe / Read`）**，固定当前轴 $\mathbf{I}_t$ 读取关于外部状态 $\rho_t$ 的玻恩分布并写入条件记录；在**写出相（`Act / Write`）**，依据既有记录选择控制动作 $u_t$，相对于**保持固定的外部目标 $\rho_t$** 主动旋转仪器基轴 $\mathbf{I}_t \mapsto \mathbf{I}_{t+1}$，或相对于**保持固定的外部检偏器 $P$** 驱动受控信道 $\rho_t \mapsto \mathcal{E}_{u_t}(\rho_t)$。冻结定理 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)（`LEAN ✓`）锁死了两者的精确代数对偶：凡满足单步迹对偶 $\operatorname{Tr}\bigl(\mathcal{E}(\rho)\cdot E\bigr) = \operatorname{Tr}\bigl(\rho\cdot \mathcal{E}^\dagger(E)\bigr)$ 的量子信道 $\mathcal{E}$ 与海森堡伴随映射 $\mathcal{E}^\dagger$，对任意步数 $t \in \mathbb{N}$ 恒满足

   $$
   \operatorname{Tr}\Bigl(\mathcal{E}^t(\rho)\cdot E\Bigr) \;=\; \operatorname{Tr}\Bigl(\rho\cdot (\mathcal{E}^\dagger)^t(E)\Bigr).
   $$

   这表明“把目标态向前推进 $t$ 步再去碰固定探针”与“保持目标态不动而把观察者探针效应逆向拉回 $t$ 步”在无坐标迹配对上严格等价；但若把状态与探针**按同一幺正变换同步共轭旋转**，相对夹角保持不变，根本不构成物理行动！
2. **信念修正与读写先后冲突的内禀非对易性（`LEAN ✓`）**：一旦感知读入与行动写出交替作用，先后次序便不可随意颠倒。概念动力学中的修正冲突非对易定理 [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)（`LEAN ✓`）在三元状态集 `Fin 3 = {0, 1, 2}` 上给出了最精炼的离散原型：对优先交集修正算子 $\operatorname{revision}_P(A) := \text{if } (A \cap P \neq \emptyset) \text{ then } A \cap P \text{ else } P$，取初始信念 $A = \{0\}$ 与两项冲突约束 $P = \{1, 2\},\; Q = \{0, 1\}$，内核严格证得 $\operatorname{revision}_P(A) = \{1, 2\}$、$\operatorname{revision}_Q(A) = \{0\}$，从而

   $$
   \operatorname{revision}_Q\bigl(\operatorname{revision}_P(A)\bigr) \;=\; \{1\} \;\neq\; \{1, 2\} \;=\; \operatorname{revision}_P\bigl(\operatorname{revision}_Q(A)\bigr).
   $$

   在量子闭环中，“先捏合读入再幺正写出”与“先幺正写出再捏合读入”同样因相干项擦除时机不同而交出截然不同的终端分布。
3. **五类读写与换标架操作的严格对账表（`MODEL`）**：

| 操作类别 | 保持固定的外部锚点 | 状态与效应变换规则 | 可观测迹读数变化 | 冯·诺依曼熵与因果地位 |
| :--- | :--- | :--- | :--- | :--- |
| **`unread READ`（未读捏合读入）** | 外部测量基 $P = \{P_k\}$ 固定 | $(\rho, P) \mapsto \bigl(\sum_k P_k \rho P_k,\, P\bigr)$ | 当前基读数 $\operatorname{Tr}(\rho P_k)$ 不变；互补基相干擦除 | 熵单调不减 $S(\rho') \ge S(\rho)$；非选择性去相干 |
| **`conditioned READ`（条件选支读入）** | 外部测量基 $P = \{P_k\}$ 固定 | $(\rho, P) \mapsto \bigl(\frac{P_k \rho P_k}{\operatorname{Tr}(\rho P_k)},\, P\bigr)$（概率 $p_k$） | 单次记录锁定为分支 $k$（后验复测概率 $1$） | 条件纯化更新；驱动感知后验写入记忆窗 |
| **`physical apparatus WRITE`（仪器基主动转向）** | 外部目标态 $\rho$ 保持固定 | $(\rho, P) \mapsto \bigl(\rho,\, U P U^\dagger\bigr)$ | 读数变为 $\operatorname{Tr}(\rho\,U P U^\dagger)$，随相对倾角改变 | 目标态熵 $S(\rho)$ 不变；主动重定向探针视角 |
| **`dual state preparation WRITE`（受控态制备写出）** | 外部检偏器 $P$ 保持固定 | $(\rho, P) \mapsto \bigl(\mathcal{E}_u(\rho),\, P\bigr)$（幺正或耗散重置） | 读数变为 $\operatorname{Tr}(\mathcal{E}_u(\rho) P) = \operatorname{Tr}(\rho\,\mathcal{E}_u^\dagger(P))$ | 幺正控制保熵；耗散重置降熵并向热浴排热 |
| **`common frame conjugation`（共同标架共轭）** | 无固定外锚（纯坐标重命名） | $(\rho, P) \mapsto \bigl(U\rho U^\dagger,\, U P U^\dagger\bigr)$ | 恒等抵消 $\operatorname{Tr}(U\rho U^\dagger \cdot U P U^\dagger) = \operatorname{Tr}(\rho P)$ | 全部物理可观测量与谱不变量零变化（非干预） |
:::

## 34.9.2 因果干预对比被动换标架：单比特精确算例与等长测地控制下的生成模型选言 {#sec-ch34-21-2}

为了把上表五栏边界锤炼成毫无歧义的硬核代数，我们立即在单量子比特空间上执行两组闭式验算：第一组逐号核对绕 $y$ 轴旋转算符 $R_y(\alpha)$ 在状态侧、效应侧与共同标架侧的正负号分岔及读写不可交换性；第二组展示当两条候选控制圆弧具有**完全相等的富比尼—施图迪（Fubini–Study）测地长度**时，观察者如何凭借内部生成参考模型在对称行动间做出确定选言：

::: {.example #ex-ch34-intervention-versus-frame title="单比特因果干预正负号精算、重置破盲与读写非对易性，以及等控制弧长下的生成交叉熵选言算例"}
本算例分两部分对单量子比特感知—行动耦合做精确解析核算（`手工推导` + `MODEL`）：

1. **$2\times 2$ 矩阵干预对比共同换标架、最大混合态幺正盲区与读写次序非对易性（`手工推导`）**：
   取初始目标纯态 $\rho = \frac{1}{2}(\mathbf{1} + \sigma_x) = \lvert +\rangle\langle +\rvert = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$、观察者北极投影算符 $P = \frac{1}{2}(\mathbf{1} + \sigma_z) = \lvert 0\rangle\langle 0\rvert = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$（初始基线读数 $\operatorname{Tr}(\rho P) = \frac{1}{2}$），以及绕 $y$ 轴旋转角 $\alpha \in \mathbb{R}$ 的幺正旋子

   $$
   U(\alpha) \;=\; R_y(\alpha) \;=\; \exp\Bigl(-i\frac{\alpha}{2}\sigma_y\Bigr) \;=\; \begin{pmatrix} \cos(\alpha/2) & -\sin(\alpha/2) \\ \sin(\alpha/2) & \cos(\alpha/2) \end{pmatrix}.
   $$

   直接做矩阵乘法可得 $U(\alpha)\lvert +\rangle = \frac{1}{\sqrt{2}}\bigl(\cos\frac{\alpha}{2} - \sin\frac{\alpha}{2},\; \sin\frac{\alpha}{2} + \cos\frac{\alpha}{2}\bigr)^\top$ 与 $U(\alpha)\lvert 0\rangle = \bigl(\cos\frac{\alpha}{2},\; \sin\frac{\alpha}{2}\bigr)^\top$，即 $U(\alpha)\sigma_x U(\alpha)^\dagger = \cos\alpha\,\sigma_x - \sin\alpha\,\sigma_z$ 且 $U(\alpha)\sigma_z U(\alpha)^\dagger = \cos\alpha\,\sigma_z + \sin\alpha\,\sigma_x$。逐项核验四项核心判据：
   - **前向态干预与海森堡拉回精确同号，仪器前向旋转反号对称**：固定 $P$ 对态施以 $U(\alpha)\rho U(\alpha)^\dagger$，与固定 $\rho$ 对效应施以海森堡拉回 $U(\alpha)^\dagger P U(\alpha) = \frac{1}{2}(\mathbf{1} + \cos\alpha\,\sigma_z - \sin\alpha\,\sigma_x)$，给出完全相等的读数（印证 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)）：

     $$
     \operatorname{Tr}\bigl(U(\alpha)\rho U(\alpha)^\dagger P\bigr) \;=\; \operatorname{Tr}\bigl(\rho\,U(\alpha)^\dagger P U(\alpha)\bigr) \;=\; \frac{1}{2}\Bigl(\cos\frac{\alpha}{2} - \sin\frac{\alpha}{2}\Bigr)^2 \;=\; \frac{1 - \sin\alpha}{2};
     $$

     反之，固定外部态 $\rho$ 而将物理仪器轴正向旋至 $U(\alpha) P U(\alpha)^\dagger$（或对偶地对态施以逆向制备 $U(\alpha)^\dagger \rho U(\alpha)$），则给出镜像读数 $\operatorname{Tr}(\rho\,U(\alpha) P U(\alpha)^\dagger) = \operatorname{Tr}(U(\alpha)^\dagger \rho U(\alpha) P) = \frac{1 + \sin\alpha}{2}$（例如 $\alpha = \frac{\pi}{2}$ 时前者归零为 $0$，后者饱和为 $1$）。
   - **共同标架旋转恒等抵消**：若不固定任何外锚而将 $\rho$ 与 $P$ 同步共轭旋转，则利用 $U(\alpha)^\dagger U(\alpha) = \mathbf{1}$ 恒有

     $$
     \operatorname{Tr}\Bigl(\bigl(U(\alpha)\rho U(\alpha)^\dagger\bigr)\bigl(U(\alpha) P U(\alpha)^\dagger\bigr)\Bigr) \;=\; \operatorname{Tr}(\rho P) \;=\; \frac{1}{2}, \qquad \forall \alpha \in \mathbb{R},
     $$

     可观测概率纹丝不动！
   - **最大混合态 $\rho_{\mathrm{mix}} = \frac{1}{2}\mathbf{1}$ 的幺正不变性与耗散重置破盲**：若外部态完全退化为球心最大混合态 $\rho_{\mathrm{mix}} = \frac{1}{2}\mathbf{1}$，则一切幺正转动均留其不动（$U(\alpha)\frac{\mathbf{1}}{2}U(\alpha)^\dagger = \frac{\mathbf{1}}{2}$），一切仪器轴转向亦恒读 $\operatorname{Tr}(\frac{\mathbf{1}}{2} U(\alpha) P U(\alpha)^\dagger) = \frac{1}{2}$；此时唯有非幺正**态制备重置 `Write` 信道** $\mathcal{R}_0(\sigma) := \operatorname{Tr}(\sigma)\lvert 0\rangle\langle 0\rvert$（伴随至少 $k_{\mathrm{B}}T\ln 2$ 的兰道尔环境排热，见 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）能打破球对称盲区，将读数推至 $\operatorname{Tr}(\mathcal{R}_0(\rho_{\mathrm{mix}}) P) = 1 \neq \frac{1}{2}$。
   - **`Read` 与 `Write` 复合次序非对易**：记未读 $Z$ 捏合为 $\mathcal{P}_Z(\sigma) = P\sigma P + (\mathbf{1} - P)\sigma(\mathbf{1} - P)$、幺正写出为 $\mathcal{U}_\alpha(\sigma) = U(\alpha)\sigma U(\alpha)^\dagger$。先 `Read` 后 `Write` 时，$\mathcal{P}_Z(\rho) = \frac{1}{2}\mathbf{1}$ 先一步抹去横向相干，导致后续幺正控制空转，$\operatorname{Tr}\bigl(\mathcal{U}_\alpha(\mathcal{P}_Z(\rho)) P\bigr) = \frac{1}{2}$；先 `Write` 后 `Read` 时，$\mathcal{U}_\alpha(\rho)$ 先把 $\sigma_x$ 相干翻入 $\sigma_z$ 轴再定格记录，$\operatorname{Tr}\bigl(\mathcal{P}_Z(\mathcal{U}_\alpha(\rho)) P\bigr) = \frac{1 - \sin\alpha}{2}$（如 $\alpha = -\frac{\pi}{2}$ 时给出 $1 \neq \frac{1}{2}$，与离散信念修正 [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation) 遥相呼应）。

2. **有限二选一行动与生成参考模型交叉熵差额 $\frac{1}{4}\ln 3$ 的逐步推导（`MODEL` + `手工推导`）**：
   设外部目标保持在 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins) 标志角 $\theta = 30^\circ$ 对应的固定对角态 $\rho_{\mathrm{ext}} = \operatorname{diag}(\frac{3}{4}, \frac{1}{4}) = \frac{1}{2}(\mathbf{1} + \frac{1}{2}\sigma_z)$（纵向极化度 $r_z = \frac{3}{4} - \frac{1}{4} = \frac{1}{2}$），观察者内部持有对齐北极稳态的生成偏好参考分布 $p_{\mathrm{ref}} = (p_{\mathrm{ref}}(0),\, p_{\mathrm{ref}}(1)) = (\frac{3}{4}, \frac{1}{4})$。观察者当前探针基轴位于赤道正交方向 $\beta_0 = \frac{\pi}{2}$（$\mathbf{I}_0 = \mathbf{e}_x$），现需在 $xz$ 子午面内从两项对称转向控制动作 $u_+ : \beta_0 \mapsto \beta_+ = \frac{\pi}{3}$ 与 $u_- : \beta_0 \mapsto \beta_- = \frac{2\pi}{3}$ 中择一执行（其中 $\beta \in [0, \pi]$ 表示探针投影算符 $P(\beta) = \frac{1}{2}(\mathbf{1} + \sin\beta\,\sigma_x + \cos\beta\,\sigma_z)$ 的布洛赫极角）：
   - **完全相等的富比尼—施图迪控制弧长**：由于纯态投影间的富比尼—施图迪测地距离等于布洛赫球大圆夹角之半，两项候选动作消耗的几何控制弧长严格相等：

     $$
     d_{\mathrm{FS}}(\beta_0, \beta_+) \;=\; \frac{1}{2}\left\lvert\frac{\pi}{3} - \frac{\pi}{2}\right\rvert \;=\; \frac{\pi}{12} \;=\; \frac{1}{2}\left\lvert\frac{2\pi}{3} - \frac{\pi}{2}\right\rvert \;=\; d_{\mathrm{FS}}(\beta_0, \beta_-).
     $$

   - **预测读出分布与 $\frac{1}{4}\ln 3$ 交叉熵差额**：在动作 $\beta$ 下对固定外态 $\rho_{\mathrm{ext}}$ 执行测量的预测结果为 $q_\beta(0) = \operatorname{Tr}(\rho_{\mathrm{ext}} P(\beta)) = \frac{1 + r_z\cos\beta}{2}$ 与 $q_\beta(1) = 1 - q_\beta(0)$。分别代入 $\cos\frac{\pi}{3} = +\frac{1}{2}$ 与 $\cos\frac{2\pi}{3} = -\frac{1}{2}$，得

     $$
     q_{\pi/3} \;=\; \Bigl(\frac{1 + \frac{1}{4}}{2},\, \frac{1 - \frac{1}{4}}{2}\Bigr) \;=\; \Bigl(\frac{5}{8},\, \frac{3}{8}\Bigr), \qquad q_{2\pi/3} \;=\; \Bigl(\frac{1 - \frac{1}{4}}{2},\, \frac{1 + \frac{1}{4}}{2}\Bigr) \;=\; \Bigl(\frac{3}{8},\, \frac{5}{8}\Bigr).
     $$

     对照生成参考分布 $p_{\mathrm{ref}} = (\frac{3}{4}, \frac{1}{4})$ 逐步展开离散交叉熵 $H_\times(q_\beta, p_{\mathrm{ref}}) := -\sum_{o \in \{0, 1\}} q_\beta(o)\ln p_{\mathrm{ref}}(o)$：

     $$
     \begin{aligned}
     H_\times\bigl(q_{\pi/3}, p_{\mathrm{ref}}\bigr) &\;=\; -\frac{5}{8}\ln\frac{3}{4} - \frac{3}{8}\ln\frac{1}{4} \;=\; \ln 4 - \frac{5}{8}\ln 3, \\
     H_\times\bigl(q_{2\pi/3}, p_{\mathrm{ref}}\bigr) &\;=\; -\frac{3}{8}\ln\frac{3}{4} - \frac{5}{8}\ln\frac{1}{4} \;=\; \ln 4 - \frac{3}{8}\ln 3, \\
     \Delta H_\times \;:=\; H_\times\bigl(q_{2\pi/3}, p_{\mathrm{ref}}\bigr) - H_\times\bigl(q_{\pi/3}, p_{\mathrm{ref}}\bigr) &\;=\; \Bigl(\frac{5}{8} - \frac{3}{8}\Bigr)\ln 3 \;=\; \frac{1}{4}\ln 3 \;>\; 0.
     \end{aligned}
     $$

     更有甚者，由于 $q_{\pi/3} = (\frac{5}{8}, \frac{3}{8})$ 与 $q_{2\pi/3} = (\frac{3}{8}, \frac{5}{8})$ 互为二元置换，两者的香农模糊度熵严格相等 $H(q_{\pi/3}) = H(q_{2\pi/3})$，故相对熵偏差 $D_{\mathrm{KL}}(q_{2\pi/3}\parallel p_{\mathrm{ref}}) - D_{\mathrm{KL}}(q_{\pi/3}\parallel p_{\mathrm{ref}})$ 亦分毫不差等于 $\frac{1}{4}\ln 3$——尽管两支动作在球面上迈出的测地步长同为 $\frac{\pi}{12}$，生成模型依然无歧义地选出朝北偏转的行动 $u_+$（$\beta_+ = \frac{\pi}{3}$）！
:::

## 34.9.3 双轴有限旋转生成、最小记录时间界与格拉姆走廊双重拓扑阻塞 {#sec-ch34-21-3}

确定了目标方向之后，具身观察者究竟能否随时随地把自身基轴 $\mathbf{I}_t$ 沿着球面极小圆弧顺畅拨到位？如果脱离记忆约束孤立地看三维旋转群 $\mathrm{SO}(3)$，两根不平行控制轴生成的极小圆弧字足以走遍全球面每一处角落；然而一旦把主动控制放回 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 的有限滑动格拉姆窗口 $\mathcal{W}_M$ 之内，能量速度下界、球面连通性割裂与三维环境空间秩饱和便会联手筑起受约束控制的几何护栏：

::: {.example #ex-ch34-gram-corridor-reachability title="双轴有限旋转可达性、正交记录时间下界与格拉姆走廊的两类几何阻塞算例"}
我们将无约束双轴圆弧合成、有限能量转向时间下界与保留历史重叠约束下的两类不可达阻塞并置核算（`LEAN ✓` + `手工推导`）：

1. **无约束球面上的双轴有限圆弧字满生成与随动轴不变性（`LEAN ✓`）**：
   在三维欧氏方向空间 $\mathbb{R}^3$ 上，双轴有限旋转定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) 严格证明：只要两根控制轴 $\mathbf{a}, \mathbf{b} \in \mathbb{R}^3$ 不共线（严格柯西—施瓦茨不等式 $\langle\mathbf{a}, \mathbf{b}\rangle_{\mathbb{R}}^2 < \lVert\mathbf{a}\rVert^2 \lVert\mathbf{b}\rVert^2$），任意正常三维旋转 $R \in \mathrm{SO}(3)$ 都**无需取无穷拓扑闭包近似**，即可精确分解为绕 $\mathbf{a}$ 与绕 $\mathbf{b}$ 的圆弧旋转组成的**有限字乘积**（字母取自 $\operatorname{axisCircle}(\mathbf{a}) \cup \operatorname{axisCircle}(\mathbf{b})$）；配套的随动轴不变性定理 [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance) 进一步证明，凡沿着 $\mathrm{SO}(3)$ 轨道在随动局部轴 $\operatorname{axisCircle}(O\mathbf{a}) \cup \operatorname{axisCircle}(O\mathbf{b})$ 下保持不变的二元几何量，必自动享有全局 $\mathrm{SO}(3)$ 刚体旋转不变性。
2. **正交目标区分的富比尼—施图迪记录时间下界（`LEAN ✓`）**：
   即便路径在几何上畅通无阻，物理控制也无法瞬时跳变。富比尼—施图迪记录时间下界定理 [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 证明：在复内积空间中，设初始单位参考态 $a$ 需在时间 $\tau$ 内备选转向两支正交目标记录态 $m_0 \perp m_1$（$\langle m_0, m_1\rangle_{\mathbb{C}} = 0$，故富比尼—施图迪角距离 $d_{\mathrm{FS}}(m_0, m_1) = \frac{\pi}{2}$）；在显式双向速度上界假设 $d_{\mathrm{FS}}(a, m_0) \le \frac{E\tau}{\hbar}$ 与 $d_{\mathrm{FS}}(a, m_1) \le \frac{E\tau}{\hbar}$（$E > 0,\; \hbar > 0$）下，由球面三角不等式 $\frac{\pi}{2} = d_{\mathrm{FS}}(m_0, m_1) \le d_{\mathrm{FS}}(m_0, a) + d_{\mathrm{FS}}(a, m_1) \le \frac{2E\tau}{\hbar}$ 立得硬性时间下界

   $$
   \tau \;\ge\; \frac{\pi\hbar}{4E}.
   $$

   （注意：上述两条速度不等式在 [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 中作为显式公理前提输入，而非在该模块内部直接对含时薛定谔方程积分导出。）
3. **格拉姆窗口历史锚点诱发的两类受约束可达性阻塞（`手工推导`）**：
   一旦观察者在转向全程被要求与格拉姆窗口 $\mathcal{W}_M$ 内的既有锚点维持指定重叠，单看加边格拉姆矩阵半正定性 $\Delta_{\mathrm{Schur}} > 0$ 并不足以保证三维球面上的连续极小圆弧可达！两类典型阻塞清晰划定了控制边界：
   - **阻塞（a）——保留重叠在 $S^2$ 上的零维不连通分裂（$M = 2$）**：设窗口内保留两枚正交赤道锚点 $\mathbf{v}_1 = \mathbf{e}_x,\; \mathbf{v}_2 = \mathbf{e}_y \in S^2 \subset \mathbb{R}^3$（格拉姆阵 $G_2 = I_2$），并要求受控轴 $\mathbf{r} \in S^2$ 维持精确零重叠等式 $\mathbf{c}_2 = (0, 0)^\top$。虽然 $3\times 3$ 加边矩阵 $G_3 = I_3 \succeq 0$ 具有满分舒尔补裕度 $\Delta_{\mathrm{Schur}}(2) = 1 - \mathbf{0}^\top I_2^{-1}\mathbf{0} = 1 > 0$，但它在二维球面 $S^2$ 上裁出的可行集

     $$
     \mathcal{F}_{S^2}(I_2, \mathbf{0}) \;=\; \bigl\{\mathbf{r} \in S^2 \;\big\vert\; \mathbf{r}\cdot\mathbf{e}_x = 0,\; \mathbf{r}\cdot\mathbf{e}_y = 0\bigr\} \;=\; \{+\mathbf{e}_z,\, -\mathbf{e}_z\}
     $$

     碎裂为南北两颗孤立对径点！在严格不违反 $\mathbf{c}_2 = (0, 0)^\top$ 的前提下，不存在任何连续球面圆弧能把 $+\mathbf{e}_z$ 拨向 $-\mathbf{e}_z$——唯有将苛刻等式放宽为不等式相干帽走廊 $\Omega_2$，或通过滑动窗口遗忘一枚旧锚点，南北通道才会重新连通。
   - **阻塞（b）——环境空间维数饱和导致的零实现阻塞（$M = 3$）**：设窗口内已攒满三枚两两正交的三维锚点 $\mathbf{v}_1 = \mathbf{e}_1,\; \mathbf{v}_2 = \mathbf{e}_2,\; \mathbf{v}_3 = \mathbf{e}_3 \in S^2 \subset \mathbb{R}^3$（$G_3 = I_3$），并索要正交创新重叠 $\mathbf{c}_3 = (0, 0, 0)^\top$。在纯矩阵代数层面，$4\times 4$ 加边矩阵正是正定单位阵 $G_4 = I_4 \succeq 0$，舒尔补裕度依然高达 $\Delta_{\mathrm{Schur}}(3) = 1 - \mathbf{0}^\top I_3^{-1}\mathbf{0} = 1 > 0$（允许在四维环境空间 $\mathbb{R}^4$ 中沿第四轴 $\mathbf{e}_4$ 实现）；然而**在固定三维方向球面 $S^2 \subset \mathbb{R}^3$ 内，与标准正交基 $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ 同时正交的向量唯有零向量 $\mathbf{0}$，绝不存在任何单位方向 $\mathbf{r} \in S^2$**（$\mathcal{F}_{S^2}(I_3, \mathbf{0}) = \emptyset$）！这直接预示了为什么有限维观察者绝不能只攒不放，而必须进入 [§34.10](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning) 的**记忆重整化、粗粒化压缩与概念升维学习**。
:::

## 34.9.4 锚定感知—行动和乐分类与自由能三元辨析 {#sec-ch34-21-4}

当观察者在格拉姆可行走廊内反复执行“感知读入—圆弧转向—再感知读入”的多步巡航并最终回到起始内部构型时，整轮感知—行动闭环究竟在记忆图谱上镌刻下了多少个不可被局部重定相抹去的物理不变量？`trureturing` 的 `AgencyHolonomy` 模块给出了精确到单个圆周自由度的拓扑群同构解答，同时也为我们厘清主动推理文献与热力学之间常见的“自由能”概念混同提供了严密准绳：

::: {.remark #rem-ch34-anchored-sensorimotor-loop title="锚定生成树相位和乐分类定理、因果图手术与三种“自由能/冻结沉积”概念的严格区分（MODEL + 文献结果，未在本书形式化）"}
**模型建构与文献结果（其中生成树相位输运与锚定相位分类已由下引 `LEAN ✓` 内核定理形式化；统计因果干预与主动推理变分原理属文献结果，未在本书形式化）。**

1. **生成树相位输运与锚定感知—行动和乐分类（`LEAN ✓` + `MODEL`）**：
   将观察者的多步感知—行动交互网络建模为有限有向重图 $(V, E, s, t)$（顶点数 $\lvert V\rvert = n$、有向边数 $\lvert E\rvert = m$），每条有向边 $e \in E$ 携带圆周相位传递因子 $u(e) \in \mathbb{T}$（`Circle`）。选定在底图无向支撑上构成生成树、以基点 $r \in V$ 为起点的命名树 $T$（`NamedSpanningTree s t T`，满足 $\lvert T\rvert + 1 = n$）：
   - 树上输运定理 [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)（`LEAN ✓`）证明，沿命名树无向支撑唯一路径（逆箭头穿边时取逆相位 $u(e)^{-1}$）定义的基点相位 $\operatorname{rootPhase}(u, a)$ 满足基点归一 $\operatorname{rootPhase}(u, r) = 1$、树边递推 $\forall e \in T,\; \operatorname{rootPhase}(u, t(e)) = u(e)\,\operatorname{rootPhase}(u, s(e))$、乘法同态与连续性，并在顶点重定相规范变换 $(\operatorname{gauge}\,g\,u)(e) = g(t(e))\,u(e)\,g(s(e))^{-1}$ 下严格满足协变律 $\operatorname{rootPhase}(\operatorname{gauge}\,g\,u, a) = g(a)\,\operatorname{rootPhase}(u, a)\,g(r)^{-1}$；
   - 锚定相位分类定理 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（`LEAN ✓`）进一步引入包含基点 $r \in R$ 的**外部固定锚点集** $R \subseteq V$（锚点数 $\lvert R\rvert = k = a + 1$），将允许的内部规范变换限制在保持全部外部锚点不动的子群 $\operatorname{anchoredGroup}(R) = \{g : V \to \mathbb{T} \mid \forall v \in R,\; g(v) = 1\}$ 上，证明特征坐标映射 $\chi : (E \to \mathbb{T}) \to \operatorname{Coordinates}(T, R, r)$ 诱导出紧豪斯多夫拓扑群同构

     $$
     (E \to \mathbb{T}) / N \;\simeq_{\mathrm{top},\,*} \; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{top},\,*} \; \mathbb{T}^{m + k - n}, \qquad c + a \;=\; (m + 1 - n) + (k - 1) \;=\; m + k - n.
     $$

     这一维数公式精确锁定了整张交互图的锚定 $\mathrm{U}(1)$ 规范商坐标计数（`LEAN ✓` `anchored_phase_classification`）：不变商环面精确拆分为 $c = m - \lvert T\rvert = m + 1 - n$ 个由非树边 $e \notin T$ 标记的基本闭环坐标与 $a = k - 1$ 个连接基点 $r$ 至其余固定锚点 $v \in R \setminus \{r\}$ 的开路树坐标；进而将闭环坐标在几何输运协议下诠释为**物理贝里相位**、将开路坐标在锚定端点比对协议下诠释为**已记录相对干预相位**，则属物理读出诠释（`MODEL`）！当无外部第二锚点（$k = 1 \implies a = 0$）时开路相位皆属纯规范，而固定外部锚点（$k \ge 2 \implies a \ge 1$）则令该 $a$ 个开路坐标成为规范不变量。（须划清边界：`anchored_phase_classification` 刻画交换圆群 $\mathrm{U}(1) \cong \mathbb{T}$ 上的标量相位商；而多轴单量子比特 $\mathrm{SU}(2)$/泡利感知—行动算符满足外尔反对易律 $X Z = -Z X$，见 [`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star)，其非阿贝尔路径有序矩阵和乐不能直接约化为交换特征环面 $\mathbb{T}^{m + k - n}$。）
2. **因果干预图手术与主动推理的文献坐标（`文献结果，未在本书形式化`）**：
   在经典统计因果与理论神经科学文献中，J. Pearl（*Statist. Surv.* **3**, 96–146, 2009；DOI: `10.1214/09-SS057`）通过结构因果模型与切断入边的图手术算子 $\operatorname{do}(X = x)$，奠定了主动干预分布 $P(Y \mid \operatorname{do}(X = x))$（对应本节 `Act / Write`）不可归约为被动条件概率 $P(Y \mid X = x)$（对应 `Observe / Read`）的数学判据；K. Friston（*Nat. Rev. Neurosci.* **11**, 127–138, 2010；DOI: `10.1038/nrn2787`）提出自由能原理与主动推理框架，将感知（更新内部近似后验 $q$）与行动（选择控制 $u$ 重采样感官输入 $o$）统一为围绕生成模型的双翼闭环。
3. **三类同名或近名量的严格界限——绝不混同变分自由能、热力学自由能与形式化 `freezeDeposit`**：
   为杜绝跨学科术语滑移，本书对以下三个数学量实行严格分账：
   - **变分自由能（Variational Free Energy）** $F_{\mathrm{var}}(q, o; u) := D_{\mathrm{KL}}\bigl(q(s)\,\big\Vert\,p(s \mid o, u)\bigr) - \ln p(o \mid u)$（`文献结果：Friston 2010` / `MODEL`）：定义在内部信念分布 $q(s)$、离散观测质量（或连续观测相对基准测度的无量纲似然比）$p(o \mid u)$ 与控制动作 $u$ 上的**无量纲信息论泛函**（单位为奈特 $\mathrm{nat}$ 或比特），如 [@ex-ch34-intervention-versus-frame] 中驱动行动选言的交叉熵差额 $\frac{1}{4}\ln 3$，本身不携带焦耳能量量纲；
   - **物理热力学自由能（Thermodynamic Free Energy）** $F = U - T S_{\mathrm{phys}} = U - \beta^{-1} s$（严格区分无量纲冯·诺依曼熵 $s = -\operatorname{Tr}(\rho\ln\rho)$ 与物理热力学熵 $S_{\mathrm{phys}} = k_B s$，其中逆温 $\beta = (k_B T)^{-1} > 0$，兰道尔擦除排热下界为 $\beta Q \ge -\Delta s$，见 [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)–[§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)）：耦合物理热库时具有**真实能量量纲**的功—热收支状态函数，管辖非幺正记忆重置 `Write` 与窗口遗忘的最低物理耗散；
   - **形式化退相干冻结沉积 `freezeDeposit`**：`trureturing` 模块 `D5/S3/QuantumChannels/DecoherenceFreeze` 中定义的实代数能量标量 $\operatorname{freezeDeposit}(\beta, \Delta s, \Delta E_{\mathrm{pass}}) := \Delta E_{\mathrm{pass}} - \Delta s / \beta$（其中 $\Delta s$ 无量纲）：对被动能量偏移 $\Delta E_{\mathrm{pass}} > 0$ 与 $\beta > 0$，当逆温 $\beta$ 超过临界逆温 $\beta_c := \Delta s / \Delta E_{\mathrm{pass}}$ 时沉积严格为正（$\operatorname{freezeDeposit} > 0 \iff \beta > \beta_c$），绝非主动推理中的贝叶斯生成模型变分上界 $F_{\mathrm{var}}(q, o; u)$。
:::

至此，具身观察者的“读”与“写”终于在格拉姆走廊内严丝合缝地扣成闭环：被动观测（`Observe / Read`）将双程玻恩回声固化为单次锚点记录，主动干预（`Act / Write`）凭生成参考模型在可行走廊 $\Omega_M$ 内沿极小圆弧拨动探针，而整张锚定交互图的规范商（`LEAN ✓`）携有 $c = m + 1 - n$ 个闭环坐标与 $a = k - 1$ 个开路坐标，并在几何输运协议与锚定端点比对协议下分别读出为物理贝里相位与记录干预相位（`MODEL`）。然而，正如 [@ex-ch34-gram-corridor-reachability] 的三维秩饱和阻塞所敲响的警钟：随着感知—行动闭环一轮接一轮运转，不断涌入的新鲜记录很快就会塞满有限阶格拉姆窗口 $\mathcal{W}_M$！一位有限记忆观察者怎样才能在不迷失既往因果律的前提下腾空冗余锚点、把散碎经验提炼为低秩预测概念？让我们紧接着步入 [§34.10](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning)，揭开**记忆重整化、粗粒化遗忘与统计学习**的几何篇章。
