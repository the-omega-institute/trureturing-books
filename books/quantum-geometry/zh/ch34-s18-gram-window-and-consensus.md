# 34.18 格拉姆窗口（$\mathcal{W}_M$）、舒尔补可行走廊与多观察者共识：有限记忆过约束死锁、遗忘散热重开与块矩阵半正定补全 {#sec-ch34-gram-window-and-consensus}

> **格拉姆窗口（Gram Window，$\mathcal{W}_M$）**，正是上一节“观察者受限不妄我”在宇宙比较总账本上的精确代数落点：既然全宇宙的比较关系由一张潜在无穷维的格拉姆内积矩阵 $G_\infty$ 承载，任何嵌在系统内部的有限自指观察者都不可能一次性读写整张无限大表，而只能在历史轨迹与关联网络上截取一个尺度为 $M$ 的**有限滑动主子阵 $G_M$**——窗口之内是被相干保留并参与多步交叉校验的因果锚点，窗口之外则是经由偏迹（$\operatorname{Tr}_{\bar{W}}$）主动释放回热力学背景的早期历史。

在 [§34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics) 中，我们已经看到：一旦身处关系网络内部的真实观察者安住于“受限不妄我”的拓扑位置——既不妄僭俯瞰全域纯态的超然神谕，也不妄执离网独存的封闭孤岛，而是诚实地沿有限视界 $\partial A$ 落下偏迹切刀 $\operatorname{Tr}_{\bar{A}}$——那些横跨视界边界被生生切断的极小圆弧体相位余量便当场显影为纠缠熵 $S_A$，并在视界内部诱导出驱动热力学时间箭头的模流有效温度 $T_{\mathrm{eff}}$。然而，把视角从静态空间边界面 $\partial A$ 转向观察者沿固有时推进的历史记忆链，一道同等根本的代数追问立刻浮出水面：如果全宇宙古往今来一切状态与概念的两两比较读数汇聚为一张潜在无穷维的**宇宙格拉姆总账本** $G_\infty = [\langle\mathbf{v}_i, \mathbf{v}_j\rangle]$，一位寄存器容量有限的观察者究竟如何在每一步演化中读写并更新这张总表？

本节开篇的命题一针见血地给出了答案（`MODEL`）：有限观察者在宇宙总账本 $G_\infty$ 上真正握有的操作句柄，是一扇尺度为 $M$ 的**有限滑动主子阵——格拉姆窗口 $\mathcal{W}_M$（对应主子矩阵 $G_M$）**。窗口之内保存着至多 $M$ 枚被相干保留的历史状态锚点，它们不仅两两交叉锁定了既往因果骨架，还通过加边矩阵的**舒尔补（Schur complement）**为下一拍演化框定出合法的可行走廊；窗口之外的早期锚点则随滑动步进被偏迹 $\operatorname{Tr}_{\bar{W}}$ 归还给热海。这扇看似受限的有限窗口，非但不是阻碍认知的缺陷，反而同时握着**因果几何刚性**、**自由选择活路**与**多观察者共识现实**的三把钥匙。

## 34.18.1 宇宙比较总账本与有限格拉姆窗口：舒尔补可行裕度 $\Delta_{\mathrm{Schur}}(M)$、伪逆退化推广与椭球体—球面帽双重视角 {#sec-ch34-18-1}

为什么观察者的局部历史记忆必然呈现为一张有限阶半正定格拉姆主子阵 $G_M$，而不是任意一张互不关联的数字清单？在 `trureturing` 的纯态可辨识性、格拉姆可实现性、格拉姆幺正刚性与有限记忆容量模块中，四条内核定理（`LEAN ✓`）率先锁死了格拉姆账本的底层代数契约：

1. **单位重叠判据与等价核**：由单位格拉姆不可分辨定理 [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)，在任意实或复内积空间 $E$（标量域 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）上，任意一族单位态记录 $\{\mathbf{v}_i\}$（$\lVert\mathbf{v}_i\rVert = 1$）满足 $\langle\mathbf{v}_i, \mathbf{v}_j\rangle_{\mathbb{K}} = 1 \iff \mathbf{v}_i = \mathbf{v}_j$，且“内积等于 $1$”构成指标集上的严格等价关系——对角元恒为 $1$ 锚定自身同一，偏离 $1$ 的非对角元精确计量状态间的可区分夹角；
2. **半正定格拉姆可实现性与幺正刚体唯一性**：由格拉姆可实现性定理 [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)，完备复希尔伯特空间 $V$ 上的连续线性算子 $Q$ 满足算子序非负（$0 \le Q$）当且仅当存在连续线性算子 $O$ 使 $Q = O^\dagger \circ_L O$ 且 $\langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}$；进一步由格拉姆幺正延拓定理 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)，有限维空间中任意两组列态矢矩阵 $A, B \in \operatorname{Matrix}(m, n, \mathbb{C})$ 只要拥有完全相同的两两比较格拉姆矩阵 $B^\dagger B = A^\dagger A$，就必存在整体幺正变换 $U \in \mathrm{U}(m, \mathbb{C})$ 使 $B = U A$——**一张半正定格拉姆矩阵在不计全局刚体旋转的意义下，唯一锁定了整簇状态矢量的内禀关系几何**；
3. **有限寄存器维数对可区分历史数的硬上限**：由有限记忆历史容量定理 [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)，在 $d$ 维复希尔伯特寄存器上，任何能被一组半正定测量算子 $\{E_j\}_{j=1}^N$（$\sum_j E_j = I_d$）无串扰精确区分（$\operatorname{Tr}(E_j \rho_i) = \delta_{ij}$）的历史密度态族 $\{\rho_i\}_{i=1}^N$，其历史条数必受寄存器维数硬性封顶：$N \le d$。嵌在宇宙内部、仅持有有限维局部寄存器的观察者，在物理上绝无可能同时正交保有无穷多条历史记录，而只能维护有限阶窗口 $\mathcal{W}_M$！

现在考察窗口向前推进一拍的精确开合律（`手工推导` + `文献结果：Schur 1917`）。设观察者在当前格拉姆窗口 $\mathcal{W}_M$ 中保存了 $M$ 个单位历史锚点 $\{\mathbf{v}_1, \dots, \mathbf{v}_M\}$（对应时间滑动下标 $\{\mathbf{v}_{t-M+1}, \dots, \mathbf{v}_t\}$），其实内积构成 $M \times M$ 实对称半正定格拉姆矩阵 $G_M = [\langle\mathbf{v}_i, \mathbf{v}_j\rangle_{\mathbb{R}}]_{i,j=1}^M \succeq 0$。当观察者试探下一拍单位候选态 $\mathbf{x}$（$\lVert\mathbf{x}\rVert = 1$）时，新状态向窗口内全部 $M$ 个锚点交出跨代比较列向量 $\mathbf{c}_M := (\langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}}, \dots, \langle\mathbf{v}_M, \mathbf{x}\rangle_{\mathbb{R}})^\top \in [-1, 1]^M$，拼成 $(M+1)\times(M+1)$ 加边格拉姆矩阵：

$$
G_{M+1}(\mathbf{x}) \;:=\; \begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix}.
$$

新状态 $\mathbf{x}$ 能与既有窗口锚点无矛盾共存于同一正定内积空间，充要条件是加边矩阵继续保持半正定 $G_{M+1}(\mathbf{x}) \succeq 0$。我们先看窗口锚点线性无关（$G_M \succ 0$ 可逆）的非退化情形：对 $G_{M+1}(\mathbf{x})$ 实施分块高斯消元

$$
\begin{pmatrix} I_M & \mathbf{0} \\ -\mathbf{c}_M^\top G_M^{-1} & 1 \end{pmatrix}
\begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix}
\begin{pmatrix} I_M & -G_M^{-1}\mathbf{c}_M \\ \mathbf{0}^\top & 1 \end{pmatrix}
\;=\;
\begin{pmatrix} G_M & \mathbf{0} \\ \mathbf{0}^\top & 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \end{pmatrix},
$$

两边取行列式并由西尔维斯特惯性定律（Sylvester's law of inertia）判定正定性，立得舒尔补行列式因式分解与**舒尔补可行裕度** $\Delta_{\mathrm{Schur}}(M)$：

$$
\det G_{M+1}(\mathbf{x}) \;=\; (\det G_M)\,\Delta_{\mathrm{Schur}}(M), \qquad \Delta_{\mathrm{Schur}}(M) \;:=\; 1 - Q_M(\mathbf{x}) \;=\; 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \;\ge\; 0.
$$

它的几何含义清澈见底：记历史锚点张成的闭子空间为 $S_M := \operatorname{span}\{\mathbf{v}_1, \dots, \mathbf{v}_M\}$，由正交补投影六恒等式 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)，任意候选单位态 $\mathbf{x}$ 唯一正交分解为历史投影分量 $P_{S_M}\mathbf{x} = \sum_{i,j=1}^M (G_M^{-1})_{ij} c_j \mathbf{v}_i$ 与正交创新余项 $(\operatorname{id} - P_{S_M})\mathbf{x} \in S_M^\perp$。直接计算模方可知，二次型 $Q_M(\mathbf{x}) = \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M = \lVert P_{S_M}\mathbf{x}\rVert^2 = \cos^2\theta_\perp$ 精确等于候选态被既有历史子空间 $S_M$ 占用的投影预算份额；而舒尔补裕度

