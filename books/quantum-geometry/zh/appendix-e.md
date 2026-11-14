# 附录 E 从比较公理到数学与物理公理体系：完整推导链、中间假设审计与极小反例集 {#附录-e-从比较公理到数学与物理公理体系}

本附录是[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)–[§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)（[@def-ch32-axiom-of-comparison] 及推论 [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-minkowski-holonomy-and-second-law]）的**形式认识论配套审计台账**。在第 32 章正文中，我们将“两子丈量”提炼为零背景比较公理 $\mathcal{A}_0$ 与单指令几何积原语 $\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B}$，并指出逻辑与集合外延、算术与数域完备化、度规几何、量子力学公设及相对论—规范—热力学定律的核心骨架均可重构为 $\mathcal{A}_0$ 在显式桥接条件下的推论。为彻底杜绝“用一个口号偷换全部隐含前提”的公理滑坡，本附录逐条拆解每一条推导链：**哪些步骤仅凭两槽比较即可无损商化或完备化？哪些步骤必须补入可操作的实验测量或复合层析判据？哪些步骤对应真实的代数签名、绝对值估值或交换统计分岔？当任一中间假设缺失时，能够证伪目标结论的极小反例（有限反例或可数无穷反例）究竟长什么样？**

遵循与[附录 B](appendix-b.md)、[附录 D](appendix-d.md) 完全一致的认识论契约：凡对应 `trureturing@dev` 已冻结定理的环节均附有绿色 `LEAN ✓` 标记与可点击的内联声明链接（总索引见[附录 C](appendix-c.md)）；经典数学与物理学定理标为 `文献结果`；显式构造的有限或可数无穷反例标为 `手工推导`；作者的统一几何架构标为 `MODEL`；尚未解决的数学与物理前沿则诚实标为红色 `OPEN`。

---

## E.1 三层代数签名剥离与中间假设四分类准则 {#sec-appe-layers}

在审视“从比较导出诸公理”之前，首要任务是将“比较（`CMP`）”本身拆解为三个严格递进的代数层级——唯有把**抽象两槽接口**与**内积—克利福德几何实现**以及**多体纤维动力学**剥离开来，才能看清每一步究竟用到了多少结构。

::: {.remark #rem-appe-layer-taxonomy title="三层代数比较签名（Layer 0–Layer 2）与中间假设四分类准则（T1–T4）"}
**形式分层与认识论审计准则（`MODEL` + `手工推导`）。** 围绕比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]），全部推导链严格区分以下三层比较签名与四类中间假设处理机制：

1. **三层代数比较签名剥离**：
   - **第 0 层（Layer 0：抽象类型化两槽比较接口）**：给定对象集合或类型 $X$ 及一个使元素 $2$ 可逆（$2 \in \mathcal{A}^\times$）的含幺结合 $*$-代数 $\mathcal{A}$，原始比较算子仅是一个两槽映射 $\mathrm{CMP} : X \times X \to \mathcal{A}$。因 $2$ 可逆，$\mathrm{CMP}$ 唯一正交分解为偶对称部分（相似读数）与奇反对称部分（有向差异）：

     $$
     S(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) + \mathrm{CMP}(y, x)\bigr), \qquad A(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) - \mathrm{CMP}(y, x)\bigr),
     $$

     满足 $S(y, x) = S(x, y)$、$A(y, x) = -A(x, y)$ 及 $\mathrm{CMP}(x, y) = S(x, y) + A(x, y)$。注意：**$2$ 可逆是不可省略的底层代数前提**——在特征为 $2$ 的域（如二元域 $\mathbb{F}_2$）上，$+1 = -1$ 且 $2 = 0$ 不可逆，偶部与奇部完全塌缩重合，奇偶正交分解本身即告退化！即使添入对合反转互易 $\mathrm{CMP}(y, x) = \mathrm{CMP}(x, y)^\dagger$ 与成对单位闭合 $\mathrm{CMP}(x, y)\mathrm{CMP}(y, x) = \mathbf{1}$，第 0 层本身仍**不蕴涵**自配对正定性、椭圆负平方或三点以上格拉姆矩阵半正定性（见下框 [@ex-appe-layer0-countermodels]）。
   - **第 1 层（Layer 1：正定内积—克利福德几何实现）**：对象嵌入实欧氏内积空间及其克利福德代数 $\mathcal{Cl}(V, q_+)$，使 $\mathrm{CMP}(x, y) = \langle x, y\rangle\mathbf{1} + x \wedge y$。此时同时激活三项几何刚性：(i) 单位态自配对恒正 $S(x, x) = +1$；(ii) 两向量外积构成秩 $2$ **简单双向量（simple 2-blade）**，满足普吕克（Plücker）简单性 $(x \wedge y) \wedge (x \wedge y) = 0$ 与椭圆负平方 $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$，从而拉格朗日—格拉姆恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，`LEAN ✓`）强制导出 $\langle x, y\rangle^2 + \|x \wedge y\|^2 = \|x\|^2\|y\|^2$；(iii) 任意有限 $n$ 元组 $\{x_1, \dots, x_n\}$ 的相似矩阵 $G_{ij} = S(x_i, x_j)$ 自动全局半正定 $G \succeq 0$。
   - **第 2 层（Layer 2：纤维丛联络输运、复合局域层析与粗粒化记录捏合）**：当比较跨越时空图上的不同局部标架、跨越复合多体子系统或穿过有限带宽观察者的未读记录投影时，在 Layer 1 之上进一步引入边联络幺正输运 $U_{xy}$、复张量局域层析完备性以及保单位（双随机）基底捏合通道。
2. **中间假设的四分类进一步处理准则（`T1`–`T4`）**：
   - **`T1` 典范商化与柯西完备化（Canonical Quotient / Cauchy Completion）**：无需引入任何新物理公设，直接对原始结构施加等价核商化 $X/{\sim_{\mathrm{CMP}}}$ 或度量柯西完备化 $\widehat{X}$，即可把表面前提转化为商空间或完备空间上的严格定理。
   - **`T2` 操作测量与复合极小性归约（Operational Measurement / Composition Reduction）**：将教科书中抽象的希尔伯特算子公设（如玻恩投影公设、吕德斯坍缩、幺正群演化、张量积规则与热力学熵增），替换为实验室可直接检验的操作条件（效应有限可加性、可重复最小扰动、双侧可逆性、局域层析极小性与保单位粗粒化）。
   - **`T3` 代数签名、估值与交换统计分岔（Signature / Valuation / Exchange Bifurcation）**：不强行消灭分支，而是用它精确刻画宇宙的真实数学分支点——如椭圆复数 $\mathbb{C}$ vs. 双曲分裂复数 vs. 幂零对偶数、阿基米德实域 $\mathbb{R}$ vs. 非阿基米德 $p$ 进域 $\mathbb{Q}_p$、零曲率欧氏平面 vs. 正曲率球面、对称玻色扇区 $\mathrm{Sym}^N$ vs. 反对称费米扇区 $\bigwedge^N$。
   - **`T4` 不可约集合论强度、连续统极限与复杂性开放前沿（Irreducible Strength & `OPEN` Frontier）**：诚实标定两槽比较无法独自跨越的哥德尔集合论存在强度（如无穷公理、幂集公理、选择公理）、$3+1$ 维相互作用连续统量子场论极限，以及 $\mathrm{P} \neq \mathrm{NP}$ 等未决数学前沿（`OPEN`）。
