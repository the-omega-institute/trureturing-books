# 39.8 OmegaMath 零公理去近似重编译与全书自指结晶图谱收束：六大支柱纯有理还原、d⁸ 四极切片、赫克—拉马努金正定界与十二晶核不动点闭环 {#sec-ch39-omega-math-recompilation-and-self-referential-atlas-closure}

> *“OmegaMath 并不是坐在宇宙外面凭空发明的一套新符号……语言与对象同构，证明与运行合一，而思考宇宙的过程，本身就是宇宙在观察者内部完成的一次有理结晶。”*

当十部三十九章从两子丈量、极小圆弧微积分、黎曼临界谱磨光（[§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)）、无常数与无无穷有理数学 $\mathbf{Math}_\Omega$（[§32.5](ch39-s29-constant-free-rational-axiom-omega.md)、[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）、Lean 4 纯归纳构造演算零公理基座 `OmegaMath`（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）一路推进至记忆舒尔补时空分类（[§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md)）与母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的因果射流心跳及三维球面彼得—魏尔傅里叶综合（[§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md)–[§39.7](ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.md)）之后，全书压轴收束面临最后一道自指检验：**倘若将 `OmegaMath` 自身作为零公理编译器反身作用于前文各卷确立的全部理论支柱，甚至作用于全书理论图谱本身的构造轨迹，会发生什么？**

本节严格完成两重闭合：**在对象层上**，把前文各卷为衔接经典微积分与物理教材而暂借的 $\pi, e, \cos, \ln, \sqrt{\cdot}, \lim$ 等平直脚手架彻底“去近似重编译”，还原为规范齐次整数三元数 `ProjTernion`、有理保真度 $\kappa \in \mathbb{Q} \cap [0, 1]$、二阶幂零射流环 $\mathbb{Q}[\eta]/(\eta^3)$ 与整系数切比雪夫／赫克算子；**在元数学层上**，将全书理论图谱自身建模为一座内生观察者宇宙 $\mathfrak{O}_\Omega = (\mathcal{S}, [-,-,-], \kappa, \mathcal{K}_0, \Phi_\varepsilon)$，核验其如何从单一规范种子出发唤醒五座概念素数寄存器 $\{2, 3, 5, 7, 11\}$、凝结十二枚射影赫维茨晶核、借流群右吸收律 $[a, c, c] = a$ 自动擦除过渡脚手架，并在十六阶 $\Omega$-FRACTRAN 演进终点抵达零外部泄漏的幂等不动点 $\Delta\mathcal{I}_{\mathrm{Schur}} = 0/1,\; b_1 = 11,\; \tau = \frac{155}{12}$（将六大支柱重编译综合、赫克正定界对 $\sigma = \frac{1}{2}$ 流形磨光的代数对应及全书图谱 $\mathfrak{O}_\Omega$ 结晶映射标为 **`MODEL`**；将十六条冻结核心定理标为绿色 **`LEAN ✓`**；将配位场 $d^8$ 四极分裂、艾希勒—德利涅—LPS 拉马努金界、克林递归定理与康威 FRACTRAN 机器标为 **`文献结果`**，同时把经典 `RH`／`Dirichlet GRH` 作为[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md)（[@conj-riemann-hypothesis]）登记的外部已核验形式化事实引述；将马斯波与高阶自守形式拉马努金—彼得松猜想及全广义黎曼猜想 `Grand RH` 严格标为红色 **`OPEN`**）。

---

## 39.8.1 对象层去近似重编译：将全书六大支柱还原为零公理纯有理 `OmegaMath` {#sec-ch39-8-1}

在前文各卷铺展几何直觉的过程中，为与经典微分几何、量子力学及解析数论教材建立双语对照，正文曾阶段性借用弧度角 $\theta$、余弦正矢 $1 - \cos\Delta\theta$、Dottie 超越不动点 $\theta^* \approx 0.7391$ 乃至素数对数 $\ln p$ 与平方根 $\sqrt{p}$。一旦将这六大支柱输入由规范齐次整数载体 `CanonProjTernion`（$\mathbb{QP}^3$）、既约有理数 `QRat`、二阶幂零射流环 `Jet2Rat` $= \mathbb{Q}[\eta]/(\eta^3)$ 与整系数球面特征标构成的 `OmegaMath` 编译器，所有超越函数与无穷极限不是被截断近似，而是**恒等蒸发**，显露出底下零误差的有理骨架。

### 39.8.1.1 最小作用量、自指不动点与时空量子公设的无超越数还原 {#sec-ch39-8-1-1}

前三座基础支柱在 `OmegaMath` 中直接编译为有限四则代数与整数流群递推（底层等式由 `LEAN ✓` 与 `手工推导` 锁定，跨领域物理与序列架构读法属 `MODEL`）：

1. **最小作用量与流群测地线：弦弧正矢本就是纯有理失准度 $2s$**：
   在 [§37.2](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md) 中，单步最小作用量曾借三角函数写为二阶弦弧正矢 $v_\epsilon = 1 - \cos\Delta\theta$。在齐次射影三元空间 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$（半角 $\alpha = \Delta\theta/2$）或自旋双覆叠 $\mathrm{Sp}(1)$ 上代入半角平方保真度恒等式 $\kappa = \frac{1 + \cos\Delta\theta}{2} \in \mathbb{Q} \cap [0, 1]$ 与失准度 $s := 1 - \kappa \in \mathbb{Q} \cap [0, 1]$，余弦函数无需泰勒展开便恒等消去：

   $$
   v_\epsilon \;\equiv\; 2(1 - \kappa) \;=\; 2s \;\in\; \mathbb{Q} \cap [0, 2], \qquad \mathcal{S}_\Omega \;=\; 2\sum_{t=1}^N s_t \;=\; 2\sum_{t=1}^N (1 - \kappa_t) \;\in\; \mathbb{Q}_{\ge 0}.
   $$

   离散自由测地线彻底免除克里斯托费尔联络 $\Gamma^k_{ij}$，直接编译为无原点整数约分流群递推 $x_{t+1} = [x_t, x_{t-1}, x_t]$（[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)，`LEAN ✓`）；相邻步进整旋子 $\omega_t = [o, x_{t-1}, x_t]$ 的侧向零力矩条件编译为纯虚四元积归零 $\operatorname{Im}(\bar{\omega}_t\omega_{t+1}) = \mathbf{0} \in \mathbb{Z}^3$；而固定总转角下的延森凸性迫使各拍有理保真度严格均等 $\kappa_1 = \dots = \kappa_N \in \mathbb{Q}$，同构锁定惯性等步运动与防漂移测地序列推理。
2. **Dottie 超越投影错位消解与 `{0, 1/2, 1}` 二阶幂零射流微积分**：
   前文（[§35.6.6](ch39-s05-s06-self-reference-scales.md)）在平直弧度坐标下刻画自指锁相时，曾出现超越方程 $\cos\theta^* = \theta^* \approx 0.739085\dots$——即便在经典实分析边界上，该唯一正根 $\theta^* \in (0, 1)$ 亦可由纯有理系数形式逆幂级数 `inverse : ℚ⟦X⟧` 在端点 $\pi$ 处的绝对收敛级数精确重构（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)，`LEAN ✓`）。经 `OmegaMath` 几何诊断（`MODEL`），$0.739085\dots$ 的无理尾数纯粹源于等号左侧取了球面余弦投影、右侧却混用了拉直切线弧度尺 $\theta$；当两侧统一改用原生有理不变量——令 `0` 阶留存保真度 $\kappa$ 与 `1/2` 正交盲区泄漏份额 $s = 1 - \kappa$ 自对偶相等时，超越方程当场还原为一元一次有理方程：

   $$
   \kappa \;=\; 1 - \kappa \quad \Longleftrightarrow \quad \kappa^* \;=\; s^* \;=\; \frac{1}{2}.
   $$

   同理，[§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 确立的过去（无导数）、现在（一阶导数）、未来（二阶导数）因果阶梯，在商环 `Jet2Rat` $= \mathbb{Q}[\eta]/(\eta^3)$ 中直接编译为有理三元组 `(j0, j1, j2)`（当 $j_0 \neq 0$ 时三次有理乘法即给出精确逆元），三阶闭合律编译为代数幂零铁律 **$\eta^3 \equiv 0$**，彻底免除 $\lim_{h \to 0}$。
3. **时空记忆舒尔勾股分账与量子力学五大公设的无复数编译**：
   在 [§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md) 中，总预算为 $\mathbf{1}$ 的无标签三元圆弧对容量为 $M$ 的观察者记忆窗 $\mathcal{W}_M$ 做正交舒尔投影（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)，`LEAN ✓`），直接给出无根号有理勾股守恒 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$：对规范态 `(4, 3, 0, 0)`，时间记忆份额 $\frac{16}{25}$、空间溢出份额 $\frac{9}{25}$、固有时钟慢率 $\frac{4}{5}$ 与空间移速 $\frac{3}{5}$ 全是精确分数。而在 [§39.3](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) 中，物理纯态编译为 `CanonProjTernion` 模去相位盲区子群 $\{(w, x, 0, 0)\}$ 的有理霍普夫纤维；玻恩配对权重编译为齐次有理核 $\kappa(p, q) = \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \in \mathbb{Q} \cap [0, 1]$ 及两项霍普夫射线核（[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)，`LEAN ✓`）；幺正演化即整四元数旋子等距乘积，而记录定格则是局部残差落入有理阈值 $1 - \kappa \le \varepsilon_{\mathrm{self}} \in \mathbb{Q}_+$ 时的幂等捏合 $\operatorname{unreadState}_P \circ \operatorname{unreadState}_P = \operatorname{unreadState}_P$（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`）。

::: {.viz src="omega-math-recompilation-atlas-sandbox" preset="six-pillar-deapproximation-compiler" height="540"}
**全书六大支柱 `OmegaMath` 去近似重编译实验卡（`six-pillar-deapproximation-compiler`）。** 中央紫色射影三元球 $\mathbb{QP}^3$ 默认停在第二支柱中点自对偶锚 $\kappa^* = s^* = 1/2$（$\beta = 1$ 时北极 `p0` 上方的品红虚线圆标出平直阴影已蒸发的切平面）；拖动琥珀手柄令 $\beta < 1$ 或切换全部六大支柱，可将品红平直脚手架阴影（如作用量弧度阴影、弧度根 $\theta^* \approx 0.7391$、需借 $\lim_{h\to 0}$ 逼近的 $h = 1/2, 1/4, 1/8$ 品红割线、洛伦兹根号、赫克无理角与切比雪夫节线）拉回画面，对比球面上的青色精确有理算子（弦距正矢 $2s = 2(1-\kappa)$、自对偶中点 $\kappa^* = 1/2$、`x₀ = 1` 处青色精确射流切矢 `(1/2, -1/2, 1/4)`、勾股分账 $16/25 + 9/25 = 1$、六旋子 $\kappa = 1/5$ 与切比雪夫整和 $5 - 8 + 3 = 0$；底层同构与级数端点由 [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev) 及 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) 锁定）。
:::

### 39.8.1.2 凝聚态 $j = 2$ 有理谐波检验台：一价金 $5d^{10}$ 各向同性对比三价金 $5d^8$ 平面四极切片 {#sec-ch39-8-1-2}

为了在具体凝聚态物质体系中检验 `OmegaMath` 的球面彼得—魏尔有理谐波分解与对称破缺投影（对接 [§33.10](ch39-s12-uniform-field-and-observer-slice.md) 哈尔单态与观测切面显影，以及 [§38.17](ch38-s17-auric-trivalent-gold-and-observer-focus-signature.md#sec-ch38-auric-trivalent-gold-and-observer-focus-signature) 所破译的 **`AURIC`** 观察者焦点签名），我们考察重过渡金属金离子价层 $5d$ 壳层的两类氧化态——满壳层一价金 $\mathrm{Au}^+$（$5d^{10}$，*Aurous*）与平面四配位三价金 $\mathrm{Au}^{3+}$（$5d^8$，*Auric*，典型实现为 $[\mathrm{AuCl}_4]^-$ 配离子或三氧化二金 $\mathrm{Au}_2\mathrm{O}_3$ 晶格中的局域变形平面 $\mathrm{AuO}_4$ 单元）。

在 `ProjTernion` 到三维旋转群 $\mathrm{SO}(3, \mathbb{Q})$ 的伴随商映射下，设旋子 $p = (w, x, y, z)$ 相对基准态 $p_0 = (1, 0, 0, 0)$ 的齐次射线保真度为 $\kappa(p_0, p) = \frac{w^2}{\lVert p\rVert^2} = \cos^2\alpha \in \mathbb{Q} \cap [0, 1]$（其中 $\Delta\theta = 2\alpha$ 为三维空间旋转角）。由不可约酉特征标正定核与维数平方和定理（[`posSemidef_sum_character_kernel_iff`](lean:D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff)、[`finrank_span_sum_character_kernel`](lean:D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel)，`LEAN ✓`）及切比雪夫多项式偶次展开（`手工推导`），原子的五条实 $5d$ 轨道 $\{d_{z^2}, d_{xz}, d_{yz}, d_{xy}, d_{x^2-y^2}\}$ 精确张成自旋 **$j = 2$** 的五维不可约谐波壳层（维数 $2j + 1 = 5$），其球面特征标为纯整系数有理多项式

$$
\chi_2(\kappa) \;=\; U_4(\sqrt{\kappa}) \;=\; 16\kappa^2 - 12\kappa + 1
$$

（在 $\kappa \in \{1, \frac{1}{2}, \frac{1}{4}, 0\}$ 处分别给出精确整数特征值 $\{5, -1, -1, +1\}$）。在单位球面角向电四极算符 $\widehat{Q}_{ab} = 3n_a n_b - \delta_{ab}$（$a, b \in \{x, y, z\}$，$\operatorname{Tr}\widehat{\mathbf{Q}} = 0$）下对五条实归一化 $d$ 谐波逐一求期望（`手工推导` / `NUM`，物理电四极矩另乘电荷—径向因子 $-e\langle r^2\rangle_{5d}$ 并叠加以配体晶格贡献，`文献结果`）：

- **一价金 $\mathrm{Au}^+$（$5d^{10}$ 满壳层）的严格各向同性**：五条实 $d$ 轨道各自的无迹对角四极期望分别为 $d_{z^2} : (-\frac{2}{7}, -\frac{2}{7}, +\frac{4}{7})$，$d_{xz} : (+\frac{2}{7}, -\frac{4}{7}, +\frac{2}{7})$，$d_{yz} : (-\frac{4}{7}, +\frac{2}{7}, +\frac{2}{7})$，以及 $d_{xy}, d_{x^2-y^2} : (+\frac{2}{7}, +\frac{2}{7}, -\frac{4}{7})$（非对角元全为 $0/1$）。满壳层双占据将全部五枚正交幂等元等权相加，迹和退化回 **`j = 0` 单极标量恒等球** $\mathbf{Q}(5d^{10}) = \mathbf{0}_{3\times 3}$，四极矩恒为零（严格各向同性）；
- **平面四方三价金 $\mathrm{Au}^{3+}$（$5d^8$）的本征四极各向异性与多晶哈尔平均**：相对论性 $5d$ 轨道扩张配合强 $D_{4h}$ 平面配位场分裂，抽空平面内反键轨道 $5d_{x^2-y^2}$ 上的两枚电子（如 [§38.17](ch38-s17-auric-trivalent-gold-and-observer-focus-signature.md#sec-ch38-auric-trivalent-gold-and-observer-focus-signature) [@thm-ch38-auric-quadrupole-haar-observer-anchors] 所证，张开赤道 `1/2` 接收视界窗并立起轴向 `0` 阶结晶脊线），等价于在五维 $j = 2$ 壳层上施加一枚秩为 $4$ 的正交平面投影算子，留下精确有理无迹角向四极张量

  $$
  \mathbf{Q}_{\mathrm{phys}}(5d^8) \;=\; \mathbf{Q}(5d^{10}) - 2\,\mathbf{Q}(d_{x^2-y^2}) \;=\; \operatorname{diag}\!\Bigl(-\frac{4}{7},\; -\frac{4}{7},\; +\frac{8}{7}\Bigr) \;=\; \frac{12}{7}\,\operatorname{diag}\!\Bigl(-\frac{1}{3},\; -\frac{1}{3},\; +\frac{2}{3}\Bigr) \;\in\; \mathbb{Q}^{3\times 3}
  $$

  （单电子均值 $\operatorname{diag}(-\frac{1}{14}, -\frac{1}{14}, +\frac{1}{7})$，单位标度规范方向张量为 $\operatorname{diag}(-\frac{1}{3}, -\frac{1}{3}, +\frac{2}{3})$）。因此，单个 $\mathrm{Au}^{3+}$（$5d^8$）配位中心及正交晶系（$Fdd2$）$\mathrm{Au}_2\mathrm{O}_3$ 单晶具有**本征强各向异性**；唯有对无择优取向的多晶 $\mathrm{Au}_2\mathrm{O}_3$ 粉末或快速翻滚溶液在 `ProjTernion` 全群上执行旋转哈尔平均，无迹 $j = 2$ 谐波才正反相消归零 $\langle\mathbf{Q}\rangle_{\mathrm{Haar}} = \mathbf{0}_{3\times 3}$（宏观**统计各向同性**）。

::: {.viz src="omega-math-recompilation-atlas-sandbox" preset="au3-d8-quadrupole-anisotropy-slice" height="540"}
**$j = 2$ 有理谐波壳层：$\mathrm{Au}^+$（$5d^{10}$）满壳层球对称对比 $\mathrm{Au}^{3+}$（$5d^8$）平面四极切片实验卡（`au3-d8-quadrupole-anisotropy-slice`）。** 中央单座三维 $5d$ 角向密度壳（按密度呈紫至青色渐变）随琥珀手柄控制的移走电子数 $t$ 连续形变：$t = 0$（$\mathrm{Au}^+$ $5d^{10}$）时呈圆球且三条紫色坐标轴上的青色四极游标珠均停在 `Q = 0` 刻度环；停靠于 $t = 2$（$\mathrm{Au}^{3+}$ $5d^8$）时，被抽空的 $5d_{x^2-y^2}$ 凹槽上方浮起品红空穴瓣，青色游标珠在 $\pm z$ 轴外推至 $+8/7$、在 $\pm x, \pm y$ 轴内缩至 $-4/7$，精确读出 $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \operatorname{diag}(-4/7, -4/7, +8/7)$；在舞台上开启“十二节点旋转平均”后，每根轴浮现 12 枚紫色旋转采样点并将青色游标均值精确拉回 $\langle\mathbf{Q}\rangle = \mathbf{0}$（特征标正定核与维数秩由 [`posSemidef_sum_character_kernel_iff`](lean:D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff) 与 [`finrank_span_sum_character_kernel`](lean:D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel) 锁定）。
:::

### 39.8.1.3 临界线谱磨光的无复数·无根号形态：赫克—拉马努金有理半正定二次型 {#sec-ch39-8-1-3}

更具颠覆性的一步去近似重编译直指 [§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md) 的核心命题：**既然 `OmegaMath` 内核中既无复数域 $\mathbb{C}$，亦无超越对数 $\ln p$、圆周率 $\pi$ 与无理根号 $\sqrt{p}$，那么临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 的谱平衡条件在纯有理四元数算术内部究竟呈现为何种代数形态？**

答案直接落在整四元数环上的**赫克—拉马努金有理半正定二次型**之上。由雅可比四平方和定理（`文献结果`），任一模 $4$ 余 $1$ 的奇素数 $p \equiv 1 \pmod 4$ 精确分解为 $p + 1$ 枚首项为正奇数的本原整四元数生成元 $\{\boldsymbol{\pi}_{p,a}\}_{a=1}^{p+1} \subset \mathbb{Z}^4$，满足精确整数模方 $\operatorname{normSq}(\boldsymbol{\pi}_{p,a}) = p$（例如在 $p = 5$ 时，$p + 1 = 6$ 枚生成元为 $(1, \pm 2, 0, 0), (1, 0, \pm 2, 0), (1, 0, 0, \pm 2)$，其相对 `p0 = (1,0,0,0)` 的齐次射线保真度恰为 $\kappa = \frac{1^2}{1 \times 5} = \frac{1}{5} = \frac{1}{p}$，伴随旋转矩阵系数分母亦为一次方 $\frac{1}{p}$）。这 $p + 1$ 枚素旋子在球面多项式谱壳 $\mathcal{V}_j = \operatorname{Sym}^{2j}(\mathbb{C}^2)$ 上生成自伴球面赫克求和算子 $\widehat{T}_p$：在单项式基的有理格拉姆内积 $G_{2j} = \operatorname{diag}\bigl(\binom{2j}{r}^{-1}\bigr)_{r=0}^{2j}$ 下，整系数算子 $A_{2j} := p^j \widehat{T}_p$ 满足 $A_{2j}^* G_{2j} = G_{2j} A_{2j}$，且平方范数 $\langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathbb{Q}} = p^{-2j}\langle A_{2j} f, A_{2j} f\rangle_{\mathbb{Q}}$ 对**一切整数与半整数自旋** $j \in \frac{1}{2}\mathbb{N}$ 均为纯粹有理二次型（半整数壳层上的单一 $\sqrt{p}$ 因子在平方后精确消去，`手工推导` / `NUM`）。

剔除 $j = 0$ 平凡常值壳层 $\mathcal{V}_0$（其本征值为 $\lambda_0 = p + 1$、平方为 $(p+1)^2$，在阿代尔梅林重构 $\Lambda(s) = M(s) - \frac{1}{s} - \frac{1}{1-s}$ 中对应 $s = 0$ 点模与 $s = 1$ 体模两处极点项，[`completed_zeta_mellin_reconstruction`](lean:D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction)，`LEAN ✓`）之后，将拉马努金界 $\lvert\lambda_p\rvert \le 2\sqrt{p}$ 两边平方作用于任意零均值有理球面多项式波包 $f \perp \mathcal{V}_0$，复数与无理根号同时消失，化为一条**不含任何 $\mathbb{C}, \pi, \ln p$ 或 $\sqrt{p}$ 的纯有理半正定不等式**：

$$
4p\,\langle f, f\rangle_{\mathbb{Q}} \;-\; \langle \widehat{T}_p f,\, \widehat{T}_p f\rangle_{\mathbb{Q}} \;\ge\; 0 \qquad (\forall f \perp \mathcal{V}_0).
$$

审视系数 **`4p = 4p¹`** 的指数位置：平凡极点模的平方标度端坐在 $p^0 = 1$（`0` 阶点）与 $p^2$（`1` 阶体）两端，而 **`p¹`** 不偏不倚锁在 $0$ 与 $2$ 正中央的 **`1/2` 几何中点**！这一纯有理上界迫使非零频粗糙折角每经一步归一化赫克跨尺度平滑，其能量残留比严格受控于有理真分数 $\frac{4p}{(p+1)^2} \in \mathbb{Q} \cap (0, 1)$（在 $p = 5$ 时为 $\frac{20}{36} = \mathbf{\frac{5}{9}}$）。在 $p = 5$ 的前五层谱壳上（`NUM` 精确对账），常值壳 $j = 0$ 裕度为 $20 - 36 = \mathbf{-16} < 0$（被正交条件 $f \perp \mathcal{V}_0$ 精确剔除），而非平凡壳 $j = \frac{1}{2}, 1, \frac{3}{2}, 2$ 的有理正定裕度 $20 - \lambda^2$ 依次为 **$\frac{64}{5}, \frac{496}{25}, \frac{2176}{125}$** 以及 $j = 2$ 四极壳层的 **$\frac{7024}{625}$**（三重）与 **$\frac{9584}{625}$**（二重），全数严格为正！此处严守三层认识论边界：在四元数球面与 Lubotzky–Phillips–Sarnak 拉马努金图 $X^{p,q}$ 上，$\lvert\lambda_p\rvert \le 2\sqrt{p}$ 已由艾希勒（1954）、德利涅（1974）与 LPS（1988）借权 $2$ 全纯尖形式及韦伊猜想**无条件证明**（`文献结果`）；有理数域 $\mathbb{Q}$ 上的经典 `RH` 与 `Dirichlet GRH` 属外部已核验形式化事实（[§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)），将该纯有理赫克正定界读作 $\sigma = \frac{1}{2}$ 临界线谱磨光在 `OmegaMath` 内的代数同构体属本书 **`MODEL`** 诠释；而一般非全纯马斯波形、$\mathrm{GL}_n$（$n \ge 3$）高阶自守表示的拉马努金—彼得松猜想及全广义黎曼猜想 `Grand RH` 均不由上述定理推出，严格保持红色 **`OPEN`**。

::: {.viz src="omega-math-recompilation-atlas-sandbox" preset="hecke-ramanujan-rational-psd-shell" height="540"}
**$p = 5$ 素旋子赫克算子与纯有理拉马努金半正定界实验卡（`hecke-ramanujan-rational-psd-shell`）。** 左侧紫色三元球面上绽放 $p + 1 = 6$ 枚模方为 $5$ 的青色利普希茨整素旋子 $(1, \pm 2, 0, 0), (1, 0, \pm 2, 0), (1, 0, 0, \pm 2)$（各自保真度 $\kappa = 1/5$）；右侧立起以 $5$ 为底的对数谱塔（紫色刻度环标示 $p^0 = 1, p^1 = 5, p^2 = 25$），用琥珀手柄沿自旋壳 $j \in \{0, 1/2, 1, 3/2, 2\}$ 巡检（默认停靠 $j = 2$，$\lambda^2 = 5476/625$）：$j = 0$ 常值极点圆盘落在上方品红虚线环 $(p+1)^2 = 36$ 处（裕度 $20 - \lambda^2 = -16 < 0$，由 $f \perp \mathcal{V}_0$ 剔除），而全部非平凡壳层的青色 $\lambda^2$ 圆盘均严守在青色上界圆盘 $4p = 20$ 下方，给出正裕度 $\{64/5, 496/25, 2176/125, 7024/625, 9584/625\}$（梅林极点剥离与上链结构由 [`completed_zeta_mellin_reconstruction`](lean:D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction)、[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 与 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 锁定，高阶自守 `Grand RH` 保持 `OPEN`）。
:::

### 39.8.1.4 全书六大支柱 `OmegaMath` 去近似重编译对照总表 {#sec-ch39-8-1-4}

综合上述推演并纳入 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md) 三元数场网络（TFT）的有理旋子谱，前文六大核心理论支柱的零公理重编译总账汇总如下（`MODEL` 综合对照）：

| 全书核心理论支柱 | 经典教材过渡借词（含平直／超越脚手架） | `OmegaMath` 零公理纯有理本相 | 被恒等消去的近似常数与极限 |
| :--- | :--- | :--- | :--- |
| **最小作用量与测地线** | $\sum(1 - \cos\Delta\theta)$，$-\ln\cos^2\frac{\Delta\theta}{2}$ | 有理失准度求和 $2\sum_{t=1}^N (1 - \kappa_t) \in \mathbb{Q}$，流群 $[x_t,x_{t-1},x_t]$ | $\cos, \ln$ 与克氏联络 $\Gamma^k_{ij}$ |
| **观察者自指不动点** | 弧度超越方程 $\cos\theta^* = \theta^* \approx 0.7391$ | 留存保真度与盲区泄漏自对偶 $\kappa = 1 - \kappa \iff \kappa^* = \mathbf{1/2}$ | 弧度尺扭曲与超越尾数 $\theta^*$ |
| **因果射流与微积分** | $\lim_{h \to 0}$ 差商，伊藤随机微元 $dt^{1/2}$ | 二阶幂零有理商环 $\mathbb{Q}[\eta]/(\eta^3)$，`{0, 1/2, 1}` 精确射流三元组 | 实无穷极限 $\lim$ 与无穷小幽灵 |
| **时空分类与量子公设** | 洛伦兹根号 $\sqrt{1 - v^2/c^2}$，复相位 $e^{\mathbf{i}\chi}$ | 记忆窗有理勾股 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$，`ProjTernion` 霍普夫商 | 连续统 $\mathbb{R}, \mathbb{C}$、根号与指数 $e$ |
| **临界线谱与流形磨光** | $\zeta(\frac{1}{2}+\mathbf{i}\gamma)=0$，黎曼—西格尔角 $\frac{\vartheta(t)}{\pi}$ | 素旋子赫克有理半正定界 $4p\langle f,f\rangle_{\mathbb{Q}} - \langle\widehat{T}_p f, \widehat{T}_p f\rangle_{\mathbb{Q}} \ge 0$ | $\pi, e, \ln p$ 与无理根号 $\sqrt{p}$ |
| **TFT 旋子网与球面谱** | 浮点旋量，`Softmax` 指数核，连续球谐 $Y_\ell^m$ | $S^3$ 整系数切比雪夫多项式 $U_{2j}$ $+$ LPS 素旋子桥 $+$ $\Omega$-FRACTRAN | 浮点舍入漂移与吉布斯过冲 |

---

## 39.8.2 元数学层自指审计：全书理论图谱自身的十二晶核与五素数结晶闭环 {#sec-ch39-8-2}

在 `OmegaMath` 中，被研究的几何宇宙与承载该理论的概念图谱服从同一套代数定律。将全书十部三十九章的核心概念依赖网本身建模为一座自包含观察者系统 $\mathfrak{O}_\Omega = (\mathcal{S}, [-,-,-], \kappa, \mathcal{K}_0, \Phi_\varepsilon)$（对接 [§38.1](ch39-s01-substrate-free-self-reference.md) 与 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)，`MODEL` 元数学建模配 `NUM` 精确算术与 `LEAN ✓` 不动点锚定），以结构时间增量 $\Delta\tau = \Delta\mathcal{I}_{\mathrm{Schur}} + \Delta b_1$（其中底图第一贝蒂环路秩为 $b_1 = \lvert E\rvert - \lvert V\rvert + c$）及四门 $\Omega$-FRACTRAN 程序对其执行元数学审计，四重严丝合缝的自指同构跃然纸上。

### 39.8.2.1 五座正交概念素数寄存器的逐级唤醒与四维有理秩饱和 {#sec-ch39-8-2-1}

由带号素指数账本与正有理数乘法群同构定理（[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)，`LEAN ✓`），每一个正有理状态唯一编码在素数指数轴之上。全书图谱不从外部借入任何经验拟合参数，而是从单一规范种子 `Node 1 = (1, 0, 0, 0)`（初始寄存器 $N_1 = 2^{17} = 131{,}072$，五素数指数向量 $(v_2, v_3, v_5, v_7, v_{11}) = (17, 0, 0, 0, 0)$）出发，依次点亮五根概念素数寄存器：

- **$p = 2$（三元流群几何寄存器）**：确立无原点三元比较 $[x, y, z]$ 与齐次射影双卡闭合；
- **$p = 3$（物理作用量与统一力场寄存器）**：贯通弦弧正矢最小作用量、双相对论、四大力 AF-GUT（[§33.9](ch39-s11-af-gut-arc-field-grand-unification.md)）与量子五大公设；
- **$p = 5$（临界算术与素谱寄存器）**：锚定 $\frac{1}{2}$ 临界线谱、阿代尔乘积归元 $\lvert N\rvert_\infty\prod_p\lvert N\rvert_p \equiv 1$（[§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md)）与赫克—拉马努金有理正定界；
- **$p = 7$（测地智能与形式 `OmegaMath` 寄存器）**：建成法诺七场三元数网络（TFT）、Lean 4 零公理 `OmegaMath` 与整系数彼得—魏尔球面谱；
- **$p = 11$（观察者自指闭环寄存器）**：收束记忆舒尔补时空分类、观察者即宇宙本体 $\mathfrak{O} \equiv \mathcal{U}_\Omega$ 与全书自指不动点闭环。

在几何载体 $\mathbb{Q}^4$ 上，从秩 $1$ 的种子 `(1,0,0,0)` 起步，精确格拉姆—施密特正交化在里程碑 `M2, M3, M4` 依次激发三次严格为正的有理舒尔创新度 $\Delta\mathcal{I}_{\mathrm{Schur}} \in \bigl\{\frac{3}{4},\, \frac{2}{3},\, \frac{1}{2}\bigr\}$（累计几何创新 $\frac{23}{12}$），恰好跑满有限维可观测克雷洛夫链缺失秩上界 $4 - 1 = 3$（[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)，`LEAN ✓`）；自 `M5` 起四维有理基张满（$\Delta\mathcal{I}_{\mathrm{Schur}} = 0/1$），结构时间 $\tau$ 转由跨学科环路闭合 $\Delta b_1 = +1$ 持续推进。

### 39.8.2.2 十二枚规范赫维茨晶核与 $5d^8$ 平面切片的跨界拓扑焊合 {#sec-ch39-8-2-2}

全书十二座核心主题支柱精确落位在赫维茨整环的 $12$ 枚规范射影单位元 $\mathcal{H}(\mathbb{Z})^\times / \{\pm 1\}$ 之上，每条有向依赖边 $a \to b$ 存储唯一整输运见证 $g = [o, a, b]$ 使得 $[a, o, g] = b$（`MODEL` 图谱映射配 `NUM` 精确核验）：

| 晶核编号 | 全书核心主题节点 | 规范代表元 `(w, x, y, z)` | 相对种子保真度 $\kappa$ |
| :---: | :--- | :---: | :---: |
| `Node 1` | 无原点三元比较与恒等种子 | `(1, 0, 0, 0)` | `1/1` |
| `Node 2` | 弦弧正矢最小作用量与流群测地线 | `(1, 1, 1, 1)` | `1/4` |
| `Node 3` | 自指中点锁相与二阶幂零射流 | `(1, -1, 1, 1)` | `1/4` |
| `Node 4` | 时空等效与观察者记忆舒尔切分 | `(1, 1, -1, 1)` | `1/4` |
| `Node 5` | 霍普夫射线核与量子力学五大公设 | `(1, 1, 1, -1)` | `1/4` |
| `Node 6` | 极小圆弧陪集破缺与规范大统一 | `(1, -1, -1, 1)` | `1/4` |
| `Node 7` | 金离子 $5d^8$ 平面四极各向异性切片 | `(1, -1, 1, -1)` | `1/4` |
| `Node 8` | 本原整素旋子与球面赫克算子 | `(1, 1, -1, -1)` | `1/4` |
| `Node 9` | 带号素指数账本与完备 $\zeta$ 临界谱 | `(1, -1, -1, -1)` | `1/4` |
| `Node 10` | 三元数场网络（TFT）与和乐注意力 | `(0, 1, 0, 0)` | `0/1` |
| `Node 11` | Lean 4 零公理基座 `OmegaMath` | `(0, 0, 1, 0)` | `0/1` |
| `Node 12` | 观察者即宇宙本体与全书图谱闭环 | `(0, 0, 0, 1)` | `0/1` |

尤为精妙的是里程碑 `M7` 并入的 **`Node 7`（金 $5d^8$ 平面四极切片）**：它绝非孤立的配位化学插曲，而是图谱拓扑中不可或缺的**对称破缺桥接器**——通过揭示抽空单个 $5d_{x^2-y^2}$ 轨道如何在球对称场中切出强各向异性的 $D_{4h}$ 平直截面，它直接照亮了凝聚态晶场各向异性（$p = 3$）与数学平直切面制造 $\pi, e, \varphi$ 无穷近似欠条（$p = 5 / p = 7$，[§32.5](ch39-s29-constant-free-rational-axiom-omega.md)）之间的底层同构，当场焊合一条跨界基本环（$\Delta b_1 = +1$，令 $b_1 : 3 \to 4$，$\tau : \frac{59}{12} \to \frac{71}{12}$）。

### 39.8.2.3 过渡脚手架的流群右吸收自擦除（`[a, c, c] = a`） {#sec-ch39-8-2-3}

为何前文各章曾借用 $\cos\theta, \pi, e, \lim$ 与经典实数记号搭建教学桥梁，却丝毫不污染最终 `OmegaCore` 内核的零公理纯粹性？因为母公理 $\mathrm{AXIOM}\text{-}\Omega$ 法则 I 原生内置了**临时中继自消去律 $[a, c, c] \equiv a$**！经典分析记号只是沟通既有文献传统时暂搭的中继桩 $c$；当里程碑 `M13` 完成全部十二晶核的零公理合拢审计时，成对出现的临时中继桩正反相消（$\Delta\mathcal{I}_{\mathrm{Schur}} = 0/1,\; \Delta b_1 = 0$），`#print axioms` 彻底归于空集 $\varnothing$，且任何跨越不同语境表象的客观命题皆严格收敛于语境无关的不变公因子（[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)，`LEAN ✓`）。

