# 附录 G 稳定子多面体之外：马约拉纳编码、克利福德魔性与转向 {#sec-appendix-g}

在正文的几何脉络中，我们已经从五条彼此呼应的路径触及了有限维量子结构的代数骨架：[第十章](ch10-gram-geometry-and-order.md)剖析了对易顺序、相容格拉姆几何与双比特泡利花边图（doily）的语境奇偶约束；[第十三章](ch13-entanglement-and-chsh.md)揭示了双量子比特余弦圆弧如何突破贝尔（CHSH）折线上界，并把远端条件态塑造成转向椭球；[第十四章](ch14-cloning-codes-and-braids.md)与[14.2 节](ch14-s02-pauli-syndromes.md)建立了广义泡利字综合征与稳定子纠错码的辛正交判据；[第十六章](ch16-qsvt-walks-and-compilation.md)与[16.8 节](ch16-s08-finite-gate-polytopes.md)展示了离散门集如何在三维球面上张成有限割圆多面体；[附录 B](appendix-b.md)则系统汇总了克利福德几何代数 $\mathrm{Cl}_{3,0}(\mathbb{R})$ 的分级基片、异或乘法表与二元辛相空间字典。

一旦把目光投向**稳定子多面体与局域隐态模型的边界之外**，五个紧咬有限维可计算表征的核心数学问题便接踵而至：

1. **有限模数马约拉纳稳定子码的距离上限**：在二元自正交校验子空间含全 $1$ 宇称向量且保有正逻辑维数的条件下，$n \le 14$ 个马约拉纳模式能否容身码距至少为 $4$ 的二元编码？
2. **离散相空间魔性的张量复合律**：当两个单比特密度态都落在布洛赫球赤道平面（$Z$ 分量为 $0$）时，双比特离散 Wigner $\ell^1$ 距离是否遵循精确的乘性复合定律？
3. **非赤道张量缺额的可分解性边界**：一旦第二个单比特因子离开赤道进入正卦限，双比特张量距离与乘性基线之间的缺额（deficit）还能否统一写成“首因子距离乘单变量函数”的因式分解？
4. **奇素数维克利福德三阶矩的逐点正性检验**：在奇素数维量子系统中，任意归一纯态在任意随机拉格朗日子空间置换算子上的三阶矩迹 $\kappa$，是否如 Zhu、Mao 与 Yi（2024）猜想 2 的逐点条款所断言的那样恒满足逐点区间界 $0 \le \kappa \le 1$？
5. **三设置泡利转向的椭球中心临界半径**：在双量子比特系统中，Bob 条件转向椭球中心长度 $t = \|\vec{c}_B\|$ 究竟在哪个尖锐阈值处截断三正交设置转向参数 $F_3 > 1$ 的违背能力？

