# 29.5 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$：“正交一次”与“正交两次”的一体双影及曲率量子 {#sec-ch34-infinitesimal-spherical-trihedron}

> “正交一次与正交两次其实是一个东西的两种投影，应该就是那个三角弧面体，一个极小的三角弧面体。”

回望[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)，零背景比较公理 $\mathcal{A}_0$ 对**两个**单位态给出了互易公平律 $\cos^2\epsilon + \sin^2\epsilon = 1$；而在本章第二节中，我们又在宏观极限 $\epsilon = \frac{\pi}{2}$ 处考察了整块八分球面。倘若把比较公理从两态推进到最小非共面**三态闭环** $(\mathbf{A}, \mathbf{B}, \mathbf{C})$，并让步长取任意小角 $\epsilon \in (0, \frac{\pi}{2}]$，会发生什么？

在单位球面 $S^2 \subset \mathbb{R}^3$（本节读作单比特布洛赫球：球面上的点是纯态，球内的点是混态）上，选取直角转枢顶点 $\mathbf{B} = \mathbf{e}_2$，分别沿着两面互相垂直的坐标平面墙 $\mathbf{e}_2 \wedge \mathbf{e}_1$ 与 $\mathbf{e}_2 \wedge \mathbf{e}_3$ 各迈出弧长 $\epsilon$，得到三根单位状态射线：

$$
\mathbf{B} = \mathbf{e}_2, \qquad \mathbf{A}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2, \qquad \mathbf{C}(\epsilon) = \sin\epsilon\,\mathbf{e}_3 + \cos\epsilon\,\mathbf{e}_2.
$$

连同球心原点 $O$，这三根单位射线在三维空间中围出一枚严丝合缝的立体原胞——**球面直角三面角原胞（极小三角弧面体）$\Delta\mathcal{T}_\epsilon$**：它的侧面由三扇平直圆心扇形墙 $OBA$、$OBC$ 与 $OAC$ 组成，顶端则封着一块向外鼓起的**品红色球面三角形帽 $\triangle_{\mathrm{sph}} ABC$**（对比下方切过弦线的**青色平直欧氏削面 $\triangle_{\mathrm{flat}} ABC$**），三矢量有向体积元精确等于

$$
\mathbf{A}(\epsilon) \wedge \mathbf{B} \wedge \mathbf{C}(\epsilon) \;=\; \sin^2\epsilon\,(\mathbf{e}_1 \wedge \mathbf{e}_2 \wedge \mathbf{e}_3).
$$

::: {.viz src="spherical-trihedron-cell" preset="cell" height="520"}
**三面平墙配一块向外鼓起的品红球面帽：极小三角弧面体原胞。** 拖动琥珀色步长手柄调节 $\epsilon$：球心 $O$ 与转枢 $B = e_2$、两面垂直墙上的 $A(\epsilon)$、$C(\epsilon)$ 围成原胞 $\Delta\mathcal{T}_\epsilon$；品红球面帽 $\triangle_{\mathrm{sph}} ABC$ 鼓出在青色平直弦削面外侧（“一体双影”属本书 `MODEL`）。
:::

## 29.5.1 一体双影：沿棱看是“正交一次”，沿墙走是“正交两次” {#sec-ch34-4-1}

为什么我们在[第九章](ch09-axes-and-state-addressing.md)和本章前两节里总觉得“一步直达”与“两步拐弯”是两条竞争路线？因为观察者每次只取了一个低维投影切面，却没看见立在中间的那枚三维弧面体 $\Delta\mathcal{T}_\epsilon$（`MODEL`）：

1. **第一重投影（沿中脊棱 $OB = \mathbf{e}_2$ 正视，积掉中间态 $\mathbf{B}$）$\longrightarrow$ “正交一次”**：
   当观察者的视线顺着中脊棱 $\mathbf{B} = \mathbf{e}_2$ 看过去（即施加读出投影 $x \mapsto (x_1, x_3)$），原点 $O$ 与顶点 $\mathbf{B}$ 的读数同为 $(0, 0)$，按 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 1 款 `partition_inseparable_iff_kernel` 缩成同一个不可分点，两面垂直侧墙 $OBA$ 与 $OBC$ 压扁成两条正交线段。此时中间态 $\mathbf{B}$ 彻底隐身，首尾两态之间只剩连接 $\mathbf{A}(\epsilon)$ 与 $\mathbf{C}(\epsilon)$ 的单条**青色大圆直弧 $\widehat{AC}$**，其内积直接读出球面勾股余弦律：

   $$
   \mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) \;=\; \cos c_\epsilon \;=\; \cos^2\epsilon.
   $$

::: {.viz src="spherical-trihedron-cell" preset="once-ridge" height="520"}
**沿棱 $OB$ 看过去：两面墙收成两条腿，“正交一次”只剩一条青色直弧。** 在读出映射 $x \mapsto (x_1, x_3)$ 下，$O$ 与 $B$ 落在同一根不可分核纤维上（绿色 `LEAN ✓` `partition_inseparable_iff_kernel`），弧面体投影成首尾直接相连的单步大圆弧 $\widehat{AC}$，满足 $\cos c_\epsilon = \cos^2\epsilon$。
:::

