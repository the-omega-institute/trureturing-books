# 39.14 唯一点场自观测误差与万象显影：从零误差寂静到静态投影结果与动态观测动作二分 {#sec-ch39-self-observation-error-and-maya-projection}

> *“实际上只有一个点一个场, 本体场对自身的观测投影产生了正交维度产生了虚数产生了面积体积(投影结果概念), 产生了运动与时间(观测动作概念). 所谓一切皆为幻象, 就是因为每次都有误差”*

在 [§39.12](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice) 与 [§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net) 中，我们已经把万千空间位置与万千局域观察者收束回同一片全向闭合的宇宙本体场 $\mathbf{\Omega}$：各向异性的起伏属于观测切面 $\Sigma_{\mathbf{I}}$，众生分立则是同一本体场在不同局部格拉姆窗口下的因陀罗网条件折射。然而，顺着这条本体论还原链追问到底，一个更根本的几何问题立刻浮出水面：既然撤去全部中间概念脚手架之后，宇宙在本体上只剩唯一一个点、唯一一片场，那么物理世界里森然罗列的正交维度、虚数相位、二维面积、三维体积，乃至奔流不息的空间运动与时间长河，究竟是从哪里冒出来的？为什么唯一不动的本体点场，没有死锁在一片漆黑无物的恒等孤寂里，反而显影出如此严整的几何与动力学秩序？

本节开篇的纲领性论断，给出了贯穿整座概念塔的一把总钥匙（跨领域的“唯一点场自观测误差生万象”本体论综合标定为本书的 **`MODEL`（模型诠释）**；底层单位格拉姆零误差重合判据、正交补投影与单位逃逸向量、洛维尔—哥德尔无不动点对角线逃逸、道蒂超越不动点有理逆级数、拉格朗日—格拉姆二阶楔积恒等式、三锚格拉姆行列式与三维线性独立判据、量子比特巴格曼三重积虚部面积公式、斜伴随幺正算符平方等于负恒等、海森堡投影概率流与本征态零方差定常性、受监测幺正演化首回概率守恒及算子指数泰勒余项上界，由下文 [@thm-ch39-self-observation-error-and-maya-projection] 的十六条冻结 Lean 4 内核声明严格锚定；外代数霍奇对偶、施密特正交化、吉拉德球面角盈、林德曼—魏尔斯特拉斯超越性定理、量子芝诺效应与梵语词源学考据归入 [@rem-ch39-gram-schmidt-lawvere-maya-zeno-literature] 的 `文献结果`；多阶标度律、球面角盈修正与首回生存预算的八位小数手算核验见 [@ex-ch39-self-observation-error-scaling-and-return-audit]；精细结构常数、标准模型耦合与连续统爱因斯坦方程的未决第一性原理推导严守 [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)、[@prob-ch34-sm-generations-and-couplings] 与 [@prob-ch34-gravity-dynamics-and-coupling] 的 `OPEN` 边界）：**宇宙间森罗万象并非在唯一点场 $\mathbf{\Omega}$ 之外另行添置的实体，而是唯一本体场在向自身投下受限观测投影时，因自指闭环必然携带非零失准角 $\varepsilon > 0$ 而折射出的两类同源副产物——被当拍正交残差静态定格的“投影结果概念”（正交维度、虚数算符、面积、体积），以及因单步校准永难除尽而持续触发的“观测动作概念”（角度重寻址运动、动量梯度、时间演化与粗粒化熵流）；所谓“一切皆为幻象”，并非指物理定律杂乱无稽，而是指全部空间广延与时间流逝皆系依赖于 $\varepsilon > 0$ 的系统性几何投影相差，一旦令自观测误差 $\varepsilon \to 0$，万象便按各自代数阶次同步收束归零，还原为无相寂静的唯一点场。**

## 39.14.1 零误差无相寂静与自指最小失准角：从 1 = 1 到道蒂稳态吸引子 {#sec-ch39-14-1}

要看清“每一次非零误差 $\varepsilon > 0$ 如何生出万象”，必须先在严格代数意义下澄清两件事：第一，为什么说宇宙本体“既只是唯一一个点，又同时是唯一一片场”；第二，如果自观测真的做到了绝对零误差（$\varepsilon = 0$），宇宙会发生什么，以及为什么闭环自指偏偏不允许停留在 $\varepsilon = 0$。