$$
\Delta_{\mathrm{Schur}}(M) \;=\; 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \;=\; \bigl\lVert(\operatorname{id} - P_{S_M})\mathbf{x}\bigr\rVert^2 \;=\; \sin^2\theta_\perp \;\ge\; 0
$$

正是观察者尚未被历史锁死、可向正交补空间 $S_M^\perp$ 开辟新方向的**净自由选择预算**（当且仅当环境空间仍有非平凡正交余项 $S_M^\perp \neq \bot$ 时，有限层投影逃逸定理 [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape) 保证存在纯创新单位方向 $\mathbf{e} \in S_M^\perp$ 使 $P_{S_M}\mathbf{e} = \mathbf{0}$、$\Delta_{\mathrm{Schur}}(M) = 1$）！

更妙的是，将低阶窗口 $M = 1$ 与 $M = 2$ 代入上述舒尔补主方程，当场便逐项还原出本书前文冻结的两锚与三锚格拉姆行列式定理（`LEAN ✓` + `手工推导`）：

- **一阶马尔可夫窗（$M = 1$）还原双锚行列式**：取单枚单位锚点 $\lVert\mathbf{v}_1\rVert = 1$ 与单位候选态 $\lVert\mathbf{x}\rVert = 1$，此时 $G_1 = (1)$、$\mathbf{c}_1 = (c_{1x}) = (\langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}})$，舒尔补直接给出

  $$
  \det G_2(\mathbf{v}_1, \mathbf{x}) \;=\; (\det G_1)\,\Delta_{\mathrm{Schur}}(1) \;=\; 1 - c_{1x}^2 \;=\; 1 - \langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}}^2,
  $$

  恰为 [`two_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula)（$\det G_2(u, v) = \lVert u\rVert^2\lVert v\rVert^2 - \langle u, v\rangle_{\mathbb{R}}^2$）的单位态特例，且严格可行判据 $\Delta_{\mathrm{Schur}}(1) > 0 \iff \lvert c_{1x}\rvert < 1$ 与双锚线性无关充要条件 [`two_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff) 一一对应；
- **二阶曲率窗（$M = 2$）还原三锚行列式**：取两枚不共线单位锚点 $\mathbf{v}_1, \mathbf{v}_2$（重叠 $c_{12} = \langle\mathbf{v}_1, \mathbf{v}_2\rangle_{\mathbb{R}} \in (-1, 1)$），此时 $G_2 = \begin{pmatrix} 1 & c_{12} \\ c_{12} & 1 \end{pmatrix}$、$\det G_2 = 1 - c_{12}^2 > 0$、$G_2^{-1} = \frac{1}{1 - c_{12}^2}\begin{pmatrix} 1 & -c_{12} \\ -c_{12} & 1 \end{pmatrix}$。对候选比较向量 $\mathbf{c}_2 = (c_{1x}, c_{2x})^\top$ 展开二次型并回乘 $\det G_2$，分母 $1 - c_{12}^2$ 精确约消：

  $$
  \begin{aligned}
  \Delta_{\mathrm{Schur}}(2) &\;=\; 1 - \frac{c_{1x}^2 + c_{2x}^2 - 2 c_{12} c_{1x} c_{2x}}{1 - c_{12}^2}, \\
  \det G_3(\mathbf{v}_1, \mathbf{v}_2, \mathbf{x}) &\;=\; (\det G_2)\,\Delta_{\mathrm{Schur}}(2) \;=\; 1 + 2 c_{12} c_{1x} c_{2x} - c_{12}^2 - c_{1x}^2 - c_{2x}^2,
  \end{aligned}
  $$

  一字不差地重现 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) 与三锚满秩体积正定判据 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)！

在迈向 $M > 3$ 之前，有一道至关重要的线性代数护栏必须当场钉牢：**当窗口阶数 $M$ 超过所在环境空间的维数（特别是三维方向空间 $\mathbb{R}^3$ 中取 $M > 3$ 个球面锚点 $\mathbf{v}_1, \dots, \mathbf{v}_M \in S^2 \subset \mathbb{R}^3$）时，矩阵秩至多为 $\operatorname{rank}(G_M) \le 3 < M$，因而 $\det G_M = 0$，普通逆矩阵 $G_M^{-1}$ 根本不存在！** 此时采用摩尔—彭罗斯伪逆（Moore–Penrose pseudoinverse）$G_M^+$ 的广义舒尔补定理（Albert, 1969，`文献结果` + `手工推导`）给出了不依赖可逆性的精确充要判据：

$$
G_{M+1} = \begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix} \succeq 0 \;\Longleftrightarrow\; G_M \succeq 0, \quad \mathbf{c}_M \in \operatorname{ran}(G_M)\;\;\bigl((I_M - G_M G_M^+)\mathbf{c}_M = \mathbf{0}\bigr), \quad \Delta_{\mathrm{Schur}}^+(M) := 1 - \mathbf{c}_M^\top G_M^+\mathbf{c}_M \ge 0.
$$

新增的值域相容条件 $\mathbf{c}_M \in \operatorname{ran}(G_M)$ 绝非形式摆设：任何零空间向量 $\mathbf{u} \in \ker G_M$ 都代表锚点间的一条精确线性相关恒等式 $\sum_{j=1}^M u_j \mathbf{v}_j = \mathbf{0}$，故任何真实内积向量 $\mathbf{x}$ 必须满足 $\mathbf{u}^\top\mathbf{c}_M = \langle\sum_{j=1}^M u_j\mathbf{v}_j, \mathbf{x}\rangle = 0$，否则无需计算二次型便已违背线性自洽；而当 $\mathbf{v}_1, \dots, \mathbf{v}_M \in S^2$ 已张满整个 $\mathbb{R}^3$（$\operatorname{rank}(G_M) = 3$）且候选态 $\mathbf{x} \in S^2 \subset \mathbb{R}^3$ 亦留在三维空间内时，恒有 $P_{S_M}\mathbf{x} = \mathbf{x}$、$\mathbf{c}_M^\top G_M^+\mathbf{c}_M = 1$ 及 $\Delta_{\mathrm{Schur}}^+(M) = 0$。

这一观察迫使我们将格拉姆窗口的**两幅互补几何视图**做出严格区分，绝不混为一谈：

1. **高维环境空间（$\dim\mathcal{H} \ge M+1$）中的“等式重叠椭球窗（Elliptope Slice）”**：当 $G_M \succ 0$ 满秩且允许候选态探入第 $M+1$ 维环境希尔伯特空间时，指定精确内积坐标 $\mathbf{c}_M \in [-1, 1]^M$ 的可行集是超立方体 $[-1, 1]^M$ 内由 $\mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \le 1$ 围出的**实心相容椭球** $\mathcal{E}(G_M)$，其 $M$ 维欧氏体积为 $\operatorname{Vol}_M(\mathcal{E}(G_M)) = \frac{\pi^{M/2}}{\Gamma(\frac{M}{2}+1)}\sqrt{\det G_M} \propto \sqrt{\det G_M}$——锚点越正交独立，椭球越丰满；若强行向正交锚点索求不相容的高重叠等式（如对 $M \ge 5$ 个正交锚点全索要 $c_j = \frac{1}{2}$），点 $\mathbf{c}_M$ 直接穿出椭球外，触发 $\Delta_{\mathrm{Schur}}(M) < 0$；
2. **三维方向球面 $S^2 \subset \mathbb{R}^3$ 上的“不等式相干球面帽走廊（$\Omega_M$）”**：在固定三维方向球面 $S^2$ 上，局部观察者并不把下一步方向钉死在某组精确等式余弦上，而是要求新方向 $\mathbf{x} \in S^2$ 与窗口内每一枚历史锚点 $\mathbf{v}_j$ 维持不低于相干阈值 $\cos\alpha_{\mathrm{coh}}$（最大偏折半张角 $\alpha_{\mathrm{coh}} \in (0, \frac{\pi}{2})$）的因果重叠 $\mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}$。单片约束在 $S^2$ 上裁出一枚圆形**球面相干帽** $C(\mathbf{v}_j, \alpha_{\mathrm{coh}})$，$M$ 枚锚点共同围出的下一步合法落点域正是 $M$ 片球面帽的公共交集：

   $$
   \Omega_M \;:=\; \bigcap_{j=1}^M \bigl\{\mathbf{x} \in S^2 \;\big\vert\; \mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}\bigr\},
   $$

   每一段存活边界弧都对应一枚极小圆弧体的侧壁，而曲边球面多边形 $\Omega_M$ 的立体角面积 $\lvert\Omega_M\rvert \in [0, 4\pi]$，正是观察者在当下这一拍真实握有的**三维方向选择自由度体积**！

