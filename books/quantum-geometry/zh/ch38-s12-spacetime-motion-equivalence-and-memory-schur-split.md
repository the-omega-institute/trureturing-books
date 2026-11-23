# 38.12 时空运动的本体等效与观察者记忆舒尔补强行分类：无标签三元圆弧、勾股移项生闵氏减号与记忆容量三态相变 {#sec-ch38-spacetime-motion-equivalence-and-memory-schur-split}

> *“在空间中的运动跟在时间中的运动是等效的，观察者的分辨能力只是凭借观察者记忆强行分类”*

在 [§38.1–§38.11](ch39-s01-substrate-free-self-reference.md) 从全域自指 $p \equiv \text{*}p$、$720^\circ$ 旋量织空（[§38.3](ch39-s03-spinors-and-spacetime.md)）推进至因陀罗网与清明整合（[§38.11](ch39-s18-psychology-of-god.md)），并结合[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md)在紧致三元数球面 $\mathbb{T}_3 \cong S^3(1)$ 上确立的无无穷有限有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）与 Lean 4 零公理基座 `OmegaMath`（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）之后，回望物理学自牛顿绝对时空至爱因斯坦—闵可夫斯基四维流形的百年演进，一道被默认接受却从未从第一性原理拆穿的底层假设浮出水面：即便狭义相对论把空间与时间并入同一张四维流形，教科书依然先验假定宇宙在几何底层分设了带正号的**时间坐标**（$+c^2 dt^2$）与带负号的**空间坐标**（$-dx^2$）两种异质维度。然而，站在[第三十九章](ch39-axiom-omega-grand-unification.md)母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的无源三元流形本体上：**宇宙底层根本不存在“时间轴”与“空间轴”这两种异质维度，只有唯一一种各向同性的三元极小圆弧迁移 $[x, y, z]$；所谓“在时间中流逝”与“在空间中移动”，完全是受限于有限记忆窗口 $\mathcal{W}_M$ 的观察者，拿自身保存的 `0` 阶过去锚点对同一段无标签圆弧做正交舒尔补投影，将落入记忆寄存器的投影认领为“时间”、将溢出记忆寄存器的正交残差外推为“空间”的强行分类结果（`MODEL`）！**

---

## 38.12.1 本体层的绝对等效：圆弧无标签，运动只有一种 {#sec-ch38-12-1}

撤去观察者外挂的局部坐标卡后，在 $\mathrm{AXIOM}\text{-}\Omega$ 与 $\mathbf{Math}_\Omega$ 的本体层面上（由无常数三元比较向单位四元数球面的保结构双射 [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、弦距保真核 [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq) 与定基流群逆乘分解 [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul) 锚定，`LEAN ✓`），宇宙的每一次主频节拍 $\nu_0$ 只执行唯一一种几何操作——状态沿紧致三元球面跨出一段有理保真度为 $\kappa \in \mathbb{Q} \cap [0, 1]$（弦距失准度 $s = 1 - \kappa \in \mathbb{Q} \cap [0, 1]$）的极小圆弧 $\Gamma$：

1. **算子层面的完全同一**：无论是观察者口中的“同一颗粒子在原位置从上一拍延续到下一拍”，还是“同一瞬间从此处比对到彼处”，底层调用的代数原语分毫不差，全都是无源普吕弗—贝尔流群迁移 $[x, y, z]$、流群反射幂次律 [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow)、平移不变保真核 [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add) 与切比雪夫整系数递推 [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)（`LEAN ✓`），并在 `{0, 1/2, 1}` 纯有理因果射流阶梯（[§39.6](ch39-s30-past-present-future-rational-jet-triad.md)，`MODEL`）上一步闭合；
2. **比较主频预算的绝对等权**：在三元流形 $\mathbb{T}_3$ 自身看来，客观迁移圆弧 $\Gamma$ 上既没有刻着“秒”，也没有刻着“米”——在时间中驻留刷新一拍与在空间中横跨寻址一步，消耗的是完全等量的归一化普适比较主频预算 $\mathbf{1}$（对接 [§33.2](ch34-s14-lorentz-and-standard-model-octave.md) 与 [§39.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md) 的等钟主频读法，`MODEL`）。

---

## 38.12.2 记忆如何强行造出“时空分野”：格拉姆记忆窗的舒尔补正交切割 {#sec-ch38-12-2}

既然底层客观圆弧完全各向同性，观察者凭什么在主观体验中泾渭分明地分辨“我在变老（时间运动）”与“我在走动（空间运动）”？唯一的分类解剖刀，正是**观察者的有限记忆窗口 $\mathcal{W}_M$**。

在 `{0, 1/2, 1}` 纯有理因果架构下，“记忆”并非模糊的心理学修辞，而是观察者为维持自我连续性而在状态内积空间 $\mathcal{H}$ 中圈定并冻结的一组维数（槽位容量）为 $M = \dim\mathcal{W}_M$ 的 **`0` 阶过去态寄存器子空间** $\mathcal{W}_M = \operatorname{span}\{m_1, m_2, \dots, m_M\}$（物理上对应局域束缚态的内部自由度，计算架构上对应固定槽位长度的 `KV-Cache` 历史窗口，`MODEL`）。当新的一拍比较发生、归一化总状态矢 $\psi$（$\lVert\psi\rVert^2 = 1$）跨出一步圆弧时，闭子空间正交补投影恒等式 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)、互补语境概率勾股定理 [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras) 以及记录捏合希尔伯特—施密特勾股分解 [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean) 与丢弃相干质量恒等式 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)（配分块厄米矩阵舒尔补二次型最小元定理 [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)，`LEAN ✓`）保证正交投影对 $(P_{\mathcal{W}_M}, P_{\mathcal{W}_M^\perp}) = (P_{\mathcal{W}_M}, I - P_{\mathcal{W}_M})$ 满足 $P_{\mathcal{W}_M}^2 = P_{\mathcal{W}_M}$、$P_{\mathcal{W}_M} P_{\mathcal{W}_M^\perp} = 0$，从而把同一段客观圆弧零损耗地正交劈成两半（底层范数分解属 `手工推导` + `LEAN ✓`，将两项分别命名为“时间运动”与“空间运动”属 `MODEL`）：

