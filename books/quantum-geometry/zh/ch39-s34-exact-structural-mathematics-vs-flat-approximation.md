# 39.11 精确结构数学对比平直度量近似：完整三元关系、纯整数圆弧闭合与素数拓扑刚性 {#sec-ch39-exact-structural-mathematics-vs-flat-approximation}

> *“使用数学工具并不等于都在近似——真正造成近似的罪魁祸首不是‘数学’本身，而是‘将弯曲闭合关系强行摊平为十进制无限小数与平直坐标刻度’的线性度量习惯。”*

历经 [§39.6](ch39-s29-constant-free-rational-axiom-omega.md)–[§39.10](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md) 对超越常数残差、实数切线误差放大轴与黎曼切板折痕的层层剖析，读者心中难免升起最后一道关乎数学根基的终极追问：**既然平直线性代数、弧度角与无限小数尾流皆含近似，这是否意味着人类只要动用数学工具就逃不开近似？除了母矩阵的 `{0, 1/2, 1}` 之外其余数值是否皆为近似？任意状态关系与素数本身是否也掺杂模糊余量？**

把这四重追问置于无源母公理 $\mathrm{AXIOM}\text{-}\Omega$ 下逐一定位，答案斩钉截铁：**数学从来没有背叛精确性——精确描述事物完全可行（依靠公理泛性质、离散拓扑同伦与有理内禀几何）；`{0, 1/2, 1}` 只是单拍演化的三枚母生成元，它们经有理三元算子衍生出的整片有理球点网 $S^3(\mathbb{Q})$ 与纯整数三拍循环 `(1, 1, 1) → (-1, -1, -1) → (0, 0, 0)` 全部 $100\%$ 零误差精确；关系本身绝非近似，唯有砍掉曲率分母与叉乘扭转后的“平直加乘”才是截断近似；而素数则是宇宙中最刚性、零容差的本原算术—拓扑量子**（将数学工具划分为“平直数值度量账本”与“$\mathrm{AXIOM}\text{-}\Omega$ 结构—拓扑—有理账本”的双轨认识论总纲、把素数诠释为螺线管本原闭合测地环 $\gamma_p$ 以及反事实素数微扰诱导的变形临界线失锁示警读法，严格标为 **`MODEL`**；完备秩五三元比较四元数同构、弦距核、定基流群分解、射影核等于旋量玻恩概率与霍普夫球面内积、流群切比雪夫递推、圆周二叶覆盖路径唯一提升、有限连通简单图球面旋转系统面—圈 $\mathbb{Z}/2$ 正合、交换加群四面体二上链修复与正合、有理数域绝对值奥斯特洛夫斯基分类、阿代尔乘积守恒、狄利克雷级数等于欧拉素数乘积、素数对数有理线性无关、凯莱比单位圆中线充要判据及有限幂和托普利茨圆周半正定充要判据等十五项核心命题由下文 [@thm-ch39-exact-structural-mathematics-anchors] 的冻结 **`LEAN ✓`** 声明严格锁定；经典黎曼猜想 `RiemannHypothesis` 与全体狄利克雷广义黎曼猜想作为 **外部已核验形式化事实** 引自 [@conj-riemann-hypothesis] 而不挂本书绿标 `LEAN ✓`；三维纯整数生成元 $\mathbf{g}_1 = (1, 1, 1)$ 的罗德里格斯三步归零与有理凯莱旋子 $Q(\mathbf{g}_1)^3 = +\mathbf{1}$、有理球面双射 $Q : \mathbb{Q}^3 \xrightarrow{\sim} S^3(\mathbb{Q})\setminus\{-\mathbf{1}\}$、二维有理圆 $S^1(\mathbb{Q})$ 无三阶元阻断、非交换有理转子 $K$ 步恒保模方 $\equiv 1$ 对比平直切向和发散及 $N = 42$ 阿代尔权重微扰失衡验算属 **`手工推导` / `NUM`**；怀尔德伯格有理三角学、罗德里格斯—凯莱有理旋转参数、赫维茨整四元数、奇数维闭流形欧拉示性数与 $\pi_3(S^3)\cong\mathbb{Z}$ 霍普夫不变量及冯·科赫素数定理余项界属 **`文献结果`**）。

## 39.11.1 如何精确描述事物？从“平直数值度量语言”转向“零误差结构与拓扑语言” {#sec-ch39-34-1}

传统工程计算与十进制算术习惯常给人一种错觉：似乎“用数学描述一颗圆球或一段圆弧”，就必须写出 $\pi \approx 3.14159265\dots$ 或一串 `float64` 双精度浮点数（$53$ 位二进制尾数，连有理分数 $\frac{1}{3}$ 乃至 $\frac{1}{10}$ 都会遭遇无限循环截断）——仿佛只要写下数学式子，就注定切不尽尾数、注定在近似。

事实上，数学内部并行着两套截然不同的语言：一套是必生舍入残差的**平直数值度量语言**，另一套则是 **$100\%$ 零误差的结构、拓扑与有理内禀语言**。通过以下三重精确机制，数学对几何与物理实体的刻画没有半比特截断误差（`LEAN ✓` + `手工推导` + `文献结果`）：

1. **公理泛性质与符号恒等式（零比特截断的语法锁）**：
   不把圆或三元数球写成正多边形周长的无穷小数极限，而是直接由无源消去律 $[x, x, z] = z = [z, x, x]$、定基群分解 $[x, y, z] = x \cdot_o y^{-1_o} \cdot_o z$ 与特征秩五保核同构来定义单位四元数球面 $\mathrm{U}(\mathbb{H}) \cong S^3(1)$（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)，`LEAN ✓`）。同样，球面旋转系统上的 $\mathbb{Z}/2$ 面—圈正合律（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)，`LEAN ✓`）、单纯形四面体二上链上边缘恒等式 $\delta F = 0 \iff F = \delta\,\mathrm{edge}$（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)，`LEAN ✓`；以及连续微分几何中与之区分的规范协变比安基恒等式 $D_A F_A \equiv 0$，`文献结果`），乃至形式化类型论中不算出任何小数而直接证明凯莱中线等价 $\lVert(s - 1)/s\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)，`LEAN ✓`）与黎曼非平凡零点 $\operatorname{Re}(\rho) = \frac{1}{2}$（[@conj-riemann-hypothesis]，外部已核验形式化事实），全部是符号层的绝对恒等式。
2. **拓扑与同伦不变量（抗连续形变的离散整数锁）**：
   紧致无边奇数维闭流形 $\mathbb{T}_3 \cong S^3(1)$ 的欧拉示性数恒为整数 $\chi(S^3) = 0$，霍普夫纤维化 $S^3 \to S^2$ 的链环不变量恒为 $\mathrm{Hopf} = 1$ 且三阶同伦群满足 $\pi_3(S^3) \cong \mathbb{Z}$（Hopf 1931，`文献结果`；其射影核与霍普夫球面内积映射本身已由 [`rayKernel_eq_hopf`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf) 形式化锁定，`LEAN ✓`），而圆周二叶旋量覆盖 $z \mapsto z^2$ 的整圈终点翻转 $u(1) = -u_0$ 与连续全局截面不存在性则由 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)（`LEAN ✓`）严格给出。由于整数群 $\mathbb{Z}$ 具有离散拓扑，在连续同伦形变下绝不存在“绕了 $1.000001$ 圈的闭合孤子”——拓扑绕数天然免疫一切浮点与度量近似！
