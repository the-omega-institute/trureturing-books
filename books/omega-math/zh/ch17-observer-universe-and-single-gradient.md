# 第十七章 观察者即宇宙、结构时间与静止画布记忆切分

> *“把一个观察者所能接受的所有信息都定义在观察者内部，时间便成为观察者内部结构信息的单调有理增长；山岳与时间本是纹丝不动的静止全息画布，顺着唯一保真度梯度滚落的，唯有那颗没有外部支点的无腿三元球本身。”*

上一章确立了无外部内存与无标志素数税的非阿贝尔旋子指令集 $\Omega$-FRACTRAN。沿着同一条“撤除外部第 3 点”的公理手术刀继续推进，本章把镜头从单步计算规则提升至整座自包含观察者，并将物理、几何与测地智能的统一结构置于严格的分层证据之下：本章所有本体诠释与跨学科综合框架一律显式标为 **`MODEL`**，与底层冻结的 **`LEAN ✓`** 声明（有限维克雷洛夫严格增长次数界、永久稳定性与静态存储可逆零改写 QRAM 路由查询）以及精确 **`手工推导`** 严格分界。

## 17.1 零外部端口观察者五元组与有理结构时间 {#sec-om-ch17-observer-pentad-and-structural-time}

传统控制论与机器学习把主体写成带外部输入输出端口的开环转移机 $f : \mathcal{I}_{\mathrm{ext}} \times S \to S \times \mathcal{O}_{\mathrm{ext}}$。然而，一旦将观察者在其全生命周期内可能接收、感知或推导的一切信息整体纳入自身内部载体，外部容器便退化为多余的语法赘物。