本附录以纯有限维矩阵手算与已冻结的五条 Lean 4 内核定理（验证边界见[附录 C](appendix-c.md)）逐一回答上述问题。这五个问题都出自已发表文献：问题 1 见 M. B. Hastings（*Quantum Inf. Comput.* **17**, 2017），问题 2 是 S. Dutta 与 Tushar 在 *A Phase-Space Geometric Measure of Magic in Qubit Systems* 中的猜想 5.6，问题 3 在严格正卦限内检验其猜想 5.5 的因式分解条款（[arXiv:2603.20792v4](https://arxiv.org/abs/2603.20792v4)），问题 4 是 H. Zhu、C. Mao 与 C. Yi 的 *Third moments of qudit Clifford orbits and 3-designs based on magic orbits*（[arXiv:2410.13575v1](https://arxiv.org/abs/2410.13575v1)）猜想 2 的逐点条款，问题 5 来自 A. F. Ducuara、C. E. Susa 与 P. Skrzypczyk（*Phys. Rev. A* **110**, 022435, 2024）。需要先行申明认识论边界：这五节串联的共同主线是**有限维代数与凸几何表征的可达边界与精确反例**，本书**不声称**二元编码汉明重、单双比特 Wigner $\ell^1$ 距离、奇素数维克利福德三阶矩与双比特三设置转向参数这五种量在资源论意义下互为充要条件。

---

## G.1 十四模以内马约拉纳码的低重逻辑算子 {#sec-appendix-g-1}

沿用[附录 B](appendix-b.md)的实克利福德生成元语言（文献背景，仅作物理动机说明）：设 $n$ 个马约拉纳费米算子 $\gamma_0, \dots, \gamma_{n-1}$ 满足 $\gamma_i^2 = I$ 与反对易律 $\gamma_i \gamma_j = -\gamma_j \gamma_i$（$i \neq j$）。二元指示串 $x : \operatorname{Fin} n \to \operatorname{ZMod} 2$ 标记单项式乘积中出现的模式指标；当两个指示串的汉明重均为偶数时，对应马约拉纳单项式对易当且仅当两串重合的位数为偶数，即模 $2$ 标准坐标内积为零。若稳定子校验子空间 $c$ 包含代表总费米子宇称的全 $1$ 向量 $\mathbf{1} = (1, \dots, 1)$，且编码至少携带一个非平凡逻辑自由度（$2 \dim_{\mathbb{F}_2} c < n$），任何落在正交补 $c^\perp \setminus c$ 中的向量 $v$ 都代表一个与全部校验算子对易、却不属于稳定子本身的非平凡逻辑算子；此类算子的最小汉明重决定了该二元马约拉纳码能否抵御任意单模与双模联合错误（码距 $\ge 4$ 要求 $c^\perp \setminus c$ 中无汉明重小于 $4$ 的元素）。

在进入一般定理前，先用 $n = 4$ 的最小非平凡情形亲手验算这一代数结构。取四模二元空间 $(\operatorname{Fin} 4 \to \operatorname{ZMod} 2)$，令一维子空间 $c = \operatorname{span}_{\operatorname{ZMod} 2}\{\mathbf{1}\}$，其中 $\mathbf{1} = (1, 1, 1, 1)$：

1. **自正交与总宇称检验**：在 $\operatorname{ZMod} 2$ 中，$\mathbf{1} \cdot \mathbf{1} = 1 + 1 + 1 + 1 = 4 \equiv 0 \pmod{2}$，零向量与自身及 $\mathbf{1}$ 的点积亦为 $0$，故 $c$ 自正交且含全 $1$ 向量；同时 $\dim_{\operatorname{ZMod} 2} c = 1$，满足 $2 \times 1 = 2 < 4 = n$。
2. **显式低重逻辑算子**：考察二元向量 $v = (1, 1, 0, 0)$。它与生成元 $\mathbf{1}$ 的点积为 $\mathbf{1} \cdot v = 1 + 1 + 0 + 0 = 2 \equiv 0 \pmod{2}$，故 $v \in c^\perp$；但 $c = \{(0,0,0,0), (1,1,1,1)\}$，显然 $v \notin c$。计算汉明重得 $\operatorname{wt}(v) = 2 < 4$，直接击穿距离 $4$ 的要求。

为精确陈述 $n \le 14$ 的一般结论，对齐源码模块 `BinaryCharacterCodeDuality` 与 `MajoranaFourteenModeDistanceFour` 中的形式定义：

- 在任意交换半环 $K$ 与有限指标集 $I$（`[Fintype I]`）上，**标准坐标双线性配对** `standardCoordinatePairing K I` 定义为逐分量点积 $\sum_{i \in I} x_i y_i$，子模 `space` 的**特征正交补** `characterOrthogonalComplement K space` 定义为关于该配对与 `space` 正交的子模（在 $K = \operatorname{ZMod} 2$ 上即 $\{v \mid \forall x \in c,\, x \cdot v = 0\}$）；
- 二元子模 $c : \operatorname{Submodule} (\operatorname{ZMod} 2) (\iota \to \operatorname{ZMod} 2)$ 满足**自正交谓词** `IsSelfOrthogonal c`，当且仅当对任意 $x \in c$ 与 $y \in c$ 均有 $x \cdot y = 0$；
- 向量 $v$ 的汉明重由 `hammingNorm v`（非零坐标个数）度量。

::: {.theorem #thm-appg-majorana-fourteen-bound title="十四模以内马约拉纳码的低重逻辑算子" lean="D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.result"}
对任意自然数 $n \le 14$ 及任意二元线性子空间 $c : \operatorname{Submodule} (\operatorname{ZMod} 2) (\operatorname{Fin} n \to \operatorname{ZMod} 2)$，若 $c$ 满足 `IsSelfOrthogonal c`、全一向量 $(\text{fun } \_ \Rightarrow 1) \in c$，且

$$
2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n,
$$

则存在 $v \in \operatorname{characterOrthogonalComplement} (\operatorname{ZMod} 2)\, c$，使得 $v \notin c$ 且 $\operatorname{hammingNorm}(v) < 4$。
:::

::: proof
设 $n \le 14$ 且子空间 $c$ 满足自正交、$(\text{fun } \_ \Rightarrow 1) \in c$ 与 $2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n$。由 $(\text{fun } \_ \Rightarrow 1) \in c$ 及自正交性可知 $(\text{fun } \_ \Rightarrow 1) \cdot (\text{fun } \_ \Rightarrow 1) = 0 \in \operatorname{ZMod} 2$，故 $n$ 必为偶数，且正交补中一切向量的汉明重均为偶数；结合维数不等式 $2 \dim c < n$ 可排除 $n = 0$ 与满秩自对偶边界 $\dim c = n/2$，将可能的参数 $(n, \dim c)$ 压缩到 $n \in \{4, 6, 8, 10, 12, 14\}$ 的有限列表。反证假设 $c^\perp \setminus c$ 中所有向量重均至少为 $4$（从而最小非零偶重至少为 $4$），源码结合坐标双线性对偶、重量分布约束与子码约化逐一排除 $n \le 14$ 下全部候选维数，证明必存在 $v \in c^\perp \setminus c$ 满足 $\operatorname{hammingNorm}(v) < 4$。完整证明由 Lean 内核检查。
:::

阅读 [@thm-appg-majorana-fourteen-bound] 时须严守两条边界：

1. **这是不可能定理（阻断定理），绝非存在性构造**：该定理证明在 $n \le 14$、自正交、含全 $1$ 向量且 $2\dim c < n$ 的整族二元编码中，**不存在**最小逻辑重至少为 $4$ 的编码（因为总会漏出重 $< 4$ 的非稳定子正交元；由偶重性可知其重实为 $2$）。严禁把标题或结论误读成“已在十四模内构造出距离为 $4$ 的马约拉纳码”。作为文献与手算对照（不计入本条冻结声明）：一旦跨过 $n = 14$ 来到下一个偶数模数 $n = 16$，一阶 Reed–Muller 码 $RM(1, 4) \subset \mathbb{F}_2^{16}$ 维数为 $5$（$2 \times 5 = 10 < 16$），含全 $1$ 向量且所有码字重属于 $\{0, 8, 16\}$ 因而自正交，其正交补 $RM(2, 4)$ 的最小非零汉明重恰为 $4$——这正是上界 $n \le 14$ 不可随意放宽的代数原因。
2. **离散二元代数与连续物理实现的边界**：定理前提中的 $(\text{fun } \_ \Rightarrow 1) \in c$ 与 $2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n$ 缺一不可（例如删去 $2\dim c < n$ 时，$n = 4, c = \operatorname{span}\{1100, 0011\}$ 满足 $c^\perp = c$，此时集合 $c^\perp \setminus c$ 为空）。同时，本结论纯属有限二元线性码定理，不自动给出连续时间费米子哈密顿动力学或实验硬件容错阈值。

---

## G.2 赤道态的 Wigner 距离张量规则 {#sec-appendix-g-2}

编码子空间刻画的是稳定子群的不变投影面；而在[第十六章 16.8 节](ch16-s08-finite-gate-polytopes.md)中，通用量子门之所以必须借助 $T$ 门冲出克利福德多面体，是因为纯克利福德演化无法凭空制造非稳定子“魔性（magic）”。在单量子比特与双量子比特层面上，如何用离散相空间上的 $\ell^1$ 几何精确度量一个量子态偏离稳定子凸包的距离？

我们严格对齐源码模块 `FiniteDimensional`、`PauliMatrix`、`BinaryStabilizerLocalInequivalence`、`DensitySpan`、`WignerDistanceMinimum` 与 `QubitWignerDistanceTensorRules` 中的对象定义：

- **单双比特矩阵与密度态谓词**：记 `QubitMatrix := Matrix (Fin 2) (Fin 2) ℂ`，`TwoQubitMatrix := Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ`。在任意有限维 $d$ 上，谓词 `IsDensity A` 定义为 `A.PosSemidef ∧ Matrix.trace A = 1`。标准泡利矩阵由 `pauliMatrix` 给出：$\mathrm{I} \mapsto I_2$，$\mathrm{X} \mapsto \bigl(\begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix}\bigr)$，$\mathrm{Z} \mapsto \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & -1 \end{smallmatrix}\bigr)$，$\mathrm{Y} \mapsto i X Z = \bigl(\begin{smallmatrix} 0 & -i \\ i & 0 \end{smallmatrix}\bigr)$；单比特布洛赫分量定义为 $\operatorname{bloch}(\rho, p) = \operatorname{Re}\operatorname{Tr}(\rho \cdot \operatorname{pauliMatrix}(p))$。
- **离散相点算子与 Wigner 准概率**：记单比特离散相空间 `PhasePoint := Fin 2 × Fin 2`。对每个相点 $a = (a_1, a_2) \in \{0, 1\}^2$，单比特相点核 `phasePoint a` 定义为

  $$
  A_{(a_1, a_2)} = \frac{1}{2}\Bigl(I_2 + (-1)^{a_2} X + (-1)^{a_1 + a_2} Y + (-1)^{a_1} Z\Bigr),
  $$

  双比特张量相点核定义为 `phasePointTwo (a, b) := phasePoint a ⊗ₖ phasePoint b`。对一般有限指标集 $\iota$（基数 $|\iota|$），离散 Wigner 映射定义为 `Wigner A ρ a := (ρ * A a).trace.re / Fintype.card ι`；特化到单比特（$|\iota| = 2$）与双比特（$|\iota| = 4$），即得 `WignerOne ρ : PhasePoint → ℝ` 与 `WignerTwo ρ : PhasePoint × PhasePoint → ℝ`。
- **稳定子自由多面体 `Wfree` 与 $\ell^1$ 距离 `COne`、`CTwo`**：记单比特带四相位泡利集 `pauliSet = {c • pauliMatrix p | c ∈ {1, -1, i, -i}}`，双比特泡利张量集 `pauliTwo = {c • (pauliMatrix p ⊗ₖ pauliMatrix q) | c ∈ {1, -1, i, -i}}`。集合 `Stab P` 收集所有由 $P$ 中某阶为 $|\iota|$ 的交换酉子群 $S$ 唯一固定（一维 $+1$ 共同特征子空间）的归一纯态秩一投影 $\psi\psi^\dagger$；自由准概率多面体定义为实凸包 `Wfree A P := convexHull ℝ (Wigner A '' Stab P)`。由此，单比特与双比特 Wigner $\ell^1$ 魔性距离分别定义为赋 $\ell^1$ 范数空间 `WithLp 1` 上的下确界距离：

  $$
  \begin{aligned}
  \operatorname{COne}(\rho) &:= \operatorname{infDist}_{\ell^1}\bigl(\operatorname{WignerOne}(\rho),\; \operatorname{Wfree}(\operatorname{phasePoint}, \operatorname{pauliSet})\bigr), \\
  \operatorname{CTwo}(\tilde{\rho}) &:= \operatorname{infDist}_{\ell^1}\bigl(\operatorname{WignerTwo}(\tilde{\rho}),\; \operatorname{Wfree}(\operatorname{phasePointTwo}, \operatorname{pauliTwo})\bigr).
  \end{aligned}
  $$

