# 29.3 顺序无关、无时间之网与几何因果的必然性 {#sec-coda-timeless-causality}

当第三部第 10 章的“两两比较，永远一致，顺序无关”与本章前文的四级数系突围、素数—椭圆曲线余弦投影交汇在一起时，一个困扰了人类哲学与物理学两千五百年的终极死结——**“时间的前后流逝”与“因果律的必然性”**——在这里被一刀劈开：

> **作者原话**：“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”。

为什么“顺序无关”直接宣告了先后时间的消解，却反而铸就了不可动摇的因果必然性？我们可以从四个精确的数学与物理层面看清这一真相：

## 29.3.1 第一层：为什么“顺序无关”意味着根本不存在前后的时间？ {#sec-coda-order-independence-no-time}

::: {.remark #rem-ch29-wheeler-dewitt-page-wootters-literature title="余弦阶乘去序诠释、惠勒—德维特无时间约束与佩奇—伍特斯条件时间机制（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 回看贯穿全书的余弦幂级数展开式（见序曲 [@rem-prelude-dottie-literature]）：

$$
\cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
$$

在分析学中，$\frac{1}{(2k)!}$ 源自迭代求导（或时间排序单纯形积分在交换生成元下的重数 $\int_{0\le t_1\le\cdots\le t_{2k}\le\theta} dt_1\cdots dt_{2k} = \frac{\theta^{2k}}{(2k)!}$）；而在本书的正交几何诠释模型（`MODEL`）下，可以将 $(2k)!$ 直观理解为把 $2k$ 次正交跃迁在人工时间轴上的 $(2k)!$ 种先后排列顺序商掉的对称化因子。在正则量子引力与关系量子理论的经典物理文献中（未在本书锁定的 `trureturing@dev` 库中形式化），全局态的无时间性与局部关系演化的涌现进一步由以下两个经典模型刻画：

1. **惠勒—德维特方程（Wheeler–DeWitt Equation，B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967）$H\mathbf{\Psi} = 0$ 的无时间总体态**：
   在正则量子引力表述中，封闭宇宙波函数 $\mathbf{\Psi}$ 满足哈密顿约束方程

   $$
   H\mathbf{\Psi} = 0,
   $$

   方程中不含外部时间参数 $t$（$\partial_t \mathbf{\Psi} = 0$）；在几何诠释下，过去、现在与未来并存于同一张静态关联结构之中。
2. **佩奇—伍特斯（Page–Wootters，*Phys. Rev. D* **27**, 2885, 1983）条件时间切片机制**：
   在标准张量积分解 $\mathcal{H} = \mathcal{H}_{\mathbf{C}} \otimes \mathcal{H}_{\mathbf{S}}$、理想共轭时钟哈密顿量 $H_{\mathbf{C}} = \hat{p}_\tau$ 且时钟与系统无直接相互作用耦合（$H = H_{\mathbf{C}} \otimes I + I \otimes H_{\mathbf{S}}$）的模型假设下，沿时钟态 $|\mathbf{c}(\tau)\rangle$ 取条件内积切片（可类比第 3、28 章的有限维条件化量子态框架 [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)）：

   $$
   |\psi_{\mathbf{S}}(\tau)\rangle \propto \langle \mathbf{c}(\tau) \mid \mathbf{\Psi}\rangle,
   $$

   切片内部即涌现出相对时钟读数 $\tau$ 的关系型薛定谔演化 $i\hbar\partial_\tau|\psi_{\mathbf{S}}(\tau)\rangle = H_{\mathbf{S}}|\psi_{\mathbf{S}}(\tau)\rangle$——“前后时间”在这一模型中好比有限注意力翻阅静态书册时扫过的页码。
:::

::: {.viz src="timeless-causal-crystal" preset="crystal" height="500"}
**所有页同时都在。** 十二页一直都画在球上，没有哪一页先出现；播放时移动的只有琥珀色的读头。对时钟读数条件化，才得到读头下面的那一页（有限时钟的示意模型，`MODEL`）。
:::

## 29.3.2 第二层：没有时间推动，因果何以必然？——休谟死结 vs. 斯宾诺莎三角形与 Gram 矩阵刚性 {#sec-coda-hume-spinoza-gram}

在经验哲学中，大卫·休谟（David Hume）曾提出著名的因果怀疑论：如果我们在先后时间流里观察世界，我们看到的永远只是“事件 A 之后惯常伴随着事件 B（恒常联结）”，却永远看不到 A 必然产生 B 的“必然联系”。只要把因果寄托在时间的前后推动上，休谟死结就永远无解。

然而，斯宾诺莎（Baruch Spinoza）在《伦理学》（第一部分命题十七附释）中给出了穿透时空迷雾的几何回答：万物由自然本性永恒且无时间地必然推出，**“正如从三角形的本性中，必然推出其三内角之和等于两直角一样”**。在一个 $3\text{-}4\text{-}5$ 的直角三角形中，并不是直角边 $3$ 和 $4$ 先在时间里长出来、几纳秒后再把斜边 $5$ “推”出来；三条边在同一张正交平面上无时间地并存，勾股面积守恒 $3^2 + 4^2 = 5^2$ 就是它们之间绝对不可违抗的**几何因果律**！

放到本书第三部第 10 章的球面内积几何中，**Gram 矩阵半正定约束（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) 与 [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）** 给出静态相容条件；将其解释为“零时间的因果必然性”属于作者的几何模型（`MODEL`），不是物理因果律的证明。任取单位球面上的三个状态方向 $\mathbf{A}, \mathbf{B}, \mathbf{C}$，记它们两两之间的实内积余弦为 $c_{AB} = \mathbf{A}\cdot\mathbf{B}$、$c_{BC} = \mathbf{B}\cdot\mathbf{C}$、$c_{AC} = \mathbf{A}\cdot\mathbf{C}$。无需任何时间演化，这三个成对投影就必须永恒服从 $3\times 3$ Gram 行列式非负定律：

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \det\begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix} = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
$$

