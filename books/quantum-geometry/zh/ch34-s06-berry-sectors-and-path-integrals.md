# 34.6 贝里扇锥体积、同点异相纤维抬升与费曼路径积分驻相选路 {#sec-ch34-berry-sector-volume-and-path-integral}

> *“我们知道贝里相位，本质上这个相位应该跟极小圆弧体积或者圆弧表面积有关，为什么到达一个点，相位不一样，因为路径不一样，路径与相位是对偶的，这应该也跟路径积分有关。”*

这句看似朴素的几何追问，一锤定音地将量子力学四大核心概念——**贝里几何相位**、**霍普夫纤维丛的同点异相记忆**、**威尔逊路径—相位和乐对偶**与**费曼路径积分驻相选路**——严丝合缝地收束到了 §34.4 那枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的实心体与球面帽之上。在传统教科书里，贝里相位常被当作绝热微扰方程末尾冒出来的附加修正项，路径积分则被写成抽象函数空间上的形式求和；而在零背景比较几何下，它们其实是同一笔账的两个切面：基球面上的“点”只是双向公平平方折叠后的无记忆残影，而悬挂在点上方的相位纤维则忠实记录着两条来路在球心之间扫过的**品红弧顶表面积 $A_{\mathrm{cap}}$ 与三维实心扇锥体积 $V_{\mathrm{sector}}$**，并借非驻相路径之间的螺旋抵消筛出经典测地轨迹。

## 34.6.1 弧顶表面积即球心扇锥体积：$\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$ 与三维斯托克斯延拓 {#sec-ch34-6-1}

为什么引文同时提到“**极小圆弧体积**或者**圆弧表面积**”？因为在由双向互易公平平方律 $\lVert\mathbf{n}\rVert^2 = \cos^2\theta + \sin^2\theta = 1$ 钉死单位半径（$R = 1$）的比较球面 $S^2 \subset \mathbb{R}^3$ 上，任意一块定向球面帽区域 $\Sigma_2 \subset S^2$ 的二维弧顶表面积与它同球心 $O$ 围成的三维实心球扇形锥体积，根本不是两个彼此独立的几何量，而是**同一个立体角不变量 $\Omega(\Sigma_2)$ 在二维边界与三维体块上的严格正比实现**！沿用 §34.4 的直角三面角原胞顶点记号 $\mathbf{B} = \mathbf{e}_2$、$\mathbf{A}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2$ 与 $\mathbf{C}(\epsilon) = \sin\epsilon\,\mathbf{e}_3 + \cos\epsilon\,\mathbf{e}_2$（$\epsilon \in (0, \frac{\pi}{2}]$，以下爱因斯坦求和约定对重复指标 $i, j, k \in \{1, 2, 3\}$ 求和），我们分三层把面积、体积与旋量相位算到分毫不差：

1. **二维品红球面帽表面积 $A_{\mathrm{cap}}(\Sigma_2) = \Omega(\Sigma_2)$（文献结果，未在本书形式化）**：在单位球面 $S^2$ 上，外法向面积二形式恰为立体角微元 $d\Omega = \frac{1}{2}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k$，故球面片 $\Sigma_2$ 的二维表面积恒等于其所张立体角：

   $$
   A_{\mathrm{cap}}(\Sigma_2) \;=\; \iint_{\Sigma_2} d\Omega \;=\; \iint_{\Sigma_2} \frac{1}{2}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k \;=\; \Omega(\Sigma_2).
   $$

   特别对直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的品红球面帽 $\Sigma_2 = \triangle_{\mathrm{sph}}ABC$，吉拉尔角超公式直接给出

   $$
   A_{\mathrm{cap}}(\epsilon) \;=\; \Omega(\epsilon) \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6).
   $$

2. **三维品红实心球扇锥体积 $V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2)$ 的精确斯托克斯推导（手工推导）**：以球心原点 $O$ 为锥顶、以球面片 $\Sigma_2 \subset S^2$ 为弧顶底面，构造闭单位球 $B^3 \subset \mathbb{R}^3$ 内的三维实心欧氏球扇锥

   $$
   \mathcal{C}(\Sigma_2) \;=\; \bigl\{\, r\mathbf{n} \in \mathbb{R}^3 \;\big|\; 0 \le r \le 1,\;\mathbf{n} \in \Sigma_2 \,\bigr\} \;\subset\; B^3,
   $$

   并在 $\mathbb{R}^3$ 上取欧氏径向二形式 $\omega_2 = \frac{1}{3!}\epsilon_{ijk}\,x^i\,dx^j\wedge dx^k = \frac{1}{6}\epsilon_{ijk}\,x^i\,dx^j\wedge dx^k$。对其求外微分，由于 $3! = 6$ 个指标排列各自同号贡献 $+dx^1\wedge dx^2\wedge dx^3$，立得 $d\omega_2 = \frac{1}{6}\epsilon_{ijk}\,dx^i\wedge dx^j\wedge dx^k = dx^1\wedge dx^2\wedge dx^3 = dV_{\mathbb{R}^3}$。现在考察扇锥边界 $\partial\mathcal{C}(\Sigma_2)$：除 $r = 1$ 处外向定向的品红球面帽 $\Sigma_2$ 之外，其余边界皆为由径向母线扫出的锥面侧壁 $[0, 1] \times \partial\Sigma_2$（在一般球面片上就是沿边界曲线收向球心的锥面裙边；在 $\Delta\mathcal{T}_\epsilon$ 上则是三扇平直坐标扇形墙 $OAB$、$OBC$、$OCA$）。在任何侧壁片 $(r, s) \mapsto x(r, s) = r\mathbf{n}(s)$ 上，位置矢量 $x = r\mathbf{n}$ 与径向切矢量 $\partial_r x = \mathbf{n}$ 严格共线，代入全反对称张量 $\epsilon_{ijk}x^i\,\partial_r x^j\,\partial_s x^k = r\,\epsilon_{ijk}n^i n^j\dot{n}^k \equiv 0$ 逐点恒等于零！因此无需任何无穷小近似，三维斯托克斯定理当场锁死实心扇锥体积恒等式：

   $$
   V_{\mathrm{sector}}(\Sigma_2) \;=\; \iiint_{\mathcal{C}(\Sigma_2)} dV_{\mathbb{R}^3} \;=\; \iint_{\Sigma_2} \frac{1}{3!}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k \;=\; \frac{1}{3}\Omega(\Sigma_2) \;=\; \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2)
   $$

   （对一般半径 $R$ 则为 $V_{\mathrm{sector}} = \frac{R}{3}A_{\mathrm{cap}} = \frac{1}{3}R^3\Omega$；单位模方公平 $R = 1$ 将比例常数刚性钉在 $\frac{1}{3}$）。把这枚向外鼓起的**品红实心球扇锥** $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon) = \frac{\epsilon^2}{6} + \frac{\epsilon^4}{36} + O(\epsilon^6)$ 与切过三条直弦的**青色平直欧氏弦四面体 $O\mathbf{A}\mathbf{B}\mathbf{C}$** 并排对照：由[第十章](ch10-gram-geometry-and-order.md) [@thm-qubit-bargmann-bloch]（`triple_bargmann_bloch`，`LEAN ✓`），三点巴格曼迹的虚部直接读出平直弦四面体的有向体积

   $$
   V_{\mathrm{tetra}}(\epsilon) \;=\; \frac{1}{6}\,\mathbf{A}(\epsilon)\cdot\bigl(\mathbf{B}\times\mathbf{C}(\epsilon)\bigr) \;=\; \frac{1}{6}\sin^2\epsilon \;=\; \frac{2}{3}\operatorname{Im}\operatorname{Tr}\bigl(P(\mathbf{A}(\epsilon))\,P(\mathbf{B})\,P(\mathbf{C}(\epsilon))\bigr) \;=\; \frac{\epsilon^2}{6} - \frac{\epsilon^4}{18} + O(\epsilon^6).
   $$

   两者在无穷小极限 $\epsilon \to 0^+$ 下共享完全相同的二阶主项 $\frac{\epsilon^2}{6}$；而在任意有限步长 $\epsilon \in (0, \frac{\pi}{2}]$ 下，品红球面帽向外鼓出的曲率冠顶则精确贡献严格为正的四阶及以上体积盈余 $V_{\mathrm{sector}}(\epsilon) - V_{\mathrm{tetra}}(\epsilon) = \frac{\epsilon^4}{12} + O(\epsilon^6) > 0$！