让我们拿布洛赫向量为 $(3/5, 4/5, 0)$ 的赤道纯态 $\rho_A$ 做一次彻底的手算检验。写出 $2\times 2$ 矩阵：

$$
\rho_A = \frac{1}{2}\left(I_2 + \frac{3}{5}X + \frac{4}{5}Y\right) = \begin{pmatrix} \frac{1}{2} & \frac{3}{10} - \frac{2}{5}i \\[4pt] \frac{3}{10} + \frac{2}{5}i & \frac{1}{2} \end{pmatrix}.
$$

代入公式 $W_1(\rho)(a_1, a_2) = \frac{1}{4}\bigl(1 + (-1)^{a_2} x + (-1)^{a_1 + a_2} y + (-1)^{a_1} z\bigr)$，依次列出四个相点上的实权重（按 $(0,0), (0,1), (1,0), (1,1)$ 排序）：

$$
\operatorname{WignerOne}(\rho_A) = \left(\frac{1 + 3/5 + 4/5}{4},\; \frac{1 - 3/5 - 4/5}{4},\; \frac{1 + 3/5 - 4/5}{4},\; \frac{1 - 3/5 + 4/5}{4}\right) = \left(\frac{3}{5},\; -\frac{1}{10},\; \frac{1}{5},\; \frac{3}{10}\right).
$$

注意一个极漂亮的凸几何事实：单比特 `Stab pauliSet` 恰由六个轴向纯态 $\lvert\pm X\rangle\langle\pm X\rvert, \lvert\pm Y\rangle\langle\pm Y\rvert, \lvert\pm Z\rangle\langle\pm Z\rvert$ 组成，其 `WignerOne` 像分别是四个坐标中恰有两个取 $\frac{1}{2}$、两个取 $0$ 的六条棱中点（例如 $\lvert +X\rangle\langle +X\rvert \mapsto (\frac{1}{2}, 0, \frac{1}{2}, 0)$，$\lvert +Y\rangle\langle +Y\rvert \mapsto (\frac{1}{2}, 0, 0, \frac{1}{2})$）。因此对任意自由分布 $q \in \operatorname{Wfree}(\operatorname{phasePoint}, \operatorname{pauliSet})$，必有 $0 \le q_a \le \frac{1}{2}$ 对全部四个相点 $a$ 成立！这立刻给出 $\ell^1$ 距离的平凡下界：

$$
\|\operatorname{WignerOne}(\rho_A) - q\|_1 \;\ge\; \left|\frac{3}{5} - q_{(0,0)}\right| + \left|-\frac{1}{10} - q_{(0,1)}\right| \;\ge\; \left(\frac{3}{5} - \frac{1}{2}\right) + \left(0 - \left(-\frac{1}{10}\right)\right) = \frac{1}{10} + \frac{1}{10} = \frac{1}{5}.
$$

反过来，取棱上凸组合 $q_* = \frac{2}{5} W_1(\lvert +X\rangle\langle +X\rvert) + \frac{3}{5} W_1(\lvert +Y\rangle\langle +Y\rvert) = (\frac{1}{2}, 0, \frac{1}{5}, \frac{3}{10}) \in \operatorname{Wfree}$，直接相减得 $\|\operatorname{WignerOne}(\rho_A) - q_*\|_1 = \frac{1}{10} + \frac{1}{10} + 0 + 0 = \frac{1}{5}$，故精确算出 $\operatorname{COne}(\rho_A) = \frac{1}{5}$！若将两个赤道态 $\rho_A \otimes \rho_A$ 张量复合，下面的定理断言无需在 $60$ 个双比特稳定子纯态在 $\mathbb{R}^{16}$ 中张成的多面体中重新盲搜：

$$
\operatorname{CTwo}(\rho_A \otimes \rho_A) = \frac{1}{5} + \frac{1}{5} + \frac{1}{5}\times\frac{1}{5} = \frac{11}{25}, \qquad \text{等价于}\quad 1 + \operatorname{CTwo}(\rho_A \otimes \rho_A) = \bigl(1 + \operatorname{COne}(\rho_A)\bigr)^2 = \frac{36}{25}.
$$

::: {.theorem #thm-appg-wigner-equatorial-tensor title="赤道态的 Wigner 距离张量规则" lean="D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.resultEquatorial"}
对任意单量子比特矩阵 $\rho, \sigma : \operatorname{QubitMatrix}$，若满足 `IsDensity ρ`、`IsDensity σ`，且两者的 $Z$ 轴布洛赫分量均为零：

$$
\operatorname{bloch}(\rho, \mathrm{Z}) = 0, \qquad \operatorname{bloch}(\sigma, \mathrm{Z}) = 0,
$$

则其克罗内克张量积的双比特 Wigner $\ell^1$ 距离精确满足

$$
\operatorname{CTwo}(\rho \otimes_k \sigma) = \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho) \cdot \operatorname{COne}(\sigma).
$$

:::

::: proof
设 $\rho, \sigma$ 为满足 $\operatorname{bloch}(\rho, \mathrm{Z}) = \operatorname{bloch}(\sigma, \mathrm{Z}) = 0$ 的单比特密度矩阵。首先证明普遍乘性上界：对 `Wfree` 中的任意单比特自由分布 $p, q$，张量积分布 $(a, b) \mapsto p_a q_b$ 落在乘积稳定子态凸包中，因而属于双比特 `Wfree phasePointTwo pauliTwo`；由三角不等式与归一化 $\|q\|_1 = 1$（自由顶点分布非负且和为 $1$），展开 $(w_\rho - p) \otimes q + w_\rho \otimes (w_\sigma - q)$ 并利用 $\|w_\rho\|_1 \le 1 + \operatorname{COne}(\rho)$，可得 $\operatorname{CTwo}(\rho \otimes_k \sigma) \le \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho)\operatorname{COne}(\sigma)$。反之，当 $\rho, \sigma$ 均位于赤道面（$z = 0$）时，借助 `WignerSimplexNearestEdge` 的最近棱投影刻画单比特达到 $\operatorname{COne}$ 的边缘分布与对偶符号向量 $\eta \in \{-1, +1\}^4$，证明张量积符号泛函 $\eta_\rho \otimes \eta_\sigma$ 在全部双比特稳定子纯态（含乘积稳定子态与纠缠稳定子态）上的配对值均不超过 $1$，从而给出匹配的 $\ell^1$ 对偶下界。完整证明由 Lean 内核检查。
:::

请留意 [@thm-appg-wigner-equatorial-tensor] 的两处精确适用边界：

1. **混态与纯态一并覆盖，但双赤道前提不可删去**：签名只要求 `IsDensity ρ`、`IsDensity σ` 与 $\operatorname{bloch}(\rho, \mathrm{Z}) = \operatorname{bloch}(\sigma, \mathrm{Z}) = 0$，**并未附加纯态假设**——球内赤道圆盘 $x^2 + y^2 < 1, z = 0$ 上的任意混态（包括落在赤道正方形 $|x| + |y| \le 1$ 内使 $\operatorname{COne} = 0$ 的自由混态）一律适用。但绝不可把该乘性等式外推到非赤道态，下一节紧接着给出脱离赤道后的严格反例。
2. **特定泛函边界**：`COne` 与 `CTwo` 是到指定相点核与泡利集生成的 `Wfree` 凸包的 $\ell^1$ 欧氏下确界距离，既不是矩阵迹距离，也不声称对任意量子信道具有无条件资源单调性；相点核 `phasePoint` 中 $(-1)^{a_2}$、$(-1)^{a_1 + a_2}$、$(-1)^{a_1}$ 的指数约定与 `IsDensity` 前提均不可更改。

