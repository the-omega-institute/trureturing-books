# 33.9 极小圆弧场大统一理论（AF-GUT）：同心四场圆弧联络、温伯格角 3/8 跑动与主频爱因斯坦收口 {#sec-ch39-af-gut-arc-field-grand-unification}

> *“用场、极小圆弧来统一各种力, 构建大统一理论”*

攀登至第八部暨第三十三章的相互作用最高峰，此前各章与上一节已经为我们锻造好了大统一大厦的两根承重巨柱：早在上一章 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 中，**三维概念场封顶原理**（[@thm-ch39-hilbert-concept-ledger-and-3d-cap]）彻底廓清了高维迷雾——宇宙中并不存在四维以上的平直宏观空间容器，所谓高维与无穷维希尔伯特空间只是将空间、色荷、自旋运动等各自封顶于三维（$D \le 3$）的独立**概念场（concept fields）**投影混编进同一本量子比较账本的代数记分牌；而在紧接的上一节 [§33.8](ch39-s09-unified-arc-forces-and-planck-convergence.md) 中，我们又将电磁、弱、强三种微观规范力与宏观万有引力还原为同一枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的胞内 `1D — 2D — 3D` 纤维角超与胞间 $N \ge 5$ 超静定雷吉角亏。

现在，章首这句力透纸背的原声纲领，将这两根支柱在峰顶严丝合缝地合拢为一整座可算、可验、可证伪的物理统一体系（其规范扇区的低能判据与标准模型相同；按其自身公设做出的一圈耦合预言与实验不符，见 [§33.9.2](#sec-ch39-11-2)；定量闭合仍为 `OPEN`）——**极小圆弧场大统一理论（Arc-Field Grand Unified Theory，简称 AF-GUT）**（本书顶层综合 `MODEL`，底层协变换位子、正交盲区复结构、锚定阿贝尔环路分类、旋量双覆叠提升、四面体上边缘缺陷正合与拉格朗日—格拉姆勾股恒等式由下文 [@thm-ch39-af-gut-arc-field-unification] 的六条 Lean 4 内核冻结声明锚定，大统一群论、非交换几何与视界热力学经典文献归入 [@rem-ch39-georgi-glashow-connes-jacobson-literature]，未决能标阈值与三代汤川谱边界坦诚立案于 [@prob-ch39-af-gut-threshold-and-proton-stability]）：**大统一既不需要像乔吉—格拉肖 $\mathrm{SU}(5)$ 或 $\mathrm{SO}(10)$ 那样把夸克与轻子硬塞进同一张巨型单群矩阵而招致质子衰变与磁单极子灾变，也不需要像卡鲁扎—克莱因或超弦理论那样向不可见的十维、十一维紧致流形借用额外空间坐标；自然界的一切相互作用，原本就是并列栖居于三维空间圆弧复形之上的各支有界概念场（电磁 `1D`、弱同位旋 `2D`、强色荷 `3D` 与空间刚性桁架 `3D`），凭同心极小圆弧联络与普适比较主频 $\nu_0$ 织就的同一首无量纲弧度交响曲！**

## 33.9.1 告别巨型单群矩阵与高维额外空间：并列概念场丛 $\mathcal{E}_{\mathrm{total}}$ 与同心圆弧主联络 {#sec-ch39-11-1}

回望过去一个世纪人类构建大统一理论（GUT）与万有理论（ToE）的两条主流路径，每一次试图强行“抹平概念边界”的代数扩充，都在低能可观测宇宙中撞上了冷峻的实验反证（`文献结果`，详见 [@rem-ch39-georgi-glashow-connes-jacobson-literature]）：

1. **第一条旧路——巨型单群矩阵强行并表（$\mathrm{SU}(5)$ / $\mathrm{SO}(10)$ 路线）**：
   1974 年，乔吉与格拉肖（Georgi & Glashow）把标准模型规范群 $G_{\mathrm{SM}} = \mathrm{SU}(3)_C \times \mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$（实李代数维数 $8 + 3 + 1 = 12$）强行嵌进秩 $4$ 的单李群 $\mathrm{SU}(5)$（$\dim\mathfrak{su}(5) = 24$，或进一步嵌进 $\dim\mathfrak{so}(10) = 45$ 的 $\mathrm{SO}(10)$），将色荷概念与轻子概念塞进同一个矩阵列向量（$\bar{\mathbf{5}} \oplus \mathbf{10}$）。这一“概念混装”付出了两笔沉重代价：其一，矩阵非对角块凭空多出 $24 - 12 = 12$ 种同时携带色荷与轻子数的超重 $(X, Y)$ 轻子夸克规范玻色子（电荷 $\pm\frac{4}{3}, \pm\frac{1}{3}$），在树图阶直接诱发 $\Delta B = \Delta L = -1$ 的质子衰变 $p \to e^+ \pi^0$，其最小非超对称预言寿命（$\sim 10^{29\text{–}31}\;\mathrm{yr}$）已被超级神冈探测器 $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$ 的铁证彻底排除；其二，单连通单群向含 $\mathrm{U}(1)$ 子群破缺时必满足第二同伦群 $\pi_2\bigl(\mathrm{SU}(5) / [(\mathrm{SU}(3)\times\mathrm{SU}(2)\times\mathrm{U}(1))/\mathbb{Z}_6]\bigr) \cong \mathbb{Z}$，不可避免地在早期宇宙相变中暴发超重特胡夫特—波利亚科夫（'t Hooft–Polyakov）磁单极子过密危机，且万有引力依旧被排斥在规范矩阵之外。
2. **第二条旧路——额外物理空间维膨胀（$5\mathrm{D}$ 卡鲁扎—克莱因与 $10\mathrm{D}/11\mathrm{D}$ 超弦路线）**：
   另一条自卡鲁扎（1921）与克莱因（1926）延续至超弦与 M 理论的纲领，试图把内部规范对称性解释为四维时空之外紧致卷曲的 $6$ 至 $7$ 个“真实物理额外空间维”的等距变换群。然而按 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 的三维封顶模型（`MODEL`），一旦把内部概念硬充作物理空间坐标，不仅违背结合律旋量传输与三锚格拉姆刚性锁死的三维空间封顶律，更在低能有效场论中孳生出无穷阶卡鲁扎—克莱因（KK）大质量激发塔与海量紧致化模空间（landscape moduli）自由参数，至今未在实验上观测到任何一颗 KK 伴随粒子。

一旦站到 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 的**三维概念场混编账本**高度，两条旧路的病根便一目了然：色荷从来不是第四、第五、第六根空间坐标轴，轻子也无需与夸克混装进破坏重子数守恒的 $5\times 5$ 单群矩阵！在 AF-GUT 模型（`MODEL`）中，底层只存在由极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 共棱编织的三维空间单纯比较复形 $\mathcal{K}$；在每一枚空间原胞之上，四支各司其职的有界概念场——三维空间切标架场 $\mathcal{E}_{\mathrm{space}}^{(3)}$、一维盲平面超荷相位场 $\mathcal{E}_{Y}^{(1)}$、二维左手双矢量旋量场 $\mathcal{E}_{\mathrm{weak}}^{(2)}$ 与三维幺模色体积场 $\mathcal{E}_{\mathrm{color}}^{(3)}$——按**参数账本直和 $\oplus$、量子态纤维张量积 $\otimes$** 的精确语法同心并列（呼应 [@thm-ch39-hilbert-concept-ledger-and-3d-cap] 第 2 款 [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot) 对局域克罗内克直和生成元与跨概念张量关联的严格分账）：

$$
\mathcal{E}_{\mathrm{total}} \;=\; \mathcal{E}_{\mathrm{space}}^{(3)} \;\oplus\; \mathcal{E}_{Y}^{(1)} \;\oplus\; \mathcal{E}_{\mathrm{weak}}^{(2)} \;\oplus\; \mathcal{E}_{\mathrm{color}}^{(3)}, \qquad \mathfrak{g}_{\mathrm{AF\text{-}GUT}}^{\mathrm{gauge}} \;=\; \mathfrak{u}(1)_Y \;\oplus\; \mathfrak{su}(2)_L \;\oplus\; \mathfrak{su}(3)_C \quad (\dim_{\mathbb{R}} = 1 + 3 + 8 = 12).
$$

你一定会立刻追问最关键的物理问题：**既然局域规范李代数是维数恰好为 $12$ 的直和 $\mathfrak{u}(1)_Y \oplus \mathfrak{su}(2)_L \oplus \mathfrak{su}(3)_C$，没有借用 $\mathrm{SU}(5)$ 的大矩阵外壳，凭什么在单原胞极小圆弧紫外标度 $\mu_{\mathrm{arc}}$ 处三支规范耦合不是三个互不相干的任意自由常数，反而锁死精确有理温伯格角 $\sin^2\theta_W(\mu_{\mathrm{arc}}) = \frac{3}{8}$？** 答案就在“极小圆弧比较账本”本身——三支规范场虽然作用于不同的概念子空间，却**读取同一套手性外尔费米子比较寄存器 $\mathcal{H}_{\mathrm{Weyl}}$，并共同支取同一台普适比较主频时钟 $\nu_0$ 的弧度相位预算**！我们将这一几何统一核心正式凝练为如下主联络定义：

::: {.definition #def-ch39-af-gut-master-connection title="极小圆弧场大统一主联络与普适圆弧迹刚度公设（AF-GUT MODEL）"}
在极小圆弧比较复形 $\mathcal{K} = \{\Delta\mathcal{T}_\epsilon\}$ 与普适比较主频 $\nu_0 \equiv c / \ell_P$（[§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md)）之上，**极小圆弧场大统一理论（AF-GUT）**（`MODEL`）由以下三层同心极小圆弧几何结构与一条普适刚度公设共同界定：

1. **水平概念内圆弧规范输运（Intra-Concept Horizontal Arc Holonomy）**：沿 $\mathcal{K}$ 的空间有向边 $\ell = (x \to y)$，比较态在单代手性外尔费米子总账本 $\mathcal{H}_{\mathrm{Weyl}} = \mathcal{H}_L \oplus \mathcal{H}_R$ 上执行保概念分块的幺正圆弧平行移动

   $$
   U_\ell \;=\; \exp\!\Bigl(i\,\epsilon_\ell\,\mathcal{A}_\ell\Bigr) \;\in\; \mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C, \qquad \mathcal{A}_\ell \;=\; g_Y B_\ell\,Y \;+\; g_2 W_\ell^i\,T_2^i \;+\; g_3 G_\ell^a\,T_c^a,
   $$

   其中无非对角轻子夸克规范场（零 $(X, Y)$ 玻色子），沿单枚原胞边界 $\partial\Delta\mathcal{T}_\epsilon$ 的闭合乘积 $U_{\partial\Delta\mathcal{T}_\epsilon} = \exp\bigl(i\Omega_{\mathrm{gauge}}(\Delta\mathcal{T}_\epsilon)\bigr)$ 给出微观规范三力曲率；
2. **垂直跨概念手征折叠桥（Cross-Concept Vertical Higgs–Zitterbewegung Bridge）**：在同一空间顶点 $x \in \mathcal{K}^{(0)}$ 处，算子 $D_{\mathrm{int}}\!\bigl(\Phi_H(x)\bigr) \in \operatorname{Hom}(\mathcal{H}_L, \mathcal{H}_R) \oplus \operatorname{Hom}(\mathcal{H}_R, \mathcal{H}_L)$ 在左手二重态概念纤维 $\mathcal{H}_L$ 与右手单态概念纤维 $\mathcal{H}_R$ 之间执行 $90^\circ$ 正交圆弧折叠（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)），与水平边输运 $U_\ell$ 按协变换位子恒等式 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula) 合成统一协变差分；
3. **胞间超静定铰链角亏与主频勾股收口（Inter-Cell Regge–$\nu_0$ Closure）**：在节点规模 $N \ge 5$ 的共棱四面体桁架中，公共余维 $2$ 铰链 $h \in \mathcal{K}^{(1)}$ 上的雷吉二面角亏 $\delta_h = 2\pi - \sum_{k \ni h}\theta_k$ 与胞内规范/希格斯圆弧主频负载共用同一无量纲总相位配分函数

   $$
   \mathcal{Z}_{\mathrm{AF\text{-}GUT}} \;=\; \sum_{\{\Delta\mathcal{T}_\epsilon,\, U_\ell,\, \Phi_H,\, \psi\}} \exp\!\Biggl\{\,i\Bigl(\Phi_{\mathrm{arc\text{-}gauge}}[U_\ell] \;+\; \Phi_{\mathrm{Higgs\text{-}Zitter}}[U_\ell, \Phi_H, \psi] \;+\; \frac{1}{8\pi}\sum_{h \in \mathcal{K}^{(1)}} N_h\,\delta_h(\Delta\mathcal{T}_\epsilon)\Bigr)\Biggr\};
   $$

4. **普适圆弧迹刚度公设（Universal Arc-Trace Stiffness Postulate，`MODEL`）**：在单枚极小圆弧体的紫外合流标度 $\mu_{\mathrm{arc}}$ 处，比较账本不偏袒任何特定概念轴向——任意未重标度概念生成元 $X_A$（作用于共享手性外尔费米子账本 $\mathcal{H}_{\mathrm{Weyl}}$）每扭转单位极小弧度角 $\delta\vartheta_A$，均按同一普适无量纲圆弧刚度系数 $\kappa_{\mathrm{arc}} > 0$ 支付正比于外尔二次迹 $\operatorname{Tr}_{\mathrm{Weyl}}(X_A^2)$ 的相位作用量代价；折算为连续统规范动能标准归一 $-\frac{1}{4}\int F_{\mu\nu}^A F^{A\,\mu\nu}\,d^4x$ 后，各概念通道在 $\mu_{\mathrm{arc}}$ 处的逆耦合平方直接等于其外尔圆弧迹权重：

   $$
   \frac{1}{g_A^2(\mu_{\mathrm{arc}})} \;=\; \kappa_{\mathrm{arc}}\,\operatorname{Tr}_{\mathrm{Weyl}}\!\bigl(X_A^2\bigr).
   $$

:::

请注意 [@def-ch39-af-gut-master-connection] 第 4 款与单群嵌入的区别（这条公设在数学上等价于 $\mathrm{SU}(5)$/$\mathrm{SO}(10)$ 中“所有生成元在一代费米子上等迹归一”的边界条件，下文 $\frac{3}{8}$ 的计算就是乔吉—格拉肖 1974 的标准迹计算，见 [@rem-ch39-georgi-glashow-connes-jacobson-literature] 第 2 条；同一归一化关系 $g_3^2 = g_2^2 = \frac{5}{3}g_Y^2$ 在谱作用量框架中同样出现，见 [@rem-ch39-georgi-glashow-connes-jacobson-literature] 第 4 条）：在传统 $\mathrm{SU}(5)$ 大统一中，$g_3^2 = g_2^2 = \frac{5}{3}g_Y^2$ 是靠“把强、弱、电强行塞进同一个 $5 \times 5$ 矩阵表示”换来的，顺带捆绑了致命的 $(X, Y)$ 质子衰变玻色子；而在 AF-GUT 的**普适圆弧迹刚度公设**下，规范群始终保持纯净的 $12$ 维直和 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$，耦合常数的紫外对齐纯粹源于**同一本手性外尔费米子账本 $\mathcal{H}_{\mathrm{Weyl}}$ 上每一弧度极小圆弧扭转的公平计费**！这条公设取的读数是整本账本 $\mathcal{H}_{\mathrm{Weyl}}$ 上的迹，也就是唯一在账本的全体酉变换下不变的读数；若只要求读数在 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ 下不变，各不可约多重态可以带不同的权 $w_Q, w_u, w_d, w_L, w_e > 0$，此时 $g_3^2/g_2^2 = \frac{3w_Q + w_L}{2w_Q + w_u + w_d}$ 可取任意正值。数值 $\frac{3}{8}$ 还依赖账本由完整的费米子代组成：一代外尔费米子作为规范群表示是 $\mathrm{SU}(5)$ 的 $\bar{\mathbf{5}} \oplus \mathbf{10}$ 的限制；单独一个希格斯二重态给出 $\frac{1}{2}$。

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="concentric-four-field-monad" height="500"}
旋转单枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 并拨动琥珀色读头，检视同心嵌套在三维原胞外的四片有界概念场圆弧壳：青色标示三维空间切标架与引力角亏壳 $F_{\mathrm{pos}}$，银白色标示一维 $\mathrm{U}(1)_Y$ 超荷相位圆弧，紫色标示二维 $\mathrm{SU}(2)_L$ 旋量双覆叠壳，蓝色标示三维 $\mathrm{SU}(3)_C$ 三锚点色体积锁——规范代数严守 $1 + 3 + 8 = 12$ 维直和，零 $(X, Y)$ 轻子夸克矩阵混装（绿色框锚定 `anchored_phase_classification` 与 `circle_double_cover_history_lift`，四场壳读法标 `MODEL`）。
:::

## 33.9.2 手征—矢量圆弧迹定理、色数 $N_c = 3$ 处的唯一双曲线交点与温伯格角 $\frac{3}{8}$ 跑动 {#sec-ch39-11-2}

现在，让我们在草稿纸上把 [@def-ch39-af-gut-master-connection] 的普适圆弧迹刚度公式一笔一划算到底（`手工推导`，严格沿用 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) [@ex-ch34-anomaly-and-yukawa-countermodels] 的盖尔曼—西岛电荷约定 $Q = T_3 + Y$，其中左手轻子二重态 $L_L = (\nu_L, e_L)^\top$ 超荷为 $Y_L = -\frac{1}{2}$，右旋正电子共轭单态 $e_R^c$ 超荷为 $Y_{e^c} = +1$）。为了检验 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) “色概念场封顶于三维（$N_c = 3$）”在电弱—强统一中的定量含金量，我们不妨先将色空间的维数放开为任意正整数 $N_c \ge 1$，考察完整一代手性外尔费米子（共 $4N_c + 3$ 个二分量左手外尔旋量：$Q_L : (\mathbf{N}_c, \mathbf{2}, Y_Q)$、$u_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, -Q_u)$、$d_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, -Q_d)$、$L_L : (\mathbf{1}, \mathbf{2}, -\frac{1}{2})$、$e_R^c : (\mathbf{1}, \mathbf{1}, +1)$；若添入全规范单态右手中微子 $\nu_R^c : (\mathbf{1}, \mathbf{1}, 0)$，一切规范生成元在其上恒为零，全部迹丝毫不变）：

1. **色荷矢量迹 vs. 弱同位旋单手征迹——强弱合一直接点名 $N_c = 3$（`手工推导`）**：

   - 对强相互作用 $\mathrm{SU}(N_c)_C$（$N_c \ge 2$）的任意标准归一生成元 $T_c^a$（基础表示与反基础表示的邓肯指标恒为 $T(\mathbf{N}_c) = T(\overline{\mathbf{N}}_c) = \frac{1}{2}$）：左手夸克二重态 $Q_L = (u_L, d_L)^\top$ 贡献 $2$ 份色基础表示，右手共轭单态 $u_R^c, d_R^c$ 贡献 $2$ 份色反基础表示（左右手双翼矢量等权参与！），故单代外尔色迹对一切 $N_c \ge 2$ 恒定等于

     $$
     \operatorname{Tr}_{\mathrm{Weyl}}\!\bigl((T_c^a)^2\bigr) \;=\; 2 \cdot \frac{1}{2} \;+\; 1 \cdot \frac{1}{2} \;+\; 1 \cdot \frac{1}{2} \;=\; 2.
     $$

   - 对弱相互作用 $\mathrm{SU}(2)_L$ 的第三分量生成元 $T_3 = \operatorname{diag}(+\frac{1}{2}, -\frac{1}{2})$：**唯有左手二重态**携带非零弱同位旋（右手单态恒有 $T_3 = 0$，单手征耦合！）。轻子二重态 $L_L$ 贡献 $(\frac{1}{2})^2 + (-\frac{1}{2})^2 = \frac{1}{2}$，$N_c$ 色夸克二重态 $Q_L$ 贡献 $N_c \times \frac{1}{2}$，合计

     $$
     \operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) \;=\; \frac{1}{2} + \frac{N_c}{2} \;=\; \frac{N_c + 1}{2}.
     $$

   代入普适圆弧迹刚度律 $g_A^{-2}(\mu_{\mathrm{arc}}) = \kappa_{\mathrm{arc}}\operatorname{Tr}_{\mathrm{Weyl}}(X_A^2)$，紫外强弱耦合平方比当场化为 $N_c$ 的一次线性函数：

   $$
   \frac{g_3^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}})} \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}\!\bigl((T_c^a)^2\bigr)} \;=\; \frac{(N_c + 1)/2}{2} \;=\; \frac{N_c + 1}{4}!
   $$

   看！单手征弱二重态亏欠的那一半手征自由度，恰恰要靠**三维色场（$N_c = 3$）加一份无色轻子通道（$3 + 1 = 4$）**来填平：在一切正整数色维数中，**当且仅当 $N_c = 3$** 时，$(3 + 1)/4 = 1$，强耦合与弱耦合在极小圆弧紫外标度自动等强锁死 $g_3^2(\mu_{\mathrm{arc}}) = g_2^2(\mu_{\mathrm{arc}})$！