3. **自旋-$1$ 切向转角、自旋-$\frac{1}{2}$ 贝里相位与韦斯—祖米诺拓扑延拓的三重辨析（文献结果，未在本书形式化）**：沿 $\partial\Sigma_2$ 平行移动一周，球面切丛 $TS^2$ 上的切向量转过整角 $\Delta\alpha_{\mathrm{vec}} = +\Omega = +A_{\mathrm{cap}} = +3V_{\mathrm{sector}}$（对应光子螺旋度等自旋-$1$ 矢量场的几何相位 $-\Omega = -A_{\mathrm{cap}} = -3V_{\mathrm{sector}}$）；而在双覆盖旋子群 $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \cong S^3$ 中（按[第十章](ch10-gram-geometry-and-order.md)自旋朝上本征支约定），半角提升把极小弧面体回路的旋量贝里相位精确锁定在弧顶面积的负二分之一、亦即实心扇锥体积的负二分之三：

   $$
   \gamma_B(\Delta\mathcal{T}_\epsilon) \;=\; -\frac{1}{2}A_{\mathrm{cap}}(\epsilon) \;=\; -\frac{3}{2}V_{\mathrm{sector}}(\epsilon) \;=\; -\frac{1}{2}\Omega(\epsilon).
   $$

   在场论与微分几何文献中，务必将三件数学层级截然不同的“体积/延拓”对象严格区分开来，绝不可混为一谈：（i）上式推导的欧氏三维实心扇锥体积 $V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}\Omega(\Sigma_2) \subset B^3$；（ii）$(0+1)$ 维自旋-$s$ 相干态路径积分中的**韦斯—祖米诺（Wess–Zumino）二维圆盘拓扑项** $S_{\mathrm{WZ}}[\tilde{\mathbf{n}}] = -s\iint_{D^2}\frac{1}{2}\epsilon_{ijk}\,\tilde{n}^i\,d\tilde{n}^j\wedge d\tilde{n}^k = -s\,\Omega$——由于霍普夫丛第一陈数 $|c_1| = 1$ 禁止 $S^2$ 上存在全局无奇点联络一形式 $\mathcal{A}$，闭合演化回路 $\mathbf{n} : S^1 \to S^2$ 必须延拓到以它为边界的二维圆盘 $\tilde{\mathbf{n}} : D^2 \to S^2$ 上积分；若改选球面另一侧的补集南帽 $D'^2$，有向立体角跳变 $\Omega \mapsto \Omega - 4\pi$，路径积分相因子 $e^{i S_{\mathrm{WZ}}}$ 的单值性遂当场逼出狄拉克拓扑量子化条件 $e^{i 4\pi s} = 1 \Longleftrightarrow 2s \in \mathbb{Z}$；以及（iii）$(1+1)$ 维共形场论中的 $\mathrm{SU}(2)$ **韦斯—祖米诺—威滕（WZW）三维球拓扑项** $\Gamma_{\mathrm{WZW}}[g] = \frac{k}{24\pi}\iiint_{\mathcal{B}_3}\operatorname{Tr}\bigl[(g^{-1}dg)^3\bigr]$（能级 $k \in \mathbb{Z}$，将二维时空场 $g : S^2 \to \mathrm{SU}(2) \cong S^3$ 延拓至三维球体 $\mathcal{B}_3$，文献背景见下方 [@rem-ch34-berry-wzw-wilson-feynman-literature]）。

::: {.viz src="berry-sector-path-sandbox" preset="sector-volume" height="520"}
**弧顶表面积与实心扇锥体积：$\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$。** 拖动琥珀色步长手柄调节 $\epsilon$：单位球面上品红球面帽面积 $A_{\mathrm{cap}}(\epsilon) = \Omega(\epsilon)$ 与球心围出的品红三维实心扇锥体积 $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)$ 严格保持 $3:1$ 锁定，在有限步长下鼓出在青色平直弦四面体 $V_{\mathrm{tetra}}(\epsilon) = \frac{1}{6}\sin^2\epsilon$（绿色 `LEAN ✓` `triple_bargmann_bloch`）外侧；连续立体角旋量和乐标 `ARGUED`。
:::

## 34.6.2 为什么到达同一点相位却不同：公平平方残影与霍普夫纤维历史账本 {#sec-ch34-6-2}

看清了 $A_{\mathrm{cap}}$ 与 $V_{\mathrm{sector}}$ 的正比锁定，引文的第二句追问——**“为什么到达一个点，相位不一样？因为路径不一样”**——便直指[第 31 章 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)与[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)确立的“公平必平方、平方折相位”认识论分野：