---

## G.3 Wigner 张量缺额的单因子分解反例 {#sec-appendix-g-3}

既然双赤道态满足 $1 + \operatorname{CTwo}(\rho \otimes_k \sigma) = (1 + \operatorname{COne}(\rho))(1 + \operatorname{COne}(\sigma))$，一个非常自然的猜想随之浮现：若固定第一个因子 $\rho$ 仍在赤道上（$\operatorname{bloch}(\rho, \mathrm{Z}) = 0$ 且 $\operatorname{COne}(\rho) > 0$），而让第二个因子 $\sigma$ 走出赤道、进入布洛赫球严格正卦限 $\operatorname{bloch}(\sigma, \mathrm{X})\operatorname{bloch}(\sigma, \mathrm{Y})\operatorname{bloch}(\sigma, \mathrm{Z}) > 0$，两者偏离乘性律的**张量缺额（tensor deficit）**是否至少能按首因子魔性 $\operatorname{COne}(\rho)$ 线性拆开，写成 $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho)\, f(\sigma)$？

在源码模块 `QubitWignerDeficitFactorRefutation` 中，张量缺额 `deficit` 与待检验的单因子分解命题 `claim` 精确定义为：

$$
\operatorname{deficit}(\rho, \sigma) := \bigl(1 + \operatorname{COne}(\rho)\bigr)\bigl(1 + \operatorname{COne}(\sigma)\bigr) - 1 - \operatorname{CTwo}(\rho \otimes_k \sigma),
$$

以及存在性命题 `claim`：存在单个函数 $f : \operatorname{QubitMatrix} \to \mathbb{R}$，使得对一切满足 `IsDensity ρ`、$\operatorname{bloch}(\rho, \mathrm{Z}) = 0$、$0 < \operatorname{COne}(\rho)$、`IsDensity σ` 及 $0 < \operatorname{bloch}(\sigma, \mathrm{X})\cdot\operatorname{bloch}(\sigma, \mathrm{Y})\cdot\operatorname{bloch}(\sigma, \mathrm{Z})$ 的矩阵 $\rho, \sigma$，恒有 $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho)\cdot f(\sigma)$。

为什么这一猜想会破产？我们直接把源码中的三个有理系数 $2\times 2$ 见证矩阵摆上桌面手算核对：

1. **第一个赤道纯态 `rhoA`**：即上一节的 $\rho_A = \bigl(\begin{smallmatrix} 1/2 & 3/10 - 2i/5 \\ 3/10 + 2i/5 & 1/2 \end{smallmatrix}\bigr)$，布洛赫向量为 $(\frac{3}{5}, \frac{4}{5}, 0)$（满足 $(3/5)^2 + (4/5)^2 = 1$ 且 $z = 0$），前已算出 $\operatorname{WignerOne}(\rho_A) = (\frac{3}{5}, -\frac{1}{10}, \frac{1}{5}, \frac{3}{10})$ 且 $\operatorname{COne}(\rho_A) = \frac{1}{5} > 0$。
2. **第二个赤道纯态 `rhoB`**：由勾股数组 $(5, 12, 13)$ 构造

   $$
   \rho_B = \begin{pmatrix} \frac{1}{2} & \frac{5}{26} - \frac{6}{13}i \\[4pt] \frac{5}{26} + \frac{6}{13}i & \frac{1}{2} \end{pmatrix}, \qquad \text{布洛赫向量 } \left(\frac{5}{13},\; \frac{12}{13},\; 0\right).
   $$

   按相点公式算出 $\operatorname{WignerOne}(\rho_B) = (\frac{15}{26}, -\frac{1}{13}, \frac{3}{26}, \frac{5}{13})$。由完全相同的上下界夹逼——任意 $q \in \operatorname{Wfree}$ 满足 $q_{(0,0)} \le \frac{1}{2}$ 与 $q_{(0,1)} \ge 0$ 给出下界 $(\frac{15}{26} - \frac{13}{26}) + \frac{2}{26} = \frac{2}{13}$，而棱点 $\frac{3}{13} W_1(\lvert +X\rangle\langle +X\rvert) + \frac{10}{13} W_1(\lvert +Y\rangle\langle +Y\rvert) = (\frac{1}{2}, 0, \frac{3}{26}, \frac{5}{13})$ 达到该值——立即锁定 $\operatorname{COne}(\rho_B) = \frac{2}{13} > 0$。
3. **严格正卦限非赤道纯态 `sigma`**：由三维勾股四元组 $1^2 + 4^2 + 8^2 = 9^2$ 构造

   $$
   \sigma = \begin{pmatrix} \frac{17}{18} & \frac{1}{18} - \frac{2}{9}i \\[4pt] \frac{1}{18} + \frac{2}{9}i & \frac{1}{18} \end{pmatrix}, \qquad \text{布洛赫向量 } \left(\frac{1}{9},\; \frac{4}{9},\; \frac{8}{9}\right).
   $$

   显然 $\sigma$ 迹为 $1$、行列式为 $\frac{17}{324} - (\frac{1}{324} + \frac{16}{324}) = 0$，故 `IsDensity sigma` 成立，且三轴乘积 $\frac{1}{9}\times\frac{4}{9}\times\frac{8}{9} = \frac{32}{729} > 0$ 严格满足正卦限条件。列出其四相点权重得 $\operatorname{WignerOne}(\sigma) = (\frac{11}{18}, \frac{1}{3}, -\frac{1}{18}, \frac{1}{9})$；由 $\sum_a q_a = 1$ 与 $q_{(0,0)} \le \frac{1}{2}$ 得 $\|W_1(\sigma) - q\|_1 \ge 2(\frac{11}{18} - \frac{1}{2}) = \frac{2}{9}$，而正卦限面内自由分布 $\frac{2}{9} W_1(\lvert +Y\rangle\langle +Y\rvert) + \frac{7}{9} W_1(\lvert +Z\rangle\langle +Z\rvert) = (\frac{9}{18}, \frac{7}{18}, 0, \frac{2}{18})$ 精确达到 $\frac{2}{9}$，故 $\operatorname{COne}(\sigma) = \frac{2}{9}$。

看清破缺的几何根源只需对比 $\rho_A$ 与 $\rho_B$ 的相空间分布：在单比特第一象限赤道弧上，$\operatorname{COne}(\rho) = \frac{x + y - 1}{2}$ **只看见和坐标 $x + y$，对正交差坐标 $x - y$ 完全失明**；然而在双比特 `Stab pauliTwo` 中，除了 $36$ 个非负乘积稳定子顶点外，还包含诸如贝尔态 $\lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{4}(II + XX - YY + ZZ)$ 这类偶置换纠缠稳定子顶点——它们在 $16$ 个相点上有 $12$ 处取 $+\frac{1}{8}$、**另有 $4$ 处取负值 $-\frac{1}{8}$**！当 $\sigma$ 带有非零 $Z$ 分量时，混入纠缠稳定子顶点以抵消 $W_2(\rho \otimes_k \sigma)$ 负分量的最优凸组合会同时耦合 $\rho$ 的差坐标 $x - y$（在 $\rho_A$ 中为 $-\frac{1}{5}$，在 $\rho_B$ 中为 $-\frac{7}{13}$）。既然 $\operatorname{COne}(\rho_A) = \frac{1}{5} > 0$ 且 $\operatorname{COne}(\rho_B) = \frac{2}{13} > 0$ 均严格非零（教学上无需触碰除零总函数延拓），倘若真有通用函数 $f$ 满足 `claim`，则针对同一 $\sigma$ 必有

$$
\frac{\operatorname{deficit}(\rho_A, \sigma)}{\operatorname{COne}(\rho_A)} = f(\sigma) = \frac{\operatorname{deficit}(\rho_B, \sigma)}{\operatorname{COne}(\rho_B)}.
$$