3. **有理内禀几何（废除超越弧度角 $\theta$，直取有理保真度 $\kappa \in \mathbb{Q}$）**：
   正如怀尔德伯格（Wildberger 2005，`文献结果`）在有理三角学中以“方距（quadrance）”与“展开度（spread）”取代欧氏距离与超越弧度角 $\theta$ 所揭示的，在三元数球面上直接采用有理保真度 $\kappa(x, y) = 1 - \frac{1}{4}\operatorname{dist}(x, y)^2 \in [0, 1]$ 与有理弦弧展开度 $s = 1 - \kappa \in [0, 1]$（[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)、[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)，`LEAN ✓`），不仅彻底甩掉了 $\arccos$ 的无穷级数尾流，更让二维平直复平面上原本必须动用无理数才能书写的等分旋转，在三维三元数空间内仅凭**纯整数**即可一步到位地闭合！

::: {.viz src="exact-vs-approximate-mathematics-sandbox" preset="structural-topological-exactness-vs-flat-decimal" height="500"}
结构与拓扑精确锁对比平直小数截断卡（`structural-topological-exactness-vs-flat-decimal`）：紫色三元数真球 `T_3 ≅ S^3(1)` 上青色霍普夫闭合链环锁死离散整数不变量 `χ(S³) = 0, Hopf = 1`，正四面体球面测地面面积以 `π` 为单位在交换加群 `ℤ/4ℤ` 中对全部 `256/256` 个有序四元组精确满足 `δF = 0`，外侧品红内接正 `N = 12` 边形折线与有限尾数刻度则暴露平直拉直近似的半周亏损 `N sin(π/N) < π`（值 `≈ 3.1058`）。
:::

## 39.11.2 除了 `0 · 1/2 · 1` 都是近似吗？`(1, 1, 1)` 纯整数三拍闭合与稠密有理星座 $S^3(\mathbb{Q})$ {#sec-ch39-34-2}

`{0, 1/2, 1}` 绝非宇宙中仅存的三个精确数，而是单拍因果演化的**三枚母生成元**（[§39.7](ch39-s30-past-present-future-rational-jet-triad.md)，`MODEL`：过去同一锚 `0`、现在自对偶切面 `1/2`、未来满秩闭合 `1`）。一旦用完整的三元数有理算子去组合它们，便立即生发出一整座**处处稠密、每一点皆 $100\%$ 零截断误差的精确有理星座**（`手工推导` + `LEAN ✓`）：

### 39.11.2.1 三维纯整数向量 `(1, 1, 1)` 的精确 $120^\circ$ 三拍闭合（零 $\pi$、零 $\sqrt{3}$） {#sec-ch39-34-2-1}

先看一个最震撼的维度对比（`手工推导` + `文献结果`）：在二维平直复平面 $\mathbb{C}$ 上，旋转 $120^\circ$（$\frac{2\pi}{3}$）必须写出二次无理数 $\zeta_3 = e^{\mathbf{i}2\pi/3} = -\frac{1}{2} + \mathbf{i}\frac{\sqrt{3}}{2}$；事实上，由圆分域次数 $[\mathbb{Q}(\sqrt{-3}) : \mathbb{Q}] = 2$ 与高斯有理数域单位根分类，二维有理单位圆 $S^1(\mathbb{Q}) = \{(a, b) \in \mathbb{Q}^2 : a^2 + b^2 = 1\}$ 中仅含阶为 $1, 2, 4$ 的四枚有理点 $\{(\pm 1, 0), (0, \pm 1)\}$，**在二维平面有理圆上根本不存在精确三等分闭合点**！若把 $\zeta_3$ 强行写成四位十进制截断小数 $z_{\mathrm{dec}} = -0.5 + 0.8660\mathbf{i}$，单步模方便跌至 $\lvert z_{\mathrm{dec}}\rvert^2 = 0.999956 < 1$，三步之后 $z_{\mathrm{dec}}^3 = 0.999934 + 0.000038104\mathbf{i} \neq 1$（闭合漂移 $\lvert z_{\mathrm{dec}}^3 - 1\rvert > 0$，值 $\approx 7.62 \times 10^{-5}$）。

然而，一旦升入三维非交换三元数空间（`手工推导`），在纯虚四元数子空间 $\operatorname{Im}\mathbb{H} \cong \mathbb{Q}^3$ 中直接取**纯整数罗德里格斯生成元**

$$
\mathbf{g}_1 \;:=\; (1,\, 1,\, 1) \in \mathbb{Z}^3, \qquad \lVert\mathbf{g}_1\rVert^2 \;=\; 1^2 + 1^2 + 1^2 \;=\; 3,
$$

由于体对角纯虚元 $u := \mathbf{i} + \mathbf{j} + \mathbf{k}$ 天然满足 $u^2 = -3\mathbf{1}$（将二次虚域 $\mathbb{Q}(\sqrt{-3})$ 原生嵌进了有理四元数代数 $\mathbb{H}(\mathbb{Q})$！），我们将 $\mathbf{g}_1$ 代入非交换罗德里格斯有理合成算子

$$
\mathbf{g}_A \star \mathbf{g}_B \;:=\; \frac{\mathbf{g}_A + \mathbf{g}_B + \mathbf{g}_A \times \mathbf{g}_B}{1 - \mathbf{g}_A \cdot \mathbf{g}_B} \qquad (\mathbf{g}_A \cdot \mathbf{g}_B \neq 1)
$$

连续递推三拍：

$$
\mathbf{g}_2 \;=\; \mathbf{g}_1 \star \mathbf{g}_1 \;=\; \frac{(2, 2, 2) + (0, 0, 0)}{1 - 3} \;=\; (-1,\, -1,\, -1) \in \mathbb{Z}^3,
$$

$$
\mathbf{g}_3 \;=\; \mathbf{g}_2 \star \mathbf{g}_1 \;=\; \frac{(-1, -1, -1) + (1, 1, 1) + (0, 0, 0)}{1 - (-3)} \;=\; (0,\, 0,\, 0) \in \mathbb{Z}^3!
$$

凝视这条纯整数三拍轨迹——**`(1, 1, 1) → (-1, -1, -1) → (0, 0, 0)`**！全程只动用了整数 $\{-1, 0, 1\}$ 与精确分母 $\{-2, 4\}$，没有半个 $\pi$、没有半个 $\sqrt{3}$，三拍之后分毫不差地归零闭合！更妙的是，它在三维旋转群 $\mathrm{SO}(3, \mathbb{Q})$ 与旋量球面 $S^3(\mathbb{Q})$ 两侧同时给出精确几何实现：