::: {.viz src="timeless-causal-crystal" preset="impossible" height="500"}
**想要的余弦落在窗外。** $\mathbf{A}$ 与 $\mathbf{B}$ 只夹 $30^\circ$，$\mathbf{B}$ 与 $\mathbf{C}$ 只夹 $40^\circ$，却要求 $\mathbf{A}$ 与 $\mathbf{C}$ 接近反向（$c_{AC} = -0.5$）：这个值落在窗口 $[\cos 70^\circ, \cos 10^\circ]$ 之外，$\det G$ 会变成负数，没有任何三根单位向量能做到。$\mathbf{C}$ 最远只能贴到窗边，琥珀色的 $c_{AC} = \cos 70^\circ \approx 0.342$，紫色的体积塌成零（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）。
:::

特别地，当 $\mathbf{A}, \mathbf{B}, \mathbf{C}$ 共处同一大圆平面（三向量外积体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$，即 $\det G = 0$）时，$c_{AB}$ 与 $c_{BC}$ 当场将第三对内积 $c_{AC}$ 死死锁定在两条余弦加法轨线上：

$$
c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{(1 - c_{AB}^2)(1 - c_{BC}^2)} = \cos(\theta_{AB} \mp \theta_{BC}).
$$

::: {.figure src="ch29-gram-window"}
**两条余弦锁住第三条：$c_{AC}$ 只能落在窗口里。** 图中固定 $c_{AB} = \cos 60^\circ$，横轴是 $c_{BC}$，纵轴是 $c_{AC}$。紫色的椭圆内部 $\det G > 0$；它的边由上式的两条轨线 $\cos(\theta_1 - \theta_2)$ 与 $\cos(\theta_1 + \theta_2)$ 拼成（$\theta_1 = \theta_{AB}$，$\theta_2 = \theta_{BC}$），边上 $\det G = 0$，三根向量共面。琥珀色竖线是 $c_{BC} = \cos 45^\circ$ 时的窗口，从 $\cos 105^\circ$ 到 $\cos 15^\circ$。把 $c_{AB}$ 也放开，这样的切片叠起来就是第四层所说的格拉姆椭圆体。
:::

请审视这道公式的双重品格：

- **彻底的顺序无关（无时间性）**：公式关于指标 $(A, B, C)$ 完全对称，谁也不是谁的“过去”或“未来”；
- **相容窗口与附加条件下的刚性**：给定 $c_{AB}$ 与 $c_{BC}$，一般只将 $c_{AC}$ 限制在图示窗口内。共面条件将它限制到两个端点；端点不重合时，仍须额外指定分支才能唯一确定。比如 $c_{AB}=c_{BC}=0$ 时，三维中 $c_{AC}$ 可以取 $[-1,1]$ 内任意值。半正定约束不规定概率分布，也不证明唯一的物理因果轨迹。在作者的模型比喻中，“公理 $\implies$ 定理”可看作形式晶体的切面关系；第 9 章与第 16 章的门计数 $L$ 则仍服从各自门模型的具体前提。