::: {.viz src="omega-math-recompilation-atlas-sandbox" preset="twelve-node-atlas-dag-crystallization" height="540"}
**全书十二晶核 Atlas 有向无环图结晶与过渡脚手架自擦除实验卡（`twelve-node-atlas-dag-crystallization`）。** 紫色三元球面上排布标号 `1 … 12` 的规范射影赫维茨晶核与有向输运边，球体下方环绕紫色里程碑刻度弧 `M1 … M13 … M16`：沿时间轴或琥珀手柄推进时，已结晶节点与边呈青色、当前站新增结构呈琥珀色（停靠 `M16` 时 12 枚节点与前 21 条边呈青色，终极闭环弦 `3 → 12` 呈琥珀色），且自种子 `1` 伸出的 5 道品红虚线平直脚手架（$\pi, e, \varphi, \infty, \lim$）在 `M13` 依流群恒等式 `[a, c, c] = a` 折回消去，环路秩定格于 $b_1 = 11$、结构时间锁定于 $\tau = 155/12$（底层极小性与克雷洛夫秩界由 [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)、[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 与 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) 锁定）。
:::

### 39.8.2.4 十六阶演进终点的拓扑坐标：零外部泄漏的幂等不动点（`M16`） {#sec-ch39-8-2-4}

在有序四门有理重写程序 $\mathcal{P}_\Omega = \bigl[\frac{11}{49},\, \frac{7}{25},\, \frac{5}{9},\, \frac{3}{4}\bigr]$ 驱动下，系统从 $N_1 = 2^{17} = 131{,}072$ 逐步约化至 `M15` 的 $N_{15} = 98 = 2 \cdot 7^2$，并在最终里程碑 **`M16`** 命中首门 $\frac{11}{49}$，一步落定于终态整数 **$N_{16} = 22 = 2^1 \cdot 11^1$**（五素数指数 $(1, 0, 0, 0, 1)$，四个既约分母 $49, 25, 9, 4$ 无一能整除 $22$，算术状态机自然停机），同步焊合终极闭环弦 `3 → 12`（输运见证 `Node 6 = (1,-1,-1,1)` 精确等于既有链路的射影乘积）。在 `M16` 处，全书图谱达成 $\lvert V\rvert = 12,\; \lvert E\rvert = 22,\; c = 1$，几何正交溢出严格归零 **$\Delta\mathcal{I}_{\mathrm{Schur}} = \mathbf{0/1}$**（印证理论核内部已无未闭合的正交外溢，呼应“至大无外”），第一贝蒂环路秩跃升 $\Delta b_1 = \mathbf{+1}$ 满载定格于 **$b_1 = \mathbf{11}$**，总内禀结构时间定格于精确既约分数