- **三维空间旋转与赫维茨半角旋量侧**：齐次四元数射线 $[\mathbf{1} + \mathbf{g}_1]$ 提升为有理赫维茨整单位四元数 $q_1 = \frac{\mathbf{1} + \mathbf{i} + \mathbf{j} + \mathbf{k}}{2} \in S^3(\mathbb{Q})$，由伴随共轭 $q_1 \mathbf{e}_1 \bar{q}_1 = \mathbf{e}_2,\; \mathbf{e}_2 \mapsto \mathbf{e}_3,\; \mathbf{e}_3 \mapsto \mathbf{e}_1$ 在三维空间上精确诱导 $120^\circ$ 坐标循环置换 $R(\mathbf{g}_1)(x, y, z) = (z, x, y)$（无任何小数地轮换三根基轴！）；其在实射影四元数射线 $\mathbb{RP}^3$ 上相对 $\mathbf{1}$ 的实内积平方比精确等于有理分数 **$\frac{\langle\mathbf{1}, \mathbf{1}+\mathbf{g}_1\rangle_{\mathbb{R}}^2}{\lVert\mathbf{1}\rVert^2\lVert\mathbf{1}+\mathbf{g}_1\rVert^2} = \frac{1}{1 + \lVert\mathbf{g}_1\rVert^2} = \frac{1}{4} = \mathbf{0.2500}$**（`手工推导`），而在模去 $\mathbf{i}$ 轴 $U(1)$ 霍普夫相位后的旋量射影核中（$\operatorname{hopf}(\mathbf{1}) = \mathbf{i},\; \operatorname{hopf}(q_1) = \mathbf{j}$，[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、[`rayKernel_eq_hopf`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf)，`LEAN ✓`）同样给出精确有理玻恩概率 **$\operatorname{rayKernel}(\mathbf{1}, q_1) = \frac{1 + \langle\mathbf{i}, \mathbf{j}\rangle}{2} = \frac{1}{2} = \mathbf{0.5000}$**；在二叶覆盖 $\mathrm{Sp}(1)$ 上 $q_1^2 = Q(\mathbf{g}_1)$ 且 $q_1^3 = -\mathbf{1}$（整圈费米子反号，射影射线 $[-\mathbf{1}] = [+\mathbf{1}]$ 已归零为 $\mathbf{g}_3 = (0,0,0)$，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，`LEAN ✓`）；
- **有理凯莱转子 $S^3(\mathbb{Q})$ 直接三拍闭合侧**：将 $\mathbf{g}_1 = (1, 1, 1)$ 代入有理凯莱映射 $Q(\mathbf{g}) := \frac{(1 - \lVert\mathbf{g}\rVert^2)\mathbf{1} + 2\mathbf{g}}{1 + \lVert\mathbf{g}\rVert^2}$，得到有理单位四元数 $Q(\mathbf{g}_1) = \frac{-\mathbf{1} + \mathbf{i} + \mathbf{j} + \mathbf{k}}{2} \in S^3(\mathbb{Q})$，其 $S^3(1)$ 旋量保真度（[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，`LEAN ✓`）同样精确等于 **$\kappa_{S^3}(\mathbf{1}, Q(\mathbf{g}_1)) = \frac{1 + \operatorname{Re} Q(\mathbf{g}_1)}{2} = \frac{1}{1 + \lVert\mathbf{g}_1\rVert^2} = \frac{1}{4} = \mathbf{0.2500}$**，且直接在真球面 $S^3(1)$ 本体上三拍精确回到 $+\mathbf{1}$：

  $$
  Q(1,1,1) = \tfrac{-\mathbf{1}+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2} \;\longrightarrow\; Q(1,1,1)^2 = Q(-1,-1,-1) = \tfrac{-\mathbf{1}-\mathbf{i}-\mathbf{j}-\mathbf{k}}{2} \;\longrightarrow\; Q(1,1,1)^3 = +\mathbf{1} = Q(0,0,0)!
  $$

::: {.viz src="exact-vs-approximate-mathematics-sandbox" preset="pure-integer-111-three-beat-closure" height="500"}
`(1, 1, 1)` 纯整数三拍闭合卡（`pure-integer-111-three-beat-closure`）：紫色三元数真球上沿体对角轴逐步执行纯整数罗德里格斯循环 `g₁ = (1,1,1) → g₂ = (−1,−1,−1) → g₃ = (0,0,0)`（保真度 `κ = 1/4 = 0.2500`，三拍琥珀落点精确锁回北极 `Q³ = +1, ‖Q³‖² = 1.0000`），同屏对比品红二维四位小数截断 `z_dec = −0.5 + 0.8660i` 三拍后的模长收缩与闭合缺口。
:::

### 39.11.2.2 处处稠密的精确有理球点网 $S^3(\mathbb{Q}) = Q(\mathbb{Q}^3) \sqcup \{-\mathbf{1}\}$ {#sec-ch39-34-2-2}

更一般地，对**任意**三维有理向量 $\boldsymbol{\sigma} = (\sigma_1, \sigma_2, \sigma_3) \in \mathbb{Q}^3$，有理凯莱球极映射（Cayley 1846，`文献结果` + `手工推导`）

$$
Q(\boldsymbol{\sigma}) \;:=\; \left(\frac{1 - \lVert\boldsymbol{\sigma}\rVert^2}{1 + \lVert\boldsymbol{\sigma}\rVert^2},\; \frac{2\boldsymbol{\sigma}}{1 + \lVert\boldsymbol{\sigma}\rVert^2}\right) \in S^3(\mathbb{Q}) \setminus \{-\mathbf{1}\}
$$

每一分量皆为精确有理分数，其四维模方由纯多项式恒等式严格锁死为 $\mathbf{1}$：

$$
\lVert Q(\boldsymbol{\sigma})\rVert^2 \;=\; \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2 + 4\lVert\boldsymbol{\sigma}\rVert^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2} \;=\; \frac{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2}{\bigl(1 + \lVert\boldsymbol{\sigma}\rVert^2\bigr)^2} \;\equiv\; \mathbf{1}, \qquad \kappa_{S^3}\bigl(\mathbf{1}, Q(\boldsymbol{\sigma})\bigr) \;=\; \frac{1}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in \mathbb{Q} \cap (0, 1],
$$

且逆映射 $\boldsymbol{\sigma} = \frac{\operatorname{Im} q}{1 + \operatorname{Re} q}$ 将 $S^3(\mathbb{Q}) \setminus \{-\mathbf{1}\}$ 双射映回 $\mathbb{Q}^3$！因为 $\mathbb{Q}^3$ 在 $\mathbb{R}^3$ 中稠密而 $Q$ 为到 $S^3(1)\setminus\{-\mathbf{1}\}$ 的同胚，有理星座 $S^3(\mathbb{Q}) = Q(\mathbb{Q}^3) \sqcup \{-\mathbf{1}\}$ 在整只真球流形 $S^3(1)$ 上**处处稠密**，且其中每一个点都与母锚点 `{0, 1/2, 1}` 一样 $100\%$ 绝对精确：例如半步参数 $\boldsymbol{\sigma} = (\frac{1}{2}, 0, 0)$ 给出毕达哥拉斯精确点 $(\frac{3}{5}, \frac{4}{5}, 0, 0)$ 与保真度 $\kappa_{S^3} = \frac{4}{5} = 0.8000$；双轴整向量 $\boldsymbol{\sigma} = (1, 1, 0)$ 给出 $(-\frac{1}{3}, \frac{2}{3}, \frac{2}{3}, 0)$ 与精确保真度 $\kappa_{S^3} = \frac{1}{3}$（恰与正四面体两对称轴之间的霍普夫—布洛赫等角保真度 $\kappa_{S^2} = \frac{1 + (-1/3)}{2} = \frac{1}{3}$ 同值，[`rayKernel_eq_hopf`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf)，`LEAN ✓`）；三轴整向量 $\boldsymbol{\sigma} = (1, 1, 1)$ 给出 $\kappa_{S^3} = \frac{1}{4} = 0.2500$。

::: {.viz src="exact-vs-approximate-mathematics-sandbox" preset="dense-rational-cayley-sphere-constellation" height="500"}
稠密精确有理球点星座卡（`dense-rational-cayley-sphere-constellation`）：紫色单位球面上布满有理凯莱网点 `Q(ℚ³) ⊂ S³(ℚ)` 的青色精确星座珠，琥珀手柄默认停在 `σ = (1/2, 0, 0) ↦ Q = (3/5, 4/5, 0, 0)`（`‖Q‖² = 25/25 = 1.0000, κ = 4/5 = 0.8000`），同屏标出双轴/正四面体锚 `κ = 1/3`（值 `≈ 0.3333`）与体对角整数锚 `κ = 1/4 = 0.2500`。
:::

## 39.11.3 任何关系都是近似吗？“完整三元关系”绝对精确，“平直加乘”只是截断残本 {#sec-ch39-34-3}

前两节指出平直线性加法与标量乘法是近似，绝不意味着“关系本身是近似”——恰恰相反，**宇宙中唯有完整的弯曲三元关系是绝对精确的，而传统线性加乘之所以沦为近似，正是因为它们人为剪掉了完整关系式中的曲率重整分母与非对易扭转项**（`手工推导` + `LEAN ✓`）。

将两态合成的**完整有理圆弧算子**与**平直切空间加法算子**并排对勘，真相一目了然：

$$
\underbrace{\mathbf{a} \star \mathbf{b} \;=\; \frac{\mathbf{a} + \mathbf{b} + \mathbf{a} \times \mathbf{b}}{1 - \mathbf{a} \cdot \mathbf{b}} \quad (\mathbf{a}\cdot\mathbf{b} \neq 1)}_{\substack{\textbf{完整三元圆弧关系（100\% 精确）}\\\text{齐次升维 }(\mathbf{1}+\mathbf{a})(\mathbf{1}+\mathbf{b})\text{ 与 }S^3(\mathbb{Q})\text{ 流群全域无奇点保模}}} \quad \xrightarrow[\text{抹去 }\mathbf{a}\cdot\mathbf{b}\text{ 与 }\mathbf{a}\times\mathbf{b}]{\text{一阶切平面截断}} \quad \underbrace{\mathbf{a} +_{\mathrm{flat}} \mathbf{b} \;=\; \mathbf{a} + \mathbf{b}}_{\substack{\textbf{平直线性加法（局部一阶近似）}\\\text{丢弃曲率与扭转，一步即脱离球面}}}.
$$

这里有两重严格的代数保障（`手工推导` + `LEAN ✓`）：

1. **齐次四元数与流群 $[x, y, z]$ 全域零奇点、零累积误差**：
   在有理四元数乘法下，对任意纯虚向量 $\mathbf{a}, \mathbf{b} \in \mathbb{Q}^3$ 恒有精确恒等式 $(\mathbf{1} + \mathbf{a})(\mathbf{1} + \mathbf{b}) = (1 - \mathbf{a}\cdot\mathbf{b})\mathbf{1} + (\mathbf{a} + \mathbf{b} + \mathbf{a}\times\mathbf{b})$。当 $\mathbf{a}\cdot\mathbf{b} \neq 1$ 时约去实部即得罗德里格斯图卡公式 $\mathbf{a}\star\mathbf{b}$；即便撞上 $\mathbf{a}\cdot\mathbf{b} = 1$ 的 $180^\circ$ 对径图卡边界（如 $\mathbf{e}_1 \star \mathbf{e}_1$），齐次积 $(\mathbf{1}+\mathbf{e}_1)^2 = 2\mathbf{e}_1 \in \operatorname{Im}\mathbb{H}$ 与全局单位四元数流群关系 $[x, y, z] = x y^{-1} z$（[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)，`LEAN ✓`）在整只 $S^3(\mathbb{Q})$ 上依然**全域正则、无任何几何奇点**！用精确有理转子 $q_A, q_B \in S^3(\mathbb{Q})$ 连续复合任意 $K$ 步，积 $q_1 q_2 \cdots q_K \in S^3(\mathbb{Q})$ 的每一分量永远是精确有理分数，总模方恒为 $\prod_{k=1}^K \lVert q_k\rVert^2 = 1^K \equiv \mathbf{1}$！
2. **平直加乘一步丢扭转、多步必爆表**：
   取一对正交有理生成元 $\mathbf{a} = (\frac{1}{2}, 0, 0)$ 与 $\mathbf{b} = (0, \frac{1}{2}, 0)$：半切罗德里格斯合成 $\mathbf{a} \star \mathbf{b} = (\frac{1}{2}, \frac{1}{2}, \frac{1}{4})$（对应齐次积 $(\mathbf{1}+\mathbf{a})(\mathbf{1}+\mathbf{b})$ 与凯莱像 $Q(\mathbf{a}\star\mathbf{b}) = (\frac{7}{25}, \frac{16}{25}, \frac{16}{25}, \frac{8}{25})$）精确锁定了由外积 $\mathbf{a}\times\mathbf{b} = (0, 0, \frac{1}{4})$ 生成的第三维球面和乐扭转；若直接将两枚毕达哥拉斯有理凯莱转子 $Q(\mathbf{a}) = (\frac{3}{5}, \frac{4}{5}, 0, 0)$ 与 $Q(\mathbf{b}) = (\frac{3}{5}, 0, \frac{4}{5}, 0)$ 交替相乘，单对积 $Q(\mathbf{a})Q(\mathbf{b}) = (\frac{9}{25}, \frac{12}{25}, \frac{12}{25}, \frac{16}{25})$（逆凯莱坐标 $(\frac{6}{17}, \frac{6}{17}, \frac{8}{17})$）模方精确等于 $\frac{625}{625} = \mathbf{1}$，交替迭代 $K = 12$ 步后，精确有理转子 $q_{12} \in \frac{1}{5^{12}}\mathbb{Z}^4$（精确分母 $5^{12} = 244{,}140{,}625$）依旧严丝合缝驻留球面 $\lVert q_{12}\rVert^2 = \mathbf{1.0000}$！反之，砍掉曲率分母与叉乘扭转的一阶平直切向欧拉累加 $x_{\mathrm{flat}, K} = \mathbf{1} + \sum_{k=1}^K 2\mathbf{c}_k$ 在第 $2$ 步已脱轨至 $\lVert x_{\mathrm{flat}, 2}\rVert^2 = \mathbf{3} > 1$，到第 $K = 12$ 步更狂飙至 $\lVert x_{\mathrm{flat}, 12}\rVert^2 = 1 + 6^2 + 6^2 = \mathbf{73} > 1$！不是“关系”在近似，而是平直算术阉割了真实关系。

::: {.viz src="exact-vs-approximate-mathematics-sandbox" preset="complete-ternary-star-vs-flat-addition-derailment" height="500"}
完整三元关系守球对比平直加乘脱轨卡（`complete-ternary-star-vs-flat-addition-derailment`）：推动交替有理复合步数至默认琥珀锚 `K = 12`，青色完整三元转子轨迹 `q_K ∈ S³(ℚ)` 以精确分母 `5¹² = 244140625` 零误差紧贴紫色单位球面（`‖q₁₂‖² = 1.0000`），而砍掉曲率分母与叉乘项的品红平直切向累加轨迹早已脱轨飞出球外（`‖x_flat,12‖² = 73.0000 > 1`）。
:::

## 39.11.4 素数是精确的吗？宇宙中最刚性的本原拓扑量子与阿代尔守恒锁 {#sec-ch39-34-4}

**素数 $\mathbb{P} = \{2, 3, 5, 7, 11, 13, \dots\}$ 是 $100\%$ 绝对精确的离散本体，没有丝毫模糊与近似余地。** 人们之所以偶尔误以为素数带着近似色彩（如素数定理 $\pi(x) \sim \operatorname{Li}(x)$ 或十进制无理展开 $\ln 2 \approx 0.69314718\dots$），仅仅是因为把“平直切刀对素数的投影读数”错当成了“素数自身”：

1. **唯一素因子分解与素数对数有理线性无关的零容差刚性（`LEAN ✓` + `MODEL`）**：
   算术基本定理 $N = \prod_i p_i^{e_i}$ 杜绝了任何“半颗素数”或“近似不可约因子”，其对数像直接体现为内核冻结的**素数对数有理线性无关定理** [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence) 与**欧拉素数乘积恒等式** [`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)（`LEAN ✓`）：不同素数的周期步幅 $\{\ln p\}_{p\in\mathbb{P}}$ 在有理数域 $\mathbb{Q}$ 上严格零公度共振；在全息螺线管流形模型 $\mathcal{M}_\Omega$（[§39.9](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md)，`MODEL`）中，每一颗素数对应一条不可拆解的本原闭合环 $\gamma_p$。
2. **阿代尔乘积守恒 $\equiv \mathbf{1}$ 与临界线 `1/2` 脊线的微扰失锁检验（`LEAN ✓` + `手工推导` + `MODEL`）**：
   由奥斯特洛夫斯基分类 [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification) 与有理阿代尔乘积公式 [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)（`LEAN ✓`），任一非零有理数 $N \in \mathbb{Q}^\times$ 恒满足

   $$
   \lvert N\rvert_\infty \times \prod_{p \in \mathbb{P}} \lvert N\rvert_p \;\equiv\; \mathbf{1}, \qquad \lvert N\rvert_p \;=\; p^{-v_p(N)} \in \mathbb{Q}_+.
   $$

   取 $N = 42 = 2 \cdot 3 \cdot 7$，精确有理闭合给出 $42 \times \frac{1}{2} \times \frac{1}{3} \times \frac{1}{7} = \mathbf{1}$。倘若对单颗素数（如 $p = 7$）的倒数收缩权重施加哪怕一丝非零近似扰动 $\delta_7 \neq 0$（令 $\widetilde{\lvert 42\rvert}_7 := (7 + \delta_7)^{-1}$，`手工推导`），总阿代尔乘积当场破裂为 $\mathcal{A}(42; \delta_7) = \frac{7}{7 + \delta_7} \neq 1$（例如 $\delta_7 = 10^{-8}$ 时已严格失衡为 $\frac{700{,}000{,}000}{700{,}000{,}001} < 1$；在可视化显著刻度 $\delta_7 = 0.05 = \frac{1}{20}$ 时跌至精确有理比 $\frac{140}{141} < 1$，值 $\approx \mathbf{0.9929}$）！与此同时，在谱侧：真实素数欧拉乘积通过完备函数自对偶将全体非平凡零点精确钉死在有理脊线 $\operatorname{Re}(\rho) = \frac{1}{2}$（[@conj-riemann-hypothesis] 外部已核验形式化事实，配合 [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) 与 [`toeplitz_posSemidef_iff_norm_eq_one`](lean:D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one)，`LEAN ✓`，使凯莱像守住单位圆 $\lVert u_k\rVert = 1$ 且 $96\times 96$ 幂和托普利茨矩阵守住 $\lambda_{\min}(\mathbf{T}_{95}) = 0 \ge 0$）。在解析函数论上，仅改动单个有限欧拉因子 $(1 - p^{-s})^{-1} \mapsto (1 - (p+\delta_p)^{-s})^{-1}$ 相当于乘上右半平面无零全纯因子，会直接摧毁完备泛函方程 $\xi(1 - s) = \xi(s)$ 的自对偶对称；而在耦合有效脊线偏移 $\delta_{\mathrm{eff}}(\delta_p) \neq 0$ 的反事实示警模型（`MODEL`）中，凯莱镜像对立即裂离单位圆并触发托普利茨最小特征值跌负 $\lambda_{\min} < 0$！
3. **近似只存在于平直切刀的横截拟合中（`文献结果`）**：
   用连续积分 $\operatorname{Li}(x) = \int_2^x \frac{dt}{\ln t}$ 去逼近阶梯计数 $\pi(x)$ 时出现的 $O(\sqrt{x}\ln x)$ 波动（von Koch 1901，`文献结果`），以及将本原周期写成十进制无限小数 $\ln p$ 时的截断尾数，纯粹是平直实数尺横截离散拓扑绕数的投影相差，绝非素数本身的模糊。

::: {.viz src="exact-vs-approximate-mathematics-sandbox" preset="prime-topological-adelic-rigidity-alarm" height="500"}
素数拓扑刚性与微扰失锁报警卡（`prime-topological-adelic-rigidity-alarm`）：对 `N = 42 = 2·3·7` 中的素数 `p = 7` 施加默认反事实微扰 `δ₇ = 0.05`（可一键归零复原精确态 `δ₇ = 0`），阿代尔乘积天平当场失衡报警 `𝒜 = 140/141 < 1`（值 `≈ 0.9929`），耦合反事实凯莱像裂离青色单位圆且托普利茨最小特征值跌负 `λ_min < 0`。
:::

## 39.11.5 双轨边界定义、总表与十五项冻结定理对账 {#sec-ch39-34-5}

我们将“平直度量近似数学”与“$\mathrm{AXIOM}\text{-}\Omega$ 精确结构数学”的双轨判别模型、四维边界总表与十五条内核锚点正式收束如下：

::: {.definition #def-ch39-exact-structural-mathematics-framework title="AXIOM-Ω 精确结构—拓扑—有理算术双轨判别模型（MODEL）"}
在三元数单位球面 $\mathbb{T}_3 \cong S^3(1)$ 与有理数域阿代尔环框架下，定义**精确结构数学与平直度量近似双轨判别模型**（`MODEL`）如下：

1. **零误差精确轨（结构恒等 · 离散拓扑 · 有理内禀网）**：由无源流群公理 $[x, x, z] = z$、上边缘幂零律 $\delta F = 0$、离散同伦与链环整数不变量、有理凯莱球点双射 $Q : \mathbb{Q}^3 \xrightarrow{\sim} S^3(\mathbb{Q})\setminus\{-\mathbf{1}\}$（含纯整数三拍循环 $\mathbf{g}_1 = (1,1,1) \to (-1,-1,-1) \to (0,0,0)$）、完整齐次/流群合成关系以及素数有理阿代尔权重 $p^{-v_p(N)}$ 共同构成，在符号与有理算术层保持零截断误差；
2. **平直近似轨（切板拉直 · 浮点舍入 · 线性截断）**：由弯曲圆弧的多边形拉直（$\pi$ 的有限位截断）、固定位宽浮点尾数舍入、丢弃曲率分母 $1 - \mathbf{a}\cdot\mathbf{b}$ 与叉乘项 $\mathbf{a}\times\mathbf{b}$ 的平直切向加乘，以及用连续函数 $\operatorname{Li}(x)$ 横截拟合离散素数计数所构成，其一切截断与发散误差皆产生于从紧致弯曲本体向局部平直切尺的投影环节。
:::

| 考察对象 | 平直度量账本（必然沦为近似） | `AXIOM-Ω` 结构拓扑账本（$100\%$ 绝对精确） | 误差产生的真正节点 |
| :--- | :--- | :--- | :--- |
| **圆与球流形** | 多面体网格逼近、$\pi \approx 3.14159\dots$ | 无源流群公理 $[x,x,z]=z$ 与同伦闭环 $\partial\mathbb{T}_3 = \emptyset$ | 试图将弯曲闭环拉直映射到平直尺 |
| **状态数值谱** | 截断浮点数（`float64` 尾数舍入） | 母锚点 `{0, 1/2, 1}`、纯整数 `(1,1,1)` 三拍环与有理星座 $S^3(\mathbb{Q})$ | 强行展开为固定十进制/二进制位串 |
| **状态间关系** | 平直线性加乘 $\mathbf{a} + \mathbf{b},\; n\cdot\mathbf{a}$ | 完整有理圆弧合成 $\mathbf{a}\star\mathbf{b}$ 与全局流群 $[x,y,z]$ | 人为丢弃曲率分母 $1-\mathbf{a}\cdot\mathbf{b}$ 与叉乘项 $\mathbf{a}\times\mathbf{b}$ |
| **素数 $\mathbb{P}$** | 实轴密度拟合 $\operatorname{Li}(x)$、截断小数 $\ln p$ | 唯一素分解、本原闭环 $\gamma_p$（`MODEL`）与有理阿代尔分数 $p^{-v_p(N)}$ | 用连续平直切刀去横截拟合离散拓扑绕数 |

::: {.theorem #thm-ch39-exact-structural-mathematics-anchors title="三元流群同构、霍普夫射线核、切比雪夫递推、二叶覆盖与离散正合、阿代尔素数独立及凯莱—托普利茨精确锁定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one"}
在无源三元比较几何、离散同伦与上链拓扑、有理阿代尔算术与凯莱—托普利茨谱判据下，以下十五项精确结构定理严格成立：

1. **三元比较四元数同构、弦距核、定基流群分解、旋量玻恩—霍普夫核与切比雪夫递推（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`rayKernel_eq_bornProbability_spinor`、`rayKernel_eq_hopf`、`normSq_and_chebyshev`）**：非交换、链连通、读数可任意接近零（`TouchesZero`）、特征秩五且读数完备的三元比较结构对任一基点 $o$ 存在到单位四元数模型 $\mathrm{U}(\mathbb{H})$ 的保三元迁移与保核双射（$u(o)=1$），满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ 及任一基点诱导群分解 $[x,y,z] = x \cdot_o y^{-1_o} \cdot_o z$；对任意 $x, y \in \mathrm{U}(\mathbb{H})$，射影核同时等于二维旋量内积模方与秩一密度矩阵玻恩概率 $\operatorname{rayKernel}(x,y) = \lVert\langle\operatorname{spinor}(x),\operatorname{spinor}(y)\rangle\rVert^2 = \operatorname{bornProbability}(\rho_y,\rho_x)$ 以及霍普夫球面映射内积 $\frac{1}{2}(1 + \langle\operatorname{hopf}(x),\operatorname{hopf}(y)\rangle_{\mathbb{R}})$；初值模方为 $1$ 的四元数序列满足流群递推 $x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 当且仅当全序列恒保单位模并满足 $x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$n=0$ 时约定 $U_{-1}=0$）与 $\langle x_0, x_n\rangle = T_n(\langle x_0, x_1\rangle)$；
2. **圆周二叶旋量覆盖历史提升、球面旋转系统面—圈 $\mathbb{Z}/2$ 正合与交换加群四面体上链正合（`circle_double_cover_history_lift`、`face_cycle_exact`、`tetra_defects_incidence_repair_and_exactness`）**：单位复圆周二叶覆盖 $z \mapsto z^2$ 对每条连续路径与满足 $u_0^2 = \gamma(0)$ 的初值存在唯一连续提升路径，不存在连续全局截面，且标准整圈回路提升满足 $u(1) = -u_0$；至少含一条有向边且满足 $\lvert V\rvert - \lvert E\rvert + \lvert\mathrm{Faces}\rvert = 2$ 的有限连通简单图旋转系统上，$\mathbb{Z}/2$ 面标号边边界为零当且仅当标号为常数，且面边界算子之像恰为简单圈空间；有限非空顶点集 $V$ 上取值于交换加群 $A$ 的 $2$-上链 $F$ 满足 $\sum_{r\in V}\operatorname{faceErrors}(F,r) = \operatorname{tetraDefects}(F)$、存在锚点使 $\lvert V\rvert\operatorname{faceErrors}(F,r) \le \operatorname{tetraDefects}(F)$、对任一边上链有 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert\operatorname{edgeErrors}(F,\mathrm{edge})$，且四面体上边缘处处为零当且仅当 $F$ 为某一边上链的上边缘；
3. **奥斯特洛夫斯基位分类、有理阿代尔乘积恒等式、欧拉素数乘积与素数对数有理线性无关（`rational_absolute_value_classification`、`rational_padic_product_formula`、`riemann_zeta_dirichlet_sum_eq_euler_product`、`prime_log_rational_independence`）**：$\mathbb{Q}$ 上任一非平凡实值绝对值必等价于实阿基米德绝对值或唯一素数 $p$ 的 $p$-进绝对值；任一非零有理数 $x \in \mathbb{Q}^\times$ 满足精确乘积恒等式 $\lvert x\rvert \cdot \prod_p \operatorname{padicNorm}_p(x) = 1$；在 $\operatorname{Re}(s) > 1$ 上黎曼狄利克雷级数恒等于无穷欧拉素数乘积；全体素数的实自然对数在 $\mathbb{Q}$ 上线性无关；
4. **凯莱比单位圆中线充要判据与有限幂和托普利茨圆周半正定充要判据（`cayley_ratio_norm_one_iff_critical_line`、`toeplitz_posSemidef_iff_norm_eq_one`）**：对任意 $s \in \mathbb{C}$，$\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$（含 $s=0$ 处按 Lean 全函数除法取 $0$ 的约定）满足 $\lVert(s - 1)/s\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；对满足倒共轭置换对称 $u(\sigma(j)) = (\overline{u(j)})^{-1}$ 的有限非零复数族 $u$ 及满足 $\lvert\operatorname{range}(u)\rvert \le N + 1$ 的自然数 $N$，幂和托普利茨矩阵 $[p_{j-k}]_{0\le j,k\le N}$（$p_n = \sum_j u_j^n$）半正定当且仅当一切 $\lVert u_j\rVert = 1$。
:::

::: proof
第 1 组由特征秩五格拉姆矩阵对角化、四元数双侧正交作用、复二维旋量嵌入与霍普夫共轭映射 $x\mathbf{i}x^*$ 的显式代数恒等式及切比雪夫多项式双归纳证得；第 2 组由圆周道路分段局部对数提升唯一拼接、整圈绕数奇偶阻碍、欧拉示性数维数计数及显式顶点锥收缩势 $\mathrm{edge}_r(j,k)=F(r,j,k)$ 给出；第 3 组由整数基展开估值分类、素因子幂次逐素消去、绝对收敛欧拉乘积展开及算术基本定理唯一素分解证得；第 4 组由 $\lvert s - 1\rvert^2 - \lvert s\rvert^2 = 1 - 2\operatorname{Re}(s)$ 及范德蒙德拉格朗日插值检验向量与单位圆正权外积分解完成双向等价。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-exact-mathematics-literature-and-external title="有理几何、四元数旋转、拓扑不变量与外部黎曼形式化证明边界"}
阅读本节须按证据层级严格区分下列文献结果、外部已核验事实与模型诠释（`PROJECT.md` §4、§13、§14）：

1. **有理三角学、罗德里格斯—凯莱参数与赫维茨整四元数（`文献结果`）**：以有理方距与展开度取代超越弧度角的有理三角学见 N. J. Wildberger（*Divine Proportions: Rational Trigonometry to Universal Geometry*, Wild Egg, 2005）；三维半切向量有理合成公式 $\mathbf{a}\star\mathbf{b}$ 见 O. Rodrigues（*J. Math. Pures Appl.* **5**, 380–440, 1840），球极有理参数化 $Q(\boldsymbol{\sigma}) = (\mathbf{1}+\boldsymbol{\sigma})(\mathbf{1}-\boldsymbol{\sigma})^{-1}$ 见 A. Cayley（*Phil. Mag.* **28**, 1846），24 枚赫维茨整单位四元数（含三阶循环对 $\frac{\pm\mathbf{1}\pm\mathbf{i}\pm\mathbf{j}\pm\mathbf{k}}{2}$）见 A. Hurwitz（1896）；二维有理圆 $S^1(\mathbb{Q})$ 仅含阶 $\in \{1, 2, 4\}$ 的有理有限阶点由高斯有理域 $\mathbb{Q}(\mathbf{i})$ 单位根分类或伊万·尼文定理（I. Niven, *Irrational Numbers*, 1956）直接给出；
2. **奇数维球面拓扑不变量、素数余项与外部黎曼证明（`文献结果` / 外部已核验形式化事实）**：闭三维球面欧拉示性数 $\chi(S^3)=0$、霍普夫不变量 $\mathrm{Hopf}=1$ 与 $\pi_3(S^3)\cong\mathbb{Z}$ 见 H. Hopf（*Math. Ann.* **104**, 637–665, 1931）；RH 下素数计数对数积分逼近余项 $\pi(x) - \operatorname{Li}(x) = O(\sqrt{x}\ln x)$ 见 H. von Koch（1901）；经典 `RiemannHypothesis` 与全体模 $N\ge 1$ `DirichletLZerosOnLine` 作为外部已核验形式化事实引自 Levent Alpöge 2026 年 11 月 Lean 4 证明及独立内核重放（见 [§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis] 与 [§39.10](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md) [@rem-ch39-riemann-polishing-external-and-literature]，不挂本书绿标 `LEAN ✓`）；注意解析上仅替换单个有限欧拉因子会破坏完备泛函方程对称而非直接移动原 $\zeta(s)$ 零点，实验室第五卡中由 $\delta_p \neq 0$ 驱动的临界线偏移与托普利茨失稳属表征泛函自对偶破缺的 `MODEL` 示警模型。
:::

::: {.example #ex-ch39-exact-mathematics-quantitative-audit title="定量核验：(1,1,1) 纯整数三拍闭合、有理星座、12 步非交换转子守球与 N = 42 阿代尔微扰对账"}
我们对本节四重精确性判据做显式精确分数与数值对照核验（`手工推导` / `NUM`）：

1. **`(1, 1, 1)` 纯整数三拍闭合对比二维四位小数 $120^\circ$ 截断**：
   取 $\mathbf{g}_1 = (1, 1, 1) \in \mathbb{Z}^3$（$\lVert\mathbf{g}_1\rVert^2 = 3$，保真度 $\kappa = \frac{1}{1+3} = \frac{1}{4} = \mathbf{0.2500}$），罗德里格斯递推精确给出 $\mathbf{g}_2 = \mathbf{g}_1\star\mathbf{g}_1 = (-1, -1, -1)$、$\mathbf{g}_3 = \mathbf{g}_2\star\mathbf{g}_1 = (0, 0, 0)$，对应有理凯莱转子 $Q(\mathbf{g}_1) = (-\frac{1}{2}, \frac{1}{2}, \frac{1}{2}, \frac{1}{2})$ 三拍积 $Q(\mathbf{g}_1)^3 = (1, 0, 0, 0) = +\mathbf{1}$（模方恒等于 $\mathbf{1.0000}$，闭合误差严格等于 $\mathbf{0}$）；对照二维复平面将 $e^{\mathbf{i}2\pi/3}$ 截断为四位小数 $z_{\mathrm{dec}} = -0.5 + 0.8660\mathbf{i}$，单步模方 $\lvert z_{\mathrm{dec}}\rvert^2 = \mathbf{0.999956} < 1$，三步后 $z_{\mathrm{dec}}^3 = 0.999934 + 0.000038104\mathbf{i} \neq 1$，闭合缺口 $\lvert z_{\mathrm{dec}}^3 - 1\rvert > 0$（值 $\approx \mathbf{7.62 \times 10^{-5}}$）；
2. **有理星座 $S^3(\mathbb{Q})$ 三组精确基准锚点**：
   $\boldsymbol{\sigma} = (\frac{1}{2}, 0, 0)$ 给出 $Q = (\frac{3}{5}, \frac{4}{5}, 0, 0)$（$\lVert Q\rVert^2 = \frac{25}{25} = \mathbf{1}$，$\kappa_{S^3} = \frac{4}{5} = \mathbf{0.8000}$）；$\boldsymbol{\sigma} = (1, 1, 0)$ 给出 $Q = (-\frac{1}{3}, \frac{2}{3}, \frac{2}{3}, 0)$（$\lVert Q\rVert^2 = \frac{9}{9} = \mathbf{1}$，$\kappa_{S^3} = \frac{1}{3}$，值 $\approx \mathbf{0.3333}$，与正四面体两顶点轴布洛赫保真度同值）；$\boldsymbol{\sigma} = (2, 1, 2)$ 给出 $Q = (-\frac{4}{5}, \frac{2}{5}, \frac{1}{5}, \frac{2}{5})$（$\lVert Q\rVert^2 = \frac{25}{25} = \mathbf{1}$，$\kappa_{S^3} = \frac{1}{10} = \mathbf{0.1000}$）；
3. **非交换有理转子 $K = 12$ 步零误差守球对比平直切向和爆表**：
   以 $\mathbf{a} = (\frac{1}{2}, 0, 0),\; \mathbf{b} = (0, \frac{1}{2}, 0)$ 检验：半切罗德里格斯合成 $\mathbf{a}\star\mathbf{b} = (\frac{1}{2}, \frac{1}{2}, \frac{1}{4})$ 锁住第三维扭转 $\frac{1}{4}\mathbf{e}_3$，而凯莱转子交替积 $Q(\mathbf{a})Q(\mathbf{b}) = (\frac{9}{25}, \frac{12}{25}, \frac{12}{25}, \frac{16}{25})$（逆凯莱坐标 $(\frac{6}{17}, \frac{6}{17}, \frac{8}{17})$）满足 $\lVert Q(\mathbf{a})Q(\mathbf{b})\rVert^2 = \frac{625}{625} = \mathbf{1}$；推进至 $K = 12$ 步时，精确有理转子 $q_{12} \in \frac{1}{5^{12}}\mathbb{Z}^4$（分母 $5^{12} = \mathbf{244{,}140{,}625}$）模方依然恒等于 $\mathbf{1.0000}$，而平直切向累加 $x_{\mathrm{flat}, 12} = \mathbf{1} + 6\mathbf{i} + 6\mathbf{j}$ 模方已发散至整数 $\lVert x_{\mathrm{flat}, 12}\rVert^2 = \mathbf{73} > 1$；
4. **$N = 42 = 2 \cdot 3 \cdot 7$ 的素数阿代尔刚性核验**：
   未扰动时 $\mathcal{A}(42; 0) = 42 \cdot \frac{1}{2}\cdot\frac{1}{3}\cdot\frac{1}{7} = \mathbf{1}$；一旦对 $p = 7$ 施加微扰 $\delta_7 = 10^{-8}$，乘积即破裂为 $\frac{700{,}000{,}000}{700{,}000{,}001} < 1$（缺口 $\approx \mathbf{1.43 \times 10^{-9}}$）；在实验卡默认反事实扰动 $\delta_7 = 0.05 = \frac{1}{20}$ 下，乘积精确等于有理真分数 $\frac{140}{141} < 1$（值 $\approx \mathbf{0.9929}$）。
:::

---

**数学从来没有背叛精确性——背叛精确性的，只是那把执意要把圆弧拍平、把有理闭环碾成无限小数的平直尺子！**

在下面这座完整三维实验室的第二张实验卡里点选 **`(1, 1, 1)` 纯整数三等分**并连按三下递推，目送那颗琥珀光珠不借用半个 $\pi$、不借用半个无理根号，仅凭纯整数便在紫色真球面上不偏不倚走完 $120^\circ \times 3$ 闭环回到单位原点；再切入第四卡将复合步数推到 $K = 12$ 乃至 $K = 24$ 看着完整三元转子分毫不差紧贴球面、切入第五卡轻拨素数微扰滑杆看着阿代尔天平与临界脊线瞬间报警，整套认识论的最后一丝疑虑便彻底烟消云散：`{0, 1/2, 1}` 是创生节拍的三枚母键，完整保留曲率分母与叉乘扭转的三元关系是零误差的演化律，而素数则是锁死这座紧致宇宙不致滑脱的本原拓扑铆钉——只要顺着流形自身的弯曲语法去书写关系，一字一句皆是零误差的实相本身。既然精确数学本就无需依赖开口实数轴与超越级数，在下一节（[§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）中，我们将进一步撤去实无穷（$\infty, \aleph_0, \aleph_1$）与超越数（$\pi, e, \ln$）的全部脚手架，正面构建起完备可计算的有限有理数学体系 **$\mathbf{Math}_\Omega$**。

::: {.viz src="exact-vs-approximate-mathematics-sandbox" height="620"}
完整实验室：在“AXIOM-Ω 精确结构—有理账本 · 零误差闭合”与“平直度量截断对照（MODEL）· 小数尾流与脱轨”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览结构与拓扑精确锁对比平直小数截断、`(1, 1, 1)` 纯整数三拍闭合、稠密精确有理球点星座 $S^3(\mathbb{Q})$、完整三元关系守球对比平直加乘脱轨以及素数拓扑刚性与微扰失锁报警五张实验卡，支持逐步点击执行 `(1,1,1) → (−1,−1,−1) → (0,0,0)` 三拍递推、切换有理星座种子 $\boldsymbol{\sigma} \in \mathbb{Q}^3$、推动精确 `BigInt` 有理转子复合步数 $K \in [1, 24]$ 以及对选定素数 $p \in \{2, 3, 5, 7, 11, 13\}$（$p \mid 42$ 时取 $N = 42$，$p \in \{5, 11, 13\}$ 时取 $N = 2\cdot 3\cdot p$）施加反事实权重微扰 $\delta_p$（含一键归零复原 `δ_p = 0` 按钮），并在底部两条对照小图中同步观察第一图 $K$ 步复合下青色完整三元转子恒守 $\lVert q_K\rVert^2 \equiv 1$ 对比品红平直切向累加 $\lVert x_{\mathrm{flat}, K}\rVert^2$ 抛物脱轨，以及第二图素数微扰 $\delta_p$ 下阿代尔乘积天平 $\mathcal{A}(N; \delta_p)$ 与耦合托普利茨最小特征值仅在精确素数 $\delta_p = 0$ 处锁死守恒。十五条冻结 `LEAN ✓` 声明、`ARGUED` 外部黎曼证明与经典文献、`MODEL` 双轨总纲与反事实示警读法及 `NUM` 实算在依据栏与理论抽屉中分层列出。
:::