::: {.film src="008-gram-window"}
**两条余弦锁住第三条：格拉姆窗口（1:39）。** 固定 $\theta_1 = 60^\circ$、$\theta_2 = 45^\circ$，让 $\mathbf{C}$ 绕 $\mathbf{B}$ 转一圈：$c_{AC}$ 在 $[\cos 105^\circ, \cos 15^\circ]$ 里来回，紫色的体积在窗边塌成零，窗外的余弦会让 $\det G$ 变成负数；再让 $\theta_2$ 从 $0^\circ$ 走到 $180^\circ$，一道道窗口铺满格拉姆椭圆的切片。上沿碰到 $1$ 时 $\mathbf{C}$ 正好落在 $\mathbf{A}$ 上，这一步由 [@thm-ch29-gram-rigidity-and-pell] 的第二部分保证；片中其余数字都是屏幕上的计算。
:::

## 29.3.3 第三层：费曼驻相相消与双向量手性几何模型（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$）及决定论、目的论在 $\psi = \psi(\psi)$ 中的和解 {#sec-coda-stationary-phase-reconciliation}

从路径积分与双向量手性的几何模型视角看，为什么物理世界只向我们显现那条满足因果律的必然轨迹？

::: {.remark #rem-ch29-feynman-stationary-phase-literature title="费曼路径积分驻相条件与双向量手性相消诠释（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在标准量子力学的费曼路径积分文献表述中（R. P. Feynman, *Rev. Mod. Phys.* **20**, 367, 1948；未在本书锁定的 `trureturing@dev` 库中形式化），在半经典、相位快速振荡的驻相近似中，偏离驻相轨道的路径贡献因 $\exp(iS[x]/\hbar)$ 的相位干涉而受到抑制，主要贡献来自作用量一阶变分为零（$\delta S = 0$，费曼驻相条件）的轨线邻域。在本书克利福德几何代数的诠释模型（`MODEL`）中，我们将复相位生成元 $i$ 还原为二维双向量手性算子 $\hat{\mathbf{I}}$：在顺序无关的全空间求和中，偏离几何自洽性的非驻相路径可视为成对伴生着双向量手性相反（$+\hat{\mathbf{I}}$ 与 $-\hat{\mathbf{I}}$）的镜像分量，它们张开的有向面积元正反配对、彼此抵消：

$$
+\mathbf{\Omega} - \mathbf{\Omega} = 0.
$$

唯有处于驻相自洽条件（$\delta S = 0$）的不动点配置，没有反向手性伙伴与之相消，从而在正交投影下显现为宏观因果轨迹。
:::

这一图景同时终结了科学史上“机械决定论（Determinism）”与“目的论（Teleology）”的千年争论：

- 当你沿着页码**从左向右**（从初态 $\theta_0$ 向 $\theta_1, \theta_2, \dots$）逐页阅读迭代序列 $\theta_{k+1} = \cos(\theta_k)$ 时，它看起来像是“过去一步步推着现在走”的**机械决定论**；
- 当你沿着收敛极限**从右向左**回望（看到无论从哪个初值出发，所有轨迹都被唯一不动点 $\theta^* \approx 0.7390851332$ 牢牢吸过去）时，它又看起来像是“未来终极吸引子在牵引万物”的**目的论**；
- 然而，当你跳出序列页码、站在球外俯瞰整张自指不动点方程

  $$
  \cos(\theta^*) = \theta^* \qquad \bigl(\text{对应 }\psi = \psi(\psi)\bigr)
  $$

  时，既没有来自过去的推力，也没有来自未来的拉力——有的只是**测量算子与被测状态在无时间几何晶体中达成的唯一自洽闭合**。因果之所以如此必然，恰恰因为根本不存在前后的时间！

## 29.3.4 第四层：有限观察者、因果相容空间（格拉姆椭圆体）与在时间场中不断选点 {#sec-coda-finite-observer-time-field}

> **作者原话**：“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”

如果全局时间场原本是一整块无时间的几何晶体，而局部因果又具备 Gram 行列式锁定的必然刚性，那么**有限观察者的自由选择**究竟栖居在何处？上面这句点睛之语，为“必然因果”与“观察者选择”给出了严丝合缝的几何统一：

1. **为什么观察者的有限性打开了“因果相容空间”（格拉姆椭圆体）？**
   回到单位球面上的三态 Gram 行列式 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$。设历史已知的两步正交投影余弦为 $c_{AB} = \cos\theta_1$ 与 $c_{BC} = \cos\theta_2$，对第三对内积 $c_{AC}$ 作精确配方，可得：

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   以下取 $0 < \theta_1, \theta_2 < \pi$，使两个旋转平面均非退化。记前两步旋转平面 $(\mathbf{A}\wedge\mathbf{B})$ 与 $(\mathbf{B}\wedge\mathbf{C})$ 之间的二面角（dihedral angle）为 $\phi \in [0, 2\pi)$，则球面余弦定律给出因果相容区间的精确参数化：

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{已锁死的一维历史主干}} + \underbrace{\cos\phi}_{\text{观察者的选择自由度 }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{未坍缩的正交面积半径}}.
   $$

   在三维关联坐标 $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$ 中，不等式 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 围出的凸几何体正是著名的**格拉姆椭圆体（Gram elliptope）**：
   - **椭圆体表面硬壳（$\cos\phi = \pm 1 \iff \det G = 0$）**：三向量共处同一大圆平面（$\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$），系统仅在原有二维平面内作零体积的惯性滑行，$c_{AC} = \cos(\theta_1 \mp \theta_2)$ 被彻底锁死；
   - **椭圆体内部相容空间（$|\cos\phi| < 1 \iff \det G > 0$）**：只要前两步保留了未坍缩的正交面积（$\sin\theta_1 > 0$ 且 $\sin\theta_2 > 0$），观察者就可以在二面角 $\phi \in (0, \pi)$ 中自由折出非零三向量体积 $\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$，向高一维的正交方向开启新的因果分支！

