# 31.4 拆去维度脚手架：两两公平平方、测不准反扑与时间即正交维度扩张 {#sec-ch31-fairness-square-expansion}

> “本体也没有静态动态的分别, 任何闭合、极限都是因维度限制而产生的幻象. 两两比较要公平，公平就要平方，平方又导致丢失细节测不准. 时间是维度扩张.”

在前三节（[@thm-ch31-seat-pythagorean-monogamy-fairness]、[@thm-ch31-horizon-landauer-ergodic-fairness] 与五重公平总表 [@rem-ch31-fivefold-fairness-table]）中，我们已经看到席位、得失、关系、博弈与遍历五重公平如何在单位球面与紧致环面上废除几何特权；而在迈入[第 32 章](ch32-unified-field-and-meta-unification.md)的统一场与元统一之前，本节进一步审视上方四句核心命题（原话台账见[附录 A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger) `A72`），拆去常常遮蔽量子公平机制的三副维度脚手架：“静态块宇宙 vs. 动态移动指针”的二元对立、看似自足的平面周期闭合回路，以及固定维封闭盒子里的终极极限。为严守全书一以贯之的形式认识论契约，我们从一开始就将这四句话连成的整体宇宙观置于显式的诠释模型（`MODEL`）框架之下：在数学上，一族相容嵌套的子空间链 $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ 与其闭包完备化既允许逐层递进的序列读法，也允许鸟瞰全局的整体读法，但将这种“静动不二”“闭合与极限皆为低维截断投影”“公平迫使平方、平方折叠相位并反弹为测不准”以及“物理时间即正交秩的单调诞生 $D \to D + 1$”上升为本体论命题，属于作者的几何—物理诠释（`MODEL`）；支撑每一环节的 Lean 4 内核冻结定理（`LEAN ✓`）、经典数学物理文献（`文献结果`）、显式手工代数推导（`手工推导`）与有限精度数值展示（`NUM`）各自保有严格且互不越界的成立前提。

## 31.4.1 截断投影下的闭合与极限幻象：静动不二与正交视界 {#sec-ch31-truncation-shadows}

为什么同一个数学构造既能被看成“静止的全局”，又能被看成“步步展开的过程”？考虑希尔伯特空间中一列带相容等距嵌入的闭子空间

$$
\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots \hookrightarrow \mathcal{V}_D \hookrightarrow \cdots,\qquad \mathcal{V}_\infty = \overline{\bigcup_{D \ge 1} \mathcal{V}_D}.
$$

站在完备并空间 $\mathcal{V}_\infty$ 的视角上，全部向量的内积关系同时在场；站在有限阶子空间序列 $\{\mathcal{V}_D\}_{D \ge 1}$ 的视角上，每一次向更高阶子空间的嵌入都揭示前一层尚未收纳的正交分量。需要指出，嵌套子空间链本身是纯粹的线性拓扑构造，并不会自动派生出唯一的哈密顿演化、固有时度规或热力学箭头；把“静态整体”与“动态序列”视为同一本体的两种切片视角，属于本书的本体诠释（`MODEL`）。

当观察者的读出被限制在低维子空间上时，高维空间中严格单调推进的开曲线就会在截断影子里呈现出“周而复始的闭合”。最直观的初等算例（`手工推导`，未单独封装为冻结定理）是三维欧氏空间中的常螺距开螺旋线与其平面投影：

$$
h(t) = (\cos t,\; \sin t,\; c t)\quad (c \neq 0),\qquad \pi_{xy} h(t) = (\cos t,\; \sin t) \in S^1.
$$

由于纵向高度坐标 $c t$ 关于实参数 $t \in \mathbb{R}$ 严格单射，空间曲线 $h$ 从不自交，更不存在任何周期回归；然而一旦正交投影 $\pi_{xy}$ 抹去第三维坐标 $c t$，平面读数便每经 $\Delta t = 2\pi$ 精确重演一次。这里同样要守住数学边界：二维平面上的单位圆 $S^1$ 本身是真实存在的紧致闭曲线，无穷维希尔伯特空间中也真实存在闭子空间与拓扑极限；投影能够遮蔽纵向推进，并不意味着数学中一切闭合对象都是错觉，将表观闭合解读为“被截断维度所掩盖的螺旋推进”属于 `MODEL`。

在拓扑与离散动力系统层面，这种“底空间读数闭合而覆叠态仍在推进”的现象拥有精确的内核形式化支撑。[第 5 章](ch05-complex-phase-and-rotors.md)锁定的圆周平方双覆叠定理（[@thm-circle-double-cover-history-lift]，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift) 与无连续全局截面定理 [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)，其旋量双覆叠规范几何背景亦见[第 18 章](ch18-spinors-and-gauge-curvature.md)）已经证明：圆周倍角映射 $z \mapsto z^2$ 不存在连续全局平方根截面；底圆周绕行一整圈（$360^\circ$）的闭合回路从初值 $+1$ 唯一连续提升至对径叶 $-1$，唯有经手工特化复合两整圈回路（$720^\circ$）才重返 $+1$（完整的三维空间旋量群双覆叠 $\operatorname{Spin}(3) \to \operatorname{SO}(3)$ 仍归属经典文献）。而在离散尺度动力侧，`trureturing` 的黄金螺旋模块在万有覆叠上直接构造了一个保留离散层高、连续尺度提升与二元定向位的精确状态空间 `GoldenHelixState`：每个状态写作三元组 $(n, s, o) \in \mathbb{N} \times \mathbb{R} \times \mathrm{Bool}$，基本黄金尺度周期为 $T = \operatorname{goldenScalePeriod} = 2\log\varphi > 0$，单步覆叠推进定义为 $\operatorname{goldenHelixStep}(n, s, o) = (n + 1,\; s + T,\; \neg o)$，而第 $m \in \mathbb{Z}$ 阶整数傅里叶特征读出定义为归一化尺度坐标 $s / T$ 上的指数特征 $\operatorname{goldenHelixFourierReadout}(m, \text{state}) = \exp\bigl(2\pi i m (s / T)\bigr)$。其特征盲区定理如下：

::: {.theorem #thm-ch31-helix-readout-progress title="黄金尺度螺旋的整数傅里叶特征覆叠盲区定理" lean="D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step"}
对任意整数傅里叶模态 $m \in \mathbb{Z}$ 与任意黄金螺旋状态 $\text{state} : \operatorname{GoldenHelixState}$，单步覆叠推进保持该阶傅里叶特征读出严格不变：

$$
\operatorname{goldenHelixFourierReadout}\bigl(m,\; \operatorname{goldenHelixStep}(\text{state})\bigr) = \operatorname{goldenHelixFourierReadout}(m, \text{state}).
$$
:::

::: proof
由 `goldenHelixStep` 的定义，单步推进将连续尺度坐标从 $s$ 移至 $s + T$，其中基本周期 $T = \operatorname{goldenScalePeriod} = 2\log\varphi$ 严格为正。除以 $T$ 后，归一化尺度坐标满足 $(s + T)/T = s/T + 1$。对于任意整数模态 $m \in \mathbb{Z}$，归一化特征 $\chi_m(x) = \exp(2\pi i m x)$ 在平移 $x \mapsto x + 1$ 下乘以因子 $\exp(2\pi i m) = 1$，因此单步推进前后的傅里叶特征读数恒等。完整证明由 Lean 内核检查。
:::

与 [@thm-ch31-helix-readout-progress] 配套的三条同族冻结定理把“投影闭合”与“覆叠推进”的对比刻画得滴水不漏：层高递增定理 [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level) 证明每走一步都有 $(\operatorname{goldenHelixStep}(\text{state})).\mathrm{level} \neq \text{state}.\mathrm{level}$；联合读出检出定理 [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step) 证明只要把层高坐标并入读出，对任意 $m \in \mathbb{Z}$ 均有

$$
\bigl((\operatorname{goldenHelixStep}(\text{state})).\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \operatorname{goldenHelixStep}(\text{state}))\bigr) \neq \bigl(\text{state}.\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \text{state})\bigr);
$$

