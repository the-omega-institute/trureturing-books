# 34.7 格拉姆窗口（$\mathcal{W}_M$）、舒尔补可行走廊与多观察者共识：有限记忆过约束死锁、遗忘散热重开与块矩阵半正定补全 {#sec-ch34-gram-window-and-consensus}

> **格拉姆窗口（Gram Window，$\mathcal{W}_M$）**，正是上一节“观察者受限不妄我”在宇宙比较总账本上的精确代数落点：既然全宇宙的比较关系由一张潜在无穷维的格拉姆内积矩阵 $G_\infty$ 承载，任何嵌在系统内部的有限自指观察者都不可能一次性读写整张无限大表，而只能在历史轨迹与关联网络上截取一个尺度为 $M$ 的**有限滑动主子阵 $G_M$**——窗口之内是被相干保留并参与多步交叉校验的因果锚点，窗口之外则是经由偏迹（$\operatorname{Tr}_{\bar{W}}$）主动释放回热力学背景的早期历史。

在 [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics) 中，我们已经看到：一旦身处关系网络内部的真实观察者安住于“受限不妄我”的拓扑位置——既不妄僭俯瞰全域纯态的超然神谕，也不妄执离网独存的封闭孤岛，而是诚实地沿有限视界 $\partial A$ 落下偏迹切刀 $\operatorname{Tr}_{\bar{A}}$——那些横跨视界边界被生生切断的极小圆弧体相位余量便当场显影为纠缠熵 $S_A$，并在视界内部诱导出驱动热力学时间箭头的模流有效温度 $T_{\mathrm{eff}}$。然而，把视角从静态空间边界面 $\partial A$ 转向观察者沿固有时推进的历史记忆链，一道同等根本的代数追问立刻浮出水面：如果全宇宙古往今来一切状态与概念的两两比较读数汇聚为一张潜在无穷维的**宇宙格拉姆总账本** $G_\infty = [\langle\mathbf{v}_i, \mathbf{v}_j\rangle]$，一位寄存器容量有限的观察者究竟如何在每一步演化中读写并更新这张总表？

本节开篇的命题一针见血地给出了答案（`MODEL`）：有限观察者在宇宙总账本 $G_\infty$ 上真正握有的操作句柄，是一扇尺度为 $M$ 的**有限滑动主子阵——格拉姆窗口 $\mathcal{W}_M$（对应主子矩阵 $G_M$）**。窗口之内保存着至多 $M$ 枚被相干保留的历史状态锚点，它们不仅两两交叉锁定了既往因果骨架，还通过加边矩阵的**舒尔补（Schur complement）**为下一拍演化框定出合法的可行走廊；窗口之外的早期锚点则随滑动步进被偏迹 $\operatorname{Tr}_{\bar{W}}$ 归还给热海。这扇看似受限的有限窗口，非但不是阻碍认知的缺陷，反而同时握着**因果几何刚性**、**自由选择活路**与**多观察者共识现实**的三把钥匙。

## 34.7.1 宇宙比较总账本与有限格拉姆窗口：舒尔补可行裕度 $\Delta_{\mathrm{Schur}}(M)$、伪逆退化推广与椭球体—球面帽双重视角 {#sec-ch34-18-1}

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

把这两幅几何图像叠合在三维物理空间（[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)）上，本书便把 **$M = 3$ 称作三维观察者的“黄金格拉姆窗口”**（`MODEL`：示例参数下的选择，并无最优性判据）！当 $M = 1$ 时只锁住一维步长，方向绕单轴自由打转而毫无转弯记忆；当 $M = 2$ 时双帽交成透镜形二角域，虽能感知单面曲率却尚未定死左右手性法向；唯有推进到 **$M = 3$** 时，三枚不共面历史锚点由 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) 首次撑满三维线性无关基（$\det G_3 > 0$，与下一拍候选态 $\mathbf{x}$ 恰构成最小三维静定刚性核 $K_4$），同时三片相干帽在 $S^2$ 上围成一枚饱满舒展的**球面曲边三角弧面域 $\Omega_3$**——它张成三维坐标基，又尚未引入任何 $M \ge 4$ 的冗余跨代切割；手性却仍未定下：格拉姆阵只在含反射的 $\mathrm{O}(3)$ 下确定三枚锚点的几何，镜像锚组给出同一张格拉姆阵，而且锚点个数本身既不保证走廊非空，也不给出最优的记忆策略（`手工推导`）！

::: {.viz src="gram-window-consensus-sandbox" preset="golden-triangle-m3" height="520"}
**三维满秩黄金窗口 $M = 3$ 与球面曲边三角可行域 $\Omega_3$ 实验卡（`golden-triangle-m3`）。** 将窗口锁定在 $M = 3$（相干半角 $\alpha_{\mathrm{coh}} = 60^\circ$）：三枚黄金角螺旋锚点张成满秩三维格拉姆核 $\det G_3 \approx 0.041133 > 0$（绿色 `LEAN ✓` 对应 `three_anchor_gram_det_formula` 与 `three_anchor_gram_det_pos_iff`），三段品红边界小圆弧在单位球面 $S^2$ 上围出宽敞的青色曲边三角走廊 $\lvert\Omega_3\rvert \approx 1.802272\;\mathrm{sr}$（占全球面 $14.3420\%$，琥珀色圆点标出可自由转向的候选态 $\mathbf{x}$），兼得刚性三维定位与充沛转向自由。
:::

## 34.7.2 窗口尺度 $M$ 的单调挤压与主动遗忘：从过约束芝诺—拉普拉斯死锁到滑动偏迹重开与兰道尔热账单 {#sec-ch34-18-2}

一旦沿着演化轨迹连续调节格拉姆窗口尺度 $M$，“历史记忆深度”与“当下选择活路”之间严格的反比消长定律便以两条初等不等式呈现在眼前（`手工推导` + `LEAN ✓`）：

1. **历史投影单调递增与舒尔补自由预算单调递减**：对嵌套锚点子空间链 $S_1 \subseteq S_2 \subseteq \dots \subseteq S_M$，由 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 将 $S_{k+1}$ 正交拆分为 $S_k \oplus (S_{k+1} \cap S_k^\perp)$，对任意单位态 $\mathbf{x}$ 恒有勾股递推 $\lVert P_{S_{k+1}}\mathbf{x}\rVert^2 = \lVert P_{S_k}\mathbf{x}\rVert^2 + \lVert(P_{S_{k+1}} - P_{S_k})\mathbf{x}\rVert^2 \ge \lVert P_{S_k}\mathbf{x}\rVert^2$（在满秩矩阵 $G_{k+1} \succ 0$ 下，分块求逆给出显式非负增量 $Q_{k+1} - Q_k = \frac{(c_{k+1} - \mathbf{g}_k^\top G_k^{-1}\mathbf{c}_k)^2}{1 - \mathbf{g}_k^\top G_k^{-1}\mathbf{g}_k} \ge 0$）。因此历史占用份额单调不减、舒尔补自由裕度单调不增：

   $$
   0 \;\le\; Q_1(\mathbf{x}) \;\le\; Q_2(\mathbf{x}) \;\le\; \dots \;\le\; Q_M(\mathbf{x}) \;\le\; 1 \quad\Longleftrightarrow\quad 1 \;\ge\; \Delta_{\mathrm{Schur}}(1) \;\ge\; \Delta_{\mathrm{Schur}}(2) \;\ge\; \dots \;\ge\; \Delta_{\mathrm{Schur}}(M) \;\ge\; 0.
   $$