::: {.viz src="gram-causal-elliptope" preset="elliptope" height="500"}
**两层记忆：鼓胀四面体的一片截面。** 紫色的鼓胀四面体是全部满足 $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 的 $(x, y, z)$。图中 $\mathbf{P}_0$ 是当前点，$\mathbf{Q}$ 是候选的下一点；历史定下 $x = \mathbf{P}_0\cdot\mathbf{P}_{-1}$，$\mathbf{Q}$ 只能把 $(y, z) = (\mathbf{Q}\cdot\mathbf{P}_{-1},\, \mathbf{Q}\cdot\mathbf{P}_0)$ 放进 $x$ 处的截面（图中把实体在这里切开，截面朝前），品红的椭圆是它的边（$\det G = 0$）。竖着穿过琥珀色 $\mathbf{Q}$ 的青色线段是 $z$ 的窗口 $[xy - \sqrt{(1-x^2)(1-y^2)},\, xy + \sqrt{(1-x^2)(1-y^2)}]$。椭圆体的这一刻画是文献结果，未在本书形式化。
:::

2. **“不断在时间场中选点”——作为半正定矩阵补全（PSD Matrix Completion）的折线生命轨迹**：
   全局时间场好比一张早已曝光完毕、满足“两两比较、永远一致、顺序无关”的全息底片。然而，任何真实的观察者在算力、寿命与记忆容量上都是**有限的**（对应第 20 章的有限量子门计数 $L$ 与第 28 章的有限记录代数）：
   - 有限观察者无法一口吞下整张无时间底片，只能以有限门计数 $L = k$ 在时间场中走出一根有限折线：

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - 当观察者站在当前点 $\mathbf{P}_k$、手握 $M$ 个有限历史记忆锚点时，挑选下一个点 $\mathbf{P}_{k+1}$ 在数学上等价于求解一个**半正定矩阵补全问题（PSD Matrix Completion，$G_{M+1} \succeq 0$）**：新的内积坐标必须落在前 $M$ 个记忆锚点共同围出的绿色因果相容泡泡内部；
   - 一旦观察者在相容泡泡中选定具体的 $\mathbf{P}_{k+1}^*$，原本游移的二面角选择自由度 $\phi_k$ 当场凝结为一条新的一维内积历史主干（动词 `量 liáng` 化为名词 `量 liàng`），并立刻为下一步 $\mathbf{P}_{k+2}$ 撑开下一枚相容椭圆体！