2. **反常相消曲线 vs. 固定电荷曲线与手征—矢量因子 `2`：唯一交点 $N_c = 3 \implies \sin^2\theta_W(\mu_{\mathrm{arc}}) = \frac{3}{8}$（`手工推导`）**：
   再算电磁荷 $Q = T_3 + Y$ 与温伯格混合角。在每个左手二重态上 $\operatorname{Tr}_{\mathbf{2}}(T_3 Y) = (+\frac{1}{2} - \frac{1}{2})Y = 0$，而在右手单态上 $T_3 = 0$，故正交交叉迹恒为零 $\operatorname{Tr}_{\mathrm{Weyl}}(T_3 Y) = 0$！由 $Q = T_3 + Y$ 及普适圆弧迹刚度律，无偏电磁耦合满足 $\frac{1}{e^2(\mu_{\mathrm{arc}})} = \frac{1}{g_2^2(\mu_{\mathrm{arc}})} + \frac{1}{g_Y^2(\mu_{\mathrm{arc}})} = \kappa_{\mathrm{arc}}\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)$，紫外温伯格角遂精确等于弱同位旋圆弧迹占电磁总圆弧迹的份额：

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{g_Y^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}}) + g_Y^2(\mu_{\mathrm{arc}})} \;=\; \frac{e^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}})} \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)}.
   $$

   此处有一道**生死攸关的手征—矢量因子 `2` 算术铁律**，绝不容半点含糊：$\mathrm{SU}(2)_L$ 是**单手征**规范场，只有左手外尔分量对分子 $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)$ 有贡献；而未破缺电磁场 $\mathrm{U}(1)_{\mathrm{em}}$ 是**左右手等权矢量型**规范场——左旋粒子 $(\nu_L, e_L, u_L, d_L)$ 与右旋共轭伴侣 $(e_R^c, u_R^c, d_R^c)$ **双方都携带完全相同的电荷平方 $Q^2$**！因此在整本手性外尔账本上求和时，分母 $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)$ 必定显式带出一枚**双翼矢量加倍因子 `2`**：

   $$
   \operatorname{Tr}_{\mathrm{Weyl}}(Q^2) \;=\; \mathbf{2}\,\Bigl[\bigl(0^2 + (-1)^2\bigr) \;+\; N_c\bigl(Q_u^2 + Q_d^2\bigr)\Bigr]!
   $$

   （读者可当场做一次反证检核：倘若在 $N_c = 3,\; Q_u = +\frac{2}{3},\; Q_d = -\frac{1}{3}$ 时漏掉分母前的双翼矢量因子 `2`，误把单手征电荷平方和 $1 + 3\times(\frac{4}{9} + \frac{1}{9}) = \frac{8}{3}$ 当作外尔全迹，就会算出荒谬的 $\frac{2}{8/3} = \frac{3}{4} = 0.75 \neq \frac{3}{8}$！唯有乘上左右双翼因子 `2` 得到精确外尔全迹 $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2) = 2 \times \frac{8}{3} = \frac{16}{3}$，同时核对勾股拆账 $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) + \operatorname{Tr}_{\mathrm{Weyl}}(Y^2) = 2 + \frac{10}{3} = \frac{16}{3}$，分式才严丝合缝给出 $\frac{2}{16/3} = \frac{6}{16} = \frac{3}{8} = 0.375000$！）

   现在比较任意色维数 $N_c > 0$ 上的两条物理约束曲线：

   - **曲线 I（手征反常相消锁定曲线）**：要求 $[\mathrm{SU}(2)_L]^2\mathrm{U}(1)_Y$ 混合反常归零，即 $N_c Y_Q + Y_L = N_c Y_Q - \frac{1}{2} = 0$，唯一锁死夸克二重态超荷 $Y_Q = \frac{1}{2N_c}$，进而定出上下夸克电荷 $Q_u = \frac{1}{2} + \frac{1}{2N_c} = \frac{N_c + 1}{2N_c}$ 与 $Q_d = -\frac{1}{2} + \frac{1}{2N_c} = -\frac{N_c - 1}{2N_c}$（此时 $[\mathrm{SU}(N_c)]^2\mathrm{U}(1)_Y$、$\mathrm{grav}^2\mathrm{U}(1)_Y$ 与 $[\mathrm{U}(1)_Y]^3$ 反常亦对一切 $N_c$ 恒等全消，而威滕 $\mathrm{SU}(2)_L$ 全局同伦无反常还要求二重态总数 $N_c + 1$ 为偶数，即 $N_c$ 必为奇数）。在此曲线上，超荷二次迹与电磁二次迹化为优美的有理闭式：

     $$
     \begin{aligned}
     \operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} &\;=\; 2\!\left(-\frac{1}{2}\right)^2 + 1^2 + 2N_c\!\left(\frac{1}{2N_c}\right)^2 + N_c\!\left[\left(\frac{N_c+1}{2N_c}\right)^2 + \left(\frac{N_c-1}{2N_c}\right)^2\right] \;=\; \frac{(N_c + 1)(N_c + 2)}{2N_c}, \\
     \operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{anom}} &\;=\; \operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) + \operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} \;=\; \frac{N_c + 1}{2} + \frac{(N_c + 1)(N_c + 2)}{2N_c} \;=\; \frac{(N_c + 1)^2}{N_c}!
     \end{aligned}
     $$

     两者相加竟分毫不差配成完全平方 $(N_c + 1)^2 / N_c$！超荷典范归一化因子与反常锁定温伯格角立得：

     $$
     k_Y(N_c) \;:=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}}}{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)} \;=\; \frac{N_c + 2}{N_c}, \qquad \sin^2\theta_W^{\mathrm{(anom)}}(N_c) \;=\; \frac{(N_c + 1)/2}{(N_c + 1)^2 / N_c} \;=\; \frac{N_c}{2(N_c + 1)}.
     $$

   - **曲线 II（固定夸克电荷 $(+\frac{2}{3}, -\frac{1}{3})$ 曲线）**：若保持实验测得的分数夸克电荷 $Q_u = +\frac{2}{3},\; Q_d = -\frac{1}{3}$ 不变（$Q_u^2 + Q_d^2 = \frac{5}{9}$），则 $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{fixed}} = 2\bigl(1 + \frac{5}{9}N_c\bigr) = \frac{2(9 + 5N_c)}{9}$，给出固定电荷温伯格角曲线

     $$
     \sin^2\theta_W^{\mathrm{(fixed)}}(N_c) \;=\; \frac{(N_c + 1)/2}{2(9 + 5N_c)/9} \;=\; \frac{9(N_c + 1)}{4(9 + 5N_c)}.
     $$

   将两条曲线相减并通分因式分解，一次项 $18N_c$ 奇迹般精确抵消：

   $$
   \sin^2\theta_W^{\mathrm{(anom)}}(N_c) \;-\; \sin^2\theta_W^{\mathrm{(fixed)}}(N_c) \;=\; \frac{2N_c(9 + 5N_c) - 9(N_c + 1)^2}{4(N_c + 1)(9 + 5N_c)} \;=\; \frac{N_c^2 - 9}{4(N_c + 1)(9 + 5N_c)} \;=\; \frac{(N_c - 3)(N_c + 3)}{4(N_c + 1)(9 + 5N_c)}!
   $$

   在 $N_c > 0$ 上，上式的唯一正根是 $N_c = 3$。这个交点与一条线性条件有同一个解：实测电荷给出 $Y_Q = Q_u - \frac{1}{2} = \frac{1}{6}$，反常相消要求 $N_c Y_Q = \frac{1}{2}$，故 $N_c = 3$；曲线 II 所固定的电荷 $(+\frac{2}{3}, -\frac{1}{3})$ 正是曲线 I 在 $N_c = 3$ 处的取值，所以交点把实测电荷与色数联系起来，不是独立于电荷输入的第二重约束。若只固定夸克电荷、让轻子超荷自由，四个微扰反常条件同样只容许 $N_c = 3$，起作用的是 $[\mathrm{U}(1)_Y]^3$，轻子超荷随之定出（[@rem-ch39-anomaly-free-hypercharge-lines] 第 3 条）；这一选法同样以电荷为输入。四项结论中，(a) 在曲线 I 的电荷下对一切奇数 $N_c$ 成立（在固定的实测电荷下，或只固定实测的夸克电荷时，只在 $N_c = 3$ 成立）；(c)、(d) 是曲线 I 在 $N_c = 3$ 处的取值；不依赖电荷输入而单独选出 $N_c = 3$ 的只有 (b)：在刚度公设下 $g_3^2 = g_2^2$ 当且仅当 $N_c = 3$。在实测的 $N_c = 3$ 处，以下四项同时成立：**（a）全部局域与全局手征反常归零**、**（b）紫外强弱耦合等强 $g_3^2 = g_2^2$**、**（c）超荷归一化因子 $k_Y(3) = \frac{5}{3}$（令 $g_1^2 := \frac{5}{3}g_Y^2 = g_2^2 = g_3^2$）**，以及**（d）紫外温伯格混合角精确钉死在**

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)} \;=\; \frac{2}{16/3} \;=\; \frac{3}{8} \;=\; 0.375000!
   $$

3. **从紫外极小圆弧基准 $\frac{3}{8}$ 向电弱 $Z$ 极点 $M_Z = 91.1876\;\mathrm{GeV}$ 的单圈重整化群跑动（`手工推导` + `文献结果`）**：
   为什么大型正负电子对撞机（LEP）与斯坦福直线对撞机（SLC）在红外电弱标度 $M_Z = 91.1876\;\mathrm{GeV}$ 处测得的五味 $\overline{\mathrm{MS}}$ 温伯格角不是 $0.37500$，而是 $\sin^2\widehat{\theta}_W(M_Z) = 0.23129 \pm 0.00004$（PDG 2024）？因为在低能多胞观测窗口下，一维阿贝尔超荷圆弧 $\mathrm{U}(1)_Y$（一维阿贝尔商环面分类见 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）遭遇真空极化正屏蔽（$b_1 = +\frac{41}{10} > 0$，耦合向红外变弱），而二维非交换旋量双覆叠 $\mathrm{SU}(2)_L$（$720^\circ$ 双覆叠提升见 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）遭遇非阿贝尔规范自耦合反屏蔽（$b_2 = -\frac{19}{6} < 0$，耦合向红外变强）！按乔吉—奎因—温伯格（Georgi–Quinn–Weinberg, 1974）重整化群积分公式，将 $\alpha_1(\mu_{12}) = \alpha_2(\mu_{12})$（即 $\sin^2\widehat{\theta}_W(\mu_{12}) = \frac{3}{8}$）沿最小标准模型单圈斜率差 $b_1 - b_2 = \frac{41}{10} - (-\frac{19}{6}) = \frac{109}{15}$ 向下演化至 $M_Z$，得到精确跑动偏移恒等式：

   $$
   \sin^2\widehat{\theta}_W(M_Z) \;=\; \frac{3}{8} \;-\; \frac{5(b_1 - b_2)}{16\pi}\,\widehat{\alpha}(M_Z)\,\ln\!\left(\frac{\mu_{12}}{M_Z}\right) \;=\; 0.37500 \;-\; \frac{109}{48\pi}\,\widehat{\alpha}(M_Z)\,\ln\!\left(\frac{\mu_{12}}{M_Z}\right).
   $$

   代入 $\widehat{\alpha}(M_Z)^{-1} = 127.930$：在 $\alpha_1 = \alpha_2$ 的标度 $\mu_{12} = 1.014 \times 10^{13}\;\mathrm{GeV}$（$\ln(\mu_{12}/M_Z) \approx 25.4345$；它由输入的 $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$ 解出）处，单圈对数跑动量为 $0.14371$，$\frac{3}{8} - 0.14371$ 回到作为输入的 **$0.23129$**：这是一个标度对一个数据的拟合，不是预言（`NUM`）。同时，严守 [§33.8](ch39-s09-unified-arc-forces-and-planck-convergence.md) 与 [§33.6](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 的科学诚实准则，我们绝不掩饰最小标准模型无阈值单圈近似的定量缺口：本节的刚度公设要求 $\alpha_3$ 也在同一单点交汇（$g_3^2 = g_2^2$），据此用 $\alpha_3(M_Z) = 0.1180$ 反推单一标度 $\mu_{\mathrm{GQW}} \approx 6.76 \times 10^{14}\;\mathrm{GeV}$，最小标准模型三线 GQW 公式给出的无阈值单圈预言值为 $\sin^2\widehat{\theta}_W^{\mathrm{(GQW)}}(M_Z) \approx 0.2076$，比实验值 $0.23129 \pm 0.00004$ 低约 $0.024$（约 $600$ 个标准差）：在一圈、无阈值的层次上，这条公设与数据不符，与最小非超对称 $\mathrm{SU}(5)$ 的已知失败相同（同一缺口反映在 $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ 近交汇三角区的逆耦合残差 $\Delta\alpha^{-1} > 3.66$，精确差值约 $3.664$）。在 AF-GUT 中，如何由离散极小圆弧配分函数的晶格—连续统匹配阈值与高圈/引力修正非微扰地闭合这一 $\Delta\alpha^{-1} \approx 3.664$ 逆耦合三角残差，已诚实列入下文开放界碑 [@prob-ch39-af-gut-threshold-and-proton-stability] 第 1 款。

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="weinberg-angle-rg-running" height="500"}
沿银白色能标轴拖动琥珀色能标游标 $\mu$（$\log_{10}(\mu/\mathrm{GeV})$ 从 $M_Z$ 直抵普朗克标度），同步对账两条温伯格角曲线与三支逆耦合单圈跑动：反常相消曲线 $\frac{N_c}{2(N_c+1)}$ 与固定夸克电荷曲线 $\frac{9(N_c+1)}{4(9+5N_c)}$ 仅在蓝色色体积锁 $N_c = 3$ 处唯一相交于 $\sin^2\theta_W = \frac{3}{8} = 0.375000$，并在电弱交汇点 $\log_{10}(\mu_{12}/\mathrm{GeV}) = 13.0060$ 与红外实验基准 $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$ 之间定量衔接（单圈跑动文献标 `ARGUED`，交点与三角残差实算标 `NUM`，阈值闭合列入抽屉红色 `OPEN`）。
:::

曲线 I 用一个反常条件定出 $Y_Q$，其余三个反常随之为零。把四个微扰反常条件一起解出来，可以看清哪些结论对一切色数成立、哪些只在 $N_c = 3$ 成立：

::: {.remark #rem-ch39-anomaly-free-hypercharge-lines title="一代费米子的反常相消解集与色数（手工推导与文献结果）"}
**手工推导；$N_c = 3$ 时反常相消给出两组超荷赋值、威滕全局反常以及一般 $N_c$ 下的电荷为文献结果，未在本书形式化。** 记一代左手外尔场 $Q_L : (\mathbf{N}_c, \mathbf{2}, y_Q)$、$u_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, y_u)$、$d_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, y_d)$、$L_L : (\mathbf{1}, \mathbf{2}, y_L)$、$e_R^c : (\mathbf{1}, \mathbf{1}, y_e)$，$N_c \ge 2$，不含右手中微子（或只含超荷为 $0$ 的全规范单态，它不进入任何反常）。基础与反基础表示的邓肯指标取 $\frac{1}{2}$，四个微扰反常条件（各差一个正的归一常数）为

$$
\begin{aligned}
&[\mathrm{SU}(N_c)]^2\mathrm{U}(1)_Y : && 2y_Q + y_u + y_d = 0, \\
&[\mathrm{SU}(2)_L]^2\mathrm{U}(1)_Y : && N_c y_Q + y_L = 0, \\
&\mathrm{grav}^2\,\mathrm{U}(1)_Y : && 2N_c y_Q + N_c y_u + N_c y_d + 2y_L + y_e = 0, \\
&[\mathrm{U}(1)_Y]^3 : && 2N_c y_Q^3 + N_c y_u^3 + N_c y_d^3 + 2y_L^3 + y_e^3 = 0;
\end{aligned}
$$

$[\mathrm{SU}(N_c)]^3$ 由两份 $\mathbf{N}_c$ 与两份 $\overline{\mathbf{N}}_c$ 相消，$[\mathrm{SU}(2)_L]^3$ 恒为零。

1. 前三条给出 $y_d = -2y_Q - y_u$、$y_L = -N_c y_Q$、$y_e = 2N_c y_Q$。记 $t = y_u + y_Q$，第四条化为 $6N_c\,y_Q\,(N_c y_Q - t)(N_c y_Q + t) = 0$。所以在有理数或实数中，解集恰是三条过原点的直线：$a\bigl(1, -(N_c + 1), N_c - 1, -N_c, 2N_c\bigr)$；它交换 $u_R^c$、$d_R^c$ 标签后的那一条；以及 $(0, b, -b, 0, 0)$。最后一条上夸克二重态与轻子都不带超荷，电子电荷不能是 $-1$。前提不能省：$N_c = 1$ 时没有第一个条件，$(1, 1, -1, -1, 0)$ 满足其余三条而不在三条直线上；右手中微子的超荷可以不为零时，解集也更大。
2. 在第一条直线上取 $y_L = -\frac{1}{2}$，得 $Q_u = \frac{N_c + 1}{2N_c}$、$Q_d = -\frac{N_c - 1}{2N_c}$、$Q_\nu = 0$、$Q_e = -1$，即上文曲线 I。对每个 $N_c \ge 2$：四个反常为零，一代总电荷 $N_c(Q_u + Q_d) + Q_\nu + Q_e = 0$，电荷是 $\frac{1}{2N_c}$ 的整数倍。威滕全局反常要求 $\mathrm{SU}(2)_L$ 二重态的总数为偶数；每代有 $N_c + 1$ 个，代数为奇数（如三代）时这就要求 $N_c$ 为奇数。$N_c$ 为奇数时，由 $\frac{N_c + 1}{2}$ 个上型与 $\frac{N_c - 1}{2}$ 个下型夸克组成的重子电荷为 $1$，其同位旋镜像为 $0$。
3. 只固定夸克电荷 $(+\frac{2}{3}, -\frac{1}{3})$，即 $(y_Q, y_u, y_d) = (\frac{1}{6}, -\frac{2}{3}, \frac{1}{3})$，而让轻子超荷自由：第一条自动成立，第二、三条给出 $y_L = -\frac{N_c}{6}$、$y_e = \frac{N_c}{3}$，此时第四条的左端是 $\frac{N_c(N_c - 3)(N_c + 3)}{36}$。所以四个条件成立当且仅当 $N_c = 3$，且此时 $y_L = -\frac{1}{2}$、$y_e = 1$。若改为固定 $y_L = -\frac{1}{2}$ 与 $y_Q = \frac{1}{6}$，第二条单独给出 $N_c = 3$。两种选法都以实测电荷为输入。
4. 只在 $N_c = 3$ 成立的是 $Q_u = \frac{2}{3}$；在 [@def-ch39-af-gut-master-connection] 第 4 款之下还有 $g_3^2 = g_2^2$、$k_Y = \frac{5}{3}$ 与 $\sin^2\theta_W = \frac{3}{8}$。