2. **球面可行走廊的嵌套萎缩与过约束芝诺—拉普拉斯死锁**：在方向球面 $S^2$ 上，每多保留一枚旧锚点就多落下一次交集裁切，可行域序列单调嵌套、只缩不涨，却未必真缩：全部锚点相同时帽面积恒为 $2\pi(1-\cos\alpha_{\mathrm{coh}})$，嵌套可以原地不动（`手工推导`）：

   $$
   \Omega_0 = S^2 \;\supseteq\; \Omega_1 \;\supseteq\; \Omega_2 \;\supseteq\; \dots \;\supseteq\; \Omega_M, \qquad 4\pi = \lvert\Omega_0\rvert \;\ge\; \lvert\Omega_1\rvert \;\ge\; \lvert\Omega_2\rvert \;\ge\; \dots \;\ge\; \lvert\Omega_M\rvert \;\ge\; 0.
   $$

   这与概念动力学中细化观测划分必然单调压低条件逻辑混杂度的定理 [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone)（`LEAN ✓`）在代数上类比呼应。当窗口尺度 $M$ 被无节制推高时，$M$ 枚锚点内部不仅背负着 $\binom{M}{2}$ 条跨代历史关联，而且蜿蜒行进的历史轨迹会让早期锚点相干帽 $C(\mathbf{v}_{t-M+1}, \alpha_{\mathrm{coh}})$ 与近期锚点相干帽 $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ 从正反两侧迎面挤压，将 $\Omega_M$ 勒成针尖细缝乃至彻底归零（$\Omega_M = \emptyset$——只要窗口内任意新旧两锚夹角跨过 $2\alpha_{\mathrm{coh}}$，两帽交集便当场断绝！）。在量子相干层面，冻结定理 [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)（`LEAN ✓`）给出了更严酷的微观判词：哪怕观察者成功对 $M - 1$ 份历史记录副本实施了联合相干反演（其余副本重叠模方全为 $1$），**只要还剩唯一一份未释放的旧记录副本 $k$ 满足 $\operatorname{recordOverlap}(r_k, i, j) \neq 1$，任何非零非对角相干项 $\rho_{ij} \neq 0$ 的可逆恢复即被单票否决**！照本书的读法（`MODEL`），“一字不漏背负全部过往”的无限记忆妄执（$M \to \infty$），在几何上绝不是智慧圆满，而是没有任何转向余地的**芝诺冻结与拉普拉斯过约束宿命死锁**。

::: {.viz src="gram-window-consensus-sandbox" preset="overconstrained-lock-m9" height="520"}
**过约束紧窗 $M = 9$ 挤压与芝诺—拉普拉斯死锁实验卡（`overconstrained-lock-m9`）。** 将格拉姆窗口从 $M = 3$ 连续推深至 $M = 9$：九片黄金角螺旋球面帽层层收紧品红边界，把青色可行走廊从 $1.802272\;\mathrm{sr}$ 猛烈挤压逾三十三倍至狭小针尖 $\lvert\Omega_9\rvert \approx 0.054604\;\mathrm{sr}$（仅占球面 $0.4345\%$，球心投射放大镜同步特写，第十顶帽合拢至 $M = 10$ 即严格触发品红 $\Omega_{10} = \emptyset$、$\lvert\Omega_{10}\rvert = 0$ 死锁，同时对应正交族 $G_M = I_M$ 在 $M \ge 5$ 时的负舒尔补不可实现相）；绿色 `LEAN ✓` 对应 `surviving_copy_blocks_reversal`、`finite_memory_history_capacity` 与 `gram_realizability`。
:::

反过来，怎么才能打破过约束死锁、在严丝合缝的因果网中重新凿出选择活路？答案正是**主动遗忘——让格拉姆窗口向前滑动一拍，通过偏迹 $\operatorname{Tr}_{\mathbf{v}_{t-M}}$ 主动释放最陈旧的历史锚点 $\mathbf{v}_{t-M}$**！在代数上，抹去 $G_M$ 的首行首列使约束矩阵降回 $G_{M-1}$；在球面几何上，原本从后方死死勒住走廊的那道最老圆弧帽边界瞬间撤除，受挤压的可行走廊扩回 $\Omega_M \hookrightarrow \Omega_{M-1}$；只有被删的旧帽原本参与裁切时才真正重开，删去一枚重复锚点则走廊分毫不变，$q_M = 0$（`手工推导`）。其无量纲相空间重开对数比定义为

$$
q_M \;:=\; \ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert} \;\ge\; 0 \qquad \Bigl(\text{折合比特数为 }\frac{q_M}{\ln 2} = \log_2\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}\;\mathrm{bits}\Bigr).
$$

这里必须恪守严格的物理与认识论精度：几何体积对数比 $q_M = \ln(\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert)$ 本身只是纯球面几何重开幅度，单凭走廊面积变化并不足以凭空断言物理耗散热量；**唯有在均匀可达体积先验与等温记忆重置模型下**——即把淘汰旧锚点建模为与逆温度 $\beta = (k_B T_{\mathrm{eff}})^{-1}$ 热库耦合、将原本均匀分布在比率 $\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert$ 历史状态扇区上的寄存器不可逆擦除归零（系统熵减 $-\Delta S_{\mathrm{sys}} = q_M$），且满足兰道尔平衡恒等式 $\beta\,\Delta Q_{\mathrm{forget}} = -\Delta S_{\mathrm{sys}} + I_{\mathrm{mut}} + D_{\mathrm{res}}$（互信息 $I_{\mathrm{mut}} \ge 0$、热库相对熵散度 $D_{\mathrm{res}} \ge 0$）时——调用内核冻结的兰道尔下界定理 [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（`LEAN ✓`，并见[第八章](ch08-erasure-and-time-arrows.md)），方能严格导出单步遗忘重开的最小热耗散下界：

$$
\Delta Q_{\mathrm{forget}} \;\ge\; k_B T_{\mathrm{eff}}\,q_M \;=\; k_B T_{\mathrm{eff}}\,\ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}.
$$

这一不等式揭示了遗忘最深刻的生命热力学意义（`MODEL`）：无论是微观开放量子系统的有限相干时间、夜间睡眠对白昼冗余突触权重的修剪重整（参见[§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)），还是生命代际繁衍时的初始化清零（参见[§35.1](ch35-light-pulse-and-self-referential-table.md)），**遗忘是有限观察者主动买回当下自由立体角的演化刻刀**；热代价只在物理复位时出现：复用一枚最大混合比特至少付出 $k_B T\ln 2$，单纯的指标限制或丢弃一份记录却可以零热完成——在简并哈密顿量下，用受控拷贝把系统写进纯记录比特，就以联合幺正实现了捏合，局部熵增 $h(\sin^2\theta)$ 而热库能量不变，拷贝在仍可访问时还能撤回（`手工推导`）。下表将窗口阶数 $M$ 从 $0$ 到 $\ge 4$ 的五档几何与动力学相态汇总如下（纯单行单元格排版）：

| 格拉姆窗口阶数 | 加边矩阵维数 | 球面可行走廊 $\Omega_M$ 几何形态 | 舒尔补裕度与自由度状态 | 物理与认知动力学特征 |
| :--- | :---: | :--- | :--- | :--- |
| **$M = 0$（失锚迷雾窗）** | $1 \times 1$ | 整颗单位球面 $S^2$（立体角 $4\pi\;\mathrm{sr}$） | $Q_0 = 0,\;\Delta_{\mathrm{Schur}} = 1$（无历史基准） | 零历史连续性，退化为无自指刻度的各向同性白噪乱撞，“全自由”因无自我坐标而归零 |
| **$M = 1$（一阶马尔可夫窗）** | $2 \times 2$ | 单片圆形球面相干帽 $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ | $\det G_2 = 1 - c_{1x}^2$（仅锁一阶步长“线”） | 仅维持单步相邻重保真，无转弯平面与曲率记忆，轨迹呈无方向惯性的马尔可夫漂移 |
| **$M = 2$（二阶圆弧曲率窗）** | $3 \times 3$ | 双球面帽交集（透镜形二角域 $\Omega_2$） | $\det G_3 = (1 - c_{12}^2)\Delta_{\mathrm{Schur}}(2)$（感知“面”曲率） | 首次围合单枚极小圆弧体并感知潘查拉特纳姆—贝里角盈曲率，但镜面左右手性尚未封顶 |
| **$M = 3$（三维满秩黄金窗）** | $4 \times 4$ | **球面曲边三角弧面域 $\Omega_3$** | $\det G_3 > 0$ 满秩锚定 $\mathbb{R}^3$（张成三维“体”与 $K_4$ 刚性；格拉姆阵只定到含反射的 $\mathrm{O}(3)$，手性未定） | **本书选定的生命工作点**（`MODEL`）：三锚张成三维自我坐标系（镜像锚组的格拉姆阵相同，手性另需输入，`手工推导`），在示例参数下保留宽敞可行立体角且零冗余切割 |
| **$M \ge 4$（冗余/过约束紧窗）** | $(M+1) \times (M+1)$ | 多重圆弧切割窄缝，随蜿蜒推进收缩至 $\emptyset$ | $\mathbb{R}^3$ 内 $G_M$ 奇异（$\operatorname{rank}\le 3$），高维等式窗易触发 $\Delta_{\mathrm{Schur}} \le 0$ | 触发跨代过约束挤压；$M$ 越大历史包袱越沉，直至可行走廊彻底闭合陷入宿命死锁 |