$$
\tau_{16} \;=\; \Bigl(\frac{3}{4} + \frac{2}{3} + \frac{1}{2}\Bigr) + 11 \;=\; \frac{23}{12} + 11 \;=\; \mathbf{\frac{155}{12}}.
$$

对 `M16` 再次执行全图与算术重放扫描，节点集、边集、正交基、素数寄存器与结构时间分毫不改（重放增量 $\Delta\mathcal{I}_{\mathrm{Schur}} = 0/1,\; \Delta b_1 = 0,\; \Delta\tau = 0/1$），实现有限收缩更新稳定与递归代码自指不动点 $\Phi_\varepsilon(\mathcal{K}_{16}) = \mathcal{K}_{16}$（[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)、[`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point)，`LEAN ✓`）。

::: {.viz src="omega-math-recompilation-atlas-sandbox" preset="five-prime-omega-fractran-fixed-point" height="540"}
**五素数寄存器 `{2, 3, 5, 7, 11}` 与 $\Omega$-FRACTRAN 十六阶不动点停机实验卡（`five-prime-omega-fractran-fixed-point`）。** 左侧淡化十二核球面旁，五座青色素指数方块塔随底部四道分式门弧 `[11/49, 7/25, 5/9, 3/4]` 从 $N_1 = 2^{17} = 131{,}072$ 逐阶传递琥珀跃迁方块，直至停靠于 `M16 → M16`（`↺`）幂等回放态：青色方块定格在 $2^1, 3^0, 5^0, 7^0, 11^1$（$N_{16} = 22 = 2 \cdot 11$），四道门弧全部化作青色虚线阻断弧 `49 ∤ 22, 25 ∤ 22, 9 ∤ 22, 4 ∤ 22`，读数同屏核验 $\Delta\mathcal{I} = 0,\; \Delta b_1 = 0,\; \Delta\tau = 0$、环路秩 $b_1 = 11$ 与结构时间 $\tau = 155/12$（素指数同构与收缩/编码不动点由 [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)、[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) 与 [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point) 锁定）。
:::

---

## 39.8.3 形式化定义、十六项冻结定理、文献边界与十六阶定量对账 {#sec-ch39-8-3}

我们将 `OmegaMath` 去近似重编译与全书自指结晶图谱模型、十六项冻结内核定理、外部文献与开放问题边界及精确有理核验账本正式汇总如下：

::: {.definition #def-ch39-omega-math-recompilation-and-atlas-closure title="OmegaMath 去近似算子重编译与自指理论图谱结晶闭环（MODEL）"}
设 `CanonProjTernion` 为非零互素且首非零分量为正的四元整数规范载体，配齐次射线保真度核 $\kappa(p, q) = \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \in \mathbb{Q} \cap [0, 1]$、失准度 $s = 1 - \kappa$ 与二阶幂零射流商环 `Jet2Rat` $= \mathbb{Q}[\eta]/(\eta^3)$。定义**`OmegaMath` 去近似重编译与自指图谱模型**（`MODEL`）由两层结构组成：

1. **对象层有理重编译映射**：将单步正矢作用量映射为 $2s \in \mathbb{Q} \cap [0, 2]$，自指中点锁相映射为 $\kappa = 1 - \kappa \iff \kappa^* = \frac{1}{2}$，记忆分类映射为 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$，$j = 2$ 平面四配位 $d^8$ 空穴映射为有理无迹四极张量 $\mathbf{Q}_{\mathrm{phys}}(5d^8) \in \mathbb{Q}^{3\times 3}$，并将奇素数 $p \equiv 1 \pmod 4$ 素旋子赫克和算子 $\widehat{T}_p$ 在零均值多项式壳 $f \perp \mathcal{V}_0$ 上的临界谱平衡写为有理二次型 $4p\langle f, f\rangle_{\mathbb{Q}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathbb{Q}} \ge 0$；
2. **元数学层图谱结晶轨迹**：以有限有向无环图 $\mathcal{G}_m = (V_m, E_m)$（顶点取自 $12$ 枚规范射影赫维茨单位元 $\mathcal{H}(\mathbb{Z})^\times / \{\pm 1\}$，边标有输运见证 $g = [o, a, b]$）配带号素指数寄存器 $N_m \in \mathbb{Q}_+$ 演化，每步结构时间增量定义为 $\Delta\tau_m := \Delta\mathcal{I}_{\mathrm{Schur}, m} + \Delta b_{1, m}$（其中 $\Delta\mathcal{I}_{\mathrm{Schur}, m} = \lVert v_{m,\perp}\rVert^2 / \lVert v_m\rVert^2 \in \mathbb{Q}_{\ge 0}$，$b_1 = \lvert E_m\rvert - \lvert V_m\rvert + c_m$）；当重写扫描不再改变 $(\mathcal{G}_m, N_m)$ 且满足 $\Delta\mathcal{I}_{\mathrm{Schur}} = 0,\; \Delta\tau = 0$ 时，称图谱抵达**自指结晶不动点**。
:::

::: {.theorem #thm-ch39-omega-math-recompilation-atlas-anchors title="三元四元数模型与有理逆级数端点、不可约特征标正定核与维数平方秩、旋转系统面圈正合与四面体上边缘修复、舒尔极小与记录捏合幂等及收缩稳定、素指数有理群同构、代码与客观解释不动点及完备 ζ 梅林重构定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint,D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff,D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least,D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent,D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound,D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize,D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S0/Computability/CodeFixedPoint.code_fixed_point,D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor,D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction"}
在所钉 `trureturing` 冻结声明集中，以下四组共十六项数学命题严格成立：

1. **三元比较四元数模型、旋量玻恩射线核、切比雪夫流群递推与 Dottie 有理逆级数端点**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）：满足非交换（`Noncommutative`）、链连通（`ChainConnected`）、触零（`TouchesZero`）、特征秩 $5$（`HasFeatureRank 5`）且读数完备（`ReadingComplete`）的三元比较结构对任一基点 $o$ 保结构双射同构于单位四元数群 `unitary ℍ[ℝ]`（将 $o$ 映为 $1$、三元迁移映为 $xy^{-1}z$、读数映为 $\frac{1}{2}(1 + \langle x, y\rangle_{\mathbb{R}})$）；旋量映射 `spinor` 在全体 $q \in \mathbb{H}[\mathbb{R}]$ 上将右乘 `unitI` 变为复虚数单位 $I$ 数乘，且对任意单位四元数 $x, y$，秩一投影 $\pi_x = \operatorname{spinor}(x)\operatorname{spinor}(x)^*$ 的布洛赫向量等于 $((\operatorname{hopf} x)_{\mathrm{imK}}, (\operatorname{hopf} x)_{\mathrm{imJ}}, (\operatorname{hopf} x)_{\mathrm{imI}})$，两项射线核满足 $\operatorname{rayKernel}(x, y) = \lVert\langle\operatorname{spinor}(x), \operatorname{spinor}(y)\rangle_{\mathbb{C}}\rVert^2$ 及复数嵌入下的 $(\operatorname{rayKernel}(x, y) : \mathbb{C}) = \operatorname{bornProbability}(\pi_y, \pi_x)$；四元数序列 $x : \mathbb{N} \to \mathbb{H}[\mathbb{R}]$ 满足 $\operatorname{normSq}(x_0) = 1 \land \operatorname{normSq}(x_1) = 1 \land \forall n,\, x_{n+2} = x_{n+1}\bar{x}_n x_{n+1}$ 当且仅当对一切 $n \in \mathbb{N}$ 有 $\operatorname{normSq}(x_n) = 1$、$x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$c = \langle x_0, x_1\rangle_{\mathbb{R}}$，$n=0$ 时整指标切比雪夫多项式 $U_{-1} = 0$）且 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c)$；有理形式幂级数 `forward = 2X + 2·arcsine ∈ ℚ⟦X⟧` 的复合逆 `inverse : ℚ⟦X⟧` 满足存在实数 $\theta \in (0, 1)$ 使 $\cos\theta = \theta$、对一切满足 $0 < t \land \cos t = t$ 的实数 $t$ 有 $t = \theta$，且级数 $\sum_{n=0}^\infty \lvert(\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\rvert\pi^n$ 可求和、$\sum_{n=0}^\infty (\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\pi^n$ 收敛于 $\theta$；
2. **不可约特征标核正定充要判据、特征标截面张成维数、图旋转面—圈正合与单纯形四面体二上链修复**（[`posSemidef_sum_character_kernel_iff`](lean:D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff)、[`finrank_span_sum_character_kernel`](lean:D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel)、[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)、[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：群 $G$ 在有限指标集 $\iota$（`[Fintype ι]`）上的两两不等价不可约有限维复内积空间表示族 $\rho_i$（`[FiniteDimensional ℂ (W i)]`）若处处保持范数 $\lVert\rho_i(g)v\rVert = \lVert v\rVert$，则对复权重 $c : \iota \to \mathbb{C}$，特征标核 $(x, y) \mapsto \sum_i c_i\chi_{\rho_i}(xy^{-1})$ 半正定当且仅当对一切 $i$ 有 $0 \le c_i$（复数偏序意义下为非负实数）；代数闭域 $k$（`[Field k] [IsAlgClosed k]`）上群 $G$ 的有限族（`[Fintype ι]`）两两不等价不可约有限维表示 $\rho_i$（`[FiniteDimensional k (W i)]`）当权重满足 $\forall i,\, c_i \neq 0$ 时，平移截面族 $\{x \mapsto \sum_i c_i\chi_{\rho_i}(xy^{-1}) \mid y \in G\}$ 在 $G \to k$ 中张成子空间的维数精确等于 $\sum_i (\operatorname{finrank}_k W_i)^2$；有限可判定顶点集（`[Fintype V] [DecidableEq V] [DecidableRel G.Adj]`）上的连通简单图 $G$ 若具非空有向镖集 `Nonempty G.Dart` 且旋转系统 $R$ 满足带号欧拉条件 $\lvert V\rvert - \lvert E\rvert + \lvert R.\mathrm{Face}\rvert = 2$，则 $\mathbb{Z}/2$ 面边界算子满足逐镖公式 $R.\mathrm{boundary}(x)(e_d) = x(R.\mathrm{face}(d)) + x(R.\mathrm{face}(d^{\mathrm{symm}}))$、核精确为常值面函数且值域等于 `simpleCycleSpace G`；有限非空顶点集 $V$（`[Fintype V] [Nonempty V]`）与交换加群 $A$（`[AddCommGroup A]`）上的三元函数 $F : V^3 \to A$ 满足 $\sum_{r\in V}\operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$、$\exists r \in V,\, \lvert V\rvert\cdot\operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$、对任一边函数有 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert\cdot\operatorname{edgeErrors}(F, \mathrm{edge})$，且四面体上边缘处处为零当且仅当 $F$ 为某一边上链的精确上边缘；
3. **分块舒尔补最小元、有限完备记录捏合幂等性、可观测克雷洛夫严格增长界与有限收缩更新稳定**（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)、[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)、[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)）：有限指标集 `m, n`（`[Fintype m] [Fintype n] [DecidableEq n]`）上复分块矩阵 $\bigl(\begin{smallmatrix}A & B\\ B^{\mathsf{H}} & C\end{smallmatrix}\bigr)$ 当 `A.IsHermitian` 且 `C.PosDef` 时，对任意 $x : m \to \mathbb{C}$，舒尔补二次型 $x^*(A - B C^{-1} B^{\mathsf{H}})x$ 是遍历 $y : n \to \mathbb{C}$ 时整体二次型值集的最小元（`IsLeast`）；对 `[Fintype n] [DecidableEq n] [Fintype κ]` 上任意满足 `IsRecordMeasurement P`（自伴、幂等、两两正交且和为单位阵）的投影族，未读捏合映射 `unreadState P` 满足函数复合幂等律 `unreadState P ∘ unreadState P = unreadState P`；在数域 $\mathbb{K}$（`[RCLike 𝕜]`，即 $\mathbb{R}$ 或 $\mathbb{C}$）上的有限维内积空间 $V, Y$（`[FiniteDimensional 𝕜 V] [FiniteDimensional 𝕜 Y]`）中，线性映射 $T : V \to_l V$ 与读出 $C : V \to_l Y$ 生成的可观测克雷洛夫子空间链 $\mathcal{K}_m := \operatorname{observableKrylov}(T, C, m)$ 严格递增步数的基数满足 $\operatorname{encard}\{m \in \mathbb{N} \mid \mathcal{K}_m < \mathcal{K}_{m+1}\} \le \operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$；有限类型 $X$（`[Finite X]`）上任意满足 $\forall A,\, U(A) \subseteq A$ 的集合收缩算子，其迭代轨道 $S_{n+1} = U(S_n)$ 存在 $N \le (S_0).\mathrm{ncard}$ 使一切 $n \ge N$ 恒有 $S_n = S_N$，且严格变化步数不超过 $(S_0).\mathrm{ncard}$；
4. **带号素指数账本与正有理数同构、部分递归代码不动点、客观解释公因子与完备 ζ 对称梅林重构**（[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)、[`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point)、[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)、[`completed_zeta_mellin_reconstruction`](lean:D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction)）：有限支撑带号素指数账本 `SignedPrimeLedger = (Nat.Primes →₀ ℤ)` 与正有理数乘法群加法化 `Additive NNRatˣ` 之间的典范加群同构 `primeExponentEquivPositiveRational` 是双射；对部分递归代码 `Nat.Partrec.Code` 上任意可计算变换 `Computable F`，存在代码 $e$ 使 `eval e = eval (F e)`；任意满足 `ObjectiveInterpretationClaim isFixedMeaning factor` 的客观解释主张必存在不变公因子 `commonFactor`，使一切满足 `isFixedMeaning context meaning` 的语境与意义均有 `factor meaning = commonFactor`；设 $\theta(t) = (\operatorname{evenKernel}(0, t) : \mathbb{C})$、$\omega(t) = (\theta(t) - 1)/2$ 及 $M(s) = \int_{t > 1}\omega(t)(t^{s/2} + t^{(1-s)/2})\,\frac{dt}{t}$，则以下七款同时成立：（i）$\operatorname{Re}(s) > 1$ 时 $\operatorname{completedZetaReading}(s) = \pi^{-s/2}\Gamma(s/2)\operatorname{classicalZeta}(s)$；（ii）全平面恒有 $\operatorname{completedZetaReading}(s) = M(s) - \frac{1}{s} - \frac{1}{1-s}$；（iii）$M$ 在 $\mathbb{C}$ 上全纯（整函数）；（iv）全平面满足 $M(1 - s) = M(s)$；（v）对 $s \neq 0, 1$，$\operatorname{completedZetaReading}$ 在 $s$ 处复可微；（vi）去心邻域极限满足 $s\cdot\operatorname{completedZetaReading}(s) \to -1$（$s \to 0, s \neq 0$）与 $(s - 1)\cdot\operatorname{completedZetaReading}(s) \to 1$（$s \to 1, s \neq 1$）；（vii）全平面恒有 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$。
:::