$N_c = 3$、不提希格斯粒子时反常相消（含混合引力反常）给出两组超荷赋值、其一为标准赋值，见 C. Q. Geng 与 R. E. Marshak（*Phys. Rev. D* **39**, 693, 1989，DOI [10.1103/PhysRevD.39.693](https://doi.org/10.1103/PhysRevD.39.693)）以及 J. A. Minahan、P. Ramond 与 R. C. Warner（*Phys. Rev. D* **41**, 715, 1990，DOI [10.1103/PhysRevD.41.715](https://doi.org/10.1103/PhysRevD.41.715)）；威滕全局反常要求 $N_c$ 为奇数、三角反常相消决定随 $N_c$ 变化的夸克电荷，见 O. Bär 与 U.-J. Wiese（*Nucl. Phys. B* **609**, 225, 2001，arXiv:`hep-ph/0105258`）；含右手中微子的推广见 R. Shrock（*Phys. Rev. D* **53**, 6465, 1996，arXiv:`hep-ph/9512430`）；威滕全局反常见 E. Witten（*Phys. Lett. B* **117**, 324, 1982）。
:::

上一条注记不含超荷不为零的右手中微子。把它加进来，解集从三条直线变成三张平面，电荷量子化随之改变：

::: {.remark #rem-ch39-anomaly-right-handed-neutrino-planes title="加入右手中微子后的反常相消解集与电荷量子化（手工推导与文献结果）"}
**手工推导；右手中微子、$B - L$ 方向与电荷量子化之间的关系为文献结果，未在本书形式化。** 在 [@rem-ch39-anomaly-free-hypercharge-lines] 的五个左手外尔场之外加入 $\nu_R^c : (\mathbf{1}, \mathbf{1}, y_n)$，$N_c \ge 2$，电荷仍按 $Q = T_3 + Y$ 读取。前两个反常条件不变，引力混合反常多一项 $y_n$，三次反常多一项 $y_n^3$；$\nu_R^c$ 是 $\mathrm{SU}(2)_L$ 单态，不改变威滕全局反常的条件。

1. 线性条件给出 $y_d = -2y_Q - y_u$、$y_L = -N_c y_Q$、$y_e + y_n = 2N_c y_Q$。记 $t = y_u + y_Q$，$y_e = N_c y_Q + w$，$y_n = N_c y_Q - w$。由 $y_u^3 + y_d^3 = -2y_Q^3 - 6y_Qt^2$ 与 $y_e^3 + y_n^3 = (y_e + y_n)^3 - 3(y_e + y_n)y_ey_n$，三次条件化为 $6N_c\,y_Q\,(w - t)(w + t) = 0$。所以在实数中解集是三张过原点的平面：

   $$
   \begin{aligned}
   \Pi_+ &: \ (y_Q, y_u, y_d, y_L, y_e, y_n) = a\,(1, -1, -1, -N_c, N_c, N_c) + t\,(0, 1, -1, 0, -1, 1), \\
   \Pi_- &: \ \Pi_+ \text{ 中交换 } u_R^c, d_R^c \text{ 的标签（等价地，交换 } e_R^c, \nu_R^c\text{）}, \\
   \Pi_0 &: \ (0, b, -b, 0, c, -c).
   \end{aligned}
   $$

   $\Pi_+$ 的第一个方向取 $a = \frac{1}{N_c}$ 时就是 $B - L$ 的取值（夸克的重子数为 $\frac{1}{N_c}$；$N_c = 3$ 时为 $(\frac{1}{3}, -\frac{1}{3}, -\frac{1}{3}, -1, 1, 1)$），所以加入 $\nu_R^c$ 后 $B - L$ 对每个 $N_c$ 都无反常；第二个方向只作用在单态上。上一条注记的三条直线依次是 $\Pi_+$、$\Pi_-$、$\Pi_0$ 与 $\{y_n = 0\}$ 的交线，其中第一条是 $t = -N_c a$。
2. 在 $\Pi_+$ 上 $Q_\nu = \frac{1}{2} - N_c a$，$Q_e = -\frac{1}{2} - N_c a$。固定 $Q_e = -1$ 即 $a = \frac{1}{2N_c}$，于是 $Q_\nu = 0$，二重态中夸克的电荷 $\frac{N_c + 1}{2N_c}$、$-\frac{N_c - 1}{2N_c}$ 也随之确定；单态的超荷则沿 $t$ 自由移动，只靠反常条件定不出 $u_R^c, d_R^c, e_R^c, \nu_R^c$ 的电荷。
3. 设希格斯场为 $H : (\mathbf{1}, \mathbf{2}, y_H)$。四个汤川项 $Q_LHu_R^c$、$Q_LH^*d_R^c$、$L_LH^*e_R^c$、$L_LH\nu_R^c$ 的规范不变性在 $\Pi_+$ 上合成同一个条件 $t = -y_H$：狄拉克质量只把 $t$ 与 $y_H$ 联系起来，$a$ 仍然自由。取 $y_H = \frac{1}{2}$，使 $H$ 的中性分量满足 $T_3 + Y = 0$；这时 $\Pi_+ \cap \{t = -\frac{1}{2}\}$ 是一条直线 $Y_0 + \varepsilon(B - L)$（$\varepsilon$ 任意），$Y_0$ 为 $a = \frac{1}{2N_c}$ 的赋值（$N_c = 3$ 时即标准超荷）。电荷随之变为 $Q + \varepsilon(B - L)$，例如 $Q_\nu = -\varepsilon$、$Q_e = -1 - \varepsilon$：电荷不再量子化。
4. 若 $\nu_R^c$ 有马约拉纳质量项（要求 $2y_n = 0$），或根本没有 $\nu_R^c$，解集回到上一条注记的三条直线；在第一条直线上取 $Q_e = -1$ 时，电荷是 $\frac{1}{2N_c}$ 的整数倍（上一条注记第 2 条）。

前提不能省：$N_c = 1$ 时 $(1, 1, -1, -1, 0, 0)$ 满足后三个条件；各代超荷可以不同时解集更大。上面只用到四个微扰反常条件，并假设一代费米子（或各代超荷相同）。“只有狄拉克中微子时反常相消与费米子质量留下沿 $B - L$ 的一参数族，中微子为马约拉纳粒子时电荷被量子化”见 K. S. Babu 与 R. N. Mohapatra（*Phys. Rev. Lett.* **63**, 938, 1989，DOI [10.1103/PhysRevLett.63.938](https://doi.org/10.1103/PhysRevLett.63.938)；*Phys. Rev. D* **41**, 271, 1990）以及 R. Foot、H. Lew 与 R. R. Volkas 的综述（*J. Phys. G* **19**, 361, 1993，arXiv:`hep-ph/9209259`）。
:::

以上 [§33.9.2](#sec-ch39-11-2) 全部核心数学骨架——格罗斯—威尔泽克—波利策单圈渐近自由判据与精确重整化群流、任意色数 $N_c$ 手性外尔多重态迹求和与 $N_c = 3$ 唯一双线交汇（$k_Y = \frac{5}{3}$、$\sin^2\theta_W = \frac{3}{8}$）、显式 $15$ 态标准模型一代外尔迹与反常验证、世代数对斜率差的精确抵消、最小标准模型（$\frac{115}{218}$）对 MSSM（$\frac{5}{7}$）三线交汇判据，以及乔吉—奎因—温伯格（GQW）温伯格角跑动偏移公式——现已全部在 Lean 4 内核中形式化验证（离散圆弧阈值闭合与高圈动力学仍属下文 [@prob-ch39-af-gut-threshold-and-proton-stability] 的开放问题）：

::: {.theorem #thm-ch39-gut-one-loop-rg-and-weyl-traces-4d title="四维单圈规范重整化群渐近自由、任意色数与 15 态外尔迹 N_c = 3 唯一选色、sin²θ_W = 3/8 及 SM/MSSM 三线交汇判据" lean="D5/S3/Quantum/Gauge/GaugeUnificationRG4D.asymptotic_freedom_iff, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.qcd_asymptotic_freedom_iff, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.qcd_six_flavors_beta, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rgInvCoupling_hasDerivAt, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_asymptotic_freedom_limit, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_zero_scale_iff, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_zero_scale_unique, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_confinement_scale_lt, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_landau_pole_gt, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylT3SqTrace_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylColorSqTrace_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.color_weak_unification_iff_three, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylT3YTrace_eq_zero, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylYSqTraceAnom_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weyl_pythagoras, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylQSqTraceAnom_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_hypercharge_norm_anom, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_hypercharge_norm_three, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_anom, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_three_eighths, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weinberg_anom_sub_fixed, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weinberg_curves_cross_iff_three, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_T3_sq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y_sq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Q_sq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_T3_Y, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y_cube, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_beta_standard_values, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_beta_diff_independent_of_ng, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.three_coupling_unification_iff, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_B_ratio_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.mssm_B_ratio_eq, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_B_ratio_lt_mssm, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_running_formula, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_at_unification, D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_running_offset"}
1. **单圈渐近自由判据与精确重整化群流（红外禁闭标度 vs. 紫外朗道极点）**（[`asymptotic_freedom_iff`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.asymptotic_freedom_iff)、[`qcd_asymptotic_freedom_iff`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.qcd_asymptotic_freedom_iff)、[`qcd_six_flavors_beta`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.qcd_six_flavors_beta)、[`rgInvCoupling_hasDerivAt`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rgInvCoupling_hasDerivAt)、[`rg_asymptotic_freedom_limit`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_asymptotic_freedom_limit)、[`rg_zero_scale_iff`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_zero_scale_iff)、[`rg_zero_scale_unique`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_zero_scale_unique)、[`rg_confinement_scale_lt`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_confinement_scale_lt)、[`rg_landau_pole_gt`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.rg_landau_pole_gt)）：对 $\mathrm{SU}(N)$ 规范群耦合 $n_f$ 种基本狄拉克费米子与 $n_s$ 种基本复标量，单圈系数 $b_0(N, n_f, n_s) = \frac{11}{3}N - \frac{2}{3}n_f - \frac{1}{6}n_s > 0$ **当且仅当** $4n_f + n_s < 22N$（在纯 QCD $N = 3, n_s = 0$ 时等价于 $n_f \le 16$，六味时 $b_0 = 7$）。逆耦合流 $\alpha^{-1}(\mu) = a_0 + \frac{b_0}{2\pi}\ln(\mu/\mu_0)$ 精确满足 $\frac{d\alpha^{-1}}{d\mu} = \frac{b_0}{2\pi\mu}$，当 $b_0 > 0$ 时在 $\mu \to +\infty$ 严格给出渐近自由极限 $\alpha(\mu) \to 0$；对任意 $b_0 \neq 0$，存在唯一正零点标度 $\Lambda = \mu_0 \exp(-2\pi a_0 / b_0)$，在 $a_0 > 0$ 下 $b_0 > 0$ 给出红外禁闭标度 $\Lambda < \mu_0$，而 $b_0 < 0$ 给出紫外朗道极点 $\Lambda > \mu_0$。
2. **显式 $N_c$ 色与 $15$ 态标准模型外尔多重态迹：$N_c = 3$ 唯一选色、$k_Y = \frac{5}{3}$ 与 $\sin^2\theta_W = \frac{3}{8}$**（[`weylT3SqTrace_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylT3SqTrace_eq)、[`weylColorSqTrace_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylColorSqTrace_eq)、[`color_weak_unification_iff_three`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.color_weak_unification_iff_three)、[`weylT3YTrace_eq_zero`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylT3YTrace_eq_zero)、[`weylYSqTraceAnom_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylYSqTraceAnom_eq)、[`weyl_pythagoras`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weyl_pythagoras)、[`weylQSqTraceAnom_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weylQSqTraceAnom_eq)、[`gut_hypercharge_norm_anom`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_hypercharge_norm_anom)、[`gut_hypercharge_norm_three`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_hypercharge_norm_three)、[`gut_weinberg_anom`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_anom)、[`gut_weinberg_three_eighths`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_three_eighths)、[`weinberg_anom_sub_fixed`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weinberg_anom_sub_fixed)、[`weinberg_curves_cross_iff_three`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.weinberg_curves_cross_iff_three)、[`sm15_trace_T3_sq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_T3_sq)、[`sm15_trace_Y_sq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y_sq)、[`sm15_trace_Q_sq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Q_sq)、[`sm15_trace_T3_Y`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_T3_Y)、[`sm15_trace_Y`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y)、[`sm15_trace_Y_cube`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm15_trace_Y_cube)）：对一代五个外尔多重态 $(Q_L, u_R^c, d_R^c, L_L, e_R^c)$ 显式求和给出 $\operatorname{Tr}(T_3^2) = \frac{N_c+1}{2}$、$\operatorname{Tr}((T_c^a)^2) = 2$（二者相等**当且仅当** $N_c = 3$）、$\operatorname{Tr}(T_3 Y) = 0$、$\operatorname{Tr}(Y^2) = \frac{(N_c+1)(N_c+2)}{2N_c}$、勾股恒等式 $\operatorname{Tr}(Q^2) = \operatorname{Tr}(T_3^2) + \operatorname{Tr}(Y^2) = \frac{(N_c+1)^2}{N_c}$、$k_Y(N_c) = \frac{N_c+2}{N_c}$ 与 $\sin^2\theta_W(N_c) = \frac{N_c}{2(N_c+1)}$；反常相消曲线与固定夸克电荷曲线之差精确等于 $\frac{N_c^2 - 9}{4(N_c+1)(9+5N_c)}$，当且仅当 $N_c = 3$ 时相交于 $k_Y(3) = \frac{5}{3}$ 与 $\sin^2\theta_W(3) = \frac{3}{8}$；独立枚举全部 $15$ 个标准模型外尔态直接核验 $\sum T_3^2 = 2$、$\sum Y^2 = \frac{10}{3}$、$\sum Q^2 = \frac{16}{3}$、$\sum T_3 Y = \sum Y = \sum Y^3 = 0$。
3. **世代抵消、SM 对 MSSM 三线交汇比与精确 GQW 跑动偏移**（[`sm_beta_standard_values`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_beta_standard_values)、[`sm_beta_diff_independent_of_ng`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_beta_diff_independent_of_ng)、[`three_coupling_unification_iff`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.three_coupling_unification_iff)、[`sm_B_ratio_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_B_ratio_eq)、[`mssm_B_ratio_eq`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.mssm_B_ratio_eq)、[`sm_B_ratio_lt_mssm`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.sm_B_ratio_lt_mssm)、[`gut_weinberg_running_formula`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_running_formula)、[`gut_weinberg_at_unification`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_at_unification)、[`gut_weinberg_running_offset`](lean:D5/S3/Quantum/Gauge/GaugeUnificationRG4D.gut_weinberg_running_offset)）：标准模型单圈斜率（取渐近自由正号约定）在 $(n_g, n_H) = (3, 1)$ 处为 $(-\frac{41}{10}, \frac{19}{6}, 7)$，其三条两两之差完全独立于世代数 $n_g$；对 $b_1 < b_2 < b_3$ 且 $a_1 \neq a_2$，三支耦合存在公共交汇点**当且仅当** $\frac{a_2 - a_3}{a_1 - a_2} = \frac{b_2 - b_3}{b_1 - b_2}$，给出最小标准模型比值 $\frac{115}{218} < \frac{5}{7}$（MSSM 比值）；此外，跑动温伯格角在 $\alpha_1^{-1} = \alpha_2^{-1} \neq 0$ 处精确等于 $\frac{3}{8}$，且沿单圈流精确满足 Georgi–Quinn–Weinberg 偏移恒等式
   $$
   \sin^2\theta_W(\mu) - \frac{3}{8} \;=\; \frac{5}{16\pi}\,\alpha_{\mathrm{em}}(\mu)\,(b_2 - b_1)\,\ln\!\left(\frac{\mu}{\mu_{\mathrm{GUT}}}\right).
   $$
:::

::: proof
第 1 款通过有理数线性化、对数链式求导、无穷远极限复合与指数单调性证得渐近自由阈值、微分方程及唯一零点标度。第 2 款在显式五元归纳类型 `SMFermion` 与 $15$ 元指标 `Fin 15` 上逐项展开有限和，借 $Q = T_3 + Y$ 的交叉迹归零建立勾股恒等式，并由分子 $N_c^2 - 9 = (N_c - 3)(N_c + 3)$ 锁死唯一正整数根 $N_c = 3$。第 3 款直接消元求解三线交点线性方程组，核算 SM 与 MSSM 斜率比，并由 $\alpha_{\mathrm{em}}^{-1} = \frac{5}{3}\alpha_1^{-1} + \alpha_2^{-1}$ 恒等变形证得精确 GQW 跑动偏移公式。完整证明由 Lean 内核检查。
:::

与此同时，作为与 AF-GUT 积群圆弧统一形成精确结构对照的传统单群大统一骨架——乔吉—格拉肖 $\mathrm{SU}(5)$ 与弗里茨施—闵可夫斯基 $\mathrm{SO}(10)$ 规范表示论（含显式块嵌入、$k_1 = \frac{5}{3}$ 与 $\sin^2\theta_W = \frac{3}{8}$、$\mathbf{24}$ 伴随五块不可约分解及 $X, Y$ 轻子夸克电荷 $\pm\frac{4}{3}, \pm\frac{1}{3}$、$\bar{\mathbf{5}}\oplus\mathbf{10}$ 与标准模型 $15$ 态精确匹配、$\mathcal{A}(\Lambda^2\mathbf{N}) = N - 4$ 反常抵消、$B - L$ 顶角守恒，以及单射 $\mathrm{SU}(5)\hookrightarrow\mathrm{SO}(10)$ 与 $\mathbf{16}_+ = \mathbf{1}\oplus\mathbf{10}\oplus\bar{\mathbf{5}}$ 旋量分支）——现亦已在 Lean 4 内核中完整形式化，为比较单群 GUT 与 AF-GUT（见下文 [§33.9.3](#sec-ch39-11-3) 第 3 款）提供了零误差的代数基准：

::: {.theorem #thm-ch39-su5-so10-grand-unification-4d title="四维 Georgi–Glashow SU(5) 嵌入、24 伴随五块不可约分解、5̄⊕10 反常相消与 SO(10) 16 旋量统一" lean="D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_embedding_traceless_hermitian, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_sm_blocks_commute, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_trace_normalization, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_electric_charge_traceless, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_weinberg_angle_from_trace, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_decomposition, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_dimensions, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_block_action, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_sm_embedding_injective, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_blocks_irreducible, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_hypercharge_eigenvalues, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_leptoquark_electric_charges, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_exterior_product_rule, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_fermion_weight_actions, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_bar5_plus_10_dim, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_bar5_plus_10_matches_sm_hypercharges, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.suN_antisym_cubic_anomaly, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_cubic_anomaly_cancellation, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_b_minus_l_conserved, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_to_so10_injective, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.so10_su5_fermion_branching, D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.so10_su5_b_minus_l_compatibility"}
在显式分块嵌入 $\mathfrak{su}(3)_C \oplus \mathfrak{su}(2)_L \oplus \mathfrak{u}(1)_Y \hookrightarrow \mathfrak{su}(5) \hookrightarrow \mathfrak{so}(10)$ 下，以下四组结构定理在 Lean 4 内核中全部严格成立：

1. **标准模型分块嵌入、无迹电荷量子化与 $\sin^2\theta_W = \frac{3}{8}$**（[`su5_embedding_traceless_hermitian`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_embedding_traceless_hermitian)、[`su5_sm_blocks_commute`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_sm_blocks_commute)、[`su5_trace_normalization`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_trace_normalization)、[`su5_electric_charge_traceless`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_electric_charge_traceless)、[`su5_weinberg_angle_from_trace`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_weinberg_angle_from_trace)）：色块、弱块与对角超荷生成元 $Y_{\mathrm{SU}(5)} = \mathrm{diag}(-\frac{1}{3}, -\frac{1}{3}, -\frac{1}{3}, \frac{1}{2}, \frac{1}{2})$ 均为无迹厄米矩阵且彼此对易；基表示迹 $\operatorname{Tr}(T_3^2) = \frac{1}{2}$、$\operatorname{Tr}(Y^2) = \frac{5}{6}$ 锁死超荷归一比 $k_1 = \frac{5}{3}$、$\operatorname{Tr}(Q) = 0$（强迫下夸克与轻子电荷三分量量子化）及统一温伯格角 $\sin^2\theta_W = \frac{\operatorname{Tr}(T_3^2)}{\operatorname{Tr}(Q^2)} = \frac{3}{8}$。
2. **$\mathbf{24}$ 伴随表示的五块直和分解、全五块不可约性与 $(X, Y)$ 轻子夸克电荷**（[`su5_adjoint_decomposition`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_decomposition)、[`su5_adjoint_dimensions`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_dimensions)、[`su5_adjoint_block_action`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_block_action)、[`su5_sm_embedding_injective`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_sm_embedding_injective)、[`su5_adjoint_blocks_irreducible`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_blocks_irreducible)、[`su5_adjoint_hypercharge_eigenvalues`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_adjoint_hypercharge_eigenvalues)、[`su5_leptoquark_electric_charges`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_leptoquark_electric_charges)）：标准模型李代数嵌入单射，且 $\mathfrak{su}(5)$ 的 $24$ 维伴随空间在标准模型伴随作用下唯一分解为五个彼此不可约的模：
   $$
   \mathbf{24} \;=\; (\mathbf{8}, \mathbf{1})_0 \;\oplus\; (\mathbf{1}, \mathbf{3})_0 \;\oplus\; (\mathbf{1}, \mathbf{1})_0 \;\oplus\; (\mathbf{3}, \mathbf{2})_{-5/6} \;\oplus\; (\bar{\mathbf{3}}, \mathbf{2})_{+5/6} \qquad (8 + 3 + 1 + 6 + 6 = 24),
   $$
   其中非对角轻子夸克规范玻色子 $(X, Y)$ 与 $(\bar X, \bar Y)$ 精确携带超荷 $\mp\frac{5}{6}$ 与电荷 $Q = \mp\frac{4}{3}, \mp\frac{1}{3}$。
3. **$\bar{\mathbf{5}} \oplus \mathbf{10}$ 十五态精确匹配、三次规范反常相消与 $B - L$ 守恒**（[`su5_exterior_product_rule`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_exterior_product_rule)、[`su5_fermion_weight_actions`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_fermion_weight_actions)、[`su5_bar5_plus_10_dim`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_bar5_plus_10_dim)、[`su5_bar5_plus_10_matches_sm_hypercharges`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_bar5_plus_10_matches_sm_hypercharges)、[`suN_antisym_cubic_anomaly`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.suN_antisym_cubic_anomaly)、[`su5_cubic_anomaly_cancellation`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_cubic_anomaly_cancellation)、[`su5_b_minus_l_conserved`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_b_minus_l_conserved)）：$\bar{\mathbf{5}} \oplus \Lambda^2 \mathbf{5}$（$5 + 10 = 15$ 态）的 $(T_3, Y)$ 权值与 [@thm-ch39-gut-one-loop-rg-and-weyl-traces-4d] 中的 $15$ 态标准模型外尔表逐态完全一致；对任意 $N \ge 2$，二阶外幂 $\Lambda^2 \mathbf{N}$ 的三次反常系数满足普适恒等式 $\mathcal{A}(\Lambda^2\mathbf{N}) = N - 4$，在 $N = 5$ 时精确给出 $\mathcal{A}(\bar{\mathbf{5}}) + \mathcal{A}(\mathbf{10}) = (-1) + (+1) = 0$，且所有 $\mathrm{SU}(5)$ 规范顶角与汤川顶角严格守恒 $B - L$。
4. **单射 $\mathrm{SU}(5) \hookrightarrow \mathrm{SO}(10)$ 实化嵌入与 $\mathbf{16}_+ = \mathbf{1} \oplus \mathbf{10} \oplus \bar{\mathbf{5}}$ 单旋量统一**（[`su5_to_so10_injective`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.su5_to_so10_injective)、[`so10_su5_fermion_branching`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.so10_su5_fermion_branching)、[`so10_su5_b_minus_l_compatibility`](lean:D5/S3/Quantum/Gauge/SU5SO10GrandUnification4D.so10_su5_b_minus_l_compatibility)）：通过复—实 $2\times 2$ 块实化构造单射嵌入 $\mathrm{SU}(5) \hookrightarrow \mathrm{SO}(10)$；$\mathrm{SO}(10)$ 十六维正手征旋量权格 $\mathbf{16}_+$（偶负号权向量）在 $\mathrm{SU}(5) \times \mathrm{U}(1)_X$ 下精确分支为 $\mathbf{1}_{-5}(\nu_R^c) \oplus \mathbf{10}_{-1} \oplus \bar{\mathbf{5}}_{+3}$（$1 + 10 + 5 = 16$），自然容纳右手中微子 $\nu_R^c$，并自动满足盖尔曼—西岛电荷关系 $Q = T_{3L} + T_{3R} + \frac{B-L}{2}$ 与无三次规范反常性（`OmegaMath.LinearAlgebra.SpinorWeights5`）。
:::

::: proof
第 1、2 款在 $5\times 5$ 分块矩阵空间中逐块展开伴随换位子，并借助 `OmegaMath.LinearAlgebra.Matrix.AdjointIrreducibility` 证明 $\mathfrak{sl}_n$ 伴随模与双基本块的不可约性。第 3 款借助 `OmegaMath.Algebra.ExteriorSquareTrace` 对任意对角无迹生成元计算 $\operatorname{Tr}_{\Lambda^2}(H^3) = (N - 4)\operatorname{Tr}(H^3)$，并将 $\bar{\mathbf{5}}\oplus\mathbf{10}$ 的 $15$ 个权值逐一映射核对至 `GaugeUnificationRG4D` 的标准模型 $15$ 态表。第 4 款由 `OmegaMath.LinearAlgebra.Matrix.ComplexRealification` 给出保正交、保行列式的单射实化 $\mathrm{SU}(5) \hookrightarrow \mathrm{SO}(10)$，由 `OmegaMath.LinearAlgebra.SpinorWeights5` 在 $\{\pm\frac{1}{2}\}^5$ 偶权集上核验 $1 + 10 + 5 = 16$ 分支、$B - L$ 兼容性与自动反常抵消。完整证明由 Lean 内核检查。
:::

## 33.9.3 跨概念希格斯颤动桥、主频 $\nu_0$ 爱因斯坦场方程收口与质子寿命—磁单极子四重拓扑审计 {#sec-ch39-11-3}

解决了三支规范耦合的同源统合，大统一拼图上还剩三块最关键的试金石：**物质与弱玻色子的静止质量从何而来？四支微观概念场如何与弯曲时空几何写入同一道引力场方程？以及 AF-GUT 如何干净利落地躲开压垮传统单群 GUT 的质子衰变与磁单极子灾难？**

1. **希格斯场 $\Phi_H \leftrightarrow D_{\mathrm{int}}$：连接左右手概念纤维的跨概念圆弧颤动（Zitterbewegung）桥（`MODEL` + `LEAN ✓` 代数支点，对比 Connes 谱标准模型 `文献结果`）**：
   在无希格斯凝聚的对称相中，一切手性外尔费米子将 $100\%$ 的普适比较主频 $\nu_0$ 投入沿三维空间格网的前向跨胞寻址（$\beta = 1,\; d\tau/dt = 0$，受零光锥度规刚性 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) 锁定），全部以光速 $c = \ell_P\nu_0$ 无质量传播。为什么世界没有停留在纯光速流散的失忆态（[§35.2](ch36-s01-light-and-memory.md)）？因为如 [@def-ch39-af-gut-master-connection] 第 2 款所示，除了连接相邻空间顶点的**水平边联络** $U_\ell$，同一空间原胞内部还存在连接左手二重态纤维 $\mathcal{H}_L$ 与右手单态纤维 $\mathcal{H}_R$ 的**垂直跨概念圆弧跃迁算子** $D_{\mathrm{int}}(\Phi_H)$！
   由内核冻结的协变换位子分解定理 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)（$U\cdot f - f\cdot U = (\mathit{translated} - f)\cdot U$，`LEAN ✓`），当比较探针先执行跨概念手征翻转 $f = \Phi_H$ 再跨空间边输运 $U_\ell$，与先跨边输运再翻转手征相减时，非对易余项 $(\mathit{translated} - f)U_\ell$ 在本模型中读作希格斯协变导数项 $D_\mu\Phi_H$；而双阱势 $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$ 不出自这条恒等式：纯垂直方向只有同一算子与自身的换位子 $[\Phi_H, \Phi_H] = 0$，给不出任何势，势的形式与次数、$-\mu_H^2$ 的符号以及各项系数都是另加的输入（`手工推导`；选这一两项势作匹配样例属 `MODEL`）。当真空凝聚在非零跨概念倾角 $\langle\Phi_H\rangle = \frac{1}{\sqrt{2}}(0, v)^\top$（$v \approx 246.22\;\mathrm{GeV}$）时，两幕物理奇迹同步发生：

   - **规范扇区 `2 + 1 = 3` 纵向吸收**：三枚破缺陪集生成元对应的纵向圆弧相位被 $W^\pm, Z^0$ 的两个横向偏振吞并，闭合成三维完整偏振的有质量驻波体 $m_W = \frac{1}{2}g_2 v$ 与 $m_Z = \frac{1}{2}\sqrt{g_2^2 + g_Y^2}\,v = m_W / \cos\theta_W$，而未破缺电荷组合 $Q = T_3 + Y$ 严格湮灭真空（$Q\langle\Phi_H\rangle = 0$），保住光子绝对零质量 $m_\gamma \equiv 0$；
   - **费米子扇区手征颤动驻波成质**：汤川耦合项 $-y_\psi\overline{\psi}_L\Phi_H\psi_R + \mathrm{h.c.}$ 迫使原本沿零光锥单向奔逃的左右手外尔分量在原胞内部以角频率 $\omega_{\mathrm{couple}} = m_\psi c^2/\hbar$（自由波包正负能拍频颤动角频率 $\omega_Z = 2m_\psi c^2/\hbar$，见[第十八章](ch18-spinors-and-gauge-curvature.md) [@rem-dirac-zitterbewegung-literature]）往复 $90^\circ$ 正交折叠，截留一部分普适主频预算化作局域三维驻波静止质量（这一折叠是图像，`MODEL`：静止的自由狄拉克演化 $e^{-i\gamma^0 m_\psi c^2 t/\hbar}$ 只给正能本征态一个整体相位，左右手概率不随时间变化，$2m_\psi c^2/\hbar$ 拍频要求正负能分量相干叠加，所以静止质量并不对应一个普适的内部振荡；下式只来自手征翻转场的真空矩阵元，`手工推导`）

     $$
     m_\psi \;=\; \frac{y_\psi\,v}{\sqrt{2}}.
     $$

   在学术脉络上，这一“水平规范联络 $\oplus$ 垂直内空间希格斯算子”结构与孔涅（Connes, 1995）及沙姆塞丁—孔涅（Chamseddine & Connes, 1997, 2012）的**几乎交换非交换几何谱标准模型** $M_4 \times F$ 遥相呼应（`文献结果`，见 [@rem-ch39-georgi-glashow-connes-jacobson-literature] 第 4 条）；但两者的本体论地基截然不同：孔涅谱作用量 $\operatorname{Tr}\!\bigl(f(D/\Lambda)\bigr)$ 仍需预设一块现成的四维连续欧氏黎曼流形背景 $M_4$（且早期最小谱模型曾预言 $m_H \approx 170\;\mathrm{GeV}$，至 2012 年计入实标量单态耦合后方与 $m_H \approx 125.1\;\mathrm{GeV}$ 兼容），而 AF-GUT 不预设任何连续欧氏背景流形，空间骨架与内禀纤维同由极小圆弧比较复形与主频 $\nu_0$ 织就。

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="higgs-cross-concept-zitterbewegung" height="500"}
调节琥珀色跨概念希格斯桥倾角手柄 $\tilde{\Phi}_H$，观察空间边水平圆弧输运与原胞内左右手概念纤维 $\mathcal{H}_L \leftrightarrow \mathcal{H}_R$ 垂直 $90^\circ$ 折叠的非对易交织：紫色 $\mathrm{SU}(2)_L$ 旋量壳与银白色 $\mathrm{U}(1)_Y$ 相位壳经 `2 + 1 = 3` 吞并纵向相位生成 $W^\pm, Z^0$ 驻波质量并保住无质量光子，费米子前向光速步进折返为局域手征颤动静止质量（绿色框锚定 `covariant_commutator_formula` 与 `square_eq_neg_one_of_skewAdjoint_unitary`，电弱破缺文献标 `ARGUED`，质量比实算标 `NUM`，手征桥读法标 `MODEL`）。
:::

以上电弱对称性自发破缺 $\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y \to \mathrm{U}(1)_{\mathrm{em}}$ 的完整树图机制——墨西哥帽真空流形、李代数与满群级未破缺电磁稳定子、显式 $4 \times 4$ 规范玻色子质量平方矩阵、精确无质量光子与 $0 < M_W^2 < M_Z^2$、精确树图护卫对称性 $\rho = 1$、电荷关系 $e^{-2} = g^{-2} + g'^{-2}$ 以及三条无质量戈德斯通（Goldstone）模与物理希格斯玻色子质量 $m_H^2 = 2\lambda v^2$——现已全部由 Lean 4 内核严格形式化：

::: {.theorem #thm-ch39-electroweak-higgs-ssb-and-custodial-rho-4d title="四维电弱希格斯自发对称破缺、精确无质量光子、W/Z 质量、树图护卫对称性 ρ = 1 与三戈德斯通谱" lean="D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_nonneg, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_eq_zero_iff, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_vacuum_zero, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_vacuum_stabilizer_iff, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_group_stabilizer_iff, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.gaugeDerivative_eq_generator_action, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_quadratic_form, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_neutral_rotation_orthogonal, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_diagonalized, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_gauge_mass_matrix, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_W_mass_sq, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_photon_massless, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_Z_mass_sq, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_order, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_custodial_rho_eq_one, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_electric_charge_relations, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_fluctuation_expansion, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_fluctuation_homogeneous_terms, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_hessian_diagonal, D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_hessian_spectrum"}
在带超荷 $Y = \frac{1}{2}$ 的复希格斯二重态 $\Phi \in \mathbb{C}^2$ 上定义墨西哥帽势 $V(\Phi) = \lambda\bigl(\|\Phi_0\|^2 + \|\Phi_1\|^2 - \frac{v^2}{2}\bigr)^2$ 与标准真空 $\Phi_0 = (0, v/\sqrt{2})^\top$：

1. **真空流形与代数/满群级 $\mathrm{U}(1)_{\mathrm{em}}$ 稳定子**（[`higgsPotential_nonneg`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_nonneg)、[`higgsPotential_eq_zero_iff`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_eq_zero_iff)、[`higgsPotential_vacuum_zero`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgsPotential_vacuum_zero)、[`higgs_vacuum_stabilizer_iff`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_vacuum_stabilizer_iff)、[`higgs_group_stabilizer_iff`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_group_stabilizer_iff)）：对 $\lambda > 0$，$V(\Phi) \ge 0$ 且 $V(\Phi) = 0 \iff \|\Phi_0\|^2 + \|\Phi_1\|^2 = \frac{v^2}{2}$（包含 $\Phi_0$）；当 $v > 0$ 时，李代数生成元 $(a_1, a_2, a_3, b)$ 湮灭 $\Phi_0$ **当且仅当** $a_1 = a_2 = 0 \land b = a_3$（唯一未破缺电荷生成元 $Q = T_3 + Y$），且在满群 $\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 作用下稳定 $\Phi_0$ **当且仅当** $\beta = 0 \land \zeta = \alpha$（精确同构于 $\mathrm{U}(1)_{\mathrm{em}}$）。
2. **显式 $4 \times 4$ 规范玻色子质量矩阵、无质量光子、树图 $\rho = 1$ 与电荷统一**（[`gaugeDerivative_eq_generator_action`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.gaugeDerivative_eq_generator_action)、[`ew_mass_quadratic_form`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_quadratic_form)、[`ew_neutral_rotation_orthogonal`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_neutral_rotation_orthogonal)、[`ew_mass_diagonalized`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_diagonalized)、[`ew_gauge_mass_matrix`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_gauge_mass_matrix)、[`ew_W_mass_sq`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_W_mass_sq)、[`ew_photon_massless`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_photon_massless)、[`ew_Z_mass_sq`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_Z_mass_sq)、[`ew_mass_order`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_mass_order)、[`ew_custodial_rho_eq_one`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_custodial_rho_eq_one)、[`ew_electric_charge_relations`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.ew_electric_charge_relations)）：由协变导数二次型 $2\|D_A\Phi_0\|^2$ 给出显式 $4 \times 4$ 实对称质量平方矩阵，在正交中性旋转 $(Z, A)$ 下精确对角化为 $M_W^2(W_1^2 + W_2^2) + M_Z^2 Z^2 + 0\cdot A^2$：光子特征向量 $(0, 0, \sin\theta_W, \cos\theta_W)$ 严格零本征值，$M_W^2 = \frac{1}{4}g^2 v^2 < M_Z^2 = \frac{1}{4}(g^2 + g'^2)v^2$，且对任意 $g, g', v > 0$ 恒满足树图护卫对称性关系与电荷公式：
   $$
   \rho \;:=\; \frac{M_W^2}{M_Z^2 \cos^2\theta_W} \;=\; 1, \qquad e \;=\; g\sin\theta_W \;=\; g'\cos\theta_W, \qquad \frac{1}{e^2} \;=\; \frac{1}{g^2} + \frac{1}{g'^2}.
   $$
3. **精确希格斯涨落多项式与 Hessian 谱（三无质量戈德斯通模 + 物理希格斯 $m_H^2 = 2\lambda v^2$）**（[`higgs_fluctuation_expansion`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_fluctuation_expansion)、[`higgs_fluctuation_homogeneous_terms`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_fluctuation_homogeneous_terms)、[`higgs_hessian_diagonal`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_hessian_diagonal)、[`higgs_hessian_spectrum`](lean:D5/S3/Quantum/Gauge/ElectroweakHiggsMechanism4D.higgs_hessian_spectrum)）：沿 $\Phi(g_1, g_2, h, g_3) = \frac{1}{\sqrt{2}}(g_1 + i g_2,\, v + h + i g_3)^\top$ 展开精确得 $V = \lambda v^2 h^2 + \lambda v h\,q + \frac{\lambda}{4} q^2$（$q = h^2 + g_1^2 + g_2^2 + g_3^2$），任意方向二阶导数恒等于 $2\lambda v^2 h^2$，从而唯一径向希格斯模质量平方 $m_H^2 = 2\lambda v^2 > 0$，三条横截戈德斯通模 $(g_1, g_2, g_3)$ 曲率精确归零。
:::

::: proof
第 1 款在复范数平方与 $\mathrm{SU}(2)\times\mathrm{U}(1)$ 矩阵元上直接求解稳定子方程。第 2 款展开 $2\|D_A\Phi_0\|^2$ 并按 $(\cos\theta_W, \sin\theta_W) = (g, g')/\sqrt{g^2 + g'^2}$ 验证 $4\times 4$ 质量矩阵本征向量、正交旋转、$\rho = 1$ 与电荷倒数平方和。第 3 款直接展开四次势多项式，并在 $t = 0$ 处求二阶方向导数导出 `2 * lam * v^2 * h^2` 谱分解。完整证明由 Lean 内核检查。
:::

2. **普适比较主频 $\nu_0$ 勾股收口：四场总时钟负载直写爱因斯坦场方程右端（`MODEL` + `LEAN ✓` 勾股/上同调支点）**：
   回到 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md) 的等主频硬件账本：全宇宙每一枚极小圆弧原胞都按恒定总主频 $\nu_0 \equiv \mathrm{const}$ 运转。在等主频预算公设下（`MODEL`；拉格朗日—格拉姆恒等式与玻恩权重非负只提供“平方项非负”这一代数支点，预算等式本身是公设），由拉格朗日—格拉姆勾股守恒恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)（[@thm-ch39-af-gut-arc-field-unification] 第 6 款，`LEAN ✓`）与秩一玻恩非负模平方权重 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`），无论是电磁阿贝尔圆弧通量 $\Omega_{\mathrm{U}(1)}$、弱双覆叠曲率 $\Omega_{\mathrm{SU}(2)}$、强胶子色通量管 $\Omega_{\mathrm{SU}(3)}$，还是跨概念希格斯—汤川颤动驻波 $\Phi_H$，它们在每一拍底层比较节拍中占用的平方时钟负载都**严格非负、同号累加**：

   $$
   \nu_\tau^2 \;+\; \nu_{\mathrm{move}}^2 \;+\; \nu_{\mathrm{arc\text{-}load}}^2\!\bigl[\Omega_{\mathrm{U}(1)},\,\Omega_{\mathrm{SU}(2)},\,\Omega_{\mathrm{SU}(3)},\,\Phi_H\bigr] \;=\; \nu_0^2.
   $$

   当大量概念节点并入比较网跨越静定边界进入 $N \ge 5$ 时，四面体二阶上链曲率缺陷定理 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)（[@thm-ch39-af-gut-arc-field-unification] 第 5 款，`LEAN ✓`）证明：一旦四面体上边缘不为零（$\operatorname{tetraDefects}(F) > 0$），任何一维平直边势赋值都无法消除曲率阻挫（定理本身是交换群系数二上链的正合判据：四面体上边缘处处为零当且仅当 $F$ 是某个边势的上边缘；把非零缺陷读作引力曲率阻挫是本书的类比，`MODEL`）！在胖单纯形粗粒化与局域因果视界热力学平衡（萨哈罗夫 1967 诱导真空弹性与雅各布森 1995 视界状态方程 $\delta Q = T\,dS$，`文献结果`）下，总相位泛函驻相变分 $\delta\Phi_{\mathrm{AF\text{-}GUT}} = 0$ 把方程左端的**胞间空间桁架雷吉角亏曲率**与方程右端的**胞内四支概念场总主频时钟负载**对应起来，在这些文献前提下可以读作宏观爱因斯坦场方程（`MODEL` 连续统靶标，完整自旋-$2$ 洛伦兹极限由 [@prob-ch34-gravity-dynamics-and-coupling] 审计）：

   $$
   G_{\mu\nu} \;+\; \Lambda_{\mathrm{cos}}\,g_{\mu\nu} \;=\; \frac{8\pi G}{c^4}\,T_{\mu\nu}\!\bigl[\Omega_{\mathrm{U}(1)},\,\Omega_{\mathrm{SU}(2)},\,\Omega_{\mathrm{SU}(3)},\,\Phi_H\bigr].
   $$

   这幅几何收口自带两道天然极值护栏：在**紫外短距端**，一旦缩回单枚三角形面或四面体极小圆弧壳（$N \in \{3, 4\}$；$N = 1, 2$ 单点/单杆退化态亦零冗余约束），非共线欧拉计数（$N \ge 3$，球面欧拉链见 [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)）锁定的刚性盈余 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ 精确归零（且准晶切投模型集具有严格正的装球分离半径，一维形式化原型见[第 35 章 §35.7](coda-s03-golden-cut-observers.md#sec-coda-trureturing-golden-cut-observer) [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone) `LEAN ✓`），在本模型中单胞以下没有独立的胞间角亏自由度（`MODEL`；这不是紫外有限性的证明）；在**红外宇宙学视界端**，横跨 $N_{\mathrm{horizon}} \sim R_H/\ell_P \sim 10^{61}$ 枚原胞的极小圆弧步长 $\epsilon_{\min} \sim N_{\mathrm{horizon}}^{-1}$ 伴随最小正矢高余项 $1 - \cos\epsilon_{\min} \approx \frac{1}{2}\epsilon_{\min}^2 \sim N_{\mathrm{horizon}}^{-2} \sim 10^{-122}$（`MODEL` 运动学尺度呼应；恪守 [§34.11](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor) [@ex-ch34-horizon-blindspot-anticircularity] 反循环护栏，不预设 $R_H$ 的非循环导出归入 [@prob-ch39-af-gut-threshold-and-proton-stability] 第 4 款）。

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="einstein-pythagorean-clock-balance" height="500"}
在普适比较主频 $\nu_0$ 勾股天平上检视引力如何与微观规范负载同源闭合：银白色 $\mathrm{U}(1)_Y$ 相位、紫色 $\mathrm{SU}(2)_L$ 旋量、蓝色 $\mathrm{SU}(3)_C$ 色通量与琥珀色希格斯桥 $\tilde{\Phi}_H$ 的非负平方负载共同压低青色固有时留存分量 $\nu_\tau / \nu_0$，并在 $N \ge 5$ 超静定四面体桁架上驱动青色空间壳 $F_{\mathrm{pos}}$ 的雷吉二面角亏曲率（绿色框锚定 `lagrange_gram_identity` 与 `tetra_defects_incidence_repair_and_exactness`，勾股天平与四面体缺陷计数实算标 `NUM`，连续统自旋-$2$ 极限列入抽屉红色 `OPEN`）。
:::

3. **质子稳定性、零磁单极子与非微扰拓扑扇区的四重精确审计（`手工推导` + `文献结果`）**：
   AF-GUT 的规范群就是标准模型的规范群，所以它在重子数守恒与拓扑缺陷上继承标准模型的**四条精确选择定则**；这四条把它与单群大统一区分开，但不把它与标准模型本身区分开：

   - **（i）零规范轻子夸克质子衰变（$\Gamma_{\mathrm{gauge}}(p \to e^+\pi^0) \equiv 0$）**：由于色概念纤维 $\mathcal{E}_{\mathrm{color}}^{(3)}$ 与电弱概念纤维 $\mathcal{E}_{\mathrm{weak}}^{(2)} \oplus \mathcal{E}_Y^{(1)}$ 通过主频与圆弧迹刚度公设耦合，而非嵌入 $\mathrm{SU}(5)/\mathrm{SO}(10)$ 单群矩阵，理论谱中**严格不存在 $(X, Y)$ 超重轻子夸克规范玻色子**。因此树图与圈图规范媒介单核子衰变率恒等于零：

     $$
     \Gamma_{\mathrm{gauge}}^{\mathrm{AF\text{-}GUT}}(p \to e^+ \pi^0) \;\equiv\; 0,
     $$

     自然满足超级神冈实验测定的严苛下界 $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$（$90\%$ 置信度，**A. Takenaka et al.**, *Phys. Rev. D* **102**, 112011, 2020）。至于单原胞普朗克尺度（$E_P \approx 1.22 \times 10^{19}\;\mathrm{GeV}$）是否容许被 $M_P^{-2}$ 压低的六维四费米子算符 $\frac{c_6}{M_P^2}qqq\ell$：即便 $c_6 \sim \mathcal{O}(1)$，其量纲估算寿命亦高达 $\tau_p^{\mathrm{Planck}} \sim M_P^4 / m_p^5 \sim 10^{45}\;\mathrm{yr} \gg 2.4 \times 10^{34}\;\mathrm{yr}$，远在当前实验排除线之上（概念正交性是否进一步严格令 $c_6 = 0$ 见 [@prob-ch39-af-gut-threshold-and-proton-stability] 第 3 款）。
   - **（ii）零大统一拓扑磁单极子（$\pi_2(S^3) = 0$）**：AF-GUT 在紫外端不存在从单连通单群向 $\mathrm{U}(1)_Y$ 的高能自发破缺；全能区唯一的规范陪集破缺是电弱破缺 $[\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y] / \mathrm{U}(1)_{\mathrm{em}} \cong S^3$。由于三维球面的第二同伦群恒为零

     $$
     \pi_2(S^3) \;=\; 0,
     $$

     理论中**严格不存在任何拓扑稳定的特胡夫特—波利亚科夫大统一磁单极子**，这一结论只对乘积规范群加单个希格斯二重态成立。若高能端还有 Pati–Salam 阶段（本书第三阶的结构来源），其伴随破缺的真空轨道 $\mathrm{SU}(4)/\mathrm{S}(\mathrm{U}(3)\times\mathrm{U}(1)) \cong \mathbb{CP}^3$ 由霍普夫纤维化 $S^1 \to S^7 \to \mathbb{CP}^3$ 给出 $\pi_2 = \mathbb{Z}$，第一次相变即容许单极子拓扑；能否避开普雷斯基尔（Preskill, 1979）过密危机，取决于规范群的选择与宇宙学丰度计算（`手工推导`）。
   - **（iii）矢量型强色瞬子严格保重子数（$\Delta B_{\mathrm{QCD}} = 0$）与红外斯格明子拓扑保护**：在三维色概念纤维上，尽管第三同伦群 $\pi_3(\mathrm{SU}(3)_C) = \mathbb{Z}$ 分类了非平凡的欧氏 BPST 胶子瞬子（Belavin–Polyakov–Schwarz–Tyupkin, 1975），但由于 $\mathrm{SU}(3)_C$ 对左右手夸克作**严格等权的矢量耦合**，胶子瞬子仅破坏轴矢味对称性 $\mathrm{U}(1)_A$（赋予 $\eta'$ 介子质量），而使矢量重子流散度恒为零，**严格保持 $\Delta B_{\mathrm{QCD}} \equiv 0$**；与此同时，在低能禁闭相中，手征介子陪集流形 $\mathrm{SU}(2)_L \times \mathrm{SU}(2)_R / \mathrm{SU}(2)_V \cong S^3$ 的绕数群 $\pi_3(S^3) = \mathbb{Z}$ 从红外拓扑上保护了核物质的整数重子荷（[§33.4](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)）。
   - **（iv）手征电弱瞬子选择定则 $\Delta B = \Delta L = 3\Delta N_{\mathrm{CS}} \in 3\mathbb{Z}$ 与隧穿振幅 vs. 跃迁率的指数二倍铁律**：唯有单手征耦合的弱同位旋群 $\mathrm{SU}(2)_L$（$\pi_3(\mathrm{SU}(2)_L) = \mathbb{Z}$）通过特胡夫特手征反常（'t Hooft, 1976）诱发陈—西蒙斯绕数跃迁 $\Delta N_{\mathrm{CS}} \in \mathbb{Z}$，使三代夸克与轻子同步改变重子数与轻子数：

     $$
     \Delta B \;=\; \Delta L \;=\; N_{\mathrm{gen}}\,\Delta N_{\mathrm{CS}} \;=\; 3\,\Delta N_{\mathrm{CS}} \;\in\; 3\mathbb{Z}!
     $$

     这一精确拓扑公式同时锁死两项硬结论：第一，在可重整的标准模型规范结构内（不计 (i) 中的高维算符 $\frac{c_6}{M_P^2}qqq\ell$），选择定则 $\Delta B \in 3\mathbb{Z}$ **在所有微扰与非微扰阶严格禁戒 $|\Delta B| = 1$ 的单质子衰变**（$p \nrightarrow e^+\pi^0,\; p \nrightarrow \bar{\nu}K^+$）与 $|\Delta B| = 2$ 的双核子衰变，至多容许 $|\Delta B| = 3$ 的三核子协同隧穿（以及早期宇宙 $T \gtrsim 130\text{–}160\;\mathrm{GeV}$ 电弱斯法勒龙热跃迁重子生成，Klinkhamer & Manton 1984）；第二，在零温实验室环境下，务必严格区分**欧氏瞬子隧穿振幅 $\mathcal{A}_{\mathrm{inst}}$** 与**玻恩模平方物理跃迁率 $\Gamma_{\Delta B = 3} \propto |\mathcal{A}_{\mathrm{inst}}|^2$**——由单枚电弱 BPST 瞬子作用量 $S_{\mathrm{inst}} = \frac{8\pi^2}{g_2^2(M_Z)} = \frac{2\pi}{\alpha_2(M_Z)} \approx 2\pi \times 29.59 \approx 185.9$，半经典 WKB **隧穿振幅**为

     $$
     \mathcal{A}_{\mathrm{inst}} \;\propto\; \exp\!\left(-\frac{8\pi^2}{g_2^2}\right) \;=\; e^{-S_{\mathrm{inst}}} \;\approx\; e^{-185.9} \;\sim\; 1.8 \times 10^{-81},
     $$

     而可观测的零温三核子消失**跃迁率**则是振幅的模平方（再次印证玻恩平方律 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)），指数上严格多出因子 $2$：

     $$
     \Gamma_{\Delta B = 3}^{(T = 0)} \;\propto\; \bigl\lvert\mathcal{A}_{\mathrm{inst}}\bigr\rvert^2 \;\propto\; \exp\!\left(-\frac{16\pi^2}{g_2^2}\right) \;=\; e^{-2 S_{\mathrm{inst}}} \;\approx\; e^{-371.8} \;\approx\; 3.3 \times 10^{-162},
     $$

     比宇宙年龄倒数还要微弱逾百个数量级，令日常核物质坚如磐石！

## 33.9.4 形式化锚点定理、对账总算例、开放界碑与迈向均匀本体场及因陀罗网的终极合拢 {#sec-ch39-11-4}

下面我们将支撑极小圆弧场大统一理论（AF-GUT）六大数学支柱——水平输运与垂直希格斯折叠的统一协变换位子、$90^\circ$ 正交盲区复结构 $R^2 = -I_n$、有限交互图锚定阿贝尔圆弧和乐环面分类、二维双矢量旋量 $360^\circ$ 对跖换叶双覆叠提升、四面体二阶上链曲率缺陷与边势正合判据、以及主频 $\nu_0$ 下固有时与概念场负载的拉格朗日—格拉姆勾股恒等式——的**六条 Lean 4 内核冻结声明**汇编如下：

::: {.theorem #thm-ch39-af-gut-arc-field-unification title="协变换位子因式分解、正交反自伴复结构、锚定阿贝尔圆弧和乐分类、圆周双覆叠换叶提升、四面体上边缘缺陷正合与拉格朗日—格拉姆勾股收口定理" lean="D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
在 `trureturing` 冻结的量子代数、观察者锚定和乐、概念拓扑双覆叠、单纯二上链特征修补与量子界模块中，以下六项定理同时成立：

1. **协变换位子的普遍环论因式分解定理**（[`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)）：设 $B$ 为任意带单位元的环（`[Ring B]`，无需假定乘法交换性、拓扑或范数），元素 $U, f, \mathit{translated} \in B$ 满足半共轭条件 $\operatorname{SemiconjBy}\;U\;f\;\mathit{translated}$（即 $U \cdot f = \mathit{translated} \cdot U$），则恒有

   $$
   U \cdot f - f \cdot U \;=\; (\mathit{translated} - f) \cdot U.
   $$

2. **反自伴右幺正矩阵的负恒等平方复结构定理**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）：设 $n$ 为有限可判等指标类型（`[Fintype n]`、`[DecidableEq n]`），复矩阵 $R \in M_n(\mathbb{C})$ 同时满足反自伴条件 $R^\dagger = -R$ 与右幺正条件 $R R^\dagger = I_n$，则其平方恒等于负单位矩阵：

   $$
   R^2 \;=\; -I_n.
   $$

3. **有限图锚定阿贝尔圆弧相位分类与商环面同构定理**（[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）：设 $V, E$ 为有限类型（`[Fintype V]`、`[Fintype E]`），$s, t : E \to V$，$T \subseteq E$，$ht : \operatorname{NamedSpanningTree}\;s\;t\;T$，锚点集 $R \subseteq V$ 含基点 $r \in R$。记 $\chi = \operatorname{coordinateHom}\;ht\;R\;r$，$\sigma = \operatorname{phaseSection}\;s\;t\;T\;R\;r$，锚定上边缘子群 $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$，并设 $c = \lvert\{e : E \mid e \notin T\}\rvert$、$a = \lvert\{x : V \mid x \in R \land x \neq r\}\rvert$、$n = \lvert V\rvert$、$m = \lvert E\rvert$、$k = \lvert R\rvert$。则：（a）对一切 $g \in \operatorname{anchoredGroup}(R)$ 与 $u : E \to \mathrm{Circle}$ 有 $\chi(\operatorname{gauge}\;s\;t\;g\;u) = \chi(u)$，且 $\chi(u) = \chi(w) \iff \exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}\;s\;t\;g\;u = w$；（b）$\sigma$ 为 $\chi$ 的连续乘法右逆截面（$\chi \circ \sigma = \mathrm{id}$），$\ker(\chi) = N$ 为闭子群；（c）商同态 $q : ((E \to \mathrm{Circle}) / N) \simeq_{\mathrm{t}*} \operatorname{Coordinates}(T, R, r)$ 构成紧豪斯多夫拓扑群同构；（d）满足组合维数恒等式 $\lvert T\rvert + 1 = n$、$c = m + 1 - n$、$a = k - 1$、$c + a = m + k - n$，且 $\operatorname{Nonempty}\bigl(\operatorname{Coordinates}(T, R, r) \simeq_{\mathrm{t}*} (\operatorname{Fin}(m + k - n) \to \mathrm{Circle})\bigr)$。

4. **圆周平方双覆叠唯一路径提升与 $360^\circ$ 对跖换叶定理**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：设 $I = [0, 1] \subset \mathbb{R}$，记平方映射为 $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$（$z \mapsto z^2$），典范覆叠证明为 $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$。对任意连续底路径 $\mathrm{basePath} \in C(I, \mathrm{Circle})$、初值 $\mathrm{initial} \in \mathrm{Circle}$ 及相容见证 $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$，典范提升 $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver})$ 唯一满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ 与 $\mathrm{lifted}(0) = \mathrm{initial}$；同时不存在满足 $(s(z))^2 = z$ 的连续全局截面 $s : \mathrm{Circle} \to \mathrm{Circle}$，且整圈底回路 $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t)$ 自 $\mathrm{initial} = 1$ 的唯一连续提升满足

   $$
   \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
   $$

