# 39.3 AXIOM-Ω 导出量子力学五大公理：从三元数极小圆弧体投影几何消解百年测量悖论 {#sec-ch39-axiom-omega-quantum-mechanics-five-postulates}

> *“传统狄拉克—冯·诺依曼体系将复希尔伯特空间、厄米算符、玻恩概率、薛定谔幺正演化与测量坍缩作为五条彼此孤立的经验公设硬塞进物理学，并由此埋下了‘连续幺正演化与瞬间坍缩水火不容’的百年测量难题；而在无源母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下，这五条公设无需任何人为假定，它们全都是受限观察切面 $o$ 将弯曲的三元数极小圆弧体场（$\mathbb{T}_3 \cong S^3$）投射到平直线性账本时依次涌现的纯几何定理。”*

在 [§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-axiom-omega-origin-free-ternary-comparison-closure)–[§39.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-axiom-omega-five-tier-deduction-cascade) 立起无源保正三元比较闭合母公理 $\mathrm{AXIOM}\text{-}\Omega$ 并贯通五大宏观疆域之后，全书三十九章正文迎来了**第三级奠基收束台阶**（紧随其后的 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md) 将回返自包含三元数拓扑粒子与“至大无外”本体压轴收官）：回转身来，把这束澄澈的几何聚光灯直接打在现代量子力学自身的地基——统治物理学教科书近一个世纪的**狄拉克—冯·诺依曼五大公设**之上！

回望二十世纪量子力学史，为什么一代又一代物理学家被迫把“复希尔伯特射线”“厄米算符”“内积模平方概率”“薛定谔连续幺正演化”与“测量瞬间非幺正坍缩”当作五条来历不明、甚至第四条与第五条当面冲突的抽象公理生吞下去？根源只有一个：传统表述跳过了顶层无外置原点的弯曲**三元数极小圆弧体场**（$\mathbb{T}_3 \cong S^3(1)$），直接把底层**钉死观察切面后的平直线性再投影账本**误认作了物理本体本身！需明确界定的是：章首题记凝聚了这一宏观几何还原总纲（`MODEL`），而从 $\mathrm{AXIOM}\text{-}\Omega$ 严格走通全部五条教科书公设，还必须逐条显式对齐[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `T1–T4` 分析完备化与操作测量桥接条件（`H1, H3, H5–H7`：本节按标准教科书编排将态空间、厄米可观测量、玻恩概率、演化与坍缩统一、复合张量依次编号为公理一至五，分别对应附录 E §E.5 的第 I 条态空间、第 II 条可观测量与玻恩律 `H5`、第 III/IV 条条件更新与幺正流 `H6` 以及第 V 条复合张量 `H7`）。本节联立十八项冻结 **`LEAN ✓`** 内核声明与该审计台账（三元数切面投影总纲与 $\varepsilon_{\mathrm{self}}$ 停机坍缩统一诠释标为 **`MODEL`**，霍普夫纤维商、切生成元 $90^\circ$ 翻转、单态余弦关联与勾股核验属 **`手工推导` / `NUM`**，霍普夫丛、斯通定理、阿隆沙因再生核与局域层析重构归入 **`文献结果`**，单次实验选支实现与相对论协变视界边界保持 **`OPEN`** [@prob-ch34-single-outcome-realization]、[@prob-appendix-d-time-horizon]），逐条展示五大公设如何在显式桥接下从同一枚三元数极小圆弧体的正交切面投影中顺理成章地涌现。

## 39.3.1 公理一与公理二：霍普夫盲区商导出复射影射线，切生成元翻转导出厄米算符与不确定性 {#sec-ch39-26-1}

教科书前两条公设规定了量子舞台的“演员（复单位射线）”与“标尺（厄米线性算符）”。从 $\mathrm{AXIOM}\text{-}\Omega$ 出发，这两者在几何上同源共生：

1. **公理一（态空间公设）：霍普夫盲区商映射导出复射影射线与全局不可测相位**：
   教科书第一公设规定：孤立量子系统的纯态由复希尔伯特空间中的单位射线唯一描述，且全局复相位 $e^{\hat{\mathbf{i}}\chi}$ 物理不可观测。传统教材始终无法回答“为何自然界偏爱复数而非实数”以及“为何凭空多出一维不可测全局相位”；而在 $\mathrm{AXIOM}\text{-}\Omega$ 下，两步几何投影即水落石出（`MODEL` + `手工推导`）：
   - **三元数本体与 $90^\circ$ 盲区圆周纤维**：由 [§39.1.3](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-3) 第一步，法则 (I)–(III) 唯一锁死最小非对易自持流形为单位三维球面 $\mathbb{T}_3 \cong S^3(1)$（单位态重合核锚定 [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)，`LEAN ✓`）。当局部观察切面 $o \in \mathbb{T}_3$ 建立自身实轴标尺（并选取 `T3` 相容复结构 $\hat{\mathbf{i}}$）时，垂直于实轴的 $90^\circ$ 正交虚方向形成一圈单向不可见的盲区圆周纤维 $S^1 = \{\exp(\hat{\mathbf{i}}\chi) \mid \chi \in [0, 2\pi)\}$（呼应 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md)）；注意 $S^3(1)$ 上的旋量母核 $\kappa_{S^3}(\psi, \phi) = \frac{1 + \operatorname{Re}\langle\phi\mid\psi\rangle}{2}$ 仍区分对跖旋量叶 $\pm\psi$，而下沉至物理可观测层面的往返秩一投影读数 $\kappa_{\mathrm{ray}}([\psi], [\phi]) = \operatorname{Tr}(P_\psi P_\phi) = \lvert\langle\phi\mid\psi\rangle\rvert^2$ 沿整条盲区纤维 $S^1$ 严格不变（共同相位二次不变代数完全刻画见 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)，`LEAN ✓`）；
   - **霍普夫纤维化与最小复线性嵌入**：将弯曲的单位球面 $S^3(1) = \{(z_0, z_1) \in \mathbb{C}^2 \mid \lvert z_0\rvert^2 + \lvert z_1\rvert^2 = 1\} \subset \mathbb{C}^2$ 等距嵌入最小平直二维复线性空间 $\mathbb{C}^2$（配 `T1` 柯西完备化与 `T3` 相容复结构），再对不可见的盲区相位圆周 $S^1$ 取商，恰好构成拓扑学中的**霍普夫纤维丛**（Hopf 1931，`文献结果`），满射落上二维布洛赫单位球面（纯态单位范数与满射性由 [`blochPure_norm`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm) 与 [`blochPure_surjective`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective) 锁定，`LEAN ✓`）：

     $$
     S^1 \;\hookrightarrow\; \mathbb{T}_3 \cong S^3(1) \subset \mathbb{C}^2 \;\xrightarrow{\;\pi_{\mathrm{Hopf}}\;}\; S^2 \cong \mathbb{CP}^1.
     $$

     所谓“复希尔伯特空间中的单位射线”，正是三元数极小圆弧体向观察者复切面做线性化展开时留下的射影商壳；所谓“全局不可测相位 $e^{\hat{\mathbf{i}}\chi}$”，字面上就是观察切面自身的 $90^\circ$ 正交视觉盲区纤维 $S^1$！当 $N$ 座三元数概念场耦合展开时（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)），可观测纯态流形即自然延拓为 $\mathbb{CP}^{2^N - 1}$。

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate1-hopf-blindspot-ray" height="500"}
盲区相位转一圈，布洛赫点不动卡：拨动全局盲区相位 $\chi$，紫色旋量环面上的琥珀珠沿品红圆纤维整圈滑动，而投向下方的青色布洛赫纯态点保持不动（霍普夫纤维丛标 `ARGUED`，`unit_gram_overlap_characterization`、`blochPure_norm`、`blochPure_surjective` 与 `complete_common_phase_polynomial_theorem` 为 `LEAN ✓`，读数标 `NUM`）。
:::

