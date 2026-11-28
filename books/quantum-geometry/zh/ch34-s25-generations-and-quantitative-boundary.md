# 33.6 离散重数与连续耦合：三代费米子候选机制审计与标准模型定量边界 {#sec-ch34-generations-and-quantitative-boundary}

在 [§33.5](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) 末尾，电子、质子粒子对之间跨越六个数量级的引力—静电力比值（$2.40\times 10^{-43}$ 至 $8.09\times 10^{-37}$）把我们的目光直接推向了粒子物理标准模型的定量腹地。回望 [§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)，我们曾将标准模型规范群封顶 $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_c$、十七粒子四阶外幂分工以及三代费米子家族纳入跨层“点·线·面·体”八度螺旋（`MODEL`）；与此同时，在本书多章的形式化主干中，离散整数 **`3`** 与 **`6`** 又反复作为严格的数学极值或阶数常量登场——从三阶 Tribonacci 佩龙主根、圆周旋转的三间隙上界，直到二维单位球面无正交对开覆盖的六色拓扑下界。

此时，科学诚实要求我们亮出最严苛的审计手术刀：**本书现有的离散几何、数论与球面拓扑定理，究竟有没有从第一性原理证明四维手征费米子必须恰好复制为 $N_{\mathrm{gen}} = 3$ 代（共 $6$ 味夸克与 $6$ 种轻子）？单凭离散克利福德阶数与反常相消，又能不能定出精细结构常数 $\alpha(\mu)$、温伯格混合角以及跨越五个数量级的汤川质量谱？** 本节通过类型签名逐条核验、三个显式可辨识性反例与一张四级认识论账本，将“已证离散骨架”“场论自洽约束”“经验测量输入”与“真正未决的第一性原理前沿（`OPEN`）”彻底厘清，杜绝任何事后凑数的数字命理学。

## 33.6.1 离散重数候选定理的类型签名审计：为何整数 3 与 6 不自动导出手征味代 {#sec-ch34-25-1}

在物理统一模型的探索史上，每当数学定理中出现整数 $3$ 或 $6$，人们极易受诱惑将其直接等同于三代费米子（$N_{\mathrm{gen}} = 3$）或六味夸克/轻子（$2 N_{\mathrm{gen}} = 6$）。然而，在形式化验证体系中，一条定理能推出什么物理结论，完全取决于其**精确类型签名（type signature）与全称量词定义域**，而非输出常数的字面巧合。