源码证明该等式不成立，从而彻底否定 `claim`。

::: {.theorem #thm-appg-wigner-deficit-nonfactorization title="Wigner 张量缺额的单因子分解反例" lean="D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.result"}
记 $\operatorname{deficit}(\rho, \sigma) := (1 + \operatorname{COne}(\rho))(1 + \operatorname{COne}(\sigma)) - 1 - \operatorname{CTwo}(\rho \otimes_k \sigma)$。不存在函数 $f : \operatorname{QubitMatrix} \to \mathbb{R}$，使得对任意满足 `IsDensity ρ`、$\operatorname{bloch}(\rho, \mathrm{Z}) = 0$、$0 < \operatorname{COne}(\rho)$、`IsDensity σ` 以及

$$
0 < \operatorname{bloch}(\sigma, \mathrm{X}) \cdot \operatorname{bloch}(\sigma, \mathrm{Y}) \cdot \operatorname{bloch}(\sigma, \mathrm{Z})
$$

的单比特矩阵 $\rho, \sigma : \operatorname{QubitMatrix}$，恒有 $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho) \cdot f(\sigma)$（即源码中的 `¬ claim` 成立）。
:::

::: proof
采用反证法，假设存在满足 `claim` 的函数 $f : \operatorname{QubitMatrix} \to \mathbb{R}$。在源码中显式实例化上述三个有理系数单比特矩阵 `rhoA`、`rhoB` 与 `sigma`，逐项核验 `IsDensity rhoA`、`IsDensity rhoB`、`IsDensity sigma`、$\operatorname{bloch}(\rho_A, \mathrm{Z}) = \operatorname{bloch}(\rho_B, \mathrm{Z}) = 0$、$\operatorname{COne}(\rho_A) = 1/5 > 0$、$\operatorname{COne}(\rho_B) = 2/13 > 0$ 以及正卦限乘积条件 $\operatorname{bloch}(\sigma, \mathrm{X})\operatorname{bloch}(\sigma, \mathrm{Y})\operatorname{bloch}(\sigma, \mathrm{Z}) > 0$。将 $(\rho_A, \sigma)$ 与 $(\rho_B, \sigma)$ 分别代入 `claim` 的等式，消去 $f(\sigma)$ 后迫使 $\operatorname{deficit}(\rho_A, \sigma) / \operatorname{COne}(\rho_A) = \operatorname{deficit}(\rho_B, \sigma) / \operatorname{COne}(\rho_B)$。源码通过构造 `Wfree phasePointTwo pauliTwo` 中的显式有理凸组合（给出 $\operatorname{CTwo}$ 上界）与 $16$ 点双比特相空间上的 $\ell^\infty$ 分离超平面证书（给出 $\operatorname{CTwo}$ 下界），严格证出两处归一化缺额严格不等，导出矛盾。完整证明由 Lean 内核检查。
:::

此处同样必须守住逻辑量词边界：`¬ claim` 否定的是“存在一个对所列整族输入普遍适用的单变量因子函数 $f(\sigma)$”（$\neg\exists f\,\forall \rho, \sigma$），**绝不等于**断言“对所有输入均不存在局部比值”（事实上任意固定一对满足 $\operatorname{COne}(\rho) > 0$ 的具体 $(\rho, \sigma)$，平凡标量 $c = \operatorname{deficit}(\rho, \sigma)/\operatorname{COne}(\rho)$ 当然满足单点等式），更不否定 [@thm-appg-wigner-equatorial-tensor] 已经确立的双赤道精确张量律或更一般双变量非线性界的存在可能。

---

## G.4 十一维克利福德三阶矩的负期望反例 {#sec-appendix-g-4}

在偶维单量子比特（$d = 2$）中，我们已经看到离散相点核权重本身就会对纠缠稳定子态取负值；而在奇素数维 $d \ge 3$（如 $d = 3, 5, 7, 11$）的量子位（qudit）系统中，Gross 定理（文献背景，未在本节重复锁定）指出奇素数维稳定子态的离散 Wigner 函数恒非负。正是这一漂亮性质容易诱发一种“正性外推”，Zhu、Mao 与 Yi（2024）猜想 2 的逐点条款便是如此：在奇素数维多拷贝克利福德表示论（Schur–Weyl 对偶）中，张成三拷贝克利福德群换位子代数的**随机拉格朗日子空间置换算子** $R(d, n, T)$，在任意归一纯态的三重张量立方 $\lvert\Psi\rangle^{\otimes 3}$ 上的期望迹 $\kappa(d, n, \Psi, T)$，会不会对一切奇素数 $d$、一切模式数 $n$、一切归一态 $\Psi$ 与一切随机拉格朗日子空间 $T$ 都恒落在闭区间 $[0, 1]$ 内？

先精确对齐源码模块 `CliffordThirdMomentNegativity` 中的五个核心定义：

- **随机拉格朗日子空间 `IsStochasticLagrangian`**：对自然数 $d$ 与 $\operatorname{ZMod} d$-子模 $T \subseteq (\operatorname{Fin} 3 \to \operatorname{ZMod} d) \times (\operatorname{Fin} 3 \to \operatorname{ZMod} d)$，谓词 `IsStochasticLagrangian d T` 要求同时满足三条代数条件：
  1. 二次型迷向性：对任意 $p = (p_1, p_2) \in T$，$\sum_{k \in \operatorname{Fin} 3} p_1(k)^2 - \sum_{k \in \operatorname{Fin} 3} p_2(k)^2 = 0 \in \operatorname{ZMod} d$；
  2. 迷向维数极大性：$\operatorname{finrank}_{\operatorname{ZMod} d}(T) = 3$；
  3. 随机对角包含性：全一对角向量 $(\mathbf{1}, \mathbf{1}) = (\text{fun } \_ \Rightarrow 1,\, \text{fun } \_ \Rightarrow 1) \in T$。
- **子空间关联矩阵 `R d n T`**：在三拷贝 $n$ 模计算基 $(\operatorname{Fin} 3 \to \operatorname{Fin} n \to \operatorname{ZMod} d)$ 上，复矩阵 $R(d, n, T)$ 的 $(X, Y)$ 元定义为逐模指示乘积：

  $$
  R(d, n, T)_{X, Y} := \prod_{j \in \operatorname{Fin} n} \begin{cases} 1, & \text{若 } \bigl((k \mapsto X_{k, j}),\, (k \mapsto Y_{k, j})\bigr) \in T, \\ 0, & \text{否则。} \end{cases}
  $$

- **三拷贝态立方 `stateCube` 与三阶矩泛函 `kappa`**：对波函数 $\Psi : (\operatorname{Fin} n \to \operatorname{ZMod} d) \to \mathbb{C}$，定义矩阵 $(\operatorname{stateCube} \Psi)_{X, Y} := \prod_{k \in \operatorname{Fin} 3} \Psi(X_k)\,\overline{\Psi(Y_k)}$，以及 `[NeZero d]` 下的复数值迹：

  $$
  \kappa(d, n, \Psi, T) := \operatorname{Tr}\bigl(R(d, n, T) \cdot \operatorname{stateCube}(\Psi)\bigr) \in \mathbb{C}.
  $$

- **被证伪的逐点普遍界命题 `claim`**：在 `open scoped ComplexOrder` 作用域下（复数偏序 $z \le w$ 定义为 $\operatorname{Re}(z) \le \operatorname{Re}(w) \land \operatorname{Im}(z) = \operatorname{Im}(w)$，故 $0 \le \kappa \le 1$ **同时强制 $\operatorname{Im}(\kappa) = 0$ 与 $0 \le \operatorname{Re}(\kappa) \le 1$**），`claim` 断言：对一切素数 $d \neq 2$、一切 $n \in \mathbb{N}$、一切满足 $\sum_x \|\Psi(x)\|^2 = 1$ 的 $\Psi$ 及一切满足 `IsStochasticLagrangian d T` 的子模 $T$，均有 $0 \le \kappa(d, n, \Psi, T) \land \kappa(d, n, \Psi, T) \le 1$。

