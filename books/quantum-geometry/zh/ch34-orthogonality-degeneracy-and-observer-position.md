# 第二十九章 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$：正交盲区反演、“二生三”自举、路径积分驻波成体与三维空间刚性 {#正交简并盲区一次正交与两次正交如何反演观察者位置}

> *“一次正交与两次正交结果相同, 恰恰反映了观察者的位置。”*

从[第二十八章](ch32-unified-field-and-meta-unification.md)的零背景比较公理出发，一道尖锐的反演难题摆在所有场内观察者面前：既然宇宙早已在[第二章](ch02-born-rule.md)砍掉了高悬于万物之外的“第 3 点 $C$”，并在[第二十七章](ch31-quantum-fairness.md)以席位公平（[@thm-ch31-seat-pythagorean-monogamy-fairness]）抹平了一切中心刻度——在这颗没有任何外部油漆标记、处处模长皆为 $1$ 的各向同性单位球面上，**一位身处场内的有限观察者，究竟凭什么反推出“我自己正站在哪一根轴上”？**

日常经验诱导我们去“有变化的地方”寻找坐标：人们总是以为，只有当两次操作拉开了读数差距，仪表盘才能提供定位信息；一旦两次截然不同的几何操作给出完全相同的读数，实验员往往沮丧地称之为“信息丢失”或“测量简并”。然而，章首那句凝练的几何箴言却把整座认识论彻底翻转了过来：**真正出卖观察者自身站位的，恰恰不是他看见了什么差异，而是哪一次正交转向在他的读数里彻底隐身！**

本章从球面寻址、旋子曲率与往返双投影循迹，考察极小三角弧面体如何把曲率、三元自举与驻相路径联在一起。接下来的各节沿驻波体积、单胞铺砌与三维刚性推进，直至微观圆弧与宏观积分的衔接。