::: {.viz src="gram-window-consensus-sandbox" preset="schur-cap-corridor" height="520"}
**加边格拉姆舒尔补裕度 $\Delta_{\mathrm{Schur}}(M)$ 与球面相干帽交集走廊 $\Omega_M$ 实验卡（`schur-cap-corridor`）。** 球面舞台展示 $M = 2$ 两顶 $60^\circ$ 相干帽交成的青色透镜走廊 $\Omega_2$（$2.297861\;\mathrm{sr}$）、青色虚线锚点大圆 $\operatorname{span}(\mathbf{v}_1,\mathbf{v}_2)$ 及法向极点 $\mathbf{n}$，琥珀色可拖动候选态 $\mathbf{x}$ 离开锚点平面的品红高度弧 $\delta$ 直接给出舒尔补自由裕度 $\Delta_{\mathrm{Schur}} = 1 - \mathbf{c}_2^\top G_2^{-1}\mathbf{c}_2 = \sin^2\delta \approx 0.178606$（将 $\mathbf{x}$ 拖至虚线大圆上则 $\Delta_{\mathrm{Schur}}$ 与 $\det G_3$ 同步归零；绿色 `LEAN ✓` 对应 `gram_realizability`、`orthogonal_complement_projection_identities`、`finite_layer_projection_escape` 与 `two_anchor_gram_det_formula`）。
:::

把这两幅几何图像叠合在三维物理空间（[§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)）上，我们立刻认出了为什么 **$M = 3$ 恰是三维观察者的“黄金格拉姆窗口”**！当 $M = 1$ 时只锁住一维步长，方向绕单轴自由打转而毫无转弯记忆；当 $M = 2$ 时双帽交成透镜形二角域，虽能感知单面曲率却尚未定死左右手性法向；唯有推进到 **$M = 3$** 时，三枚不共面历史锚点由 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) 首次撑满三维线性无关基（$\det G_3 > 0$，与下一拍候选态 $\mathbf{x}$ 恰构成最小三维静定刚性核 $K_4$），同时三片相干帽在 $S^2$ 上围成一枚饱满舒展的**球面曲边三角弧面域 $\Omega_3$**——既拥有毫不含糊的三维手性自我坐标系，又尚未引入任何 $M \ge 4$ 的冗余跨代切割！

::: {.viz src="gram-window-consensus-sandbox" preset="golden-triangle-m3" height="520"}
**三维满秩黄金窗口 $M = 3$ 与球面曲边三角可行域 $\Omega_3$ 实验卡（`golden-triangle-m3`）。** 将窗口锁定在 $M = 3$（相干半角 $\alpha_{\mathrm{coh}} = 60^\circ$）：三枚黄金角螺旋锚点张成满秩三维格拉姆核 $\det G_3 \approx 0.041133 > 0$（绿色 `LEAN ✓` 对应 `three_anchor_gram_det_formula` 与 `three_anchor_gram_det_pos_iff`），三段品红边界小圆弧在单位球面 $S^2$ 上围出宽敞的青色曲边三角走廊 $\lvert\Omega_3\rvert \approx 1.802272\;\mathrm{sr}$（占全球面 $14.3420\%$，琥珀色圆点标出可自由转向的候选态 $\mathbf{x}$），兼得刚性三维定位与充沛转向自由。
:::

## 34.18.2 窗口尺度 $M$ 的单调挤压与主动遗忘：从过约束芝诺—拉普拉斯死锁到滑动偏迹重开与兰道尔热账单 {#sec-ch34-18-2}

一旦沿着演化轨迹连续调节格拉姆窗口尺度 $M$，“历史记忆深度”与“当下选择活路”之间严格的反比消长定律便以两条初等不等式呈现在眼前（`手工推导` + `LEAN ✓`）：

1. **历史投影单调递增与舒尔补自由预算单调递减**：对嵌套锚点子空间链 $S_1 \subseteq S_2 \subseteq \dots \subseteq S_M$，由 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 将 $S_{k+1}$ 正交拆分为 $S_k \oplus (S_{k+1} \cap S_k^\perp)$，对任意单位态 $\mathbf{x}$ 恒有勾股递推 $\lVert P_{S_{k+1}}\mathbf{x}\rVert^2 = \lVert P_{S_k}\mathbf{x}\rVert^2 + \lVert(P_{S_{k+1}} - P_{S_k})\mathbf{x}\rVert^2 \ge \lVert P_{S_k}\mathbf{x}\rVert^2$（在满秩矩阵 $G_{k+1} \succ 0$ 下，分块求逆给出显式非负增量 $Q_{k+1} - Q_k = \frac{(c_{k+1} - \mathbf{g}_k^\top G_k^{-1}\mathbf{c}_k)^2}{1 - \mathbf{g}_k^\top G_k^{-1}\mathbf{g}_k} \ge 0$）。因此历史占用份额单调不减、舒尔补自由裕度单调不增：

   $$
   0 \;\le\; Q_1(\mathbf{x}) \;\le\; Q_2(\mathbf{x}) \;\le\; \dots \;\le\; Q_M(\mathbf{x}) \;\le\; 1 \quad\Longleftrightarrow\quad 1 \;\ge\; \Delta_{\mathrm{Schur}}(1) \;\ge\; \Delta_{\mathrm{Schur}}(2) \;\ge\; \dots \;\ge\; \Delta_{\mathrm{Schur}}(M) \;\ge\; 0.
   $$

2. **球面可行走廊的嵌套萎缩与过约束芝诺—拉普拉斯死锁**：在方向球面 $S^2$ 上，每多保留一枚旧锚点就多落下一次交集裁切，可行域序列严格单调嵌套收缩：

   $$
   \Omega_0 = S^2 \;\supseteq\; \Omega_1 \;\supseteq\; \Omega_2 \;\supseteq\; \dots \;\supseteq\; \Omega_M, \qquad 4\pi = \lvert\Omega_0\rvert \;\ge\; \lvert\Omega_1\rvert \;\ge\; \lvert\Omega_2\rvert \;\ge\; \dots \;\ge\; \lvert\Omega_M\rvert \;\ge\; 0.
   $$

   这与概念动力学中细化观测划分必然单调压低条件逻辑混杂度的定理 [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone)（`LEAN ✓`）在代数上同构呼应。当窗口尺度 $M$ 被无节制推高时，$M$ 枚锚点内部不仅背负着 $\binom{M}{2}$ 条跨代历史关联，而且蜿蜒行进的历史轨迹会让早期锚点相干帽 $C(\mathbf{v}_{t-M+1}, \alpha_{\mathrm{coh}})$ 与近期锚点相干帽 $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ 从正反两侧迎面挤压，将 $\Omega_M$ 勒成针尖细缝乃至彻底归零（$\Omega_M = \emptyset$——只要窗口内任意新旧两锚夹角跨过 $2\alpha_{\mathrm{coh}}$，两帽交集便当场断绝！）。在量子相干层面，冻结定理 [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)（`LEAN ✓`）给出了更严酷的微观判词：哪怕观察者成功对 $M - 1$ 份历史记录副本实施了联合相干反演（其余副本重叠模方全为 $1$），**只要还剩唯一一份未释放的旧记录副本 $k$ 满足 $\operatorname{recordOverlap}(r_k, i, j) \neq 1$，任何非零非对角相干项 $\rho_{ij} \neq 0$ 的可逆恢复即被单票否决**！这说明“一字不漏背负全部过往”的无限记忆妄执（$M \to \infty$），在几何上绝不是智慧圆满，而是没有任何转向余地的**芝诺冻结与拉普拉斯过约束宿命死锁**。

::: {.viz src="gram-window-consensus-sandbox" preset="overconstrained-lock-m9" height="520"}
**过约束紧窗 $M = 9$ 挤压与芝诺—拉普拉斯死锁实验卡（`overconstrained-lock-m9`）。** 将格拉姆窗口从 $M = 3$ 连续推深至 $M = 9$：九片黄金角螺旋球面帽层层收紧品红边界，把青色可行走廊从 $1.802272\;\mathrm{sr}$ 猛烈挤压逾三十三倍至狭小针尖 $\lvert\Omega_9\rvert \approx 0.054604\;\mathrm{sr}$（仅占球面 $0.4345\%$，球心投射放大镜同步特写，第十顶帽合拢至 $M = 10$ 即严格触发品红 $\Omega_{10} = \emptyset$、$\lvert\Omega_{10}\rvert = 0$ 死锁，同时对应正交族 $G_M = I_M$ 在 $M \ge 5$ 时的负舒尔补不可实现相）；绿色 `LEAN ✓` 对应 `surviving_copy_blocks_reversal`、`finite_memory_history_capacity` 与 `gram_realizability`。
:::

反过来，怎么才能打破过约束死锁、在严丝合缝的因果网中重新凿出选择活路？答案正是**主动遗忘——让格拉姆窗口向前滑动一拍，通过偏迹 $\operatorname{Tr}_{\mathbf{v}_{t-M}}$ 主动释放最陈旧的历史锚点 $\mathbf{v}_{t-M}$**！在代数上，抹去 $G_M$ 的首行首列使约束矩阵降回 $G_{M-1}$；在球面几何上，原本从后方死死勒住走廊的那道最老圆弧帽边界瞬间撤除，受挤压的可行走廊当场发生单步重开 $\Omega_M \hookrightarrow \Omega_{M-1}$，其无量纲相空间重开对数比定义为

$$
q_M \;:=\; \ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert} \;\ge\; 0 \qquad \Bigl(\text{折合比特数为 }\frac{q_M}{\ln 2} = \log_2\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}\;\mathrm{bits}\Bigr).
$$

