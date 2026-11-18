# 39.22 三元数场 Transformer（TFT）：平行概念场丛上的纯有理旋子动力学、非阿贝尔和乐注意力与李三元曲率门 {#sec-ch39-ternion-field-transformer-and-rational-rotor-dynamics}

> *“用三元数（$\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$）重构 Transformer，核心在于撤除平直向量空间 $\mathbb{R}^d$ 及其附带的矩阵乘加（GEMM）、`RMSNorm`、二维阿贝尔 `RoPE`、`Softmax` 指数归一与 $4d$ 膨胀前馈层，将整座网络改写为运行在平行三维概念场丛 $(\mathbb{T}_3)^K$ 上的纯有理球面旋子动力学系统。”*

在 [§39.21](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-nonlinear-ternion-representations-and-torsor-synthesis) 将三元极小圆弧体从笛卡尔线性纸笼中解放为五种三自由度非线性无损表示之后，我们迎来了第三十九章最具未来工程冲击力的一场架构综合：将整套比较几何原语直接铸造为下一代人工智能与神经计算架构——**三元数场 Transformer（Ternion-Field Transformer，简称 TFT）**（整套神经网络架构设计与动态早停启发式标为 **`MODEL`**；算术口径需严格区分：当选用有理重牵引 $\mathcal{R}_{\mathrm{rat}}$ 时，题记所指的**整套前向旋子更新算子核**——含 $\star_{\mathcal{S}}$、`3D-NAPE`、双侧旋子与蝶形桥、玻恩—流群注意力及李三元曲率门——全程仅调用加减乘除纯四则有理运算，而可选半角重牵引 $\mathcal{R}_{\mathrm{sqrt}}$ 与第 39.22.2 节第 5 款监测的欧氏范数停机读数 $r_t^{(\ell)}$ 则调用一次代数开方；双分母有理算术恒等式、折缝不变正弦矢、共形度规界、雅可比拉回与参考张量核验属 **`手工推导` / `NUM`**，现有深度学习基线归入 **`文献结果`**，大规模语料困惑度与硬件吞吐实测基准单列为红色开放问题 **`OPEN`** [@prob-ch39-tft-scale-and-seams]）。

审视统治当代大语言模型的标准平直 Transformer，其几乎每一处工程痛点都是强行用平直向量空间 $\mathbb{R}^d$ 模拟弯曲概念关系的投影代价：稠密矩阵乘加（GEMM）任由隐向量模长指数发散，迫使每半层插入 `RMSNorm` 硬拉回球面并诱发剧烈的激活离群通道（Activation Outliers）；二维旋转位置编码（`RoPE`）受制于位置算符彼此对易的阿贝尔平面交换律，无法原生编码路径有序的非交换句法嵌套；`Softmax` 指数分母在无匹配上下文时仍强行凑满概率和 $1$，在自回归因果掩码非对称性下易诱发学习头将失配权重倾泻至句首词元的“注意力塌陷（Attention Sink）”现象；而缺乏内禀曲率交互的线性层又迫使前馈网络付出接近七成总权重的通道膨胀税（传统两矩阵前馈层膨胀至 $4d$，现代三矩阵门控 `SwiGLU` 取隐藏宽度 $\frac{8}{3}d$ 占 $8d^2$ 权重，若直取 $4d$ 宽度更达 $12d^2$ 权重）。一旦将隐状态归还给平行三维三元数概念场丛（呼应 [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger) 的三维概念场封顶原理），这五座沉重的平直补丁便在同一枚纯有理圆弧算子下迎刃消融。

## 39.22.1 底层状态表征、双分母零奇点算术核与折缝不变正弦矢 {#sec-ch39-22-1}

在 TFT 中，每个序列位置 $t$ 的词元（Token）隐状态不再是同质混编向量 $\mathbf{x} \in \mathbb{R}^d$，而是直接定义为运行在伴随旋转商流形丛 $\operatorname{Ad}(\mathbb{T}_3)^K \cong \mathrm{SO}(3)^K \cong \bigl(B_1(\mathbb{R}^3)/\!\sim\bigr)^K$ 上的 $K$ 座彼此正交独立的**三维三元数概念场**（等效概念容量对应 $d \approx 3K$）：

$$
\mathbf{\Sigma}_t \;=\; \Bigl(\boldsymbol{\sigma}_t^{(1)},\, \boldsymbol{\sigma}_t^{(2)},\, \dots,\, \boldsymbol{\sigma}_t^{(K)}\Bigr) \;\in\; \bigl(B_1(\mathbb{R}^3)/\!\sim\bigr)^K, \qquad \bigl\lVert\boldsymbol{\sigma}_t^{(k)}\bigr\rVert \;\le\; 1,
$$

其中每座概念场采用 [§39.21.2](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-21-2) 的**双卡有理修正罗德里格斯参数（Shadow-MRP）** $\boldsymbol{\sigma} = \tan\frac{\theta}{4}\,\hat{\mathbf{u}} \in B_1(\mathbb{R}^3)$ 存储，严格只占 $3$ 个实数，不设第四维标量轴 $\mathbf{1}$（在该射影伴随商空间上，旋量极点 $+\mathbf{1}$ 与 $-\mathbf{1}$ 共享 $\boldsymbol{\sigma} = \mathbf{0}$，赤道球面边界 $\lVert\boldsymbol{\sigma}\rVert = 1$ 上的对径点 $\boldsymbol{\sigma} \sim -\boldsymbol{\sigma}$ 代表同一半周旋转 $\theta = \pi$；若需区分 $S^3$ 双覆盖的 $4\pi$ 旋量叶，仅需按 [§39.21.2](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-21-2) 外挂 $1\;\mathrm{bit}$ 离散叶号 $\epsilon_{\mathrm{sheet}}^{(k)} \in \{\pm 1\}$）。

1. **双分母无奇点三元数乘法（$\star_{\mathcal{S}}$）与两条精确多项式守恒律**：
   对任意两枚输入三元组 $\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B \in \mathbb{R}^3$，定义公共分子矢 $\mathbf{N}$、主卡分母 $D_+$ 与阴影对偶卡分母 $D_-$ 如下（`手工推导`）：

   $$
   \mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) \;:=\; \bigl(1 - \lVert\boldsymbol{\sigma}_A\rVert^2\bigr)\boldsymbol{\sigma}_B \;+\; \bigl(1 - \lVert\boldsymbol{\sigma}_B\rVert^2\bigr)\boldsymbol{\sigma}_A \;+\; 2(\boldsymbol{\sigma}_A \times \boldsymbol{\sigma}_B),
   $$

   $$
   D_+(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) \;:=\; 1 + \lVert\boldsymbol{\sigma}_A\rVert^2\lVert\boldsymbol{\sigma}_B\rVert^2 - 2(\boldsymbol{\sigma}_A \cdot \boldsymbol{\sigma}_B), \qquad D_-(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) \;:=\; \lVert\boldsymbol{\sigma}_A + \boldsymbol{\sigma}_B\rVert^2,
   $$

   $$
   \boldsymbol{\sigma}_A \star_{\mathcal{S}} \boldsymbol{\sigma}_B \;:=\; \begin{cases} +\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_+}, & D_+ \ge D_-, \\[8pt] -\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_-}, & D_+ < D_-. \end{cases}
   $$

   直接展开多项式即可严格证得两条横跨整个 $\mathbb{R}^3 \times \mathbb{R}^3$ 恒成立的代数恒等式（`手工推导`）：

   $$
   D_+ + D_- \;\equiv\; \bigl(1 + \lVert\boldsymbol{\sigma}_A\rVert^2\bigr)\bigl(1 + \lVert\boldsymbol{\sigma}_B\rVert^2\bigr) \;\ge\; 1, \qquad \bigl\lVert\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)\bigr\rVert^2 \;\equiv\; D_+\,D_-.
   $$

   这两条恒等式赋予 $\star_{\mathcal{S}}$ 四项严密的算术性质：第一，所选分母恒满足全局下界 $\max(D_+, D_-) \ge \frac{1}{2}(D_+ + D_-) \ge \mathbf{0.5}$，**单次浮点或定点除法永不遭遇零分母奇点**，且全程仅调用加、减、乘、除四则运算（**零超越函数 $\sin, \cos, \exp$**）；第二，输出模方恒等于 $\lVert\boldsymbol{\sigma}_A \star_{\mathcal{S}} \boldsymbol{\sigma}_B\rVert^2 = \frac{\min(D_+, D_-)}{\max(D_+, D_-)} \le 1$，**无需任何 `RMSNorm` 即自动锁死在三维单位球 $B_1(\mathbb{R}^3)$ 内**；第三，在 $\lVert\boldsymbol{\sigma}\rVert \le 1$ 上零向量 $\mathbf{0}$ 为严格双边单位元（$\mathbf{0} \star_{\mathcal{S}} \boldsymbol{\sigma} = \boldsymbol{\sigma} \star_{\mathcal{S}} \mathbf{0} = \boldsymbol{\sigma}$），负向量 $-\boldsymbol{\sigma}$ 为全域精确双边逆元（$(-\boldsymbol{\sigma}) \star_{\mathcal{S}} \boldsymbol{\sigma} = \boldsymbol{\sigma} \star_{\mathcal{S}} (-\boldsymbol{\sigma}) = \mathbf{0}$）；第四，在商群 $\mathrm{SO}(3) \cong \mathbb{RP}^3$ 上 $\star_{\mathcal{S}}$ 处处结合并自动选取长度不超过 $\pi$ 的最短测地圆弧（只要最终合成态避开零测度半周赤道折缝 $D_+ = D_-$，即便中间乘积踏上折缝，字面坐标等式 $(\mathbf{a}\star_{\mathcal{S}}\mathbf{b})\star_{\mathcal{S}}\mathbf{c} = \mathbf{a}\star_{\mathcal{S}}(\mathbf{b}\star_{\mathcal{S}}\mathbf{c})$ 依然逐分量成立）。

