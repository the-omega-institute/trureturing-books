# 16.8 有限门字与三维割圆多面体 {#sec-finite-gate-polytope}

在前两节和[第十五章](ch15-grover-qft-and-period-finding.md)里，我们一直在理想化的连续角度空间里自由取用任意旋转角 $\theta$ 或 $\phi_k$。然而，当你真正坐到一台容错量子计算机的控制台前（回想[第十四章](ch14-cloning-codes-and-braids.md)的稳定子纠错码），硬件为你提供的容错基本逻辑门并不是无穷无尽的连续旋钮，而仅仅是屈指可数的几个**离散生成元**——最典型的就是由 Hadamard 门 $H$ 与 $\pi/8$ 相位门 $T$ 组成的双门字母表 $\{H, T\}$！

这立刻把我们推向了一个直击几何本原的尖锐问题：**用两把固定角度的离散扳手 $H$ 和 $T$ 反复拧有限次 $L$，真能拧出整颗光滑的球面吗？**

为了把“连续两轴旋转的精确有限字分解”与“离散有限门集的多面体逼近”彻底辨析清楚，让我们先看源码模块 `D5/S3/Geometry/TwoAxisFiniteRotation.lean` 证明的连续两轴有限字命题。设三维实欧氏空间为 $\mathrm{Space} = \mathrm{EuclideanSpace}\,\mathbb{R}\,(\mathrm{Fin}\,3) \cong \mathbb{R}^3$，其上的线性等距等价群为 $\mathrm{Orthogonal} = \mathrm{Space} \simeq_{\mathrm{li}}[\mathbb{R}] \mathrm{Space}$，行列式映射为 $\mathrm{determinant}(R) = \mathrm{LinearMap.det}(R.\mathrm{toLinearMap})$。对任意向量 $a \in \mathrm{Space}$，绕轴 $a$ 的**完整连续轴圆**定义为

$$
\mathrm{axisCircle}(a) = \bigl\{R : \mathrm{Orthogonal} \;\big|\; \mathrm{determinant}(R) = 1 \land R(a) = a\bigr\}.
$$

若有限列表 $l : \mathrm{List}\,\mathrm{Orthogonal}$ 中的每一个元素都属于 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$，则称 $l$ 为两轴旋转字，记作 `IsAxisWord a b l`（其生成的子群 `wordGroup` 仅取有限字乘积 `l.prod`，**不取拓扑闭包**）。下面的命题证明：只要两根轴向量 $a, b \in \mathrm{Space}$ 不共线（即它们的格拉姆行列式严格为正 $\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2\norm{b}^2$；注意此处**不要求 $a, b$ 单位归一化**），$\mathrm{SO}(3)$ 中的任何旋转 $R$ 都可以精确写成有限个来自 $\mathrm{axisCircle}(a) \cup \mathrm{axisCircle}(b)$ 的连续轴旋转之积！