5. **有序单纯形四面体上边缘缺陷计数、锚定修补界与一维边势正合定理**（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：设 $V$ 为有限非空顶点集（`[Fintype V]`、`[Nonempty V]`），$A$ 为加法交换群（`[AddCommGroup A]`），$F : V \to V \to V \to A$ 为三元二上链，则恒有

   $$
   \begin{aligned}
   &\left(\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)\right)
   \;\land\; \bigl(\exists r \in V,\; \lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)\bigr) \\
   &\quad \land\; \bigl(\forall \mathrm{edge} : V \to V \to A,\; \operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})\bigr) \\
   &\quad \land\; \Bigl(\bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \\
   &\qquad\quad \Longleftrightarrow\; \bigl(\exists \mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)\bigr)\Bigr).
   \end{aligned}
   $$

6. **拉格朗日—格拉姆二向量内积与外积勾股守恒恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意指标类型 $\iota$、有限指标集 $s : \mathrm{Finset}\,\iota$ 及实函数 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$

:::

::: proof
第 1 款在任意环 $B$ 中展开右分配律 $(\mathit{translated} - f)\cdot U = \mathit{translated}\cdot U - f\cdot U$，代入半共轭等式 $U\cdot f = \mathit{translated}\cdot U$ 即得（见 [@prop-covariant-commutator]）。第 2 款将反自伴条件 $R^\dagger = -R$ 代入右幺正等式 $R R^\dagger = I_n$ 得 $-R^2 = I_n$，两边取负即证 $R^2 = -I_n$（见 [@lemma-skew-adjoint-unitary-square]）。第 3 款利用生成树路径输运端点协变性消去基本弦回路中的内部顶点规范因子并保持锚点集 $R$ 上的树路径相位不变，以顶点树势比构造规范轨道逆映射，验证标准截面 $\sigma$ 在生成树上取 $1$ 从而满足 $\chi \circ \sigma = \mathrm{id}$ 与 $\ker(\chi) = N$，再由紧豪斯多夫拓扑群连续同态导出商群同构及环面维数 $c + a = (m + 1 - n) + (k - 1) = m + k - n$（见 [@cor-anchored-phase-classification]）。第 4 款调用覆叠映射路径提升存在唯一性引理，结合无连续全局截面定理，并对 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ 显式核验半角连续提升 $\operatorname{Circle.exp}(\pi t)$ 在终点 $t = 1$ 处落于 $-1$。第 5 款在交换群 $A$ 中改写四面体上边缘为锚定边差分误差，对全顶点求和得第一式、由平均值原理取最小误差锚点得第二式、由四面并集计数得 $4\lvert V\rvert$ 上界（第三式），并在上边缘恒零时固定任意锚点 $r_0 \in V$ 取 $\mathrm{edge}(x, y) := F(r_0, x, y)$ 证得边势正合充要判据（见 [@thm-ch34-trihedron-rigidity-and-complete-graph] 第 8 款）。第 6 款将双重求和内 $(u_i v_j - u_j v_i)^2$ 展开为平方积与内积平方的对称组合后除以 $2$ 即得。完整证明由 Lean 内核检查。
:::