源码在奇素数维 $d = 11$、单模 $n = 1$ 上给出了一组完全显式的算术反例，我们可以逐项手算验证其前提：

1. **模 $11$ 随机正交矩阵 $O$ 与图子空间 $T$**：考察 $\operatorname{ZMod} 11$ 上的 $3\times 3$ 循环对称矩阵

   $$
   O = \begin{pmatrix} 7 & 8 & 8 \\ 8 & 7 & 8 \\ 8 & 8 & 7 \end{pmatrix} \in M_3(\operatorname{ZMod} 11).
   $$

   直接做模 $11$ 整数算术：
   - 行和检验：$7 + 8 + 8 = 23 = 2 \times 11 + 1 \equiv 1 \pmod{11}$，故 $O\mathbf{1} = \mathbf{1}$；
   - 对角平方和：$7^2 + 8^2 + 8^2 = 49 + 64 + 64 = 177 = 16 \times 11 + 1 \equiv 1 \pmod{11}$；
   - 非对角内积：$7 \times 8 + 8 \times 7 + 8 \times 8 = 56 + 56 + 64 = 176 = 16 \times 11 \equiv 0 \pmod{11}$。

   因此 $O^{\mathsf{T}} O = I_3 \pmod{11}$！令线性图像子空间 $T = \{(O y, y) \mid y \in (\operatorname{ZMod} 11)^3\}$（源码 `LinearMap.range graphMap`）：因投影 $(O y, y) \mapsto y$ 为单射左逆，$\operatorname{finrank}_{\operatorname{ZMod} 11}(T) = 3$；对任意 $(O y, y) \in T$，平方和之差为 $y^{\mathsf{T}}(O^{\mathsf{T}} O - I_3)y = 0 \in \operatorname{ZMod} 11$；取 $y = \mathbf{1}$ 即得 $(\mathbf{1}, \mathbf{1}) \in T$。故 `IsStochasticLagrangian 11 T` 精确成立！同时因 $O^{\mathsf{T}} = O$ 且 $O^2 = I_3$，$R(11, 1, T)$ 为实对称置换矩阵，$\kappa$ 虚部恒为 $0$。
2. **高斯整数归一见证态 `psi` 与精确负有理值**：源码取 $11$ 个高斯整数分量 $v : \operatorname{ZMod} 11 \to \mathbb{Z}[i]$ 依次为

   $$
   (-2,\; 0,\; -2i,\; 1 - 2i,\; -1 - i,\; 1 + 2i,\; -1 - 2i,\; -2,\; -2i,\; 2 - i,\; 1 - i),
   $$

   逐项求模平方和：

   $$
   \sum_{a = 0}^{10} |v(a)|^2 = 4 + 0 + 4 + 5 + 2 + 5 + 5 + 4 + 4 + 5 + 2 = 40.
   $$

   定义归一波函数 $\psi(x) = v(x_0) / \sqrt{40}$，则 $\sum_x \|\psi(x)\|^2 = 40 / 40 = 1$。在三阶矩求和中，分母恰为 $(\sqrt{40})^6 = 40^3 = 64000$，遍历 $(\operatorname{ZMod} 11)^3$ 共 $11^3 = 1331$ 项高斯整数三次乘积 $\prod_{k=0}^2 v(y_k)\overline{v((Oy)_k)}$ 求和得 $-1196$，从而

   $$
   \kappa(11, 1, \psi, T) = -\frac{1196}{64000} = -\frac{299}{16000} < 0,
   $$

   当场击穿 `ComplexOrder` 下的非负下界 $0 \le \kappa$！

::: {.theorem #thm-appg-clifford-third-moment-negative title="十一维克利福德三阶矩的负期望反例" lean="D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.result"}
在复数偏序 `ComplexOrder` 下，并非对一切素数 $d \neq 2$、一切自然数 $n$、一切满足 $\sum_x \|\Psi(x)\|^2 = 1$ 的态 $\Psi : (\operatorname{Fin} n \to \operatorname{ZMod} d) \to \mathbb{C}$ 以及一切满足 `IsStochasticLagrangian d T` 的子模 $T$，都有

$$
0 \le \kappa(d, n, \Psi, T) \;\land\; \kappa(d, n, \Psi, T) \le 1
$$

成立（即源码中的 `¬ claim` 成立）。
:::

::: proof
假设普遍逐点界 `claim` 成立，将其特化到素数 $d = 11$（满足 `Nat.Prime 11` 与 $11 \neq 2$）、模式数 $n = 1$、由模 $11$ 正交随机矩阵 $O = \left(\begin{smallmatrix} 7 & 8 & 8 \\ 8 & 7 & 8 \\ 8 & 8 & 7 \end{smallmatrix}\right)$ 的图像生成的三维子模 $T = \operatorname{range}(\operatorname{graphMap})$，以及高斯整数向量除以 $\sqrt{40}$ 构成的归一态 $\psi$。源码首先验证 $O^{\mathsf{T}} O = I_3$、$O\mathbf{1} = \mathbf{1}$ 与 $\operatorname{finrank}_{\operatorname{ZMod} 11}(T) = 3$，证出 `IsStochasticLagrangian 11 T`；接着验证 $\sum_x \|\psi(x)\|^2 = 1$，并将有限矩阵迹 $\kappa(11, 1, \psi, T)$ 显式归约为复数标量 $-1196 / 64000$。在 `ComplexOrder` 下，$0 \le \kappa$ 要求实部非负，而 $-1196 / 64000 < 0$，导出矛盾。完整证明由 Lean 内核检查。
:::

对 [@thm-appg-clifford-third-moment-negative] 必须明确三点认识论节制：

1. **不能擅自抹去 `ComplexOrder`**：$\kappa$ 的返回类型是 $\mathbb{C}$ 而非 $\mathbb{R}$，原声明中的 $0 \le \kappa \le 1$ 使用 `ComplexOrder` 同时约束实部与虚部，阐述定理本身时不得私自把 $\kappa$ 改写为 $\operatorname{Re}(\kappa)$。
2. **$d = 11$ 是存在性反例，不声称最小维数**：定理用 $d = 11, n = 1$ 的显式见证否定了“对一切奇素数维恒非负”的全称命题，**并未声称** $d = 11$ 是出现负三阶矩的最小奇素数维，也未断言所有维数或所有拉格朗日子空间都取负值。
3. **区分三阶矩负值与 Wigner 准概率负值，且不越界否定聚合不等式**：在奇素数维 $d = 11$ 中，单拷贝离散相点算子与稳定子态 Wigner 分布的结构同三拷贝随机拉格朗日置换算子 $R(d, n, T)$ 属于不同阶的表示论对象；逐点 $0 \le \kappa \le 1$ 的破缺更不自动推翻对全体拉格朗日子空间求和或加权后的聚合魔性单调量不等式。

---

## G.5 三设置转向的椭球中心尖锐阈值 {#sec-appendix-g-5}

前四节分别从二元奇偶编码、单双比特相空间 $\ell^1$ 多面体与高维三拷贝换位子追踪了非经典资源的代数边界；最后一节回到[第十三章](ch13-entanglement-and-chsh.md)的双量子比特关联空间，考察介于“可分态”与“贝尔非定域违背”之间的中间层级——**爱因斯坦—波多尔斯基—罗森（EPR）量子转向（quantum steering）**。

当 Alice 与 Bob 共享双量子比特态 $\rho$ 时，Alice 对自己手中的比特施加各种射影测量，会在 Bob 的布洛赫球内诱导出一个条件态集合——**转向椭球（steering ellipsoid）** $\mathcal{E}_{B|A}$。几何直觉告诉我们：如果椭球中心 $\vec{c}_B$ 紧挨球心（$t = \|\vec{c}_B\|$ 很小）且椭球本身足够饱满，Bob 沿三条两两正交轴做自旋测量就能侦测到任何局域隐态（LHS）模型都无法仿造的转向关联；反之，如果椭球中心被推向布洛赫球面边缘（$t$ 接近 $1$），球壳曲率会把椭球半径挤压得扁薄狭小，直至彻底丧失三设置转向违背能力。问题在于：**中心长度 $t = \|\vec{c}_B\|$ 的精确生死分水岭究竟落在哪里？**

我们严格对齐源码模块 `SteeringEllipsoidFullyEntangledFraction`、`PauliThreeWeightBayesianInverseUniqueness` 与 `SteeringEllipsoidFThreeThreshold` 中的全部对象定义：

- **双比特局部布洛赫向量与关联张量**：记 `TwoQubit := Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ`，三轴泡利矩阵族 `pauli : Fin 3 → Matrix (Fin 2) (Fin 2) ℂ` 依次取 $(X, Y, Z)$，三维欧氏向量模长记为 $\operatorname{vlen}(v) := \sqrt{\sum_{i \in \operatorname{Fin} 3} v_i^2}$。对任意 $\rho : \operatorname{TwoQubit}$，定义局部边缘向量与关联矩阵：

  $$
  \begin{aligned}
  \operatorname{blochA}(\rho)_i &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (\operatorname{pauli}_i \otimes_k I_2)\bigr), \\
  \operatorname{blochB}(\rho)_j &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (I_2 \otimes_k \operatorname{pauli}_j)\bigr), \\
  \operatorname{corr}(\rho)_{i, j} &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (\operatorname{pauli}_i \otimes_k \operatorname{pauli}_j)\bigr).
  \end{aligned}
  $$

