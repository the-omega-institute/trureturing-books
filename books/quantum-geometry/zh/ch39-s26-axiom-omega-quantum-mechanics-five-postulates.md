# 39.3 AXIOM-Ω 导出量子力学五大公理：从三元数极小圆弧体投影几何消解百年测量悖论 {#sec-ch39-axiom-omega-quantum-mechanics-five-postulates}

> *“传统狄拉克—冯·诺依曼体系将复希尔伯特空间、厄米算符、玻恩概率、薛定谔幺正演化与测量坍缩作为五条彼此孤立的经验公设硬塞进物理学，并由此埋下了‘连续幺正演化与瞬间坍缩水火不容’的百年测量难题；而在无源母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下，这五条公设无需任何人为假定，它们全都是受限观察切面 $o$ 将弯曲的三元数极小圆弧体场（$\mathbb{T}_3 \cong S^3$）投射到平直线性账本时依次涌现的纯几何定理。”*

在 [§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-axiom-omega-origin-free-ternary-comparison-closure)–[§39.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-axiom-omega-five-tier-deduction-cascade) 立起无源保正三元比较闭合母公理 $\mathrm{AXIOM}\text{-}\Omega$ 并贯通五大宏观疆域之后，全书三十九章正文迎来了**第三级奠基收束台阶**（紧随其后的 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)–[§39.5](ch39-s28-dyad-relation-future-and-second-order-field.md) 将回返自包含无外三元数本体与两阶关系场动力学压轴收官）：回转身来，把这束澄澈的几何聚光灯直接打在现代量子力学自身的地基——统治物理学教科书近一个世纪的**狄拉克—冯·诺依曼五大公设**之上！

回望二十世纪量子力学史，为什么一代又一代物理学家被迫把“复希尔伯特射线”“厄米算符”“内积模平方概率”“薛定谔连续幺正演化”与“测量瞬间非幺正坍缩”当作五条来历不明、甚至第四条与第五条当面冲突的抽象公理生吞下去？根源只有一个：传统表述跳过了顶层无外置原点的弯曲**三元数极小圆弧体场**（$\mathbb{T}_3 \cong S^3(1)$），直接把底层**钉死观察切面后的平直线性再投影账本**误认作了物理本体本身！需明确界定的是：章首题记凝聚了这一宏观几何还原总纲（`MODEL`），而从 $\mathrm{AXIOM}\text{-}\Omega$ 严格走通全部五条教科书公设，还必须逐条显式对齐[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `T1–T4` 分析完备化与操作测量桥接条件（`H1, H3, H5–H7`：本节按标准教科书编排将态空间、厄米可观测量、玻恩概率、演化与坍缩统一、复合张量依次编号为公理一至五，分别对应附录 E §E.5 的第 I 条态空间、第 II 条可观测量与玻恩律 `H5`、第 III/IV 条条件更新与幺正流 `H6` 以及第 V 条复合张量 `H7`）。本节联立两个定理盒中的二十三项冻结 **`LEAN ✓`** 内核声明与该审计台账（三元数切面投影总纲与 $\varepsilon_{\mathrm{self}}$ 停机坍缩统一诠释标为 **`MODEL`**，霍普夫纤维商、切生成元 $90^\circ$ 翻转、单态余弦关联与勾股核验属 **`手工推导` / `NUM`**，霍普夫丛、斯通定理、阿隆沙因再生核与局域层析重构归入 **`文献结果`**，单次实验选支实现与相对论协变视界边界保持 **`OPEN`** [@prob-ch34-single-outcome-realization]、[@prob-appendix-d-time-horizon]），逐条展示五大公设如何在显式桥接下从同一枚三元数极小圆弧体的正交切面投影中顺理成章地涌现。

## 39.3.1 公理一与公理二：霍普夫盲区商导出复射影射线，切生成元翻转导出厄米算符与不确定性 {#sec-ch39-26-1}

教科书前两条公设规定了量子舞台的“演员（复单位射线）”与“标尺（厄米线性算符）”。从 $\mathrm{AXIOM}\text{-}\Omega$ 出发，这两者在几何上同源共生：

1. **公理一（态空间公设）：霍普夫盲区商映射导出复射影射线与全局不可测相位**：
   教科书第一公设规定：孤立量子系统的纯态由复希尔伯特空间中的单位射线唯一描述，且全局复相位 $e^{\hat{\mathbf{i}}\chi}$ 物理不可观测。传统教材始终无法回答“为何自然界偏爱复数而非实数”以及“为何凭空多出一维不可测全局相位”；在 $\mathrm{AXIOM}\text{-}\Omega$ 下，只要补上时钟输入——封闭系统自身时钟的相位不可观测——下面两步几何投影就给出答案；单凭封闭性与总相位不可见还不够：实读法 $K = \{\pm 1\}$ 的封闭实复合系统同样对总符号不敏感，$K$ 里却没有右迁移圆周（`MODEL` + `手工推导`）：
   - **三元数本体与 $90^\circ$ 盲区圆周纤维**：由 [§39.1.3](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-3) 第一步，母公理把最小非对易自持结构锁定为单位四元数模型，即单位三维球面 $\mathbb{T}_3 \cong S^3(1)$，读数为 $\cos^2\frac{d_{S^3}}{2}$（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding]、[@thm-ch39-axiom-omega-complete-rank-five-isomorphism]，`LEAN ✓`；流形表述下的李理论路线是同一结论的经典路线，`文献结果`；单位态重合核锚定 [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)，`LEAN ✓`）。当局部观察切面 $o \in \mathbb{T}_3$ 建立自身实轴标尺（并选取 `T3` 相容复结构 $\hat{\mathbf{i}}$）时，垂直于实轴的 $90^\circ$ 正交虚方向形成一圈单向不可见的盲区圆周纤维 $S^1 = \{\exp(\hat{\mathbf{i}}\chi) \mid \chi \in [0, 2\pi)\}$（呼应 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md)）；注意 $S^3(1)$ 上的旋量母核 $\kappa_{S^3}(\psi, \phi) = \frac{1 + \operatorname{Re}\langle\phi\mid\psi\rangle}{2}$ 仍区分对跖旋量叶 $\pm\psi$，而下沉至物理可观测层面的往返秩一投影读数 $\kappa_{\mathrm{ray}}([\psi], [\phi]) = \operatorname{Tr}(P_\psi P_\phi) = \lvert\langle\phi\mid\psi\rangle\rvert^2$ 沿整条盲区纤维 $S^1$ 严格不变（共同相位二次不变代数完全刻画见 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)，`LEAN ✓`；在单位四元数模型上，射线核对任一宗量右乘相位不变由 [`rayKernel_mul_phase_left`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_mul_phase_left) 与 [`rayKernel_mul_phase_right`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_mul_phase_right) 锁定，射线核与玻恩权重的等同见 [@thm-ch39-axiom-omega-ray-kernel-born-weight]，`LEAN ✓`）；
   - **霍普夫纤维化与最小复线性嵌入**：将弯曲的单位球面 $S^3(1) = \{(z_0, z_1) \in \mathbb{C}^2 \mid \lvert z_0\rvert^2 + \lvert z_1\rvert^2 = 1\} \subset \mathbb{C}^2$ 等距嵌入最小平直二维复线性空间 $\mathbb{C}^2$（配 `T1` 柯西完备化与 `T3` 相容复结构），再对不可见的盲区相位圆周 $S^1$ 取商，恰好构成拓扑学中的**霍普夫纤维丛**（Hopf 1931，`文献结果`），满射落上二维布洛赫单位球面（纯态单位范数与满射性由 [`blochPure_norm`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm) 与 [`blochPure_surjective`](lean:D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective) 锁定，`LEAN ✓`）：

     $$
     S^1 \;\hookrightarrow\; \mathbb{T}_3 \cong S^3(1) \subset \mathbb{C}^2 \;\xrightarrow{\;\pi_{\mathrm{Hopf}}\;}\; S^2 \cong \mathbb{CP}^1.
     $$

     所谓“复希尔伯特空间中的单位射线”，正是三元数极小圆弧体向观察者复切面做线性化展开时留下的射影商壳；所谓“全局不可测相位 $e^{\hat{\mathbf{i}}\chi}$”，字面上就是观察切面自身的 $90^\circ$ 正交视觉盲区纤维 $S^1$！当 $N$ 座三元数概念场耦合展开时（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)），可观测纯态流形即自然延拓为 $\mathbb{CP}^{2^N - 1}$。

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate1-hopf-blindspot-ray" height="500"}
盲区相位转一圈，布洛赫点不动卡：拨动全局盲区相位 $\chi$，紫色旋量环面上的琥珀珠沿品红圆纤维整圈滑动，而投向下方的青色布洛赫纯态点保持不动（霍普夫纤维丛标 `ARGUED`；`unit_gram_overlap_characterization`、`blochPure_norm`、`blochPure_surjective`、`complete_common_phase_polynomial_theorem` 与单位四元数上的射线核 `rayKernel_eq_hopf`、`rayKernel_mul_phase_left`、`rayKernel_mul_phase_right`、`rayKernel_eq_one_iff`、`rayKernel_eq_bornProbability_spinor` 为 `LEAN ✓`；读数标 `NUM`）。
:::