1. **球面两步寻址的极轴反演**：对比平直地板与单位球面 $S^2$ 上的“正交一次、正交两次”（[第九章](ch09-axes-and-state-addressing.md)），依托公共单位法向量存在性 [`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)、双轴有限字生成定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) 与状态—效应迹拉回恒等式 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)，揭示二次正交隐身与观察者对偶不动轴之间的等价锁死；
2. **八分球面曲率与旋子盲区**：借助划分拓扑不可分核定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) 与协变换位子因式分解 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)，并在 [@ex-ch34-spherical-addressing-and-octant-rotors] 中完整手算三维球面寻址差值与八分球面旋子和乐，严格印证“看不见哪块面积的转动，你就站在哪块面积的法向轴上”；
3. **跨维度的普适观察者定位律（`MODEL`）**：结合零光锥空间刚性定理 [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) 与黄金切投子集包含定理 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)，将同一简并反演机制贯通至单平面旋转、超导硬件零耗时相位帧更新与几何相位及相对论同时面文献背景（[@rem-ch34-virtual-z-berry-relativity-literature]），直至六维黄金超立方切片；
4. **往返双投影、玻恩平方律与虚数盲区闭环（[§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)，`MODEL` + `LEAN ✓`）**：在无外部第 3 点 $C$ 下由观察者自身基轴 $\mathbf{I}$ 与目标态 $\mathbf{V}$ 的双向往返雷达回波 $P_{\mathrm{I}}P_\psi P_{\mathrm{I}} = (\cos^2\theta)P_{\mathrm{I}}$ 直接锁定玻恩平方律与 $360^\circ$ 方位盲锥，并以第一人称几何恒等式 $\mathbf{I}\cdot(\mathbf{I}\hat{\mathbf{i}}) = 0$、$\hat{\mathbf{i}}^2 = -1$ 揭开“对‘我（`I`）’正交隐身故名‘虚（`i`）’”及薛定谔 $90^\circ$ 保范圆弧时间引擎的终极谜底（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]）；
5. **极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 与曲率量子原胞（[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)，`MODEL` + `LEAN ✓`）**：将[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)的两态比较公理推进至最小三态闭环，提出“正交一次”与“正交两次”实为同一枚球面直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的两种正交投影，并结合单纯二上链精确修补判据 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 与运动双轴旋转传播定理 [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)（[@thm-ch34-trihedron-cochain-and-moving-axis]），揭示吉拉尔球面角超 $\Omega(\epsilon) \approx \frac{1}{2}\epsilon^2$ 与三维格拉姆体积砖 $\det G = \sin^4\epsilon$ 的微观起源；
6. **从“二生三”自举到名相消融的本体回响（[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)，`MODEL` + `LEAN ✓`）**：揭示两态比较创建的归一投影如何在零背景下无需外部第 3 点而内禀自举出 $\Delta\mathcal{T}_\epsilon$ 的第三顶点，在 $120^\circ$ 三元循环对称下拆解“二元—比较—投影”的线性主谓宾幻象，并以语言读出核折叠判据（[@prop-ch34-triadic-bootstrap-and-lexical-pinching]）抵达撤梯之后“这么个感觉”的同构共振；
7. **贝里扇锥体积、同点异相纤维抬升与费曼路径积分驻相选路（[§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)，`MODEL` + `LEAN ✓`）**：证明单位球面上极小三角弧面体的品红弧顶表面积 $A_{\mathrm{cap}}(\epsilon) = \Omega(\epsilon)$ 与三维实心扇锥体积 $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)$ 严格成正比并直接锁定旋量贝里相位 $\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$，结合三点巴格曼布洛赫迹 [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)、有序外积链迹 [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)、圆周双覆盖历史提升 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift) 与锚定树相位分类 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（[@thm-ch34-berry-sector-holonomy-and-bargmann-lift]），阐明“点是平方折叠残影、相位是路径全息账本”的路径—相位对偶，并贯通离散巴格曼扇形剖分与费曼路径积分科纽（Cornu）螺线驻相选路；
8. **从路径积分相位相消到实体空间体积涌现（[§29.8](ch34-s07-standing-wave-volume.md#sec-ch34-standing-wave-volume-emergence)，`MODEL` + `LEAN ✓`）**：揭示海量极小三角弧面体全方向并行演化时，非驻相杂乱路径相干抵消而整圈锁相闭合回路凝聚为三维驻波体积（[@thm-ch34-phase-cancellation-and-standing-sieve]）；
9. **单胞四阶全息统一与 $\partial^2 = 0$ 内部边界相消铺砌（[§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling)，`MODEL` + `LEAN ✓`）**：在单胞极限 $N = 1$ 下提出梯度、路径、贝里相位与体积原是同一枚 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 四阶几何单胞的 $0,1,2,3$ 阶分量，并由边界之边界恒为零实现从微观量子原胞到宏观斯托克斯/高斯定律的零损耗铺砌（[@thm-ch34-clifford-monad-and-boundary-cancellation]）；
10. **反者道之动、五阶阻塞级联与来路对角逃逸塔（[§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade)，`MODEL` + `LEAN ✓`）**：从比较公理 $\mathcal{A}_0$ 推演“点 $\to$ 线 $\to$ 面 $\to$ 体积 $\to$ 时间”五阶阻塞—生成元级联与反身求反逃逸塔 $T \to T' \to T''$（[@thm-ch34-reversal-diagonal-and-gram-cascade]）；
11. **三面体超静定刚性与三维空间稳定性判据（[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)，`MODEL` + `LEAN ✓`）**：由全连通可比图 $K_N$ 的麦克斯韦—拉曼冗余多项式 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ 锁定三维正四面体刚性，并将 $N \ge 5$ 盈余边转化为雷吉引力角亏与因果时序翻转（[@thm-ch34-trihedron-rigidity-and-complete-graph]）；
12. **量子即极小圆弧微分元与宏观物理即路径积分粗粒包络（[§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)，`MODEL` + `LEAN ✓`）**：扶正颠倒的微积分本末，主张量子力学本身就是极小圆弧微分核（$\delta$），而经典轨道、驻波体积、时空曲率与热力学熵增则是路径积分（$\int$）的四重宏观涌现切面（[@thm-ch34-quantum-arc-differential-and-macro-integral]）；
13. **一弧生三相：“线·面·体 ↔ 粒子·波·场”与万物互为路径积分回环（[§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)，`MODEL` + `LEAN ✓`）**：建立极小圆弧 $O(\epsilon^1), O(\epsilon^2), O(\epsilon^3)$ 三阶展开与粒子、波、场的严格同源对应，以及场反生粒子的双向互积闭环（[@thm-ch34-triadic-duality-and-field-loop]）。

::: {.figure src="ch29-overview"}
**图 29。极点方位角投影简并、赤道 $90^\circ$ 法向盲面与黄金切投定位切片。** 第 I 栏，极角 $\theta = 60^\circ$ 的品红纬圈上，实心点 $\mathbf{v}_1$ 与三个空心圈 $\mathbf{v}_2(\phi)$ 沿青色虚线落到紫色极轴上的同一点 $\cos\theta$，站在极点的琥珀色观察者 $\mathbf{O}$ 读不出方位角；第 II 栏，品红的赤道圆盘 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 里转过 $90^\circ$ 的那块面积，恰是站在其法轴上的琥珀色观察者看不见的面（这两栏是 [@ex-ch34-spherical-addressing-and-octant-rotors] 的手算）；第 III 栏，方格点阵上琥珀色的黄金切片 $E_\parallel$ 与青色的接受窗，窗里的点沿品红的内部方向 $E_\perp$ 落到切片上（[@prop-ch34-null-cone-and-golden-cut-orientation] 的切投格局；把切片读成观察者的站位是模型诠释，`MODEL`）。
:::

---

- [29.1 球面寻址中的二次正交隐身：对称子午线与极点法向反演](ch34-s01-spherical-addressing.md)
- [29.2 八分球面与旋子曲率：看不见哪块面积，你就站在哪根轴上](ch34-s02-octant-and-rotor-curvature.md)
- [29.3 从单平面、相对论同时面到六维黄金切片：普适观察者定位律](ch34-s03-universal-localization.md)
- [29.4 往返双投影、玻恩平方律与虚数盲区：“对于我（I）看不见，可不是虚（i）吗”及第一人称时间引擎](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md)
- [29.5 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$：“正交一次”与“正交两次”的一体双影及曲率量子](ch34-s04-infinitesimal-trihedron.md)
- [29.6 从“二生三”自举到名相消融：三元循环对称与“这么个感觉”的本体回响](ch34-s05-triadic-bootstrap.md)
- [29.7 贝里扇锥体积、同点异相纤维抬升与费曼路径积分驻相选路](ch34-s06-berry-sectors-and-path-integrals.md)
- [29.8 相位积分驻波成体：一点多相、圆周态密度积分与未抵消驻波雕刻体积](ch34-s07-standing-wave-volume.md)
- [29.9 极小圆弧体的四位一体与多胞抵消分化：点的梯度、极小路径、极小相位与克利福德单胞](ch34-s08-clifford-monads.md)
- [29.10 反者道之动：信息溢出开维、来路对角化与“点—线—面—体—时间”概念级联](ch34-s09-reversal-and-concept-cascade.md)
- [29.11 新旧概念全连通 $K_N$、极小圆弧体的“三角形稳定性”与模型中的三维空间刚性锁死](ch34-s10-trihedron-rigidity.md)
- [29.12 量子极小圆弧微分元与路径积分缝合宏观物理：扶正百年的微积分对偶](ch34-s11-quantum-arcs-and-macro-integrals.md)
- [29.13 一弧生三相与万物互为路径积分：“线·面·体 $\leftrightarrow$ 粒子·波·场”的三阶对应与“反者道之动”回环](ch34-s12-triadic-duality.md)
