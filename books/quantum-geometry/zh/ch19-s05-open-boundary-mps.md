# 19.5 开边界矩阵乘积态：三格点边缘恢复与内禀一般性 {#sec-open-boundary-mps-recovery}

宽度三桥图刻画了固定拓扑截面上纠缠秩的容量上限；而在一维多体物理中，由同一组键维数 $2$ 的局部核张量串联而成的**齐次开边界矩阵乘积态**（homogeneous open-boundary matrix product state, MPS）进一步回答了另一个关键的反问题：**仅凭一条局部连续三格点窗口的未归一化约化矩阵，何时足以在差一个全局单位相位 $z$（$\|z\| = 1$）的意义下唯一锁死整条链的全局纯态？**

按源码精确记号，设键矩阵空间为 `Bond := Matrix (Fin 2) (Fin 2) ℂ`，链长 $n$ 的比特词空间为 `Word n := Fin n → Fin 2`。给定局部核对 $a_0, a_1 \in \mathrm{Bond}$ 与左右开边界向量 $b_0, b_1 \in \mathbb{C}^2$，开边界 MPS 态矢与态集定义为

$$
\operatorname{mpsState}(n, a_0, a_1, b_0, b_1)(w) := b_0 \cdot_{\mathrm{v}} \Bigl(\Bigl(\prod_{j \in \mathrm{Fin}\,n} a_{w(j)}\Bigr) *_{\mathrm{v}} b_1\Bigr), \qquad \operatorname{openBoundaryMPS}(n) := \bigl\{\psi \;\big|\; \exists a_0, a_1, b_0, b_1,\; \psi = \operatorname{mpsState}(n, a_0, a_1, b_0, b_1)\bigr\},
$$

其中 $\cdot_{\mathrm{v}}$ 为不带复共轭的双线性点积 `dotProduct`。将链长拆为 $k + m$ 时，按前 $k$ 位与后 $m$ 位拼接展平得振幅列矩阵 $\operatorname{amplitudeColumns}(k, m, \psi)_{u, b} := \psi(\operatorname{append}(u, b))$，并定义**未归一化**前 $k$ 格点约化矩阵为

$$
\operatorname{rawPrefix}(k, m, \psi) := \operatorname{amplitudeColumns}(k, m, \psi)\,\bigl(\operatorname{amplitudeColumns}(k, m, \psi)\bigr)^* \in M_{\mathrm{Word}\,k}(\mathbb{C}).
$$

先做两个手算核对：第一，在 $3$ 格点链上取对角玩具核 $a_0 = I_2$、$a_1 = \operatorname{diag}(1, 2)$ 与边界 $b_0 = b_1 = (1, 1)^T$，在词 $w = 010$ 处的振幅为 $(1, 1)\cdot \operatorname{diag}(1, 2)(1, 1)^T = 1 + 2 = 3$；若将整条态矢乘以单位相位 $i$，因 $i\overline{i} = 1$，$\psi\psi^*$ 与任意 $\operatorname{rawPrefix}$ 保持不变。第二，取内部恢复所需的最小链长 $m = 2$（总链长 $3 + m = 5$，共 $2^5 = 32$ 个复振幅）：此时 $\operatorname{rawPrefix}(3, 2, \psi)$ 是 $8\times 8$ 厄米半正定矩阵；若在左端留 $p = 1$ 格、右端留 $q = 1$ 格（$p + q = 2$），消去左右边界单格后同样得到中间三格点 $\{1, 2, 3\}$ 上的 $8\times 8$ 未归一化内部边缘矩阵 $\operatorname{rawInterior}(1, 3, 1, \psi)$。