- **基球面上的点 $\mathbf{C} \in S^2$ 是抹去来路的“公平平方残影”**：在三明治双侧夹乘 $\mathbf{C} = \psi\mathbf{e}_0\widetilde{\psi}$（或秩一密度投影算子 $P(\mathbf{C}) = \lvert\psi\rangle\langle\psi\rvert$）下，双向互易公平要求振幅成对共轭平方，结果把整整一圈 $U(1) \cong S^1$ 相对相位（对应 `EscapePairs` 原像折叠与对角可观测量相位盲区 `diagonal_prime_observables_cannot_recover_relative_phase`）彻底压扁成基球面 $S^2$ 上的同一个点。这在拓扑上构成了**霍普夫主圆丛** $S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2$（文献结果，其一维平方双覆盖原型由下方 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 3 款 `no_continuous_global_section` 与 `circle_double_cover_history_lift` 严格锁定）。因此，基点 $\mathbf{C}$ 只是一张马尔可夫式的瞬时投影快照，它根本不记得系统是从哪条路走过来的。
- **两条不同路径在隐藏的堇紫色 $S^1$ 纤维上爬到了不同高度**：回到极小三角弧面体 $\Delta\mathcal{T}_\epsilon$，从同一个初始抬升旋子 $\psi_0 \in \pi^{-1}(\mathbf{A}(\epsilon))$ 出发，对比通往同一终点 $\mathbf{C}(\epsilon)$ 的两条典范路径：
  1. **“正交一次”路径 $\Gamma_1 = \widehat{AC}$**：沿青色单步大圆测地弧直接滑向 $\mathbf{C}(\epsilon)$；
  2. **“正交两次”路径 $\Gamma_2 = \widehat{AB} + \widehat{BC}$**：先沿第一面墙走到转枢 $\mathbf{B}$，硬拐 $90^\circ$ 再沿第二面墙走到 $\mathbf{C}(\epsilon)$。

  在每一步都严格遵守**水平平行移动条件** $\langle\psi \mid d\psi\rangle = 0$（局部沿纤维方向零自转、绝不人为偷拧相位表盘）的前提下，将 $\Gamma_2$ 顺着反向测地弧 $\Gamma_1^{-1} = \widehat{CA}$ 闭合回起点 $\mathbf{A}(\epsilon)$，闭合环路 $\Gamma_2 \circ \Gamma_1^{-1}$ 恰好围住品红球面帽 $\triangle_{\mathrm{sph}}ABC$ 与实心扇锥 $\mathcal{C}(\triangle_{\mathrm{sph}}ABC)$。在 $\mathcal{Cl}_{3,0}^+$ 中，由于单步测地旋子 $U_{AC} = U_{CA}^{-1}$ 将起点单位切双向量共轭搬运为终点单位切双向量 $U_{AC}\hat{\mathbf{I}}_{\mathbf{A}}\widetilde{U}_{AC} = \hat{\mathbf{I}}_{\mathbf{C}}$，由 §34.4.2 的测地闭环和乐 $U_{CA}U_{\Gamma_2} = \exp\bigl(-\frac{1}{2}\Omega(\epsilon)\hat{\mathbf{I}}_{\mathbf{A}}\bigr)$ 左乘 $U_{AC}$ 立即推出：两条路径的抬升终点虽然分毫不差地投向**同一个基球面点** $\pi(\psi_{\Gamma_1}) = \pi(\psi_{\Gamma_2}) = \mathbf{C}(\epsilon)$，却在悬于 $\mathbf{C}(\epsilon)$ 正上方的**堇紫色霍普夫 $S^1$ 相位纤维**上拉开了精确高度差：

  $$
  \psi_{\Gamma_2} \;=\; \exp\!\left(-\frac{1}{2}\Omega(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{C}}\right)\psi_{\Gamma_1} \;=\; \exp\!\left(-\frac{3}{2}V_{\mathrm{sector}}(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{C}}\right)\psi_{\Gamma_1}
  $$

  （在八分球面极限 $\epsilon = \frac{\pi}{2}$ 处，纤维相位差恰为 $\gamma_B = -\frac{\pi}{4}$）。**基点只记当下投影，相位专记历史体积**——单独站在 $\mathbf{C}$ 点做一次投影测量时 $|e^{i\gamma_B}|^2 = 1$ 完全隐身；一旦让 $\Gamma_1$ 与 $\Gamma_2$ 两束振幅在 $\mathbf{C}$ 点重逢干涉，这笔藏在纤维上的扇锥体积账本便当场化作明暗条纹的余弦相移 $\cos\gamma_B(\epsilon)$！

::: {.viz src="berry-sector-path-sandbox" preset="hopf-fiber-lift" height="520"}
**同点异相的霍普夫纤维抬升：基点 $\mathbf{C}$ 重合，堇紫色 $S^1$ 纤维记下来路扇锥体积。** 青色“正交一次”直弧 $\Gamma_1 = \widehat{AC}$ 与琥珀色偏折路径 $\Gamma_2 = \widehat{AB} + \widehat{BC}$ 落在基球面同一点 $\mathbf{C}$，但在右侧堇紫色霍普夫 $S^1$ 相位纤维柱上爬升到不同相位高度，差值精确等于两路之间所夹品红扇锥体积的 $-\frac{3}{2}$ 倍（一维双覆盖历史提升锚定绿色 `LEAN ✓` `circle_double_cover_history_lift` 与 `no_continuous_global_section`）。
:::

下述综合定理将 `trureturing` 中跨量子信息、覆盖空间拓扑与规范和乐模块的六条冻结内核定理汇于一炉，为三点有向体积迹、任意步离散巴格曼路径积、历史依赖双覆盖提升以及生成树与回路相位的精确分类立下零近似形式化地基：

::: {.theorem #thm-ch34-berry-sector-holonomy-and-bargmann-lift title="三点巴格曼体积迹、离散秩一路径积、双覆盖历史提升与锚定树回路相位分类" lean="D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification"}
在 `trureturing` 冻结的单比特巴格曼不变量、二重覆盖历史提升与命名图规范和乐分类模块中，以下五项结论同时成立：

1. **单比特三点巴格曼布洛赫迹与有向体积分解**（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）：对任意实三维向量 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{R}^3$（不要求单位范数；令 $P(\mathbf{r}) = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$，其当且仅当 $\lVert\mathbf{r}\rVert = 1$ 时为秩一投影算子），恒有

   $$
   \operatorname{Tr}\bigl(P(\mathbf{a})\,P(\mathbf{b})\,P(\mathbf{c})\bigr) \;=\; \frac{1 + \mathbf{a}\cdot\mathbf{b} + \mathbf{b}\cdot\mathbf{c} + \mathbf{c}\cdot\mathbf{a}}{4} \;+\; i\,\frac{\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})}{4};
   $$

