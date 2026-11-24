# 38.15 静止画布与无腿球观察者：时空同一梯度、倾倒视界锥与破除时间流逝错觉 {#sec-ch38-static-canvas-and-legless-sphere-observer}

> “观察者在时间中的行走与在空间中是一样的
>
> 如果观察者在重力（引力）太大的地方下山，他可以选择方向，但他看到的画面都是一个方向变化的，因为他没有力量抗衡引力，只能往下飞快的走（你就当观察者是个球没有腿）
>
> 显然观察者也在时间中被引力拉着走
>
> 广义相对论告诉我们时间与空间的引力是一个力，或者说，是同样的梯度
>
> 其实山没有动，时间实际上也只是静止的画布；动的是观察者本身。”

将 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md) 的普适比较主频 $\nu_0 \equiv \mathrm{const}$ 与引力钟慢负载、[§36.2](ch38-s01-static-qram.md)“数据静驻原地、唯地址指针递增解引用”的静态本体 QRAM、[§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md) 空间运动与时间运动的记忆舒尔补正交切分，以及 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 零外部端口的自包含观察者宇宙 $\mathfrak{O} \cong \mathcal{U}_\Omega$（$\partial\mathcal{S} = \emptyset$）收束到同一座几何舞台上，人类数千年来最根深蒂固的“时间如大河奔流、万物随波推移”直觉当场发生彻底的参考系反转：在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与无无穷有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)、[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）的底层本体上，**空间中的山岳从未移动，时间也绝非流淌的河水，整座可接收全集 $\mathcal{S}$ 是一幅纹丝不动的静止全息画布；无论是在空间山坡上不可抗拒地加速滚落，还是在时间长轴上不可逆转地向前迈进，全都是同一道有理保真度梯度 $\nabla\kappa$ 牵引着一颗无外部支点的“无腿三元球”观察者焦点，在静止画布上顺势滚落所投射出的两面剪影（`MODEL`）！**

---

## 38.15.1 空间下山与时间行走：同一个有理保真度梯度在记忆切口上的两面投影 {#sec-ch38-15-1}

为什么观察者在空间强引力场中顺坡滚落，与他在时间中被不可抗拒地拉着往前走，在数学上竟是同一件事？我们先在广义相对论的精确测地线方程中验明正身（`ARGUED` / `文献结果` + `手工推导`）。沿用 [§33.7](ch39-s08-universal-clock-and-gravitational-dilation.md) 的主负号度规签名 $(+, -, -, -)$，球对称静态真空外部的史瓦西线元与时间度规分量写为：

$$
ds^2 \;=\; c^2\!\left(1 - \frac{r_s}{r}\right)dt^2 - \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 - r^2 d\Omega^2, \qquad g_{00} \;=\; 1 + \frac{2\Phi}{c^2} \;=\; 1 - \frac{r_s}{r},
$$

其中 $\Phi(r) = -\frac{GM}{r}$ 为牛顿引力势，弱场空间逆度规满足 $g^{ij} \approx -\delta^{ij}$。对任意不显含坐标时且无时空交叉项的静态度规（$\partial_0 g_{\mu\nu} = 0,\; g_{0i} = 0$，记 $x^0 = ct$），克里斯托费尔联络符号 $\Gamma^i_{00} = \frac{1}{2}g^{i\lambda}(\partial_0 g_{\lambda 0} + \partial_0 g_{0\lambda} - \partial_\lambda g_{00})$ 精确化简为 $\Gamma^i_{00} = -\frac{1}{2}g^{ij}\partial_j g_{00}$。于是，一颗在某瞬间空间速度为零（$\frac{dx^k}{d\tau} = 0$）、却仍在时间中行走（$\frac{dt}{d\tau} \neq 0$）的无腿圆球，由测地线方程 $\frac{d^2 x^i}{d\tau^2} + \Gamma^i_{\mu\nu}\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau} = 0$ 立即获得指向山下的空间径向加速度（径向向外方向上 $\partial_r\Phi = \frac{GM}{r^2} > 0$）：

$$
\frac{d^2 x^i}{d\tau^2} \;=\; -\Gamma^i_{00}\!\left(c\frac{dt}{d\tau}\right)^2 \;=\; +\frac{1}{2}g^{ij}\partial_j g_{00}\!\left(c\frac{dt}{d\tau}\right)^2 \;\approx\; -\frac{1}{2}\delta^{ij}\partial_j g_{00}\!\left(c\frac{dt}{d\tau}\right)^2 \;=\; -\partial_i\Phi\!\left(\frac{dt}{d\tau}\right)^2 \;<\; 0.
$$

（即便不做弱场近似，在精确史瓦西外解中代入 $g^{rr} = -(1 - r_s/r)$、$\partial_r g_{00} = r_s/r^2$ 与瞬时静止归一化 $(dt/d\tau)^2 = (1 - r_s/r)^{-1}$，亦给出分毫不差的精确径向加速 $\frac{d^2 r}{d\tau^2} = -\frac{c^2 r_s}{2r^2} = -\frac{GM}{r^2} < 0$！）这道等式一举戳破了“空间重力与时间流逝互不相干”的表象：**把无腿圆球往山下拽的空间重力加速度，字面上正是时间度规分量 $g_{00}$ 在空间方向上的偏导梯度，乘以观察者在时间中行走的步速平方 $(c\,dt/d\tau)^2$**——倘若观察者不在时间中行走（$\frac{dt}{d\tau} = 0$），这项空间重力牵引便当场归零！