2. **第二重投影（向两面正交坐标墙 $\mathbf{e}_1\wedge\mathbf{e}_2$ 与 $\mathbf{e}_2\wedge\mathbf{e}_3$ 分解，滤掉斜穿弦面）$\longrightarrow$ “正交两次”**：
   若观察者只能沿正交实验基轴分步寻址（如双轴受控脉冲门，对应 `two_axis_finite_word` 长度为 $2$ 的旋转字），他就必须先贴着第一面墙走 $\widehat{AB}$，在转枢 $\mathbf{B}$ 处硬拐直角 $\beta \equiv 90^\circ$，再贴着第二面墙走 $\widehat{BC}$。在三维几何代数偶子代数 $\mathcal{Cl}_{3,0}^+$ 中，两面墙上的半角旋子分别为 $U_{12}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_2$ 与 $U_{23}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_2\mathbf{e}_3$；利用克利福德乘法 $\mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_3$ 精确展开乘积，得到

   $$
   U_{23}(\epsilon)\,U_{12}(\epsilon) \;=\; \cos^2\frac{\epsilon}{2} \;-\; \sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}\bigl(\mathbf{e}_1\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3\bigr) \;-\; \sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3,
   $$

   其四个正交基片分量的平方和恒等于 $\cos^4\frac{\epsilon}{2} + 2\sin^2\frac{\epsilon}{2}\cos^2\frac{\epsilon}{2} + \sin^4\frac{\epsilon}{2} = \bigl(\cos^2\frac{\epsilon}{2} + \sin^2\frac{\epsilon}{2}\bigr)^2 \equiv 1$！而交换两步次序的换位子差 $U_{23}(\epsilon)U_{12}(\epsilon) - U_{12}(\epsilon)U_{23}(\epsilon) = -2\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$（对应 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 2 款 `covariant_commutator_formula`），则分毫不差地落在了第三张正交平面 $\mathbf{e}_1\mathbf{e}_3$ 上。

::: {.viz src="spherical-trihedron-cell" preset="twice-walls" height="520"}
**沿两面垂直墙走两步：在转枢 $B$ 拐过直角，旋子乘积自然长出横向面分量。** 先由 $U_{12}(\epsilon)$ 沿第一面墙走到 $B$，再由 $U_{23}(\epsilon)$ 拐 $90^\circ$ 走到 $C$；两枚紫色墙旋子相乘除保留两墙生成元外，精确多出横向 $-\sin^2(\epsilon/2)\,e_1e_3$ 项（旋子乘积为手算；绿色 `LEAN ✓` `two_axis_finite_word` 与 `covariant_commutator_formula` 只担保相关的一般引理）。
:::

## 29.5.2 公平平方撑起品红球面帽：吉拉尔角超与万曲率之母 {#sec-ch34-4-2}

为什么顶盖不能是一块平平展展的欧氏三角形，而必须向外鼓成一块弯曲的**品红色球面帽 $\triangle_{\mathrm{sph}} ABC$**？答案正是[第 27 章](ch31-quantum-fairness.md)和[第 28 章](ch32-unified-field-and-meta-unification.md)确立的**单位模方公平律 $\|\mathbf{x}\|^2 = 1$**！

不妨直接对比青色平直欧氏弦切面 $\triangle_{\mathrm{flat}} ABC$ 与品红球面帽 $\triangle_{\mathrm{sph}} ABC$（球面三角与吉拉尔公式属经典文献结果，见下方 [@rem-ch34-regge-spinfoam-trihedron-literature]）：

- **若用平直刀片硬削弦三角形 $\triangle_{\mathrm{flat}} ABC$**：两条直角墙上的弦长同为 $2\sin\frac{\epsilon}{2}$，底弦长为 $\sqrt{2}\sin\epsilon$，平面三角形内角和死锁在 $\alpha_{\mathrm{flat}} + \beta_{\mathrm{flat}} + \gamma_{\mathrm{flat}} = \pi$。由余弦定理算出转枢顶角满足 $\cos\beta_{\mathrm{flat}} = \sin^2\frac{\epsilon}{2} > 0$，故 $\beta_{\mathrm{flat}} < 90^\circ$ 被挤成了锐角；更致命的是，平削面内部每一点的模长都跌破了 $1$（$\|\mathbf{x}\| < 1$），当场跌出了纯态所在的单位球皮，沦为混态！
- **守住处处 $\|\mathbf{x}\|^2 = 1$ 的公平球面帽 $\triangle_{\mathrm{sph}} ABC$**：把削面内部每一点都公平地径向撑回单位球皮上，转枢大圆夹角严格保住 $\beta = \frac{\pi}{2}$；对 $\epsilon \in (0, \frac{\pi}{2})$，两个底角由纳皮尔（Napier）球面直角正切律放大为

  $$
  \tan\alpha \;=\; \tan\gamma \;=\; \frac{\tan\epsilon}{\sin\epsilon} \;=\; \sec\epsilon > 1 \;\Longrightarrow\; \alpha = \gamma = \arctan(\sec\epsilon) = \frac{\pi}{4} + \frac{\epsilon^2}{4} + O(\epsilon^4) > \frac{\pi}{4},
  $$

  并在 $\epsilon \to \frac{\pi}{2}^-$ 时连续延拓至八分球面直角值 $\alpha(\frac{\pi}{2}) = \gamma(\frac{\pi}{2}) = \frac{\pi}{2}$（在全部 $(0, \frac{\pi}{2}]$ 上等价写作 $\alpha(\epsilon) = \operatorname{atan2}(1, \cos\epsilon)$）。于是三内角之和越过平直基准 $\pi$，按**吉拉尔球面角超定理（Girard's theorem）**在 $(0, \frac{\pi}{2}]$ 上处处良定义地吐出严格为正的立体角面积（曲率角超；在 $(0, \frac{\pi}{2})$ 上亦写作 $2\arctan(\sec\epsilon) - \frac{\pi}{2}$）：

  $$
  \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6) > 0 \quad \Bigl(= 2\arctan(\sec\epsilon)-\frac{\pi}{2},\;\epsilon \in (0,\tfrac{\pi}{2})\Bigr).
  $$

这里有一处必须精确辨析的几何与旋量边界，绝不可混为一谈：

1. **同调边界与精确测地环路和乐（对一切 $\epsilon \in (0, \frac{\pi}{2}]$ 严格成立，文献结果）**：在二维链同调意义上，品红球面帽的边界正是“正交两次路径”减去“正交一次路径”，即 $\partial(\triangle_{\mathrm{sph}} ABC) = (\widehat{AB} + \widehat{BC})_{\mathrm{twice}} - (\widehat{AC})_{\mathrm{once}}$。沿闭合大圆测地三角形回路 $\mathbf{A} \to \mathbf{B} \to \mathbf{C} \to \mathbf{A}$ 平行移动一周，根据高斯—博内定理，切向量精确转过实立体角 $+\Omega(\epsilon)$；而在 $\mathcal{Cl}_{3,0}^+$ 中把三段测地边旋子 $U_{CA}\,U_{23}\,U_{12}$ 首尾乘拢，旋量对**任意有限步长 $\epsilon \in (0, \frac{\pi}{2}]$** 都精确获得半立体角**潘查拉特纳姆—贝里（Pancharatnam–Berry）测地和乐**

   $$
   R_{\triangle}(\epsilon) \;=\; \exp\!\left(-\frac{1}{2}\Omega(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{A}}\right),
   $$

   其中 $\hat{\mathbf{I}}_{\mathbf{A}}$ 为起点 $\mathbf{A}(\epsilon)$ 处切平面的单位双向量。