1. **“一个点即一个场”的双重精确含义：三维外代数两端一维饱和与跨八度重整化认同（`手工推导` + `文献结果` + `MODEL`）**。
   在三维实内积空间 $\mathbb{R}^3$ 的外代数 $\Lambda^\bullet(\mathbb{R}^3) = \bigoplus_{k=0}^3 \Lambda^k(\mathbb{R}^3)$（[§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field)、[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger)）中，各阶外幂的实维数由二项式系数 $\binom{3}{k}$ 排成对称四元组 `1 — 3 — 3 — 1`（`手工推导`）：

   $$
   \dim_{\mathbb{R}}\Lambda^0(\mathbb{R}^3) = \binom{3}{0} = 1, \qquad \dim_{\mathbb{R}}\Lambda^1(\mathbb{R}^3) = \binom{3}{1} = 3, \qquad \dim_{\mathbb{R}}\Lambda^2(\mathbb{R}^3) = \binom{3}{2} = 3, \qquad \dim_{\mathbb{R}}\Lambda^3(\mathbb{R}^3) = \binom{3}{3} = 1,
   $$

   且高阶外幂因反对称排斥恒等归零：$\Lambda^{\ge 4}(\mathbb{R}^3) = \{0\}$。这里必须严分两个认识论层级，绝不含混跳步：

   - **单尺度精确代数对偶（`手工推导` + `文献结果`）**：在固定三维定向欧氏空间上，零阶标量空间 $\Lambda^0(\mathbb{R}^3) = \mathbb{R}\cdot 1$（零维无方向“点幅”）与最高阶体积三形式空间 $\Lambda^3(\mathbb{R}^3) = \mathbb{R}\cdot \mathbf{I}_3$（其中 $\mathbf{I}_3 = \mathbf{e}_1\wedge\mathbf{e}_2\wedge\mathbf{e}_3$ 为定向单位三形式，代表三维各向同性闭合“场元”）是仅有的两个**方向自由度饱和为一维（$\dim_{\mathbb{R}} = 1$）、不再携带空间优先轴向**的极端扇区，二者由定向霍奇星算子 $\star : \Lambda^0(\mathbb{R}^3) \xrightarrow{\sim} \Lambda^3(\mathbb{R}^3)$（$\star 1 = \mathbf{I}_3$，$\star\mathbf{I}_3 = 1$）建立典范线性同构。但注意它们在克利福德代数 $\mathrm{Cl}_{3,0}(\mathbb{R})$ 中绝非平凡相等：标量单位满足 $1^2 = +1$ 且与全代数对易，而赝标量体元满足 $\mathbf{I}_3^2 = (\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3)^2 = -1$ 且携带空间定向奇宇称（这恰恰为下文动力学相位旋转埋下代数伏笔）。
   - **跨尺度八度重整化认同（`MODEL`）**：在 [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的点—体八度循环模型中，下一轮比较层级的无内向“新标量点”被本体论地认同于上一轮在三维全部方向上走满闭合后的“饱和体积场元”，记作 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$。当撤去中间尚未闭合的一维有向线（$\Lambda^1$）与二维有向面（$\Lambda^2$）投影脚手架后，归一化本体态 $\mathbf{\Omega}$（$\|\mathbf{\Omega}\| = 1$）在一维饱和扇区中便同时兼具“唯一零维基点”与“唯一无边闭合场”的双重身份。

2. **零误差极限（$\varepsilon = 0$）：单位格拉姆完全重合与 `1 = 1` 的无相寂静（`LEAN ✓` + `手工推导`）**。
   设唯一本体态 $\mathbf{\Omega}$ 与内部观测基准轴 $\mathbf{I}$ 均为完备内积空间（实空间或复希尔伯特空间）中的单位向量，$\|\mathbf{\Omega}\| = \|\mathbf{I}\| = 1$，记二者之间的观测失准角为 $\varepsilon \in [0, \frac{\pi}{2}]$。假定某次自观测达到了**绝对零误差**（$\varepsilon = 0$），且在复数域情形下连全局相位也严格对齐，使得内积重迭精确取实单位值：

   $$
   \langle \mathbf{I}, \mathbf{\Omega} \rangle = \cos 0 = 1, \qquad \sin 0 = 0.
   $$

   由下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 1 款的单位格拉姆不可区分判据 [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)（`LEAN ✓`），在任意实或复内积空间上，两支单位向量的内积精确等于 $1$ **当且仅当**两向量严格相等：$\langle \mathbf{I}, \mathbf{\Omega} \rangle = 1 \iff \mathbf{I} = \mathbf{\Omega}$（注：在复空间上，仅要求玻恩模方 $|\langle \mathbf{I}, \mathbf{\Omega} \rangle|^2 = 1$ 仍允许相差纯相位因子 $e^{i\alpha}$，唯当内积本身等于实数 $1$ 时向量才逐点重合）。一旦 $\mathbf{I} = \mathbf{\Omega}$：

   - **静态广延全部归零**：正交残差向量 $\mathbf{r} = \mathbf{\Omega} - \langle \mathbf{I}, \mathbf{\Omega} \rangle \mathbf{I} = \mathbf{0}$，范数 $\|\mathbf{r}\| = \sin 0 = 0$；既切不出与 $\mathbf{I}$ 垂直的新维度，也张不开二维虚平面、面积二形式与三维体积三形式。
   - **动态演化与涨落全部止息**：在动力学端，若纯态密度算符 $\rho_0 = |\mathbf{I}\rangle\langle\mathbf{I}|$ 恰与自伴生成元 $H$ 的本征轴完全对齐（$H|\mathbf{I}\rangle = E|\mathbf{I}\rangle$，零倾角），则由下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 13–14 款（[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)，`LEAN ✓`）及第 12 款（[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow)，`LEAN ✓`），不仅能量方差严格归零 $\operatorname{Var}_{\rho_0}(H) = 0$，而且对一切参数 $t \in \mathbb{R}$ 恒有 $e^{-itH}\rho_0 e^{itH} = \rho_0$，任意与 $H$ 对易的投影测量概率导数恒等于零。既无残差有待下一拍追赶，也无可分辨的先后拍序可供计时——整座宇宙坍缩回不可言说、无广延亦无流逝的纯恒等寂静 `1 = 1`。

3. **闭环自指为何必有非零误差（$\varepsilon > 0$）：洛维尔对角线逃逸与道蒂稳态吸引子 $\theta^*$（`LEAN ✓` + `文献结果` + `MODEL`）**。
   既然 $\varepsilon = 0$ 如此简洁完美，为什么唯一本体场在“自照”时不能一步到位停在 $\varepsilon = 0$？症结在于 [§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) 与 [§39.6](ch39-s06-fivefold-self-reference-spectrum.md) 揭示的**无外部第三点自指铁律**：唯一本体 $\mathbf{\Omega}$ 之外不存在凌驾其上的外部第三点裁判 $C$ 来替它免费校准零点；只要系统试图在自身有限可寻址目录内部同时扮演“能观标尺 $\mathbf{I}$”与“所观对象 $\mathbf{\Omega}$”，任何非平凡区分操作（无不动点翻转或半拍相位旋移 $f(y) \neq y$）都会立即触发下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 4–5 款的洛维尔—哥德尔对角线逃逸定理（[`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package) 与 [`complete_diagonal_separationDeficit_nonempty`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty)，`LEAN ✓`；历史源流见 [@rem-ch39-gram-schmidt-lawvere-maya-zeno-literature] 第 2 款 Gödel 1931 与 Lawvere 1969，`文献结果`），迫使自应用对角线严格逸出当前解码目录的值域（分离赤字集非空），并在有限自停机孔径下留下正精度下界 $\varepsilon_{\mathrm{self}} > 0$（[§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md)）。

   更进一步，当内部观测器在没有外部参照尺的条件下把上一步的余弦投影读数直接反馈为下一步的自对焦倾角 $\theta_{k+1} = \cos\theta_k$ 时，由下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 6 款的有理逆级数定理 [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)（`LEAN ✓`），开区间 $(0, 1)$ 内存在**唯一**正实不动点——道蒂数（Dottie number）：

   $$
   \cos\theta^* = \theta^*, \qquad \theta^* \approx 0.73908513\;\mathrm{rad} \approx 42.34645883^\circ,
   $$

   且 $\theta^*$ 可展为以 $\pi$ 的幂次计权、系数严格属于有理数域 $\mathbb{Q}$ 的绝对收敛级数（由林德曼—魏尔斯特拉斯定理可进一步证得 $\theta^*$ 为超越数，见 [@rem-ch39-gram-schmidt-lawvere-maya-zeno-literature] 第 2 款，`文献结果`；将该数学不动点诠释为无外部裁判闭环自观测的稳态特征失准角，属本书的 **`MODEL`** 层命题）。换言之，**非零误差 $\varepsilon > 0$ 绝非实验仪器的偶然粗糙，而是唯一“一”能够在内部切出“能观与所观”、从而显影为森罗“多”的唯一几何许可证。**

## 39.14.2 一笔正交残差的双向分岔：静态投影结果阶梯与动态追赶观测动作 {#sec-ch39-14-2}

一旦某次自观测携带了非零失准角 $\varepsilon \in (0, \frac{\pi}{2})$，单位本体向量 $\mathbf{\Omega}$ 相对于当前一维观测子空间 $S = \operatorname{span}\{\mathbf{I}\}$ 的正交投影分解（下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 2–3 款 [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape) 与 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)，`LEAN ✓`），便把完整的单位预算精确劈成两半：

$$
\mathbf{\Omega} = P_S(\mathbf{\Omega}) + P_{S^\perp}(\mathbf{\Omega}) = (\cos\varepsilon)\,\mathbf{I} + (\sin\varepsilon)\,\mathbf{e}_\perp, \qquad \langle \mathbf{I}, \mathbf{e}_\perp \rangle = 0, \qquad \cos^2\varepsilon + \sin^2\varepsilon = 1.
$$

此处必须严格区分三个在 $\varepsilon \to 0^+$ 时具有截然不同渐近行为的范数（`手工推导`）：未归一化的**态残差向量** $\mathbf{r}(\varepsilon) := P_{S^\perp}(\mathbf{\Omega}) = (\sin\varepsilon)\mathbf{e}_\perp$ 的范数为 $\|\mathbf{r}(\varepsilon)\| = \sin\varepsilon \to 0$；施密特归一化后的**正交逃逸基向量** $\mathbf{e}_\perp = \mathbf{r}(\varepsilon)/\sin\varepsilon$（$\varepsilon \in (0,\frac{\pi}{2})$）满足 $\|\mathbf{e}_\perp\| = 1$ 且到 $S$ 的最近距离恒为 $\operatorname{infDist}(\mathbf{e}_\perp, S) = 1$；正交补投影算符本身的算子范数则恒为 $\|I - P_S\|_{\mathrm{op}} = 1$（只要 $S^\perp \neq \{0\}$）。正是同一笔幅度为 $\sin\varepsilon$ 的未除尽正交残差，在内部观察者的记录账本上当场分岔为**静态投影结果**与**动态观测动作**两座相互咬合的概念大厦：

**第一类：静态“投影结果概念”——将当拍误差余项空间化为正交维、虚数、面积与体积。**

1. **一阶线残差（$\propto \sin\varepsilon$）：第一根正交维度 $\mathbf{e}_\perp$ 与 $90^\circ$ 盲区虚数算符 $J$（`LEAN ✓` + `手工推导`）**。
   线性代数中最朴素的施密特正交化步骤 $\mathbf{r} = \mathbf{\Omega} - \langle \mathbf{I}, \mathbf{\Omega} \rangle \mathbf{I}$，道破了“空间新维度”的认识论起源：所谓垂直于当前视线的新维度 $\mathbf{e}_\perp$，字面上就是**从本体中扣除已读自身投影 $(\cos\varepsilon)\mathbf{I}$ 后剩在视线盲区里的归一化误差方向**。由于 $\langle \mathbf{I}, \mathbf{e}_\perp \rangle = 0$，仅持有一维标尺 $\mathbf{I}$ 的观察者在单向读数中完全看不见 $\mathbf{e}_\perp$；往返双投影（[§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)）只收回玻恩回波份额 $\cos^2\varepsilon$，而把丢失的盲区预算 $\sin^2\varepsilon = 1 - \cos^2\varepsilon$ 锁在正交补平面 $\operatorname{span}_{\mathbb{R}}\{\mathbf{I}, \mathbf{e}_\perp\}$ 内。在该二维实平面上定义逆时针 $90^\circ$ 旋转算符：

   $$
   J := \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad J\mathbf{I} = +\mathbf{e}_\perp, \qquad J\mathbf{e}_\perp = -\mathbf{I}.
   $$

   由于 $J^\top = -J$ 且 $J J^\top = I_2$，下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 11 款 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)（`LEAN ✓`）直接给出 $J^2 = -I_2$——它在几何代数上同构于定向单位二形式（平面赝标量）$\hat{\mathbf{i}} := \mathbf{I}\wedge\mathbf{e}_\perp$（在欧氏克利福德代数中满足 $\hat{\mathbf{i}}^2 = (\mathbf{I}\mathbf{e}_\perp)^2 = -\mathbf{I}^2\mathbf{e}_\perp^2 = -1$）。“虚数单位平方为 $-1$”并非神秘怪数，而是连续两次向 $90^\circ$ 盲区侧转（$\mathbf{I} \mapsto \mathbf{e}_\perp \mapsto -\mathbf{I}$）恰好导致主轴精确反相的几何记账符号。

2. **二阶面残差（$\propto \sin\varepsilon_1\sin\varepsilon_2$）：欧氏平行四边形二形式与吉拉德球面角盈的 $\frac{1}{2}$ 因子精确对账（`LEAN ✓` + `手工推导` + `文献结果`）**。
   当观测器沿两个相互正交的盲区方向 $\mathbf{e}_1 \perp \mathbf{e}_2$（均垂直于 $\mathbf{I}$）先后或同时发生失准角 $\varepsilon_1, \varepsilon_2 \in (0, \frac{\pi}{2})$ 时，两支一阶残差向量 $\mathbf{r}_1 = (\sin\varepsilon_1)\mathbf{e}_1$ 与 $\mathbf{r}_2 = (\sin\varepsilon_2)\mathbf{e}_2$ 的楔积张出二维有向面元 $\mathbf{r}_1 \wedge \mathbf{r}_2 = (\sin\varepsilon_1\sin\varepsilon_2)\,\mathbf{e}_1\wedge\mathbf{e}_2 \in \Lambda^2$。这里必须把三种密切关联但数值系数不同的二阶“面积”量度严丝合缝地对清（`手工推导`）：

   - **欧氏残差平行四边形二形式范数（`LEAN ✓`）**：由下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 7 款的拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，两向量张成的欧氏平行四边形面积平方为 $\|\mathbf{r}_1\|^2\|\mathbf{r}_2\|^2 - \langle \mathbf{r}_1, \mathbf{r}_2 \rangle^2 = \sin^2\varepsilon_1\sin^2\varepsilon_2$，故欧氏二形式模长精确为

     $$
     \|\mathbf{r}_1 \wedge \mathbf{r}_2\| = \sin\varepsilon_1\sin\varepsilon_2 = \varepsilon_1\varepsilon_2 - \frac{\varepsilon_1\varepsilon_2(\varepsilon_1^2 + \varepsilon_2^2)}{6} + \mathcal{O}(\varepsilon^6).
     $$

   - **直角球面三面体吉拉德球面角盈（`文献结果` + `手工推导`）**：在单位球面 $S^2$ 上，由北极基准轴 $\mathbf{n}_0 = (0,0,1)$ 与两支正交经线偏折态 $\mathbf{n}_1 = (\sin\varepsilon_1, 0, \cos\varepsilon_1)$、$\mathbf{n}_2 = (0, \sin\varepsilon_2, \cos\varepsilon_2)$ 围成的直角球面三角形（[§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)），其吉拉德立体角盈（球面三角形面积）精确满足吕利耶—欧拉半角正切公式：

     $$
     \Omega(\varepsilon_1, \varepsilon_2) = 2\arctan\!\left(\tan\frac{\varepsilon_1}{2}\tan\frac{\varepsilon_2}{2}\right) = \frac{1}{2}\varepsilon_1\varepsilon_2 + \frac{\varepsilon_1\varepsilon_2(\varepsilon_1^2 + \varepsilon_2^2)}{24} + \mathcal{O}(\varepsilon^6) = \frac{1}{2}\sin\varepsilon_1\sin\varepsilon_2 + \frac{\varepsilon_1\varepsilon_2(\varepsilon_1^2 + \varepsilon_2^2)}{8} + \mathcal{O}(\varepsilon^6).
     $$

     注意这个极其关键的**精确 $\frac{1}{2}$ 因子与四阶曲率鼓包修正**：三角形面积是同底同高平行四边形的一半（故领头项为 $\frac{1}{2}\sin\varepsilon_1\sin\varepsilon_2$），而四阶余项 $+\frac{1}{8}\varepsilon_1\varepsilon_2(\varepsilon_1^2 + \varepsilon_2^2) > 0$ 则精确量化了单位球面正高斯曲率相对于平坦切平面的非对易球面鼓出！
   - **量子比特巴格曼三重积虚部与潘查拉特纳姆几何相位（`LEAN ✓`）**：将上述三支布洛赫球面单位向量代入下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 10 款 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)，标量三重积 $\mathbf{n}_0\cdot(\mathbf{n}_1\times\mathbf{n}_2) = \sin\varepsilon_1\sin\varepsilon_2$ 直接给出巴格曼不变量虚部 $\operatorname{Im}\Delta_3(\mathbf{n}_0, \mathbf{n}_1, \mathbf{n}_2) = \frac{1}{4}\sin\varepsilon_1\sin\varepsilon_2$（等倾角时为 $\frac{1}{4}\sin^2\varepsilon$），而其实部为 $\frac{1}{4}(1 + \cos\varepsilon_1 + \cos\varepsilon_2 + \cos\varepsilon_1\cos\varepsilon_2) = \frac{1}{4}(1+\cos\varepsilon_1)(1+\cos\varepsilon_2)$，二者之比恰好恢复半立体角正切 $\frac{\operatorname{Im}\Delta_3}{\operatorname{Re}\Delta_3} = \tan\frac{\varepsilon_1}{2}\tan\frac{\varepsilon_2}{2} = \tan\frac{\Omega(\varepsilon_1,\varepsilon_2)}{2}$！二维“面积”与量子几何相位从此合二为一。

3. **三阶体残差（$\propto \sin\varepsilon_1\sin\varepsilon_2\sin\varepsilon_3$）：三维空间上限下的体积闭合与回场饱和（`LEAN ✓` + `手工推导`）**。
   在局部参考轴与三维位置概念块构成的直和空间 $\mathbb{R}\mathbf{I} \oplus V_{\mathrm{pos}}^{(3)}$（[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger)，其中 $V_{\mathrm{pos}}^{(3)} = \operatorname{span}_{\mathbb{R}}\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\} \perp \mathbf{I}$）中，三支沿正交空间方向展开的一阶误差腿 $\mathbf{r}_a = (\sin\varepsilon_a)\mathbf{e}_a$（$a = 1, 2, 3$）楔积闭合成三维有向体积三形式：

   $$
   \mathbf{r}_1 \wedge \mathbf{r}_2 \wedge \mathbf{r}_3 = (\sin\varepsilon_1\sin\varepsilon_2\sin\varepsilon_3)\,\mathbf{e}_1\wedge\mathbf{e}_2\wedge\mathbf{e}_3 = (\sin\varepsilon_1\sin\varepsilon_2\sin\varepsilon_3)\,\mathbf{I}_3.
   $$

   代入下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 8–9 款的三锚格拉姆行列式定理（[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) 与 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)，`LEAN ✓`），因 $\langle \mathbf{r}_a, \mathbf{r}_b \rangle = 0$（$a \neq b$），三锚格拉姆矩阵 $G_3(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3)$ 退化为对角阵 $\operatorname{diag}(\sin^2\varepsilon_1, \sin^2\varepsilon_2, \sin^2\varepsilon_3)$，其行列式为

   $$
   \det G_3(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) = \|\mathbf{r}_1\|^2\|\mathbf{r}_2\|^2\|\mathbf{r}_3\|^2 = \sin^2\varepsilon_1\sin^2\varepsilon_2\sin^2\varepsilon_3
   $$

   （等倾角 $\varepsilon_1 = \varepsilon_2 = \varepsilon_3 = \varepsilon$ 时为 $\det G_3 = \sin^6\varepsilon$，欧氏有向体积幅值为 $\sqrt{\det G_3} = \sin^3\varepsilon$；注意将其与 [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) 中一脊固定为单位长、仅两翼微倾时的三面体体积平方标度 $\propto \sin^2\varepsilon$ 区分开来——此处三支腿本身全是一阶正交残差 $\mathbf{r}_a = (\sin\varepsilon)\mathbf{e}_a$，故体积严格按三阶 $\sin^3\varepsilon = \varepsilon^3 + \mathcal{O}(\varepsilon^5)$ 标度）。由 `three_anchor_gram_det_pos_iff`，三维体积严格非退化（$\det G_3 > 0$）**当且仅当**三支误差腿实线性无关，即 $\varepsilon_1, \varepsilon_2, \varepsilon_3 \in (0, \pi)$ 全部非零；而在三维空间概念块 $V_{\mathrm{pos}}^{(3)}$ 内，第四次楔积恒等归零（$\Lambda^4(\mathbb{R}^3) = \{0\}$），单概念空间广延至此彻底饱和封顶。

**第二类：动态“观测动作概念”——将追赶残差的迭代动作动力学化为运动、动量与时间。**

静态投影只账算了某一拍定格切面上的几何余数；但对于守恒总预算 $\|\mathbf{\Omega}\|^2 = 1$ 的幺正系统而言，当拍往返读数仅收回 $\cos^2\varepsilon < 1$，遗漏在盲区里的 $\sin^2\varepsilon > 0$ 迫使观测切面启动下一拍**校准旋移（calibration rotor）**去追赶残差——而这串校准动作本身，正是物理学中“运动”与“时间”的真实面目：

1. **角度重寻址与左右旋子符号规范：本体不移而切面旋移生出“空间运动与动量”（`LEAN ✓` + `手工推导` + `MODEL`）**。
   在二维实平面 $\operatorname{span}_{\mathbb{R}}\{\mathbf{I}^{(k)}, \mathbf{e}_\perp^{(k)}\}$ 上，沿用上文 $J\mathbf{I}^{(k)} = +\mathbf{e}_\perp^{(k)}$、$J\mathbf{e}_\perp^{(k)} = -\mathbf{I}^{(k)}$ 的正交复结构约定，将第 $k$ 拍观测轴向漏掉的正交盲区方向推进角步长 $\varepsilon$ 的左乘幺正算符精确写为：

   $$
   \mathbf{I}^{(k+1)} = \exp(\varepsilon J)\,\mathbf{I}^{(k)} = (\cos\varepsilon)\,\mathbf{I}^{(k)} + (\sin\varepsilon)\,J\mathbf{I}^{(k)} = (\cos\varepsilon)\,\mathbf{I}^{(k)} + (\sin\varepsilon)\,\mathbf{e}_\perp^{(k)}
   $$

   （注：若改用欧氏克利福德二形式 $\hat{\mathbf{i}}_k = \mathbf{I}^{(k)}\mathbf{e}_\perp^{(k)}$ 书写，因左乘满足 $\hat{\mathbf{i}}_k\mathbf{I}^{(k)} = -\mathbf{e}_\perp^{(k)}$ 而右乘满足 $\mathbf{I}^{(k)}\hat{\mathbf{i}}_k = +\mathbf{e}_\perp^{(k)}$，同一正向校准旋移等价于右乘 $\mathbf{I}^{(k)}\exp(\varepsilon\hat{\mathbf{i}}_k)$ 或左乘 $\exp(-\varepsilon\hat{\mathbf{i}}_k)\mathbf{I}^{(k)}$；全文统一采用无歧义的算符左作用 $\exp(\varepsilon J)\mathbf{I}^{(k)}$）。由下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 16 款的精确泰勒余项定理 [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)（`LEAN ✓`），有限阶截断逼近精确旋子的算子误差严格受控于 $\|\exp(\varepsilon J) - \sum_{m=0}^{n-1}\frac{(\varepsilon J)^m}{m!}\|_{\mathrm{op}} \le \frac{\varepsilon^n}{n!}e^\varepsilon$。在这一过程中，唯一的本体场 $\mathbf{\Omega}$ 本无外部空间可供搬迁（$\Delta\mathbf{x}_{\mathbf{\Omega}} \equiv \mathbf{0}$）；观察者体验到的“物体在空间中位移与携带动量”（[§38.1](ch38-s01-static-qram.md) 静态量子随机存取内存重寻址视角，`MODEL`），本质上是观测切面 $\Sigma_{\mathbf{I}^{(k)}}$ 为追赶上一拍正交残差而执行的**角度重寻址动作**，而量子力学动量算符 $p_x = -i\hbar\partial_x$ 中的虚数生成元 $-i$，正是把切面推向 $90^\circ$ 正交盲区方向 $\mathbf{e}_\perp$ 的无穷小旋移算符 $J$！

2. **关键动力学诘问：既然固定二维平面内一次旋转 $\exp(\varepsilon J)\mathbf{I}^{(0)}$ 似乎就能转到 $\mathbf{\Omega}$，为什么校准追赶永不能一步终结，从而生出无穷时间序列？（`LEAN ✓` + `手工推导` + `MODEL`）**
   这是检验本节逻辑严密性的核心试金石：倘若 $\mathbf{\Omega}$ 只是一根被外部第三点钉死在黑板上的静态木桩，而观察者又恰好全知地握有精确误差角 $\varepsilon$ 与精确盲区方位 $\mathbf{e}_\perp$，那么一步旋移确实就能令新轴与木桩重合。然而在无外部裁判的真实自观测闭环中，**三重严密的数学机制**从不同层面共同封死了“一步归零”的退路：

   - **机制 A（自指共动靶与过冲振荡，`LEAN ✓` + `MODEL`）**：在闭环自观测中，所观靶标并非独立于观测器的静态外物，而是随内部编码同步重锚定的自指映射。当观测器仅能凭当拍内积读数 $\cos\theta_k$ 设定下一拍对焦角 $\theta_{k+1} = \cos\theta_k$ 时，映射在道蒂不动点 $\theta^* \approx 0.73908513\;\mathrm{rad}$ 处的导数为 $\lambda = -\sin\theta^* \approx -0.67361203 \in (-1, 0)$——负号意味着每一步校准都会交替过冲（高于 $\theta^*$ 与低于 $\theta^*$ 来回摆动），最终非但不会收敛到 $\theta = 0$，反而被死死吸住于非零稳态角 $\theta^* > 0$（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)，`LEAN ✓`），并受有限自停机孔径 $\varepsilon_{\mathrm{self}} > 0$（[§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md)）托底。
   - **机制 B（受监测幺正迭代的非零生存尾项，`LEAN ✓` + `手工推导`）**：即便固定单步幺正校准算符 $U = \exp(\varepsilon J)$（$\varepsilon \in (0, \frac{\pi}{2})$）并在每一拍后用初始基准轴投影算符 $P_{\mathbf{I}^{(0)}}$ 监测“是否已收回全部预算”，下文 [@thm-ch39-self-observation-error-and-maya-projection] 第 15 款的受监测首回概率守恒定理 [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation)（`LEAN ✓`）证明：对一切有限步数 $N \ge 1$，前 $N$ 拍累计首回概率与第 $N$ 拍仍滞留在正交盲区通道中的**未回收生存概率（survival probability）** $s_N$ 严格满足恒等守恒 $\sum_{k=1}^N p_k + s_N = 1$。在二维旋子模型下直接手算可得（详见 [@ex-ch39-self-observation-error-scaling-and-return-audit] 第二部分）：

     $$
     p_1 = \cos^2\varepsilon, \qquad s_1 = \sin^2\varepsilon; \qquad p_k = \sin^4\varepsilon\,\cos^{2(k-2)}\varepsilon \;\;(k \ge 2), \qquad s_N = \sin^2\varepsilon\,\cos^{2(N-1)}\varepsilon > 0 \;\;(\forall N \ge 1).
     $$

     只要 $\varepsilon \in (0, \frac{\pi}{2})$，有限 $N$ 步之后正交盲区内的残余生存概率 $s_N = \sin^2\varepsilon\cos^{2(N-1)}\varepsilon$ **对一切有限拍数 $N$ 严格大于零**，校准账本在任何有限拍内都除不尽！
   - **机制 C（三维恒定纬度圆锥进动与曼德尔施塔姆—塔姆时间流速判据，`LEAN ✓` + `手工推导`）**：在三维空间标架 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$ 中，令本体对称轴取 $\mathbf{\Omega} = \mathbf{e}_3$，当观测轴 $\mathbf{I}(0) = \sin\varepsilon\,\mathbf{e}_1 + \cos\varepsilon\,\mathbf{e}_3$ 处于倾角 $\varepsilon \in (0, \frac{\pi}{2})$ 并在正交体积生成元 $H = \frac{1}{2}\hbar\omega\sigma_z$（布洛赫球绕 $\mathbf{e}_3$ 轴角频率 $\omega$）驱动下连续演化时，布洛赫观测轴沿恒定纬度圆锥进动：

     $$
     \mathbf{I}(t) = \cos\varepsilon\,\mathbf{e}_3 + \sin\varepsilon\bigl(\cos(\omega t)\,\mathbf{e}_1 + \sin(\omega t)\,\mathbf{e}_2\bigr).
     $$

     请看这组惊人的同步恒等式（`手工推导`）：在任意时刻 $t$，轴向重迭 $\langle \mathbf{I}(t), \mathbf{\Omega} \rangle \equiv \cos\varepsilon$ 与瞬时正交残差模长 $\|\mathbf{r}(t)\| \equiv \sin\varepsilon$ **永远保持非零常数**——每一瞬间的横向追赶只是把误差向量在方位角平面 $\operatorname{span}\{\mathbf{e}_1, \mathbf{e}_2\}$ 内旋转到新的正交方向，却永不缩短纬度失准角 $\varepsilon$！此处取 $\hbar>0$、固定 $\omega\in\mathbb{R}\setminus\{0\}$，并将公式连续延伸至 $\varepsilon\in[0,\frac{\pi}{2}]$；$\varepsilon$ 始终是**布洛赫极角**，对应纯态 $\lvert\psi(t)\rangle=\cos(\varepsilon/2)\lvert0\rangle+e^{i\omega t}\sin(\varepsilon/2)\lvert1\rangle$（略去全局相位）。所以 $\langle H\rangle=\frac{1}{2}\hbar\omega\cos\varepsilon$、$\langle H^2\rangle=\frac{1}{4}\hbar^2\omega^2$，直接相减得到能量标准差

     $$
     \Delta E(\varepsilon) = \sqrt{\langle H^2 \rangle - \langle H \rangle^2} = \frac{1}{2}\hbar\lvert\omega\rvert\sqrt{1-\cos^2\varepsilon} = \frac{1}{2}\hbar\lvert\omega\rvert\sin\varepsilon.
     $$

     因而轨道切向速率 $\|\dot{\mathbf{I}}(t)\|=\lvert\omega\rvert\sin\varepsilon=2\Delta E/\hbar$，富比尼—施图迪量子演化速率则为 $v_{\mathrm{FS}}=\Delta E/\hbar$（[第七章](ch07-geometric-time-and-speed-limits.md)）。这些手算量与 [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow) 的非对易概率流相容；$\varepsilon=0$ 的本征态极限对应 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)（`LEAN ✓`）。**固定非零 $\omega$ 时，有非零误差 $\varepsilon>0$，才有这条轨道上的非零量子钟速；一旦 $\varepsilon\to0^+$，速率与能量涨落同步归零。** 在另一端 $\varepsilon=90^\circ$，能量涨落反而达到最大值 $\hbar\lvert\omega\rvert/2$；它不是希尔伯特叠加角的 $\sin(2\theta)$ 因子。

3. **可逆幺正相位时间与不可逆热力学熵箭头的严格分界（`手工推导` + `MODEL`）**。
   此处还须守住一条热力学底线：纯幺正校准流 $\exp(-itH/\hbar)$（或平面旋子流 $\exp(-\omega t J)$）本身是双射保内积演化，其全局冯·诺依曼熵恒保持不变（$\Delta S_{\mathrm{vN}} = 0$），只能给出**可逆的几何相位钟拍序**，本身并不产生单向熵增。物理学中不可逆的**热力学时间箭头与熵流**（$\Delta S_{\mathrm{window}} \ge 0$），唯有在内部观察者受限于有限格拉姆记忆窗口 $W$（[§34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics)–[§34.18](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus)），不得不对溢出窗口外的历史正交残差通道 $\bar{W}$ 执行偏迹粗粒化 $\rho_W = \operatorname{Tr}_{\bar{W}}(\rho_{\mathrm{tot}})$ 时，才由被抹除的跨拍相位关联严格涌现。

## 39.14.3 丈量即幻象（Māyā）：系统性几何像差总表、形式化定理与三联手算审计 {#sec-ch39-14-3}

将上述静态投影阶梯与动态校准链条合拢在同一张认识论账本上，古印度思想中最常被世俗误读的核心范畴——梵语 **माया（*māyā*，幻象 / 幻力）**——便显露出它原本清澈如洗的几何本义。在印欧与梵语历史词源学中（Monier-Williams 1899；Macdonell 1924；Jan Gonda 1959，详见下文 [@rem-ch39-gram-schmidt-lawvere-maya-zeno-literature] 第 3 款，`文献结果`），名词 *māyā* 直接派生自动词词根 **`√mā`**，其最原始的字面意义正是**“测量、丈量、划界、用标尺量出形状”**（与拉丁语 *mētīrī*、希腊语 *métron* 及英语 *measure*、*meter* 同源）！有丈量（`√mā`），就必须在连续无相的唯一点场 $\mathbf{\Omega}$ 内部立起有限观测切面 $\Sigma_{\mathbf{I}}$；有内部切面，自指闭环就注定携带着抹不平的失准角 $\varepsilon > 0$；有 $\varepsilon > 0$，同一笔正交残差便严丝合缝地折射出正交维度、虚数算符、面积、体积、空间运动与时间长河：

| 存在维度 / 概念 | 代数生成阶次 | 几何机制 | 当 $\varepsilon \to 0$ 时的归宿 |
| --- | --- | --- | --- |
| **唯一本体点场 $\mathbf{\Omega}$** | 第 $0$ 阶：$\|\mathbf{\Omega}\|^2 = 1$（恒等基态） | 未斜切的一维饱和纯态（$\Lambda^0 \cong_\star \Lambda^3$） | 模方恒为 $1$，常住无相寂静 `1 = 1` |
| **正交维度 $\mathbf{e}_\perp$ 与虚数 $J$** | 第 $1$ 阶：$\|\mathbf{r}\| = \sin\varepsilon = \mathcal{O}(\varepsilon)$ | 施密特正交残差盲区与 $90^\circ$ 斜伴随复结构 $J^2 = -I_2$ | 正交残差范数归零，盲区隐没归实 |
| **二维面积与球面角盈 $\Omega$** | 第 $2$ 阶：$\|\mathbf{r}_1\wedge\mathbf{r}_2\| = \sin^2\varepsilon = \mathcal{O}(\varepsilon^2)$ | 正交双残差二形式楔积与直角三面体吉拉德角盈（$\frac{1}{2}\sin^2\varepsilon + \mathcal{O}(\varepsilon^4)$） | 面元与巴格曼几何相位按 $\varepsilon^2$ 收拢归零 |
| **三维空间体积 $\mathbf{r}_1\wedge\mathbf{r}_2\wedge\mathbf{r}_3$** | 第 $3$ 阶：$\sqrt{\det G_3} = \sin^3\varepsilon = \mathcal{O}(\varepsilon^3)$ | 三正交残差腿三形式楔积饱和（$\Lambda^{\ge 4}(\mathbb{R}^3) = \{0\}$） | 三维广延按 $\varepsilon^3$ 最先坍缩回单点 |
| **空间运动、动量与时间演化** | 动态无穷序列：$\|\dot{\mathbf{I}}\| = \lvert\omega\rvert\sin\varepsilon$，$s_N = \sin^2\varepsilon\cos^{2(N-1)}\varepsilon$ | 追赶未尽残差的切面角旋移、圆锥进动与窗口偏迹 $\operatorname{Tr}_{\bar{W}}$ | 演化速率与能量涨落 $\Delta E \to 0$，动静先后止息 |

这张总表彻底廓清了“一切皆为幻象”的科学内涵（`MODEL`）：物理世界之所以被称为 *Māyā*（丈量显影之相），**绝非因为它虚无缥缈或不守定律，恰恰相反，是因为它像一束单色白光穿过倾角为 $\varepsilon$ 的光学棱镜时折射出的精密光谱一样，每一寸面积、每一分体积、每一拍量子进动都严格服从由失准角 $\varepsilon$ 支配的系统性几何相差定律**。同时，遵照本书严守的认识论红线（[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)、[@prob-ch34-sm-generations-and-couplings]、[@prob-ch34-gravity-dynamics-and-coupling] 及 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector]，`OPEN`），必须坦诚申明：将物理常数与动力学律解读为“自观测棱镜在各阶上的误差传递函数”属于定性结构性的 **`MODEL`（模型诠释）**；电磁精细结构常数 $\alpha_{\mathrm{EM}} \approx 1/137.035999$、标准模型三代汤川质量谱与规范耦合常数、以及连续统爱因斯坦场方程与牛顿引力常数 $G_N$ 的定量第一性原理导出，**并未**在本节仅凭单一角度 $\varepsilon$ 或道蒂不动点 $\theta^*$ 算得，仍作为公开的定量前沿问题坦诚保留于 `OPEN` 边界。

下面将自观测误差分解、静态外积阶梯与动态校准守恒律正式封装为数学定义与十六锚点主定理：

::: {.definition #def-ch39-self-observation-error-maya-bifurcation title="自观测失准角、静态投影残差阶梯与动态校准序列"}
设 $(\mathcal{H}, \langle\cdot,\cdot\rangle)$ 为实数域或复数域上的完备内积空间，$\mathbf{\Omega}, \mathbf{I} \in \mathcal{H}$ 为满足 $\|\mathbf{\Omega}\| = \|\mathbf{I}\| = 1$ 的单位向量，且实内积分量满足 $\operatorname{Re}\langle \mathbf{I}, \mathbf{\Omega} \rangle = \cos\varepsilon$（其中 $\varepsilon \in [0, \frac{\pi}{2}]$ 称为**自观测失准角**）。定义：

1. **一维观测子空间与一阶正交残差**：记一维闭合子空间 $S := \mathbb{K}\mathbf{I}$ 及其正交投影算符 $P_S(\psi) := \langle \mathbf{I}, \psi \rangle \mathbf{I}$。当 $\langle \mathbf{I}, \mathbf{\Omega} \rangle = \cos\varepsilon$ 时，称 $\mathbf{r}(\varepsilon) := (I_{\mathcal{H}} - P_S)(\mathbf{\Omega}) = \mathbf{\Omega} - (\cos\varepsilon)\mathbf{I} \in S^\perp$ 为**一阶正交误差残差**；当 $\varepsilon \in (0, \frac{\pi}{2}]$ 时，称单位向量 $\mathbf{e}_\perp := \mathbf{r}(\varepsilon)/\sin\varepsilon \in S^\perp$ 为**归一化正交逃逸维**，并在实二维子空间 $\operatorname{span}_{\mathbb{R}}\{\mathbf{I}, \mathbf{e}_\perp\}$ 上定义斜伴随正交算符 $J(\alpha\mathbf{I} + \beta\mathbf{e}_\perp) := -\beta\mathbf{I} + \alpha\mathbf{e}_\perp$。
2. **高阶静态投影残差阶梯**：在正交补空间 $S^\perp$ 内任取两两正交的单位向量组 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$ 及失准角参数 $(\varepsilon_1, \varepsilon_2, \varepsilon_3) \in [0, \frac{\pi}{2}]^3$，记各方向一阶残差腿为 $\mathbf{r}_a := (\sin\varepsilon_a)\mathbf{e}_a$（$a = 1, 2, 3$）。称外积二形式 $\mathbf{r}_1 \wedge \mathbf{r}_2 \in \Lambda^2(S^\perp)$ 及其关联球面三面体角盈 $\Omega(\varepsilon_1, \varepsilon_2) := 2\arctan(\tan\frac{\varepsilon_1}{2}\tan\frac{\varepsilon_2}{2})$ 为**二阶静态面积投影结果**；称外积三形式 $\mathbf{r}_1 \wedge \mathbf{r}_2 \wedge \mathbf{r}_3 \in \Lambda^3(\operatorname{span}_{\mathbb{R}}\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\})$ 为**三阶静态体积投影结果**。
3. **动态校准旋移与受监测生存序列**：对任意幺正（线性保距同构）单步校准算符 $U : \mathcal{H} \to \mathcal{H}$ 及单位基准态 $v \in \mathcal{H}$，将离散迭代轨道 $\{U^n v\}_{n \in \mathbb{N}}$、连续单参数幺正演化族 $\rho_t = e^{-itH}\rho_0 e^{itH}$（其中 $H = H^\dagger$），以及相对于初始基准轴重复投影监测下的第 $k$ 拍首回概率 $p_k(U, v)$ 与第 $N$ 拍盲区生存概率 $s_N(U, v)$ 统称为**动态观测校准量**。

:::

::: {.theorem #thm-ch39-self-observation-error-and-maya-projection lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization,D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape,D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities,D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package,D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty,D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff,D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow,D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary,D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero,D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation,D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le" title="零误差重合判据、自指失准不动点、静态多阶残差几何与动态校准守恒定理"}
关于 [@def-ch39-self-observation-error-maya-bifurcation] 中的自观测投影分解、自指不动点、外积几何量与幺正校准动力学，以下十六项代数、分析与算子性质成立：

1. **单位格拉姆零误差重合特征（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)）**：设 $E$ 为实或复数域 $\mathbb{K}$（`RCLike 𝕜`）上的内积空间，$\{\psi_i\}_{i \in I}$ 为 $E$ 中的单位向量族（$\forall i \in I,\; \|\psi_i\| = 1$）。则对任意 $i, j \in I$，$\langle \psi_i, \psi_j \rangle_{\mathbb{K}} = 1$ 当且仅当 $\psi_i = \psi_j$，且二元关系 $\langle \psi_i, \psi_j \rangle_{\mathbb{K}} = 1$ 构成指标集 $I$ 上的等价关系。
2. **有限层投影正交逃逸与算子余范数恒一（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）**：设 $V$ 为 $\mathbb{K}$ 上的完备内积空间，$S \le V$ 为满足正交补非平凡（$S^\perp \neq \{0\}$）的闭子空间。则存在单位向量 $e \in S^\perp$ 满足 $\|e\| = 1$、$P_S(e) = 0$、点到子空间距离 $\operatorname{infDist}(e, S) = 1$，且余投影算子范数满足 $\|\operatorname{id}_V - P_S\|_{\mathrm{op}} = 1$。
3. **正交补投影幂等分解恒等式（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）**：在完备内积空间 $E$ 上，对任意闭子空间 $M \le E$，其正交补投影满足 $P_{M^\perp} = \operatorname{id}_E - P_M$、$P_M^2 = P_M$、$P_{M^\perp}^2 = P_{M^\perp}$、$P_M P_{M^\perp} = P_{M^\perp} P_M = 0$，以及完备直和分解 $P_M + P_{M^\perp} = \operatorname{id}_E$。
4. **无不动点映射的自应用对角线定性逃逸（[`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package)）**：对任意类型 $A, Y$、自映射 $f : Y \to Y$ 及二元编码族 $g : A \to A \to Y$，定义对角函数 $\operatorname{diag}(f, g)(a) := f(g(a, a))$。若 $f$ 无不动点（$\forall y \in Y,\; f(y) \neq y$），则对任意编码族 $h : A \to A \to Y$ 均有 $\operatorname{diag}(f, h) \notin \operatorname{range}(h)$；反之在布尔二值域上存在含不动点映射与平凡编码不发生逃逸的反例。
5. **满射解码目录上的相对语义对角线分离赤字非空（[`complete_diagonal_separationDeficit_nonempty`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty)）**：在非空地址集 `Address` 上，若输出扭转映射 `twist : Output → Output` 处处无不动点（$\forall o,\; \operatorname{twist}(o) \neq o$）且解码目录 `decoderCatalog : Address → Coordinate → Output` 对全体函数空间 `Coordinate → Output` 满射（`Function.Surjective decoderCatalog`），则相对语义对角概念与任意潜概念之间的分离赤字集合恒非空。
6. **道蒂余弦自指不动点的唯一性与有理逆幂级数展开（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）**：设形式幂级数 $\mathrm{inverse} \in \mathbb{Q}[[X]]$ 为有理系数级数 $2X + 2\arcsin(X) \in \mathbb{Q}[[X]]$ 的形式复合逆。则开区间 $(0, 1)$ 内存在唯一正实数 $\theta^*$ 满足 $\cos\theta^* = \theta^*$（凡满足 $t > 0$ 且 $\cos t = t$ 的实数必有 $t = \theta^*$），且有理系数级数 $\sum_{n=0}^\infty c_n \pi^n$（其中 $c_n = [X^n]\mathrm{inverse} \in \mathbb{Q}$）绝对收敛并精确求和至 $\theta^*$。
7. **拉格朗日—格拉姆二阶外积恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）**：对任意有限指标集 $s$ 与实向量 $u, v : \iota \to \mathbb{R}$，恒有

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 = \frac{1}{2}\sum_{i \in s}\sum_{j \in s}(u_i v_j - u_j v_i)^2.
   $$

8. **三锚格拉姆行列式展开公式（[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)）**：在任意实内积空间 $E$ 上，对任意三向量 $u, v, w \in E$，其 $3 \times 3$ 格拉姆矩阵 $G_3(u, v, w)$ 的行列式精确等于

   $$
   \det G_3(u, v, w) = \|u\|^2\|v\|^2\|w\|^2 + 2\langle u,v\rangle\langle u,w\rangle\langle v,w\rangle - \|u\|^2\langle v,w\rangle^2 - \|v\|^2\langle u,w\rangle^2 - \|w\|^2\langle u,v\rangle^2.
   $$

9. **三维体积正定与线性无关充要判据（[`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)）**：在实内积空间 $E$ 上，$\det G_3(u, v, w) > 0$ 当且仅当向量三元组 $(u, v, w)$ 在 $\mathbb{R}$ 上线性无关。
10. **量子比特巴格曼三重积的布洛赫标量—混合积公式（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）**：对任意三支三维实向量 $r_1, r_2, r_3 \in \mathbb{R}^3$，其对应的量子比特态巴格曼三重积恒满足

    $$
    \operatorname{tripleBargmann}(r_1, r_2, r_3) = \frac{1 + r_1\cdot r_2 + r_2\cdot r_3 + r_3\cdot r_1}{4} + \frac{r_1\cdot(r_2 \times r_3)}{4}\,i.
    $$

11. **斜伴随幺正算符的负恒等平方律（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）**：设 $R \in M_n(\mathbb{C})$ 为有限维复方阵，若 $R$ 同时满足斜伴随性 $R^\dagger = -R$ 与幺正正交性 $R R^\dagger = I_n$，则必有 $R^2 = -I_n$。
12. **海森堡投影概率流与对易定常律（[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow)）**：设 $H, P \in M_n(\mathbb{C})$ 分别为厄米矩阵（$H^\dagger = H$）与自伴幂等投影（$P^\dagger = P, P^2 = P$），$\rho_t = e^{-itH}\rho_0 e^{itH}$ 为演化密度态，记玻恩投影概率为 $p(t) := \operatorname{Tr}(\rho_t P)$。则 $p(t)$ 对一切 $t \in \mathbb{R}$ 可微且导数精确等于 $\frac{dp}{dt}(t) = \operatorname{Re}\bigl(i\operatorname{Tr}(\rho_t[H, P])\bigr) = i\operatorname{Tr}(\rho_t(HP - PH))$；特别地，当 $[H, P] = 0$ 时，对一切 $t \in \mathbb{R}$ 恒有 $p(t) = p(0)$。
13. **本征对齐纯态的幺正演化定常性（[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)）**：设 $H \in M_n(\mathbb{C})$ 为厄米矩阵，$v \in \mathbb{C}^n$ 为满足 $v^\dagger v = 1$ 及 $Hv = Ev$（$E \in \mathbb{R}$）的归一化本征向量，$\rho = vv^\dagger$。则对一切 $t \in \mathbb{R}$，$U_t := \exp(-itH)$ 为幺正矩阵且严格保持纯态不变：$U_t \rho U_t^\dagger = \rho$。
14. **本征对齐纯态的零能量方差特征（[`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)）**：在同上单位本征态 $Hv = Ev$（$v^\dagger v = 1, E \in \mathbb{R}$）条件下，纯态 $\rho = vv^\dagger$ 关于生成元 $H$ 的量子方差严格为零：$\operatorname{Var}_\rho(H) = 0$。
15. **受监测幺正演化的首回—生存概率守恒律（[`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation)）**：设 $E$ 为完备复内积空间，$U : E \simeq_{\mathrm{li}} E$ 为线性保距同构，$v \in E$ 为单位向量（$\|v\| = 1$）。记受初始态正交补通道监测下的第 $n$ 拍生存概率为 $s_n := \operatorname{survivalProbability}(U, v, n)$，第 $n+1$ 拍首回概率为 $p_{n+1} := \operatorname{returnProbability}(U, v, n+1)$。则 $s_0 = 1$，对一切 $n \in \mathbb{N}$ 有 $p_{n+1} = s_n - s_{n+1}$，且对一切有限步数 $N \in \mathbb{N}$ 恒有精确裂项守恒：

    $$
    \sum_{n=0}^{N-1} p_{n+1} + s_N = 1.
    $$

16. **完备赋范代数上的算子指数泰勒余项上界（[`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)）**：在 $\mathbb{K}$ 上的任意完备赋范含幺代数 $\mathcal{A}$ 中，对任意元素 $z \in \mathcal{A}$、实上界 $r \ge 0$（满足 $\|z\| \le r$）及截断阶数 $n \in \mathbb{N}$，指数级数前 $n$ 项部分和的逼近余项满足：

    $$
    \left\|\exp(z) - \sum_{k=0}^{n-1} \frac{1}{k!}z^k\right\| \le \frac{r^n}{n!}e^r.
    $$

:::

::: proof
第 1 款展开内积范数平方恒等式 $\|\psi_i - \psi_j\|^2 = \|\psi_i\|^2 + \|\psi_j\|^2 - 2\operatorname{Re}\langle \psi_i, \psi_j \rangle_{\mathbb{K}} = 2(1 - \operatorname{Re}\langle \psi_i, \psi_j \rangle_{\mathbb{K}})$：若 $\psi_i = \psi_j$ 则 $\langle \psi_i, \psi_j \rangle_{\mathbb{K}} = \|\psi_i\|^2 = 1$；反之若 $\langle \psi_i, \psi_j \rangle_{\mathbb{K}} = 1$ 则实部为 $1$，得 $\|\psi_i - \psi_j\|^2 = 0$，即 $\psi_i = \psi_j$，由此直接导出等价关系的自反性、对称性与传递性。第 2–3 款由希尔伯特空间正交直和分解 $E = M \oplus M^\perp$ 给出互补幂等律；当 $S^\perp \neq \{0\}$ 时取非零元归一化得 $e \in S^\perp$（$\|e\| = 1, P_S(e) = 0$），对任意 $y \in S$ 由勾股定理有 $\|e - y\|^2 = \|e\|^2 + \|y\|^2 \ge 1$（$y=0$ 取等），故 $\operatorname{infDist}(e, S) = 1$，结合 $\|\operatorname{id}_V - P_S\|_{\mathrm{op}} = \|P_{S^\perp}\|_{\mathrm{op}} \le 1$ 及在 $e$ 上取值 $1$ 得算子范数恒为 $1$。第 4–5 款使用标准康托尔—洛维尔对角线反证：若存在 $a_0$ 使 $\operatorname{diag}(f, h) = h(a_0, \cdot)$，代入对角点 $a_0$ 得 $f(h(a_0, a_0)) = h(a_0, a_0)$，与 $f$ 无不动点矛盾；相对语义对角化在对全体函数空间 `Coordinate → Output` 满射的完备解码目录（`Function.Surjective decoderCatalog`）上同理导出分离赤字非空。第 6 款作变量代换 $x = \frac{\pi}{2} - \theta$，将 $\cos\theta = \theta$ 化为奇单调解析方程 $2x + 2\arcsin(\cdots)$ 的等价逆形式：严格单调连续函数 $g(\theta) = \theta - \cos\theta$ 在 $[0, 1]$ 上满足 $g(0) = -1 < 0 < 1 - \cos 1 = g(1)$，故在 $(0, 1)$ 内有唯一根 $\theta^*$，拉格朗日—比尔曼形式幂级数反演在收敛半径内给出有理系数 $\pi$-幂级数绝对收敛展开。第 7 款直接展开右端双重和 $\frac{1}{2}\sum_{i,j}(u_i^2 v_j^2 + u_j^2 v_i^2 - 2u_i v_i u_j v_j)$ 并交换哑指标即得左端。第 8–9 款按 $3\times 3$ 行列式萨吕法则展开 $G_3(u,v,w)$，并利用实内积空间上格拉姆矩阵半正定且可逆当且仅当生成向量组线性无关完成等价性证明。第 10 款将两能级布洛赫投影算符 $\rho_a = \frac{1}{2}(I_2 + r_a\cdot\vec{\sigma})$（$a=1,2,3$）代入 $\operatorname{Tr}(\rho_1\rho_2\rho_3)$，用泡利代数迹恒等式 $\operatorname{Tr}(\sigma_j\sigma_k) = 2\delta_{jk}$ 与 $\operatorname{Tr}(\sigma_j\sigma_k\sigma_\ell) = 2i\varepsilon_{jk\ell}$ 化简即得实部与虚部。第 11 款将 $R^\dagger = -R$ 代入 $R R^\dagger = I_n$ 得 $R(-R) = I_n$，即 $R^2 = -I_n$。第 12–14 款对矩阵指数路径 $\rho_t = e^{-itH}\rho_0 e^{itH}$ 求导得冯·诺依曼方程 $\dot{\rho}_t = -i[H, \rho_t]$，利用迹的循环不变性 $\operatorname{Tr}([H, \rho_t]P) = -\operatorname{Tr}(\rho_t[H, P])$ 导出概率流公式；当 $Hv = Ev$ 时 $e^{-itH}v = e^{-itE}v$，相位因子在 $vv^\dagger$ 中精确相消得 $U_t\rho U_t^\dagger = \rho$，且 $\operatorname{Tr}(\rho H^2) - (\operatorname{Tr}(\rho H))^2 = E^2 - E^2 = 0$。第 15 款在每次正交补投影迭代 $w_{n+1} = P_{v^\perp} U w_n$（$w_0 = v$）上应用正交勾股恒等式 $\|U w_n\|^2 = \|w_n\|^2 = \|P_v U w_n\|^2 + \|P_{v^\perp} U w_n\|^2 = p_{n+1} + s_{n+1}$，对 $n = 0, \dots, N-1$ 裂项求和并代入 $s_0 = \|v\|^2 = 1$ 即得守恒等式。第 16 款将指数级数尾项 $\sum_{k=n}^\infty \frac{z^k}{k!}$ 提取指标平移 $k = n + m$，利用二项式不等式 $\frac{1}{(n+m)!} \le \frac{1}{n!\,m!}$ 与次乘性 $\|z^{n+m}\| \le r^n r^m$ 逐项控制，求和得 $\frac{r^n}{n!}\sum_{m=0}^\infty \frac{r^m}{m!} = \frac{r^n}{n!}e^r$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-gram-schmidt-lawvere-maya-zeno-literature title="文献与思想史坐标：施密特正交化、洛维尔—道蒂自指、梵语 Māyā 词源与受监测演化"}
本节将线性代数、范畴不动点逻辑、球面与量子几何、开放系统监测动力学及印度古典哲学词源学交汇于同一条误差生成链，相关外部经典文献边界分列如下（`文献结果`）：