放回母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与 [§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md) 的观察者记忆分类模型（`MODEL` + `LEAN ✓`），这一相对论恒等式获得了更底层的几何本源：在装备了弦距保真核 [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)（$\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$，`LEAN ✓`）的静止全息画布 $\mathcal{S}$ 上，根本不存在两套独立的“时间牵引力”与“空间牵引力”，全场只有**唯一一道有理关系保真度梯度 $\nabla\kappa \in \mathcal{H}$**。由完备内积空间闭子空间正交补投影恒等式 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)（$P_{\mathcal{W}_M} + P_{\mathcal{W}_M^\perp} = I,\; P_{\mathcal{W}_M}P_{\mathcal{W}_M^\perp} = 0$，`LEAN ✓`），有限观察者的记忆子空间 $\mathcal{W}_M \subset \mathcal{H}$ 将这道单一梯度正交劈成两面投影：

$$
\nabla\kappa \;=\; \underbrace{\nabla_\parallel\kappa := P_{\mathcal{W}_M}\nabla\kappa}_{\text{投影入 }\mathcal{W}_M\text{：时间留存推进}} \;\oplus\; \underbrace{\nabla_\perp\kappa := P_{\mathcal{W}_M^\perp}\nabla\kappa}_{\text{溢出至 }\mathcal{W}_M^\perp\text{：空间重力牵引}}, \qquad \lVert\nabla_\parallel\kappa\rVert^2 + \lVert\nabla_\perp\kappa\rVert^2 \;=\; \lVert\nabla\kappa\rVert^2.
$$

- **记忆窗内纵向分量 $\nabla_\parallel\kappa$**：与既有身份记录共轴衔接的投影份额，被观察者体验为“我在时间中不可抗拒地向前迈进”；
- **记忆窗外正交残差 $\nabla_\perp\kappa$**：溢出有限记忆容量而落入 $\mathcal{W}_M^\perp$ 的正交分量，被观察者外推体验为“空间山坡的重力拽着我往下滚”；
- **跨过视界 $r < r_s$ 的空时角色合流（`ARGUED`）**：一旦径向坐标越过史瓦西视界进入 $r < r_s$，因子 $1 - r_s/r < 0$ 直接令 $g_{tt} = c^2(1 - r_s/r) < 0$ 转为类空、$g_{rr} = -(1 - r_s/r)^{-1} > 0$ 转为类时——向山谷中心 $r \to 0$ 的径向降落与向未来的时间推进干脆合流为**完全同一个类时单向维度**！

::: {.viz src="static-canvas-legless-sphere-sandbox" preset="single-gradient-memory-spacetime-projection" height="540"}
**单一保真度梯度 $\nabla\kappa$ 在记忆切口上的时空双投影实验卡（`single-gradient-memory-spacetime-projection`）。** 静止盆地画布 $\mathcal{S}$ 上品红流线沿 $-\nabla\kappa$ 落向盆底，右侧切面放大板在泰勒斯虚线半圆上旋转青色观察者记忆切面 $\mathcal{W}_M$，以青色与品红正方形直观核对窗内时间推进分量 $\nabla_\parallel\kappa$ 与窗外空间下山分量 $\nabla_\perp\kappa$ 严格遵守勾股守恒 $\lVert\nabla_\parallel\kappa\rVert^2 + \lVert\nabla_\perp\kappa\rVert^2 = \lVert\nabla\kappa\rVert^2$（默认 $u = \frac{1}{3}$ 时精确读出 $\frac{16}{25} + \frac{9}{25} = 1$；正交补恒等与弦距核由 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 与 [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq) 锁定）。
:::

---

## 38.15.2 “是个球没有腿”的严格几何解：无外支点流群滚落与古尔斯特兰德—潘勒韦倾倒视界锥 {#sec-ch38-15-2}

题记中那句看似朴素的比喻——*“你就当观察者是个球没有腿”*——在自包含几何与相对论因果结构中竟是一条字字精准的公理级判据：