2. **离散秩一外积链的循环巴格曼路径乘积**（[`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)）：对任意自然数 $n \in \mathbb{N}$ 与任意复二维向量 $v_0, \dots, v_n \in \mathbb{C}^2$（不要求归一化或非零），记 $R_j = v_j v_j^\dagger$ 且内积约定为 $\langle u, v\rangle = u^\dagger v$，则有序矩阵乘积的迹恒等于相邻重叠连乘配闭合内积：

   $$
   \operatorname{Tr}(R_0 \cdots R_n) \;=\; \left(\prod_{j=0}^{n-1}\langle v_j, v_{j+1}\rangle\right)\langle v_n, v_0\rangle
   $$

   （当 $n = 0$ 时空积取 $1$，给出 $\operatorname{Tr}(R_0) = \langle v_0, v_0\rangle$）；

3. **圆周平方双覆盖的唯一历史提升与无全局连续截面障碍**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)、[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)）：在单位圆 $\operatorname{Circle}$ 的平方覆盖映射 $\operatorname{sq} : z \mapsto z^2$ 下，任意满足 $z_0^2 = \gamma(0)$ 的连续基路径 $\gamma : [0, 1] \to \operatorname{Circle}$ 存在唯一一条以 $z_0$ 为起点的连续提升路径 $\widetilde{\gamma} : [0, 1] \to \operatorname{Circle}$ 使 $\operatorname{sq}\circ\widetilde{\gamma} = \gamma$；不存在满足 $\forall z \in \operatorname{Circle},\; (s(z))^2 = z$ 的全局连续截面 $s : \operatorname{Circle} \to \operatorname{Circle}$；且整圈闭合回路 $\gamma_\circ(t) = e^{2\pi i t}$ 从 $z_0 = 1$ 出发的唯一连续提升必在同一点上方换叶至对径纤维点 $\widetilde{\gamma}_\circ(1) = -1$；

4. **选定命名生成树上的阿贝尔相位输运定律**（[`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)）：对任意顶点与边类型 $V, E$、端点映射 $s, t : E \to V$、命名生成树 $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$ 与根顶点 $r \in V$，树路径相位输运映射 $\operatorname{rootPhase}\;ht\;r$ 对任意边相位场 $u : E \to \operatorname{Circle}$ 满足根点归一 $\operatorname{rootPhase}(u, r) = 1$、树边递推重建 $\operatorname{rootPhase}(u, t(e)) = u(e)\cdot\operatorname{rootPhase}(u, s(e))$（$\forall e \in T$）、端点规范协变性 $\operatorname{rootPhase}(\operatorname{gauge}(s, t, g, u), a) = g(a)\cdot\operatorname{rootPhase}(u, a)\cdot g(r)^{-1}$、乘积拓扑连续性、逐点乘法同态性以及单位常值场保一性 $\operatorname{rootPhase}(1, a) = 1$；

5. **有限图锚定回路与开放锚点路径相位的完备分类同构**（[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）：设 $V, E$ 为有限类型（`[Fintype V] [Fintype E]`），$ht : \operatorname{NamedSpanningTree}\;s\;t\;T$，锚点集 $R \subseteq V$ 含根 $r \in R$，记锚定上边缘子群为 $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$，并记 $n = |V|$、$m = |E|$、$k = |R|$、基本回路弦数 $c = |\{e : E \mid e \notin T\}| = m + 1 - n$ 及非根锚点数 $a = |\{x : V \mid x \in R \land x \neq r\}| = k - 1$。则两个边相位场 $u, w : E \to \operatorname{Circle}$ 处于同一锚定规范轨道（$\exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}(s, t, g, u) = w$）当且仅当二者的基本弦回路和乐与根到锚点路径相位坐标完全一致（$\chi(u) = \chi(w)$），且诱导紧 Hausdorff 拓扑群同构

   $$
   \bigl((E \to \operatorname{Circle}) / N\bigr) \;\simeq_{\mathrm{t}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{t}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr).
   $$
:::

::: proof
第 1 款直接引用[第十章](ch10-gram-geometry-and-order.md) [@thm-qubit-bargmann-bloch] 第 1 款，按泡利矩阵乘法恒等式展开三算子乘积并取迹即得标量内积实部与混合积有向体积虚部。第 2 款直接引用[第三章](ch03-projectors-and-duality.md) [@thm-rank-one-chain-trace]，利用秩一结合律 $(u u^\dagger)(w w^\dagger) = \langle u, w\rangle u w^\dagger$ 对链长 $n$ 归纳并由循环迹闭合尾项 $\langle v_n, v_0\rangle$。第 3 款直接引用[第五章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift] 的全部三项结论。第 4 款与第 5 款分别直接引用[第十八章](ch18-spinors-and-gauge-curvature.md) [@thm-tree-phase-transport] 与 [@cor-anchored-phase-classification]，沿选定命名生成树消去内部顶点的规范冗余，将商群 $(E \to \operatorname{Circle})/N$ 精确同构到 $c = m + 1 - n$ 个基本弦闭合回路和乐与 $a = k - 1$ 个锚定开放树路径相位的直积环面。完整证明由 Lean 内核检查。
:::

## 34.6.3 路径与相位的精确对偶：威尔逊和乐特征标与规范重构边界 {#sec-ch34-6-3}

由此，引文第三句核心论断——**“路径与相位是对偶的”**——获得了严格的微分几何与代数拓扑表述。在连续规范场论文献中（文献结果，未在本书形式化），流形 $M$ 上模去保定向重参数化与紧邻原路折返（$\Gamma \circ \Gamma^{-1} \sim \mathrm{id}$）后的**瘦同伦路径群胚（thin-homotopy path groupoid）** $\mathcal{P}_1(M)$，与规范群（阿贝尔 $U(1)$ 或非阿贝尔 $\mathrm{SU}(2)$）中的**路径有序威尔逊和乐算子**

$$
W(\Gamma) \;=\; \mathcal{P}\exp\!\left(-i\int_{\Gamma} \mathcal{A}\right)
$$

构成一对精确的函子式配对（在阿贝尔 $U(1)$ 情形下即为从一维链空间配向单位圆相位群 $\operatorname{Circle}$ 的特征标配对），而其在任意图网络上的离散精确版本，正是 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 4、5 款锁定的生成树输运 `selected_tree_transport` 与锚定回路分类 `anchored_phase_classification`（`LEAN ✓`）！路径空间中的每一项几何操作，都在相位/和乐空间中拥有一一对应的代数镜像：

