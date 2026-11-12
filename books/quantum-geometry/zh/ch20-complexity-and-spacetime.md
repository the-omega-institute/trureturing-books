# 门复杂度即体积：黑洞内部生长、虫洞桥与计算复杂性边界

> *“P/NP 跟初始结构相关，有的初始结构可以推出 P=NP 处理无穷问题的本质就是进行因式分解，看如何把无穷 “约掉 ” ，本质不断的用已知关于无穷的结论构造，约 P/NP 跟查表算法，顺序，记忆顺序有关，全部用量子门计数最核心的问题其实是证明一个命题的通用方式”*

在[上一章](ch19-tensor-networks-and-holography.md)中，我们证明了宽度三桥图在二次锥域内的量子最大流等于最小割容量 $\min(ad, bc)$（[@thm-bridge-quantum-maxflow-mincut]），并在对数容量坐标下看到了仿射多面体分片如何沿瓶颈接缝 $ad = bc$ 拼接。现在，作为第五部“时空之球”的收官之章，我们将面对一个在当代量子引力与理论计算机科学交界处最激动人心、也最容易滋生概念混淆的问题：**当一个多体系统的纠缠熵已经撞上最小割天花板（达到热平衡饱和）之后，量子演化还在继续积累什么几何量？用“量子门计数”与“并行电路深度”去丈量演化成本时，哪些结论已经由 Lean 内核铁板钉钉地证出，哪些假说依然是悬而未决的开放猜想？**

在进入正文之前，我们必须对章首题记作一次最诚实的认识论界定：题记忠实保留了作者原始手稿中关于“初始结构、查表顺序与量子门计数”的直觉思考原声，但它只是一段启发性的哲学题记，**绝不构成对 $\mathrm{P} = \mathrm{NP}$ 的数学证明**。在本章中，我们将严格执行三层认识论分级：

1. **第一层（绿色 `LEAN ✓`）**：我们完整证明四条冻结定理——开放边界可积量子电路族的精确最小并行深度公式 $\operatorname{minDepth}(N, \kappa) = \lfloor N/(\kappa + 1)\rfloor + 1$（[@thm-open-circuit-min-depth]）、对两条文献深度猜想公式的显式反例证伪（[@lemma-open-circuit-depth-refutation]）、$2n$ 比特反射对称对角酉算子在 $\{\mathrm{CNOT}, R_z\}$ 门集下的指数级 CNOT 下界 $2^{2n-1} + 2n - 2$（[@prop-reflection-cnot-lower-bound]），以及二分偶圈图上典范闭合遍历的精确步长 $2(n+2)$（[@cor-even-cycle-length]）；
2. **第二层（文献注记）**：在 [@rem-complexity-growth-literature] 与 [@rem-computational-model-literature] 中澄清态复杂度定义、Nielsen 几何、热化后线性增长叙述的时间窗，以及统一图灵机模型与预存查表成本的核算规则；
3. **第三层（红色 `OPEN`）**：将全息物理与计算复杂性理论中的三大核心未解问题——**复杂度等于体积（CV）**（[@conj-complexity-equals-volume]）、**$\mathrm{ER}=\mathrm{EPR}$**（[@conj-er-equals-epr]）与 **$\mathrm{P}\neq\mathrm{NP}$**（[@conj-p-neq-np]）——严格标记为不带 `lean` 属性的开放猜想。

::: {.figure src="ch20-overview"}
**图 20。** 本章地图：第 I 栏，玩具示意曲线——青色的 $S(t) = \min(2t, 4)$ 在 $t = 2$ 撞上灰色虚线 $4$ 后横着走，品红的 $C(t) = 2t$ 继续上升；第 II 栏，两比特电路里导线 1 的标签经第一个 $\mathrm{CNOT}$ 从青色的 $z_1$ 变成品红的偶标签 $z_0 \oplus z_1$（诞生），$R_z$ 在它上面注入相位，再经第二个 $\mathrm{CNOT}$ 回到 $z_1$（复原），共 $2$ 个 $\mathrm{CNOT}$，绿色标签是 CNOT 下界（[@prop-reflection-cnot-lower-bound]）；第 III 栏，青色的 P 套在 NP 里，两者之间红色的问号是开放的 $\mathrm{P}\neq\mathrm{NP}$（[@conj-p-neq-np]）。
:::

## 门计数、并行深度与增长模型 {#sec-circuit-depth-growth}

当我们谈论一段量子电路有多“复杂”时，第一件必须做好的基本功，就是把四个经常被混为一谈的量严格拆开：**总门数**（gate count，电路列表中基本门的总个数）、**并行深度**（parallel depth，互不重叠门合并到同一时间层后所需的最少层数）、**连续几何测地线长度**（Nielsen 复杂度）以及实验室时钟走过的**物理时间 $t$**。

让我们先看一个在 Lean 模块 `D5.S3.Quantum.Dynamics.OpenIntegrableCircuitMinDepth` 中被彻底算穿的并行深度问题。考察一条含 $N$ 个格点 $\{1, 2, \dots, N\}$ 的一维开放边界自旋链，电路的基本门字母表 `Gate` 包含三类局域算子：

- 双格点最近邻内部门 $\operatorname{Gate.U}(j)$，作用于相邻格点对 $\{j, j+1\}$（$1 \le j \le N - 1$）；
- 右边界单格点门 $\operatorname{Gate.K1}$，仅作用于格点 $\{1\}$；
- 左边界单格点门 $\operatorname{Gate.KN}$，仅作用于格点 $\{N\}$。

对于携带负谱参数 $-\kappa$ 的 $\kappa$ 个格点组成的任意配置子集 $S \subseteq \{1, \dots, N\}$（$|S| = \kappa$），模块定义了反射杨—巴克斯特（Yang–Baxter）传递矩阵对应的有序门序列 `circuit N S`。若存在层分配映射 $f : \mathbb{N} \to \{0, 1, \dots, L-1\}$，使得列表中任意两个支撑格点集有交集（即共用至少一个格点）的门都严格保持原有的先后层序（$i < j \implies f(i) < f(j)$），则称该门列表可在 $L$ 层内并行运行（`RunsIn N w L`）。单个电路 $w$ 的深度 $\operatorname{depth}(N, w)$ 是其可运行的最小层数 $L$，而固定 $(N, \kappa)$ 下的**配置最优最小并行深度** `minDepth` 则定义为遍历所有 $|S| = \kappa$ 配置的下确界：

$$
\operatorname{minDepth}(N, \kappa) = \inf\bigl\{\, \operatorname{depth}\bigl(N, \operatorname{circuit}(N, S)\bigr) \;\big|\; S \subseteq \{1, \dots, N\},\; |S| = \kappa \,\bigr\}.
$$

通过把不共用格点的内部门与边界门并行打包，下面的定理给出了 $\operatorname{minDepth}(N, \kappa)$ 的精确闭式解。

::: {.figure src="ch20-turning-points"}
**折返点把门链切成 $\kappa + 1$ 段，每段里的门各占一层。** $N = 11$、$S = \{4, 8\}$：$12$ 道门是 $12$ 块青色的砖，排成三段向右下降的台阶，每段 $4$ 块；灰色箭头从先执行的门指向后执行的门，品红三角标出折返点 $U_4$、$U_8$。门数是 $12$，层数只有 $4 = \lfloor 11/3\rfloor + 1$（[@thm-open-circuit-min-depth]）。
:::