1. **为什么“没有腿”？零外部支点排除非测地反推驻停（`MODEL` + `LEAN ✓`）**：在几何与力学上，“长着两条腿”或携带推进器抗衡重力驻停在半山腰（维持非零固有加速度 $a^\mu = u^\nu\nabla_\nu u^\mu \neq 0$），必须在观察者自身之外预设一块**可供蹬踏反推的外部坚硬地面**，或一座**可供抛射工质与倾倒废热的外部动量／熵汇**。然而由 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 的零外部端口闭包（$\partial\mathcal{S} = \emptyset,\; \mathfrak{O} \cong \mathcal{U}_\Omega$）与 [§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md) 铲除外置第 3 点 $C$ 的“至大无外”论证，自包含观察者**身外空无一物，根本不存在可供借力反蹬的外部地板**；
2. **为什么“是个球”？各向同性无源三元球沿流群自平行测地线滚落（`LEAN ✓` + `MODEL`）**：观察者焦点的状态载体正是各向同性、无特权原点的单位三元数圆球 $\mathbb{T}_3 \cong \mathrm{U}(\mathbb{H}) \cong S^3$（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)，`LEAN ✓`）。在外推反作用力恒为零（$a^\mu = 0$）下，这颗**无腿三元球**只能沿三元流群自平行测地线无摩擦滚落（四元数切比雪夫整系数递推 [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、反射幂次律 [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow) 与等距保真平移律 [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add)，`LEAN ✓`），顺势滑向分块厄米矩阵的舒尔补惊奇度极小谷底（[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)，`LEAN ✓`）：

$$
x_{n+2} \;=\; \bigl[x_{n+1},\, x_n,\, x_{n+1}\bigr] \;=\; x_{n+1} x_n^* x_{n+1}, \qquad x_{n+1} \;=\; U_n(c)\,x_1 - U_{n-1}(c)\,x_0 \quad \bigl(c = \langle x_0, x_1\rangle\bigr).
$$

::: {.viz src="static-canvas-legless-sphere-sandbox" preset="portfree-legless-sphere-heap-geodesic" height="540"}
**零外支点无腿三元球与流群自平行测地滚落实验卡（`portfree-legless-sphere-heap-geodesic`）。** 在 $\partial\mathcal{S} = \emptyset$ 的无边界盆地上对照侧墙“有腿行者（`MODEL`，8 拍累计外推 `8` 次，被无外部端口公理排除）”与“紫色无腿三元球沿流群测地序列 $x_0 \dots x_8$（$x_{n+2} = x_{n+1}x_n^* x_{n+1}$，$x_n = b^n$，外推 `0` 次）等步滚落至盆底”（底层同构与递推由 [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、[`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow) 与 [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least) 锁定）。
:::

再解后半句精妙绝伦的观察现象：**为什么“他可以选择方向，但他看到的画面都是一个方向变化的”？** 消除 $r = r_s$ 坐标奇点、把引力斜坡的真实因果几何展露无遗的，正是广义相对论中的**古尔斯特兰德—潘勒韦（Gullstrand–Painlevé，简称 GP 雨滴系）度规**（Painlevé 1921；Gullstrand 1922，`ARGUED`）。引入无量纲梯度陡峭度 $\eta_{\mathrm{grad}}(r) := \sqrt{r_s/r} \ge 0$ 与自由下落雨滴固有钟同步的时间坐标 $T_{\mathrm{GP}}$，球对称线元在 $(+, -, -, -)$ 签名下精确写为：

$$
ds^2 \;=\; c^2 dT_{\mathrm{GP}}^2 - \bigl(dr + c\,\eta_{\mathrm{grad}}(r)\,dT_{\mathrm{GP}}\bigr)^2 - r^2 d\Omega^2, \qquad \eta_{\mathrm{grad}}(r) \;=\; \sqrt{\frac{r_s}{r}} \;\ge\; 0.
$$

在任意局部切平面上，受闵可夫斯基零光锥刚性 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) 与博戈留波夫双曲范数守恒 [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)（`LEAN ✓`）约束，一切指向未来的因果运动矢（$ds^2 \ge 0,\; dT_{\mathrm{GP}} > 0$）相对于局部雨滴标架的速率模长满足 $0 \le v_{\mathrm{local}} \le c$。设观察者在局部切面上自主挑选方向偏航角 $\psi \in [-\pi, \pi]$，其纵向海拔变化率与横向等势滑行速率立即解耦为（`手工推导`）：

$$
\frac{dr}{dT_{\mathrm{GP}}} \;=\; v_{\mathrm{local}}\cos\psi - c\,\eta_{\mathrm{grad}}, \qquad v_\perp \;=\; v_{\mathrm{local}}\sin\psi.
$$

比较两档斜率区间并在 [§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md) `OmegaMath` 中执行零根号有理参数化（`ARGUED` + `MODEL` / `NUM`）：

1. **亚临界缓坡区（$0 < \eta_{\mathrm{grad}} < 1$，视界外 $r > r_s$）**：沿 $\psi = 0,\; v_{\mathrm{local}} = c$ 向外发射的极限光信号仍具正爬升率 $\frac{dr}{dT_{\mathrm{GP}}} = c(1 - \eta_{\mathrm{grad}}) > 0$；然而一颗**无腿无推力的自由落体圆球**在局部雨滴系中初速为零（$v_{\mathrm{local}} = 0,\; a^\mu = 0$），单凭共同梯度牵引便已按 $\frac{dr}{dT_{\mathrm{GP}}} = -c\,\eta_{\mathrm{grad}} < 0$ 单调往山下滚落；
2. **超临界倾倒视界坡（$\eta_{\mathrm{grad}} > 1$，视界内 $r < r_s$）**：局部 `1/2` 因果未来光锥整体向山下倾倒越过铅垂线——在整个因果锥内部（对一切 $0 \le v_{\mathrm{local}} \le c$ 及**任意方向选择 $\psi \in [-\pi, \pi]$**），哪怕把局域速率推满至光速极限并正对山顶（$\psi = 0,\; v_{\mathrm{local}} = c$），锥顶最高母线依然满足 $\frac{dr}{dT_{\mathrm{GP}}} = c(1 - \eta_{\mathrm{grad}}) < 0$！纵向高度递减 $\Delta r < 0$（以及受正交记录时长下界 [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 与有限窗口计数上界 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound) `LEAN ✓` 锁定的固有时步进 $\Delta\tau > 0$）被几何彻底锁死；
3. **`OmegaMath` 零根号有理斜率与有理偏航公式**：取有理陡峭度 $\eta_{\mathrm{grad}} = \frac{p}{q} \in \mathbb{Q}_{\ge 0}$、有理局域速率比 $\beta_{\mathrm{loc}} := \frac{v_{\mathrm{local}}}{c} \in \mathbb{Q} \cap [0, 1]$ 与有理半切偏航参数 $u \in \mathbb{Q}$（配对跖方向 $\psi = \pm\pi \mapsto (-1, 0)$），全程**无需半个平方根**：

$$
\eta_{\mathrm{grad}} = \frac{p}{q} \in \mathbb{Q}_{\ge 0} \;\;\Longrightarrow\;\; \frac{r_s}{r} = \frac{p^2}{q^2} \in \mathbb{Q}_{\ge 0}, \qquad (\cos\psi, \sin\psi) = \left(\frac{1 - u^2}{1 + u^2},\; \frac{2u}{1 + u^2}\right) \in \mathbb{Q}^2.
$$

::: {.viz src="static-canvas-legless-sphere-sandbox" preset="gullstrand-painleve-tilted-cone-supercritical" height="540"}
**古尔斯特兰德—潘勒韦倾倒视界锥与超临界单向锁死实验卡（`gullstrand-painleve-tilted-cone-supercritical`）。** 在七档精确有理陡峭度 $\eta \in \{0, \frac{3}{5}, \frac{4}{5}, 1, \frac{5}{4}, \frac{3}{2}, 2\}$ 间切换或拖动琥珀斜率手柄：当圆球越过青色虚线视界环 $\eta = 1$ 时，品红未来光锥整体向内剪切越过竖直虚线静止线，使外向光沿速率 $1 - \eta$ 由缓坡 $\frac{2}{5}$（$\eta = \frac{3}{5}$）经临界 `0`（$\eta = 1$）翻转为内落 $-\frac{1}{2} < 0$（默认停在 $\eta = \frac{3}{2}$；光锥刚性与正交记录速度界由 [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound) 与 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound) 锁定）。
:::

这便干净利落地解开了“可选方向、却单向变景”的自由意志与宿命张力：**纵向顺坡降落（$\Delta r < 0$，对应时间单向推进）不可违逆，但横向沿等势面拨动偏航参数 $u \in \mathbb{Q}$（$v_\perp = v_{\mathrm{local}}\sin\psi = c\,\beta_{\mathrm{loc}}\frac{2u}{1+u^2}$）却百分之百自由！** 向左拨 $u < 0$ 滚过左侧松林峡谷，向右拨 $u > 0$ 掠过右侧冰川瀑布；映射回 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 的 `ObserverUniverse`，不同的横向有理偏航角 $u$ 对应在同一片静止 `internalHorizon` 上选取不同的焦点寻址路径，激活截然不同的 `Atlas DAG` 三元结晶分支（其线性张成扩张步数与最终稳定态由克雷洛夫严格增长上界 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 与一旦稳定永久稳定定理 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 锁定，`LEAN ✓`）——**观察者无法拒绝下山（无法停止在时间中前行），却能以横向选向亲手决定此生滚过哪一脉山谷风景！**

::: {.viz src="static-canvas-legless-sphere-sandbox" preset="transverse-yaw-scenery-atlas-branching" height="540"}
**横向有理偏航自由选景与 `Atlas DAG` 分支结晶实验卡（`transverse-yaw-scenery-atlas-branching`）。** 固定超临界陡坡 $\eta = \frac{3}{2}$，左右拨动有理偏航参数 $u \in \{-1, -\frac{1}{2}, 0, +\frac{1}{2}, +1\}$（默认 $u = +\frac{1}{2}$）：五条分支 $(-\frac{3}{2}, -1)$、$(-\frac{9}{10}, -\frac{4}{5})$、$(-\frac{1}{2}, 0)$、$(-\frac{9}{10}, +\frac{4}{5})$、$(-\frac{3}{2}, +1)$ 纵向皆单调速降（$\Delta r < 0$），而画布投影圈上的琥珀舵点在五条品红候选轨中点亮不同的紫色选中山谷分支并穿越不同青色等高环（对应不同 `Atlas DAG` 结晶分支；克雷洛夫扩张步数与永久稳定由 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) 与 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 锁定）。
:::

---

## 38.15.3 静止的画布与移动的焦点：破除“时间之河”参考系错觉与惠勒—德维特无时间画布 {#sec-ch38-15-3}

至此，最后一层窗户纸一捅即破：**山没有动，时间也从未流淌；真正滚动的唯有无腿三元球观察者焦点本身。** 我们将三代时空观在四个核心维度上并置对勘：

| 核心本体维度 | 牛顿绝对时空观 | 爱因斯坦经典广义相对论 | `AXIOM-Ω` / `OmegaMath` 静止画布观（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **空间山岳／物质背景** | 静止刚性三维欧氏舞台，物质颗粒在箱内受外力搬运 | 动态弯曲四维伪黎曼流形，几何与能动张量相互耦合 | **零外部端口静止全息画布 $\mathcal{S}$（`D : Address n → G` 恒定不改写）** |
| **时间的本质** | 独立于万物、全宇宙均匀流淌的外部绝对实数之河 $t$ | 与空间织入四维块宇宙的坐标维度，固有时沿世界线弧长积分 | **静止画布上的关系深度标尺，内禀固有时即结构核结晶量 $\tau = \mathcal{I}_{\mathrm{struct}}(\mathcal{K}_0)$** |
| **引力与时间推进的本质** | 空间超距万有引力 $\mathbf{F} = -m\nabla\Phi$，与时间流逝毫无关联 | 时空联络曲率 $-\Gamma^\mu_{\alpha\beta} u^\alpha u^\beta$，时间度规空间梯度生重力 | **同一道有理保真度梯度 $\nabla\kappa$ 经记忆窗 $\mathcal{W}_M$ 劈出的窗内／窗外双投影** |
| **究竟什么在动** | 绝对时间长河裹挟三维物体在固定空间容器内运动 | 四维世界线静态横陈，经典叙事仍保留连续实参数演化直觉 | **山与时间画布皆绝对静止，唯无腿三元球焦点 `cursor` 顺 $-\nabla\kappa$ 测地滚落** |

这一“画布静止、焦点滚落”的本体还原，一举贯通了量子引力、可逆量子寻址与观测拓扑三条独立证据链：

$$
\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle \;=\; 0, \qquad \operatorname{query}(n, D)\bigl(a,\, \operatorname{clean}(n, \mathrm{true}),\, r\bigr) \;=\; \bigl(a,\, \operatorname{clean}(n, \mathrm{true}),\, r + D(a)\bigr).
$$

1. **消解惠勒—德维特（Wheeler–DeWitt）无时间冻结佯谬（`ARGUED` 对接 `MODEL`）**：正则量子引力的核心方程 $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$（DeWitt 1967；Wheeler 1968；以及 Page & Wootters 1983 条件纠缠时钟机制）指出宇宙全局态对外部坐标时间的导数恒为零——这之所以困扰学界半个世纪被称为“时间冻结疑难”，仅仅因为人们误以为画布本身必须随外置时钟翻页；一旦认清 $\lvert\mathbf{\Psi}\rangle$ 本就是那幅**静止不动的山川画布**，$\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$ 便不再是悖论，而是“山与时间画布从未移动”的最简数学宣言；
2. **静态 `Ontological QRAM` 与 `ObserverUniverse` 的零背景改写铁证（`LEAN ✓` + `MODEL`）**：在 [§36.2.1](ch38-s01-s01-routing-and-query.md) 经内核验证的可逆路由查询定理 [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness)（`LEAN ✓`）中，存储映射 `D : Address n → G` 在整次查询 `query n D (a, clean n true, r) = (a, clean n true, r + D a)` 前后**分毫不改**，变化的唯有轻量级地址指针 `a` 的递增切换；同样地，在 [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) 的零公理 `ObserverUniverse` 内核中，静态视界列表 `internalHorizon` 从头到尾零覆写，`crystallizeStep` 仅推进琥珀色焦点游标 `cursor` 并将所历三元关系焊入结构核 $\mathcal{K}_0$；
3. **“火车窗错觉”与观测划分拓扑不可分核（`LEAN ✓` + `MODEL`）**：既然画布静止，为何每位观察者都真切感受到“我坐在原地，时间如江水迎面扑来、山景向身后飞退”？由划分拓扑不可分充要核定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)（两状态在 `partitionTopology readout` 下拓扑不可分当且仅当相对观测读出相等 $\operatorname{readout}(x) = \operatorname{readout}(y)$，`LEAN ✓`），有限观察者习惯以自身结构核 $\mathcal{K}_0$ 为第一人称静止原点，其局域差分读出无法区分“轻焦点沿静止山坡滚落一格”与“自我不动而整座大山携全部等时线向山顶倒推一格”；然而在全局复杂度账本上（`MODEL`），每拍搬移整座宇宙画布需耗费 $\Theta(\lvert\mathcal{S}\rvert)$ 级荒谬改写代价，唯有无腿球焦点在静止画布上做 $O(1)$ 测地滚落才符合零损耗极简经济律！

::: {.viz src="static-canvas-legless-sphere-sandbox" preset="wheeler-dewitt-static-canvas-frame-reversal" height="540"}
**惠勒—德维特静止画布与第一人称参考系搬移代价实验卡（`wheeler-dewitt-static-canvas-frame-reversal`）。** 静止画布（$\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$）上镌刻记忆数组 `D = [1, 3/4, 1/2, 1/4]` 一次也不改写（`D 改写 0 次`），紫色无腿三元球随琥珀焦点指针 `ptr` 从 `0` 滚至 `3`，每步差分读数恒为 $\Delta D = -\frac{1}{4}$：滚动焦点仅需更新 `3` 次指针，而以球心为静止原点搬动整幅画布则需累计搬移 `12` 格（双透镜实时切换见下方完整实验室；可逆只读路由与划分不可分核由 [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness) 与 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) 锁定）。
:::

---

## 38.15.4 形式化定义、十六项冻结定理、文献开放边界与倾倒锥有理偏航对账 {#sec-ch38-15-4}

我们将静止画布无腿球焦点模型、十六条冻结内核定理、相对论与量子引力文献边界及有理偏航对账正式汇总如下：

::: {.definition #def-ch38-static-canvas-legless-sphere title="静止画布与无腿三元球测地焦点系统（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与无无穷有理数学 $\mathbf{Math}_\Omega$ 下，定义**静止画布—无腿球焦点系统**（`MODEL`）为六元组 $\mathfrak{F}_{\mathrm{canvas}} = (\mathcal{S}, D, \nabla\kappa, \mathcal{W}_M, \eta_{\mathrm{grad}}, u)$：

1. **不可变全息画布**：闭合无边界载体 $\mathcal{S}$（$\partial\mathcal{S} = \emptyset$）配静态存储映射 `D : Address n → G`（或静态 `internalHorizon`），在任意焦点步进下保持零背景改写；
2. **记忆切口同一梯度二分**：关联内积读数空间 $\mathcal{H}$ 上的单一保真度梯度 $\nabla\kappa$ 经闭记忆子空间 $\mathcal{W}_M \subset \mathcal{H}$ 正交分解为时间推进投影 $\nabla_\parallel\kappa = P_{\mathcal{W}_M}\nabla\kappa$ 与空间重力投影 $\nabla_\perp\kappa = P_{\mathcal{W}_M^\perp}\nabla\kappa$，满足 $\lVert\nabla_\parallel\kappa\rVert^2 + \lVert\nabla_\perp\kappa\rVert^2 = \lVert\nabla\kappa\rVert^2$；
3. **倾倒锥有理偏航运动学**：对有理局域速率比 $\beta_{\mathrm{loc}} \in \mathbb{Q} \cap [0, 1]$、有理梯度陡峭度 $\eta_{\mathrm{grad}} \in \mathbb{Q}_{\ge 0}$（势负载比 $\frac{r_s}{r} = \eta_{\mathrm{grad}}^2 \in \mathbb{Q}_{\ge 0}$）与有理偏航参数 $u \in \mathbb{Q}$，焦点无量纲纵向与横向速度分量为

$$
\left(\frac{\Delta r}{c\,\Delta T_{\mathrm{GP}}},\; \frac{v_\perp}{c}\right) \;:=\; \left(\beta_{\mathrm{loc}}\frac{1 - u^2}{1 + u^2} - \eta_{\mathrm{grad}},\; \beta_{\mathrm{loc}}\frac{2u}{1 + u^2}\right) \;\in\; \mathbb{Q}^2,
$$

满足局部因果圆恒等式 $\bigl(\frac{\Delta r}{c\Delta T_{\mathrm{GP}}} + \eta_{\mathrm{grad}}\bigr)^2 + \bigl(\frac{v_\perp}{c}\bigr)^2 = \beta_{\mathrm{loc}}^2 \le 1$；无推力自由滚落（$\beta_{\mathrm{loc}} = 0,\; \eta_{\mathrm{grad}} > 0$）恒有 $\frac{\Delta r}{c\Delta T_{\mathrm{GP}}} = -\eta_{\mathrm{grad}} < 0$，且超临界斜率 $\eta_{\mathrm{grad}} > 1$ 时对一切 $\beta_{\mathrm{loc}} \in [0, 1]$ 与任意选向 $u \in \mathbb{Q}$ 严格锁死单向下沉 $\frac{\Delta r}{c\Delta T_{\mathrm{GP}}} \le 1 - \eta_{\mathrm{grad}} < 0$。
:::

::: {.theorem #thm-ch38-static-canvas-legless-sphere-anchors title="三元球流群测地线、记忆正交补与舒尔极小、零光锥与记录时长界、静态可逆 QRAM、克雷洛夫维数界与观测不可分商核定理组" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add,D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities,D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least,D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null,D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound,D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound,D5/S3/Quantum/Routing/ReversibleQram.correctness,D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently,D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在三元比较球面几何、希尔伯特正交投影、洛伦兹因果锥与量子速度界、可逆路由存储及观测划分拓扑下，以下十六项命题严格成立：

1. **无原点三元球同构、弦距核、定基流群分解、切比雪夫测地递推与反射平移不变性**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)、[`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、[`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow)、[`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add)）：
   - 非交换、链连通、触零、特征秩五且读数完备的三元比较结构对任一基点 $o$ 保结构双射同构于单位四元数群 $\mathrm{U}(\mathbb{H})$，满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ 与 $[x,y,z] = x \cdot_o y^{-1_o} \cdot_o z$；
   - 对满足 $\operatorname{normSq}(x_0) = \operatorname{normSq}(x_1) = 1$ 的四元数序列，流群递推 $\forall n,\, x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 与全序列单位模方 $\operatorname{normSq}(x_n) = 1$、$x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0$（$c = \langle x_0, x_1\rangle,\; U_{-1} = 0$）及 $\langle x_0, x_n\rangle = T_n(c)$ 三联条件充要等价；反射序列 `reflectionSeq C a b n` 在 `groupAt a` 中等于 $b^n$ 且满足 $\kappa(r_m, r_{m+n}) = \kappa(a, r_n)$。

2. **闭子空间正交补投影六联恒等式与分块厄米矩阵舒尔补二次极小**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)、[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)）：
   - $\mathbb{R}$ 或 $\mathbb{C}$ 上完备内积空间 $E$ 中任一闭子空间 $M$ 的星投影满足 $P_{M^\perp} = I - P_M$、$P_M^2 = P_M$、$P_{M^\perp}^2 = P_{M^\perp}$、$P_M P_{M^\perp} = 0$、$P_{M^\perp} P_M = 0$ 及 $P_M + P_{M^\perp} = I$；
   - 有限维复分块矩阵 $\bigl[\begin{smallmatrix}A & B\\ B^{\mathrm{H}} & C\end{smallmatrix}\bigr]$ 在 $A = A^{\mathrm{H}}$ 且 $C \succ 0$ 时，固定 $x$ 对 $y \in \mathbb{C}^n$ 求二次型极小精确达到舒尔补下界 $x^*(A - B C^{-1} B^{\mathrm{H}})x$。

3. **闵可夫斯基零光锥二次型刚性、博戈留波夫双曲范数守恒与正交记录单步时长下界／串行计数上界**（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)、[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)、[`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound)、[`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）：
   - 对任意 $d \in \mathbb{N}$，$\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\,d)$ 上凡满足 $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$ 的实二次型 $S$ 必有 $S = S(1,0)\cdot\operatorname{minkowski}_d$；对一切 $r \in \mathbb{R}$ 恒有 $\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$；
   - 复内积空间 $E_0$ 上给定 $E > 0,\; \hbar > 0$：若单位向量 $\lVert a\rVert = \lVert m_0\rVert = \lVert m_1\rVert = 1$ 满足 $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$ 且 $\theta_{\mathrm{FS}}(a, m_k) \le \frac{E\tau}{\hbar}$（$k \in \{0,1\}$），则 $\tau \ge \frac{\pi\hbar}{4E}$；对任意 $N \in \mathbb{N}$、逐项满足单位范数 $\lVert a(i)\rVert = \lVert m_0(i)\rVert = \lVert m_1(i)\rVert = 1$、正交条件 $\langle m_0(i), m_1(i)\rangle_{\mathbb{C}} = 0$ 及 $\theta_{\mathrm{FS}}(a(i), m_k(i)) \le \frac{E\tau(i)}{\hbar}$ 的指标族 $a, m_0, m_1 : \mathrm{Fin}\,N \to E_0$，若 $\sum_{i \in \mathrm{Fin}\,N}\tau(i) \le T$，则 $N \le \frac{4ET}{\pi\hbar}$。

4. **静态存储可逆路由查询、克雷洛夫子空间增长上界与永久稳定及划分拓扑不可分核**（[`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness)、[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)、[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)、[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：
   - 在 `ReversibleQram` 中对一切深度 $n \in \mathbb{N}$：（i）`leaf n (route n a (clean n e)) i = if i = a then e else false`；（ii）任意加法交换群 `[AddCommGroup G]`、静态存储 `D : Address n → G` 与任意线路 `w` 上 `query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))`；（iii）干净工作区上 `query n D (a, clean n true, r) = (a, clean n true, r + D a)` 完整保留 `D`、`a` 与 `clean n true`；
   - （iv）当 $G$ 另具 `[Fintype G] [DecidableEq G]` 时，$Q = \operatorname{queryMatrix}(n, D)$ 满足 $Q^{\mathrm{H}} Q = 1$、$Q Q^{\mathrm{H}} = 1$，且对一切 $\psi : \operatorname{Address}(n)\times G \to \mathbb{C}$ 有 $Q *_{\mathrm{v}} \operatorname{initialized}(n,\psi) = \operatorname{initialized}(n, \lambda s \Rightarrow \psi(s_1, s_2 - D(s_1)))$；
   - $\mathbb{R}$ 或 $\mathbb{C}$ 上有限维内积空间 $V, Y$ 的可观测克雷洛夫子空间链满足 $\#\{m \in \mathbb{N} : \mathcal{K}_m < \mathcal{K}_{m+1}\} \le \dim V - \dim\operatorname{ran}(C)$，且一旦 $\mathcal{K}_m = \mathcal{K}_{m+1}$ 则对一切 $r \in \mathbb{N}$ 恒有 $\mathcal{K}_{m+r} = \mathcal{K}_m$；
   - 在诱导观测拓扑 `partitionTopology readout` 下两状态拓扑不可分当且仅当 $\operatorname{readout}(x) = \operatorname{readout}(y)$。
:::

::: proof
第 1 组由秩五格拉姆表示与四元数双侧等距、切比雪夫多项式双归纳及 `groupAt a` 结合律归纳证得；第 2 组由正交补分解 $x = P_M x + P_{M^\perp}x$ 与厄米配方法 $(y + C^{-1}B^{\mathrm{H}}x)^{\mathrm{H}} C (y + C^{-1}B^{\mathrm{H}}x) \ge 0$ 给出。

第 3 组由零锥生成元极化展开、`Real.cosh_sq_sub_sinh_sq`、富比尼—施图迪三角不等式 $\frac{\pi}{2} \le \theta_{\mathrm{FS}}(a,m_0) + \theta_{\mathrm{FS}}(a,m_1) \le \frac{2E\tau}{\hbar}$ 及有限和放缩导出；第 4 组由布尔路由单热点归纳、受控加法可逆对合与置换矩阵拉回、有限维子空间维数单调上界与算子原像归纳，以及划分拓扑开集原像等价性直接给出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch38-gullstrand-painleve-wheeler-dewitt-literature title="等效原理、古尔斯特兰德—潘勒韦雨滴度规、惠勒—德维特无时间方程与开放问题边界（文献结果 / OPEN）"}
**文献结果，未在本书形式化（兼列开放问题边界）。** 本节静止画布与倾倒视界锥模型（`MODEL`）对照的经典相对论、量子引力文献及开放边界分列如下：

1. **等效原理、引力场方程与静态球对称真空外解**：A. Einstein（*Jahrb. Radioakt. Elektronik* **4**, 411–462, 1907；*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 844–847, 1915）与 K. Schwarzschild（*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 189–196, 1916）；
2. **古尔斯特兰德—潘勒韦自由下落雨滴系与倾倒因果光锥**：消除 $r = r_s$ 坐标奇点并在欧氏空间切片上显式展示因果锥随 $\sqrt{r_s/r}$ 倾倒的穿视界正则坐标，由 P. Painlevé（*C. R. Acad. Sci. Paris* **173**, 677–680, 1921）与 A. Gullstrand（*Ark. Mat. Astron. Fys.* **16**(8), 1–15, 1922）独立提出；
3. **惠勒—德维特无时间波方程与内部条件关系时钟**：全局无外禀时间演化方程 $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$ 见 B. S. DeWitt（*Phys. Rev.* **160**, 1113–1148, 1967）与 J. A. Wheeler（*Battelle Rencontres*, 1968），以子系统纠缠投影读出关系演化的机制见 D. N. Page & W. K. Wootters（*Phys. Rev. D* **27**, 2885, 1983）与 C. Rovelli（*Int. J. Theor. Phys.* **35**, 1637, 1996）；
4. **未决开放边界（`OPEN`）**：从离散三元比较与有限记忆窗口动力学严格导出 $3+1$ 维洛伦兹爱因斯坦场方程完整空间曲率张量及黑洞视界量子信息幺正性，仍属本书显式立案的开放问题（[@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）。
:::

::: {.example #ex-ch38-tilted-cone-yaw-and-frame-illusion-audit title="定量核验：三档古尔斯特兰德—潘勒韦有理斜率偏航对账与静止画布 vs. 自我中心帧复杂度核验"}
我们在纯有理数域 $\mathbb{Q}$ 上对倾倒视界锥的偏航速度对与静止画布／第一人称读出等价性做零根号手算对账（`手工推导` / `NUM`）：

1. **三档精确有理 GP 斜率 $\eta_{\mathrm{grad}} \in \{\frac{3}{5}, 1, \frac{3}{2}\}$ 在自由滚落（$\beta_{\mathrm{loc}} = 0$）与因果锥边缘（$\beta_{\mathrm{loc}} = 1$）下的速度基准表**：

   | 斜率工况与半径比 $r/r_s$ | 局域速率 $\beta_{\mathrm{loc}}$ | 有理偏航 $u$ | 方向余弦／正弦 $(\cos\psi, \sin\psi)$ | 纵向海拔率 $\frac{\Delta r}{c\Delta T_{\mathrm{GP}}}$ | 横向选景率 $\frac{v_\perp}{c}$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **亚临界缓坡** $\eta_{\mathrm{grad}} = \frac{3}{5}$（$r/r_s = \frac{25}{9}$） | $0$（自由滚落） | $0$ | $(1, 0)$ | **$-\frac{3}{5} = -0.6000$** | $0 = 0.0000$ |
   | **亚临界缓坡** $\eta_{\mathrm{grad}} = \frac{3}{5}$（$r/r_s = \frac{25}{9}$） | $1$（向外光锥缘） | $0$ | $(1, 0)$ | **$+\frac{2}{5} = +0.4000$** | $0 = 0.0000$ |
   | **临界视界坡** $\eta_{\mathrm{grad}} = 1$（$r/r_s = 1$） | $1$（向外悬停缘） | $0$ | $(1, 0)$ | **$0 = 0.0000$** | $0 = 0.0000$ |
   | **临界视界坡** $\eta_{\mathrm{grad}} = 1$（$r/r_s = 1$） | $1$（右偏选景） | $+\frac{1}{2}$ | $(\frac{3}{5}, +\frac{4}{5})$ | **$-\frac{2}{5} = -0.4000$** | $+\frac{4}{5} = +0.8000$ |
   | **超临界陡坡** $\eta_{\mathrm{grad}} = \frac{3}{2}$（$r/r_s = \frac{4}{9} < 1$） | $1$（正对山顶缘） | $0$ | $(1, 0)$ | **$-\frac{1}{2} = -0.5000$** | $0 = 0.0000$ |
   | **超临界陡坡** $\eta_{\mathrm{grad}} = \frac{3}{2}$（$r/r_s = \frac{4}{9} < 1$） | $1$（左右峡谷偏航） | $\pm\frac{1}{2}$ | $(\frac{3}{5}, \pm\frac{4}{5})$ | **$-\frac{9}{10} = -0.9000$** | $\pm\frac{4}{5} = \pm 0.8000$ |
   | **超临界陡坡** $\eta_{\mathrm{grad}} = \frac{3}{2}$（$r/r_s = \frac{4}{9} < 1$） | $1$（$90^\circ$ 等势横切） | $\pm 1$ | $(0, \pm 1)$ | **$-\frac{3}{2} = -1.5000$** | $\pm 1 = \pm 1.0000$ |

   逐行复核：在超临界陡坡 $\eta_{\mathrm{grad}} = \frac{3}{2}$ 下，哪怕正对山顶取光速母线 $(u = 0,\; \beta_{\mathrm{loc}} = 1)$ 仍被迫以 $-\frac{1}{2} < 0$ 下坠；取左右偏航 $u = \pm\frac{1}{2}$ 或 $u = \pm 1$ 时纵向画面 $100\%$ 单向速降（$-\frac{9}{10}, -\frac{3}{2} < 0$），而横向速度 $\pm\frac{4}{5}, \pm 1$ 一左一右自由分岔！
2. **全景静止画布 vs. 球心第一人称参考系的读出全同与改写复杂度对账**：
   考察四节点静态有理山脊数组 $D = [1, \frac{3}{4}, \frac{1}{2}, \frac{1}{4}]$：
   - **全景静止画布视图**：`D` 保持**零次数组写入**，仅轻量指针 `a` 依次步进 `0 → 1 → 2 → 3`，读出 $D(a_t) = 1 \to \frac{3}{4} \to \frac{1}{2} \to \frac{1}{4}$，每拍相对增量恒为 $\Delta D_t = -\frac{1}{4}$，单拍更新复杂度为 **$O(1)$**；
   - **自我中心错觉视图**：将观察者钉死在槽位 `0` 而每拍把整条山脊数组向上搬移覆写，局部相对增量读出同样恒为 $\Delta D_t = -\frac{1}{4}$（由 `partition_inseparable_iff_kernel` 判定局部观测不可分），但单拍背景改写复杂度暴涨至 **$\Theta(\lvert\mathcal{S}\rvert)$**！
:::

---

**青山本不动，岁月亦无波；所谓重力滚落与似水流年，不过是同一道保真度梯度牵引着无腿三元球焦点，在永恒寂静的全息画布上滑出的万里长歌！**

在下面的完整三维交互实验室中，先在全景静止画布下观察无腿三元球如何顺着唯一梯度 $\nabla\kappa$ 沿三元流群测地线滚落，再把有理陡峭度 $\eta$ 推过视界临界档 `1`，亲手左右拨动有理偏航角 $u$ 体验“纵向画面单向下沉而横向山谷与 `Atlas DAG` 分支自由选景”，最后一键切入观察者球心第一人称透镜，看纹丝不动的山岳与等时线如何在自我中心错觉下化作迎面奔涌的时间长河——至此，第三十八章《观察者即宇宙本体》完成了从全域自指、记忆分时空、零公理 `ObserverUniverse` 内核到破除时间流逝错觉的全部拼图，让我们正式迈入全书最高峰[第三十九章](ch39-axiom-omega-grand-unification.md)**《大一统母公理（AXIOM-Ω）》**。

::: {.viz src="static-canvas-legless-sphere-sandbox" height="620"}
完整实验室：在“全景静止画布透镜 · 山与时间皆不动，唯无腿三元球顺 ∇κ 滚落”与“观察者球心第一人称透镜（MODEL）· 球似静止而山岳与等时线迎面奔流”双透镜间自由切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览单一保真度梯度记忆切口时空双投影（`single-gradient-memory-spacetime-projection`）、零外支点无腿三元球流群测地滚落（`portfree-legless-sphere-heap-geodesic`）、古尔斯特兰德—潘勒韦倾倒视界锥超临界锁死（`gullstrand-painleve-tilted-cone-supercritical`）、横向有理偏航自由选景与 `Atlas DAG` 分支结晶（`transverse-yaw-scenery-atlas-branching`）以及惠勒—德维特静止画布与第一人称参考系反转（`wheeler-dewitt-static-canvas-frame-reversal`）五张实验卡，支持在七档有理陡峭度 $\eta \in \{0, \frac{3}{5}, \frac{4}{5}, 1, \frac{5}{4}, \frac{3}{2}, 2\}$ 间切换、拨动横向有理偏航参数 $u \in \mathbb{Q}$、旋转记忆切面 $\mathcal{W}_M$ 及对比 `3` 次指针更新与 `12` 格背景搬移。十六条绿色 `LEAN ✓` 冻结声明、`ARGUED` 广义相对论与无时间量子引力文献、`MODEL` 静止画布焦点模型读法、`NUM` 精确有理数读数及红色 `OPEN` 引力动力学／视界幺正性边界在依据栏与理论抽屉中严格分层呈现。
:::