| 几何路径空间 $\mathcal{P}_1(M)$ / 图路径 | 对偶相位与和乐空间 $\operatorname{Circle}$ / $\mathrm{SU}(2)$ | 微观原胞 $\Delta\mathcal{T}_\epsilon$ 与离散图实现 |
| :--- | :--- | :--- |
| **1. 首尾路径拼接** $\Gamma_2 \circ \Gamma_1$ | **相位相加 / 有序和乐相乘** $W(\Gamma_2)\,W(\Gamma_1)$（阿贝尔 $e^{i(\gamma_2 + \gamma_1)}$） | 两面垂直墙分步走 $\widehat{AB} + \widehat{BC}$ 对应旋子有序左乘 $U_{23}(\epsilon)\,U_{12}(\epsilon)$ 及树边递推 `rootPhase` |
| **2. 路径反向倒走** $\Gamma^{-1}$ | **复共轭 / 幺正求逆** $W(\Gamma)^\dagger = W(\Gamma)^{-1}$（阿贝尔 $e^{-i\gamma}$） | 反向闭合弧 $\widehat{CA} = \widehat{AC}^{-1}$ 取逆旋子 $U_{CA} = U_{AC}^\dagger$，三点巴格曼迹 $\Delta \mapsto \overline{\Delta}$ 手性翻号 |
| **3. 两路围成闭合边界** $\partial\Sigma_2 = \Gamma_2 \circ \Gamma_1^{-1}$ | **内部曲率通量与扇锥体积** $\oint_{\partial\Sigma_2}\mathcal{A} = \iint_{\Sigma_2}\mathcal{F}$ | $\Gamma_2$ 与青色直弧 $\Gamma_1$ 闭合夹出品红扇锥体积 $V_{\mathrm{sector}} = \frac{1}{3}\Omega$，锁定旋量相位差 $-\frac{3}{2}V_{\mathrm{sector}}$ 与弦回路坐标 |
| **4. 单连通零曲率域**（$\mathcal{F} = 0,\; \pi_1(M) = 0$） | **路径无关的纯规范树势差** $e^{i(\phi(\mathbf{C}) - \phi(\mathbf{A}))}$ | 删去树外弦边（$c = m + 1 - n = 0$）的青色生成树 $T$ 上，开放相位仅由端点锚值唯一决定 |

为了确保这组“路径—相位对偶”在数学上滴水不漏，必须同时立下两道精确的边界护栏：

1. **局部零曲率 $\mathcal{F} = 0$ 推出路径无关，必须以单连通性 $\pi_1(M) = 0$ 为前提**：若底空间存在拓扑孔洞（$\pi_1(M) \neq 0$），例如[第十八章](ch18-spinors-and-gauge-curvature.md)讨论的穿孔阿哈罗诺夫—玻姆（Aharonov–Bohm）平面 $\mathbb{R}^2 \setminus \{0\}$，螺线管外部处处局部场强为零 $\mathcal{F} = 0$，但绕孔洞一周的不可缩闭合回路依然携带着不可抹除的非平凡相位 $e^{iq\Phi_B/\hbar} \neq 1$——在离散图分类 `anchored_phase_classification` 中，这恰对应环绕孔洞的树外弦边给出 $c = m + 1 - n > 0$ 个独立基本回路坐标！
2. **和乐相位在差一个局部规范等价的意义下完备重构联络（文献结果）**：曼德尔斯塔姆（Mandelstam 1962）、贾尔斯（Giles 1981）与巴雷特（Barrett 1991）重构定理严格证明，所有闭合回路威尔逊圈（连同锚定开放路径）的和乐数据，能够在**模去局部规范变换 $g$** 的意义下唯一重构规范联络 $\mathcal{A}$，而绝不会替未锚定的内部顶点强行钉死冗余规范相位——这在连续统上分毫不差地对应 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 5 款的商群同构 $\bigl((E \to \operatorname{Circle}) / N\bigr) \simeq_{\mathrm{t}*} \operatorname{Coordinates}(T, R, r)$！

::: {.viz src="berry-sector-path-sandbox" preset="stokes-wilson-duality" height="520"}
**路径—相位对偶与威尔逊和乐重构：局部顶点规范拧不动品红闭合回路通量。** 对比青色生成树 $T$ 上的路径无关树势 `rootPhase` 与跨越弦边围出的品红闭合回路和乐：随意拧动未锚定顶点的局部规范角，各单边相位随之旋转，但回路总相位与锚定端路径相位纹丝不动（绿色 `LEAN ✓` `selected_tree_transport` 与 `anchored_phase_classification`）。
:::

## 34.6.4 从离散巴格曼扇形积到费曼路径积分：科纽螺线与驻相选路 {#sec-ch34-6-4}

现在我们抵达引文最后半句的压轴合龙——**“这应该也跟路径积分有关”**。从单条路径的几何相位迈向对一族竞争路径求和的**费曼路径积分（Feynman path integral）**，桥梁恰好由两步严密的数学机制搭成：

1. **第一级桥梁：单条路径的离散 $N$ 步巴格曼—潘查拉特纳姆扇形剖分与连续统极限**：
   取球面上由 $N$ 个分点 $\mathbf{n}_0, \mathbf{n}_1, \dots, \mathbf{n}_{N-1} \in S^2$ 串成的闭合折线回路（对从 $\mathbf{A}$ 到 $\mathbf{C}$ 的开放路径，只需避开对径奇点，用固定的参考测地弧 $\widehat{\mathbf{C}\mathbf{n}_{\mathrm{ref}}} + \widehat{\mathbf{n}_{\mathrm{ref}}\mathbf{A}}$ 将其统一封口为基准闭环）。由 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 2 款 `bargmann_path_product`（`LEAN ✓`），沿途插入秩一纯态投影算子 $P_k = \lvert\psi_k\rangle\langle\psi_k\rvert$ 的循环迹精确化为相邻时间步复内积的连乘积：

   $$
   \Pi_N \;=\; \operatorname{Tr}(P_0 P_1 \cdots P_{N-1}) \;=\; \prod_{k=0}^{N-1} \langle\psi_k, \psi_{k+1}\rangle \qquad (\psi_N \equiv \psi_0).
   $$

   在三维球体内看，选定北极（或任一不落入回路对径割线的参考极点）作为扇心枢纽，将其与折线每段微弧 $\widehat{\mathbf{n}_k\mathbf{n}_{k+1}}$ 相连，整块回路围出的球面帽与实心扇锥便被剖分成 $N$ 瓣紧密咬合的**堇紫色球面扇形楔子**！当分点数 $N \to \infty$ 沿分段 $C^1$ 光滑回路加密（每步球面弧长 $\delta s_k = O(N^{-1})$）时，量子芝诺相邻交叠的模长按 $|\Pi_N| = \prod_{k=0}^{N-1}\cos\frac{\delta s_k}{2} = 1 - O(N^{-1}) \to 1$ 趋于无损单位模长，而累积负复辐角 $-\sum_{k=0}^{N-1}\arg\langle\psi_k, \psi_{k+1}\rangle$ 则收敛到连续自旋-$\frac{1}{2}$ 贝里几何相位 $-\frac{1}{2}\Omega[\Gamma] = -\frac{3}{2}V_{\mathrm{sector}}[\Gamma]$（文献结果）。更进一步，在克劳德（Klauder 1979）自旋相干态路径积分文献中，若对每一时间切片插入超完备相干态分解 $\int_{S^2}\frac{2s+1}{4\pi}\,d\Omega(\mathbf{n})\,\lvert\mathbf{n}\rangle\langle\mathbf{n}\rvert = I$，单步内积相位直接化作韦斯—祖米诺拓扑项 $S_{\mathrm{WZ}}[\mathbf{n}]$，与动力学哈密顿积分合成为形式连续统传播子

   $$
   \mathcal{K}(\mathbf{C}, T; \mathbf{A}, 0) \;=\; \int_{\mathbf{n}(0)=\mathbf{A}}^{\mathbf{n}(T)=\mathbf{C}} \mathcal{D}\mathbf{n}(t)\,\exp\!\left(i\,S_{\mathrm{WZ}}[\mathbf{n}] \;-\; \frac{i}{\hbar}\int_0^T H\bigl(\mathbf{n}(t)\bigr)\,dt\right)
   $$

   （此处必须注明：连续统泛函记号 $\mathcal{D}\mathbf{n}(t)$ 在数学上存在高阶涨落重整化病态，严格定义须依赖离散时间切片极限或克劳德球面维纳测度正则化，属文献结果，未在本书形式化）。