将全书与整数 $3$、$6$ 最常关联的三条候选定理并排放在显微镜下审视：第一条来自 $d$-bonacci 多项式塔在 $d = 3$ 处的特化（[§35.6.2](ch39-s05-s02-kbonacci-contraction.md#sec-ch39-p2e-kbonacci) [@thm-ch39-p2e-kbonacci-pisot]）；第二条来自一维圆周无理旋转划分的间隙种类上界（[§35.7](coda-s03-golden-cut-observers.md)）；第三条来自三维欧氏空间单位球面 $S^2$ 无正交对开集覆盖的色数下界（[第九章 §9.4](ch09-axes-and-state-addressing.md#sec-rational-six-axis-atlas) [@prop-rational-six-axis-cover] 与 [@cor-six-colors-necessary]）。逐核它们的定义域、量词方向与代数载体，可以立即确认：**三者各自在其数学论域内严格成立，但没有任何一条定理的签名包含手征外尔旋量丛、规范群表示或汤川质量算符**。

::: {.remark #rem-ch34-multiplicity-identifiability-contract title="离散重数候选定理（3 与 6）的形式化签名审计与模型边界"}
以下三条 Lean 内核定理分别锁定了多项式根、圆周划分与球面覆盖中的整数 $3$ 与 $6$，但类型签名审计表明它们与标准模型手征味重数之间仅存在启发式结构对应（`MODEL`），绝非演绎蕴涵：

1. **$d$-bonacci 佩龙主根在 $d = 3$ 处的特化（非唯一阶数选择）**：定理 [dbonacciPerronRoot_three_eq_tribonacciConstant](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant) 证明 `dbonacciPerronRoot 3 = tribonacciConstant`（即 $X^3 - X^2 - X - 1 = 0$ 的唯一正实根 $\beta_3 \approx 1.839287$）。但如 [@thm-ch39-p2e-kbonacci-pisot] 所示，$d$-bonacci 递推多项式 $X^d - \sum_{j=0}^{d-1} X^j$ 及其皮索共轭圆盘收缩对**任意整数阶 $d \ge 2$** 均一致成立（$d = 2$ 给出黄金比 $\varphi$，$d = 3$ 给出 Tribonacci 常数，$d = 4$ 给出 Tetranacci 常数 $\beta_4 \approx 1.927562$，$\dots$）。这里整数 $3$ 是人为代入的阶数参数 `3 : ℕ`，定理本身并未在量子场论重整化流中淘汰 $d = 2$ 或 $d \ge 4$。
2. **圆周旋转划分的三间隙上界（不等式方向且与空间维数无关）**：定理 [three_gap_card_le_three](lean:D5/S1/Phase/ThreeGap/Main.three_gap_card_le_three) 对任意实步长 `a : ℝ` 与采样点数 `N : ℕ` 证明 `(gaps a N).toFinset.card ≤ 3`（Steinhaus–Sós 三间隙定理）。注意两项硬边界：(a) 该结论给出的是**上界不等式 $\le 3$**（随 $N$ 与 $a$ 变化，间隙种类数可取 $1$、$2$ 或 $3$，并非恒等于 $3$ 的固定表示维数）；(b) 其载体仅为一维相位圆周 $\mathbb{R}/\mathbb{Z}$ 上的等步长序列，与三维空间自旋丛或非阿贝尔规范群结构毫无耦合。
3. **二维单位球面无正交对开覆盖的六色拓扑下界（实欧氏球面覆盖而非手征味空间）**：定理 [sphere_two_open_orthogonality_free_cover_lower_six](lean:D5/S3/Topology/SphereOrthogonalityCover.sphere_two_open_orthogonality_free_cover_lower_six)（对应 [@cor-six-colors-necessary]，并与 [@prop-rational-six-axis-cover] 的有理六轴构造配对）严格证明：若单位球面 $S^2 \subset \mathbb{R}^3$ 的有限族子集 $U : \operatorname{Fin} k \to \mathcal{P}(S^2)$ 满足每块 $U_i$ 相对开、全族覆盖 $S^2$ 且每块内部均无正交向量对 $\operatorname{OrthogonalityFree}(U_i)$（即 $\forall x, y \in U_i,\; \langle x, y\rangle_{\mathbb{R}} \neq 0$），则必有 $6 \le k$。这一定理刻画的是实内积球面 $S^2$ 的博苏克—乌拉姆型开覆盖拓扑色数（在一般维欧氏球面 $S^{n-1} \subset \mathbb{R}^n$ 上随外围空间维数 $n$ 增长），其签名中既无复手征投射 $\frac{1}{2}(1 \mp \gamma^5)$，也无 $\mathrm{SU}(3)_c \times \mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 量子数或汤川算符。因此，将三阶递推、三间隙或六轴球冠对应于三代六味费米子，严格属于跨层结构类比（`MODEL`），不得冒充为已证的味物理定理。
:::

## 33.6.2 手征反常逐代闭合、三维腔无穷高阶模与连续汤川模空间的三个可辨识性反例 {#sec-ch34-25-2}

为了把“为什么单靠规范自洽性、三维空间驻波或离散克利福德分级仍锁不住 $N_{\mathrm{gen}} = 3$ 与连续标准模型参数”讲得水落石出，下面给出三个可逐项手算核验的可辨识性反例：

::: {.example #ex-ch34-anomaly-and-yukawa-countermodels title="单代反常全消、三维腔无穷驻波谱与连续汤川模空间的三个可辨识性反例"}
**手工推导与文献结果（未在本书形式化）。** 以下三个显式构造分别证伪了三类常见的过度推导声称：

1. **反例 (i) 单代有理超荷的规范与混合引力反常精确全消——对任意正整数代 $N_{\mathrm{gen}} \in \{1, 2, 3, 4, \dots\}$ 恒成立**：
   在标准超荷归一化 $Q = T_3 + Y$ 下，写出**单独一代**左手外尔（Weyl）费米子在 $G_{\mathrm{SM}} = \mathrm{SU}(3)_c \times \mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 下的不可约表示多重态（共 $15$ 个外尔分量；若额外添入规范单态右手中微子 $\nu_R^c : (\mathbf{1}, \mathbf{1}, 0)$，因一切规范量子数全为零，下列各项迹恒等不变）：

   $$
   Q_L : \bigl(\mathbf{3}, \mathbf{2}, +\tfrac{1}{6}\bigr), \quad u_R^c : \bigl(\bar{\mathbf{3}}, \mathbf{1}, -\tfrac{2}{3}\bigr), \quad d_R^c : \bigl(\bar{\mathbf{3}}, \mathbf{1}, +\tfrac{1}{3}\bigr), \quad L_L : \bigl(\mathbf{1}, \mathbf{2}, -\tfrac{1}{2}\bigr), \quad e_R^c : \bigl(\mathbf{1}, \mathbf{1}, +1\bigr).
   $$

   直接对这**单独一代**逐项核算全部手征三角反常迹与全局反常条件（取基础表示 Dynkin 指标 $T(\mathbf{3}) = T(\bar{\mathbf{3}}) = \frac{1}{2}$、$T(\mathbf{2}) = \frac{1}{2}$，三次反常系数 $A(\bar{\mathbf{3}}) = -A(\mathbf{3})$）：
   - *纯色规范三次反常 $\mathrm{SU}(3)_c^3$*：$2\,A(\mathbf{3}) + A(\bar{\mathbf{3}}) + A(\bar{\mathbf{3}}) = 2\,A(\mathbf{3}) - 2\,A(\mathbf{3}) = 0$，且单代共含 $3 + 1 = 4$ 个 $\mathrm{SU}(2)_L$ 二重态（偶数），自动消除威滕（Witten）$\mathrm{SU}(2)_L$ 全局同伦反常；
   - *色—超荷混合反常 $\mathrm{SU}(3)_c^2\,\mathrm{U}(1)_Y$*：

     $$
     \operatorname{Tr}\bigl[\mathrm{SU}(3)_c^2\,\mathrm{U}(1)_Y\bigr]_{1\text{-gen}} \;=\; \frac{1}{2}\!\left[2\!\left(+\frac{1}{6}\right) + 1\!\left(-\frac{2}{3}\right) + 1\!\left(+\frac{1}{3}\right)\right] \;=\; \frac{1}{2}\!\left(\frac{1}{3} - \frac{2}{3} + \frac{1}{3}\right) \;=\; 0;
     $$

   - *弱同位旋—超荷混合反常 $\mathrm{SU}(2)_L^2\,\mathrm{U}(1)_Y$*：

     $$
     \operatorname{Tr}\bigl[\mathrm{SU}(2)_L^2\,\mathrm{U}(1)_Y\bigr]_{1\text{-gen}} \;=\; \frac{1}{2}\!\left[3\!\left(+\frac{1}{6}\right) + 1\!\left(-\frac{1}{2}\right)\right] \;=\; \frac{1}{2}\!\left(\frac{1}{2} - \frac{1}{2}\right) \;=\; 0;
     $$

   - *混合引力—超荷反常 $\mathrm{grav}^2\,\mathrm{U}(1)_Y$*：

     $$
     \operatorname{Tr}\bigl[\mathrm{U}(1)_Y\bigr]_{1\text{-gen}} \;=\; 6\!\left(+\frac{1}{6}\right) + 3\!\left(-\frac{2}{3}\right) + 3\!\left(+\frac{1}{3}\right) + 2\!\left(-\frac{1}{2}\right) + 1(+1) \;=\; 1 - 2 + 1 - 1 + 1 \;=\; 0;
     $$

   - *纯阿贝尔三次反常 $\mathrm{U}(1)_Y^3$*：

     $$
     \begin{aligned}
     \operatorname{Tr}\bigl[\mathrm{U}(1)_Y^3\bigr]_{1\text{-gen}} &\;=\; 6\!\left(+\frac{1}{6}\right)^3 + 3\!\left(-\frac{2}{3}\right)^3 + 3\!\left(+\frac{1}{3}\right)^3 + 2\!\left(-\frac{1}{2}\right)^3 + 1(+1)^3 \\
     &\;=\; \frac{6}{216} - \frac{24}{27} + \frac{3}{27} - \frac{2}{8} + 1 \;=\; \frac{1 - 28 - 9 + 36}{36} \;=\; 0.
     \end{aligned}
     $$

   由于每一项反常在**单代内部已经精确归零**，$N_{\mathrm{gen}}$ 代直和给出的总反常恒为 $N_{\mathrm{gen}} \times 0 = 0$——因此局部与全局反常相消对**任意正整数 $N_{\mathrm{gen}} \in \{1, 2, 3, 4, \dots\}$** 完全自洽（参见 A. Bilal, *Lectures on Anomalies*, [arXiv:0802.0634](https://arxiv.org/abs/0802.0634), 2008），单凭反常相消绝对锁不定 $N_{\mathrm{gen}} = 3$！哪怕联合其他经典场论判据：小林—益川（M. Kobayashi & T. Maskawa, *Prog. Theor. Phys.* **49**, 652, 1973）夸克混合矩阵可观测 CP 破坏相位数 $\frac{1}{2}(N_{\mathrm{gen}} - 1)(N_{\mathrm{gen}} - 2) \ge 1$ 只给出**下界 $N_{\mathrm{gen}} \ge 3$** 而不封死上界；单圈 QCD 渐近自由判据 $b_0 = \frac{11}{3}N_c - \frac{2}{3}N_f > 0$ 在 $N_c = 3$ 时（$11 - \frac{2}{3}N_f > 0$）则容许至多 $N_f \le 16$ 种狄拉克夸克味，即多达 **$N_{\mathrm{gen}} \le 8$ 代**！

2. **反例 (ii) 三维空间腔 $(0, \pi)^3$ 狄利克雷驻波本征模的可数无穷重数**：
   在 [§33.2](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) 中，我们曾将三代费米子直观类比为三维圆弧核的一维、二维、三维内部驻波模态。然而，考察固定三维空间立方腔 $\Omega = (0, \pi)^3$ 上的标准狄利克雷拉普拉斯算子 $-\nabla^2\psi = E\,\psi$（$\psi\rvert_{\partial\Omega} = 0$），其精确正交驻波本征族为

   $$
   \psi_{n_x, n_y, n_z}(x, y, z) \;=\; \sin(n_x x)\,\sin(n_y y)\,\sin(n_z z), \qquad E_{n_x, n_y, n_z} \;=\; n_x^2 + n_y^2 + n_z^2 \quad (n_x, n_y, n_z \in \mathbb{Z}_{\ge 1}).
   $$

   哪怕空间维数严格锁死在 $D = 3$，主量子数三元组 $(n_x, n_y, n_z)$ 仍在 $(1,1,1), (2,1,1), (2,2,1), (2,2,2), (3,1,1), \dots$ 上张成**可数无穷多个**两两正交的高阶驻波谐振模！另一方面，三维外代数分级 $\bigoplus_{k=0}^3 \Lambda^k(\mathbb{R}^3)$（维数 `1—3—3—1`）在单代内部已被用于承载标量、矢量、双向量与伪标量自旋—洛伦兹槽位，不能在缺乏新算子的情况下重复充当三代味截断器。要真正把无穷高阶模截断在 $N_{\mathrm{gen}} = 3$，必须显式构造紧致内空间的狄拉克指标定理（如 $\operatorname{ind}(\gamma^\mu D_\mu) = 3$）或离散布里渊区有限能带截止机制。

3. **反例 (iii) 固定离散克利福德代数下的连续规范耦合与汤川矩阵模空间**：
   保持四维洛伦兹签名（$\mathbf{I}_3^2 = -1$）、单代 $15$（或 $16$）分量手征量子数、三色格拉姆满秩条件 $\det G_3 = 1$ 以及代数 $N_{\mathrm{gen}} = 3$ 全部严格固定不变，令无量纲规范耦合三元组 $(g_1, g_2, g_3) \in \mathbb{R}_{>0}^3$ 与三族非奇异复汤川耦合矩阵 $(Y_u, Y_d, Y_e) \in \mathrm{GL}_3(\mathbb{C})^3$（连同希格斯四次耦合 $\lambda > 0$ 与真空期望值 $v > 0$）在连续流形上任意滑动。在此连续形变全过程中，本书已建立的**每一条离散克利福德恒等式与每一道反常相消等式均保持零误差恒成立**，然而导出的物理可观测量却连续变动：
   - 带电费米子质量本征值 $m_f = y_f v / \sqrt{2}$、夸克 CKM 混合角与 CP 相位、轻子 PMNS 混合角均随 $(Y_u, Y_d, Y_e)$ 的奇异值与双幺正相对转角连续滑动；
   - 电磁精细结构常数本身甚至**不是**一个与标度无关的纯几何常数，而是随重整化能标 $\mu$ 连续跑动的有效耦合 $\alpha(\mu)$——从零动量汤姆孙极限的 $\alpha(0)^{-1} \approx 137.035999$，单调跑动至电弱 $Z$ 玻色子质量极点 $\mu = m_Z \approx 91.1876\;\mathrm{GeV}$ 处的五味修正最小减除（$\overline{\mathrm{MS}}$）基准值 $\widehat{\alpha}^{(5)}_{\overline{\mathrm{MS}}}(m_Z)^{-1} = 127.930 \pm 0.008$（PDG 2024）！任何忽略能标跑动而企图用单个静态代数式硬套 $137.035999$ 的做法，在重整化群意义下都是自相矛盾的。
:::

## 33.6.3 四级认识论分层账本、反数字命理学护栏与向万力大统一的移交 {#sec-ch34-25-3}

在转入四级认识论总表之前，上文反例 (i) 中所引用的小林—益川（Kobayashi–Maskawa）$N_{\mathrm{gen}} \ge 3$ 最小 CP 破缺下界及其完整代数几何骨架——$N$ 代味混合参数精确分解、任意 $2\times 2$ 幺正矩阵皆可经夸克场重定相化为纯实卡比博旋转且全部雅尔斯科格（Jarlskog）四元组归零、三代标准 PDG 形式 CKM 矩阵的特殊幺正性、雅尔斯科格不变量 $J$ 的重定相不变性与普适符号律、紧上界 $|J| \le \frac{1}{6\sqrt{3}}$ 的显式可达性，以及全部六枚行/列幺正三角形等面积定理 $\mathrm{Area} = \frac{1}{2}|J|$——现已全部由 Lean 4 内核严格形式化（与 [@thm-ch39-gut-one-loop-rg-and-weyl-traces-4d] 中的 QCD 渐近自由上界 $N_f \le 16$ 即 $N_{\mathrm{gen}} \le 8$ 共同把经典窗口 $3 \le N_{\mathrm{gen}} \le 8$ 升级为内核冻结基准）：

::: {.theorem #thm-ch34-ckm-three-generation-cp-and-jarlskog-4d title="N 代味混合参数计数、N_g ≥ 3 最小 CP 破缺、U(2) 构造性实化、雅尔斯科格紧上界 1/(6√3) 与六枚么正三角形等面积定理" lean="D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_physical_parameter_square, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_parameter_decomp, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.cp_phase_pos_iff_three_generations, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_small_generation_counts, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskogQuartet_rephase_invariant, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.u2_rephasing_to_real_rotation, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.u2_jarlskog_zero, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckmStandard_unitary, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskogQuartet_unitary_universal, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_ckmStandard_formula, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_zero_iff_no_cp, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_sharp_upper_bound, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_bound_attained, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.unitarity_triangle_area_eq_half_jarlskog, D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.row_unitarity_triangle_area_eq_half_jarlskog"}
在任意 $N$ 代夸克/轻子幺正味混合矩阵空间 $U(N)$ 上，以下两组定理在 Lean 4 内核中全部严格成立：

1. **$N$ 代物理参数分解、$N \ge 3$ 最小 CP 破缺门槛与全 $U(2)$ 构造性零 CP 实化**（[`ckm_physical_parameter_square`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_physical_parameter_square)、[`ckm_parameter_decomp`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_parameter_decomp)、[`cp_phase_pos_iff_three_generations`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.cp_phase_pos_iff_three_generations)、[`ckm_small_generation_counts`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckm_small_generation_counts)、[`jarlskogQuartet_rephase_invariant`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskogQuartet_rephase_invariant)、[`u2_rephasing_to_real_rotation`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.u2_rephasing_to_real_rotation)、[`u2_jarlskog_zero`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.u2_jarlskog_zero)）：对一切 $N \ge 1$，剔除 $2N - 1$ 个相对场相位后余下的 $(N-1)^2 = N^2 - (2N-1)$ 个物理参数精确分解为 $\binom{N}{2}$ 个实欧拉混合角与 $\binom{N-1}{2}$ 个物理 CP 破缺相位，且存在非零物理 CP 相位**当且仅当** $N \ge 3$（$N = 1, 2, 3$ 依次给出 $(0,0)$、$(1,0)$、$(3,1)$）；对任意重定相变换 $V \mapsto D_\alpha V D_\beta^\dagger$，雅尔斯科格四元组 $J_{ijkl}(V) = \operatorname{Im}(V_{ij}V_{kl}V_{il}^*V_{kj}^*)$ 严格不变；对**一切** $U \in U(2)$（含任意零矩阵元），均存在显式对角相位阵 $D_\alpha, D_\beta$ 与实卡比博角 $\theta$ 使得 $D_\alpha U D_\beta^\dagger = \begin{pmatrix}\cos\theta & \sin\theta \\ -\sin\theta & \cos\theta\end{pmatrix}$，从而全部 $2\times 2$ 四元组恒为零 $J_{ijkl}(U) \equiv 0$。
2. **三代标准 PDG CKM 矩阵、雅尔斯科格普适不变量、紧上界 $|J| \le \frac{1}{6\sqrt{3}}$ 与六枚么正三角形等面积定理**（[`ckmStandard_unitary`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.ckmStandard_unitary)、[`jarlskogQuartet_unitary_universal`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskogQuartet_unitary_universal)、[`jarlskog_ckmStandard_formula`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_ckmStandard_formula)、[`jarlskog_zero_iff_no_cp`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_zero_iff_no_cp)、[`jarlskog_sharp_upper_bound`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_sharp_upper_bound)、[`jarlskog_bound_attained`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.jarlskog_bound_attained)、[`unitarity_triangle_area_eq_half_jarlskog`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.unitarity_triangle_area_eq_half_jarlskog)、[`row_unitarity_triangle_area_eq_half_jarlskog`](lean:D5/S3/Quantum/Gauge/CKMFlavorJarlskog4D.row_unitarity_triangle_area_eq_half_jarlskog)）：标准 PDG 分解 $V(\theta_{12}, \theta_{23}, \theta_{13}, \delta) = R_{23}(\theta_{23}) R_{13}(\theta_{13}, \delta) R_{12}(\theta_{12})$ 恒满足 $V^\dagger V = I_3$ 与 $\det V = 1$；对任意 $V \in U(3)$，所有四元组服从普适符号律 $J_{ijkl}(V) = \varepsilon_{ik}\varepsilon_{jl}\,J_{0011}(V)$；在 PDG 参数化下 $J = \cos\theta_{12}\cos^2\theta_{13}\cos\theta_{23}\sin\theta_{12}\sin\theta_{13}\sin\theta_{23}\sin\delta$，其归零当且仅当 $\sin(2\theta_{12}) = 0 \lor \sin(2\theta_{23}) = 0 \lor \sin\theta_{13} = 0 \lor \cos\theta_{13} = 0 \lor \sin\delta = 0$；对一切实参数恒成立紧上界
   $$
   \lvert J\rvert \;\le\; \frac{1}{6\sqrt{3}},
   $$
   且在 $(\theta_{12}, \theta_{23}, \theta_{13}, \delta) = \bigl(\frac{\pi}{4}, \frac{\pi}{4}, \arcsin\frac{1}{\sqrt{3}}, \frac{\pi}{2}\bigr)$ 处精确取等；此外，对任意 $V \in U(3)$ 及任意两异列（或两异行），三条复边 $z_i = V_{ij}V_{il}^*$（或 $V_{ij}V_{kj}^*$）闭合成零和三角形，且全部六枚幺正三角形的欧氏面积均精确等于 $\frac{1}{2}\lvert J_{0011}(V)\rvert$。
:::

::: proof
第 1 款由整数恒等式证得参数分解与 $N \ge 3$ 等价性；对任意 $U \in U(2)$，取列相位 $\beta_j = \arg(U_{0j})$ 与行相位 $\alpha = (0, \beta_0 + \beta_1 - \arg\det U)$，利用 `Complex.norm_mul_exp_arg_mul_I` 统一消去首行相位（含零元）并将行列式归一为 $1$，再取 $\theta = \arcsin\|U_{01}\|$ 导出实卡比博旋转。第 2 款利用行/列正交闭合三角关系 $z_0 + z_1 + z_2 = 0$ 的复叉积反对称性证得普适符号律与六枚三角形等面积；将 $|\sin\theta_{13}|\cos^2\theta_{13} \le \frac{2}{3\sqrt{3}}$ 归结为多项式非负性 $(x - \frac{1}{3})^2(\frac{4}{3} - x) \ge 0$（$x = \sin^2\theta_{13} \le 1$），从而锁死紧界 $\frac{1}{6\sqrt{3}}$ 并显式验证达界点。完整证明由 Lean 内核检查。
:::

综合上述签名审计与三重反例，我们将本章涉及粒子物理标准模型的所有命题严格安放进一张四级认识论审计账本，并立下明确的反数字命理学方法论护栏：

::: {.remark #rem-ch34-measured-inputs-versus-predictions title="标准模型离散结构与连续参数的四级认识论分层账本及反数字命理学护栏"}
**文献结果，未在本书形式化。** 为严守“一分证据说一分话”的专著契约，本书对标准模型相关陈述执行以下四级分层与反拟合准则：

1. **四级认识论分层总表**：

| 认识论层级 | 核心数学或物理内容 | 严格确立的结论 | 未能单独锁定的内容 |
| :--- | :--- | :--- | :--- |
| **第一级：Lean 内核形式化骨架（`LEAN`）** | 单比特泡利—布洛赫代数、三锚格拉姆满秩判据、有限图锚定阿贝尔和乐分类，以及离散常数/界（`dbonacciPerronRoot 3`、`three_gap_card_le_three`、`sphere_two_open_orthogonality_free_cover_lower_six`） | 零误差锁定有限维正交—克利福德恒等式、非共面三态正体积、图同调圈秩以及各自数学论域内的常数 $3$ 与下界 $6$ | 不含手征外尔场、四维连续统重整化测度或味代希尔伯特算符 |
| **第二级：场论解析自洽约束（`手工推导` + `文献结果`）** | 单代规范/混合引力反常全消（Bilal 2008）、小林—益川 CP 相位存在性（Kobayashi–Maskawa 1973）、单圈 QCD 渐近自由（Gross–Wilczek, Politzer 1973）与重整化群跑动 | 锁定单代超荷有理比值关系，并在要求夸克区可观测 CP 破坏与渐近自由时将代数框定在 $3 \le N_{\mathrm{gen}} \le 8$ 区间内 | 单代反常对一切 $N_{\mathrm{gen}} \ge 1$ 全消，故单凭自洽性不能唯一钉死 $N_{\mathrm{gen}} = 3$ |
| **第三级：几何诠释模型与实验测定输入（`MODEL` + `NUM`）** | 跨层 `1—2—3` 与 `1—3—3—1` 八度对应，配合 LEP $Z$ 共振峰不可见宽度测定及粒子数据组（PDG 2024）实验基准 | LEP 精确测得质量 $m_\nu < m_Z / 2$ 的轻活动弱中微子种数 $N_\nu = 2.9840 \pm 0.0082$（ALEPH, DELPHI, L3, OPAL & SLD, *Phys. Rept.* **427**, 257, 2006）；实验测定标准模型的 $19$ 个连续自由参数（无质量中微子基准，计入中微子质量与 PMNS 混合后扩展为 $26$ 个狄拉克型或 $28$ 个马约拉纳型参数），含 $\alpha(0)^{-1} \approx 137.035999$、$\widehat{\alpha}^{(5)}_{\overline{\mathrm{MS}}}(m_Z)^{-1} = 127.930 \pm 0.008$、$\sin^2\widehat{\theta}_W(m_Z)_{\overline{\mathrm{MS}}} = 0.23129 \pm 0.00004 \approx 0.2313$、$\alpha_s(m_Z) \approx 0.1180$、$v \approx 246.22\;\mathrm{GeV}$ 及各代费米子质量 | 这些数值在本书中全部作为诚实的**外部经验输入**引用，绝不伪装成已从纯几何无参数导出的预测值 |
| **第四级：第一性原理未决前沿（`OPEN`）** | 规避尼尔森—二宫倍增的非微扰四维手征格点规范构造、导出 $N_{\mathrm{gen}} = 3$ 的拓扑指标/上同调机制，以及耦合与汤川谱的紫外边界值计算 | 明确界定待攻克的数学物理靶标与可证伪判据 | 尚未建立公认的第一性原理定量推导（见下框 [@prob-ch34-sm-generations-and-couplings]） |

2. **反数字命理学（Anti-Numerology）硬护栏**：
   在物理学史上，围绕 $137$、轻子质量比 $m_\mu / m_e \approx 206.768$ 或科伊德（Koide）经验关系曾出现大量用 $\pi$、黄金比 $\varphi$、Tribonacci 常数 $\beta_3$ 与小整数幂次事后拼凑十进制小数的尝试。本书严格执行以下排他准则：**凡未同时给出重整化能标 $\mu$、圈图正规化方案及整套耦合矩阵动力学方程，仅凭代数常数拼出某单一能标近似小数的做法，一律判定为事后曲线拟合（numerological curve-fitting）而非科学推导，在本书中予以零容忍剔除。**
:::

我们将标准模型离散代数与连续耦合谱的第一性原理定量推导正式列为规范—物质定量审计的开放问题：

::: {.problem #prob-ch34-sm-generations-and-couplings title="从离散比较几何导出三代手征费米子重数与标准模型连续耦合谱的开放问题"}
在不依赖事后数值拼凑且遵守[附录 E](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table) 连续统桥接审计的前提下，能否构造一套紫外完备的离散比较或非交换/克利福德几何场论机制，同时严格解决以下三项定量难题：

1. **无倍增手征标准模型表示的非微扰实现**：在离散复形或有限维代数链上非微扰地实现单代 $G_{\mathrm{SM}} = \mathrm{SU}(3)_c \times \mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ 手征外尔费米子表示，正面跨越尼尔森—二宫（Nielsen–Ninomiya）格点手征费米子倍增定理障碍；
2. **三代重数 $N_{\mathrm{gen}} = 3$ 的精确截断定理**：给出紧致内部几何的狄拉克指标定理、上同调维数或离散布里渊区拓扑不变量证明，从动力学或拓扑上淘汰 $N_{\mathrm{gen}} \in \{1, 2\}$ 与 $N_{\mathrm{gen}} \ge 4$ 的无反常分支以及高阶腔模激发；
3. **规范耦合与汤川质量谱的重整化群边界预测**：确定紫外完备尺度处 $(g_1, g_2, g_3)$ 与 $(Y_u, Y_d, Y_e)$（连同中微子质量算符与 $\bar{\theta}_{\mathrm{QCD}}$）的对称性或不动点边界条件，使其经标准重整化群流跑动至红外标度 $\mu = m_Z$ 与 $\mu \to 0$ 时，给出可被高精度实验直接证伪的定量关系？
:::

---

**相互作用符号与参数边界审计收束（[§33.5](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)–[§33.6](#sec-ch34-generations-and-quantitative-boundary)）与向本章后四节大统一峰顶（[§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)–[§33.10](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice)）的移交。** 走到这里，立在极小圆弧场大统一入口前的两道定量护栏已全部筑牢：从绕向奇偶相消对照正矢高合成及自旋-$2$ 引力动力学边界（[§33.5](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)），到三代费米子离散重数与标准模型约二十个连续自由参数前沿（本节 §33.6）的逐项反例审计，我们没有靠遮掩裂缝来粉饰“万象归宗”，而是用**一枚枚可手算核验的反例界碑**把形式化铁律（`LEAN`）、经典场论定理（`文献结果`）、统一几何架构（`MODEL`）与未决科学边疆（`OPEN`）锻造得壁垒分明。

正是在如此清澈的认识论边界护卫下，第三十三章后四节的大统一峰顶得以坦荡展开：首先在 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation) 中，我们将看到全宇宙共享的普适比较主频 $\nu_0$ 如何通过勾股预算分配统一锁定光速推理精度下界与狭义、广义相对论信息密度钟慢；接着在 [§33.8](ch39-s09-unified-arc-forces-and-planck-convergence.md#sec-ch39-unified-arc-forces-and-planck-convergence) 中，我们将单枚极小圆弧体胞内 `1D — 2D — 3D` 规范三力与胞间 $N \ge 5$ 超静定雷吉角亏收束于同一无量纲相位泛函并推向普朗克单胞；随后在 [§33.9](ch39-s11-af-gut-arc-field-grand-unification.md#sec-ch39-af-gut-arc-field-grand-unification) 构建同心并列概念场上的**极小圆弧场大统一理论（AF-GUT）**，并在收官节 [§33.10](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice) 揭示均匀各向同性三维场本体与观察者观测切面显影的宇宙学图景。让我们步入 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)，开启普适比较主频的勾股账本。