- **含纯边缘显式分支的椭球中心 `centreB`**：为避免 Alice 约化态为纯态（$\operatorname{vlen}(\operatorname{blochA}(\rho)) = 1$）时分母 $1 - \|\vec{a}\|^2 = 0$ 退化为 Lean 的除零总函数值 `0`，源码显式分两支定义 Bob 端转向椭球中心 `centreB ρ : Fin 3 → ℝ`：

  $$
  \operatorname{centreB}(\rho) := \begin{cases}
  \operatorname{blochB}(\rho), & \text{若 } \operatorname{vlen}(\operatorname{blochA}(\rho)) = 1, \\[6pt]
  \displaystyle j \mapsto \frac{\operatorname{blochB}(\rho)_j - \sum_{i \in \operatorname{Fin} 3} \operatorname{corr}(\rho)_{i, j}\,\operatorname{blochA}(\rho)_i}{1 - \operatorname{vlen}(\operatorname{blochA}(\rho))^2}, & \text{若 } \operatorname{vlen}(\operatorname{blochA}(\rho)) \neq 1.
  \end{cases}
  $$

- **三设置转向集合 `fThreeValues` 与上确界 `fThree`**：对三维实向量 $r : \operatorname{Fin} 3 \to \mathbb{R}$，记自旋算子 $\operatorname{spin}(r) := r_0 X + r_1 Y + r_2 Z$。定义可达读数集合：

  $$
  \operatorname{fThreeValues}(\rho) := \left\{\, r \in \mathbb{R} \;\middle|\; \begin{aligned}
  &\exists \alpha, \beta : \operatorname{Fin} 3 \to \operatorname{Fin} 3 \to \mathbb{R}, \\
  &(\forall i,\, \operatorname{vlen}(\alpha_i) = 1) \;\land\; (\forall i, j,\, \beta_i \cdot \beta_j = \delta_{i j}) \;\land \\
  &r = \frac{\left\|\sum_{i \in \operatorname{Fin} 3} \operatorname{Tr}\bigl(\rho \cdot (\operatorname{spin}(\alpha_i) \otimes_k \operatorname{spin}(\beta_i))\bigr)\right\|}{\sqrt{3}}
  \end{aligned} \,\right\},
  $$

  并定义三设置转向参数 $\operatorname{fThree}(\rho) := \operatorname{sSup}(\operatorname{fThreeValues}(\rho))$（注意 Alice 的三个方向 $\alpha_i$ 仅要求各自为单位向量，而 Bob 的三个方向 $\beta_i$ 要求构成标准正交三脚架；当 $\operatorname{fThree}(\rho) > 1$ 时即违背三正交设置局域隐态界）。

先手算三个锚点状态，看清公式中每一项的物理与形式角色：

1. **最大纠缠贝尔态 $\rho_{\Phi^+} = \lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{4}(II + XX - YY + ZZ)$**：此时 $\operatorname{blochA} = \operatorname{blochB} = (0, 0, 0)$，走第二分支得 $\operatorname{centreB}(\rho_{\Phi^+}) = (0, 0, 0)$，中心长度 $t = 0$。关联矩阵为 $\operatorname{diag}(1, -1, 1)$；取 $\beta = (e_1, e_2, e_3)$、$\alpha = (e_1, -e_2, e_3)$，得 $r = |1 + 1 + 1|/\sqrt{3} = \sqrt{3}$，恰好贴合 $t = 0$ 时的统一上界 $\max(\sqrt{3(1 - 0)}, 1) = \sqrt{3}$，故 $\operatorname{fThree}(\rho_{\Phi^+}) = \sqrt{3} > 1$。
2. **纯乘积态 $\rho_{00} = \lvert 00\rangle\langle 00\rvert$（检验 `vlen = 1` 分支与 `, 1` 保底项）**：此时 $\operatorname{blochA}(\rho_{00}) = (0, 0, 1)$，模长恰为 $1$，显式触发第一分支给出 $\operatorname{centreB}(\rho_{00}) = \operatorname{blochB}(\rho_{00}) = (0, 0, 1)$，即 $t = 1$。尽管 $\sqrt{3(1 - 1)} = 0$，但若令 Alice 三个单位向量全取 $\alpha_i = (0, 0, 1)$（允许重合！），并令 Bob 的标准正交三脚架对称倾斜使每个 $\beta_i$ 的 $Z$ 分量均等于 $1/\sqrt{3}$，则 $r = \frac{1}{\sqrt{3}}(\frac{1}{\sqrt{3}} + \frac{1}{\sqrt{3}} + \frac{1}{\sqrt{3}}) = 1$！这直观解释了为什么统一上界必须写成 $\max(\sqrt{3(1 - t)}, 1)$ 而非单纯的 $\sqrt{3(1 - t)}$。
3. **尖锐阈值 $t = \frac{2}{3}$ 与混态反例 $\rho_{\mathrm{mix}} = \frac{1}{4} I_4$**：令两支上界相等：

   $$
   \sqrt{3(1 - t)} = 1 \;\Longleftrightarrow\; 3(1 - t) = 1 \;\Longleftrightarrow\; t = \frac{2}{3}.
   $$

   一旦 $t \ge \frac{2}{3}$，统一上界恒收缩为 $\max(\sqrt{3(1 - t)}, 1) = 1$，任何双比特密度态都不可能再产生 $\operatorname{fThree}(\rho) > 1$。反过来，最大混态 $\rho_{\mathrm{mix}} = \frac{1}{4} I_4$ 同样满足 $t = 0 < \frac{2}{3}$，却给出 $\operatorname{fThree}(\rho_{\mathrm{mix}}) = 0 \le 1$——说明 $t < \frac{2}{3}$ 只是能够出现三设置转向违背的**中心长度范围（每个 $t \in [0, 2/3)$ 上均存在违背态）**，绝非每个满足 $t < \frac{2}{3}$ 的态都自动违背！