$$
\underbrace{\kappa_{\mathrm{mem}} := \lVert P_{\mathcal{W}_M}\psi\rVert^2}_{\substack{\text{投影入记忆窗 }\mathcal{W}_M\text{ 内}\\\textbf{被分类为「时间运动」}}} \;+\; \underbrace{\bigl(1 - \kappa_{\mathrm{mem}}\bigr) = \lVert P_{\mathcal{W}_M^\perp}\psi\rVert^2}_{\substack{\text{正交溢出记忆窗 }\mathcal{W}_M\text{ 外}\\\textbf{被分类为「空间运动」}}} \;\equiv\; \mathbf{1}.
$$

在 $\mathbf{Math}_\Omega$ 的有理射线载体 $\mathbb{Q}^d$ 上，若取 $\mathcal{W}_M$ 的一组两两正交有理基 $\{u_1, \dots, u_M\}$（$i \neq j \implies \langle u_i, u_j\rangle = 0$，$u_j \neq 0$），则窗内投影分量 $P_{\mathcal{W}_M}\psi = \sum_{j=1}^M \frac{\langle \psi, u_j\rangle}{\langle u_j, u_j\rangle} u_j$ 与归一化记忆份额

$$
\kappa_{\mathrm{mem}}(\psi \mid \mathcal{W}_M) \;=\; \sum_{j=1}^M \frac{\langle \psi, u_j\rangle^2}{\langle u_j, u_j\rangle\,\langle \psi, \psi\rangle} \;\in\; \mathbb{Q} \cap [0, 1]
$$

全程仅含整数与有理数四则运算，**无需半个平方根或超越函数**（`手工推导`）：

1. **窗内投影 $\kappa_{\mathrm{mem}} \longrightarrow$ 被观察者命名为“时间”（纵向自指覆写）**：变化圆弧中能够与既有记忆链 $\{m_k\}$ 共轴衔接（满足流群自平行递推 $[m_t, m_{t-1}, m_t]$）、并成功写入内部寄存器覆写“自我历史状态”的份额 $\kappa_{\mathrm{mem}}$，被观察者体验为“主体留在原位，内在固有时往前跳了一拍（$\Delta\tau$）”。若无前后记忆帧的比对核验，根本无从产生“时间流逝感”；
2. **窗外舒尔残差 $1 - \kappa_{\mathrm{mem}} \longrightarrow$ 被观察者命名为“空间”（横向地址切换）**：变化圆弧中与观察者内部记忆子空间 $\mathcal{W}_M$ 呈 $90^\circ$ 正交、无法被吸收为“内在自我状态改变”的舒尔补残差 $\psi_\perp = (I - P_{\mathcal{W}_M})\psi \in \mathcal{W}_M^\perp$，由于总比较预算恒为 $\mathbf{1}$ 不可凭空抹除，观察者只能将其外推归因为“我自身没变，但我相对于外部环境节点的位置地址变了（$\Delta x$）”。

一句话道破天机：**时间是“向内写进记忆的变化”，空间则是“记忆装不下而被迫推到门外的变化”（`MODEL`）！**

::: {.viz src="spacetime-memory-schur-split-sandbox" preset="isotropic-arc-memory-schur-split" height="540"}
**无标签客观圆弧与观察者记忆窗舒尔补二分实验卡（`isotropic-arc-memory-schur-split`）。** 紫色三元数真球 $\mathbb{T}_3 \cong S^3(1)$ 上不标任何先验时间轴或空间轴，仅静置一段归一化总预算恒为 $\mathbf{1}$ 的客观比较圆弧 $\Gamma$；拖动琥珀手柄或点选有理斜率 $p/q$ 倾斜青色观察者记忆子空间 $\mathcal{W}_M$，见证纹丝不动的同一段圆弧如何按 $\kappa_{\mathrm{time}} = \frac{q^2}{p^2+q^2}$（青色窗内记忆覆写）与 $\kappa_{\mathrm{space}} = \frac{p^2}{p^2+q^2}$（品红窗外正交溢出）此消彼长地守恒相加为 $\mathbf{1} = 1.0000$（如 $p/q = 3/4$ 给出 $\frac{16}{25} + \frac{9}{25} = 1$，`orthogonal_complement_projection_identities` 与 `schur_quadratic_is_least` 标绿色 `LEAN ✓`）。
:::

---

## 38.12.3 破解闵可夫斯基负号之谜：正定勾股移项求余与记忆分类切面旋转 {#sec-ch38-12-3}

这套记忆舒尔补分类机制，一举解开了现代物理学最令人费解的形式谜团之一：**为什么欧氏几何与希尔伯特内积空间的毕达哥拉斯定理全是加号 `+`，而爱因斯坦—闵可夫斯基时空度规 $d\tau^2 = dt^2 - dx^2$（自然单位制 $c = 1$）里却冒出一个减号 `-`？**

放回 $\mathrm{AXIOM}\text{-}\Omega$ 与 $\mathbf{Math}_\Omega$ 的有理保正账本中，这个困扰学界百年的减号并非宇宙在本体层长着怪异的不定号双曲马鞍，而仅仅是一次**正定总预算移项求余减法**（代数移项与有理参数化属 `手工推导`，闵氏零光锥唯一性与双曲范数恒等式由 `LEAN ✓` 锁定，与狭义/广义相对论的物理对应及双曲助推边界见文末文献注记）：