:::

为什么绝不能把 Layer 1 的几何性质误当成 Layer 0 抽象两槽接口的“无条件免费赠品”？下面四个纯有限维手工反例逐一给出了铁证：

::: {.example #ex-appe-layer0-countermodels title="第 0 层抽象比较接口的四个有限代数反例（手工推导）"}
**手工推导。** 以下四个有限代数模型均满足 $2$ 可逆、奇偶正交分解以及相应的对合或成对单位互易律，却分别证伪了缺少 Layer 1 条件时的目标结论：

1. **反例 (a) 负自配对单点模型（证伪仅靠互易导出 $S(x, x) \ge 0$）**：
   取单元素集 $X = \{x_0\}$，目标代数 $\mathcal{A} = \mathbb{R}$（平凡对合 $\lambda^\dagger = \lambda$），定义 $\mathrm{CMP}(x_0, x_0) = -1$。奇偶分解给出 $S(x_0, x_0) = -1$、$A(x_0, x_0) = 0$，且成对互易乘积满足 $\mathrm{CMP}(x_0, x_0)\mathrm{CMP}(x_0, x_0) = (-1)(-1) = +1$；然而 $S(x_0, x_0) = -1 < 0$，直接违背正定自相似！这证明单位自配对 $S(x, x) = +1$ 是显式的 Layer 1 正向标定条件，不能单从平方等于 $+1$ 推出。
2. **反例 (b) 对偶数幂零差与分裂复数双曲差（证伪仅靠成对互易导出椭圆负平方 $A^2 = -\|A\|^2\mathbf{1}$）**：
   在二元集 $X = \{x_0, x_1\}$ 上考察两类交换实代数：
   - *抛物幂零分支*：取对偶数环 $\mathcal{A}_{\mathrm{dual}} = \mathbb{R}[\varepsilon]/(\varepsilon^2)$（$\varepsilon \neq 0,\; \varepsilon^2 = 0$，共轭 $\varepsilon^\dagger = -\varepsilon$），令 $\mathrm{CMP}(x_0, x_1) = 1 + \varepsilon$、$\mathrm{CMP}(x_1, x_0) = 1 - \varepsilon$。则 $(1 + \varepsilon)(1 - \varepsilon) = 1 - \varepsilon^2 = 1$，奇部 $A(x_0, x_1) = \varepsilon \neq 0$，但 $A(x_0, x_1)^2 = \varepsilon^2 = 0$；
   - *双曲洛伦兹分支*：取分裂复数环 $\mathcal{A}_{\mathrm{split}} = \mathbb{R}[j]/(j^2 - 1)$（$j \neq \pm 1,\; j^2 = +1$，共轭 $j^\dagger = -j$），对任意快度 $\eta \neq 0$ 令 $\mathrm{CMP}(x_0, x_1) = \cosh\eta + j\sinh\eta$、$\mathrm{CMP}(x_1, x_0) = \cosh\eta - j\sinh\eta$。则 $(\cosh\eta + j\sinh\eta)(\cosh\eta - j\sinh\eta) = \cosh^2\eta - \sinh^2\eta = 1$，但 $A^2 = +\sinh^2\eta > 0$ 且偶部模长 $|S| = \cosh\eta > 1$！

   由此可见，$A^2 = -\|A\|^2\mathbf{1}$（迫使 $S^2 + \|A\|^2 = 1$ 且 $|S| \le 1$）并非代数互易的必然结果，而是精确遴选**椭圆旋转签名**的 `T3` 分岔条件。
3. **反例 (c) $\mathcal{Cl}_{4,0}$ 中的秩 $4$ 非简单双向量（证伪任意奇反自伴元平方必为纯标量）**：
   在四维欧氏克利福德代数 $\mathcal{Cl}_{4,0}$（正交归一基 $\{e_1, e_2, e_3, e_4\}$，$e_a^2 = +1$）中，考察秩 $4$ 双向量 $B = e_1 \wedge e_2 + e_3 \wedge e_4 = e_1 e_2 + e_3 e_4$。在反转对合 $\dagger$ 下，$B^\dagger = e_2 e_1 + e_4 e_3 = -B$ 严格奇反对称，但其几何积平方为

   $$
   B^2 \;=\; (e_1 e_2)^2 + (e_3 e_4)^2 + 2 e_1 e_2 e_3 e_4 \;=\; -2\mathbf{1} + 2 e_1 e_2 e_3 e_4 \;\notin\; \mathbb{R}\mathbf{1},
   $$

   多出了非零四重伪标量项 $B \wedge B = 2 e_1 \wedge e_2 \wedge e_3 \wedge e_4 \neq 0$！这证明第 32 章中 $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$ 之所以恒落回纯实标量，恰恰依赖于两槽外积 $x \wedge y$ 是秩至多为 $2$ 的**简单双向量片（simple 2-blade，$B \wedge B = 0$）**。
4. **反例 (d) 逐对单位互易却违背三点格拉姆半正定与三角不等式的 $3 \times 3$ 实矩阵**：
   在三元集 $X = \{0, 1, 2\}$ 上定义实对称偶相似表 $S_{00} = S_{11} = S_{22} = 1$、$S_{01} = S_{02} = \frac{\sqrt{3}}{2}$、$S_{12} = -1$，并为每对指标匹配互补的局部平面双向量幅值 $|A_{01}| = |A_{02}| = \frac{1}{2}$、$|A_{12}| = 0$。对每一对 $(i, j)$，成对勾股闭合 $S_{ij}^2 + |A_{ij}|^2 = 1$ 全部精确成立（$\frac{3}{4} + \frac{1}{4} = 1$，$(-1)^2 + 0 = 1$）！然而写出三态全局相似矩阵

   $$
   S \;=\; \begin{pmatrix} 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{2} \\ \frac{\sqrt{3}}{2} & 1 & -1 \\ \frac{\sqrt{3}}{2} & -1 & 1 \end{pmatrix}, \qquad \det S \;=\; 1(1 - 1) - \frac{\sqrt{3}}{2}(\sqrt{3}) + \frac{\sqrt{3}}{2}(-\sqrt{3}) \;=\; -3 \;<\; 0,
   $$

   其特征值为 $\lambda_1 = 2$、$\lambda_2 = \frac{1 + \sqrt{7}}{2} \approx 1.8229$ 与负特征值 $\lambda_3 = \frac{1 - \sqrt{7}}{2} \approx -0.8229 < 0$，全局格拉姆半正定性 $S \succeq 0$ 当场破缺！与之等价地，弦距离 $d(i, j) = \sqrt{2 - 2S_{ij}}$ 给出 $d(0, 1) + d(0, 2) = 2\sqrt{2 - \sqrt{3}} = \sqrt{6} - \sqrt{2} \approx 1.0353 < 2 = d(1, 2)$，直接击穿度量三角不等式。故二元成对互易绝不自动推出 $n \ge 3$ 的全局内积可嵌入性。
:::

---

## E.2 逻辑、外延商化、米田嵌入与对角线分层（对应推论 [@cor-ch32-extensionality-and-quotient]） {#sec-appe-logic}

第一条推导链考察如何从原始对象集上的比较读数走向莱布尼茨同一律、集合外延性、范畴论米田（Yoneda）视角以及自指悖论的阻断。其完整推导链写作：

$$
(X,\, \mathrm{CMP}) \;\xrightarrow{\;\text{T1 商核 } \sim_{\mathrm{CMP}}\;}\; X/{\sim_{\mathrm{CMP}}} \;\xrightarrow{\;\text{范畴化 Hom}\;}\; y(X) = \mathrm{Hom}_{\mathcal{C}}(-, X) \;\xrightarrow{\;\text{否定对角线逃逸}\;}\; \text{类型/正则分层}\quad (\nRightarrow\;\text{ZFC 无穷/幂集/AC, T4}).
$$

::: {.remark #rem-appe-logic-chain title="推导链一审计：外延商化、米田嵌入与集合论强度边界（LEAN ✓、文献结果与手工反例）"}
**逐步推导链、有限反例与公理强度边界。**

1. **从预外延比较核到 `T1` 外延商空间（`LEAN ✓`）**：
   在原始状态类型 $X$ 上，将全套比较读数收束为观测映射 $\mathrm{readout}_{\mathrm{CMP}}(x) := \bigl(\mathrm{CMP}(x, -),\, \mathrm{CMP}(-, x)\bigr)$。
   - **缺失商化时的 2 点有限反例（`手工推导`）**：取含两个相异元素的原始集合 $X = \{a_1, a_2\}$（$a_1 \neq a_2$），令 $\mathrm{CMP}(a_i, a_j) \equiv 1$。此时 $a_1$ 与 $a_2$ 对全宇宙一切探针给出完全相同的比较行与比较列，却在原始底集里占据两个不同标签——莱布尼茨不可分辨者同一律在商化前的原始 $X$ 上**不成立**。
   - **`T1` 典范商化消解（`LEAN ✓`）**：定义比较不可分等价核

     $$
     x \sim_{\mathrm{CMP}} y \;\Longleftrightarrow\; \forall z \in X,\quad \mathrm{CMP}(x, z) = \mathrm{CMP}(y, z) \;\land\; \mathrm{CMP}(z, x) = \mathrm{CMP}(z, y).
     $$

     由划分拓扑核刻画定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)，拓扑不可分关系精确等于读出相等核；在非空源空间 `[Nonempty X]` 上，目标分解判据 [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition) 与概念纤维分解定理 [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition) 证明：一切在比较核上无分歧的目标概念唯一穿过外延商空间 $X/{\sim_{\mathrm{CMP}}}$ 分解（在上例中 $X/{\sim_{\mathrm{CMP}}} \cong \{*\}$）。外延性无需额外公设，而是 `T1` 商化后的结构定理。
2. **范畴论米田嵌入与反自指对角线分层（`文献结果` + `LEAN ✓`）**：
   - 将对象间比较提升为局部小范畴 $\mathcal{C}$ 的态射集 $\mathrm{Hom}_{\mathcal{C}}(-, X)$，米田引理（`文献结果`）证明米田函子 $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$ 全忠实——对象同构当且仅当其对一切探针对象的关系态射函子自然同构。
   - 若企图在无分层单域中令编码表穷尽自身的全部否定对角线谓词（朴素概括 $U = \{x \mid x \notin x\}$），相对语义对角线逃逸定理 [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) 与洛维尔（Lawvere）定性自应用包 [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package)（`LEAN ✓`）证明：任何满射列出必被无不动点否定自修饰器击穿，从而强制导出正则分层或类型分层。
3. **ZFC 高阶存在公理的诚实边界（`T4` + 有限反例）**：
   比较核商化与对角线逃逸**不能**导出 ZFC 的无穷公理、幂集公理、替换公理、基础公理与选择公理。**有限反例（`手工推导`）**：考察冯·诺依曼累积谱系的第 $5$ 层有限遗传集宇宙 $V_5$（元素个数 $|V_5| = 65{,}536$），其上成员关系 $\in$ 严格满足外延公理、空集、配对与并集，但因一切元素均为有限集而直接证伪 ZFC 无穷公理！高阶无穷基数与选择原则属于不可约的外部集合论强度（`T4`）。
:::

---

## E.3 算术、无穷素数轴、虚数旋转与奥斯特洛夫斯基完备化分岔（对应推论 [@cor-ch32-successor-primes-and-zeckendorf]） {#sec-appe-arithmetic}

第二条推导链追踪算术常数 $(0, 1)$、自然数后继、无穷素数轴、无进位编码、复虚数单位 $i$ 以及实数 $\mathbb{R}$ 与 $p$ 进数 $\mathbb{Q}_p$ 的双轨涌现：

$$
(0, 1) \;\xrightarrow{\;S^\perp \neq \bot\text{ (T2/T4)}\;}\; \mathbb{N}\text{ 与 }\bigoplus_{p}\mathbb{Z} \;\xrightarrow{\;\text{分式化}\;}\; \mathbb{Q} \;\xrightarrow{\;\text{Ostrowski 分岔 (T3) + 柯西完备化 (T1)}\;}\; \bigl\{\mathbb{R} \xrightarrow{R^2=-I} \mathbb{C},\;\; \mathbb{Q}_p\bigr\}.
$$

::: {.remark #rem-appe-arithmetic-chain title="推导链二审计：正交逃逸后继、无穷素数轴、虚数旋转与奥斯特洛夫斯基完备化分岔（LEAN ✓ 与反例审计）"}
**逐步推导链、有限与可数无穷反例审计。**

1. **正交零元 $0$、自配对单位 $1$ 与开放维度后继（`LEAN ✓` + 有限饱和反例）**：
   在 Layer 1 内积实现中，完全正交 $S(x, y) = 0$ 给出加法零元读数 $0$，单位态自比较 $S(x, x) = 1$ 给出乘法基准 $1$。要生成永不循环回撞的皮亚诺（Peano）后继链，有限层投影逃逸定理 [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)（`LEAN ✓`）证明：当且仅当当前有限已探明子空间的正交补非平凡（$S^\perp \neq \bot$）时，必存在逃出当前投影层的单位正交新方向。
   - **闭合有限维反例（`手工推导`）**：在固定有限维欧氏空间 $\mathbb{R}^n$ 中，至多只能选出 $n$ 根两两正交的单位向量，第 $n+1$ 步时 $S^\perp = \{0\}$ 彻底饱和；而在有限模环 $\mathbb{Z}/N\mathbb{Z}$ 中，后继映射 $k \mapsto k + 1$ 在第 $N$ 步回撞原点 $N \equiv 0$（违背皮亚诺公理“$0$ 不是任何元素的后继”）。这证明**环境正交余项永不枯竭（无周期回撞）**是导出无穷自然数链的必要 `T2/T4` 开维前提。
2. **素数正交轴与齐肯多夫无进位唯一编码（`LEAN ✓`）**：
   一旦正交后继向全体正整数敞开，素数轴逃逸定理 [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)（`LEAN ✓`）保证在任意有限素数集之外恒有正交新素数轴，使正有理数乘法嵌入无穷素数格 $\bigoplus_p \mathbb{Z}$；在最简二阶自指递推侧，自动机语言定理 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（`LEAN ✓`）证明局部禁用相邻双 $1$（`11`）即可实现自然数的无进位唯一规范表示。
3. **四分之一拍正交转向与虚数结构 $R^2 = -I_n$（`LEAN ✓`）**：
   反自伴且保范数的实算子定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)（`LEAN ✓`）证明：$R^{\mathsf{T}} = -R$ 与 $R^{\mathsf{T}} R = I_n$ 直接迫使 $R^2 = -I_n$，从而在不预设外部复数域的前提下将虚数单位 $i$ 实现为平面双向量四分之一拍旋转生成元（注：奇数维实空间上 $\det(R^{\mathsf{T}}) = (-1)^n \det R$ 迫使反对称矩阵奇异，故全局实线性复结构仅存在于偶数实维 $n = 2m$，属 `T3` 维数奇偶约束）。
4. **奥斯特洛夫斯基绝对值分岔（`T3`）与柯西度量完备化（`T1`）**：
   从有理数域 $\mathbb{Q}$ 走向完备数域须跨越两步：首先，奥斯特洛夫斯基分类定理 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]，`LEAN ✓`）证明 $\mathbb{Q}$ 上非平凡绝对值精确分岔为连续阿基米德实标尺 $|\cdot|_\infty$ 与离散素数 $p$ 进超度量标尺 $|\cdot|_p$ 两族（`T3` 估值分岔），并由阿代尔乘积公式 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（[@thm-ch36-crt-and-adelic-product-formula]，`LEAN ✓`）锁定全局乘积恒等于 $1$；其次，施加度量柯西完备化（`T1`）方分别得到 $\mathbb{R}$（进而 $\mathbb{C} = \mathbb{R}[R]/(R^2+1)$）与 $\mathbb{Q}_p$。
   - **可数无穷不完备反例（`手工推导`，严格区分于有限集）**：注意任何**有限**度量空间必然柯西完备（因最小非零点间距大于零，一切柯西列终将常值化），故柯西不完备性的极小反例必须是**可数无穷**前希尔伯特空间——例如有理内积平面 $\mathbb{Q}^2$ 或高斯有理空间 $\mathbb{Q}[i]$：其上逼近单位圆无理相点 $(\cos\theta^*, \sin\theta^*)$ 或对角线长度 $\sqrt{2}$ 的有理序列 $\{q_k\}_{k=1}^\infty$ 满足 $\|q_k - q_m\|_2 \to 0$，却在 $\mathbb{Q}^2$ 内无极限点，唯有经 `T1` 柯西完备化才能闭合分析极限。