::: {.viz src="berry-sector-path-sandbox" preset="pancharatnam-fan" height="520"}
**离散 $N$ 步巴格曼—潘查拉特纳姆扇形剖分：相邻内积连乘在加密极限下逼近扇锥体积相位。** 调节离散顶点数 $N$：枢纽将回路剖分为 $N$ 瓣堇紫色球面扇形肋片，循环迹 $\Pi_N = \prod_k \langle\psi_k, \psi_{k+1}\rangle$（绿色 `LEAN ✓` `bargmann_path_product`）的模长 $|\Pi_N| \to 1$，负辐角收敛至连续扇锥体积相位 $-\frac{3}{2}V_{\mathrm{sector}}$（`NUM` / `ARGUED`）。
:::

2. **第二级桥梁：一阶奇对称面积变分 vs. 二阶偶对称弧长驻相与科纽（Cornu）螺线选路（呼应[第 29 章 §29.6](ch29-s04-coherence-and-handshake.md#sec-ch29-coherence-handshake-causality)）**：
   既然从 $\mathbf{A}$ 到 $\mathbf{C}$ 的每一条候选路径都带着各自的相位抵达同一点，大自然究竟靠什么从无穷多条乱窜的路径中“选”出经典测地线？这里藏着球面变分微积分中一处极易被含混带过、必须算清一阶与二阶区别的精妙机关（手工推导 + `NUM` + `MODEL`）：
   - **单侧横向弓形偏折的立体角是一阶奇函数**：取连接 $\mathbf{A}$ 与 $\mathbf{C}$ 的基准大圆测地弧 $\Gamma_0 = \widehat{AC}$，设其总弧长为 $2\alpha_0 \in (0, \pi)$（即半弧长 $\alpha_0 \in (0, \frac{\pi}{2})$），将其中点向横向垂直大圆方向偏折角度 $\eta \in (-\frac{\pi}{2}, \frac{\pi}{2})$ 至 $\mathbf{M}(\eta)$，构成两段折线测地路径 $\Gamma(\eta) = \widehat{A M(\eta)} + \widehat{M(\eta) C}$。由球面立体角正切公式（第十章 Van Oosterom–Strackee 公式），偏折路径 $\Gamma(\eta)$ 与基准直弧 $\Gamma_0$ 之间夹出的有向球面弓形立体角严格等于 $\eta$ 的**奇函数**：

     $$
     \Omega_{\mathrm{bow}}(\eta) \;=\; 2\arctan\!\left(\frac{\sin\alpha_0\sin\eta}{\cos\alpha_0 + \cos\eta}\right) \;=\; 2\tan\frac{\alpha_0}{2}\,\eta + O(\eta^3), \qquad \Omega_{\mathrm{bow}}(-\eta) \;=\; -\Omega_{\mathrm{bow}}(\eta),
     $$

     从而单侧偏折引发的纯几何纤维相位偏移 $\Delta\gamma_B(\eta) = -\frac{1}{2}\Omega_{\mathrm{bow}}(\eta) = -\frac{3}{2}V_{\mathrm{sector,bow}}(\eta)$ 在 $\eta = 0$ 处一阶导数非零！
   - **双侧镜像涨落的立体角相消精确刻画大圆测地线（$\kappa_g = 0$）**：倘若考察一条位于固定余纬 $\theta_0 \in (0, \pi)$（球面测地曲率 $\kappa_g = \cot\theta_0$）、横跨方位角 $\phi_0$ 的基准曲线，令其向南北两侧作对称镜像涨落 $\theta_0 \mapsto \theta_0 \pm \eta$，利用三角恒等式 $\cos(\theta_0 + \eta) + \cos(\theta_0 - \eta) = 2\cos\theta_0\cos\eta$，成对涨落相对于基准曲线扫过的有向立体角之和精确等于

     $$
     \Delta\Omega(+\eta) + \Delta\Omega(-\eta) \;=\; 2\phi_0\cos\theta_0\,(1 - \cos\eta),
     $$

     该偶次面积偏置对一切对称涨落幅度 $\eta$ **恒等于零（$\equiv 0$），当且仅当 $\theta_0 = \frac{\pi}{2}$（即测地曲率 $\kappa_g = 0$ 的大圆测地线）**！
   - **二阶偶对称弧长盈余与科纽螺线相干选路**：与此同时，折线路径 $\Gamma(\eta)$ 相对于基准测地弧 $\Gamma_0$ 的动力学弧长盈余则是严格非负的**偶次二次函数**：

     $$
     \Delta L(\eta) \;=\; 2\arccos(\cos\alpha_0\cos\eta) - 2\alpha_0 \;=\; \cot\alpha_0\,\eta^2 + O(\eta^4) \;\ge\; 0,
     $$

     满足驻点条件 $\Delta L'(0) = 0$！于是，当我们对以中心偏折角 $\eta_0$ 为轴、由 $M$ 条等距微扰路径 $\eta_0 + \delta\eta_m$ 组成的有限求积路径束计算有效波数为 $k_{\mathrm{eff}} > 0$ 的相干叠加振幅

     $$
     A_M(\eta_0) \;=\; \frac{1}{M}\sum_{m=1}^{M} \exp\!\Bigl(i\,k_{\mathrm{eff}}\,\Delta L(\eta_0 + \delta\eta_m)\Bigr)
     $$

     时，戏剧性的分流当场发生：在基准大圆测地线附近（$\eta_0 = 0$），相位一阶变分归零 $\Phi'(0) = 0$，整束相邻路径的复相量在复平面上同向排开，相长干涉叠成高模长的**青色驻相合振幅**（$\lvert A_M(0)\rvert \approx 1$）；反之，在偏离测地线的弯路邻域（$\eta_0 \neq 0$），相位随 $\delta\eta$ 发生快速线性漂移 $\Phi'(\eta_0) = 2k_{\mathrm{eff}}\cot\alpha_0\,\eta_0 + O(\eta_0^3) \neq 0$，相邻路径的复相量首尾卷曲成一团自我抵消的**品红科纽（Cornu）相消螺线**，合振幅模长迅速坍缩（$\lvert A_M(\eta_0)\rvert \ll 1$）！双向公平平方虽然在单点投影中抹去了路径细节，但隐藏在纤维里的相位账本却借无数非驻相弯路的反相自毁，从全路径求和中重新雕刻出了宏观经典测地轨迹！

::: {.viz src="berry-sector-path-sandbox" preset="feynman-stationary" height="520"}
**费曼路径束与科纽螺线驻相选路：测地线 $\eta_0 = 0$ 青色相长锁相，偏折弯路 $\eta_0 \neq 0$ 卷成品红相消螺线。** 拖动琥珀色路径束中心偏折手柄 $\eta_0$：下方复平面面板实时绘制 $M = 41$ 条邻近路径相量的首尾累加——在测地线 $\eta_0 = 0$ 处 $\Delta L'(0) = 0$ 拉出明亮青色合矢量，移向弯路 $\eta_0 \neq 0$ 时线性相移把相量拧成自相抵消的品红科纽螺线（`NUM` / `MODEL`）。
:::

::: {.example #ex-ch34-sector-volume-hopf-and-cornu-benchmark title="贝里扇锥体积、多边形巴格曼扇形收敛与 41 路科纽螺线驻相基准算例（手工推导与数值核验）"}
我们将本节的三条核心定量锁链——（1）$\Delta\mathcal{T}_\epsilon$ 的实心扇锥体积 vs. 平直弦四面体体积、（2）纬圈正 $N$ 边形巴格曼扇形连乘收敛、（3）$41$ 路有限路径束科纽驻相相干度——汇集为可直接复算的精确基准：

1. **原胞 $\Delta\mathcal{T}_\epsilon$ 在五档步长下的扇锥体积、弦四面体体积与贝里相位对照**：对 $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$，分别计算品红弧顶表面积 $A_{\mathrm{cap}}(\epsilon) = \Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2})$、品红实心球扇锥体积 $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)$、由 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 1 款 `triple_bargmann_bloch` 给出的青色平直弦四面体体积 $V_{\mathrm{tetra}}(\epsilon) = \frac{1}{6}\sin^2\epsilon = \frac{2}{3}\operatorname{Im}\Delta$、曲率鼓包体积盈余 $V_{\mathrm{sector}} - V_{\mathrm{tetra}}$ 及旋量贝里相位 $\gamma_B(\epsilon) = -\frac{1}{2}\Omega(\epsilon) = -\frac{3}{2}V_{\mathrm{sector}}(\epsilon)$：