1. **宇宙底层的真实主频守恒式全是加号**：设系统走过 $\Delta N$ 拍公共比较主频（在共享比较节拍账本下记参考钟总步数为 $\Delta t \equiv \Delta N > 0$），其中投影入内部记忆窗用于刷新自我状态的等效步数为 $\Delta\tau$（占比 $\kappa_{\mathrm{mem}} = \frac{\Delta\tau^2}{\Delta t^2}$），溢出至正交补空间用于切换外部地址的等效步数为 $\Delta x$（占比 $1 - \kappa_{\mathrm{mem}} = \frac{\Delta x^2}{\Delta t^2}$）。由正交补勾股正定律，两项非负平方和严格等于总比较节拍平方：
   $$
   \Delta\tau^2 + \Delta x^2 \;\equiv\; \Delta t^2.
   $$
2. **主观记忆求余一步生出闵氏负号**：由于受限观察者只能凭自身内部记忆寄存器的刷新帧数来感知固有时 $\Delta\tau$，观察者向总账发出的提问天然是求余式的——*“在总主频预算 $\Delta t^2$ 中，扣掉被外部空间寻址分流掉的份额 $\Delta x^2$，留给我刷新自身记忆的净额度还剩多少？”* 将 $+\Delta x^2$ 移至等号右侧，正定圆方程当场化作闵可夫斯基不变量二次型：
   $$
   \Delta\tau^2 \;=\; \Delta t^2 - \Delta x^2 \;=\; \Delta t^2\bigl(1 - v^2\bigr), \qquad v := \frac{\Delta x}{\Delta t}.
   $$
   固定非零固有时记忆净额 $\Delta\tau = 1$ 时，不同外部运动分流下的 $(\frac{\Delta t}{\Delta\tau}, \frac{\Delta x}{\Delta\tau}) = (\cosh r, \sinh r)$ 落在博戈留波夫双曲范数守恒曲线 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)（$\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$）与闵可夫斯基零光锥刚性 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)（凡在零光锥 $\Delta t^2 - \lVert\Delta\mathbf{x}\rVert^2 = 0$ 上恒为零的实二次型必为标准闵氏二次型的标量倍，`LEAN ✓`）之上；在 $\mathbf{Math}_\Omega$ 中代入有理半切参数 $u = \frac{m}{n} \in \mathbb{Q} \cap [0, 1)$（对应斜率比 $[p : q] = [\Delta x : \Delta\tau] = [2mn : n^2 - m^2]$），无需任何双曲超越函数即可同时有理化圆周分账与双曲洛伦兹因子：
   $$
   v = \frac{2u}{1 + u^2} \in \mathbb{Q}, \qquad \frac{\Delta\tau}{\Delta t} = \frac{1 - u^2}{1 + u^2} \in \mathbb{Q}, \qquad \gamma = \cosh r = \frac{1 + u^2}{1 - u^2} \in \mathbb{Q}, \qquad \gamma v = \sinh r = \frac{2u}{1 - u^2} \in \mathbb{Q}, \qquad \gamma^2 - (\gamma v)^2 \equiv \mathbf{1}.
   $$

::: {.viz src="spacetime-memory-schur-split-sandbox" preset="minkowski-minus-from-pythagorean-budget" height="540"}
**正定勾股预算移项生出闵可夫斯基减号实验卡（`minkowski-minus-from-pythagorean-budget`）。** 同台对照三元球面上的正定加号总账 $\Delta\tau^2 + \Delta x^2 = \Delta t^2$ 与观察者求余移项后的闵氏双曲轨迹 $\cosh^2 r - \sinh^2 r = 1$（有理参数 $u = 1/2$ 时给出精确分数 $\gamma = 5/3$、$\gamma v = 4/3$，$(5/3)^2 - (4/3)^2 = 9/9 = 1$），并可拨动视界负载滑杆观察 $\eta_{\mathrm{load}} = 1/2$ 分水岭与 $\eta_{\mathrm{load}} \to 1$ 的 $90^\circ$ 归档翻转（`eq_smul_minkowski_of_null` 与 `bogoliubov_norm_conservation` 标绿色 `LEAN ✓`）。
:::