::: {.viz src="gram-window-consensus-sandbox" preset="forgetting-reopen" height="520"}
**滑动窗口偏迹遗忘重开 $\Omega_9 \hookrightarrow \Omega_8$ 与等温兰道尔散热实验卡（`forgetting-reopen`）。** 释放窗口内最古老记录 $\mathbf{v}_9$ 的相干帽（$M : 9 \to 8$）：被撤除的旧帽与原紧锁走廊化作品红虚线残迹，青色可行走廊当场由 $0.054604\;\mathrm{sr}$ 重开近四倍至 $0.208320\;\mathrm{sr}$，单步重开对数比 $q_9 = \ln(\lvert\Omega_8\rvert/\lvert\Omega_9\rvert) \approx 1.338960\;\mathrm{nats}$（$1.931710\;\mathrm{bits}$，在完整沙盘中继续遗忘至 $M = 3$ 则放大 $33$ 倍至 $1.802272\;\mathrm{sr}$），对应均匀等温重置模型下的兰道尔热下界 $k_B T_{\mathrm{eff}}\,q_9$（绿色 `LEAN ✓` 对应 `surviving_copy_blocks_reversal` 与 `landauer_bound_of_balance`）。
:::

## 34.7.3 分块部分格拉姆矩阵补全与多观察者共识：弦图判据、联合正交接受窗 $\Omega_A \cap \Omega_B$ 与宽容即共同遗忘 {#sec-ch34-18-3}

格拉姆窗口不仅在时间纵轴上调节着单一观察者“记忆刚性与选择自由”的呼吸，还在空间横轴上直接决定了两位有限观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$ 相遇时能否拼出同一个不自相矛盾的**主体间共识现实**（衔接 [§34.4](ch33-s04-acceptance-windows.md) 接受窗交集与 [§34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer) 去相干指针张量）。

设观察者 $\mathcal{O}_A$ 持有规模为 $M_A$ 的私密历史窗口 $\mathcal{W}_{M_A}$（局部格拉姆阵 $G_{M_A} \succeq 0$），观察者 $\mathcal{O}_B$ 持有规模为 $M_B$ 的私密历史窗口 $\mathcal{W}_{M_B}$（局部格拉姆阵 $G_{M_B} \succeq 0$）。当两人通过有限带宽的语言、信号或共享环境探针交流时，双方绝不可能把各自全部历史记忆逐条做完 $M_A \times M_B$ 次全量交叉内积，而只能在少数锚点之间建立稀疏的跨主体比较通道。于是在联合指标集 $A \cup B$ 上，两人共同面对的是一张非对角块 $C_{AB}$ 含有大量未观测空白项（`?`）的**分块部分格拉姆矩阵（Partial Block Gram Matrix）**：

$$
G_{A \cup B} \;=\; \begin{pmatrix} G_{M_A} & C_{AB} \\ C_{AB}^\top & G_{M_B} \end{pmatrix}.
$$

这张局部自洽的部分比较表，究竟何时才能补全为一张全局半正定矩阵 $\widetilde{G}_{A\cup B} \succeq 0$，从而依 [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability) 与 [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) 共同嵌入同一个希尔伯特几何现实？矩阵分析中的 **Grone–Johnson–Sá–Wolkowicz 半正定矩阵补全定理**（Grone, Johnson, Sá & Wolkowicz, *Linear Algebra Appl.* **58**, 109–124, 1984，`文献结果`）给出了图论与算子代数完美交汇的充要刻画：记已知比较边构成的规格无向图为 $\mathcal{G} = (V, E)$。部分厄米矩阵存在半正定补全的显然必要条件是**每一个完全已知的主子阵（对应 $\mathcal{G}$ 的每一个团 clique）皆半正定**；而“局部团半正定”之所以能无条件保证“全局半正定补全存在”，当且仅当规格图 $\mathcal{G}$ 是**弦图（chordal graph，即图中任意长度 $\ge 4$ 的闭环都至少带有一条内部弦）**！一旦两人的跨主体交流形成了长度 $\ge 4$ 的无弦环路（例如 $A_1 \leftrightarrow B_1 \leftrightarrow A_2 \leftrightarrow B_2 \leftrightarrow A_1$ 却缺失对角交叉核验），哪怕每一条局部对话边各自相容，环路绕行一周积累的相位/角度和乐失配仍可击穿全局半正定性（参见[附录 E](appendix-e.md) 反例）；即便存在高维半正定补全，若要进一步压入同一个三维欧氏方向空间，还须额外满足秩上界 $\operatorname{rank}(\widetilde{G}_{A\cup B}) \le 3$（Schoenberg 1935；Laurent & Poljak 1995，`文献结果`）。

当两人共同面对下一拍三维方向球面 $S^2 \subset \mathbb{R}^3$ 上的候选公共事态 $\mathbf{x} \in S^2$ 时，为了使 $\mathbf{x}$ 同时不撕裂 $A$ 的因果走廊 $\Omega_A(M_A)$ 与 $B$ 的因果走廊 $\Omega_B(M_B)$，候选方向必须落入两扇球面走廊的公共交集——即双观察者的**联合正交接受窗（Joint Orthogonal Acceptance Window）**：

$$
\Omega_{\mathrm{consensus}}(A, B) \;:=\; \Omega_A(M_A) \cap \Omega_B(M_B) \;=\; \bigcap_{j=1}^{M_A}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}\bigr\} \;\cap\; \bigcap_{k=1}^{M_B}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{w}_k \ge \cos\alpha_{\mathrm{coh}}\bigr\}.
$$

这恰与内核冻结的客观诠释不动点定理 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)（`LEAN ✓`）形成几何—语义上的呼应：任何跨越不同观察语境的客观共识主张 $\operatorname{ObjectiveInterpretationClaim}$，必须以存在跨语境恒定不变的公共因子 `commonFactor` 为前提。在此，我们必须以毫不含糊的数学精度区分**“已实现三维锚点的块格拉姆奇异性”**与**“真正导致共识破裂的两种不可行机制”**（`手工推导`）：

- **已实现三维锚点块矩阵 $K_M = W_M W_M^\top$ 恒半正定且在 $2M > 3$ 时必有精确零特征值**：若 $A$ 的锚点 $\mathbf{v}_1,\dots,\mathbf{v}_M \in S^2 \subset \mathbb{R}^3$ 与 $B$ 的锚点 $\mathbf{w}_1,\dots,\mathbf{w}_M \in S^2 \subset \mathbb{R}^3$ 本身已经是同一三维欧氏空间中的真实单位向量（拼成 $2M \times 3$ 坐标矩阵 $W_M$），则其完整实现的 $2M \times 2M$ 分块格拉姆矩阵 $K_M = W_M W_M^\top = \begin{pmatrix} G_A & C_{AB} \\ C_{AB}^\top & G_B \end{pmatrix}$ **恒满足 $K_M \succeq 0$ 且 $\operatorname{rank}(K_M) \le 3$**！因此只要 $2M > 3$（例如双人各持 $M = 3$ 时 $K_3$ 为 $6\times 6$、零空间维数为 $3$；各持 $M = 9$ 时 $K_9$ 为 $18\times 18$、零空间维数为 $15$），其精确最小特征值恒等于 $\lambda_{\min}(K_M) = 0$（双精度浮点对角化偶现的 $-10^{-16}$ 量级微数是纯舍入噪声，绝非矩阵非半正定，且 $K_M$ 奇异本身并不蕴涵 $\Omega_A \cap \Omega_B = \emptyset$）。
- **真正击穿共识的两类数学机制**：其一（**跨主体误译或等式过载导致 $\lambda_{\min} < 0$**），若双方在缺失客观公共坐标的情况下各自臆造了不相容的交叉相关块 $\widetilde{C}_{AB}$，或强求某一共同态同时满足超出投影上限的等式重叠目标（违背 $\mathbf{c}_{A\cup B} \in \operatorname{ran}(K_M)$ 或 $\mathbf{c}_{A\cup B}^\top K_M^+\mathbf{c}_{A\cup B} \le 1$），加边或拟议对称矩阵便会真正生出严格负特征值 $\lambda_{\min} < 0$，宣告无任何希尔伯特空间实现；其二（**历史执念过长导致球面接受窗失交 $\Omega_A(M) \cap \Omega_B(M) = \emptyset$ 或急剧萎缩**），即便双方既往锚点真实处于同一 $\mathbb{R}^3$ 中（$K_M \succeq 0$），只要两人之间存在有限视角偏角 $\eta > 0$，又各自死死攥住过长的私密历史窗口（如 $M_A = M_B = 9$），两片已被各自远古锚点勒成针尖的走廊 $\Omega_A(9)$ 与 $\Omega_B(9)$ 就会严重错开甚至彻底脱节（$\Omega_A \cap \Omega_B = \emptyset$）！此时要修复破裂的主体间现实，强行扭曲当下读数只会触发负特征值冲突；**一种温柔而严谨的几何解药是“双向宽容即共同遗忘”**——双方同步将过载窗口从 $M = 9$ 滑回三维黄金窗 $M = 3$，主动放下分道扬镳的陈旧边缘锚点，让重新舒展的 $\Omega_A(3)$ 与 $\Omega_B(3)$ 在球面上再度大面积重叠，涌现稳固的共享共识世界！