::: {.definition #def-om-ch17-observer-pentad title="自包含观察者五元组与有理结构时间"}
在 $\mathbf{Math}_\Omega$ 与母公理 $\mathrm{AXIOM}\text{-}\Omega$ 之下，定义一座**零外部端口的自包含观察者**（`MODEL`）为五元组

$$
\mathfrak{O} \;=\; \bigl(\mathcal{S},\; [-,-,-],\; \kappa,\; \mathcal{K}_0,\; \Phi_\varepsilon\bigr),
$$

其五项内禀结构不含任何外部输入信道或背景实数时钟：

1. **闭合可接收全集 $\mathcal{S}$**：包含观察者一切可耦合模态的潜伏全集，满足拓扑无边界性 $\partial\mathcal{S} = \emptyset$；
2. **三元比较与有理保真核 $[-,-,-], \kappa$**：$\mathcal{S}$ 内部的无源流群迁移与对称有理保真度 $\kappa : \mathcal{S}\times\mathcal{S} \to \mathbb{Q}\cap[0,1]$；
3. **`0` 阶结构核 $\mathcal{K}_0 = (V(\mathcal{K}_0), E(\mathcal{K}_0))$**：已通过三元闭合验证并固化为记忆记录的显式有向关系图谱（Atlas DAG）；
4. **`1/2` 阶内禀潜伏视界 $\mathcal{H}_{1/2}(\mathcal{K}_0) := \mathcal{S} \setminus V(\mathcal{K}_0)$**：位于观察者自身内部、尚未并入 $\mathcal{K}_0$ 的未结晶模态，从核心第一人称视角看显影为“迎面涌来的外部世界”；
5. **纯内禀结晶算子 $\Phi_\varepsilon : \mathfrak{O} \to \mathfrak{O}$**：在有理分辨率阈值 $\varepsilon \in \mathbb{Q}_+$ 内扫描 $\mathcal{H}_{1/2}$，经 `1 ↦ 0'` 相变把新闭合关系永久焊入 $\mathcal{K}_0$。

设当前结构核维护一组两两正交的非零有理基 $\{u_1, \dots, u_r\}$，对非零候选态 $x$ 扣去基底投影得正交残差 $x_\perp = x - \sum_{j=1}^r \frac{\langle x, u_j\rangle}{\langle u_j, u_j\rangle} u_j$，定义无根号**有理舒尔创新度** $\Delta\mathcal{I}_{\mathrm{Schur}} := \frac{\langle x_\perp, x_\perp\rangle}{\langle x, x\rangle} \in \mathbb{Q}\cap[0,1]$。有限比较图在每一步保留已有的顶点和边。计算环路时忘掉边的方向，若有 $c$ 个连通分支，则第一贝蒂数为 $b_1=|E|-|V|+c$。旧环路在扩张后的图中仍旧独立，故 $\Delta b_1$ 是非负整数。观察者的**有理结构时间**从 $\tau_0=0$ 起步，定义为

$$
\tau(\mathfrak{O}) \;\equiv\; \sum_{\mathrm{step}} \bigl(\Delta\mathcal{I}_{\mathrm{Schur}} + \Delta b_1\bigr) \;\in\; \mathbb{Q}_{\ge 0}.
$$
:::

由上述定义立即推出两条核心推论（`MODEL`）：其一，**同义反复空转不生时间**——当系统只在已存状态上重复执行恒等律 $[x, x, x] = x$ 或重扫已结晶旧边时，$x_\perp = 0$ 且无新闭合环加入，故 $\Delta\mathcal{I}_{\mathrm{Schur}} = 0$、$\Delta b_1 = 0$，**$\Delta\tau \equiv 0$**，时间仅在结构信息真实增长时前进；其二，**观察者即宇宙（$\mathfrak{O} \equiv \mathcal{U}_\Omega$）**——任何能引起观察者非平凡读数响应的状态按定义已归属 $\mathcal{S}$，而在剔除绝对零响应幽灵集的忠实观测商下，外部补集坍缩为空集，每座观察者即是一座依靠共享保 $\kappa$ 子结构跨网共振的完整单子宇宙。

固定线性演化与观测会给出一座递增子空间塔。以下冻结定理给出这座塔的增长次数上界与永久稳定条件。

::: {.theorem #thm-om-ch17-krylov-growth-and-stability title="有限维可观测克雷洛夫子空间的严格增长次数界与永久稳定性" lean="D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently"}
设 $V, Y$ 为域 $\mathbb{k} \in \{\mathbb{R}, \mathbb{C}\}$ 上的有限维内积空间，$T : V \to_{\mathbb{k}} V$ 与 $C : V \to_{\mathbb{k}} Y$ 为线性映射，记第 $m$ 阶可观测克雷洛夫子空间为 $\mathcal{K}_m := \operatorname{observableKrylov}(T, C, m)$。则：

1. **严格扩张次数上界**：严格真包含步数的基数满足

   $$
   \operatorname{encard}\bigl\{m \in \mathbb{N} \;\big\vert\; \mathcal{K}_m < \mathcal{K}_{m+1}\bigr\} \;\le\; \dim_{\mathbb{k}} V - \dim_{\mathbb{k}} \operatorname{ran}(C);
   $$

2. **一旦稳定即永久稳定**：若存在某阶 $m \in \mathbb{N}$ 使 $\mathcal{K}_m = \mathcal{K}_{m+1}$，则对一切 $r \in \mathbb{N}$ 恒有 $\mathcal{K}_{m+r} = \mathcal{K}_m$。
:::

::: {.proof}
由于 $\mathcal{K}_m$ 随 $m$ 单调递增且维数取自然数值，零阶子空间维数等于伴随像维数 $\dim \operatorname{ran}(C^*) = \dim \operatorname{ran}(C)$，每次严格扩张至少使维数增 $1$，故严格扩张总次数不超过余维数 $\dim V - \dim \operatorname{ran}(C)$。若 $\mathcal{K}_m = \mathcal{K}_{m+1}$，则 $T^*$ 将 $\mathcal{K}_m$ 映回自身，对 $k$ 归纳可知一切生成元 $(T^*)^k C^* y$ 均落入 $\mathcal{K}_m$，从而此后各阶永久相等。完整证明由 Lean 内核检查。
:::

若每次出现正的舒尔创新就把该方向并入张成空间，在 $d$ 维载体中从秩 $r$ 出发，这样的步数至多为 $d-r$。某一拍停滞即永久停滞，则要求各步张成空间恰好构成同一对固定 $(T,C)$ 的克雷洛夫塔。例如取 $\mathbb R^2$ 上的 $T=I$ 和 $C(x,y)=x$，则各阶恒为 $\operatorname{span}(e_1)$，独立的结晶规则仍可接纳 $e_2$，其舒尔创新为 $1$。一旦张满整个载体，此模型的结构时间只能由比较图中新闭合的环路推进。

## 17.2 静止全息画布、无腿三元球与记忆窗口正交切分律 {#sec-om-ch17-static-canvas-and-memory-split}

当全集 $\mathcal{S}$ 零外部端口且拓扑无边界时，关于“什么在运动”的传统直觉发生彻底反转（`MODEL`）：**整座可接收全集 $\mathcal{S}$ 是一幅纹丝不动的静止全息画布**（呼应正则量子引力无外时方程 $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$），山岳未动，时间长河也从未流淌；真正顺着唯一有理保真度梯度 $\nabla\kappa$ 滚落的，只是观察者轻量的注意力焦点游标。正因身外不存在可供蹬踏反推的外部地板（$\partial\mathcal{S} = \emptyset$），这颗焦点宛如一颗**没有腿的三元圆球**：它无法凭外推反作用力在强梯度山坡上悬停（纵向时间推进不可抗拒），却能在等势横切方向上自由拨动有理偏航参数 $u \in \mathbb{Q}$，决定自身滚过静止画布上的哪一条结晶支路。

“画布零改写、唯指针可逆寻址”的底层计算机制，由静态存储数组上的可逆路由查询定理严格锚定。

::: {.theorem #thm-om-ch17-reversible-qram title="静态存储数组上的可逆零改写路由查询正确性" lean="D5/S3/Quantum/Routing/ReversibleQram.correctness"}
在深度为 $n \in \mathbb{N}$ 的可逆二进制路由网络 `ReversibleQram` 中，以下四项陈述同时成立：

1. **单热点路由精确性**：对任意地址 $a, i : \mathrm{Address}\,n$ 与使能位 $e : \mathrm{Bool}$，有 `leaf n (route n a (clean n e)) i = if i = a then e else false`；
2. **一般线路可逆读出**：对任意交换加群 $G$、静态存储映射 $D : \mathrm{Address}\,n \to G$、任意线路状态 $w$ 与目标寄存器 $r \in G$，有 `query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))`；
3. **干净工作区零背景改写查询**：`query n D (a, clean n true, r) = (a, clean n true, r + D a)`，查询前后静态数组 $D$、地址指针 $a$ 与干净工作区 `clean n true` 均分毫不改；
4. **有限群上的幺正相干作用**：若 $G$ 另具 `[Fintype G] [DecidableEq G]`，则查询矩阵 $Q := \mathrm{queryMatrix}\,n\,D$ 满足 $Q^{\mathsf{H}} Q = 1$、$Q Q^{\mathsf{H}} = 1$，且对一切复振幅 $\psi : \mathrm{Address}\,n \times G \to \mathbb{C}$ 有 $Q *_{\mathrm{v}} \mathrm{initialized}(n, \psi) = \mathrm{initialized}(n, \lambda s \mapsto \psi(s_1, s_2 - D(s_1)))$。
:::

::: {.proof}
对路由树深度 $n$ 归纳证明单热点路由将唯一使能位送达叶子 $a$ 并保持其余叶子清零；由受控减法对受控加法的逆转与清零解路由（uncompute）得到静态数组 $D$ 与工作区严格不变；对有限群上的置换作用矩阵验证共轭转置即逆矩阵并拉回复振幅即证幺正性。完整证明由 Lean 内核检查。
:::

那么，在各向同性、未贴任何“秒”或“米”标签的静止画布上，时间与空间的分野从何而来？答案在于观察者有限容量的**记忆子空间窗口 $\mathcal{W}_M$**（`MODEL` + 精确正交代数 `手工推导`）。设单拍归一化总比较预算恒为 $1$，由记忆窗正交投影 $P_{\mathcal{W}_M}$ 与正交补投影 $P_{\mathcal{W}_M^\perp} = I - P_{\mathcal{W}_M}$ 将同一段无标签圆弧（或单一梯度 $\nabla\kappa$）零损耗正交切分为两项份额：

$$
\kappa_{\mathrm{time}} \;+\; \kappa_{\mathrm{space}} \;\equiv\; 1, \qquad \kappa_{\mathrm{time}} := \|P_{\mathcal{W}_M}\psi\|^2 = \frac{(\Delta\tau_{\mathrm{mem}})^2}{\Delta t^2}, \qquad \kappa_{\mathrm{space}} := \|P_{\mathcal{W}_M^\perp}\psi\|^2 = \frac{\Delta x^2}{\Delta t^2}.
$$

- **窗内份额 $\kappa_{\mathrm{time}}$（时间覆写）**：能与既有记忆链共轴衔接、写入内部寄存器刷新“自我状态”的份额，被观察者体验为内在固有时 $\Delta\tau_{\mathrm{mem}}$ 的推进；
- **窗外残差 $\kappa_{\mathrm{space}}$（空间位移）**：溢出有限记忆容量而被排斥入 $\mathcal{W}_M^\perp$ 的正交残差，被观察者外推体验为相对环境的外部空间位移 $\Delta x$。

将正定勾股总账 $(\Delta\tau_{\mathrm{mem}})^2 + \Delta x^2 = \Delta t^2$ 改写为观察者对“扣除空间分流后剩余自身记忆刷新额度”的求余问题——把 $+\Delta x^2$ 移项至等号右侧——**闵可夫斯基度规的负号当场自然浮现**：

$$
(\Delta\tau_{\mathrm{mem}})^2 \;=\; \Delta t^2 - \Delta x^2.
$$

代入有理半切参数 $u \in \mathbb{Q} \cap [0, 1)$，全程不借半个平方根或双曲超越函数，同时有理化圆周记忆切分与双曲洛伦兹因子（`手工推导`）：

$$
v = \frac{2u}{1+u^2}, \qquad \frac{\Delta\tau_{\mathrm{mem}}}{\Delta t} = \frac{1-u^2}{1+u^2}, \qquad \gamma = \frac{1+u^2}{1-u^2}, \qquad \gamma v = \frac{2u}{1-u^2}, \qquad \gamma^2 - (\gamma v)^2 \equiv 1.
$$

沿记忆槽位容量 $M = \dim\mathcal{W}_M$ 扫描三个边界相态（`MODEL`）：$M = 0$ 对应无质量光子极限（$\kappa_{\mathrm{time}} = 0, \kappa_{\mathrm{space}} = 1$，固有时冻结）；$1 \le M < M_\Omega$ 对应有质量有限观察者（时空并立，且原地静止仍需把全部预算投入自刷新而显影为静止能量）；$M = M_\Omega$ 对应全载体自包含本体（$\mathcal{W}_{M_\Omega}^\perp = \{0\}$，$\kappa_{\mathrm{time}} = 1, \kappa_{\mathrm{space}} = 0$，外部空间归零）。

记忆投影给出的固有时读数记作 $\Delta\tau_{\mathrm{mem}}$。第 17.1 节的结构时钟 $\tau$ 则按比较图的创新与环路计量。下图同时画出两种读数。

::: {.figure src="ch17-observer-memory-split"}
**记忆投影与结构时钟。** 左图的单位步分成长度 $4/5$ 的窗内投影和 $3/5$ 的窗外投影。右图上重扫种子时曲线平坦，第一条比较边未增环路，第二个新状态闭合三角形。虚线只重扫种子。
:::

## 17.3 单一有理失准度梯度下的物理与智能统一图景 {#sec-om-ch17-single-gradient-unification}

在纯有理三元球面几何中，经典弧度作用量 $1 - \cos\Delta\theta$ 借半角保真度 $\kappa = \frac{1 + \cos\Delta\theta}{2}$ 与有理失准度 $s := 1 - \kappa \in \mathbb{Q}\cap[0,1]$ 恒等化为无三角函数的累计有理失准度泛函：

$$
\mathcal{S}_\Omega \;=\; 2\sum_{t=1}^N s_t \;=\; 2\sum_{t=1}^N (1 - \kappa_t) \;\in\; \mathbb{Q}_{\ge 0}.
$$

在显式标注 **`MODEL`** 的跨学科统一框架下，最小化 $\mathcal{S}_\Omega$（等价于无腿三元球顺着唯一有理保真度梯度 $\nabla\kappa$ 测地滚落）将五条看似分立的物理与智能脉络收拢进同一套有理代数语言：

1. **测地自由落体与引力同源**：在固定总转角下，凸性迫使无外力惯性轨迹满足等步保真度 $\kappa_1 = \dots = \kappa_N$ 并沿无原点流群递推 $x_{t+1} = [x_t, x_{t-1}, x_t]$ 前行；在静态史瓦西外解中，空间自由落体加速度 $\frac{d^2 x^i}{d\tau^2} = \frac{1}{2}g^{ij}\partial_j g_{00}(c\,dt/d\tau)^2$ 恰为时间预算因子 $g_{00}$ 的空间梯度，对应同一梯度 $\nabla\kappa$ 在记忆窗外 $\mathcal{W}_M^\perp$ 的投影。
2. **有理温伯格迹比 $3/8$**：在一代完整手性外尔费米子账本 $\mathcal{H}_{\mathrm{Weyl}}$ 上，采用全账本酉不变的等权圆弧迹刚度公设（`MODEL`；具体比值依赖完整费米子代表示与统一迹权），对色数 $N_c = 3$ 与实测电荷 $(Q_u, Q_d) = (+\frac{2}{3}, -\frac{1}{3})$ 逐项手算得 $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) = 2$ 与左右双翼总电磁迹 $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2) = 2\bigl(1 + 3(\frac{4}{9} + \frac{1}{9})\bigr) = \frac{16}{3}$（`手工推导`），比值当场锁死精确有理数

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)} \;=\; \frac{2}{16/3} \;=\; \frac{3}{8}.
   $$