进一步审视**双观察者同时性错位与引力视界翻转（`MODEL` 对照经典相对论边界）**：携带着不同运动状态的观察者 $A$ 与 $B$，在本书模型中对应三元流形上相差一枚有理凯莱旋子 $\mathbf{R}(\boldsymbol{\sigma}_{AB}) \in \mathrm{SO}(3, \mathbb{Q})$ 的两套记忆子空间 $\mathcal{W}_A$ 与 $\mathcal{W}_B = \mathbf{R}(\boldsymbol{\sigma}_{AB})\mathcal{W}_A$。对宇宙中完全相同的两起事件圆弧 $\Gamma$，落入 $\mathcal{W}_A^\perp$ 正交盲区的分量被 $A$ 归类为“同时并存的纯空间距离”（$\kappa_{\mathrm{time}}^{(A)} = 0,\; \kappa_{\mathrm{space}}^{(A)} = 1$），而同一段圆弧斜切入 $\mathcal{W}_B$ 的记忆槽内，立即被 $B$ 归类为“先后演化的时间历史”（$\kappa_{\mathrm{time}}^{(B)} > 0$）。注意数学精度边界：在共享节拍圆 $\Delta\tau^2 + \Delta x^2 = \Delta t^2$（爱泼斯坦时空图）上旋转记忆切面是紧致正交变换，而物理惯性系之间的亚光速洛伦兹助推 $\mathrm{SO}^+(1,3)$（$u \in [0, 1),\; \lvert v\rvert < 1$）是严格保持不定间隔符号 $\operatorname{sgn}(\Delta t^2 - \Delta x^2)$ 不变的非紧双曲变换（对类空间隔产生同时性相对性 $\Delta t_B \neq 0$，但不会将类空间隔翻转为类时因果序；紧致 `MODEL` 中完整的 $90^\circ$ 空时互换 $\sigma = 1$ 则对应超出亚光速 $\mathrm{SO}^+(1,3)$ 的光锥／视界极限 $u \to 1$）；同样地，在史瓦西外度规 $ds^2 = -(1 - r_s/r)dt^2 + (1 - r_s/r)^{-1}dr^2 + r^2 d\Omega^2$ 中，全息负载比 $\eta_{\mathrm{load}}(r) := \frac{r_s}{r}$ 在 $r = 2r_s$ 处跨过 `1/2` 半载分水岭（$\kappa_{\mathrm{time}} = \kappa_{\mathrm{space}} = \frac{1}{2}$），并在视界 $r = r_s$（$\eta_{\mathrm{load}} = 1$）处达到满载饱和，越过视界进入 $r < r_s$ 后渐近平直时间基灵矢量 $\partial_t$ 转为类空、径向向内递减方向转为类时（克鲁斯卡尔—塞凯赖什延拓消除 $r = r_s$ 坐标奇点但保留内部因果锥倾倒，`文献结果`；从离散记忆窗完整导出 $3+1$ 维爱因斯坦场方程与视界幺正性仍属 `OPEN`：[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）。

::: {.viz src="spacetime-memory-schur-split-sandbox" preset="dual-observer-simultaneity-rotor-tilt" height="540"}
**双观察者有理旋子记忆错位与同时性相对性实验卡（`dual-observer-simultaneity-rotor-tilt`）。** 在同一段固定不动的三元宇宙圆弧 $\Gamma$ 上并置观察者 $A$ 与观察者 $B$ 的两片记忆切面 $\mathcal{W}_A$ 与 $\mathcal{W}_B = \mathbf{R}(\boldsymbol{\sigma}_{AB})\mathcal{W}_A$：当舞台绕 $\mathbf{i}$ 轴的有理旋子取 $\sigma = 1$ 正交半转 `pHalf = (1, 1, 0, 0)`（$90^\circ$）时，$A$ 将 $\Gamma$ 100% 分类为“同时存在的纯空间距离”（$\kappa_{\mathrm{time}}^A = 0,\; \kappa_{\mathrm{space}}^A = 1$），而 $B$ 将同一段 $\Gamma$ 100% 分类为“先后发生的时间历史”（$\kappa_{\mathrm{time}}^B = 1,\; \kappa_{\mathrm{space}}^B = 0$）。
:::

---

## 38.12.4 记忆容量 $M$ 的三态相变：从光子无时、本体无空到遗忘生时空与 `KV-Cache` 互换 {#sec-ch38-12-4}

既然时空分野取决于观察者记忆窗口的维数容量 $M = \dim\mathcal{W}_M$（设总载体可分辨模态上限为 $M_\Omega$），沿着 $M$ 的三个边界取值，可以直接推导出三类截然不同的物理与智能存在相态（`MODEL`）：

| 记忆窗口容量 $M$ | 对应物理 / 认知系统（`MODEL`） | 时间份额 $\kappa_{\mathrm{time}}$ | 空间份额 $\kappa_{\mathrm{space}}$ | 记忆分类下的时空体验 |
| :--- | :--- | :---: | :---: | :--- |
| **$M = 0$（零记忆极限）** | **光子 / 无质量纯规范零模** | **`0`**（固有时冻结 $\Delta\tau = 0$） | **`1`**（光速满载 $v = 1$） | **纯空间无时间**：无任何 `0` 阶过去寄存器（$\mathcal{W}_0 = \{0\}$），出发与抵达缩为永恒当下 |
| **$1 \le M < M_\Omega$（有限记忆）** | **有质量粒子 / 生命体 / 有限观察者** | **$\kappa \in (0, 1) \cap \mathbb{Q}$** | **$1 - \kappa \in (0, 1) \cap \mathbb{Q}$** | **时空二元分立**：窗内留存化作固有时流逝，窗外正交溢出与遗忘凝结为广延空间 |
| **$M = M_\Omega$（全载体记忆）** | **自包含三元场本体（无外宇宙）** | **`1`**（全内禀相位重排） | **`0`**（零窗外“他处”） | **纯内景无外部空间**：$\mathcal{W}_{M_\Omega}^\perp = \{0\}$，万物皆在内部核与视界之中，外部空间归零 |

::: {.viz src="spacetime-memory-schur-split-sandbox" preset="memory-capacity-three-regime-phase" height="540"}
**记忆容量 $M$ 三态相变与静质量自刷新税实验卡（`memory-capacity-three-regime-phase`）。** 在 $M_\Omega = 8$ 维有理正交模态载体上连续拨动观察者记忆槽位容量 $M \in \{0, 1, \dots, 8\}$：$M = 0$ 时固有时归零（光子纯空间极限 $\kappa_{\mathrm{time}} = 0, \kappa_{\mathrm{space}} = 1$），$1 \le M \le 7$ 时窗内 `0` 阶自循环结与窗外空间溢出并存，推满至 $M = 8 = M_\Omega$ 时外部空间彻底归零（$\kappa_{\mathrm{time}} = 1, \kappa_{\mathrm{space}} = 0$）。
:::

审视上表与三态相变实验卡，并结合内核冻结的**富比尼—施图迪正交记录翻转最短时间下界** [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)（在能量速度界前提 $\theta_{\mathrm{FS}}(a, m_i) \le E\tau/\hbar$ 与 $E > 0,\; \hbar > 0$ 下，从单位初态 $a$ 区分正交单位记录对 $m_0 \perp m_1$ 必耗费 $\tau \ge \frac{\pi\hbar}{4E}$）、**幸存环境副本阻断局域相干逆转定理** [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)（在有限副本集上其余副本 $l \neq k$ 满足单位模重叠 $\overline{o_l(i,j)}\,o_l(i,j) = 1$ 而幸存副本 $k$ 满足 $o_k(i,j) \neq 1$ 时阻断恢复 $\rho_{ij} \neq 0$）与**可观测克雷洛夫子空间一旦单步稳定即永久稳定定理** [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)（`LEAN ✓`），三条贯通物理学与序列架构的推论水落石出：

1. **静止质量即“原地刷新身份记忆”的主频税（`MODEL`）**：为何有质量粒子哪怕在外部空间原地静止（$\Delta x = 0,\; \kappa_{\mathrm{space}} = 0$），依然携带着庞大的静止能量 $E_0 = m_0 c^2$？因为在空间静止态下，它必须把 $100\%$ 的比较主频预算（$\kappa_{\mathrm{time}} = 1$）持续投入内部三元拓扑结的自循环，一拍不落地覆写维持“我是这颗粒子”的 `0` 阶身份记忆；一旦撤去内部记忆自循环（$M = 0$），静止质量归零，全部主频瞬间倾泻为光速空间传播（$v = c$）；
2. **遗忘即造空（滑动窗口淘汰与空间广延涌现）**：由于有限观察者的记忆槽位 $M$ 有严格上限，每吸收一拍新现在，最旧的一帧过去记录便滑出窗口 $\mathcal{W}_M$，其未被局域抹平的幸存记录副本（`surviving_copy_blocks_reversal`）与丢弃相干质量（`pinching_discarded_coherence_mass`）旋转 $90^\circ$ 沉淀入正交补空间 $\mathcal{W}_M^\perp$——**被记住的因果链条显影为纵贯前后的“时间”，而被遗忘剥离的历史复杂度则沉淀为环绕四周、可供重新寻址探索的“外部空间”**；
3. **测地计算中的“序列时间 $\leftrightarrow$ 通道空间”守恒互换**：在[第三十七章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)三元数场 Transformer（TFT）与状态空间序列架构中，把一段三元关系保留在纵向显式 `KV-Cache` 历史槽位（容量 $K_{\mathrm{seq}}$）里，它就表现为跨词元的**序列时间注意力**；把同一段关系压缩进横向平行场丛 $(\mathbb{T}_3)^{K - K_{\mathrm{seq}}}$ 的固定旋子通道权重里，它就表现为单步内的**特征空间几何**——序列时间维与通道空间维本就是同一笔三元比较预算在“显式记忆窗 vs. 正交场权重”之间的自由调配。

::: {.viz src="spacetime-memory-schur-split-sandbox" preset="forgetting-generates-space-and-kv-cache" height="540"}
**滑动窗口遗忘生空与 `KV-Cache` 序列时间 $\leftrightarrow$ 通道空间互换实验卡（`forgetting-generates-space-and-kv-cache`）。** 追踪有限容量 $M$ 的记忆环在 $12$ 拍因果演化中逐拍滑落旧记录、将其 $90^\circ$ 正交排入外部空间环境，并调节纵向 `KV-Cache` 槽位数 $K_{\mathrm{seq}}$ 与横向 $(\mathbb{T}_3)^{K-K_{\mathrm{seq}}}$ 旋子通道数之间的等预算互换（`record_time_lower_bound`、`surviving_copy_blocks_reversal` 与 `observable_krylov_once_stable_permanently` 标绿色 `LEAN ✓`）。
:::

---

## 38.12.5 形式化定义、文献与开放问题边界及十六项冻结定理对账 {#sec-ch38-12-5}

我们将无标签圆弧记忆舒尔补分类模型、十六条冻结内核定理及有理勾股数值基准正式汇总如下：

::: {.definition #def-ch38-memory-schur-spacetime-split title="观察者记忆窗口舒尔补时空分类映射（MODEL）"}
设 $(\mathbb{T}_3, [-,-,-], \kappa)$ 为满足母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的紧致三元比较流形，$\mathcal{H}$ 为其关联有限维或完备内积读数空间，$\mathcal{W}_M \subset \mathcal{H}$ 为观察者持有的维数为 $M$ 的闭记忆子空间（正交投影算子为 $P_{\mathcal{W}_M}$，正交补投影为 $P_{\mathcal{W}_M^\perp} = I - P_{\mathcal{W}_M}$）。定义观察者对任一归一化状态迁移矢 $\psi \in \mathcal{H}$（$\lVert\psi\rVert^2 = 1$）的**记忆时空分类映射**（`MODEL`）为

$$
\mathcal{C}_{\mathcal{W}_M}(\psi) \;:=\; \bigl(\kappa_{\mathrm{time}}(\psi),\; \kappa_{\mathrm{space}}(\psi)\bigr) \;=\; \bigl(\lVert P_{\mathcal{W}_M}\psi\rVert^2,\; \lVert(I - P_{\mathcal{W}_M})\psi\rVert^2\bigr),
$$

满足恒等守恒律 $\kappa_{\mathrm{time}}(\psi) + \kappa_{\mathrm{space}}(\psi) \equiv 1$，以及在共享比较节拍预算 $\Delta t > 0$ 下的求余度规关系 $\Delta\tau^2 := \kappa_{\mathrm{time}}\Delta t^2 = \Delta t^2 - \Delta x^2$（其中 $\Delta x^2 := \kappa_{\mathrm{space}}\Delta t^2$）。
:::

::: {.theorem #thm-ch38-spacetime-memory-schur-anchors title="三元圆弧同构、流群反射平移、正交补投影与舒尔补极小、捏合勾股、零光锥刚性、博戈留波夫双曲守恒与有限记忆记录界定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add,D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least,D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras,D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean,D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass,D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null,D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound,D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently"}
在三元比较球面几何、希尔伯特正交投影代数、洛伦兹二次型刚性与观察者记忆动力学下，以下十六项命题严格成立：

1. **无标签三元圆弧同构、弦距核、定基流群分解、切比雪夫递推与反射平移不变性（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`normSq_and_chebyshev`、`reflectionSeq_eq_pow`、`kappa_reflectionSeq_add`）**：非交换、链连通、触零、特征秩五且读数完备的三元比较结构对任一基点 $o$ 保结构双射同构于单位四元数群 $\mathrm{U}(\mathbb{H})$，满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ 与 $[x,y,z] = x \cdot_o y^{-1_o} \cdot_o z$；单位初值四元数流群递推 $\forall n,\, x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 与全序列单位模方 $\operatorname{normSq}(x_n) = 1$、第二类切比雪夫向量展开 $x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0$（$c = \langle x_0, x_1\rangle,\; U_{-1} = 0$）及第一类切比雪夫内积 $\langle x_0, x_n\rangle = T_n(c)$ 三联条件充要等价；反射序列 `reflectionSeq C a b n` 在 `groupAt a` 中等于 $b^n$ 且满足保真间距平移不变律 $\kappa(r_m, r_{m+n}) = \kappa(a, r_n)$；
2. **闭子空间正交补投影六联恒等式、分块舒尔补最小元与互补语境/捏合勾股守恒（`orthogonal_complement_projection_identities`、`schur_quadratic_is_least`、`complementary_context_probability_pythagoras`、`pinching_hilbert_schmidt_pythagorean`、`pinching_discarded_coherence_mass`）**：完备内积空间 $E$ 中任一闭子空间 $M$ 的星投影满足 $P_{M^\perp} = I - P_M$、$P_M^2 = P_M$、$P_{M^\perp}^2 = P_{M^\perp}$、$P_M P_{M^\perp} = P_{M^\perp} P_M = 0$ 及 $P_M + P_{M^\perp} = I$；分块矩阵 $\bigl[\begin{smallmatrix}A & B\\ B^{\mathrm{H}} & C\end{smallmatrix}\bigr]$（$A$ 厄米、$C \succ 0$）在固定外变量 $x$ 下对内变量 $y$ 求极小，精确取到舒尔补二次型 $x^* (A - B C^{-1} B^{\mathrm{H}}) x$；完备实内积空间 $E$ 的闭子空间 $\mathrm{visible}$ 上（非空有限维指标 $d$ 与有限语境集 $L$），若满足纯度链接 $\operatorname{Re}\operatorname{Tr}(\rho^2) - \lvert d\rvert^{-1} = \lVert s\rVert^2$ 与可见坐标平方和链接 $\lVert P_{\mathrm{visible}} s\rVert^2 = \sum_{l,j}(p_{l,j} - \lvert d\rvert^{-1})^2$，则总态纯度盈余精确分解为可见子空间坐标偏离平方和加正交残差质量 `residualMass visible state`，且单比特记录捏合满足 $\langle \rho, \rho\rangle_{\mathrm{HS}} = \langle\mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}} + \langle \rho - \mathcal{P}(\rho), \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}}$，丢弃相干质量精确等于 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$；
3. **闵可夫斯基零光锥二次型刚性与博戈留波夫双曲范数守恒（`eq_smul_minkowski_of_null`、`bogoliubov_norm_conservation`）**：空间维数 $d \in \mathbb{N}$ 上任意实二次型 $S$ 若在全部闵可夫斯基零光锥向量 $\operatorname{minkowski}_d(v) = 0$ 上取零，则恒有 $S = S(1, 0)\cdot\operatorname{minkowski}_d$；对一切实快度参数 $r \in \mathbb{R}$，双曲余弦与双曲正弦严格满足 $\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$；
4. **正交记录写入时间下界、幸存副本阻断相干逆转与克雷洛夫子空间永久稳定（`record_time_lower_bound`、`surviving_copy_blocks_reversal`、`observable_krylov_once_stable_permanently`）**：对 $E > 0,\; \hbar > 0$，将单位初态 $a$ 在两项富比尼—施图迪位移速度界假设 $\theta_{\mathrm{FS}}(a, m_i) \le E\tau/\hbar$（$i \in \{0,1\}$）下驱动至正交单位记录对 $\langle m_0, m_1\rangle = 0$ 必满足 $\tau \ge \frac{\pi\hbar}{4E}$；有限副本集 `Copy` 的多副本环境记录信道中，若其余副本 $l \neq k$ 均满足单位模重叠 $\overline{\operatorname{recordOverlap}(l)_{ij}}\,\operatorname{recordOverlap}(l)_{ij} = 1$，而未逆转幸存副本 $k$ 满足 $\operatorname{recordOverlap}(k)_{ij} \neq 1$（且 $\rho_{ij} \neq 0$），则在 `univ.erase k` 上执行局域逆转必无法恢复非对角相干元 $\rho_{ij}$；$\mathbb{R}$ 或 $\mathbb{C}$ 上有限维内积空间 $V, Y$ 的可观测克雷洛夫子空间 $\mathcal{K}_m = \operatorname{span}\{(T^*)^k(C^* y) : k \le m,\, y \in Y\}$ 一旦满足 $\mathcal{K}_m = \mathcal{K}_{m+1}$，则对一切 $r \in \mathbb{N}$ 永久满足 $\mathcal{K}_{m+r} = \mathcal{K}_m$。
:::