这里必须恪守严格的物理与认识论精度：几何体积对数比 $q_M = \ln(\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert)$ 本身只是纯球面几何重开幅度，单凭走廊面积变化并不足以凭空断言物理耗散热量；**唯有在均匀可达体积先验与等温记忆重置模型下**——即把淘汰旧锚点建模为与逆温度 $\beta = (k_B T_{\mathrm{eff}})^{-1}$ 热库耦合、将原本均匀分布在比率 $\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert$ 历史状态扇区上的寄存器不可逆擦除归零（系统熵减 $-\Delta S_{\mathrm{sys}} = q_M$），且满足兰道尔平衡恒等式 $\beta\,\Delta Q_{\mathrm{forget}} = -\Delta S_{\mathrm{sys}} + I_{\mathrm{mut}} + D_{\mathrm{res}}$（互信息 $I_{\mathrm{mut}} \ge 0$、热库相对熵散度 $D_{\mathrm{res}} \ge 0$）时——调用内核冻结的兰道尔下界定理 [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（`LEAN ✓`，并见[第八章](ch08-erasure-and-time-arrows.md)），方能严格导出单步遗忘重开的最小热耗散下界：

$$
\Delta Q_{\mathrm{forget}} \;\ge\; k_B T_{\mathrm{eff}}\,q_M \;=\; k_B T_{\mathrm{eff}}\,\ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}.
$$

这一不等式揭示了遗忘最深刻的生命热力学意义（`MODEL`）：无论是微观开放量子系统的有限相干时间、夜间睡眠对白昼冗余突触权重的修剪重整（参见[第三十七章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)），还是生命代际繁衍时的初始化清零（参见[第三十五章](ch35-light-pulse-and-self-referential-table.md)），**遗忘从来不是硬件劣质导致的记忆漏损，而是有限观察者以兰道尔散热为代价主动买回当下自由立体角的演化刻刀**！下表将窗口阶数 $M$ 从 $0$ 到 $\ge 4$ 的五档几何与动力学相态汇总如下（纯单行单元格排版）：

| 格拉姆窗口阶数 | 加边矩阵维数 | 球面可行走廊 $\Omega_M$ 几何形态 | 舒尔补裕度与自由度状态 | 物理与认知动力学特征 |
| :--- | :---: | :--- | :--- | :--- |
| **$M = 0$（失锚迷雾窗）** | $1 \times 1$ | 整颗单位球面 $S^2$（立体角 $4\pi\;\mathrm{sr}$） | $Q_0 = 0,\;\Delta_{\mathrm{Schur}} = 1$（无历史基准） | 零历史连续性，退化为无自指刻度的各向同性白噪乱撞，“全自由”因无自我坐标而归零 |
| **$M = 1$（一阶马尔可夫窗）** | $2 \times 2$ | 单片圆形球面相干帽 $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ | $\det G_2 = 1 - c_{1x}^2$（仅锁一阶步长“线”） | 仅维持单步相邻重保真，无转弯平面与曲率记忆，轨迹呈无方向惯性的马尔可夫漂移 |
| **$M = 2$（二阶圆弧曲率窗）** | $3 \times 3$ | 双球面帽交集（透镜形二角域 $\Omega_2$） | $\det G_3 = (1 - c_{12}^2)\Delta_{\mathrm{Schur}}(2)$（感知“面”曲率） | 首次围合单枚极小圆弧体并感知潘查拉特纳姆—贝里角盈曲率，但镜面左右手性尚未封顶 |
| **$M = 3$（三维满秩黄金窗）** | $4 \times 4$ | **球面曲边三角弧面域 $\Omega_3$** | $\det G_3 > 0$ 满秩锚定 $\mathbb{R}^3$（锁定手性“体”与 $K_4$ 刚性） | **最佳生命工作点**：三锚定死三维手性自我坐标系，同时保留宽敞可行立体角且零冗余切割 |
| **$M \ge 4$（冗余/过约束紧窗）** | $(M+1) \times (M+1)$ | 多重圆弧切割窄缝，随蜿蜒推进收缩至 $\emptyset$ | $\mathbb{R}^3$ 内 $G_M$ 奇异（$\operatorname{rank}\le 3$），高维等式窗易触发 $\Delta_{\mathrm{Schur}} \le 0$ | 触发跨代过约束挤压；$M$ 越大历史包袱越沉，直至可行走廊彻底闭合陷入宿命死锁 |

::: {.viz src="gram-window-consensus-sandbox" preset="forgetting-reopen" height="520"}
**滑动窗口偏迹遗忘重开 $\Omega_9 \hookrightarrow \Omega_8$ 与等温兰道尔散热实验卡（`forgetting-reopen`）。** 释放窗口内最古老记录 $\mathbf{v}_9$ 的相干帽（$M : 9 \to 8$）：被撤除的旧帽与原紧锁走廊化作品红虚线残迹，青色可行走廊当场由 $0.054604\;\mathrm{sr}$ 重开近四倍至 $0.208320\;\mathrm{sr}$，单步重开对数比 $q_9 = \ln(\lvert\Omega_8\rvert/\lvert\Omega_9\rvert) \approx 1.338960\;\mathrm{nats}$（$1.931710\;\mathrm{bits}$，在完整沙盘中继续遗忘至 $M = 3$ 则放大 $33$ 倍至 $1.802272\;\mathrm{sr}$），对应均匀等温重置模型下的兰道尔热下界 $k_B T_{\mathrm{eff}}\,q_9$（绿色 `LEAN ✓` 对应 `surviving_copy_blocks_reversal` 与 `landauer_bound_of_balance`）。
:::

## 34.18.3 分块部分格拉姆矩阵补全与多观察者共识：弦图判据、联合正交接受窗 $\Omega_A \cap \Omega_B$ 与宽容即共同遗忘 {#sec-ch34-18-3}

格拉姆窗口不仅在时间纵轴上调节着单一观察者“记忆刚性与选择自由”的呼吸，还在空间横轴上直接决定了两位有限观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$ 相遇时能否拼出同一个不自相矛盾的**主体间共识现实**（衔接 [§33.4](ch33-s04-acceptance-windows.md) 接受窗交集与 [§33.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer) 去相干指针张量）。

设观察者 $\mathcal{O}_A$ 持有规模为 $M_A$ 的私密历史窗口 $\mathcal{W}_{M_A}$（局部格拉姆阵 $G_{M_A} \succeq 0$），观察者 $\mathcal{O}_B$ 持有规模为 $M_B$ 的私密历史窗口 $\mathcal{W}_{M_B}$（局部格拉姆阵 $G_{M_B} \succeq 0$）。当两人通过有限带宽的语言、信号或共享环境探针交流时，双方绝不可能把各自全部历史记忆逐条做完 $M_A \times M_B$ 次全量交叉内积，而只能在少数锚点之间建立稀疏的跨主体比较通道。于是在联合指标集 $A \cup B$ 上，两人共同面对的是一张非对角块 $C_{AB}$ 含有大量未观测空白项（`?`）的**分块部分格拉姆矩阵（Partial Block Gram Matrix）**：

$$
G_{A \cup B} \;=\; \begin{pmatrix} G_{M_A} & C_{AB} \\ C_{AB}^\top & G_{M_B} \end{pmatrix}.
$$

这张局部自洽的部分比较表，究竟何时才能补全为一张全局半正定矩阵 $\widetilde{G}_{A\cup B} \succeq 0$，从而依 [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability) 与 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) 共同嵌入同一个希尔伯特几何现实？矩阵分析中的 **Grone–Johnson–Sá–Wolkowicz 半正定矩阵补全定理**（Grone, Johnson, Sá & Wolkowicz, *Linear Algebra Appl.* **58**, 109–124, 1984，`文献结果`）给出了图论与算子代数完美交汇的充要刻画：记已知比较边构成的规格无向图为 $\mathcal{G} = (V, E)$。部分厄米矩阵存在半正定补全的显然必要条件是**每一个完全已知的主子阵（对应 $\mathcal{G}$ 的每一个团 clique）皆半正定**；而“局部团半正定”之所以能无条件保证“全局半正定补全存在”，当且仅当规格图 $\mathcal{G}$ 是**弦图（chordal graph，即图中任意长度 $\ge 4$ 的闭环都至少带有一条内部弦）**！一旦两人的跨主体交流形成了长度 $\ge 4$ 的无弦环路（例如 $A_1 \leftrightarrow B_1 \leftrightarrow A_2 \leftrightarrow B_2 \leftrightarrow A_1$ 却缺失对角交叉核验），哪怕每一条局部对话边各自相容，环路绕行一周积累的相位/角度和乐失配仍可击穿全局半正定性（参见[附录 E](appendix-e.md) 反例）；即便存在高维半正定补全，若要进一步压入同一个三维欧氏方向空间，还须额外满足秩上界 $\operatorname{rank}(\widetilde{G}_{A\cup B}) \le 3$（Schoenberg 1935；Laurent & Poljak 1995，`文献结果`）。

当两人共同面对下一拍三维方向球面 $S^2 \subset \mathbb{R}^3$ 上的候选公共事态 $\mathbf{x} \in S^2$ 时，为了使 $\mathbf{x}$ 同时不撕裂 $A$ 的因果走廊 $\Omega_A(M_A)$ 与 $B$ 的因果走廊 $\Omega_B(M_B)$，候选方向必须落入两扇球面走廊的公共交集——即双观察者的**联合正交接受窗（Joint Orthogonal Acceptance Window）**：