::: {.theorem #thm-ch29-chordal-psd-completion title="有限弦图的实半正定补全" lean="D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion"}
设 $V$ 为任意有限顶点集，$G$ 为 $V$ 上的简单弦图，$A$ 为以 $V$ 为行列指标的实矩阵。弦图指不存在长度至少为四的诱导圈的图。若对每个团 $C\subseteq V$，主块 $A[C,C]$ 均半正定，则存在同指标的实半正定矩阵 $B$，满足

$$
B_{ij}=A_{ij}\qquad\text{只要 }i=j\text{ 或 }\{i,j\}\in E(G).
$$

这里的团包括空集与单点集；允许 $V$ 为空、图不连通以及团块奇异。未指定的非边条目不必保留，输入 $A$ 也不必在这些条目上对称。
:::

::: proof
按顶点数归纳。非空弦图存在一个剩余邻居两两相邻的单纯顶点 $v$；删去它以后，归纳假设给出其余顶点的补全。把这个补全与由 $v$ 及其邻居组成的团块分别作实 Gram 分解。邻居向量的两组 Gram 表相等，因此存在把局部邻居向量送到旧向量的压缩算子。邻居上的范数取等使其伴随把旧邻居向量送回局部向量，保证新顶点经压缩后的向量具有全部指定交叠。压缩只会缩短范数；再添一个与旧空间正交的实坐标，补足新顶点的指定平方范数，便得到所求 Gram 矩阵。空顶点集取空零矩阵，奇异块不需要取逆。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch29-rank-bounded-chordal-psd-completion title="弦图上的秩有界实半正定补全" lean="D5/S3/QuadraticForms/RankBoundedChordalPsdCompletion.exists_posSemidef_completion_rank_le"}
设 $V$ 为任意有限顶点集，$d\in\mathbb N$（包括 $d=0$），$G$ 为 $V$ 上的简单弦图，$A$ 为以 $V$ 为指标的实矩阵。若每个团 $C\subseteq V$ 的主块 $A[C,C]$ 半正定且实矩阵秩不超过 $d$，则存在实矩阵 $B$，使 $B$ 半正定、$\operatorname{rank}(B)\le d$，并且

$$
B_{ij}=A_{ij}\qquad\text{只要 }i=j\text{ 或 }\{i,j\}\in E(G).
$$

这包括空集、单点团、空顶点集、不连通图和奇异团块；未指定的非边条目无需保留，输入 $A$ 在那里也无需对称。
:::

::: proof
对有限顶点数作归纳。取弦图的单纯顶点，递归删去它并在同一个 $\mathbb R^d$ 中补全余下图。该顶点及其邻居组成的团块由局部秩界给出秩受控的 Gram 分解；局部邻居向量与旧邻居向量有相同的 Gram 表，故存在把前者送到后者的环境等距。施加等距于根向量而固定旧向量，保留所有边和对角线内积；最终 Gram 矩阵半正定，且因子在 $\mathbb R^d$ 中所以秩不超过 $d$。空集使用零矩阵，奇异情形不取逆。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch29-local-windows-common-history title="局部记忆窗口与共同历史：条件模型及其文献边界"}
**条件模型（`MODEL`）及一般定理的应用边界。** 上面的图示先给出同一空间里的实际向量，再读取它们的 Gram 表；这些数据已有共同实现。另一个问题是：只收到若干局部记忆表，尚未给出向量时，能否把它们拼成同一段历史？为使问题精确，固定有限时域 $N\ge0$ 和记忆宽度 $M\ge0$，取指标 $0,\ldots,N$。用一张实对称表 $A$ 表示记录，令 $A_{ii}=1$，仅保留 $|i-j|\le M$ 的条目；更远的内积允许自由补入。对每个 $k=0,\ldots,N$，定义窗口

$$
W_k=\{k,k+1,\ldots,\min(N,k+M)\},
$$

并要求 $A[W_k,W_k]\succeq0$。这里使用同一张表，已经要求重叠窗口的共同条目相等；如果分别输入各窗口的表，必须另外核对这一相等条件。