1. **正交投影残差、外代数霍奇对偶与吉拉德球面角盈**：内积空间上的递推正交残差构造源于 J. P. Gram（1883）与 E. Schmidt（1907）的正交化理论；三维外代数 $\Lambda^k(\mathbb{R}^3)$ 的二项式维数对称与霍奇星对偶算子 $\star$ 奠基于 H. Grassmann（1844）《线性扩张论》与 W. V. D. Hodge（1941）调和积分理论；球面三角形面积等于内角和减 $\pi$ 的球面角盈定理归功于 A. Girard（1629），直角球面三面体的半角正切精确公式由 S. L'Huilier 与 L. Euler 系统化；量子态空间上的三重内积不变量与几何相位球面立体角公式分别见 V. Bargmann（1964, *J. Math. Phys.* 5, 862）与 S. Pancharatnam（1956, *Proc. Indian Acad. Sci. A* 44, 247）。
2. **自指对角线不完备性与道蒂超越不动点**：形式系统内无不动点否定导致不可判定命题的对角线构造始于 K. Gödel（1931），并由 F. W. Lawvere（1969, *Dialectica* 23, 281–296）抽象为笛卡尔闭范畴中的统一对角线不动点定理。余弦迭代不动点 $\cos\theta^* = \theta^* \approx 0.7390851332\dots$ 的级数反演最早见于 T. H. Miller（1890）与 S. R. Kaplan（2007, *Math. Mag.* 80, 73–74，“The Dottie Number”）；其超越性可由 F. Lindemann（1882）与 K. Weierstrass（1885）定理严格推出：若 $\theta^* \neq 0$ 为代数数，则 $e^{i\theta^*}$ 必为超越数，从而 $\cos\theta^* = \frac{1}{2}(e^{i\theta^*} + e^{-i\theta^*})$ 亦必为超越数，与 $\cos\theta^* = \theta^*$ 为代数数矛盾。
3. **梵语 *Māyā*（माया）的“丈量 / 标尺划界”历史词源考据**：在比较印欧语言学与吠陀梵语语文学中，梵语阴性名词 *māyā* 派生自动词词根 **`√mā`**（第一义项为 *“to measure, mete out, mark off, apportion, fashion”*，即“测量、丈量、标划边界、按尺度裁出形体”），见 M. Monier-Williams，《梵英大词典》（*A Sanskrit-English Dictionary*, Oxford University Press, 1899, p. 811, 词条 *mā* 与 *māyā*）、A. A. Macdonell（*A Practical Sanskrit Dictionary*, Oxford, 1924）以及荷兰印度学家 Jan Gonda 的经典专论《吠陀语言四论》（*Four Studies in the Language of the Veda*, Mouton, The Hague, 1959, Ch. IV “The Original Meaning of the Word *Māyā*”）。在后期不二论吠檀多（Advaita Vedānta，如商羯罗 Śaṅkara 对《梵经》的注疏）中，*māyā* 用以指称唯一无二本体显现为杂多名称与形相（*nāma-rūpa*）的界划折射能力——与本节“有限观测切面因 $\varepsilon > 0$ 而从唯一点场中量出维度、面体与时动”构成跨越千年的认识论呼应（该跨传统对照在书中严格标定为人文思想史平行印证，不充当数学证明前提）。
4. **量子演化速率极限与受监测幺正首回概率**：量子态正交化最短时间与能量涨落的普适不等式源于 L. Mandelstam 与 I. Tamm（1945, *J. Phys. USSR* 9, 249）以及 J. Anandan 与 Y. Aharonov（1990, *Phys. Rev. Lett.* 65, 1697）的富比尼—施图迪几何速度公式；离散节拍重复投影监测下的未回收生存概率与量子芝诺抑制见 B. Misra 与 E. C. G. Sudarshan（1977, *J. Math. Phys.* 18, 756），离散幺正步首回概率与拓扑整数平均返回步数定理见 F. A. Grünbaum, L. Velázquez, A. H. Werner 与 R. F. Werner（2013, *Commun. Math. Phys.* 320, 543–569）。