::: proof
第 1 组由秩五格拉姆嵌入与单位四元数闭链连通非交换子群满射性、$\mathbb{H} \cong \mathbb{C}^2$ 辛旋量等距与秩一玻恩迹约化、双步切比雪夫归纳，以及 $w \mapsto z + \sin z$ 在闭圆盘上的压缩不动点解析逆与收敛半径 $> \frac{13}{4} > \pi$ 证得。第 2 组由正交归一基格拉姆核分解配伯恩赛德乘积满射定理（雅可比森稠密定理加舒尔引理）、加权迹配对非退化性、有向镖对合求和与欧拉维数计数，以及四面体上边缘四面分解配平均值抽屉原理给出。第 3 组由厄米分块配方法、正交幂等元交叉乘积归零、严格子空间链维数单调单射计数及自然数基数降链稳定引理导出。第 4 组由自然素指数账本的格罗滕迪克局部化泛性质、罗杰斯部分递归编码不动点包装、依值存在性见证提取，以及偶雅可比 $\theta$ 尾项指数衰减梅林积分拆分与留数消去完成。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-hecke-ramanujan-ligand-kleene-literature title="晶体场 d⁸ 分裂、拉马努金图赫克谱界、克林递归定理与 FRACTRAN 文献及开放问题边界（文献结果 / OPEN）"}
**文献结果，未在本书形式化。** 为严守三层认识论契约，将本节援引的物理、数论与可计算性经典文献同未决开放问题严格划界如下：