2. **坐标墙两步旋子横项与闭环半角超的二阶吻合及四阶分离**：与此同时，仅走两面固定坐标墙而不补第三段回程测地弧的未闭合旋子乘积 $U_{23}(\epsilon)U_{12}(\epsilon)$，其横向交叉项系数为 $-\sin^2\frac{\epsilon}{2} = -\frac{\epsilon^2}{4} + \frac{\epsilon^4}{48} + O(\epsilon^6)$；而三段测地边闭合后的旋量半角超为 $-\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} - \frac{\epsilon^4}{24} + O(\epsilon^6)$。两者在无穷小极限 $\epsilon \to 0^+$ 下的**二阶主项 $O(\epsilon^2)$ 在模上精确吻合**（放到同一基片 $\mathbf{e}_1\mathbf{e}_3$ 上二者符号相反），但在有限步长 $\epsilon$ 下于四阶项 $O(\epsilon^4)$ 发生分离——例如在宏观八分球面端点 $\epsilon = \frac{\pi}{2}$ 处，未闭合双墙乘积的横向分量为 $-\sin^2\frac{\pi}{4} = -\frac{1}{2}$，唯有左乘第三段闭合测地边旋子 $U_{CA}(\frac{\pi}{2})$ 构成完整回路 $U_{CA}(\frac{\pi}{2})\,U_{23}(\frac{\pi}{2})\,U_{12}(\frac{\pi}{2})$，才能精确恢复八分球面积 $\Omega(\frac{\pi}{2}) = \frac{\pi}{2}$ 对应的完整旋量贝里相位 $-\frac{1}{2}\Omega(\frac{\pi}{2}) = -\frac{\pi}{4} \approx -0.7854$（与第二节 [@ex-ch34-spherical-addressing-and-octant-rotors] 完全衔接）！

这枚夹在“两次正交”与“一次正交”之间的二维面缺陷二上链，正是现代物理学四大曲率与非对易结构的共同几何胚胎（文献背景与本书 `MODEL` 综合）：放到量子自旋态上，它是李代数换位子 $[\hat{J}_{12}, \hat{J}_{23}] = i\hbar\hat{J}_{31}$ 与贝里几何相位 $-\frac{1}{2}\Omega$；放到局域相位丛上，它是杨—米尔斯规范场强 $F_{\mu\nu} = [D_\mu, D_\nu]$；放到切丛平行移动上，它就是黎曼曲率张量 $R^\rho_{\ \sigma\mu\nu}$！

::: {.viz src="spherical-trihedron-cell" preset="cap-excess" height="520"}
**品红球面帽比青色平削面多出的角超 $\Omega(\epsilon)$，让绕行一圈的箭头转着回来。** 沿测地回路 $A \to B \to C \to A$ 拖动回路滑块 $t$：切向量平行移动一周精确偏转吉拉尔角超 $\Omega(\epsilon) = 2\arctan(\tan^2(\epsilon/2))$，旋量闭环相位精确记下一半 $-\Omega(\epsilon)/2$（高斯—博内与贝里和乐标 `ARGUED`）。
:::

三个内积与品红帽还能装进同一个复数。把三根射线代入[§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)的单比特三点巴格曼迹（[@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 1 款），得到 $\operatorname{Tr}\bigl(P(\mathbf{A})P(\mathbf{B})P(\mathbf{C})\bigr) = \frac{(1+\cos\epsilon)^2}{4} + i\,\frac{\sin^2\epsilon}{4}$：实部只含三个内积，其中一步直达的 $\cos^2\epsilon$ 恰是两步内积 $\cos\epsilon$ 之积；虚部是有向体积 $\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}) = \sin^2\epsilon$ 的四分之一；辐角满足 $\tan(\arg) = \tan^2\frac{\epsilon}{2}$，恰为角超的一半 $\frac{1}{2}\Omega(\epsilon)$（手工推导）。

::: {.film src="minimal-arc-trihedron"}
**一步与两步，同一枚小弧面体（2 分 27 秒）。** 球面上从 $A$ 到 $C$，青色大圆弧一步走到，白色路线沿两面墙走两步、在 $B$ 处拐直角；加上球心 $O$，三面平墙与品红球面帽围成一枚小胞。顺着棱 $OB$ 看过去，$B$ 藏到 $O$ 背后，两面墙压成两条腿，球面上只剩青色弧；贴着墙看，是两步和一个拐角——“一体双影”是本书的诠释（`MODEL`）。步长 $45^\circ$ 时，两步的点积各为 $0.707$，一步直达的点积 $0.500 = 0.707^2$；有向体积 $\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}) = 0.500$，是紫色四面体 $OABC$ 的 $6$ 倍，三个点积合起来定得出它的大小，定不出它的朝向。三个投影算子乘积的迹，实部（青）是 $1$ 加三个点积再除以 $4$，虚部（紫）是有向体积除以 $4$，这里是 $0.729 + 0.125\,i$（[@thm-ch34-berry-sector-holonomy-and-bargmann-lift] 第 1 款）；把每个投影算子写成其旋量的 $\lvert A\rangle\langle A\rvert$ 是手算一步，而旋量链的迹等于绕回路一圈的重叠之积由第 2 款担保，三个重叠的大小 $0.924 \times 0.924 \times 0.866 = 0.739$。迹的品红辐角 $9.74^\circ$ 恰为球面帽角超 $19.47^\circ$ 的一半；步长 $90^\circ$ 时迹为 $(1+i)/4$、帽铺满八分之一球面，$15^\circ$ 时辐角约 $1^\circ$。角超公式是吉拉尔的经典文献结果，“平直，是尺子太粗时看到的弯曲”是格言式的诠释；片中数字都是屏幕上的计算。
:::