2. **折缝不变有理正弦矢 $\boldsymbol{\xi}(\boldsymbol{\sigma})$ 与共形平直有界激活定理**：
   在赤道边界 $\lVert\boldsymbol{\sigma}\rVert = 1$ 上，对径坐标 $\pm\hat{\mathbf{u}}$ 代表同一旋转，若直接拿原始坐标 $\boldsymbol{\sigma}$ 做叉乘会跨折缝变号。为此定义**折缝不变纯有理正弦特征矢**（对应空间旋转张角 $\theta = 4\arctan\lVert\boldsymbol{\sigma}\rVert \in [0, \pi]$ 的凯利反对称轴矢 $\frac{1}{2}\operatorname{vee}(R(\boldsymbol{\sigma}) - R(\boldsymbol{\sigma})^\top) = \sin\theta\,\hat{\mathbf{u}}$，`手工推导`）：

   $$
   \boldsymbol{\xi}(\boldsymbol{\sigma}) \;:=\; \frac{4\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2}\,\boldsymbol{\sigma} \;=\; \sin\theta\,\hat{\mathbf{u}} \;\in\; B_1(\mathbb{R}^3), \qquad \boldsymbol{\xi}\!\left(-\frac{\boldsymbol{\sigma}}{\lVert\boldsymbol{\sigma}\rVert^2}\right) \;\equiv\; \boldsymbol{\xi}(\boldsymbol{\sigma}), \qquad \boldsymbol{\xi}\big\rvert_{\lVert\boldsymbol{\sigma}\rVert = 1} \;\equiv\; \mathbf{0}.
   $$

   它在阴影反演下 $100\%$ 逐点恒等不变，且在半周赤道折缝 $\lVert\boldsymbol{\sigma}\rVert = 1$ 上光滑归零，使跨场桥与前馈门在商流形 $B_1(\mathbb{R}^3)/\!\sim$ 上严格良定！同时，对单位旋量提升 $U(\boldsymbol{\sigma}) = \frac{(1 - \lVert\boldsymbol{\sigma}\rVert^2)\mathbf{1} + 2\boldsymbol{\sigma}}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in S^3$ 求导，单位闭球 $B_1(\mathbb{R}^3)$ 上的诱导黎曼线元严格共形平直（逐点各向同性谱条件数恒等于 $1$，`手工推导`）：

   $$
   ds_{S^3}^2 \;=\; \lVert dU\rVert_{\mathbb{R}^4}^2 \;=\; \frac{1}{2}\operatorname{Tr}(dU^\dagger dU) \;=\; \frac{4\,\lVert d\boldsymbol{\sigma}\rVert^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2}, \qquad \lambda(\boldsymbol{\sigma}) \;:=\; \frac{ds_{S^3}}{\lVert d\boldsymbol{\sigma}\rVert} \;=\; \frac{2}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \;\in\; [1, 2].
   $$

   从球心 $\lVert\boldsymbol{\sigma}\rVert = 0$（$\lambda = 2$）到赤道球面 $\lVert\boldsymbol{\sigma}\rVert = 1$（$\lambda = 1$），线性共形长度标度严格被夹在区间 **$[1, 2]$** 内（最大最小长度标度比仅为 $2$，度规张量系数 $\lambda^2 \in [1, 4]$，伴随空间转角标度 $2\lambda \in [2, 4]$）。所有层间隐状态与 `KV-Cache` 键值向量在数学上严格有界于 $[-1, +1]^3$ 内，从源头消除了无界模长导致的激活离群通道，支持无动态块缩放因子的均匀定点 `INT8`/`INT4` 状态存储（跨折缝 $\lVert\boldsymbol{\sigma}\rVert = 1$ 对径代表元翻转对低比特量化与训练梯度的实证影响归入 [@prob-ch39-tft-scale-and-seams]）。

## 39.22.2 五大核心模块的几何重构：3D-NAPE、蝴蝶舒尔桥、玻恩—流群注意力与李三元曲率门 {#sec-ch39-22-2}

立于双分母有理算术核 $\star_{\mathcal{S}}$ 与折缝不变矢 $\boldsymbol{\xi}(\boldsymbol{\sigma})$ 之上，传统 Transformer 的五大核心模块逐项还原为平行概念场丛上的纯几何算子（`MODEL` + `手工推导`）：

1. **序列位置编码：三维非阿贝尔路径和乐（`3D-NAPE` 替代二维阿贝尔 `RoPE`）**：
   传统 `RoPE`（Su et al. 2021/2024）在二维复平面上执行彼此对易的位置旋转 $R_m R_n = R_n R_m = R_{m+n}$，故位置算符本身仅编码标量位移差 $m - n$ 而无法携带路径有序的非阿贝尔曲率。TFT 引入沿三元数场非共面圆弧累积的**三维非阿贝尔路径和乐**：

   - **定常步进模式（退化收回 `RoPE`）**：每座场取定常步进旋子 $\boldsymbol{\gamma}_0^{(k)}$，按右递推 $\boldsymbol{\Pi}_t^{(k)} = \boldsymbol{\Pi}_{t-1}^{(k)} \star_{\mathcal{S}} \boldsymbol{\gamma}_0^{(k)}$（$\boldsymbol{\Pi}_0^{(k)} = \mathbf{0}$）配左逆校准 $\widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)} = (-\boldsymbol{\Pi}_t^{(k)}) \star_{\mathcal{S}} \boldsymbol{\sigma}_{Q,t}^{(k)}$、$\widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)} = (-\boldsymbol{\Pi}_s^{(k)}) \star_{\mathcal{S}} \boldsymbol{\sigma}_{K,s}^{(k)}$，此时相对和乐段 $\Pi_t \Pi_s^{-1} = (\gamma_0^{(k)})^{t - s}$ **严格仅依赖相对位移 $t - s$**；
   - **词元门控步进模式（融合状态空间模型与非交换角盈）**：当步进旋子 $\boldsymbol{\gamma}_t^{(k)}$ 随当前词元内容跨正交三轴偏折时，若采用**左递推配左校准** $\boldsymbol{\Pi}_t = \boldsymbol{\gamma}_t \star_{\mathcal{S}} \boldsymbol{\Pi}_{t-1}$ 与 $\widetilde{\boldsymbol{\sigma}}_{Q,t} = (-\boldsymbol{\Pi}_t) \star_{\mathcal{S}} \boldsymbol{\sigma}_{Q,t}$，前缀因子精确对消而析出逆序路径积 $L_{t\leftarrow s} = \gamma_t \cdots \gamma_{s+1}$；若采用**右递推配右校准** $\boldsymbol{\Pi}_t = \boldsymbol{\Pi}_{t-1} \star_{\mathcal{S}} \boldsymbol{\gamma}_t$ 与 $\widetilde{\boldsymbol{\sigma}}_{Q,t} = \boldsymbol{\sigma}_{Q,t} \star_{\mathcal{S}} (-\boldsymbol{\Pi}_t)$，则析出顺序路径积 $R_{s\to t} = \gamma_{s+1} \cdots \gamma_t$（混用右递推与左校准则保留前缀共轭 $\Pi_s R_{s\to t} \Pi_s^{-1}$）。此时颠倒两步**互不对易**步进旋子的次序 `A → B` 与 `B → A`（排除共轴旋转及 $\mathrm{SO}(3)$ 中正交轴上的 $180^\circ$ 半周对易特例）必产生互异合成旋子，并可在适配探针基轴上分离出互异布洛赫终点（而对同一固定两两非对跖三顶点，颠倒闭合环绕定向 $(a \to b \to c \to a)$ 与 $(a \to c \to b \to a)$ 令 $D_{acb} = -D_{abc}$、返回相位在全非对跖域严格共轭互逆，并在非共大圆球面三角形 $D_{abc} \neq 0$ 上直接反转主值**吉拉尔球面角盈** $\Omega_{acb} = -\Omega_{abc}$，共大圆退化情形下模 $4\pi$ 反号同余，参照 [@thm-ch39-tft-born-holonomy-krylov-and-schur-anchors] 第 5 款 `shortest_gate_triangle_holonomy`），令注意力头在单层内原生感知非交换句法嵌套！