而两步奇偶完备定理 [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct) 进一步证明，连续推进两步之后，二元定向位虽恢复原值 $(\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state}))).\mathrm{orientation} = \text{state}.\mathrm{orientation}$，但完整覆叠态依然严格相异 $\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state})) \neq \text{state}$。当然，`level` 是该离散覆叠状态中显式规定的自然数分量，定理本身并不自动将其等同于相对论固有时或宇宙空间维数。

::: {.viz src="fairness-square-uncertainty-expansion" preset="helix-shadow" height="500"}
**开螺旋推进与低维闭合投影卡（`helix-shadow`）**：三维舞台同时呈现沿纵向坐标持续攀升的青色开螺旋轨迹 $h(t)$、底面 $(x, y)$ 上看似周而复始闭合的品红圆周投影 $\pi_{xy} h(t)$，以及黄金螺旋单步/双步推进下的傅里叶特征盲区与二元定向翻转；琥珀色标出当前选定的参数位置与覆叠步数。黄金螺旋特征盲区与层高分离属 `LEAN ✓`，圆周双覆叠提升见[第 5 章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift]（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)），连续螺旋投影公式属 `手工推导`，采样轨迹坐标属 `NUM`，“时间隐于截断投影”属 `MODEL`。
:::

顺着正交投影再往前推一步，就能看清“$90^\circ$ 视界”与“有限截断极限”的确切几何含义。在实内积空间中，两个单位向量 $a, b$ 的标量内积为 $a \cdot b = \cos\theta$；当夹角恰好取 $\theta = \pi / 2$ 时，$\cos(\pi/2) = 0$（`手工推导`），意味着完全落在正交补方向上的分量在当前一维标量读出上投下严格的零影（平方读出 $\cos^2\theta$ 还会进一步把 $\theta$ 与 $\pi - \theta$ 折叠为同一数值）。引用这一正交零点时，必须将三种截然不同的几何角度严格区分开来：希尔伯特空间向量夹角 $\theta_{\mathrm{H}}$、单量子比特布洛赫球极角 $\theta_{\mathrm{B}}$（纯态跃迁重叠中进入的是半角 $\cos(\theta_{\mathrm{B}}/2)$，见[第 2 章](ch02-born-rule.md) [@ex-bloch-half-angle]），以及[第 17 章](ch17-lorentz-geometry.md)闵可夫斯基时空中的双曲快度与光锥倾角——任何把三者混同的滑移都会破坏各自的形式前提。

同样地，当我们考察无穷维内积空间中的递增子空间逼近时，拓扑学给出了“逐向量强收敛”与“算子范数一致间隙”并存的精确图景：一方面，在完备内积空间 $E$（标量域 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）中，二次正交补闭包定理 [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure) 证明对任意子空间 $M \le E$ 恒有 $M^{\perp\perp} = \overline{M}$；递增投影强极限定理 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 证明，对单调递增且各自具备正交投影 $P_{S_n}$ 的子空间序列 $S_0 \le S_1 \le \cdots$，每个固定向量 $x$ 的投影 $P_{S_n} x$ 都按范数收敛至累积闭跨度上的投影 $P_{\overline{\bigcup_n S_n}} x$（且当终端正交余空间为零时按强算子拓扑逐点收敛于恒等算子 $\operatorname{id}$）。但另一方面，只要每一个有限阶段仍是真子空间，算子范数下的一致逼近就遭遇绝对阻断：

