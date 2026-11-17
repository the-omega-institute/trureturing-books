# 附录 E 从比较公理到数学与物理公理体系：完整推导链、中间假设审计与极小反例集 {#附录-e-从比较公理到数学与物理公理体系}

本附录是[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)–[§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)（[@def-ch32-axiom-of-comparison] 及六条形式化推论 [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]）的**形式认识论配套审计台账**。在第 32 章正文中，我们将“两子丈量”提炼为零背景比较公理 $\mathcal{A}_0$ 与单指令几何积原语 $\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B}$，并指出逻辑与集合外延、算术与数域完备化、度规几何、量子力学公设以及相对论—规范—内生贝里几何—离散路径乘积—热力学定律的核心骨架均可重构为 $\mathcal{A}_0$ 在显式桥接条件下的条件推论。为彻底杜绝“用一个口号偷换全部隐含前提”的公理滑坡，本附录逐条拆解每一条推导链：**哪些步骤仅凭两槽比较即可无损商化或完备化？哪些射影几何相位已在第 1 层内生闭环？哪些步骤必须补入可操作的实验测量、动力学生成元或复合层析判据？哪些步骤对应真实的代数签名、绝对值估值或交换统计分岔？当任一中间假设缺失时，能够证伪目标结论的极小反例（有限反例或可数无穷反例）究竟长什么样？**