$$
\Omega_{\mathrm{consensus}}(A, B) \;:=\; \Omega_A(M_A) \cap \Omega_B(M_B) \;=\; \bigcap_{j=1}^{M_A}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}\bigr\} \;\cap\; \bigcap_{k=1}^{M_B}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{w}_k \ge \cos\alpha_{\mathrm{coh}}\bigr\}.
$$

这恰与内核冻结的客观诠释不动点定理 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)（`LEAN ✓`）形成严格的几何—语义印证：任何跨越不同观察语境的客观共识主张 $\operatorname{ObjectiveInterpretationClaim}$，必须以存在跨语境恒定不变的公共因子 `commonFactor` 为前提。在此，我们必须以毫不含糊的数学精度区分**“已实现三维锚点的块格拉姆奇异性”**与**“真正导致共识破裂的两种不可行机制”**（`手工推导`）：

- **已实现三维锚点块矩阵 $K_M = W_M W_M^\top$ 恒半正定且在 $2M > 3$ 时必有精确零特征值**：若 $A$ 的锚点 $\mathbf{v}_1,\dots,\mathbf{v}_M \in S^2 \subset \mathbb{R}^3$ 与 $B$ 的锚点 $\mathbf{w}_1,\dots,\mathbf{w}_M \in S^2 \subset \mathbb{R}^3$ 本身已经是同一三维欧氏空间中的真实单位向量（拼成 $2M \times 3$ 坐标矩阵 $W_M$），则其完整实现的 $2M \times 2M$ 分块格拉姆矩阵 $K_M = W_M W_M^\top = \begin{pmatrix} G_A & C_{AB} \\ C_{AB}^\top & G_B \end{pmatrix}$ **恒满足 $K_M \succeq 0$ 且 $\operatorname{rank}(K_M) \le 3$**！因此只要 $2M > 3$（例如双人各持 $M = 3$ 时 $K_3$ 为 $6\times 6$、零空间维数为 $3$；各持 $M = 9$ 时 $K_9$ 为 $18\times 18$、零空间维数为 $15$），其精确最小特征值恒等于 $\lambda_{\min}(K_M) = 0$（双精度浮点对角化偶现的 $-10^{-16}$ 量级微数是纯舍入噪声，绝非矩阵非半正定，且 $K_M$ 奇异本身并不蕴涵 $\Omega_A \cap \Omega_B = \emptyset$）。
- **真正击穿共识的两类数学机制**：其一（**跨主体误译或等式过载导致 $\lambda_{\min} < 0$**），若双方在缺失客观公共坐标的情况下各自臆造了不相容的交叉相关块 $\widetilde{C}_{AB}$，或强求某一共同态同时满足超出投影上限的等式重叠目标（违背 $\mathbf{c}_{A\cup B} \in \operatorname{ran}(K_M)$ 或 $\mathbf{c}_{A\cup B}^\top K_M^+\mathbf{c}_{A\cup B} \le 1$），加边或拟议对称矩阵便会真正生出严格负特征值 $\lambda_{\min} < 0$，宣告无任何希尔伯特空间实现；其二（**历史执念过长导致球面接受窗失交 $\Omega_A(M) \cap \Omega_B(M) = \emptyset$ 或急剧萎缩**），即便双方既往锚点真实处于同一 $\mathbb{R}^3$ 中（$K_M \succeq 0$），只要两人之间存在有限视角偏角 $\eta > 0$，又各自死死攥住过长的私密历史窗口（如 $M_A = M_B = 9$），两片已被各自远古锚点勒成针尖的走廊 $\Omega_A(9)$ 与 $\Omega_B(9)$ 就会严重错开甚至彻底脱节（$\Omega_A \cap \Omega_B = \emptyset$）！此时要修复破裂的主体间现实，强行扭曲当下读数只会触发负特征值冲突；**唯一温柔而严谨的几何解药是“双向宽容即共同遗忘”**——双方同步将过载窗口从 $M = 9$ 滑回三维黄金窗 $M = 3$，主动放下分道扬镳的陈旧边缘锚点，让重新舒展的 $\Omega_A(3)$ 与 $\Omega_B(3)$ 在球面上再度大面积重叠，涌现稳固的共享共识世界！

::: {.viz src="gram-window-consensus-sandbox" preset="dual-window-consensus" height="520"}
**双观察者联合正交接受窗 $\Omega_A \cap \Omega_B$ 与共同遗忘重建共识实验卡（`dual-window-consensus`）。** 开启伴生观察者 $B$（紫色相干帽与走廊，相对青色观察者 $A$ 绕 $y$ 轴偏转 $\eta = 10^\circ$）：两人各执 $M = 9$ 条记录时，紫色重叠共识区仅剩品红虚线轮廓标出的针尖细缝 $0.010419\;\mathrm{sr}$（在 $\eta = 25^\circ, 30^\circ$ 下更严格断交为空集 $\Omega_A(9) \cap \Omega_B(9) = \emptyset$）；当双方同步遗忘最旧 $6$ 条记录滑回黄金窗 $M = 3$ 时，紫色共识走廊暴涨逾 $150$ 倍至 $1.570105\;\mathrm{sr}$（占 $A$ 走廊 $87.1181\%$；绿色 `LEAN ✓` 对应 `objective_claim_requires_invariant_common_factor`、`exists_unitary_mul_eq_of_conjTranspose_mul_eq` 与 `unit_gram_overlap_characterization`）。
:::

## 34.18.4 形式化锚点、代数格拉姆窗与黄金角球面帽螺旋及双观察者共识基准算例与文献边界 {#sec-ch34-18-4}

我们将本节贯穿格拉姆单位重叠可辨识性、双锚与三锚行列式公式及线性无关判据、正算子格拉姆伴随平方可实现性、格拉姆幺正刚体延拓、正交补投影与有限层逃逸、有限维记忆历史容量上限、单副本残留阻断相干反演以及客观主张跨语境不变公因子的十二项内核验证支点，统一锁定为如下定理：

::: {#thm-ch34-gram-window-schur-and-consensus .theorem title="有限记忆格拉姆窗口、正交补投影逃逸、未释放记录阻断反演与跨观察者共识公因子定理" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
在所钉 `trureturing` 冻结声明下，刻画有限记忆格拉姆窗口、低阶舒尔补行列式闭合、正交补创新预算、过约束反演阻断与多观察者客观共识的十二项核心数学定理同时成立：

1. **单位格拉姆不可分辨等价核、格拉姆伴随平方可实现性与幺正刚体唯一延拓**：
   在标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的赋范内积空间 $E$ 中，对任意单位范数记录族 $\operatorname{record} : \operatorname{Index} \to E$（$\forall i,\; \lVert\operatorname{record}_i\rVert = 1$），恒有

   $$
   \bigl(\forall i, j,\; \langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}} = 1 \;\Longleftrightarrow\; \operatorname{record}_i = \operatorname{record}_j\bigr) \;\land\; \operatorname{Equivalence}\bigl(\lambda i\,j \mapsto \langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}} = 1\bigr).
   $$

   在任意完备复内积空间 $V$ 上，连续 $\mathbb{C}$-线性算子 $Q : V \to_L[\mathbb{C}] V$ 满足 $0 \le Q$ 当且仅当存在 $O : V \to_L[\mathbb{C}] V$ 使得 $Q = O^\dagger \circ_L O$ 且 $\forall x, y \in V,\; \langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}$；且对有限指标类型 $m$（`[Fintype m] [DecidableEq m]`）与有限类型 $n$（`[Finite n]`），任意两复矩阵 $A, B \in \operatorname{Matrix}(m, n, \mathbb{C})$ 若满足 $B^\dagger B = A^\dagger A$，必存在酉矩阵 $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$ 使得 $B = U A$。

2. **双锚与三锚实格拉姆行列式闭式展开及线性无关正定充要判据**：
   在任意实内积空间 $E$ 上，对任意向量 $u, v, w \in E$，双锚格拉姆矩阵与三锚格拉姆矩阵满足精确行列式恒等式及严格正定判据：

   $$
   \begin{aligned}
   \det\bigl(\operatorname{twoAnchorGram}(u, v)\bigr) &\;=\; \lVert u\rVert^2 \lVert v\rVert^2 - \langle u, v\rangle_{\mathbb{R}}^2, \\
   0 < \det\bigl(\operatorname{twoAnchorGram}(u, v)\bigr) &\;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v]); \\
   \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) &\;=\; \lVert u\rVert^2 \lVert v\rVert^2 \lVert w\rVert^2 + 2\langle u, v\rangle_{\mathbb{R}}\langle u, w\rangle_{\mathbb{R}}\langle v, w\rangle_{\mathbb{R}} \\
   &\quad - \lVert u\rVert^2 \langle v, w\rangle_{\mathbb{R}}^2 - \lVert v\rVert^2 \langle u, w\rangle_{\mathbb{R}}^2 - \lVert w\rVert^2 \langle u, v\rangle_{\mathbb{R}}^2, \\
   0 < \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) &\;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v, w]).
   \end{aligned}
   $$