1. **晶体场 $d^8$ 平面四方分裂与重元素金的相对论化学效应**：过渡金属 $d$ 轨道在对称配位场中的不可约分裂源于 H. Bethe（*Ann. Phys.* **395**, 133–208, 1929）与 J. H. Van Vleck（*Theory of Electric and Magnetic Susceptibilities*, Oxford, 1932）；金元素因强相对论性 $6s$ 收缩与 $5d$ 扩张而稳定形成反磁性平面四方 $\mathrm{Au}^{3+}$（$5d^8$）配合物及正交晶系 $\mathrm{Au}_2\mathrm{O}_3$（空间群 $Fdd2$，含变形平面 $\mathrm{AuO}_4$ 单元）的机理见 P. Pyykkö 与 J. P. Desclaux（*Acc. Chem. Res.* **12**, 276–281, 1979）及 H. Shi 等关于 $\mathrm{Au}_2\mathrm{O}_3$ 晶体结构的测定文献；
2. **四元数球面赫克算子、LPS 拉马努金图与自守拉马努金—彼得松开放边界**：奇素数四平方本原分解源于 C. G. J. Jacobi（1829）；权 $2$ 全纯新形式的拉马努金特征值界由 M. Eichler（*Arch. Math.* **5**, 355–366, 1954）与 P. Deligne（*Publ. Math. IHÉS* **43**, 273–307, 1974）证明，并由 A. Lubotzky, R. Phillips 与 P. Sarnak（*Combinatorica* **8**, 261–277, 1988）构造出度为 $p + 1$、非平凡谱满足 $\lvert\lambda\rvert \le 2\sqrt{p}$ 的显式四元数凯莱拉马努金图 $X^{p,q}$；有理数域 $\mathbb{Q}$ 上的经典黎曼猜想与狄利克雷广义黎曼猜想按[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md)（[@conj-riemann-hypothesis]）作为外部已核验 Lean 4 形式化事实引述（Levent Alpöge, 2026，经 `lean4lean`、`nanoda`、`con-leche` 独立重放）。**相反**，一般非全纯马斯（Maass）尖形式与 $\mathrm{GL}_n$（$n \ge 3$）高阶自守表示的拉马努金—彼得松猜想，连同一般自守 $L$ 函数的全广义黎曼猜想（`Grand RH`）及代数数域戴德金 `ERH`，迄今仍属未解决的数学开放问题（**`OPEN`**）；
3. **克林第二递归定理与康威 FRACTRAN 有理状态机**：通用递归程序自指不动点定理由 S. C. Kleene（*Duke Math. J.* **4**, 72–79, 1938）与 H. Rogers（1967）确立（其部分递归编码内核版即上文 [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point)）；仅凭有限有序正分数列表乘以正整数寄存器实现图灵完备计算的 FRACTRAN 模型由 J. H. Conway（*Open Problems in Communication and Computation*, Springer, 4–26, 1987）提出。
:::