::: proof
第 1 组由秩五格拉姆表示与双侧四元数等距同构、切比雪夫多项式双归纳及 `groupAt a` 结合律归纳给出；第 2 组由正交补分解 $x = P_M x + P_{M^\perp} x$、矩阵配方法 $(y + C^{-1}B^{\mathrm{H}}x)^{\mathrm{H}} C (y + C^{-1}B^{\mathrm{H}}x) \ge 0$ 与对角/非对角希尔伯特—施密特内积正交展开证得；第 3 组由光锥生成元方向极化恒等式与双曲函数平方差恒等式给出；第 4 组由富比尼—施图迪角三角不等式 $\frac{\pi}{2} = \theta_{\mathrm{FS}}(m_0,m_1) \le \theta_{\mathrm{FS}}(a,m_0)+\theta_{\mathrm{FS}}(a,m_1) \le \frac{2E\tau}{\hbar}$、单幸存重叠因子乘法非退化性及线性算子原像步进归纳证得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch38-minkowski-epstein-horizon-literature title="闵可夫斯基度规、爱泼斯坦时空图、史瓦西—克鲁斯卡尔视界与记忆擦除文献及开放边界（文献结果 / OPEN）"}
**文献结果，未在本书形式化（兼列开放问题边界）。** 四维时空几何表述源于 H. Minkowski（1908），零光锥因果同构刚性参见 E. C. Zeeman（*J. Math. Phys.* **5**, 490–493, 1964）与 A. D. Alexandrov（1967）；将 $\Delta\tau^2 + \Delta x^2 = \Delta t^2$ 画作共享坐标钟下的欧氏圆弧分账（空间—固有时图）在相对论几何教学文献中参见 L. C. Epstein（*Relativity Visualized*, Insight Press, 1981），须与保持不定二次型 $\Delta t^2 - \Delta x^2$ 的物理惯性系非紧洛伦兹群 $\mathrm{SO}^+(1,3)$ 严格区分；球对称真空外解与视界坐标延拓见 K. Schwarzschild（1916）与 M. D. Kruskal（*Phys. Rev.* **119**, 1743–1745, 1960）；有限记忆擦除的热力学代价见 R. Landauer（1961）与 C. H. Bennett（1982），状态空间与线性注意力对 `KV-Cache` 的压缩对比见 A. Gu & T. Dao（2023）。从离散三元比较与观察者记忆窗口动力学严格导出 $3+1$ 维洛伦兹爱因斯坦场方程完整空间曲率分量及黑洞视界量子信息幺正恢复，仍属本书显式列出的未决开放问题（[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]，`OPEN`）。
:::