::: {.theorem #thm-open-circuit-min-depth title="开放边界电路的最小深度" lean="D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result"}
设自然数 $N, \kappa \in \mathbb{N}$ 满足 $1 \le \kappa$ 且 $2\kappa \le N$。则开放边界可积电路族的配置最小并行深度为

$$
\operatorname{minDepth}(N, \kappa) = N / (\kappa + 1) + 1,
$$

其中 $N / (\kappa + 1)$ 表示自然数整除（即向下取整 $\lfloor N / (\kappa + 1)\rfloor$）。
:::

::: proof
在源码 [`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result) 中，$\operatorname{circuit}(N, S)$ 的全部 $N + 1$ 道门（即 $k = 0$ 处的右边界门 $\operatorname{K1}$、$1 \le k \le N - 1$ 处的内部双格点门 $\operatorname{U}(k)$ 以及 $k = N$ 处的左边界门 $\operatorname{KN}$）通过映射 $\operatorname{pathGate}(N, k)$ 统一编码为下标集合 $\{0, 1, \dots, N\}$，并按列表 $\operatorname{pathOrder}(N, S)$（先将 $k \notin S$ 的下标按递减排列，再将 $k \in S$ 的下标按递增排列）依次执行（`circuit_eq_pathOrder`）。由于相邻下标 $k$ 与 $k + 1$（$0 \le k < N$）对应的两道门必共用格点 $k + 1$（`adjacent_overlap`），列表在 $L$ 层内可并行运行（`RunsIn N (circuit N S) L`）当且仅当存在单链层分配函数 $g : \{0, \dots, N\} \to \{0, \dots, L - 1\}$，使得对每个跃迁步 $0 \le k < N$：当 $k + 1 \in S$ 时满足正向递增 $g(k) < g(k + 1)$，当 $k + 1 \notin S$ 时满足反向递减 $g(k + 1) < g(k)$（`runsIn_iff_pathLayers`）。

据此，下界与上界分两步锁死：

1. **严格不等式与整除下界（`pathLayers_lower` 与 `depth_lower`）**：对 $n \in \{0, \dots, N\}$ 归纳证明层序守恒不等式

$$
n + g(n) \le \bigl|S \cap \{1, \dots, n\}\bigr| \cdot L + g(0).
$$

（当 $n + 1 \notin S$ 时，由 $g(n + 1) < g(n)$ 得 $g(n + 1) + 1 \le g(n)$，右端不变；当 $n + 1 \in S$ 时，由 $g(n + 1) < L$ 得 $g(n + 1) + 1 \le L + g(n)$，右端随 $|S \cap \{1, \dots, n+1\}|$ 增加 $1$ 而恰好增加 $L$。）取 $n = N$，代入 $|S| = \kappa$、$g(N) \ge 0$ 以及 $g(0) < L$，立得严格不等式

$$
N \le N + g(N) \le \kappa L + g(0) < \kappa L + L = (\kappa + 1)L.
$$

直观而言，$N + 1$ 道门之间的 $N$ 步相邻因果依赖被 $\kappa$ 个属于 $S$ 的折返点切分为 $\kappa + 1$ 段单调因果切片，故必有一段切片至少跨越 $\lfloor N / (\kappa + 1)\rfloor + 1$ 个串行层；由自然数整除性 $N < (\kappa + 1)L$ 直接推出 $L \ge \lfloor N / (\kappa + 1)\rfloor + 1$。

2. **递归分割的显式上界构造（`exists_pathLayers` 与 `minDepth_upper`）**：固定 $q = \lfloor N / (\kappa + 1)\rfloor$，源码在 `exists_pathLayers` 中对剩余分割点数 $k$（及当前剩余前缀长度 $n$，满足 $2k \le n \le (k + 1)q + k$）作递归构造：当 $k = 0$ 时取 $S = \emptyset$ 与单调层函数 $g(i) = n - i < q + 1$；当 $k = j + 1$ 时，令当前步跨度为

$$
d = \min(q,\, n - 2j - 1), \qquad M = n - d - 1,
$$

先对前缀长度 $M$ 与剩余分割数 $j$ 递归取得 $(S_0, g_0)$（满足 $g_0(M) = 0$），再将分割点 $M + 1$ 并入 $S_0$（即 $S = S_0 \cup \{M + 1\}$），并定义分段层函数 $g(i) = g_0(i)$（当 $i \le M$）与 $g(i) = n - i \le d \le q$（当 $i > M$）。（例如当 $N = 5, \kappa = 2, q = 1$ 时：外层 $j = 1, n = 5$ 取 $d = \min(1, 5 - 2 - 1) = 1, M = 3$ 并插入分割点 $M + 1 = 4$；内层 $j = 0, n = 3$ 取 $d = \min(1, 3 - 0 - 1) = 1, M = 1$ 并插入分割点 $M + 1 = 2$，得到 $S = \{2, 4\}$ 与合法二层分配 $g = [1, 0, 1, 0, 1, 0] < 2$。）在 $n = N, k = \kappa$ 处实例化该递归，即得取值严格小于 $q + 1 = \lfloor N / (\kappa + 1)\rfloor + 1$ 的合法层分配，证得 $\operatorname{minDepth}(N, \kappa) = \lfloor N / (\kappa + 1)\rfloor + 1$。完整证明由 Lean 内核检查。
:::

::: {.viz src="complexity-growth" preset="floor" height="500"}
**挪动折返点，层数停在白线上。** N = 11、κ = 2：品红三角从 {2, 3} 一步步挪到 {4, 8}，青色的砖从 9 层一层层降到 4 层，落在白线 ⌊11/3⌋ + 1 = 4 上，再也降不下去；灰色虚线框与淡品红三角是起点 {2, 3} 的 9 层（[@thm-open-circuit-min-depth]）。
:::

请严格注意 [@thm-open-circuit-min-depth] 的数学含义：$\operatorname{minDepth}(N, \kappa)$ 是在**固定开放边界可积电路族** `circuit N S` 中遍历 $|S| = \kappa$ 配置所得的最优并行层数；它既不是合成任意目标酉矩阵所需的全局最小门数，也不是连续演化的物理时间 $t$。让我们用两组具体数值（$N = 8, \kappa = 2$ 与 $N = 11, \kappa = 2$）把每一道门落在哪一层亲手排出来。

::: {.example #ex-open-circuit-depths title="κ = 2 下 N = 8 与 N = 11 的显式层调度与最小深度"}
固定 $\kappa = 2$（满足 $1 \le \kappa$ 且 $2\kappa = 4 \le N$），代入 [@thm-open-circuit-min-depth] 的整除公式 $\lfloor N / 3\rfloor + 1$：

1. **$N = 8, \kappa = 2$ 的三层调度**：公式给出 $\operatorname{minDepth}(8, 2) = \lfloor 8 / 3\rfloor + 1 = 2 + 1 = 3$。取二元分割集 $S = \{3, 6\} \subseteq \{1, \dots, 8\}$，由于 $8 \notin S$，按定义生成的 $9$ 门有序列表为

$$
\operatorname{circuit}(8, \{3, 6\}) = \bigl[\operatorname{KN},\; \operatorname{U}(7),\; \operatorname{U}(5),\; \operatorname{U}(4),\; \operatorname{U}(2),\; \operatorname{U}(1),\; \operatorname{K1},\; \operatorname{U}(3),\; \operatorname{U}(6)\bigr].
$$

从第 $0$ 层开始编号，赋予显式层映射

$$
[0,\; 1,\; 0,\; 1,\; 0,\; 1,\; 2,\; 2,\; 2]:
$$

- **第 $0$ 层**：并行执行 $\operatorname{KN}$（格点 $\{8\}$）、$\operatorname{U}(5)$（格点 $\{5,6\}$）、$\operatorname{U}(2)$（格点 $\{2,3\}$），三者支撑集两两不交；
- **第 $1$ 层**：并行执行 $\operatorname{U}(7)$（格点 $\{7,8\}$）、$\operatorname{U}(4)$（格点 $\{4,5\}$）、$\operatorname{U}(1)$（格点 $\{1,2\}$），三者支撑集两两不交且均排在各自前驱之后；
- **第 $2$ 层**：并行执行 $\operatorname{K1}$（格点 $\{1\}$）、$\operatorname{U}(3)$（格点 $\{3,4\}$）、$\operatorname{U}(6)$（格点 $\{6,7\}$），三者支撑集两两不交。

全部 $9$ 道门仅用 $3$ 层（层号 $0, 1, 2$）即告完成！

2. **$N = 11, \kappa = 2$ 的四层调度**：公式给出 $\operatorname{minDepth}(11, 2) = \lfloor 11 / 3\rfloor + 1 = 3 + 1 = 4$。取分割集 $S = \{4, 8\} \subseteq \{1, \dots, 11\}$，生成的 $12$ 门列表由从 $0$ 编号的显式层映射

$$
[0,\; 1,\; 2,\; 0,\; 1,\; 2,\; 0,\; 1,\; 2,\; 3,\; 3,\; 3]
$$

精确排入 $4$ 个并行层（层号 $0, 1, 2, 3$）。需要再次提醒的是：这里的层数 $3$ 与 $4$ 是特定可积电路族内部的组合并行调度深度，绝不能被称作黑洞内部体积的物理实测值。
:::

::: {.viz src="complexity-growth" preset="eight" height="500"}
**九道门，三层。** N = 8、S = {3, 6}：青色的砖一层层亮起，KN、U5、U2 在第 0 层，U7、U4、U1 在第 1 层，K1、U3、U6 在第 2 层，顶在白线上；灰色虚线是旧公式预测的 4 层（[@ex-open-circuit-depths]）。
:::

## 黑洞内部与复杂度—体积猜想 {#sec-complexity-volume-conjecture}

为什么我们要花力气把 [@thm-open-circuit-min-depth] 与 [@ex-open-circuit-depths] 的组合层序交由 Lean 内核逐行核验？因为即便是如此具体的有限门列表深度问题，单凭直觉归纳和手头小样本外推也极易失手！

在原始文献（`arXiv:2607.02093v1`）中，作者曾针对奇数 $N$ 与偶数 $N$ 分别提出了两条形如线性减法的最小深度猜想公式：`conjectureOne` 预测奇数 $N$ 时最小深度为 $(N + 3)/2 - \kappa$，`conjectureTwo` 预测偶数 $N$ 时最小深度为 $(N + 4)/2 - \kappa$。当 $\kappa = 1$ 时，$\lfloor N/2\rfloor + 1$ 确实与这两条线性公式吻合；但一旦跨到 $\kappa = 2$，多出来的分割点允许把电路切分成 $\kappa + 1 = 3$ 段并行子链，真实最小深度立刻以斜率 $1/(\kappa+1) = 1/3$ 低于斜率 $1/2$ 的原猜想！我们在 [@ex-open-circuit-depths] 中算出的 $N = 8, \kappa = 2$ 与 $N = 11, \kappa = 2$，恰好就是一举击穿这两条原文献公式的精确反例。

::: {.lemma #lemma-open-circuit-depth-refutation title="两条深度公式的反例" lean="D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result"}
定义关于开放边界可积电路最小深度 $\operatorname{minDepth}(N, \kappa)$ 的两条命题及其析取 `claim` 如下：

$$
\begin{aligned}
\operatorname{conjectureOne} &:\iff \forall N, \kappa \in \mathbb{N},\; \operatorname{Odd}(N) \to 0 < \kappa \to \kappa \le (N - 1) / 2 \to \operatorname{minDepth}(N, \kappa) = (N + 3) / 2 - \kappa, \\
\operatorname{conjectureTwo} &:\iff \forall N, \kappa \in \mathbb{N},\; \operatorname{Even}(N) \to 0 < \kappa \to \kappa \le N / 2 \to \operatorname{minDepth}(N, \kappa) = (N + 4) / 2 - \kappa, \\
\operatorname{claim} &:\iff \operatorname{conjectureOne} \lor \operatorname{conjectureTwo}.
\end{aligned}
$$

则 $\neg\operatorname{claim}$ 成立（即 $\operatorname{conjectureOne}$ 与 $\operatorname{conjectureTwo}$ 均不成立）。
:::

::: proof
要证 $\neg(\operatorname{conjectureOne} \lor \operatorname{conjectureTwo})$，只需分别给出 $\operatorname{conjectureOne}$ 与 $\operatorname{conjectureTwo}$ 的反例：

1. **证伪 $\operatorname{conjectureTwo}$**：取偶数 $N = 8$ 与 $\kappa = 2$（满足 $\operatorname{Even}(8)$、$0 < 2$ 且 $2 \le 8/2 = 4$）。原公式预测深度为 $(8 + 4)/2 - 2 = 4$；但如 [@ex-open-circuit-depths] 所示，配置 $S = \{3, 6\}$ 可在 $3$ 层内运行，故 $\operatorname{minDepth}(8, 2) \le 3 < 4$，$\operatorname{conjectureTwo}$ 不成立。
2. **证伪 $\operatorname{conjectureOne}$**：取奇数 $N = 11$ 与 $\kappa = 2$（满足 $\operatorname{Odd}(11)$、$0 < 2$ 且 $2 \le (11 - 1)/2 = 5$）。原公式预测深度为 $(11 + 3)/2 - 2 = 5$；但配置 $S = \{4, 8\}$ 可在 $4$ 层内运行，故 $\operatorname{minDepth}(11, 2) \le 4 < 5$，$\operatorname{conjectureOne}$ 不成立。

完整证明由 Lean 内核检查。
:::

::: {.viz src="complexity-growth" preset="eleven" height="500"}
**旧公式多算了一层。** N = 11、S = {4, 8}：12 道门排成每层 3 道的 4 层，顶在白线上；灰色虚线是奇数 N 的旧公式 (N + 3)/2 − κ 预测的 5 层（[@lemma-open-circuit-depth-refutation]）。
:::

必须严格声明：[@lemma-open-circuit-depth-refutation] 证伪的仅仅是 `arXiv:2607.02093v1` 中关于特定可积电路族并行深度的两条算术猜想 `conjectureOne` 与 `conjectureTwo`，**绝不是**对全息“复杂度等于体积（CV）”猜想、$\mathrm{ER}=\mathrm{EPR}$ 猜想或 $\mathrm{P}\neq\mathrm{NP}$ 猜想的反例。

在从具体的可积电路深度转向高能物理中的黑洞内部复杂度假说之前，我们先在文献注记中厘清量子态复杂度增长模型的物理前提，随后正式列出带有红色 `OPEN` 徽章的复杂度—体积猜想。

::: {.remark #rem-complexity-growth-literature title="量子态复杂度定义、Nielsen 几何与热化后的复杂度增长（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在量子信息与全息引力文献中，讨论一个量子态 $\lvert\psi(t)\rangle$ 的“电路复杂度”之前，必须先显式指定五项基准要素：**参考初态** $\lvert\psi_{\mathrm{ref}}\rangle$、**允许的基本门集** $\mathcal{G}$、**多体局域性约束**（如 $k$-局域门）、**合成误差容限** $\varepsilon \ge 0$ 以及**门资源计价模型**。总门数、并行深度、酉群流形上赋予右不变惩罚度规后的连续 **Nielsen 测地线长度**，以及驱动哈密顿量演化的物理时间 $t$，是四个定义各异的数学物理量。

特别地，必须严格区分**有限离散门集下的 $\varepsilon$-近似态复杂度**与**连续门族（或 Nielsen 几何）下的精确复杂度**：

1. **有限普适门集（如 Clifford + $T$）与正误差容限 $\varepsilon > 0$**：若基本门集 $\mathcal{G}$ 是有限集合，则所有有限长电路在零误差（$\varepsilon = 0$）下能精确到达的量子态至多有可数多个，而非平稳的连续时间态轨道 $\lvert\psi(t)\rangle = e^{-iHt/\hbar}\lvert\psi(0)\rangle$ 通常包含不可数多个态。因此，为保证一般目标态在有限普适门集下具有有限复杂度，以下**固定近似容限 $\varepsilon > 0$**（要求电路输出态与目标态的距离不超过 $\varepsilon$，参见 S. Aaronson, `arXiv:1607.05256`, Definitions 3.2.1 & 3.3.1）；在固定 $\varepsilon > 0$ 下，多比特态与酉算子的近似合成复杂度受限于指数级天花板 $\mathcal{C}_\varepsilon(\lvert\psi(t)\rangle) \le \exp(O(N))$（例如结合连续双比特分解与 Solovay–Kitaev 编译：先把目标分解为 $L$ 个连续双比特门，态合成 $L = O(2^N)$、酉合成 $L = O(4^N)$；再把每个门逐一编译到误差 $\varepsilon/L$ 以内，使 $L$ 个门累加的误差不超过 $\varepsilon$，每个门需 $\operatorname{poly}(\log(L/\varepsilon))$ 个门，合计 $O(L \operatorname{poly}(\log(L/\varepsilon)))$，即 $O(2^N \operatorname{poly}(N + \log(1/\varepsilon)))$ 的态合成上界或 $O(4^N \operatorname{poly}(N + \log(1/\varepsilon)))$ 的酉合成上界；参见 C. M. Dawson & M. A. Nielsen, `arXiv:quant-ph/0505030`）。
2. **连续双比特门族或连续 Nielsen 几何（$\varepsilon = 0$）**：若允许任意连续参数的单比特与双比特门 $\mathcal{G} = \mathrm{SU}(4)$ 按单位成本计价（或采用酉群流形上的连续 Nielsen 测地线距离），则任意 $N$ 比特纯态或酉算子的精确合成（$\varepsilon = 0$）对一切时刻 $t$ 均良定义，且同样受限于指数级构造上界 $\exp(O(N))$（态合成 $O(2^N)$、一般酉算子合成 $O(4^N)$）。

在混沌多体量子系统与全息黑洞模型的物理叙述中，当系统演化越过热化时间 $t_{\mathrm{th}}$ 后，子系统纠缠熵 $S(t)$ 已达热平衡饱和值 $S_{\mathrm{th}} \sim O(N)$，而在中间时间窗 $t_{\mathrm{th}} \ll t \ll e^{O(N)}$ 内，$\varepsilon$-近似态复杂度（或连续 Nielsen 复杂度）被预期继续随时间 $t$ 近似线性增长。但在任何具有有限维希尔伯特空间与有界能谱的封闭量子系统中，态复杂度无法跨越 $\exp(O(N))$ 天花板，且在依赖于具体能谱与演化模型的更长时间尺度（典型情形下如双指数级量子庞加莱回归时间）上必然发生饱和与回归，绝不可能对一切 $t \to \infty$ 永远保持单调线性增长。参见 L. Susskind, *Fortschr. Phys.* **64**, 24–43 (2016), DOI: `10.1002/prop.201500092`；以及 S. Aaronson (2016), `arXiv:1607.05256`。
:::

::: {.viz src="complexity-growth" preset="saturate" height="500"}
**熵先封顶，门数接着长。** 8 个量子比特的随机砖墙电路走到第 14 层：青色的半链熵沿灰色台阶爬升，第 13 层升到 3.14 比特，第 14 层仍是 3.14，压在 4 比特的白线下面；同一段里白线（已用门数）一路涨到 49。淡色的后段（第 40–90 层）在 3.18–3.36 比特之间起伏。随机电路是示意模型，熵与门数逐层实算（[@rem-complexity-growth-literature]）。
:::

把同一个 $8$ 比特随机电路接着往后走，熵仍趴在原处，门数一层层累加，示意模型里的预期复杂度这时撞上注记所说的 $\exp(O(N))$ 量级天花板。

::: {.viz src="complexity-growth" preset="ceiling" height="500"}
**门可以一直加，复杂度有天花板。** 一直走到第 90 层：青色的熵趴在原处，白线涨到 315 道门；品红的预期复杂度（示意模型）跟着白线走，到第 74 层碰上虚线 2^N = 256，此后横着走。
:::

::: {.conjecture #conj-complexity-equals-volume title="复杂度等于体积"}
固定适用的半经典全息引力态、边界参考初态、局域门集以及紫外正则化与精度容限方案。**复杂度等于体积（Complexity = Volume，简称 CV）猜想**断言：在光速 $c = 1$ 的单位制下，边界量子态在边界时刻 $t$ 经重整化后的电路复杂度 $\mathcal{C}_V(\psi(t))$，与高维体时空中锚定于同一边界时刻切片 $t$ 的**最大体积光滑类空余维一超曲面** $\Sigma_t$ 的重整化空间体积 $V_{\mathrm{ren}}(\Sigma_t)$ 成正比：

$$
\mathcal{C}_V\bigl(\psi(t)\bigr) = \frac{V_{\mathrm{ren}}(\Sigma_t)}{G_N \ell_* \hbar},
$$

其中 $G_N$ 为体时空牛顿引力常数，$\ell_*$ 为用于量纲匹配与归一化的特征体长度尺度（例如在渐近反德西特时空中取曲率半径 $\ell_{\mathrm{AdS}}$）。

适用范围与开放边界说明：上式中的 $V_{\mathrm{ren}}(\Sigma_t)$ 是余维一类空切片的**空间体积**；请勿将其与另一项独立的全息假说——**复杂度等于作用量（Complexity = Action，简称 CA）猜想**——相混淆，后者将态复杂度对应于边界切片所锚定的体时空 **Wheeler–DeWitt（WDW）因果楔形区**上的在壳引力作用量 $\mathcal{C}_A(\psi(t)) = I_{\mathrm{WDW}} / (\pi\hbar)$（包含体时空爱因斯坦—希尔伯特项、类空/类时/零超曲面边界项与拐角项，而非单纯的四维时空体积）。CV 与 CA 的比例系数均依赖于门成本加权与紫外正则化方案的选择，且不声称有限离散电路的精确最小门数与连续体几何量之间存在脱离正则化极限的逐数相等。参见 L. Susskind, *Fortschr. Phys.* **64**, 24–43 (2016), DOI: `10.1002/prop.201500092`；以及 A. R. Brown, D. A. Roberts, L. Susskind, B. Swingle & Y. Zhao, *Phys. Rev. Lett.* **116**, 191301 (2016), DOI: `10.1103/PhysRevLett.116.191301`。
:::

::: {.viz src="complexity-growth" preset="cv" height="500"}
**这段上升的线是不是体积，没有人证出来。** 红色标出品红线上升的那一段：熵早已停住，它还在涨。把这一段读成黑洞内部切片的体积，就是复杂度等于体积猜想（[@conj-complexity-equals-volume]）；舞台上没有画任何体积。
:::

## 纠缠桥与 ER=EPR 的适用范围 {#sec-er-epr-conjecture}

在 [@conj-complexity-equals-volume] 中，全息物理学家试图把“制备一个高度纠缠多体态所需的电路门数”与“连接黑洞两侧的爱因斯坦—罗森桥（虫洞）内部体积”联系起来。回到有限维矩阵与量子电路的严格数学领地，我们自然要问：**在给定的局域双比特门集下，精确合成一类具有特定对称性的多比特酉算子，究竟能不能证出指数级的门数下界？**

::: {.figure src="ch20-cv-slices"}
**边界时间往后走，穿过黑洞内部的切片越拉越长；它与门数是否成正比是开放问题。** 示意的双边黑洞彭罗斯图：左右竖边是两个边界，上下锯齿线是奇点，对角虚线是视界。紫色的切片 $\Sigma_t$ 两端钉在边界时刻 $t = 0, 1, 2, 3$ 上，越往后越长（示意，未计算体积）。红色标签是复杂度—体积猜想（[@conj-complexity-equals-volume]），开放问题。
:::

Lean 的 `D5.S3.Quantum.Magic.ReflectionDiagonalCNOTLowerBound` 模块对偶数比特数 $m = 2n$（$n \ge 1$）给出了一个干净利落的肯定定理。让我们先把模块中的电路与门集定义交代清楚：

- 记 $m$ 比特计算基类型为 $\operatorname{Qubits}(m) = (\operatorname{Fin} m \to \operatorname{Bool})$（共 $2^m$ 个布尔位串）；
- 无辅助比特（ancilla-free）基本门类型 `gate m` 定义为两类门的不交并

$$
\operatorname{gate}(m) = \bigl\{\, (t, c) \in \operatorname{Fin} m \times \operatorname{Fin} m \;\big|\; t \neq c \,\bigr\} \;\oplus\; \bigl(\operatorname{Fin} m \times \mathbb{R}\bigr),
$$

其中左支为受控非门 $\operatorname{CNOT}(t, c)$（以控制位 $c$ 翻转目标位 $t \neq c$），右支为作用在第 $q$ 个比特上的单比特实角度对角相位旋转门 $R_z(q, \varphi) = \operatorname{diag}(e^{\mp i\varphi/2})$；

- 对任意门列表 $\mathit{circuit} : \operatorname{List}(\operatorname{gate}(m))$，`circuitMatrix` 为按列表顺序累乘所得的 $2^m \times 2^m$ 复酉矩阵，而 `cnotCount` 则精确统计列表中属于左支的 $\mathrm{CNOT}$ 门个数。

下面的命题证明了：对任意 $n \ge 1$，在满足逐位取反反射对称性 $\theta(\neg x) = \theta(x)$ 的 $2n$ 比特实相位函数族中，必然存在一个最坏实例 $\theta$，使得任何仅用 $\mathrm{CNOT}$ 与单比特 $R_z$ 门（即使允许相差任意全局复标量因子 $c \in \mathbb{C}$）精确合成对角算子 $\operatorname{diag}(e^{i\theta(x)})$ 的电路，都至少需要 $2^{2n-1} + 2n - 2$ 个 $\mathrm{CNOT}$ 门！

::: {.proposition #prop-reflection-cnot-lower-bound title="反射对称对角门的 CNOT 下界" lean="D5/S3/Quantum/Magic/ReflectionDiagonalCNOTLowerBound.result"}
对任意自然数 $n \in \mathbb{N}$，若 $1 \le n$，则存在 $2n$ 比特实相位函数 $\theta : \operatorname{Qubits}(2n) \to \mathbb{R}$，同时满足以下两项性质：

1. **逐位翻转反射对称性**：对所有布尔位串 $x \in \operatorname{Qubits}(2n)$，记 $(\neg x)(j) = \mathit{!}(x(j))$，恒有

$$
\theta(\neg x) = \theta(x);
$$

2. **精确合成的指数级 CNOT 下界**：对任意由 $\mathrm{CNOT}$ 与单比特实 $R_z$ 组成的无辅助比特电路 $\mathit{circuit} : \operatorname{List}(\operatorname{gate}(2n))$ 以及任意复数 $c \in \mathbb{C}$，若

$$
\operatorname{circuitMatrix}(\mathit{circuit}) = c \cdot \operatorname{diag}\bigl(x \mapsto \exp(i\theta(x))\bigr),
$$

则必有

$$
2^{2n - 1} + 2n - 2 \le \operatorname{cnotCount}(\mathit{circuit}).
$$
:::

::: proof
源码 [`ReflectionDiagonalCNOTLowerBound.result`](lean:D5/S3/Quantum/Magic/ReflectionDiagonalCNOTLowerBound.result) 及其辅助计数模块 `D5.S3.Quantum.Magic.ReflectionDiagonalParityCounting` 通过四步精确的 $\mathbb{F}_2$-奇偶校验追踪（parity tracking）完成证明：

1. **显式反射对称硬相位证人（`hardTheta` 与 `hardTheta_reflection`）**：在 $m = 2n$ 个比特上显式取相位函数

$$
\theta_{\mathrm{hard}}(x) = \begin{cases} \pi/2, & \text{若 } x = 0^{2n} \text{ 或 } x = 1^{2n}, \\ 0, & \text{其他情况}. \end{cases}
$$

由于逐位取反算子 $\neg$ 互换全零串 $0^{2n}$ 与全一串 $1^{2n}$，必有 $\theta_{\mathrm{hard}}(\neg x) = \theta_{\mathrm{hard}}(x)$。

2. **对角酉算子强制末尾导线奇偶复原（`diagonal_forces_identity`）**：每根导线 $q \in \operatorname{Fin}(2n)$ 在电路起点携带汉明权重为 $1$（奇权重）的单位奇偶向量 $e_q \in \mathbb{F}_2^{2n}$。每个 $\operatorname{CNOT}(t, c)$ 将目标导线 $t$ 的奇偶标签更新为 $l_t \oplus l_c$，而每个单比特门 $R_z(q, \varphi)$ 仅沿当前导线标签 $l_q$ 注入相位因子 $\exp(\mp i\varphi/2)$。由于整个电路矩阵等于对角矩阵 $\operatorname{diag}(e^{i\theta_{\mathrm{hard}}(x)})$ 的非零标量倍 $c$，源码证明电路走完最后一步时，所有导线的奇偶标签矩阵 `wireLabels circuit` 必须精确复原为单位矩阵 $I_{2n}$——即每一根导线在终点都必须退回单比特奇权重态，偶权重导线数 `evenWires` 必须归零！

3. **Walsh–Hadamard 特征标判据与 $2^{2n-1} - 1$ 个偶奇偶输出（`hard_character` 与 `even_output_count`）**：对每个非零偶汉明权重向量 $v \in \mathbb{F}_2^{2n} \setminus \{0\}$（满足 $\bigoplus_{j=0}^{2n-1} v_j = \mathrm{false}$），定义乘性特征标 $\chi_v(f) = \prod_{x \in \operatorname{Qubits}(2n)} f(x)^{(-1)^{v \cdot x}}$。任何全局标量 $c \neq 0$（`character_global`）以及方向 $w \neq v$ 的单比特 $R_z$ 门（`character_factor`）对 $\chi_v$ 的贡献恒为 $1$；而在目标对角元 $e^{i\theta_{\mathrm{hard}}(x)}$ 上，由于 $0^{2n}$ 与 $1^{2n}$ 对偶权重向量 $v$ 的内积均为 $\mathrm{false}$，特征标取值为 $\chi_v(\exp(i\theta_{\mathrm{hard}})) = i \cdot i = -1 \neq 1$（`hard_character`）。因此，全部 $2^{2n-1} - 1$ 个非零偶奇偶向量都必须在某步 $R_z$ 旋转时出现在导线上（`rotation_labels`）；又因初始导线均为奇权重，每一个非零偶向量都必须出现在记录电路各 $\mathrm{CNOT}$ 步偶权重输出的列表 `evenOutputs` 之中（`rotation_outputs`），从而其列表长度满足 $|\operatorname{evenOutputs}| \ge 2^{2n-1} - 1$（`even_output_count`）。

4. **偶奇偶诞生与奇复原的收支平衡（`ReflectionDiagonalParityCounting.count_bound`）**：按电路各步 $\mathrm{CNOT}$ 门对偶权重导线数 `evenWires` 的改变（按步计重数）定义两类不相交事件：当某步 $\mathrm{CNOT}$ 的目标导线 $l_t$ 与控制导线 $l_c$ 均为奇权重、相加生成偶权重输出 $l_t \oplus l_c$ 时，记入**偶诞生列表** `births`（使 `evenWires` 加 $1$）；当某步 $\mathrm{CNOT}$ 的目标导线 $l_t$ 为偶权重而控制导线 $l_c$ 为奇权重、相加使目标导线恢复奇权重标签时，计为一次**奇复原步** `returns`（产出奇权重输出并使 `evenWires` 减 $1$）。由于任意时刻所有偶输出都落在 `births` 的 $\mathbb{F}_2$-线性张成集合 `listSpan births` 内（`span_outputs`），要覆盖全部 $2^{2n-1}$ 个偶奇偶向量，列表长度必须满足 $|\operatorname{births}| \ge 2n - 1$（`birth_count`）。同时，由于 `evenWires` 从初态 $0$ 出发并在电路终点必须归零（第 2 步），逐步收支平衡不等式（`return_balance`：$|\operatorname{births}| \le \operatorname{evenWires}(\mathit{ls}) + \operatorname{returns}$）强制要求每一次偶诞生步都必须由至少一次奇复原步来抵消，故 $\operatorname{returns} \ge |\operatorname{births}| \ge 2n - 1$。因为 `evenOutputs` 中统计的 $\mathrm{CNOT}$ 步总是输出偶权重标签，而 `returns` 中统计的 $\mathrm{CNOT}$ 步总是输出奇权重标签，两类 $\mathrm{CNOT}$ 步在同一电路列表中严格不交（`disjoint_counts`），相加即得精确下界

$$
\operatorname{cnotCount}(\mathit{circuit}) \ge |\operatorname{evenOutputs}| + \operatorname{returns} \ge (2^{2n-1} - 1) + (2n - 1) = 2^{2n-1} + 2n - 2.
$$

（例如当 $n = 1$ 即 $2n = 2$ 比特时，唯一反射配对 $(0, 1)$ 只有 $2^1 - 1 = 1$ 个非零偶奇偶模式 $z_0 \oplus z_1$，至少需要 $1$ 个偶诞生 $\mathrm{CNOT}$ 步在 `evenOutputs` 中生成 $z_0 \oplus z_1$ 供 $R_z$ 门注入相位，随后还必须至少再用 $2(1) - 1 = 1$ 个奇复原 $\mathrm{CNOT}$ 步在 `returns` 中把导线标签拆回单比特奇偶 $[z_0, z_1]$，合计至少 $1 + 1 = 2$ 个 $\mathrm{CNOT}$ 门。）完整证明由 Lean 内核检查。
:::

::: {.figure src="ch20-parity-labels"}
**CNOT 下界数的是导线上的奇偶标签：每个非零偶标签都要诞生一次，每次诞生都要一次奇复原来抵消。** 左栏是 $n = 1$ 的两比特电路：导线 0 始终是青色的 $z_0$；导线 1 先是青色的 $z_1$，第一个 $\mathrm{CNOT}$（偶诞生）后变成品红的 $z_0 \oplus z_1$，$R_z$ 在它上面注入相位，第二个 $\mathrm{CNOT}$（奇复原）后又回到青色的 $z_1$，合计 $1 + 1 = 2$ 个 $\mathrm{CNOT}$；脚本逐元核对过这条电路等于 $\operatorname{diag}(e^{i\theta_{\mathrm{hard}}(x)})$ 乘一个全局相位。右栏是 $n = 2$ 时必须在导线上出现的 $7$ 个品红的非零偶奇偶标签，加上至少 $3$ 次复原，合计下界 $10$；绿色标签是 [@prop-reflection-cnot-lower-bound]。图不说明 $10$ 能否达到。
:::

按照认识论诚实原则，必须指出 [@prop-reflection-cnot-lower-bound] 的三条严格边界：

- 它是固定门集 $\{\mathrm{CNOT}, R_z\}$、无辅助比特、**精确合成**（允许全局因子 $c$）下的**最坏实例存在性下界**；
- 它不直接给出任意门集或带有限误差 $\varepsilon > 0$ 近似合成的下界；
- 这一指数级门数下界是由单点硬相位证人 $\theta_{\mathrm{hard}}$ 强制触发全部 $2^{2n-1} - 1$ 个非零偶奇偶输出（Walsh–Hadamard 特征标判据）与至少 $2n - 1$ 次导线奇复原步（$\mathbb{F}_2$-线性张成秩与收支平衡）导出的离散奇偶计数定理，**绝不构成对图灵机复杂性类 $\mathrm{P}$ 与 $\mathrm{NP}$ 的分离证明**。

在全息引力文献中，与多比特纠缠与双边态紧密相关的另一条著名假说是马达西那（Juan Maldacena）与萨斯坎德（Leonard Susskind）提出的 $\mathrm{ER}=\mathrm{EPR}$ 猜想。我们将其严格置于开放猜想环境中。

::: {.figure src="ch20-er-epr"}
**ER=EPR 中光滑经典桥的几何读法需要适当的半经典体系。** 上一行：左右两套系统 $L$、$R$ 之间许多青色虚线的纠缠对，与右边爱因斯坦—罗森桥的侧视图之间是红色的“≟”，这一对应是开放问题（[@conj-er-equals-epr]）。下一行：一对贝尔态指向的小桥被划掉——一对微观纠缠比特之间没有光滑的虫洞。全图是示意。
:::

::: {.conjecture #conj-er-equals-epr title="ER=EPR"}
在允许半经典高维引力几何描述的适当纠缠双体系（典型原型为处于热场双态 thermofield double state 下的双边永恒反德西特黑洞）中，**$\mathrm{ER}=\mathrm{EPR}$ 猜想**认为：连接左右两个渐近边界外部区域的非可穿越**爱因斯坦—罗森桥**（Einstein–Rosen bridge，简称 ER 虫洞），在体几何上对偶于左右两套边界量子系统之间的**爱因斯坦—波多尔斯基—罗森**（Einstein–Podolsky–Rosen，简称 EPR）量子纠缠。

适用范围与开放边界说明：这一猜想性对应建立在半经典引力有效适用域内，**并不意味着**实验室中任意一对处于贝尔纠缠态的微观量子比特之间都存在光滑的经典广义相对论虫洞几何；它完全遵守量子力学的无超光速通信定理（no-signaling principle，不可穿越虫洞不传递因果信号），而构造可穿越虫洞则必须额外引入直接耦合左右两个边界的相互作用项。参见 J. Maldacena & L. Susskind, *Fortschr. Phys.* **61**, 781–811 (2013), DOI: `10.1002/prop.201300020`。
:::

## 计算模型、资源边界与 P≠NP {#sec-computational-complexity-boundary}

在本章的最后一节，让我们把视野拉回到离散组合结构与计算复杂性理论的根基，做一次彻底的“名实辨析”。

首先，在形式化代码库与数学文献中，同一个英文单词 `circuit` 往往在不同模块里指代截然不同的数学对象：在 [@thm-open-circuit-min-depth] 与 [@prop-reflection-cnot-lower-bound] 中，`circuit` 是作用在量子比特或自旋链上的**量子门列表**；而在图论模块 `D5.S3.Combinatorics.Graph.Walks.WeightedCycleWalk` 中，`circuit n` 则是指一张二分偶圈图（`evenCycleGraph n`）上的**图论闭合行走**（closed walk）！

具体而言，`evenCycleGraph n` 的顶点集为左右两份拷贝的不交并 $\operatorname{Fin}(n+2) \oplus \operatorname{Fin}(n+2)$（共 $2(n+2)$ 个顶点）。从左部起点 $\operatorname{inl}(0)$ 出发，递归构造 `traversals n` 每一步先沿交叉边从 $\operatorname{inl}(m)$ 走到右部顶点 $\operatorname{inr}(m+1)$，再沿水平配对边走回左部顶点 $\operatorname{inl}(m+1)$；经过 $n+2$ 轮双步交替后，恰好绕偶圈一周回到起点 $\operatorname{inl}(0)$，形成闭合行走 `circuit n`。

::: {.corollary #cor-even-cycle-length title="实际偶圈遍历的长度" lean="D5/S3/Combinatorics/Graph/Walks/WeightedCycleWalk.circuit_length"}
对任意自然数 $n \in \mathbb{N}$，二分偶圈图 $\operatorname{evenCycleGraph}(n)$ 上的典范闭合行走 $\operatorname{circuit}(n)$ 的边步长度为

$$
\bigl(\operatorname{circuit}(n)\bigr).\mathrm{length} = 2(n + 2).
$$
:::

::: proof
在递归定义 `traversals n m` 中，$m = 0$ 时为空行走 `.nil`（长度为 $0$）；每当 $m$ 增加 $1$ 时，行走通过两次 `.concat` 依次追加两条相邻边 $\operatorname{inl}(m) \to \operatorname{inr}(m+1)$ 与 $\operatorname{inr}(m+1) \to \operatorname{inl}(m+1)$，长度精确增加 $2$。对 $m$ 归纳即知 `traversals n m` 的长度为 $2m$；取 $m = n + 2$ 并经由不改变长度的端点重写 `.copy` 得到 `circuit n`，其长度恰为 $2(n + 2)$。完整证明由 Lean 内核检查。
:::

把 [@cor-even-cycle-length] 与前面的定理放在一起对比，是对抗“符号望文生义”最好的清醒剂：`circuit_length` 中的 `circuit n` 是图上的闭合路径而非量子电路，其步长 $2(n+2)$ 随图规模参数 $n$ 呈一阶线性关系，但这一组合步长与黑洞内部复杂度随物理时间 $t$ 的演化毫无瓜葛！让我们在下面的算例中把这两类组合序列与示意图中的玩具曲线一并列出。

::: {.example #ex-cnot-and-cycle-bounds title="CNOT 指数下界、偶圈线性步数与玩具饱和曲线的数值对照"}
让我们将本章涉及的三组离散数值并列核算：

1. **反射对称对角酉算子的最坏精确合成 CNOT 下界**（[@prop-reflection-cnot-lower-bound]）：对参数 $n = 1, 2, 3$（分别对应 $2n = 2, 4, 6$ 个量子比特），下界公式 $2^{2n-1} + 2n - 2$ 依次给出：
   - $n = 1$（$2$ 比特）：$2^1 + 2 - 2 = 2$ 个 $\mathrm{CNOT}$ 门；
   - $n = 2$（$4$ 比特）：$2^3 + 4 - 2 = 8 + 2 = 10$ 个 $\mathrm{CNOT}$ 门；
   - $n = 3$（$6$ 比特）：$2^5 + 6 - 2 = 32 + 4 = 36$ 个 $\mathrm{CNOT}$ 门。
2. **二分偶圈图闭合遍历的步长**（[@cor-even-cycle-length]）：对图参数 $n = 0, 1, 2$（分别对应 $4, 6, 8$ 个顶点），闭合行走长度 $2(n+2)$ 依次为 $4, 6, 8$。注意这两组精确组合量均以离散结构规模 $n$ 为自变量，与物理时间 $t$ 无关。
3. **热熵饱和与线性增长的玩具示意模型**：在本章结构图（Panel I）中，为直观对比“封顶饱和曲线”与“未封顶线性曲线”，画出两条最简单的分段函数 $C(t) = 2t$ 与 $S(t) = \min(2t, 4)$。在离散步 $t = 0, 1, 2, 3$ 处，数对 $(C(t), S(t))$ 依次取值为

$$
(0, 0), \qquad (2, 2), \qquad (4, 4), \qquad (6, 4).
$$

在 $t = 2$ 之后，$S(t)$ 停在天花板 $4$ 上，而 $C(t)$ 在 $t = 3$ 时达到 $6$。必须明确：这组 $(C(t), S(t))$ 仅仅是帮助读者区分“饱和函数与线性函数”的算术示意，绝不宣称真实量子系统的最小电路复杂度必然随时间单调增长。
:::

::: {.viz src="complexity-growth" height="560"}
**复杂度增长 · 完整实验室。** 在“增长”里拖时间轴，看青色的熵与白色的门数各自走到哪里，可以打开 CV 的读法；在“深度”里改 N 与 κ，或直接点格点挪动品红的折返点，看青色的砖能不能低过白线。
:::

最后，让我们回到章首题记所触及的计算复杂性核心问题：如果有人提议“改变初始编码结构，或者把所有难解问题的答案预先算好存进一张巨大的查找表（lookup table），检索时只需一次正交投影就能读出答案”，这能不能证明 $\mathrm{P} = \mathrm{NP}$？反过来，[@prop-reflection-cnot-lower-bound] 证出的指数级门数下界 $2^{2n-1} + 2n - 2$，能不能证明 $\mathrm{P} \neq \mathrm{NP}$？

答案是：**两边都不能！**

::: {.remark #rem-computational-model-literature title="统一计算模型、预存查表成本与复杂性类边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在标准计算复杂性理论中，复杂性类 $\mathrm{P}$ 与 $\mathrm{NP}$ 严格定义为在**统一（uniform）确定性图灵机**与**统一非确定性图灵机**上、以固定有限字母表作标准紧凑编码时，可在输入串编码长度 $n = |x|$ 的多项式时间 $\operatorname{poly}(n)$ 内判定的形式语言（判定问题）集合。在这一严格定义下，必须遵守两条铁律：

1. **预处理与查表成本不可逃逸**：任何输入重编码、基变换或构建查找表的预处理过程，其本身消耗的时间与空间资源都必须计入总计算成本。对于编码长度为 $n = |x|$、含 $k$ 个布尔变量的逻辑公式（如 3-SAT），将其全部 $2^k$ 个变量赋值的真值表预先算好存入内存需要指数级 $\Theta(2^k \operatorname{poly}(n))$ 的预处理时间与 $\Theta(2^k)$ 的存储空间（若试图预存所有编码长度为 $n$ 的候选输入实例的答案，更需要 $\Theta(2^n)$ 规模的查找表）；即使放宽到允许随输入长度 $n$ 先验给定提示串 $a_n$ 的**非统一复杂性类 $\mathrm{P/poly}$**，其定义也严格要求**提示串长度受多项式约束 $|a_n| \le \operatorname{poly}(n)$**（等价于多项式规模布尔电路族），指数级大小的预存查找表连 $\mathrm{P/poly}$ 的多项式提示串预算都无法装下，更绝不能由此宣称统一图灵机模型下的 $\mathrm{P} = \mathrm{NP}$。
2. **酉矩阵精确合成的指数下界不等于 $\mathrm{P} \neq \mathrm{NP}$**：在 [@prop-reflection-cnot-lower-bound] 中，无辅助比特 $\{\mathrm{CNOT}, R_z\}$ 电路精确合成显式反射对称硬相位算子 $\operatorname{diag}(e^{i\theta_{\mathrm{hard}}(x)})$ 需要至少 $2^{2n-1} + 2n - 2$ 个 $\mathrm{CNOT}$ 门，这是因为该显式证人在全部 $2^{2n-1} - 1$ 个非零偶奇偶 Walsh–Hadamard 特征标上均取非平凡值 $-1$，迫使电路逐一生成全部非零偶奇偶标签并完成 $2n - 1$ 次导线奇复原（而在未在本书形式化的量子电路文献中，如 V. V. Shende, S. S. Bullock & I. L. Markov, *Phys. Rev. A* **70**, 012310 (2004)，合成一般 $m$ 比特酉群 $\mathrm{U}(2^m)$ 中的矩阵亦因 $4^m$ 维连续实参数流形维数计数而需要 $\Omega(4^m)$ 个双比特门）。然而，$\mathrm{NP}$ 判定问题是由编码长度为 $n = |x|$ 的紧凑布尔公式或图灵机实例描述的判定问题；无论是针对全空间对角算子 $\theta_{\mathrm{hard}}$ 的指数级奇偶输出计数下界，还是一般酉算子族的连续参数计数下界，都不能阻止某个特定紧凑判定问题拥有 $\operatorname{poly}(n)$ 时间算法，因此不能用来证明 $\mathrm{P} \neq \mathrm{NP}$。

参见 S. A. Cook, "The complexity of theorem-proving procedures," *Proc. 3rd Annual ACM Symposium on Theory of Computing (STOC)*, pp. 151–158 (1971), DOI: `10.1145/800157.805047`；以及 S. Aaronson, *The Complexity of Quantum States and Transformations: From Quantum Money to Black Holes* (2016), `arXiv:1607.05256`。
:::

::: {.figure src="ch20-lookup-budget"}
**预存的查找表很快超出任何多项式预算。** 纵轴按对数刻度：品红的直线是查找表的行数 $2^n$，青色的曲线是取作示例的多项式预算 $n^3$；两者在 $n \approx 9.94$ 处交叉；竖直虚线标出 $n = 10$，此后的整数 $n$ 均有 $2^n > n^3$，品红线越走越远。紫色标签：文献结果，未在本书形式化（[@rem-computational-model-literature]）；红色标签：$\mathrm{P}\neq\mathrm{NP}$ 仍是开放问题，这张图不回答它。
:::

::: {.conjecture #conj-p-neq-np title="P≠NP"}
在标准统一图灵机计算模型与通常有限字母表编码下，存在一个属于复杂性类 $\mathrm{NP}$（非确定性多项式时间可判定）的形式语言不属于复杂性类 $\mathrm{P}$（确定性多项式时间可判定），即

$$
\mathrm{P} \neq \mathrm{NP}.
$$

适用范围与开放边界说明：该命题的证明与反证目前在数学上均处于开放状态（千禧年七大数学难题之一）；无论是通过选取特殊的量子测量基、假定免计成本的预存查找表，还是援引特定门集上的量子门合成下界或引力时空几何类比，都不能推出该猜想的解答。参见 S. A. Cook, *Proc. 3rd Annual ACM STOC*, pp. 151–158 (1971), DOI: `10.1145/800157.805047`。
:::

### 从时空门计数通往无时间因果与场线分野 {#sec-timeless-crystal-page-numbers}

走到第五部收官处，本章经 Lean 4 内核形式化验证的四条结果——开放边界可积电路最小并行深度闭式解 $L = \lfloor N/(\kappa+1)\rfloor + 1$（[@thm-open-circuit-min-depth]）、两条文献深度公式的反例证伪（[@lemma-open-circuit-depth-refutation]）、反射对称对角酉算子的指数级 $\mathrm{CNOT}$ 门计数下界 $2^{2n-1} + 2n - 2$（[@prop-reflection-cnot-lower-bound]）以及偶圈图闭合遍历步长偶性（[@cor-even-cycle-length]）——与三大开放猜想（[@conj-complexity-equals-volume]、[@conj-er-equals-epr]、[@conj-p-neq-np]）共同立起了一座清晰的几何坐标：在固定门集与局域相互作用约束下，局域观察者要想跨越空间纠缠割或对齐高维反射对称相位，必须实打实地付出最少层数 $L$ 或指数级双比特门数的旋转代价。

这自然引出了一个更深层的本体论与复杂性追问：如果[第十章](ch10-gram-geometry-and-order.md)揭示的格拉姆矩阵重构具有“两两比较、永远一致、顺序无关”的无时间几何刚性，那么为什么局域观察者依然必须承受并行深度 $L$ 的硬下界与 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 的正交视界？在跨越第六部“球外之球”（对角线逃逸、素数谱与 $\psi = \psi(\psi)$）与第七部“机械法典”（无矩阵克利福德引擎、ZYZ 旋转器编译与 Lean 4 源码审计）之后，我们将在**第八部**给出完整的展开：

- **[第二十九章](ch29-timeless-causality-and-gram-space.md)** 将把第十章的格拉姆椭圆体（$\det G \ge 0$）与无时间约束及条件时间切片文献背景（见第二十九章 `remark` 文献注记）合拢，阐明为什么顺序门深度 $L$ 度量的是有限观察者沿半正定矩阵补全（$G_{M+1} \succeq 0$）在静态时间场中一步步选点对齐晶面所需的最小旋转步数；
- **[第三十章](ch30-fields-lines-eth-and-navier-stokes.md)** 将进一步在“全局静态场模型 vs. 场内有限观察者 $\mathrm{P}\neq\mathrm{NP}$（[@conj-p-neq-np]）”以及“$\mathrm{P}$ 是无旋引导场、$\mathrm{NP}$ 是零横截面一维见证丝”的几何框架下，结合专门文献注记审视细粒度复杂性中的张量网络秩约分讨论、宇宙尺度对照与三维流体平流闭合障碍；
- **[第三十一章](ch31-quantum-fairness.md)** 与 **[第三十二章](ch32-unified-field-and-meta-unification.md)** 则把两子互易、互补勾股、不可克隆、正交视界与环面遍历升华为消除几何特权的五重公平体系（`MODEL`），并在零外部背景的《正交自指统一场》诠释纲领中完成跨领域统一理论的元统一合拢。

> 把已证的定理刻进绿色的内核基石，把前人的经典结果归入透明的文献账册，把未知的深渊诚实地标上红色的开放界碑——这才是几何直觉与形式化理性并肩前行时最庄严的诚实。

至此，第五部“时空之球”的四章画卷已全部展开：从闵可夫斯基光锥零线刚性（[第十七章](ch17-lorentz-geometry.md)）、反交换旋量与图上锚定回路相位分类（[第十八章](ch18-spinors-and-gauge-curvature.md)）、宽度三桥图的离散量子最大流最小割定理（[第十九章](ch19-tensor-networks-and-holography.md)），一直走到第二十章的可积电路并行深度、反射对称对角门 CNOT 指数下界与三大开放猜想的清晰边界。我们既看到了两子比量、方向旋转与多面体分片如何在时空、场论与网络中层层显影，也守住了形式化科学最宝贵的底线——知道每一分确凿真理站在哪里，也知道未知的星空从哪里开始。接下来，让我们推开**第六部（[第二十一章](ch21-diagonalization-and-escape.md)）**的大门，跨出闭合球面，直面哥德尔对角线的法向逃逸。