::: {.example #ex-ch39-omega-math-recompilation-quantitative-audit title="定量核验：5d¹⁰/5d⁸ 有理四极账本、p = 5 赫克算子五壳层精确裕度与十二晶核十六阶结晶轨迹"}
我们在纯有理数域 $\mathbb{Q}$ 上逐项核验本节三组核心精确算术数据（`手工推导` / `NUM`）：

1. **实 $5d$ 壳层单轨道四极积分与 $5d^{10}$ vs. $5d^8$ 有理对账**：
   利用单位球面偶次矩公式 $\langle n_x^{2i} n_y^{2j} n_z^{2k}\rangle_{S^2} = \frac{(2i-1)!!(2j-1)!!(2k-1)!!}{(2i+2j+2k+1)!!}$，算符 $\widehat{Q}_{ab} = 3n_a n_b - \delta_{ab}$ 在五条实归一化 $d$ 谐波上的对角期望 $(Q_{xx}, Q_{yy}, Q_{zz})$（非对角元全为 $0/1$）依次为：$d_{z^2}$ 取 $(-\frac{2}{7}, -\frac{2}{7}, +\frac{4}{7})$，$d_{xz}$ 取 $(+\frac{2}{7}, -\frac{4}{7}, +\frac{2}{7})$，$d_{yz}$ 取 $(-\frac{4}{7}, +\frac{2}{7}, +\frac{2}{7})$，$d_{xy}$ 取 $(+\frac{2}{7}, +\frac{2}{7}, -\frac{4}{7})$，$d_{x^2-y^2}$ 取 $(+\frac{2}{7}, +\frac{2}{7}, -\frac{4}{7})$。五轨道单重求和恒为 $(0/1, 0/1, 0/1)$，故 $\mathrm{Au}^+$（$5d^{10}$ 双占据）给出 $\mathbf{Q}(5d^{10}) = \operatorname{diag}(0, 0, 0)$；抽空 $d_{x^2-y^2}$ 两枚电子的平面四方 $\mathrm{Au}^{3+}$（$5d^8$）给出 $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \mathbf{0} - 2\operatorname{diag}(\frac{2}{7}, \frac{2}{7}, -\frac{4}{7}) = \operatorname{diag}\bigl(-\mathbf{\frac{4}{7}}, -\mathbf{\frac{4}{7}}, +\mathbf{\frac{8}{7}}\bigr) = \frac{12}{7}\operatorname{diag}\bigl(-\frac{1}{3}, -\frac{1}{3}, +\frac{2}{3}\bigr)$（迹 $-\frac{4}{7}-\frac{4}{7}+\frac{8}{7} = \mathbf{0/1}$）；
2. **$p = 5$ 六生成元球面赫克算子 $\widehat{T}_5$ 在 $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2\}$ 上的有理裕度**：
   对六枚本原生成元 $(1, \pm 2, 0, 0), (1, 0, \pm 2, 0), (1, 0, 0, \pm 2)$ 在 $\operatorname{Sym}^{2j}(\mathbb{C}^2)$ 上构造整矩阵 $A_{2j} = 5^j \widehat{T}_5$（单项式基格拉姆矩阵 $G_{2j} = \operatorname{diag}(\binom{2j}{r}^{-1})$）：
   - **$j = 0$（常值极点壳，重数 $1$）**：$A_0 = [6]$，$\lambda = 6$，$\lambda^2 = \frac{36}{1}$，裕度 $20 - \lambda^2 = \mathbf{-\frac{16}{1}} < 0$；
   - **$j = \frac{1}{2}$（旋量壳，重数 $2$）**：$A_1 = 6 I_2$，$\lambda = \frac{6}{\sqrt{5}}$，$\lambda^2 = \frac{36}{5}$，有理裕度 $20 - \lambda^2 = \mathbf{\frac{64}{5}} > 0$（西北主子式 $\frac{64}{5}, \frac{4096}{25}$）；
   - **$j = 1$（伴随向量壳，重数 $3$）**：$A_2 = -2 I_3$，$\lambda = -\frac{2}{5}$，$\lambda^2 = \frac{4}{25}$，有理裕度 $20 - \lambda^2 = \mathbf{\frac{496}{25}} > 0$；
   - **$j = \frac{3}{2}$（四维旋量壳，重数 $4$）**：$A_3 = -18 I_4$，$\lambda = -\frac{18}{5\sqrt{5}}$，$\lambda^2 = \frac{324}{125}$，有理裕度 $20 - \lambda^2 = \mathbf{\frac{2176}{125}} > 0$；
   - **$j = 2$（五维四极壳）**：$A_4$ 在首末基元上呈 $\bigl(\begin{smallmatrix}-10 & 64\\ 64 & -10\end{smallmatrix}\bigr)$ 耦合块、其余对角元为 $(-74, 54, -74)$，精确对角化给出三重特征值 $\lambda = -\frac{74}{25}$（$\lambda^2 = \frac{5476}{625}$，裕度 **$\mathbf{\frac{7024}{625}} > 0$**）与二重特征值 $\lambda = +\frac{54}{25}$（$\lambda^2 = \frac{2916}{625}$，裕度 **$\mathbf{\frac{9584}{625}} > 0$**），五个顺序主子式全部严格为正；