::: {.proposition #prop-two-axis-finite-word title="三维空间中任意两个不共线连续旋转轴圆的有限字精确生成命题" lean="D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word"}
设 $a, b \in \mathrm{Space}$ 为三维欧氏空间中的两个向量，满足严格柯西—施瓦茨不等式

$$
\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \cdot \norm{b}^2.
$$

则对任意满足 $\mathrm{determinant}(R) = 1$ 的正交等距变换 $R : \mathrm{Orthogonal}$，必存在有限列表 $l : \mathrm{List}\,\mathrm{Orthogonal}$，使得

$$
\mathrm{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R.
$$
:::

::: proof
条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \norm{b}^2$ 保证 $a, b$ 线性无关，张成 $\mathbb{R}^3$ 的一个二维平面且两单位轴方向夹角 $\alpha \in (0, \pi)$ 满足 $\sin\alpha > 0$。在源码中，首先利用绕轴 $a$ 与绕轴 $b$ 的连续旋转可以调整向量在轴向上的投影高度（广义欧拉角分解）：因为每一步允许从完整连续圆群 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$ 中选取**任意连续实角度**，通过交替绕 $a$ 与 $b$ 的有限次旋转即可将轴 $a$ 搬运到球面上任意目标方向 $R(a)$，最后再补乘一个属于 $\mathrm{axisCircle}(a)$ 的轴向旋转对齐垂直平面方向，从而以有限字乘积 $l.\mathrm{prod}$ 精确拼出任意满足 $\mathrm{determinant}(R) = 1$ 的三维旋转 $R$。完整证明由 Lean 内核检查。
:::

**关键警示：切勿把 [@prop-two-axis-finite-word] 的“连续两轴有限字精确可达”误当作离散量子门 $\{H, T\}$ 的性质！**

在 [@prop-two-axis-finite-word] 中，每一个字母都可以从无穷连续圆 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$ 中任选连续实角度，而且定理没有对字长或离散化误差给出定量约束。与此相反，在离散量子门编译中，我们必须严格采用与上面连续字群不同的记号，直面**有限字长 $L$ 下的离散轨道与刘徽三维割圆术几何**（见图 16 面板 II）：

1. **门算子群 $\mathrm{SU}(2)/\mathrm{PU}(2)$ 与单比特状态球面 $S^2$ 的拓扑区分**：单比特 Hadamard 门与 $T$ 门定义为

   $$
   H = \frac{X + Z}{\sqrt{2}}, \qquad T = \operatorname{diag}\bigl(1,\, e^{i\pi/4}\bigr).
   $$

   忽略全局相位后，射影等价类 $[H], [T] \in \mathrm{PU}(2) \cong \mathrm{SO}(3)$；若在幺模特殊酉群 $\mathrm{SU}(2)$ 中工作，则需取行列式为 $1$ 的幺模提升（unimodular lifts）$\tilde{H} = i H$ 与 $\tilde{T} = e^{-i\pi/8} T$（满足 $\det\tilde{H} = \det\tilde{T} = 1$）。请务必分清底层流形：**$\mathrm{SU}(2) \to \mathrm{SO}(3)$ 是二对一的二重覆盖映射，其中 $\mathrm{SU}(2) \cong S^3$（三维球面），$\mathrm{SO}(3) \cong \mathbb{R}\mathrm{P}^3$（三维实射影空间）——这两座三维群流形都不等于二维单比特布洛赫球面 $S^2$！**
2. **固定初态的有限字可达轨道 $\mathcal{S}_L \subset S^2$**：固定一根初始布洛赫单位向量 $\vv{r}_0 \in S^2$（例如北极 $\vv{r}_0 = \vv{e}_z$）。对任意给定的有限门数预算 $L \in \mathbb{N}$，定义长度不超过 $L$（包含空字 $\epsilon$）的离散门字集合为

   $$
   \mathcal{W}_L = \bigl\{w \in \{H, T\}^* \;\big|\; |w| \le L\bigr\},
   $$

   并定义这些门字作用在固定初态 $\vv{r}_0$ 上在球面 $S^2$ 上留下的可达点集为

   $$
   \mathcal{S}_L = \bigl\{R_w \vv{r}_0 \;\big|\; w \in \mathcal{W}_L\bigr\} \subset S^2.
   $$

   注意两点：(i) $\mathcal{S}_L$ 只是**固定初态 $\vv{r}_0$ 的单态可达轨迹点集**，而不是三参数门算子全空间；(ii) 采用 $|w| \le L$（而非 $|w| = L$）才保证单调嵌套 $\mathcal{S}_L \subseteq \mathcal{S}_{L+1}$，且点数满足上界 $|\mathcal{S}_L| \le \sum_{j=0}^L 2^j = 2^{L+1} - 1$（代数关系如 $H^2 = I$ 及稳定子不动点可产生碰撞重复，使实际点数小于该上界）。

::: {.viz src="gate-word-polytope" preset="one" height="500"}
**门长 1：一条线段。** 北极是 $T$ 的不动点，只有 $H$ 把它送到 $\vv{e}_x$：两个青色的点只连成一条线段，还谈不上多面体。琥珀色的目标落在 $\vv{e}_x$ 上，门字 $H$ 精确命中，没有品红的缺口；紫色是 $H$ 与 $T$ 的转轴。
:::

3. **欧氏凸多面体 $P_L = \operatorname{conv}(\mathcal{S}_L)$ 与测地多面体网格**：取有限点集 $\mathcal{S}_L$ 在 $\mathbb{R}^3$ 中的欧氏凸包

   $$
   P_L = \operatorname{conv}(\mathcal{S}_L) \subset \mathbb{R}^3.
   $$

   这是一座内接于单位球体的有限顶点凸多面体。当 $L$ 很小时（如 $L = 0, 1, 2$），$P_L$ 退化为单点、线段或平面多边形（绝不能声称对每一个 $L$，$P_L$ 都已经是满三维多面体！）。当 $P_L$ 达到满三维时，它的每一个二维面（facet）都是削过球体内部的**平直欧氏弦面（flat chordal polygon）**——绝不能把这些欧氏平面多边形称作“球面 $S^2$ 上本身平坦的面”。当 $L$ 足够大使得球心落入多面体内部（$0 \in \operatorname{int} P_L$）时，将 $P_L$ 的棱与面沿径向投影（radial projection）回球皮 $S^2$，平直棱投影为大圆劣弧，便在 $S^2$ 上切出一张球面三角/多边形网格，通常称为“**测地多面体（geodesic polytope）**”（注意该术语仅指径向投影到球面上的大圆弧网格，而 $\operatorname{conv}(\mathcal{S}_L)$ 本身始终是欧氏平直多面体）。

::: {.viz src="gate-word-polytope" preset="six" height="500"}
**门长 6：包住球心，投回球皮。** $19$ 个可达点的凸包已经包住球心，把它的棱沿半径投到球皮上，就成了一张青色的大圆弧网格（测地多面体）。网格里最大的洞是品红虚线圈住的空球冠，半径 $\varepsilon_6 = 47.27^\circ$，琥珀色的箭头指着它的中心。这里画的是有限门字在球面上的落点，不是 [第二十一章](ch21-diagonalization-and-escape.md) 平面割圆里的多边形。
:::

4. **有限门长下的正逼近残差 $\varepsilon_L > 0$ 与曲率失配**：对于任何有限门长 $L < \infty$，由于 $S^2$ 是紧致二维连续统而 $\mathcal{S}_L$ 是有限点集，球面上最坏方向离最近可达顶点的测地角距离（覆盖半径）

   $$
   \varepsilon_L = \max_{\vv{r} \in S^2}\, \min_{\vv{s} \in \mathcal{S}_L} \arccos(\vv{r} \cdot \vv{s}) > 0
   $$

   **严格大于零**（且随 $L$ 增大单调不增 $\varepsilon_{L+1} \le \varepsilon_L$；至于离散通用门集在渐近编译层面的文献条件见章末 [@rem-solovay-kitaev-literature]，不能从连续轴圆定理 [@prop-two-axis-finite-word] 直接推出）。
   对于任意不落在有限点集 $\mathcal{S}_L$ 中的单位外法向 $\vv{n} \in S^2$，平直弦面的欧氏支持高度 $h = \max_{\vv{s} \in \mathcal{S}_L} (\vv{n} \cdot \vv{s}) < 1$ 与球面支持高度 $1$ 之间恒隔着一道严格为正的**径向支撑间隙** $1 - h > 0$（尽管落在 $\mathcal{S}_L$ 上的顶点本身在球面上并可被相应门字精确命中；关于圆球面曲率与多面体离散角亏的经典微分几何与拓扑文献对照，详见[第二十一章](ch21-diagonalization-and-escape.md) [@rem-hairy-ball-adams-literature]）。

::: {.viz src="gate-word-polytope" preset="nearest" height="500"}
**离目标最近的点与它的门字。** 门长 $L \le 10$ 时有 $64$ 个可达点。琥珀色的目标在 $\theta = 110^\circ$、$\varphi = 200^\circ$：离它最近的可达点由门字 $HTHTTTTTH$ 到达，相隔 $17.04^\circ$（品红的弧）；平直多面体在这个方向的支持高度 $h = 0.956$，与球皮之间的径向间隙 $1 - h = 0.044$（品红的半径段）。
:::

5. **刘徽“三维割圆术”的教学类比与单态/全门误差区分**：公元三世纪中国数学家刘徽在《九章算术注》中创立“割圆术”，用内接正多边形的平直弦段逼近圆周（“割之弥细，所失弥少，割之又割，以至于不可割”）。在三维量子门编译中，随着门字预算 $L$ 递增，有限顶点层 $\mathcal{S}_L$、内接平直弦面层 $P_L$ 与外包光滑球面层 $S^2$ 构成了鲜明的**三维割圆术**图像（注：这纯粹是“用越来越细的离散弦面逼近光滑曲面”的几何教学类比，绝非声称古代割圆术已证明现代量子编译或给出 Solovay–Kitaev 误差指数）。最后务必牢记：单态球面覆盖误差 $\varepsilon_L$ 会放过绕初态 $\vv{r}_0$ 旋转的稳定子相位，因此不能直接代替整个门算子在 $\mathrm{PU}(2)/\mathrm{SU}(2)$ 上的算子范数编译误差 $\delta(U, V) = \min_{\varphi \in \mathbb{R}}\norm{U - e^{i\varphi}V}_{\mathrm{op}}$。

::: {.viz src="sphere-escape" preset="zu" height="500"}
**割到 $24576$ 边，缝还在。** 祖冲之把割圆推到 $24576$ 边：青色的内接多边形与圆已经分不开，品红的缝 $1 - \cos\frac{\pi}{n}$ 只剩 $8.17\times10^{-9}$；放大镜纵向放大约 $7.5\times10^{7}$ 倍之后，它和第一步时一样清楚。这是平面里的割圆；拿它比照弦面逼近球面，只是上面第 5 条的教学类比（割圆数值表见[第二十一章](ch21-diagonalization-and-escape.md) [@ex-liu-hui-polygon-sagitta]）。
:::