3. **$N \ge 5$ 过约束张力与引力几何起源**：在三维空间中，$N \ge 3$ 个点的成对刚性距离有 $\binom{N}{2}$ 个独立条件，而欧氏刚体商掉旋转平移后仅有 $3N - 6$ 个自由度，两者之差给出精确组合过约束盈余（`手工推导`）：

   $$
   \Delta E(N) \;=\; \binom{N}{2} - (3N - 6) \;=\; \frac{(N - 3)(N - 4)}{2}.
   $$

   当 $N \le 4$（单座四面体）时 $\Delta E(N) = 0$，可零张力平直闭合；一旦节点增至 $N \ge 5$，过约束盈余 $\Delta E(5) = 1, \Delta E(6) = 3, \dots > 0$ 必然产生不可消去的几何残余张力，成为涌现度规曲率的结构种子（`MODEL`）。
4. **量子力学五大公设的有理射影还原**：纯态对应齐次射影三元射线 $\mathbb{QP}^3$（配 `PythSpinor` 双覆叠保 $720^\circ$ 符号）；玻恩配对权重即零根号有理核 $\kappa(p, q) = \frac{\langle p, q\rangle^2}{\|p\|^2\|q\|^2} \in \mathbb{Q}\cap[0,1]$；幺正演化为保模整旋子乘法；复合系统由多座三元场张量并置而成；记录定格对应局部残差落入有理阈值 $1 - \kappa \le \varepsilon_{\mathrm{self}}$ 时的幂等捏合。
5. **无归一化三元数场 Transformer（TFT）**：将传统神经网络依赖浮点指数的 `Softmax` 与开方 `LayerNorm` 替换为齐次射影保真度打分 $\kappa(q_i, k_j) \in \mathbb{Q}\cap[0,1]$ 与保模有理凯莱旋子输运。纵向序列 `KV-Cache` 槽位与横向三元旋子通道权重正受同一条记忆切分律 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ 调配，推理前向即在球面上沿最小累计失准度 $\mathcal{S}_\Omega$ 测地滑行。