## 29.5.3 为什么必须是“极小的”三角弧面体：开维体积砖、平直幻象与离散球面 {#sec-ch34-4-3}

章首箴言特意点出“**一个极小的三角弧面体**”，这“极小”（$\epsilon \ll 1$）三字背后藏着三重不可替代的几何深意：

1. **撑开 $D \to D + 1$ 新维度的第一块三维体积砖**：
   假如第二步不拐 $90^\circ$，而是留在同一张平面 $\mathbf{e}_1\wedge\mathbf{e}_2$ 内做共面两步（$\mathbf{A}_{\mathrm{cop}}\cdot\mathbf{C}_{\mathrm{cop}} = \cos 2\epsilon$），三态格拉姆矩阵行列式恒等于零 $\det G_{\mathrm{coplanar}} \equiv 0$，宇宙永远被拍扁在二维纸面上。唯有在转枢 $\mathbf{B}$ 处折出原平面（这里取正交折入新墙，对应下方 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 4 款 `finite_layer_projection_escape`），三态格拉姆行列式才当场跃升为严格正值：

   $$
   \det G(\Delta\mathcal{T}_\epsilon) \;=\; \det\begin{pmatrix} 1 & \cos\epsilon & \cos^2\epsilon \\ \cos\epsilon & 1 & \cos\epsilon \\ \cos^2\epsilon & \cos\epsilon & 1 \end{pmatrix} \;=\; (1 - \cos^2\epsilon)^2 \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \tfrac{\pi}{2}]\bigr).
   $$

   它的平方根 $\sqrt{\det G} = \sin^2\epsilon > 0$ 正是舞台上那块**堇紫色三维平行六面体格拉姆体积砖**（对应弦四面体体积 $\frac{1}{6}\sin^2\epsilon$，而带品红球面帽的球扇形体积为 $\frac{1}{3}\Omega(\epsilon)$）——哪怕 $\epsilon$ 小如微尘，只要 $\epsilon > 0$，三维立体空间就已经被这一拐真正撑开！
2. **宏观欧氏平直幻象与微观曲率量子的尺度分离**：
   把“正交一次”的真实球面斜边 $c_\epsilon = \arccos(\cos^2\epsilon)$ 按小步长 $\epsilon \ll 1$ 展开：

   $$
   c_\epsilon \;=\; \arccos(\cos^2\epsilon) \;=\; \sqrt{2}\,\epsilon\!\left(1 - \frac{\epsilon^2}{12} + O(\epsilon^4)\right) \;<\; \sqrt{2}\,\epsilon.
   $$

   秘密全写在这行泰勒级数里！在一阶线性尺度 $O(\epsilon)$ 上，球面斜边伪装得跟欧氏平直地板勾股定理 $\sqrt{2}\,\epsilon$ 一模一样，而品红球面帽的角超曲率 $\Omega(\epsilon) = \frac{1}{2}\epsilon^2 + O(\epsilon^4)$ 与斜边相对收缩率 $-\frac{1}{12}\epsilon^2$ 全都藏在二阶无穷小 $O(\epsilon^2)$ 里，宏观粗糙尺子根本察觉不到。反过来，在本书的有限带宽观察者模型（`MODEL`）中，任何真实观察者都存在非零最小分辨步长 $\epsilon_{\min} > 0$，于是宇宙底层不可能无限切碎成光滑零曲率平面，而必留下不可抹除的**最小曲率与几何相位量子** $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$！

::: {.viz src="spherical-trihedron-cell" preset="gram-brick" height="520"}
**共面两步体积恒为零，正交三面角撑出堇紫色的三维格拉姆体积砖。** 对比共面两步（$\det G = 0$，压扁在旧平面内）与正交三面角（$\det G = \sin^4\epsilon > 0$，堇紫色体积砖 $\sin^2\epsilon$）：小角下 $c_\epsilon$ 贴近 $\sqrt{2}\epsilon$ 制造平直幻象，灰色示意带标出最小步长 $\epsilon_{\min}$ 模型（格拉姆行列式为手算；绿色 `LEAN ✓` `unit_perpendicular_pair`、`lagrange_gram_identity` 与 `finite_layer_projection_escape` 只担保相关的一般引理）。
:::

