# E.1 三层代数签名剥离与中间假设四分类准则 {#sec-appe-layers}

在审视“从比较导出诸公理”之前，首要任务是将“比较（`CMP`）”本身拆解为三个严格递进的代数层级——唯有把**抽象两槽接口**与**内积—克利福德几何实现**以及**多体纤维动力学**剥离开来，才能看清每一步究竟用到了多少结构。

::: {.remark #rem-appe-layer-taxonomy title="三层代数比较签名（Layer 0–Layer 2）与中间假设四分类准则（T1–T4）"}
**形式分层与认识论审计准则（`MODEL` + `手工推导`）。** 围绕比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]），全部推导链严格区分以下三层比较签名与四类中间假设处理机制：

1. **三层代数比较签名剥离**：
   - **第 0 层（Layer 0：抽象类型化两槽比较接口）**：给定对象集合或类型 $X$ 及一个使元素 $2$ 可逆（$2 \in \mathcal{A}^\times$）的含幺结合 $*$-代数 $\mathcal{A}$，原始比较算子仅是一个两槽映射 $\mathrm{CMP} : X \times X \to \mathcal{A}$。因 $2$ 可逆，$\mathrm{CMP}$ 唯一正交分解为偶对称部分（相似读数）与奇反对称部分（有向差异）：

     $$
     S(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) + \mathrm{CMP}(y, x)\bigr), \qquad A(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) - \mathrm{CMP}(y, x)\bigr),
     $$

     满足 $S(y, x) = S(x, y)$、$A(y, x) = -A(x, y)$ 及 $\mathrm{CMP}(x, y) = S(x, y) + A(x, y)$。注意：**$2$ 可逆是不可省略的底层代数前提**——在特征为 $2$ 的域（如二元域 $\mathbb{F}_2$）上，$+1 = -1$ 且 $2 = 0$ 不可逆，偶部与奇部完全塌缩重合，奇偶正交分解本身即告退化！即使添入对合反转互易 $\mathrm{CMP}(y, x) = \mathrm{CMP}(x, y)^\dagger$ 与成对单位闭合 $\mathrm{CMP}(x, y)\mathrm{CMP}(y, x) = \mathbf{1}$，第 0 层本身仍**不蕴涵**自配对正定性、椭圆负平方或三点以上格拉姆矩阵半正定性（见下框 [@ex-appe-layer0-countermodels]）。
   - **第 1 层（Layer 1：正定内积—克利福德几何与内生射影射线实现）**：对象嵌入实欧氏内积空间及其克利福德代数 $\mathcal{Cl}(V, q_+)$，使 $\mathrm{CMP}(x, y) = \langle x, y\rangle\mathbf{1} + x \wedge y$。此时同时激活三项几何刚性：(i) 单位态自配对恒正 $S(x, x) = +1$；(ii) 两向量外积构成秩 $2$ **简单双向量（simple 2-blade）**，满足普吕克（Plücker）简单性 $(x \wedge y) \wedge (x \wedge y) = 0$ 与椭圆负平方 $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$，从而拉格朗日—格拉姆恒等式（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，`LEAN ✓`）强制导出 $\langle x, y\rangle^2 + \|x \wedge y\|^2 = \|x\|^2\|y\|^2$；(iii) 任意有限 $n$ 元组 $\{x_1, \dots, x_n\}$ 的相似矩阵 $G_{ij} = S(x_i, x_j)$ 自动全局半正定 $G \succeq 0$。更关键的是，一旦通过秩一纯态投影算子 $P(\mathbf{n}) = \frac{1}{2}(I_2 + \mathbf{n}\cdot\boldsymbol{\sigma})$（$\|\mathbf{n}\|=1$）落到第 1 层单位布洛赫球面 $S^2 \cong \mathrm{SU}(2)/\mathrm{U}(1)$ 上，单纤维纯态投影比较环路在**第 1 层内部**便已内禀携带非平凡的射影 $\mathrm{U}(1)$ 潘查拉特纳姆—贝里射线和乐（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)，详见[§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral) 与 [§E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)）。
   - **第 2 层（Layer 2：跨时空基点局域纤维丛联络、复合局域层析与粗粒化记录捏合）**：当比较超越单一纤维而跨越**时空图上独立索引的不同基点纤维 $\{\mathcal{H}_x, U_{xy}\}$ 与外部规范场动力学**、跨越复合多体子系统或穿过有限带宽观察者的未读记录投影时，在 Layer 1 之上进一步引入跨边幺正联络输运 $U_{xy}$、复张量局域层析完备极小性以及保单位（双随机）基底捏合通道。