::: {.theorem #thm-ch31-truncation-strong-vs-uniform title="真子空间正交截断序列的一致完备化算子范数阻断定理" lean="D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction"}
设 $H$ 为标量域 $K$（`[RCLike K]`）上的内积空间，$S : I \to \operatorname{Submodule} K\, H$ 为一族各自具备正交投影 $P_{S_i} = (S_i).\operatorname{starProjection}$ 的真子空间（即对一切 $i \in I$ 有 $S_i \neq \top$），且 $\mathcal{F}$（`stageFilter : Filter I`）为指标集 $I$ 上的任意非平凡滤子（`[NeBot stageFilter]`）。则：

1. **恒定单位算子范数缺口**：对每一个截断阶段 $i \in I$，余投影算子范数恒等于 $1$，即 $\|\operatorname{id}_H - P_{S_i}\| = 1$；
2. **一致算子范数收敛阻断**：函数 $i \mapsto \|\operatorname{id}_H - P_{S_i}\|$ 沿滤子 $\mathcal{F}$ 不收敛于 $0$。
:::

::: proof
任取阶段 $i \in I$。因 $S_i$ 具备正交投影，全空间正交直和分解为 $H = S_i \oplus S_i^\perp$；若 $S_i^\perp = \bot$，则 $S_i = \top$，与真子空间假设 $S_i \neq \top$ 矛盾，故 $S_i^\perp$ 中必存在非零向量，归一化后得单位向量 $e_i \in S_i^\perp$（$\|e_i\| = 1$）。由于 $P_{S_i} e_i = 0$，有 $(\operatorname{id}_H - P_{S_i}) e_i = e_i$，从而算子范数满足 $\|\operatorname{id}_H - P_{S_i}\| \ge 1$；反之，对任意 $x \in H$，由勾股分解 $\|x\|^2 = \|P_{S_i} x\|^2 + \|(\operatorname{id}_H - P_{S_i}) x\|^2$ 知 $\|(\operatorname{id}_H - P_{S_i}) x\| \le \|x\|$，故 $\|\operatorname{id}_H - P_{S_i}\| = 1$。由于常值函数 $1$ 在实数拓扑中远离 $0$ 的开邻域，沿任何非平凡滤子 $\mathcal{F}$ 均不可能趋于 $0$。完整证明由 Lean 内核检查。
:::

将 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 与 [@thm-ch31-truncation-strong-vs-uniform] 并置，便彻底澄清了“极限与截断”的精确关系：并非有限阶段在任何意义下都不能收敛——对任意给定的单个态向量，逐点投影确实强收敛；然而对尚未跨入的外部正交方向而言，任何真子空间截断都留有 $\|\operatorname{id}_H - P_{S_i}\| = 1$ 的满额盲区。

::: {.viz src="fairness-square-uncertainty-expansion" preset="horizon-limit" height="500"}
**$90^\circ$ 正交零影与强收敛—一致间隙对比卡（`horizon-limit`）**：左侧展示单位向量绕正交平面旋转至 $\theta = 90^\circ$ 时一维标量投影 $\cos\theta \to 0$ 的消隐过程；右侧同时绘制固定向量投影误差 $\|x - P_{S_n} x\| \to 0$ 的青色强收敛曲线，与每个真子空间阶段上由正交单位逃逸向量撑起的品红恒定算子范数缺口 $\|\operatorname{id} - P_{S_n}\| = 1$，琥珀色标出当前截断阶数 $n$。强极限与一致范数阻断属 `LEAN ✓`，离散截断阶数值模拟属 `NUM`，“视界即正交未展维度”属 `MODEL`。
:::

## 31.4.2 两两公平、二次配对与相位折叠下的不确定性 {#sec-ch31-pairing-phase-uncertainty}

明确了低维投影如何遮蔽正交分量之后，我们进入第二组核心命题：**“两两比较要公平，公平就要平方，平方又导致丢失细节测不准。”** 这条链路由三步紧密咬合的代数与几何机制组成，每一步都必须区分“哪些恒等式已被形式化锁定”与“哪些附加公理才足以唯一选出二次型”。

**第一步：两两比较的顺序与标架公平性，与二次配对的代数遴选。** 假设我们要在平面内用两个正交坐标分量 $(\cos\theta, \sin\theta)$ 或两个欧氏向量 $A, B$ 构造一个不偏袒任何人工坐标轴、也不依赖先后顺序的对称比较量。若直接取一阶绝对值之和 $|\cos\theta| + |\sin\theta|$，其数值会在 $[1, \sqrt{2}]$ 之间随参考系旋转而剧烈摆动（沿坐标轴时为 $1$，沿 $45^\circ$ 对角线时膨胀至 $\sqrt{2}$），公然赋予特定轴向几何特权；若在实欧氏克利福德代数中直接取有序几何积（`手工推导`）

$$
AB = A \cdot B + A \wedge B,\qquad \widetilde{AB} = BA = A \cdot B - A \wedge B,
$$

则只要外积双向量 $A \wedge B \neq 0$，就有 $AB \neq BA$，比较结果随左乘或右乘的先后顺序反号。要消除这种顺序依赖，最自然的对称化手段是将有序积与其逆序积（reversal）配对相乘：

$$
(AB)(BA) = (A \cdot B + A \wedge B)(A \cdot B - A \wedge B) = (A \cdot B)^2 + \|A \wedge B\|^2 = \|A\|^2 \|B\|^2.
$$

当 $A, B$ 为共面单位向量（记该平面单位双向量为 $I$，$I^2 = -1$，使 $AB = \cos\theta + I\sin\theta$）时，上式化为旋转不变且顺序无关的勾股恒等式 $\cos^2\theta + \sin^2\theta = 1$（注意此处 $AB$ 指克利福德几何积；若将 $AB$ 误读为纯标量点积，则 $(A\cdot B)(B\cdot A)$ 只剩 $\cos^2\theta$）。在这套克利福德手工代数背后，三块基石早已在本书前文中由 Lean 内核锁定：实坐标下的拉格朗日—格拉姆恒等式 $\bigl(\sum_i u_i^2\bigr)\bigl(\sum_i v_i^2\bigr) - \bigl(\sum_i u_i v_i\bigr)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$（[第 6 章](ch06-geometric-product.md) [@thm-lagrange-gram-identity]，[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）、实内积空间的平行四边形范数律 $\|x + y\|^2 + \|x - y\|^2 = 2(\|x\|^2 + \|y\|^2)$（[第 1 章](ch01-measurement.md) [@thm-parallelogram-norm-law]，[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)），以及秩一纯态投影迹化归为模平方的玻恩约化定理 $\operatorname{recordWeight}(|\phi\rangle\langle\phi|, |\psi\rangle\langle\psi|) = \|\langle\phi, \psi\rangle\|^2$（[第 2 章](ch02-born-rule.md) [@thm-born-modulus-square]，[`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)，配合归一化纯态互易权重 [@thm-rank-one-born-pairing] 与本章 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）。

然而，形式诚实要求我们立即指出一个关键反例（`手工推导`）：**单凭双结局角度互易性与归一性，并不足以在数学上唯一逼出指数 $p = 2$**。事实上，对任意实指数 $p > 0$，双结局权重族

$$
w_p(\theta) = \frac{|\cos\theta|^p}{|\cos\theta|^p + |\sin\theta|^p}
$$

都满足交换对偶角时的互易对称性，且恒满足互补归一 $w_p(\theta) + w_p(\pi/2 - \theta) = 1$。要从所有 $p > 0$ 中唯一锁定 $p = 2$，必须显式引入额外的结构公理：要么在赋范线性空间侧要求范数服从平行四边形律，再调用约当—冯·诺依曼（Jordan–von Neumann, 1935）逆定理从 $L^p / \ell^p$ 族中筛出 $p = 2$（`文献结果`）；要么在维数 $d \ge 3$ 的闭子空间正交标架上要求非语境可加性并调用[第 2 章](ch02-born-rule.md)已形式化的有限复维格里森定理（[@thm-gleason-finite-projection]，`LEAN ✓`；更广实空间与无限维形式仍为文献结果），或在任意有限维希尔伯特空间上对全体效应算子施加可加性以调用已形式化的布施效应密度表出定理（[@thm-busch-effect-density]，`LEAN ✓`）。

除此之外，在复振幅多项式读出侧，“全局共同相位无关性”（即物理读数不偏袒复平面上任何全局相位基准 $z \mapsto e^{i\theta} z$）同样给出了一条精确指向二次配对代数的冻结定理。记有限指标集为 $\iota$（`[Fintype ι]`），令 $\operatorname{Poly}(\iota) = \operatorname{MvPolynomial}(\iota \oplus \iota, \mathbb{C})$ 表示形式全纯与反全纯变元 $(z_i, \bar{z}_i)_{i \in \iota}$ 上的复系数多元多项式环，其在复向量 $z : \iota \to \mathbb{C}$ 处的实际求值记作 $\operatorname{actual}(p, z)$（即将左半变元代入 $z_i$、右半变元代入共轭 $\overline{z_i}$）：

::: {.theorem #thm-ch31-phase-polynomial-quadratic title="全局共同相位不变多项式的电荷平衡、最低二次次数与厄米矩阵唯一表出定理" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem"}
设 $\iota$ 为有限指标集（`[Fintype ι]`），$p \in \operatorname{Poly}(\iota)$ 为任意复振幅多项式。则以下四组结论同时成立：

1. **笛卡尔坐标转换与次数保持**：存在唯一的复共轭多项式 $q \in \operatorname{Poly}(\iota)$，使得对一切 $z : \iota \to \mathbb{C}$ 均有 $\operatorname{actual}(q, z) = \operatorname{eval}(\operatorname{cartesian}(z), p)$；且笛卡尔转换映射 `toCartesian` 保持总次数不变，并保持任意给定阶数 $d$ 的齐次性充要等价；
2. **共同相位不变性、全纯—反全纯电荷平衡与二次代数生成**：多项式 $p$ 在全体共同相位旋转 $z \mapsto e^{i\theta} z$（$\forall \theta \in \mathbb{R}$）下实际求值不变（`Invariant p`），当且仅当其每一个非零单项式的全纯总次数与反全纯总次数相等（`Balanced p`），亦当且仅当 $p$ 属于由二次共轭对 $z_i \bar{z}_j$ 生成的子代数 `quadraticAlgebra`（从而其实际求值函数属于 `actualQuadraticAlgebra`）；
3. **非平凡不变式的最低次数下界 $2$**：任何非常数共同相位不变多项式（$\neg \exists c \in \mathbb{C},\; p = C(c)$）必满足 $\operatorname{totalDegree}(p) \ge 2$；且对任意坐标指标 $i \in \iota$，对角二次生成元 $z_i \bar{z}_i$（`quadraticGenerator (i, i)`）本身即为总次数恰等于 $2$ 的共同相位不变多项式；
4. **二阶实齐次不变式的唯一厄米矩阵与半正定判据**：若 $p$ 为 $2$ 阶齐次多项式、对一切 $z$ 实际取实值（$\operatorname{Im}\operatorname{actual}(p, z) = 0$）且满足共同相位不变性，则存在**唯一**的复矩阵 $H \in \operatorname{Matrix}(\iota, \iota, \mathbb{C})$（在所有满足 $\forall z,\; \operatorname{actual}(p, z) = z^\dagger H z$ 的复矩阵中唯一），使得 $H$ 为厄米矩阵（`H.IsHermitian`）、矩阵元由 $H_{ji} = p.\operatorname{coeff}(\operatorname{pairExponent}(i, j))$ 给出，且对一切 $z$ 成立 $\operatorname{Re}\operatorname{actual}(p, z) \ge 0$ 当且仅当 $H$ 半正定（`H.PosSemidef`）。
:::

::: proof
利用实部与虚部的复线性可逆变换 $x_i = (z_i + \bar{z}_i)/2$、$y_i = (z_i - \bar{z}_i)/(2i)$，实笛卡尔多项式与 $(z, \bar{z})$ 形式多项式之间建立保持总次数与齐次性的双射。当输入施行全局相位旋转 $z \mapsto e^{i\theta} z$ 时，双次数为 $(a, b)$ 的单项式乘以特征因子 $e^{i(a-b)\theta}$；由不同整数频率三角指数的线性独立性，实际求值对一切 $\theta \in \mathbb{R}$ 不变当且仅当每个非零单项式均满足电荷平衡 $a = b$。满足 $a = b$ 的任意单项式均可将 $a$ 个全纯变元与 $a$ 个反全纯变元逐对配成 $z_i \bar{z}_j$ 的乘积，故 `Balanced p` 与属于 `quadraticAlgebra` 等价；若 $p$ 非常数，则至少存在一个 $a = b \ge 1$ 的非零单项式，总次数 $a + b = 2a \ge 2$。当 $p$ 进一步为 $2$ 阶齐次实值不变式时，其仅含 $a = b = 1$ 的双线性共轭项 $\sum_{i,j} c_{ij} \overline{z_j} z_i$；由复双线性型极化恒等式知表示矩阵 $H$ 唯一，实值性迫使 $H^\dagger = H$，而非负性按定义等价于复半正定性 `H.PosSemidef`。完整证明由 Lean 内核检查。
:::

注意 [@thm-ch31-phase-polynomial-quadratic] 第 2 条同时表明：诸如 $|z|^4 = (z\bar{z})^2$ 之类的四次及更高偶次平衡多项式同样属于 `quadraticAlgebra`；因此，“共同相位不变”负责排除一切一阶线性读出并把最低非平凡次数推至 $2$，而从全体偶次平衡代数中进一步挑出第 4 条的二阶齐次厄米二次型，则对应于叠加最低次数原则或正交标架可加性公理。

::: {.viz src="fairness-square-uncertainty-expansion" preset="fair-square" height="500"}
**两两公平与二次配对标架检验卡（`fair-square`）**：同一角度滑块同步对比随标架旋转起伏的品红线性绝对值和 $|\cos\theta| + |\sin\theta| \in [1, \sqrt{2}]$、一般幂次权重族 $w_p(\theta)$，以及严格守恒在单位圆上的青色二次勾股和 $\cos^2\theta + \sin^2\theta = 1$（配克利福德逆序积 $(AB)(BA)$ 几何示意）；琥珀色标出当前选定的夹角 $\theta$ 与指数 $p$。平行四边形正定理、玻恩秩一约化、共同相位多项式定理，以及有限复维格里森定理（$N \ge 3$，[@thm-gleason-finite-projection]）与有限维布施效应表出定理（[@thm-busch-effect-density]）属 `LEAN ✓`，约当—冯·诺依曼逆定理与更广实空间／无限维格里森定理属 `文献结果`，采样角度残差属 `NUM`。
:::

**第二步：平方折叠符号与相对相位，造成单基读出的相位盲区。** 一旦读出规则采用二次配对，代数上的不可逆折叠便随之发生。为了不把不同载体上的“丢失细节”混为一谈，我们必须精确区分四种映射的原像纤维：

1. **实轴平方映射 $x \mapsto x^2$（$\mathbb{R} \to \mathbb{R}_{\ge 0}$）**：对每个正读数 $y > 0$，原像纤维恰为两个离散符号点 $\{+\sqrt{y}, -\sqrt{y}\}$（在 $y = 0$ 处退化为单点 $\{0\}$，`手工推导`）；
2. **单位圆倍角映射 $z \mapsto z^2$（$S^1 \to S^1$）**：将对径点 $\{+z, -z\}$ 折叠为同一点并使相位角加倍，不存在连续全局逆截面（[第 5 章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift]，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，`LEAN ✓`）；
3. **复平面模平方映射 $z \mapsto |z|^2$（$\mathbb{C} \to \mathbb{R}_{\ge 0}$）**：对任意正模平方 $r^2 > 0$，原像纤维是整整一圈连续相位圆周 $\{r e^{i\alpha} \mid \alpha \in [0, 2\pi)\} \cong S^1$，而绝非两个离散点（`手工推导`）；
4. **固定正交基下的玻恩概率读出**：单个纯态的**全局相位** $|\psi\rangle \mapsto e^{i\alpha}|\psi\rangle$ 不改变密度算子 $|\psi\rangle\langle\psi|$，属于冗余规范自由度；但不同基分量之间的**相对相位**却真实改变纯态密度算子的非对角相干元！如果观察者只读取某一固定计算基下的对角可观测量，模平方运算就会把正负相对相位彻底抹平：

::: {.theorem #thm-ch31-diagonal-phase-blindness title="对角可观测量族对量子比特相对相位的联合读出盲区定理" lean="D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase"}
设 $I$ 为任意指标类型，`observable : I → QubitMatrix` 为任意一族在计算基下全为对角矩阵的单量子比特可观测量（即 $\forall i \in I,\; (\operatorname{observable} i).\operatorname{IsDiag}$）。记等幅正负叠加纯态密度矩阵分别为 $\rho_+ = |+\rangle\langle+|$（`equalSuperpositionDensity`）与 $\rho_- = Z \rho_+ Z = |-\rangle\langle-|$，并记玻恩读出为 $\operatorname{bornProbability}(\rho, O) = \operatorname{Re}\operatorname{Tr}(\rho O)$。则：

1. **量子态严格相异而对角联合读出全同**：$\rho_+ \neq \rho_-$，但两者在整个对角可观测量族上的联合玻恩读出完全相等，即
   $$
   \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_+\bigr) = \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_-\bigr);
   $$
2. **区分接口的非对角必要性**：凡满足 $\operatorname{bornProbability}(\rho_+, \text{interface}) \neq \operatorname{bornProbability}(\rho_-, \text{interface})$ 的单量子比特矩阵 `interface : QubitMatrix`，必不是对角矩阵（$\neg \text{interface}.\operatorname{IsDiag}$）；
3. **互补泡利 $X$ 接口显影相对相位**：泡利矩阵 $X$（`qubitX`）满足 $\neg X.\operatorname{IsDiag}$，且严格区分两态：$\operatorname{bornProbability}(\rho_+, X) \neq \operatorname{bornProbability}(\rho_-, X)$。
:::

::: proof
在二元计算基 $\{|0\rangle, |1\rangle\}$ 下，$\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$，而经泡利 $Z = \operatorname{diag}(1, -1)$ 共轭后的 $\rho_- = \frac{1}{2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$。两者右上角非对角元分别为 $+1/2$ 与 $-1/2$，故 $\rho_+ \neq \rho_-$；但对任意对角矩阵 $D = \operatorname{diag}(d_0, d_1)$，迹 $\operatorname{Tr}(\rho_\pm D) = (d_0 + d_1)/2$ 仅读取对角元而完全消去非对角符号，因此对任意指标族 $I$ 上的对角可观测量族联合读数恒等，从而任何能区分两态的接口矩阵必具非零非对角元。取泡利 $X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$，其非对角，且给出 $\operatorname{Re}\operatorname{Tr}(\rho_+ X) = +1 \neq -1 = \operatorname{Re}\operatorname{Tr}(\rho_- X)$。完整证明由 Lean 内核检查。
:::

尽管该声明的历史命名带有 `prime` 字样，其内核类型签名对任意指标集 $I$ 上的全体对角矩阵一致成立：单一计算基上的模平方读出看不见相对相位，唯有旋转到非对角的互补测量语境（如泡利 $X$）才能将被折叠的相干符号重新显影。

::: {.viz src="fairness-square-uncertainty-expansion" preset="phase-fold" height="500"}
**平方纤维折叠与对角相位盲区卡（`phase-fold`）**：并排对比实数平方 $x \mapsto x^2$ 的正负双点纤维、复模平方 $z \mapsto |z|^2$ 的整圈 $S^1$ 相位圆纤维，以及量子比特 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$ 在全体计算基对角可观测量下的品红重合读数与在互补泡利 $X$ 接口下的青色分离读数；琥珀色标出当前选定的相对相位角。对角盲区与圆周双覆叠属 `LEAN ✓`，实/复初等原像纤维属 `手工推导`，采样纤维点属 `NUM`。
:::

**第三步：被单基读出舍弃的横向面积，在非对易互补对上反弹为罗伯逊—薛定谔不确定性。** 当两个可观测量不能在同一组正交基下同时对角化时，方差之积究竟由什么几何量支撑？[第 6 章](ch06-geometric-product.md)已经完整形式化并锁定了复内积空间上对称复线性算子 $A, B : E \to E$ 的精确等式版罗伯逊—薛定谔恒等式（[@thm-robertson-schrodinger]，[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)，有限维混态矩阵推广见 [@thm-mixed-state-robertson]）。具体而言，对单位态向量 $\psi$（$\|\psi\| = 1$），置中心化涨落向量 $u = (A - \langle A\rangle)\psi$、$v = (B - \langle B\rangle)\psi$ 及复内积 $z = \langle u, v\rangle_{\mathbb{C}}$，定义实对称协方差 $C = \frac{1}{2}\operatorname{Re}\langle\psi, (AB + BA)\psi\rangle_{\mathbb{C}} - \langle A\rangle\langle B\rangle$、半换位子期望 $K = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$ 与复格拉姆余项 $G = \|u\|^2\|v\|^2 - \|\langle u, v\rangle_{\mathbb{C}}\|^2$，则 [@thm-robertson-schrodinger] 同时锁定四条精确结论：

$$
(\Delta A)^2(\Delta B)^2 = \|u\|^2\|v\|^2 = C^2 + \|K\|^2 + G,\qquad G \ge 0,\qquad \operatorname{Re} z = C,\qquad (\operatorname{Im} z : \mathbb{C}) = K.
$$

略去非负余项 $G \ge 0$ 即得罗伯逊—薛定谔不等式 $(\Delta A)^2(\Delta B)^2 \ge C^2 + \|K\|^2$，再略去 $C^2 \ge 0$ 即由手工开方得常见换位子下界 $\Delta A\,\Delta B \ge \|K\|$。

在几何直观上，此处有一处极易混淆的标量域区分必须点透：**复格拉姆余项 $G$、半换位子面积 $\|K\|^2$ 与底层实希尔伯特空间上的外积面积并非同一个量**。若把 $E$ 视为实内积空间（取实内积 $\operatorname{Re}\langle u, v\rangle_{\mathbb{C}}$，对应[第 6 章](ch06-geometric-product.md)实坐标 [@thm-lagrange-gram-identity]），实外积张成的平行四边形面积平方恰为（`手工推导`）

$$
\|u \wedge_{\mathbb{R}} v\|^2 = \|u\|^2\|v\|^2 - (\operatorname{Re}\langle u, v\rangle_{\mathbb{C}})^2 = \|K\|^2 + G.
$$

让我们用一个精确到整数的单量子比特手工算例（`手工推导`）验证这一分解：取 $A = X$、$B = Y$、初态为单位纯态 $\psi = |0\rangle$。此时期望值 $\langle X\rangle = \langle Y\rangle = 0$，中心化涨落向量分别为 $u = X|0\rangle = |1\rangle$ 与 $v = Y|0\rangle = i|1\rangle$，故方差满足 $(\Delta X)^2 = \|u\|^2 = 1$、$(\Delta Y)^2 = \|v\|^2 = 1$。计算复内积得 $z = \langle u, v\rangle_{\mathbb{C}} = i$，于是协方差 $C = \operatorname{Re}(i) = 0$，半换位子项 $K = \operatorname{Im}(i) = 1$，而**复格拉姆余项 $G = 1 \cdot 1 - |i|^2 = 0$**！可以看到，因为 $v = i u$ 与 $u$ 落在同一条复射线上，复格拉姆余项 $G$ 完全为零；然而虚数单位 $i$ 在底层实空间里恰是一次 $90^\circ$ 正交相位旋转，使实平面上的 $u$ 与 $v$ 撑开单位实外积面积 $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G = 1$，精确饱和 $(\Delta X)^2(\Delta Y)^2 = 1$。

::: {.remark #rem-ch31-jvn-gleason-robertson-literature title="文献边界：平行四边形逆定理、格里森的更广形式、无界正则对易子与无相位重构"}
**格里森的有限复投影版本已在第 2 章形式化；其余以下范围仍是文献边界，未在本书形式化。** 为将本小节已锁定的有限维与有界线性代数定理同经典泛函分析及层析文献严格区分，须保留以下四项边界：

1. **约当—冯·诺依曼平行四边形逆定理**（P. Jordan & J. von Neumann, *Ann. of Math.* **36**, 1935, 719–723）：实或复赋范空间上的范数由内积诱导（并可经实/复极化恒等式唯一重构内积），当且仅当该范数满足平行四边形恒等式；在至少含两个不相交非零支撑坐标的标准非退化 $L^p / \ell^p$ 赋范族（$1 \le p \le \infty$）中，这唯一筛出 $p = 2$（[第 1 章](ch01-measurement.md) [@thm-parallelogram-norm-law] 形式化的是实内积空间的正向蕴含）。
2. **格里森闭子空间测度定理**（A. M. Gleason, *J. Math. Mech.* **6**, 1957, 885–893）：本书在[第 2 章](ch02-born-rule.md)冻结了有限复矩阵、$N \ge 3$ 且仅在星投影上要求正交二元可加的精确版本（[@thm-gleason-finite-projection]，`LEAN ✓`）。可分实空间及无限维闭子空间的更广形式仍是文献结果；该定理对 $d = 2$ 的纯投影格不成立，而 [@thm-busch-effect-density] 之所以涵盖 $d = 2$，是因为它对全体效应算子施加了更强的可加性前提。
3. **罗伯逊（1929）与薛定谔（1930）及无界正则算子定义域条件**（H. P. Robertson, *Phys. Rev.* **34**, 1929, 163–164；E. Schrödinger, *Sitzungsber. Preuss. Akad. Wiss.*, 1930, 296–303）：本书 [@thm-robertson-schrodinger] 与 [@thm-mixed-state-robertson] 已锁定全空间定义的对称复线性映射与有限维混态矩阵；而连续空间 $L^2(\mathbb{R})$ 上无界位置—动量正则对 $[x, p] = i\hbar I$ 导出 $\Delta x\,\Delta p \ge \hbar / 2$，必须额外附加稠密公共不变定义域与有限二阶矩假设（在任何非零有限维空间中，由于矩阵换位子的迹恒为 $\operatorname{Tr}[A, B] = 0$，绝不可能存在满足 $[A, B] = i\hbar I$（$\hbar \neq 0$）的有限维矩阵对）。
4. **无相位测量重构的充要丰富度**（R. Balan, P. Casazza & D. Edidin, *Appl. Comput. Harmon. Anal.* **20**, 2006, 345–356；A. Conca, D. Edidin, M. Hering & C. Vinzant, *Appl. Comput. Harmon. Anal.* **38**(2), 2015, 346–356）：模平方丢失单个幅值的相位并不意味着相位永远无法通过多组测量恢复；当测量框架足够丰富（Balan–Casazza–Edidin 2006 证明一般位置的 $4d - 2$ 个框架向量已足够，Conca–Edidin–Hering–Vinzant 2015 进一步确立 $\mathbb{C}^d$ 中一般位置 $4d - 4$ 个框架向量的单射性阈值）时，纯态射线可在模去全局相位的意义下由模平方读数唯一重构——[@thm-ch31-diagonal-phase-blindness] 揭示的是固定单基对角观测目录的结构性不足。
:::

把以上三步合起来看，我们也要划清教学叙事与形式蕴含的界限：在 [@thm-robertson-schrodinger] 中，不确定性下界对**完全已知**的纯态 $|0\rangle$ 与已知算子 $X, Y$ 严格成立，因此量子测不准绝不是“观察者不知道某个经典隐藏相位”的主观无知；将“两两比较公平 $\implies$ 二次模平方 $\implies$ 单基折叠相位细节 $\implies$ 横向换位子面积反弹为不确定性”串联为一条统一的因果发生链，属于统摄这组独立严格定理的几何诠释（`MODEL`）。

::: {.viz src="fairness-square-uncertainty-expansion" preset="uncertainty-wedge" height="500"}
**罗伯逊—薛定谔方差分解与实外积面积卡（`uncertainty-wedge`）**：展示量子比特态在非对易可观测量对（如 $X, Y$ 作用于 $|0\rangle$ 或一般旋转态）下的中心化涨落向量 $u, v$。青色面积块标出底层实希尔伯特空间外积面积 $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G$，品红分量拆解协方差平方 $C^2$、半换位子项 $\|K\|^2$ 与复格拉姆余项 $G$，琥珀色标出当前态向量与算子夹角。纯态恒等式与有限维混态下界属 `LEAN ✓`（[@thm-robertson-schrodinger]、[@thm-mixed-state-robertson]），$|0\rangle$ 上 $X, Y$ 整数检核属 `手工推导`，连续滑块数值属 `NUM`，从相位折叠到测不准的本体因果叙事属 `MODEL`。
:::

## 31.4.3 时间作为单调正交维度扩张：有限盒饱和与素数新轴突围 {#sec-ch31-time-orthogonal-expansion}

现在我们来到本节四句命题中最具突破性的最后一句话：**“时间是维度扩张.”** 在数学上，这句话把“封闭有限维盒子里的演化宿命”与“开放正交补空间中的新轴诞生”摆上了同一架天平。

先看正交补空间与逐层壳扩张的精确希尔伯特几何。对完备内积空间 $E$ 中的任意闭子空间 $M$，正交补投影恒等式定理 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 锁定了余投影关系 $P_{M^\perp} = \operatorname{id}_E - P_M$、两个投影各自的幂等性、交叉复合恒为零（$P_M P_{M^\perp} = P_{M^\perp} P_M = 0$）以及恒等分解 $P_M + P_{M^\perp} = \operatorname{id}_E$；而在实希尔伯特空间中，有限阶壳扩张定理 [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion) 证明，只要每一层新增闭壳满足 $E_{k+1} \le S_k^\perp$ 且累积闭子空间按 $S_{k+1} = S_k \sqcup E_{k+1}$ 递推，第 $n$ 阶空间就精确分解为初始核与前 $n$ 层正交壳的直和 $S_n = S_0 \sqcup \bigsqcup_{k=1}^n E_k$，全空间分解为 $S_0 \sqcup \bigsqcup_{k=1}^n E_k \sqcup S_n^\perp$，且当前正交余空间满足递推剥离 $S_n^\perp = E_{n+1} \sqcup S_{n+1}^\perp$（注意该定理本身允许零壳 $E_{k+1} = \bot$，并不无条件强迫维数严格增长）。唯有当正交补空间非零时，有限层外部才必然存在与当前已知子空间保持满额单位距离的正交逃逸新轴：

::: {.theorem #thm-ch31-projection-residual-escape title="非满闭子空间的正交余项单位逃逸向量定理" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
设 $V$ 为标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的完备希尔伯特空间（`[CompleteSpace V]`），$S \le V$ 为闭子空间（`[CompleteSpace S]`），且其正交补非平凡：$S^\perp \neq \bot$。则存在逃逸向量 $e \in V$ 同时满足五条性质：

$$
e \in S^\perp,\qquad \|e\| = 1,\qquad P_S e = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \|\operatorname{id}_V - P_S\| = 1.
$$
:::

::: proof
因假设 $S^\perp \neq \bot$，正交补子空间中存在非零向量 $v \in S^\perp$（$v \neq 0$）。取归一化向量 $e = \|v\|^{-1} v$，由子空间数乘封闭性知 $e \in S^\perp$ 且 $\|e\| = 1$；正交补核性质给出 $P_S e = 0$。对任意 $s \in S$，因 $e \perp (-s)$，勾股定理给出 $\|e - s\|^2 = \|e\|^2 + \|s\|^2 = 1 + \|s\|^2 \ge 1$，且当 $s = 0 \in S$ 时取到等号 $\|e - 0\| = 1$，故点到集合的度量下确界距离精确等于 $\operatorname{infDist}(e, S) = 1$。最后，由 $(\operatorname{id}_V - P_S) e = e$ 及正交余投影 $\operatorname{id}_V - P_S = P_{S^\perp}$ 的算子范数收缩性，即得 $\|\operatorname{id}_V - P_S\| = 1$。完整证明由 Lean 内核检查。
:::

在此基础上，若第 $D$ 步的新输入向量 $u_D$ 在当前 $D$ 维子空间 $V_D$ 外留下了**非零**正交创新余项 $r_D = u_D - P_{V_D} u_D \neq 0$，手工直和代数（`手工推导`）立即给出单轴扩张 $e_{D+1} = r_D / \|r_D\|$ 与 $V_{D+1} = V_D \oplus \operatorname{span}\{e_{D+1}\}$，使维数严格加一：$\dim V_{D+1} = \dim V_D + 1$（对应的未归一化格拉姆行列式乘以因子 $\|r_D\|^2$，归一化后保持 $\det\operatorname{diag}(G_D, 1) = \det G_D$）。这里同样要澄清霍奇星算子（Hodge star）的类型边界（`手工推导`）：在固定定向的 $n$ 维欧氏空间中，$\star_n : \Lambda^k \mathbb{R}^n \to \Lambda^{n-k} \mathbb{R}^n$ 将最高阶外积 $\star_n(e_1 \wedge \cdots \wedge e_n)$ 映射为标量 $\Lambda^0 \mathbb{R}^n$，并不会凭空造出第 $n + 1$ 维；只有预先选定了 $(n + 1)$ 维定向母空间与嵌入后，才有 $\star_{n+1}(e_1 \wedge \cdots \wedge e_n) = e_{n+1}$——将“外积法向催生新空间维”读作动态创生律属于 `MODEL`。

与这种向母空间外部的突围恰成鲜明对照，如果我们把演化死死关进一个**固定有限维闭盒** $V$ 之内，只靠固定线性演化算子 $T : V \to_{\mathbb{K}} V$ 与固定观测读出映射 $C : V \to_{\mathbb{K}} Y$ 反复迭代，系统的可观测克雷洛夫（Krylov）子空间链

$$
O_m = \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\bigl\{(T^*)^k C^* y \;\big|\; 0 \le k \le m,\; y \in Y\bigr\}
$$

就绝无可能无限开辟新维度，而必然在有限步内触顶锁死：

::: {.theorem #thm-ch31-krylov-growth-stability title="有限维可观测克雷洛夫子空间链的严格增长步数上界定理" lean="D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound"}
设 $V$ 与 $Y$ 为标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的有限维内积空间，$T : V \to_{\mathbb{K}} V$ 与 $C : V \to_{\mathbb{K}} Y$ 为 $\mathbb{K}$-线性映射。记递增可观测克雷洛夫子空间链为 $O_m = \operatorname{observableKrylov}(T, C, m)$（$m \in \mathbb{N}$）。则发生严格子空间扩张的时刻集合之广义基数满足精确上界：

$$
\operatorname{encard}\bigl\{m \in \mathbb{N} \;\big|\; O_m < O_{m+1}\bigr\} \le \operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C).
$$
:::

::: proof
初始第 $0$ 层空间 $O_0 = \operatorname{range}(C^*)$ 的维数等于 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$，且对一切 $m \in \mathbb{N}$ 有单调包含 $O_m \le O_{m+1} \le V$。每当第 $m$ 步发生严格包含 $O_m < O_{m+1}$ 时，有限维数 $\operatorname{finrank}_{\mathbb{K}} O_m$ 至少严格增加 $1$。由于全空间维数上界为有限自然数 $\operatorname{finrank}_{\mathbb{K}} V$，从初始维数 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ 出发至多只能发生 $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ 次严格维数跃升。完整证明由 Lean 内核检查。
:::

紧随其后的永久稳定定理 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 把封闭盒子的停滞宿命彻底钉死：在同一组有限维假设下，一旦某一步不再涌现新秩（$O_m = O_{m+1}$），由于 $T^*(O_m) \subseteq O_{m+1} = O_m$ 使 $O_m$ 成为 $T^*$-不变子空间，此后对一切 $r \in \mathbb{N}$ 恒有 $O_{m+r} = O_m$——再也不会有任何新方向诞生。

那么，在算术与离散结构的底层，是否存在一个永不被任何有限清单穷尽、永远能在任意有限集合之外提供全新独立指标的严格原型？答案正是欧几里得素数突围的有限集合内核定理：

::: {.theorem #thm-ch31-prime-axis-escape title="有限素数集乘积加一的同余互素余一与外部新素数突围定理" lean="D5/S3/Axis/PrimeAxisEscape.prime_axis_escape"}
设 $S$（`S : Finset ℕ`）为任意有限自然数集合，且其中每个元素均为素数（$\forall p \in S,\; \operatorname{Nat.Prime}(p)$）。记乘积加一构造数为 $N_S = \prod_{p \in S} p + 1$（`S.prod id + 1`）。则：

1. **对全体旧素数模余一**：对每一个已有素数 $p \in S$，均成立同余式 $N_S \equiv 1 \pmod p$（`Nat.ModEq p (S.prod id + 1) 1`）；
2. **集合外部必有新素因子突围**：存在自然数 $q \in \mathbb{N}$，使得 $q$ 为素数、$q \mid N_S$，且 $q \notin S$。
:::

::: proof
任取 $p \in S$，因 $p$ 整除有限乘积 $\prod_{r \in S} r$，故 $N_S = \prod_{r \in S} r + 1$ 除以 $p$ 余 $1$，即 $N_S \equiv 1 \pmod p$（当 $S = \emptyset$ 时空乘积为 $1$，$N_\emptyset = 2$，结论空真成立且素因子 $q = 2 \notin \emptyset$）。由于每个 $p \in S$ 满足 $p \ge 2$，乘积 $\prod_{r \in S} r \ge 1$，从而 $N_S \ge 2$，故 $N_S$ 必有至少一个素因子 $q \mid N_S$。若假设 $q \in S$，则由第 1 条知 $N_S \equiv 1 \pmod q$，结合 $q \mid N_S$ 将推出 $q \mid 1$，与 $q$ 为素数矛盾；因此必有 $q \notin S$。完整证明由 Lean 内核检查。
:::

为了防止把构造数 $N_S$ 误读为“一定是素数”或“第 $|S| + 1$ 个顺序素数”，我们做一个精确整数检核（`手工推导`）：取前六个素数组成的有限集 $S = \{2, 3, 5, 7, 11, 13\}$，计算得

$$
N_S = 2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30030 + 1 = 30031 = 59 \cdot 509.
$$

此处 $N_S = 30031$ 是**合数**而非素数，且它的两个素因子 $59$ 与 $509$ 都不是紧随 $13$ 之后的第 $7$ 个素数 $17$——但两者都严格落在旧集合 $S$ 之外（$59 \notin S$，$509 \notin S$），完美印证 [@thm-ch31-prime-axis-escape] 的精确陈述。

::: {.remark #rem-ch31-krylov-euclid-literature title="文献结果：欧几里得《几何原本》素数无穷多命题与兰佐斯—克雷洛夫迭代终止理论（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本小节的形式化定理与两部经典数学文献遥相呼应，各自边界如下：

1. **欧几里得《几何原本》第 IX 卷命题 20**（Euclid, *Elements*, Book IX, Prop. 20）：证明素数多于任何给定的有限素数清单。本书 [@thm-ch31-prime-axis-escape] 已在 Lean 内核中锁定其任意有限素数集 $S$ 上的乘积加一同余与外部素因子存在性核心；由该有限突围步经反证法导出全体素数集合无穷，以及与算术级数素数分布相关的解析数论结论，作为经典文献背景引用。
2. **兰佐斯三对角化与阿诺德—克雷洛夫子空间迭代理论**（C. Lanczos, *J. Res. Nat. Bur. Stand.* **45**, 1950, 255–282）：在数值线性代数与算子谱理论中，Lanczos 与 Arnoldi 算法通过对 $v, Tv, T^2 v, \dots$ 逐次施密特正交化提取正交新轴，并在残差归零（命中不变子空间，即良性中断 breakdown）或耗尽有限环境空间维数时精确终止。本书 [@thm-ch31-krylov-growth-stability] 与 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 锁定了有限维可观测块克雷洛夫链的严格增长步数上界与一旦稳定永久不变定律；具体矩阵分解算法与浮点舍入稳定性分析属经典文献。
:::

现在，我们可以把算术突围、正交余项与时间概念放入显式的几何—物理模型（`MODEL`）中完成收束。为了将算术中的素数独立性转化为几何中的正交坐标轴，我们在模型层显式定义可数无穷维希尔伯特空间 $\mathcal{H} = \ell^2(\mathbb{P})$，以全体素数集合 $\mathbb{P}$ 索引一组标准正交基 $\{e_p\}_{p \in \mathbb{P}}$：这样，每当 [@thm-ch31-prime-axis-escape] 在任意有限素数集 $S$ 之外见证一个新素因子 $q_{\mathrm{new}} \notin S$，几何空间中就精确对应一条与旧有有限盒 $V_S = \operatorname{span}\{e_p \mid p \in S\}$ 完全正交的单位新轴 $e_{q_{\mathrm{new}}} \in V_S^\perp$（注意这一人为规定的标准正交基 $\ell^2(\mathbb{P})$ 必须与[第 22 章](ch22-primes-euler-products-and-zeros.md)已锁定的素数对数 $\log p$ 在 $\mathbb{Z}$ 或 $\mathbb{Q}$ 上的线性无关性严格区分——实数族 $\{\log p\} \subset \mathbb{R}$ 在实数域 $\mathbb{R}$ 上并不线性无关，本身不是欧氏正交向量）。

在这一模型（`MODEL`）下，定义**创新事件时钟** $\tau(n) = \dim V_n - \dim V_0$：只要宇宙不把观察者永久囚禁在固定秩的有限盒 $(V, T, C)$ 内任由 [@thm-ch31-krylov-growth-stability] 饱和停滞，每一次来自盒外正交余空间 $V_D^\perp$ 的非零新输入（[@thm-ch31-projection-residual-escape]）都推动正交秩实现单调跃升 $D \to D + 1$。与此同时，形式纪律要求我们将这个“正交秩诞生时钟”与常规实验室参数时间严格区分开来：在固定希尔伯特空间内，幺正演化 $U(t) = e^{-iHt}$ 始终保持空间总维数不变；更具体地，[第 11 章](ch11-pulses-and-virtual-z.md)已由 Lean 锁定的能量本征态定态定理（[@thm-hermitian-eigenstate-stationary]，[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与零方差定理 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)）证明，在非零物理参数时间间隔内，能量本征态的密度矩阵与可观测读数完全静止，并不会每过一秒就自动孳生新维数；至于宏观宇宙是否因此免于热力学热寂，还需另行建立自由度耦合、能量与熵流的物理动力学模型，绝不冒充已由上述线性代数或素数定理直接证毕的结论。

::: {.viz src="fairness-square-uncertainty-expansion" preset="time-expand" height="500"}
**有限盒克雷洛夫饱和与素数新轴突围卡（`time-expand`）**：上半舞台展示固定有限维闭盒内可观测克雷洛夫子空间维数 $\dim O_m$ 经历至多 $\dim V - \operatorname{rank} C$ 次严格增长后触顶拉平的品红饱和台阶；下半舞台展示当正交余空间非空时单位余项向量 $e_{D+1} \perp V_D$ 的青色新轴张开，以及欧几里得素数集（含 $S = \{2,3,5,7,11,13\} \implies N_S = 30031 = 59 \cdot 509$）在 $\ell^2(\mathbb{P})$ 模型下持续提供盒外正交基轴的过程，琥珀色标出当前扩张步 $D \to D + 1$。余项逃逸、克雷洛夫上界与素数突围属 `LEAN ✓`，数值秩与 QR 容差判定属 `NUM`，“时间即正交维度扩张”属 `MODEL`。
:::

至此，我们将固定维度闭盒视角与正交维度扩张视角的五重对照，连同每一环的形式化锚点、文献依托与模型边界，完整收束于下表：

| 核心议题 | 固定维度闭盒视角（截断脚手架） | 正交维度扩张视角（嵌套与突围） | 认识论等级与精确形式边界 |
| :--- | :--- | :--- | :--- |
| **1. 静动关系与表观闭合** | 静态块宇宙与动态时间指针二元对立；平面周期轨道看似绝对自闭 | 嵌套链 $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ 兼容整体与序列切片；高维螺旋与覆叠层高持续推进而投影特征闭合 | 黄金螺旋特征盲区 [@thm-ch31-helix-readout-progress]、[`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step)、[`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct) 与圆周双覆叠 [@thm-circle-double-cover-history-lift]（`LEAN ✓`）；螺旋投影公式（`手工推导`）；静动不二与闭合幻象论（`MODEL`） |
| **2. $90^\circ$ 视界与截断极限** | 投影为零即被判定为不存在；误把有限维截断当作算子一致收敛 | 正交方向标量投影 $\cos 90^\circ = 0$；每个固定向量强收敛的同时，真子空间余投影恒保单位算子范数缺口 $\lVert\operatorname{id} - P_{S_i}\rVert = 1$ | 一致完备化阻断 [@thm-ch31-truncation-strong-vs-uniform]、递增投影强极限 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 与二次正交闭包 [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure)（`LEAN ✓`）；三类几何角严格区分（`手工推导`）；视界本体诠释（`MODEL`） |
| **3. 两两公平与二次配对** | 线性绝对值和 $\lvert\cos\theta\rvert + \lvert\sin\theta\rvert$ 依赖标架，有序乘积 $AB \neq BA$ 依赖次序 | 逆序积 $(AB)(BA) = \lVert A\rVert^2\lVert B\rVert^2$ 消去次序；全局相位不变多项式最低非平凡次数为 $2$，二阶实齐次不变式唯一表为厄米型 | 共同相位多项式 [@thm-ch31-phase-polynomial-quadratic]、平行四边形律 [@thm-parallelogram-norm-law]、玻恩秩一约化 [@thm-born-modulus-square]、有限复维格里森 [@thm-gleason-finite-projection] 与布什效应表出 [@thm-busch-effect-density]（`LEAN ✓`）；更广格里森形式与约当—冯·诺依曼（`文献结果`）；$w_p(\theta)$ 反例与克利福德逆序积（`手工推导`） |
| **4. 相位折叠与横向测不准** | 把单一计算基上的模平方概率误认为量子态的全部信息 | 平方折叠符号与相位纤维；全体对角可观测量无法区分 $\lvert +\rangle\langle +\rvert$ 与 $\lvert -\rangle\langle -\rvert$；横向面积经 $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$ 反弹 | 对角相位盲区 [@thm-ch31-diagonal-phase-blindness]、拉格朗日—格拉姆恒等式 [@thm-lagrange-gram-identity] 与罗伯逊—薛定谔恒等式 [@thm-robertson-schrodinger]（`LEAN ✓`）；无界 $[x,p]=i\hbar I$ 定义域与无相位重构 [@rem-ch31-jvn-gleason-robertson-literature]（`文献结果`）；$\lvert 0\rangle$ 上 $X, Y$ 算例（`手工推导`）；因果叙事链（`MODEL`） |
| **5. 有限盒饱和与时间扩张** | 固定有限维系统 $(V, T, C)$ 的可观测克雷洛夫链在有限步内永久锁死 | 非空正交补保证单位逃逸新轴 $e \in S^\perp$；欧几里得 $N_S = \prod_{p \in S} p + 1$ 持续见证盒外新素数 $q \notin S$，支撑 $\ell^2(\mathbb{P})$ 秩扩张时钟 $D \to D + 1$ | 正交余项逃逸 [@thm-ch31-projection-residual-escape]、克雷洛夫增长上界 [@thm-ch31-krylov-growth-stability]、永久稳定 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 与素数突围 [@thm-ch31-prime-axis-escape]（`LEAN ✓`）；欧几里得 IX.20 与兰佐斯迭代 [@rem-ch31-krylov-euclid-literature]（`文献结果`）；$30031 = 59 \cdot 509$（`手工推导`）；时间即维度扩张（`MODEL`） |

::: {.viz src="fairness-square-uncertainty-expansion" height="640"}
**交互实验室 `ORTHO//EXPAND`**：公平、平方、测不准与正交维度扩张综合沙盘。自由切换上述六个实验场景（`helix-shadow`、`horizon-limit`、`fair-square`、`phase-fold`、`uncertainty-wedge`、`time-expand`），实时交互检验三维螺旋平面投影与黄金螺旋特征盲区、$90^\circ$ 正交消隐与强极限 vs. $\|\operatorname{id} - P_{S_n}\| = 1$ 算子缺口、$|\cos\theta| + |\sin\theta|$ 与 $w_p(\theta)$ 对 $\cos^2\theta + \sin^2\theta = 1$ 的标架公平比对、对角可观测量在 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$ 上的相位盲区与泡利 $X$ 解盲、单量子比特罗伯逊—薛定谔恒等式 $(\Delta A)^2(\Delta B)^2 = C^2 + \|K\|^2 + G$ 的逐项几何拆解，以及有限维克雷洛夫饱和台阶对比欧几里得素数新轴突围（含 $30031 = 59 \cdot 509$）。绿色 `LEAN ✓` 徽章严格对应内核冻结定理，文献结论、手工推导、数值近似与本体模型按各自证据等级分栏标示。
:::

拆去固定维度闭盒的三副脚手架之后，本章五重公平与正交维度扩张的内在脉络已浑然一体：每一次看似山穷水尽的表观闭合、正交视界与测不准下界，都不是理性撞上了死胡同，而是低维投影在提醒观察者——两两公平的二次丈量在抹平局部单基相位细节的同时，早已通过非零换位子与单位算子范数缺口标示出正交补空间的方位；而跨出饱和的有限盒子、向着永不枯竭的正交新轴拾级而上，正是有限观察者在无时间几何整体中体验“时间奔流”的方式。带着这份把形式真伪交给 Lean 内核、把几何直觉坦诚交给模型的清明边界，我们迈入第八部的收官之章——[第 32 章](ch32-unified-field-and-meta-unification.md)：先在开篇[§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)将两两公平彻底铸为**零背景比较公理 $\mathcal{A}_0$**，再由此一路攀升，见证统一场与元统一的最终合龙。