遵循与[附录 B](appendix-b.md)、[附录 D](appendix-d.md) 完全一致的认识论契约：凡对应 `trureturing@dev` 已冻结定理的环节均附有绿色 `LEAN ✓` 标记与可点击的内联声明链接（验证边界见[附录 C](appendix-c.md)）；经典数学与物理学定理标为 `文献结果`；显式构造的有限或可数无穷反例标为 `手工推导`；作者的统一几何架构标为 `MODEL`；尚未解决的数学与物理前沿则诚实标为红色 `OPEN`。

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
   - **第 1 层（Layer 1：正定内积—克利福德几何与内生射影射线实现）**：对象嵌入实欧氏内积空间及其克利福德代数 $\mathcal{Cl}(V, q_+)$，使 $\mathrm{CMP}(x, y) = \langle x, y\rangle\mathbf{1} + x \wedge y$。此时同时激活三项几何刚性：(i) 单位态自配对恒正 $S(x, x) = +1$；(ii) 两向量外积构成秩 $2$ **简单双向量（simple 2-blade）**，满足普吕克（Plücker）简单性 $(x \wedge y) \wedge (x \wedge y) = 0$ 与椭圆负平方 $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$，从而拉格朗日—格拉姆恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，`LEAN ✓`）强制导出 $\langle x, y\rangle^2 + \|x \wedge y\|^2 = \|x\|^2\|y\|^2$；(iii) 任意有限 $n$ 元组 $\{x_1, \dots, x_n\}$ 的相似矩阵 $G_{ij} = S(x_i, x_j)$ 自动全局半正定 $G \succeq 0$。更关键的是，一旦通过秩一纯态投影算子 $P(\mathbf{n}) = \frac{1}{2}(I_2 + \mathbf{n}\cdot\boldsymbol{\sigma})$（$\|\mathbf{n}\|=1$）落到第 1 层单位布洛赫球面 $S^2 \cong \mathrm{SU}(2)/\mathrm{U}(1)$ 上，单纤维纯态投影比较环路在**第 1 层内部**便已内禀携带非平凡的射影 $\mathrm{U}(1)$ 潘查拉特纳姆—贝里射线和乐（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)，详见[第 34 章 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral) 与下方 E.6 节）。
   - **第 2 层（Layer 2：跨时空基点局域纤维丛联络、复合局域层析与粗粒化记录捏合）**：当比较超越单一纤维而跨越**时空图上独立索引的不同基点纤维 $\{\mathcal{H}_x, U_{xy}\}$ 与外部规范场动力学**、跨越复合多体子系统或穿过有限带宽观察者的未读记录投影时，在 Layer 1 之上进一步引入跨边幺正联络输运 $U_{xy}$、复张量局域层析完备极小性以及保单位（双随机）基底捏合通道。
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
3. **ZFC 高阶存在公理的诚实边界（`T4` + 有限与可数双反例）**：
   比较核商化与对角线逃逸（并见[第 38 章 §38.6](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 哥德尔自指盲点）**不能**导出 ZFC 的无穷公理、无限制配对/幂集公理、替换公理或选择公理。**有限与可数无穷双反例（`手工推导`）**：(i) 考察冯·诺依曼累积谱系的第 $5$ 层有限集 $V_5$（元素个数 $|V_5| = 65{,}536$），其上成员关系 $\in$ 满足外延公理、空集公理、正则基础公理、子集分离模式及对 $V_5$ 内元素的并集封闭性，但因一切元素均为有限集而直接证伪 **ZFC 无穷公理**，且在顶阶元素 $V_4 \in V_5$（$\operatorname{rank}(V_4) = 4$）处同时证伪无限制**配对公理与幂集公理**（单点对 $\{V_4\}$ 与幂集 $\mathcal{P}(V_4) = V_5$ 秩均为 $5$，逃出 $V_5$ 之外！）；(ii) 进一步升至可数无穷遗传有限集宇宙 $V_\omega := \bigcup_{k < \omega} V_k$，其上已完整满足 $\mathrm{ZFC} - \text{无穷公理}$ 的全部其余公理（含无限制配对、幂集、并集、基础与替换公理），却依然证伪 **ZFC 无穷公理**！高阶无穷基数与选择原则属于不可约的外部集合论强度（`T4` / `H9`）。
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
   - **闭合有限维反例与空间维数刚性边界（`手工推导`）**：在固定有限维欧氏空间 $\mathbb{R}^n$ 中，至多只能选出 $n$ 根两两正交的单位向量，第 $n+1$ 步时 $S^\perp = \{0\}$ 彻底饱和；而在有限模环 $\mathbb{Z}/N\mathbb{Z}$ 中，后继映射 $k \mapsto k + 1$ 在第 $N$ 步回撞原点 $N \equiv 0$（违背皮亚诺公理“$0$ 不是任何元素的后继”）。同时必须指出：不论是[第 38 章 §38.7](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension) 在固定有限维 $D$ 上的北极球极投影同胚 $\Pi_N : S^D \setminus \{N\} \xrightarrow{\sim} \mathbb{R}^D$（仅对固定拓扑维数 $D$ 去紧化），还是[第 34 章 §34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 的三维麦克斯韦—拉曼桁架刚性锁 $\Delta E(3) = \Delta E(4) = 0$（锁定宏观底空间维数 $D = 3$），都**不会**自动免除希尔伯特态空间的正交余项不竭假设 `H4`（$\dim\mathcal{H} = \infty$，$S_n^\perp \neq \bot$）。
2. **素数正交轴与齐肯多夫禁邻自动机语言（`LEAN ✓` + `文献结果`）**：
   一旦正交后继向全体正整数敞开，素数轴逃逸定理 [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)（`LEAN ✓`）保证在任意有限素数集之外恒有正交新素数轴，使正有理数乘法嵌入无穷素数格 $\bigoplus_p \mathbb{Z}$；在最简二阶递推编码侧，冻结自动机语言定理 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（`LEAN ✓`）精确证明：二状态确定性有限自动机 `binaryZeckendorfBase` 接受二进制字 $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当该字不含相邻双 $1$（`NoAdjacentOnes word`）；至于每个自然数均可唯一表为不相邻斐波那契数之和的算术唯一性，则属于齐肯多夫算术表示定理层（`文献结果`）。
3. **四分之一拍正交转向与复结构平方负一签名 $R^2 = -I_n$（`LEAN ✓` + `T3` 实载体维数奇偶）**：
   在冻结形式化库中，反自伴幺正平方负一定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)（`LEAN ✓`）精确建立在有限维复矩阵 $R \in M_n(\mathbb{C})$（`[Fintype n] [DecidableEq n]`）上：由 $R^\dagger = -R$ 与 $R R^\dagger = I_n$ 直接推出 $R^2 = -I_n$；若将其限制到实矩阵载体 $R \in M_n(\mathbb{R})$（即 $R^{\mathsf{T}} = -R,\; R^{\mathsf{T}} R = I_n$，从而在不预设外部 $\mathbb{C}$ 的实内积空间上内生实现平面双向量四分之一拍旋转生成元），则在奇数实维 $n = 2m + 1$ 上 $\det(R^{\mathsf{T}}) = (-1)^{2m+1} \det R$ 迫使 $\det R = 0$ 奇异，故全局实线性复结构仅存在于偶数实维 $n = 2m$（`T3` 载体维数奇偶约束）。
4. **奥斯特洛夫斯基绝对值分岔（`T3`）与柯西度量完备化（`T1`）**：
   从有理数域 $\mathbb{Q}$ 走向完备数域须跨越两步：首先，奥斯特洛夫斯基分类定理 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]，`LEAN ✓`）证明 $\mathbb{Q}$ 上非平凡绝对值精确分岔为连续阿基米德实标尺 $|\cdot|_\infty$ 与离散素数 $p$ 进超度量标尺 $|\cdot|_p$ 两族（`T3` 估值分岔），并由阿代尔乘积公式 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（[@thm-ch36-crt-and-adelic-product-formula]，`LEAN ✓`）锁定全局乘积恒等于 $1$；其次，施加度量柯西完备化（`T1` / `H3`）方分别得到 $\mathbb{R}$（进而 $\mathbb{C} = \mathbb{R}[R]/(R^2+1)$）与 $\mathbb{Q}_p$（同样地，实球极投影 $\Pi_N$ 已预设完备实流形 $S^D$，并不能替代对有理骨架 $\mathbb{Q}^D$ 的 `H3` 柯西完备化）。
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
3. **单位球面归一化、“二生三”载体维数与欧氏平行公设的曲率分岔（`T3` + 第 1 层）**：
   欧几里得第五平行公设（三角形内角和恒等于 $\pi$）**不能**无条件从归一化量子态空间推出——恰恰相反，在**选定定向的环境维数 $D \ge 3$ 实内积载体**上（注意二维平面 $\Lambda^2\mathbb{R}^2 \not\subset \mathbb{R}^2$ 无法容纳面内正交法向，故[第 34 章 §34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) 的“二生三”霍奇星法向自举 $\mathbf{e}_\perp = \star(\mathbf{A}\wedge\mathbf{B})/\sin\epsilon$ 显式依赖定向 $D \ge 3$ 载体，并由[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 完全图 $K_N$ 麦克斯韦—拉曼三维刚性锁 $\Delta E(3) = \Delta E(4) = 0$ 在宏观三维收口），一旦将状态约束在单位球面 $S(x, x) = 1$ 上，[第 34 章 §34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron) 构造的倾斜三态球面三面角原胞 $\Delta\mathcal{T}_\epsilon$（步长 $\epsilon \in (0, \frac{\pi}{2}]$；注意必须区分纯正交单位法向组 $(\mathbf{A}, \mathbf{B}, \mathbf{e}_\perp)$ 的格拉姆行列式 $\det G = \sin^2\epsilon$ 与平权倾斜投影态 $\mathbf{P} = \cos\epsilon\,\mathbf{A} + \sin\epsilon\,\mathbf{e}_\perp$ 的三面角格拉姆行列式 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon$，且精确循环群对称 $C_3 \subset \mathrm{SO}(3)$ 成立于等边/标准正交对称构型，而一旦抽去 Layer 1 全局半正定条件 $G \succeq 0$，E.1 节反例 (d) 的 $\det S = -3 < 0$ 依然成立）严格产生吉拉尔（Girard）正球面角超（`手工推导` + `文献结果`）：

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   平直欧氏几何 $\Omega = 0$ 仅在一阶切空间无穷小极限 $\epsilon \to 0^+$ 或放弃单位球面约束的仿射向量空间中成立；零曲率欧氏平面、正曲率球面与负曲率双曲空间构成标准的 `T3` 常曲率几何分岔。
:::

---

## E.5 量子力学五大公设的逐条桥接与反例审计（对应推论 [@cor-ch32-quantum-postulates-core]） {#sec-appe-quantum}

第四条推导链对狄拉克—冯·诺依曼教科书体系的**五大公设**逐一执行压力测试，揭示为什么单量子比特（$d = 2$）与复合系统（$\mathcal{H}_1 \otimes \mathcal{H}_2$）上必须显式指明 `T2` 操作测量与层析极小性桥梁：

$$
\text{Layer 1 比较空间} \;\xrightarrow{\;\text{T1 完备 + T3 复结构}\;}\; \mathcal{H} \;\xrightarrow{\;\text{全效应可加 / }d\ge 3\text{ 星投影可加 (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{可重复 + 双侧可逆 (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{局域层析 (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="推导链四审计：量子力学五大公设的逐条桥接、效应可加性与局域层析极小性（LEAN ✓ 与文献结果）"}
**五大量子公设的桥接条件与缺失反例总览。**

1. **公设一（复希尔伯特状态空间 $\mathcal{H}$）**：由 Layer 1 极化恒等式、`T3` 复结构 $J^2 = -I$ 与 `T1` 柯西完备化联合铸就（缺完备化则退回可数无穷有理内积空间 $\mathbb{Q}[i]^d$）。
2. **公设二（可观测量与玻恩概率律 $p(E) = \operatorname{Tr}(\rho E)$）**：在单量子比特 $d = 2$ 上，仅要求正交投影基可加性 $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **无法**导出玻恩规则——除[第 2 章](ch02-born-rule.md) [@ex-qubit-busch-reconstruction] 展示的不连续半球指示函数外，还存在无穷光滑的奇三次标架函数反例（见下框 [@ex-appe-qubit-cubic-and-tomography]）！跨越这道鸿沟有两条已形式化的有限维精确路线：有限维效应路线保留全效应域（POVM，$0 \le E \le I$）上的有限可加性（`T2`），由有限维布施定理 [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)（[@thm-busch-effect-density]，`LEAN ✓`）在一切有限维 $d \ge 2$ 唯一锁定 $p(E) = \operatorname{Tr}(\rho E)$；有限复维 $d \ge 3$ 的投影路线则对全体星投影施加非负性、单位归一与正交投影可加性（`T2`，不把正交投影可加性替换为任意矩阵上的函数可加性），使用[第 2 章](ch02-born-rule.md)已验证的有限复投影格里森定理 [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation)（[@thm-gleason-finite-projection]，`LEAN ✓`）唯一给出密度矩阵表示 $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$。两者均不从两两公平直接推出底层内积结构及跨标架／效应赋值公理；实希尔伯特空间与无限维闭子空间投影格上的更广格里森形式及可数可加布施形式需另列精确声明与额外前提（Gleason 1957；Busch 2003，[@rem-gleason-literature]，`文献结果`）。至于从排斥球面极对偶与自旋因子几何出发重构有限维态锥的配套机制，详见[附录 F](appendix-f.md)。
3. **公设三（测量后条件化更新与罗伯逊—薛定谔测不准界）**：秩一投影通道的玻恩配对权重由 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`）刻画，对易子与反交换子共同撑起的测不准下界由 [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)（`LEAN ✓`）给出。但注意单次玻恩统计本身**不能**唯一决定测量后状态更新！
   - **有限非可重复重置仪器反例（`手工推导`）**：对比标准吕德斯（Lüders）投影仪器 $\mathcal{I}_k(\rho) = P_k \rho P_k$ 与重置仪器 $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$（其中 $P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$）。两者给出**完全相同的单次玻恩概率** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$，但在满足 $\operatorname{Tr}(\rho P_0) > 0$ 的任意初态（使条件分母 $\operatorname{Tr}(\mathcal{J}_0(\rho)) = \operatorname{Tr}(\rho P_0) > 0$ 非零良定）上紧接着连测第二次 $Z$ 时，$\mathcal{J}_0$ 在首次读出 $0$ 后却以

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)
     $$

     跳回结果 $1$！故必须补入**可重复性（$\mathcal{I}_k$ 幂等）与对相容可观测量的最小扰动条件（`T2`）**，方能唯一挑出吕德斯投影更新（关于系综玻恩权重、非选言吕德斯捏合与单次实验选支实现边界及物理因果干预对照被动基轴旋转，另见[第 34 章 §34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) 与 [@prob-ch34-single-outcome-realization]）。
4. **公设四（时间演化的幺正性、射线相位刚性与斯通哈密顿生成元）**：在有限维空间 $\mathbb{C}^d$ 上，保内积线性等距算子 $V^\dagger V = I_d$ 自动满射从而幺正，且冻结定理 [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)（`LEAN ✓`）证明：在**已给定有限维幺正阵 $A \in U(\iota, \mathbb{C})$**（`[Fintype ι] [DecidableEq ι]`）的前提下，保持全部坐标基射线与支集连通测试射线必将 $A$ 锁死为全局单位相位倍乘 $cI$（注：若仅从无线性预设的纯跃迁概率 $|\langle\psi\mid\phi\rangle|^2$ 出发恢复幺正或反幺正算子，仍需援引维格纳定理 Wigner 1931，`文献结果`）。而在**可数无穷维**序列空间 $\ell^2(\mathbb{N})$ 上，单侧右移算子 $S|n\rangle = |n + 1\rangle$ 严格保一切成对比较内积 $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$（$S^\dagger S = I$），却丢失真空基态 $|0\rangle$，满足 $S S^\dagger = I - |0\rangle\langle 0| \neq I$（非幺正！）。故无穷维演化须显式要求**双侧可逆性（满射等距，`T2`）**，再结合强连续单参数群斯通定理（Stone 1932，`文献结果`，排除选择公理哈默尔基构造的时间不连续自同构）以及**选定具体自伴哈密顿量 $H$**（`T4` 动力学输入）导出薛定谔演化 $U(t) = e^{-itH/\hbar}$。
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

## E.6 时空光锥、内生与外源规范和乐、离散路径乘积与平稳作用量、去相干热力学及付费比较（对应推论 [@cor-ch32-minkowski-holonomy-and-second-law]、[@cor-ch32-bargmann-holonomy-and-path-product]） {#sec-appe-spacetime}

第五组推导链联合审计推论 [@cor-ch32-minkowski-holonomy-and-second-law] 与第六推论 [@cor-ch32-bargmann-holonomy-and-path-product]：区分第 1 层内生射影几何相位与第 2 层时空规范纤维联络，刻画从离散巴格曼链通往平稳作用量原理 $\delta S = 0$ 的四阶条件桥梁，并锁定热力学时间箭头与计算复杂性边界：

$$
\text{双曲签名 (T3)} \;\xrightarrow{\;\text{光锥刚性}\;}\; c\,\eta_{\mu\nu}, \quad P(\mathbf{n})\text{ 贝里 }\mathrm{U}(1)\text{ (Layer 1)} \;\neq\; \{\mathcal{H}_x, U_{xy}\}_{\text{Layer 2}}, \quad \operatorname{Tr}(R_0\cdots R_n) \;\xrightarrow{\;H\text{ (H6) + 测度 (H9) + 稳相}\;}\; \delta S = 0.
$$

::: {.remark #rem-appe-spacetime-chain title="推导链五与六联合审计：闵可夫斯基光锥、内生贝里和乐对时空规范丛、平稳作用量阶梯、捏合熵增与付费比较边界（LEAN ✓、手工反例与 OPEN 前沿）"}
**五组物理与计算推论的精确桥接条件及极小反例。**

1. **欧氏椭圆旋转、$\mathcal{Cl}_{3,0}$ 伪标量代数负号 vs. 闵可夫斯基双曲光锥刚性（`T3` + `LEAN ✓`）**：
   如 E.1 节反例 (b) 所示，紧致欧氏签名 $t^2 + \|\mathbf{x}\|^2$ 不会产生因果光锥；虽然[第 34 章 §34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 在三维克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 中由体积伪标量 $\mathbf{I}_3 = e_1 e_2 e_3$ 闭合内生给出代数负号 $\mathbf{I}_3^2 = -1$ 与副向量范数型 $c^2 dt^2 - d\mathbf{x}^2$（`MODEL` + `手工推导`），但将该代数二次型提升为全局双曲 $(1, d)$ 时空流形上的偏微分方程因果锥结构，仍必须显式作出 `T3` 洛伦兹因果锥分支选择；一旦选定该零锥，零光锥刚性定理 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)（`LEAN ✓`）即严格证明：任何在零光锥 $t^2 - \|\mathbf{x}\|^2 = 0$ 上归零的实二次型必然全局正比于闵可夫斯基度规。
2. **原始克利福德单纤维平坦性 vs. 第 1 层内生射影贝里和乐 vs. 第 2 层时空规范丛（Layer 1 vs. `T2` Layer 2 + `LEAN ✓`）**：
   - **原始未投影克利福德向量乘积的零曲率恒等式（`手工推导`）**：若在单一全局克利福德代数 $\mathcal{Cl}(V, q_+)$ 中将两点边传输直接取为**未经投影的单位向量乘法** $\mathrm{CMP}_{\mathrm{glob}}(a, b) = a b$（满足 $a^2 = b^2 = c^2 = \mathbf{1}$），则沿任意三点回路合成恒有

     $$
     \mathrm{CMP}_{\mathrm{glob}}(a, b)\,\mathrm{CMP}_{\mathrm{glob}}(b, c)\,\mathrm{CMP}_{\mathrm{glob}}(c, a) \;=\; (ab)(bc)(ca) \;=\; a(b^2)(c^2)a \;=\; a^2 \;=\; \mathbf{1},
     $$

     原始向量边乘积本身恒为平坦单位元。
   - **第 1 层秩一态投影的内生射影 $\mathrm{U}(1)$ 贝里—霍普夫和乐（`LEAN ✓` + `文献结果`）**：与此形成鲜明对照，一旦在第 1 层内部改用秩一纯态投影算子 $P(\mathbf{n}) = \frac{1}{2}(I_2 + \mathbf{n}\cdot\boldsymbol{\sigma})$（$\|\mathbf{n}\|=1$）刻画量子射线，冻结定理 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 与 [`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation)（[@cor-ch32-bargmann-holonomy-and-path-product]，`LEAN ✓`）直接证得标准正交八分卦限三态闭环 $\operatorname{Tr}\bigl(P(\mathbf{e}_3)P(\mathbf{e}_1)P(\pm\mathbf{e}_2)\bigr) = \frac{1 \pm i}{4} \neq \mathbb{R}$！在连续霍普夫纤维丛 $S^1 \hookrightarrow S^3 \to S^2$ 上，这对应第 1 层内生的射影 $\mathrm{U}(1)$ 潘查拉特纳姆—贝里曲率 $\gamma_B \equiv -\frac{1}{2}\Omega = -\frac{3}{2}V_{\mathrm{sector}} \pmod{2\pi}$（[第 34 章 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)，`手工推导` + `文献结果`；简并 $k$ 维子空间推广为非阿贝尔 Wilczek–Zee $\mathrm{U}(k)$ 绝热和乐 `文献结果`，陪集 $G/H$ 典范联络分解见[第 34 章 §34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)）。
   - **第 2 层跨时空基点纤维丛与杨—米尔斯动力学桥接（`LEAN ✓` + `OPEN`）**：态空间 $S^2$ 上的内生贝里联络是态流形上的固定运动学几何，**并非**四维时空流形 $M_4$ 上随基点 $x$ 独立变化的动力学规范势 $A_\mu(x)$。要承载时空局域规范理论，仍须升入第 2 层（`H8`）引入独立时空基点纤维 $\{\mathcal{H}_x\}$ 与边联络输运 $U_{xy}$；在带命名生成树 $T$ 与非空锚集 $r \in R \subseteq V$（$|V|=n, |E|=m, |R|=k$）的有限连通有向图上，冻结定理 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（`LEAN ✓`）精确证明：模去锚定上边缘子群后的规范等价类同构于 $\operatorname{Fin}(m + k - n) \to \mathrm{Circle}$，即由 **$(m + 1 - n)$ 条生成树余边基本圈和乐加上 $(k - 1)$ 个根至锚点树路径相对相位**完备分类（当单锚点 $k = 1$ 时恰化为纯基本圈和乐 $m + 1 - n$）；而赋予 $A_\mu(x)$ 杨—米尔斯场方程 $D_\mu F^{\mu\nu} = J^\nu$ 及证明 `3+1D` 非阿贝尔连续统质量间隙，连同无质量自旋-$2$ 爱因斯坦引力场方程及标准模型三代重数与连续耦合参数的第一性原理起源（见[第 34 章 §34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)、[@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch34-sm-generations-and-couplings]），则属于 `H9` / `T4` `OPEN` 问题。
3. **离散巴格曼外积链 vs. 连续统路径积分与平稳作用量原理 $\delta S = 0$（`LEAN ✓` + `H6`/`H9` 反例 + `文献结果`）**：
   - **单链代数恒等式与双哈密顿量有限反例（`LEAN ✓` + `手工推导`）**：第六推论中的 [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)（`LEAN ✓`）精确给出**单条**离散外积链的迹 $\operatorname{Tr}(R_0 \cdots R_n) = \bigl(\prod_{j=0}^{n-1}\langle\Psi_j, \Psi_{j+1}\rangle\bigr)\langle\Psi_n, \Psi_0\rangle$。但单凭运动学重叠绝不能无条件唯一决定历史传播子——在同一单比特态空间 $\mathbb{C}^2$ 上考察静态哈密顿量 $H_0 = 0$（$U_0(t) = I_2$）与进动哈密顿量 $H_1 = \hbar\omega\sigma_z$（$U_1(t) = e^{-i\omega t\sigma_z}$），从同一初态 $|+\rangle$ 出发经时间 $t$ 回到 $|+\rangle$ 的跃迁概率分别为 $|\langle + \mid U_0(t)\mid +\rangle|^2 = 1$ 与 $|\langle + \mid U_1(t)\mid +\rangle|^2 = \cos^2(\omega t)$！这直接证伪“无需 `H6` 选定哈密顿生成元 $H$ 即可由纯态空间几何导出动力学路径权重”。
   - **连续统测度正则化（`H9`）与稳相极限 $\delta S = 0$（`文献结果`）**：在选定 $H$ 并在有限时间切片间插入 $I = \sum_\alpha P_\alpha$ 后，光滑李群乘积逼近满足 [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product)（`LEAN ✓`，单步矢高 $O(1/N)$），而迈向连续时间相干态或位形空间泛函积分仍需 `H9` 连续统正则化输入（Klauder 1979 相干态 Wiener 正则化、Wiener/Kac 欧氏测度，以及 Cameron 1960 证明实时间振荡核无有界变差复测度的不可行定理；并见[第 34 章 §34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 对光滑群流与费曼—伊藤 $\epsilon \sim 1/\sqrt{N}$ 粗糙路径的区分）；唯有再取大相位 / 短波渐近极限 $\hbar \to 0^+$，非驻定轨道的科纽螺线高频相消干涉才筛选出经典平稳作用量 $\delta S = 0$（`文献结果`，NIST/Olver 稳相法；驻定点未必为全局极小，且有限 $\hbar$ 下存在非零量子涨落修正）。
4. **纯幺正等熵与主动冷却降熵 vs. 保单位粗粒化热力学第二定律（`T2` Layer 2 + `LEAN ✓`）**：
   - **两个有限维反例（`手工推导`）**：(i) 孤立纯幺正演化 $\rho \mapsto U \rho U^\dagger$ 恒保持谱不变，冯·诺依曼熵增恒为零 $\Delta S_{\mathrm{vN}} = 0$（可逆无箭头）；(ii) 非保单位（non-unital）主动重置通道 $T_{\mathrm{reset}}(\rho) = |0\rangle\langle 0|$（将熵排入外部隐匿冷库，$T_{\mathrm{reset}}(I_2) = 2|0\rangle\langle 0| \neq I_2$）作用于最大混合态 $\rho_* = \frac{1}{2}I_2$ 时，令局部熵严格下降

     $$
     \Delta S_{\mathrm{vN}}(\rho_*) \;=\; S_{\mathrm{vN}}\bigl(|0\rangle\langle 0|\bigr) - S_{\mathrm{vN}}\!\left(\tfrac{1}{2}I_2\right) \;=\; 0 - \log 2 \;=\; -\log 2 \;<\; 0!
     $$

   - **Layer 2 保单位捏合桥接（`LEAN ✓`）**：热力学第二定律的单向非负性要求粗粒化映射是**保单位（双随机，即不借助外部冷库偷排熵）的正交基底记录捏合通道 $\mathcal{E}_P(I) = I$**（`T2` Layer 2），此时相干删除熵产生恒等式 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)（`LEAN ✓`）精确给出 $\Delta S_{\mathrm{vN}} = S(\mathcal{E}_P(\rho)) - S(\rho) = D(\rho \,\|\, \mathcal{E}_P(\rho)) \ge 0$（关于有限窗口预测充分统计蒸馏与全宇宙共享时间箭头的低熵过去假设及 $\Lambda_{\mathrm{cos}}$ 反循环边界，见[第 34 章 §34.22](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning)–[§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor) 与 [@prob-ch34-past-hypothesis-and-cosmological-constant]）。
5. **可逆付费名字比较、球极神谕相对化 vs. 计算复杂性开放前沿（`LEAN ✓` + `文献结果` + `OPEN`）**：
   在离散计算底层，二进名字可逆付费比较定理 [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)（`LEAN ✓`）证明：对任意二进字 $a, b$，可逆状态机 `compareMachine` 在至多 **$2(|a| + |b|) + 4$** 步内（当等长 $|a| = |b| = \ell$ 时上界为 $4\ell + 4$ 步）完成相等性判别并完美复原输入纸带 $a, b$ 与上下文栈。进一步地，[第 38 章 §38.6–§38.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 结合北极球极盲点对偶 $\Pi_N : S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ 与贝克—吉尔—索洛维（Baker–Gill–Solovay 1975，`文献结果`）神谕相对化定理（存在神谕 $A, B$ 使 $\mathrm{P}^A = \mathrm{NP}^A$ 而 $\mathrm{P}^B \neq \mathrm{NP}^B$）揭示了纯黑盒相对化对角线技术无法裁决标准复杂性分离的根源；因此无神谕标准图灵机猜想 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$（[@prob-ch38-unrelativized-p-vs-np-and-independence]）在此严格标定为 `T4` / `H9` 红色 `OPEN` 前沿。
:::

---

## E.7 九大中间假设（H1–H9）全景审计与进一步处理总表 {#sec-appe-audit-table}

我们将上述六条形式化推论（[@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]）及 E.1–E.6 节中识别出的**全部九大中间假设（`H1`–`H9`）**、缺失时的极小反例（严格区分有限模型与可数无穷模型）、四分类编码（`T1`–`T4`）、进一步处理机制以及认识论依据等级，统一收束于下框权威全景审计总表（与[第 32.3.4 节](ch32-s03-axioms-as-corollaries.md#sec-ch32-6-4) [@rem-ch32-comparison-axiom-literature] 逐号严格对齐）：

::: {.remark #rem-appe-master-audit-table title="从比较公理 A₀ 到各学科公理的九大中间假设（H1–H9）审计与处理机制总表"}
**全景审计总账（汇总推论 [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product] 与 E.1–E.6 节）。**

| 编号与中间假设 | 所属推论链 | 缺失时的极小反例（有限 vs. 可数无穷） | 分类 | 进一步处理机制 | 认识论依据 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **`H1` 比较等价核商化**（以及特征 $\neq 2$ 使 $2 \in \mathcal{A}^\times$ 可逆） | 逻辑与外延（[@cor-ch32-extensionality-and-quotient]） | **有限反例**：$\mathbb{F}_2$ 上 $+1 = -1$ 致奇偶塌缩；二元集 $\{a_1, a_2\}$ 上 $\mathrm{CMP} \equiv 1$ 违背原始同一律 | `T1` | 对原始域按不可分核取典范商空间 $X/{\sim_{\mathrm{CMP}}}$，使外延性成为商集定理 | `LEAN ✓`（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)、[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)、[`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual)） |
| **`H2` 正自配对、秩 $2$ 简单双向量椭圆负平方与 $n$ 点格拉姆半正定**（含球面三面角 $\Delta\mathcal{T}_\epsilon$ 曲率分岔） | Layer 0 $\to$ Layer 1 几何基座与曲率三分（E.1、E.4 节，[@cor-ch32-parallelogram-quadratic-and-gram]） | **有限反例**：单点 $\mathrm{CMP} = -1$；对偶数 $1\pm\varepsilon$ 与分裂复数 $\cosh\eta\pm j\sinh\eta$；$\mathcal{Cl}_{4,0}$ 非简单 $e_1\wedge e_2 + e_3\wedge e_4$；$3\times 3$ 实矩阵 $\det S = -3 < 0$；仿射平直 $\Omega = 0$ 对比单位球面 $\Omega(\epsilon) > 0$ | `T3` + Layer 1 | 显式声明正定克利福德单叶实现与定向 $D \ge 3$ 球面/切平面/双曲常曲率分支 | `LEAN ✓`（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)、[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）+ `手工推导`（[@ex-appe-layer0-countermodels]）+ `文献结果`（Schoenberg） |
| **`H3` 平行四边形极化对称与柯西度量完备化** | 数域与度规几何（[@cor-ch32-successor-primes-and-zeckendorf]、[@cor-ch32-parallelogram-quadratic-and-gram]） | **有限维反例**：二维 $\ell^1_2$ 上 $4 + 4 = 8 \neq 4$ 破坏内积极化；**可数无穷反例**：$\mathbb{Q}^2$、$\mathbb{Q}[i]$ 柯西列缺失极限（注：有限度量空间必完备） | `T2` + `T1` | 用平行四边形对称刻画双线性内积，再对有理前希尔伯特空间作典范柯西完备化产出 $\mathbb{R}, \mathbb{C}, \mathcal{H}$ | `LEAN ✓`（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)、[`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)）+ `文献结果`（Jordan–von Neumann） |
| **`H4` 正交余项永不枯竭（$S_n^\perp \neq \bot$）、$R^2=-I$ 偶数实维/复载体与奥斯特洛夫斯基估值选择** | 算术、复结构与 $p$ 进树（[@cor-ch32-successor-primes-and-zeckendorf]） | **有限反例**：$\mathbb{R}^n$ 在 $n$ 步后正交饱和，$\mathbb{Z}/N\mathbb{Z}$ 在第 $N$ 步循环回零；奇数实维 $\mathbb{R}^{2m+1}$ 无全局实 $R^2 = -I$（固定维 $\Pi_N:S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ 与三维 $K_N$ 刚性不自动免除 $\dim\mathcal{H}=\infty$） | `T2/T4` + `T3` | 将开放希尔伯特维度 $S_n^\perp \neq \bot$ 作为无穷后继与素数轴源泉；用 Ostrowski 二分统一阿基米德 $\mathbb{R}$ 与超度量 $\mathbb{Q}_p$ | `LEAN ✓`（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)、[`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)、[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)、[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)） |
| **`H5` 有限维全效应（POVM）可加性或有限复维 $d \ge 3$ 星投影正交可加性**（更广实／无限维投影格另需可数可加前提） | 量子公设二：玻恩规则（[@cor-ch32-quantum-postulates-core]） | **有限维反例（$d = 2$）**：不连续半球标架函数，以及光滑奇三次函数 $f(P_{\mathbf{r}})=\frac{1}{2}(1+r_z^3)$ 在三叉戟 POVM 上给出 $\frac{5}{4} \neq 1$ | `T2` | 有限维 $d \ge 2$ 保留全效应有限可加锁定 $p(E)=\operatorname{Tr}(\rho E)$，有限复维 $d \ge 3$ 由全体星投影非负归一正交可加锁定 $p(P)=\operatorname{Re}\operatorname{Tr}(\rho P)$（均不从两两公平直接推出内积与赋值公理；排斥球面极对偶与自旋因子态锥重构见[附录 F](appendix-f.md)） | `LEAN ✓`（[`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)，[@thm-busch-effect-density]；[`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation)，[@thm-gleason-finite-projection]）+ `文献结果`（更广实空间／无限维 Gleason 与无限维 Busch） |
| **`H6` 可重复最小扰动条件化、双侧动力学可逆性及时间强连续性 + 特定哈密顿量 $H$** | 量子公设三、四与平稳作用量动力输入（[@cor-ch32-quantum-postulates-core]、[@cor-ch32-bargmann-holonomy-and-path-product]） | **有限反例**：$\operatorname{Tr}(\rho P_0)>0$ 上重置仪器 $\mathcal{J}_k(\rho)=\operatorname{Tr}(\rho P_k)|+\rangle\langle+|$ 连测跳变 $P(1\text{ after }0)=\frac{1}{2}$；同一 $\mathbb{C}^2$ 上 $H_0=0$ 与 $H_1=\hbar\omega\sigma_z$ 给出不同传播子；**可数无穷维反例**：$\ell^2(\mathbb{N})$ 单侧右移 $S^\dagger S = I \neq SS^\dagger$ | `T2` + `T4` | 用幂等可重复性与最小扰动筛选吕德斯投影；用双侧可逆性、强连续性与显式哈密顿量 $H$ 锁定薛定谔流与路径演化相位（单次选支与因果干预边界见 [§34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy)、[@prob-ch34-single-outcome-realization]） | `LEAN ✓`（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)、[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)）+ `文献结果`（Wigner, Stone） |
| **`H7` 复局域层析极小性与全同粒子奇交换表示选择** | 量子公设五：张量积与泡利原理（[@cor-ch32-quantum-postulates-core]） | **有限反例**：实双比特隐身算子 $W = J \otimes J$（$\operatorname{Tr}(W(A_1\otimes A_2))=0$）；直和暗扇区 $\oplus\mathcal{K}$；对称玻色态 $|\psi\rangle\otimes|\psi\rangle \neq 0$ | `T2` + `T3` | 用复局域层析完备且无冗余暗扇区锁定 $\mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2$；将 $\mathrm{Sym}^N$ vs. $\bigwedge^N$ 标定为 $S_N$ 表示分岔 | `手工推导`（[@ex-appe-qubit-cubic-and-tomography]）+ `文献结果`（Hardy, CDP, Pauli 1940） |
| **`H8` 洛伦兹因果锥签名、跨时空基点纤维联络 $U_{xy}$（超越第 1 层内生贝里 $\mathrm{U}(1)$ 和乐）与保单位基底捏合** | 时空、内生与外源规范场及热力学（[@cor-ch32-minkowski-holonomy-and-second-law]、[@cor-ch32-bargmann-holonomy-and-path-product]） | **有限反例**：欧氏球无因果光锥；原始克利福德向量 $(ab)(bc)(ca)=\mathbf{1}$ 零曲率（对比第 1 层秩一投影 $\frac{1\pm i}{4}$ 内生贝里和乐，仍非时空场 $A_\mu(x)$）；纯幺正 $\Delta S_{\mathrm{vN}}=0$ 及主动重置 $T(\rho)=|0\rangle\langle 0|$ 致 $\Delta S_{\mathrm{vN}}=-\log 2 < 0$ | `T3` + `T2` | 选定 $(1,d)$ 光锥签名；区分第 1 层内生贝里联络与第 2 层时空规范丛 $\{\mathcal{H}_x, U_{xy}\}$；以保单位捏合导出 $\Delta S_{\mathrm{vN}} \ge 0$（记忆蒸馏、过去假设与绕向/矢高符号见 [§34.22](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning)–[§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)） | `LEAN ✓`（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)、[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)、[`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation)、[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）+ `文献结果`（Bargmann, Simon, Berry, Wilczek–Zee, Yang–Mills） |
| **`H9` 高阶 ZFC 集合存在性、连续统路径积分与 `3+1D` 相互作用量子场论泛函测度及复杂性下界** | 超限集合论、条件稳相 $\delta S=0$、连续统场论与复杂性边界（[@cor-ch32-extensionality-and-quotient]、[@cor-ch32-minkowski-holonomy-and-second-law]、[@cor-ch32-bargmann-holonomy-and-path-product]） | **有限反例**：$V_5$（$65{,}536$ 元）满足外延/空集/基础/分离/并集但否定无穷且在 $V_4 \in V_5$ 处破坏无限制配对与幂集；**可数无穷反例**：$V_\omega$ 满足配对/幂集/替换但仍否定 ZFC 无穷；神谕对 $A, B$ 分离相对化复杂性 | `T4` / `OPEN` | 将高阶集合存在与连续统泛函测度（支撑条件稳相阶梯 $\delta S=0$）显式列为外部输入，保持 `3+1D` 杨—米尔斯质量间隙、无神谕 $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$ 以及宇宙学常数、自旋-$2$ 引力与标准模型三代/耦合定量前沿（[§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary)：[@prob-ch34-past-hypothesis-and-cosmological-constant]、[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-ch34-sm-generations-and-couplings]）为 `OPEN` | `LEAN ✓`（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)、[`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)、[`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product)、[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)）+ `文献结果`（Feynman, Klauder, Cameron, Baker–Gill–Solovay）+ `OPEN` |
:::

纵览整张审计总表（[@rem-appe-master-audit-table]），“诸公理皆是比较公理 $\mathcal{A}_0$ 之条件推论”（`MODEL`）的真实数学含义已再无半分含混：它**不是**宣称无需任何输入即可凭空变出连续统泛函测度或超限集合论，而是揭示过去分散在逻辑、算术、几何、量子力学、分析力学与规范热力学教科书里看似互不相干的公设骨架，在剥除典范商化与完备化（`T1`）并纳入第 1 层内生贝里几何与离散路径乘积之后，全部沿着同一条**两槽比较原语 $\mathrm{CMP}$** 有序生长——其中实验物理与演化条件被归约为透明的操作可加性、可重复性、局域层析与显式哈密顿输入（`T2` / `T4`），数域、几何曲率、因果光锥与粒子统计的多样性被精准定位为签名、估值与交换群表示的自然分岔（`T3`），而高阶集合论存在性、连续统场论测度与未决计算复杂性下界则以绝对诚实的反例边界（`T4` / `OPEN`）立石为界。

---

## E.8 第三点冗余与对合正性：用极小圆弧体微积分归约 `H2` 与 `H3` {#sec-appe-third-point-redundancy}

E.7 的总表把 `H2` 记成并列的三项第 1 层条件：正自配对、秩 $2$ 双向量的椭圆负平方、多点格拉姆半正定；`H3` 再要求平行四边形极化。本节用[第 34 章 §34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 的弦—矢高分解重新过一遍这笔账，结论是这四项并不各自独立。在求同读数为实标量的情形，`H2` 的三项可以由两条更原始的条件推出：一条是**第三点冗余**（比较 $x$ 与 $z$ 不因取道第三点 $y$ 而改变），一条是**对合的正性**（非零差异的往返不为零也不为负）。`H3` 的极化一项由第三点冗余加一个正的读数给出。E.8.5 另外给单比特上的 `H5` 换了一种说法：只看两两比较的概率规则里，玻恩律是层析秩最小的那一个。

先说清边界。这两条条件是加在 $\mathcal{A}_0$ 之外的，本节证明的是“若加入则推出”，不主张它们能从条款 I–III 推出；[@ex-appe-layer0-countermodels] 的反例恰好说明不能。本节的两个定理盒对应冻结定理，其余推导标为 `手工推导`，引用的经典结论标为 `文献结果`。

### E.8.1 单对比较：弦与矢高在第 0 层已经锁死 {#sec-appe-chord-sagitta-layer0}

取一对对象的比较 $u=\mathrm{CMP}(x,y)$。条款 II 给出 $u^*=\mathrm{CMP}(y,x)$，条款 III 对有序对 $(x,y)$ 与 $(y,x)$ 都成立，所以 $uu^*=u^*u=\mathbf{1}$。沿用 §34.30.1 的名字，把 $v:=\mathbf{1}-S$ 叫作**矢高**，把 $\Delta:=u-\mathbf{1}=A-v$ 叫作**割弦**。

::: {.remark #rem-appe-chord-sagitta-layer0 title="公平比较的弦—矢高锁死（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是 $2$ 可逆的含幺结合 $*$-代数，$u\in\mathcal{A}$ 满足 $uu^*=u^*u=\mathbf{1}$，$S=\frac12(u+u^*)$，$A=\frac12(u-u^*)$，$v=\mathbf{1}-S$，$\Delta=u-\mathbf{1}$。则：

1. $SA=AS$；
2. $S^2-A^2=\mathbf{1}$；
3. $A^2=-v(2-v)$；
4. $\Delta^*\Delta=\Delta\Delta^*=2v$。

推导：$uu^*=(S+A)(S-A)=S^2-SA+AS-A^2$，$u^*u=(S-A)(S+A)=S^2+SA-AS-A^2$，两者都等于 $\mathbf{1}$。相减得 $2(AS-SA)=0$，$2$ 可逆，故第 1 款成立；相加得第 2 款。第 3 款是 $A^2=S^2-\mathbf{1}=-(\mathbf{1}-S)(\mathbf{1}+S)$。第 4 款由 $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$ 得到，另一侧同理。
:::

这四款有三处直接的用途。

第一，[@def-ch32-axiom-of-comparison] 条款 III 之后把“$S$ 与 $A$ 对易”列为特殊情形。第 1 款说明它不是额外条件：只要条款 III 对两个次序都成立，对易就成立，勾股公平 $S^2-A^2=\mathbf{1}$ 也随之成立。

第二，§34.30.1 的两条恒等式 $(1-v_\epsilon)^2+c_\epsilon^2=1$ 与 $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ 是第 2、4 款在 $A=c_\epsilon\hat{\mathbf B}$、$\hat{\mathbf B}^2=-\mathbf{1}$ 时的写法。在第 0 层成立的是 $S^2-A^2=\mathbf{1}$ 与 $\Delta^*\Delta=2v$ 本身，它们不依赖三角函数实现。

第三，取 $v=\mathbf{1}$（即 $S=0$，直角比较）时第 3 款给出 $A^2=-\mathbf{1}$。这在复矩阵上就是冻结定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)：`H4` 所需的复结构 $R^2=-I$ 是锁死恒等式在矢高等于 $1$ 处的切片。

再看签名。设 $\mathcal{A}$ 是实代数，求同读数是实标量 $S=s\mathbf{1}$。第 3 款成为 $A^2=-v(2-v)\mathbf{1}$，$v=1-s$，于是 $A^2$ 的符号完全由矢高落在哪里决定：

| 矢高 $v$ | $A^2$ | $A\neq0$ 时 $\mathbb{R}[A]$ 的类型 | [@ex-appe-layer0-countermodels] 中的对应 |
| :---: | :---: | :--- | :--- |
| $0<v<2$ | 负 | 复数，椭圆 | 第 1 层的转动 |
| $v=0$ 或 $v=2$ | $0$ | 对偶数，抛物 | 反例 (b) 的 $1\pm\varepsilon$（$v=0$） |
| $v<0$ 或 $v>2$ | 正 | 分裂复数，双曲 | 反例 (b) 的 $\cosh\eta\pm j\sinh\eta$（$v=1-\cosh\eta<0$） |

::: {.remark #rem-appe-involution-positivity title="对合正性排除抛物与双曲分支（手工推导）"}
**手工推导。** 称实 $*$-代数 $\mathcal{A}$ 的对合满足**正性条件**，若

$$
a^*a=-t\,\mathbf{1},\quad t\ge0\qquad\Longrightarrow\qquad a=0 .
$$

设正性条件成立，$u$ 满足 $uu^*=u^*u=\mathbf{1}$ 且 $S=s\mathbf{1}$（$s\in\mathbb{R}$），$u\neq\pm\mathbf{1}$。则 $-1<s<1$，并且

$$
u=\cos\theta\,\mathbf{1}+J\sin\theta,\qquad \theta=\arccos s\in(0,\pi),\qquad J=\frac{A}{\sin\theta},\qquad J^*=-J,\qquad J^2=-\mathbf{1}.
$$

推导：由 [@rem-appe-chord-sagitta-layer0] 第 4 款，$\Delta^*\Delta=2(1-s)\mathbf{1}$。若 $s\ge1$，取 $t=2(s-1)$，正性条件给出 $\Delta=0$，即 $u=\mathbf{1}$。对 $-u$ 重复同一论证，$s\le-1$ 时 $u=-\mathbf{1}$。其余情形 $-1<s<1$，由第 3 款 $A^2=-(1-s^2)\mathbf{1}$，除以 $\sin^2\theta=1-s^2$ 即得。

正性条件在对偶数上失败（$\varepsilon^*\varepsilon=-\varepsilon^2=0$ 而 $\varepsilon\neq0$），在分裂复数上失败（$j^*j=-j^2=-1$）。它在每个 $C^*$-代数中成立，因为 $a^*a$ 是正元且 $\lVert a^*a\rVert=\lVert a\rVert^2$（`文献结果`）；也在带忠实正泛函 $\varphi$ 的 $*$-代数中成立：$\varphi(a^*a)\ge0$ 且仅当 $a=0$ 时取零，于是 $a^*a=-t\mathbf{1}$ 迫使 $t=0$ 与 $a=0$。
:::

所以 `H2` 中“椭圆负平方”一项可以换成一句只谈往返的话：**有差异，往返就留下正的痕迹。** 它排除的正是反例 (b) 的两个分支，而且只排除它们。

这两个分支本身并不是病态模型。把 $2\times2$ 复矩阵看成实代数，对合取经典伴随 $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$，则 $aa^\sharp=\det(a)\mathbf{1}$，满足 $uu^\sharp=\mathbf{1}$ 的元素恰是 $\mathrm{SL}(2,\mathbb{C})$；每个这样的 $u$ 的求同部分 $S=\frac12\operatorname{tr}(u)\mathbf{1}$ 自动是中心标量，矢高 $v=1-\frac12\operatorname{tr}u$ 是复数（`手工推导`）。按迹对莫比乌斯变换分类的经典结果（`文献结果`）翻译成矢高的语言是：$u\neq\pm\mathbf{1}$ 时，$v\in(0,2)$ 为椭圆类，$v\in\{0,2\}$ 为抛物类，$v$ 为其余实数时为双曲类，$v\notin\mathbb{R}$ 为斜驶类。反例 (b) 的生成元都住在这里：$\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$，$j\mapsto\operatorname{diag}(1,-1)$，椭圆生成元 $\mapsto\operatorname{diag}(i,-i)$，三者都满足 $g^\sharp=-g$，平方分别是 $0$、$+\mathbf{1}$、$-\mathbf{1}$。冻结定理 [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) 给出实 $2\times2$ 无迹生成元中双曲形 $\operatorname{diag}(\delta,-\delta)$ 与椭圆形 $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ 的迹、行列式与平方；它的中间情形是零矩阵，非零幂零的抛物生成元不在该定理之内。这个代数上没有满足 $\varphi(a^\sharp a)\ge0$ 的归一正泛函（$a=\operatorname{diag}(1,-1)$ 给出 $a^\sharp a=-\mathbf{1}$），所以 E.8.3 的读数论证不适用于它。

$\mathrm{SL}(2,\mathbb{C})$ 经 $X\mapsto uXu^\dagger$ 作用在厄米矩阵 $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ 上并保持 $\det X=t^2-\lvert\mathbf{x}\rvert^2$，这是洛伦兹群的旋量覆盖（`文献结果`）；E.6 已引用的 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) 说明零锥把二次型定到只差一个标量。若再要求对厄米共轭也公平（$uu^\dagger=\mathbf{1}$），剩下的就是 $\mathrm{SU}(2)$，只含椭圆类。由此得到 `H2` 与 `H8` 的一个统一读法（`MODEL`）：**第 0 层留出的抛物与双曲分支，就是洛伦兹变换里的零转动与推进；选椭圆签名与选洛伦兹签名，是同一个代数里对合正性的取与舍。**

正性条件用在单个比较的求异部分上，有一个只谈重复比较的等价说法。

::: {.remark #rem-appe-bounded-recurrence title="单个比较上正性条件的操作形式：重复同一比较，读数不放大（手工推导与文献结果）"}
**手工推导。** 设 $\mathcal{A}$ 是实 $*$-代数，即实数域上的含幺结合代数，对合是 $\mathbb{R}$-线性的并且 $\mathbf{1}^*=\mathbf{1}$。设 $u$ 满足 $uu^*=u^*u=\mathbf{1}$，求同读数是实标量 $S=s\mathbf{1}$。由 $u+u^*=2s\mathbf{1}$ 与 $uu^*=\mathbf{1}$ 得 $u^2=2su-\mathbf{1}$，所以 $u^{n+1}=2su^n-u^{n-1}$，这是切比雪夫多项式的三项递推。于是对一切 $n\ge0$，

$$
u^{n}=T_n(s)\,\mathbf{1}+U_{n-1}(s)\,A,\qquad u^{-n}=T_n(s)\,\mathbf{1}-U_{n-1}(s)\,A,
$$

其中 $T_n$、$U_n$ 是第一类与第二类切比雪夫多项式，$U_{-1}=0$。把同一个比较连做 $n$ 次，矢高由 $v$ 变为 $v_n=1-T_n(1-v)$。

在 $\operatorname{span}\{\mathbf{1},A\}$ 上任取一个范数。双向轨道 $\{u^n\}_{n\in\mathbb{Z}}$ 有界，当且仅当 $-1\le s\le1$，并且 $s=\pm1$ 时 $A=0$：

- $\lvert s\rvert<1$：令 $s=\cos\theta$，则 $T_n(s)=\cos n\theta$，$U_{n-1}(s)=\dfrac{\sin n\theta}{\sin\theta}$，轨道有界；
- $s=\pm1$：$u^n=(\pm1)^n(\mathbf{1}\pm nA)$，只在 $A=0$ 时有界；
- $\lvert s\rvert>1$：令 $\lvert s\rvert=\cosh\eta$，则 $\lvert T_n(s)\rvert=\cosh n\eta$ 无界。此时 $A^2=(s^2-1)\mathbf{1}\neq0$，而 $A^*=-A$ 说明 $A$ 不是 $\mathbf{1}$ 的实数倍，所以 $\mathbf{1}$ 前的系数无界就使轨道无界。

另一方面 $A^*A=-A^2=(1-s^2)\mathbf{1}$。把 [@rem-appe-involution-positivity] 的正性条件用在 $a=A$ 上：$1-s^2\le0$ 时必须 $A=0$，从而 $s^2=1$。这恰好也是“$-1\le s\le1$，并且 $s=\pm1$ 时 $A=0$”。所以对求同读数为实标量的比较，**正性条件对它的求异部分成立，当且仅当它的整数次幂有界**。

**文献结果。** 多个比较同时出现时，有限维情形有同方向的结论。设 $\mathcal{A}$ 由有限维实或复向量空间上的线性算子组成，$\Gamma$ 是由满足 $gg^*=g^*g=\mathbf{1}$ 的元素构成的有界群。对 $\Gamma$ 的闭包取平均得到一个 $\Gamma$-不变的内积，在这个内积下 $\Gamma$ 的元素都是等距，于是对 $\Gamma$ 的实线性张成中的 $a$，$a^*$ 就是 $a$ 的伴随，$a^*a$ 是半正定算子，正性条件在这个张成上成立（有界群的酉化，对紧群取平均的标准论证）。
:::

三种情形正是上表的三行。椭圆的比较重复多少次，求同读数都留在 $[-1,1]$ 之内；抛物的比较求同读数停在 $\pm1$（$v=2$ 时逐次变号），求异读数随次数线性增长；双曲的比较读数按指数增长。所以对单个比较，正性条件可以读成一条不放大的要求：**同一个比较重复任意多次，读数不发散。** 在洛伦兹群里，被它排除的线性增长与指数增长分别是零转动与推进。正性条件独立于条款 IV：取 $X=\mathrm{SL}(2,\mathbb{C})$、$\mathrm{CMP}(x,y)=x^\sharp y$，条款 II、III、IV 都成立，而正性条件失败。

逐个比较都不放大，还不足以得出多点格拉姆半正定。在 $(M_2(\mathbb{R}),{}^\sharp)$ 中取 $x_0=\mathbf{1}$、$x_1=\cos\theta\,\mathbf{1}+J\sin\theta$、$x_2=\cos\theta\,\mathbf{1}-J'\sin\theta$，其中 $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$J'=\begin{pmatrix}0&-2\\\frac12&0\end{pmatrix}$、$\theta=\frac\pi4$，并令 $\mathrm{CMP}(x,y)=x^\sharp y$。条款 II、III、IV 都成立，三个比较的求同读数是 $\frac{\sqrt2}{2}$、$\frac{\sqrt2}{2}$、$-\frac18$，都落在椭圆区间里，而读数表的行列式是 $-\frac{9}{64}$（`手工推导`）。多点情形需要的是比较值生成的群整体有界，也就是上面文献结果一段的前提；这个例子里生成的群无界。

### E.8.2 第三点冗余：势表示及其稳定性 {#sec-appe-gain-potential}

下面把 $\mathrm{CMP}(x,y)$ 简写为 $c_{xy}$。

::: {.definition #def-appe-third-point-redundancy title="条款 IV：第三点冗余（本书模型）"}
设比较映射 $\mathrm{CMP}:X\times X\to\mathcal{A}$ 满足 [@def-ch32-axiom-of-comparison] 的条款 II 与 III。称它满足**第三点冗余**（`MODEL`），若对一切 $x,y,z\in X$，

$$
c_{xy}\,c_{yz}=c_{xz}.
$$

等价地，一切三点闭环的和乐 $h(x,y,z):=c_{xy}\,c_{yz}\,c_{zx}$ 等于 $\mathbf{1}$。当只有一部分点对可以比较时，把可比的点对看成图 $G$ 的边，并只对 $G$ 中两两可比的三点要求上式。
:::

第 1 层的克利福德实现满足条款 IV：单位向量的几何积给出 $xy\cdot yz=xz$。[§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) 说明第 2 层时已经指出“原始向量边乘积本身平坦无曲率”，条款 IV 把这句话立为条件。它与全书的出发点同向：两子丈量不需要外部第 3 点，现在进一步要求内部的第三点也不改变结果。

条款 IV 的主要后果是：每个对象可以用一个群元来代表，比较就是两个代表元之比。在有限点集上，这是一条冻结定理，而且需要的条件比“任意三点”更少。

::: {.theorem #thm-appe-chordal-gain-potential title="有限弦图上三角相容的群值增益是顶点势之比" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential"}
设 $V$ 为有限顶点集，$H$ 为任意群，$G$ 为 $V$ 上的简单弦图，即 $G$ 中每个长度至少为 $4$ 的圈都有弦。设映射 $g:V\times V\to H$ 满足：

1. 对每条边 $\{i,j\}$，$g(j,i)=g(i,j)^{-1}$；
2. 对两两相邻的 $i,j,k$，$g(i,j)\,g(j,k)=g(i,k)$。

则存在 $\varphi:V\to H$，使得对每条边 $\{i,j\}$，

$$
g(i,j)=\varphi(i)^{-1}\varphi(j).
$$

群 $H$ 不必交换，图 $G$ 不必连通；$g$ 在对角线与非边上的取值不受假设约束，结论也不涉及它们。
:::

::: proof
对顶点子集的大小作归纳，逐个加回顶点。弦图的每个非空诱导子图仍是弦图，因而含有一个单纯顶点 $x$：它在子图里的邻居两两相邻。先对去掉 $x$ 的子集用归纳假设，得到势 $\psi$。如果 $x$ 在子集里没有邻居，$\psi$ 已经满足要求。否则任取一个邻居 $w$，令 $\varphi(x)=\psi(w)\,g(x,w)^{-1}$，其余顶点沿用 $\psi$。对 $x$ 的另一个邻居 $j$，单纯性保证 $w$ 与 $j$ 相邻，三角相容给出 $g(x,j)=g(x,w)\,g(w,j)=g(x,w)\,\psi(w)^{-1}\psi(j)=\varphi(x)^{-1}\varphi(j)$；指向 $x$ 的边由第 1 款取逆得到。整个论证只用群的结合律与逆元，没有交换任何两个群元。完整证明由 Lean 内核检查。
:::

用到比较上：取 $H$ 为 $\mathcal{A}$ 中满足 $uu^*=u^*u=\mathbf{1}$ 的元素构成的群，条款 II、III 给出第 1 款，条款 IV 给出第 2 款。完全图是弦图，所以有限点集上的条款 IV 推出 $c_{xy}=\varphi_x^{-1}\varphi_y$。定理多给的一点对本书更有用：**不必两两可比。** 只要可比关系构成弦图，每个可比三角形平坦，势表示就存在。这与[第 29 章 §29.3](ch29-s03-timeless-gram-causality.md) 用弦图把局部半正定块补成整体半正定矩阵（[@thm-ch29-chordal-psd-completion]）用的是同一个组合条件。这类条件不能完全去掉：四圈上没有三角形，条件 2 成为空话，而绕圈一周的乘积可以取任意值，势表示可以不存在。弦性是充分条件，不是必要条件：带轮毂的四轮图不是弦图，三角相容却仍然推出势表示，取 $\varphi(i)=g(\text{毂},i)$ 即可（`手工推导`）。

实际的比较总带误差。链式律只是近似成立时，势表示也只是近似成立，偏差有明确的上界。

::: {.theorem #thm-appe-chordal-gain-potential-stability title="近似三角相容给出近似顶点势" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential"}
设 $V$ 为有限顶点集，$G$ 为 $V$ 上的简单弦图。设群 $H$ 带有伪度量 $d$，且左乘与右乘都是等距：对一切 $a,x,y\in H$，$d(ax,ay)=d(x,y)=d(xa,ya)$。设 $\varepsilon\ge0$，映射 $g:V\times V\to H$ 满足：

1. 对每条边 $\{i,j\}$，$g(j,i)=g(i,j)^{-1}$；
2. 对两两相邻的 $i,j,k$，$d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$。

则存在 $\varphi:V\to H$，使得对每条边 $\{i,j\}$，

$$
d\bigl(g(i,j),\,\varphi(i)^{-1}\varphi(j)\bigr)\le(\lvert V\rvert-2)\,\varepsilon,
$$

其中 $\lvert V\rvert-2$ 是自然数的截断减法，$\lvert V\rvert\le2$ 时取 $0$。
:::

::: proof
构造与 [@thm-appe-chordal-gain-potential] 相同，只是把等式换成距离估计。加回单纯顶点 $x$ 时，对它的邻居 $j$ 用三角不等式：$g(x,j)$ 到 $g(x,w)\,g(w,j)$ 的距离不超过 $\varepsilon$；左乘等距把 $g(x,w)\,g(w,j)$ 到 $\varphi(x)^{-1}\varphi(j)=g(x,w)\,\psi(w)^{-1}\psi(j)$ 的距离化为 $g(w,j)$ 到 $\psi(w)^{-1}\psi(j)$ 的距离，后者由归纳假设控制。于是每加回一个至少有两个邻居的顶点，误差至多增加一个 $\varepsilon$，头两个顶点不产生误差，总计 $(\lvert V\rvert-2)\varepsilon$。指向 $x$ 的边用到取逆是等距，这需要左右两侧的平移不变性。完整证明由 Lean 内核检查。
:::

$C^*$-代数的酉群配上算子范数距离满足定理的等距条件，所以近似平坦的比较离某个平坦比较不远，距离以点数线性增长。

::: {.remark #rem-appe-anchoring-consequences title="锚定表示的五条推论（手工推导）"}
**手工推导。** 设条款 II、III、IV 对一切点对与三点成立，$X$ 非空（可以无限）。

1. **正自配对。** $c_{xx}=\mathbf{1}$。条款 IV 取 $y=z=x$ 得 $c_{xx}^2=c_{xx}$，条款 III 给出 $c_{xx}^2=\mathbf{1}$。
2. **锚定表示。** 任取锚点 $o$，令 $g_x:=c_{ox}$，则 $g_xg_x^*=g_x^*g_x=\mathbf{1}$ 且 $c_{xy}=g_x^*g_y$。这是因为 $c_{xy}=c_{xo}\,c_{oy}$，而 $c_{xo}=c_{ox}^*$。
3. **唯一性。** 若另有 $c_{xy}=g_x'^*g_y'$，则 $g'_xg_x^*$ 与 $x$ 无关：不同的表示只差左乘一个固定元。
4. **外延商。** 条款 I 的不可分关系 $x\sim_{\mathrm{CMP}}y$ 等价于 $g_x=g_y$，所以 $\widetilde X$ 单射到 $\mathcal{A}$ 的公平元群里。
5. **端点公式。** 对任意采样路径，$c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$。

第 2 款在有限 $X$ 上是 [@thm-appe-chordal-gain-potential] 取完全图的情形；这里的直接构造对无限 $X$ 也成立，并且给出了势的显式形式。
:::

第 1 款排除了 [@ex-appe-layer0-countermodels] 的反例 (a)：单点上 $\mathrm{CMP}=-1$ 满足往返为 $+1$，却违反 $c\cdot c=c$。所以在条款 IV 之下，`H2` 的“正自配对”不再是一条独立的标定。第 4 款的意思是：选定锚点之后，一个对象就是把锚点带到它的那个旋子，对象与作用在对象上的算子不再分属两类。第 5 款是 §34.30.2 有序旋子乘积积分的牛顿—莱布尼茨公式：平坦的比较沿任何采样路径连乘，结果只依赖两个端点，这在任意有限孔径下精确成立，不需要细分极限。

弦图是让三角相容足够的一个充分条件。恰好足够的条件可以直接说出来。

::: {.remark #rem-appe-triangle-simple-connectivity title="三角相容何时足够：可比三角形填满每个圈（手工推导与文献结果）"}
**手工推导。** 设 $G$ 是顶点集 $V$ 上的有限简单图，$H$ 为群，$g$ 定义在相邻的有序点对上，满足 $g(j,i)=g(i,j)^{-1}$，且在 $G$ 的每个三角形上 $g(i,j)\,g(j,k)=g(i,k)$。对一条走道 $w=(x_0,\dots,x_n)$（相继两点相邻），记 $\operatorname{hol}(w)=g(x_0,x_1)\cdots g(x_{n-1},x_n)$。允许两种改写：删去或插入一次原路折返，$x,y,x\leftrightarrow x$；把三角形的两条边换成第三条边，$x,y,z\leftrightarrow x,z$。两种改写都不改变 $\operatorname{hol}$。若 $G$ 的每条闭走道都能用这两种改写化成单点，称 $G$ **被三角形填满**。

1. **充分。** 若 $G$ 被三角形填满，则任何群 $H$ 上满足上述两条的 $g$ 都是势之比。在每个连通分支取基点 $o$，令 $\varphi(x)=\operatorname{hol}(w)$，$w$ 为任一条从 $o$ 到 $x$ 的走道。两条这样的走道，一条接上另一条的反向，成为闭走道，它的 $\operatorname{hol}$ 为 $1$；由取逆规则，反向走道的 $\operatorname{hol}$ 是原走道的逆，所以 $\varphi$ 与走道的选取无关；对相邻的 $x,y$ 有 $\varphi(y)=\varphi(x)\,g(x,y)$，即 $g(x,y)=\varphi(x)^{-1}\varphi(y)$。
2. **必要。** 若 $G$ 的某个连通分支没有被三角形填满，则存在群 $H$ 与满足上述两条的 $g$，它不是势之比。取 $H$ 为该分支上以 $o$ 为基点的闭走道在两种改写下的等价类，乘法为首尾相接；取一棵生成树，记 $\gamma_x$ 为树上从 $o$ 到 $x$ 的走道，令 $g(x,y)=[\gamma_x\,(x,y)\,\gamma_y^{-1}]$，在其余分支上令 $g\equiv1$。它满足取逆与三角相容，并且任一以 $o$ 为基点的闭走道 $w$ 有 $\operatorname{hol}(w)=[w]$。这个 $H$ 非平凡：设以 $x$ 为基点的闭走道 $w$ 不能化成单点，则 $\gamma_x\,w\,\gamma_x^{-1}$ 是以 $o$ 为基点的闭走道，它能化成单点当且仅当 $w$ 能。势之比会使一切闭走道的 $\operatorname{hol}$ 等于 $1$，这与 $H$ 非平凡矛盾。
3. **偏差按填充面积累积。** 设 $H$ 带双侧不变的伪度量 $d$，$g$ 精确满足取逆，而三角相容只在误差 $\varepsilon$ 之内成立：在每个三角形上 $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$（由双侧不变性与取逆规则，三个顶点的六种排序给出同一个偏差）。一条用 $A$ 次三角形改写化成单点的闭走道满足 $d(\operatorname{hol}(w),1)\le A\varepsilon$，两个方向的改写都计入 $A$：折返不改变 $\operatorname{hol}$；每次三角形改写把乘积中的一段 $g(x,y)\,g(y,z)$ 换成 $g(x,z)$，或者反过来，双侧不变性把这一步的偏差控制在 $\varepsilon$ 之内。

**文献结果。** 第 2 款中的群是 $G$ 的团复形（以 $G$ 的团为单形）的棱道群，它同构于团复形的基本群（Spanier, *Algebraic Topology*, 1966, 第 3 章）；“被三角形填满”就是团复形的每个连通分支单连通。连通弦图的团复形可缩：单纯顶点的邻居张成一个单形，删去这个顶点是形变收缩，并且保持连通，沿消去次序归纳即得。所以 [@thm-appe-chordal-gain-potential] 是第 1 款的特例。
:::

两个例子标出边界。四圈没有三角形，它的闭走道群是 $\mathbb{Z}$，第 2 款的 $g$ 把绕圈一周记成生成元，任意和乐都允许。在四圈中央加一个与四点都相邻的轮毂，得到的四轮图不是弦图，因为外圈仍是无弦的四圈；它却被四个三角形填满，三角相容仍然推出势表示。所以对条款 IV 而言，要紧的是可比三角形能否填满每个圈。第 3 款可以和 §34.30.3 的有限网格斯托克斯定理对照着读：和乐的偏差不超过填充所用的三角形改写次数乘以单个三角形的偏差；填充是一张圆盘时，这个次数就是圆盘里三角形的个数。

### E.8.3 从势表示到格拉姆半正定与弦距 {#sec-appe-gram-from-potential}

有了 $c_{xy}=g_x^*g_y$，多点格拉姆半正定只差一个正的读数。

::: {.remark #rem-appe-gram-from-flatness title="平坦比较的求同读数表半正定，弦距是希尔伯特距离（手工推导与文献结果）"}
**手工推导。** 设条款 II–IV 成立，$\varphi$ 是 $\mathcal{A}$ 上的正线性泛函（$\varphi(a^*a)\ge0$），$\varphi(\mathbf{1})=1$，且在自伴元上取实值（复 $*$-代数上的正泛函自动如此）。对任意有限点组 $x_1,\dots,x_m$：

1. 求同读数表 $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ 是对角元为 $1$ 的实对称半正定矩阵。
2. $d(x,y)^2:=2\,\varphi\bigl(v(x,y)\bigr)=\varphi(\Delta_{xy}^*\Delta_{xy})$ 是某个希尔伯特空间中两点距离的平方，因而 $d$ 满足三角不等式。
3. 若求同读数都是实标量，$S(x_i,x_j)=s_{ij}\mathbf{1}$，则不需要泛函：只要 [@rem-appe-involution-positivity] 的正性条件成立，矩阵 $[s_{ij}]$ 就半正定。

推导：对实系数 $\alpha_i$ 令 $a=\sum_i\alpha_ig_i$。由 $c_{x_ix_j}=g_i^*g_j$ 与 $A(x_i,x_j)=-A(x_j,x_i)$，

$$
a^*a=\sum_{i,j}\alpha_i\alpha_j\,c_{x_ix_j}=\sum_{i,j}\alpha_i\alpha_j\,S(x_i,x_j).
$$

取 $\varphi$ 得 $\alpha^{\mathsf T}G\alpha=\varphi(a^*a)\ge0$，即第 1 款。第 3 款中 $a^*a=(\alpha^{\mathsf T}[s_{ij}]\alpha)\mathbf{1}$；若该数为负，正性条件迫使 $a=0$，于是 $a^*a=0$，矛盾。第 2 款用 $g_y-g_x=g_x\Delta_{xy}$：在 $\varphi$ 的 GNS 表示 $(\pi,\Omega)$ 中，$\lVert\pi(g_y)\Omega-\pi(g_x)\Omega\rVert^2=\varphi(\Delta_{xy}^*g_x^*g_x\Delta_{xy})=\varphi(\Delta_{xy}^*\Delta_{xy})$，再由 [@rem-appe-chord-sagitta-layer0] 第 4 款等于 $2\varphi(v)$。

**逆向（手工推导）。** 任给实内积空间中的单位向量 $x_1,\dots,x_m$，克利福德比较 $c_{ij}=x_ix_j$ 对反转对合满足条款 II–IV，标量部分是正泛函，读数为 $x_i\cdot x_j$。所以对角元为 $1$ 的实对称矩阵半正定，当且仅当它是某个平坦公平比较在某个正泛函下的求同读数表。

**冻结库中的对应部分。** 向量组的复格拉姆矩阵半正定见 [`gramPsd`](lean:D5/S3/Quantum/Measurement/AntidistinguishabilityGram.gramPsd)；半正定矩阵 $A$ 的平方距离 $A_{ii}+A_{jj}-2A_{ij}$ 构成条件负定核，见 [`gram_distance_conditionally_negative`](lean:D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_distance_conditionally_negative)。后者是 Schoenberg 定理（`文献结果`）在有限点集上的一个方向。
:::

合起来：

$$
\text{条款 IV}+\text{正泛函}\;\Longrightarrow\;\text{正自配对与读数表半正定};\qquad \text{标量相似}+\text{条款 IV}+\text{正性条件}\;\Longrightarrow\;\text{H2 的三项}.
$$

求同读数不是实标量时，椭圆负平方一项不再成立：在 $2\times2$ 复矩阵（对合取厄米共轭）中取 $g=\operatorname{diag}(e^{i\alpha},e^{i\beta})$ 型的平坦比较，条款 II–IV 与正性条件都成立，而 $A^2$ 是两个不同负数构成的对角阵，不是 $\mathbf{1}$ 的倍数（`手工推导`）。

`H3` 的“平行四边形极化”在这条路线上也成了结论：弦距 $d$ 来自 GNS 内积，内积空间的平行四边形恒等式 [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) 自动成立。这没有免去输入，只是换了输入的形状：正泛函给出的 $\varphi(a^*b)$ 本身就是一个半正定的内积型，“内积”被换成了“正读数”。柯西完备化仍按 `T1` 处理，不受影响。

四个反例各自违反哪一条，可以逐个点清。

::: {.example #ex-appe-countermodel-attribution title="四个第 0 层反例的归属与反例 (d) 的三点和乐（手工推导）"}
**手工推导。** 对 [@ex-appe-layer0-countermodels] 的四个反例：

| 反例 | 是否满足条款 II、III | 违反的条件 |
| :--- | :---: | :--- |
| (a) 单点 $\mathrm{CMP}(x_0,x_0)=-1$ | 是 | 条款 IV：$(-1)(-1)=1\neq-1$ |
| (b) 对偶数 $1\pm\varepsilon$、分裂复数 $\cosh\eta\pm j\sinh\eta$ | 是 | 正性条件：$\varepsilon^*\varepsilon=0$，$j^*j=-1$ |
| (c) $\mathcal{Cl}_{4,0}$ 的 $B=e_1e_2+e_3e_4$ | $B$ 不是任何公平元的求异部分 | 复合比较 $(\cos\frac\pi4+e_1e_2\sin\frac\pi4)(\cos\frac\pi4+e_3e_4\sin\frac\pi4)$ 的求异部分是 $\frac12B$，其求同部分 $\frac12(\mathbf{1}+e_1e_2e_3e_4)$ 不是实标量 |
| (d) $3\times3$ 相似表，$\det S=-3$ | 是 | 条款 IV 或正性条件；$A_{12}=0$ 的实现违反条款 IV |

反例 (d) 的验算。相似表 $S_{01}=S_{02}=\frac{\sqrt3}{2}$、$S_{12}=-1$ 与幅值 $\lvert A_{01}\rvert=\lvert A_{02}\rvert=\frac12$、$\lvert A_{12}\rvert=0$ 可以由取值在复单位圆上的比较实现：

$$
c_{01}=c_{02}=e^{i\pi/6},\qquad c_{12}=-1,\qquad c_{ji}=\overline{c_{ij}},\qquad c_{ii}=1 .
$$

它满足条款 II、III。三点和乐为

$$
h(0,1,2)=c_{01}\,c_{12}\,c_{20}=e^{i\pi/6}\cdot(-1)\cdot e^{-i\pi/6}=-1\neq1 ,
$$

违反条款 IV。以 $0$ 为锚点，链式偏差 $c_{12}-c_{10}\,c_{02}=-1-1=-2$，模长为 $2$。一般地，(d) 的求同读数是实标量而 $\det S<0$，由 [@rem-appe-gram-from-flatness] 第 3 款，它的任何实现都违反条款 IV 或正性条件。
:::

反例 (d) 还给出一个定量的对照。条款 IV 不精确成立时，格拉姆矩阵的负特征值由三点和乐偏离 $\mathbf{1}$ 的程度控制。

::: {.remark #rem-appe-near-flat-gram-bound title="近似平坦的比较给出近似半正定的读数表（手工推导）"}
**手工推导。** 设 $\mathcal{A}$ 是 $C^*$-代数，$\varphi$ 是态，比较满足条款 II、III 且 $c_{xx}=\mathbf{1}$。对点组 $x_1,\dots,x_m$ 固定其中一点为锚点 $o$，令

$$
\delta_o:=\max_{i,j}\,\lVert c_{x_ix_j}-c_{x_io}\,c_{ox_j}\rVert .
$$

则求同读数表 $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ 的最小特征值满足

$$
\lambda_{\min}(G)\ge-(m-2)\,\delta_o .
$$

推导：令 $g_i=c_{ox_i}$，写 $c_{x_ix_j}=g_i^*g_j+E_{ij}$。矩阵 $[\operatorname{Re}\varphi(g_i^*g_j)]$ 半正定。扰动 $F_{ij}=\operatorname{Re}\varphi(E_{ij})$ 是实对称矩阵，$\lvert F_{ij}\rvert\le\delta_o$；它的对角元为零（$E_{ii}=c_{x_ix_i}-c_{x_io}c_{ox_i}=0$），锚点所在的行与列为零，所以每行至多 $m-2$ 个非零元，由盖尔圆定理其特征值的绝对值不超过 $(m-2)\delta_o$。

由于对角元为 $1$ 且 $\lvert G_{ij}\rvert\le1$，平凡的下界是 $-(m-2)$，所以这条界只在 $\delta_o<1$ 时才有信息。锚点必须取在点组之内；取在点组之外时界变为 $-(m-1)\delta_o$。对 [@ex-appe-countermodel-attribution] 的反例 (d)：$m=3$，$\delta_o=2$，下界 $-2$ 没有信息，实际的最小特征值是 $\frac{1-\sqrt7}{2}\approx-0.8229$。
:::

这里的因子 $m-2$ 与 [@thm-appe-chordal-gain-potential-stability] 中的 $\lvert V\rvert-2$ 来源不同：定理中它是沿消去次序累积的三点偏差的个数，这里它是扰动矩阵每行非零元的个数。

### E.8.4 曲率从哪里来 {#sec-appe-curvature-from-half-comparison}

条款 IV 让一切三点和乐等于 $\mathbf{1}$，而球面角盈与贝里相位确实存在。两者并不冲突：平坦的是全比较，弯曲的是它的平方根。

::: {.remark #rem-appe-half-comparison-holonomy title="全比较平坦，半比较的三点和乐是吉拉尔角盈（手工推导与文献结果）"}
**手工推导。** 对求同读数为实标量 $s>-1$ 的公平元 $u$，由 $u+u^*=2s\mathbf{1}$ 得 $u^2=2su-\mathbf{1}$，于是 $(\mathbf{1}+u)^2=2(1+s)\,u$。令

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}},
$$

则 $r(u)$ 是公平元且 $r(u)^2=u$，称为 $u$ 的**半比较**。它的求同读数满足 $S(r)^2=\frac{1+s}{2}=1-\frac v2$。

在 $\mathcal{Cl}_{3,0}$ 中取两两不对径的单位向量 $a,b,c$，记 $r_{ab}=r(ab)$，$[a,b,c]=a\cdot(b\times c)$，$\mathbf{I}=e_1e_2e_3$。则全比较满足 $ab\cdot bc\cdot ca=\mathbf{1}$，而

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

推导：$(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$，其中用到 $ab\cdot bc=ac$、$bc\cdot ca=ba$、$ab\cdot ca=a(bc)a$ 与 $ab\cdot bc\cdot ca=\mathbf{1}$。标量部分是 $2(1+a\cdot b+b\cdot c+c\cdot a)$。双向量部分是 $b\wedge c+a(b\wedge c)a$；记 $b\wedge c=\mathbf{I}n$，$n=b\times c$，则 $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$，两项相加得 $2[a,b,c]\,\mathbf{I}a$。分母由 $r$ 的公平性确定，同时给出恒等式

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**文献结果。** 上式右端形如 $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$，是保持 $a$ 不动的旋子，其中 $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$；分母为正时即 $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$。$\lvert\Omega\rvert$ 是球面三角形 $abc$ 的面积，即吉拉尔角盈，$\Omega$ 的符号由 $[a,b,c]$ 的符号给出（van Oosterom–Strackee 1983；Eriksson 1990）。

**与冻结定理的对应。** 分子的两个量 $1+a\cdot b+b\cdot c+c\cdot a$ 与 $[a,b,c]$ 正是 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) 中 $4\operatorname{Tr}(P_aP_bP_c)$ 的实部与虚部。把上面的恒等式与 $\det G(a,b,c)=[a,b,c]^2$ 联立，得到

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

其中 $\det G$ 的展开式见 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)。
:::

$S(r)^2=1-\frac v2$ 在布洛赫球上就是 $\cos^2\frac\theta2$：半比较求同读数的平方等于 $1$ 减去半个矢高，这是玻恩权重的弦—矢高写法，它本身不替代 `H5` 的可加性前提。行列式公式说的是：三点格拉姆体积等于三个互补矢高之积乘以角盈的矢高，[§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)“二生三”原胞的 $\det G=\sin^4\epsilon$ 是它的特例。对 `H8` 而言，第 1 层内生的射影和乐不需要新的输入，它是条款 IV 之下把全比较开平方的结果；仍然需要第 2 层新输入的，是随时空基点变化的纤维联络及其动力学。

### E.8.5 玻恩权重：单比特上的缺口可以换成层析秩最小 {#sec-appe-born-minimal-rank}

`H5` 的缺口在单比特上最宽。$d\ge3$ 时，对只依赖两两比较的有界规则，在每组正交归一基上归一加上 $f(1)=1$ 已经定出玻恩律；$d=2$ 时它只剩对径归一，[@ex-appe-qubit-cubic-and-tomography] 的三次函数满足它而不是玻恩律。下面把单比特上缺的那条输入换一种说法，它与 `H7` 用的是同一种计数。

::: {.remark #rem-appe-born-zonal-minimal-rank title="单比特上玻恩律是层析秩最小的带状概率规则（手工推导）"}
**手工推导。** 在布洛赫球面 $S^2$ 上考虑只依赖两两比较的出口概率：制备 $\mathbf{s}$、出口 $\mathbf{r}$ 的概率为 $p(\mathbf{r}\mid\mathbf{s})=f(\mathbf{s}\cdot\mathbf{r})$，$f$ 是 $[-1,1]$ 上的连续函数。记 $t=\mathbf{s}\cdot\mathbf{r}$，这一对的矢高是 $v=1-t$。假设

- **对径归一**：$f(t)+f(-t)=1$；
- **确定性**：$f(1)=1$。

把 $f$ 按勒让德多项式展开，$f=\sum_l c_lP_l$。定义**层析秩** $K(f)$ 为函数族 $\{\mathbf{r}\mapsto f(\mathbf{s}\cdot\mathbf{r})\}_{\mathbf{s}\in S^2}$ 张成的实线性空间的维数，也就是预言一个制备的全部出口概率所需的实参数个数。则

$$
K(f)=\sum_{l:\,c_l\neq0}(2l+1),
$$

$f$ 不是多项式时 $K(f)=\infty$。对多项式 $f$，理由是实球谐函数的加法定理 $P_l(\mathbf{s}\cdot\mathbf{r})=\frac{4\pi}{2l+1}\sum_{m}Y_{lm}(\mathbf{s})\,Y_{lm}(\mathbf{r})$：$c_l\neq0$ 的每一阶贡献 $2l+1$ 个线性无关的函数 $Y_{lm}(\mathbf{r})$，而系数向量 $\bigl(Y_{lm}(\mathbf{s})\bigr)$ 随 $\mathbf{s}$ 变动张满整个系数空间。$f$ 不是多项式时有无穷多个 $c_l\neq0$；对每个这样的 $l$，$f(\mathbf{s}\cdot\,\cdot\,)$ 在 $l$ 阶球谐函数空间上的投影是 $c_lP_l(\mathbf{s}\cdot\,\cdot\,)$（Funk–Hecke 公式），而这个空间在旋转下不可约，所以张成空间投影到它的全体，维数至少是 $2l+1$。加法定理、Funk–Hecke 公式与球谐函数空间的不可约性都是标准事实（`文献结果`）。

对径归一迫使 $c_0=\frac12$，并使偶数阶 $l\ge2$ 的系数为零；确定性排除了 $f\equiv\frac12$，所以至少有一个奇数阶出现。于是

$$
K(f)\ \ge\ 1+3=4,\qquad K(f)=4\iff f(t)=\frac{1+t}{2}=1-\frac v2 .
$$

三次规则 $f(t)=\frac12(1+t^3)$ 含有 $l=0,1,3$ 三阶（$t^3=\frac35P_1+\frac25P_3$），层析秩为 $1+3+7=11$。

**$d\ge3$ 不需要计数（手工推导）。** 在 $\mathbb{CP}^{d-1}$ 上设 $p=f\bigl(\lvert\langle x\mid y\rangle\rvert^2\bigr)$，$f$ 有界，$f(1)=1$，并且在每组正交归一基上归一。单位向量在一组基下的模方可以取到概率单纯形上的任何一点，所以对一切 $t_i\ge0$、$\sum_it_i=1$ 有 $\sum_if(t_i)=1$。取 $(1,0,\dots,0)$ 得 $f(0)=0$。$d\ge3$ 时比较 $(t,s,1-t-s,0,\dots)$ 与 $(t+s,0,1-t-s,0,\dots)$，得 $f(t)+f(s)=f(t+s)$（$t,s\ge0$，$t+s\le1$）；这样的有界可加函数是线性的（标准事实），于是 $f(t)=t$，层析秩 $d^2$ 是结论而不是输入。取值非负的带状规则可加地延拓到全体投影之后，是格里森定理（[@thm-gleason-finite-projection]）所处理的标架函数的特例；上面这几行推导不依赖那条定理。$d=2$ 时单纯形只有一条边，这个比较做不出来，剩下的只有对径归一。

**文献背景。** Hardy (2001) 的简单性公理要求状态空间的参数个数 $K$ 取与其余公理相容的最小值，并由此推出 $K=N^2$；Galley–Masanes (2017) 把玻恩律的备选规则对应到酉群的表示。前者是“层析秩最小”这类条件的先例，后者给出相关的分类；上面的陈述与推导不取自其中任何一篇。
:::

所以在“概率只依赖两两比较”的前提下，`H5` 的输入可以这样分。$d\ge3$ 时，有界、$f(1)=1$ 加投影可加性已经足够。$d=2$ 时还缺一条：它可以是 E.7 所列的全效应可加性，也可以是一句计数，即一个制备的全部预言由 $4$ 个实数决定，不能更少。$4$ 正是 `H7` 的局域层析计数用到的 $\dim_{\mathbb{R}}\operatorname{Herm}(2)$，也是 [@rem-appe-gram-from-flatness] 的格拉姆嵌入（布洛赫向量的三个坐标）加上归一所占的维数：概率对矢高仿射，等价于概率是嵌入坐标的仿射函数。这只是换了输入的形状。层析秩最小本身仍是一条 `T2` 操作假设，两两公平推不出它；不连续的规则，以及不只依赖两两比较的规则，都不在这条注记的范围内。

### E.8.6 台账改了什么 {#sec-appe-reduced-ledger}

::: {.remark #rem-appe-reduced-ledger title="加入条款 IV 与正性条件之后的台账（对 [@rem-appe-master-audit-table] 的补充）"}
**补充审计（`MODEL` + `手工推导`，定理盒部分对应冻结定理）。** 下表只列发生变化的条目；`H1`、`H4`、`H6`、`H7`、`H9` 的处理机制与 [@rem-appe-master-audit-table] 相同。

| 条目 | 原处理 | 加入两条条件之后 | 依据 |
| :--- | :--- | :--- | :--- |
| `H2` 正自配对 | 显式的第 1 层标定 | 由条款 IV 推出 | [@rem-appe-anchoring-consequences] 第 1 款 |
| `H2` 椭圆负平方 | `T3` 分岔 | 求同读数为实标量时由正性条件推出；此时正性条件对每个比较的求异部分等价于它的整数次幂有界；非标量时不成立 | [@rem-appe-involution-positivity]、[@rem-appe-bounded-recurrence] |
| `H2` 多点格拉姆半正定 | 显式的第 1 层条件 | 由条款 IV 加正泛函推出，逆向成立；标量相似时由条款 IV 加正性条件推出；偏离平坦时有定量下界 | [@thm-appe-chordal-gain-potential]、[@rem-appe-gram-from-flatness]、[@rem-appe-near-flat-gram-bound] |
| `H3` 平行四边形极化 | `T2` 条件 | 弦距来自正泛函的 GNS 内积，输入由“内积”换成“正读数”；完备化仍为 `T1` | [@rem-appe-gram-from-flatness] 第 2 款 |
| `H5` 玻恩权重 | `T2` 可加性条件 | 只对只依赖两两比较的规则：$d\ge3$ 时有界、在每组正交归一基上归一且 $f(1)=1$ 就定出玻恩律；$d=2$ 时对连续规则，全效应可加性可以换成“对径归一、$f(1)=1$、层析秩最小”；仍是 `T2` 输入 | [@rem-appe-born-zonal-minimal-rank] |
| `H8` 洛伦兹签名 | `T3` 分岔 | 可与 `H2` 的签名分岔读作同一处取舍（`MODEL`） | E.8.1 末段 |
| `H8` 第 1 层射影和乐 | 第 1 层内生 | 在 $\mathcal{Cl}_{3,0}$ 中由半比较的三点和乐给出闭式 | [@rem-appe-half-comparison-holonomy] |

新增的两条输入是条款 IV（[@def-appe-third-point-redundancy]）与正性条件（[@rem-appe-involution-positivity]）；求同读数不是实标量时，读数表的半正定另需一个正泛函。条款 IV 不必对一切三点成立：可比三角形填满每个圈就够了，而且对一切群而言这是恰好够的条件（[@rem-appe-triangle-simple-connectivity]）。条款 IV 排除一切全比较的和乐，它刻画的是第 1 层的平坦骨架；带真实曲率的第 2 层联络必须放弃它，那时 [@thm-appe-chordal-gain-potential-stability] 与 [@rem-appe-near-flat-gram-bound] 给出偏离的代价。
:::

这一节没有减少输入的总数到零，它改变的是输入的形状：在求同读数为实标量的情形，`H2` 的三项原先是关于自配对、双向量与格拉姆矩阵的三条几何陈述，现在换成两条只用比较本身就能说出口的条件。一条说第三者不改变两者之比，一条说差异的往返留下正的痕迹。