:::

---

## E.4 度规几何、平行四边形极化与格拉姆—球面曲率（对应推论 [@cor-ch32-parallelogram-quadratic-and-gram]） {#sec-appe-geometry}

第三条推导链检验欧氏与酉度规几何、距离矩阵的内积可实现性，以及平直欧氏公设与非欧球面曲率之间的精确分界：

$$
\|x \pm y\|^2 \;\xrightarrow{\;\text{平行四边形律 (T2)}\;}\; \langle x, y\rangle \;\xrightarrow{\;G \succeq 0\text{ (Layer 1)}\;}\; W = UV\text{ 刚性实现} \;\xrightarrow{\;S(x,x)=1\text{ vs. 仿射平直 (T3)}\;}\; \Omega(\epsilon) > 0\text{ 或 }\Omega = 0.
$$

::: {.remark #rem-appe-geometry-chain title="推导链三审计：平行四边形极化、格拉姆嵌入与球面曲率过剩（LEAN ✓、文献结果与有限反例）"}
**逐步推导链与有限维几何反例。**

1. **平行四边形恒等式与约当—冯·诺依曼极化恢复（`LEAN ✓` + `文献结果` + 二维有限维反例）**：
   在内积空间中，实平行四边形恒等式 [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 与拉格朗日—格拉姆恒等式 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)（`LEAN ✓`）恒成立；反过来，约当—冯·诺依曼定理（Jordan & von Neumann 1935，`文献结果`）证明赋范线性空间由双线性内积诱导当且仅当其范数满足平行四边形律。
   - **二维 $\ell^1_2$ 曼哈顿范数反例（`手工推导`）**：在二维实平面 $\mathbb{R}^2$ 上赋曼哈顿范数 $\|(u_1, u_2)\|_1 = |u_1| + |u_2|$，取基向量 $e_1 = (1, 0)$、$e_2 = (0, 1)$，直接计算得

     $$
     \|e_1 + e_2\|_1^2 + \|e_1 - e_2\|_1^2 \;=\; 2^2 + 2^2 \;=\; 8 \;\neq\; 4 \;=\; 2\bigl(\|e_1\|_1^2 + \|e_2\|_1^2\bigr).
     $$

     这说明单凭一般赋范距离不足以还原内积相似读数，平行四边形对称性是淘汰 $\ell^p$（$p \neq 2$）各向异性范数的充要桥梁；在复相位侧，公共相位多项式定理 [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)（`LEAN ✓`）进一步证明低阶相位不变可观测量必然收敛于二次半双线性型。
2. **舍恩伯格半正定判据与格拉姆幺正刚性实现（`文献结果` + `LEAN ✓`）**：
   如 E.1 节反例 (d) 所示，成对余弦值落在 $[-1, 1]$ 内并不保证三点距离可嵌入欧氏空间。舍恩伯格定理（Schoenberg 1935，`文献结果`）给出充要条件：$n$ 点距离表可等距嵌入欧氏空间当且仅当中心化格拉姆矩阵半正定 $G \succeq 0$；一旦 $G = V^\dagger V = W^\dagger W \succeq 0$ 成立，格拉姆幺正延拓定理 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)（`LEAN ✓`）保证向量实现刚性唯一至整体幺正变换 $W = UV$。