为排除奇异退化点，对任意核族 $A : \mathrm{Fin}\,2 \to \mathrm{Bond}$ 定义完全正转移映射 $\operatorname{transfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i X A_i^*$ 与对偶转移映射 $\operatorname{dualTransfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i^* X A_i$。在三格点切片 $t : \mathrm{Word}\,3 \to \mathbb{C}$ 上，源码由子式与伴随多项式构造有理重构核 $\operatorname{canonicalCore}(t) : \mathrm{Fin}\,2 \to \mathrm{Bond}$ 及判别多项式 `chartPoly : MvPolynomial (Word 3) ℂ`，并定义**可观测图表条件** `ObservableChart m ψ` 为：存在探测向量 $v : \mathrm{Word}\,3 \to \mathbb{C}$，记 $t := \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$，使得 $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$ 且线性映射 $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ 在 $M_2(\mathbb{C})$ 上单射。

这个对角例需要区分给定核与重构核的转移算子。记 $D=\operatorname{diag}(1,2)$。给定核 $(I_2,D)$ 的转移算子 $X\mapsto X+DXD$ 在矩阵单位 $E_{11},E_{12},E_{21},E_{22}$ 上分别乘以 $2,3,3,5$，因而可逆。可观测图表检验的则是 $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ 的单射性，并同时要求 $\operatorname{eval}_t(\mathrm{chartPoly})\ne0$。振幅只取决于词中 $1$ 的个数，三格点全态 $\psi$ 对格点置换对称。此时 $t=(\psi\psi^*)v$ 是 $\psi$ 的标量倍数，故 $t_{001}=t_{010}=t_{100}$。三阶子式 `minorPoly` 的第一列是 $(t_{000},t_{010},t_{100})^T$，第三列是 $-(t_{000},t_{001},t_{010})^T$，两列互为相反数，因而对每个 $v$ 都有 $\operatorname{eval}_t(\mathrm{chartPoly})=0$。尽管图表条件失效，这条三格点链的前三格点已经包含全态，$\psi\psi^*$ 仍确定 $\psi$ 至多相差一个单位相位。

::: {.theorem #thm-mps-observable-phase-recovery title="可观测图表内的 MPS 态恢复：至多差一个全局单位相位" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery"}
设 $m \in \mathbb{N}$，$\psi, \varphi : \mathrm{Word}\,(3 + m) \to \mathbb{C}$ 均属于开边界键维数 $2$ 矩阵乘积态集 $\operatorname{openBoundaryMPS}(3 + m)$，且 $\psi$ 满足可观测图表条件 $\operatorname{ObservableChart}(m, \psi)$。则两态的前三格点未归一化约化矩阵相等，当且仅当两态仅相差一个模长为 $1$ 的全局复相位因子：

$$
\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

:::

::: proof
右推左直接由共轭双线性得出：若 $\varphi = z \cdot \psi$ 且 $\|z\| = 1$，则展平列矩阵满足 $\operatorname{amplitudeColumns}(3, m, \varphi) = z\,\operatorname{amplitudeColumns}(3, m, \psi)$，右乘共轭转置后因子 $z\overline{z} = \|z\|^2 = 1$ 抵消，故 $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$。反之设 $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$：由 $\operatorname{ObservableChart}(m, \psi)$ 取出探测向量 $v$，两态生成完全相同的三格点切片 $t = \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$，满足分母多项式 $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$（从而有理核重构不会落入除以零的退化分支）且 $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ 单射。由 $t$ 将两组参数换至相同的典范核与左边界。前缀映射单射，消去它后，再利用转移映射的 $m$ 次迭代单射，得到两个右边界向量的外积相等。因此右边界只相差一个单位相位，代回振幅公式即得 $\varphi=z\psi$。完整证明由 Lean 内核检查。
:::

进一步问：满足这种局部可恢复性的非退化态在 $\operatorname{openBoundaryMPS}(3 + m)$ 中究竟是孤立特例，还是普遍常态？当右侧余链长度满足 $m \ge 2$（总链长 $3 + m \ge 5$，足以容纳至少一个左边界格点 $p \ge 1$ 与至少一个右边界格点 $q \ge 1$，$p + q = m$）时，对任意拆分 $(p + 3) + q = 3 + m$，将左 $p$ 格与右 $q$ 格合并求偏迹即得内部三格点未归一化约化矩阵 $\operatorname{rawInterior}(p, 3, q, \cdot) \in M_{\mathrm{Word}\,3}(\mathbb{C})$。记 $\mathrm{ObsIndex} := \mathrm{Word}\,3 \times \mathrm{Word}\,3$，源码在子空间拓扑下将目标命题 `intrinsicInteriorRecovery m` 定义为：存在非零实多元多项式 $R \in \mathrm{MvPolynomial}\,(\mathrm{ObsIndex} \oplus \mathrm{ObsIndex})\,\mathbb{R}$（作用在 $\operatorname{rawPrefix}(3, m, \psi)$ 各矩阵元的实部与虚部上），使其在子类型 $\operatorname{openBoundaryMPS}(3 + m)$ 内的非零主轨迹 $\operatorname{actualPrincipalLocus}(m, R)$ 同时满足**非空**、**开集**（`IsOpen`）、**稠密**（`Dense`）与**单位模相位不变**；并且对该主轨迹中的任意 $\psi$，提取其 $13$ 维实商坐标 $x$ 与典范代表参数 $\theta = \operatorname{positiveRepresentative}(x)$ 后，同时成立：（i）尺度因子 $\sigma(x) > 0$ 且存在 $\|z\| = 1$ 使 $\psi = z \cdot \operatorname{state}(3 + m, \theta)$；（ii）重构核满足两格点张成性 $\operatorname{TwoSiteSpanning}(\operatorname{core}(\theta))$（四个乘积 $A_i A_j$ 张满 $M_2(\mathbb{C})$）且 $\operatorname{transfer}(\operatorname{core}(\theta))$ 单射；（iii）对一切步数 $k \ge 1$，左边界经 $k$ 次 $\operatorname{dualTransfer}$ 迭代与右边界经 $k$ 次 $\operatorname{transfer}$ 迭代所得的 $2\times 2$ 边界格拉姆矩阵均严格正定（`PosDef`）；（iv）对任意满足 $p \ge 1, q \ge 1, p + q = m$（配指标对齐映射 $\mathrm{cast}_h : \mathrm{Word}\,((p + 3) + q) \to \mathrm{Word}\,(3 + m)$）的**内部**三格点窗口及任意 $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$，均有

$$
\operatorname{rawInterior}(p, 3, q, \varphi \circ \mathrm{cast}_h) = \operatorname{rawInterior}(p, 3, q, \psi \circ \mathrm{cast}_h) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

::: {.theorem #thm-mps-generic-interior-recovery title="MPS 内部恢复的内禀一般性" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.intrinsic_interior_recovery"}
对任意满足 $2 \le m$ 的自然数 $m \in \mathbb{N}$（即开边界链总长度 $3 + m \ge 5$），内禀一般性命题 $\operatorname{intrinsicInteriorRecovery}(m)$ 成立：存在关于前三格点约化矩阵实虚部坐标的非零实多项式 $R \neq 0$，其在子空间 $\operatorname{openBoundaryMPS}(3 + m)$ 中切出的主非零轨迹非空、开、稠密且对全局单位相位不变，且该轨迹上的每个态不仅具备典范正代表重构、两格点张成性、单射转移算子与正定迭代边界格拉姆矩阵，而且可由任意满足 $p \ge 1, q \ge 1, p + q = m$ 的内部连续三格点未归一化约化矩阵在 $\operatorname{openBoundaryMPS}(3 + m)$ 内恢复，至多差一个全局单位相位。
:::

::: proof
固定 $m \ge 2$。源码首先将两格点张成性、转移算子单射性、商坐标非退化判别式 $\sigma(x) > 0$ 以及开边界左右正定传递条件合并编码为关于 $\operatorname{rawPrefix}(3, m, \psi)$ 实部与虚部坐标的单个实代数主判别多项式 $R$，并通过显式构造一个满足两格点张成性与双端正定边界的五格点以上模型实例证明 $R$ 在 $\operatorname{openBoundaryMPS}(3 + m)$ 上非恒零，从而确立主轨迹非空与 $R \neq 0$。因参数化映射 $\theta \mapsto \operatorname{state}(3 + m, \theta)$ 是复多项式连续映射，实多项式非零集在诱导子空间拓扑下自动为开集；而在任意给定 MPS 参数附近沿非退化主参数方向做微扰时，单变量实解析多项式至多只有有限个孤立根，故主轨迹在 $\operatorname{openBoundaryMPS}(3 + m)$ 中稠密。最后在主轨迹任一点 $\psi$ 上，由（ii）与（iii）知左端 $p \ge 1$ 步对偶转移与右端 $q \ge 1$ 步正转移均给出严格正定（从而满秩可逆）的 $2\times 2$ 边界格拉姆矩阵，使内部三格点窗口 $\operatorname{rawInterior}(p, 3, q, \cdot)$ 完备保留局部核的商不变量，继而将任意具有相同内部三格点边缘的 $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$ 唯一锁定为 $z \cdot \psi$（$\|z\| = 1$）。完整证明由 Lean 内核检查。
:::

在解读 [@thm-mps-observable-phase-recovery] 与 [@thm-mps-generic-interior-recovery] 时，必须严守三条精确边界：第一，$\operatorname{rawPrefix}$ 与 $\operatorname{rawInterior}$ 均为**未归一化**约化密度矩阵，即沿被迹去指标对振幅列外积求和的结果（定理无需预设 $\|\psi\| = 1$，其迹直接携带范数平方 $\|\psi\|^2$）；第二，图表与主非零轨迹给出恢复的充分条件。在它们之外，唯一性要另行判断。例如，五格点 GHZ 态 $\lvert G_\pm\rangle=(\lvert 00000\rangle\pm\lvert 11111\rangle)/\sqrt{2}$ 可由键矩阵 $E_{11},E_{22}$、左边界 $(1,1)$ 与右边界 $(1,\pm1)^T/\sqrt{2}$ 表示。两态正交，迹去任意两格点却消去了交叉项，留下相同的三格点约化矩阵。第三，这里的“一般性”严格指子空间拓扑下的开集与稠密性（`IsOpen` 与 `Dense`），既未引入概率测度声称“测度为 $1$”，也不等同于抗噪数值层析的多项式时间复杂度上界。

在宽度三桥图与键维数 $2$ 的一维齐次开边界 MPS 链上，我们已经看到：前者在有序锥域假设下的最大可达秩为 $\min(ad, bc)$（[@thm-bridge-quantum-maxflow-mincut]）；后者在可观测图表内由三格点未归一化前缀边缘确定纯态，至多相差一个全局单位相位（[@thm-mps-observable-phase-recovery]），而链长至少为 $5$ 时，主非零轨迹上的态也可由任意内部连续三格点未归一化边缘作同样恢复（[@thm-mps-generic-interior-recovery]）。秩饱和并不保证纠缠熵饱和，[@ex-bridge-two-five-flat-spectrum] 已给出精确反例。若在后续模型中额外假设纠缠熵已达到割容量对数给出的上限，这仍是独立的情景假设，并不等同于热平衡。接下来转向量子电路的深度与门计数：它们受到哪些严格限制，与全息复杂性的猜想又有怎样的边界？进入第五部的收官之章——[第二十章](ch20-complexity-and-spacetime.md)。

::: {.viz src="layered-network-cut" height="560"}
层级网络与割的完整实验室：在底边拖动一段或两段区间，看品红的最小割怎样穿过网络、割断几条键。网络是示意模型，割的条数由页面算出；RT 公式与 MERA 的类比是文献结果，未在本书形式化，绿色只给 [@prop-bridge-flow-cut-bound]。
:::