::: {.viz src="gram-window-consensus-sandbox" preset="dual-window-consensus" height="520"}
**双观察者联合正交接受窗 $\Omega_A \cap \Omega_B$ 与共同遗忘重建共识实验卡（`dual-window-consensus`）。** 开启伴生观察者 $B$（紫色相干帽与走廊，相对青色观察者 $A$ 绕 $y$ 轴偏转 $\eta = 10^\circ$）：两人各执 $M = 9$ 条记录时，紫色重叠共识区仅剩品红虚线轮廓标出的针尖细缝 $0.010419\;\mathrm{sr}$（在 $\eta = 25^\circ, 30^\circ$ 下更严格断交为空集 $\Omega_A(9) \cap \Omega_B(9) = \emptyset$）；当双方同步遗忘最旧 $6$ 条记录滑回黄金窗 $M = 3$ 时，紫色共识走廊暴涨逾 $150$ 倍至 $1.570105\;\mathrm{sr}$（占 $A$ 走廊 $87.1181\%$；绿色 `LEAN ✓` 对应 `objective_claim_requires_invariant_common_factor`、`exists_unitary_mul_eq_of_conjTranspose_mul_eq` 与 `unit_gram_overlap_characterization`）。
:::

## 34.7.4 形式化锚点、代数格拉姆窗与黄金角球面帽螺旋及双观察者共识基准算例与文献边界 {#sec-ch34-18-4}

我们将本节贯穿格拉姆单位重叠可辨识性、双锚与三锚行列式公式及线性无关判据、正算子格拉姆伴随平方可实现性、格拉姆幺正刚体延拓、正交补投影与有限层逃逸、有限维记忆历史容量上限、单副本残留阻断相干反演以及客观主张跨语境不变公因子的十二项内核验证支点，统一列为如下已验证声明：