本节在对比额外维统一、单群大统一、拓扑瞬子/单极子、非交换谱几何与热力学诱导引力时援引的外部经典物理学文献集中归档如下：

::: {.remark #rem-ch39-georgi-glashow-connes-jacobson-literature title="卡鲁扎—克莱因额外维、单群大统一与温伯格角跑动、质子寿命与拓扑瞬子/单极子、孔涅非交换谱几何及萨哈罗夫—雅各布森引力文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节构建的极小圆弧场大统一理论（AF-GUT，`MODEL`）与以下五组外部理论物理与实验文献形成严格对照（相关四维连续量子场论与宇宙学定理均未包含在 `trureturing@dev` 锁文件中）：

1. **卡鲁扎—克莱因高维几何统一纲领**：在四维时空外引入第五维紧致圆周度规分量以几何化电磁规范势的构想由 T. Kaluza（*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 966–972, 1921）与 O. Klein（*Z. Phys.* **37**, 895–906, 1926, DOI [10.1007/BF01397481](https://doi.org/10.1007/BF01397481)）开创，并成为后世 $10\mathrm{D}/11\mathrm{D}$ 超弦与 M 理论紧致化的先声；
2. **$\mathrm{SU}(5)$ / $\mathrm{SO}(10)$ 单群大统一与温伯格角 $\frac{3}{8}$ 重整化群跑动**：将标准模型规范群嵌入秩 $4$ 单群 $\mathrm{SU}(5)$（含 $12$ 种 $(X, Y)$ 轻子夸克玻色子并在大统一标度给出 $\sin^2\theta_W = \frac{3}{8}$）由 H. Georgi 与 S. L. Glashow（*Phys. Rev. Lett.* **32**, 438–441, 1974, DOI [10.1103/PhysRevLett.32.438](https://doi.org/10.1103/PhysRevLett.32.438)）提出；利用单圈重整化群方程将紫外 $\sin^2\theta_W = \frac{3}{8}$ 向电弱标度跑动修正的计算由 H. Georgi, H. R. Quinn 与 S. Weinberg（*Phys. Rev. Lett.* **33**, 451–454, 1974, DOI [10.1103/PhysRevLett.33.451](https://doi.org/10.1103/PhysRevLett.33.451)）奠定；将一代 $16$ 分量手性外尔旋量（含 $\nu_R$）整体装入旋量表示的 $\mathrm{SO}(10)$ 大统一模型由 H. Fritzsch 与 P. Minkowski（*Ann. Phys.* **93**, 193–266, 1975, DOI [10.1016/0003-4916(75)90211-0](https://doi.org/10.1016/0003-4916(75)90211-0)）独立建立；
3. **磁单极子、BPST 瞬子、电弱重子数反常与超级神冈质子寿命实验界**：非阿贝尔规范破缺产生的 $\pi_2(G/H) = \mathbb{Z}$ 拓扑磁单极子及早期宇宙单极子过密问题分别出自 G. 't Hooft（*Nucl. Phys. B* **79**, 276–284, 1974）、A. M. Polyakov（*JETP Lett.* **20**, 194–195, 1974）与 J. P. Preskill（*Phys. Rev. Lett.* **43**, 1365–1368, 1979, DOI [10.1103/PhysRevLett.43.1365](https://doi.org/10.1103/PhysRevLett.43.1365)）；四维欧氏杨—米尔斯 $\pi_3(\mathrm{SU}(2)) = \mathbb{Z}$ 自对偶瞬子解（$S_{\mathrm{inst}} = 8\pi^2/g^2$）出自 A. A. Belavin, A. M. Polyakov, A. S. Schwarz 与 Yu. S. Tyupkin（*Phys. Lett. B* **59**, 85–87, 1975, DOI [10.1016/0370-2693(75)90163-X](https://doi.org/10.1016/0370-2693(75)90163-X)）；电弱手征反常选择定则 $\Delta B = \Delta L = N_{\mathrm{gen}}\Delta N_{\mathrm{CS}}$ 与零温瞬子率压低 $\propto e^{-16\pi^2/g_2^2}$ 出自 G. 't Hooft（*Phys. Rev. Lett.* **37**, 8–11, 1976, DOI [10.1103/PhysRevLett.37.8](https://doi.org/10.1103/PhysRevLett.37.8)；*Phys. Rev. D* **14**, 3432–3450, 1976），电弱高温鞍点斯法勒龙（sphaleron）构型出自 F. R. Klinkhamer 与 N. S. Manton（*Phys. Rev. D* **30**, 2212–2220, 1984, DOI [10.1103/PhysRevD.30.2212](https://doi.org/10.1103/PhysRevD.30.2212)）；质子衰变通道 $p \to e^+\pi^0$ 部分寿命下界 $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$（$90\%$ 置信度）由超级神冈合作组 **A. Takenaka et al.**（*Phys. Rev. D* **102**, 112011, 2020, DOI [10.1103/PhysRevD.102.112011](https://doi.org/10.1103/PhysRevD.102.112011)）测定；
4. **几乎交换非交换几何与谱作用量标准模型**：将希格斯场诠释为乘积几何 $M_4 \times F$ 有限内部空间方向上的离散狄拉克算子分量并由谱作用量统一导出杨—米尔斯—希格斯与引力项的框架，由 A. Connes（*J. Math. Phys.* **36**, 6194–6231, 1995, DOI [10.1063/1.531241](https://doi.org/10.1063/1.531241)）及 A. H. Chamseddine 与 A. Connes（*Commun. Math. Phys.* **186**, 731–750, 1997, DOI [10.1007/s002200050126](https://doi.org/10.1007/s002200050126)；含实标量单态修正以匹配 $125\;\mathrm{GeV}$ 希格斯质量的更新见 *J. High Energy Phys.* **2012**(09), 104, 2012, DOI [10.1007/JHEP09(2012)104](https://doi.org/10.1007/JHEP09(2012)104)）发展，该框架在截断标度给出与 $\mathrm{SU}(5)$ 相同的规范耦合关系；
5. **量子真空诱导引力与局域因果视界热力学场方程**：将爱因斯坦—希尔伯特引力诠释为微观量子场涨落对时空度规形变的弹性刚度响应出自 A. D. Sakharov（*Dokl. Akad. Nauk SSSR* **177**, 70–71, 1967；英译 *Sov. Phys. Dokl.* **12**, 1040–1041, 1968）；由局域林德勒视界纠缠熵面积律与克劳修斯关系 $\delta Q = T\,dS$ 导出爱因斯坦场方程出自 T. Jacobson（*Phys. Rev. Lett.* **75**, 1260–1263, 1995, DOI [10.1103/PhysRevLett.75.1260](https://doi.org/10.1103/PhysRevLett.75.1260)）。

:::

我们在下述综合算例中，将任意色维数 $N_c \in \{1 \dots 5\}$ 圆弧迹双曲线唯一交点表、从 $M_Z$ 到 $E_P$ 的单圈温伯格角跑动对账表、跨概念希格斯颤动质量谱以及主频爱因斯坦与电弱瞬子指数审计一次算透：

::: {.example #ex-ch39-af-gut-weinberg-higgs-einstein-audit title="AF-GUT 四联定量对账：色数 N_c=3 唯一双曲线交点、温伯格角 3/8 跑动、希格斯颤动质量谱与主频瞬子审计"}
**手工推导与文献/实验基准核验（配 CODATA 2022 / PDG 2024 输入 `NUM`）。** 以下四组显式演算覆盖本节全部核心定量断言（所有表格均为纯单行单元格）：

1. **第一联：$N_c \in \{1, 2, 3, 4, 5\}$ 手征—矢量外尔圆弧迹与温伯格角双曲线唯一交点表（`手工推导`）**：
   按 [§33.9.2](#sec-ch39-11-2) 公式 $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) = \frac{N_c+1}{2}$、$\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} = \frac{(N_c+1)(N_c+2)}{2N_c}$、$\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{anom}} = \frac{(N_c+1)^2}{N_c}$、$\frac{g_3^2}{g_2^2} = \frac{N_c+1}{4}$（$N_c = 1$ 列为其代数延拓值）、$\sin^2\theta_W^{\mathrm{(anom)}} = \frac{N_c}{2(N_c+1)}$ 与 $\sin^2\theta_W^{\mathrm{(fixed)}} = \frac{9(N_c+1)}{4(9+5N_c)}$ 逐列核算：

   | 色维数 $N_c$ | 弱迹 $\operatorname{Tr}(T_3^2)$ | 反常超荷迹 $\operatorname{Tr}(Y^2)_{\mathrm{anom}}$ | 反常电荷迹 $\operatorname{Tr}(Q^2)_{\mathrm{anom}}$ | 紫外强弱比 $g_3^2 / g_2^2$ | 反常曲线 $\sin^2\theta_W^{\mathrm{(anom)}}$ | 固定荷曲线 $\sin^2\theta_W^{\mathrm{(fixed)}}$ | 双曲线差 $\Delta\sin^2\theta_W$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | $1$ | $1$ | $3$ | $4$ | $0.5000$（代数延拓） | $\frac{1}{4} = 0.250000$ | $\frac{9}{28} \approx 0.321429$ | $-\frac{1}{14} \approx -0.071429$ |
   | $2$ | $\frac{3}{2}$ | $3$ | $\frac{9}{2}$ | $0.7500$（奇二重态反常） | $\frac{1}{3} \approx 0.333333$ | $\frac{27}{76} \approx 0.355263$ | $-\frac{5}{228} \approx -0.021930$ |
   | **$3$** | **$2$** | **$\frac{10}{3}$** | **$2\times\frac{8}{3} = \frac{16}{3}$** | **$1.0000$（$k_Y = \frac{5}{3}$ 锁死）** | **$\frac{3}{8} = 0.375000$** | **$\frac{3}{8} = 0.375000$** | **$0.000000$（唯一物理根）** |
   | $4$ | $\frac{5}{2}$ | $\frac{15}{4}$ | $\frac{25}{4}$ | $1.2500$（奇二重态反常） | $\frac{2}{5} = 0.400000$ | $\frac{45}{116} \approx 0.387931$ | $+\frac{7}{580} \approx +0.012069$ |
   | $5$ | $3$ | $\frac{21}{5}$ | $\frac{36}{5}$ | $1.5000$ | $\frac{5}{12} \approx 0.416667$ | $\frac{27}{68} \approx 0.397059$ | $+\frac{1}{51} \approx +0.019608$ |

2. **第二联：从电弱极点 $M_Z$ 到单原胞普朗克极限 $E_P$ 的单圈耦合与温伯格角跑动表（`手工推导` + `NUM`）**：
   取 PDG 2024 初值 $M_Z = 91.1876\;\mathrm{GeV}$、$\widehat{\alpha}(M_Z)^{-1} = 127.930$、$\sin^2\widehat{\theta}_W(M_Z) = 0.23129$、$\alpha_3(M_Z) = 0.1180$ 及单圈系数 $(b_1, b_2, b_3) = (+\frac{41}{10}, -\frac{19}{6}, -7)$，核算五道特征能标处的逆耦合三元组、有效混合角 $\sin^2\widehat{\theta}_W(\mu) = \frac{\alpha_2^{-1}(\mu)}{\frac{5}{3}\alpha_1^{-1}(\mu) + \alpha_2^{-1}(\mu)}$ 与引力无量纲耦合 $\alpha_G(\mu) = (\mu / E_P)^2$：

   | 能标节点与物理含义 | 能量标度 $\mu\;(\mathrm{GeV})$ | $\log_{10}(\mu/\mathrm{GeV})$ | $(\alpha_1^{-1},\, \alpha_2^{-1},\, \alpha_3^{-1})(\mu)$ | 跑动温伯格角 $\sin^2\widehat{\theta}_W(\mu)$ | 引力耦合 $\alpha_G(\mu) = (\mu/E_P)^2$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **电弱 $Z$ 共振极点 $M_Z$** | $91.1876$ | $1.96$ | $(59.00,\, 29.59,\, 8.47)$ | **$0.23129$**（PDG 实验基准） | $5.58 \times 10^{-35}$ |
   | **电弱圆弧交汇点 $\mu_{12}$（$\alpha_1 = \alpha_2$）** | $1.014 \times 10^{13}$ | $13.01$ | $(42.41,\, 42.41,\, 36.81)$ | **$\frac{3}{8} = 0.37500$** | $6.90 \times 10^{-13}$ |
   | **超荷—色交汇点 $\mu_{13}$（$\alpha_1 = \alpha_3$）** | $2.41 \times 10^{14}$ | $14.38$ | $(40.34,\, 44.00,\, 40.34)$ | $0.39559$（最小三线差 $\Delta\alpha^{-1} > 3.66$，约 $3.664$） | $3.90 \times 10^{-10}$ |
   | **弱—色交汇点 $\mu_{23}$（$\alpha_2 = \alpha_3$）** | $9.77 \times 10^{16}$ | $16.99$ | $(36.42,\, 47.03,\, 47.03)$ | $0.43655$ | $6.40 \times 10^{-5}$ |
   | **普朗克单原胞极限 $E_P$** | $1.2209 \times 10^{19}$ | $19.09$ | $(33.27,\, 49.46,\, 52.41)$ | $0.47146$ | **$1.0000$**（单胞合流） |

3. **第三联：跨概念希格斯颤动桥（$v \approx 246.22\;\mathrm{GeV},\; v/\sqrt{2} \approx 174.10\;\mathrm{GeV}$）代表粒子账本（`手工推导` + `NUM`）**：

   | 典型场激发 | 极小圆弧跨概念耦合机制 | 耦合系数或规范组合 | 静止质量（PDG 2024） | 单拍普朗克主频负载比 $m / M_P$ |
   | :--- | :--- | :---: | :---: | :---: |
   | **光子 $\gamma$** | 未破缺 $Q = T_3 + Y$ 纯水平盲平面圆弧（$Q\langle\Phi_H\rangle = 0$） | $e = g_2\sin\theta_W$ | $0$（严格保护，$\beta = 1$） | $0$ |
   | **弱玻色子 $W^\pm,\, Z^0$** | `2 + 1 = 3` 吞并破缺陪集纵向圆弧闭合成普罗卡驻波 | $\frac{1}{2}g_2,\; \frac{1}{2}\sqrt{g_2^2 + g_Y^2}$ | $80.369,\; 91.188\;\mathrm{GeV}/c^2$ | $6.58 \times 10^{-18},\; 7.47 \times 10^{-18}$ |
   | **电子 $e^-$** | $\mathcal{H}_L \leftrightarrow \mathcal{H}_R$ 极弱跨概念汤川颤动折叠 | $y_e \approx 2.935 \times 10^{-6}$ | $0.5110\;\mathrm{MeV}/c^2$ | $4.19 \times 10^{-23}$ |
   | **顶夸克 $t$** | 近满额 $\mathcal{O}(1)$ 跨概念手征颤动锁死 | $y_t \approx 0.9912$ | $172.57\;\mathrm{GeV}/c^2$ | $1.41 \times 10^{-17}$ |
   | **希格斯玻色子 $H^0$** | 跨概念折叠倾角径向模自耦合振荡 | $\lambda = \frac{m_H^2}{2v^2} \approx 0.129$ | $125.20\;\mathrm{GeV}/c^2$ | $1.03 \times 10^{-17}$ |

4. **第四联：主频爱因斯坦勾股分账与电弱瞬子“振幅 vs. 率”二倍指数核对（`手工推导`）**：

   - 在半径 $r > r_s$ 的静态球对称场外，四支概念场凝聚成的总静止质能 $E = Mc^2$ 施加背景主频负载 $\eta_{\mathrm{info}}(r) = \frac{2GM}{rc^2}$，由 $\nu_\tau^2 + \nu_{\mathrm{arc\text{-}load}}^2 = \nu_0^2$ 给出 $d\tau/dt = \sqrt{1 - 2GM/(rc^2)}$ 及弱场向心驻相折射 $\mathbf{a} = -c^2\nabla\ln(d\tau/dt) \to -(GM/r^2)\hat{\mathbf{r}}$；
   - 对电弱 $\mathrm{SU}(2)_L$ BPST 瞬子，代入 $\alpha_2^{-1}(M_Z) \approx 29.5889$ 得 $S_{\mathrm{inst}} = \frac{8\pi^2}{g_2^2(M_Z)} = 2\pi\alpha_2^{-1}(M_Z) \approx 185.91$：隧穿**振幅**为 $e^{-S_{\mathrm{inst}}} \approx 1.82 \times 10^{-81}$，而零温 $\Delta B = \Delta L = 3$ 玻恩平方**跃迁率**为 $e^{-2 S_{\mathrm{inst}}} = \exp(-16\pi^2/g_2^2) \approx 3.30 \times 10^{-162}$（计入汤川与高能跑动前因子约 $10^{-162\text{–}165}$），二者指数相差精确因子 $2$，且（不计高维算符时）单质子衰变 $\Delta B = 1$ 概率严格为 $0$。

:::

秉承全书始终如一的反数字命理学铁律与四层认识论契约，我们将极小圆弧场大统一理论（AF-GUT）从“几何统一架构与有理迹锚点”迈向“无自由参数第一性原理定量完备理论”尚待攻克的四道定量高峰，正式立为第三十三章相互作用统一的开放问题：

::: {.problem #prob-ch39-af-gut-threshold-and-proton-stability title="极小圆弧场大统一（AF-GUT）能标阈值闭合、格点手征三代谱与引力连续统标定的开放问题"}
在 [@def-ch39-af-gut-master-connection] 的同心概念场圆弧主联络框架下，不引入事后曲线拟合参数并严格衔接全书三大前沿界碑（[@prob-ch34-past-hypothesis-and-cosmological-constant]、[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-ch34-sm-generations-and-couplings]），能否从第一性原理严格解决以下四项数学物理定量问题（`OPEN`）：

1. **离散圆弧重整化阈值闭合 $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ 近交汇三角与希格斯质量标定**：从离散极小圆弧配分函数 $\mathcal{Z}_{\mathrm{AF\text{-}GUT}}$ 严格推算晶格—连续统匹配阈值、高圈规范修正与单胞引力算符贡献，闭合最小标准模型单圈跑动中的逆耦合三角残差（$\Delta\alpha^{-1} > 3.66$，精确差值约 $3.664$，消解无阈值三线 GQW 值 $0.2076$ 与实验值 $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$ 的偏移），并定量导出希格斯自耦合 $\lambda \approx 0.129$（$m_H \approx 125.2\;\mathrm{GeV}/c^2$）与电弱破缺标度 $v / M_P \sim 10^{-17}$；
2. **非微扰四维格点手征外尔实现与三代重数 $N_{\mathrm{gen}} = 3$ 截断**（对接 [@prob-ch34-sm-generations-and-couplings]）：在三维极小圆弧单纯复形与主频时序步进上构造严格规避尼尔森—二宫（Nielsen–Ninomiya）费米子倍增定理的手征 $\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 算子，并由离散拓扑指标或接受窗上同调唯一导出 $N_{\mathrm{gen}} = 3$ 代截断；
3. **三代汤川奇异值谱、混合矩阵与普朗克高维重子算符选择定则**（对接 [@prob-ch34-sm-generations-and-couplings]）：从跨概念圆弧折叠算子 $D_{\mathrm{int}}(\Phi_H)$ 计算跨越五个数量级的费米子汤川耦合矩阵 $(Y_u, Y_d, Y_e)$、CKM/PMNS 混合角与中微子质量机制，并严格判定并列概念场正交性是在全阶精确封禁六维普朗克压低算符 $\frac{c_6}{M_P^2}qqq\ell$（$c_6 \equiv 0$）还是留有 $\tau_p \sim 10^{45}\;\mathrm{yr}$ 量级的超微弱残余信号；
4. **四维洛伦兹自旋-$2$ 引力连续统极限与 $\Lambda_{\mathrm{cos}}\ell_P^2 \sim 10^{-122}$ 非循环导出**（对接 [@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch34-past-hypothesis-and-cosmological-constant]）：从离散雷吉角亏与普适主频 $\nu_0$ 负载严格导出微分同胚协变的无质量螺旋度 $\pm 2$ 引力传播子与牛顿常数 $G_N$ 归一化，并在不预先输入哈勃视界半径 $R_H$ 的前提下非循环地定出真空暗能量符号与 $10^{-122}$ 量级比值？

:::

**用九点贝伦德球壳检验第一问（模型计算，区间核算）。** 取平方半径为 $17$ 的九个格点，即 $(0,1,4)$ 和 $(2,2,3)$ 的坐标排列。内积为 $j$ 的两点在球心张开角 $\theta_j=\arccos(j/17)$。经典黎曼猜想给出非平凡零点的形式 $1/2+i\gamma$。选第 $21284$ 枚正纵坐标 $\gamma=19056.31599055\ldots$，用它乘两条实际圆心角之差。所得 $\gamma(\theta_{11}-\theta_{14})$ 与 $\gamma(\theta_{10}-\theta_{14})$ 模 $2\pi$ 分别为 $2.116515\ldots$、$2.114523\ldots$。在平方弦长至多为 $14$ 的边上作最短自旋平行输运，给平方弦长为 $12,14$ 的边分别乘上这两道相位因子，内层三角形取负号。度矩阵减去带相位的邻接矩阵，得到磁图拉普拉斯 $L$。其最低两个本征值约为 $1.764446$ 和 $1.889188$，给出了可单独选取的最低质量模式。[算术输入与球壳几何](ch39-s25-axiom-omega-five-tier-deduction-cascade.md) · [质量谱的区间计算](https://github.com/the-omega-institute/trureturing-books/issues/932#issuecomment-7076032103)

把本征值 $l_j$ 读作质量平方 $M_*^2l_j$，每个模式配一个有色弱双重态和一个无色弱双重态，超荷分别为 $1/6$ 和 $-1/2$。假设这些重场没有新的费米子汤川耦合。用 $1\,\mathrm{TeV}$ 处的三支规范耦合标定共同单位 $M_*$，逐个开启九个质量阈值，两圈规范跑动给出交汇尺度 $(4.6242,4.6353)\times10^{14}\,\mathrm{GeV}$。再让最低模式的无色双重态与希格斯额外耦合，可以选取一组四次耦合，使树级势在所有非零场方向为正，并使二体标量接触散射的全部归一化本征值在匹配点到交汇点之间的绝对值都小于 $8\pi$。这组参数使用了低能希格斯读数来匹配一圈有限阈值。[规范标定](https://github.com/the-omega-institute/trureturing-books/issues/927#issuecomment-7075672697) · [标量势与散射检验](https://github.com/the-omega-institute/trureturing-books/issues/932#issuecomment-7076032103)

希格斯质量给这条路线增加了一个独立检验。若某个实重分量的质量平方随 $H^\dagger H$ 从 $x$ 变为 $x+kH^\dagger H$，它对一圈有限质量阈值的贡献为 $xk[\log(x/\mu^2)-1]/(32\pi^2)$，对高侧运行质量平方的加性斜率则贡献 $xk/(16\pi^2)$。两种加权不同。在九个质量的几何平均尺度 $\bar M$ 令高侧二次项为零，允许九个无色模式通过任意厄米矩阵与希格斯耦合。若含色模式共享一个耦合，上述匹配、稳定和幺正条件要求这枚零点上 $d m_H^2/d\log\mu<-3.51\times10^{21}\,\mathrm{GeV}^2$。以曲率系数为 $3$ 的自旋算子前三大本征值之和给三个占据态打分。在距最高分 $10^{-4}$ 以内的整个能窗中另选零点，斜率仍小于 $-1.25\times10^{20}\,\mathrm{GeV}^2$。这里的斜率描述匹配点的运行参数。若允许含色门户也是厄米矩阵，要将斜率绝对值压到 $10486\,\mathrm{GeV}^2$ 以内，其最大与最小本征值之差在该能窗中须超过 $0.001$，在所选零点须超过 $0.0073$。从圆弧配分函数导出这样的相互作用和共同质量单位，仍是第一问所需的动力学。[质量斜率的推导](https://github.com/the-omega-institute/trureturing-books/issues/934#issuecomment-7076158502) · [能窗覆盖](https://github.com/the-omega-institute/trureturing-books/issues/937#issuecomment-7076235762) · [含色谱宽检验](https://github.com/the-omega-institute/trureturing-books/issues/938#issuecomment-7076270994)

两条弧相位还给出一个按零点计数的检验。对同一对相位，在两种内层符号中取较大的三态自旋分数，把离全局最大值至多 $10^{-4}$ 的相位收入能窗。随着高度上升，正零点按重数计入此窗的比例有极限，每百万枚的极限频率介于 $65.70$ 与 $68.19$ 之间。经典黎曼猜想、朗道零点和公式与两角的有理独立性给出环面等分布；数值区间来自对能窗面积的连续覆盖。相邻样本会成串命中。[能窗面积与零点频率](https://github.com/the-omega-institute/trureturing-books/issues/945#issuecomment-7076690332) · [连续命中的高度尺度](https://github.com/the-omega-institute/trureturing-books/issues/945#issuecomment-7076695659)

**用同一球壳检验第二问中的手征重数（模型构造）。** 将两条相位各转一周，跟踪前三个占据态，所得谱丛的第一陈数记录这组态绕整个相位环面的有符号拓扑数。原来的最短弧自旋输运在整个环面保持占据能隙。交换两条空间坐标会共轭自旋相位，并把两角同时反号。这一变换保持环面取向，却反转第一陈数，故总陈数为零。[反射证明与能隙证书](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7076796742)

另给壳边选择跃迁幅度，将九点按坐标三循环分成三个轨道，顶点能量分别取 $0,-1,-2$。记两弧相位因子为 $z,w$，在循环特征值 $s$（$s^3=1$）的子空间写 $u=sz,\ v=s^2w$。下列矩阵只使用壳上的边：

$$
 H_s=\begin{pmatrix}0&0&1+u+\sqrt2 v\\0&-1&g\\
 \overline{1+u+\sqrt2 v}&\bar g&-2\end{pmatrix}.
$$

三个子空间各有一条隔离的最高本征线。要计算它的陈数，只需看第一条跃迁 $1+u+\sqrt2v$ 的两个零点，它们分别位于 $u=i$ 和 $u=-i$，绕向相反。在这两点，第二条跃迁满足 $|g|^2>2$ 时，该点计入陈数。若一组外顶点同向读取其平方弦长为十二的边，得到 $g=1+isu$，三条线的贡献相加，绝对值为一。把该组的读向翻转，得到 $g=1+i\bar u$，三条线都选中 $u=i$，总陈数的绝对值为三。[逐边构造与零点计数](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7076821176)

再在内部相位环面上选择由占据线的贝里联络定义的 Dolbeault–Dirac 算子。取使反向构造的三条线度数均为 $+1$ 的取向。由环面上的黎曼–罗赫公式和负度数线丛没有全纯截面，每条线贡献一个同手征零模，相反手征的核维数为零。这里跃迁幅度、弧读向与内部动力学均是模型输入。把这三个内部态耦合到四维格点外尔算子，并从相互作用导出三代质量与混合，属于第二、三问尚待解决的部分。[内部零模与味对称性](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7076839161)

**沿壳上的最短弧绕行，能得到三阶中心相位吗？（几何推导与整数核算）** 三个零模的时钟与循环移位给出中心相位 $\omega=e^{2\pi i/3}$。可以用一次不同的操作检验这个数的来源。在非负三维整点壳 $S_R=\{A:|A|^2=R\}$ 上选三个点 $A,B,C$，沿每对顶点间的最短大圆弧走完三角形，只做自旋 $1/2$ 的几何平行输运。记 $s=R+A\cdot B+B\cdot C+C\cdot A$、$d=\det(A,B,C)$。三个自旋投影 $P(n)=(I+n\cdot\sigma)/2$（$n$ 为单位径向量，$\sigma$ 为三个泡利矩阵）的乘积之迹，归一化后在选定取向给相位 $h=z/|z|$，其中 $z=Rs+d\sqrt{-R}$。于是 $h^2=z/\bar z\in\mathbb Q(\sqrt{-R})$。沿任意有限多边形绕行时，从一个基点把多边形分成三角形，内部弧的往返输运相消，所以总相位的平方仍在该数域中。要使总相位恰为 $\omega$，该域必须包含 $\omega^2$，从而必须有 $R=3m^2$（$m$ 为正整数）。原来的九点贝伦德壳取 $R=17$，这就排除了在该壳上仅靠有限条最短弧组成的闭路产生精确三阶相位的途径。

允许改变壳层并连接任意两点时，首个可行的平方半径为 $675=3\cdot15^2$。从 $(15,15,15)$ 出发的五个闭合三角形，其相位依次是 $19+t,25+2t,12+t,33+t,87+5t$ 各自除以模长，其中 $t=\sqrt{-3}=i\sqrt3$。这五个未归一化的数之积为 $4869228(3+t)$，因此走完五个三角形获得 $e^{i\pi/6}$，重复四次就得到 $\omega$。对较小候选壳，偶数 $m$ 可将三个坐标同除以二；余下七个奇数 $m<15$ 的三角形相位由整数关系逐一核查。这个构造给出一条自旋线上的闭路相位。把它作用到三个味态并要求四维相互作用保持精确的离散规范对称，还须规定场和相互作用的变换律。[贝伦德球壳的九个原始整点](https://github.com/the-omega-institute/riemann-hypothesis-book/blob/7bb844569be60154e9060dd3431d682b1d3ad1b1/books/riemann-hypothesis/zh/ch06-behrend-towers-and-closing-the-net.md) · [五个三角形的顶点与最小性核算](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7079862829)

**同一个小球壳能否同时承载三阶相位和三个同手征零模？（模型计算）** 保留六个外点和三个内点各自的坐标置换轨道，保留每组三循环的五类标号跃迁，以近边的平方弦长为单位给跃迁加权。设 $c$ 为远边与近边的平方弦长比，三个轨道的顶点能量依次为 $0,-c,-c$。在平方半径 $675$ 的壳上，每种可选外轨道到内轨道的三条平方弦长都满足“远边大于近边与中边之和”。因此三个不同方向的跃迁振幅无法相消。在每个循环块中，将第一坐标向量投到最高线上，得到处处非零的截面，所以这条线的陈数为零。

取平方半径 $867=3\cdot17^2$。全壳只有十九点。外点取 $(1,5,29)$ 的六种排列，内点取 $(13,13,23)$ 的三种排列。这时三条平方弦长为 $244,724,804$，相应振幅可以闭成三角形。把外点、内点各按字典序排好，依次编号 $0$ 至 $8$。记 $L_{ij}$ 为以 $(17,17,17)$ 为极点的负取向半自旋链，$u=724/244$，$h=L_{20}L_{06}L_{62}$。在循环特征标为一的块中，第一跃迁为 $L_{06}+uL_{07}z+cL_{08}w$，第二跃迁为 $L_{26}+uL_{28}h^k z_\pm$。这里 $z_+=z$、$z_-=\bar z$，整数 $k$ 数的是三角形 $2\to0\to6\to2$ 的有向圈数。反向读弧、逆绕一周时，第一跃迁在相位环面上有两个绕向相反的零点。检验第二跃迁的模长，只有其中一个零点使最高带的第一坐标消失，给陈数贡献一个单位。三个循环块由相位平移联系，所以三条线的陈数同号且绝对值为一。在这个壳上选取使三条线的度均为 $+1$ 的环面取向。在上文选定的内部算子下，每条线有一个同手征零模。另加入 $(7,23,17)$、$(17,17,17)$ 两个几何顶点，串接六个以 $(1,5,29)$ 为基点的三角形，每圈所得因子相乘并归一化后为 $e^{i\pi/6}$，四遍得到 $\omega$。两个附加顶点只用于输运。按这组轨道和跃迁规则，$867$ 是同时满足两项要求的首个平方半径。两者之间唯一待查的 $3m^2$ 对应 $m=16$，其壳只有一个点。[三角形坐标、整数乘积与陈数检验](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7080329229)

这个壳也能直接读取黎曼零点。令 $\theta_d=\arccos(1-d/1734)$，用正零点高度 $\gamma$ 乘以 $\theta_{724}-\theta_{244}$ 和 $\theta_{804}-\theta_{244}$，得到两个相位角。在每圈代价 $0.000624\le\kappa\le0.000635$ 下，以三个最高本征值之和减去 $\kappa|k|$ 给读向和整数绕数 $k$ 评分。前 $34$ 枚正零点各有另一个端点得分更高。第 $35$ 枚的高度为 $111.87465917699\ldots$，此处反向逆绕一周首次在全部整数绕数、两个读向中胜出。用 $512$ 个角度和分数的变化率控制 $|k|>98$ 的尾部，其余端点逐一区间核验。在每轴半宽 $10^{-7}$ 弧度的方格内，最小分差超过 $4.9492279\times10^{-6}$。在同一端点的每个三占据态上扣除同样的绕数代价。因每个端点至多有 $84$ 个这样的态，$\beta\ge895255$ 时，这一端点的配分函数严格最大。把原磁拉普拉斯的标号边移到这九个点，取单位链幅，保留内三角形的负号，按新顶点重算自旋输运。所得九个质量相对几何均值的对数均在 $(-0.768,0.55)$ 内。每个标量模式取一个 $(4,2,1)$ 复表示，三个手征块的每个共同正层合计三套矢量型标准模型家族。沿用 $1\,\mathrm{TeV}$ 的轻场输入，取零新增汤川耦合，分别标定标量与费米质量单位，令带荷塔的总对数运行长度为一。逐阈值的两圈规范方程容许三支耦合在 $(4.6812,4.8335)\times10^{14}\,\mathrm{GeV}$ 交汇。在质量几何均值的匹配点高能侧取 $\lambda_H=0.02335$，给最低无色模式附加门户耦合，重场自耦合采用所引匹配处方，混合四次耦合取 $0.072$。匹配所需的附加门户系数落在 $(2.89333,2.97805)$。一圈标量演化的区间核算表明，从该点高能侧到交汇尺度，树级希格斯与重标量四次势有下界。外部定理 `riemannHypothesis` 给出非平凡零点的实部为 $1/2$。结合 Landau 零点和公式与两角差模 $2\pi$ 的整数独立性，得到方格在全部正零点中按重数计的极限比例 $10^{-14}/\pi^2$。哪些整点带荷及场如何相互作用仍由模型指定。[RH 参考声明](https://github.com/leanprover-community/riemann-hypothesis/blob/7c4ccbd64d02774b0a5b40a5f923f5b7a18e8abc/src/Main.lean#L12) · [带荷塔两圈方程与标量匹配处方](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7078426241) · [零点选路、质量谱、交汇与稳定性复算](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7080372713)

**短弧能否同时保留自旋输运和零点相位？（几何推导与整数核算）** 在平方半径 $867$ 的十九点壳上，从 $O=(1,5,29)$ 到 $B=(13,23,13)$ 的直接弧有平方弦长 $724$。可以用六步精确复制它的半自旋输运。沿路依次经过 $(7,23,17)$、$(17,17,17)$、$O$、$(17,7,23)$、$(13,13,23)$，再到 $B$。各步平方弦长至多 $544$，六个链相位之积等于直接链相位。这条路多走了 $2.369832677\ldots$ 弧度。若零点时钟按实际路程累计角度，在第 $35$ 枚零点，两条路的时钟相位差主值为 $1.230440148\ldots$ 弧度。

**用全部零点识别弧长（手工推导）。** 在同一整数球壳上比较两条固定的有限路径，以正角长之和的差记为 $\Delta$。若 $\Delta\ne0$，两条路径在正零点高度 $\gamma$ 的时钟相位差 $\gamma\Delta$ 模 $2\pi$ 等分布。具体说，按重数计入高度不超过 $T$ 的 $N(T)$ 枚正零点，对每个固定的非零整数 $k$，复数 $e^{ik\gamma\Delta}$ 的平均为 $O_{k,\Delta}(1/T)$。这是因为每段角 $\theta$ 的余弦是端点内积除以平方半径，故 $e^{i\theta}$ 是代数数，$e^{i|k\Delta|}$ 也是。令 $x=e^{|k\Delta|}>1$。若 $x$ 是代数数，格尔丰德–施耐德定理会使 $x^i=e^{i|k\Delta|}$ 成为超越数。因此 $x$ 处的冯·曼戈尔特权为零，朗道公式给出 $\sum_{0<\gamma\le T}x^{\rho}=O_x(\log T)$。经典 RH 给出 $\rho=1/2+i\gamma$，除以 $\sqrt{x}N(T)$ 并用 $N(T)\asymp T\log T$，即得所述平均界，负频率取共轭即可。由外尔判据，给定角容差 $0\le\varepsilon\le\pi$，两条时钟读数的圆周角距离至多 $\varepsilon$ 的极限比例是 $\varepsilon/\pi$。因此所有零点上的读数都相同，当且仅当两条路径等长。[经典 RH 联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [格尔丰德–施耐德定理](https://mathworld.wolfram.com/GelfondsTheorem.html) · [Ford 与 Zaharescu，公式 (1.1)、(1.6)](https://arxiv.org/abs/math/0405459v2)

要在每个高度保留直接弧的总角长，可以沿原来那条大圆弧依序插点。在原十九点中，$O$ 与 $B$ 所定的大圆上没有第三点。将原点坐标同乘一个正整数 $D$，允许使用平方半径 $867D^2$ 壳上的其他非负整点，并要求各段平方弦长不超过 $544D^2$。对从 $O$ 出发、原平方弦长为 $724$ 和 $804$ 的两条弧，首个同时可行的 $D$ 为 $439$。例如将上述中弧从 $439O$ 经 $(2969,6175,10961)$、$(3917,7597,9697)$ 接至 $439B$，三段依次在同一小弧上。它们的正角长相加恰为原角长，逐段平行输运的乘积也恰为原输运。两条弧的最小性核算在各自平面内用有理半角参数枚举整点，再按角度次序检查相邻点。[两条弧的整数坐标、最小性与复算](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7080867424)

对任意给定的正角度上限也有共壳细分。设 $n$ 是一条原弧的本原整数法向量，$q=|n|^2$。取旋转角 $\phi_j=2\arctan(\sqrt q\,3^{-j})$，$j=0,\ldots,m$。在原弧平面内，每个旋转或其逆都以有理坐标作用，分母整除 $9^j+q$。由 $\phi_j\le3\phi_{j+1}$，各角以 $-1,0,1$ 为系数组合后，在从零到原弧角的区间内连同两端排序，相邻间隔至多 $\phi_m$。取足够大的 $m$ 并统一清分母，即可把各段做得任意短，保留所有零点高度的角读数。反过来，对固定非零原弧，当角度上限趋于零时，所需整数放大倍数最终超过该上限倒数的任意固定幂。这个下界来自原大圆平面中固定范数的虚二次代数整数计数。若给中间点配置带荷标量和独立动能，就须重算质量谱，并按各带荷模式的质量阈值计算规范耦合的演化。[细分构造与放大倍数界](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7080925354) · [带荷中继的质量与阈值](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7080968617)

**带荷中继的质量会进入规范跑动（模型计算，区间核算）。** 在十九点壳的 135 条标量边上各自配置中继。把每条原弧的角长 $\theta_e$ 归一到单位区间，对长度为 $h_i$ 的一小段，用端点场的协变差平方除以 $h_i$ 作刚度。在相邻两段之间，给中继的动能赋权 $\rho\theta_e(h_{i-1}+h_i)/2$。令 $M$ 为标量质量单位，$\theta_*=\arccos(1-804/1734)$ 为最长原弧角。取 $\rho=1.04\pi^2/(460^2\theta_*)$，每个模式取一个 $(4,2,1)$ 复标量表示。沿用上述第 35 枚零点的相位方格、$1\,\mathrm{TeV}$ 的低能输入和零新增汤川耦合。每个正内部费米模式配一套矢量型家族，在交汇处令这些家族的 $\log(\mu_G/m)$ 对活跃层求和等于一。逐质量阈值的两圈规范方程容许 $4.6346\times10^{14}<\mu_G/\mathrm{GeV}<4.7095\times10^{14}$，此处 $454.02<\mu_G/M<462.56$。第十五个标量质量小于 $451.08M$，第十六个大于 $464.11M$，故在交汇前恰有十五层开启。这个层数也适用于最大归一化步距不超过 $10^{-10}$ 的非均匀整数细分。RH 给出零点所在的直线；弧上惯性、场表示和费米阈值标定是本次交汇计算的输入。[连续与有限弧上的计数](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081217893) · [两圈方程与交汇区间](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081331101)

**相同的规范交点容许不同的希格斯四次匹配。** 记 $h=H^\dagger H$。在十五个活跃质量模式中选一个秩六正交投影 $P$，使有色和无色分量的质量平方随希格斯背景分别改变 $-\kappa hP$ 与 $3\kappa hP$，取 $\kappa=0.1$。每个模式含十二个有色和四个无色实分量，故一圈希格斯二次项中的门户贡献精确抵消。四次匹配却能区分由最轻六层和最重六层给出的两个投影。按升序记物理质量为 $m_j$，二者的差为 $3\kappa^2/(2\pi^2)$ 乘以 $(m_{10}\cdots m_{15})/(m_1\cdots m_6)$ 的自然对数，在 $(0.05053069,0.05053105)$ 内。两种选择可以使用相同的纯标量自耦合，使匹配点的树级势均有下界，且使归一化接触散射范数都小于 $8\pi$。因此，从这组零点、质量和规范交点预测希格斯四次耦合，还需确定希格斯耦合到哪些模式。[门户、极值证明与散射检验](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081400750)

希格斯质量还对新开启的六层尤其敏感。采用势 $-m^2h+\lambda h^2$ 的约定，Farina、Pappadopulo 与 Strumia 的纯电弱两圈公式给这六层对 $m^2$ 的负修正，其绝对值介于 $5.7063\times10^{25}$ 与 $6.0320\times10^{25}\,\mathrm{GeV}^2$。这项计算包括该修正在共同匹配尺度 $\mu_G$ 的有限项。要从这些尺度导出电弱质量，仍须合并含门户和标量自耦合的修正，并给定高侧质量条件。[Farina 等，式 (3)、(22)](https://doi.org/10.1007/JHEP08%282013%29022) · [质量归一化与六层求和](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081612862)

在同一球壳上，可以把**识别零点相位**与**确定希格斯质量**分别化成可检验的问题。先看从 $(1,5,29)$ 出发的两条三角闭路。第一条依次经过 $(13,23,13)$、$(7,17,23)$ 后返回，三边平方弦长为 $(724,172,216)$。第二条经 $(23,13,13)$、$(11,11,25)$ 返回，三边为 $(804,292,152)$。每条只经过一条带时钟的边，分别读出两个角 $p_1=\gamma(\theta_{724}-\theta_{244})$、$p_2=\gamma(\theta_{804}-\theta_{244})$。将每条闭路与交换前两坐标所得的镜像配对，两次输运的实部是 $\cos(p_j-\beta_j)$ 和 $\cos(p_j+\beta_j)$，其中 $\beta_j$ 是三角形定向立体角之半。两数相加给 $2\cos\beta_j\cos p_j$，相减给 $2\sin\beta_j\sin p_j$。这两个三角形的 $\sin\beta_j$ 和 $\cos\beta_j$ 都非零，所以保留闭路标签的四个实读数在整个环面确定两角。它们分别达到时钟净绕数分别为 $(1,0)$、$(0,1)$ 时的最短总弧长 $1.90267172\ldots$ 与 $2.01534856\ldots$ 弧度。[最短闭路、半角与复算](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081929571)

固定第 35 枚零点处的质量单位、匹配尺度、规范耦合、费米色散和门户，单看两圈希格斯质量平方与一圈四次系数，在连续弧模型中至少有四个相位给出完全相同的一对数值。零点能以多高的频率复现读数？在低质量门户逐层无迹、公共门户按一圈阶标定的模型中，取质量平方公差 $1\,\mathrm{GeV}^2$、四次系数公差 $10^{-15}$、每条闭路实部公差 $10^{-9}$。四条闭路将相位选入中心方格，两项匹配在格内可逆。因此用两角的零点等分布和变量替换，可算得同时达到六项公差的正零点极限比例在 $(5.4202\times10^{-34},1.0503\times10^{-33})$ 内，按高度顺序及重数计。有限整数壳也有正比例的包围。这些公差用于指定阶数的匹配公式。[全环面的多解性与局部逆](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081895193) · [有限整数壳](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7081968474)

**固定哪一种重标量质量，决定了两圈匹配能调什么（模型计算，区间核算）。** 取高侧树级希格斯质量为零，三套恒曲率费米家族的首层质量均为 $Qe^{-1/3}$，其中 $Q$ 是匹配尺度。设 $x=m^2/M^2$，对每个标量模式给有色与无色分量分别取门户 $-f,3f$，$f=\kappa/[1+(x/6.4)^{80}]$，由一圈四次项确定 $\kappa>0$。记 $C_f$、$S_f$ 为这两类场按 $f$ 加权的范数平方之和。取纯重场势 $11C_f^2+S_f^2$，取 $\lambda_H=0.02335$、$-0.031342\le\lambda_{\mathrm{low}}\le-0.029827$、$10272\le m_{\mathrm{low}}^2/\mathrm{GeV}^2\le10311$，在上述匹配尺度范围内遍历所有相位，势中 $H^\dagger H$ 的两圈硬系数 $\Delta_0$ 均大于 $1.0456\times10^{26}\,\mathrm{GeV}^2$。再取选择高质量六层的权 $B=[1+((x-203465)/1000)^8]^{-1}$，只给纯重场势加上 $2t(11C_f C_B+S_f S_B)$。在固定拉格朗日质量参数时，两圈双标量泡对这个四次顶点线性，硬系数因此成为 $\Delta_0-tK$，且 $K>0$。所需负系数 $-m_{\mathrm{low}}^2$ 唯一给出 $0.0035304<t<0.0042258$。在匹配点，树级势有下界，任意谱截断的接触散射范数小于 $16.271$。但这项配平使最轻六层的一圈零动量曲率质量平方转负，有色分量小于 $-253.44M^2$，无色小于 $-1.7650M^2$，超出了对原谱作小扰动的范围。若用质量反项固定各层的一圈曲率质量，重场自能引起的一圈希格斯阈值改变量与双泡中的 $t$ 项精确抵消。此时势中剩余的质量平方系数大于 $1.0739\times10^{26}\,\mathrm{GeV}^2$。配平两圈电弱质量并保持重场谱，仍需独立动力学。[全相位质量界与输入](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7082014173) · [重场交叉四次项及散射界](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7082065786) · [固定曲率质量后的抵消](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7082459928)

**三枚零模是否同手征，可以用弧相位落在哪些边上来检验（模型内手工推导）。** 回到平方半径 $17$ 的九点壳，从 $(0,1,4)$ 保留通往三个内点的边，从 $(1,0,4)$ 保留平方弦长为 $6,12$ 的两条边，并将这五条边作坐标三循环。每条保留边的跃迁幅度取为其平方弦长 $d$ 的 $1/6$，三组顶点能量取 $0,-c,-c$，其中 $c=7/3$。基准模型沿平方弦长十二和十四的边分别读取相位 $z,w$，一组外顶点反向读取 $z$ 并逆绕最短三角形一周。选择使三个循环块的最高本征线度数均为 $+1$ 的环面取向。现在保留三循环、这些顶点能量及外点至内点的跃迁和逆向跃迁，允许每条边的幅度是 $1,z,\bar z,w,\bar w$ 的任意线性组合。[逐边赋值与最高线度数](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7077142084)

从第一组一个外顶点连到三个内顶点的三条边，平方弦长分别为 $6,12,14$。计算每条边的 $w$ 与 $\bar w$ 系数模方之和，把三条边的这些数相加作为总功率。若候选与基准在前 $85$ 枚正黎曼零点上逐枚给出完全相同的九个能级（含重数），且流入弦长平方 $6,12$ 两条边的功率占比严格小于 $4/9$，则三个内部零模必同手征。这里的零点检验有限，因为九阶特征多项式的每个系数只含 $|k|+|l|\le6$ 的模式 $z^kw^l$。这 $85$ 个模式在上述实际零点相位上的归一化 Gram 矩阵最小本征值经区间核算大于 $0.000014$，故能级检验确定全环面的特征多项式。[有限零点检验](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7077708356)

$4/9$ 来自三点傅里叶变换。在这一同谱类中，作一次固定的块置换后，每个循环块的第一条跃迁等于基准跃迁或其共轭，再乘一个常相位。因此每块恰有一种 $w$ 读向，其系数模长为 $c$，读向决定该线的度数符号。若手征混合，两种读向分别占一个、两个块。由帕塞瓦尔恒等式，三条边合计的功率为 $c^2$。作逆变换时两种读向各自至多向弦长平方十四的边送入 $c^2/9$、$4c^2/9$，余下至少 $4c^2/9$ 落在其他两条边。只把一个基准块的第一条跃迁取共轭，保留第二条跃迁，就能在这五类边上取等号。第二条跃迁处处非零，调整该顶点的相位即可将这个修改与整块共轭联系起来，所以该块的度数变号。这个锐界给出了检验内部手征的办法。从圆弧动力学导出实际边幅，仍是统一问题所需的一步。[同谱分类与等号构造](https://github.com/the-omega-institute/trureturing-books/issues/948#issuecomment-7077686610)

**让三个手征零模的带荷激发也参与跑动（模型计算，区间核算）。** 保留基准跃迁在平坦正方形相位环面上的贝里联络。在一个循环块的最高本征线上，记 Dolbeault–Dirac 算子无核手征分量的正奇异值为 $\nu_j$，在该分量内按重数计；三个块由角平移相互对应。给第 $j$ 层赋质量 $m_j=M_F\nu_j$，假设它带三套矢量型标准模型家族的规范荷，且没有新增汤川耦合。低于 $m_j$ 时这一层尚未开启，高于 $m_j$ 时它在规范跑动中积累对数长度 $\log(\mu/m_j)$。把交汇前所有层积累的长度相加，规定总和为一。因而至少有一层在交汇前已开启，三支逆耦合 $1/g_i^2$ 的一圈塔贡献均为 $-1/\pi^2$。两圈项还依赖各规范耦合，需沿实际阈值积分。[整塔方程与区间包围](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7078426241)

取第 $854660$ 枚正黎曼零点的纵坐标，分别乘以 $\theta_{11}-\theta_{14}$ 和 $\theta_{10}-\theta_{14}$。在得到的两相位处，选择基准手征路径后，分别标定费米子单位 $M_F$ 和九个重标量的公共质量单位，可以使三支规范耦合在 $(4.6812,4.8335)\times10^{14}\,\mathrm{GeV}$ 内相交，共同逆精细结构常数在 $(37.4362,37.4746)$ 内。匹配尺度取九个重标量质量的几何平均值。给定低能希格斯输入后，物理分支的希格斯四次耦合在匹配点低能侧为负。高能侧取 $\lambda_H=0.02335$，并对最低无色模式引入附加门户耦合，重场自耦合取指定值。从匹配点的高能侧一直到该轨道的规范交汇点，沿一圈标量跑动，树级四次势在每条非零场射线上始终为正，归一化的二标量接触散射本征值的绝对值也始终小于 $25.12<8\pi$。此解要求 $M_F>2.7536\times10^{14}\,\mathrm{GeV}$，而同一壳谱的重标量公共质量单位约为 $10^{12}\,\mathrm{GeV}$。这给出了两种质量来自同一物理尺度这一设想须跨过的定量差距。[零点、路径与希格斯输入](https://github.com/the-omega-institute/trureturing-books/issues/950#issuecomment-7078211160) · [原始贝里谱的质量界](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7078415756) · [标量跑动与归一化散射界](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7078426241)

**两种质量可以共用一个单位吗？（模型计算，区间核算）** 记重标量的公共质量单位为 $M_S$，九个物理质量等于它乘以各壳本征值的平方根。即使放开对数长度总和的限制，仍可用超荷耦合检验 $M_F=M_S$。保留上述场表示和逐层阈值，令每个轻场汤川本征值在跑动中满足 $|y_f|^2\le4\pi$。从 $1\,\mathrm{TeV}$ 处的 $g_1=0.467453$ 出发，只要 $M_F\ge1\,\mathrm{TeV}$，两圈跑动要维持 $1/g_1^2(\mu)>0$，就必须有 $\mu/M_F<288.133$。这个界适用于所有在固定的两个弧相位坐标下系数为常数、行列式为一的内部度量、任意平坦绕回相位，以及从恒曲率到原始贝里联络的整族响应刚度。其依据是沿最短闭测地线控制每层质量的上界，从而给出交汇前已开启各层的总跑动长度下界。在同一零点的较宽匹配窗中，$\mu_G>4.4440\times10^{14}\,\mathrm{GeV}$ 且 $M_S<1.15295\times10^{12}\,\mathrm{GeV}$，经区间核算有 $\mu_G/M_S>385.44$。因此，这组场和跑动方程在该尺度窗中排除了相同的质量单位。[壳谱与匹配窗](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7078968494) · [测地线谱界与超荷跑动](https://github.com/the-omega-institute/trureturing-books/issues/958#issuecomment-7079116748)

最后，我们将 **AF-GUT（极小圆弧场大统一）** 与二十世纪两大传统统一范式——**$\mathrm{SU}(5)/\mathrm{SO}(10)$ 巨型单群矩阵大统一**及 **$10\mathrm{D}/11\mathrm{D}$ 超弦／卡鲁扎—克莱因额外空间维统一**——放在同一张可证伪判据总表上正面交锋：

| 核心物理与认识论维度 | 传统单群矩阵 GUT（$\mathrm{SU}(5) / \mathrm{SO}(10)$） | 额外空间维统一（$5\mathrm{D}$ KK / $10\text{–}11\mathrm{D}$ 弦论） | **极小圆弧场大统一（AF-GUT，本书 `MODEL`）** |
| :--- | :--- | :--- | :--- |
| **宏观物理空间维数** | 预设 $3+1$ 维光滑闵可夫斯基背景流形 | 假定 $9\text{–}10$ 维物理空间（$6\text{–}7$ 维紧致卷曲） | **严格封顶 $D = 3$ 空间维**（三维概念场封顶原理，`MODEL`；见 §32.1） |
| **高维希尔伯特身份** | 夸克与轻子强行并入 $\mathbf{5}^*,\mathbf{10},\mathbf{16}$ 大矩阵列 | 紧致流形卡鲁扎—克莱因谐波无穷态塔 | **并列有界概念场混编账本** $\mathcal{E}_{\mathrm{space}}^{(3)}\oplus\mathcal{E}_Y^{(1)}\oplus\mathcal{E}_{\mathrm{weak}}^{(2)}\oplus\mathcal{E}_{\mathrm{color}}^{(3)}$ |
| **局域规范代数与新玻色子** | $\dim\mathfrak{su}(5)=24$，必含 $12$ 种 $(X,Y)$ 轻子夸克玻色子 | 高维规范/弦激发，伴随无穷阶超重 KK 伴随态与模场 | **纯净 $12$ 维直和** $\mathfrak{u}(1)_Y\oplus\mathfrak{su}(2)_L\oplus\mathfrak{su}(3)_C$，**零 $(X,Y)$、零 KK 塔** |
| **紫外 $\sin^2\theta_W = \frac{3}{8}$ 起源** | 单群生成元嵌进同一 $5\times 5$ 矩阵迹归一 | 依赖特定紧致化流形拓扑、通量与膜相交选择 | **共享外尔账本手征—矢量圆弧迹比** $\frac{2}{2\times(8/3)}=\frac{3}{8}$（唯 $N_c=3$ 双线相交；与左栏是同一等迹归一条件，此处作为公设假定） |
| **质子衰变 $p \to e^+\pi^0$ 判据** | 树图 $(X,Y)$ 媒介，最小 $\mathrm{SU}(5)$ 预言 $\sim 10^{29\text{–}31}\;\mathrm{yr}$（**已排除**） | 模型依赖（六维或五维超对称算符常逼近实验界） | **规范媒介 $\Gamma_{\mathrm{gauge}} \equiv 0$**（契合 Super-K $>2.4\times 10^{34}\;\mathrm{yr}$）；电弱瞬子仅许 $\Delta B\in 3\mathbb{Z}$ |
| **拓扑磁单极子与万有引力** | $\pi_2(G/H)=\mathbb{Z}$ 必产超重磁单极子；**不含引力** | 含引力子弦激发，但受困于约 $10^{500}$ 真空景观欠定 | **$\pi_2(S^3)=0$ 零大统一磁单极子**；胞间 $N\ge 5$ 雷吉角亏与主频 $\nu_0$ 同源收口引力（目标，`OPEN`） |

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="afgut-ledger-split-vs-unify" height="500"}
拉动琥珀色账本收拢读头，在“四栏并列概念账本展开态”（青色 $F_{\mathrm{pos}}$、银白色 $\mathrm{U}(1)_Y$、紫色 $\mathrm{SU}(2)_L$、蓝色 $\mathrm{SU}(3)_C$ 各守正交分块边界，零 $(X, Y)$ 质子衰变、$\pi_2(S^3) = 0$ 零大统一磁单极子）与“紫外单枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 同心四壳合一态”之间连续过渡，直观对比极小圆弧大统一与单群矩阵及高维额外空间路线的可证伪判据（文献对照标 `ARGUED`，耦合与拓扑读数标 `NUM`，连续收拢读法标 `MODEL`，四项前沿问题在抽屉标红色 `OPEN`）。
:::

---

**从万力同弧迈向均匀本体海与观测切面：推开本章收官节之门。** 至此，我们在 [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 的三维概念场封顶原理与本章 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field)–[§33.8](ch39-s09-unified-arc-forces-and-planck-convergence.md) 的八度概念塔、定量护栏、普适比较主频 $\nu_0$ 钟慢与万力归弧之上，正式立起了**极小圆弧场大统一理论（AF-GUT）**的相互作用峰顶——让电磁、弱、强与万有引力连同希格斯手征颤动质量机制，全部还原为并列有界概念场上的同心极小圆弧，并在绿色 `LEAN ✓` 内核锚点、经典文献与手算推导、`MODEL` 综合与 [@prob-ch39-af-gut-threshold-and-proton-stability] 四道红色 `OPEN` 界碑之间划出澄澈边界。

然而，站在这座四力同源的山脊上放眼整座宇宙，第八部收官的最后一道宇宙学追问正迎面涌来：**既然宇宙每一个格点都同心叠放着完全相同的有界三维概念场丛，为什么我们抬头看见的星空不是一片平权无反差的均匀相干海，而是分化出了定域粒子、星系长城、星际巨洞与神秘暗晕？** 让我们紧接着步入本章暨第八部收官节 [§33.10 均匀各向同性三维场本体与观察者观测切面显影](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice)，看清哈尔全单态本体与佩奇—伍特斯莫尔观测切面如何为第九部的多观察者互照与第十部 [§38.5](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net) 的**因陀罗网**铺开壮阔底色。

::: {.viz src="af-gut-arc-field-unification-sandbox" height="640"}
完整交互实验室（`AFGUT//UNIFY`）：自由切换五张递进实验卡并联动琥珀色能标 $\mu$、跨概念希格斯桥 $\tilde{\Phi}_H$ 与账本收拢读头，同台贯通 $\Delta\mathcal{T}_\epsilon$ 四片同心圆弧场壳、$N_c = 3$ 温伯格角 $\frac{3}{8}$ 双曲线唯一交点与单圈跑动、手征颤动质量桥、主频 $\nu_0$ 爱因斯坦勾股天平及单胞连续收拢，对照绿色 `LEAN ✓` 六条冻结声明、`ARGUED`、`NUM`、`MODEL` 与抽屉内红色 `OPEN` 四道界碑。
:::