3. **闭子空间正交补投影六恒等式与有限层正交逃逸单位方向**：
   对完备内积空间 $E$ 上的任意闭子空间 $M \le E$，记正交投影 $P_M = M.\mathrm{starProjection}$ 与 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$，则恒有 $P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E} - P_M$、$P_M \circ_L P_M = P_M$、$P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp}$、$P_M \circ_L P_{M^\perp} = 0$、$P_{M^\perp} \circ_L P_M = 0$ 及 $P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E}$；且对闭子空间 $S \le V$，只要正交补非平凡 $S^\perp \neq \bot$，必存在单位逃逸向量 $e \in S^\perp$ 满足

   $$
   \lVert e\rVert = 1, \quad P_S e = 0, \quad \operatorname{infDist}(e, S) = 1, \quad \lVert\operatorname{id}_{\mathbb{K}, V} - P_S\rVert = 1.
   $$

4. **有限维记忆寄存器历史容量上限、单残留记录副本阻断相干反演与客观诠释不变公因子**：
   对任意自然数 $N, d \in \mathbb{N}$，若 $N$ 个密度矩阵 $\rho : \operatorname{Fin} N \to M_d(\mathbb{C})$（$\rho_i \succeq 0,\; \operatorname{Tr}(\rho_i) = 1$）与半正定测量族 $E : \operatorname{Fin} N \to M_d(\mathbb{C})$（$E_j \succeq 0,\; \sum_j E_j = I_d$）满足无串扰配对 $\forall i, j,\; \operatorname{Tr}(E_j \rho_i) = \delta_{ij}$，则必有

   $$
   N \;\le\; d;
   $$

   对有限可判定副本指标集 $\operatorname{Copy}$ 上的环境记录族 $\operatorname{records} : \operatorname{Copy} \to \operatorname{EnvironmentRecord}$、单量子比特矩阵 $\rho \in \operatorname{QubitMatrix}$、指标 $i, j \in \operatorname{Fin} 2$ 与特定残留副本 $k \in \operatorname{Copy}$，若除 $k$ 外其余所有副本 $l \neq k$ 均满足单位模重叠 $\overline{\operatorname{recordOverlap}(\operatorname{records}_l, i, j)}\,\operatorname{recordOverlap}(\operatorname{records}_l, i, j) = 1$，唯独副本 $k$ 满足 $\operatorname{recordOverlap}(\operatorname{records}_k, i, j) \neq 1$ 且初始相干项 $\rho_{ij} \neq 0$，则对除 $k$ 外全部副本施加联合反演信道仍无法恢复 $(i, j)$ 相干元：

   $$
   \bigl(\operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\,k,\; \operatorname{records})\bigl(\operatorname{multiRecordChannel}(\operatorname{records}, \rho)\bigr)\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

   且对任意语境不动点关系 $\operatorname{isFixedMeaning} : \operatorname{Context} \to \operatorname{Meaning} \to \operatorname{Prop}$ 与因子映射 $\operatorname{factor} : \operatorname{Meaning} \to \operatorname{Factor}$，任何携带客观诠释主张见证 $\operatorname{ObjectiveInterpretationClaim}(\operatorname{isFixedMeaning}, \operatorname{factor})$ 的系统必存在跨语境不变公因子 $\operatorname{commonFactor} : \operatorname{Factor}$，使得凡满足 $\operatorname{isFixedMeaning}\,\operatorname{context}\,\operatorname{meaning}$ 者恒有 $\operatorname{factor}(\operatorname{meaning}) = \operatorname{commonFactor}$。
:::

::: proof
第 1 组中，`unit_gram_overlap_characterization` 对单位向量展开 $\lVert\operatorname{record}_i - \operatorname{record}_j\rVert^2 = 2 - 2\operatorname{Re}\langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}}$ 并结合柯西—施瓦茨不等式证得内积等于 $1$ 与向量相等互为充要条件，进而由相等关系的自反、对称与传递性导出等价关系；`gram_realizability` 正向利用 $C^*$-代数正算子连续平方根提取自伴算子 $O$ 使 $Q = O^\dagger \circ_L O$，反向由 $\langle Q x, x\rangle_{\mathbb{C}} = \lVert O x\rVert^2 \ge 0$ 证得算子非负；`exists_unitary_mul_eq_of_conjTranspose_mul_eq` 在列空间上由格拉姆等式 $B^\dagger B = A^\dagger A$ 构造保内积线性等距，再把定义域正交补到值域正交补的等距拼合为环境空间 $\mathbb{C}^m$ 上的整体酉矩阵 $U$。第 2 组中，`two_anchor_gram_det_formula` 与 `three_anchor_gram_det_formula` 按 $2\times 2$ 与 $3\times 3$ 行列式置换定义直接展开实内积项；`two_anchor_gram_det_pos_iff` 与 `three_anchor_gram_det_pos_iff` 利用西尔维斯特主子式正定判据与格拉姆二次型在非零实线性组合上严格为正等价于向量组线性无关证得。第 3 组中，`orthogonal_complement_projection_identities` 由希尔伯特空间正交直和分解 $E = M \oplus M^\perp$ 逐条核验自伴幂等与正交消去；`finite_layer_projection_escape` 从非零正交补 $S^\perp \neq \bot$ 选取非零向量归一化得 $e \in S^\perp$（$\lVert e\rVert = 1,\; P_S e = 0$），由勾股定理 $\lVert e - s\rVert^2 = 1 + \lVert s\rVert^2 \ge 1$ 锁定极小距离 $\operatorname{infDist}(e, S) = 1$，并结合投影收缩界 $\lVert\operatorname{id} - P_S\rVert \le 1$ 钉死算子范数等于 $1$。第 4 组中，`finite_memory_history_capacity` 由半正定矩阵乘积迹单调不等式与克罗内克完美配对推出 $\operatorname{Tr}(E_j) \ge \operatorname{Tr}(E_j \rho_j) = 1$（或对谱投影比较秩与迹），对 $j \in \operatorname{Fin} N$ 求和得 $N = \sum_j \operatorname{Tr}(E_j \rho_j) \le \sum_j \operatorname{Tr}(E_j) = \operatorname{Tr}(I_d) = d$；`surviving_copy_blocks_reversal` 计算多副本信道后接部分反演信道在 $(i, j)$ 矩阵元上的乘子，因 $l \neq k$ 的模方因子全化为 $1$ 而残留副本 $k$ 留下未抵消因子 $\operatorname{recordOverlap}(\operatorname{records}_k, i, j) \neq 1$，乘以 $\rho_{ij} \neq 0$ 后必不等于 $\rho_{ij}$；`objective_claim_requires_invariant_common_factor` 直接解包 `ObjectiveInterpretationClaim` 携带的跨语境一致性存在见证给出 `commonFactor`。完整证明由 Lean 内核检查。
:::

下面我们通过一组三部曲精确基准算例，将环境希尔伯特空间中的等相关对比正交代数格拉姆窗口（精确有理数与六位小数）、三维球面 $S^2$ 上黄金角螺旋球面帽走廊的高斯—博内闭式立体角与滑动遗忘对数重开账本，以及双观察者在 $\eta = 10^\circ$ 偏角下的共识面积对比与实现块矩阵谱精确核验到底：