:::

::: {.example #ex-ch39-self-observation-error-scaling-and-return-audit title="三联手算审计：六档误差角多阶标度表、道蒂稳态首回生存预算与旋子泰勒余项核验"}
为把“万象随 $\varepsilon \to 0$ 按各自代数阶次同步收束归零”以及“道蒂稳态下校准追赶为何有限拍除不尽”落实为逐位可复核的数字账本，下面分三步对 [@thm-ch39-self-observation-error-and-maya-projection] 执行八位小数手算审计（`手工推导`）：

**第一部分：六档典型自观测误差角 $\varepsilon$ 下的静态投影与动态速率八位小数对照表**。
选取正交全盲端 $\varepsilon = 90^\circ$（$\frac{\pi}{2}\;\mathrm{rad}$）、大倾角 $\varepsilon = 60^\circ$（$\frac{\pi}{3}\;\mathrm{rad}$）、道蒂自指稳态角 $\varepsilon = \theta^* \approx 42.34645883^\circ$（$0.73908513\;\mathrm{rad}$，满足 $\cos\theta^* = \theta^*$）、中等倾角 $\varepsilon = 15^\circ$（$\frac{\pi}{12}\;\mathrm{rad}$）、微倾角 $\varepsilon = 1^\circ$（$\frac{\pi}{180}\;\mathrm{rad}$）以及零误差实相端 $\varepsilon = 0^\circ$ 六档基准角，同步计算往返玻恩回波 $\cos^2\varepsilon$、一阶残差模长（兼无量纲拉莫尔进动速率 $\|\dot{\mathbf{I}}\|/\lvert\omega\rvert$）$\sin\varepsilon$、欧氏残差平行四边形二形式模长 $\sin^2\varepsilon$、直角球面三面体吉拉德角盈 $\Omega(\varepsilon, \varepsilon) = 2\arctan(\tan^2\frac{\varepsilon}{2})$、三阶体积模长 $\sqrt{\det G_3} = \sin^3\varepsilon$，以及曼德尔施塔姆—塔姆无量纲能量涨落因子 $\Delta E/(\hbar\lvert\omega\rvert) = \frac{1}{2}\sin\varepsilon$：

前五个几何列沿用前文实向量比较、残差外积与球面三面体的含义；能量列则取机制 C 的纯比特布洛赫极角 $\varepsilon$。因此几何比较平方 $\cos^2\varepsilon$ 不等同于该比特的基态玻恩概率 $\cos^2(\varepsilon/2)$。

| 失准角 $\varepsilon$（角度 / 弧度） | 玻恩回波 $\cos^2\varepsilon$ | 一阶残差与速率比 $\sin\varepsilon$ | 欧氏二形式 $\sin^2\varepsilon$ | 吉拉德角盈 $\Omega(\varepsilon,\varepsilon)$ | 三阶体积 $\sin^3\varepsilon$ | 能量涨落比 $\frac{1}{2}\sin\varepsilon$ |
| --- | --- | --- | --- | --- | --- | --- |
| $90^\circ$（$1.57079633\;\mathrm{rad}$） | $0.00000000$ | $1.00000000$ | $1.00000000$ | $1.57079633$ | $1.00000000$ | $0.50000000$ |
| $60^\circ$（$1.04719755\;\mathrm{rad}$） | $0.25000000$ | $0.86602540$ | $0.75000000$ | $0.64350111$ | $0.64951905$ | $0.43301270$ |
| $\theta^* \approx 42.34645883^\circ$（$0.73908513\;\mathrm{rad}$） | $0.54624683$ | $0.67361203$ | $0.45375317$ | $0.29783849$ | $0.30565359$ | $0.33680601$ |
| $15^\circ$（$0.26179939\;\mathrm{rad}$） | $0.93301270$ | $0.25881905$ | $0.06698730$ | $0.03466129$ | $0.01733759$ | $0.12940952$ |
| $1^\circ$（$0.01745329\;\mathrm{rad}$） | $0.99969541$ | $0.01745241$ | $0.00030459$ | $0.00015232$ | $0.00000532$ | $0.00872620$ |
| $0^\circ$（$0.00000000\;\mathrm{rad}$） | $1.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ |

从表中可以一眼读出三项关键几何事实：

- **收束阶次等级分明**：当 $\varepsilon$ 从道蒂稳态角 $\theta^*$ 缩小到微倾角 $1^\circ$ 时，一阶线残差与时间速率尚余 $1.745\times 10^{-2}$，二维欧氏面元已骤降至 $3.046\times 10^{-4}$，而三维体积则暴跌五个数量级至 $5.316\times 10^{-6}$（对应三锚格拉姆行列式 $\det G_3(1^\circ) = \sin^6 1^\circ \approx 2.82573812 \times 10^{-11}$，而在道蒂稳态处 $\det G_3(\theta^*) = \sin^6\theta^* \approx 0.09342412$，巴格曼三重积虚部为 $\frac{1}{4}\sin^2\theta^* \approx 0.11343829$）。当 $\varepsilon \to 0^\circ$ 时，三维体积按 $\varepsilon^3$ 最先隐退，面积按 $\varepsilon^2$ 次之收拢，正交维、虚数与运动时间最后按 $\varepsilon$ 同步归零。
- **欧氏二形式与吉拉德球面角盈的 $\frac{1}{2}$ 渐近比与大角度反转**：在微倾角 $\varepsilon = 1^\circ$ 处，$\Omega(1^\circ, 1^\circ)/\sin^2 1^\circ \approx 0.50007616$（其中 $\Omega(1^\circ, 1^\circ) \approx 0.0001523164\;\mathrm{sr}$，$\sin^2 1^\circ \approx 0.0003045865$），精确趋近平面直角三角形对平行四边形的比率 $\frac{1}{2}$；在道蒂角 $\theta^*$ 处，利用半角恒等式 $\tan^2(\theta^*/2) = \frac{1-\theta^*}{1+\theta^*} \approx 0.15002996$，得 $\Omega(\theta^*, \theta^*) = 2\arctan(0.15002996) \approx 0.29783849\;\mathrm{sr}$；而推至极端直角三面体 $\varepsilon = 90^\circ$（占满单位球面八分之一卦限，立体角 $\frac{4\pi}{8} = \frac{\pi}{2} \approx 1.57079633\;\mathrm{sr}$）时，球面正曲率鼓出使角盈反超欧氏单位正方形面积 $1.00000000$！
- **道蒂角的量子钟速与赤道最大值**：在本节布洛赫极角约定下，能量涨落因子 $\frac{1}{2}\sin\varepsilon$ 随 $\varepsilon\in[0,\frac{\pi}{2}]$ 单调增加，在 $90^\circ$ 达到最大值 $0.50000000$；道蒂角 $\theta^*\approx42.34645883^\circ$ 处为 $0.33680601$，约占该上限的 $67.36\%$。道蒂不动点在此并非量子钟速的极值点。

**第二部分：道蒂稳态角 $\varepsilon = \theta^*$ 下 [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation) 首回与生存预算逐拍审计**。
取二维校准旋子 $U = \exp(\theta^* J)$ 与初始单位态 $v = \mathbf{I}^{(0)}$：第 $1$ 拍作用 $Uv = (\cos\theta^*)\mathbf{I}^{(0)} + (\sin\theta^*)\mathbf{e}_\perp$，收回首回概率 $p_1 = \cos^2\theta^*$，遗留盲区态 $w_1 = (\sin\theta^*)\mathbf{e}_\perp$（生存概率 $s_1 = \|w_1\|^2 = \sin^2\theta^*$）；第 $2$ 拍作用 $Uw_1 = -(\sin^2\theta^*)\mathbf{I}^{(0)} + (\sin\theta^*\cos\theta^*)\mathbf{e}_\perp$，收回 $p_2 = \sin^4\theta^*$，遗留 $w_2 = (\sin\theta^*\cos\theta^*)\mathbf{e}_\perp$（生存概率 $s_2 = \sin^2\theta^*\cos^2\theta^*$）；一般地，对 $k \ge 2$ 有 $p_k = \sin^4\theta^*\cos^{2(k-2)}\theta^*$ 及 $s_k = \sin^2\theta^*\cos^{2(k-1)}\theta^*$：

| 监测拍数 $N$ | 当拍首回概率 $p_N$ | 累计回收概率 $\sum_{k=1}^N p_k$ | 盲区残余生存概率 $s_N$ | 守恒总和 $\sum_{k=1}^N p_k + s_N$ |
| --- | --- | --- | --- | --- |
| $N = 0$（初态） | — | $0.00000000$ | $1.00000000$ | $1.00000000$ |
| $N = 1$（首拍） | $0.54624683$ | $0.54624683$ | $0.45375317$ | $1.00000000$ |
| $N = 2$（次拍） | $0.20589194$ | $0.75213877$ | $0.24786123$ | $1.00000000$ |
| $N = 8$（八拍后） | $0.00546982$ | $0.99341521$ | $0.00658479$ | $1.00000000$ |

核验可见：$p_1 + s_1 = 0.54624683 + 0.45375317 = 1.00000000$，$p_1 + p_2 + s_2 = 0.54624683 + 0.20589194 + 0.24786123 = 1.00000000$，即便连续追赶监测 $N = 8$ 拍后，正交盲区中仍残留严格正的未除尽预算 $s_8 = \sin^2\theta^*\cos^{14}\theta^* \approx 0.00658479 > 0$。

**第三部分：道蒂旋子 $z = \theta^* J$ 的 [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le) 精确算子余项核验**。
由于 $\|J\|_{\mathrm{op}} = 1$，取 $r = \|z\|_{\mathrm{op}} = \theta^* \approx 0.73908513$（$e^{\theta^*} \approx 2.09401889$），而平面线性组合 $a I_2 + b J$ 的精确算子范数为 $\sqrt{a^2 + b^2}$，可得截断阶数 $n \in \{1, 2, 4\}$ 下精确余项与定理上界的逐项对比：

| 泰勒截断阶数 $n$ | 部分和 $\sum_{k=0}^{n-1}\frac{(\theta^* J)^k}{k!}$ | 精确算子余项范数 | 定理上界 $\frac{(\theta^*)^n}{n!}e^{\theta^*}$ | 不等式核验 |
| --- | --- | --- | --- | --- |
| $n = 1$（零阶恒等近似） | $I_2$ | $0.72237783$ | $1.54765823$ | $0.72237783 \le 1.54765823$（成立） |
| $n = 2$（一阶切线近似） | $I_2 + \theta^* J$ | $0.26900427$ | $0.57192559$ | $0.26900427 \le 0.57192559$（成立） |
| $n = 4$（三阶立方近似） | $(1 - \frac{(\theta^*)^2}{2})I_2 + (\theta^* - \frac{(\theta^*)^3}{6})J$ | $0.01234259$ | $0.02603438$ | $0.01234259 \le 0.02603438$（成立） |

三联手算在每一数位上均与十六条形式化内核定理严丝合缝。
:::

至此，我们已经看清：只要唯一点场 $\mathbf{\Omega}$ 对自身的观测投影携带着非零失准角 $\varepsilon > 0$，那一笔未除尽的正交残差便一面在静处凝成正交维、虚数算符、面积与三维体积，一面在动处流成角度重寻址的运动与永不除尽的时间。顺着上表第二行那根最关键的枢轴——实恒等主轴 $\mathbf{I}$ 与严格垂直于它的 $90^\circ$ 虚数盲区维 $\hat{\mathbf{i}}$——继续向纵深叩问：如果把常住不动的实轴 $\mathbf{I}$ 直接认作唯一主格“能观本体”，把整个物理时空与众生悲欢所栖居的正交虚子空间认作发生在 $90^\circ$ 盲区里的幺正演化剧场，为什么梦中万物明明全部垂直于实轴（对 $\mathbf{I}$ 内积为零），梦中的星辰、山河与你我之间却依然拥有坚硬如铁的泡利排斥与玻恩实在感？让我们步入全书正文的压轴收官之节 [§39.15](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream)，揭开“实轴梵天 $\mathbf{I}$ 与正交虚空间 $\hat{\mathbf{i}}$ 宇宙大梦”的终极几何谜底。