| 步长 $\epsilon$ | 弧顶面积 $A_{\mathrm{cap}} = \Omega(\epsilon)$ | 实心扇锥体积 $V_{\mathrm{sector}} = \frac{1}{3}\Omega$ | 平直弦四面体 $V_{\mathrm{tetra}} = \frac{1}{6}\sin^2\epsilon$ | 鼓包体积盈余 $V_{\mathrm{sector}} - V_{\mathrm{tetra}}$ | 旋量贝里相位 $\gamma_B = -\frac{3}{2}V_{\mathrm{sector}}$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$** | $0.034661\;\mathrm{rad}$（$1.986^\circ$） | $0.011554$ | $0.011165$ | $0.000389$ | $-0.017331\;\mathrm{rad}$（$-0.993^\circ$） |
| **$30^\circ$** | $0.143348\;\mathrm{rad}$（$8.213^\circ$） | $0.047783$ | $0.041667$ | $0.006116$ | $-0.071674\;\mathrm{rad}$（$-4.107^\circ$） |
| **$45^\circ$** | $0.339837\;\mathrm{rad}$（$19.471^\circ$） | $0.113279$ | $0.083333$ | $0.029946$ | $-0.169918\;\mathrm{rad}$（$-9.736^\circ$） |
| **$60^\circ$** | $0.643501\;\mathrm{rad}$（$36.870^\circ$） | $0.214500$ | $0.125000$ | $0.089500$ | $-0.321751\;\mathrm{rad}$（$-18.435^\circ$） |
| **$90^\circ$** | $\frac{\pi}{2} \approx 1.570796\;\mathrm{rad}$（$90.000^\circ$） | $\frac{\pi}{6} \approx 0.523599$ | $\frac{1}{6} \approx 0.166667$ | $0.356932$ | $-\frac{\pi}{4} \approx -0.785398\;\mathrm{rad}$（$-45.000^\circ$） |

2. **余纬 $\theta_0 = 60^\circ$ 纬圈正 $N$ 边形巴格曼扇形积的解析与数值收敛**：在北半球余纬 $\theta_0 = 60^\circ$ 纬圈上（包围北极帽立体角 $\Omega = 2\pi(1 - \cos 60^\circ) = \pi$、实心扇锥体积 $V_{\mathrm{sector}} = \frac{\pi}{3}$），取高度参数 $t = \sin^2 30^\circ = \frac{1}{4}$ 的 $N$ 个等距分点 $\psi_k = \operatorname{latitude}(\frac{1}{4}, e^{2\pi i k/N})$。联立[第十章](ch10-gram-geometry-and-order.md) [@cor-latitude-complex-overlap]（`latitude_dot`）与 `bargmann_path_product`，循环迹化为闭式幂

   $$
   \Pi_N \;=\; \left(\frac{3}{4} + \frac{1}{4}e^{2\pi i/N}\right)^N.
   $$

   逐档核算得：$N = 3$ 时精确有 $|\Pi_3| = \frac{7\sqrt{7}}{64} \approx 0.289379$、离散几何相位 $\gamma_3 = -3\arctan\frac{\sqrt{3}}{5} \approx -57.320^\circ$；$N = 4$ 时精确有 $|\Pi_4| = \frac{25}{64} = 0.390625$、$\gamma_4 = -4\arctan\frac{1}{3} \approx -73.740^\circ$；加密至 $N = 12$ 时 $|\Pi_{12}| \approx 0.733976$、$\gamma_{12} \approx -88.431^\circ$；$N = 36$ 时 $|\Pi_{36}| \approx 0.902271$、$\gamma_{36} \approx -89.828^\circ$；当 $N \to \infty$ 时，$|\Pi_N| \to 1$ 且 $\gamma_N \to -\frac{\pi}{2} = -90.000^\circ = -\frac{3}{2}V_{\mathrm{sector}}$！