3. **单位球面归一化与欧氏平行公设的曲率分岔（`T3`）**：
   欧几里得第五平行公设（三角形内角和恒等于 $\pi$）**不能**无条件从归一化量子态空间推出——恰恰相反，一旦将状态约束在单位球面 $S(x, x) = 1$ 上，[第 34 章 §34.4](ch34-orthogonality-degeneracy-and-observer-position.md#sec-ch34-infinitesimal-spherical-trihedron) 构造的三态极小三角弧面体 $\Delta\mathcal{T}_\epsilon$（步长 $\epsilon \in (0, \frac{\pi}{2}]$）严格产生吉拉尔（Girard）正球面角超（`手工推导` + `文献结果`）：

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   平直欧氏几何 $\Omega = 0$ 仅在一阶切空间无穷小极限 $\epsilon \to 0^+$ 或放弃单位球面约束的仿射向量空间中成立；零曲率欧氏平面、正曲率球面与负曲率双曲空间构成标准的 `T3` 常曲率几何分岔。
:::

---

## E.5 量子力学五大公设的逐条桥接与反例审计（对应推论 [@cor-ch32-quantum-postulates-core]） {#sec-appe-quantum}

第四条推导链对狄拉克—冯·诺依曼教科书体系的**五大公设**逐一执行压力测试，揭示为什么单量子比特（$d = 2$）与复合系统（$\mathcal{H}_1 \otimes \mathcal{H}_2$）上必须显式指明 `T2` 操作测量与层析极小性桥梁：

$$
\text{Layer 1 比较空间} \;\xrightarrow{\;\text{T1 完备 + T3 复结构}\;}\; \mathcal{H} \;\xrightarrow{\;\text{POVM 可加 (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{可重复 + 双侧可逆 (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{局域层析 (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="推导链四审计：量子力学五大公设的逐条桥接、效应可加性与局域层析极小性（LEAN ✓ 与文献结果）"}
**五大量子公设的桥接条件与缺失反例总览。**

1. **公设一（复希尔伯特状态空间 $\mathcal{H}$）**：由 Layer 1 极化恒等式、`T3` 复结构 $J^2 = -I$ 与 `T1` 柯西完备化联合铸就（缺完备化则退回可数无穷有理内积空间 $\mathbb{Q}[i]^d$）。
2. **公设二（可观测量与玻恩概率律 $p(E) = \operatorname{Tr}(\rho E)$）**：在单量子比特 $d = 2$ 上，仅要求正交投影基可加性 $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **无法**导出玻恩规则——除[第 2 章](ch02-born-rule.md) [@ex-qubit-busch-reconstruction] 展示的不连续半球指示函数外，还存在无穷光滑的奇三次标架函数反例（见下框 [@ex-appe-qubit-cubic-and-tomography]）！跨越这道鸿沟有两条精确路径：要么在任意有限维 $d \ge 2$ 上引入**效应（POVM，$0 \le E \le I$）有限可加性**（`T2`），由已冻结的有限维布施定理 [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)（[@thm-busch-effect-density]，`LEAN ✓`）唯一锁定 $p(E) = \operatorname{Tr}(\rho E)$；要么在维数 $d \ge 3$ 的闭子空间投影格上援引格里森定理（Gleason 1957，[@rem-gleason-literature]，`文献结果`）。
3. **公设三（测量后条件化更新与罗伯逊—薛定谔测不准界）**：秩一投影通道的玻恩配对权重由 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`）刻画，对易子与反交换子共同撑起的测不准下界由 [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)（`LEAN ✓`）给出。但注意单次玻恩统计本身**不能**唯一决定测量后状态更新！
   - **有限非可重复重置仪器反例（`手工推导`）**：对比标准吕德斯（Lüders）投影仪器 $\mathcal{I}_k(\rho) = P_k \rho P_k$ 与重置仪器 $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$（其中 $P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$）。两者给出**完全相同的单次玻恩概率** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$，但紧接着连测第二次 $Z$ 时，$\mathcal{J}_0$ 在首次读出 $0$ 后却以

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)
     $$

     跳回结果 $1$！故必须补入**可重复性（$\mathcal{I}_k$ 幂等）与对相容可观测量的最小扰动条件（`T2`）**，方能唯一挑出吕德斯投影更新。
4. **公设四（时间演化的幺正性与斯通生成元）**：在有限维空间 $\mathbb{C}^d$ 上，保内积等距算子 $V^\dagger V = I_d$ 自动满射从而幺正；但在**可数无穷维**序列空间 $\ell^2(\mathbb{N})$ 上，单侧右移算子 $S|n\rangle = |n + 1\rangle$ 严格保一切成对比较内积 $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$（$S^\dagger S = I$），却丢失真空基态 $|0\rangle$，满足 $S S^\dagger = I - |0\rangle\langle 0| \neq I$（非幺正！）。故无穷维演化须显式要求**双侧可逆性（满射等距，`T2`）**，再结合连通射线相位刚性 [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)（`LEAN ✓`）与强连续单参数群斯通定理（Stone 1932，`文献结果`）导出薛定谔生成元 $U(t) = e^{-itH/\hbar}$。
5. **公设五（复合系统复张量积 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ 与费米子泡利外幂扇区 $\bigwedge^N\mathcal{H}$）**：两体规则包含两道完全不同的桥接条件——第一，为什么复合空间是无暗扇区的复张量积？必须补入**复局域层析极小性（Local Tomographic Minimality，`T2`）**（Hardy 2001；Chiribella–D'Ariano–Perinotti 2011，`文献结果`；实双比特与直和暗扇区反例见下框 [@ex-appe-qubit-cubic-and-tomography]）；第二，为什么全同费米子服从泡利不相容 $|\psi\rangle \wedge |\psi\rangle = 0$？在双粒子空间中，对称玻色态 $|\psi\rangle \otimes |\psi\rangle \in \mathrm{Sym}^2(\mathcal{H})$ 非零且同样合法——外幂反对易关系精确对应对称群 $S_N$ 的**奇符号表示分支（`T3` 交换统计分岔）**，其在 $3+1$ 维相对论局域量子场论中与半整数自旋的绑定由泡利自旋统计定理（Pauli 1940，`文献结果`）完成。
:::

::: {.example #ex-appe-qubit-cubic-and-tomography title="单比特奇三次标架函数反例与实双比特局域层析破缺（手工推导）"}
**手工推导。** 以下两个有限维算例精确锁定了公设二与公设五中 `T2` 操作假设的不可替代性：

1. **单比特光滑奇三次标架函数（证伪 $d = 2$ 仅靠正交投影可加性导出玻恩律）**：
   在布洛赫球面 $\mathbf{r} = (r_x, r_y, r_z) \in S^2$ 上，为每个秩一投影 $P_{\mathbf{r}} = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$ 赋光滑函数

   $$
   f(P_{\mathbf{r}}) \;:=\; \frac{1}{2}\bigl(1 + r_z^3\bigr), \qquad f(0) := 0, \qquad f(I_2) := 1.
   $$

   因 $r_z \in [-1, 1]$，显然 $0 \le f(P_{\mathbf{r}}) \le 1$；且单比特上任意一组正交完备投影基必由对跖点对 $\{P_{\mathbf{r}}, P_{-\mathbf{r}}\}$ 构成，立得

   $$
   f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) \;=\; \frac{1}{2}(1 + r_z^3) + \frac{1}{2}\bigl(1 + (-r_z)^3\bigr) \;=\; 1,
   $$

   即 $f$ 在单比特**全体正交投影基**上无懈可击地满足概率可加性，但因含非线性三次项 $r_z^3$ 而绝不能写成任何密度矩阵的线性迹配对 $\operatorname{Tr}(\rho P_{\mathbf{r}}) = \frac{1}{2}(1 + \mathbf{s}\cdot\mathbf{r})$！现在拿 $x\text{-}z$ 子午面上的三元对称三叉戟 POVM（trine POVM）$E_k = \frac{2}{3}P_{\mathbf{r}_k}$（$k = 1, 2, 3$）检验它，其中

   $$
   \mathbf{r}_1 = (0, 0, 1), \qquad \mathbf{r}_2 = \left(\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \mathbf{r}_3 = \left(-\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \sum_{k=1}^3 \mathbf{r}_k = \mathbf{0} \;\Longrightarrow\; \sum_{k=1}^3 E_k = I_2.
   $$

   若 $f$ 可延拓为效应上可加且齐次的概率泛函，三项读数之和必须等于 $f(I_2) = 1$；然而直接代入 $r_{1,z}^3 = 1$ 与 $r_{2,z}^3 = r_{3,z}^3 = -\frac{1}{8}$ 却算出

   $$
   \sum_{k=1}^3 \frac{2}{3}\,f(P_{\mathbf{r}_k}) \;=\; \frac{2}{3}\left[1 + \frac{1}{2}\left(1 - \frac{1}{8}\right) + \frac{1}{2}\left(1 - \frac{1}{8}\right)\right] \;=\; \frac{2}{3}\left(1 + \frac{7}{16} + \frac{7}{16}\right) \;=\; \frac{5}{4} \;\neq\; 1!
   $$

   这一 $1.25 \neq 1$ 的精确破缺直观展示了 [@thm-busch-effect-density]（`effect_density_representation`）为何仅凭效应可加性就能一举封杀全部非线性标架函数。
2. **实双比特（two-rebit）反对称关联与直和暗扇区（证伪无局域层析假设时自动导出 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$）**：
   - *实量子力学局域层析破缺*：在实双比特空间 $\mathbb{R}^2 \otimes_{\mathbb{R}} \mathbb{R}^2 \cong \mathbb{R}^4$ 中，可观测量为实对称矩阵（维数 $\frac{4 \times 5}{2} = 10$），而单实比特实对称矩阵维数为 $\frac{2 \times 3}{2} = 3$，局域乘积可观测量仅张成 $3 \times 3 = 9 < 10$ 维！所缺的第 $10$ 维恰由双反对称生成元张量积

     $$
     W \;=\; J \otimes J, \qquad J = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad W^{\mathsf{T}} = (-J) \otimes (-J) = J \otimes J = W \neq 0
     $$

     给出：对任意实对称局域可观测量 $A_1^{\mathsf{T}} = A_1,\; A_2^{\mathsf{T}} = A_2$，因反对称与对称矩阵乘积迹恒为零，恒有 $\operatorname{Tr}\bigl(W(A_1 \otimes A_2)\bigr) = \operatorname{Tr}(J A_1)\operatorname{Tr}(J A_2) = 0 \cdot 0 = 0$——全局正交态 $\rho_{\pm} = \frac{1}{4}(I_4 \pm W)$ 在一切局域乘积测量下完全隐身！而在复希尔伯特空间 $\mathbb{C}^d$ 上，厄米空间实维数满足 $(d_1 d_2)^2 = d_1^2 \cdot d_2^2$，局域层析严丝合缝。
   - *直和暗扇区非极小扩张*：若令复合空间取 $(\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2) \oplus \mathcal{K}$（$\dim\mathcal{K} \ge 1$），并将局域算子嵌入为 $(A_1 \otimes A_2) \oplus 0_{\mathcal{K}}$，全部单子系统比较关系原封不动，但支撑在暗扇区 $\mathcal{K}$ 上的状态对一切局域探针读数全为零。故必须联合**复标量结构与无冗余暗扇区的局域层析极小性（`T2`）**，才能唯一锁定 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$。
:::

---

## E.6 时空光锥、规范纤维联络、去相干热力学与付费比较（对应推论 [@cor-ch32-minkowski-holonomy-and-second-law]） {#sec-appe-spacetime}

第五条推导链审计物理场论、弯曲规范场、热力学时间箭头与计算复杂性边界所需的 Layer 2 动力学输入：

$$
\text{双曲签名 (T3)} \;\xrightarrow{\;\text{光锥刚性}\;}\; c\,\eta_{\mu\nu}, \qquad \{\mathcal{H}_x, U_{xy}\}_{\text{Layer 2}} \;\xrightarrow{\;\text{树余边圈}\;}\; W_{\gamma}, \qquad \mathcal{E}_P(I)=I \;\xrightarrow{\;\text{相干擦除}\;}\; \Delta S_{\mathrm{vN}} = D(\rho\|\mathcal{E}_P(\rho)) \ge 0.
$$

::: {.remark #rem-appe-spacetime-chain title="推导链五审计：闵可夫斯基光锥、规范纤维联络、双随机捏合熵增与付费比较边界（LEAN ✓、手工反例与 OPEN 前沿）"}
**四组物理与计算推论的精确桥接条件及极小反例。**

1. **欧氏椭圆旋转 vs. 闵可夫斯基双曲光锥刚性（`T3` + `LEAN ✓`）**：
   如 E.1 节反例 (b) 所示，紧致欧氏签名 $t^2 + \|\mathbf{x}\|^2$ 不会产生因果光锥；一旦选定 $(1, d)$ 洛伦兹双曲签名（`T3`），零光锥刚性定理 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)（`LEAN ✓`）即严格证明：任何在零光锥 $t^2 - \|\mathbf{x}\|^2 = 0$ 上归零的实二次型必然全局正比于闵可夫斯基度规（因果光锥共形结构唯一决定度规至整体尺度因子）。
2. **全局单纤维平坦恒等 vs. 局部标架规范联络和乐（`T2` Layer 2 + `LEAN ✓`）**：
   - **单纤维零曲率反例（`手工推导`）**：若全宇宙所有点共享同一个固定全局克利福德代数 $\mathcal{Cl}(V, q_+)$，且将两点比较定义为单位克利福德向量乘积 $\mathrm{CMP}_{\mathrm{glob}}(a, b) = a b$（满足 $a^2 = b^2 = c^2 = \mathbf{1}$），则沿任意三点回路合成恒有

     $$
     \mathrm{CMP}_{\mathrm{glob}}(a, b)\,\mathrm{CMP}_{\mathrm{glob}}(b, c)\,\mathrm{CMP}_{\mathrm{glob}}(c, a) \;=\; (ab)(bc)(ca) \;=\; a(b^2)(c^2)a \;=\; a^2 \;=\; \mathbf{1}!
     $$

     全局单纤维比较的环路和乐恒为平凡单位元，杨—米尔斯规范场强 $F_{\mu\nu}$ 恒等于零！
   - **Layer 2 局部纤维联络桥接（`LEAN ✓`）**：非平凡规范场强之所以涌现，是因为不同时空点 $x$ 各自携带独立的局部内部标架纤维 $\mathcal{H}_x$，跨边比较必须经由**边联络输运算子 $U_{xy}$**（`T2` Layer 2）衔接；此时有限图锚定相位分类定理 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（`LEAN ✓`）证明全部规范不变环路威尔逊（Wilson）和乐由生成树余边基本圈相位完全分类（而 $3+1$ 维非阿贝尔杨—米尔斯连续统质量间隙仍属千禧年 `OPEN` 问题，属 `T4`）。
3. **纯幺正等熵与主动冷却降熵 vs. 保单位粗粒化热力学第二定律（`T2` Layer 2 + `LEAN ✓`）**：
   - **两个有限维反例（`手工推导`）**：(i) 孤立纯幺正演化 $\rho \mapsto U \rho U^\dagger$ 恒保持谱不变，冯·诺依曼熵增恒为零 $\Delta S_{\mathrm{vN}} = 0$（可逆无箭头）；(ii) 非保单位（non-unital）主动重置通道 $T_{\mathrm{reset}}(\rho) = |0\rangle\langle 0|$（将熵排入外部隐匿冷库，$T_{\mathrm{reset}}(I_2) = 2|0\rangle\langle 0| \neq I_2$）作用于最大混合态 $\rho_* = \frac{1}{2}I_2$ 时，令局部熵严格下降

     $$
     \Delta S_{\mathrm{vN}}(\rho_*) \;=\; S_{\mathrm{vN}}\bigl(|0\rangle\langle 0|\bigr) - S_{\mathrm{vN}}\!\left(\tfrac{1}{2}I_2\right) \;=\; 0 - \log 2 \;=\; -\log 2 \;<\; 0!
     $$

   - **Layer 2 保单位捏合桥接（`LEAN ✓`）**：热力学第二定律的单向非负性要求粗粒化映射是**保单位（双随机，即不借助外部冷库偷排熵）的正交基底记录捏合通道 $\mathcal{E}_P(I) = I$**（`T2` Layer 2），此时相干删除熵产生恒等式 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)（`LEAN ✓`）精确给出 $\Delta S_{\mathrm{vN}} = S(\mathcal{E}_P(\rho)) - S(\rho) = D(\rho \,\|\, \mathcal{E}_P(\rho)) \ge 0$。
4. **可逆付费名字比较 vs. 计算复杂性开放前沿（`LEAN ✓` + `OPEN`）**：
   在离散计算底层，二进名字可逆付费比较定理 [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)（`LEAN ✓`）证明长度为 $\ell$ 的名字相等性判定可在精确计费 $2\ell + 2$ 步内完成且完美复原输入工作带；但多项式时间验证与多项式时间求解是否分离（$\mathrm{P} \neq \mathrm{NP}$）绝不能仅凭付费比较原语宣称解决，在此严格标定为 `T4` 红色 `OPEN` 前沿。
:::

---

## E.7 九大中间假设（H1–H9）全景审计与进一步处理总表 {#sec-appe-audit-table}

我们将上述五条推导链中识别出的**全部九大中间假设（`H1`–`H9`）**、缺失时的极小反例（严格区分有限模型与可数无穷模型）、四分类编码（`T1`–`T4`）、进一步处理机制以及认识论依据等级，统一收束于下框全景审计总表：

::: {.remark #rem-appe-master-audit-table title="从比较公理 A₀ 到各学科公理的九大中间假设（H1–H9）审计与处理机制总表"}
**全景审计总账（汇总推论 [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-minkowski-holonomy-and-second-law] 与 E.1–E.6 节）。**

| 编号与中间假设 | 所属推论链 | 缺失时的极小反例（有限 vs. 可数无穷） | 分类 | 进一步处理机制 | 认识论依据 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **`H1` 比较等价核商化**（以及特征 $\neq 2$ 使 $2$ 可逆） | 逻辑与外延（[@cor-ch32-extensionality-and-quotient]） | **有限反例**：$\mathbb{F}_2$ 上 $+1 = -1$ 致奇偶塌缩；二元集 $\{a_1, a_2\}$ 上 $\mathrm{CMP} \equiv 1$ 违背原始同一律 | `T1` | 对原始域按不可分核取典范商空间 $X/{\sim_{\mathrm{CMP}}}$，使外延性成为商集定理 | `LEAN ✓`（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)、[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)） |
| **`H2` 正自配对、秩 $2$ 简单双向量椭圆负平方与 $n$ 点格拉姆半正定** | Layer 0 $\to$ Layer 1 几何基座（E.1 节） | **有限反例**：单点 $\mathrm{CMP} = -1$；对偶数 $1\pm\varepsilon$ 与分裂复数 $\cosh\eta\pm j\sinh\eta$；$\mathcal{Cl}_{4,0}$ 非简单 $e_1\wedge e_2 + e_3\wedge e_4$；$3\times 3$ 实矩阵 $\det S = -3 < 0$ | `T3` + Layer 1 | 显式声明正定克利福德单叶实现 $\mathrm{CMP}(x,y)=\langle x,y\rangle + x\wedge y$，将双曲/幂零归入签名分岔 | `LEAN ✓`（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）+ `手工推导`（[@ex-appe-layer0-countermodels]） |
| **`H3` 平行四边形极化对称与柯西度量完备化** | 数域与度规几何（[@cor-ch32-successor-primes-and-zeckendorf]、[@cor-ch32-parallelogram-quadratic-and-gram]） | **有限维反例**：二维 $\ell^1_2$ 上 $4 + 4 = 8 \neq 4$ 破坏内积极化；**可数无穷反例**：$\mathbb{Q}^2$、$\mathbb{Q}[i]$ 柯西列缺失极限（注：有限度量空间必完备） | `T2` + `T1` | 用平行四边形对称刻画双线性内积，再对有理前希尔伯特空间作典范柯西完备化产出 $\mathbb{R}, \mathbb{C}, \mathcal{H}$ | `LEAN ✓`（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)、[`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)）+ `文献结果`（Jordan–von Neumann, Schoenberg） |
| **`H4` 正交余项永不枯竭（$S^\perp \neq \bot$）与奥斯特洛夫斯基估值选择** | 算术、复结构与 $p$ 进树（[@cor-ch32-successor-primes-and-zeckendorf]） | **有限反例**：$\mathbb{R}^n$ 在 $n$ 步后正交饱和，$\mathbb{Z}/N\mathbb{Z}$ 在第 $N$ 步循环回零；奇数实维无全局 $R^2 = -I$ | `T2/T4` + `T3` | 将开放维度 $S^\perp \neq \bot$ 作为无穷后继与素数轴源泉；用 Ostrowski 二分统一阿基米德 $\mathbb{R}$ 与超度量 $\mathbb{Q}_p$ | `LEAN ✓`（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)、[`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)、[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)、[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)） |
| **`H5` 有限维效应（POVM）概率可加性（或 $d \ge 3$ 投影可加性）** | 量子公设二：玻恩规则（[@cor-ch32-quantum-postulates-core]） | **有限维反例（$d = 2$）**：不连续半球标架函数，以及光滑奇三次函数 $f(P_{\mathbf{r}})=\frac{1}{2}(1+r_z^3)$ 在三叉戟 POVM 上给出 $\frac{5}{4} \neq 1$ | `T2` | 以实验室效应凸组合下的有限可加性替代纯投影假设，在一切 $d \ge 2$ 唯一锁定 $p(E)=\operatorname{Tr}(\rho E)$ | `LEAN ✓`（[`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)，[@thm-busch-effect-density]）+ `文献结果`（Gleason $d \ge 3$） |
| **`H6` 可重复最小扰动条件化与双侧动力学可逆性** | 量子公设三、四：吕德斯更新与幺正群（[@cor-ch32-quantum-postulates-core]） | **有限反例**：重置仪器 $\mathcal{J}_k(\rho)=\operatorname{Tr}(\rho P_k)|+\rangle\langle+|$ 连测跳变 $P(1\mid 0)=\frac{1}{2}$；**可数无穷维反例**：$\ell^2(\mathbb{N})$ 单侧右移 $S^\dagger S = I \neq SS^\dagger$ | `T2` | 用幂等可重复性与最小扰动筛选吕德斯投影；用双侧可逆保内积加射线刚性锁定幺正演化 | `LEAN ✓`（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)、[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)）+ `文献结果`（Stone） |
| **`H7` 复局域层析极小性与全同粒子奇交换表示选择** | 量子公设五：张量积与泡利原理（[@cor-ch32-quantum-postulates-core]） | **有限反例**：实双比特隐身算子 $W = J \otimes J$（$\operatorname{Tr}(W(A_1\otimes A_2))=0$）；直和暗扇区 $\oplus\mathcal{K}$；对称玻色态 $|\psi\rangle\otimes|\psi\rangle \neq 0$ | `T2` + `T3` | 用复局域层析完备且无冗余暗扇区锁定 $\mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2$；将 $\mathrm{Sym}^N$ vs. $\bigwedge^N$ 标定为 $S_N$ 表示分岔 | `手工推导`（[@ex-appe-qubit-cubic-and-tomography]）+ `文献结果`（Hardy, CDP, Pauli 1940） |
| **`H8` 洛伦兹签名、局部纤维边联络 $U_{xy}$ 与保单位基底捏合** | 时空、规范场与热力学（[@cor-ch32-minkowski-holonomy-and-second-law]） | **有限反例**：欧氏球无因果光锥；全局单纤维 $(ab)(bc)(ca)=\mathbf{1}$ 零曲率；纯幺正 $\Delta S_{\mathrm{vN}}=0$ 及主动重置 $T(\rho)=|0\rangle\langle 0|$ 致 $\Delta S_{\mathrm{vN}}=-\log 2 < 0$ | `T3` + `T2` | 选定 $(1,d)$ 光锥签名；以局部纤维联络承载规范和乐；以保单位记录捏合导出相干删除熵增 $\Delta S_{\mathrm{vN}} \ge 0$ | `LEAN ✓`（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)、[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)） |
| **`H9` 高阶集合存在性、$3+1$ 维相互作用连续统极限与复杂性下界** | 超限集合论、量子场论与计算复杂性边界 | **有限反例**：有限遗传集宇宙 $V_5$（$65{,}536$ 元）满足有限外延闭包却证伪 ZFC 无穷公理 | `T4` | 严格划在两槽比较公理的推导声称之外，作为独立公理强度或未决科学前沿诚实保留 | `LEAN ✓`（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)、[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)）+ `OPEN`（$\mathrm{P}\neq\mathrm{NP}$、Yang–Mills 质量间隙） |
:::

纵览整张审计总表（[@rem-appe-master-audit-table]），“诸公理皆是比较公理 $\mathcal{A}_0$ 之推论”（`MODEL`）的真实数学含义已再无半分含混：它**不是**宣称无需任何输入即可凭空变出连续统或超限集合论，而是揭示过去分散在逻辑、算术、几何、量子力学与场论教科书里看似互不相干的数十条公设，在剥除典范商化与完备化（`T1`）之后，全部沿着同一条**两槽比较原语 $\mathrm{CMP}$** 有序生长——其中实验物理公设被归约为透明的操作可加性、可重复性与局域层析条件（`T2`），数域、几何曲率与粒子统计的多样性被精准定位为签名、估值与交换群表示的自然分岔（`T3`），而高阶集合论存在性与未决计算复杂性下界则以绝对诚实的反例边界（`T4` / `OPEN`）立石为界。
