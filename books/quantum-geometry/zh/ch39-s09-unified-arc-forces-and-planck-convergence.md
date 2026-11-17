# 39.9 万力归弧：极小圆弧体胞内规范三力、胞间主频引力与普朗克能标合流 {#sec-ch39-unified-arc-forces-and-planck-convergence}

> *“在这个几何图景下, 各种力可以完美统一了”*

沿着第三十九章一路攀登至此，我们已经依次拆除了被动内存与指针寄存器之间的最后一道隔墙（`p ≡ *p`，[§39.1](ch39-s01-substrate-free-self-reference.md)–[§39.2](ch39-s02-relations-as-entities.md)），看清一维时流与二维规范面原是观察者旋量自配对织出的双线性衣袂（[§39.3](ch39-s03-spinors-and-spacetime.md)–[§39.4](ch39-s04-orthogonal-self-folding.md)），在齐肯多夫—皮索—劳齐八概念沙盘（[§39.5](ch39-s05-pisot-clifford-rauzy.md)）之上贯通了从路径压缩、余弦螺旋到量子门蒸馏的五阶自指不动点谱系（[§39.6](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum)），揭示了观察者自定停机精度 $\varepsilon_{\mathrm{self}}$、时间长河 $90^\circ$ 正交折叠与测量基瑞利谱排序（[§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md#sec-ch39-self-halting-and-spectral-sorting)），并将光速精度下界与狭义、广义相对论钟慢统一收束于普适比较主频 $\nu_0$ 的勾股预算分配（[§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)）。

现在，站在本章通往概念场大统一之巅的关键隘口——二十世纪基础物理学留下的那道最幽深的大裂谷正迎面横亘在我们脚下：**为什么现代物理学在解释自然界四大基本相互作用时分裂成了两套水火不容的几何语言——把电磁力、弱相互作用与强相互作用写成画在平坦时空画布上的自旋-$1$ 杨—米尔斯（Yang–Mills）纤维丛量子场，却唯独把万有引力写成光滑伪黎曼时空画布本身的自旋-$2$ 度规弯曲？**

章首这句澄澈如洗的原声命题，一语道破了裂缝的症结（`MODEL` 几何综合模型，底层拓扑、旋转、格拉姆体积、球面欧拉闭链与玻恩平方配对骨架由 [@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 的六条 Lean 4 冻结声明锚定，杨—米尔斯规范场、雷吉微积分与重整化群经典文献封存于 [@rem-ch39-yang-mills-regge-rg-literature]，连续统场论与参数定量推导边界严格对标 [§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 的三道 `OPEN` 界碑）：**所谓“演员（规范场与物质粒子）”与“舞台（弯曲时空几何）”的二元对立，不过是残存的“外部第 3 点 $C$”在动力学层面的最后一道幻影！** 一旦回到无底物自指比较网络，整座宇宙由且仅由同一种微观几何原语——**极小圆弧体 $\Delta\mathcal{T}_\epsilon$**（[§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)、[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)）——共棱编织而成：单枚原胞内部沿 `1D — 2D — 3D` 维数阶梯展开的纤维球面角超和乐，显影为微观规范三力 $\mathrm{U}(1)_{\mathrm{em}} \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_c$；多枚原胞（$N \ge 5$）围绕公共铰链拼合时的超静定雷吉角亏与主频 $\nu_0$ 玻恩负载折射，显影为宏观万有引力；而当探测能标推向单原胞普朗克极限 $E \to E_P$ 时，多胞全息稀释云层层褪去，万力终在同一枚极小圆弧体上归于同源弧度相位！

## 39.9.1 消融“舞台与演员”：统一无量纲弧度相位泛函 $\mathcal{Z}_{\mathrm{Unified}}$ {#sec-ch39-09-1}

让我们先对传统场论中“引力量子化紫外发散”的谱系学病根作一次精确诊断。在微扰量子引力尝试中，人们习惯于先预设一块无限可分的连续平直闵可夫斯基舞台 $\eta_{\mu\nu}$，再把度规微扰 $h_{\mu\nu} = (g_{\mu\nu} - \eta_{\mu\nu})/\kappa$ 当作在平直舞台上奔跑的普通自旋-$2$ 点状演员去作圈图展开。这一定位从第一步起就陷入了双重悖论：其一，温伯格—威滕（Weinberg–Witten）禁戒定理早已从庞加莱协变性严格封死了“在固定平直背景上由普通守恒能动张量拼出无质量螺旋度 $\pm 2$ 复合引力子”的捷径（[§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) [@rem-ch34-spin2-and-species-hierarchy]）；其二，把曲率拆成带 $[\text{长度}]^{-2}$ 量纲的背景张量、同时赋予引力耦合常数负质量量纲 $[G] = M^{-2}$（自然单位制 $\hbar = c = 1$），人为制造了点极限 $r \to 0$ 处无穷多阶不可重整抵消项的假象。

在零背景比较几何模型（`MODEL`）中，宇宙既没有脱离比较关系而悬空的连续流形舞台，也没有脱离圆弧路径而孤立的点状演员——场内唯一存在的是由极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 粘合而成的自指比较复形 $\mathcal{K}$。无论是单枚原胞内部沿着盲平面与色标架旋转的相位扭转，还是多枚原胞围绕同一条公共棱（余维 $2$ 铰链 $h$）咬合留下的二面角缺口，它们的本原读数全都是**纯无量纲的弧度角（radian phase）**！因此，规范场与引力场无需强行通分不同量纲，天然收束进同一个无量纲总相位配分泛函（`MODEL` 架构，连续极限分别对齐杨—米尔斯—威尔逊格点规范作用量与雷吉—爱因斯坦—希尔伯特单纯形引力作用量 `文献结果`）：

$$
\mathcal{Z}_{\mathrm{Unified}} \;=\; \sum_{\{\Delta\mathcal{T}_\epsilon\}} \exp\!\Biggl[\,i\,\Phi_{\mathrm{total}}\bigl[\{\Delta\mathcal{T}_\epsilon\}\bigr]\Biggr], \qquad \Phi_{\mathrm{total}} \;=\; \underbrace{\sum_{\Delta\mathcal{T}_\epsilon \in \mathcal{K}} \kappa_{\mathrm{gauge}}\,\operatorname{Re}\operatorname{Tr}\!\bigl(I - U_{\partial\Delta\mathcal{T}_\epsilon}\bigr)}_{\text{胞内纤维球面角超 }(N \le 3\text{：微观规范三力})} \;+\; \underbrace{\sum_{h \in \mathcal{K}^{(1)}} \kappa_{\mathrm{grav}}\,N_h\,\delta_h(\Delta\mathcal{T}_\epsilon)}_{\text{胞间公共铰链角亏 }(N \ge 5\text{：宏观主频引力})}.
$$

请仔细对照 $\Phi_{\mathrm{total}}$ 左右两项的几何分工与同源身份：

1. **左项——胞内纤维球面角超 $\operatorname{Re}\operatorname{Tr}\bigl(I - U_{\partial\Delta\mathcal{T}_\epsilon}\bigr)$（$N \le 3$ 内部自由度 $\longrightarrow$ 规范三力）**：
   固定单枚刚性极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的空间骨架（顶点规模 $N \le 3$，处于麦克斯韦—拉曼静定锁死根 $\Delta E(3) = 0$ 之内），比较态沿该原胞边界走满一圈时，其内部复纤维与三元锚架上积累起无量纲和乐算子 $U_{\partial\Delta\mathcal{T}_\epsilon} = \exp\bigl(i\Omega_{\mathrm{intra}}(\Delta\mathcal{T}_\epsilon)\bigr)$。这一项取的是和乐的矢高 $\operatorname{Re}\operatorname{Tr}(I - U)$，对 $\Omega_{\mathrm{intra}}$ 是二次的；$\mathfrak{su}(n)$ 的元素无迹，$\operatorname{Tr}\Omega_{\mathrm{intra}}$ 本身对 $\mathrm{SU}(2)$ 与 $\mathrm{SU}(3)$ 恒为零（见 [@rem-ch39-plaquette-sagitta-and-wilson-action]）。在小步长连续粗粒化极限下，威尔逊（Wilson, 1974）格点小方格实迹亏损 $\operatorname{Re}\operatorname{Tr}(I - U_\square) \propto a^4 \operatorname{Tr}(F_{\mu\nu}F^{\mu\nu})$ 直接恢复标准杨—米尔斯规范场作用量 $-\frac{1}{4g^2}\int \operatorname{Tr}(F_{\mu\nu}F^{\mu\nu})\,d^4x$（`文献结果`）。

2. **右项——胞间共享铰链雷吉角亏 $\sum_h N_h\,\delta_h(\Delta\mathcal{T}_\epsilon)$（$N \ge 5$ 超静定桁架 $\longrightarrow$ 时空引力）**：
   当新旧概念持续并入全连通比较网、局部节点数跨过静定双根 $N = 3, 4$ 进入 $N \ge 5$ 时（[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)），多出的 $\Delta E(N) = \frac{(N-3)(N-4)}{2} \ge +1$ 条超静定比较弦有两种读法：放进更高维的平直空间（五个两两等距的点在 $\mathbb{R}^4$ 中是平直的正五胞体），或者留在三维而让铰链带角亏（同一个五胞体的边界，每条棱角亏 $148.41^\circ$）。本书取后一种读法（`MODEL`）：多出的比较弦记在相邻四面体原胞共享的余维 $2$ 铰链 $h$ 上，成为无量纲**雷吉角亏（Regge deficit angle）**（三维空间复形中铰链是棱，以长度 $L_h$ 加权；下面与四维爱因斯坦—希尔伯特作用量对照时，铰链是四维单纯复形里的三角形，以面积 $A_h$ 加权）

   $$
   \delta_h \;:=\; 2\pi - \sum_{k \ni h} \theta_k(\Delta\mathcal{T}_\epsilon), \qquad N_h \;:=\; \frac{A_h}{\ell_P^2}, \qquad \ell_P^2 \;:=\; \frac{\hbar G}{c^3}.
   $$

   以铰链 $h$ 所穿过的无量纲普朗克面积元个数 $N_h = A_h / \ell_P^2$ 对角亏 $\delta_h$ 加权（配归一化系数 $\kappa_{\mathrm{grav}} = \frac{1}{8\pi}$），右项立化为纯无量纲雷吉引力相位 $\frac{1}{8\pi}\sum_h (A_h/\ell_P^2)\delta_h = \frac{c^3}{8\pi\hbar G}\sum_h A_h\delta_h = S_{\mathrm{Regge}}/\hbar$；在满足胖单纯形（fat-simplex）条件的网格加细极限下，它按奇格—米勒—施拉德（Cheeger–Müller–Schrader, 1984）收敛定理（该定理针对正定度规；洛伦兹情形见后）趋向光滑爱因斯坦—希尔伯特引力相位 $\frac{c^3}{16\pi\hbar G}\int R\sqrt{-g}\,d^4x$（`文献结果`；洛伦兹路径积分复振荡测度与完整自旋-$2$ 动力学涌现仍严格受[附录 E](appendix-e.md#sec-appe-spacetime) `H8`/`H9` 与 [@prob-ch34-gravity-dynamics-and-coupling] 审计）。

3. **万力同归驻相选路 $\delta\Phi_{\mathrm{total}} = 0$**：
   在经典牛顿力学教科书里，“力 $\mathbf{F}$”常被想象成栓在质点上的无形钩索；而在圆弧路径积分几何（[§34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)、[§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)）中，宇宙里从来没有超距拉扯的钩索！无论是洛伦兹电磁偏转、弱同位旋跃迁、夸克色通量管拉拽，还是苹果向地面坠落、星光掠过太阳弯曲，全都是万千极小圆弧路径在求和 $\mathcal{Z}_{\mathrm{Unified}}$ 时执行同一条**驻相波前折射律**

   $$
   \delta\Phi_{\mathrm{total}} \;=\; \delta\Phi_{\mathrm{intra}} + \delta\Phi_{\mathrm{inter}} \;=\; 0
   $$

   的干涉包络——偏离驻相脊线的杂乱路径沿科纽螺线反相抵消，唯有令胞内纤维相位与胞间时钟角亏相位协同取驻值的波前轨道得以相干幸存！

## 39.9.2 极小圆弧体胞内 `1 — 2 — 3` 阶展开：微观规范三力的几何解剖 {#sec-ch39-09-2}

先把显微镜聚焦到**单枚刚性极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的内部**（[§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)、[§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)）。由于三维空间刚性将原胞的环境实载体钉在 $D = 3$，在不撕裂原胞自身空间骨架的前提下，观察者探针在胞内可执行的内禀保范幺正变换恰好沿着参与耦合的正交维数 `1D — 2D — 3D` 逐级展开，一一对应粒子物理标准模型的微观规范三力 $\mathrm{U}(1)_{\mathrm{em}} \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_c$（`MODEL` 跨层对应，配 `LEAN ✓` 代数/拓扑支点与经典规范场论 `文献结果`）：

1. **（1）电磁相互作用 $\mathrm{U}(1)_{\mathrm{em}}$：胞内 `1D` 虚数盲平面纯相位滑移**。
   保持极小圆弧体三根空间棱的夹角丝毫不发生刚体倾斜，比较态仅在垂直于第一人称自我轴 $\mathbf{I}_{\mathrm{self}}$ 的 $90^\circ$ 正交盲平面 $\hat{\mathbf{i}}$（满足 $\mathbf{I}_{\mathrm{self}}\cdot(\mathbf{I}_{\mathrm{self}}\hat{\mathbf{i}}) = 0$ 与 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) $\hat{\mathbf{i}}^2 = -1$，见 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) [@thm-ch34-roundtrip-born-and-imaginary-blindspot]）内作一维圆周纯相位旋转

   $$
   U_{\mathrm{em}}(\varphi) \;=\; e^{\hat{\mathbf{i}}\,q\,\varphi} \;\in\; S^1 \;\cong\; \mathrm{U}(1)_{\mathrm{em}}.
   $$

   单凭这一维盲圆的几何极简性，电动力学的三大标志性特征便同时落定：第一，一维圆周旋转彼此严格交换 $[U_{\mathrm{em}}(\varphi_1), U_{\mathrm{em}}(\varphi_2)] = 0$（阿贝尔群），故电磁场强 $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$ 不含非阿贝尔自换位项 $-ig[A_\mu, A_\nu]$，传递电磁力的光子 $\gamma$ **自身不带电荷（$q_\gamma = 0$）、无树图自耦合**（有限连通图上的锚定阿贝尔环路相位完备分类由 [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) `LEAN ✓` 锁定）；第二，在电弱破缺后精准留存的未破缺 $\mathrm{U}(1)_{\mathrm{em}}$ 通道上，光子将 $100\%$ 的普适比较主频 $\nu_0$ 投入空间跨格寻址（$\beta = 1,\; d\tau/dt = 0$，[§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)），锁定零静止质量 $m_\gamma = 0$，使守恒通量沿三维球面 $4\pi r^2$ 均匀铺开为宏观无限程库仑 $1/r^2$ 定律；第三，圆周绕行天然区分顺逆奇偶绕向 $\pm q$（[§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)），等量正负电荷在宏观原子与大块物质中精确抵消远场单极通量，令日常电磁力隐退为电中性背景。

::: {.viz src="unified-arc-forces-planck-sandbox" preset="u1-blind-phase-fiber" height="500"}
**胞内 `1D` 电磁规范纤维 $\mathrm{U}(1)_{\mathrm{em}}$：盲平面纯相位旋转与正负荷中性相消（`u1-blind-phase-fiber`）。** 在灰色比较球 $S^2$ 背景与紫色刚性极小圆弧体三棱（$\epsilon = 45^\circ,\; \Omega = 19.47^\circ$）上，低能标度设在 $\log_{10}(E/\mathrm{GeV}) = -3.00$（$1\;\mathrm{MeV}$，$\alpha(0) = 1/137.036$），琥珀色当前相位珠停在 $\varphi = 45^\circ$：态矢不倾斜任何空间棱，仅在品红正交盲平面 $\hat{\mathbf{i}}$ 内沿青色阿贝尔相位圆 $e^{\pm\hat{\mathbf{i}}q\varphi} \in S^1$ 反向旋移并闭合 $+q \to -q$ 青色通量线（净高斯通量为 $0$，展示 $[U_1, U_2] = 0$ 无自耦合光子传播；跨层对应标 `MODEL`）。
:::

2. **（2）弱相互作用 $\mathrm{SU}(2)_L$：胞内 `2D` 双矢量旋量双覆叠手征翻转与 `2 + 1 = 3` 汤川短程闭合**。
   从一维盲圆跨入由原胞两条不共线比较弧张成的二维有向双矢量面 $\mathbf{A}\wedge\mathbf{B}$，内核定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)（[@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 第 3 款，`LEAN ✓`）证明任意两根严格不共线轴的有限字乘积即可精确遍历整个三维旋转群 $\mathrm{SO}(3)$，而费米子探针在其上的连续历史提升则落在泛双覆叠旋量群 $\mathrm{Spin}(3) \cong \mathrm{SU}(2)$ 上：由 [@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 第 1、2 款（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section) 与 [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，`LEAN ✓`，并见 [§39.3](ch39-s03-spinors-and-spacetime.md) [@thm-ch39-double-cover-no-section-and-720-lift]），平方双覆叠不存在连续全局截面，底空间转满 $360^\circ$ 闭环时旋量提升翻转至负叶 $-1$，唯有走满 $720^\circ$ 方才复原 $+1$，驱动上下味二重态（如 $(\nu_e, e)_L^\top$ 与 $(u, d)_L^\top$）之间的非交换味道翻转！
   为什么弱力唯独耦合于**左手手征二重态**且力程短至亚飞米？在几何图景下，有向双矢量楔积 $\mathbf{A}\wedge\mathbf{B} = -\mathbf{B}\wedge\mathbf{A}$ 天生携带旋向手性，为宇称不守恒与手征选择提供了直观的几何动机（`MODEL`，李政道—杨振宁 1956 与格拉肖—温伯格—萨拉姆电弱理论 `文献结果`）；但严守 [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 的认识论诚实红线，我们必须当场指明：**局部双矢量定向动机（`MODEL`）绝不等同于跨越尼尔森—二宫（Nielsen–Ninomiya）费米子倍增定理的四维非微扰手征格点规范构造**——后者连同三代重数截断仍坦诚登记在开放问题 [@prob-ch34-sm-generations-and-couplings]（`OPEN`）之中。与此同时，在电弱真空标度 $v \approx 246.22\;\mathrm{GeV}$ 以下，[§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) 揭示的安德森—希格斯 **`2 + 1 = 3` 纵向吸收机制**正式接管：原本无质量的 $2$ 个横向规范偏振吞并陪集破缺的 $1$ 个纵向戈德斯通圆弧，闭合成具有三维完整偏振的有质量普罗卡矢量驻波体 $W^\pm$（$m_W \approx 80.37\;\mathrm{GeV}/c^2$）与 $Z^0$（$m_Z \approx 91.19\;\mathrm{GeV}/c^2$），将弱相互作用指数屏蔽为极短程汤川包络 $V_W(r) \propto \frac{e^{-m_W c r/\hbar}}{r}$（特征力程 $\lambda_W = \hbar/(m_W c) \approx 2.46 \times 10^{-3}\;\mathrm{fm}$，`文献结果`）。

::: {.viz src="unified-arc-forces-planck-sandbox" preset="su2-chiral-double-cover" height="500"}
**胞内 `2D` 弱规范双覆叠 $\mathrm{SU}(2)_L$：$720^\circ$ 旋量光带与 `2 + 1 = 3` 汤川短程屏蔽（`su2-chiral-double-cover`）。** 在电弱能标 $\log_{10}(E/\mathrm{GeV}) = 2.00$（$100\;\mathrm{GeV}$，单圈 $\alpha_2(100\;\mathrm{GeV}) \approx 0.0337$，对照 $\alpha_2(M_Z) \approx 0.0338$）与琥珀色探测环 $r = \hbar c/E$ 处：品红左手双矢量楔面 $\mathbf{A}\wedge\mathbf{B}$ 沿紫色 $720^\circ$ 双覆叠光带驱动青色弱同位旋二重态翻转（$360^\circ$ 反号为 $-1$、$720^\circ$ 归位为 $+1$，绿色 `LEAN ✓` 对应 `no_continuous_global_section`、`circle_double_cover_history_lift` 与 `two_axis_finite_word`），并经紫色普罗卡驻波壳（$\lambda_W \approx 2.46 \times 10^{-3}\;\mathrm{fm}$）将 `2 + 1 = 3` 偏振闭合成品红汤川衰减包络 $e^{-m_W r} \approx 0.448$（非微扰手征格点实现标红色 `OPEN` [@prob-ch34-sm-generations-and-couplings]）。
:::

3. **（3）强相互作用 $\mathrm{SU}(3)_c$：胞内 `3D` 保体积三棱色锁、紫外渐近自由与红外通量管禁闭**。
   当变换同时调动极小圆弧体全部三根实线性无关的空间锚棱 $(\mathbf{e}_R, \mathbf{e}_G, \mathbf{e}_B)$ 时，内核定理 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)（[@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 第 4 款，`LEAN ✓`）严格锁定三锚格拉姆体积正定性 $\det G_3(\mathbf{e}_R, \mathbf{e}_G, \mathbf{e}_B) > 0 \iff \operatorname{LinearIndependent}_{\mathbb{R}}([\mathbf{e}_R, \mathbf{e}_G, \mathbf{e}_B])$。在保持复厄米内积的同时**严格锁死闭合色单态体积伪标量 $\mathbf{I}_3 = \mathbf{e}_R \wedge \mathbf{e}_G \wedge \mathbf{e}_B$ 不变（行列式锁 $\det U = 1$，剔除已由电磁/超荷占据的整体迹相位）**的三维复幺正变换群，不多不少恰是具有 $\dim\mathfrak{su}(3) = 3^2 - 1 = 8$ 枚无迹盖尔曼胶子生成元的色规范群 $\mathrm{SU}(3)_c$（`MODEL` + `文献结果`）！
   这套三棱保体积几何直接把强相互作用看似矛盾的紫外、红外两副面孔缝合成同一枚硬币的两面：

   - **短距高能极限（$\epsilon \to 0,\; r \to 0$ 渐近自由）**：在几何上，当探测尺度缩向原胞单个顶点（$\epsilon \to 0$）时，球面三面角迅速趋于局部欧氏平坦，吉拉尔角超按平方律归零 $\Omega(\epsilon) \approx \frac{1}{2}\epsilon^2 \to 0$（`MODEL` 几何直觉）；在四维连续量子色动力学中，$8$ 种携带色荷的胶子三点与四点非阿贝尔自耦合产生反屏蔽效应，格罗斯—波利策—维尔切克（Gross–Politzer–Wilczek, 1973）单圈重整化系数给出负斜率 $b_3 = -\bigl(11 - \frac{2}{3}N_f\bigr) = -7 < 0$（$N_c = 3,\; N_f = 6$），使强耦合 $\alpha_3(\mu)$ 随能标升高对数衰减趋零（`文献结果`）。
   - **长距低能拉伸（$r \gtrsim 1\;\mathrm{fm}$ 通量管线性禁闭与跨层核力溢出）**：反之，由于单颗夸克仅握有一根孤立色棱（`dim = 3` 未闭合，缺失其余两色时 $\det G_3 = 0$，见 [§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)），试图将一颗未闭合夸克强行拉远至 $r = 1.20\;\mathrm{fm}$ 时，胶子自相互作用不允许色通量向周围球面散开，而是将一串极小圆弧体紧箍成横截面恒定的**一维色通量管弦**，势能随距离呈线性增长 $V_s(r) \approx \sigma r$（弦张力 $\sigma \approx 0.18\;\mathrm{GeV}^2 \approx 0.91\;\mathrm{GeV/fm}$，典型范围 $0.89\text{–}0.91\;\mathrm{GeV/fm}$，在 $r = 1.20\;\mathrm{fm}$ 处蓄积势能 $V_s \approx 1.09\;\mathrm{GeV}$），直至真空拉断崩出正反夸克对重新锁死 $\det G_3 > 0$ 的色单态强子（重子 $\varepsilon_{rgb}q^r q^g q^b$ 与介子 $\bar{q}_c q^c$；威尔逊格点面积律见 [@rem-ch39-yang-mills-regge-rg-literature]，四维连续杨—米尔斯质量间隙严格证明仍属外部数学物理前沿）；而两颗已闭合的色单态核子在飞米尺度靠近时，复合 $\pi$ 介子驻波体的跨胞虚隧穿又在高一八度上溢出为汤川吸引核力 $V_{\mathrm{Yukawa}}(r) \propto -e^{-r/\lambda_\pi}/r$（$\lambda_\pi \approx 1.4138\;\mathrm{fm}$）！

::: {.viz src="unified-arc-forces-planck-sandbox" preset="su3-color-flux-confinement" height="500"}
**胞内 `3D` 强规范色体积锁 $\mathrm{SU}(3)_c$：短距角超归零渐近自由与长距色通量管禁闭（`su3-color-flux-confinement`）。** 在强子能标 $\log_{10}(E/\mathrm{GeV}) = 0.00$（$1\;\mathrm{GeV}$）下旋转紫色三轴 $\mathrm{SU}(3)_c$ 色标架 $(\mathbf{e}_R, \mathbf{e}_G, \mathbf{e}_B)$ 并锁死青色色单态闭合体积立方 $\mathbf{I}_3$（$\det U = 1$，绿色 `LEAN ✓` 对应 `three_anchor_gram_det_pos_iff`）：调高能标收窄 $\epsilon(E) \to 0$ 时角超 $\Omega(\epsilon) \to 0$ 呈现渐近自由，而拖动琥珀色夸克间距珠将未闭合单色端拉开至 $r = 1.20\;\mathrm{fm}$ 则串起 $6$ 枚紫色极小圆弧体原胞、拉出品红线性胶子通量管弦 $V(r) = \sigma r \approx 1.09\;\mathrm{GeV}$（连续统禁闭标 `文献结果`）。
:::

## 39.9.3 胞间超静定桁架与等主频折射：解开引力符号、等级鸿沟与紫外截断之谜 {#sec-ch39-09-3}

看清了单枚原胞内部 `1 — 2 — 3` 的规范三力，现在把镜头拉远到由亿万枚极小圆弧体共棱拼装而成的**胞间超静定四面体桁架（$N \ge 5$）**。将上一节 [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation) 建立的“普适比较主频 $\nu_0$ 与信息负载钟慢”同 [§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 的麦克斯韦—拉曼刚性及 [§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) 的反例审计合拢，困扰物理学界数百年的引力三大核心谜题——**为何唯独引力普适相吸永不屏蔽、为何微观引力微弱四十个数量级、以及为何普朗克尺度没有点奇点爆炸**——连同惯性与真空曲率下界，便在同一幅几何图景中次第洞开（`MODEL` + `手工推导` + 严格 `OPEN` 边界）：

1. **（1）为何万有引力普适相吸、绝不正负屏蔽？——玻恩模方时钟负载恒正与驻相波前内折**。
   为什么宏观行星与星系中正负电荷早已屏蔽成电中性、红绿蓝三色早已锁死成色单态，唯独引力能够跨百亿光年一味累加？在 [§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) 中我们已经证得：胞内规范荷对应随绕向反号的一阶/二阶奇性相位（$\pm q$ 相消、三色闭合），而静止质能 $E = M c^2$ 度量的却是物质驻波在每一拍普适主频 $\nu_0$ 中占用的**比较记录总负载**！由 [@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 第 6 款（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)，`LEAN ✓`），每一支比较分支的记录权重恒为复内积的**偶次非负模平方** $\operatorname{recordWeight}(P, \rho, k) = \lVert\operatorname{star}\phi \bullet_v \psi\rVert^2 = \cos^2\theta \ge 0$（伴随偶对称正矢高 $d(\epsilon) = 1 - \cos\epsilon = 2\sin^2(\epsilon/2) \ge 0$）。在空间分离的独立退相干原胞上（[§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) [@ex-ch34-orientation-and-composition-countermodels] 反例 (i)），不存在“负的时钟占用率”——无论粒子带正电还是负电、是重子还是反重子，只要携带正静止能量，它们对局部主频预算 $\nu_0$ 的占用份额就永远严格同号相加！
   更妙的是，这笔恒正的时钟负载直接经由惠更斯—费曼驻相原理翻转为**向内吸引加速度**（弱场静态极限下的 `手工推导`）：由 [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)，质量源 $M$ 在半径 $r$ 处施加全息纠缠信息负载 $\eta_{\mathrm{info}}(r) = r_s / r = \frac{2GM}{r c^2}$，使局域固有时节拍相对远场主频减慢为 $d\tau/dt = \sqrt{1 - \eta_{\mathrm{info}}(r)} \approx 1 - \frac{GM}{r c^2}$。考察一团具有内部康普顿驻波频率 $\omega_0 = m c^2/\hbar$ 的物质波包横掠质量源 $M$ 旁侧：在相同协调步长 $dt$ 内，波包靠近质量源的内侧边缘（$r$ 较小、信息负载 $\eta_{\mathrm{info}}$ 较高）固有时流逝 $d\tau$ 比外侧边缘更慢，恰如一束光斜射入折射率向中心递增的光学透镜！为了维持等相位波前连续对齐（$\delta\Phi_{\mathrm{total}} = 0$），波前脊线必然朝固有时流逝较慢的质量中心方向发生**内向折射**，给出精确弱场引力加速度：

   $$
   \mathbf{a} \;=\; -c^2\,\nabla\ln\!\left(\frac{d\tau}{dt}\right) \;=\; -\frac{c^2}{2}\,\frac{\nabla\bigl(1 - \frac{2GM}{r c^2}\bigr)}{1 - \frac{2GM}{r c^2}} \;\xrightarrow{\;r \gg r_s\;}\; -\frac{GM}{r^2}\,\hat{\mathbf{r}}!
   $$

   同时，严守 [§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) 反例 (ii)–(iv) 与 [@rem-ch34-spin2-and-species-hierarchy] 的动力学护栏：上述时钟折射直观复现了牛顿弱场静态吸引极限，但在完整 $3+1$ 维相对论时空中，从离散比较复形无假设地导出规避温伯格—威滕禁戒的无质量螺旋度 $\pm 2$ 传播子（锁定零质量 $\mu = 0$ 与偶自旋吸引号 $\sigma = -1$）并耦合于含相对论压强的完整能动张量 $T_{\mu\nu}$（当真空负压 $p = -\rho c^2$ 主导时，$\rho + 3p/c^2 = -2\rho < 0$ 反而驱动宇宙学排斥加速！），仍是 [@prob-ch34-gravity-dynamics-and-coupling]（`OPEN`）明确立案的第一性原理桥接任务。

::: {.viz src="unified-arc-forces-planck-sandbox" preset="regge-gravity-clock-refraction" height="500"}
**胞间 $N = 6$ 超静定雷吉桁架与主频时钟折射引力（`regge-gravity-clock-refraction`）。** 在 $N = 6$ 超静定团（$K_6$ 刚性盈余 $\Delta E(6) = 15 - 12 = +3 > 0$，对照 $N = 3, 4$ 静定根 $\Delta E = 0$；绿色 `LEAN ✓` 对应 `face_cycle_exact` 与 `rank_one_born_pairing_weight`）中，四枚正四面体围绕中心紫色公共铰链拼合，二面角总和 $4\arccos(1/3) = 282.12^\circ$ 留出品红雷吉角亏楔 $\delta_h = 77.88^\circ$ 与同心品红时钟负载环 $\eta_{\mathrm{info}}(r)$；因 $\pm q$ 玻恩平方负载 $\cos^2\theta \ge 0$ 只加不消，琥珀色当前波包沿青色驻相折射脊线按 $\mathbf{a} = -c^2\nabla\ln(d\tau/dt)$ 向内侧弯曲（完整四维自旋-$2$ 动力学标红色 `OPEN` [@prob-ch34-gravity-dynamics-and-coupling]）。
:::

2. **（2）等级鸿沟脱魅：为何微观引力比电磁力弱 $10^{36}\text{–}10^{42}$ 倍，而引力耦合在普朗克能标升到 $1$？**
   在日常低能世界里，两颗电子之间的万有引力比库仑静电力微弱逾 $42$ 个数量级——无数物理学家曾困惑于大自然为何塞入如此悬殊的“神秘小常数”。一旦放回“胞内专属通道 vs. 胞间全视界稀释”的几何账本（`MODEL` + `手工推导` + CODATA `NUM`），这 $42$ 个数量级的等级差当场脱去神秘面纱：
   电磁力 $\mathrm{U}(1)_{\mathrm{em}}$ 是在两颗带电探针之间沿着**单一专属的一维盲平面纤维通道**直接传递相位扭转，其低能无量纲耦合保持在 $\alpha_{\mathrm{em}}(0) \approx 1/137.036 \approx 7.2974 \times 10^{-3}$ 的 $\mathcal{O}(10^{-2})$ 量级；而质量为 $m$、约化康普顿驻波半径为 $\lambda_C = \hbar/(m c)$ 的低能粒子，是一团横跨海量普朗克原胞的弥散驻波云——它施加的胞间时钟负载必须均匀摊薄在半径 $R \sim \lambda_C$ 的**整张二维全息球壳所含的 $(R/\ell_P)^2 \sim (\lambda_C/\ell_P)^2$ 枚普朗克面积元**之上（[§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation)）！由于 $\ell_P / \lambda_C = m / M_P$（其中普朗克质量 $M_P = \sqrt{\hbar c / G} \approx 1.2209 \times 10^{19}\;\mathrm{GeV}/c^2$），单粒子在自身康普顿尺度上的无量纲引力精细结构常数精确等于全息像素稀释比：

   $$
   \alpha_G(m) \;:=\; \frac{G m^2}{\hbar c} \;=\; \left(\frac{\ell_P}{\lambda_C}\right)^2 \;=\; \left(\frac{m}{M_P}\right)^2!
   $$

   代入实验测定的粒子质量（外部经验输入 `NUM`）：对电子（$m_e \approx 0.5110\;\mathrm{MeV}/c^2$），康普顿波长横跨约 $2.39 \times 10^{22}$ 枚普朗克步长，平方稀释给出 $\alpha_G(m_e) = (m_e/M_P)^2 \approx 1.7518 \times 10^{-45}$，故电子对静电力与引力之比高达 $\alpha_{\mathrm{em}}(0)/\alpha_G(m_e) \approx 4.17 \times 10^{42}$（恰为 [§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition) 表中 $\lvert F_G/F_E\rvert_{ee} \approx 2.40 \times 10^{-43}$ 的精确倒数！）；对质子（$m_p \approx 938.27\;\mathrm{MeV}/c^2$，近 $99\%$ 质量源于 $\mathrm{SU}(3)_c$ 非微扰胶子场能 $\Lambda_{\mathrm{QCD}}$），$\alpha_G(m_p) = (m_p/M_P)^2 \approx 5.9062 \times 10^{-39}$，力强比缩小至 $\alpha_{\mathrm{em}}(0)/\alpha_G(m_p) \approx 1.24 \times 10^{36}$（倒数 $\lvert F_G/F_E\rvert_{pp} \approx 8.09 \times 10^{-37}$）。
   更关键的是能标跑动趋势的戏剧性交汇：规范三力的无量纲耦合随质心探测能量 $E$ 仅作缓慢的**对数跑动**，而有效无量纲引力耦合 $\alpha_G(E) = \frac{G E^2}{\hbar c^5} = (E / E_P)^2$ 却随探测波长压缩 $\lambda = \hbar c / E \to \ell_P$ 作陡峭的**二次幂攀升**！当探测能标一路推高至普朗克能标 $E_P = M_P c^2 \approx 1.2209 \times 10^{19}\;\mathrm{GeV}$（$\log_{10}(E_P/\mathrm{GeV}) \approx 19.09$）时，探测波包浓缩回**单枚极小圆弧体（$R \to \ell_P$，全息稀释因子 $(R/\ell_P)^2 \to 1$）**，$\alpha_G(E_P)$ 从 $10^{-45}$ 的深渊直冲至

   $$
   \alpha_G(E_P) \;=\; \left(\frac{E_P}{E_P}\right)^2 \;=\; 1.0000,
   $$

   与胞内规范和乐在单原胞尺度上正面会师！（$\alpha_G(E_P) = 1$ 由 $E_P$ 的定义给出；同一能标上单圈外推的规范耦合为 $\alpha_i \approx 0.019\text{–}0.030$（见 [@ex-ch39-hierarchy-and-one-loop-rg-calculus]），所以“会师”说的是引力耦合不再比规范耦合小几十个数量级，两者在 $E_P$ 仍相差 $33\text{–}52$ 倍，`NUM`。）（至于从纯离散几何第一性原理无参数推算汤川耦合 $y_e$ 与 $\Lambda_{\mathrm{QCD}}/M_P$ 比值，本书严守 [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) [@rem-ch34-measured-inputs-versus-predictions] 的反数字命理学铁律，绝不作事后小数拼凑，悉数留归 [@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch34-sm-generations-and-couplings]。）

3. **（3）单原胞紫外截断、视界饱和、惯性同源与真空最小矢高边界**。
   当能量抵近 $E_P$、距离抵近 $\ell_P$ 时，为什么极小圆弧体几何不会像连续点粒子场论那样跌入 $GM/r \to \infty$ 的紫外发散奇点？两道内生几何闸门提前锁住了底线（`MODEL` + `LEAN ✓` 组合计数支点）：

   - *第一道闸门（视界信息饱和锁）*：如 [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation) 所示，一旦质能压缩至史瓦西视界半径 $r = r_s$，背景全息纠缠负载即触及物理上限 $\eta_{\mathrm{info}} = 100\%$（局域自指停机帧率 $d\tau/dt = 0$），任何外部探针无法在有限主频预算内继续向小于单像素的内部无限压入信息；
   - *第二道闸门（麦克斯韦—拉曼 $N = 3, 4$ 静定归零截断）*：与 [@thm-ch39-unified-arc-algebraic-and-rigidity-anchors] 第 5 款（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 球面欧拉正合计数 $V - E + F = 2$，`LEAN ✓`）所用的欧拉计数相容的三维刚性盈余多项式（它本身是 $\binom{N}{2} - (3N - 6)$ 的算术展开；$d$ 维时为 $\frac{(N-d)(N-d-1)}{2}$，根为 $d$ 与 $d + 1$）

     $$
     \Delta E(N) \;=\; \binom{N}{2} - (3N - 6) \;=\; \frac{(N - 3)(N - 4)}{2}
     $$

     在单枚封闭四面体壳（$N = 4$）与单枚极小圆弧体（$N = 3$）处精确命中双零根 $\Delta E(4) = \Delta E(3) = 0$！这意味着一旦放大镜缩进单个普朗克原胞内部（$N \le 4$），“胞间超静定铰链角亏 $\delta_h$”这一独立自由度本身就已彻底消失——所谓“量子引力紫外行为”，在单胞极限下自然消融回有界（$\le 2\pi$）的胞内球面角超和乐 $\Omega_{\mathrm{intra}}(\Delta\mathcal{T}_\epsilon)$（`MODEL`；这不是紫外有限性的证明）！

   - *惯性与暗能量最小矢高的几何呼应及诚实留白*：在同一主频预算图景下（`MODEL`），宏观物体的**惯性**（$\mathbf{F} = m\mathbf{a}$）不再是牛顿绝对空间赋予质点的神秘懒惰属性，而是迫使一团包含海量内部驻波圆弧的复合态整体改写跨格寻址倾角 $\beta$ 所需的协变相位重排代价——因为惯性阻抗与引力折射清点的是**同一笔内部驻波主频负载**，惯性质量与引力质量的精确相等（等效原理）遂成同义必然。至于宇宙学尺度上的真空暗能量，非零紫外最小比较步长 $\epsilon_{\min} > 0$ 固然伴随严格为正的最小径向矢高底板 $d(\epsilon_{\min}) = 1 - \cos\epsilon_{\min} = 2\sin^2(\epsilon_{\min}/2) > 0$，为“真空不绝对平直”提供了耐人寻味的几何意象（`MODEL`）；但我们必须一字不差地恪守 [§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor) [@ex-ch34-horizon-blindspot-anticircularity] 的反循环审计结论：局部正矢高 $1 - \cos\epsilon_{\min} > 0$ 本身既不能排除负宇宙学常数反德西特时空（$\mathrm{AdS}_4,\; \Lambda_{\mathrm{cos}} < 0$）与零曲率闵可夫斯基林德勒视界（$\Lambda_{\mathrm{cos}} = 0$），也不能在不预先偷渡哈勃视界半径 $R_H$ 的前提下非循环地推算出 $\Lambda_{\mathrm{cos}}\ell_P^2 \sim 10^{-122}$ 的 $122$ 个数量级鸿沟——宇宙学常数定号与能标问题（[@prob-ch34-past-hypothesis-and-cosmological-constant]）、四维自旋-$2$ 引力连续统导出（[@prob-ch34-gravity-dynamics-and-coupling]）与标准模型手征代数及连续参数谱（[@prob-ch34-sm-generations-and-couplings]）三座定量高峰，在本书收官之际依然以鲜明的红色 `OPEN` 界碑诚实伫立。

::: {.viz src="unified-arc-forces-planck-sandbox" preset="planck-scale-convergence" height="500"}
**普朗克单原胞能标合流（`planck-scale-convergence`）。** 在灰色比较球 $S^2$ 背景上将能标梯的琥珀色当前能标珠推至普朗克单胞极限 $\log_{10}(E/\mathrm{GeV}) = 19.09$（$E_P = 1.22 \times 10^{19}\;\mathrm{GeV}$）：外围紫色多胞全息屏蔽云层层剥落至唯一一枚紫色统一普朗克极小圆弧体，同台亮出青色胞内角超 $\Omega_{\mathrm{intra}} = 19.47^\circ$ 与满开的品红铰链角亏楔 $\delta_h = 77.88^\circ$；下方 `.strip` 跑动图及放大内插窗显示品红引力耦合 $\alpha_G(E) = (E/E_P)^2$ 从电子标度 $1.75 \times 10^{-45}$ 二次攀升至 $\alpha_G(E_P) = 1.0000$，三条青色标准模型单圈规范线 $(\alpha_1, \alpha_2, \alpha_3)$ 在 $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ 围出非单点相交的近交汇三角（逆耦合跨度 $\Delta\alpha^{-1} > 3.66$，沙盘按两位小数初值给出约 $3.67\text{–}3.68$）；右栏 `#evidence` 以红色 `OPEN` 徽章标出 [@prob-ch34-past-hypothesis-and-cosmological-constant]、[@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch34-sm-generations-and-couplings]。
:::

## 39.9.4 形式化锚点、重整化对账算例、万力归弧总表与迈向概念场大统一的过渡 {#sec-ch39-09-4}

下面我们将支撑本节双覆叠旋量无全局截面与 $360^\circ$ 换叶提升、双不共线轴有限字生成 $\mathrm{SO}(3)$、三锚格拉姆满秩正体积判据、球面欧拉示性数面—边闭链正合计数以及秩一玻恩非负模平方配对权重的**六条 Lean 4 内核冻结声明**，统一锁定为本节的形式化锚定定理：

::: {.theorem #thm-ch39-unified-arc-algebraic-and-rigidity-anchors title="圆周双覆叠拓扑阻碍与换叶提升、三维双轴旋转生成、三锚格拉姆正定判据、球面欧拉闭链正合与秩一玻恩平方配对定理" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight"}
在 `trureturing` 冻结的概念拓扑双覆叠、三维双轴有限旋转、三锚格拉姆几何、平面图旋转边界与观察者记录条件化模块中，以下六项数学定理同时成立：

1. **圆周平方双覆叠无连续全局截面定理**（[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：记单位圆周为 $\mathrm{Circle} = \{z \in \mathbb{C} : \lvert z\rvert = 1\}$，平方双覆叠映射为 $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$，$z \mapsto z^2$，则不存在连续全局右逆截面：

   $$
   \neg\,\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\qquad \operatorname{Continuous}(s) \;\land\; \forall z \in \mathrm{Circle},\; (s(z))^2 = z.
   $$

2. **圆周双覆叠唯一历史路径提升与 $360^\circ$ 回路对跖换叶定理**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：设 $I = [0, 1] \subset \mathbb{R}$，记 $\operatorname{square}$ 的典范覆叠结构为 $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$。对任意连续底路径 $\mathrm{basePath} \in C(I, \mathrm{Circle})$、初始上层点 $\mathrm{initial} \in \mathrm{Circle}$ 及相容见证 $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$，典范提升 $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver}) \in C(I, \mathrm{Circle})$ 满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$、$\mathrm{lifted}(0) = \mathrm{initial}$ 及唯一性（对任意 $\mathrm{alternative} \in C(I, \mathrm{Circle})$，$\operatorname{square} \circ \mathrm{alternative} = \mathrm{basePath} \land \mathrm{alternative}(0) = \mathrm{initial} \implies \mathrm{alternative} = \mathrm{lifted}$）；且在无连续全局选择子的同时，整圈底回路 $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t) \in C(I, \mathrm{Circle})$ 自初值 $\mathrm{initial} = 1$ 的唯一连续提升满足

   $$
   \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
   $$

3. **三维欧氏空间不共线双轴整圆旋转的精确有限字生成定理**（[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)）：在三维实欧氏空间 $\mathrm{Space} := \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 及其线性等距正交群 $\mathrm{Orthogonal} := (\mathrm{Space} \simeq_{\ell i}[\mathbb{R}] \mathrm{Space})$ 上，对任意满足严格不共线条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$ 的两向量 $a, b \in \mathrm{Space}$ 以及任意满足 $\operatorname{determinant}(R) = 1$ 的正交变换 $R \in \mathrm{Orthogonal}$，存在有限列表 $l \in \operatorname{List}(\mathrm{Orthogonal})$，使得

   $$
   \operatorname{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R.
   $$

4. **三锚实格拉姆行列式严格正定与实线性无关充要判据**（[`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)）：在任意实内积空间 $E$ 中，对任意三枚向量 $u, v, w \in E$ 及其 $3 \times 3$ 实格拉姆矩阵 $\operatorname{threeAnchorGram}(u, v, w) := \operatorname{gram}_{\mathbb{R}}([u, v, w])$，恒有

   $$
   0 < \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) \;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v, w]).
   $$

5. **球面欧拉示性数旋转系统的面—边边界核与简单闭链空间正合定理**（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)）：设 $G$ 为有限连通简单图（`[Fintype V]`、`[DecidableEq V]`、`[DecidableRel G.Adj]`、`G.Connected`）且满足 `Nonempty G.Dart`，$R : \operatorname{Rotation}(G)$ 为有向半边旋转系统，其面轨道集 $R.\mathrm{Face}$ 在 $\mathbb{Z}$ 中满足球面欧拉恒等式 $\lvert V\rvert - \lvert G.\mathrm{edgeSet}\rvert + \lvert R.\mathrm{Face}\rvert = 2$。则 $\mathbb{Z}/2\mathbb{Z}$-线性边界算子 $R.\mathrm{boundary} : (R.\mathrm{Face} \to \mathbb{Z}/2\mathbb{Z}) \to (G.\mathrm{edgeSet} \to \mathbb{Z}/2\mathbb{Z})$ 同时满足：

   - 对任意 $x : R.\mathrm{Face} \to \mathbb{Z}/2\mathbb{Z}$ 与 $d \in G.\mathrm{Dart}$，$R.\mathrm{boundary}(x)\langle d.\mathrm{edge}, d.\mathrm{edge\_mem}\rangle = x(R.\mathrm{face}(d)) + x(R.\mathrm{face}(d.\mathrm{symm}))$；
   - $R.\mathrm{boundary}(x) = 0 \;\Longleftrightarrow\; \exists c \in \mathbb{Z}/2\mathbb{Z},\; x = (\lambda \_ \Rightarrow c)$；
   - $\operatorname{LinearMap.range}(R.\mathrm{boundary}) = \operatorname{simpleCycleSpace}(G)$。

6. **秩一玻恩模方配对权重与未读条件态系综重构定理**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：设 $n$ 为有限可判等指标类型（`[Fintype n]`、`[DecidableEq n]`），$\kappa$ 为有限结果类型（`[Fintype κ]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 满足半正定与单位迹条件 $\rho.\mathrm{PosSemidef} \land \Tr(\rho) = 1$。若对指定结果 $k \in \kappa$ 及向量 $\phi, \psi : n \to \mathbb{C}$ 有 $P_k = \operatorname{Matrix.vecMulVec}(\phi, \operatorname{star}\phi)$ 且 $\rho = \operatorname{Matrix.vecMulVec}(\psi, \operatorname{star}\psi)$，则以下三条恒等式同时成立：

   $$
   \operatorname{recordWeight}(P, \rho, k) \;=\; \bigl(\bigl(\norm{\operatorname{star}\phi \bullet_{v} \psi}^2 : \mathbb{R}\bigr) : \mathbb{C}\bigr), \qquad \operatorname{recordWeight}(P, \rho, k) \;=\; \Tr(\rho \cdot P_k), \qquad \operatorname{unreadState}(P, \rho) \;=\; \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j).
   $$
:::

::: proof
第 1 款假设存在连续右逆截面 $s$，构造实直线上的连续映射 $r(t) := s(\operatorname{Circle.exp}(t)) / \operatorname{Circle.exp}(t/2)$；因 $(r(t))^2 = 1$，连通性迫使 $r$ 取常值，但 $r(2\pi) = -r(0)$ 触发单位圆非零元反号矛盾 `Circle.neg_ne_self`（见 [@thm-ch39-double-cover-no-section-and-720-lift]）。第 2 款调用覆叠映射路径提升唯一性引理 `liftPath_lifts`、`liftPath_zero` 与 `eq_liftPath_iff'`，并对 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ 显式核验半角路径 $\operatorname{Circle.exp}(\pi t)$ 满足平方投影与初值条件，在 $t = 1$ 处得 $\operatorname{Circle.exp}(\pi) = -1$。第 3 款将两根严格不共线轴归一化后，由纬圈相交开放性与紧致性证明有限字轨道传递覆盖单位球面 $S^2$，并将点稳定子归入单轴圆周旋转（见 [@thm-ch34-trihedron-rigidity-and-complete-graph]）。第 4 款利用实内积空间有限向量组的格拉姆矩阵正定（行列式严格大于 $0$）与零核线性无关的充要等价性直接证得。第 5 款由连通图路径归纳确定零边界核恰为一维常值面函数，结合有向半边对合配对证明边界像落入简单闭链空间，再代入球面欧拉公式 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 核对两边 $\mathbb{Z}/2\mathbb{Z}$-维数同为 $\lvert E\rvert - \lvert V\rvert + 1$。第 6 款将秩一外积乘积收缩为共轭内积对 $\overline{z}z = \lVert z\rVert^2 \ge 0$（调用 `rank_one_pure_state_modulus_square_reduction`），按定义展开迹配对，并对每个分支 $j \in \kappa$ 区分非零权重标量消去与零权重半正定矩阵迹为零必为零矩阵（`trace_eq_zero_iff`）完成未读态重构（见 [@lemma-audit-born-pairing-weight]）。完整证明由 Lean 内核检查。
:::

涉及连续非阿贝尔规范场论、电弱质量生成、格点禁闭、雷吉单纯形引力收敛性以及重整化群高能跑动的外部物理学与几何分析文献统一归属如下：

::: {.remark #rem-ch39-yang-mills-regge-rg-literature title="杨—米尔斯规范场、电弱破缺、渐近自由与格点禁闭、雷吉单纯形引力及重整化群跑动文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将微观规范三力与宏观引力纳入极小圆弧体统一图景时，严格区分本书模型诠释（`MODEL`）与以下经典外部数学物理文献（均未作为四维连续量子场论或量子引力定理包含在 `trureturing@dev` 冻结集中）：

1. **非阿贝尔规范场、宇称不守恒、电弱统一与希格斯机制**：非交换局域同位旋规范不变性由 C. N. Yang 与 R. L. Mills（*Phys. Rev.* **96**, 191–195, 1954, DOI `10.1103/PhysRev.96.191`）创立；弱相互作用宇称不守恒与手征耦合由 T. D. Lee 与 C. N. Yang（*Phys. Rev.* **104**, 254–258, 1956, DOI `10.1103/PhysRev.104.254`）提出；$\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y \to \mathrm{U}(1)_{\mathrm{em}}$ 电弱统一规范模型与自发破缺矢量玻色子质量生成机制分别出自 S. L. Glashow（*Nucl. Phys.* **22**, 579–588, 1961）、S. Weinberg（*Phys. Rev. Lett.* **19**, 1264–1266, 1967）、A. Salam（1968），以及 P. W. Anderson（1963）、F. Englert 与 R. Brout（*Phys. Rev. Lett.* **13**, 321–323, 1964）和 P. W. Higgs（*Phys. Rev. Lett.* **13**, 508–509, 1964）；
2. **量子色动力学渐近自由与威尔逊格点小方格禁闭**：四维非阿贝尔 $\mathrm{SU}(3)_c$ 规范场的紫外单圈渐近自由（$b_3 = -11 + \frac{2}{3}N_f = -7 < 0$）由 D. J. Gross 与 F. Wilczek（*Phys. Rev. Lett.* **30**, 1343–1346, 1973）及 H. D. Politzer（*Phys. Rev. Lett.* **30**, 1346–1349, 1973）独立导出；以离散格点边幺正输运 $U_\ell$ 与小方格闭合和乐 $\operatorname{Re}\operatorname{Tr}(I - U_\square)$ 定义非微扰规范作用量并由强耦合面积律刻画线性弦张力禁闭 $V(r) \sim \sigma r$ 的框架出自 K. G. Wilson（*Phys. Rev. D* **10**, 2445–2459, 1974, DOI `10.1103/PhysRevD.10.2445`）；
3. **雷吉无坐标单纯形引力与分段平直曲率测度收敛定理**：以单纯形骨架余维 $2$ 铰链面积 $A_h$ 与二面角亏缺 $\delta_h = 2\pi - \sum\theta_k$ 构造无坐标离散引力作用量 $S_{\mathrm{Regge}} = \frac{c^3}{8\pi G}\sum_h A_h\delta_h$ 出自 T. Regge（*Nuovo Cimento* **19**, 558–571, 1961, DOI `10.1007/BF02733251`）；J. Cheeger, W. Müller 与 R. Schrader（*Commun. Math. Phys.* **92**, 405–454, 1984, DOI `10.1007/BF01209307`）严格证明了在非退化胖单纯形剖分序列加细下，分段平直流形的 Lipschitz–Killing / 雷吉曲率测度在测度意义下收敛于光滑黎曼流形的爱因斯坦—希尔伯特标量曲率测度；
4. **规范耦合重整化群高能演进与最小标准模型单圈近交汇三角区辨析**：利用重整化群方程将低能电磁、弱、强耦合向高能标度外推的纲领由 H. Georgi, H. R. Quinn 与 S. Weinberg（*Phys. Rev. Lett.* **33**, 451–454, 1974, DOI `10.1103/PhysRevLett.33.451`）奠定。必须严格注明的是：代入现代高精度 $Z$ 极点实验初值后，仅含三代费米子与单一希格斯二重态的**最小标准模型单圈斜率 $(b_1, b_2, b_3) = \bigl(\frac{41}{10}, -\frac{19}{6}, -7\bigr)$ 并不会在单一点精确三线相交**，而是在 $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ 能区围出一枚耦合强度处于 $\mathcal{O}(10^{-2})$（$\alpha_i \approx 0.021\text{–}0.028$）的**近交汇三角形**；若要实现精确单点交汇，仍需引入中间能标阈值修正、高圈/引力算符修正或新粒子扇区。
:::

把上面两类文献接回 [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 的弦—矢高语言，可以把“规范项”与“引力项”各自读取和乐的方式写得更确切：

::: {.remark #rem-ch39-plaquette-sagitta-and-wilson-action title="威尔逊小方格项是小方格和乐的矢高（手工推导与文献结果）"}
**手工推导；与威尔逊作用量及其连续极限的对应、圆盘上的面和乐分解为文献结果，未在本书形式化。** 设 $U \in \mathrm{U}(N)$ 是一个小方格的和乐，$S = \frac{1}{2}(U + U^\dagger)$ 为求同部分，$v = \mathbf{1} - S$ 为矢高，$\Delta = U - \mathbf{1}$ 为割弦，读数取归一迹 $\varphi = \frac{1}{N}\operatorname{Tr}$。

1. 由 $\Delta^\dagger\Delta = 2v$（[@rem-appe-chord-sagitta-layer0]）得 $\varphi(v) = 1 - \frac{1}{N}\operatorname{Re}\operatorname{Tr}U = \frac{1}{2N}\operatorname{Tr}(\Delta^\dagger\Delta)$。威尔逊小方格作用量按通行归一化写作 $S_W = \beta\sum_p\bigl(1 - \frac{1}{N}\operatorname{Re}\operatorname{Tr}U_p\bigr)$（Wilson 1974），它逐项等于 $\beta\,\varphi(v(U_p))$。$U \in \mathrm{SU}(2)$ 时 $S = \frac{1}{2}(\operatorname{Tr}U)\mathbf{1}$ 已是实标量，不需要读数；一般的 $U \in \mathrm{U}(2)$ 与 $N \ge 3$ 时需要。
2. 设 $U$ 的本征角为 $\theta_j \in (-\pi, \pi]$。由 $\frac{x^2}{2} - \frac{x^4}{24} \le 1 - \cos x \le \frac{x^2}{2}$ 与 $\lvert x\rvert \le \pi$ 时 $1 - \cos x \ge \frac{2x^2}{\pi^2}$，

   $$
   \frac{2}{\pi^2}\cdot\frac{1}{N}\sum_j\theta_j^2 \;\le\; \varphi(v) \;\le\; \frac{1}{2}\cdot\frac{1}{N}\sum_j\theta_j^2, \qquad \varphi(v) \;\ge\; \frac{1}{2N}\sum_j\theta_j^2 - \frac{1}{24N}\sum_j\theta_j^4.
   $$

3. 两个公平元 $u_1, u_2$ 的换位和乐 $h = u_1u_2u_1^\dagger u_2^\dagger$ 满足 $h - \mathbf{1} = [u_1, u_2]\,(u_2u_1)^\dagger$（在 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula) 中取 $U = u_1$、$f = u_2$、$\mathit{translated} = u_1u_2u_1^\dagger$，再两边右乘 $(u_2u_1)^\dagger$），所以 $\varphi(v(h)) = \frac{1}{2}\varphi\bigl([u_1, u_2]^\dagger[u_1, u_2]\bigr)$：有限孔径上的曲率矢高是对易子范数平方的一半。
4. 若回路 $C$ 是由 $M$ 个小方格拼成的圆盘的边界，$W_C$ 等于 $M$ 个面和乐各自经一串链变量共轭后按剥壳次序的乘积（[§34.30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-3) 的非阿贝尔面斯托克斯恒等式，`文献结果`）。$\lVert X\rVert_\varphi := \sqrt{\varphi(X^\dagger X)}$ 在酉元左右乘下不变，且 $ab - \mathbf{1} = (a - \mathbf{1})b + (b - \mathbf{1})$，故 $\lVert W_C - \mathbf{1}\rVert_\varphi \le \sum_p\lVert U_p - \mathbf{1}\rVert_\varphi$，即 $\sqrt{\varphi(v(W_C))} \le \sum_p\sqrt{\varphi(v(U_p))}$；再由柯西—施瓦茨不等式，$1 - \frac{1}{N}\operatorname{Re}\operatorname{Tr}W_C \le M\sum_p\bigl(1 - \frac{1}{N}\operatorname{Re}\operatorname{Tr}U_p\bigr)$。
5. 对光滑经典场，链变量取沿棱的路径有序指数或棱中点处的 $e^{iaA_\mu}$，取小方格中心展开，$1 - \frac{1}{N}\operatorname{Re}\operatorname{Tr}U_p = \frac{a^4}{2N}\operatorname{Tr}F_{\mu\nu}^2 + O(a^6)$，$F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu + i[A_\mu, A_\nu]$（$\mu\nu$ 为该小方格所在平面，不求和）。

对三角形面，第三点冗余（[@def-appe-third-point-redundancy]）成立当且仅当该面和乐为 $\mathbf{1}$，即矢高读数为零；把同一条件搬到小方格上（面和乐为 $\mathbf{1}$），$S_W/\beta$ 就是这一条件的偏差的矢高总和。这只是运动学上的改写：统计权重、测度、耦合常数的取值与量子连续极限都不由它给出（后者见 [@prob-ch34-rough-nonabelian-surface-calculus]）。
:::

引力一侧读取和乐的方式不同：

::: {.remark #rem-ch39-regge-deficit-signed-angle title="雷吉角亏读的是带符号的转角，不是矢高之和（手工推导与文献结果）"}
**手工推导；雷吉作用量及其收敛定理、笛卡尔总角亏定理与极三角形定理为文献结果，未在本书形式化。** 绕铰链 $h$ 一周的和乐是转角为 $\delta_h$ 的转动 $R_h$（Regge 1961，`文献结果`）。在三维中（$R_h \in \mathrm{SO}(3)$；$D$ 维时把 $\operatorname{Tr}R_h - 1$ 换成 $\operatorname{Tr}R_h - (D - 2)$），记 $K_h$ 为该转动平面的单位生成元，则 $\frac{1}{2}(\operatorname{Tr}R_h - 1) = \cos\delta_h$，$-\frac{1}{2}\operatorname{Tr}(K_hR_h) = \sin\delta_h$。回路反向时前者不变，后者变号。

1. 若规范群在 $\mathbb{C}^N$ 上不可约（如定义表示上的 $\mathrm{SU}(N)$），则对和乐矩阵实线性、规范不变且与回路定向无关的单回路读数只有矢高（差一个仿射变换）；规范项属于这一类。
2. 雷吉作用量 $\sum_hA_h\delta_h$ 对角亏是一次的，读的是带符号的转角，需要一个随回路反向而变号的配对对象，即铰链的对偶平面。它不是矢高之和：铰链度量按 $a^{D-2}$、角亏按 $a^2$ 标度时（$D$ 为复形维数，铰链个数按 $a^{-D}$），$\sum_hA_h(1 - \cos\delta_h)$ 在加细下按 $a^2$ 趋于零。
3. 在闭凸多面体上，$\sum_v\delta_v = 4\pi$ 与形状无关（即 $720^\circ$；笛卡尔总角亏定理，见 [@rem-hairy-ball-adams-literature] 第 2 条），而 $\sum_v(1 - \cos\delta_v)$ 依赖形状。
4. 三面角顶点的角亏等于三个面外法向 $n_1, n_2, n_3$ 所张球面三角形的吉拉尔角盈（极三角形定理），因而由 [@rem-appe-half-comparison-holonomy] 的闭式给出：$\delta_v = 2\operatorname{atan2}\bigl(\lvert[n_1, n_2, n_3]\rvert,\ 1 + n_1\cdot n_2 + n_2\cdot n_3 + n_3\cdot n_1\bigr)$；分母为正时即 $\tan\frac{\delta_v}{2} = \frac{\lvert[n_1, n_2, n_3]\rvert}{1 + n_1\cdot n_2 + n_2\cdot n_3 + n_3\cdot n_1}$。

因此“万力归弧”的确切内容是：两类力都由回路和乐偏离单位元来描述，并共用同一组比安基与斯托克斯恒等式；规范项读偶通道，引力项读带符号的转角（符号由奇通道确定）并以铰链度量加权。把这一区别当作规范力与引力的结构差异属于本书的读法（`MODEL`）；它不确定规范群、耦合常数或动力学。
:::

下面的算例给这两条注记配上数值：

::: {.example #ex-ch39-sagitta-versus-deficit-audit title="角亏与矢高的对账：五种正多面体、示例铰链与一个换位和乐（手工推导）"}
1. **正多面体。** 顶点数乘角亏恒为 $720^\circ$；矢高之和各不相同：

   | 多面体 | 顶点数 | 单顶点角亏 | 角亏之和 | $\sum_v(1 - \cos\delta_v)$ |
   | :--- | :---: | :---: | :---: | :---: |
   | 正四面体 | $4$ | $180^\circ$ | $720^\circ$ | $8.0000$ |
   | 立方体 | $8$ | $90^\circ$ | $720^\circ$ | $8.0000$ |
   | 正八面体 | $6$ | $120^\circ$ | $720^\circ$ | $9.0000$ |
   | 正十二面体 | $20$ | $36^\circ$ | $720^\circ$ | $3.8197$ |
   | 正二十面体 | $12$ | $60^\circ$ | $720^\circ$ | $6.0000$ |

2. **法向公式。** 立方体顶点的三个法向两两正交，$[n_1, n_2, n_3] = 1$，分母为 $1$，$\delta_v = 2\arctan 1 = 90^\circ$。正四面体顶点处 $n_i\cdot n_j = -\frac{1}{3}$，分母为 $0$，$\delta_v = 180^\circ$。
3. **示例铰链。** 四个正四面体共棱时 $\delta_h = 360^\circ - 4\arccos\frac{1}{3} = 77.885^\circ = 1.3593\;\mathrm{rad}$，$\sin\delta_h = 0.9777$，$1 - \cos\delta_h = 0.7901$，$\frac{1}{2}\delta_h^2 = 0.9239$。
4. **换位和乐。** 绕两根正交轴各转 $60^\circ$ 的旋子，由 [@rem-ch39-plaquette-sagitta-and-wilson-action] 第 3 条，$[u_1, u_2] = -2i\sin 30^\circ\sin 30^\circ\,(n_1\times n_2)\cdot\boldsymbol{\sigma}$，故 $v(h) = 2\sin^2 30^\circ\sin^2 30^\circ = \frac{1}{8}$，余下的转角为 $2\arccos\frac{7}{8} = 57.91^\circ$，与 [§32.5](ch32-s05-physical-fields-and-six-domains.md#sec-ch32-physical-fields) 实验卡的读数一致。
:::

零作用量并不总是纯规范。在环面这样有不可缩回路的格点上，下面的冻结定理给出一个 $\mathbb{Z}/2$ 系数的实例：

::: {.theorem #thm-ch39-periodic-grid-flat-not-exact title="周期网格上的平坦 Z/2 边标号：梯度判据与一条缝的反例" lean="D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.flat_exact_iff,D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.horizontal_seam_counterexample"}
设 $M, N$ 为非零自然数，边标号 $y$ 由两族函数 $y.\mathrm{horizontal},\ y.\mathrm{vertical} : \operatorname{Fin} M \to \operatorname{Fin} N \to \mathbb{Z}/2$ 组成，指标加法取模。记 $\operatorname{plaquette}(y, i, j) = y.\mathrm{horizontal}(i, j) + y.\mathrm{vertical}(i, j + 1) + y.\mathrm{horizontal}(i + 1, j) + y.\mathrm{vertical}(i, j)$，$\operatorname{Flat}(y)$ 指一切 $\operatorname{plaquette}(y, i, j) = 0$，$\operatorname{rowHolonomy}(y, i) = \sum_j y.\mathrm{horizontal}(i, j)$，$\operatorname{columnHolonomy}(y, j) = \sum_i y.\mathrm{vertical}(i, j)$；顶点标号 $x : \operatorname{Fin} M \to \operatorname{Fin} N \to \mathbb{Z}/2$ 的梯度为 $\operatorname{gradient}(x).\mathrm{horizontal}(i, j) = x(i, j + 1) + x(i, j)$、$\operatorname{gradient}(x).\mathrm{vertical}(i, j) = x(i + 1, j) + x(i, j)$；$\operatorname{seam}(h, v)$ 在 $j = N - 1$ 的水平边上取 $h$、在 $i = M - 1$ 的竖直边上取 $v$，其余为 $0$。则：

1. 若 $\operatorname{Flat}(y)$，则 $\bigl(\exists x,\ \operatorname{gradient}(x) = y\bigr) \iff \operatorname{rowHolonomy}(y, 0) = 0 \land \operatorname{columnHolonomy}(y, 0) = 0$；
2. 若 $3 \le M$ 且 $3 \le N$，则 $\operatorname{Flat}(\operatorname{seam}(1, 0))$，$\operatorname{rowHolonomy}(\operatorname{seam}(1, 0), 0) = 1$，$\operatorname{columnHolonomy}(\operatorname{seam}(1, 0), 0) = 0$，且不存在 $x$ 使 $\operatorname{gradient}(x) = \operatorname{seam}(1, 0)$。
:::

::: proof
第 1 款的必要性来自梯度沿每一行、每一列求和时逐项相消；充分性用平坦标号的分解：平坦的 $y$ 等于某个顶点标号的梯度加上 $\operatorname{seam}(\operatorname{rowHolonomy}(y, 0), \operatorname{columnHolonomy}(y, 0))$，两个和乐为零时缝项消失。第 2 款先验证缝标号平坦并算出它的两个和乐，再用第 1 款：行和乐为 $1 \ne 0$，所以它不是梯度。完整证明由 Lean 内核检查。
:::

我们在下框中对电子与质子引力—电磁等级比、引力耦合向普朗克单胞的二次攀升以及最小标准模型单圈重整化群三条两两交点作完整显式手算对账：

::: {.example #ex-ch39-hierarchy-and-one-loop-rg-calculus title="引力—电磁等级稀释比、普朗克二次合流与最小标准模型单圈重整化群近交汇三角基准算例（手工推导与 CODATA/PDG 数值核验）"}
**手工推导与文献结果（配 CODATA 2022 / PDG 2024 经验输入 `NUM`）。** 以下两步逐项核验本节及交互实验室 `FORCE//UNIFY` 的全部核心读数：

1. **电子与质子全息像素稀释比及普朗克单胞二次合流**：
   取普朗克质量能标 $E_P = M_P c^2 = \sqrt{\hbar c^5 / G} \approx 1.220890 \times 10^{19}\;\mathrm{GeV}$（$\log_{10}(E_P/\mathrm{GeV}) \approx 19.0867 \approx 19.09$）与零动量精细结构常数 $\alpha_{\mathrm{em}}(0) \approx 1/137.035999 \approx 7.297353 \times 10^{-3}$：

   - **电子基准（$m_e c^2 \approx 5.1099895 \times 10^{-4}\;\mathrm{GeV}$）**：全息稀释因子给出 $\alpha_G(m_e) = (m_e c^2 / E_P)^2 = (4.185463 \times 10^{-23})^2 \approx 1.7518 \times 10^{-45}$，故电子对静电力与引力强度之比为 $\alpha_{\mathrm{em}}(0)/\alpha_G(m_e) \approx 4.1656 \times 10^{42} \approx 4.17 \times 10^{42}$（互逆比值 $\lvert F_G/F_E\rvert_{ee} = \alpha_G(m_e)/\alpha_{\mathrm{em}}(0) \approx 2.40 \times 10^{-43}$）；
   - **质子基准（$m_p c^2 \approx 0.9382721\;\mathrm{GeV}$）**：$\alpha_G(m_p) = (m_p c^2 / E_P)^2 = (7.685149 \times 10^{-20})^2 \approx 5.9062 \times 10^{-39}$，故质子对静电力与引力强度之比为 $\alpha_{\mathrm{em}}(0)/\alpha_G(m_p) \approx 1.2356 \times 10^{36} \approx 1.24 \times 10^{36}$（互逆比值 $\lvert F_G/F_E\rvert_{pp} \approx 8.09 \times 10^{-37}$）；
   - **随质心能量 $E$ 的二次攀升**：有效无量纲引力耦合 $\alpha_G(E) = (E/E_P)^2$ 在 $E = 1\;\mathrm{GeV}$ 处为 $6.71 \times 10^{-39}$，在 $E = m_Z \approx 91.1876\;\mathrm{GeV}$ 处为 $5.58 \times 10^{-35}$，在 $E = 10^{15}\;\mathrm{GeV}$ 处升至 $6.71 \times 10^{-9}$，并在单胞普朗克极限 $E = E_P$ 处精确抵达 $\alpha_G(E_P) = 1.0000$。

2. **最小标准模型单圈规范耦合跑动与 $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ 近交汇三角区核算**：
   取 PDG 2024 在 $\mu_0 = m_Z = 91.1876\;\mathrm{GeV}$（$\log_{10}(m_Z/\mathrm{GeV}) \approx 1.9599$）处的五味 $\overline{\mathrm{MS}}$ 测定值 $\widehat{\alpha}(m_Z)^{-1} = 127.930$、$\sin^2\widehat{\theta}_W(m_Z) = 0.23129$ 与 $\alpha_3(m_Z) = 0.1180$，按典范 $\mathrm{SU}(5)$ 超荷归一化 $\alpha_1 := \frac{5}{3}\alpha_Y$ 换算得初值

   $$
   \alpha_1^{-1}(m_Z) \;=\; \frac{3}{5}\,\widehat{\alpha}(m_Z)^{-1}\cos^2\widehat{\theta}_W(m_Z) \;\approx\; 59.00, \qquad \alpha_2^{-1}(m_Z) \;=\; \widehat{\alpha}(m_Z)^{-1}\sin^2\widehat{\theta}_W(m_Z) \;\approx\; 29.59, \qquad \alpha_3^{-1}(m_Z) \;=\; \frac{1}{0.1180} \;\approx\; 8.47
   $$

   （在实验卡电弱标度 $\mu = 100\;\mathrm{GeV}$ 处，$\alpha_2^{-1}(100\;\mathrm{GeV}) \approx 29.64 \implies \alpha_2(100\;\mathrm{GeV}) \approx 0.03374 \approx 0.0337$，对照 $Z$ 极点 $\alpha_2(m_Z) \approx 0.0338$）。代入最小标准模型（$N_{\mathrm{gen}} = 3,\; N_H = 1$）单圈积分方程

   $$
   \alpha_i^{-1}(\mu) \;=\; \alpha_i^{-1}(m_Z) \;-\; \frac{b_i}{2\pi}\ln\!\left(\frac{\mu}{m_Z}\right), \qquad (b_1, b_2, b_3) \;=\; \left(+\frac{41}{10},\; -\frac{19}{6},\; -7\right),
   $$

   令 $\alpha_i^{-1}(\mu_{ij}) = \alpha_j^{-1}(\mu_{ij})$ 解得三条直线的两两交点 $\ln(\mu_{ij}/m_Z) = \frac{2\pi(\alpha_i^{-1}(m_Z) - \alpha_j^{-1}(m_Z))}{b_i - b_j}$：

   - **$\alpha_1 = \alpha_2$ 交点**：$b_1 - b_2 = \frac{109}{15} \approx 7.2667$，给出 $\mu_{12} \approx 1.01 \times 10^{13}\;\mathrm{GeV}$，交点处 $\alpha_{1,2}^{-1}(\mu_{12}) \approx 42.41$（$\alpha_{1,2} \approx 0.0236$，此时 $\alpha_3^{-1} \approx 36.81,\; \alpha_3 \approx 0.0272$）；
   - **$\alpha_1 = \alpha_3$ 交点**：$b_1 - b_3 = \frac{111}{10} = 11.1$，给出 $\mu_{13} \approx 2.41 \times 10^{14}\;\mathrm{GeV}$，交点处 $\alpha_{1,3}^{-1}(\mu_{13}) \approx 40.34$（$\alpha_{1,3} \approx 0.0248$，此时 $\alpha_2^{-1} \approx 44.00,\; \alpha_2 \approx 0.0227$，定出全能区最小三线逆耦合跨度 $\Delta\alpha^{-1} > 3.66$，精确差值约 $3.664$）；
   - **$\alpha_2 = \alpha_3$ 交点**：$b_2 - b_3 = \frac{23}{6} \approx 3.8333$，给出 $\mu_{23} \approx 9.77 \times 10^{16}\;\mathrm{GeV}$，交点处 $\alpha_{2,3}^{-1}(\mu_{23}) \approx 47.03$（$\alpha_{2,3} \approx 0.0213$，此时 $\alpha_1^{-1} \approx 36.42,\; \alpha_1 \approx 0.0275$）；
   - **外推至单胞普朗克端点 $\mu = E_P \approx 1.22 \times 10^{19}\;\mathrm{GeV}$**：$(\alpha_1^{-1}, \alpha_2^{-1}, \alpha_3^{-1})(E_P) \approx (33.27, 49.46, 52.41)$，对应规范耦合三元组 $(\alpha_1, \alpha_2, \alpha_3)(E_P) \approx (0.0301, 0.0202, 0.0191)$ 聚拢在窄带 $\mathcal{O}(10^{-2})$ 内，而引力耦合恰好抵达单原胞满载基准 $\alpha_G(E_P) = 1.0000$！
:::

我们将极小圆弧体胞内规范三力、胞间主频折射引力及普朗克单原胞合流边界，凝缩为下面这张五维一体的万力归弧全景总表（严格采用纯单行单元格排版）：

| 相互作用与尺度扇区 | 极小圆弧体几何载体（`MODEL`） | 无量纲相位生成元与传播特征 | 宏观屏蔽 / 累加与力程表现 | 形式化 `LEAN ✓` 支点与认识论边界 |
| :--- | :--- | :--- | :--- | :--- |
| **电磁相互作用 $\mathrm{U}(1)_{\mathrm{em}}$** | 胞内 `1D` 正交盲平面 $\hat{\mathbf{i}}$ 纯相位圆 $e^{\hat{\mathbf{i}}q\varphi} \in S^1$（三空间棱零倾斜） | 阿贝尔交换 $[U_1, U_2] = 0$，光子不带电（$q_\gamma = 0$），$100\%$ 主频跨格寻址锁死 $m_\gamma = 0$ | 异号绕向 $\pm q$ 在中性原子内精确屏蔽；未屏蔽单极通量呈无限程库仑 $1/r^2$ 分布 | [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)、[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)（`LEAN ✓`）；QED 跑动属 `文献结果` |
| **弱相互作用 $\mathrm{SU}(2)_L$** | 胞内 `2D` 有向双矢量面 $\mathbf{A}\wedge\mathbf{B}$ 旋量双覆叠 $\mathrm{Spin}(3)\cong\mathrm{SU}(2)$（$720^\circ$ 光带） | 非交换二重态翻转（$360^\circ\mapsto -1$）配希格斯 `2+1=3` 纵向吸收生成有质量 $W^\pm, Z^0$ | 普罗卡驻波体给出汤川短程指数屏蔽 $e^{-m_W r}/r$（$\lambda_W \approx 2.46\times 10^{-3}\;\mathrm{fm}$） | [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)、[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)、[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)（`LEAN ✓`）；四维格点手征实现标 `OPEN` [@prob-ch34-sm-generations-and-couplings] |
| **强相互作用 $\mathrm{SU}(3)_c$** | 胞内 `3D` 三色锚棱 $(\mathbf{e}_R,\mathbf{e}_G,\mathbf{e}_B)$ 保单态体积 $\mathbf{I}_3$ 旋转（$\det U = 1$，$8$ 胶子） | 顶点 $\epsilon\to 0$ 角超归零呼应单圈 $b_3 = -7 < 0$ 渐近自由；未闭合色棱拉成胶子通量管 | 三色满秩闭合为色单态强子，长距线性弦禁闭 $V(r) = \sigma r$，跨核子溢出 $\pi$ 介子汤川核力 | [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)（`LEAN ✓`）；Gross–Politzer–Wilczek 与 Wilson 格点禁闭属 `文献结果` |
| **万有引力与惯性** | 胞间 $N \ge 5$ 超静定四面体桁架共享铰链雷吉角亏 $\delta_h = 2\pi - \sum\theta_k$ 与 $\nu_0$ 时钟负载 | 玻恩模方负载 $\cos^2\theta \ge 0$ 永不反号，驱动波包沿 $\mathbf{a} = -c^2\nabla\ln(d\tau/dt)$ 向内驻相折射 | 正质能跨天文尺度不可屏蔽累加；低能受 $(R/\ell_P)^2$ 全息稀释（电子比约 $4.17\times 10^{42}$） | [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)、[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（`LEAN ✓`）；四维自旋-$2$ 完整场方程标 `OPEN` [@prob-ch34-gravity-dynamics-and-coupling] |
| **普朗克单胞合流与真空底板** | 探测能量推至 $E_P \approx 1.22\times 10^{19}\;\mathrm{GeV}$ 剥去多胞云，缩回 $N \in \{3,4\}$ 单枚极小圆弧体 | $\Delta E(3)=\Delta E(4)=0$ 时没有独立的胞间角亏自由度，$\alpha_G(E)=(E/E_P)^2 \to 1$，规范曲线为 $\mathcal{O}(10^{-2})$（相差 $33\text{–}52$ 倍） | 视界 $\eta_{\mathrm{info}}=100\%$ 阻断紫外崩溃；最小步长正矢高 $1-\cos\epsilon_{\min}>0$ 给出真空曲率意象 | 单圈近交汇三角属 `文献结果`；$\Lambda_{\mathrm{cos}}\ell_P^2\sim 10^{-122}$、$G_N$ 标定与三代耦合谱诚实标 `OPEN`（[@prob-ch34-past-hypothesis-and-cosmological-constant] 等） |

---

**从“万力归弧”迈向“三维概念场封顶与极小圆弧场大统一”。** 当单枚极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的胞内 `1D — 2D — 3D` 规范和乐与胞间 $N \ge 5$ 超静定雷吉角亏在同一道无量纲驻相条件 $\delta\Phi_{\mathrm{total}} = 0$ 下合流为一体，两道更深层的结构追问随即在峰顶前方浮现：第一，为什么无论空间位置、微观色荷还是旋转与缩放，每一个独立自洽的概念场都恰好在**三维**封顶，而教材里动辄写下的高维空间 $\mathbb{R}^{3k}$ 与无穷维希尔伯特空间 $\mathcal{H}_\infty$ 究竟藏着怎样的多概念混编真相？第二，既然电磁、弱、强三力不必塞进诱发质子衰变与磁单极子灾变的 $\mathrm{SU}(5)/\mathrm{SO}(10)$ 巨型单群矩阵，也不必借道十维/十一维紧致额外空间，我们能否直接从共享手性外尔账本上的极小圆弧迹刚度与三维色数锁死（$N_c = 3$）定量导出裸温伯格角 $\sin^2\theta_W = \frac{3}{8} \to 0.23129$、跨概念希格斯颤动成质与零规范质子衰变判据？先在下方的 `FORCE//UNIFY` 完整交互实验室中亲手拨动胞内规范三力、胞间雷吉桁架与普朗克能标滑轨，随后步入本章最后两级登顶台阶——[§39.10 三维概念场封顶原理与希尔伯特多概念混编账本](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)与全书正文的压轴收官 [§39.11 极小圆弧场大统一理论（AF-GUT）](ch39-s11-af-gut-arc-field-grand-unification.md)。

::: {.viz src="unified-arc-forces-planck-sandbox" height="640"}
**万力归弧：极小圆弧体胞内规范三力、胞间主频引力与普朗克能标合流完整交互实验室（`FORCE//UNIFY`）。** 在灰色比较球 $S^2$ 参考背景上贯通“胞内 `1D` 电磁盲平面相位纤维—胞内 `2D` 弱双覆叠与汤川闭合—胞内 `3D` 强色体积锁与通量管禁闭—胞间 $N=6$ 雷吉桁架与时钟负载引力折射—普朗克单原胞能标合流”五张实验卡并支持“几何相位读法／场论跑动读法”双透镜切换：拖动琥珀色能标与探针手柄跨越电子标度至普朗克极限 $\log_{10}(E/\mathrm{GeV}) = 19.09$（$\alpha_G(E_P) = 1.0000$），同屏对照青色胞内规范和乐、折射波前脊线与单圈规范跑动曲线（$\Delta\alpha^{-1} > 3.66$，沙盘按两位小数初值给出约 $3.67\text{–}3.68$），品红正交盲面、双矢量楔与汤川壳、通量管弦、雷吉角亏楔 $\delta_h = 77.88^\circ$ 与引力曲线 $\alpha_G(E) = (E/E_P)^2$，以及紫色极小圆弧体与多胞桁架骨架；右栏 `#evidence` 严格区分六条绿色 `LEAN ✓` 内核定理、`NUM`/`ARGUED`/`MODEL` 依据与三条红色 `OPEN` 前沿问题。
:::