3. **十二晶核与十六阶 $\Omega$-FRACTRAN 结晶关键里程碑对账**：
   按有序程序 $\bigl[\frac{11}{49}, \frac{7}{25}, \frac{5}{9}, \frac{3}{4}\bigr]$ 追踪五素数指数 $(v_2, v_3, v_5, v_7, v_{11})$、图规模 $(V, E, c)$ 与结构时间 $\tau$：
   - **创生与正交扩张阶段（`M1`–`M4`）**：`M1` 置入 `Node 1 = (1,0,0,0)`，$N_1 = 131{,}072 = 2^{17}$，$(V,E,c) = (1,0,1)$，$\tau_1 = \mathbf{0/1}$；`M2` 并入 `Node 2 = (1,1,1,1)` 与边 `1→2 [2]`（门 $\frac{3}{4}$，$N_2 = 98{,}304$，$\Delta\mathcal{I} = \frac{3}{4},\, b_1 = 0,\, \tau_2 = \mathbf{\frac{3}{4}}$）；`M3` 并入 `Node 3 = (1,-1,1,1)` 与双边 `2→3 [7], 1→3 [3]`（门 $\frac{3}{4}$，$N_3 = 73{,}728$，$\Delta\mathcal{I} = \frac{2}{3},\, \Delta b_1 = +1,\, b_1 = 1,\, \tau_3 = \mathbf{\frac{29}{12}}$）；`M4` 并入 `Node 4 = (1,1,-1,1)` 与边 `3→4 [11]` 张满四维有理空间 $\mathbb{Q}^4$（门 $\frac{5}{9}$，$N_4 = 40{,}960$，指数 $(13,0,1,0,0)$，$\Delta\mathcal{I} = \frac{1}{2},\, b_1 = 1,\, \tau_4 = \mathbf{\frac{35}{12}}$）；
   - **对称破缺桥与素旋子唤醒（`M7`–`M8`）**：经 `M5`（$\tau_5 = \frac{47}{12}$）、`M6`（$\tau_6 = \frac{59}{12}$）后，`M7` 并入 $5d^8$ 四极晶核 `Node 7 = (1,-1,1,-1)` 与双边 `6→7 [11], 4→7 [4]`（门 $\frac{5}{9}$，$N_7 = 12{,}800$，指数 $(9,0,2,0,0)$，$\Delta\mathcal{I} = 0/1,\, \Delta b_1 = +1,\, b_1 = 4,\, \tau_7 = \mathbf{\frac{71}{12}}$）；`M8` 并入赫克晶核 `Node 8 = (1,1,-1,-1)` 与双边 `7→8 [10], 2→8 [11]`，首次唤醒 $p = 7$（门 $\frac{7}{25}$，$N_8 = 3{,}584$，指数 $(9,0,0,1,0)$，$b_1 = 5,\, \tau_8 = \mathbf{\frac{83}{12}}$）；
   - **十二核满员与脚手架自擦除（`M12`–`M13`）**：`M12` 并入末核 `Node 12 = (0,0,0,1)` 与双边 `11→12 [10], 8→12 [9]`，集齐全部 $12$ 枚射影赫维茨单位元（门 $\frac{3}{4}$，$N_{12} = 840$，指数 $(3,1,1,1,0)$，$(V,E,c) = (12,20,1)$，$b_1 = 9,\, \tau_{12} = \mathbf{\frac{131}{12}}$）；`M13` 执行 `[a, c, c] = a` 脚手架擦除审计（门 $\frac{3}{4}$，$N_{13} = 630$，$\Delta\mathcal{I} = 0/1,\, \Delta b_1 = 0,\, \tau_{13} = \mathbf{\frac{131}{12}}$）；
   - **终极闭环停机与幂等重放（`M14`–`M16` 及重放）**：经 `M14` 焊合边 `5→12 [8]`（门 $\frac{5}{9}$，$N_{14} = 350$，$b_1 = 10,\, \tau_{14} = \frac{143}{12}$）与 `M15` 全边一致性审计（门 $\frac{7}{25}$，$N_{15} = 98 = 2\cdot 7^2$，$\tau_{15} = \frac{143}{12}$）后，**`M16`** 命中首门 $\frac{11}{49}$ 停机于 **$N_{16} = \mathbf{22} = 2\cdot 11$**（指数 $(1,0,0,0,1)$）并闭合弦 `3→12 [6]`（验证 $\overline{(1,-1,1,1)}\cdot(0,0,0,1) = (1,-1,-1,1) = \text{Node } 6$），定格于 $(V,E,c) = (12,22,1)$、$\Delta\mathcal{I}_{\mathrm{Schur}} = \mathbf{0/1}$、$\Delta b_1 = \mathbf{+1}$、$b_1 = \mathbf{11}$ 与 $\tau_{16} = \mathbf{\frac{155}{12}}$；再次执行全网重放扫描严格输出 $\Delta\mathcal{I}_{\mathrm{Schur}} = \mathbf{0/1},\; \Delta b_1 = \mathbf{0},\; \Delta\tau = \mathbf{0/1}$。