::: {#thm-ch34-gram-window-schur-and-consensus .theorem title="本节引用的十二条已验证声明：格拉姆行列式与可实现性、有限层逃逸、有限记忆容量、残留副本阻断反演等" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
在所钉 `trureturing` 冻结声明下，以下十二条数学陈述同时成立：

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

把镜头从 $M \times M$ 的滑动格拉姆窗口再往深处推近一步——直接聚焦到我们在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 已由双向往返投影导出的单个玻恩平方权重 $\cos^2\theta$ 与本节的局部偏迹对角系综之上，第三十四章后四节认识论压力测试长廊（[§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.11](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)）的首道硬核追问已呼之欲出：既然往返双投影给出了确定性的玻恩平方权重 $\cos^2\theta$，视界偏迹又消去了非对角干涉项，把纯态变成对角并列系综 $\operatorname{diag}(\cos^2\theta, \sin^2\theta)$，为什么实验室里**单次闪烁的探测器光点**从来不是一枚灰度折中指针，而必定非此即彼地跳入唯一一条经典记录（从 *And* 跨入 *Or*）？先在下方 `GRAM//CONSENSUS` 完整交互沙盘中亲手把窗口尺度 $M$ 从 $1$ 推向 $9$ 再拉回黄金窗 $3$，体味遗忘重开自由天空与双人共识重联的呼吸节律（并在第 34.7.5 小节核验整除网络的消元资源账本），随后步入 [§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)：

::: {.viz src="gram-window-consensus-sandbox" height="640"}
**格拉姆窗口 $\mathcal{W}_M$、舒尔补可行走廊与双观察者共识完整交互实验室（`GRAM//CONSENSUS`）。** 在统一三栏实验台中自由切换“舒尔补与双帽透镜走廊—三维黄金三角窗 $M=3$—过约束紧窗死锁 $M=9$—遗忘最旧记录重开—双观察者共识与共同遗忘”五张实验卡，连续调节窗口长度 $M \in \{1,\dots,10\}$、相干半角 $\alpha_{\mathrm{coh}}$ 与观察者 $B$ 转角 $\eta$ 并拖动球面上琥珀色候选态 $\mathbf{x}$，同屏检视青色单人相干走廊 $\Omega_M$ 与等相关舒尔补曲线、品红收紧边界弧与遗忘重开对数比 $q_M$、紫色双观察者共识走廊 $\Omega_A \cap \Omega_B$ 以及右侧交互格拉姆热图；十三枚绿色 `LEAN ✓` 徽章对应 [@thm-ch34-gram-window-schur-and-consensus] 的十二条冻结声明与 [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics) 定理已引用的 `landauer_bound_of_balance`。
:::

## 34.7.5 算术消元的资源账本：精确回路不等于稀疏算法 {#sec-ch34-18-5}

前几小节用舒尔补刻画了有限记忆窗口的单步裕度；若要把消元思想放到有限整数整除网络上检验，就必须像 [§22.4.1](ch22-s04-critical-line-and-rh.md#sec-ch22-4-1) 严辨级数截断与解析延拓那样，逐笔清算真实的图填充、近似残差与存储成本。考察显式有限顶点集 $V_N := \{2, 3, \dots, N\}$：对 $d, n \in V_N$，当且仅当 $d \neq n$ 且（$d \mid n$ 或 $n \mid d$）时连无向边，记对称 $0/1$ 邻接矩阵为 $W$，整除图拉普拉斯矩阵为 $L_D := \operatorname{diag}(\deg) - W$，并固定锚定阻尼 $\alpha = \frac{1}{4}$ 定义实对称模型矩阵

$$
G \;:=\; L_D + \alpha I, \qquad \alpha = \frac{1}{4}.
$$

对任意非零实向量 $x = (x_2, \dots, x_N)^\top \neq \mathbf{0}$，沿边**配方法手算**二次型立得

$$
x^\top G x \;=\; \alpha\sum_{n=2}^{N} x_n^2 \;+\; \sum_{\substack{2 \le d < n \le N \\ d \mid n}} (x_d - x_n)^2 \;>\; 0.
$$

该手算配方法直接保证 $G$ 严格正定可逆，但在此必须守住三重边界：第一，$G = L_D + \frac{1}{4}I$ 只是有限整除网络上的**玩具模型矩阵，绝不等于 Nyman–Beurling–Báez-Duarte（NBB）希尔伯特空间中的算术格拉姆矩阵**；第二，$G = L_D + \frac{1}{4}I$ 本身是对称严格对角占优（SDD）系统，数值代数中虽已有面向 SDD 图拉普拉斯系统的次立方迭代与近似求解算法（且这些已知有限图快解算法绝不构成黎曼猜想进展），但未经枢轴规划的直接高斯—舒尔消元仍会触发稠密填充；第三，[@thm-ch34-gram-window-schur-and-consensus] 仅刻画抽象内积实现、二三锚行列式判据、正交补逃逸与有限寄存器维数界，**不能外推覆盖本节整除图 $G$、消元复杂度或黎曼猜想**，而在奇异半正定格拉姆块情形下（如令 $\alpha = 0$ 时孤立点与连通分量常值向量落入零空间），普通逆 $A^{-1}$ 并不存在，必须附加值域条件并采用摩尔—彭罗斯伪逆。交互实验室固定保留终端集 $T_N = \{n \in V_N : 4n > 3N\}$，自然序与叶优先序只消去补集 $V_N \setminus T_N$，不随顺序改变终端。以 $N = 6$ 整除图 $V_6 = \{2, 3, 4, 5, 6\}$（对应固定终端 $T_6 = \{5, 6\}$）为例，图中仅有三条边 $2\text{--}4$、$2\text{--}6$ 与 $3\text{--}6$，顶点 $5$ 为**孤立点**；若先消去枢纽点 $2$，原本断开的 $4$ 与 $6$ 之间当场生出非零值为 $-\frac{4}{9}$ 的**填充边（fill-in）$4\text{--}6$**。

::: {.viz src="arithmetic-schur-lab" preset="natural" height="500"}
**自然递增序消元产生新增填充边的三维整除网络（`natural`）。** 三维舞台沿紫色坐标轴展示整数整除网络的青色原始整除边与孤立节点，并在固定终端集下按自然递增序消去内部节点。率先消去小整数枢纽后，原本不相邻的倍数节点间生出品红色新增填充边（如 $N = 6$ 时的 $4\text{--}6$），琥珀色标记指示当前选定节点。
:::

对分块矩阵 $\begin{pmatrix} A & B \\ B^\top & C \end{pmatrix}$ 消去内部集 $U$ 所得精确一次性舒尔补为 $S = C - B^\top A^{-1} B$。**对比不同消元顺序时，绝不能让终端集合跟着顺序变化，唯有预先锁定同一个固定终端集合 $T = V_N \setminus U$ 才有定义一致的比较基准**。

::: {.example #ex-ch34-divisibility-n6-schur-and-drop title="固定终端 {5, 6} 下自然序与叶优先序舒尔块核验及阈值丢弃残差判据"}
在 $V_6 = \{2, 3, 4, 5, 6\}$（$\alpha = \frac{1}{4}$）上严格固定终端集合 $T = \{5, 6\}$、待消内部集 $U = \{2, 3, 4\}$。

1. **自然序 $(2, 3, 4)$ 对比叶优先序 $(4, 3, 2)$**：按自然序先消顶点 $2$（$G_{22} = \frac{9}{4}$，$G_{24} = G_{26} = -1$），立即在 $4\text{--}6$ 间产生非零填充项 $G^{(1)}_{46} = G^{(1)}_{64} = 0 - \frac{(-1)(-1)}{9/4} = -\frac{4}{9}$，对角元更新为 $G^{(1)}_{44} = \frac{29}{36}$、$G^{(1)}_{66} = \frac{65}{36}$；再消 $3$（$G^{(1)}_{33} = \frac{5}{4}$，$G^{(1)}_{36} = -1$）得 $G^{(2)}_{66} = \frac{65}{36} - \frac{4}{5} = \frac{181}{180}$；最后消 $4$ 得终端元 $S_{66} = \frac{181}{180} - \frac{(4/9)^2}{29/36} = \frac{181}{180} - \frac{64}{261} = \frac{441}{580}$。若保持同一终端集 $T = \{5, 6\}$ 改按**叶优先序 $(4, 3, 2)$** 消元：先消一度叶节点 $4$（仅连 $2$，$G_{44} = \frac{5}{4}$）仅将 $2$ 的对角元修为 $G'_{22} = \frac{9}{4} - \frac{4}{5} = \frac{29}{20}$，再消一度叶节点 $3$（仅连 $6$，$G'_{33} = \frac{5}{4}$）仅将 $6$ 的对角元修为 $G''_{66} = \frac{29}{20}$，最后消去此时仅连终端 $6$ 的顶点 $2$ 得 $S_{66} = \frac{29}{20} - \frac{20}{29} = \frac{441}{580}$，**全程零新增填充**，且两种顺序与一次性舒尔块 $C - B^\top A^{-1} B$ 精确一致：

   $$
   S_{\{5, 6\}} \;=\; \operatorname{diag}\!\left(\frac{1}{4},\; \frac{441}{580}\right) \;=\; \begin{pmatrix} \frac{1}{4} & 0 \\ 0 & \frac{441}{580} \end{pmatrix},
   $$

   其中孤立终端 $5$ 全程保持对角元 $\frac{1}{4}$。
2. **最终舒尔块阈值裁剪与原系统残差指标**：页面先精确消元至固定终端集 $T_N$ 上的最终舒尔块 $S$，再将满足 $|S_{ij}| < \varepsilon$（$i \neq j$）的非对角元对称置零而保持对角元不动，记所得近似终端块为 $\tilde{S}$；随后求解该近似终端系统，并用精确消元记录对 $b = e_N$ 回代得到 $\tilde{x}$。实验室同时测量最终舒尔块偏差 $\lVert S - \tilde{S}\rVert_F$ 与**原系统回代残差 $\lVert G\tilde{x} - b\rVert_2$**；仅当确有非零终端耦合落入阈值内被置零时，近似解才可能偏离原方程 $Gx = b$。
:::

::: {.viz src="arithmetic-schur-lab" preset="leaf" height="500"}
**叶优先序消元抑制新增填充的三维整除网络（`leaf`）。** 三维舞台沿紫色坐标轴在同一固定终端集下展示整数整除网络的青色原始整除边，优先消去低度数叶节点再处理内部节点。在 $N = 6$ 固定终端 $\{5, 6\}$ 下按 $(4, 3, 2)$ 消元全程零品红色新增填充边，琥珀色标记指示当前选定节点。
:::

上述算例说明：**舒尔等式 $S = C - B^\top A^{-1} B$ 的代数精确性，绝不保证稀疏性，不自动带来低计算成本，也不给出与热带代数（min-plus 最短路半环）的同构**。在大 $N$ 整除图上，消去高度数小整数会把其倍数连成稠密团；若施行阈值丢弃，就必须同时审计被丢弃项范数与原系统回代残差 $\lVert G\tilde{x} - b\rVert_2$，不能因为减小了非零元数量就忽视近似偏差。

::: {.viz src="arithmetic-schur-lab" preset="drop" height="500"}
**最终舒尔块阈值裁剪下的三维整除网络（`drop`）。** 三维整除网络呈现精确消元至固定终端后、对最终舒尔块满足 $|S_{ij}| < \varepsilon$ 的非对角元对称置零且保持对角元不动所得的品红色缩减耦合，琥珀色圆点标示当前选定节点。该策略仅在最终终端块上裁剪弱耦合，并以终端块偏差与原系统回代残差检验近似精度。
:::

反过来，也不能断言在整除图上反复平方必然触发特征值爆炸。仍在同一整除图上取步长 $\tau = \frac{1}{1 + \max_{2 \le n \le N}\deg(n)}$，构造带自环的随机游走矩阵

$$
P \;:=\; I - \tau L_D, \qquad \tau \;=\; \frac{1}{1 + \max\deg}.
$$

因 $L_D$ 实对称，$P$ 为**实对称矩阵，故谱全为实数**；同时上述步长 $\tau$ 保证 $P$ 逐元非负且每行之和恒为 $1$，即 $P$ 是**对称非负行随机矩阵**，实特征值全落在 $(-1, 1]$ 内，谱半径与谱范数恒满足 $\rho(P) = \lVert P\rVert_2 = 1 \le 1$。对其做 $d$ 层顺序矩阵平方得到 $P^{2^d}$：**虽然仅有 $d$ 层顺序矩阵平方，算子多项式次数却已达 $2^d$**，且始终保持对称、逐项非负行随机与谱半径 $\rho(P^{2^d}) = 1 \le 1$（$d = 0$ 时仍可能有负特征值，仅在 $d \ge 1$ 时实谱非负有界）——该反例表明反复平方未必爆炸；但连通分量内部会随平方层数迅速填满，其**稀疏填充、乘加次数与存储开销**必须另计。

::: {.viz src="arithmetic-schur-lab" preset="square" height="500"}
**带自环随机游走的重复平方的三维整除网络（`square`）。** 三维舞台沿紫色坐标轴展示对称行随机矩阵 $P = I - \tau L_D$ 逐层平方至 $P^{2^d}$ 时的整数整除网络，青色边标示原始整除邻接。随平方层数增加，非孤立连通分量内迅速生满品红色多步耦合边而孤立节点保持解耦，琥珀色圆点在紫色标尺上标示当前平方层数 $d$。
:::

::: {.remark #rem-ch34-burnol-nbb-mollifier-literature title="Burnol 连续缩放子空间下界与磨光器参数 4/7 的文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 对照解析数论文献时须守住两处边界：其一，J.-F. Burnol（[arXiv:math/0103058v2](https://arxiv.org/abs/math/0103058v2)，Theorem 1.3）在 $L^2(0, \infty)$ 中定义子空间 $B_\lambda$ 为连续缩放分数部函数 $x \mapsto \{\theta / x\}$（$\lambda \le \theta \le 1$）的有限线性组合，记目标 $L^2$ 指示函数 $\chi = 1_{(0, 1)}$ 到 $B_\lambda$ 的 $L^2$ 距离为 $D_\lambda := \operatorname{dist}(\chi, B_\lambda)$，证明了渐近下极限不等式

$$
\liminf_{\lambda \to 0^+} D_\lambda\sqrt{\log(1/\lambda)} \;\ge\; \sqrt{\sum_{\operatorname{Re}(\rho)=1/2} \frac{m_\rho^2}{|\rho|^2}}
$$

（其中右端带 $m_\rho^2$ 之和按**不同**的临界线非平凡零点 $\rho$ 求和，$m_\rho$ 为其重数，且若黎曼猜想不成立则左端发散至 $+\infty$）。注意该文讨论的是**连续缩放子空间 $B_\lambda$**，与离散有限整数 $a = 1, \dots, N$ 生成的有限格拉姆逼近**并非同一个有限问题**；在黎曼猜想成立且全体非平凡零点均为单重的情形下，上式右端根号内的和化为 $2 + \gamma - \log(4\pi) \approx 0.04619$，这并不直接给出任意有限截断规模下的精确等式。其二，分数 $\frac{4}{7}$ 只是特定狄利克雷多项式**磨光器（mollifier）**估计中的对数长度参数，并非普适物理隧穿墙，[arXiv:1207.6583v3](https://arxiv.org/abs/1207.6583v3) 已将特定有限比例磨光器界与任意长磨光器区分开来。

此外，离散伸缩参数 $\theta = 1/n$（$1 \le n \le M$）张成的有限维子空间仅包含于连续子空间 $B_{1/M}$ 之内，二者并非同一有限逼近问题，不能将连续子空间距离 $D_{1/M}$ 与离散子空间逼近距离等同；而在黎曼猜想成立、非平凡零点全为单零点且采用双侧零点计数的约定下，成立 $\liminf_{M \to \infty} D_{1/M}^2 \log M \ge 0.046191\dots$，即 $0.046191\dots$ 是 $D_{1/M}^2 \log M$ 在 $M \to \infty$ 时的渐近 $\liminf$ 下界常数，而非有限 $M$ 处的等式。
:::

在由连续子空间迈向离散与局部化算术逼近之前，须先澄清空间侧的一件基本事实：**真实的 Nyman–Beurling 格拉姆矩阵从一开始就不是稀疏矩阵**。对任意正整数 $a, b \ge 1$，取分数部函数 $f_a(x) := \{1/(ax)\}$，其中 $\{u\} = u - \lfloor u\rfloor \in [0, 1)$。由于被积项在 $(0, \infty)$ 上逐点非负，且当 $x > 1$ 时恒有 $0 < \frac{1}{ax} < 1$ 从而 $f_a(x) = \frac{1}{ax}$，仅在半轴 $(1, \infty)$ 上积分便得逐元严格正下界

$$
G^{\mathrm{NB}}_{ab} \;=\; \int_0^\infty \left\{\frac{1}{ax}\right\}\left\{\frac{1}{bx}\right\}dx \;\ge\; \int_1^\infty \frac{dx}{ab\,x^2} \;=\; \frac{1}{ab} \;>\; 0.
$$

由于分数部核在无穷远处按双曲尾部 $1/(ax)$ 缓慢衰减，任意两列伸缩基函数都在 $(1, \infty)$ 上产生不可抵消的正重叠：不同于仅在消去公共枢纽后才生出填充边的稀疏图矩阵，$G^{\mathrm{NB}}$ 在任何消元启动前就已全矩阵稠密，不存在可供保留的结构零元。既然空间侧内积天然稠密，另一条思路便转向傅里叶—韦伊谱侧：试想在实轴有限窗口 $[-R, R]$ 内配置光滑偶波包 $g$，要求其变换在一对共轭镜像谱点 $t \pm i\eta$ 处分别读出相反符号 $+1$ 与 $-1$；一旦谱点逼近临界线对应的实轴（$\eta \to 0$）或逼近对称虚轴（$t \to 0$），偶性与有限支集便会急剧压缩核函数的差分杠杆，迫使波包支付可量化的幅值与曲率账单。

::: {.remark #rem-ch34-signed-orbit-support-budget title="紧支集偶函数分辨带符号轨道的支集—幅值必要预算（应用推导，未形式化）"}
**来源与验证状态。** 本注记给出紧支集偶测试函数分辨单条带符号谱轨道的初等必要判据，判据本身由下文初等推导独立给出。该应用尚未形式化：下文提到的 `UnitSupportBurnolPacket`、`OrbitBurnolPacket` 等构造名指尚未冻结的候选构造，其支集窗口在此作为假设使用；新增必要预算由本注记书面推导负责。对于一般指数型函数，经典的共轭点差分界见 R. P. Boas, Jr., [DOI:10.7146/math.scand.a-10453](https://doi.org/10.7146/math.scand.a-10453) 第 29 页式 (1.3)；对测试函数施加偶性后额外出现的低频反射因子 $m = \min(1, R|t|)$、二阶导数射流约束及带符号包读出关系，均由下文初等推导直接给出。

**无量纲归一化、变换约定与两条必要不等式。** 在黎曼 $\zeta$ 谱映射 $\rho = \beta + it$ 下，离线位移 $\eta = \frac{1}{2} - \beta$ 与谱高度 $t$ 均为无量纲纯数，切勿与量子力学中带量纲的物理虚动量 $i\hbar\kappa$ 混同。以下统一固定满足 $t\eta \neq 0$ 的无量纲谱坐标 $t, \eta \in \mathbb{R}$ 以及与之对偶的无量纲实轴坐标 $x \in \mathbb{R}$，从而支集半宽上限 $R > 0$ 亦无量纲。取任意光滑复值偶函数 $g : \mathbb{R} \to \mathbb{C}$，满足 $g(-x) = g(x)$ 且支集包含关系 $\operatorname{supp} g \subseteq [-R, R]$，采用实轴上指数不含 $2\pi$ 的角频率傅里叶—拉普拉斯变换

$$
F(z) \;:=\; \int_{-\infty}^{\infty} e^{-izx} g(x)\,dx, \qquad z_+ \;:=\; t + i\eta, \quad z_- \;:=\; t - i\eta,
$$

并记零阶与二阶导数 $L^1$ 半范数及分离因子为

$$
\begin{aligned}
L_0 &\;:=\; \int_{-\infty}^{\infty} |g(x)|\,dx, \qquad & L_2 &\;:=\; \int_{-\infty}^{\infty} |g''(x)|\,dx, \\
m &\;:=\; \min(1, R|t|), \qquad & S &\;:=\; m\sinh(R|\eta|) \;>\; 0,
\end{aligned}
$$

当 $t\eta \neq 0$ 且 $R > 0$ 时，$m > 0$ 且 $\sinh(R|\eta|) > 0$，故分离因子 $S > 0$ 严格为正。若单位带符号目标在容许误差 $0 \le \varepsilon < 1$ 内满足 $|F(z_+) - 1| \le \varepsilon$ 与 $|F(z_-) + 1| \le \varepsilon$，则必有

$$
L_0 S \;\ge\; 1 - \varepsilon, \qquad L_2 S \;\ge\; \max\!\bigl(0,\; |t^2 - \eta^2| - (t^2 + \eta^2)\varepsilon\bigr).
$$

当精确单位读出 $\varepsilon = 0$ 时，$L_0 \ge 1/S$ 且 $L_2 \ge |t^2 - \eta^2|/S$。正是依托上述固定无量纲坐标归一化，$L_0$ 与 $L_2$ 具有一致的无量纲标度而不存在不同量纲混加，两式相加即得二阶射流必要下界

$$
L_0 + L_2 \;\ge\; \frac{1 + |t^2 - \eta^2|}{S}.
$$

须注意，$1/S$ 与有限误差下的 $(1 - \varepsilon)/S$ 来自核函数逐点绝对值放缩，仅为 $L_0$ 的必要下界，并非某个插值最小范数的精确极值。

**偶性余弦差与两次分部积分推导。** 由 $\operatorname{supp} g \subseteq [-R, R]$ 知 $F(z)$ 绝对收敛。令 $x \mapsto -x$ 并用偶性 $g(-x) = g(x)$，可将积分化为 $F(z) = \int_{-R}^{R} \cos(zx)g(x)\,dx$。展开 $\cos\bigl((t \pm i\eta)x\bigr) = \cos(tx)\cosh(\eta x) \mp i\sin(tx)\sinh(\eta x)$，共轭镜像点处的余弦核差恒为

$$
\cos\bigl((t + i\eta)x\bigr) - \cos\bigl((t - i\eta)x\bigr) \;=\; -2i\sin(tx)\sinh(\eta x).
$$

在 $|x| \le R$ 上，$|\sin(tx)| \le \min(1, |tx|) \le \min(1, R|t|) = m$ 且 $|\sinh(\eta x)| \le \sinh(R|\eta|)$，由积分三角不等式得 $|F(z_+) - F(z_-)| \le 2 S L_0$。反过来记 $F(z_\pm) = \pm 1 + e_\pm$，其中 $|e_\pm| \le \varepsilon$，逆三角不等式给出

$$
|F(z_+) - F(z_-)| \;=\; |2 + e_+ - e_-| \;\ge\; 2 - |e_+| - |e_-| \;\ge\; 2(1 - \varepsilon),
$$

约去因子 $2$ 即证 $L_0 S \ge 1 - \varepsilon$，此步对支集含于 $[-R, R]$ 的任意可积偶函数均成立。继而，因 $g$ 光滑、为偶函数且 $\operatorname{supp} g \subseteq [-R, R]$，二阶导数 $g''$ 同样光滑、为偶函数且支集含于 $[-R, R]$。对 $F_{g''}(z) = \int_{-\infty}^{\infty} e^{-izx}g''(x)\,dx$ 施行两次分部积分，由于 $g$ 与 $g'$ 在 $\pm R$ 处同为零，一阶与二阶边界项悉数消失，从而 $F_{g''}(z) = -z^2 F(z)$。代入 $F(z_\pm) = \pm 1 + e_\pm$，并利用 $z_+^2 + z_-^2 = 2(t^2 - \eta^2)$ 与 $|z_\pm|^2 = t^2 + \eta^2$，有

$$
\begin{aligned}
|F_{g''}(z_+) - F_{g''}(z_-)| &\;=\; \bigl|-z_+^2 - z_-^2 - z_+^2 e_+ + z_-^2 e_-\bigr| \\
&\;\ge\; 2|t^2 - \eta^2| - 2(t^2 + \eta^2)\varepsilon.
\end{aligned}
$$

将余弦核差分上界用于偶函数 $g''$ 得 $|F_{g''}(z_+) - F_{g''}(z_-)| \le 2 S L_2$，结合 $L_2 \ge 0$ 即证第二条有限误差不等式；取 $\varepsilon = 0$ 并与 $L_0 \ge 1/S$ 求和即得精确读出下的 $L_0 + L_2$ 下界。由于 $|z_+^2 - z_-^2| = |z_+ - z_-|\cdot |z_+ + z_-| = 4|t\eta|$，且 $R|t|, R|\eta|$ 均小时 $S \sim R^2|t\eta|$，直接碰撞（$\eta \to 0$）与反射碰撞（$t \to 0$）均直接源于点求值泛函，更换插值基系数无法规避；而在退化情形 $\eta = 0$ 即 $z_+ = z_-$，或 $t = 0$ 即 $z_- = -z_+$ 且偶性迫使 $F(-z) = F(z)$ 时，只要相对误差小于 $1$，非零相反符号目标便迫使同一复数值落入两个不相交误差圆盘而矛盾。

**实际 Burnol 包、支集半宽上限与重复平方。** 该候选构造对谱点 $\rho = \beta + it$ 取

$$
\gamma \;:=\; \frac{\rho - 1/2}{i} \;=\; t + i\!\left(\frac{1}{2} - \beta\right), \qquad \eta \;=\; \frac{1}{2} - \beta,
$$

从而 $(z_+, z_-) = (\gamma, \overline{\gamma})$。在同一有限轨道包 `OrbitBurnolPacket` 及模块 `UnitSupportBurnolPacket` 的单位支集构造中，记有限指标集 $\iota$ 的基数为通道数 $q = |\iota|$，并设公共局部化（卷积）深度为 $N \in \mathbb{N}$（$N$ 既非通道数 $q$，亦不默认等同于整除图的顶点规模上限或图平方深度 $d$）：对各通道 $i \in \iota$，局部化基 `burnolBasis` 将峰值核 $P.\mathrm{peak}$ 在深度 $N$ 处的 $(N + 1)$ 重卷积幂 `convolutionSuccPower` 与种子项 $P.\mathrm{killer}(i)$ 作卷积。对任意 $j \in \iota$，由 `killer_values` 规定的第 $j$ 条轨道种子项 $P.\mathrm{killer}(j)$ 与局部化合成 `burnolSynthesis` 在第 $j$ 个独热（one-hot）系数向量处的值，均给出该包对同一轨道的精确带符号读出 $F(\gamma) = 1, F(\overline{\gamma}) = -1$（$\varepsilon = 0$）。因为 $S$ 关于 $R$ 单调不减，任何满足 $\operatorname{supp} g \subseteq [-R, R]$ 的支集半宽上限 $R$ 均可合法代入上界：种子阶段仅保证 $\operatorname{supp} P.\mathrm{killer}(j) \subseteq [-1, 1]$，故 $R = 1$ 是**种子支集半宽上限**而非实际支集等式；经认证的二阶射流上界预算 $J_0 \ge L_0, J_2 \ge L_2$ 必满足 $R = 1$ 对应的必要下界，固定 $t \neq 0$ 时 $1/S$ 在 $\eta \to 0$ 下按 $\frac{1}{\min(1, |t|)\,|\eta|}$ 增长。独热 `burnolSynthesis` 阶段由单位支集卷积包含关系给出 $\operatorname{supp} \subseteq [-(N + 2), N + 2]$，因此 $R_N = N + 2$ 同样只是**支集半宽上限**而非精确支集半径。若最终范数满足 $L_0 \le L$，代入 $R_N = N + 2$ 知精确读出要求 $(N + 2)|\eta| \ge \operatorname{arsinh}(1/L)$；对同一精确读出包而言，当范数上界 $L$ 与支集半径上限 $R$ 固定时，$R|\eta| \ge \operatorname{arsinh}(1/L)$ 使 $|\eta|$ 不能任意小，增加名义乘法层数本身并不取消该必要条件。若以 $k$ 层重复平方生成 $N + 1 = 2^k$，所得 $R_N = 2^k + 1$ 亦仅为可用支集半宽上限，既非最小必需支集半径，也不否定对数层乘法或给出算术运行时间下界，只表明 $k$ 层对数乘法背后可隐含按 $2^k + 1$ 增长的支集窗口上限。

**必要检验、信号归一化与结论边界。** 给定幅值预算 $L_0 \le L$ 且 $L > 0$，例如 $[-R, R]$ 上的逐点界 $|g| \le A$ 即给出 $L_0 \le 2RA$，此时单位读出要求 $R|\eta| \ge \operatorname{arsinh}\!\bigl(\frac{1-\varepsilon}{mL}\bigr) \ge \operatorname{arsinh}\!\bigl(\frac{1-\varepsilon}{L}\bigr)$。在经认证包络 $|\eta| \le \eta_{\max}$ 上，严格不等式 $L\sinh(R\eta_{\max}) < 1 - \varepsilon$ 直接排除该预算下的读出：例如对任意 $R, L > 0$ 与 $0 \le \varepsilon < 1$，取复平面一般测试谱节点 $t = 1/R$、$\eta = \operatorname{arsinh}((1-\varepsilon)/L)/(2R)$，该点仅为一般谱参数节点而非断言存在的 $\zeta$ 零点，此时 $m = 1$ 且 $L\sinh(R\eta) < 1 - \varepsilon$。满足 $L\sinh(R\eta_{\max}) \ge 1 - \varepsilon$ 仅通过单轨道必要检验，并非单节点或多节点插值存在的充分条件。若将目标换为相反符号 $\pm a$ 且容许绝对误差 $e \ge 0$，三角不等式给出 $L_0 S \ge \max(0, |a| - e)$；将整个测试函数按因子 $a$ 缩放会使二次韦伊泛函按 $|a|^2$ 缩放，压低 $|a|$ 虽缩小原始 $L^1$ 预算，却同步按同一比例缩小信号与容许绝对误差。当 $a \neq 0$ 且 $0 \le e < |a|$ 时，令相对误差 $\varepsilon := e / |a| \in [0, 1)$、信号归一化预算 $B := L / |a|$，则

$$
L_0 S \;\ge\; \max(0,\; |a| - e), \qquad B S \;\ge\; 1 - \frac{e}{|a|} \;=\; 1 - \varepsilon,
$$

从而给出信号归一化**预算必要下界**

$$
B_{\min} \;:=\; \frac{1 - \varepsilon}{\min(1, R|t|)\sinh(R|\eta|)}.
$$

该量只是 $B$ 必须跨过的预算必要下界，并非可达最小值，也不是插值最小范数的精确值。最后须明确四条边界：本推导不断言存在任何实际离线 $\zeta$ 零点，不构成黎曼猜想证明，不能将半范数 $(L_0, L_2)$ 的下界逻辑求逆为混合谱主控量的下界，亦不给出无条件算术或位复杂度下界。
:::

::: {.viz src="arithmetic-schur-lab" preset="budget" height="500"}
**紧支集偶函数分辨带符号轨道的预算必要下界曲面与排除区域（`budget`）。** 三维坐标 $(R, |\eta|, B)$ 舞台呈现紫色预算必要下界曲面 $B_{\min} = (1 - \varepsilon) / \bigl(\min(1, R|t|)\sinh(R|\eta|)\bigr)$、曲面下方的品红色排除区域，以及标示当前参数点的琥珀色圆点。控件支持调节参数 $t$ 与相对误差 $\varepsilon$ 并实时读出预算必要下界 $B_{\min}$；落入品红色排除区域的点违反必要条件，位于未排除区域则仅满足必要条件而非插值存在的充分条件。
:::

::: {.problem #prob-ch34-signed-orbit-joint-budget title="单位支集 Burnol 包的节点认证、混合主控与位复杂度联合预算（开放问题）"}
在所给有限谱轨道框架下，针对模块 `UnitSupportBurnolPacket` 的单位支集构造所给出的同一实际有限轨道包 `OrbitBurnolPacket` 及其局部化合成 `burnolSynthesis`，建立或在给定资源上限下证伪一套显式可计算的条件联合认证：对同一实际包一并给出经区间认证的节点包络与（直接、反射及轨道间）分离度、目标带符号读出值、二阶射流上界预算 $(J_0, J_2)$、完整首尾混合谱主控量上界，以及总位成本上界，并将上述指标共同表示为谱高度 $|t|$、离线距离 $|\eta|$、通道数 $q = |\iota|$、公共局部化深度 $N$ 与误差容限 $\varepsilon$ 的显式函数。其中混合主控量上界须由合成结构正面导出而不能倒置半范数下界，总位成本亦须正面审计而不能由稀疏系数合成推断格拉姆矩阵稀疏或多项式位成本。黎曼猜想仍未解决，本问题不提供也不断言存在任何实际离线 $\zeta$ 零点；复平面一般测试谱节点可用于对候选预算作压力测试，但不能取代面向同一实际包的条件认证消费者，单凭一般测试节点并不足以认证真实算术轨道框架。该问题具有一条直接证伪判据：对任意拟议单位目标预算 $(R, L, \varepsilon)$（$0 \le \varepsilon < 1$，$t\eta \neq 0$），若在一般测试谱节点的认证包络 $|\eta| \le \eta_{\max}$ 上成立

$$
L\sinh(R\eta_{\max}) \;<\; 1 - \varepsilon,
$$

则该单位目标预算即刻证伪；未被该不等式排除则仅通过单轨道必要检验，不提供多节点插值存在证书或黎曼猜想证书。本问题审计傅里叶—韦伊谱侧紧支集偶波包的轨道合成、混合主控与位成本，与紧接其后审计 $L^2(0, \infty)$ 空间侧稠密分数部格拉姆矩阵 $G^{\mathrm{NB}}_{ab}$ 多级枢轴压缩的开放问题分属不同数学对象。
:::

::: {.problem #prob-ch34-arithmetic-schur-subcubic-question title="实际算术 Gram 对象与多级枢轴压缩的桥梁（开放问题）"}
本节整除图矩阵 $G = L_D + \frac{1}{4}I$ 仅是教学模型，**并不等于 NBB 格拉姆矩阵**，且其对称严格对角占优结构本身已有已知次立方求解器，绝不可把有限整除图的已知快解算法冒称为黎曼猜想进展。通向实际算术对象的具体下一步是：在复希尔伯特空间 $L^2(0, \infty)$ 中，针对实际 NBB 目标函数 $\chi$ 与分数部向量族 $f_a(x) = \{1/(ax)\}$（$1 \le a \le N$），显式计算有限格拉姆矩阵 $G^{\mathrm{NB}}_{ab} = \langle f_a, f_b\rangle$ 与右端内积向量 $b_a = \langle f_a, \chi\rangle$，明确指定多级枢轴压缩或近似消元方案及其误差范数；进而寻找或排除这样一类可计算证书——它能够将该方案在原 $L^2(0, \infty)$ 空间中的目标逼近残差严格控制在 $\varepsilon$ 以内，并给出随规模 $N$、精度 $\varepsilon$ 与零点检测高度一致成立的条件数、存储规模及总算术成本上界。同时必须将**从任意有限 $N$ 可计算证书外推至 $N \to \infty$ 极限残差趋于 $0$（即等价于 [@conj-riemann-hypothesis] 的路线）**单列为尚未证明的独立步骤。直接可证伪的首项检验是：采用带独立积分误差界的实际 $G^{\mathrm{NB}}_{ab}$ 矩阵元，实测所拟多级压缩方案的谱误差是否随层级深度单调下降；一旦出现谱误差停滞或反升的反例，即须修正或放弃该压缩方案。
:::

下方完整实验室将整除网络上的自然序填充、叶优先消元、最终舒尔块阈值裁剪、带自环随机游走重复平方，以及紧支集偶函数分辨带符号轨道的三维预算必要下界曲面并置在同一交互主舞台中，供读者切换核验：

::: {.viz src="arithmetic-schur-lab" height="640"}
**算术整除网络舒尔消元、重复平方与带符号轨道支集预算三维交互实验室（`arithmetic-schur-lab`）。** 三维主舞台在整除网络各视图下沿紫色坐标轴呈现青色原始整除边与品红色新增填充及多步耦合边；切换至带符号轨道预算视图（`budget`）时，在三维坐标 $(R, |\eta|, B)$ 中呈现紫色预算必要下界曲面 $B_{\min} = (1 - \varepsilon) / \bigl(\min(1, R|t|)\sinh(R|\eta|)\bigr)$、曲面下方的品红色排除区域与标示当前参数点的琥珀色圆点，而在网络视图下琥珀色标记指示当前枢轴或平方层数。控件与读数支持在网络视图下调节规模 $N$、消元顺序、裁剪阈值与平方层数以核对填充边数及回代残差，并在预算视图下调节参数 $t$ 与相对误差 $\varepsilon$ 以实时显示预算必要下界 $B_{\min}$；落入品红色排除区域违反必要条件，位于未排除区域则仅满足必要条件而非插值存在的充分条件。
:::