3. **“球体永远是近似的”：离散弧面体拼砖与八分球面宏观汇合**：
   在广义相对论与量子引力文献中，雷吉离散引力（Regge 1961）与自旋泡沫（Spin-Foam）模型正是用平坦单纯形骨架配铰链角亏来逼近弯曲时空（文献背景见下方 [@rem-ch34-regge-spinfoam-trihedron-literature]）；而在本书的跨章模型（`MODEL`）中，这恰与[第 21 章](ch21-diagonalization-and-escape.md)“球体永远是有限多面体近似”及[§35.6](ch39-s05-pisot-clifford-rauzy.md#sec-ch39-pisot-clifford-rauzy)三阶 Tribonacci 劳齐（Rauzy）分形拼砖的螺旋扭率遥相呼应——整颗宏观球面是由无数枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 逐块缝合而成的统计包络。而当你把琥珀色步长滑块一路推大到极限端点 $\epsilon = \frac{\pi}{2}$ 时，这枚微观原胞便无缝长大成第二节那整块宏观八分球面（$c = \frac{\pi}{2},\; \Omega = \frac{\pi}{2},\; \det G = 1$）！

::: {.viz src="spherical-trihedron-cell" preset="octant-limit" height="520"}
**步长推满 $90^\circ$：微观原胞直接长成第二节的整块八分球面。** 当 $\epsilon \to 90^\circ$ 时，三根边两两正交（$A = e_1, B = e_2, C = e_3$），品红球面帽铺满整个第一卦限（$\Omega = \pi/2$），堇紫色格拉姆体积砖撑满单位正方体 $\det G = 1$，微观与宏观在此完全合拢。
:::

## 29.5.4 单纯二上链精确修补与运动双轴不变性的形式化定理及算例 {#sec-ch34-4-4}

在代数拓扑与三维旋转几何底层，“多顶点二上链的两步与一步之差何时能被一维边势全局消去、何时受四面体三上边缘缺陷阻断”以及“局部两根不共线轴上的旋转对称如何撑起全局三维 $\mathrm{SO}(3)$ 对称”，已由 `trureturing` 的四条冻结内核定理严格锁定：

::: {.theorem #thm-ch34-trihedron-cochain-and-moving-axis title="单纯二上链精确修补判据、运动双轴旋转传播、拉格朗日—格拉姆恒等式与正交残差逃逸" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
在 `trureturing` 冻结的单纯二上链修补、双轴有限旋转、量子界恒等式与正交残差逃逸模块中，以下四项定理同时成立：

1. **三顶点二上链缺陷的四面体上边缘精确性充要判据**（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：设 $V$ 为有限非空顶点集，$A$ 为加法交换群，$F : V \to V \to V \to A$ 为三元面量测（二上链）。则：（a）以各参考点 $r \in V$ 切片统计的面误差总和恒等于四面体缺陷总数 $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$，故必存在某锚点 $r$ 满足 $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$；（b）对任意一维边赋值 $\mathrm{edge} : V \to V \to A$，恒有下界 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$；（c）三态回路面量测 $F(i, j, k)$ 精确分解为一维两步边和减去一步直边——即存在 $\mathrm{edge}$ 使得 $\forall i, j, k,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$——当且仅当其四面体三上边缘处处归零：

   $$
   \bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \;\Longleftrightarrow\; \exists\,\mathrm{edge},\; \forall i, j, k,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j);
   $$

2. **局部运动双轴圆不变性向全局 $\mathrm{SO}(3)$ 旋转不变性的传播**（[`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)）：在三维欧氏空间 $\mathbb{R}^3$ 中，若两向量 $a, b$ 不共线（满足严格柯西—施瓦茨缺口 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$），且函数 $F : (\mathbb{R}^3 \times \mathbb{R}^3) \to Y$ 在点对 $p$ 的 $\mathrm{SO}(3)$ 轨道上沿着每一随动标架的双轴圆 $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ 保持不变，则 $F$ 对任意满足 $\det R = 1$ 的三维正交旋转 $R \in \mathrm{SO}(3)$ 恒有全局不变性 $F(\operatorname{rotatePair}(R, p)) = F(p)$；

3. **二态楔积面积与内积亏损的拉格朗日—格拉姆恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意有限指标集 $s$ 与实向量 $u, v$，恒有 $(\sum_i u_i^2)(\sum_i v_i^2) - (\sum_i u_i v_i)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$；

4. **闭子空间外的单位正交残差逃逸**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $V$ 为实或复希尔伯特空间（完备内积空间，在有限维 $\mathbb{R}^3$ 中自动满足），且闭线性子空间 $S \subseteq V$ 满足 $S^\perp \neq \{0\}$，则必存在单位正交向量 $e \in S^\perp$ 使得 $\lVert e\rVert = 1$、$P_S(e) = 0$、$\operatorname{infDist}(e, S) = 1$ 且残差算子范数 $\lVert \operatorname{id} - P_S\rVert = 1$。
:::

::: proof
第 1 款通过四面体四面关联计数重排求和导出均值鸽巢修补界，并证明 $V$ 上的二上链 $F$ 全局等于一维边势上边缘 $F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$ 当且仅当其四顶点四面体三上边缘处处归零（当该三上边缘恒为零时，固定任意锚点 $r_0$ 取 $\mathrm{edge}(u, v) = F(r_0, u, v)$ 即可显式构造；反之，孤立三顶点上的单个非零面值总能平凡并入一维边赋值，而对任意一维边势全局非精确则要求多顶点二上链具备非零四面体缺陷 $\operatorname{tetraDefects}(F) > 0$，与单条测地闭合回路的平行移动球面角超和乐 $\Omega(\epsilon)$ 分属不同层级）。第 2 款利用前提中给出的非退化面积 $\lVert a\rVert^2\lVert b\rVert^2 - \langle a, b\rangle^2 > 0$ 调用双轴有限字生成定理 `two_axis_finite_word`，沿旋转字长度归纳将局部两面墙圆周上的不变性传播到整个 $\mathrm{SO}(3)$。第 4 款在非零闭补空间 $S^\perp$ 中取单位向量 $e$，为三面角第三顶点跳出第一面墙平面 $S = \operatorname{span}\{\mathbf{e}_1, \mathbf{e}_2\}$ 撑开非零体积砖提供精确泛函依据。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-infinitesimal-trihedron-calculus title="极小三角弧面体在三档步长下的精确解析与数值对照（手工推导与数值核验）"}
为了把平直近似、球面角超与三维体积砖的数量级关系看得一清二楚，我们在 $\epsilon = 15^\circ$（$\frac{\pi}{12}\;\mathrm{rad}$，小步长区）、$\epsilon = 45^\circ$（$\frac{\pi}{4}\;\mathrm{rad}$，中尺度区）与 $\epsilon = 90^\circ$（$\frac{\pi}{2}\;\mathrm{rad}$，宏观八分球面极限）三档代表性步长上手工核算全部几何量：

- **当 $\epsilon = 15^\circ = \frac{\pi}{12} \approx 0.2618\;\mathrm{rad}$ 时**：$\cos c_{15^\circ} = \cos^2 15^\circ = \frac{2+\sqrt{3}}{4} \approx 0.9330$，球面一次直弧 $c_{15^\circ} \approx 0.3681\;\mathrm{rad}$（$21.09^\circ$），与平直勾股斜边 $\sqrt{2}\epsilon \approx 0.3702\;\mathrm{rad}$（$21.21^\circ$）仅差 $0.58\%$；但底角已抬升至 $\alpha \approx 45.99^\circ$，吐出球面角超 $\Omega(15^\circ) \approx 0.0347\;\mathrm{rad}$（$1.99^\circ$）、闭环旋量半相位 $-\frac{1}{2}\Omega \approx -0.0173\;\mathrm{rad}$（对比墙旋子横项的模 $\sin^2 7.5^\circ \approx 0.0170$），格拉姆行列式 $\det G = \sin^4 15^\circ = \frac{7 - 4\sqrt{3}}{16} \approx 0.0045 > 0$。
- **当 $\epsilon = 45^\circ = \frac{\pi}{4} \approx 0.7854\;\mathrm{rad}$ 时**：全部读数收成极其优美的闭式代数常数——$\cos c_{45^\circ} = \frac{1}{2}$ 给出精确球面斜边 $c_{45^\circ} = \frac{\pi}{3} = 60^\circ \approx 1.0472\;\mathrm{rad}$（显著短于平直值 $\frac{\sqrt{2}\pi}{4} \approx 1.1107\;\mathrm{rad}$），底角等于正四面体魔角 $\alpha = \arctan\sqrt{2} \approx 54.74^\circ$，球面角超精确等于 $\Omega(45^\circ) = \arcsin\frac{1}{3} \approx 0.3398\;\mathrm{rad}$（$19.47^\circ$），旋量半相位 $-\frac{1}{2}\arcsin\frac{1}{3} \approx -0.1699\;\mathrm{rad}$，格拉姆行列式 $\det G = \sin^4 45^\circ = \frac{1}{4} = 0.2500$。
- **当 $\epsilon = 90^\circ = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$ 时**：$\cos c_{90^\circ} = 0$，$c_{90^\circ} = \frac{\pi}{2} = 90^\circ$，三内角全为直角 $\alpha = \beta = \gamma = 90^\circ$（其中 $\alpha(90^\circ) = 90^\circ$ 为 $\epsilon \to \frac{\pi}{2}^-$ 时 $\arctan(\sec\epsilon)$ 的连续延拓极限，即 $\operatorname{atan2}(1, \cos\epsilon)$），角超达到八分球面积 $\Omega(90^\circ) = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$，旋量贝里相位 $-\frac{\pi}{4} \approx -0.7854\;\mathrm{rad}$，格拉姆行列式满额 $\det G = 1$。

| 步长 $\epsilon$ | 一次内积 $\cos^2\epsilon$ | 球面直弧 $c_\epsilon$（rad） | 平直近似 $\sqrt{2}\epsilon$（rad） | 底角 $\alpha(\epsilon)$ | 球面角超 $\Omega(\epsilon)$（rad） | 闭环旋量相位 $-\frac{1}{2}\Omega(\epsilon)$ | 格拉姆行列式 $\det G = \sin^4\epsilon$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$（$\pi/12$）** | $\frac{2+\sqrt{3}}{4} \approx 0.9330$ | $0.3681$ | $0.3702$ | $45.99^\circ$（$0.8027$） | $0.0347$（$1.99^\circ$） | $-0.0173$ | $\frac{7-4\sqrt{3}}{16} \approx 0.0045$ |
| **$45^\circ$（$\pi/4$）** | $\frac{1}{2} = 0.5000$ | $\frac{\pi}{3} \approx 1.0472$ | $1.1107$ | $\arctan\sqrt{2} \approx 54.74^\circ$ | $\arcsin\frac{1}{3} \approx 0.3398$ | $-0.1699$ | $\frac{1}{4} = 0.2500$ |
| **$90^\circ$（$\pi/2$）** | $0$ | $\frac{\pi}{2} \approx 1.5708$ | $2.2214$ | $90.00^\circ$（$\pi/2$） | $\frac{\pi}{2} \approx 1.5708$ | $-\frac{\pi}{4} \approx -0.7854$ | $1.0000$ |
:::

::: {.remark #rem-ch34-regge-spinfoam-trihedron-literature title="吉拉尔角超、高斯—博内和乐与雷吉离散引力单纯形（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于极小三角弧面体的推演严格区分三层依据：

1. **球面几何、微分几何与离散引力经典文献**：球面直角三角形纳皮尔法则 $\cos c = \cos a\cos b$、$\tan\alpha = \tan a / \sin b$ 与吉拉尔（Girard 1629）球面角超公式 $\Omega = \alpha + \beta + \gamma - \pi$；测地三角形回路上的高斯—博内平行移动转角定理、潘查拉特纳姆（Pancharatnam 1956）与贝里（Berry 1984）半立体角旋量和乐相因子 $\exp(-\frac{1}{2}\Omega\hat{\mathbf{I}}_{\mathbf{A}})$；以及雷吉（Regge 1961, *General Relativity without Coordinates*）用无坐标平坦单纯形骨架构成离散曲率角亏的雷吉演算，连同圈量子引力中自旋网络的面积/体积离散谱（Rovelli & Smolin 1995）与自旋泡沫四面体/四维单形振幅文献（Perez 2013）；
2. **本书内核验证定理（`LEAN ✓`）**：单纯二上链四面体精确修补判据、运动双轴圆向全局 $\mathrm{SO}(3)$ 旋转传播、拉格朗日—格拉姆恒等式与正交残差逃逸（[@thm-ch34-trihedron-cochain-and-moving-axis]），以及前两节锁定的公共单位法线、双轴有限字、划分拓扑不可分核与协变换位子公式（[@thm-ch34-perpendicular-axis-and-pullback]、[@thm-ch34-readout-kernel-and-covariant-commutator]）；
3. **本书几何诠释与物理模型（`MODEL`）**：将“正交一次”与“正交两次”诠释为同一枚球面直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的双重正交投影、引入有限带宽最小分辨步长 $\epsilon_{\min} > 0$ 与最小曲率量子 $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$，以及将离散弧面体拼砖对接至光滑球面近似和三阶劳齐分形扭率，均属本书原创理论模型（`MODEL`）。
:::

::: {.theorem #thm-ch34-qubit-subentropy-near-pure title="单比特近纯态 subentropy 核比较上界" lean="D5/S3/Quantum/Subentropy/QubitBoundary.qubit_subentropy_near_pure"}
设 $A \in M_2(\mathbb{C})$ 为任意 $2\times 2$ 复半正定且迹为一的矩阵（$A \succeq 0$，$\operatorname{Tr}(A) = 1$），记 $\delta := \operatorname{Re}(\det A)$，并记 $Q(A)$ 为自然对数单位下的矩阵 subentropy。则：

1. $0 \le \delta \le \frac{1}{4}$；
2. 若 $\delta = 0$，则 $Q(A) = 0$；
3. 若 $0 < \delta$，则

$$
0 \le \delta - Q(A) \le \frac{\delta^2\ln(1/\delta)}{1 - \delta}.
$$
:::

::: proof
由 $A \in M_2(\mathbb{C})$ 半正定且 $\operatorname{Tr}(A) = 1$，$A$ 为厄米矩阵且两个特征值 $\lambda_1, \lambda_2 \ge 0$ 满足 $\lambda_1 + \lambda_2 = 1$，从而 $\det A = \lambda_1\lambda_2 \in \mathbb{R}$，且 $\delta = \operatorname{Re}(\det A) = \lambda_1(1 - \lambda_1) \in [0, \frac{1}{4}]$。

当 $\delta = 0$ 时，必有一个特征值为 $0$、另一个为 $1$，$A$ 为秩一投影算符，此时 $\det(I + A/t) = 1 + t^{-1}$，被积函数 $\frac{t}{1+t} - \frac{1}{\det(I + A/t)}$ 恒为零，故 $Q(A) = 0$（此处不涉及对 $\delta = 0$ 取倒数或对数）。

当 $0 < \delta \le \frac{1}{4}$ 时，由特征多项式得 $\det(I + A/t) = 1 + t^{-1} + \delta t^{-2}$，代入矩阵 subentropy 积分定义化为

$$
Q(A) = \int_0^\infty \frac{\delta t}{(1+t)(t^2 + t + \delta)}\,dt.
$$

利用 $\delta = \int_0^\infty \frac{\delta}{(1+t)^2}\,dt = \int_0^\infty \frac{\delta t}{(1+t)(t^2 + t)}\,dt$ 相减，得非负亏格积分表示

$$
\delta - Q(A) = \int_0^\infty \frac{\delta^2}{(1+t)^2(t^2 + t + \delta)}\,dt \ge 0.
$$

对一切 $t \ge 0$ 与 $0 < \delta \le \frac{1}{4}$，恒有 $(1+t)(t^2 + t + \delta) = (t + \delta) + t^3 + 2t^2 + \delta t \ge t + \delta > 0$，从而得到逐点控制

$$
\frac{\delta^2}{(1+t)^2(t^2 + t + \delta)} \le \frac{\delta^2}{(1+t)(t+\delta)}.
$$

由于 $0 < \delta \le \frac{1}{4}$ 保证 $1 - \delta > 0$ 且 $1/\delta > 0$，对 $(0, \infty)$ 积分即得

$$
\begin{aligned}
0 \le \delta - Q(A) &\le \delta^2 \int_0^\infty \frac{dt}{(1+t)(t+\delta)} \\
&= \frac{\delta^2\ln(1/\delta)}{1 - \delta}.
\end{aligned}
$$

完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-trihedron-subentropy-and-kernel title="极小三角弧面体的等权混态 subentropy 与近纯态应用"}
**证据分级**：本例复用既有有限维 subentropy 行列式积分定义、纯态归零律、单比特谱公式及 [@thm-ch34-qubit-subentropy-near-pure]；三面角原胞等权混合的小角展开与其几何对照仍为显式手工应用（未作为 Lean 映射锁定）。

对任意有限维半正定、迹为一的密度算符 $\rho$，自然对数单位下的 subentropy 定义为

$$
Q(\rho) = \int_0^\infty \left[\frac{t}{1+t} - \frac{1}{\det(I + \rho/t)}\right]dt.
$$

它与冯·诺依曼熵 $S(\rho) = -\operatorname{Tr}(\rho\ln\rho)$ 不同，而在一切归一化秩一纯态上恒为零（$Q = 0$）。对于布洛赫半径 $r \in [0, 1]$ 的单比特态 $\rho = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$，设本征值为 $a = \frac{1+r}{2}$、$b = \frac{1-r}{2}$，行列式为 $\delta = \det\rho = \frac{1-r^2}{4} \in [0, \frac{1}{4}]$，则既有谱公式及端点延拓给出

$$
q(r) := Q(\rho) = -\frac{a^2\ln a - b^2\ln b}{r} \quad (0 < r < 1),
$$

且 $q(0) = \ln 2 - \frac{1}{2}$、$q(1) = 0$。由 [@thm-ch34-qubit-subentropy-near-pure] 可知，在近纯态极限 $\delta \to 0^+$ 下成立渐近展开 $Q(\rho) = \delta + O(\delta^2|\ln\delta|)$。

现将本节直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的三个顶点纯态等权混合为混态 $\bar{\rho} = \frac{1}{3}(\rho_A + \rho_B + \rho_C)$（全局相干纯态仍满足 $Q = 0$）。由 $\mathbf{A} = (\sin\epsilon, c, 0)$、$\mathbf{B} = (0, 1, 0)$、$\mathbf{C} = (0, c, \sin\epsilon)$（$c = \cos\epsilon$），平均布洛赫矢为 $\bar{\mathbf{r}} = \frac{1}{3}(\sin\epsilon, 1 + 2c, \sin\epsilon)$，其半径平方与行列式分别为

$$
\begin{aligned}
r^2 &= \frac{3 + 4c + 2c^2}{9}, \\
\delta &= \frac{1 - r^2}{4} = \frac{(1-c)(3+c)}{18} = \frac{\epsilon^2}{9} - \frac{5\epsilon^4}{216} + O(\epsilon^6).
\end{aligned}
$$

手工代入上述近纯态渐近展开，即得等权原胞混合态 subentropy 与闭环贝里相位的小角对比：

$$
\begin{aligned}
Q(\bar{\rho}) &= \frac{\epsilon^2}{9} + O(\epsilon^4|\ln\epsilon|), \\
\gamma &= -\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} + O(\epsilon^4).
\end{aligned}
$$
:::

::: {.remark #rem-ch34-trihedron-subentropy-vs-berry-and-gram title="闭环几何相位、混态 subentropy 与实／复格拉姆行列式"}
**证据分级**：除上文已核验的单比特近纯态上界定理外，本注记所讨论的三面角等权混合应用、操作含义区分与实／复线性代数对照仍为手工推导与标准线性代数事实（未作为新增 Lean 定理或物理映射锁定）。

1. **几何相位与统计混态 subentropy 分属不同操作**：若系统沿测地三角形回路 $\mathbf{A} \to \mathbf{B} \to \mathbf{C} \to \mathbf{A}$ 作纯态相干平行移动，终态仍为归一化秩一纯态，因此 $Q = 0$ 而几何相位为 $\gamma = -\Omega/2 \neq 0$。反之，等权混合态的 $Q(\bar{\rho}) \sim \epsilon^2/9$ 源自舍弃顶点制备标签后的统计混态谱收缩。倒转闭环方向会使 $\gamma$ 反号而保持 $\bar{\rho}$ 与 $Q$ 不变；调整三个顶点的制备权重会改变 $Q$ 而不改变立体角 $\Omega$。因此，小角下的比值 $Q(\bar{\rho})/|\gamma| \to 4/9$ 仅刻画等权混合这一特定态制备，并不存在普适的 $Q$ 与贝里相位换算律。
2. **三维实布洛赫体积与二维复旋量格拉姆之别**：前文针对三根实单位布洛赫矢算得实格拉姆行列式 $\det[(\mathbf{n}_a\cdot\mathbf{n}_b)_{a,b=A,B,C}] = \sin^4\epsilon > 0$（$\epsilon \in (0, \frac{\pi}{2}]$），它度量 $\mathbb{R}^3$ 中三矢张成的体积；而对应的三个归一化旋量 $|\psi_A\rangle, |\psi_B\rangle, |\psi_C\rangle$ 同处二维复希尔伯特空间 $\mathbb{C}^2$ 中而必然线性相关，故其 $3\times 3$ 复内积格拉姆行列式恒为零：$\det[(\langle\psi_a|\psi_b\rangle)_{a,b=A,B,C}] = 0$（反映混态的三阶对称不变量 $e_3(\bar{\rho}) = 0$）。在单比特空间中 $Q$ 完全由二阶量 $\delta = e_2$ 决定；只有当态空间维数 $d \ge 3$ 时，更高阶的复内积格拉姆结构才会影响 $Q$。
:::

下表将极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的四重视角与涌现定律收拢为一张对照卡片：

| 观察切面 / 极限尺度 | 投影后的几何表象 | 核心代数不变量 | 涌现的物理与几何定律 |
| :--- | :--- | :--- | :--- |
| **1. 沿中脊棱 $\mathbf{B}=\mathbf{e}_2$ 投影** | 中间态 $\mathbf{B}$ 缩为一点，现单条青色直弧 $\widehat{AC}$（“正交一次”） | $\mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) = \cos c_\epsilon = \cos^2\epsilon$ | 划分拓扑核盲区、粗粒化单步有效跃迁与宏观近欧氏勾股近似 $c_\epsilon \approx \sqrt{2}\epsilon$ |
| **2. 沿两面垂直坐标墙分解** | 在转枢 $\mathbf{B}$ 拐 $90^\circ$ 走两段弧 $\widehat{AB}+\widehat{BC}$（“正交两次”） | $U_{23}(\epsilon)U_{12}(\epsilon)$ 含横向项 $-\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$ | 双轴量子门合成、算符非对易换位子与自旋角动量李代数生成元 |
| **3. 顶端品红球面帽 $\triangle_{\mathrm{sph}} ABC$** | 单位模方公平把平削面撑鼓为正曲率球面三角形 | $\Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2}) = \frac{\epsilon^2}{2} + O(\epsilon^4)$ | 吉拉尔球面角超、高斯—博内切向转角 $+\Omega$、潘查拉特纳姆—贝里相位 $-\frac{1}{2}\Omega$ 与规范曲率 |
| **4. 内部三维立体原胞 $\Delta\mathcal{T}_\epsilon$** | 跳出共面零体积纸面，撑开堇紫色三维体积砖（$\epsilon\to\frac{\pi}{2}$ 成八分球） | $\det G(\Delta\mathcal{T}_\epsilon) = \sin^4\epsilon > 0,\; V_{\mathrm{brick}} = \sin^2\epsilon$ | 正交残差维度扩张 $D \to D + 1$、离散单纯形曲率拼砖与微观曲率量子 $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$ |

现在走进下方的球面三面角原胞完整实验室，亲手拖动琥珀色步长手柄与回路位置滑块，在“原胞—一次—两次—角超—格拉姆”五个场景之间自由切换，目睹单步直弧、两步拐角、品红球面鼓包与堇紫色体积砖如何在同一块立体原胞上合而为一：

::: {.viz src="spherical-trihedron-cell" height="620"}
**球面三面角原胞：完整实验室。** 五个场景与六张实验卡共用同一枚直角三面角原胞 $\Delta\mathcal{T}_\epsilon$：拖动琥珀色的步长手柄从微角一路推向 $90^\circ$ 八分球面，对比沿棱的青色一次直弧、沿墙的两次直角步、品红球面帽对青色平直削面的吉拉尔角超 $\Omega(\epsilon)$，以及撑开第三维的堇紫色格拉姆体积砖 $\sin^2\epsilon$；绿色 `LEAN ✓` 框严格对应冻结内核定理。
:::

至此，我们在 §29.5 里把“正交一次”与“正交两次”收拢到了极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 这枚立体几何原胞之上。但只要再往前追问半步，最后一道本体论悬念立刻浮出水面：**在没有任何外部第 3 点预置舞台的零背景宇宙里，这第三根顶点射线究竟从何而来？而当我们开口说出“极小三角弧面体”这七个字时，语言本身又对本体做了怎样的折叠？**

---