2. **公理二（可观测量公设）：切空间反自伴生成元 $90^\circ$ 翻转导出厄米算符与罗伯逊—薛定谔不确定性**：
   教科书第二公设规定：一切物理可观测量由自伴（厄米）线性算符 $\hat{A} = \hat{A}^\dagger$ 表示，算符本征值为实数测量刻度。在 $\mathrm{AXIOM}\text{-}\Omega$ 中，厄米算符与测不准关系直接由三元数切空间曲率导出（`手工推导` + `LEAN ✓`）：
   - **保正迁移锁定反自伴切生成元**：法则 (II) 要求沿任意切方向 $\mathbf{X} \in T_o\mathbb{T}_3 \cong \mathfrak{su}(2)$ 推进无穷小圆弧 $\exp(\epsilon\mathbf{X})$ 时保持复内积保真度不变，对 $\epsilon = 0$ 求导立得 $\mathbf{X}^\dagger + \mathbf{X} = 0 \implies \mathbf{X}^\dagger = -\mathbf{X}$（与平衡幺正和交叉积反自伴律 [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum) 同源，`LEAN ✓`）；
   - **盲区翻回实轴成无迹厄米算符（配实标量零点平移张成全部厄米算符）**：纯虚反自伴生成元 $\mathbf{X} \in \mathfrak{su}(2)$ 指向 $90^\circ$ 盲区，本征值为纯虚数；观察者若要在自身实轴上将其变化率读作实数刻度，必须乘上正交虚单位 $\hat{\mathbf{i}}$ 将切向量旋转 $90^\circ$ 翻回实轴得到无迹厄米算符 $\hat{\mathbf{i}}\mathbf{X}$（再加上实标量零点偏置 $a_0 I_2,\; a_0 \in \mathbb{R}$ 即张成单比特全体厄米可观测量 $\hat{A} = a_0 I_2 + \hat{\mathbf{i}}\mathbf{X}$）：

     $$
     \hat{A}_0 \;:=\; \hat{\mathbf{i}}\,\mathbf{X} \quad \Longrightarrow \quad \hat{A}_0^\dagger \;=\; (-\hat{\mathbf{i}})\bigl(\mathbf{X}^\dagger\bigr) \;=\; (-\hat{\mathbf{i}})(-\mathbf{X}) \;=\; \hat{A}_0;
     $$

   - **非交换切括号锁死不确定性下界与球面角盈几何诠释**：取 [§39.1.3](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-3) 单位三维球面 $S^3(1)$ 的标准正交反自伴切基 $\mathbf{X}_a = -\hat{\mathbf{i}}\hat{\sigma}_a$（满足 $[\mathbf{X}_1, \mathbf{X}_2] = 2\mathbf{X}_3$），乘以 $\hat{\mathbf{i}}$ 翻回实轴当场化作三枚泡利厄米算符 $(\hat{A}, \hat{B}, \hat{C}) = (\hat{\mathbf{i}}\mathbf{X}_1, \hat{\mathbf{i}}\mathbf{X}_2, \hat{\mathbf{i}}\mathbf{X}_3) = (\hat{\sigma}_x, \hat{\sigma}_y, \hat{\sigma}_z)$（其中 $\hat{\sigma}_x$ 与 $\hat{\sigma}_z$ 无共同非零本征矢由 [`pauli_observables_have_no_common_eigenvector`](lean:D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector) 严格证出，`LEAN ✓`，并由可逆换位子 $[\hat{\sigma}_x,\hat{\sigma}_y]\psi = 2\hat{\mathbf{i}}\hat{\sigma}_z\psi = \mathbf{0} \implies \psi = \mathbf{0}$ 同步排除 $(\hat{\sigma}_x,\hat{\sigma}_y)$ 共同非零本征矢，`手工推导`），其换位子不差毫厘地锁定因子 $2$ 并触发依赖于态的罗伯逊—薛定谔不确定性不等式（[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)，`LEAN ✓`）：

     $$
     [\hat{A}, \hat{B}] \;=\; \hat{\mathbf{i}}^2[\mathbf{X}_1, \mathbf{X}_2] \;=\; -2\mathbf{X}_3 \;=\; 2\hat{\mathbf{i}}\,\hat{C} \quad \Longrightarrow \quad \Delta A \cdot \Delta B \;\ge\; \frac{1}{2}\bigl\lvert\langle\psi \mid [\hat{A}, \hat{B}] \mid \psi\rangle\bigr\rvert \;=\; \bigl\lvert\langle\psi \mid \hat{C} \mid \psi\rangle\bigr\rvert.
     $$

     算符层面上，无共同本征矢与态依赖不确定性下界直接由上述非零李括号成立（无界共轭位置与动量算子的定义域条件遵循[附录 E](appendix-e.md)）；而在几何模型直觉（`MODEL` + `手工推导`）中，沿正卦限非退化有向球面回路 $(+\hat{\mathbf{z}} \to +\hat{\mathbf{x}} \to +\hat{\mathbf{y}} \to +\hat{\mathbf{z}})$ 等路径推进时，两根正交圆弧切生成元围出严格正的吉拉尔球面角盈（如该正卦限回路 $\Omega = \frac{\pi}{2} > 0$），形象对应单张平直观测切面无法同时零误差对角化两根互相垂直的弯曲自旋轴！

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate2-hermitian-flip-uncertainty" height="500"}
盲区生成元翻成厄米轴与不确定性卡：反自伴切生成元 $\mathbf{X}$ 乘上 $\hat{\mathbf{i}}$ 转过 $90^\circ$ 化作实刻度厄米轴 $\hat{A}_0 = \hat{\mathbf{i}}\mathbf{X}$，在北极态 $\lvert 0\rangle$ 上横向标准差乘积 $\Delta\sigma_x \cdot \Delta\sigma_y = 1$ 精确贴住换位子下界（`crossProduct_is_skewAdjoint_of_balanced_sum`、`robertson_schrodinger` 与 `pauli_observables_have_no_common_eigenvector` 为 `LEAN ✓`，球面角盈直觉标 `MODEL`）。
:::