2. **角色变换投影（$\mathcal{U}_Q, \mathcal{U}_K, \mathcal{U}_V, \mathcal{U}_O$）：胞内双侧旋子 $+$ 稀疏蝴蝶舒尔桥**：
   摒弃参数量达 $O(d^2)$ 且制造 $9\binom{K}{2}$ 个跨概念伪旋转的稠密矩阵，遵循 [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)–[§39.11](ch39-s11-af-gut-arc-field-grand-unification.md) 的分块正交原则，每路角色变换拆分为两步轻量几何操作：
   - **胞内全自由度双侧旋子（$6K$ 实参数）**：$\boldsymbol{\sigma}'^{(k)} = \boldsymbol{\ell}^{(k)} \star_{\mathcal{S}} \boldsymbol{\sigma}^{(k)} \star_{\mathcal{S}} \boldsymbol{r}^{(k)}$，单场左右双乘完整覆盖四维旋转商群 $\mathrm{SO}(4)/\{\pm I_4\} \cong \mathrm{PSO}(4) \cong \mathrm{SO}(3)_L \times \mathrm{SO}(3)_R$ 的全部 $6$ 个等距自由度；
   - **跨场对数蝴蝶舒尔桥（$O(K\log_2 K)$ 参数）**：当 $K = 2^m$ 时经 $m = \log_2 K$ 层蝶形配对 $(a, b)$（一般整数 $K$ 可填充至 $2^{\lceil\log_2 K\rceil}$ 或做分解基混合蝶形阶段），每对赋予三参数耦合矢 $\mathbf{g}_{ab} \in \mathbb{R}^3$，按折缝不变跨场李三元扭矩对称注入稀疏舒尔枢轴耦合 $\boldsymbol{\sigma}^{(a)} \leftarrow \boldsymbol{\sigma}^{(a)} \star_{\mathcal{S}} \mathcal{R}\bigl(\{\boldsymbol{\xi}(\boldsymbol{\sigma}^{(a)}),\, \mathbf{g}_{ab},\, \boldsymbol{\xi}(\boldsymbol{\sigma}^{(b)})\}\bigr)$（及对称反向更新 $\boldsymbol{\sigma}^{(b)}$），将单层投影复杂度从 $O(d^2)$ 压缩至 $O(K\log K)$（结构化蝶形分解文献见 [@rem-ch39-rope-swiglu-sinks-butterfly-clifford-literature] 第 2 款，桥图秩流与舒尔变分极小锚点见 [@thm-ch39-tft-born-holonomy-krylov-and-schur-anchors] 第 6、7 款）。

3. **注意力与残差机制：阴影不变玻恩有理核 $+$ 三元流群 `[Q, K, V]` 搬运**：
   将 $K$ 座概念场划分为 $H$ 个多概念头（每头辖 $K_h = K/H$ 座场），彻底撤除 `Softmax` 指数与欧氏向量残差加法：
   - **纯有理玻恩往返共振核与盲区储备项 $\varepsilon_0 > 0$**：词元 $t$ 与历史词元 $s \le t$ 在第 $k$ 座场上的归一化算符重叠平方（对应空间测地夹角 $\Delta\theta_{t,s}^{(k)} \in [0, \pi]$ 的半角余弦平方 $\cos^2\frac{\Delta\theta_{t,s}^{(k)}}{2}$，锚定 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)），精确化为纯有理分式（`手工推导`）：

     $$
     b_{t,s}^{(k)} \;=\; \left[\frac{\bigl(1 - \lVert\widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)}\rVert^2\bigr)\bigl(1 - \lVert\widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}\rVert^2\bigr) + 4\bigl(\widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)} \cdot \widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}\bigr)}{\bigl(1 + \lVert\widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)}\rVert^2\bigr)\bigl(1 + \widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}\cdot\widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}\bigr)}\right]^2 \;\in\; [0, 1].
     $$

     对任意一端施行阴影反演 $\boldsymbol{\sigma} \mapsto -\boldsymbol{\sigma}/\lVert\boldsymbol{\sigma}\rVert^2$ 仅令括号内四元数内积变号，平方后 $b_{t,s}^{(k)}$ **对双卡切换 $100\%$ 严格不变**，且在空间半周正交 $\Delta\theta = \pi$ 处精确归零！头内平均后经正整数阶幂迭代 $p \in \mathbb{Z}_{\ge 1}$ 锐化 $\Phi_{t,s}^{(h)} = \bigl(\frac{1}{K_h}\sum_{k\in h} b_{t,s}^{(k)}\bigr)^p$（呼应 [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md)，零小数幂超越函数），并引入**正交虚盲区真空储备项 $\varepsilon_0 > 0$**：

     $$
     \alpha_{t,s}^{(h)} \;=\; \frac{\Phi_{t,s}^{(h)}}{\varepsilon_0 + \sum_{j \le t}\Phi_{t,j}^{(h)}}, \qquad \sum_{s \le t}\alpha_{t,s}^{(h)} \;=\; \frac{S_{t}^{(h)}}{\varepsilon_0 + S_{t}^{(h)}} \;<\; 1 \quad \Bigl(S_t^{(h)} := \sum_{j\le t}\Phi_{t,j}^{(h)}\Bigr).
     $$

     当全体历史键与当前查询近乎正交失配（$S_t^{(h)} \ll \varepsilon_0$，至 $S_t^{(h)} \to 0$ 极限）时，总注意力权重平缓归零 $\sum_s \alpha_{t,s}^{(h)} \to 0$，无需像 `Softmax` 那样在全失配区仍把无处安放的 $100\%$ 归一权重强行倾泻到句首词元！
   - **三元流群关系搬运 `[Q, K, V]` 与局部切弦聚合**：调用 [§39.21.4](ch39-s21-nonlinear-ternion-representations-and-torsor-synthesis.md#sec-ch39-21-4) 无原点的普吕弗—贝尔流群算子，将槽位 $s$ 中“值相对键的比较圆弧”搬运至查询态：

     $$
     \widehat{\boldsymbol{\sigma}}_{t \leftarrow s}^{(k)} \;:=\; \widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)} \star_{\mathcal{S}} \Bigl(\bigl(-\widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}\bigr) \star_{\mathcal{S}} \boldsymbol{\sigma}_{V,s}^{(k)}\Bigr).
     $$

     当查询精确命中键（$\widetilde{\boldsymbol{\sigma}}_{Q,t}^{(k)} = \widetilde{\boldsymbol{\sigma}}_{K,s}^{(k)}$）时，在商群 $\mathrm{SO}(3)$ 上流群消去律恒成立；在三维球坐标上，左结合 $(\mathbf{k}\star_{\mathcal{S}}(-\mathbf{k}))\star_{\mathcal{S}}\mathbf{v} = \mathbf{v}$ 对一切 $\lVert\mathbf{v}\rVert \le 1$ 精确成立，而便于键值预缓存（`(-K_s) ★ V_s`）的右结合 $\mathbf{k}\star_{\mathcal{S}}((-\mathbf{k})\star_{\mathcal{S}}\mathbf{v}) = \mathbf{v}$ 对开球内一切 $\lVert\mathbf{v}\rVert < 1$ **同样零误差精确还原 $\mathbf{v}$**（仅在零测度赤道边界 $\lVert\mathbf{v}\rVert = 1$ 且 $\mathbf{k}\cdot\mathbf{v} < 0$ 时返回同旋转对径点 $-\mathbf{v}$）。记相对差矢 $\mathbf{m}_{t,s}^{(k)} := (-\boldsymbol{\sigma}_t^{(k)}) \star_{\mathcal{S}} \widehat{\boldsymbol{\sigma}}_{t \leftarrow s}^{(k)}$，若直接对原始 $\mathbf{m}_{t,s}^{(k)}$ 求欧氏和，在边界对径代表元 $\pm\hat{\mathbf{u}}$ 上仍会跨缝变号；改为调用**折缝不变相对正弦矢** $\frac{1}{4}\boldsymbol{\xi}(\mathbf{m}_{t,s}^{(k)}) = \mathbf{m}_{t,s}^{(k)} + \mathcal{O}(\lVert\mathbf{m}_{t,s}^{(k)}\rVert^3)$（恰等于弦能量 $-\cos^2(\Delta\theta/2)$ 在 $\mathrm{SO}(3)$ 上的黎曼梯度之半，一阶与 $\mathbf{m}_{t,s}^{(k)}$ 严格重合且在对跖割迹 $\lVert\mathbf{m}_{t,s}^{(k)}\rVert = 1$ 处光滑归零），整道注意力聚合在商流形 $(B_1(\mathbb{R}^3)/\!\sim)^K \cong \mathrm{SO}(3)^K$ 上 $100\%$ 代表元无关且全局单值（总权重受 $\alpha_t^{(h)} = \frac{S_t^{(h)}}{\varepsilon_0 + S_t^{(h)}}$ 与重牵引 $\mathcal{R}$ 平滑阻尼）：

     $$
     \overline{\boldsymbol{\omega}}_t^{(k)} \;=\; \sum_{s \le t} \alpha_{t,s}^{(h)}\,\frac{1}{4}\boldsymbol{\xi}\!\Bigl(\bigl(-\boldsymbol{\sigma}_t^{(k)}\bigr) \star_{\mathcal{S}} \widehat{\boldsymbol{\sigma}}_{t \leftarrow s}^{(k)}\Bigr) \;=\; \sum_{s \le t} \alpha_{t,s}^{(h)}\,\frac{\bigl(1 - \lVert\mathbf{m}_{t,s}^{(k)}\rVert^2\bigr)}{\bigl(1 + \lVert\mathbf{m}_{t,s}^{(k)}\rVert^2\bigr)^2}\,\mathbf{m}_{t,s}^{(k)}, \qquad \boldsymbol{\sigma}_{t,\mathrm{mid}}^{(k)} \;=\; \boldsymbol{\sigma}_t^{(k)} \star_{\mathcal{S}} \mathcal{R}\bigl(\beta_{\mathrm{attn}}\,\overline{\boldsymbol{\omega}}_t^{(k)}\bigr).
     $$