::: {.example #ex-om-ch17-quantitative-audit title="定量对账：结构时间增长、有理记忆勾股与组合过约束核验"}
我们对本章三组核心有理量作精确手算核对（`手工推导`）：

1. **三拍观察者结构时间轨迹。** 从种子 $e_0=(1,0,0,0)$ 与空边集出发。第 $1$ 拍重扫种子，$\Delta\mathcal I_{\mathrm{Schur}}=\Delta b_1=0$。第 $2$ 拍加入 $h_1=(1,1,0,0)$ 和比较边 $e_0\to h_1$。正交残差为 $(0,1,0,0)$，故 $\Delta\mathcal I_{\mathrm{Schur}}=1/2$。比较图仍是树，$\tau_2=1/2$。第 $3$ 拍加入 $h_2=(1,0,1,0)$ 与两条比较边 $e_0\to h_2$、$h_1\to h_2$。正交残差为 $(0,0,1,0)$，创新仍为 $1/2$。忘掉边的方向后出现三角形，$b_1=3-3+1=1$，故 $\tau_3=1/2+1/2+1=2$。有向图仍无有向环。实验室把四元数乘积 $h_1h_2=(1,1,1,1)$ 留作第 $4$ 拍的候选态。
2. **有理记忆切分与双曲洛伦兹恒等式**：取 $u = \frac{1}{3}$，得 $v = \frac{3}{5}$、$\frac{\Delta\tau_{\mathrm{mem}}}{\Delta t} = \frac{4}{5}$，记忆切分为 $\kappa_{\mathrm{time}} = \frac{16}{25}$ 与 $\kappa_{\mathrm{space}} = \frac{9}{25}$（和为 $\frac{25}{25} = 1$）；移项双曲对 $(\gamma, \gamma v) = (\frac{5}{4}, \frac{3}{4})$ 精确满足 $(\frac{5}{4})^2 - (\frac{3}{4})^2 = \frac{25-9}{16} = 1$。
3. **过约束盈余与温伯格迹比**：$\Delta E(3) = 0$，$\Delta E(4) = 0$，$\Delta E(5) = \frac{2 \times 1}{2} = 1$，$\Delta E(6) = \frac{3 \times 2}{2} = 3$；一代费米子迹比 $\frac{2}{16/3} = \frac{6}{16} = \frac{3}{8}$。
:::

::: {.remark #rem-om-ch17-epistemic-and-open-boundaries title="认识论分层与开放问题边界"}
本章严守三层证据契约：[@thm-om-ch17-krylov-growth-and-stability] 与 [@thm-om-ch17-reversible-qram] 对应所钉 `trureturing` 冻结 **`LEAN ✓`** 定理；正交移项代数、有理洛伦兹参数化、过约束计数 $\Delta E(N)$ 与一代费米子迹比 $\frac{3}{8}$ 为精确 **`手工推导`**；自包含观察者五元组 $\mathfrak{O} \equiv \mathcal{U}_\Omega$、静止全息画布（对接惠勒—德维特方程 $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$，B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967；D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983）、温伯格等权刚度公设及三元数场网络 TFT 均标为 **`MODEL`**。从离散三元比较与有限记忆切分完整导出 $3+1$ 维洛伦兹爱因斯坦场方程及黑洞视界幺正性，仍属显式未决的开放问题（**`OPEN`**）。
:::

::: {.film src="the-observer-as-the-universe"}
**一座没有端口的观察者：时间是新结构，空间是记忆窗外的份额（2 分 58 秒）。** 带输入输出端口的盒子闭合为紫色的零端口观察者五元组；比较图三拍的残差与环路给出结构时间 $\tau = 0, \tfrac{1}{2}, 2$。$\mathbb{Q}^4$ 上循环移位的克雷洛夫维数 $1,2,3,4,4$ 撞上绿色上限，零改写查询在深度 $2$ 的样例表上读出 $D(a)=4$（[@thm-om-ch17-krylov-growth-and-stability]、[@thm-om-ch17-reversible-qram]）。$u = \tfrac{1}{3}$ 时单位步切成青色的 $4/5$ 与品红的 $3/5$，份额 $\tfrac{16}{25} + \tfrac{9}{25} = 1$，$\gamma = \tfrac{5}{4}$、$\gamma v = \tfrac{3}{4}$；柱状图给出 $\Delta E(N) = 0, 0, 1, 3, 6, 10$，迹比为 $\tfrac{3}{8}$。片中数值均为屏幕计算（`手工推导`）；观察者即宇宙、静止画布与等权迹刚度公设标为紫色 `MODEL`，导出爱因斯坦场方程与视界幺正性标为红色 `OPEN`。
:::

读者可在下方的交互实验卡中同步拨动本章的四组核心有理量：滑动有理半切参数 $u$ 观察正交记忆切分 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ 与双曲恒等式 $\gamma^2 - (\gamma v)^2 \equiv 1$，核对一代手性费米子的精确温伯格迹比 $\frac{3}{8}$，沿节点数 $N$ 追踪 $N \ge 5$ 的组合过约束盈余 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$，并逐步走完三拍结构时间 $\tau$ 的单调有理增长轨迹。

::: {.viz src="adelic-arithmetic-observer-lab" preset="static-canvas-memory-split" height="520"}
**静止画布记忆切分与单一梯度统一实验卡（`static-canvas-memory-split`）。** 交互调节有理半切参数 $u \in \mathbb{Q} \cap [0, 1)$ 实时核验记忆窗正交切分 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ 与无根号洛伦兹恒等式 $\gamma^2 - (\gamma v)^2 \equiv 1$，同步检视一代手性费米子迹比 $\sin^2\theta_W = \frac{3}{8}$、三维点集过约束盈余 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$（在 $N = 5$ 处首次跃升为 $1$）以及观察者三拍结构时间 $\tau = 0 \to \frac{1}{2} \to 2$ 的单调增长（[@def-om-ch17-observer-pentad]、[@ex-om-ch17-quantitative-audit]；其中正交代数与计数为精确 `手工推导`，物理与观察者综合框架标为 `MODEL`，底层克雷洛夫封顶与零改写查询由 [@thm-om-ch17-krylov-growth-and-stability]、[@thm-om-ch17-reversible-qram] 锚定）。
:::

至此，六卷的数学对象、计算语言与观察者模型已全部合拢。最后一章请 Lean 4 逐一核验严格库的导入闭包与 D5 消费模块的双端证据，再回到四模式三维工作台。