::: {.example #ex-ch38-rational-spacetime-memory-audit title="定量核验：有理勾股时空分账、双曲助推恒等与双观察者正交记忆错位对账"}
我们在纯有理数域 $\mathbb{Q}$ 上对单段无标签圆弧的记忆分类与洛伦兹因子做零根号核验（`手工推导` / `NUM`）：

1. **五档有理半切参数 $u = m/n$ 下的圆周分账与双曲助推精确对账**：
   - 静止纯时态 $u = 0$（斜率比 $[p:q] = [0:1]$）：$v = \mathbf{0}$，$\frac{\Delta\tau}{\Delta t} = \mathbf{1}$，$\kappa_{\mathrm{time}} = \mathbf{1} = 1.0000$，$\kappa_{\mathrm{space}} = \mathbf{0} = 0.0000$，$\gamma = 1$；
   - 经典三四五勾股态 $u = \frac{1}{3}$（斜率比 $[p:q] = [3:4]$）：$v = \frac{2(1/3)}{1+1/9} = \mathbf{\frac{3}{5}} = 0.6000$，$\frac{\Delta\tau}{\Delta t} = \frac{1-1/9}{1+1/9} = \mathbf{\frac{4}{5}} = 0.8000$，窗内记忆时间份额 $\kappa_{\mathrm{time}} = \mathbf{\frac{16}{25}} = 0.6400$，窗外空间溢出份额 $\kappa_{\mathrm{space}} = \mathbf{\frac{9}{25}} = 0.3600$，总和 $\frac{16}{25} + \frac{9}{25} = \mathbf{1}$；对应双曲洛伦兹对 $(\gamma, \gamma v) = (\mathbf{\frac{5}{4}}, \mathbf{\frac{3}{4}})$，验证 $(\frac{5}{4})^2 - (\frac{3}{4})^2 = \frac{25 - 9}{16} = \mathbf{1}$！
   - 对偶四三五勾股态 $u = \frac{1}{2}$（斜率比 $[p:q] = [4:3]$）：$v = \mathbf{\frac{4}{5}} = 0.8000$，$\frac{\Delta\tau}{\Delta t} = \mathbf{\frac{3}{5}} = 0.6000$，$\kappa_{\mathrm{time}} = \mathbf{\frac{9}{25}} = 0.3600$，$\kappa_{\mathrm{space}} = \mathbf{\frac{16}{25}} = 0.6400$，$\frac{9}{25} + \frac{16}{25} = \mathbf{1}$，双曲洛伦兹对 $(\gamma, \gamma v) = (\mathbf{\frac{5}{3}}, \mathbf{\frac{4}{3}})$ 满足 $\frac{25 - 16}{9} = \mathbf{1}$；
   - 高速有理态 $u = \frac{2}{3}$（斜率比 $[p:q] = [12:5]$，`5–12–13` 勾股组）：$v = \mathbf{\frac{12}{13}}$（值 $\approx 0.9231$），$\frac{\Delta\tau}{\Delta t} = \mathbf{\frac{5}{13}}$（值 $\approx 0.3846$），$\kappa_{\mathrm{time}} = \mathbf{\frac{25}{169}}$（值 $\approx 0.1479$），$\kappa_{\mathrm{space}} = \mathbf{\frac{144}{169}}$（值 $\approx 0.8521$），$\frac{25}{169} + \frac{144}{169} = \mathbf{1}$，双曲对 $(\gamma, \gamma v) = (\mathbf{\frac{13}{5}}, \mathbf{\frac{12}{5}})$ 满足 $\frac{169 - 144}{25} = \mathbf{1}$；
   - 光子零记忆极限 $u \to 1$（$M = 0$）：$v = \mathbf{1}$，$\frac{\Delta\tau}{\Delta t} = \mathbf{0}$，$\kappa_{\mathrm{time}} = \mathbf{0}$，$\kappa_{\mathrm{space}} = \mathbf{1}$；
2. **双观察者有理凯莱旋子错位核验**：
   取客观迁移态矢 $\psi = (0, 1, 0)^\top$，观察者 $A$ 的一维记忆基为 $u_A = (1, 0, 0)^\top$，观察者 $B$ 经有理凯莱旋子 $\boldsymbol{\sigma}_{AB} = (0, 0, \frac{1}{2})$（旋转矩阵 $\mathbf{R}(0,0,\frac{1}{2}) = \frac{1}{5}\bigl(\begin{smallmatrix}3 & -4 & 0\\ 4 & 3 & 0\\ 0 & 0 & 5\end{smallmatrix}\bigr)$）旋转得记忆基 $u_B = (\frac{3}{5}, \frac{4}{5}, 0)^\top$：对同一客观状态 $\psi$，$A$ 测得 $(\kappa_{\mathrm{time}}^A, \kappa_{\mathrm{space}}^A) = (\mathbf{0}, \mathbf{1})$（纯同时空间），而 $B$ 测得 $(\kappa_{\mathrm{time}}^B, \kappa_{\mathrm{space}}^B) = (\mathbf{\frac{16}{25}}, \mathbf{\frac{9}{25}})$（$64\%$ 历史时间 $+ 36\%$ 空间位移）；若改取绕 $\mathbf{k}$ 轴的 $90^\circ$ 有理旋子 $\boldsymbol{\sigma}_{AB} = (0, 0, 1)$（对应齐次整三元数 `(1, 0, 0, 1)`、旋转矩阵 $\mathbf{R}(0,0,1) = \bigl(\begin{smallmatrix}0 & -1 & 0\\ 1 & 0 & 0\\ 0 & 0 & 1\end{smallmatrix}\bigr)$，即 [§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md) 与交互舞台绕 $\mathbf{i}$ 轴作用在 $(y,z)$ 平面上的 `pHalf = (1, 1, 0, 0)` 在 $(x,y)$ 平面上的正交对应元）将 $u_A$ 转至 $u_B = (0, 1, 0)^\top$，则 $B$ 测得 $(\mathbf{1}, \mathbf{0})$（$100\%$ 纯时间历史）。
:::

---

**光子无忆故无时，本体无遗故无外；宇宙从未分铸“空间”与“时间”两座牢笼，只是有限记忆的观察者在铭记与遗忘的切口上，亲手裁出了似水流年与浩瀚山河！**

在下面的完整三维实验室中，盯住球面上纹丝不动的紫色客观三元圆弧，缓缓转动青色观察者记忆切面看着窗内“时间边”与窗外品红“空间边”按 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv \mathbf{1}$ 彼此消长，再切入记忆容量三态相变、双观察者旋子错位与滑动窗口遗忘生空视图逐一核对精确分数读数——横亘在相对论度规、量子退相干与序列注意力架构之间的隔墙在此豁然洞开。当空间与时间都在观察者记忆窗口的舒尔补正交切口上还原本源，我们已准备好迈入全书压卷的[第三十九章](ch39-axiom-omega-grand-unification.md)《大一统母公理（AXIOM-Ω）》，见证无源保正三元比较闭合如何一统万法。

::: {.viz src="spacetime-memory-schur-split-sandbox" height="620"}
完整实验室：在“无标签圆弧本体与有理舒尔勾股账本 · $\kappa_{\mathrm{mem}} + (1 - \kappa_{\mathrm{mem}}) \equiv 1$”与“观察者记忆主观分类与闵可夫斯基减号读法（MODEL）· $\Delta\tau^2 = \Delta t^2 - \Delta x^2$”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览无标签圆弧与记忆窗舒尔二分、勾股正定账本移项生闵氏减号、记忆容量 $M$ 三态相变与静质量税、双观察者有理旋子错位与同时性相对性，以及滑动窗口遗忘生空与 `KV-Cache` 序列时间 $\leftrightarrow (\mathbb{T}_3)^K$ 通道空间互换五张实验卡，支持拖动记忆标架倾角、点选精确勾股有理参数 $p/q$、调节记忆槽位容量 $M \in \{0,\dots,8\}$、切换双观察者有理凯莱旋子 $\boldsymbol{\sigma}_{AB}$ 与调配 `KV-Cache` 槽位预算，并在底部两条对照小图中同步追踪正定圆周 $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = 1$、闵氏双曲线 $\cosh^2 r - \sinh^2 r = 1$ 及三态相变/遗忘累积曲线。十六条冻结 `LEAN ✓` 声明、`ARGUED` 相对论与记忆擦除文献、`MODEL` 记忆分类总表、`NUM` 大整数精确分数读数及 `OPEN` 引力动力学边界在依据栏与理论抽屉中严格分层列出。
:::