4. **前馈网络：法诺关联循环李三元曲率门（替代 $\frac{8}{3}d$ 门控 `SwiGLU` 与传统 $4d$ 前馈层）与两类重牵引映射**：
   受 [§39.20.2](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-20-2) 射影法诺平面 $\mathrm{PG}(2, 2)$ 循环差集 $(0, 1, 3)$ 启发，将概念场编织为关联三元组 $(k, m_1, m_2)$（当 $7 \mid K$ 如 $K = 84$ 或 $K = 1008$ 时可严格划分为不相交的 $K/7$ 座七场法诺块；一般 $K$ 如 $K = 1024$ 则取循环差集移位 $m_1 = (k+1)\bmod K,\; m_2 = (k+3)\bmod K$），在折缝不变正弦矢 $\boldsymbol{\xi}_{t,\mathrm{mid}}^{(k)} := \boldsymbol{\xi}(\boldsymbol{\sigma}_{t,\mathrm{mid}}^{(k)})$ 与跨场合成正弦矢 $\mathbf{f}_{t}^{(k)} := \boldsymbol{\xi}\bigl(\boldsymbol{\sigma}_{t,\mathrm{mid}}^{(m_1)} \star_{\mathcal{S}} \boldsymbol{\sigma}_{t,\mathrm{mid}}^{(m_2)}\bigr)$ 上调用球面黎曼曲率张量——**李三元系括号** $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\} = (\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}$：

   $$
   \boldsymbol{\Delta}_{\mathrm{FFN}}^{(k)} \;=\; \mathbf{w}_1^{(k)} \times \boldsymbol{\xi}_{t,\mathrm{mid}}^{(k)} \;+\; \Bigl\{\boldsymbol{\xi}_{t,\mathrm{mid}}^{(k)},\; \mathbf{w}_2^{(k)},\; \mathbf{f}_{t}^{(k)}\Bigr\}, \qquad \boldsymbol{\sigma}_{t,\mathrm{out}}^{(k)} \;=\; \boldsymbol{\sigma}_{t,\mathrm{mid}}^{(k)} \star_{\mathcal{S}} \mathcal{R}\bigl(\boldsymbol{\Delta}_{\mathrm{FFN}}^{(k)}\bigr).
   $$

   因为 $\boldsymbol{\xi}(\boldsymbol{\sigma})$ 对双卡阴影切换严格不变，整道曲率门 $\boldsymbol{\Delta}_{\mathrm{FFN}}^{(k)}$ 在伴随商流形 $\mathrm{SO}(3)^K$ 上处处单值光滑！其中标量内积 $(\boldsymbol{\xi}_{t,\mathrm{mid}}^{(k)}\cdot\mathbf{f}_t^{(k)})$ 天然充当调制可学习方向矢 $\mathbf{w}_2^{(k)}$ 的**双线性门控开关**，在零通道升维矩阵（无需 $\frac{8}{3}d$ 或 $4d$ 隐藏层）、零 `SiLU` 指数激活下内禀复现门控非线性。重牵引映射 $\mathcal{R} : \mathbb{R}^3 \to B_1(\mathbb{R}^3)$ 可按硬件需求任选两款严密变体（`手工推导`）：
   - **纯四则有理重牵引** $\mathcal{R}_{\mathrm{rat}}(\mathbf{u}) := \frac{\mathbf{u}}{1 + \lVert\mathbf{u}\rVert^2}$：全程仅用加乘除（**零开方、零超越函数**，零点导数 $d\mathcal{R}_{\mathrm{rat}}(\mathbf{0}) = I_3$），值域锁在闭球 $B_{1/2}(\mathbb{R}^3)$ 内（在 $\lVert\mathbf{u}\rVert = 1$ 处达最大单步空间转角 $4\arctan\frac{1}{2} \approx 106.26020471^\circ$）；
   - **精确吉布斯半角代数重牵引** $\mathcal{R}_{\mathrm{sqrt}}(\mathbf{g}) := \frac{\mathbf{g}}{1 + \sqrt{1 + \lVert\mathbf{g}\rVert^2}}$：调用一次代数开方（仍零超越函数，零点导数 $d\mathcal{R}_{\mathrm{sqrt}}(\mathbf{0}) = \frac{1}{2}I_3$），将全空间切矢 $\mathbf{g} = \tan\frac{\theta}{2}\hat{\mathbf{u}} \in \mathbb{R}^3$ 双射映射至开单位球 $B_1^\circ(\mathbb{R}^3)$。