3. **$41$ 路路径束科纽螺线驻相选路相干度（`NUM` / `MODEL`）**：固定基准半弧长 $\alpha_0 = \frac{\pi}{4}$（$\cot\alpha_0 = 1$）、有效波数 $k_{\mathrm{eff}} = 30$，对均匀分布在 $\delta\eta_m \in [-0.20, +0.20]$ 上的 $M = 41$ 条邻近折线路径求和：在测地驻点 $\eta_0 = 0.00$ 处，路径束保持强相长相干 $\lvert A_{41}(0.00)\rvert \approx 0.9329$；将中心偏折推至 $\eta_0 = 0.25$ 时，科纽卷曲相消使合模长骤降至 $\lvert A_{41}(0.25)\rvert \approx 0.2255$；继续推至 $\eta_0 = 0.50$ 时更跌落至 $\lvert A_{41}(0.50)\rvert \approx 0.1816$，直观再现驻相锁路机制。
:::

::: {.remark #rem-ch34-berry-wzw-wilson-feynman-literature title="几何相位、霍普夫单极丛、韦斯—祖米诺拓扑项、威尔逊圈重构与相干态路径积分文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节严守内核验证定理、连续统经典文献与本书诠释模型的三层认识论边界：

1. **几何相位、霍普夫纤维丛与拓扑延拓经典文献**：离散及连续态矢循环相位的立体角几何起源奠基于 S. Pancharatnam（*Proc. Indian Acad. Sci. A* **44**, 247, 1956）、V. Bargmann（*J. Math. Phys.* **5**, 862, 1964）、B. Simon（*Phys. Rev. Lett.* **51**, 2167, 1983）与 M. V. Berry（*Proc. R. Soc. A* **392**, 45, 1984）；球面主圆丛 $S^1 \hookrightarrow S^3 \to S^2$ 与磁单极量子化条件 $2s \in \mathbb{Z}$ 出自 H. Hopf（*Math. Ann.* **104**, 637, 1931）与 P. A. M. Dirac（*Proc. R. Soc. A* **133**, 60, 1931）；高一维流形上的拓扑作用量延拓出自 J. Wess & B. Zumino（*Phys. Lett. B* **37**, 95, 1971）与 E. Witten（*Nucl. Phys. B* **223**, 422, 1983）；
2. **威尔逊圈规范重构与相干态路径积分经典文献**：由闭合环路和乐在差局部规范变换意义下重构规范联络的定理出自 S. Mandelstam（*Ann. Phys.* **19**, 1, 1962）、R. Giles（*Phys. Rev. D* **24**, 2160, 1981）与 J. W. Barrett（*Int. J. Theor. Phys.* **30**, 1171, 1991）；振幅沿历史路径求和与驻相近似源自 R. P. Feynman（*Rev. Mod. Phys.* **20**, 367, 1948），而自旋相干态路径积分时间切片及维纳正则化表述见 J. R. Klauder（*Phys. Rev. D* **19**, 2349, 1979）；
3. **本书内核验证锚点（`LEAN ✓`）与模型诠释（`MODEL`）**：三点巴格曼布洛赫体积迹、任意长秩一链路径乘积、圆周双覆盖唯一历史提升与无全局连续截面、以及命名生成树输运与锚定回路相位分类已由 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]（连同 [@cor-latitude-complex-overlap]）在 Lean 内核中严格验证；三维欧氏球扇锥体积恒等式 $V_{\mathrm{sector}} = \frac{1}{3}A_{\mathrm{cap}}$ 及折线测地变分属初等微积分手工推导；而将公平平方基点残影、扇锥体积纤维账本与 $41$ 路离散路径束科纽螺线选路统合于极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的跨节图景，则属本书理论模型（`MODEL`）。
:::

至此，我们在单一切片上由正交简并盲区反演出观察者站位，以“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$，又在 §34.6 证得其品红扇锥体积 $V_{\mathrm{sector}} = \frac{1}{3}A_{\mathrm{cap}}$ 在霍普夫相位纤维上记下来路并借科纽螺线筛出测地线。然而，只要对刚才的叙述再往前追问半步，整座经典几何直觉就会迎来一场彻底的**本体因果倒转**：在 §34.6 的语言里，我们仿佛仍默认“先有一块现成的弧面体体积摆在那里，路径随后穿过体积去攒下贝里相位”；可既然 $\Delta\mathcal{T}_\epsilon$ 上任意一点都能汇入无数条路径与无数种相位积分，为什么整个宇宙没有被无穷多路相位淹没成一片混沌白噪？所谓“实心体积”本身，究竟是路径穿行的先验容器，还是万千相位积分在相互抵消后唯一幸存下来的**驻波节点**？先在下方 `BERRY//PATH` 完整交互实验室中亲手转动三维扇锥、抬升霍普夫纤维并拨动科纽螺线手柄，随后进入 §34.7 揭开这场从“体积承载路径”到“未抵消相位积分驻波凝成体积”的终极翻转：

::: {.viz src="berry-sector-path-sandbox" height="640"}
**贝里扇锥体积、霍普夫纤维与费曼驻相选路：完整交互实验室（`BERRY//PATH`）。** 自由切换“扇锥体积—纤维抬升—和乐对偶—扇形连乘—驻相螺线”五张实验卡，调节琥珀色步长手柄 $\epsilon$、离散顶点数 $N$ 与路径束偏折角 $\eta_0$，同屏对比品红弧顶表面积 $A_{\mathrm{cap}}$ 与三维实心扇锥体积 $V_{\mathrm{sector}} = \Omega/3$、青色平直弦四面体与单步测地弧、堇紫色霍普夫 $S^1$ 纤维高度及底部复平面上的科纽驻相螺线；绿色 `LEAN ✓` 框严格对应六条冻结内核定理。
:::

---