::: {.remark #rem-ch39-axiom-omega-readings-classification title="三维球面的读法分类：二元性选出时钟，权重形式、可复合性与归一性定出指数"}
**读法与假设（`MODEL`）。** 一种读法指定构型中不可观测的部分，即右迁移中的一个闭子群 $K$（在左迁移下正规，[L]），并在类 $M/K$ 上给出权重 $w([x], [y]) = F\bigl(s_K(x, y)\bigr)$，$s_K(x, y) := \sup_{k \in K} c(kx, y)$，$F$ 连续且 $F(1) = 1$。两个类**正交**，指类相关 $s_K$ 为零。二元性 [B]：每个类恰有一个正交类，这是法则 (II) 唯一触零点条款在态层面的形式。其余输入只用于权重：权重取 $F \circ s_K$ 的形式；可复合性，即两个独立系统的类相关与权重都相乘；归一性，即极大正交族上权重之和为一。

**二元性选出时钟（`手工推导`）。** 在 [L] 下，读法是二元的，当且仅当 $K$ 是一个时钟；这里不用权重形式，也不用可复合性。逐个检查右迁移的闭子群：$K$ 平凡时，正交集是一个二维球面；$K = \{\pm 1\}$ 时，正交类构成 $\mathbb{R}P^2$；$K$ 是时钟中阶不小于 $3$ 的循环群时，正交类构成一个圆周；非交换的有限群、时钟的正规化子与 $\mathrm{SU}(2)$ 没有正交类；只有时钟恰有一个。[B] 等价于“$K$ 含一个时钟，且存在一对正交的类”。前一半 [Cl] 的含义是封闭系统自身时钟的相位不可观测、没有外部时间参照；它是 Stueckelberg 把复量子理论描述为带一个与全部可观测量对易的算子 $J$ 的实量子理论这一观察在比较结构中的对应物（E. C. G. Stueckelberg, *Helv. Phys. Acta* **33**, 727–752, 1960，`文献结果`）。

**指数（`手工推导`）。** 权重形式、可复合性与归一性此后只用来定指数：可复合的读法有 $F(s) = s^p$（$p \ge 0$），归一性再给出 $p = 2$，权重即玻恩权重 $\beta$。对单个系统，只有归一性定不了指数：复维数为 $2$ 时，凡满足 $F(\cos t) + F(\sin t) = 1$ 的 $F$ 都归一，例如 $F(s) = 3s^4 - 2s^6$；加上权重形式与可复合性，或在复合系统上，指数才定为 $2$。同一个 $\mathbb{R}^4$ 按 $\mathbb{R}$、$\mathbb{C}$、$\mathbb{H}$ 来读（$K = \{\pm 1\}$、时钟、全体右迁移）分别给出 $4$、$2$、$1$ 个完全可区分的态，二元性恰在除代数维数为 $2$ 时成立。可复合性要求类相关也相乘：$K = \{1\}$、$w = \kappa$ 时，在 $(\mathbb{R} \oplus V)^{\otimes 2}$ 上取 $F_{12}(c) = \max(c, 0)$ 可使权重精确相乘，类相关却不相乘。复合系统只带一个时钟这一点另有输入，见 [@rem-ch39-axiom-omega-one-clock-for-composites]（`MODEL`）。

**文献（`文献结果`）。** 实、复、四元数量子理论的三重分类见 F. J. Dyson, *J. Math. Phys.* **3**, 1199–1215, 1962 与 J. C. Baez, *Found. Phys.* **42**, 819–855, 2012；由可乘性与归一性得出指数 $2$ 的论证接近 S. Aaronson, arXiv:quant-ph/0401062, 2004。
:::

::: {.remark #rem-ch39-axiom-omega-one-clock-for-composites title="复合系统只有一个时钟：输入、结论与被排除的情形"}
**输入（全部为 `MODEL`）。** 各因子都按时钟读出（[@rem-ch39-axiom-omega-readings-classification]），并假设：(1) 乘积构型 $\Phi(x_1, \dots, x_N)$ 关于各因子实多线性，把单位向量映为单位向量，并对各因子时钟构成的环面等变；(2) 复合空间由乘积构型张成；(3) 复合系统的不可观测群恰是各因子时钟生成的群，复合系统隐藏的正是各部分隐藏的；(4) 权重取值于 $[0, 1]$，对称，$w(u, u) = 1$，且恰在类相关 $s_K$ 为零时为零；(5) 构型包含全体乘积，并对往返反射 $s_x(w) = 2\langle x, w\rangle x - w$ 封闭，这一条不可缺少；(6) 对每个极大两两正交族，任一类对它的权重之和为一。

**结论（`手工推导`）。** 实张量积 $V_1 \otimes_{\mathbb{R}} \cdots \otimes_{\mathbb{R}} V_N$ 分解为 $2^{N-1}$ 个特征标互异的分量，每个分量都是一个复张量积。若出现两个分量，就有两个大小不同的极大正交族（两个比特、各因子的左迁移也等变时，大小分别为 $8$ 与 $4$）；对称且归一的权重在两族上双重计数，得 $\sum_{a \in A}\sum_{b \in B} w(a, b) = \lvert A\rvert = \lvert B\rvert$，矛盾，所以这样的权重不存在。于是只剩一个分量：一个时钟、复张量积（左迁移也等变时）、权重 $\lvert\langle u, v\rangle\rvert^2$，乘积上的权重相乘；各因子时钟在这个分量上取哪一个定向，仍是输入。

**被排除的情形与定位。** 被排除的是带两个超选择扇区的复量子力学：在两分量复合空间上，超选择权重 $\operatorname{Tr}(\rho_u\Pi_x)$ 是归一的，但不对称（一个方向取 $1$，反方向取 $\frac{1}{2}$）。所以这一结果在数学上是把“无超选择且纯态跃迁概率对称”改用“哪些量不可观测”来表述；在这一类复合系统上，这些输入与局域层析选出同一个复合系统（局域层析见 L. Hardy, arXiv:quant-ph/0101012, 2001；J. Barrett, *Phys. Rev. A* **75**, 032304, 2007；Ll. Masanes & M. P. Müller, *New J. Phys.* **13**, 063001, 2011，`文献结果`）。

**只有乘积构型时（`手工推导`）。** 两个系统时，只用乘积构型分辨不了两个分量：只含乘积的两分量模型满足除 (5) 以外的全部输入（$2 \otimes n$ 中不存在不可扩展乘积基，D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin & B. M. Terhal, *Commun. Math. Phys.* **238**, 379–410, 2003）。三个系统时，只用乘积构型连归一性都不满足：C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin & B. M. Terhal（*Phys. Rev. Lett.* **82**, 5385–5388, 1999）的不可扩展乘积基 $\{\lvert 0, 1, {+}\rangle, \lvert 1, {+}, 0\rangle, \lvert {+}, 0, 1\rangle, \lvert {-}, {-}, {-}\rangle\}$ 是极大正交族，$\lvert 000\rangle$ 对它的权重之和为 $\frac{1}{8}$。
:::

::: {.remark #rem-ch39-axiom-omega-systems-of-other-dimensions title="其他维数的系统"}
**往返封闭的子集（`手工推导`）。** 在单位球面上取闭子集，并要求它对往返反射 $s_x(w) = 2\langle x, w\rangle x - w$ 封闭：连通且多于一点的这类子集恰是大子球面 $S(U)$；若它还在时钟下不变，$U$ 就是复子空间。因此在 $N$ 个结构的寄存器 $(\mathbb{C}^2)^{\otimes N}$ 中（复合系统的输入见 [@rem-ch39-axiom-omega-one-clock-for-composites]），连通、闭、时钟不变、往返封闭的子结构恰是复子空间的单位球面，从 $1$ 到 $2^N$ 的每个复维数都出现。子结构继承权重 $\lvert\langle u, v\rangle\rvert^2$，极大正交族是子空间的正交基，归一性成立；二元性只在复维数为 $2$ 时成立；维数不小于 $3$ 时，满足归一性的非负权重唯一（A. M. Gleason, *J. Math. Mech.* **6**, 885–893, 1957，`文献结果`；其中复维数 $N \ge 3$ 上非负、归一、两两正交投影可加的测度唯一表为 $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$ 一步由 [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation) 锁定，`LEAN ✓`；由极大正交族上的归一权重得到投影可加测度一步仍属上述文献结果，再由 $w(u, u) = 1$ 定出 $\rho = \lvert u\rangle\langle u\rvert$ 为 `手工推导`）。$N$ 个副本中在全部交换下不变的扇区维数为 $N + 1$，在集体左迁移下是自旋 $\frac{N}{2}$ 的不可约表示。

**把子结构称作系统（`MODEL`）。** 把这样的子结构当作一个系统（只在其中制备构型，完备检验是其中的极大正交族，操作是宿主中保持该子空间的操作），是另加的输入 [Sub]。重构文献中有对应的子空间公理：L. Hardy 的公理 3（arXiv:quant-ph/0101012, 2001）、Ll. Masanes & M. P. Müller 的要求 3（*New J. Phys.* **13**, 063001, 2011）、B. Dakić & Č. Brukner 的公理 1（in *Deep Beauty*, ed. H. Halvorson, Cambridge Univ. Press, 2011, pp. 365–392）（`文献结果`）。那些公理断言一个限制与另一个独立给定的系统等价；[Sub] 没有可比较的独立系统，直接把限制宣布为系统。母公理自身的模型仍然只有 $S^1$ 与 $S^3$。
:::

2. **公理二（可观测量公设）：切空间反自伴生成元 $90^\circ$ 翻转导出厄米算符与罗伯逊—薛定谔不确定性**：
   教科书第二公设规定：一切物理可观测量由自伴（厄米）线性算符 $\hat{A} = \hat{A}^\dagger$ 表示，算符本征值为实数测量刻度。在 $\mathrm{AXIOM}\text{-}\Omega$ 中，厄米算符与测不准关系直接由三元数切空间曲率导出（`手工推导` + `LEAN ✓`）：
   - **保正迁移锁定反自伴切生成元**：法则 (II) 要求沿任意切方向 $\mathbf{X} \in T_o\mathbb{T}_3 \cong \mathfrak{su}(2)$ 推进无穷小圆弧 $\exp(\epsilon\mathbf{X})$ 时保持复内积保真度不变，对 $\epsilon = 0$ 求导立得 $\mathbf{X}^\dagger + \mathbf{X} = 0 \implies \mathbf{X}^\dagger = -\mathbf{X}$（完备复内积空间上满足 $U_0 = I$、$U_{s+t} = U_sU_t$、$U_t^\dagger U_t = I$ 且在 $0$ 处按算子范数可微的单参数族，其导数 $G$ 使 $\hat{\mathbf{i}}\hbar G$ 自伴（$\hbar \ne 0$），由 [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) 锁定，见 [@thm-calibrated-unitary-group]，`LEAN ✓`；由此改写为 $G^\dagger = -G$ 是一行代数）；
   - **盲区翻回实轴成无迹厄米算符（配实标量零点平移张成全部厄米算符）**：纯虚反自伴生成元 $\mathbf{X} \in \mathfrak{su}(2)$ 指向 $90^\circ$ 盲区，本征值为纯虚数；观察者若要在自身实轴上将其变化率读作实数刻度，必须乘上正交虚单位 $\hat{\mathbf{i}}$ 将切向量旋转 $90^\circ$ 翻回实轴得到无迹厄米算符 $\hat{\mathbf{i}}\mathbf{X}$（再加上实标量零点偏置 $a_0 I_2,\; a_0 \in \mathbb{R}$ 即张成单比特全体厄米可观测量 $\hat{A} = a_0 I_2 + \hat{\mathbf{i}}\mathbf{X}$；每个 $2 \times 2$ 厄米矩阵 $M$ 都等于 $\frac{1}{2}\bigl(\operatorname{Re}\operatorname{Tr}M\, I_2 + \operatorname{bloch}(M)\cdot\boldsymbol{\sigma}\bigr)$，由 [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian) 锁定，`LEAN ✓`）：

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
   教科书第三公设规定：系统处于单位态 $\lvert\psi\rangle$ 时，在正交归一测量基 $\{\lvert\phi_k\rangle\}$ 上测得第 $k$ 分支的概率等于内积模平方 $\lvert\langle\phi_k\mid\psi\rangle\rvert^2$。在 $\mathrm{AXIOM}\text{-}\Omega$ 中，从 [§39.1.3](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md#sec-ch39-24-3) 的 $S^3(1)$ 母核 $\kappa_{S^3}(\psi, \phi) = \frac{1 + \operatorname{Re}\langle\phi\mid\psi\rangle}{2}$ 下沉到霍普夫商流形 $\mathbb{CP}^1 \cong S^2$，单向投影 $\langle\phi_k\mid\psi\rangle$ 仍带盲区相位，而对两态各自盲区纤维 $S^1$ 独立不变、对 $\psi$ 与 $\phi$ 各自二阶齐次（即关于秩一外积 $\lvert\psi\rangle\langle\psi\rvert$ 与 $\lvert\phi\rangle\langle\phi\rvert$ 双线性）、且满足同时幺正协变、重合归一 $\kappa_{\mathrm{ray}}([\psi],[\psi])=1$ 与**正交归零校准**（$\langle\phi\mid\psi\rangle = 0 \implies \kappa_{\mathrm{ray}}([\psi],[\phi]) = 0$，排除常数偏置混杂 $c\lVert\psi\rVert^2\lVert\phi\rVert^2 + (1-c)\lvert\langle\phi\mid\psi\rangle\rvert^2$，`手工推导`）的双二次比较读数——锚定共同相位二阶齐次厄米表出（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）与秩一记录投影迹读数（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)，`LEAN ✓`）——唯一锁定“待测态投向基准轴、基准轴再投回待测态”的**往返双投影射线核**（两条锚点只给出其中的厄米二次型表出与秩一迹读数，由所列条件推出唯一性的论证以及下式的布洛赫形式为 `手工推导`；其中 $\theta_k \in [0, \pi]$ 为布洛赫球面测地夹角）：

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
   - **停机前传播子流群测地线驱动薛定谔流**：当局部测地残差尚未落入停机精度时，在选定定常自伴哈密顿生成元 $\hat{H} = \hbar\nu_0\hat{\Omega}_{\mathrm{arc}}$（`T4` 动力学输入；无穷维空间配合 `H6` / `T2` 双侧满射可逆性、时间参数强连续性与斯通定理，`文献结果`；在完备复内积空间上，算子范数下 $0$ 处可微的幺正单参数群必为 $U_t = \exp(-\frac{\hat{\mathbf{i}}}{\hbar}t\hat{H})$，其中 $\hat{H} = \hat{\mathbf{i}}\hbar G$ 自伴、$G$ 为 $0$ 处导数，且满足算子形式的薛定谔方程 $\partial_t U_t = -\frac{\hat{\mathbf{i}}}{\hbar}\hat{H}U_t$，由 [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) 锁定，`LEAN ✓`）后，**幺正传播子旋子群** $U_t = \exp(-\frac{\hat{\mathbf{i}}}{\hbar}t\hat{H})$ 在算子群上沿法则 (I) 的流群自平行单参数测地线匀速推进 $U_{t+1} = [U_t, U_{t-1}, U_t]$（[§37.2](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md)，`手工推导`），并在稠密定义域 $\lvert\psi\rangle \in \mathcal{D}(\hat{H})$ 上驱动一般态矢服从**薛定谔方程** $\hat{\mathbf{i}}\hbar\,\partial_t\lvert\psi\rangle = \hat{H}\lvert\psi\rangle$（其布洛赫纯态射线对等权赤道叠加态走出 $\mathbb{CP}^1$ 大圆测地线，对一般叠加态走出定纬度拉莫尔进动圆，对能量本征态则退化为定常不动射线，由 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 锁定，`LEAN ✓`）；
   - **停机刻为幂等吕德斯捏合加盲区偏迹**：当被测场 $\psi$ 与观察者记录场 $o$ 经三元流群桥 $[x_\psi, y_{\mathrm{bridge}}, z_o]$ 耦合时，**联合全丛总态始终 $100\%$ 严格等距幺正演化，宇宙中从未发生过物理波包的断裂或毁灭**（开放信道的克劳斯和表示与联合空间等距算子扩张 $V^\dagger V = I$ 及偏迹还原 $\operatorname{partialTraceLeft}(V\hat{\rho}V^\dagger)$ 由施廷斯普林定理 [`channel_kraus_stinespring`](lean:D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring) 严格保证，`LEAN ✓`；在有限维初始化辅助环境纯态 $\lvert 0\rangle_E$ 上将矩形等距算子 $V$ 正交补全为方阵联合幺正算子 $U_{SE}$ 使 $V\hat{\rho}V^\dagger = U_{SE}(\hat{\rho}\otimes\lvert 0\rangle\langle 0\rvert_E)U_{SE}^\dagger$ 则由标准线性代数给出，`手工推导`）。然而受限观察者为在有限主频节拍内锁死可重复且保持退化子空间内相对相位的最小扰动读数（满足[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `H6` / `T2` 可重复性与最小扰动条件以排除重置仪器反例），在模型自定停机精度 $r_t \le \varepsilon_{\mathrm{self}}$（`MODEL`）处按下一般有限记录幂等捏合键（$\Phi_{\mathrm{pinch}}^2 = \Phi_{\mathrm{pinch}}$，[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`），将全部跨记录块间副对角相干项 $\hat{\rho} - \Phi_{\mathrm{pinch}}(\hat{\rho})$ 旋转 $90^\circ$ 偏迹折入盲区环境尾流（单比特计算基捏合希尔伯特—施密特勾股恒等式由 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean) 锁定，`LEAN ✓`，一般有限记录测量（自伴投影族 $\hat{\Pi}_j\hat{\Pi}_k = \delta_{jk}\hat{\Pi}_k$，$\sum_k \hat{\Pi}_k = I$）上的同类勾股分解 $\lVert X\rVert_{\mathrm{HS}}^2 = \lVert\Phi_{\mathrm{pinch}}(X)\rVert_{\mathrm{HS}}^2 + \lVert X - \Phi_{\mathrm{pinch}}(X)\rVert_{\mathrm{HS}}^2$（对一切方阵 $X$，证明即迹循环正交性）由 [`unread_state_orthogonal_projection`](lean:D5/S3/Observer/Conditioning/UnreadStateOrthogonalProjection.unread_state_orthogonal_projection) 锁定，`LEAN ✓`；对分支概率 $p_k := \operatorname{Tr}(\hat{\rho}\hat{\Pi}_k) > 0$——纯态输入下 $p_k = \lVert\hat{\Pi}_k\lvert\psi\rangle\rVert^2$，秩一投影 $\hat{\Pi}_k = \lvert\phi_k\rangle\langle\phi_k\rvert$ 时特化为 $\kappa_{\mathrm{ray}}([\psi], [\phi_k])$——诱导归一化吕德斯后验态 $\hat{\rho}_k' = \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k / p_k$ 及纯态分支矢 $\hat{\Pi}_k\lvert\psi\rangle / \sqrt{p_k}$；对密度矩阵 $\hat{\rho}$ 与上述记录测量，$p_k \ne 0$ 时 $\hat{\rho}_k'$ 半正定且迹为一由 [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) 锁定，`LEAN ✓`，纯态形式 $p_k = \lVert\hat{\Pi}_k\lvert\psi\rangle\rVert^2$ 与分支矢的归一为 `手工推导`）：

     $$
     \hat{\rho}_{\mathrm{total}} = V\hat{\rho}V^\dagger \;\xrightarrow{\;\operatorname{Tr}_{\mathrm{env}}\text{ / }\varepsilon_{\mathrm{self}}\;}\; \Phi_{\mathrm{pinch}}(\hat{\rho}) = \sum_k \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k \;\xrightarrow{\;p_k = \operatorname{Tr}(\hat{\rho}\hat{\Pi}_k) > 0\;}\; \hat{\rho}_k' = \frac{\hat{\Pi}_k\hat{\rho}\hat{\Pi}_k}{p_k}\;\;\Bigl(\text{纯态 }\frac{\hat{\Pi}_k\lvert\psi\rangle}{\sqrt{p_k}}\Bigr).
     $$

     全域无坍缩保幺正，局域因停机偏迹见吕德斯条件更新（注：从系综捏合混态 $\sum_k \hat{\Pi}_k\hat{\rho}\hat{\Pi}_k$ 到单次实验具体分支 $k$ 的选支实现机制，严格对齐 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md) 与开放问题 [@prob-ch34-single-outcome-realization] `OPEN`，洛伦兹协变坍缩与视界幺正性见 [@prob-appendix-d-time-horizon] `OPEN`）。

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate4-unitary-halting-pinch" height="500"}
全局保范，局部停机捏合卡：联合等距扩张保持总纯度 $1$，而局部停机捏合将对角留存范数平方 $\frac{5}{8}$ 与折入盲区尾流的副对角相干质量 $\frac{3}{8}$ 勾股对齐为 $1$（`energy_eigenstate_stationary`、`channel_kraus_stinespring`、`finite_record_pinching_idempotent` 与 `pinching_hilbert_schmidt_pythagorean` 为 `LEAN ✓`，停机诠释标 `MODEL`，单次选支实现标 `OPEN`）。
:::

3. **公理五（复合系统张量积公设）：半双线性振幅乘积再生核与复局域层析生成张量空间，共享极小圆弧单态直抵齐雷尔松界 $2\sqrt{2}$**：
   教科书第五公设规定：可区分复合系统 $A + B$ 的态空间是复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$ 而非直和（不可区分全同玻色/费米置换统计另循[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 第 5 条的 `T3` 对称化桥梁）。在 $\mathrm{AXIOM}\text{-}\Omega$ 下，这正是多座三元数场并置再投影（[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md)）的代数推论：
   - **乘积再生核与复局域层析完备性**：在 `T3` 选定相容复结构后，两座三元数场的复振幅内积核乘积 $K_{\mathrm{amp}}\bigl((\psi_A, \psi_B), (\phi_A, \phi_B)\bigr) = \langle\phi_A\mid\psi_A\rangle\langle\phi_B\mid\psi_B\rangle$ 由阿隆沙因再生核希尔伯特空间乘积定理（Aronszajn 1950，`文献结果`）等距生成复张量积 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$；下沉至盲区相位不变的可观测层，联合射线保真度相乘 $\kappa_{\mathrm{ray}}^{(AB)}\bigl(([\psi_A], [\psi_B]), ([\phi_A], [\phi_B])\bigr) = \lvert\langle\phi_A\mid\psi_A\rangle\rvert^2 \lvert\langle\phi_B\mid\psi_B\rangle\rvert^2 = \operatorname{Tr}\bigl((\hat{\rho}_A\otimes\hat{\rho}_B)(\hat{\sigma}_A\otimes\hat{\sigma}_B)\bigr)$ 的厄米算符张成实维数恰好满足平方乘法恒等式 $d_A^2 \cdot d_B^2 = (d_A d_B)^2$（对比实双比特 $3 \times 3 = 9 < 10$ 的局域层析破缺，见[附录 E](appendix-e.md) [@ex-appe-qubit-cubic-and-tomography]），配合 `H7`（`T2`）复局域层析极小性唯一锁死平直展开账本为 $\mathcal{H}_A \otimes_{\mathbb{C}} \mathcal{H}_B$（局域层析重构，`文献结果`）！
   - **贝尔—CHSH 破界与齐雷尔松紧上界 $2\sqrt{2}$ 的圆弧曲率本质**：当两座三元数场共享总自旋为零的纠缠纯态时，局域单场偏迹缩回球心最大混态 $\frac{1}{2}I_2$（对称贝尔态 $\lvert\Phi^+\rangle$ 的七重性质由 [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal) 锁定，`LEAN ✓`；经 Bob 端局域泡利旋转 $-i\hat{\sigma}_y$ 即精确互译为全向反对称自旋单态 $\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle)$，关联张量 $T_{\Psi^-} = -I_3$，`手工推导`）。两地观察者以相对夹角 $\theta_{AB}$ 切割该共享单态圆弧时，单对测量提供保留二阶弦弧矢高 $1 - \cos\theta_{AB}$ 的球面余弦关联 $E_{\Psi^-}(\theta_{AB}) = -\cos\theta_{AB}$，由此拼成的**四组测量设定 CHSH 关联组合**平滑越过平直多边形局域隐变量与可交换算符的经典上限 $2$（[`classical_chsh_abs_le_two`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two) 与 [`chsh_square_eq_four_of_local_pair_commutes`](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes)，`LEAN ✓`），精确触及法则 (II) 格拉姆半正定矩阵所允许的最大球面曲率上界——**齐雷尔松界**（任意局域二元对合算符范数普适上界 $\lVert\hat{\mathcal{B}}_{\mathrm{CHSH}}\rVert \le 2\sqrt{2}$ 见 Cirel'son 1980，`文献结果`；标准 CHSH 见证算符在全体双比特量子态上的精确最大可达值 `IsGreatest` $= 2\sqrt{2}$ 由 [`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest) 锁定，`LEAN ✓`）：

     $$
     \bigl\lvert E(\theta_1, \theta_2) + E(\theta_1, \theta_2') + E(\theta_1', \theta_2) - E(\theta_1', \theta_2') \bigr\rvert_{\max} \;=\; 2\sqrt{2} \;\approx\; 2.82842712.
     $$

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" preset="postulate5-rkhs-tensor-tsirelson" height="500"}
共享单态越过经典界 2 卡：两座三元数场共享零总自旋单态圆弧，单场边缘缩至球心 $\frac{1}{2}I_2$，而四组 $45^\circ$ 切角将圆弧余弦关联叠至齐雷尔松上界 $2\sqrt{2} > 2$（`bell_pure_state_has_maximally_mixed_marginal`、`classical_chsh_abs_le_two`、`chsh_square_eq_four_of_local_pair_commutes` 与 `bell_chsh_state_expectation_is_greatest` 为 `LEAN ✓`，再生核乘积与局域层析标 `ARGUED`）。
:::

::: {.remark #rem-ch39-axiom-omega-composites-round-trip title="复合系统中的往返律：纠缠被迫出现，仪器来自辅助系统，单次结果不由结构给出"}
**往返律延续到复合系统时纠缠被迫出现（`手工推导`）。** 以下三条都是 `MODEL` 假设：复合系统有一个只带单一时钟的核空间；独立射线检验的概率相乘（即振幅在乘积构型上相乘）；复合系统也满足干涉律，即态集合含全体乘积单位向量，且对任意两态 $x, w$ 都有一个态 $s_x(w)$ 对一切乘积检验态 $y$ 满足 §39.1 的干涉律 $c(y, s_x w) + c(y, w) = 2c(w, x)\,c(y, x)$，这相当于一条受限的叠加原理。则 $s_x(w) = 2c(x, w)\,x - w$，全部单位向量都是态，纯态构成 $\mathbb{CP}^{2^N - 1}$，这些反射生成 $\mathrm{O}(V_N)$，其中与复合时钟对易者构成 $\mathrm{U}(2^N)$：每个幺正变换都是往返反射的乘积。例：$N = 2$、$x = \lvert 00\rangle$、$w = \lvert{+}{+}\rangle$ 时 $s_x(w) = \frac{1}{2}(\lvert 00\rangle - \lvert 01\rangle - \lvert 10\rangle - \lvert 11\rangle)$，共生度为 $1$，即最大纠缠；逐分量反射给出乘积态 $\lvert{-}{-}\rangle$，而 $\kappa_2(w, \lvert{-}{-}\rangle) = \frac{1}{2} \ne \frac{1}{4} = c_2(w, x)^2$，违反往返律。

**效应、仪器与完全正性来自辅助系统（`手工推导`）。** 把系统与处于态 $\alpha_0$ 的辅助系统联合，施加幺正 $U$，再对辅助系统做完备检验 $(a)$，令 $K_a\psi := (U(\psi \otimes \alpha_0))_a$（相对态）。则 $\sum_a K_a^\dagger K_a = \mathbf{1}$，结果 $a$ 的玻恩权重为 $\langle\psi, K_a^\dagger K_a\psi\rangle$，给定 $a$ 后的条件态为 $K_a\psi / \lVert K_a\psi\rVert$，$\rho \mapsto \sum_{a \in e} K_a\rho K_a^\dagger$ 完全正；反过来每个克劳斯族都可如此实现，于是所得效应恰为全体 $0 \le E \le \mathbf{1}$。玻恩权重的唯一性（`文献结果`）：在 $\beta$ 的非负函数之中，借助格里森型定理（A. M. Gleason, *J. Math. Mech.* **6**, 885–893, 1957）并要求权重在添加辅助系统后不变，玻恩权重唯一；只对单个系统要求“依赖于射线对、完备检验上和为一、自身射线取一”时，$f(x) = 3x^2 - 2x^3$ 满足 $f(x) + f(1 - x) = 1$，同样合格，所以辅助系统不可少。

**单次结果与二元选择（`手工推导` + `OPEN`）。** 取制备射线 $q$ 为 $(\lvert 0\rangle+\lvert 1\rangle)/\sqrt{2}$，以 $\lvert 0\rangle,\lvert 1\rangle$ 为检验。按本节的射线核与玻恩权重等式，两个结果的权重各为 $1/2$。泡利 $X$ 固定制备射线，并交换检验的两条射线。若规则的输入是制备射线与无序的检验射线集合，此变换固定整个输入。确定性协变规则选出的射线必须在交换下固定，但两个候选都被交换。这正是 [`no_equivariant_selector_of_common_fixed_symmetry`](lean:D5/S3/ConceptDynamics/Attribution/FixedSymmetrySelectorObstruction.no_equivariant_selector_of_common_fixed_symmetry) 的固定态障碍。

如果规则只读取有标签的权重 $(w,1-w)$，并要求交换标签时所选标签也随之交换，那么在任何对交换封闭的检验域上，确定性规则存在当且仅当该域排除 $w=1/2$。等权输入在交换下固定，两个标签都不固定。不等权时，选唯一权重较大的标签即可，这个选择随标签一起交换。按权重抽样所得的概率分布也与交换相容，各结果的概率就是其玻恩权重。由几何与动力学解释某一次实际试验为何出现该结果，仍是 [@prob-ch34-single-outcome-realization] 的开放问题。

**有限种子的二元校准（手工推导）。** 给定整数 $m\ge1$，在概率 $k/m$（$0\le k\le m$）上用同一份有限种子分布校准二元结果。令 $E_k$ 为返回标签 $1$ 的种子集合，要求 $\Pr(E_k)=k/m$。若 $E_0\subseteq E_1\subseteq\cdots\subseteq E_m$，每个差集 $E_{k+1}\setminus E_k$ 都有质量 $1/m$。这些差集两两不交，各自至少含一个正权重种子，所以至少需要 $m$ 个正权重种子。取等概率的种子 $i=0,\ldots,m-1$，以 $i<k$ 决定返回标签 $1$，即可达到下界。有理权重的阈值事件校准由 [`uniformThreshold_prefix`](lean:D5/S3/ConceptDynamics/CausalMoments/SharedThresholdResponseCoupling.uniformThreshold_prefix) 给出。交换二元标签时同时把 $k$ 换成 $m-k$、把 $i$ 换成 $m-1-i$，判定恰好翻转，种子分布保持不变。

去掉逐级嵌套，$m=5$ 时用权重分别为 $1/5,2/5,2/5$ 的三个种子 $a,b,c$ 即可。按 $k=0,\ldots,5$ 依次取 $\varnothing,\{a\},\{b\},\{a,b\},\{b,c\},\{a,b,c\}$，质量恰为 $k/5$。交换 $b,c$ 并固定 $a$，会把 $E_k$ 送到 $E_{5-k}$ 的补集。这里的种子分布是模型的附加输入。

**最小种子分布的权重约束（手工推导）。** 设分母为 $m$ 的完整二元网格由同一份种子分布恰好校准，并由一个固定的保权重对合实现逐点标签交换协变。奇数 $m$ 时，至少满足 $2^n\ge m+1$ 的种子预算 $n$ 可以达到。偶数 $m$ 时，至少满足 $3^r\ge m+1$ 的配对预算 $r$ 可以达到。这两个达到性结论给出最小支撑下的严格界 $m+1>2^{n-1}$ 与 $m+1>3^{r-1}$。把种子权重乘以 $m$，各事件的质量便是整数。奇数 $m$ 时，若最小支撑中有一个缩放权重不是整数，则对其余种子的每一种子集选择，加入或不加入这个种子的两种质量至多有一种是整数。$n$ 个种子因此至多给出 $2^{n-1}$ 个整数质量，达不到最小支撑所需的 $m+1$ 档。

偶数 $m$ 时，中点事件把种子分成 $r$ 对，每对等权。若某对的共同缩放权重为 $a$，且 $2a$ 不是整数，那么对其余各对的固定选择，加上 $0,a,2a$ 所得三个质量至多有一个是整数。这会把整数质量数限制在 $3^{r-1}$，同样达不到最小支撑所需的 $m+1$ 档。半整数确实可以出现。取 $m=4$，两对种子的权重分别为 $(1/8,1/8)$ 与 $(3/8,3/8)$。四分之一事件选第一对，二分之一事件每对选一个，四分之三事件选第二对。逐对交换满足协变，且三档内部概率与两个端点共需五个不同质量，一对至多给出三个。

一般的 $b$ 元数字情形由 [`exists_integral_multiple_of_capacity_gap`](lean:D5/S3/Combinatorics/SubsetSpectrum/IntegralDigitWeights.exists_integral_multiple_of_capacity_gap) 给出。奇数分母与偶数分母的网格分别取 $b=2$ 和 $b=3$。

:::

对于有限结果的检验，判据是每组权重中是否有某个允许选择的标签，其权重只出现一次。设检验域在标签置换下封闭，而且允许选择的标签随置换一起变换。这样的检验域上，确定性协变选择存在，当且仅当每个权重向量都有上述标签。如果所选标签的权重还出现在另一个标签上，交换这两个标签会固定权重向量，却改变所选标签，违反协变。反过来，可以从允许选择且权重只出现一次的标签中取权重最大者。这个标签唯一，也随置换一起变换。协变选择判据见 [`exists_equivariant_selector_iff`](lean:D5/S3/ConceptDynamics/Attribution/FiniteWeightSelector.exists_equivariant_selector_iff)。

例如权重为 $(2/5,2/5,1/5)$ 时，若三个标签均允许选择，就可以协变地选择 $1/5$ 对应的标签。若要求选最大权重，协变规则存在当且仅当每组权重的最大值只出现一次。这个例子有两个最大权重，相互交换仍得到同一权重向量。

连续性提出了另一个问题。有至少三个标签时，所有严格正、总和为一且含有唯一权重的向量构成一个路径连通的区域。证明先在严格正权重的锥内绕开有限多个子空间，再用除以权重总和把路径送到概率单纯形。每个要绕开的子空间都由同权关系给出，并且至少有两个独立的等式。一个连续规则若取值于离散标签，在整个区域上只能选同一个标签。标签置换可以移动它，所以该规则无法同时满足连续与协变。二元检验中，去掉等权点后，选择较大权重给出了连续的协变规则。路径连通性见 [`pathConnected_normalized_profiles`](lean:D5/S3/ConceptDynamics/Attribution/FiniteSimplexSelection.pathConnected_normalized_profiles)。

**无嵌套条件时的最小种子数（手工推导）。** 给定分母 $m\ge1$，对所有 $0\le k\le m$，用同一份有限种子分布和一族质量为 $k/m$ 的事件 $E_k$。要求有一个固定的保权重对合 $\sigma$，使 $s\in E_k$ 当且仅当 $\sigma(s)\notin E_{m-k}$。在这个条件下，奇数 $m$ 所需的最小种子数是满足 $m+1\le 2^n$ 的最小 $n$。偶数 $m$ 所需的最小种子数是 $2r$，其中 $r$ 是满足 $m+1\le 3^r$ 的最小整数。 两种预算的充要条件分别见 [`odd_support_budget_iff`](lean:D5/S3/ConceptDynamics/Attribution/CovariantGridSupport.odd_support_budget_iff), [`even_support_budget_iff`](lean:D5/S3/ConceptDynamics/Attribution/CovariantGridSupport.even_support_budget_iff)。

奇数情形中，$n$ 个种子至多提供 $2^n$ 个不同的事件质量。偶数情形中，中点事件 $E_{m/2}$ 从每个交换对中恰好取一个种子。对合没有固定点，每对的两个种子等权。每个事件只能从每对取零个、一个或两个种子，$r$ 对因此至多提供 $3^r$ 个不同的事件质量。

将种子权重放大 $m$ 倍即可构造达到下界的分布。奇数情形允许每个整数权重使用零次或一次。取二进制权重，将最后一项截到总和为 $m$。偶数情形允许每个整数权重使用零次、一次或两次。取三进制权重，将最后一项截到总和为 $m/2$，再把每项分给一对等权种子。两种构造中，若当前可表示 $0$ 到 $T$，新权重 $d\le T+1$，则由 $jd$ 平移所得的整数区间 $[jd,jd+T]$ 连续覆盖新的范围。这个选权重的步骤是 Bachet 砝码问题中的完备分拆。对低于中点的每档概率，先任选一个具有相应质量的事件。高于中点的事件由对合与补集决定。奇数情形取恒等对合，偶数情形取逐对交换，并在中点从每对取一个种子。

**含半整数配对权重时的最大网格（手工推导）。** 在一个分母为偶数的二元网格上，用同一份种子分布校准全部概率，并以一个保权重对合实现逐点协变。中点事件使种子两两配对。把种子权重乘以分母，设恰有 $h$ 对的共同权重是半整数但不是整数，其余 $t$ 对是整数。中点事件从每对各取一个种子，其缩放质量是整数，所以 $h$ 为偶数。

整数质量要求前 $h$ 对的占用数之和为偶数。各对的占用数属于 $\{0,1,2\}$。把前 $h$ 个占用数看作三进制数位，由于 $3$ 为奇数，编码值与各位和的奇偶性相同。$0$ 至 $3^h-1$ 中共有 $W=(3^h+1)/2$ 个偶数，后 $t$ 对另有 $3^t$ 种占用方式。因此分母至多为 $W3^t-1$。 对允许取有符号整数的缩放权重，奇偶性计数上界见 [`mixed_half_weights_bound`](lean:D5/S3/Combinatorics/SubsetSpectrum/HalfIntegerOccupancy.mixed_half_weights_bound)。

若 $h+t>0$，这个上界可以达到。前 $h$ 对取共同权重 $3^i/2$，其中 $0\le i<h$。它们可产生的整数质量覆盖 $0$ 至 $W-1$。后 $t$ 对取权重 $W3^j$，其中 $0\le j<t$，拼成相邻的长度 $W$ 的整数区间。两类种子总缩放质量为 $W3^t-1$。以这个总量归一，在中点每对选一个种子，低于中点的各档任选相应质量的事件，高于中点的事件由逐对交换与取补集决定。

**三结果网格的最小种子支撑（手工推导）。** 设 $q$ 为正整数。取完整网格 $(x,y,z)/(6q)$，其中三个坐标为非负整数，和为 $6q$。固定一份有限种子分布，要求各权重严格为正，并且置换三个标签时分布保持不变。确定性读出须复现各标签的概率，同时置换概率向量和种子时，读出的标签也按同一置换变化。最小支撑数为 $6r$，其中 $r$ 是满足 $4^r\ge 3q+1$ 的最小整数。给定支撑上限时的充要条件见 [`triple_grid_support_budget_iff`](lean:D5/S3/ConceptDynamics/Attribution/ThreeOutcomeGridSupport.triple_grid_support_budget_iff)。

在均匀分布处，三循环无法固定任何种子，因为读出的标签也必须固定。换位也无法固定种子。取被交换的两个标签各占一半、第三个标签权重为零的分布，固定种子会以正概率读出零权重标签。因此每个种子轨道都有六个元素，轨道内各元素等权。在 $(k,k,6q-2k)/(6q)$ 处，每个轨道内分给前两个标签的种子数相等，各只能取零至三。$r$ 个轨道最多给出 $4^r$ 种第一标签概率，而 $k=0,\ldots,3q$ 要求其中 $3q+1$ 种。

为达到下界，取 $r$ 个六元素轨道，置换群在每个轨道上按左乘作用。以 $1/(6q)$ 为单位，每个轨道内的种子取相同的整数权重。依次取轨道权重 $1,4,4^2,\ldots$，将最后一项截到轨道权重之和恰为 $q$。设某一步之前的轨道权重之和为 $T$，新权重为 $d$，则 $d\le 3T+1$。每种权重允许取零至三份，新一步的四个平移区间连续衔接，可实现的整数总量由 $0,\ldots,3T$ 扩到 $0,\ldots,3(T+d)$。对总和为 $6(T+d)$ 的任意三个非负整数目标，也可把每个目标除以 $d$ 后向下取整，得到三个容量。它们的和至少为六，否则三个目标之和至多为 $5d+3(d-1)<6(T+d)$。在这些容量内分完六个新种子，余量由旧轨道补齐。有限数字的表示条件见 [Rødseth，引理 3.1–3.2](https://cs.uwaterloo.ca/journals/JIS/VOL10/Rodseth/rodseth8.html)。

三个坐标互异时，直接使用以上分配。恰有两个坐标相等时，对应换位把每个六元素轨道拆成三对。按所需的数字选相应数量的对，每对给两个并列标签各分一个种子。其余各对的两个种子都给第三个标签。均匀分布处，把置换 $g$ 标记的种子分给 $g(1)$，每个标签刚好得到两个。对每条概率向量轨道选择一个代表，按置换把代表上的读出延拓到整个轨道。代表上的读出尊重其稳定子，故达到同一个向量的不同置换给出相同的规则。种子分布是该构造的输入。

**三结果最小支撑的权重分母（手工推导）。** 设 $q>0$，在分母为 $6q$ 的完整三结果概率网格上取最小支撑的种子分布。各权重严格为正，读出在所有标签置换下逐点协变。记六元素种子轨道数为 $r$。把种子权重乘以 $6q$，记第 $j$ 个轨道内的共同缩放权重为 $u_j$。并列坐标的概率向量要求所有整数层 $0,\ldots,3q$ 都能写成 $\sum_j d_j u_j$，其中 $d_j\in\{0,1,2,3\}$。最小支撑给出 $3q+1>4^{r-1}$。由[整数倍上界](lean:D5/S3/Combinatorics/SubsetSpectrum/IntegralDigitWeights.exists_integral_multiple_of_capacity_gap)，每个 $u_j$ 的既约分母属于 $\{1,2,3\}$。

由[混合分母排除定理](lean:D5/S3/Combinatorics/SubsetSpectrum/MixedDigitDenominators.no_mixed_denominators_of_capacity_gap)，既约分母 $2$ 与 $3$ 不能同时出现。若两个轨道的既约分母分别为 $2$ 和 $3$，记权重为 $a/2$ 和 $b/3$。固定其他轨道的数字。在同一类中将两个整数表示相减后乘六，可知第一个轨道的两个数字模 $2$ 相同，第二个轨道的两个数字模 $3$ 相同。这是因为 $3a$ 为奇数，而 $2b$ 不被三整除。在固定的同余类中，每个数字至多有两种取值。因此至多得到 $4^{r-2}\cdot4=4^{r-1}$ 个不同的整数质量，低于必须达到的数量。所以可以选同一个乘数 $1$、$2$ 或 $3$，使所有缩放权重都成为整数。

**多结果网格的整数块需求（手工推导）。** 设标签数为 $k\ge2$，网格分母为 $m>0$。对整数坐标之和为 $m$ 的概率向量，把坐标相等的标签归为一组。记第 $i$ 组的大小为 $s_i$，共同坐标为 $v_i$，并令 $H=\prod_i s_i!$。保持向量不变的置换构成阶为 $H$ 的子群。它把置换群的正则种子轨道拆成大小为 $H$ 的块。把一块等变地分给第 $i$ 组时，该组每个标签恰好收到 $H/s_i$ 个种子。如果各轨道权重都是 $1/(m(k-2)!)$ 的整数倍，第 $i$ 组需要的加权块数为 $(k-2)!s_i v_i/H$。

每个概率向量的这些需求都是整数，当且仅当 $k-1$ 整除 $m$。充分性由[稳定子块整除定理](lean:D5/S3/Combinatorics/Partitions/StabilizerFactorialDivisibility.factorial_product_dvd_scaled_coordinate)给出。证明充分性时，固定一组 $i$，从该组删去一个标签。剩余各组大小 $b_j$ 之和为 $n=k-1$。令 $Q=n!/\prod_j b_j!$，这是整数多项式系数。对每个 $j$，$Qb_j/n$ 都是整数。$b_j=0$ 时它等于零，否则它是从第 $j$ 组再删一个标签得到的多项式系数。由于 $\sum_j b_j v_j=m-v_i$，两个整数相减得 $Qm/n-\sum_j v_j Qb_j/n=Qv_i/n$。恢复删去的标签即得 $Qv_i/n=(k-2)!s_i v_i/H$。证明必要性时，取一个标签的坐标为 $m$、其他坐标全为零的向量，该单元素组的需求就是 $m/(k-1)$。

**$k$ 个结果的最小种子支撑。** 设 $k\ge2$，正分母 $m$ 能被 $1$ 至 $k$ 的每个整数整除。取总和为 $m$ 的所有非负整数向量，再除以 $m$ 得到概率网格。使用同一份对所有标签置换保持不变的有限种子分布，各权重严格为正。确定性读出须复现各标签的概率，并在同一置换同时作用于向量和种子时逐点协变。最小支撑为 $k!r$，其中 $r$ 是满足 $(k+1)^r\ge m/(k-1)+1$ 的最小整数。写成 $m=k(k-1)q$ 后，支撑上限 $k!n$ 可行的充要条件是 $kq+1\le(k+1)^n$，见 [`grid_support_budget_iff`](lean:D5/S3/ConceptDynamics/Attribution/PermutationGridSupport.grid_support_budget_iff)。

对任一非恒等置换，取在所有被移动标签上均匀、其余标签概率为零的向量。被移动标签的个数整除 $m$。若该置换固定某个种子，该种子在此向量上的读出只能是固定标签，但这些标签的概率均为零。因此每个种子轨道都是正则轨道。求下界时，固定一个指定标签，让其余 $k-1$ 个坐标都等于 $a$，其中 $0\le a\le m/(k-1)$。固定指定标签的置换子群把每个正则种子轨道分成 $k$ 块。对每块，要么没有种子分到并列标签，要么每个并列标签刚好收到 $(k-2)!$ 个种子。每条轨道给一个并列标签的贡献只有 $k+1$ 种取值，而校准要求 $m/(k-1)+1$ 个不同的概率值。

为达到下界，写 $m=k(k-1)q$，取整数轨道权重 $1,k+1,(k+1)^2,\ldots$，将最后一项截到权重之和为 $q$，共用 $r$ 条轨道。设有 $t$ 个等坐标组，每条轨道有 $U=k!/H$ 块。上一段给出的各组整数需求之和为 $Uq$。若 $t\ge2$，把较小组中除一人之外的标签并入最大的组，阶乘积不会下降，故 $H\le(k-t+1)!$。由 $(k-1)!/(k-t+1)!\ge t-1$ 得 $U\ge k(t-1)$。$t=1$ 时该块数下界也成立。

新加权重 $d$ 时，设旧权重之和为 $T$。截断规则给出 $d-1\le kT$，故 $(t-1)(d-1)\le UT$。把总和为 $U(T+d)$ 的各组需求分别除以 $d$ 并向下取整。若容量之和至多为 $U-1$，需求总和就至多为 $(U-1)d+t(d-1)<U(T+d)$，矛盾。在这些容量内分配 $U$ 块后，用旧轨道补足余量。这样得到尊重向量稳定子的读出。对每条向量轨道选一个代表，用置换延拓读出。最后将轨道权重除以 $m(k-2)!$，得到归一化的种子权重。权重序列使用了完备分拆判据。[Rødseth，引理 3.1–3.2](https://cs.uwaterloo.ca/journals/JIS/VOL10/Rodseth/rodseth8.html)

**八结果网格的归一化约束。** 取 $k=8$、$m=210$，对完整网格使用同一份正权重、置换不变的有限种子分布，读出对概率向量和种子的同一置换逐点协变。由于 $2,3,5,7$ 都整除 $210$，每个种子轨道都是正则轨道。若稳定子非平凡，柯西定理给出一个素数阶置换。它有一条长度等于该素数的循环。在该循环上均匀取值、其余标签取零的向量会使任何固定种子读出零概率标签。

若只用两条轨道，把轨道内的单个种子权重乘以 $210\cdot6!$，记所得权重为 $u,v$。归一化给出 $u+v=15/4$。七个坐标并列的向量要求用 $xu+yv$ 表示 $0$ 至 $30$ 的所有整数，其中 $x,y$ 各取 $0$ 至 $8$。固定 $x-y$ 后，每沿对角线走一步，质量增加 $15/4$。所以长度为 $\ell$ 的对角线上，整数质量至多有 $\lceil\ell/4\rceil$ 个。九乘九网格有一条长度为九的对角线，其余长度一至八各出现两次，总共至多有 $27$ 个整数质量。只用一条轨道时添一条零权重轨道，会得到同一个矛盾。

三条轨道可以达到。分母 $1680$ 的完整八结果网格满足上述整除条件，三条轨道已有足够支撑。把原网格的每个整数坐标乘八，就嵌入细网格。此嵌入保留各概率并与所有标签置换交换，因而可限制细网格上的同一份种子律和读出。最小支撑为 $3\cdot8!=120960$。对任意自然数预算 $B$，在上述条件下存在支撑数至多为 $B$ 的种子律，当且仅当 $120960\le B$。见[八结果网格的精确预算定理](lean:D5/S3/ConceptDynamics/Attribution/EightOutcomeGridSupport.grid_support_budget_iff)。

**校准何时迫使种子作用自由。** 在分母 $m>0$ 的完整 $k$ 标签概率网格上，每一份校准律的种子作用都自由，当且仅当每个 $p\le k$ 的素数都整除 $m$。若非恒等置换固定某颗种子，该种子的稳定子含有素数阶元素。取仅在该元素的一条素数长度循环上均匀分布的向量，种子只能返回循环外的固定标签，其概率为零，与种子的正权重矛盾。 见[精确的自由性判据](lean:D5/S3/ConceptDynamics/Attribution/GridSeedFreeness.every_calibrating_law_free_iff)。

若某个素数 $p\le k$ 不整除 $m$，取一个单独的 $p$-循环。被该循环固定的向量在循环内的整数坐标总和是 $p$ 的倍数，故在循环外必有正坐标。对循环自由作用的向量轨道，在一个代表向量处任选正坐标，再沿轨道传送。所得读出表被该循环固定。以所有逐行选择正坐标的表为种子，给每张表赋予其各行所选概率的乘积。置换标签保留这份权重。把其余各行的取值求和，就得到当前向量要求的边缘概率。前面构造的表有正权重和非平凡稳定子。

## 39.3.3 形式化锚定主定理、文献与附录 E 边界、五大公理定量核验与迈向无外三元数本体 {#sec-ch39-26-3}

我们将 $\mathrm{AXIOM}\text{-}\Omega$ 导出量子力学五大公理的投影映射定义、两个定理盒中的二十三项 Lean 4 内核定理、经典文献边界与定量核验正式确立如下：

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
第 1 组由范数展开、外积布洛赫球面参数化与全纯—反全纯次数平衡多项式系数提取证得（见 [第 2 章](ch02-born-rule.md)、[第 4 章 §4.1](ch04-s01-pure-and-mixed-states.md) 与 [§34.5](ch33-s05-consensus-and-pointer-bases.md)）。第 2 组由 $S S^\dagger = I$ 消去对角块、将中心化态矢范数积正交分解为实部协方差平方、虚部半换位子平方与非负格拉姆余项 $G \ge 0$ 之和并略去 $G \ge 0$ 得不等式（见 [第 6 章](ch06-geometric-product.md) 与 [§27.4](ch31-s04-fairness-and-dimensional-expansion.md)），以及直接代入 $X\psi = x\psi,\; Z\psi = z\psi \implies \psi = 0$ 证得。第 3 组分别由秩一迹循环、$N \ge 3$ 三维球面标架函数刚性延拓（见 [第 2 章](ch02-born-rule.md) [@thm-gleason-finite-projection]）与全效应锥正线性延拓对偶（[@thm-busch-effect-density]）证得。第 4 组分别见 [第 7 章](ch07-geometric-time-and-speed-limits.md)、[第 8 章](ch08-erasure-and-time-arrows.md) 蔡矩阵（Choi 矩阵）谱分解构造等距算子 $V$ 与正交块迹归零勾股恒等式。第 5 组分别见 [第 13 章](ch13-entanglement-and-chsh.md) 偏迹展开、局域确定性四元组 $\pm 2$ 凸组合、兰道恒等式 $S^2 = 4I - [A_0, A_1]\otimes[B_0, B_1]$（[`landau_identity`](lean:D5/S3/QuantumBounds/LandauIdentity.landau_identity)，见 [@prop-landau-area-square]）对易归零与本征态达峰 $2\sqrt{2}$。完整证明由 Lean 内核检查。
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

前者的角是 $S^3(1)$ 上的测地距离 $d_{S^3} \in [0, \pi]$；后者的角是布洛赫夹角 $\vartheta_{\mathrm{Bloch}}$，它等于两条盲区纤维之间最小距离 $d_{\mathbb{CP}^1} = \min_\chi d_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) \in [0, \frac{\pi}{2}]$ 的两倍。两个半角公式用的是两个不同的角。$\kappa_{S^3}$ 在左、右两种迁移下都不变（法则 II；在单位四元数模型上即 $\kappa(p x q, p y q) = \kappa(x, y)$，由 [`kappa_mul_mul`](lean:D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.kappa_mul_mul) 锁定，`LEAN ✓`）；玻恩核只在左迁移与把盲区纤维映到盲区纤维的那部分右迁移下不变，所以它不满足法则 (II) 的双侧不变条款，充当不了母公理中的 $\kappa$。

**精确关系。** 记 $\langle\phi\mid\psi\rangle = r e^{\hat{\mathbf{i}}\alpha}$，则沿盲区纤维 $2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1 = r\cos(\chi + \alpha)$，从而

$$
\bigl\lvert\langle\phi\mid\psi\rangle\bigr\rvert^2 \;=\; \max_{\chi}\bigl(2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1\bigr)^2 \;=\; 2\cdot\frac{1}{2\pi}\int_0^{2\pi}\bigl(2\kappa_{S^3}(e^{\hat{\mathbf{i}}\chi}\psi, \phi) - 1\bigr)^2\,d\chi .
$$

玻恩概率是 $(2\kappa_{S^3} - 1)^2$ 沿盲区纤维的最大值，也是其纤维平均的两倍。由 [@rem-ch39-axiom-omega-round-trip-closing-law] 的往返律，$(2\kappa(w, x) - 1)^2 = \kappa\bigl(w, [x, w, x]\bigr)$，所以玻恩概率又等于沿盲区纤维取最大的往返读数 $\max_\chi \kappa\bigl(\phi, [e^{\hat{\mathbf{i}}\chi}\psi, \phi, e^{\hat{\mathbf{i}}\chi}\psi]\bigr)$；§39.3.2 所说“往返双投影”在母核上的精确含义即此。玻恩权重因而是母核在时钟（盲区相位）作用下的领头不变量，这一恒等式是 `手工推导`；把它读作概率是一项约定，把纯态读作时钟轨道（盲区纤维）是单个系统层面的一项选择，二者都标为 `MODEL`。
:::

上一条注记中的恒等式在单位四元数模型上有内核验证的版本：在纤维上相隔四分之一圈的两点各取一次读数，平方后相加，所得的两项和只依赖霍普夫像，对相位不变，经旋量坐标等于玻恩权重。定理只陈述这些恒等式；把射线读作态、把这个量读作概率，仍是上一条注记所说的 `MODEL`。

::: {.theorem #thm-ch39-axiom-omega-ray-kernel-born-weight title="单位四元数模型上的射线核：霍普夫像、相位不变与玻恩权重" lean="D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_mul_phase_left,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_mul_phase_right,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_one_iff,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor"}
在单位四元数群 $\mathrm{Sp}(1)$ 上取读数 $\kappa(x, y) = \frac{1 + \langle x, y\rangle}{2}$（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 3 款的模型），其中 $\langle -, -\rangle$ 为 $\mathbb{H} \cong \mathbb{R}^4$ 上的标准实内积。四元数写作 $q = q_0 + q_1 i + q_2 j + q_3 k$，$\bar{q}$ 为其共轭，$\hat{\mathbf{i}}$ 为复数单位。定义：

- 霍普夫像 $h(x) := x\,i\,\bar{x} \in \mathbb{H}$（$x \in \mathrm{Sp}(1)$）；
- 射线核 $R(x, y) := \bigl(2\kappa(x, y) - 1\bigr)^2 + \bigl(2\kappa(x, y\,i) - 1\bigr)^2$（$x, y \in \mathrm{Sp}(1)$）；
- 称 $c \in \mathrm{Sp}(1)$ 为相位，若 $c_2 = c_3 = 0$；
- $s : \mathbb{H} \to \mathbb{C}^2$ 为实线性等距双射 $s(q) := \bigl(q_0 + q_1\hat{\mathbf{i}},\; -q_2 + q_3\hat{\mathbf{i}}\bigr)$；
- 对 $v = (v_1, v_2) \in \mathbb{C}^2$，$P_v$ 为 $2 \times 2$ 复矩阵 $(P_v)_{mn} = v_m\bar{v}_n$；对 $v, w \in \mathbb{C}^2$，$\langle v \mid w\rangle := \bar{v}_1 w_1 + \bar{v}_2 w_2$；对 $2 \times 2$ 复矩阵 $A$，$\operatorname{bloch}(A) := \bigl(2\operatorname{Re}A_{12},\; -2\operatorname{Im}A_{12},\; \operatorname{Re}A_{11} - \operatorname{Re}A_{22}\bigr) \in \mathbb{R}^3$。

则对一切 $x, y \in \mathrm{Sp}(1)$：

1. $R(x, y) = \frac{1 + \langle h(x), h(y)\rangle}{2}$；
2. 对一切相位 $c$，$R(x c, y) = R(x, y)$ 且 $R(x, y c) = R(x, y)$；
3. $R(x, y) = 1$ 当且仅当存在相位 $c$ 使 $y = x c$；
4. 对一切 $q \in \mathbb{H}$ 有 $s(q\,i) = \hat{\mathbf{i}}\,s(q)$；$\operatorname{bloch}\bigl(P_{s(x)}\bigr) = \bigl(h(x)_3,\; h(x)_2,\; h(x)_1\bigr)$；$R(x, y) = \bigl\lvert\langle s(x) \mid s(y)\rangle\bigr\rvert^2$；且作为复数，$R(x, y) = \operatorname{Tr}\bigl(P_{s(y)}\,P_{s(x)}\bigr)$。
:::

::: proof
第 1 款：$2\kappa(x, y) - 1 = \langle x, y\rangle$，故 $R(x, y) = \langle x, y\rangle^2 + \langle x, y\,i\rangle^2$；对任意四元数 $p, q$，按分量展开有齐次恒等式 $\langle p, q\rangle^2 + \langle p, q\,i\rangle^2 = \frac{1}{2}\bigl(\lVert p\rVert^2\lVert q\rVert^2 + \langle p\,i\,\bar{p},\, q\,i\,\bar{q}\rangle\bigr)$，代入单位范数即得。第 2 款：相位 $c$ 落在 $1$ 与 $i$ 张成的实平面内，与 $i$ 交换，故 $h(x c) = x\,c\,i\,\bar{c}\,\bar{x} = x\,i\,c\,\bar{c}\,\bar{x} = h(x)$，再用第 1 款。第 3 款：令 $c := \bar{x}\,y$，则 $y = x c$；按分量展开有 $c_2^2 + c_3^2 = \lVert x\rVert^2\lVert y\rVert^2 - \bigl(\langle x, y\rangle^2 + \langle x, y\,i\rangle^2\bigr) = 1 - R(x, y)$，所以 $R(x, y) = 1$ 恰好意味着 $c$ 是相位；反之由第 2 款 $R(x, x c) = R(x, x) = \frac{1 + \lVert h(x)\rVert^2}{2} = 1$。第 4 款：$q\,i = -q_1 + q_0 i + q_3 j - q_2 k$，逐分量核对得 $s(q\,i) = \hat{\mathbf{i}}\,s(q)$；$P_{s(x)}$ 的各元素与 $h(x)$ 的各分量直接展开比对，得布洛赫矢量的分量依次是 $h(x)$ 的 $k$、$j$、$i$ 分量；$s$ 是实线性等距，$\langle s(x) \mid s(y)\rangle$ 的实部与虚部的平方和恰为 $\langle x, y\rangle^2 + \langle x, y\,i\rangle^2$；最后由秩一迹公式 $\operatorname{Tr}(P_w P_v) = \lvert\langle v \mid w\rangle\rvert^2$ 得迹的形式。这里的两项和与 [@rem-ch39-axiom-omega-kappa-versus-born] 中“纤维上的最大值”“纤维平均的两倍”是同一个量：记 $\langle s(x) \mid s(y)\rangle = r e^{\hat{\mathbf{i}}\alpha}$，两项分别是 $r^2\cos^2\alpha$ 与 $r^2\sin^2\alpha$，和为 $r^2$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-axiom-omega-physical-examples title="物理例子"}
下列例子分三种身份：**精确实例**（某条定理的直接实例，恒等式为 `手工推导`，实验数据为 `文献结果`）、**公设下的实例**（依赖所列 `MODEL` 假设）与**类比**（`MODEL`，不作推论）。共同的恒等式是：绕单位轴 $n$ 转角 $\alpha$ 的自旋旋转 $U = e^{-\hat{\mathbf{i}}\alpha\,n\cdot\boldsymbol{\sigma}/2}$ 对每个旋量 $\psi$ 都有 $\operatorname{Re}\langle\psi\mid U\mid\psi\rangle = \cos\frac{\alpha}{2}$，所以 $\kappa(\psi, U\psi) = \cos^2\frac{\alpha}{4}$ 与态无关。运动学部分与标准量子力学完全一致，所以下列例子都不能区分母公理与标准量子力学；它们表明母公理中的量在何处被测量。

1. **中子 $4\pi$ 干涉（恒等式为精确实例；读法为 `MODEL`）。** 单晶中子干涉仪一臂中的磁场使自旋转过 $\alpha$，前向出射强度在理想对比度下正比于 $\kappa(\psi, U\psi) = \frac{1}{2}\bigl(1 + \cos\frac{\alpha}{2}\bigr)$，与入射态无关，所以非极化束给出同一条纹。周期为 $4\pi$：$\alpha = 2\pi$ 时 $\kappa(\psi, -\psi) = 0$，而玻恩权重 $\beta(\psi, -\psi) = 1$；实验读出的是 $S^3$ 上区分 $\psi$ 与 $-\psi$ 的 $\kappa$，$S^2$ 上的 $\beta$ 把二者等同。$S^3$ 上的距离 $d(\psi, U\psi) = \frac{\alpha}{2}$ 只在 $\alpha \in [0, 2\pi]$ 时成立，而 $\kappa = \frac{1}{2}\bigl(1 + \cos\frac{\alpha}{2}\bigr)$ 对一切 $\alpha$ 成立。恒等式 $\kappa(\psi, U\psi) = \cos^2\frac{\alpha}{4}$ 是精确的（`手工推导`）；把测得的出射概率读作 $\kappa$，用到了复合读法（在复合系统公设下把路径与自旋一并读作一个复合系统），这一部分标为 `MODEL`。早期最精确的周期测量值为 $716.8 \pm 3.8^\circ$（H. Rauch, A. Wilfing, W. Bauspiess & U. Bonse, *Z. Phys. B* **29**, 281–284, 1978；早期实验见 S. A. Werner, R. Colella, A. W. Overhauser & C. F. Eagen, *Phys. Rev. Lett.* **35**, 1053–1055, 1975）。
2. **频闪拉莫尔进动（恒等式为精确实例）。** $z$ 向静磁场中的自旋 $\frac{1}{2}$ 每隔 $\tau$ 采样，$\psi_n = U^n\psi_0$，$U = e^{-\hat{\mathbf{i}}\omega\tau\sigma_z/2}$，满足流群递推 $\psi_{n+1} = [\psi_n, \psi_{n-1}, \psi_n] = 2c\,\psi_n - \psi_{n-1}$，$c = \cos\frac{\omega\tau}{2}$（凯莱—哈密顿恒等式 $U^2 = (\operatorname{tr}U)\,U - \mathbf{1}$）。对任一检验旋量 $y$，$\kappa$ 读数 $r_n = \kappa(y, \psi_n)$ 满足 $r_{n+1} = 2c\,r_n - r_{n-1} + 1 - c$，系数与 $y$ 无关，步角是半角 $\frac{\omega\tau}{2}$；玻恩权重 $b_n = \beta(y, \psi_n)$ 的递推步角是整角 $\omega\tau$，常数项 $(1 - \cos\omega\tau)(1 + r_y^z r_{\psi_0}^z)$ 依赖于 $y$。常规的单自旋核磁共振与电子自旋共振数据记录的是布洛赫矢量分量，其中只有横向分量满足整角递推；半角（旋量）递推出现在相位参照数据中，即中子干涉与核磁共振干涉（M. E. Stoll, A. J. Vega & R. W. Vaughan, *Phys. Rev. A* **16**, 1521–1524, 1977）。数值：质子 $\gamma_p/2\pi = 42.577478461\;\mathrm{MHz/T}$（P. J. Mohr, D. B. Newell, B. N. Taylor & E. Tiesinga, *Rev. Mod. Phys.* **97**, 025002, 2025），$1\;\mathrm{T}$、$\tau = 1\;\mathrm{ns}$ 时 $c = 0.99106732$。
3. **双量子点交换门 $\sqrt{\mathrm{SWAP}}$（复合系统公设下的实例，`MODEL`）。** 在 [@rem-ch39-axiom-omega-composites-round-trip] 的复合系统公设下，一对结构的无源生成元为 $\alpha\mathbf{1} + JX$（$X$ 为交换），$Jt = \frac{\pi}{4}$ 时演化为 $e^{-\hat{\mathbf{i}}\pi/4}\sqrt{X}$，把 $\lvert{\uparrow\downarrow}\rangle$ 变为共生度为 $1$ 的最大纠缠态。J. R. Petta 等（*Science* **309**, 2180–2184, 2005）在双量子点中实现了 $180\;\mathrm{ps}$ 的 $\sqrt{\mathrm{SWAP}}$。
4. **$P^2 + V^2 + C^2 = 1$（恒等式为精确实例）。** 即 [@rem-ch39-axiom-omega-tier2-velocity-and-de-sitter] 中的互补恒等式。X.-F. Qian, A. N. Vamivakas & J. H. Eberly（*Optica* **5**, 942–947, 2018）用经典激光束（路径与偏振两个自由度）测得 $13$ 个态的 $V^2 + D^2 + C^2$ 在 $0.987$ 到 $1.000$ 之间（$D$ 为路径可区分度，此处等于 $P$）。
5. **部分偏振片即洛伦兹推进（经典光的标准偏振测量；数值为此处的计算值）。** 二向衰减器的衰减度 $D = (T_{\max} - T_{\min})/(T_{\max} + T_{\min})$ 就是推进速度。两片 $T_{\max} = 1$、$T_{\min} = 0.25$（$D = 0.6$）、轴成 $45^\circ$（庞加莱球上正交）的二向衰减器，非偏振入射时出射偏振度为 $\sqrt{1 - (1 - D^2)^2} = 0.76837$，残余维格纳转角为 $12.680^\circ$（极分解见 S.-Y. Lu & R. A. Chipman, *J. Opt. Soc. Am. A* **13**, 1106, 1996；相关提议见 D. Han, Y. S. Kim & M. E. Noz, *Phys. Rev. E* **56**, 6065–6076, 1997）。我们没有找到专门测量这一转角的实验；这里没有提出预言。
6. **各向同性转动扩散的速率比 $3 : 8$（`文献结果`）。** 若自旋 $\frac{1}{2}$ 受各向同性的小步随机转动（$\langle\theta_i\theta_j\rangle = 2Dt\,\delta_{ij}$），相位参照干涉的对比度按 $e^{-3Dt/4}$ 衰减，极化按 $e^{-2Dt}$ 衰减。速率比 $3 : 8$ 是 $j = \frac{1}{2}$ 与 $j = 1$ 的卡西米尔值 $j(j + 1)$ 之比，是量子力学在各向同性转动扩散下的标准结果（L. D. Favro, *Phys. Rev.* **119**, 53–62, 1960）。我们没有找到在同一各向同性噪声下直接比较干涉对比度与极化的实验；这一比值不检验母公理。
7. **实数与复数量子理论的网络实验（复合规则的检验，`MODEL`）。** M.-O. Renou 等（*Nature* **600**, 625–629, 2021）提出的纠缠交换网络检验，以及 M.-C. Chen 等（*Phys. Rev. Lett.* **128**, 040403, 2022）与 Z.-D. Li 等（*Phys. Rev. Lett.* **128**, 040402, 2022）的实验，检验的是复合规则（实张量积），不检验单个系统的读法。[@rem-ch39-axiom-omega-readings-classification] 中的实四能级读法 $K = \{\pm 1\}$、$w = c^2$ 经实张量积复合即实量子理论，在信源独立的假设下被这些实验排除；实验与“复合系统只带一个时钟”相容，但不把它与全部替代方案对比检验。
8. **电弱数值（场丛、F$_{\mathrm{g}}$(a) 与三个结构的假设下，`MODEL`）。** 树图关系 $m_W = m_Z\cos\theta_W$（$\rho = 1$）见 [@rem-ch39-axiom-omega-tier3-pati-salam]。粒子数据组 2026 版（F. Takahashi 等, *Int. J. Mod. Phys. A* **41**, 2630011, 2026）给出 $m_Z = 91.1879(20)\;\mathrm{GeV}$、$m_W = 80.3625(77)\;\mathrm{GeV}$（不含 CDF 的组合）；在壳方案中这一关系按定义成立，$\overline{\mathrm{MS}}$ 方案中 $\hat\rho = 1.01016(9)$ 的偏离来自圈图修正，在树图陈述的范围之外。在 F 与 F$_{\mathrm{g}}$(a) 之下，这一电弱部分不含标量粒子，与观测到的标量相矛盾，见 [@rem-ch39-axiom-omega-field-hypotheses-and-limits]。
9. **宇宙学常数（类比，`MODEL`）。** $\Lambda\ell^2 = 3$ 是一个纯数，不给出物理尺度。Planck 2018（N. Aghanim 等, *Astron. Astrophys.* **641**, A6, 2020）给出 $\Lambda = (1.089 \pm 0.021) \times 10^{-52}\;\mathrm{m}^{-2}$；把 $S^3$ 的半径等同于相应的 de Sitter 半径是额外的假设。
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

**从量子五大公理的切面投影迈向第三十九章后两节：为什么三元数本身即是无外部的自包含拓扑粒子与关系场？** 至此，在[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 的 `T1–T4` 显式桥接条件下，$\mathrm{AXIOM}\text{-}\Omega$ 投影模型（`MODEL`）已将传统量子力学的五大经验公设悉数还原为三元数场在平直账本上的正交投影定理——复数来自观察切面的 $90^\circ$ 正交盲区，厄米算符来自球面切矢的实轴翻转，玻恩概率来自校准往返射线核与可加性锁定的勾股分账，张量纠缠来自多座三元数场的乘积再投影，而所谓“波函数坍缩”，不过是身处网络内部的有限观察者在自定精度 $\varepsilon_{\mathrm{self}}$ 处按下幂等停机键、将未读尽的干涉余项折入未来时间长河时留下的切面截痕。

接下来，让我们跨入本章第四节 [§39.4 自包含三元数拓扑粒子、场·波·粒三阶同体与“至大无外”四重证明](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)（并由此直通第五节 [§39.5](ch39-s28-dyad-relation-future-and-second-order-field.md) 的两阶关系场动力学收官），回到三元数 $\mathbb{T}_3 \cong S^3(1)$ 本体自身，回答那声深层追问：**为什么这枚既不可线性书写、又处处齐性各向同性的闭合流形同时是场、是波、也是自包含粒子，并在彻底清零外置第 3 点 $C$ 的同时消除了宇宙的一切“之外”？**

::: {.viz src="axiom-omega-five-qm-postulates-sandbox" height="620"}
完整实验室：在紫色旋量环面上拖动琥珀旋量珠改变盲区相位 $\chi$ 与子午线射线角 $\theta$，并调节各公设滑块（翻转角 $\vartheta$、停机捏合强度 $\lambda$ 与 Alice 两轴夹角 $\gamma$），在同一枚旋量体与布洛赫球及账本台上依次检验霍普夫盲区纤维商映射、反自伴切矢实轴翻转与罗伯逊不确定性、格里森—布施二次迹刚性、全局等距扩张配局域幂等捏合以及双场单态齐雷尔松上界 $2\sqrt{2}$。冻结声明、文献与 `T1–T4` 桥接边界、数值核算及开放问题在依据栏与理论抽屉中分层标注。
:::