2. **中间假设的四分类进一步处理准则（`T1`–`T4`）**：
   - **`T1` 典范商化与柯西完备化（Canonical Quotient / Cauchy Completion）**：无需引入任何新物理公设，直接对原始结构施加等价核商化 $X/{\sim_{\mathrm{CMP}}}$ 或度量柯西完备化 $\widehat{X}$，即可把表面前提转化为商空间或完备空间上的严格定理。
   - **`T2` 操作测量与复合极小性归约（Operational Measurement / Composition Reduction）**：将教科书中抽象的希尔伯特算子公设（如玻恩投影公设、吕德斯坍缩、幺正群演化、张量积规则与热力学熵增），替换为实验室可直接检验的操作条件（效应有限可加性、可重复最小扰动、双侧可逆性、局域层析极小性与保单位粗粒化）。
   - **`T3` 代数签名、估值与交换统计分岔（Signature / Valuation / Exchange Bifurcation）**：不强行消灭分支，而是用它精确刻画宇宙的真实数学分支点——如椭圆复数 $\mathbb{C}$ vs. 双曲分裂复数 vs. 幂零对偶数、阿基米德实域 $\mathbb{R}$ vs. 非阿基米德 $p$ 进域 $\mathbb{Q}_p$、零曲率欧氏平面 vs. 正曲率球面、对称玻色扇区 $\mathrm{Sym}^N$ vs. 反对称费米扇区 $\bigwedge^N$。
   - **`T4` 不可约集合论强度、连续统极限与复杂性开放前沿（Irreducible Strength & `OPEN` Frontier）**：诚实标定两槽比较无法独自跨越的哥德尔集合论存在强度（如无穷公理、幂集公理、选择公理）、$3+1$ 维相互作用连续统量子场论极限，以及 $\mathrm{P} \neq \mathrm{NP}$ 等未决数学前沿（`OPEN`）。
:::

为什么绝不能把 Layer 1 的几何性质误当成 Layer 0 抽象两槽接口的“无条件免费赠品”？下面四个纯有限维手工反例逐一给出了铁证：

::: {.example #ex-appe-layer0-countermodels title="第 0 层抽象比较接口的四个有限代数反例（手工推导）"}
**手工推导。** 以下四个有限代数模型均满足 $2$ 可逆与奇偶正交分解，(a)、(b)、(d) 还满足相应的对合或成对单位互易律（(c) 的 $B$ 不来自满足条款 III 的比较，见 [§E.8](appendix-e-s08-third-point-redundancy.md#sec-appe-third-point-redundancy)），却分别证伪了缺少 Layer 1 条件时的目标结论：

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

   多出了非零四重伪标量项 $B \wedge B = 2 e_1 \wedge e_2 \wedge e_3 \wedge e_4 \neq 0$！这证明第 28 章中 $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$ 之所以恒落回纯实标量，恰恰依赖于两槽外积 $x \wedge y$ 是秩至多为 $2$ 的**简单双向量片（simple 2-blade，$B \wedge B = 0$）**。
4. **反例 (d) 逐对单位互易却违背三点格拉姆半正定与三角不等式的 $3 \times 3$ 实矩阵**：
   在三元集 $X = \{0, 1, 2\}$ 上定义实对称偶相似表 $S_{00} = S_{11} = S_{22} = 1$、$S_{01} = S_{02} = \frac{\sqrt{3}}{2}$、$S_{12} = -1$，并为每对指标匹配互补的局部平面双向量幅值 $|A_{01}| = |A_{02}| = \frac{1}{2}$、$|A_{12}| = 0$。对每一对 $(i, j)$，成对勾股闭合 $S_{ij}^2 + |A_{ij}|^2 = 1$ 全部精确成立（$\frac{3}{4} + \frac{1}{4} = 1$，$(-1)^2 + 0 = 1$）！然而写出三态全局相似矩阵

   $$
   S \;=\; \begin{pmatrix} 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{2} \\ \frac{\sqrt{3}}{2} & 1 & -1 \\ \frac{\sqrt{3}}{2} & -1 & 1 \end{pmatrix}, \qquad \det S \;=\; 1(1 - 1) - \frac{\sqrt{3}}{2}(\sqrt{3}) + \frac{\sqrt{3}}{2}(-\sqrt{3}) \;=\; -3 \;<\; 0,
   $$

   其特征值为 $\lambda_1 = 2$、$\lambda_2 = \frac{1 + \sqrt{7}}{2} \approx 1.8229$ 与负特征值 $\lambda_3 = \frac{1 - \sqrt{7}}{2} \approx -0.8229 < 0$，全局格拉姆半正定性 $S \succeq 0$ 当场破缺！与之等价地，弦距离 $d(i, j) = \sqrt{2 - 2S_{ij}}$ 给出 $d(0, 1) + d(0, 2) = 2\sqrt{2 - \sqrt{3}} = \sqrt{6} - \sqrt{2} \approx 1.0353 < 2 = d(1, 2)$，直接击穿度量三角不等式。故二元成对互易绝不自动推出 $n \ge 3$ 的全局内积可嵌入性。
:::