::: {#ex-ch34-gram-schur-cap-spiral-and-consensus-benchmark .example title="代数格拉姆窗口舒尔补、黄金角球面帽螺旋高斯—博内面积与双观察者共识精确基准算例"}
本算例分三部分给出精确有理分式与六位小数闭式数值基准（高精计算采用 $80$ 位有效十进制算术并四舍五入到所示六位小数，`手工推导` / `NUM`）：

1. **环境希尔伯特空间（$\dim\mathcal{H} \ge M+1$）中两类精确代数格拉姆窗口对比（$M = 1 \dots 6$）**：
   设候选态目标重叠向量固定为均匀半重叠 $\mathbf{c}_M = \frac{1}{2}\mathbf{1}_M$，对照以下两族满秩锚点窗口：
   - **族 A（等相关相容窗口）**：取 $G_M = (1 - r)I_M + r\mathbf{1}_M\mathbf{1}_M^\top$，$r = \frac{1}{3}$（即 $G_M = \frac{2}{3}I_M + \frac{1}{3}\mathbf{1}_M\mathbf{1}_M^\top$）。因全 $1$ 向量 $\mathbf{1}_M$ 是特征值 $\frac{M+2}{3}$ 的特征向量，其余 $M-1$ 维正交补特征值为 $\frac{2}{3}$，故精确闭式解为 $\det G_M = \bigl(\frac{2}{3}\bigr)^{M-1}\frac{M+2}{3}$、$Q_M = \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M = \frac{3M}{4(M+2)}$ 及 $\Delta_{\mathrm{Schur}}(M) = 1 - Q_M = \frac{M+8}{4(M+2)}$。当 $M \to \infty$ 时，$Q_M \nearrow \frac{3}{4} = 0.750000$ 而 $\Delta_{\mathrm{Schur}}(M) \searrow \frac{1}{4} = 0.250000 > 0$——锚点间的正向共模对齐使该族在无穷维空间中永不过约束！
   - **族 B（两两正交过约束对比窗口）**：取正交归一锚点 $G_M = I_M$（$\det G_M \equiv 1$），同样索求 $\mathbf{c}_M = \frac{1}{2}\mathbf{1}_M$。此时 $Q_M = \frac{M}{4}$、$\Delta_{\mathrm{Schur}}(M) = 1 - \frac{M}{4}$：在 $M = 4$ 处恰好触及 $\Delta_{\mathrm{Schur}}(4) = 0$ 零裕度饱和（唯一解 $\mathbf{x} = \frac{1}{2}\sum_{j=1}^4 \mathbf{v}_j$ 完全锁死在锚点张成空间内），而一跨入 $M = 5, 6$ 立即跌破零线变为 $\Delta_{\mathrm{Schur}}(5) = -\frac{1}{4} < 0$、$\Delta_{\mathrm{Schur}}(6) = -\frac{1}{2} < 0$，在任何希尔伯特空间中均绝对不可实现！

| 窗口阶数 $M$ | 等相关 $\det G_M$（精确 / 六位） | 等相关 $Q_M$（精确 / 六位） | 等相关 $\Delta_{\mathrm{Schur}}$（精确 / 六位） | 正交锚 $Q_M = \frac{M}{4}$ | 正交锚 $\Delta_{\mathrm{Schur}} = 1 - \frac{M}{4}$ | 正交锚延拓相态 |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$1$** | $1$（$1.000000$） | $\frac{1}{4}$（$0.250000$） | $\frac{3}{4}$（$0.750000$） | $\frac{1}{4}$（$0.250000$） | $\frac{3}{4}$（$0.750000$） | 正定可行（裕度充沛） |
| **$2$** | $\frac{8}{9}$（$0.888889$） | $\frac{3}{8}$（$0.375000$） | $\frac{5}{8}$（$0.625000$） | $\frac{1}{2}$（$0.500000$） | $\frac{1}{2}$（$0.500000$） | 正定可行（半预算占用） |
| **$3$** | $\frac{20}{27}$（$0.740741$） | $\frac{9}{20}$（$0.450000$） | $\frac{11}{20}$（$0.550000$） | $\frac{3}{4}$（$0.750000$） | $\frac{1}{4}$（$0.250000$） | 正定可行（黄金余量） |
| **$4$** | $\frac{16}{27}$（$0.592593$） | $\frac{1}{2}$（$0.500000$） | $\frac{1}{2}$（$0.500000$） | $1$（$1.000000$） | $0$（$0.000000$） | **零裕度精确饱和锁死** |
| **$5$** | $\frac{112}{243}$（$0.460905$） | $\frac{15}{28}$（$0.535714$） | $\frac{13}{28}$（$0.464286$） | $\frac{5}{4}$（$1.250000$） | $-\frac{1}{4}$（$-0.250000$） | **负舒尔补：过约束不可行** |
| **$6$** | $\frac{256}{729}$（$0.351166$） | $\frac{9}{16}$（$0.562500$） | $\frac{7}{16}$（$0.437500$） | $\frac{3}{2}$（$1.500000$） | $-\frac{1}{2}$（$-0.500000$） | **负舒尔补：过约束不可行** |

2. **三维球面 $S^2 \subset \mathbb{R}^3$ 上黄金角球面帽螺旋的高斯—博内闭式面积与滑动遗忘账本（$M = 1 \dots 9$）**：
   固定相干半张角 $\alpha_{\mathrm{coh}} = 60^\circ$（阈值高度 $h = \cos 60^\circ = \frac{1}{2}$），取黄金角 $\gamma = \pi(3 - \sqrt{5}) \approx 137.507764^\circ$，沿极角 $\beta_j = \bigl(12 + 6(j - 1)\bigr)^\circ$ 与方位角 $\phi_j = (j - 1)\gamma$（$j = 1,\dots,9$）生成蜿蜒外展的球面历史锚点列 $\mathbf{v}_j = (\sin\beta_j\cos\phi_j,\, \sin\beta_j\sin\phi_j,\, \cos\beta_j) \in S^2$，令 $\Omega_0 = S^2$（$\lvert\Omega_0\rvert = 4\pi \approx 12.566371\;\mathrm{sr}$）、$\Omega_M = \{\mathbf{x}\in S^2 \mid \forall j \le M,\; \mathbf{x}\cdot\mathbf{v}_j \ge \frac{1}{2}\}$。因对 $1 \le M \le 9$ 每个 $\Omega_M$ 均具非空内部且测地凸（欧拉示性数 $\chi = 1$），求取两两小圆边界可行交点与正向存活边界弧段参数张角 $\Delta t_i$ 后，应用高斯—博内定理即得零拟合精确闭式面积公式：

   $$
   \lvert\Omega_M\rvert \;=\; 2\pi - h\sum_{i}\Delta t_i - \sum_{\text{vertices}}\arccos\!\left(\frac{\mathbf{v}_i\cdot\mathbf{v}_j - h^2}{1 - h^2}\right)
   $$

   （$55$ 位与 $80$ 位十进制复算最大差仅 $3.48\times 10^{-56}\;\mathrm{sr}$，并经 $N = 10^6$ 确定性斐波那契球面求积及自适应解析极值区间包络独立校验，区间宽度 $\le 3.00\times 10^{-4}\;\mathrm{sr}$）：

| 窗口阶数 $M$ | 闭式立体角 $\lvert\Omega_M\rvert$（$\mathrm{sr}$） | 球面占比 $\frac{\lvert\Omega_M\rvert}{4\pi}$ | 单步重开比 $q_M$（$\mathrm{nats}$） | 单步重开比 $\frac{q_M}{\ln 2}$（$\mathrm{bits}$） | 存活边界顶点数 / 圆弧数 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$1$** | $3.141593$（$\pi$） | $0.250000$ | $1.386294$（$\ln 4$） | $2.000000$ | $0$ 顶点 / $1$ 整圆帽 |
| **$2$** | $2.297861$ | $0.182858$ | $0.312751$ | $0.451205$ | $2$ 顶点 / $2$ 弧透镜 |
| **$3$** | $1.802272$ | $0.143420$ | $0.242930$ | $0.350474$ | $3$ 顶点 / $3$ 弧黄金三角 |
| **$4$** | $1.412802$ | $0.112427$ | $0.243473$ | $0.351258$ | $3$ 顶点 / $3$ 弧 |
| **$5$** | $1.049640$ | $0.083528$ | $0.297128$ | $0.428664$ | $3$ 顶点 / $3$ 弧 |
| **$6$** | $0.720881$ | $0.057366$ | $0.375729$ | $0.542063$ | $3$ 顶点 / $3$ 弧 |
| **$7$** | $0.436215$ | $0.034713$ | $0.502339$ | $0.724721$ | $3$ 顶点 / $3$ 弧 |
| **$8$** | $0.208320$ | $0.016578$ | $0.739062$ | $1.066241$ | $3$ 顶点 / $3$ 弧 |
| **$9$** | $0.054604$ | $0.004345$ | $1.338960$ | $1.931710$ | $3$ 顶点 / $3$ 弧紧缝 |

   望远镜闭合检核严格成立：$\sum_{M=1}^{9} q_M = \ln(4\pi / \lvert\Omega_9\rvert) \approx 5.438666\;\mathrm{nats}$（$7.846336\;\mathrm{bits}$）；而一旦继续推至 $M = 10, 11, 12$，球面半空间交集当场严格不可行，$\lvert\Omega_{10}\rvert = \lvert\Omega_{11}\rvert = \lvert\Omega_{12}\rvert = 0$（精确空集 $\Omega_{10} = \emptyset$，触发完全过约束死锁）。反过来，把窗口从 $M = 9$ 主动遗忘滑回黄金窗 $M = 3$，可行方向立体角从 $0.054604\;\mathrm{sr}$ 骤然重开至 $1.802272\;\mathrm{sr}$（放大 **$33.0060$ 倍**），累计重开对数幅度为 $\sum_{M=4}^{9} q_M \approx 3.496690\;\mathrm{nats}$（$5.044657\;\mathrm{bits}$）！

3. **双观察者（相对视角偏转 $\eta = 10^\circ, 25^\circ, 30^\circ$）共识走廊面积与三维分块格拉姆谱对照（$M = 3$ vs. $M = 9$）**：
   设观察者 $A$ 采用上述螺旋锚点 $\mathbf{v}_j$，观察者 $B$ 采用绕 $y$ 轴右手旋转 $\eta = 10^\circ$ 的锚点 $\mathbf{w}_j = R_y(10^\circ)\mathbf{v}_j$（两边均取 $\alpha_{\mathrm{coh}} = 60^\circ$），并将全部 $2M$ 枚三维实锚点叠成 $W_M \in \mathbb{R}^{2M\times 3}$，考察分块格拉姆矩阵 $K_M = W_M W_M^\top$：

| 每人窗口 $M$ | 单人走廊占比 $\frac{\lvert\Omega_A\rvert}{4\pi}$ | 共识立体角 $\lvert\Omega_A\cap\Omega_B\rvert$（$\mathrm{sr}$） | 共识全球占比 $\frac{\lvert\Omega_{\mathrm{cons}}\rvert}{4\pi}$ | 共识保留率 $\frac{\lvert\Omega_A\cap\Omega_B\rvert}{\lvert\Omega_A\rvert}$ | 块格拉姆 $K_M$ 精确最小特征值 $\lambda_{\min}$ | 最小正特征值 $\lambda_+^{\min}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$M = 3$（黄金窗）** | $0.143420$ | $1.570105$（$5$ 边形） | $0.124945$ | **$87.1181\%$**（$0.871181$） | $0$（$6\times 6$，秩 $3$，零化度 $3$） | $0.167199$ |
| **$M = 9$（紧锁窗）** | $0.004345$ | $0.010419$（$3$ 边形） | $0.000829$ | **$19.0813\%$**（$0.190813$） | $0$（$18\times 18$，秩 $3$，零化度 $15$） | $2.744723$ |

   对比一目了然：在各自已实现的三维锚点上，$K_3$（正特征值 $0.167199, 0.456613, 5.376189$）与 $K_9$（正特征值 $2.744723, 3.881656, 11.373621$）均保持精确秩 $3$ 与 $\lambda_{\min} = 0$；然而在球面可行域上，$\eta = 10^\circ$ 下 $M = 9$ 的过长私密历史把双方共识保留率从 $M = 3$ 时的 **$87.1181\%$** 砍到仅剩 **$19.0813\%$**（绝对共识立体角萎缩 **$150.6932$ 倍**）！更进一步，当视角偏转增大到 $\eta = 25^\circ$ 与 $\eta = 30^\circ$ 时，$M = 8$ 尚存微弱交集（分别为 $0.043804\;\mathrm{sr}$ 与 $0.022659\;\mathrm{sr}$），一到 **$M = 9$ 双人共识窗即彻底断绝为精确空集 $\lvert\Omega_A(9)\cap\Omega_B(9)\rvert = 0$**（同时若以等边界重叠 $\mathbf{c}_{2M} = \frac{1}{2}\mathbf{1}_{2M}$ 构造 $(2M+1)\times(2M+1)$ 加边检验矩阵 $K_M(\frac{1}{2})$，在 $M = 9$ 处最小特征值深陷负区：$\eta = 25^\circ$ 时为 $-0.257294$，$\eta = 30^\circ$ 时为 $-0.281581$）；而只要双方同步遗忘最陈旧的 $6$ 枚锚点滑回黄金窗 $M = 3$，即使在 $\eta = 25^\circ$ 与 $\eta = 30^\circ$ 的显著偏角下，联合接受窗亦当场重开出 **$1.225398\;\mathrm{sr}$** 与 **$1.112297\;\mathrm{sr}$** 的宽广共享现实！
:::

::: {#rem-ch34-schur-schoenberg-grone-landauer-forgetting-literature .remark title="格拉姆行列式、舒尔补、勋伯格欧氏嵌入、弦图矩阵补全与兰道尔遗忘热力学的文献脉络及认识论边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节建立有限格拉姆窗口、球面可行走廊、滑动遗忘重开与分块共识矩阵补全框架时，严格区分以下三道认识论边界：

1. **格拉姆矩阵、舒尔补、度量嵌入、半正定补全与信息热力学的经典文献**：内积行列式判别线性无关的理论源自 J. P. Gram（*J. Reine Angew. Math.* **94**, 41–73, 1883）；分块矩阵行列式因式分解与正定性约化源自 I. Schur（*J. Reine Angew. Math.* **147**, 205–232, 1917），奇异半正定块情形下的摩尔—彭罗斯伪逆舒尔补判据由 A. Albert（*SIAM J. Appl. Math.* **17**, 434–438, 1969）给出；点列距离矩阵等距嵌入欧氏球面与希尔伯特空间的半正定判据由 I. J. Schoenberg（*Ann. of Math.* **36**, 724–732, 1935；*Trans. Amer. Math. Soc.* **44**, 522–536, 1938）奠定；部分厄米矩阵存在半正定补全的弦图（chordal graph）充要条件由 R. Grone, C. R. Johnson, E. M. Sá & H. Wolkowicz（*Linear Algebra Appl.* **58**, 109–124, 1984）证明，对角全 $1$ 半正定矩阵簇（谱面体 elliptope）与低秩欧氏实现几何由 M. Laurent & S. Poljak（*Linear Algebra Appl.* **223/224**, 439–461, 1995）系统刻画；逻辑不可逆记忆擦除与重置的热耗散下界源自 R. Landauer（*IBM J. Res. Dev.* **5**, 183–191, 1961）及 C. H. Bennett（*Int. J. Theor. Phys.* **21**, 905–940, 1982），而多观察者通过环境碎片提取一致经典客观记录的量子达尔文主义框架见 W. H. Zurek（*Nat. Phys.* **5**, 181–188, 2009）。
2. **内核已验证 `LEAN ✓` 定理、精确解析/数值检核（`手工推导` / `NUM`）与窗口共识诠释（`MODEL`）的严格界限**：[@thm-ch34-gram-window-schur-and-consensus] 所列十二条冻结声明及正文内联引用的 [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone)、[`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance) 均已在 Lean 4 内核中零缺口验证（`LEAN ✓`）；一般阶加边矩阵舒尔补展开、等相关与正交锚点窗口有理分式闭式解、球面帽交集的高斯—博内精确求积公式以及双观察者块格拉姆本征谱计算属于可直接逐行复核的解析推导与高精度算术检核（`手工推导` / `NUM`），且正文已明确指出将几何对数重开比 $q_M$ 折算为物理热量下界必须额外假定均匀可达体积先验与等温擦除重置协议。在此之上，将宇宙比较关系建模为无穷格拉姆账本 $G_\infty$ 上的滑动窗口 $\mathcal{W}_M$、将生命遗忘与睡眠修剪诠释为防过约束死锁的重开机制、并将人际宽容与主体间共识诠释为联合接受窗双向重开，属于本书提出的统一几何认知与自然哲学模型（`MODEL`）。
3. **固定维低秩半正定补全复杂性与多主体非平衡记忆热力学开放前沿（`OPEN`）**：在一般非弦图稀疏通信拓扑上判定部分格拉姆矩阵是否存在满足固定空间维数约束 $\operatorname{rank}(\widetilde{G}) \le 3$ 的精确欧氏补全（低秩欧氏距离矩阵补全属于强难非凸代数几何与复杂性问题），以及在远离热平衡、具有强非马尔可夫反馈的多生物神经/量子观察者网络中建立超越均匀等温假设的精确滑动遗忘自由能涨落定理，仍属当代优化理论与非平衡量子热力学的开放研究前沿（`OPEN`）。
:::

把镜头从 $M \times M$ 的滑动格拉姆窗口再往深处推近最后一级——直接聚焦到格拉姆账本里**最微小的单个比较矩阵元** $\langle\mathbf{I}, \mathbf{V}\rangle = \cos\theta$ 上，整座第三十四章压轴的终极几何谜题已呼之欲出：当观察者自身站在单位基轴 $\mathbf{I}$ 上丈量外部态矢 $\mathbf{V}$ 时，为什么一切与自身严格呈 $90^\circ$ 正交的横向平面（$\cos 90^\circ = 0$）都会对观察者彻底隐身？既然单程投影读数混杂着不可见的横向正交盲区相位，受限观察者为什么**必须**执行“从 $\mathbf{I}$ 投向 $\mathbf{V}$、再从 $\mathbf{V}$ 折返回 $\mathbf{I}$”的**双向往返投影**，从而内生锻造出玻恩平方律 $P = \cos^2\theta$？在平方闭合之后，究竟还有哪一份正交螺旋手性依然逃逸在投影之外？更摄人心魄的是——为什么人类数学史偏偏把那个满足 $i^2 = -1$、恰好直立在实轴 `1` / 主体 `I` 的 $90^\circ$ 法向盲区里的旋转生成元，一语成谶地命名为 **`imaginary`（虚数 / 不可见的想象之轴）**？先在下方 `GRAM//CONSENSUS` 完整交互沙盘中亲手把窗口尺度 $M$ 从 $1$ 推向 $9$ 再拉回黄金窗 $3$，体味遗忘重开自由天空与双人共识重联的呼吸节律，随后步入 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)：

::: {.viz src="gram-window-consensus-sandbox" height="640"}
**格拉姆窗口 $\mathcal{W}_M$、舒尔补可行走廊与双观察者共识完整交互实验室（`GRAM//CONSENSUS`）。** 在统一三栏实验台中自由切换“舒尔补与双帽透镜走廊—三维黄金三角窗 $M=3$—过约束紧窗死锁 $M=9$—遗忘最旧记录重开—双观察者共识与共同遗忘”五张实验卡，连续调节窗口长度 $M \in \{1,\dots,10\}$、相干半角 $\alpha_{\mathrm{coh}}$ 与观察者 $B$ 转角 $\eta$ 并拖动球面上琥珀色候选态 $\mathbf{x}$，同屏检视青色单人相干走廊 $\Omega_M$ 与等相关舒尔补曲线、品红收紧边界弧与遗忘重开对数比 $q_M$、紫色双观察者共识走廊 $\Omega_A \cap \Omega_B$ 以及右侧交互格拉姆热图；十三枚绿色 `LEAN ✓` 徽章对应 [@thm-ch34-gram-window-schur-and-consensus] 的十二条冻结声明与 [§34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics) 定理已引用的 `landauer_bound_of_balance`。
:::