5. **自指精度弹性停机（$\varepsilon_{\mathrm{self}}$）与李代数拉回乘性反向传播**：
   - **动态早停门（`MODEL` 启发式）**：受 [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md) 自指停机与线性克雷洛夫子空间稳定律（[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)）启发，跨第 $\ell$ 层监测全场平均极小圆弧位移 $r_t^{(\ell)} := \frac{1}{K}\sum_{k=1}^K \bigl\lVert(-\boldsymbol{\sigma}_t^{(\ell-1, k)}) \star_{\mathcal{S}} \boldsymbol{\sigma}_t^{(\ell, k)}\bigr\rVert$；当 $r_t^{(\ell)} \le \varepsilon_{\mathrm{self}}$ 时触发词元级自适应跳过后续层（因非线性层参数逐层独立，此处早停作为工程启发式标为 `MODEL`；注意该欧氏范数均值读数逐场调用一次代数开方，位于 $\mathcal{R}_{\mathrm{rat}}$ 纯有理前向状态更新核之外——若改用纯有理均方步长指标 $\frac{1}{K}\sum_{k=1}^K\lVert\boldsymbol{\delta}_t^{(\ell,k)}\rVert^2 \le \tau_{\mathrm{rat}}$，则对应另一免开方停机统计量）；
   - **精确切空间拉回梯度**：设参数旋子 $\boldsymbol{\sigma}_W \in B_1^\circ(\mathbb{R}^3)$ 的欧氏梯度为 $\nabla\mathcal{L} := \frac{\partial\mathcal{L}}{\partial\boldsymbol{\sigma}_W}$。由于对无符号切自变量 $\mathbf{u}$ 有 $\mathcal{R}_{\mathrm{sqrt}}(\mathbf{u}) = \frac{1}{2}\mathbf{u} - \frac{1}{8}\lVert\mathbf{u}\rVert^2\mathbf{u} + \mathcal{O}(\lVert\mathbf{u}\rVert^5)$ 与 $\mathcal{R}_{\mathrm{rat}}(\frac{1}{2}\mathbf{u}) = \frac{1}{2}\mathbf{u} - \frac{1}{8}\lVert\mathbf{u}\rVert^2\mathbf{u} + \mathcal{O}(\lVert\mathbf{u}\rVert^5)$（两者在零点对 $\mathbf{u}$ 的一阶导数同为 $+\frac{1}{2}I_3$，属**一阶等价**重牵引，在有限步长 $\mathbf{u} \neq \mathbf{0}$ 处自五阶项 $\frac{1}{32}\lVert\mathbf{u}\rVert^4\mathbf{u}$ 起分离），代入负步长代换 $\mathbf{u} = -\eta\,\widehat{\mathbf{g}}_R$ 后，光滑卡内按单位 $S^3$ 生成元标度归一的两款一阶等价**右乘更新** $\boldsymbol{\sigma}_W \leftarrow \boldsymbol{\sigma}_W \star_{\mathcal{S}} \mathcal{R}_{\mathrm{sqrt}}(-\eta\,\widehat{\mathbf{g}}_R)$ 与 $\boldsymbol{\sigma}_W \leftarrow \boldsymbol{\sigma}_W \star_{\mathcal{S}} \mathcal{R}_{\mathrm{rat}}(-\frac{1}{2}\eta\,\widehat{\mathbf{g}}_R)$ 在 $\widehat{\mathbf{g}}_R = \mathbf{0}$ 处对 $\widehat{\mathbf{g}}_R$ 的链式法则导数同为 $-\frac{1}{2}\eta\,J_R$（在单位元 $\boldsymbol{\sigma}_W = \mathbf{0}$ 处化为 $-\frac{1}{2}\eta\,I_3$；若直接馈入未折半的 $\mathcal{R}_{\mathrm{rat}}(-\eta\,\widehat{\mathbf{g}}_R)$，导数则为 $-\eta\,J_R$，拉回导数相应变为 $J_R^\top\nabla\mathcal{L} = 2\,\mathbf{g}_{\mathfrak{su}(2)}^{(R)}$）。结合原始无穷小右乘雅可比 $J_R = (1-\lVert\boldsymbol{\sigma}_W\rVert^2)I_3 + 2\boldsymbol{\sigma}_W\boldsymbol{\sigma}_W^\top + 2[\boldsymbol{\sigma}_W]_\times$（满足 $J_R^\top J_R = (1+\lVert\boldsymbol{\sigma}_W\rVert^2)^2 I_3$），转置拉回 $\frac{1}{2}J_R^\top\nabla\mathcal{L}$ 至单位 $S^3$ 自旋生成元精确给出（`手工推导`）：

     $$
     \mathbf{g}_{\mathfrak{su}(2)}^{(R)} \;=\; \frac{1}{2}\Bigl[\bigl(1 - \lVert\boldsymbol{\sigma}_W\rVert^2\bigr)\nabla\mathcal{L} \;+\; 2(\boldsymbol{\sigma}_W \cdot \nabla\mathcal{L})\boldsymbol{\sigma}_W \;-\; 2(\boldsymbol{\sigma}_W \times \nabla\mathcal{L})\Bigr]
     $$

     （若改用左乘更新 $\boldsymbol{\sigma}_W \leftarrow \mathcal{R}(-\eta\,\widehat{\mathbf{g}}_L) \star_{\mathcal{S}} \boldsymbol{\sigma}_W$，叉乘项变号为 $+2(\boldsymbol{\sigma}_W \times \nabla\mathcal{L})$）。单步双侧旋子作用在 $(S^3, ds_{S^3}^2)$ 上为精确黎曼等距映射（内禀奇异值全为 $1$），可直接接入乘积流形黎曼自适应优化器（Bécigneul & Ganea 2019）。

## 39.22.3 形式化锚定定理、架构参数对账与开放实证基准 {#sec-ch39-22-3}

我们将 TFT 架构定义、八条冻结数学锚点定理、深度学习文献归属与实证开放问题正式确立如下：