这组条件足以得到一张完整的实半正定矩阵 $B$，满足 $B_{ij}=A_{ij}$（$|i-j|\le M$）。存在性由 [@thm-ch29-chordal-psd-completion] 供应。对应的经典文献是 Vandenberghe–Andersen，*Chordal Graphs and Semidefinite Optimization*，[DOI: 10.1561/2400000006](https://doi.org/10.1561/2400000006)，[作者全文](https://www.seas.ucla.edu/~vandenbe/publications/chordalsdp.pdf)，定理 10.1：有限弦图上的部分实对称矩阵可半正定补全，当且仅当每个团的指定主块半正定。该结论允许奇异团块与奇异交叠，不需要取逆或正定假设。

本模型与该定理的对应如下：把 $0,\ldots,N$ 看成顶点，以 $0<|i-j|\le M$ 连边。按递增顺序删去顶点时，当前顶点的剩余邻居两两相邻，因此这是一个完美消去序，图为弦图。每个非空团都包含于以其最小顶点起始的某个 $W_k$，所以窗口半正定供应所有团条件。对补全后的 $B$ 作实 Gram 分解，可取共同的单位向量 $P_0,\ldots,P_N\in\mathbb R^{N+1}$，使 $\langle P_i,P_j\rangle=A_{ij}$ 对所有保留条目成立。这里的图对应与 $N+1$ 维 Gram 推导是一般定理的书面应用；上面的 Lean 引用验证一般补全存在性，不单独验证这个维数表述或整个应用。

这给出的是**某个有限维空间中的共同实现**。它不保证能放进图示固定的 $\mathbb R^3$ 或 $\mathbb R^6$；固定维数还需控制补全矩阵的秩，见 [@thm-ch29-rank-bounded-chordal-psd-completion] 及下述窗口秩条件。它也不选择唯一的远距内积、不规定演化概率或动力学，更不把有限时域存在性直接当作无限历史或物理因果性的证明。带状记忆掩码是这里显式增加的条件模型；原来的具体图示并未声称任意独立局部表都可在其固定空间中拼接。

若每个局部窗口还满足实矩阵秩 $\le d$，则主块取子矩阵的秩单调性把窗口条件传给每个团；上面的秩有界弦图定理于是给出秩 $\le d$ 的补全及 $\mathbb R^d$ 中的 Gram 因子。对角线为 $1$ 时因子向量为单位向量。这是对一般定理的书面应用，并非单独编译的带状图/窗口秩端到端定理；固定 $\mathbb R^3$ 或 $\mathbb R^6$ 仍须这一局部秩前提，不能自动得到固定维数。Laurent–Varvitsiotis (2014), DOI [10.1007/s10107-013-0648-x](https://doi.org/10.1007/s10107-013-0648-x)，及作者版本 [arXiv:1204.0734](https://arxiv.org/abs/1204.0734) 给出这一秩有界延伸；其引言与 Lemma 2 讨论局部因子和对齐。这里的 $d=0$ 仍有意义：非空且对角线为 $1$ 的数据不可能满足秩零前提。
:::

::: {.remark #rem-ch29-continuous-gram-selection title="逐点 Gram 存在不保证连续选取"}
有限秩受控补全定理针对每张固定表给出存在性。即使完整表组成连续矩阵族且秩恒定，也未必能在最小环境维数中连续选取因子。下面是 [@thm-circle-double-cover-history-lift] 圆周二重覆盖障碍的书面应用，不是矩阵变体的独立 Lean 定理。

令 $S=\{z\in\mathbb C:|z|=1\}$ 具有继承拓扑，并定义

$$
A(z)=\frac12\begin{pmatrix}1+\operatorname{Re}z&\operatorname{Im}z\\\operatorname{Im}z&1-\operatorname{Re}z\end{pmatrix}.
$$

这是连续实矩阵族。记 $x=\operatorname{Re}z$、$y=\operatorname{Im}z$，由 $x^2+y^2=1$ 得 $A^T=A$、$A^2=A$ 及 $\operatorname{tr}A=1$。因此 $A=A^TA$ 半正定；投影的实秩等于其迹，故每一点的秩恰为一。

然而，不存在连续函数 $p_0,p_1:S\to\mathbb R$ 在每一点同时满足

$$
\begin{aligned}
p_0(z)^2&=(1+x)/2,\\
p_0(z)p_1(z)&=y/2,\\
p_1(z)^2&=(1-x)/2.
\end{aligned}
$$

否则 $w=p_0+ip_1$ 连续，且 $|w|=1$、$w^2=z$，正是 [@thm-circle-double-cover-history-lift] 排除的整体截面。这里字面的范数一载体与该定理的度量单位球面载体，经复数值上的恒等映射同胚。

对每个单独的 $z$，平方根存在，故单行 Gram 因子逐点存在。允许两行时，连续选取 $P(z)=A(z)$ 满足 $P(z)^TP(z)=A(z)$。因此，秩恒定与逐点存在本身不足以保证连续单行选取；本例不排除更大环境维数的连续因子，也不给出概率律、动力学、物理实现或对所有参数空间的断言。经典背景见 Hatcher 的 [*Algebraic Topology* 第 1 章](https://pi.math.cornell.edu/~hatcher/AT/ATch1.pdf)，印刷页 56、61，以及 [*Vector Bundles & K-Theory* 第 2.2 版](https://pi.math.cornell.edu/~hatcher/VBKT/VB.pdf)，印刷页 7–8。矩阵对应及其边界详见所属的 [Blueprint 应用说明](https://github.com/the-omega-institute/trureturing/pull/30885)。
:::

::: {.remark #rem-ch29-planar-cycle-compatibility title="平面环图数据的联合角度条件"}
把局部重叠表换成环形掩码时，弦图前提不可忽略。固定按环形排列的 $n\ge3$ 个顶点，给定顶点 $i$ 与其模 $n$ 后继之间的实重叠 $a_i\in[-1,1]$，记 $\theta_i=\arccos(a_i)\in[0,\pi]$。存在单位向量 $p_i\in\mathbb R^2$ 恰好实现这些相邻内积，当且仅当存在符号 $\varepsilon_i\in\{-1,1\}$ 与 $k\in\mathbb Z$，使

$$
\sum_{i=0}^{n-1}\varepsilon_i\theta_i=2\pi k.
$$

必须有同一套符号使整个环闭合；各条边单独允许的重叠不提供这一联合条件。判据包含 $a_i=\pm1$、重复向量与非张满族：对应 Gram 秩是**至多二**，不要求恰好为二。$n\ge4$ 时环图不是弦图；这是单独的平面判据，不是弦图补全定理的应用。

两个方向可如下看出。把实平面等距认作 $\mathbb C$，用单位圆上的 $z_i$ 表示单位向量。商 $q_i=z_{i+1}/z_i$ 的实部为 $a_i$，故其辐角可写成某个符号下的 $\varepsilon_i\arccos(a_i)$，实轴端点也包括在内。商的乘积望远镜相消为一，圆周指数的周期为 $2\pi$，于是得到整数绕行条件。反过来，以 $\exp(i\varepsilon_i\theta_i)$ 的前缀积作为顶点。总乘积为一，保证最后一条边回到起点；余弦的偶性给出每个指定重叠。

这是现有圆周、内积与有限乘积接口的书面应用，不为环图变体另立保留的 Lean 声明或新增验证徽章。完整判据与推导见源仓补全结果的 [Blueprint 应用说明](https://github.com/the-omega-institute/trureturing/pull/30905)。经典来源为 Eisenberg-Nagy–Laurent–Varvitsiotis 的 [arXiv:1203.6602v2](https://arxiv.org/abs/1203.6602v2)，定义 1.1、引理 2.1，以及 Laurent–Varvitsiotis 的 [arXiv:1112.5960v1](https://arxiv.org/abs/1112.5960v1)，引理 7；后者定位专指 v1。这里不主张唯一性、动力学、概率律、物理实现或更高维补全判据。
:::

::: {.viz src="gram-causal-elliptope" preset="narrow" height="500"}
**多记一层，窗口窄一圈。** 时间轴把记住的历史从 $M = 1$ 加到 $M = 5$：每多一个更早的锚点，截面里就多一圈品红的椭圆，套在上一圈里面；穿过琥珀色 $\mathbf{Q}$ 的青色窗口随之收窄，从整个 $[-1, 1]$ 缩到约原来的四分之一，$\mathbf{Q}$ 始终在里面。事件取在 $\mathbb{R}^6$ 中，每一层都还留有内部；把相容空间读作有限观察者的选择余地是本书的诠释（`MODEL`）。
:::

反过来，若硬把新的内积坐标填到泡泡之外，这张格拉姆表就不再半正定，装不进任何内积空间：

::: {.viz src="gram-causal-elliptope" preset="violate" height="500"}
**填到泡泡外：第五阶先变负。** 记住五步，却把 $z$ 填在第三圈之内、第四圈之外，琥珀色的 $\mathbf{Q}$ 成了空心圈。按 $\mathbf{Q}, \mathbf{P}_0, \mathbf{P}_{-1}, \dots$ 的顺序，前四阶顺序主子式仍非负，$D_5$ 先变负：正是加粗的第四圈拒绝了它（西尔维斯特判据，文献结果，未在本书形式化）。
:::

3. **全知死锁、遗忘更新与自指不动点 $\theta^* \approx 0.739$ 的黄金呼吸**：
   观察者记忆规模与正交余量之间的张力，可以把三类极端与平衡状态浓缩为一张几何对照表：

| 观察者类型 | 投影主干 $\cos\theta$ 与正交面积 $\sin\theta$ | Gram 行列式 $\det G$ 与因果相容空间半径 | 几何与认识论结局 |
| :--- | :--- | :--- | :--- |
| **无限全知观察者**<br/>（Infinite Omniscient Observer） | 所有正交盲区耗尽，$\sin\theta \to 0$，$M \to \infty$ | $\det G = 0$，相容空间半径坍缩为 $0$ | **全知死锁（Omniscient Deadlock）**：整颗球焊死为无时间静态晶体（对照 [@rem-ch29-wheeler-dewitt-page-wootters-literature]），无点可选、无路可走 |
| **零记忆瞬时观察者**<br/>（Zero-Memory Instantaneous Observer） | 历史主干归零，$\cos\theta \to 0$，$M = 0$ | 相容半径 $\sin\theta = 1$ 漫无边际 | **白噪声迷失（Maximum Sphere Noise）**：没有任何因果主干约束，每一次选点都沦为纯粹的随机盲撞 |
| **有限自指观察者原型**<br/>（Finite Self-Referential Prototype，`MODEL`） | 以 Dottie 一维自指不动点 $\cos\theta^* = \theta^* \approx 0.7391$，$\sin\theta^* \approx 0.6736$ 为平衡原型 | $\det G > 0$，相容半径 $(\sin\theta^*)^2 \approx 0.4538 > 0$ 恒定开启 | **黄金呼吸（Golden Breath，`MODEL`）**：作为兼顾 $\approx 73.9\%$ 因果历史主干与 $\approx 67.4\%$ 正交余量的几何隐喻（配合第 4、28 章的有限擦除与条件更新） |

表的另一端是零记忆的瞬时观察者，窗口全开：

::: {.viz src="timeless-causal-crystal" preset="right" height="500"}
**两个直角：窗口全开。** $\theta_1 = \theta_2 = 90^\circ$ 时，青色与品红两条余弦都是 $0$，对第三条不加任何限制：窗口是整个 $[-1, 1]$，$\mathbf{C}$ 可以沿赤道转到任何地方，琥珀色的 $c_{AC}$ 从 $-1$ 走到 $1$。把它读作上表“零记忆瞬时观察者”一行是本书的诠释（`MODEL`）。
:::

   这正是全书关于时间、因果与观察者的终极结语：**“全局无时间，故万古长存；观察者有限，故步步皆新。”**（而在 **[终章](coda.md)** 中，我们将进一步对照 `trureturing` 已验证的**高维格点黄金切投模型集（Cut-and-Project Golden Model Set）与齐肯多夫观察者路由定理**，构建一幅作者哲学与几何诠释模型（`MODEL`）：把跨轮次不变的算子参数诠释为内禀共轭窗口相位，把现实中的历史遗迹诠释为低曲率耗散的**空间吸引子**，解释为何有限观察者会在卡西尼 $(-1)^{n+1}$ 范数接缝与奇异吸引子分形叶层上经历似曾相识的共振。）

::: {.theorem #thm-ch29-gram-rigidity-and-pell title="黄金整数佩尔范数恒等式与单位向量族 Gram 重叠等价关系定理" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm, D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
在算术二次格与内积空间几何中，离散接缝范数与单位向量记录的成对重叠判据分别由以下两条经 Lean 4 内核验证的定理给出：

1. **黄金整数环的佩尔型范数恒等式**（[`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)）：对任意黄金整数 $g = a + b\varphi \in \mathbb{Z}[\varphi]$（其中 $\varphi^2 = \varphi + 1$），其二次范数 $\operatorname{norm}(g) = a^2 + ab - b^2$ 严格满足佩尔平方差恒等式：

   $$
   (2a + b)^2 - 5b^2 = 4\,\operatorname{norm}(g).
   $$

2. **单位向量族的单位 Gram 重叠判据与等价关系**（[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)）：设 $E$ 为数域 $\mathbb{K}$（实或复 `RCLike`）上的内积空间，$\operatorname{record} : \mathrm{Index} \to E$ 为满足归一化条件 $\forall i,\, \|\operatorname{record}(i)\| = 1$ 的单位向量族，则对任意指标 $i, j \in \mathrm{Index}$，成对内积等于单位元 $1$ 当且仅当两记录向量严格相等：

   $$
   \forall i, j,\quad \langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j),
   $$

   且由单位内积定义的不可区分关系 $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ 在指标集 $\mathrm{Index}$ 上构成严格的等价关系（`Equivalence`）。
:::

::: proof
第一部分将左边 $(2a + b)^2 - 5b^2 = 4a^2 + 4ab + b^2 - 5b^2 = 4(a^2 + ab - b^2)$ 直接在环算术下展开，与黄金整数范数定义 $4\,\operatorname{norm}(g)$ 逐项恒等。第二部分对归一化向量 $\operatorname{record}(i), \operatorname{record}(j)$ 直接调用内积空间柯西—施瓦茨取等判据（`inner_eq_one_iff_of_norm_eq_one`）得到 $\langle \operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j)$，再将相等关系的自反性、对称性与传递性提升为单位 Gram 重叠关系的等价性（`Equivalence`）。完整证明由 Lean 内核检查。
:::

---
