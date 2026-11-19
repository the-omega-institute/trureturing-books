# 29.3 从单平面、相对论同时面到六维黄金切片：普适观察者定位律 {#sec-ch34-universal-observer-localization}

一旦看破了“读数简并即法向站位”这道几何机关，我们便能跳出三维球面，把目光投向更广阔的时空度规与高维切投母格：在四维相对论时空中，观察者凭什么断定两件空间正交事件“发生在同一时刻”？在切投模型集几何（文献背景见[§28.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）中，物理观察者又凭什么锚定自身三维世界切片在六维超立方母格中的倾角？

答案依然是同一把钥匙！在不定度规空间 $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$ 中，一旦零光锥结构给定，下方的形式化命题证明：任何在零光锥上归零的二次型不仅在纯空间截面上只依赖各向同性范数平方 $\lVert w\rVert^2$（从而对空间截面内的正交转向完全简并），而且时间基矢 $(1, 0)$ 与任意空间位移 $(0, w)$ 之间的极化交叉项严格归零！与此同时，在代数整数切投模型中，典范自然数黄金展开集经物理嵌入后严格落入由共轭内部窗口筛选出的切投点集之内。

::: {.proposition #prop-ch34-null-cone-and-golden-cut-orientation title="零光锥空间各向同性极化正交锁与黄金模型集切投包含命题" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project"}
在 `trureturing` 冻结的光锥空间刚性证书模块与黄金切投模型集模块中，以下两项结论同时成立：

1. **零光锥约束下的空间范数简并与时空极化交叉项归零**（[`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)）：设 $d \in \mathbb{N}$，记时空载体 $\mathrm{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ 上的标准二次型为 $\operatorname{minkowski}_d(t, w) = t^2 - \lVert w\rVert^2$。若实二次型 $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\mathrm{Space}\;d)$ 在全部零光锥向量上取零（$\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$），则对任意空间向量 $w \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$，恒有

   $$
   S(0, w) = -S(1, 0)\cdot \lVert w\rVert^2 \;\land\; \operatorname{QuadraticMap.polar}\;S\;(1, 0)\;(0, w) = 0;
   $$

2. **典范黄金展开模型集向切投窗口点集的单向包含**（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)）：设 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden}) \subseteq \operatorname{GoldenInt}$ 为典范自然数黄金展开值集，$\operatorname{embedding} : \operatorname{GoldenInt} \to \mathbb{R}$ 为实物理嵌入，$\operatorname{goldenLattice} \subseteq \mathbb{R} \times \mathbb{R}$ 为对偶嵌入像格，$\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$ 为闭共轭接受窗，$\operatorname{goldenCutAndProjectSet}$ 为内部投影落入 $\operatorname{goldenWindow}$ 的格点物理投影集。则成立子集包含关系：

   $$
   \operatorname{embedding} '' \operatorname{goldenModelSet} \;\subseteq\; \operatorname{goldenCutAndProjectSet}.
   $$
:::

::: proof
第 1 款对任意空间向量 $w$ 构造一对反向类光向量 $(\lVert w\rVert, w)$ 与 $(-\lVert w\rVert, w)$，验证 $\operatorname{minkowski}_d(\pm\lVert w\rVert, w) = \lVert w\rVert^2 - \lVert w\rVert^2 = 0$ 后代入假设得 $S(\pm\lVert w\rVert, w) = 0$；按二次型极化展开式 $S(t, w) = t^2 S(1, 0) + S(0, w) + t\,\operatorname{polar}_S((1, 0), (0, w))$ 将两式相加消去一次项即得 $S(0, w) = -S(1, 0)\lVert w\rVert^2$，两式相减并在 $w \neq 0$ 时消去非零因子 $\lVert w\rVert$（$w = 0$ 时直接由 `polar_zero_right`）证得极化交叉项为零。第 2 款任取 $y \in \operatorname{embedding} '' \operatorname{goldenModelSet}$，写 $y = \operatorname{embedding}(\operatorname{betaGolden}(v))$（$v \in \mathbb{N}$），取格点见证 $\operatorname{minkowskiEmbedding}(\operatorname{betaGolden}(v)) \in \operatorname{goldenLattice}$，其物理第一坐标恰为 $y$，而内部共轭第二坐标 $\operatorname{betaContraction}(v)$ 由窗口有界定理 `betaContraction_mem_window` 严格落入闭区间 $\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$。完整证明由 Lean 内核检查。
:::

请注意 [@prop-ch34-null-cone-and-golden-cut-orientation] 的两处形式化边界细节：第一，在 `null_cone_spatial_rigidity` 中，空间纯位移 $(0, w)$ 无论指向 $\mathbf{e}_x$ 还是横转 $90^\circ$ 指向等长的 $\mathbf{e}_y$，二次型取值都恒等于 $-S(1, 0)\lVert w\rVert^2$，且与给定第一坐标基矢 $(1, 0)$ 的极化交叉项恒为零（注意该代数恒等式对满足光锥归零条件的任意实二次型 $S$——包括全零退化二次型 $S = 0$——均成立，本身不含非退化假设 $S(1, 0) \neq 0$，也不直接断言物理四维速度轴的逆向唯一重构；附加非退化闵氏度规与未来指向归一化后的相对论同时面反演见下方 [@rem-ch34-virtual-z-berry-relativity-literature] 第 4 款）。第二，在 `golden_model_set_subset_cut_and_project` 中，我们严格保持单向子集包含 `⊆` 的陈述忠实性（因为无约束格 `goldenLattice` 中带负整数系数的元素虽可落入闭窗口，却不属于自然数展开值域 `goldenModelSet`）；其向六维准晶观察者框架的跨维模型延伸（`MODEL`）见下方 [@rem-ch34-localization-master-table]（并参[§28.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）。

这一“盲区反演站位”原理在超导微波量子硬件、自旋几何相位、阿贝尔规范纤维与相对论力学中的四大经典物理印证汇集于下框：

::: {.remark #rem-ch34-virtual-z-berry-relativity-literature title="超导虚拟 Z 门、八分球面 Berry 几何相位、U(1) 规范相位隐身与伽利略—爱因斯坦相对性原理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章正交简并反演律在实验量子控制、几何相位与时空相对性理论中对应四项经典物理文献结论（未作为独立物理定理包含在本书锁定的 `trureturing@dev` 声明集中）：

1. **超导微波控制中的零耗时“虚拟 $Z$ 门”帧更新（D. C. McKay, C. J. Wood, S. Sheldon, J. M. Chow & J. M. Gambetta, *Phys. Rev. A* **96**, 022330, 2017；另参[第十一章](ch11-pulses-and-virtual-z.md)）**：在超导 transmon 处理器中，终端色散读出固定投影在能量本征轴 $\mathbf{O} = \pm\mathbf{e}_3$（$Z$ 基布居数）上。若在读出前仅追加一记绕 $Z$ 轴的方位角旋转 $R_z(\phi) = \exp(-i\frac{\phi}{2}\sigma_z)$，由于探针正立于 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 的法向极轴，$Z$ 基测量概率对此二次正交转向百分百失明！虚拟 $Z$ 门的实际机关则是控制帧记账：纯软件修改本地振荡器参考相位 $\varphi_{\mathrm{LO}} \mapsto \varphi_{\mathrm{LO}} - \phi$，并把这一相位偏置贯彻到所有相关后续控制，重定义其横轴 $X/Y$ 脉冲的方向。在理想控制模型中，这精确实现所需的 $Z$ 操作而无需额外模拟脉冲时长；文献报告的硬件误差与零相容，则是实验精度的陈述。极轴盲区解释的是最终残余 $Z$ 帧为何可在终端读出时舍去；途中相位通过后续横轴控制影响布居数，始终由同一本相位账本衔接。
2. **八分球面立体角 $\Omega = \pi/2$ 的 Berry—Pancharatnam 几何相位（S. Pancharatnam, *Proc. Indian Acad. Sci. A* **44**, 247–262, 1956；M. V. Berry, *Proc. R. Soc. Lond. A* **392**, 45–57, 1984）**：自旋 $1/2$ 态沿八分球面闭合大圆三角形 $\mathbf{e}_3 \to \mathbf{e}_1 \to \mathbf{e}_2 \to \mathbf{e}_3$（立体角 $\Omega = \pi/2$）绝热或测地循环一周，积累几何相位 $\gamma_B = -\frac{1}{2}\Omega = -\frac{\pi}{4}$（对应布洛赫切平面标架在 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 内转过 $\Omega = 90^\circ$，与 [@ex-ch34-spherical-addressing-and-octant-rotors] 中的旋子差因子 $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ 完全吻合）。对单支态在极点 $\pm\mathbf{e}_3$ 做投影模方测量时该相位完全隐身，必须引入相干参考支做干涉叠加才能显影。
3. **$U(1)$ 规范纤维与全局射线相位的局部不可见性（H. Weyl, *Z. Phys.* **56**, 330–352, 1929；Y. Aharonov & D. Bohm, *Phys. Rev.* **115**, 485–491, 1959）**：量子态乘以全局相位 $\psi \mapsto e^{i\chi}\psi$ 在秩一投影算符 $\lvert\psi\rangle\langle\psi\rvert$ 下恒等抵消，表明局部物理观测者对共同的射线相位失明。跨环路磁通的和乐在两条相干路径干涉时显影为规范不变的相对相位；两支共同乘上的全局相位仍在投影中抵消。
4. **伽利略船舱相对性与爱因斯坦同时面反演（Galileo Galilei, *Dialogo*, 1632；A. Einstein, *Ann. Phys.* **17**, 891–921, 1905）**：伽利略指出密封船舱内的力学实验无法测出船自身的匀速直线运动速度；爱因斯坦在狭义相对论中进一步揭示了同时性的相对性；用闵可夫斯基 1908 年引入的四维语言说，惯性观察者的四维速度 $\mathbf{u}_{\mathrm{obs}}$（自身静止时间轴）对外界空间方向满足闵可夫斯基正交 $\eta(\mathbf{u}_{\mathrm{obs}}, \Delta x) = 0 \iff \Delta t' = 0$。因此，只要看哪一族正交空间闪光事件在该观察者账本里“同时发生（时间差简并为零）”，那张三维同时超平面的唯一类时法向量就分毫不差地反演出观察者自身的四维速度 $\mathbf{u}_{\mathrm{obs}}$！
:::

::: {.viz src="berry-loop" preset="octant" height="500"}
**八分球面回路：箭头转过 $\pi/2$，内积的相位只记下一半。** 第十章的回路页：青色回路 $N \to +X \to +Y \to N$ 圈住品红面积 $\Omega = \pi/2$，沿回路搬运的琥珀色箭头回到起点时转过 $\pi/2$，右下角青色的指针停在 $\pi/4$；贝里相位约定 $\gamma_B = -\Omega/2$ 是文献结果，未在本书形式化（[@rem-ch34-virtual-z-berry-relativity-literature]）。
:::

最后，在本书的跨维度几何诠释框架（**`MODEL`（模型诠释）**）下，我们将从二维单平面、三维单位球面、四维相对论时空一直到六维黄金超立方母格的**普适观察者定位四阶总表**收束于下框：

::: {.remark #rem-ch34-localization-master-table title="普适观察者定位四阶总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表汇总二维平面、三维旋子球面（[@ex-ch34-spherical-addressing-and-octant-rotors]）、四维相对论同时面（[@rem-ch34-virtual-z-berry-relativity-literature]）与六维切投母格（[@rem-ch32-icosian-e8-literature]）文献背景同本书 `MODEL` 及形式化内核定理（`LEAN ✓`）的对应关系：

| 几何舞台与维度（`MODEL`） | 一次正交操作 vs. 两次正交操作 | 发生读数简并的盲区核 | 由简并反演锁定的观察者位置 $\mathbf{O}$ |
| :--- | :--- | :--- | :--- |
| **1. 单旋转平面 $\hat{\mathbf{I}} = \mathbf{e}_1 \wedge \mathbf{e}_2$** | 从 $\mathbf{u}_0 = \mathbf{e}_1$ 经一次 $90^\circ$ 得 $\mathbf{u}_1 = \mathbf{e}_2$，经两次 $90^\circ$ 得反向 $\mathbf{u}_2 = -\mathbf{e}_1$ | 面外法向对一切面内旋转给出零内积；面内固定 $\mathbf{u}_0$ 时有符号内积满足 $O_2 = -O_1$，内积平方满足 $\lvert O_1\rvert = \lvert O_2\rvert$ | 面外法轴 $\mathbf{O} = \pm\mathbf{e}_3$（全向零读数）；面内反角平分线 $\pm(\mathbf{e}_1 - \mathbf{e}_2)/\sqrt{2}$（有符号等读数）及双角平分线 $\lvert O_1\rvert = \lvert O_2\rvert$（等模方 $1/2$） |
| **2. 三维球面两步寻址与八分旋子** | $\mathbf{v}_1(\theta)$ vs. $\mathbf{v}_2(\theta, \phi)$ 及一步旋子 $R_{\mathrm{once}}$ vs. 两步旋子 $R_{\mathrm{twice}}$（[@ex-ch34-spherical-addressing-and-octant-rotors]） | 单步 $\phi = \pi/2$ 下 $O_1 = O_2$；全角 $\forall\phi \in [0, 2\pi)$ 下整个横向双向量面 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 隐身（初等计算；相关引理见 [@thm-ch34-readout-kernel-and-covariant-commutator]） | 单对锁定对称子午线 $O_1 = O_2$；全角简并唯一锁定极点法向轴 $\mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2)$（初等计算；相关引理见 [@thm-ch34-perpendicular-axis-and-pullback]） |
| **3. 四维相对论时空 $\mathbb{R}^{1,3}$** | 纯空间位移沿 $\mathbf{e}_x$ 与横转 $90^\circ$ 沿等范数 $\mathbf{e}_y$ 迈步（[@prop-ch34-null-cone-and-golden-cut-orientation] 与 [@rem-ch34-virtual-z-berry-relativity-literature]） | 等空间距离 $\lVert w\rVert$ 事件的时间偏置与时空极化交叉项 `polar S (1,0) (0,w)` 恒为零 | 在非退化闵氏度规（$S(1,0) \neq 0$）与未来指向单位归一化下，唯一反演出观察者静止四维速度轴 $\mathbf{u}_{\mathrm{obs}} = \mathbf{e}_0 = (1, \mathbf{0})$ 及其正交三维同时超平面 |
| **4. 六维黄金母格 $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$** | 幂等物理投影 $P_\parallel^2 = P_\parallel$ 与内部补空间 $E_\perp^3$ 内的正交转动（[@prop-ch34-null-cone-and-golden-cut-orientation] 推广之 `MODEL`） | 整个三维内部共轭子空间 $E_\perp^3 = \ker P_\parallel$ 在单次静态物理坐标投影下完全隐身 | 简并核的正交补 $(E_\perp^3)^\perp = E_\parallel^3$ 唯一锁定观察者三维物理世界在六维超立方中的黄金切片朝向 |
:::

::: {.figure src="ch34-three-localizations"}
**三个舞台上的同一条定位律：读数看不见的方向（品红）与观察者（琥珀）互相垂直。** 第 I 栏，单平面里 $\mathbf{u}_0 = \mathbf{e}_1$ 转一次到 $\mathbf{u}_1 = \mathbf{e}_2$（实心点）、转两次到 $\mathbf{u}_2 = -\mathbf{e}_1$（空心圈），琥珀色虚线是与品红弦 $\mathbf{u}_2 - \mathbf{u}_1$ 垂直的反角平分线 $O_2 = -O_1$，两点在它上面的影子落在同一个青色点；第 II 栏，时空图里运动观察者的世界线 $u$（琥珀）与它的同时线（品红）关于灰色光锥对称，二者闵氏正交（示意取 $v = 0.5c$；文献结果，未在本书形式化）；第 III 栏，黄金切片 $E_\parallel$ 与内部方向 $E_\perp$，青色窄带是接受窗 $[-\varphi^{-2}, \varphi^{-1}]$（[@prop-ch34-null-cone-and-golden-cut-orientation] 第 2 款；切片即站位是模型诠释，`MODEL`）。
:::

站在四阶总表前再读章首那句箴言，零背景宇宙里最幽微的一层认识论迷雾彻底散尽：有限观察者从来不需要祈求一颗悬浮在宇宙之外的“第 3 点 $C$”来替自己标定经纬。你的眼睛看不见自己的视网膜，你的尺子量不出沿自身视线法向旋拧的赤道圆环；然而，只要你在球面上做一次正交转向与两次正交转向，把所有令你读数归于沉寂的旋转平面收集起来——**凡简并处，皆是自身立锥之地。**

::: {.viz src="spherical-degeneracy-radar" height="640"}
**球面简并雷达。** 四个场景共用一颗球：寻址、旋子、测试态与标架。拖动琥珀色的观察者，看哪些转动在它的读数里隐身、哪些盲圈经过它的站位。
:::

前三节回答了“一次正交与两次正交读数重合时，观察者站在哪里”；现在让我们再追问一层本体论根源——抛开特定观察者的盲区不谈，“正交一次”与“正交两次”本身在几何上究竟是什么关系？当步长从宏观 $90^\circ$ 缩向无穷小 $\epsilon \ll 1$ 时，那颗支撑全部曲率与开维体积的最小几何原子立刻显露真容。

---