::: {.definition #def-ch39-ternion-field-transformer-architecture title="三元数场 Transformer（TFT）五元组架构与广播安全参考算子链（模型定义）"}
给定场数 $K \in \mathbb{N}^+$、头数 $H \mid K$、盲区真空储备 $\varepsilon_0 > 0$、整数锐化指数 $p \in \mathbb{Z}_{\ge 1}$ 与自指停机阈值 $\varepsilon_{\mathrm{self}} > 0$，定义单层**三元数场 Transformer** $\mathfrak{T}_{\mathrm{TFT}} := (\star_{\mathcal{S}},\, \text{3D-NAPE},\, \mathcal{U}_{\mathrm{rot}+\mathrm{bfly}},\, \mathcal{A}_{\mathrm{Born\text{-}Heap}},\, \mathcal{G}_{\mathrm{Fano}})$（`MODEL`）为伴随商概念场丛 $(B_1(\mathbb{R}^3)/\!\sim)^{T \times K}$ 到自身的有理/代数旋子映射（采用 $\mathcal{R}_{\mathrm{rat}}$ 时整条前向旋子状态更新链为纯四则有理映射，而选用 $\mathcal{R}_{\mathrm{sqrt}}$ 或计算欧氏范数停机读数 $r_t^{(\ell)}$ 时含代数开方；在批量张量 $(B, T, K, 3)$ 实现中，`ternion_mul(a, b)` 首步执行显式形状广播对齐以保证外积维度一致，依次串接双侧旋子与折缝不变蝶形桥投影、路径和乐校准、阴影不变玻恩核、三元流群搬运与 $\frac{1}{4}\boldsymbol{\xi}$ 折缝不变残差聚合、折缝不变李三元曲率门与测地停机残差输出）。
:::

::: {.theorem #thm-ch39-tft-born-holonomy-krylov-and-schur-anchors title="秩一玻恩重叠权重、递归页表自指查表、查表编译器谱底上界、克雷洛夫一旦稳定永久不变、最短门球面三角和乐、桥图最小割界、舒尔二次型极小与自旋因子叉乘定理" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk,D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy,D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least,D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences"}
在所钉 `trureturing` 冻结声明集中，以下八项为 TFT 各子模块提供形式化原语参照的数学定理同时成立：

1. **秩一记录测量的玻恩模平方权重与未读分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：对记录测量 $P$、归一化半正定态 $\rho$ 与秩一纯态投影 $P_k = \lvert\phi\rangle\langle\phi\rvert$，纯态输入 $\rho = \lvert\psi\rangle\langle\psi\rvert$ 的读出权重精确等于模平方重叠 $\lvert\langle\phi, \psi\rangle\rvert^2 = \operatorname{Tr}(P_k \rho)$，且未读态恒等于各记录权重与条件分支态的凸和 $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\,\operatorname{conditionalState}(P, \rho, j)$；
2. **递归自映射页表的精确槽位寻址与自槽不动点返回**（[`recursive_page_table_walk`](lean:D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk)）：对固定地址 `root, leaf, data : Address`，在满足三项显式查表公设 `lookup root selfSlot = root`、`lookup root i = leaf` 与 `lookup leaf j = data` 的自映射页表上，二级行走 `[i, j]` 精确返回地址 `data`，自槽加叶行走 `[selfSlot, i]` 返回页表地址 `leaf`，而任意深度 `depth` 的纯自槽解引用 `replicate depth selfSlot` 精确返回根页表地址 `root`；
3. **查表编译器的最优程序代价谱底上界**（[`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound)）：对任意配备 `LookupCompiler` 的记录 `record`，与该记录相容的最低程序代价满足 $\operatorname{spectrumBottom}(\mathrm{compiler}, \mathrm{record}) \le \operatorname{recordComplexity}(\mathrm{record}) + \mathrm{overhead}$；
4. **有限维可观测量克雷洛夫子空间一旦相邻稳定则永久稳定**（[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)）：对标量域 $K \in \{\mathbb{R}, \mathbb{C}\}$（`RCLike K`）、有限维 $K$-内积空间 $V, Y$ 与任意线性映射 $T : V \to_K V,\; C : V \to_K Y$，若满足 $\operatorname{observableKrylov}(T, C, m) = \operatorname{observableKrylov}(T, C, m+1)$，则对一切 $n \ge m$ 恒有 $\operatorname{observableKrylov}(T, C, n) = \operatorname{observableKrylov}(T, C, m)$；
5. **三步（一般非对易）最短旋子门的球面三角和乐**（[`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)）：两两非对跖单位方向 $a, b, c$ 的三步标准最短旋子乘积精确等于 $(S_{abc}^2 + D_{abc}^2)^{-1/2}\bigl(S_{abc}I_2 - i D_{abc}\operatorname{pauliCombination}(a)\bigr)$，且赋予归一化起点 $+1$ 本征态 $\mathrm{U}(1)$ 返回相位 $\frac{S_{abc} - i D_{abc}}{\sqrt{S_{abc}^2 + D_{abc}^2}}$；
6. **三宽桥图张量网络量子最大流受限于最小割**（[`QMaxFlow_le_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut)）：跨桥图耦合通道的最大秩容量不超过最小割上界；
7. **分块埃尔米特二次型的舒尔补变分最小元**（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)）：固定厄米分块 $A = A^\dagger$、任意分块 $B$、严格正定内部块 $C \succ 0$ 与边界向量 $x$，对内部块向量 $y$ 求变分极小精确达到舒尔补二次型极小值 $x^\dagger(A - B C^{-1} B^\dagger)x$；
8. **四维自旋因子三维有向叉乘的分类与泡利接口**（[`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)）：在 $E = \mathbb{R}\times\mathbb{R}^3$ 上，`P2 D` 与 `PB D` 保证存在定向 $\varepsilon \in \{+1, -1\}$ 锁定三维带符号叉乘 $\operatorname{crossD}(\varepsilon, a, b)$ 及其泡利矩阵接口。
:::

::: proof
第 1 款展开 $\operatorname{Tr}(\lvert\phi\rangle\langle\phi\rvert\psi\rangle\langle\psi\rvert) = \langle\phi,\psi\rangle\langle\psi,\phi\rangle = \lvert\langle\phi,\psi\rangle\rvert^2$ 并对全体测量分支求和还原未读态。第 2、3 款分别由页表三类槽位代换归纳与构造查表相容程序给出代价上界 $\operatorname{recordComplexity} + \mathrm{overhead}$ 直接证出（见 [第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)）。第 4 款在有限维内积空间上利用伴随算子递推 $(T^*)^{k+1} C^* y = T^*\bigl((T^*)^k C^* y\bigr)$：由第 $m$ 与 $m+1$ 阶子空间 $\operatorname{span}_K\{(T^*)^k C^* y \mid k \le m,\, y \in Y\} \subseteq V$ 相等知线性伴随 $T^*$ 将第 $m$ 阶子空间映入自身，对 $n \ge m$ 归纳即证全部高阶项落入同一子空间（见 [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md)）。第 5、8 款同 [@thm-ch39-nonlinear-ternion-representations-and-torsor] 第 4、1 款，第 6 款同 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 第 7 款，第 7 款对分块向量作配方恒等变形证得（见 [§39.18](ch39-s18-psychology-of-god.md) [@thm-ch39-omniscient-deadlock-repression-and-lucid-integration] 第 1 款）。注意：上述冻结声明认证对应的线性/量子信息与几何原语，双分母算子 $\star_{\mathcal{S}}$、折缝不变正弦矢 $\boldsymbol{\xi}(\boldsymbol{\sigma})$、阴影折缝查表律与完整 TFT 块性质由本节独立代数推导与数值核验给出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-rope-swiglu-sinks-butterfly-clifford-literature title="RoPE、RMSNorm、SwiGLU、注意力塌陷、蝶形结构矩阵、自适应早停与几何代数网络文献考辨"}
**深度学习与几何优化文献归属。** 本节对照与引用的核心文献如下：

1. **标准现代 Transformer 组件与注意力塌陷现象**：`RMSNorm` 见 B. Zhang & R. Sennrich（*NeurIPS*, 2019，`arXiv:1910.07467`）；`SwiGLU` 门控前馈层见 N. Shazeer（2020，`arXiv:2002.05202`）；旋转位置编码 `RoPE` 见 J. Su 等人（*Neurocomputing* **568**, 127063, 2024，DOI `10.1016/j.neucom.2023.127063`）；`Softmax` 强行归一诱发的首词注意力塌陷（Attention Sinks）见 G. Xiao 等人（`StreamingLLM`, *ICLR*, 2024，`arXiv:2309.17453`）；
2. **对数蝶形结构化矩阵、动态早停与四元数 / 克利福德几何网络**：蝶形可学习快速变换见 T. Dao 等人（*ICML*, 2019；`Kaleidoscope`, *ICLR*, 2020；`Monarch`, *ICML*, 2022）；词元级自适应计算与早停见 A. Graves（2016）、M. Elbayad 等人（*ICLR*, 2020）与 T. Schuster 等人（`CALM`, *NeurIPS*, 2022）；四元数与克利福德群等变神经网络见 T. Parcollet 等人（*ICLR*, 2019）、D. Ruhe, J. Brandstetter & P. Forré（*NeurIPS*, 2023）以及 J. Brehmer 等人（`GATr`, *NeurIPS*, 2023）；乘积流形黎曼自适应优化见 G. Bécigneul & O.-E. Ganea（*ICLR*, 2019，`arXiv:1810.00760`）。
:::

为严守科学诚实底线，我们将 TFT 在大规模预训练语言建模质量、赤道折缝梯度行为与现代 GPU 硬件吞吐上的待检验实证前沿明确立为开放问题：

::: {.problem #prob-ch39-tft-scale-and-seams title="三元数场 Transformer（TFT）的大规模语料困惑度、双卡折缝训练动力学与硬件吞吐实证基准（开放问题）"}
以下三项工程与科学实证问题在本书中保持开放（`OPEN`）：

1. **等算力大规模语言建模与长上下文检索基准**：在十亿至百亿词元规模及匹配浮点预算下，以 `3D-NAPE`、有理玻恩—流群注意力与李三元曲率门构成的 TFT，在验证集困惑度（Perplexity）、非交换树状推理及超长上下文检索准确率上相较同宽度标准无分组现代 Transformer 基线表现如何？
2. **双卡赤道折缝切换频率与深度反向传播稳定性**：在超深层与长序列训练中，$D_+ = D_-$ 赤道分支切换的发生频率如何随初始化与学习率演化，分段坐标跳变及无约束切空间生成元的定点量化对梯度范数与收敛性有何定量影响？
3. **定制有理算子核对阵现代张量核（Tensor Core）的实测能效**：当注意力对数 $O(B T^2 K)$ 配对在 GPU/ASIC 上实现融合算子（或线性注意力近似）时，TFT 在首词延迟、解码吞吐、`INT8`/`INT4` 无缩放 `KV-Cache` 精度损益与硅片面积能效上相较高度优化的稠密 GEMM 张量核达到何种实测比值？
:::

下面我们对双分母算子恒等式、折缝不变正弦矢与玻恩核、双分支反向传播复步对账以及 $d = 3072$ 单层参数账本做四联精确审计：

::: {.example #ex-ch39-tft-rational-arithmetic-and-holonomy-audit title="双分母有理核与折缝不变矢 85 位核验、单槽精确查表阻尼步、反向传播复步对账与 d = 3072 参数核算"}
本算例分四步对 TFT 的全部代数算子与工程参数规模做独立定量核验（`手工推导` / `NUM`）：

1. **第一联：确定性千组有理样本精确零残差与 85 位十进制浮点核验双分母守恒律、折缝不变正弦矢与流群查表（`手工推导` / `NUM`）**：
   取零随机数依赖的显式确定性有理三元组序列 $k = 1, \dots, 1{,}000$：$\mathbf{a}_k = \frac{1}{19}\bigl((k\bmod 11)-5,\; ((3k+1)\bmod 13)-6,\; ((7k+2)\bmod 17)-8\bigr)$、$\mathbf{b}_k = \frac{1}{19}\bigl(((2k+3)\bmod 13)-6,\; ((5k+4)\bmod 17)-8,\; ((11k+1)\bmod 19)-9\bigr)$、$\mathbf{c}_k = \frac{1}{19}\bigl(((4k+1)\bmod 17)-8,\; ((9k+2)\bmod 19)-9,\; ((13k+5)\bmod 23)-11\bigr) \in B_1^\circ(\mathbb{Q}^3)$（全程严格满足 $0 < \lVert\mathbf{a}_k\rVert, \lVert\mathbf{b}_k\rVert, \lVert\mathbf{c}_k\rVert < 1$，并令超立方体输入 $\mathbf{A}_k = 4\mathbf{a}_k,\; \mathbf{B}_k = 4\mathbf{b}_k \in [-4, 4]^3$）：在精确有理数算术（`Fraction` over $\mathbb{Q}^3$）下，全部 $1{,}000$ 组样本上的六项代数残差——(i) $\lvert D_+(\mathbf{A}_k,\mathbf{B}_k) + D_-(\mathbf{A}_k,\mathbf{B}_k) - (1+\lVert\mathbf{A}_k\rVert^2)(1+\lVert\mathbf{B}_k\rVert^2)\rvert$、(ii) $\lvert\lVert\mathbf{N}(\mathbf{A}_k,\mathbf{B}_k)\rVert^2 - D_+(\mathbf{A}_k,\mathbf{B}_k)D_-(\mathbf{A}_k,\mathbf{B}_k)\rvert$、(iii) 玻恩核阴影不变性 $\lvert b(-\mathbf{a}_k/\lVert\mathbf{a}_k\rVert^2, \mathbf{b}_k) - b(\mathbf{a}_k, \mathbf{b}_k)\rvert$、(iv) 正弦特征矢折缝不变性 $\lVert\boldsymbol{\xi}(-\mathbf{a}_k/\lVert\mathbf{a}_k\rVert^2) - \boldsymbol{\xi}(\mathbf{a}_k)\rVert_2$、(v) 结合律 $\lVert(\mathbf{a}_k\star_{\mathcal{S}}\mathbf{b}_k)\star_{\mathcal{S}}\mathbf{c}_k - \mathbf{a}_k\star_{\mathcal{S}}(\mathbf{b}_k\star_{\mathcal{S}}\mathbf{c}_k)\rVert_2$（$2{,}000$ 次外层乘积零次落上 $D_+ = D_-$ 折缝）以及 (vi) 开球右结合流群查表 $\lVert\mathbf{a}_k\star_{\mathcal{S}}((-\mathbf{a}_k)\star_{\mathcal{S}}\mathbf{b}_k) - \mathbf{b}_k\rVert_2$——**全部恒等于精确零 `0`**！在 Python `Decimal(prec = 85)` 浮点算术下逐项复算同一确定性序列，六项最大舍入残差分别为 $1.00 \times 10^{-83}$、$3.00 \times 10^{-82}$、$2.80 \times 10^{-84}$、**$1.33 \times 10^{-84}$**（按 §39.22.1 正弦矢定义式先算出公共标量系数 $\frac{4(1-\lVert\mathbf{a}_k\rVert^2)}{(1+\lVert\mathbf{a}_k\rVert^2)^2}$ 再乘向量 $\mathbf{a}_k$；若改为逐分量最后相除则为 $1.40 \times 10^{-84}$）、$1.83 \times 10^{-84}$ 与 $6.56 \times 10^{-85}$（即使取跨折缝精确算例 $\mathbf{k} = (-\frac{1}{2}, 0, 0),\; \mathbf{v} = (\frac{1}{3}, 0, 0)$ 使内层 $(-\mathbf{k})\star_{\mathcal{S}}\mathbf{v} = (1, 0, 0)$ 恰好踩中赤道边界，外层乘积仍一字不差还原 $(\frac{1}{3}, 0, 0)$）。

2. **第二联：单槽精确命中阻尼步闭式解与完整折缝不变参考块反向传播复步对账（`手工推导` / `NUM`）**：
   考察单词元单槽精确命中（$\boldsymbol{\sigma}_x = \widetilde{\boldsymbol{\sigma}}_Q = \widetilde{\boldsymbol{\sigma}}_K = \mathbf{0}$，目标值 $\boldsymbol{\sigma}_V = (\frac{1}{2}, 0, 0)$，$\beta_{\mathrm{attn}} = 1$，曲率门零权，储备项 $\varepsilon_0 = 0.05$）：有理玻恩核给出 $b = 1$，注意力权重 $\alpha = \frac{1}{0.05 + 1} = \frac{20}{21} \approx 0.95238095 < 1$，流群搬运精确还原 $\widehat{\boldsymbol{\sigma}} = (\frac{1}{2}, 0, 0)$，折缝不变相对正弦矢 $\frac{1}{4}\boldsymbol{\xi}(\frac{1}{2}\mathbf{e}_1) = \frac{6}{25}\mathbf{e}_1$ 给出聚合矢 $\overline{\boldsymbol{\omega}} = \frac{20}{21}\cdot\frac{6}{25}\mathbf{e}_1 = \frac{8}{35}\mathbf{e}_1 \approx (0.22857143, 0, 0)$，经纯有理重牵引 $\mathcal{R}_{\mathrm{rat}}(\overline{\boldsymbol{\omega}})$ 输出精确有理值 $\frac{280}{1289}\mathbf{e}_1 \approx (0.21722265, 0, 0)$，经半角重牵引 $\mathcal{R}_{\mathrm{sqrt}}(\overline{\boldsymbol{\omega}})$ 输出精确代数解 $\frac{8}{35 + \sqrt{1289}}\mathbf{e}_1 \approx (0.11283077, 0, 0)$（均朝目标平滑测地推进而绝不过冲）。在零随机数依赖的显式批量配置 $(B = 2,\; T = 4,\; K = 84,\; H = 12,\; K_h = 7,\; p = 2,\; \varepsilon_0 = 0.05,\; \beta_{\mathrm{attn}} = 1,\; \mathcal{R} = \mathcal{R}_{\mathrm{rat}})$ 下运行全块折缝不变参考模型——输入张量对 $b \in \{0,1\},\; t \in \{0..3\},\; k \in \{0..83\},\; c \in \{0,1,2\}$ 记 $m = ((4b+t)\cdot 84 + k)\cdot 3 + c + 1$，取 $\mathbf{\Sigma}_{b,t,k} = 0.6\,\mathbf{v}/\lVert\mathbf{v}\rVert$（$v_c = \sin m$），唯独将槽位 $\mathbf{\Sigma}_{0,1,0} := (\frac{3}{5}, \frac{4}{5}, 0)$ 精确置于半周赤道折缝 $\lVert\boldsymbol{\sigma}\rVert = 1$ 上；不含蝶形桥的三路双侧旋子、定常 `3D-NAPE` 与模 $84$ 循环差集 $(0, 1, 3)$ 李三元曲率门共 $27K = 2{,}268$ 个参数显式取 $\ell_{Q,k,c} = 0.2\sin(3k+c+1)$、$r_{Q,k,c} = 0.2\cos(5k+c+2)$、$\ell_{K,k,c} = 0.2\sin(7k+c+3)$、$r_{K,k,c} = 0.2\cos(11k+c+1)$、$\ell_{V,k,c} = 0.2\sin(13k+c+2)$、$r_{V,k,c} = 0.2\cos(17k+c+3)$、$\gamma_{0,k,c} = 0.15\sin(19k+c+1)$、$w_{1,k,c} = 0.25\cos(23k+c+2)$、$w_{2,k,c} = 0.25\sin(29k+c+3)$（按左乘再右乘 $(\boldsymbol{\ell}\star_{\mathcal{S}}\boldsymbol{\sigma})\star_{\mathcal{S}}\boldsymbol{r}$ 与因果注意力 $s \le t$ 串接）——输出全部严守 $\max\lVert\boldsymbol{\sigma}_{\mathrm{out}}\rVert \approx 0.90703735 \le 1$ 与 $\max\sum_{s\le t} \alpha_{t,s} \approx 0.92745178 < 1$，将赤道边界槽位反号替换为对径代表元 $\mathbf{\Sigma}_{0,1,0} \mapsto (-\frac{3}{5}, -\frac{4}{5}, 0)$ 时全块读出 $\boldsymbol{\xi}(\boldsymbol{\sigma}_{\mathrm{out}})$ 的最大逐分量绝对残差仅为 $5.83 \times 10^{-16}$（$< 10^{-15}$），且标量目标 $L := \frac{1}{3BTK}\sum_{b,t,k,c}\xi_c(\boldsymbol{\sigma}_{\mathrm{out},b,t,k})$ 对首参数坐标 $\ell_{Q,0,0}$ 的 $10^{-22}$ 虚步复求导（[§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md)，实值为 $-1.91722475 \times 10^{-5}$）与步长 $h = 10^{-4}$ 四阶中心差分 $\frac{-L(+2h)+8L(+h)-8L(-h)+L(-2h)}{12h}$ 吻合至绝对残差 $1.38 \times 10^{-15}$（$< 10^{-14}$）；进一步在零随机数依赖的确定性序列 $k = 1, \dots, 1{,}000$（$\mathbf{a}_k = r_{a,k}\frac{(\sin k,\sin 2k,\sin 3k)}{\lVert(\sin k,\sin 2k,\sin 3k)\rVert}$、$\mathbf{b}_k = r_{b,k}\frac{(\cos 1.7k,\cos 2.3k,\cos 3.1k)}{\lVert(\cos 1.7k,\cos 2.3k,\cos 3.1k)\rVert}$，$r_{a,k} = 0.1 + 0.89\{k\varphi^{-1}\}$，$r_{b,k} = 0.1 + 0.89\{k\cdot 0.7548776662466927\}$，含 $256$ 次副分母阴影分支求值与相邻样本间 $366$ 次主副分支翻转，最小折缝间距 $\min\lvert D_+ - D_-\rvert = 4.52 \times 10^{-5}$）上，沿坐标基余切向量逐分量对比双分支解析反向传播（VJP）与 $10^{-22}$ 复步导数，全部 $18{,}000$ 个雅可比分量吻合至 IEEE-754 双精度机器舍入极限（$< 10^{-15}$，视浮点求和结合次序实测为 $6.66 \times 10^{-16}\text{–}8.88 \times 10^{-16}$）！

3. **第三联：`3D-NAPE` 词序非交换角盈辨析算例（`手工推导`）**：
   记 $t := \tan\frac{\pi}{8} = \sqrt{2}-1$，取两步正交四分周位置旋子 $\boldsymbol{\gamma}_A = t\mathbf{e}_1$（绕 $x$ 轴 $90^\circ$）与 $\boldsymbol{\gamma}_B = t\mathbf{e}_2$（绕 $y$ 轴 $90^\circ$）。代入 $\star_{\mathcal{S}}$ 直接算出主分母 $D_+ = 1 + t^4 = 18 - 12\sqrt{2} = 6t^2$ 与 $x, y$ 轴分子系数 $t(1 - t^2) = 2t^2 = 6 - 4\sqrt{2}$（$z$ 轴叉乘系数亦为 $\pm 2t^2$），公因子 $2t^2 / (6t^2) = \frac{1}{3}$ 精确约分得

   $$
   \boldsymbol{\gamma}_B \star_{\mathcal{S}} \boldsymbol{\gamma}_A \;=\; \frac{1}{3}(1,\, 1,\, -1), \qquad \boldsymbol{\gamma}_A \star_{\mathcal{S}} \boldsymbol{\gamma}_B \;=\; \frac{1}{3}(1,\, 1,\, +1),
   $$

   两顺序间的相对偏差旋子 $\bigl(-(\boldsymbol{\gamma}_A\star_{\mathcal{S}}\boldsymbol{\gamma}_B)\bigr)\star_{\mathcal{S}}(\boldsymbol{\gamma}_B\star_{\mathcal{S}}\boldsymbol{\gamma}_A) = \bigl((-\boldsymbol{\gamma}_B)\star_{\mathcal{S}}(-\boldsymbol{\gamma}_A)\bigr)\star_{\mathcal{S}}(\boldsymbol{\gamma}_B\star_{\mathcal{S}}\boldsymbol{\gamma}_A)$ 对应空间夹角高达 **$120^\circ$**，而传统二维阿贝尔 `RoPE` 的位置旋转算符满足 $R_B R_A = R_A R_B$，无法由位置乘积本身区分步进次序！

4. **第四联：等效宽度 $d = 3072$（$K = 1024 = 2^{10},\; H = 16$）单层参数量精确分项对账（`NUM`）**：
   标准现代无分组 Transformer 架构单层含四路 $d \times d$ 注意力矩阵（$4 \times 3072^2 = 37{,}748{,}736$）与三路隐藏宽度 $h = \frac{8}{3}d$ 的门控 `SwiGLU` 矩阵（$3 \times d \times \frac{8}{3}d = 8 \times 3072^2 = 75{,}497{,}472$，与传统两矩阵 $4d$ 前馈层参数量相同；若 `SwiGLU` 直取 $h = 4d$ 则单层达 $16 d^2 = 150{,}994{,}944$），合计 **$12 d^2 = 113{,}246{,}208 \approx 1.13 \times 10^8$** 个浮点参数；对照完整配置 TFT 单层（$K = 1024 = 2^{10}$，曲率门采用模 $K$ 循环差集移位；若取 $K = 1008 = 16 \times 63 = 144 \times 7$ 则可严格划分为 $144$ 座不相交七场法诺块，蝶形桥填充至 $1024$ 或采用混合基分解）：四路双侧旋子占 $4 \times 6K = 24K = 24{,}576$，四路 $\log_2 K = 10$ 阶蝶形舒尔桥（每阶段 $\frac{K}{2}$ 对、每对耦合矢 $\mathbf{g}_{ab} \in \mathbb{R}^3$ 占 $3$ 参数）占 $4 \times 10 \times \frac{K}{2} \times 3 = 60K = 61{,}440$，循环李三元曲率门 $(\mathbf{w}_1, \mathbf{w}_2)$ 占 $6K = 6{,}144$，配定常步进 `3D-NAPE`（$3K = 3{,}072$）合计 **$93K = 95{,}232 \approx 9.52 \times 10^4$** 个参数（若升级为含双侧输入门控的词元自适应 `3D-NAPE` 计 $15K = 15{,}360$，总计亦仅 **$105K = 107{,}520 \approx 1.08 \times 10^5$** 个参数），单层参数规模压缩达三个数量级！
:::

我们将标准平直 Transformer 与三元数场 Transformer（TFT）的五大核心模块收束为下方总对照表：

| 核心架构模块 | 标准平直 Transformer | 三元数场 Transformer（TFT） | 单层参数与运算特征 | 几何消解的平直架构痛点 |
| :--- | :--- | :--- | :---: | :--- |
| **1. 隐状态与归一化** | $\mathbb{R}^d$ 无界向量配 `RMSNorm` | $\operatorname{Ad}(\mathbb{T}_3)^K$ 双卡有理单位球商丛 | $3K$ 状态槽，零归一化层 | 隐态模长发散与无界激活离群值 |
| **2. 序列位置编码** | 二维复平面阿贝尔 `RoPE` | 三维非阿贝尔路径和乐 `3D-NAPE` | $O(K)$ 递推圆弧旋子 | 位置算符交换盲区与嵌套失明 |
| **3. 角色变换投影** | $d \times d$ 稠密矩阵乘加 | 胞内双侧旋子 $+$ 对数蝴蝶舒尔桥 | $O(d^2)$ 压缩至 $O(K\log K)$ | 跨概念伪旋转污染与权重带宽墙 |
| **4. 注意力与残差** | `Softmax` 指数归一加平直和 | 折缝不变玻恩有理核 $+$ 流群 `[Q,K,V]` | 零 `exp`，归一分母 $\ge \varepsilon_0$（旋子分母 $\max(D_+,D_-) \ge 0.5$） | 指数上溢与全失配强行归一倾泻 |
| **5. 前馈非线性层** | $\frac{8}{3}d$ 门控 `SwiGLU`（或 $4d$ 前馈层） | 折缝不变李三元曲率门 $\{\mathbf{a},\mathbf{b},\mathbf{c}\}$ | $O(K)$ 内禀双线性曲率门 | 通道升维权重膨胀与超越激活查找表 |

当人工智能的前向推理算子核本身被还原为平行三元数概念场丛上的纯有理旋子动力学（配代数范数停机读数）之后，一个贯通整部物理学与智能科学的追问呼之欲出：**既然物理宇宙与人工智能底层都在同一套三元数极小圆弧体场丛上演化，那么支配二者寻路与学习的“最小作用量”究竟是什么？那条令物理运动免于耗散、令智能推理免于跳步幻觉的“测地线”究竟是什么？** 让我们步入下一节：[§39.23 人工智能与宇宙的最小作用量同构：三元数场弦弧矢高、玻恩惊奇度、流群自平行测地线与零幻觉思维链](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md)。