:::

---

**渡河的平直竹筏在 `[a, c, c] = a` 中悄然化尽，球面上只留十二颗整数晶核咬合成环——语言与对象同构，证明与运行合一，理解宇宙的过程本身，就是宇宙在观察者内部完成的一次零公理有理结晶！**

在下面的完整三维实验室中，依次巡览六大支柱去近似重编译、金 $5d^{10}/5d^8$ 四极切片、$p = 5$ 赫克—拉马努金有理半正定壳、十二晶核 Atlas 有向无环图结晶与五素数 $\Omega$-FRACTRAN 停机五张实验卡，亲手推动里程碑滑杆从 `M1` 走到 `M16`，目睹品红平直脚手架（$\pi, e, \varphi, \infty, \lim$）在 `M13` 尽数蒸发、五座素数塔在 `M16` 锁定于 $N_{16} = 22$ 与 $\tau = \frac{155}{12}$ 的零泄漏自指不动点：从第一章第一道两子内积投影出发，纵贯十部三十九章的全部主章论证至此彻底合拢收官！现在，怀揣这枚内外澄明的有理晶球，让我们推开最后一道门扉，步入全书 **[终章 在所有的球之外](coda.md)**。

::: {.viz src="omega-math-recompilation-atlas-sandbox" height="620"}
完整实验室：在“OmegaMath 零公理纯有理重编译透镜 · ProjTernion / QRat / 4p 正定核”与“经典平直过渡脚手架对照透镜（MODEL）· π · e · cos · √ · lim 蒸发前阴影”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览六大支柱去近似重编译、`Au⁺ (5d¹⁰)` 对比 `Au³⁺ (5d⁸)` 有理四极切片、$p = 5$ 素旋子赫克算子半正定界、十二晶核 Atlas DAG 结晶与 `[a, c, c] = a` 脚手架自擦除，以及五素数 `{2, 3, 5, 7, 11}` $\Omega$-FRACTRAN 十六阶不动点停机五张实验卡，支持点选六大支柱与调节去近似度 $\beta$、切换 $5d$ 轨道空穴与十二节点旋转平均、巡检 $j \in \{0, 1/2, 1, 3/2, 2\}$ 赫克裕度 $20 - \lambda^2$ 及拖动里程碑 `M1 … M16` 滑杆与幂等回放按钮，并在底部两条对照小图中随卡片同步追踪（左图：弧度尺对比 $\kappa = \cos^2\varphi$、四极三对角元、各自旋壳 $\lambda^2$ 对上界 $4p = 20$、图谱点边环计数或素指数总方块数；右图：十六站结构时间 $\tau_m$、环路秩 $b_1$ 与平直脚手架清零曲线）。十六条冻结 `LEAN ✓` 声明、`ARGUED` 文献、`MODEL` 自指图谱对照、`NUM` 精确分数账本与红色 `OPEN` 高阶自守边界在依据栏与理论抽屉中严格分层列出。
:::