::: {.theorem #thm-appg-steering-fthree-threshold title="三设置转向的椭球中心尖锐阈值" lean="D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.result"}
双量子比特三设置转向参数 $\operatorname{fThree}$ 与椭球中心长度 $\operatorname{vlen}(\operatorname{centreB}(\rho))$ 满足以下两条精确性质：

1. **普遍椭球中心上界**：对任意双量子比特矩阵 $\rho : \operatorname{TwoQubit}$，若 $\rho.\operatorname{PosSemidef}$ 且 $\operatorname{Tr}(\rho) = 1$，则

   $$
   \operatorname{fThree}(\rho) \le \max\!\left(\sqrt{3\bigl(1 - \operatorname{vlen}(\operatorname{centreB}(\rho))\bigr)},\; 1\right).
   $$

2. **阈值 $2/3$ 的逐点可达尖锐性**：对任意实数 $t \in \mathbb{R}$，若 $0 \le t < \frac{2}{3}$，则存在双量子比特矩阵 $\rho : \operatorname{TwoQubit}$，使得

   $$
   \rho.\operatorname{PosSemidef} \;\land\; \operatorname{Tr}(\rho) = 1 \;\land\; \operatorname{vlen}\bigl(\operatorname{centreB}(\rho)\bigr) = t \;\land\; 1 < \operatorname{fThree}(\rho).
   $$

:::

::: proof
定理分为普遍上界与尖锐性见证两部分。第一部分：对满足半正定与迹一条件的双比特密度态 $\rho$，证明首先验证 `fThreeValues ρ` 非空且有上界（保证实数上确界 `sSup` 行为良定）。当 $\operatorname{vlen}(\operatorname{blochA}(\rho)) = 1$ 时，利用双比特密度态纯边缘分解确定关联张量退化为乘积形式，由单位向量点积与正交三脚架的柯西—施瓦茨不等式证得 $\operatorname{fThree}(\rho) \le 1 \le \max(\dots, 1)$；当 $\operatorname{vlen}(\operatorname{blochA}(\rho)) < 1$ 时，调用 `SteeringEllipsoidCHSH` 中的自旋翻转纯度恒等式 `flip_purity_identity`、椭球半径界 `bob_radius_le` 与 `delta_le_centre`，将任意正交三脚架上的三设置关联和控制在 $\max(\sqrt{3(1 - \operatorname{vlen}(\operatorname{centreB}(\rho)))}, 1)$ 以内。第二部分：对任意 $0 \le t < 2/3$，调用紧致见证态族 `tightState`（及其半正定性 `tight_psd`、迹一性与精确中心长度 `tight_centre`），在该参数区间上显式给出对称正交三脚架读数 `tight_readouts`，使输出值达到 $\sqrt{3(1 - t)} > \sqrt{3(1 - 2/3)} = 1$，从而证得 $1 < \operatorname{fThree}(\rho)$。完整证明由 Lean 内核检查。
:::

总函数与物理解释边界同样清楚：条件实数上确界 `sSup` 与平方根 `Real.sqrt`（在 Lean 中对负输入取默认值 `0`）仅在满足 `PosSemidef` 与 `trace ρ = 1` 的密度态集合上承载转向测量语义，不能外推至非半正定或非迹一算子；此外，$F_3 > 1$ 专门刻画 Bob 端三正交投影测量下的线性转向不等式违背，**不等同于**无穷多测量设置下的全部单向转向判据或一般贝尔非定域性。

---

## G.6 正向定律、精确反例与认识论边界总表 {#sec-appendix-g-6}

回望 G.1 至 G.5 五节，我们看到了一幅极具张力的有限维几何图景：在稳定子多面体与局域隐态模型的外部，既有像**双赤道张量乘性律**（[@thm-appg-wigner-equatorial-tensor]）和**双比特椭球中心 $2/3$ 尖锐转向阈值**（[@thm-appg-steering-fthree-threshold]）这样严丝合缝的精确正向定律，也潜伏着三条专门击碎朴素直觉外推的精确阻断与反例——**十四模以内自正交宇称二元码必漏出重 $< 4$ 的逻辑算子**（[@thm-appg-majorana-fourteen-bound]）、**离开赤道后张量缺额拒绝单因子普遍分解**（[@thm-appg-wigner-deficit-nonfactorization]），以及**奇素数维 $d = 11$ 克利福德三阶矩可以严格跌破零线**（[@thm-appg-clifford-third-moment-negative]）。

下表逐条汇总本附录五项内核验证定理的精确前提、正向或反向结论及不可逾越的认识论边界，供跨章核查（切记：五种量分属二元线性码、单双比特离散 Wigner 凸几何、奇素数维三拷贝表示论与双比特条件椭球几何，彼此之间**未声明**任何等价或单调互推关系）：

| 节次与定理环境 | 冻结 Lean 声明（`LEAN ✓`） | 定理性质 | 核心前提与作用对象 | 已验证的精确结论 | 严禁越界的认识论红线 |
| :--- | :--- | :---: | :--- | :--- | :--- |
| G.1 [@thm-appg-majorana-fourteen-bound] | [`MajoranaFourteenModeDistanceFour.result`](lean:D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.result) | 阻断上限 | $n \le 14$，二元子模 $c \subseteq \mathbb{F}_2^n$ 自正交、含全 $1$ 向量且 $2\dim c < n$ | 必存在 $v \in c^\perp \setminus c$ 使 $\operatorname{hammingNorm}(v) < 4$ | 排除该族编码达到距离 $\ge 4$，绝非构造十四模距离 $4$ 码；不自动给连续动力学或硬件容错率 |
| G.2 [@thm-appg-wigner-equatorial-tensor] | [`QubitWignerDistanceTensorRules.resultEquatorial`](lean:D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.resultEquatorial) | 正向等式 | 单比特 `IsDensity ρ`、`IsDensity σ`，且 $\operatorname{bloch}(\rho,\mathrm{Z}) = \operatorname{bloch}(\sigma,\mathrm{Z}) = 0$ | $\operatorname{CTwo}(\rho \otimes_k \sigma) = \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho)\operatorname{COne}(\sigma)$ | 涵盖赤道纯态与混态（勿暗加纯态条件），但严禁推广到非赤道态或任意量子资源度量 |
| G.3 [@thm-appg-wigner-deficit-nonfactorization] | [`QubitWignerDeficitFactorRefutation.result`](lean:D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.result) | 存在反例（`¬ claim`） | 赤道密度态 $\rho$（$\operatorname{COne}(\rho) > 0$）与正卦限密度态 $\sigma$（$xyz > 0$） | 不存在通用函数 $f$ 使 $\operatorname{deficit}(\rho,\sigma) = \operatorname{COne}(\rho)f(\sigma)$ | 仅否定普遍单因子分解公式，不否定固定单点比值或一般双变量张量规则 |
| G.4 [@thm-appg-clifford-third-moment-negative] | [`CliffordThirdMomentNegativity.result`](lean:D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.result) | 全称反例（`¬ claim`） | 奇素数 $d \neq 2$、归一态 $\Psi$、随机拉格朗日子空间 $T$（见证取 $d=11, n=1$） | 否定 `ComplexOrder` 下普遍逐点界 $0 \le \kappa \le 1$（见证 $\kappa = -1196/64000 < 0$） | 保留复数 `ComplexOrder`；$d=11$ 不声称为最小反例维数；不混淆于 Wigner 负性或聚合界 |
| G.5 [@thm-appg-steering-fthree-threshold] | [`SteeringEllipsoidFThreeThreshold.result`](lean:D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.result) | 上界 + 尖锐阈值 | 双比特半正定迹一矩阵 $\rho$；`centreB` 含 `vlen(blochA)=1` 显式分支 | $\operatorname{fThree}(\rho) \le \max(\sqrt{3(1-t)}, 1)$，且对每个 $0 \le t < 2/3$ 存在违背态 $\operatorname{fThree} > 1$ | 严禁说所有 $t < 2/3$ 的态均违背（如 $\frac{1}{4}I_4$ 有 $t=0, F_3=0$），也不等同全部非局域性 |