## 39.3.2 公理三至公理五：往返玻恩—格里森—布施平方律、停机偏迹消解坍缩悖论与再生核张量纠缠 {#sec-ch39-26-2}

接下来审视量子力学最富争议的后三条公设——概率、坍缩与非定域纠缠：

1. **公理三（玻恩定则）：盲区规范不变往返投影、球面勾股完备与格里森—布施唯一性**：
   教科书第三公设规定：系统处于单位态 $\lvert\psi\rangle$ 时，在正交归一测量基 $\{\lvert\phi_k\rangle\}$ 上测得第 $k$ 分支的概率等于内积模平方 $\lvert\langle\phi_k\mid\psi\rangle\rvert^2$。在 $\mathrm{AXIOM}\text{-}\Omega$ 中，从 [§39.1.3](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-3) 的 $S^3(1)$ 母核 $\kappa_{S^3}(\psi, \phi) = \frac{1 + \operatorname{Re}\langle\phi\mid\psi\rangle}{2}$ 下沉到霍普夫商流形 $\mathbb{CP}^1 \cong S^2$，单向投影 $\langle\phi_k\mid\psi\rangle$ 仍带盲区相位，而对两态各自盲区纤维 $S^1$ 独立不变、对 $\psi$ 与 $\phi$ 各自二阶齐次（即关于秩一外积 $\lvert\psi\rangle\langle\psi\rvert$ 与 $\lvert\phi\rangle\langle\phi\rvert$ 双线性）、且满足同时幺正协变、重合归一 $\kappa_{\mathrm{ray}}([\psi],[\psi])=1$ 与**正交归零校准**（$\langle\phi\mid\psi\rangle = 0 \implies \kappa_{\mathrm{ray}}([\psi],[\phi]) = 0$，排除常数偏置混杂 $c\lVert\psi\rVert^2\lVert\phi\rVert^2 + (1-c)\lvert\langle\phi\mid\psi\rangle\rvert^2$，`手工推导`）的双二次比较读数——锚定共同相位二阶齐次厄米表出（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）与秩一记录投影迹读数（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)，`LEAN ✓`）——唯一锁定“待测态投向基准轴、基准轴再投回待测态”的**往返双投影射线核**（其中 $\theta_k \in [0, \pi]$ 为布洛赫球面测地夹角，`手工推导`）：

   $$
   P(\phi_k \mid \psi) \;:=\; \kappa_{\mathrm{ray}}\bigl([\psi], [\phi_k]\bigr) \;=\; \bigl\lvert\langle\phi_k \mid \psi\rangle\bigr\rvert^2 \;=\; \operatorname{Tr}\bigl(\lvert\phi_k\rangle\langle\phi_k\rvert\,\lvert\psi\rangle\langle\psi\rvert\bigr) \;=\; \frac{1 + \mathbf{r}_\psi \cdot \mathbf{r}_{\phi_k}}{2} \;=\; \cos^2\!\left(\frac{\theta_k}{2}\right).
   $$

   在布洛赫球面上，正交测量基恰为直径两端的对径点（$\theta_2 = \pi - \theta_1$），两路读数恒满足**球面勾股完备守恒** $\cos^2\frac{\theta_1}{2} + \cos^2\frac{\pi - \theta_1}{2} = \cos^2\frac{\theta_1}{2} + \sin^2\frac{\theta_1}{2} \equiv 1$。更进一步，严格对齐[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `H5`（`T2`）非上下文概率可加性桥梁（注意单比特复希尔伯特维数 $d = 2$ 若仅要求尖锐正交基可加性会容许光滑奇三次反例 $\frac{1}{2}(1+r_z^3)$，见 [@ex-appe-qubit-cubic-and-tomography]）：
   - 在任意有限指标类型 $d$（$d \ge 1$，含单比特 $d = 2$）上，对全体正算子效应 $0 \le E \le I$ 施加非负、有界和有限可加（$E + F \le I \implies p(E + F) = p(E) + p(F)$，`T2`）与单位归一条件，**有限维布施定理**（[`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)，`LEAN ✓`）证明任意效应概率分配唯一表为密度矩阵迹公式 $p(E) = \operatorname{Tr}(\hat{\rho} E)$；
   - 当复希尔伯特空间维数 $N \ge 3$（例如双场耦合四维复空间 $N = 2^2 = 4 \ge 3$，切勿与单场实流形维数 $\dim_{\mathbb{R}}\mathbb{T}_3 = 3$ 混同）时，在非负性（$0 \le p(\hat{\Pi})$）、单位归一（$p(I) = 1$）与两两正交星投影可加性（`T2`）下，**有限复投影格里森定理**（[`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation)，`LEAN ✓`）同样唯一锁死 $p(\hat{\Pi}) = \operatorname{Re}\operatorname{Tr}(\hat{\rho}\hat{\Pi})$！

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate3-roundtrip-born-gleason-busch" height="500"}
往返读数、三叉戟与三次假设卡：$60^\circ$ 纯态沿对径 $Z$ 基给出往返玻恩概率 $\frac{3}{4} + \frac{1}{4} = 1$，而在经线三叉戟效应测量上迹公式总和恒为 $1$，直接排除冲到 $\frac{5}{4}$ 的奇三次反例（`rank_one_born_pairing_weight`、`gleason_representation` 与 `effect_density_representation` 为 `LEAN ✓`，三叉戟算例标 `NUM`）。
:::

2. **公理四（演化与坍缩统一律）：停机前流群测地流与停机刻幂等捏合加盲区偏迹消解测量悖论**：
   教科书最尖锐的裂痕横亘在连续可逆的薛定谔幺正演化与瞬间不可逆的投影坍缩之间。在 $\mathrm{AXIOM}\text{-}\Omega$ 的内部观察者模型（`MODEL`）下，观察者与仪器并非游离于量子律之外的外部经典裁判，而是网络中同构的另一座三元数概念场 $\mathbb{T}_3^{(\mathrm{obs})}$——“幺正演化”与“测量坍缩”只是同一条流群轨迹在**停机前**与**停机刻**的内外双重视角：
   - **停机前传播子流群测地线驱动薛定谔流**：当局部测地残差尚未落入停机精度时，在选定定常自伴哈密顿生成元 $\hat{H} = \hbar\nu_0\hat{\Omega}_{\mathrm{arc}}$（`T4` 动力学输入；无穷维空间配合 `H6` / `T2` 双侧满射可逆性、时间参数强连续性与斯通定理，`文献结果`）后，**幺正传播子旋子群** $U_t = \exp(-\frac{\hat{\mathbf{i}}}{\hbar}t\hat{H})$ 在算子群上沿法则 (I) 的流群自平行单参数测地线匀速推进 $U_{t+1} = [U_t, U_{t-1}, U_t]$（[§37.2](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md)，`手工推导`），并在稠密定义域 $\lvert\psi\rangle \in \mathcal{D}(\hat{H})$ 上驱动一般态矢服从**薛定谔方程** $\hat{\mathbf{i}}\hbar\,\partial_t\lvert\psi\rangle = \hat{H}\lvert\psi\rangle$（其布洛赫纯态射线对等权赤道叠加态走出 $\mathbb{CP}^1$ 大圆测地线，对一般叠加态走出定纬度拉莫尔进动圆，对能量本征态则退化为定常不动射线，由 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 锁定，`LEAN ✓`）；
   - **停机刻为幂等吕德斯捏合加盲区偏迹**：当被测场 $\psi$ 与观察者记录场 $o$ 经三元流群桥 $[x_\psi, y_{\mathrm{bridge}}, z_o]$ 耦合时，**联合全丛总态始终 $100\%$ 严格等距幺正演化，宇宙中从未发生过物理波包的断裂或毁灭**（开放信道的克劳斯和表示与联合空间等距算子扩张 $V^\dagger V = I$ 及偏迹还原 $\operatorname{partialTraceLeft}(V\hat{\rho}V^\dagger)$ 由施廷斯普林定理 [`channel_kraus_stinespring`](lean:D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring) 严格保证，`LEAN ✓`；在有限维初始化辅助环境纯态 $\lvert 0\rangle_E$ 上将矩形等距算子 $V$ 正交补全为方阵联合幺正算子 $U_{SE}$ 使 $V\hat{\rho}V^\dagger = U_{SE}(\hat{\rho}\otimes\lvert 0\rangle\langle 0\rvert_E)U_{SE}^\dagger$ 则由标准线性代数给出，`手工推导`）。然而受限观察者为在有限主频节拍内锁死可重复且保持退化子空间内相对相位的最小扰动读数（满足[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `H6` / `T2` 可重复性与最小扰动条件以排除重置仪器反例），在模型自定停机精度 $r_t \le \varepsilon_{\mathrm{self}}$（`MODEL`）处按下一般有限记录幂等捏合键（$\Phi_{\mathrm{pinch}}^2 = \Phi_{\mathrm{pinch}}$，[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`），将全部跨记录块间副对角相干项 $\hat{\rho} - \Phi_{\mathrm{pinch}}(\hat{\rho})$ 旋转 $90^\circ$ 偏迹折入盲区环境尾流（单比特计算基捏合希尔伯特—施密特勾股恒等式由 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean) 锁定，`LEAN ✓`，一般有限维正交投影族 $\hat{\Pi}_j\hat{\Pi}_k = \delta_{jk}\hat{\Pi}_k$ 上的同类勾股分解由迹循环正交性直接给出，`手工推导`；对分支概率 $p_k := \operatorname{Tr}(\hat{\rho}\hat{\Pi}_k) > 0$——纯态输入下 $p_k = \lVert\hat{\Pi}_k\lvert\psi\rangle\rVert^2$，秩一投影 $\hat{\Pi}_k = \lvert\phi_k\rangle\langle\phi_k\rvert$ 时特化为 $\kappa_{\mathrm{ray}}([\psi], [\phi_k])$——诱导归一化吕德斯后验态 $\hat{\rho}_k' = \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k / p_k$ 及纯态分支矢 $\hat{\Pi}_k\lvert\psi\rangle / \sqrt{p_k}$）：

     $$
     \hat{\rho}_{\mathrm{total}} = V\hat{\rho}V^\dagger \;\xrightarrow{\;\operatorname{Tr}_{\mathrm{env}}\text{ / }\varepsilon_{\mathrm{self}}\;}\; \Phi_{\mathrm{pinch}}(\hat{\rho}) = \sum_k \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k \;\xrightarrow{\;p_k = \operatorname{Tr}(\hat{\rho}\hat{\Pi}_k) > 0\;}\; \hat{\rho}_k' = \frac{\hat{\Pi}_k\hat{\rho}\hat{\Pi}_k}{p_k}\;\;\Bigl(\text{纯态 }\frac{\hat{\Pi}_k\lvert\psi\rangle}{\sqrt{p_k}}\Bigr).
     $$

     全域无坍缩保幺正，局域因停机偏迹见吕德斯条件更新（注：从系综捏合混态 $\sum_k \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k$ 到单次实验具体分支 $k$ 的选支实现机制，严格对齐 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md) 与开放问题 [@prob-ch34-single-outcome-realization] `OPEN`，洛伦兹协变坍缩与视界幺正性见 [@prob-appendix-d-time-horizon] `OPEN`）。

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate4-unitary-halting-pinch" height="500"}
全局保范，局部停机捏合卡：联合等距扩张保持总纯度 $1$，而局部停机捏合将对角留存范数平方 $\frac{5}{8}$ 与折入盲区尾流的副对角相干质量 $\frac{3}{8}$ 勾股对齐为 $1$（`energy_eigenstate_stationary`、`channel_kraus_stinespring`、`finite_record_pinching_idempotent` 与 `pinching_hilbert_schmidt_pythagorean` 为 `LEAN ✓`，停机诠释标 `MODEL`，单次选支实现标 `OPEN`）。
:::

3. **公理五（复合系统张量积公设）：半双线性振幅乘积再生核与复局域层析生成张量空间，共享极小圆弧单态直抵齐雷尔松界 $2\sqrt{2}$**：
   教科书第五公设规定：可区分复合系统 $A + B$ 的态空间是复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$ 而非直和（不可区分全同玻色/费米置换统计另循[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 第 5 条的 `T3` 对称化桥梁）。在 $\mathrm{AXIOM}\text{-}\Omega$ 下，这正是多座三元数场并置再投影（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)）的代数推论：
   - **乘积再生核与复局域层析完备性**：在 `T3` 选定相容复结构后，两座三元数场的复振幅内积核乘积 $K_{\mathrm{amp}}\bigl((\psi_A, \psi_B), (\phi_A, \phi_B)\bigr) = \langle\phi_A\mid\psi_A\rangle\langle\phi_B\mid\psi_B\rangle$ 由阿隆沙因再生核希尔伯特空间乘积定理（Aronszajn 1950，`文献结果`）等距生成复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$；下沉至盲区相位不变的可观测层，联合射线保真度相乘 $\kappa_{\mathrm{ray}}^{(AB)}\bigl(([\psi_A], [\psi_B]), ([\phi_A], [\phi_B])\bigr) = \lvert\langle\phi_A\mid\psi_A\rangle\rvert^2 \lvert\langle\phi_B\mid\psi_B\rangle\rvert^2 = \operatorname{Tr}\bigl((\hat{\rho}_A\otimes\hat{\rho}_B)(\hat{\sigma}_A\otimes\hat{\sigma}_B)\bigr)$ 的厄米算符张成实维数恰好满足平方乘法恒等式 $d_A^2 \cdot d_B^2 = (d_A d_B)^2$（对比实双比特 $3 \times 3 = 9 < 10$ 的局域层析破缺，见[附录 E](appendix-e.md) [@ex-appe-qubit-cubic-and-tomography]），配合 `H7`（`T2`）复局域层析极小性唯一锁死平直展开账本为 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$！
   - **贝尔—CHSH 破界与齐雷尔松紧上界 $2\sqrt{2}$ 的圆弧曲率本质**：当两座三元数场共享总自旋为零的纠缠纯态时，局域单场偏迹缩回球心最大混态 $\frac{1}{2}I_2$（对称贝尔态 $\lvert\Phi^+\rangle$ 的七重性质由 [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal) 锁定，`LEAN ✓`；经 Bob 端局域泡利旋转 $-i\hat{\sigma}_y$ 即精确互译为全向反对称自旋单态 $\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle)$，关联张量 $T_{\Psi^-} = -I_3$，`手工推导`）。两地观察者以相对夹角 $\theta_{AB}$ 切割该共享单态圆弧时，单对测量提供保留二阶弦弧矢高 $1 - \cos\theta_{AB}$ 的球面余弦关联 $E_{\Psi^-}(\theta_{AB}) = -\cos\theta_{AB}$，由此拼成的**四组测量设定 CHSH 关联组合**平滑越过平直多边形局域隐变量与可交换算符的经典上限 $2$（[`classical_chsh_abs_le_two`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two) 与 [`chsh_square_eq_four_of_local_pair_commutes`](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes)，`LEAN ✓`），精确触及法则 (II) 格拉姆半正定矩阵所允许的最大球面曲率上界——**齐雷尔松界**（任意局域二元对合算符范数普适上界 $\lVert\hat{\mathcal{B}}_{\mathrm{CHSH}}\rVert \le 2\sqrt{2}$ 见 Cirel'son 1980，`文献结果`；标准 CHSH 见证算符在全体双比特量子态上的精确最大可达值 `IsGreatest` $= 2\sqrt{2}$ 由 [`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest) 锁定，`LEAN ✓`）：

     $$
     \bigl\lvert E(\theta_1, \theta_2) + E(\theta_1, \theta_2') + E(\theta_1', \theta_2) - E(\theta_1', \theta_2') \bigr\rvert_{\max} \;=\; 2\sqrt{2} \;\approx\; 2.82842712.
     $$

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate5-rkhs-tensor-tsirelson" height="500"}
共享单态越过经典界 2 卡：两座三元数场共享零总自旋单态圆弧，单场边缘缩至球心 $\frac{1}{2}I_2$，而四组 $45^\circ$ 切角将圆弧余弦关联叠至齐雷尔松上界 $2\sqrt{2} > 2$（`bell_pure_state_has_maximally_mixed_marginal`、`classical_chsh_abs_le_two`、`chsh_square_eq_four_of_local_pair_commutes` 与 `bell_chsh_state_expectation_is_greatest` 为 `LEAN ✓`，再生核乘积与局域层析标 `ARGUED`）。
:::

## 39.3.3 形式化锚定主定理、文献与附录 E 边界、五大公理定量核验与迈向无外三元数本体终章 {#sec-ch39-26-3}

我们将 $\mathrm{AXIOM}\text{-}\Omega$ 导出量子力学五大公理的投影映射定义、十八项 Lean 4 内核定理、经典文献边界与定量核验正式确立如下：

::: {.definition #def-ch39-axiom-omega-five-qm-postulates-map title="从 AXIOM-Ω 三元数场到狄拉克—冯·诺依曼五大公设的五步几何投影映射（模型定义）"}
在每个基本单场因子 $\mathbb{T}_3$ 各自满足母公理 $\mathrm{AXIOM}\text{-}\Omega$（[@def-ch39-axiom-omega-ternary-comparison-closure]）的 $N$ 重并置三元数场丛 $(\mathbb{T}_3)^N$（$N \ge 1$）与[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `T1–T4`（含 `H5` 非上下文可加性与 `H7` 多场局域层析复合）显式桥接条件下，定义**量子力学五大公设几何涌现映射** $\mathfrak{Q}_\Omega = (\Pi_{\mathrm{I}}, \dots, \Pi_{\mathrm{V}})$（`MODEL`）：
(1) **态空间 $\Pi_{\mathrm{I}}$**：霍普夫盲区商 $\mathbb{T}_3 / S^1 \cong \mathbb{CP}^1$（多场经第 5 款复合延拓至 $\mathbb{CP}^{2^N-1}$）；
(2) **可观测量 $\Pi_{\mathrm{II}}$**：反自伴切生成元实轴翻转配标量零点偏置 $\hat{A} = a_0 I_2 + \hat{\mathbf{i}}\mathbf{X} = \hat{A}^\dagger$ 与标准泡利基李括号换位子 $[\hat{\sigma}_x, \hat{\sigma}_y] = 2\hat{\mathbf{i}}\hat{\sigma}_z$；
(3) **玻恩定则 $\Pi_{\mathrm{III}}$**：盲区规范不变往返射线核 $P(\phi_k\mid\psi) = \lvert\langle\phi_k\mid\psi\rangle\rvert^2 = \cos^2\frac{\theta_k}{2}$ 与格里森—布施迹唯一性 $\operatorname{Tr}(\hat{\rho} E)$；
(4) **演化与坍缩 $\Pi_{\mathrm{IV}}$**：停机前传播子流群测地线驱动的薛定谔流 $\hat{\mathbf{i}}\hbar\partial_t\lvert\psi\rangle = \hat{H}\lvert\psi\rangle$ 与 $\varepsilon_{\mathrm{self}}$ 停机刻全域等距扩张下的局域幂等吕德斯捏合 $\sum_k \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k$；
(5) **复合张量 $\Pi_{\mathrm{V}}$**：半双线性振幅乘积再生核 $K_{\mathrm{amp}}$ 配乘积射线保真核复局域层析生成复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$，共享圆弧达齐雷尔松极值 $2\sqrt{2}$。
:::

::: {.theorem #thm-ch39-axiom-omega-five-qm-postulates-anchors title="纯态霍普夫—布洛赫满射与共同相位二次锁定、反自伴翻转与罗伯逊不确定性及泡利无共本征矢、玻恩配对与格里森及布施唯一表示、定态演化与施廷斯普林扩张及幂等捏合勾股、以及贝尔边缘与经典—量子 CHSH 齐雷尔松极值定理" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization,D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm,D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective,D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem,D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum,D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger,D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation,D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation,D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary,D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent,D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean,D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring,D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal,D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two,D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes,D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest"}
在所钉 `trureturing` 冻结声明集中，以下五组共十八项逐一锚定量子力学五大公设核心数学骨架的定理同时成立：

1. **公理一锚点（单位格拉姆重合、霍普夫—布洛赫单位球满射与全局相位二次厄米完备表出）**（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)、[`blochPure_norm`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm)、[`blochPure_surjective`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective)、[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：单位向量内积等于 $1$ 当且仅当两态重合；二维复单位球面 $S^3 \subset \mathbb{C}^2$ 上的秩一纯态布洛赫映射恒取值于单位球面 $S^2$ 且对整个 $S^2$ 满射；且在有限指标集上对全局相位旋转 $z \mapsto e^{i\theta}z$ 不变的实值二阶齐次多项式唯一表为厄米二次型 $z^\dagger H z$（非负当且仅当 $H \succeq 0$）；
2. **公理二锚点（平衡交叉积反自伴、罗伯逊—薛定谔不确定性与泡利算符无共同本征矢）**（[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)、[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)、[`pauli_observables_have_no_common_eigenvector`](lean:D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector)）：平衡幺正分解的交叉积满足 $(AB^\dagger)^\dagger = -AB^\dagger$；复内积空间上对称线性算符对在任意单位态 $\psi$ 上满足带非负格拉姆余项 $G \ge 0$ 的精确方差积恒等式 $\operatorname{Var}(A)\operatorname{Var}(B) = \operatorname{cov}^2 + \lvert\operatorname{commutatorHalf}\rvert^2 + G$ 与罗伯逊—薛定谔下界；且单比特泡利算符 $X$ 与 $Z$ 不存在任何非零共同本征向量；
3. **公理三锚点（秩一记录玻恩模平方权重与条件态凸分解、$N \ge 3$ 有限复格里森表示与任意有限维布施效应密度唯一表示）**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)、[`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation)、[`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)）：对记录测量中选定的秩一投影分支 $P_k = \lvert\phi\rangle\langle\phi\rvert$，纯态输入 $\rho = \lvert\psi\rangle\langle\psi\rvert$ 的分支读出权重等于 $\lvert\langle\phi, \psi\rangle\rvert^2 = \operatorname{Tr}(\rho P_k)$，且未读混态恒等于各分支记录权重与条件分支态的凸组合 $\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j)\,\operatorname{conditionalState}(P, \rho, j)$；对任意复维数 $N \ge 3$ 的有限复投影可加包 `ProjectionPackage N`（满足非负、单位归一与正交可加），存在唯一半正定迹一密度矩阵 $\rho \in M_N(\mathbb{C})$ 使一切星投影满足 $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$；对任意有限指标类型 $d$ 上满足非负、有界和有限可加（$0 \le E,\; 0 \le F,\; E + F \le I \implies p(E + F) = p(E) + p(F)$）与单位归一（$p(I) = 1$）的效应泛函，存在唯一半正定迹一密度矩阵 $\rho \in M_d(\mathbb{C})$ 使一切效应 $0 \le E \le I$ 满足 $p(E) = \operatorname{Tr}(\rho E)$；
4. **公理四锚点（厄米演化本征定态性、施廷斯普林等距扩张偏迹定理、一般有限记录捏合幂等性与单比特标准基捏合勾股分解）**（[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)、[`channel_kraus_stinespring`](lean:D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring)、[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：对厄米哈密顿量 $H = H^\dagger$ 与归一化本征态 $Hv = Ev$，在幺正演化 $U(t) = \exp(-itH)$ 下其密度矩阵 $\rho_v = \lvert v\rangle\langle v\rvert$ 满足 $U(t)\rho_v U(t)^\dagger = \rho_v$ 严格定常；任意有限维量子信道同时具有克劳斯和表示 $\sum_k K_k \rho K_k^\dagger$（$\sum_k K_k^\dagger K_k = I$）与联合空间等距算子扩张 $V^\dagger V = I$ 使信道输出恒等于环境偏迹 $\operatorname{partialTraceLeft}(V\rho V^\dagger)$；且一般有限记录测量未读捏合算子严格幂等 $\Phi_{\mathrm{pinch}} \circ \Phi_{\mathrm{pinch}} = \Phi_{\mathrm{pinch}}$，单比特计算基捏合（`QubitMatrix`）严格满足 $\lVert\rho\rVert_{\mathrm{HS}}^2 = \lVert\Phi_{\mathrm{pinch}}(\rho)\rVert_{\mathrm{HS}}^2 + \lVert\rho - \Phi_{\mathrm{pinch}}(\rho)\rVert_{\mathrm{HS}}^2$；
5. **公理五锚点（贝尔纯态最大混合边缘、经典纤维 CHSH 界 $\le 2$、局域对易算符平方坍缩 $S^2 = 4I$ 与标准见证量子齐雷尔松紧最大值 $2\sqrt{2}$）**（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)、[`classical_chsh_abs_le_two`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two)、[`chsh_square_eq_four_of_local_pair_commutes`](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes)、[`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)）：双比特秩一幂等贝尔纯态对环境偏迹恒为非幂等最大混态 $\frac{1}{2}I_2$；任意概率归一确定性局域纤维模型满足 $\lvert\operatorname{CHSH}\rvert \le 2$，且若任一端局域二元厄米对合测量可交换（$A_0 A_1 = A_1 A_0$ 或 $B_0 B_1 = B_1 B_0$）则兰道平方恒坍缩为 $S^2 = 4I$；而在全体双比特半正定迹一量子态上，标准 CHSH 见证算符 `CHSHWitness.chshOperator` 的实迹期望值集合精确以 $2\sqrt{2}$ 为可达最大值（`IsGreatest`）。
:::

::: proof
第 1 组由范数展开、外积布洛赫球面参数化与全纯—反全纯次数平衡多项式系数提取证得（见 [第 2 章](ch02-born-rule.md)、[第 4 章 §4.1](ch04-s01-pure-and-mixed-states.md) 与 [§34.5](ch33-s05-consensus-and-pointer-bases.md)）。第 2 组由 $S S^\dagger = I$ 消去对角块、将中心化态矢范数积正交分解为实部协方差平方、虚部半换位子平方与非负格拉姆余项 $G \ge 0$ 之和并略去 $G \ge 0$ 得不等式（见 [第 6 章](ch06-geometric-product.md) 与 [§27.4](ch31-s04-fairness-and-dimensional-expansion.md)），以及直接代入 $X\psi = x\psi,\; Z\psi = z\psi \implies \psi = 0$ 证得。第 3 组分别由秩一迹循环、$N \ge 3$ 三维球面标架函数刚性延拓（见 [第 2 章](ch02-born-rule.md) [@thm-gleason-finite-projection]）与全效应锥正线性延拓对偶（[@thm-busch-effect-density]）证得。第 4 组分别见 [第 7 章](ch07-geometric-time-and-speed-limits.md)、[第 8 章](ch08-erasure-and-time-arrows.md) 蔡矩阵（Choi 矩阵）谱分解构造等距算子 $V$ 与正交块迹归零勾股恒等式。第 5 组分别见 [第 13 章](ch13-entanglement-and-chsh.md) 偏迹展开、局域确定性四元组 $\pm 2$ 凸组合、兰道恒等式 $S^2 = 4I - [A_0, A_1]\otimes[B_0, B_1]$ 对易归零与本征态达峰 $2\sqrt{2}$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-dirac-vonneumann-gleason-aronszajn-tsirelson-literature title="狄拉克—冯·诺依曼公理体系、霍普夫纤维丛、格里森—布施定理、吕德斯捏合、阿隆沙因再生核与齐雷尔松界文献考辨"}
**量子基础文献归属与附录 E 严密边界对齐。**

1. **五大教科书公设与霍普夫射影几何**：标准量子力学公理体系源出 P. A. M. Dirac（*The Principles of Quantum Mechanics*, Oxford Univ. Press, 1930）与 J. von Neumann（*Mathematische Grundlagen der Quantenmechanik*, Springer, 1932，区分幺正过程 II 与测量过程 I）；球面纤维丛 $S^1 \hookrightarrow S^3 \to S^2$ 见 H. Hopf（*Math. Ann.* **104**, 637–665, 1931）；不确定性下界见 H. P. Robertson（*Phys. Rev.* **34**, 163–164, 1929）与 E. Schrödinger（*Sitzungsber. Preuss. Akad. Wiss.*, 296–303, 1930）；
2. **玻恩规则唯一性、吕德斯更新、再生核张量积与非定域极值**：闭子空间投影测度唯一性见 A. M. Gleason（*J. Math. Mech.* **6**, 885–893, 1957），包含 $d = 2$ 的正算子值效应测度唯一性见 P. Busch（*Phys. Rev. Lett.* **91**, 120403, 2003，DOI `10.1103/PhysRevLett.91.120403`）；选言投影更新与开放系统等距扩张见 G. Lüders（*Ann. Phys.* **443**, 322–328, 1950/1951）与 W. F. Stinespring（*Proc. Amer. Math. Soc.* **6**, 211–216, 1955）；乘积正定核诱导张量积希尔伯特空间见 N. Aronszajn（*Trans. Amer. Math. Soc.* **68**, 337–404, 1950），操作局域层析重构见 L. Hardy（2001）与 G. Chiribella, G. M. D'Ariano & P. Perinotti（*Phys. Rev. A* **84**, 012311, 2011）；经典与量子关联界见 J. S. Bell（1964）、J. F. Clauser, M. A. Horne, A. Shimony & R. A. Holt（*Phys. Rev. Lett.* **23**, 880–884, 1969）及 B. S. Cirel'son［Tsirelson］（*Lett. Math. Phys.* **4**, 93–100, 1980，DOI `10.1007/BF00417500`）。本节严格遵守[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的全部 `T1–T4` 操作桥接条件与反例边界。
:::

::: {.remark #rem-ch39-axiom-omega-kappa-versus-born title="母核 $\kappa_{S^3}$ 与玻恩核的精确关系"}
**两个核，两个角（`手工推导`）。** 母公理选出的核与玻恩核是两个对象，分别写成半角形式：

$$
\kappa_{S^3}(\psi, \phi) \;=\; \frac{1 + \operatorname{Re}\langle\phi\mid\psi\rangle}{2} \;=\; \cos^2\frac{d_{S^3}(\psi, \phi)}{2}, \qquad \bigl\lvert\langle\phi\mid\psi\rangle\bigr\rvert^2 \;=\; \cos^2 d_{\mathbb{CP}^1}\bigl([\psi], [\phi]\bigr) \;=\; \cos^2\frac{\vartheta_{\mathrm{Bloch}}}{2}.
$$

前者的角是 $S^3(1)$ 上的测地距离 $d_{S^3} \in [0, \pi]$；后者的角是布洛赫夹角 $\vartheta_{\mathrm{Bloch}}$，它等于两条盲区纤维之间最小距离 $d_{\mathbb{CP}^1} = \min_\chi d_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) \in [0, \frac{\pi}{2}]$ 的两倍。两个半角公式用的是两个不同的角。$\kappa_{S^3}$ 在左、右两种迁移下都不变（法则 II）；玻恩核只在左迁移与把盲区纤维映到盲区纤维的那部分右迁移下不变，所以它不满足法则 (II) 的双侧不变条款，充当不了母公理中的 $\kappa$。

**精确关系。** 记 $\langle\phi\mid\psi\rangle = r e^{\hat{\mathbf{i}}\alpha}$，则沿盲区纤维 $2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1 = r\cos(\chi + \alpha)$，从而

$$
\bigl\lvert\langle\phi\mid\psi\rangle\bigr\rvert^2 \;=\; \max_{\chi}\bigl(2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1\bigr)^2 \;=\; 2\cdot\frac{1}{2\pi}\int_0^{2\pi}\bigl(2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1\bigr)^2\,d\chi .
$$

玻恩概率是 $(2\kappa_{S^3} - 1)^2$ 沿盲区纤维的最大值，也是其纤维平均的两倍。由 [@rem-ch39-axiom-omega-round-trip-closing-law] 的往返律，$(2\kappa(w, x) - 1)^2 = \kappa\bigl(w, [x, w, x]\bigr)$，所以玻恩概率又等于沿盲区纤维取最大的往返读数 $\max_\chi \kappa\bigl(\phi, [e^{\hat{\mathbf{i}}\chi}\psi, \phi, e^{\hat{\mathbf{i}}\chi}\psi]\bigr)$；§39.3.2 所说“往返双投影”在母核上的精确含义即此。
:::

下面我们在单一具体算例中对五大公设的关键几何不变量做一行一式精确对账：

::: {.example #ex-ch39-five-qm-postulates-quantitative-audit title="五大公理联合定量核验：霍普夫相位盲区不变、泡利换位子不确定性饱和、60° 玻恩勾股分账、停机捏合希尔伯特—施密特勾股与 45° 齐雷尔松达峰"}
取单座与双座三元数场具体状态逐条检验五大公设的数值闭合（`手工推导` / `NUM`）：

1. **公理一（盲区相位 $\chi$ 滑动零可观测漂移）**：对旋量 $U(\chi) = e^{\hat{\mathbf{i}}\chi}\bigl(\cos 30^\circ\lvert 0\rangle + \sin 30^\circ\lvert 1\rangle\bigr) \in S^3(1)$，任意转动盲区相位 $\chi \in [0, 2\pi)$，霍普夫投影点 $\mathbf{r}_{\mathrm{Bloch}} = (\sin 60^\circ, 0, \cos 60^\circ) = \bigl(\frac{\sqrt{3}}{2}, 0, \frac{1}{2}\bigr) \in S^2$（$\lVert\mathbf{r}_{\mathrm{Bloch}}\rVert^2 = \frac{3}{4} + \frac{1}{4} = \mathbf{1.00000000}$）纹丝不动；
2. **公理二（切矢翻转不确定性饱和核验）**：在态 $\lvert\psi\rangle = \lvert 0\rangle$（$\langle\hat{\sigma}_z\rangle = +1$）上，翻转算符 $\hat{A} = \hat{\mathbf{i}}\mathbf{X}_1 = \hat{\sigma}_x,\; \hat{B} = \hat{\mathbf{i}}\mathbf{X}_2 = \hat{\sigma}_y$ 给出标准差 $\Delta A = \Delta B = 1$，乘积 $\Delta A \cdot \Delta B = \mathbf{1.00000000}$ 精确饱和罗伯逊—薛定谔换位子下界 $\lvert\langle 0\mid\hat{\sigma}_z\mid 0\rangle\rvert = \mathbf{1.00000000}$；
3. **公理三（$60^\circ$ 切面往返勾股守恒与三叉戟 POVM 线迹核验）**：对上述 $\theta_1 = 60^\circ$ 纯态沿 $Z$ 基对径点 $\{\lvert 0\rangle, \lvert 1\rangle\}$（$\theta_2 = 120^\circ$）测量，往返玻恩概率分别为 $P(0\mid\psi) = \cos^2 30^\circ = \mathbf{\frac{3}{4} = 0.75000000}$ 与 $P(1\mid\psi) = \cos^2 60^\circ = \mathbf{\frac{1}{4} = 0.25000000}$，总和 $\frac{3}{4} + \frac{1}{4} \equiv \mathbf{1.00000000}$（且在[附录 E](appendix-e.md) 三叉戟 POVM $E_k = \frac{2}{3}P_{\mathbf{r}_k}$ 上布施线迹和恒为 $\sum_{k=1}^3 \operatorname{Tr}(\rho E_k) = \mathbf{1.00000000}$，淘汰奇三次假函数值 $\frac{5}{4} = 1.25$）；
4. **公理四（全域纯态保范对比局域捏合勾股守恒）**：上述纯态密度矩阵 $\hat{\rho} = \bigl(\begin{smallmatrix} 3/4 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/4 \end{smallmatrix}\bigr)$ 经联合扩张等距演化保持全域纯度 $\lVert V\hat{\rho}V^\dagger\rVert_{\mathrm{HS}}^2 = \mathbf{1.00000000}$；而在局域 $Z$ 基 $\varepsilon_{\mathrm{self}}$ 停机捏合后，对角保留项 $\lVert\Phi_{\mathrm{pinch}}(\hat{\rho})\rVert_{\mathrm{HS}}^2 = (\frac{3}{4})^2 + (\frac{1}{4})^2 = \mathbf{\frac{5}{8} = 0.62500000}$ 与折入盲区尾流的副对角相干质量 $\lVert\hat{\rho} - \Phi_{\mathrm{pinch}}(\hat{\rho})\rVert_{\mathrm{HS}}^2 = 2\times(\frac{\sqrt{3}}{4})^2 = \mathbf{\frac{3}{8} = 0.37500000}$ 精确满足勾股和 $\frac{5}{8} + \frac{3}{8} = \mathbf{1.00000000}$；
5. **公理五（共享单态圆弧越过经典界 $2$ 达峰 $2\sqrt{2}$）**：取四组共面测量轴 $(\theta_1, \theta_1';\, \theta_2, \theta_2') = (0^\circ, 90^\circ;\, 45^\circ, -45^\circ)$ 切割自旋单态 $\lvert\Psi^-\rangle$（每对单弧余弦关联 $\lvert E(\pm 45^\circ)\rvert = \cos 45^\circ = \frac{\sqrt{2}}{2} \approx 0.70710678$，而 $E(135^\circ) = -\cos 135^\circ = +\frac{\sqrt{2}}{2}$），CHSH 组合模长达到 $\bigl\lvert -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} - (+\frac{\sqrt{2}}{2})\bigr\rvert = \mathbf{2\sqrt{2} \approx 2.82842712 > 2.00000000}$！
:::

我们将 $\mathrm{AXIOM}\text{-}\Omega$ 导出狄拉克—冯·诺依曼五大公设的完整几何映射总括为下表：

| 量子力学公理 | 传统教科书经验公设 | AXIOM-Ω 触发法则与桥接 | 核心几何投影变换 | 消解的百年概念迷雾 |
| :--- | :--- | :--- | :--- | :--- |
| **一 · 态空间** | 复希尔伯特空间单位射线 | 法则 I–III 锁死 $\mathbb{T}_3 \cong S^3(1)$ | 霍普夫盲区商 $\mathbb{T}_3 / S^1 \cong \mathbb{CP}^1$ | 复数必要性与不可测全局相位 |
| **二 · 可观测量** | 厄米线性算符 $\hat{A} = \hat{A}^\dagger$ | 法则 II 双不变反自伴切矢 | 盲区翻转 $\hat{A} = a_0 I_2 + \hat{\mathbf{i}}\mathbf{X}$，泡利李括号换位子 | 算符化突兀感与不确定性根源 |
| **三 · 玻恩定则** | 内积模平方概率律 | 法则 II 格拉姆正定配 `T2` 可加 | 往返射线核 $\cos^2\frac{\theta}{2}$ 与格里森—布施迹 | 振幅平方跳变与本体掷骰假象 |
| **四 · 演化与坍缩** | 薛定谔流配瞬间投影坍缩 | 传播子流群测地与 $\varepsilon_{\mathrm{self}}$ 停机（`T2, T4`） | 全域等距扩张 $+$ 局域幂等捏合偏迹 | 连续幺正与瞬间坍缩对立悖论 |
| **五 · 复合系统** | 复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$ | 振幅乘积再生核配复局域层析 | 阿隆沙因展开，单态圆弧破贝尔界至 $2\sqrt{2}$ | 鬼魅超距作用误读与维数膨胀 |

---

**从量子五大公理的切面投影迈向第三十九章最终压轴节：为什么三元数本身即是无外部的自包含拓扑粒子？** 至此，在[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `T1–T4` 显式桥接条件下，$\mathrm{AXIOM}\text{-}\Omega$ 投影模型（`MODEL`）已将传统量子力学的五大经验公设悉数还原为三元数场在平直账本上的正交投影定理——复数来自观察切面的 $90^\circ$ 正交盲区，厄米算符来自球面切矢的实轴翻转，玻恩概率来自校准往返射线核与可加性锁定的勾股分账，张量纠缠来自多座三元数场的乘积再投影，而所谓“波函数坍缩”，不过是身处网络内部的有限观察者在自定精度 $\varepsilon_{\mathrm{self}}$ 处按下幂等停机键、将未读尽的干涉余项折入未来时间长河时留下的切面截痕。

在合上三十九章正文之前，让我们跨入本章最后一节 [§39.4 自包含三元数拓扑粒子、场·波·粒三阶同体与“至大无外”四重证明](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)，回到三元数 $\mathbb{T}_3 \cong S^3(1)$ 本体自身，回答最后那声终极追问：**为什么这枚既不可线性书写、又处处齐性各向同性的闭合流形同时是场、是波、也是自包含粒子，并在彻底清零外置第 3 点 $C$ 的同时消除了宇宙的一切“之外”？**

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" height="620"}
完整实验室：在紫色旋量环面上拖动琥珀旋量珠改变盲区相位 $\chi$ 与子午线射线角 $\theta$，并调节各公设滑块（翻转角 $\vartheta$、停机捏合强度 $\lambda$ 与 Alice 两轴夹角 $\gamma$），在同一枚旋量体与布洛赫球及账本台上依次检验霍普夫盲区纤维商映射、反自伴切矢实轴翻转与罗伯逊不确定性、格里森—布施二次迹刚性、全局等距扩张配局域幂等捏合以及双场单态齐雷尔松上界 $2\sqrt{2}$。十八条冻结声明、文献与 `T1–T4` 桥接边界、数值核算及开放问题在依据栏与理论抽屉中分层标注。
:::
