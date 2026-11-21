# 16.2 图上游走：相干叠加与适用边界 {#sec-quantum-walk-interference}

当量子态不再停留在单个二维旋转块内，而是携带一枚二能级“硬币（coin）”在图的顶点之间做相干转移时，我们就进入了**离散时间量子游走（Discrete-Time Quantum Walk）**的世界。

在源码模块 `D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.lean` 中，游走舞台设为具有 $p$ 个顶点的有限循环圈图 $\mathrm{ZMod}\,p$（$p \in \mathbb{N}$，$1 \le p$），硬币空间为二元类型 $\mathrm{Fin}\,2$。单步 Hadamard 游走演化算子 `hadamardStep p` 作用在联合波函数 $\psi : \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p \to \mathbb{C}$ 上，精确定义为

$$
\mathrm{hadamardStep}(p)(\psi)(j) = \begin{cases}
\dfrac{\psi(0, j.2 + 1) + \psi(1, j.2 + 1)}{\sqrt{2}} & \text{若 } j.1 = 0, \\[8pt]
\dfrac{\psi(0, j.2 - 1) - \psi(1, j.2 - 1)}{\sqrt{2}} & \text{若 } j.1 = 1.
\end{cases}
$$

对于初始局域在原点 $j.2 = 0$、硬币处于旋量 $c : \mathrm{Fin}\,2 \to \mathbb{C}$ 的初态，演化 $n \in \mathbb{N}$ 步后的游走波函数定义为

$$
\mathrm{walkState}(p, n, c) = \bigl(\mathrm{hadamardStep}(p)\bigr)^{[n]}\bigl(j \mapsto \text{if } j.2 = 0 \text{ then } c(j.1) \text{ else } 0\bigr),
$$

其中单位硬币旋量条件 `UnitSpinor c` 定义为 $\sum_{b \in \mathrm{Fin}\,2} \mathrm{Complex.normSq}(c_b) = |c_0|^2 + |c_1|^2 = 1$，而正交对称硬币旋量定义为

$$
\mathrm{cStar} = c_* = \begin{pmatrix} 1/\sqrt{2} \\ i/\sqrt{2} \end{pmatrix}.
$$

::: {.viz src="walk-spreading" preset="fifty" height="500"}
**同一个原点，两种走法；走 50 步，宽度差近四倍。** 从原点出发、硬币取 $c_*$，按上面的单步规则走 $50$ 步：上方青色的量子分布左右对称，两个尖峰已经跑到 $\pm 34$，全都落在虚线 $\pm 50$ 之内；下方灰色的经典随机游走只铺开到 $\pm 7$ 左右。量子宽度 $\sigma = 27.07$，经典 $\sigma = \sqrt{50} = 7.07$。
:::
为了衡量 $n$ 步游走波函数在全部位置与硬币模式 $\iota = \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p$ 上展开的多模相干纠缠度，源码将归一化模式振幅 $\lambda : \iota \to \mathbb{C}$ 映射为全体模式上的单激发 W 态 $\mathrm{wState}(\lambda)$（在布尔占据配置 $s : \iota \to \mathrm{Bool}$ 上，当且仅当恰好仅有一个模式 $k \in \iota$ 为 `true` 时取振幅 $\lambda_k$，其余配置取 $0$），定义逐模式乘积态 $\mathrm{productState}(z)(s) = \prod_{k \in \iota} z_k(\text{if } s_k \text{ then } 1 \text{ else } 0)$（其中每个局部因子 $z_k$ 满足 `UnitSpinor (z k)`，记作 `unitFactors z`），并以模式振幅 $\lambda : \iota \to \mathbb{C}$ 为第一宗量、局部旋量族 $z : \iota \to \mathrm{Fin}\,2 \to \mathbb{C}$ 为第二宗量定义内积重叠辅助函数及最大重叠模平方：

$$
\begin{aligned}
\mathrm{overlap}(\lambda, z) &= \sum_{s : \iota \to \mathrm{Bool}} \overline{\mathrm{productState}(z, s)}\,\mathrm{wState}(\lambda, s), \\
\mathrm{gMax}(\lambda) &= \sup\Bigl\{\,\mathrm{Complex.normSq}\bigl(\mathrm{overlap}(\lambda, z)\bigr) \;\Big|\; \mathrm{unitFactors}(z)\,\Bigr\}, \qquad
\mathrm{geometricEntanglement}(\lambda) = 1 - \mathrm{gMax}(\lambda).
\end{aligned}
$$

下面的引理（在源码中声明头写为 `theorem result : claim`）证明：对一切圈长 $p \ge 1$、一切演化步数 $n \in \mathbb{N}$ 以及一切单位硬币初态 $c$，对称硬币 $\mathrm{cStar} = (1, i)/\sqrt{2}$ 恒使游走态的多模单激发几何纠缠达到最大值！

::: {.viz src="walk-spreading" preset="ring" height="500"}
**绕回来，镜像还在。** 圈上只有 $p = 9$ 个点，硬币取 $c_*$，走 $20$ 步：游走早已绕回来，青色的柱和灰色的柱一样摊满整圈，不再有往外跑的前沿；但青色的柱仍然左右成镜像，没有品红。[@lemma-symmetric-coin-walk] 对一切圈长 $p \ge 1$ 与一切步数 $n$ 成立。
:::


::: {.lemma #lemma-symmetric-coin-walk title="循环图 Hadamard 量子游走中对称硬币最大化多模几何纠缠引理" lean="D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.result"}
源码声明 `theorem result : claim` 中的命题 `claim` 完整展开如下：对任意自然数 $p \in \mathbb{N}$（满足 $1 \le p$，由此赋予 `NeZero p`）、任意步数 $n \in \mathbb{N}$ 以及任意硬币旋量 $c : \mathrm{Fin}\,2 \to \mathbb{C}$，若 $c$ 满足单位归一化条件 `UnitSpinor c`，则恒有

$$
\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr).
$$
:::

::: proof
在源码模块 `SymmetricCoinMaximalWalkEntanglement` 中，首先由线性分解引理 `walk_linearity` 与实反射对称引理 `walk_reflection` 推出 `walk_pair_probabilities`：对任意位置 $x \in \mathrm{ZMod}\,p$ 与任意单位硬币 $c$，镜像配对模式 $(0, x)$ 与 $(1, -x)$ 的占据概率之和保持定值 $|\mathrm{walkState}(p, n, c)(0, x)|^2 + |\mathrm{walkState}(p, n, c)(1, -x)|^2 = a^2 + b^2$，而正交对称硬币 $\mathrm{cStar} = (1/\sqrt{2}, i/\sqrt{2})$ 使每一对镜像模式的概率恰好均分为 $(a^2 + b^2)/2$。随后源码通过固定和配对均衡引理 `pair_balancing` 与有限集归纳引理 `pair_average_le`（逐对作用于 $((0, x), (1, -x))$，利用在两项和固定时相等分配最大化乘积并最小化 $\mathrm{gMax}$），证明 $\mathrm{gMax}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr) \le \mathrm{gMax}\bigl(\mathrm{walkState}(p, n, c)\bigr)$，两边同被 $1$ 相减即得 $\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr)$。完整证明由 Lean 内核检查。
:::

::: {.viz src="walk-spreading" preset="coin" height="500"}
**一半一半还不够，要那个 $i$。** 证明梗概里的那一对：每个位置 $x$ 一根柱，下段是模式 $(0, x)$ 的概率，上段是镜像模式 $(1, -x)$ 的概率，短横标出一半。换成同样一半一半的实硬币 $(1, 1)/\sqrt{2}$，走 $50$ 步：每一对的总高仍正好落在虚线上（虚线是硬币取 $c_*$ 时同一对的总高），两段却一高一低，品红是下段离一半的差，一对里两段最多差 $0.145$。硬币取 $c_*$ 时两段等高，品红消失。图里画的是概率，不是 [@lemma-symmetric-coin-walk] 所说的几何纠缠。
:::
在理解 [@lemma-symmetric-coin-walk] 时，必须严格划清两条概念边界：

1. **多模单激发 W 态几何纠缠 vs 硬币—位置二分约化熵**：定理中的 `geometricEntanglement` 是把全部 $2p$ 个（硬币 $\times$ 位置）模式视作单粒子占据模，计算单激发 W 态相对于 $2p$ 个模式逐模乘积态的几何纠缠 $1 - \mathrm{gMax}$，**绝不能将其篡改或简写为通常教材里的“硬币对位置求偏迹后的二分冯·诺依曼纠缠熵”**。
2. **量子游走不等于“无条件消除一切回头路或迷宫指数加速”**：[@lemma-symmetric-coin-walk] 刻画的是有限圈图 $\mathrm{ZMod}\,p$ 上硬币初态相位对模式分布对称性的影响，它**并不证明**量子游走在任意图或迷宫上都具有指数加速，也**不意味着**相消干涉能让任意图上的所有回头路振幅恒等于零，更不是黏合树（glued trees）黑盒分离定理本身。

::: {.viz src="walk-spreading" preset="width" height="500"}
**一条直线对一条 $\sqrt{n}$。** 宽度随步数：青色的量子宽度是一条直线（$\sigma / n$ 停在 $0.54$ 附近），灰色的经典宽度是 $\sqrt{n}$；走到 $60$ 步是 $32.5$ 对 $7.75$。在一条线上，两者之差是平方关系，不是指数；黏合树上特定黑盒穿行任务的指数分离及其适用边界见 [@rem-qsvt-walks-literature] 第 2 条（文献结果，未在本书形式化），图中曲线是页面的数值。
:::

::: {.remark #rem-qsvt-walks-literature title="完整 QSVT 可实现性与黏合树加速（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 这里登记完整 QSVT 与图游走的文献结论。Theorem 3 在旋转约定下的充分性，以及同一补全的有符号圆分解，已在下文 [@thm-polynomial-phase-synthesis]、[@thm-signed-circle-phase-factorization] 中单独形式化；以下完整充要刻画、实部电路与查询语义仍按文献边界陈述；任意原始投影酉算子的复多项式提升另见 [@thm-projected-unitary-polynomial-lifting]、[@thm-native-phase-projected-lifting]。Haah 的完整 Laurent 环有序分解另见 [@thm-haah-laurent-factorization]。

1. **量子奇异值变换（QSVT）的复幺正补全与实目标多项式提取定理**（A. Gilyén, Y. Su, G. H. Low, and N. Wiebe, *Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics*, Proc. 51st ACM STOC, 193–204, 2019, [10.1145/3313276.3316366](https://doi.org/10.1145/3313276.3316366)，Theorem 3 与 Theorem 17 / Corollary 18）：设矩阵 $A$ 通过块编码（block encoding）嵌入幺正算子 $U$ 的投影块 $\tilde{\Pi} U \Pi = A$（$\norm{A}_{\mathrm{op}} \le 1$）。文献严格区分两层可实现性定理：
   - **直接二维复多项式量子信号处理（QSP，Theorem 3）**：复多项式对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 能直接作为单一交替相位序列算子 $U_{\Phi}(x)$ 的二维矩阵元实现，当且仅当 $\deg(P_{\mathrm{c}}) \le d$、$\deg(Q_{\mathrm{c}}) \le d - 1$，$P_{\mathrm{c}}$ 具有确定奇偶性 $d \bmod 2$，$Q_{\mathrm{c}}$ 具有相反奇偶性 $(d-1) \bmod 2$，且在一切 $x \in [-1, 1]$ 上满足复模方幺正归一恒等式 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。
   - **一般有界实多项式 QSVT 的复补全与实部投影实现（Theorem 17 / Corollary 18）**：对于一般有界实目标多项式 $P_{\mathrm{target}} \in \mathbb{R}[x]$——满足 (i) $\deg(P_{\mathrm{target}}) \le d$；(ii) 具有确定奇偶性 $d \bmod 2$；(iii) 在区间 $[-1, 1]$ 上满足一致范数界 $|P_{\mathrm{target}}(x)| \le 1$（例如奇一次实多项式 $P_{\mathrm{target}}(x) = x/2$，其在端点 $x = 1$ 处 $P_{\mathrm{target}}(1)^2 = 1/4 < 1$，因此不可能直接用实多项式配成 $P_{\mathrm{target}}(x)^2 + (1 - x^2)Q(x)^2 = 1$）——由 Fejér–Riesz 因式分解定理，总存在满足上述 Theorem 3 条件的复多项式补全对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 使得 $\operatorname{Re} P_{\mathrm{c}}(x) = P_{\mathrm{target}}(x)$ 且 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。在电路上引入一颗额外的 $\lvert +\rangle$ 控制辅助比特，相干叠加相位序列 $U_{\Phi}$ 与相位取负的序列 $U_{-\Phi}$ 得到实部组合 $\frac{1}{2}(U_{\Phi} + U_{-\Phi})$，最后配合辅助比特向 $\langle +\rvert$ 的投影以及依奇偶性选取的块投影（$d$ 为奇时取 $\tilde{\Pi}(\cdot)\Pi$，$d$ 为偶时取 $\Pi(\cdot)\Pi$），即仅调用 $d$ 次 $U$ 与 $U^*$ 精确实现奇异值实多项式变换 $P_{\mathrm{target}}^{(\mathrm{SV})}(A)$。

2. **量子游走指数加速的图结构与黑盒边界**（A. M. Childs, R. Cleve, E. Deotto, E. Farhi, S. Gutmann, and D. A. Spielman, *Exponential algorithmic speedup by a quantum walk*, Proc. 35th ACM STOC, 59–68, 2003, [10.1145/780542.780552](https://doi.org/10.1145/780542.780552), [arXiv:quant-ph/0209131](https://arxiv.org/abs/quant-ph/0209131)）：在两棵深度为 $n$ 的二叉树在叶节点随机交错黏合而成的“黏合树（glued trees）”图族上，给定邻接表黑盒（oracle）访问，从入口根顶点出发的连续时间量子游走因在每一层等距列子空间上保持对称均匀叠加，把指数多顶点的图坍缩为长度为 $2n+2$ 的一维链，从而在 $\mathrm{poly}(n)$ 时间内以有界概率穿透到出口根顶点 `EXIT`；而 Childs 等人证明，任何最多执行 $2^{n/6}$ 次黑盒查询的经典算法找到 `EXIT` 顶点的概率至多为 $4\cdot 2^{-n/6}$（即要达到常数成功概率必须付出 $2^{\Omega(n)}$ 次经典黑盒查询）。这一指数优势严格依赖于图族的层对称约简、黑盒访问模型与特定穿行任务定义；对于缺乏此类对称结构的任意一般图或无结构迷宫，量子游走的干涉相消并不能自动把所有回头路径清零。

:::

**从整条 Laurent 环到有序因子。** 上述 QSP 序列还有一种直接以矩阵系数表述的分解层：J. Haah, *Product Decomposition of Periodic Functions in Quantum Signal Processing*, Quantum **3**, 190 (2019), [10.22331/q-2019-10-07-190](https://doi.org/10.22331/q-2019-10-07-190)，[arXiv:1806.10236v4，Definition 1 与 Theorem 2](https://arxiv.org/html/1806.10236v4#Thmlemma1)。下面给出该代数定理的 Lean 形式化，补全与实现所需的额外条件仍单独保留。

设 $n\in\mathbb{N}$。给定任意整数指标上的有限支撑系数族 $C:\mathbb{Z}\to M_2(\mathbb{C})$，写成形式 Laurent 多项式 $F(t)=\sum_{j\in\mathbb{Z}}C_jt^j$。Haah 的 $\mathcal{P}_n$ 要求 $C_j=0$（$|j|>n$），且对每个 $|\eta|=1$ 都有 $F(\eta)\in\mathrm{SU}(2)$，即 $F(\eta)^*F(\eta)=I$、$\det F(\eta)=1$；其中星号是求值后矩阵的共轭转置。子集 $\mathcal{E}_n$ 另要求支撑落在 $\{-n,-n+2,\ldots,n\}$，即非零项的指数与 $n$ 同奇偶。**实际次数为 $n$** 的条件是 $C_n\ne0$ **或** $C_{-n}\ne0$，不是只有次数上界。

对秩一正交投影 $P$（$P^*=P$、$P^2=P$、$\operatorname{rank}P=1$），定义原始因子

$$
E_P(t)=tP+t^{-1}(I-P).
$$

它在投影线及其正交补上分别乘以 $t$ 与 $t^{-1}$；例如 $P=\operatorname{diag}(1,0)$ 时就是 $\operatorname{diag}(t,t^{-1})$。在单位圆上，这两个特征值模长均为 $1$、乘积为 $1$，故 $E_P\in\mathcal{E}_1$。

::: {.theorem #thm-haah-laurent-factorization title="SU(2) Laurent 环的唯一有序分解" lean="D5/S3/ContinuousObservables/LaurentLoopFactorization.haah_factorization"}
对每个 $n\ge0$、每个实际次数为 $n$ 的 $F\in\mathcal{E}_n$，存在唯一的 $E_0\in\mathrm{SU}(2)$ 与**长度恰为 $n$ 的有序**秩一正交投影列表 $(P_1,\ldots,P_n)$，使

$$
F(t)=E_0\prod_{k=1}^{n}\bigl(tP_k+t^{-1}(I-P_k)\bigr).
$$

乘积按 $k=1,\ldots,n$ 从左到右排列，等式是逐系数的 Laurent 多项式恒等式。$n=0$ 时，$F=C_0$ 是任意的 $\mathrm{SU}(2)$ 常矩阵，$E_0=C_0$、投影列表为空；这里从不对 $t=0$ 求值。反方向，任意 $n$ 个原始因子的乘积都属于 $\mathcal{E}_n$，但实际次数可能小于 $n$。
:::

::: proof
**为何能从末端剥去一个因子？** Haah 的 Definition 1 把系数取伴随定义为 $F^{\dagger}(t)=\sum_j C_j^{\dagger}t^j$；它不反转指数。因此在单位圆上应写 $F(\eta)^*=F^{\dagger}(\eta^{-1})$，一般不能写成 $F^{\dagger}(\eta)$。圆上无穷多个取值把幺正与行列式关系提升为 Laurent 恒等式：对每个矩阵元乘以足够高的 $t$ 次幂后，普通多项式在无穷多个点为零，故各系数为零。对于 $n>0$，比较极端系数得到

$$
\begin{aligned}
\det C_n&=\det C_{-n}=0,\\
C_{-n}^{\dagger}C_n&=0,\qquad C_nC_{-n}^{\dagger}=0.
\end{aligned}
$$

非零的端点矩阵于是秩为一。文献利用这些关系选出唯一的末端投影 $P$，满足 $C_n(I-P)=0$ 与 $C_{-n}P=0$。在 $n>0$ 且 $C_n\ne0$ 的分支，投影到 $C_n$ 的行空间便给出

$$
P=P_n=\frac{C_n^{\dagger}C_n}{\Tr(C_n^{\dagger}C_n)}.
$$

分母在这个分支严格为正；常数情形不使用此式。若选用非零的负端点，文献的平行论证从 $C_{-n}$ 的行空间选出互补投影，同样满足两条消去条件；无需把原假设中的“或”改成额外的正端点假设。

令 $G(t)=F(t)\bigl(t^{-1}P+t(I-P)\bigr)=F(t)E_P(t)^{-1}$。把支撑外的 $C_j$ 约定为零，乘法的系数更新是

$$
G_j=C_{j+1}P+C_{j-1}(I-P).
$$

两条消去条件使 $t^{n+1}$ 与 $t^{-n-1}$ 项消失，奇偶支撑再把次数上界降至 $n-1$；单位圆上的 $\mathrm{SU}(2)$ 性质仍保留。次数恰为 $n-1$：否则由 $F=GE_P$、$\deg F\le\deg G+1$ 会与 $F$ 的实际次数 $n$ 矛盾。这样可对 $G\in\mathcal{E}_{n-1}$ 归纳，再在右侧接回 $P_n=P$。任一长度恰为 $n$ 的分解，其末端投影都必须满足同样的端点消去条件，因而被非零端点唯一确定；逐步剥离便得到整个有序列表及剩余常矩阵的唯一性。完整证明由 Lean 内核检查。
:::

例如直接展开并用 $P(I-P)=0$ 得 $E_P(t)E_{I-P}(t)=I$：人为补长的列表不具有上述唯一性。

**精确合成的边界。** Theorem 2 分解的是已经给定、在整个单位圆上取值于 $\mathrm{SU}(2)$ 且满足上述奇偶条件的完整矩阵环。把有界实目标多项式补全到这样的环、选定 $t$ 与信号变量的相位约定、以及在特定 QSP 约定下由反演对称性限制各 $P_k$ 到布洛赫赤道，仍需额外条件与论证（见 Haah §3.1 及本条前述 Gilyén 等人的补全结果）。再把二维信号作用提升为矩阵奇异值变换，还需块编码与投影桥梁。因此这里的有序投影唯一性不等于实角代表的唯一性，不覆盖补长列表，也不单独给出数值稳定性、效率或硬件实现保证。

## 16.2.1 静态有向森林：怎样补成一个整圈 {#sec-directed-forest-cycle-completion}

经典黏合树论证里有一个容易被“随机接到尚未使用的端点”掩盖的约束：目标是一个覆盖全部叶子的圈，不能提前把一个小分量封口。先把这个约束放在一个静态、有方向的模型里看清楚。设已知边为 $a\to b$、$c\to d$，另有孤立点 $e$。三个分量是 $(a,b)$、$(c,d)$、$(e)$；补成一个有向整圈只有 $(a\ b\ c\ d\ e)$ 与 $(a\ b\ e\ c\ d)$ 两种置换。于是 $b$ 的后继在 $c,e$ 之间各占一半，接回 $a$ 的概率为零。$b\to a$ 虽不破坏入度、出度上界，却会把其余顶点留在圈外。

这里用到的是经典的置换收缩对应。Gessel，*Generalized Rook Polynomials and Orthogonal Polynomials*（1989，159–176，[10.1007/978-1-4684-0637-5_13](https://doi.org/10.1007/978-1-4684-0637-5_13)，[作者原文](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)）第 2 节将相容条件定义为不重复行、列，第 3 节第 5 页以满足条件集合的实际交集定义 $T_n^A$，第 8 节第 11 页给出置换收缩双射，并说明循环数相差所规定边中的有向循环数。

更贴近下面端点、计数与概率表述的出处是 Boaz Tsaban，*Permutation graphs, fast forward permutations, and sampling the cycle structure of a permutation*，*Journal of Algorithms* **47**（2003），104–121，[10.1016/S0196-6774(03)00017-8](https://doi.org/10.1016/S0196-6774(03)00017-8)。该文第 107–109 页的 Lemma 1.1 从无有向循环的部分置换图得到路径分量及其唯一最小、最大端点；Lemma 1.2 通过连接这些端点穷尽单环补全，给出阶乘计数；Lemma 1.3 区分同分量封口与异分量合并；Definition 1.4 与 Lemma 1.5 则给出正、逆向置换查询中的均匀端点选择与查询序列概率。这些端点、计数与概率规律已有文献依据，并非始于本书。

下面将这些经典结果写成同一顶点集上的实际补全集、端点双射与静态条件分布，并保留完整书面证明。Tsaban 的查询模型只涉及置换及逆置换的取值，并不直接覆盖黏合树的完整自适应查询历史。不主张数学新颖性；形式化需求登记于[请求 #11](https://github.com/the-omega-institute/trureturing-requests/issues/11)；下文依次给出路径次序、端点补全和计数的 Lean 结论，再将它们合在原顶点集上推导。

把每个弱连通分量缩成一点，补全后的整圈就对应分量之间的一个整圈。下面直接从原始边关系定义分量、头尾和补全集；这里的整圈是顶点集上只有一个轨道的置换。

::: {.theorem #thm-directed-forest-component-path-order title="真实分量的唯一有向路径次序" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestPathOrder.component_path_order"}
设 $V$ 为有限类型，$E:V\to V\to\operatorname{Prop}$ 满足右唯一、左唯一，且 `Relation.TransGen E` 无自反点。令 $\operatorname{Component}(E)=V/\operatorname{EqvGen}(E)$。对每个实际分量 $A\in\operatorname{Component}(E)$，定义其顶点纤维

$$
V_A=\{x\in V:[x]_E=A\},\qquad m_A=|V_A|.
$$

则存在唯一的双射 $e_A:\{0,\ldots,m_A-1\}\simeq V_A$，使对任意序位 $i,j$ 都有

$$
E\bigl(e_A(i),e_A(j)\bigr)\quad\Longleftrightarrow\quad i+1=j.
$$

这里将纤维元素视为其底层顶点。双射遍历分量的全部顶点且不重复，等价式同时刻画全部有向边。本结论不要求分量数至少为二；孤立分量给出单顶点枚举，空载体没有分量 $A$。
:::

::: proof
同一分量的任意两个顶点都能沿有向路径到达该分量的尾。把这两条路径反向，利用前驱唯一性可比较两个顶点；无环性于是使有向可达关系成为纤维上的严格全序。按此序枚举有限纤维。原始边不能跨过中间序位，否则后继唯一性会迫使产生非空有向循环；反之，相邻序位间的非空路径不能含中间顶点，故必是一条原始边。两个满足等价式的枚举之间的序位变换严格递增，而有限全序上的严格递增自映射必为恒等，因此枚举唯一。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-directed-forest-completion-core title="有向线性森林的端点补全核心" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestCompletion.directed_forest_completion"}
设 $V$ 为有限类型，$E:V\to V\to\operatorname{Prop}$ 同时满足右唯一（每个顶点至多一个出邻点）、左唯一（每个顶点至多一个入邻点）以及 `Relation.TransGen E` 无自反点；再设真实弱连通分量商集 $\operatorname{Component}(E)$ 至少有两个元素。令 $\operatorname{Tail}(E)$ 与 $\operatorname{Head}(E)$ 分别是没有出边与没有入边的顶点子类型，令
$\operatorname{CycleCompletion}(E)$ 为满足 `IsCycleOn Set.univ` 且延拓 $E$ 的实际置换，令 $\operatorname{FullCycle}(W)$ 为 $W$ 上满足 `IsCycleOn Set.univ` 的实际置换。

则存在等价
$q:\operatorname{Component}(E)\simeq\operatorname{Tail}(E)$、
$h:\operatorname{Component}(E)\simeq\operatorname{Head}(E)$
和
$\Phi:\operatorname{CycleCompletion}(E)\simeq\operatorname{FullCycle}(\operatorname{Component}(E))$，使得 $q(A)$ 与 $h(A)$ 的底层顶点都属于分量 $A$，并且对每个补全 $\sigma$ 与分量 $A$ 都有端点等式
$\sigma(q(A))=h(\Phi(\sigma)(A))$。
此外，$\operatorname{CycleCompletion}(E)$ 非空，其有限基数为
$(|\operatorname{Component}(E)|-1)!$（按自然数截断减法与阶乘），并且满足定义中的 `UniformCompletionLaw`：存在实际全环上的均匀概率质量 $\mu_0$ 与补全集上的均匀概率质量 $\mu_E$，延拓事件与 $\mu_0$ 的支撑相交，$\mu_0$ 经 `PMF.filter` 条件化后，等于 $\mu_E$ 沿自然包含映射到全环集的推前；$\mu_E$ 经 $\Phi$ 推前得到分量全环的均匀概率质量；同一 $\mu_E$ 下，端点像 $\sigma(q(A))$ 取 $h(B)$ 的概率在 $A=B$ 时为零，在 $A\ne B$ 时为 $1/(c-1)$，其中 $c=|\operatorname{Component}(E)|$。
:::

::: proof
先由有限性、无环性和后继的唯一性确定每个弱分量的尾，对反向关系作同样处理得到头。延拓置换把所有尾双射到所有头；沿头的首次返回识别原置换与分量置换的轨道，从而得到整圈补全之间的等价。等价给出阶乘计数及非空性，有限均匀概率质量的条件化与推前给出同一补全分布；端点等式再把分量后继的边缘概率传回原始顶点。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-directed-forest-edge-and-completion-mass title="有向森林的边数与补全事件概率" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestCompletionCounts.edge_and_completion_mass"}
设 $E$ 是有限顶点集 $V$ 上右唯一、左唯一的关系，且 `Relation.TransGen E` 无自反点。设 $N=|V|\ge2$，实际弱连通分量数 $c=|\operatorname{Component}(E)|\ge2$，其中包含所有孤立顶点。则实际边集 $\{(x,y):E(x,y)\}$ 的基数为 $N-c$。

设 $\mu$ 是 $V$ 上实际全环组成的集合上的任意均匀概率质量。延拓事件 $\{\sigma:\forall x,y,\ E(x,y)\Rightarrow\sigma(x)=y\}$ 在 $\mu$ 下的外测度为 $(c-1)!/(N-1)!$，且该值严格为正。
:::

::: proof
每条边对应其源点，出边的唯一性使该对应成为到所有有出边顶点的双射。其补集由每个分量的尾组成。端点补全等价给出延拓事件的基数，均匀概率质量将该基数除以全环总数。
:::

[@thm-directed-forest-component-path-order] 刻画每个分量的路径，[@thm-directed-forest-completion-core] 给出补全等价与条件分布，[@thm-directed-forest-edge-and-completion-mass] 给出边数和条件化之前的事件概率。交替约束下的静态分类与计数见下一小节。普通无向整圈的定向纤维见 [@thm-undirected-cycle-orientation-fibers]。

::: {.remark #thm-directed-forest-cycle-completion title="有向森林的单环补全与静态均匀律"}
设 $V$ 为有 $N\ge2$ 个元素的有限标号集，$E\subseteq V\times V$。假定每个顶点在 $E$ 中至多有一条入边、至多有一条出边，且 $E$ 无有向循环。令 $\mathcal C$ 为 $(V,E)$ 的全部弱连通分量组成的集合，包含每一个孤立顶点，并假定 $c=|\mathcal C|\ge2$。

每个分量 $A$ 都是由 $E$ 唯一确定的有向路径，具有唯一无入边的头 $h(A)$ 与唯一无出边的尾 $q(A)$；孤立分量 $\{v\}$ 的两端均为 $v$。此外 $|E|=N-c$。对任意非空有限集 $X$，记 $\operatorname{Cyc}(X)$ 为 $X$ 上只有一个轨道的置换集合。定义实际补全集

$$
\begin{aligned}
\Omega_0&=\operatorname{Cyc}(V),\\
\Omega_E&=\{\sigma\in\Omega_0:\quad
       \sigma(u)=v\ \text{对每条 }(u,v)\in E\}.
\end{aligned}
$$

则 $\Omega_E\ne\varnothing$，且有双射

$$
\begin{aligned}
\Phi:\Omega_E&\simeq\operatorname{Cyc}(\mathcal C),\\
\sigma(q(A))&=h\bigl(\Phi(\sigma)(A)\bigr)
\quad(A\in\mathcal C).
\end{aligned}
$$

这个端点等式唯一确定 $\Phi(\sigma)$。反向对应保留全部 $E$ 边，并对每个 $A$ 添加 $q(A)\to h(\pi(A))$；它穷尽 $\Omega_E$，而不只是给出其中一族构造。

有 $|\Omega_E|=(c-1)!$。令 $\nu_0$ 为 $\Omega_0$ 上的均匀分布，$\mu_E$ 为 $\Omega_E$ 上的均匀分布。则

$$
\nu_0(\Omega_E)=\frac{(c-1)!}{(N-1)!}>0,
$$

将 $\nu_0$ 条件化于延伸 $E$ 的事件，所得分布正是 $\mu_E$；$\Phi$ 将 $\mu_E$ 推前为 $\operatorname{Cyc}(\mathcal C)$ 上的均匀分布。对任意 $A,B\in\mathcal C$，

$$
\mu_E\{\sigma:\sigma(q(A))=h(B)\}
=\begin{cases}
0,&A=B,\\
\dfrac{1}{c-1},&A\ne B.
\end{cases}
$$
:::

::: {.proof #pf-directed-forest-cycle-completion}
以下将 Tsaban 的分量端点、单环补全与均匀律展开为静态书面证明；其中的收缩对应也见 Gessel 第 8 节。补全存在与对应的穷尽性均在证明中明确给出。

**从原始边集得到路径。** 从任意顶点沿唯一前驱反向追溯。有限性与无有向循环保证追溯终止于一个无入边的顶点 $h$。从 $h$ 沿唯一后继正向追溯，同样不会重复顶点，最终停于一个无出边的顶点 $q$。所得路径的内部顶点已经各有一条入边、一条出边；$h$ 无入边，$q$ 无出边。因此没有路径外顶点能通过一条 $E$ 边与路径相接。路径恰好是起始顶点所在的整个弱连通分量。沿它只能在 $h$ 没有前驱、在 $q$ 没有后继，路径次序与两端均唯一。无边时这就是单顶点路径。逐分量相加 $|A|-1$ 条边，得到 $|E|=N-c$，并未预设任何路径列表。

**从所有实际延伸置换收缩。** 暂时取 $V$ 上任意延伸 $E$ 的置换 $\sigma$，不先假定它只有一个轨道。每个非头顶点的入边已由 $E$ 固定。由单射性，尾的像只能是头；每个头又由满射性必须有前像，而非尾顶点的像已固定为路径内的下一个顶点。因此 $\sigma$ 在全部尾与全部头之间给出双射，唯一确定一个分量置换 $\pi$，满足 $\sigma(q(A))=h(\pi(A))$。

反之，给定 $\mathcal C$ 上任意置换 $\pi$，保留路径内后继并按该等式指定每个尾的后继。非头顶点恰有原路径前驱，每个头恰有来自 $\pi^{-1}(A)$ 的尾作为前驱，所以所得映射是 $V$ 上延伸 $E$ 的置换。两种操作逐点互逆。沿该置换行走时，先遍历当前路径的全部顶点，再进入 $\pi$ 指定分量的头。因此其轨道与 $\pi$ 的轨道一一对应；特别地，原置换只有一个轨道当且仅当分量置换只有一个轨道。这证明限制后的 $\Phi$ 确实覆盖全部 $\Omega_E$。

**计数与条件分布。** 固定一个分量 $A_0$，将全部分量按 $A_0,A_1,\ldots,A_{c-1}$ 排列，依次连接并从最后一个回到 $A_0$，便给出单轨道的 $\pi$，进而给出实际补全，故 $\Omega_E$ 非空。从固定 $A_0$ 开始书写，每个单环有唯一这样的次序，故共有 $(c-1)!$ 个；同理 $|\Omega_0|=(N-1)!$。每个 $\sigma\in\Omega_E$ 原来的质量均为 $1/(N-1)!$，除以正的事件概率 $(c-1)!/(N-1)!$，条件质量均为 $1/(c-1)!$。双射每点只有一个前像，推前分布也均匀。

最后，$c\ge2$ 时单轨道的 $\pi$ 不能固定 $A$，故同分量的端点事件为空。若 $A\ne B$，从 $A$ 开始书写分量循环并要求下一个为 $B$，余下 $c-2$ 个分量可任意排列，恰有 $(c-2)!$ 种。因此端点概率为 $(c-2)!/(c-1)!=1/(c-1)$，包括 $c=2$ 时的 $0!=1$。
:::

**边界与障碍。** 孤立点必须参与分量计数：若 $E=\varnothing$，则 $c=N$，定理还原为全部单环上的均匀律。特别地，$N=c=2$ 时唯一补全是交换两个顶点的置换；这是有向二循环，不是无向简单图中的二边形。$c=2$ 时每个尾必接到另一个分量的头。$c=1$ 的最后封口不属于本定理的概率公式：那时只有一条覆盖全部顶点的路径，将其尾接回自己的头才是完成整圈。正是“尚有其他分量”使提前封口成为障碍，而非入度、出度约束本身。

Frieze–Suen，*Counting the Number of Hamilton Cycles in Random Digraphs*（[10.1002/rsa.3240030303](https://doi.org/10.1002/rsa.3240030303)，[原文第 4–5 页](https://www.math.cmu.edu/~af1p/Texfiles/hamsuen.pdf)）也用有向路径收缩唯一识别所有包含规定边的 Hamilton 圈，并得到 $(n-t-1)!$ 的计数。他们从一个已给定 Hamilton 圈上的 $t$ 条边出发；这里先从任意满足假设的原始 $E$ 证明延伸存在，再以 $c=N-|E|$ 得到相同计数，不能反过来把延伸存在当作前提。

## 16.2.2 交替森林：保留端点颜色的完整计数 {#sec-alternating-forest-classification}

普通收缩把每条路径看成一个标号；要求整圈红蓝交替时，还须记住每条路径的头、尾颜色。最小的障碍已经出现在两条边上：$r_1\to b_1$ 与 $b_2\to r_2$ 各自交替，却不能拼成覆盖四点的交替整圈，因为两个可用连接都会接到同色头。相反，$r_1\to b_1$ 与 $r_2\to b_2$ 有唯一补全 $(r_1\ b_1\ r_2\ b_2)$。这些都是实际标号顶点，缩成分量以后也不合并标号。

以下把红、蓝分别记为 $R,B$（源码中的 `false,true`），$\overline R=B$、$\overline B=R$。对任意有限集 $X$，定义

$$
\operatorname{Cyc}(X)=\{\rho\in\operatorname{Perm}(X):
 X\ne\varnothing,\ \rho.\mathrm{IsCycleOn}(X)\}.
$$

这里 `IsCycleOn` 的集合是整个载体。因而 $\operatorname{Cyc}(\varnothing)=\varnothing$，单点集的恒等置换则是一个整圈。循环写法只略去起点：$(x_0\ x_1\cdots x_{j-1})$ 的循环旋转表示同一置换，反向书写一般表示另一个置换；不再对反向取商。

::: {.theorem #thm-alternating-forest-classification title="平衡双色原始森林的交替补全分类与四分支计数" lean="D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.alternating_completion_classification"}
对每个自然数 $n$、有限标号集 $V$、关系 $E\subseteq V\times V$ 与着色 $k:V\to\{R,B\}$，假设：每个顶点至多有一个 $E$ 出邻点、至多有一个 $E$ 入邻点；$\operatorname{TransGen}(E)$ 无自反点；每条 $E$ 边两端异色；且 $|k^{-1}(R)|=|k^{-1}(B)|=n$。

令 $\mathcal C=V/\operatorname{EqvGen}(E)$ 为全部顶点按 $E$ 生成的等价关系所得的真实弱连通分量商集，包含所有孤立点；$[x]_E$ 表示顶点的商类。令 $\operatorname{Head}(E)$、$\operatorname{Tail}(E)$ 分别为无入边、无出边的实际顶点子类型，并定义

$$
\Omega_k(E)=\{\sigma\in\operatorname{Cyc}(V):
 \ \sigma(x)=y\text{ 若 }E(x,y),\quad
 k(\sigma(x))\ne k(x)\text{ 对所有 }x\in V\}.
$$

则存在等价

$$
\begin{aligned}
t&:\mathcal C\simeq\operatorname{Tail}(E),\\
h&:\mathcal C\simeq\operatorname{Head}(E),\\
\Phi&:\Omega_k(E)\simeq
 \{\tau\in\operatorname{Cyc}(\mathcal C):
    k(t(A))\ne k(h(\tau(A)))\text{ 对所有 }A\in\mathcal C\},
\end{aligned}
$$

满足实际分量归属 $[t(A)]_E=A$、$[h(A)]_E=A$，以及对所有 $\sigma\in\Omega_k(E)$、$A\in\mathcal C$ 的连接等式

$$
\sigma(t(A))=h\bigl(\Phi(\sigma)(A)\bigr).
$$

以这同一组端点定义四类实际分量的基数

$$
\begin{aligned}
a&=|\{A:(k(h(A)),k(t(A)))=(R,R)\}|,\\
b&=|\{A:(k(h(A)),k(t(A)))=(B,B)\}|,\\
p&=|\{A:(k(h(A)),k(t(A)))=(R,B)\}|,\\
q&=|\{A:(k(h(A)),k(t(A)))=(B,R)\}|.
\end{aligned}
$$

则 $a=b$、$|\mathcal C|=a+b+p+q$，且 $n\ne0\Rightarrow |\mathcal C|>0$。置 $m=a=b$，有

$$
|\Omega_k(E)|=
\begin{cases}
0,&n=0,\\
m(m+p-1)!(m+q-1)!,&n>0,\ m>0,\\
(p+q-1)!,&n>0,\ m=0,\ p+q>0,\ pq=0,\\
0,&n>0,\ m=0,\ p>0,\ q>0.
\end{cases}
$$

所有减法均为自然数截断减法，$0!=1$。当 $n>0,m=0$ 时，$p+q>0$ 由上述分量总数与非空结论推出，不是额外假设。
:::

::: proof
**真实端点与全部补全。** 从原始 $E$ 沿唯一前驱和唯一后继追踪，有限性与无环性使两端都停下；前一小节的路径论证说明所得路径就是整个弱分量，故给出 $h,t$ 的双射和两条商类归属等式。孤立点的头、尾是同一个实际顶点。这里不先提供路径分解，也不先提供一个补全。

对任意延拓 $E$ 的实际置换，非尾顶点的后继已经固定，非头顶点的前驱也已经固定。单射性与满射性遂使剩余的尾恰好双射到全部头，唯一读出分量置换 $\tau$。反向保留所有路径内边，添加 $t(A)\to h(\tau(A))$，逐点还原原置换。经过一个头后，行走必须穿过整个分量，下一次访问头恰好落在 $h(\tau(A))$；这一首次返回对应识别两边的轨道。因此原置换为整圈当且仅当 $\tau$ 为分量整圈。路径内部已经异色，原置换处处交替恰好等价于所有尾处的连接异色。限制这个双向对应便得到整个 $\Omega_k(E)$ 上的 $\Phi$ 和连接等式，而非某族构造的像。商映射把 $V$ 非空传到 $\mathcal C$ 非空；反向从商类取代表。因此两边都遵守本节的非空整圈约定，包括空集时的排除。

**由占用的入、出边推出平衡。** 原始边将“有出边的红点”双射到“有入边的蓝点”：后继唯一给出映射，前驱唯一给出单射，存在入边给出满射，异色性保证颜色。记其共同基数为 $u$，从两个大小同为 $n$ 的颜色纤维中扣去占用部分，便有

$$
\begin{aligned}
|\{x\in\operatorname{Tail}(E):k(x)=R\}|&=n-u,\\
|\{x\in\operatorname{Head}(E):k(x)=B\}|&=n-u.
\end{aligned}
$$

经 $t,h$ 换成分量库存，左、右分别是 $a+q$ 与 $b+q$，故 $a=b$。四种端点类型分割全部分量，给出总数；$n>0$ 时原始红色纤维非空，商集也非空。这些结论都从原始假设推出。

**把分量标号看成双色辅助弧。** 置
$s(A)=k(h(A))$、$d(A)=\overline{k(t(A))}$。
把每个实际分量标号 $A$ 画作一条 $s(A)\to d(A)$ 的辅助弧。相容条件正是 $d(A)=s(\tau(A))$。于是 $a,b$ 分别数 $R\to B,B\to R$ 的交叉弧，$p,q$ 分别数 $R,B$ 上的自环；源状态纤维大小为 $r=m+p$、$\ell=m+q$。这里的自环是辅助弧，不是原始森林的边。平行弧仍是不同分量标号。

**删去一个自环，再从实际后继插回。** 先在 $m>0$ 的情形，对分量标号数作强归纳。若标号 $c$ 是状态 $z$ 上的自环，删掉它后保留的载体 $L=\mathcal C\setminus\{c\}$ 仍有每方向 $m>0$ 条交叉弧，故 $L$ 非空，两种源状态纤维也都非空。这个非空条件不能省略。

给定原载体上的任意相容整圈 $\tau$，由于尚有其他标号，$y=\tau(c)\ne c$；相容性使 $s(y)=z$。删除 $c$，将它的实际前驱直接连到 $y$，得到 $L$ 上的置换 $\rho$。它仍相容：被改写的唯一连接由 $d(\tau^{-1}(c))=s(c)=s(y)$ 保证。反向从任意 $L$ 上的相容整圈 $\rho$ 与任意槽位 $y\in L$、$s(y)=z$ 出发，把 $\rho^{-1}(y)\to y$ 换成 $\rho^{-1}(y)\to c\to y$。两操作互逆；跳过 $c$ 的首次返回每次走一步或两步，保持全部保留标号的轨道关系，且 $c$ 与 $y$ 在同一轨道。因此删前为整圈当且仅当删后为整圈。

这给出所有实际整圈与“所有保留整圈 $\times$ 所有该状态槽位”的乘积双射。若删掉红自环，保留源纤维大小为 $r-1$，所以计数乘以 $r-1$；蓝自环则乘以 $\ell-1$。归纳中的两个源纤维至少有 $m$ 个元素，故可用 $j(j-1)!=j!$（$j>0$）推进阶乘。删除过程从不把单点自环当成插入空载体的情形。

**无自环的首次返回基例。** 剩余标号只有每方向 $m>0$ 条交叉弧时，令 $L_R,L_B$ 为两个源状态纤维，均有 $m$ 个标号。任意相容置换的限制给出双射 $f:L_R\simeq L_B$、$g:L_B\simeq L_R$；反过来，任意这样的 $f,g$ 在两个纤维上拼成唯一的实际置换。每个蓝标号一步进入红纤维，红标号的首次返回恰为两步，返回置换为 $\kappa=g\circ f$。全部标号在同一轨道当且仅当 $\kappa\in\operatorname{Cyc}(L_R)$。因此对应的完整参数是任意双射 $f$ 和任意红纤维整圈 $\kappa$，其中 $g=\kappa\circ f^{-1}$ 被唯一还原。这不是只列出某族交替圈。基例计数为

$$
m!\,(m-1)!=m\bigl((m-1)!\bigr)^2.
$$

固定自环标号的插回次序，依次插回 $p,q$ 个自环，红色槽位依次为 $m,m+1,\ldots,m+p-1$，蓝色槽位依次为 $m,m+1,\ldots,m+q-1$，得到 $m(r-1)!(\ell-1)!$。

**零交叉与空载体。** 当 $m=0$，所有辅助弧都是自环，相容置换保持源颜色。若 $p,q$ 都正，两个非空颜色集合不能处于同一轨道，故计数为零。若 $pq=0$ 且 $p+q>0$，源颜色恒定，所有标号整圈都相容；固定一个标号作为书写起点，余下可任意排序，计数 $(p+q-1)!$。这包括单个自环的恒等圈，单独处理而不依赖上面的非空保留载体。最后 $n=0$ 时两个颜色纤维都空，$V$ 与 $\mathcal C$ 均空；定义中的非空条件给出零个实际补全，而不是把截断减法后的 $0!$ 误算成一个空圈。经 $\Phi$ 传回这些计数，便得四个分支。完整证明由 Lean 内核检查。
:::

上述无界库存计数的直接源码入口是 [`compatible_cycle_card`](lean:D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.compatible_cycle_card)。正交叉分支有经典 BEST 谱系：Paidi Creed 与 Mary Cryan，*The number of Euler tours of random directed graphs*，*Electronic Journal of Combinatorics* **20**(3)（2013），P13，[10.37236/2377](https://doi.org/10.37236/2377)，Theorem 1，第 2–3 页（[原文](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v20i3p13/pdf)）。原文第 1–2 页只按循环旋转识别 Euler 游程，定理后的说明与脚注允许自环、平行弧。$m>0$ 时上述双色辅助图强连通；向任一根汇入的生成树有 $m$ 种，两点的出度为 $m+p,m+q$，所以 BEST 给出同一正库存公式。这里的形式证明使用实际删插与首次返回，不以一个通用 BEST 定理作黑箱。普通森林收缩沿用前述 Tsaban 与 Gessel 的出处；空载体、断开的零交叉库存、端点平衡和原始森林的完整综合陈述不声称逐字见于这些文献，也不主张文献新颖性。

可行与不可行边界都能手算：$E=\varnothing,n=2$ 时，四个孤立点给出 $a=b=2,p=q=0$，计数 $2$，为 $(r_1\ b_1\ r_2\ b_2)$ 与 $(r_1\ b_2\ r_2\ b_1)$；一条 $r_1\to b_1$ 覆盖全体时，$m=q=0,p=1$，分量恒等圈给出唯一封口；本节开头的反向两路径给出 $m=0,p=q=1$，计数零。因此本定理不预设补全存在、正计数、给定路径分解或强连通性。

::: {.theorem #thm-alternating-completion-law title="交替森林的延拓事件与条件均匀律" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingCompletionLaw.alternating_completion_law"}
在 [@thm-alternating-forest-classification] 的假设下，另设每种颜色有 $n>0$ 个顶点。记 $\Omega$ 为原标号顶点集上的全部交替有向整圈，$S_E\subseteq\Omega$ 为延拓 $E$ 的事件，$M=|\Omega_k(E)|$ 为前述分类给出的实际补全数。存在 $\Omega$ 上的均匀概率质量 $\mu$，每个整圈的质量为 $1/[n!(n-1)!]$，且
$$
\mu(S_E)=\frac{M}{n!(n-1)!}.
$$
这里事件概率在 Lean 中写成有限概率质量的外测度。它严格为正当且仅当 $\Omega_k(E)$ 非空。

每个分量 $A$ 的尾 $t(A)$ 和头 $h(A)$ 均属于 $A$。补全到相容分量整圈的双射 $\Phi$ 保留连接等式 $\sigma(t(A))=h(\Phi(\sigma)(A))$。给定 $S_E$ 与 $\mu$ 的支撑相交的见证，存在实际补全上的均匀概率质量 $\nu$，每个补全的质量为 $1/M$。将 $\nu$ 沿自然包含映射推前所得分布就是 $\mu$ 在 $S_E$ 上的条件分布。同一个 $\nu$ 经 $\Phi$ 推前后，每个相容分量整圈也具有质量 $1/M$。
:::

::: proof
在原标号集上把目标颜色设为源颜色的反色，就得到每个方向各 $n$ 个交叉标号的库存，整圈数为 $n!(n-1)!$。也可以固定一个红顶点作为书写起点，分别排列所有蓝顶点与剩余红顶点。延拓事件的元素与补全集中的实际置换一一对应，所以均匀事件质量由两集合的基数比给出。事件质量为正时，归一化给每个补全相同的质量，分量双射再将该质量传给唯一对应的分量整圈。
:::

Gessel 将线性泛函应用于循环车多项式的乘积，得到交换两个等势部分的置换按循环数计的生成函数。该生成函数的一次项系数是上述 $n!(n-1)!$。取空森林时 $M=n!(n-1)!$，事件概率为 $1$。本小节开头的两条互不相容路径给出 $M=0$，事件概率为 $0$。 [原文第 8 节，第 12 页](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)

::: {.theorem #thm-alternating-connector-mass title="不同分量之间指定连接的概率" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingConnectorLaw.connector_mass"}
沿用 [@thm-alternating-completion-law] 的相容分量整圈均匀律。固定不同分量 $A,B$。若 $s(B)\ne d(A)$，则事件 $\sigma(t(A))=h(B)$ 的概率为零。

若 $s(B)=d(A)$，删除标号 $A$，把 $B$ 的源颜色改为 $s(A)$，其余源颜色及保留标号的目标颜色照旧。记剩余标号集为 $R$，两个源颜色的计数为 $a',b'$，从假到真的交叉计数为 $m'$，两个同色计数为 $p',q'$。令
$$
M'=
\begin{cases}
m'(a'-1)!(b'-1)!, & m'>0,\\
(|R|-1)!, & m'=0 \text{ 且 }(p'=0\text{ 或 }q'=0),\\
0, & m'=0 \text{ 且 } p',q'>0 .
\end{cases}
$$
指定连接的条件概率为 $M'/M$，其中 $M$ 是原有的正补全计数。
:::

::: proof
分量双射把所问事件送到 $\pi(A)=B$。在该事件中的整圈上，删去 $A$ 后，让 $A$ 的前驱直接连到 $B$。将 $B$ 的源颜色改为 $A$ 原来的源颜色，便保留了这条改接边的相容性。逆操作在 $B$ 前紧邻插回 $A$，借由 $s(B)=d(A)$ 保证所插连接相容。辅助跃迁 $s(A)\to d(A)$ 和 $s(B)\to d(B)$ 由 $s(A)\to d(B)$ 取代，故新库存仍平衡。对 $R$ 应用库存计数得到 $M'$。每个原有相容分量整圈的质量都是 $1/M$。
:::

::: {.theorem #thm-alternating-successor-set-bound title="相容整圈的后继集合概率上界" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingSuccessorSetBound.successor_set_mass_le"}
对有限的分量标签集，每个标签 $A$ 各有一个源颜色 $s(A)$ 和一个目标颜色 $d(A)$，两种源颜色各至少出现两次。假设至少存在一个对每个标签 $A$ 都满足 $s(\pi(A))=d(A)$ 的整圈置换 $\pi$，并从这些置换中均匀抽样。固定标签 $A$ 和不含 $A$ 的目标集 $T$，令 $c_A$ 为源颜色等于 $d(A)$ 的标签数。则

$$
\Pr(\pi(A)\in T)\le\frac{|T|}{c_A-1}.
$$

:::

::: proof
[@thm-alternating-connector-mass] 把指定连接的概率化为收缩前后计数的比值。颜色不相容时概率为零。颜色相容时，将收缩后的转移数代入比值，可得单个目标的概率至多为 $1/(c_A-1)$。再对 $T$ 中的目标求和。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-alternating-forest-successor-bound title="交替有向森林中一个分量的后继" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingForestSuccessorBound.mass_of_successor_components"}
在每种颜色各有 $n$ 个顶点的有限集合上，给定有向关系 $E$，记 $m=|E|$。设 $m+2\le n$，且至少存在一个补全 $E$ 的交替有向整圈。从所有这样的补全中均匀抽取一个。

$E$ 的每个弱连通分量都有唯一首端和尾端。对任意分量 $A$ 及不含 $A$ 的分量集合 $T$，$A$ 的尾端以后继边连到 $T$ 中某个分量首端的概率至多为

$$
\frac{|T|}{n-m-1}.
$$
:::

::: proof
补全的存在性保证 $E$ 中每个顶点至多有一条入边和一条出边。若 $E$ 有有向环，该环必经过所有顶点，与边数条件矛盾。按 [@thm-alternating-forest-classification] 用端点对分量分类。每条给定边在任一颜色类中至多除去一个首端，因此每类至少有 $n-m$ 个首端。按首端颜色和尾端要求的颜色，将 [@thm-alternating-successor-set-bound] 应用于均匀抽取的相容分量整圈排列。完整证明由 Lean 内核检查。
:::

## 16.2.3 无向整圈：两个方向与同一完成图 {#sec-undirected-cycle-orientation-fibers}

五个点排成一个无向整圈，顺时针与逆时针是两个不同的后继置换，却给出完全相同的边。忘掉方向时，必须识别的是这两个实际表示，而不只是把一个计数除以二。下面在原来的标号顶点上完成这个对应；已知边甚至可以已经组成整圈。

本节的完整应用见 trureturing 的 [RotationFaces 书面推导](https://github.com/the-omega-institute/trureturing/blob/2731c2994260e6ac22ed3385bbc04b37a63ac7a3/Blueprint/D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.md)。其中调用的冻结结果是 [`cycle_boundary_walk`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_boundary_walk)：它从实际旋转系统、简单闭游走及一个精确的二元面边界，辨认游走的两个方向。下面的较广陈述还要从原始图与置换构造这些输入，因此保留完整书面证明，不将整条应用标为 Lean 验证。

::: {.theorem #thm-undirected-cycle-orientation-fibers title="同一无向整圈的定向纤维与加边对应" status="written-proof" proof="pf-undirected-cycle-orientation-fibers" repository="https://github.com/the-omega-institute/trureturing" source="RotationFaces, orientation-fiber application" request="https://github.com/the-omega-institute/trureturing-requests/issues/12"}
设 $V$ 为有限标号集，$|V|\ge3$，$F$ 为 $V$ 上任意简单图。令

$$
\mathcal H(F)=\{C:\ C\text{ 是 }V\text{ 上连通的简单图},
\deg_C(v)=2\ (v\in V),\ F\le C\}.
$$

令 $\mathcal L(F)$ 为全部实际二元组 $(E,\sigma)$，其中 $E\subseteq V\times V$ 将每条 $F$ 边恰好定向一次、不含其他边，每个顶点至多有一条入边及一条出边；$\sigma\in\operatorname{Cyc}(V)$ 延伸 $E$，即 $E(u,v)\Rightarrow\sigma(u)=v$。$F$ 的孤立点仍在 $V$ 中。定义其无向影图

$$
C_\sigma.\operatorname{Adj}(u,v)
\quad\Longleftrightarrow\quad
\sigma(u)=v\ \text{或}\ \sigma(v)=u.
$$

则 $(E,\sigma)\mapsto C_\sigma$ 是到 $\mathcal H(F)$ 的满射。对任意 $(E,\sigma)\in\mathcal L(F)$，同一影图的整个纤维恰为两个不同的实际二元组

$$
(E,\sigma),\qquad(E^{\mathrm{op}},\sigma^{-1}),
\qquad E^{\mathrm{op}}(u,v)\Longleftrightarrow E(v,u).
$$

反向操作 $\iota(E,\sigma)=(E^{\mathrm{op}},\sigma^{-1})$ 是无不动点的对合，并诱导

$$
\mathcal L(F)/\langle\iota\rangle\ \simeq\ \mathcal H(F),
$$

将每个类送到原来那个实际完成图，因而保持每一对顶点的邻接事件。$\mathcal H(F)$ 可以为空。

此外，对任意不同的 $u,v\in V$，记 $F+uv$ 为只添入无向边 $\{u,v\}$ 的简单图，则有等价

$$
\mathcal L(F+uv)\ \simeq
\{(E,\sigma)\in\mathcal L(F):C_\sigma.\operatorname{Adj}(u,v)\}.
$$

这个等价保留 $\sigma$ 与同一影图，并与反向操作交换。不要求 $F$ 或 $F+uv$ 为森林；将覆盖全部顶点的路径封口、以及 $F=C$ 的情形都包括在内。
:::

::: {.proof #pf-undirected-cycle-orientation-fibers}
**先从原始图得到一个实际表示。** 在有限连通二正则简单图 $C$ 中，从任意顶点出发沿边行走，每次避开刚经过的边。度为二使下一步唯一；有限性使行走最终重复顶点。首次重复只能回到起点：若首次重复的是别的顶点，它在已走过的简单路径中已有两个邻点，再次进入会造成第三个邻点，或立即沿原边折返。所得是简单闭游走 $p$。圈上每个点的两条边已全部占用，不会再有连到圈外的边；连通性因此使其支撑为全部 $V$，其无向边恰为 $C$ 的全部边。

按 $p$ 的次序指定后继，得到 $V$ 上的整圈置换 $\tau$。因为 $|V|\ge3$，$\tau$ 没有不动点，也没有二循环；于是它的无向影图正是 $C$。对 $F\le C$，定义

$$
E_\tau(x,y)\quad\Longleftrightarrow\quad
F.\operatorname{Adj}(x,y)\ \text{且}\ \tau(x)=y.
$$

每条 $F$ 边在 $\tau$ 中恰有一个方向。入、出邻点各至多一个，故 $(E_\tau,\tau)$ 是实际提升，证明满射所需的存在性。这里没有先给 $F$ 一个定向、路径分解或完成图。

**任意实际提升的影图与定向。** 反过来，任取 $(E,\sigma)\in\mathcal L(F)$。整圈条件使每个顶点的轨道长度为 $|V|$，故 $\sigma(v)\ne v$，且 $\sigma(v)\ne\sigma^{-1}(v)$。影图在 $v$ 的邻点恰为这两个不同的点，因此它是简单二正则图；整条置换轨道又给出连通性。$E$ 对每条 $F$ 边所选的方向被 $\sigma$ 延伸，所以 $F\le C_\sigma$。更精确地，对所有 $x,y$ 都有

$$
E(x,y)\quad\Longleftrightarrow\quad
F.\operatorname{Adj}(x,y)\ \text{且}\ \sigma(x)=y.
$$

从右向左的蕴含若失效，$E$ 就必须选择反方向，迫使 $\sigma(x)=y$ 与 $\sigma(y)=x$ 同时成立，违反无二循环。因而 $\sigma$ 决定的是整个二元组，而不只是一个选定构造的像。

**用实际面边界穷尽两个方向。** 固定上述原始 $C$ 与覆盖全部顶点的 $p$，再任取影图为 $C$ 的整圈置换 $\sigma$。把实际有向边 $d=(x,y)$ 称为 dart；在每个顶点交换指向 $\sigma(x)$ 与 $\sigma^{-1}(x)$ 的两个 dart，得到旋转系统 $R$。它的旋转轨道恰为首顶点相同的两个 dart，满足旋转系统的定义。面后继先反向 dart，再作这次交换。给 dart 标上

$$
\ell(x,y)=
\begin{cases}1,&\sigma(x)=y,\\0,&\sigma^{-1}(x)=y,\end{cases}
\qquad\ell(x,y)\in\mathbb F_2.
$$

面后继将 $(x,\sigma(x))$ 送到 $(\sigma(x),\sigma^2(x))$，将 $(x,\sigma^{-1}(x))$ 送到 $(\sigma^{-1}(x),\sigma^{-2}(x))$，所以保持标签。由于面后继是置换，其逆也保持标签；故 $\ell$ 在全部整数步的实际面轨道上恒定，下降为面商集上的函数 $z$，满足 $z(R.\operatorname{face}(d))=\ell(d)$。相反的 dart 标签相反，每条无向边上的二元面边界都是 $1$。$p$ 恰好经过 $C$ 的全部边，故这个边界正是 $p$ 的边指标。

现在冻结的 `cycle_boundary_walk` 的所有输入都已构造：实际图是 $C$，旋转是 $R$，简单闭游走是 $p$，面函数是 $z$，边界等式逐边成立。它给出 $q=p$ 或 $q=p^{\mathrm{reverse}}$，并对每个实际 dart 给出

$$
\bigl(z(R.\operatorname{face}(d)),z(R.\operatorname{face}(d^{\mathrm{op}}))\bigr)=(1,0)
\quad\Longleftrightarrow\quad d\in q.\operatorname{darts}.
$$

左边恰是 $\sigma$ 的后继方向，故 $\sigma=\tau$ 或 $\sigma=\tau^{-1}$。这适用于每个实际提升，没有把全局定向一致性作为假设；也没有使用 Euler 方程。

**实际二元组、取商与加边。** 将刚得的结论用于同一影图的两个任意提升，其置换相等或互逆；定向的强制公式使二元组相等或互为反向。反向两次还原原二元组。若一个提升等于其反向，就有 $\sigma^2=\operatorname{id}$，与长度至少三的整圈矛盾。因此每个纤维恰有上述两个不同元素。满射及这个精确纤维描述使反向轨道与完成图一一对应，而且每个类仍送到同一个 $C_\sigma$，所以逐项保持邻接事件。

最后，从 $\mathcal L(F+uv)$ 出发，保持 $\sigma$，仅将 $E$ 限制到 $F$ 的边；其影图仍含 $uv$。反向从右边任意元素出发，保持 $\sigma$，定义

$$
E'(x,y)\quad\Longleftrightarrow\quad
(F+uv).\operatorname{Adj}(x,y)\ \text{且}\ \sigma(x)=y.
$$

影图含 $F+uv$，无二循环使每条边恰选一次方向；入、出度约束由置换保证。强制定向公式说明限制与扩张互逆，且扩张唯一。两者保留影图；把 $\sigma$ 换为逆置换正好反转所有选择，所以它们与 $\iota$ 交换。整个论证容许加边后已经封成整圈。以上为书面证明，由作者与评审负责。
:::

简单整圈的两个置换表示有经典先例：Greenhill、Janson、Kim 与 Wormald，*Permutation pseudographs and contiguity*，[10.1017/S0963548301005065](https://doi.org/10.1017/S0963548301005065)，原文第 3 页给出二正则伪图的置换重数。本节使用至少三个顶点的普通简单整圈；两顶点时逆置换相同，断开的多个圈也不是一个整圈置换的影图。该出处说明经典重数的谱系，不单独承担本节全部增强的对应与加边结论。

::: {.theorem #thm-uniform-undirected-cycle-completion title="均匀定向提升的无向补全律" lean="D5/S3/Combinatorics/Graph/LinearForests/UndirectedCycleCompletionLaw.uniform_undirected_completion" proof="pf-uniform-undirected-cycle-completion"}
设 $V$ 为有限标号顶点集，$|V|\ge3$，$F$ 为 $V$ 上的简单图，且 $\mathcal H(F)$ 非空。记 $\pi\colon\mathcal L(F)\to\mathcal H(F)$ 为忘去方向的影图映射。存在 $\mathcal L(F)$ 上的概率质量 $\mu$ 和 $\mathcal H(F)$ 上的概率质量 $\nu$，使得对每个提升 $l$ 和完成图 $C$，

$$
\mu(l)=\frac{1}{|\mathcal L(F)|},\qquad
\nu(C)=\frac{1}{|\mathcal H(F)|},\qquad \pi_*\mu=\nu.
$$
:::

::: {.proof #pf-uniform-undirected-cycle-completion}
每个完成图都有两个定向提升。沿候选后继置换逐顶点比较方向时，一条边上选定的方向会确定下一条边的方向，因为回到上一个顶点会形成二循环。于是同一个影图上的两个提升只能相同或互为反向。对固定的完成图求推前质量，就是把这两个提升各自的均匀质量相加，结果为 $2/|\mathcal L(F)|=1/|\mathcal H(F)|$。完整证明由 Lean 内核检查。
:::

该结论适用于固定的普通无向简单图。交替颜色约束、随机名字和端口及自适应历史需要各自的概率模型。

::: {.theorem #thm-alternating-undirected-completion-law title="交替无向环的固定边条件分布" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingUndirectedCompletionLaw.alternating_undirected_completion_law"}
设有限标号顶点集的两个颜色类各有 $n\ge2$ 个顶点。记 $\Omega$ 为这些顶点上每条边都横跨颜色类的无向全环集合。对于同一顶点集上的给定简单图 $F$，记 $\Omega(F)$ 为包含 $F$ 全部边的那些 $\Omega$ 中的环。则
$$
|\Omega|=\frac{n!(n-1)!}{2}.
$$
$\Omega$ 上存在均匀概率质量函数 $\mu$。它对包含 $F$ 的事件赋予的外测度为 $|\Omega(F)|/|\Omega|$，该值严格为正当且仅当 $\Omega(F)$ 非空。当事件有正质量时，$\mu$ 在包含 $F$ 的条件下的分布，是 $\Omega(F)$ 上的均匀概率质量沿包含映射的推前。
:::

::: proof
交替的后继置换忘掉方向后给出交替无向环。一个交替无向环的两个方向均交替，所以每个无向环恰有两个有向表示。将有向环总数 $n!(n-1)!$ 除以二即得无向环总数。包含 $F$ 的条件在该有限均匀空间中选出子集 $\Omega(F)$。对这个子集上相等的点质量归一化，即得条件分布。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-complete-neighborhood-history title="完整邻居记录的边延拓与度数判据" lean="D5/S3/Combinatorics/Graph/Queries/CompleteNeighborhoodHistory.history_eq_iff_extension"}
固定有限标号顶点集和一个确定性自适应协议。协议查询顶点并取得完整的无序邻居集。取协议在图 $H$ 上实际产生的记录，令 $F$ 恰含记录返回的所有无向边。对同一标号集上的候选简单图 $G$，协议重现该记录的充要条件是 $F\le G$，且每次已记录查询的顶点在 $G$ 中的度数至多为该次回答的邻居数。
:::

::: proof
若两份记录相同，则每次记录中的回答也是所查询顶点在 $G$ 中的完整邻居集。因此 $G$ 含有 $F$ 的每条边，并且每项度数上界都取等号。

反过来，设 $G$ 包含 $F$ 并满足已记录的度数上界。固定协议在两张图上首先查询同一顶点，边包含关系使第一份回答中的每个邻居都属于该顶点在 $G$ 中的邻居集。度数上界给出反向的基数不等式，故两个有限集合相等。相同的回答使协议进入同一个后续分支。后续记录中的边仍在 $G$ 中，对应的度数上界也仍成立，因此沿后续分支归纳可得整个记录相等。完整证明由 Lean 内核检查。
:::

若分布中的图在每个标号顶点的度数都与参考图 $H$ 相同，则该图族的候选图都满足已记录的度数上界。这时记录事件恰为 $F\le G$，在正概率时两者给出同一条件分布。该模型固定标号、确定性协议和完整无序回答。随机命名、查询命名集合之外的顶点，以及附带端口或颜色信息的回答，各需相应的观察模型。

::: {.theorem #thm-fixed-neighbor-order-likelihood title="每个顶点固定一种邻居次序时的记录似然" lean="D5/S3/Combinatorics/Graph/Queries/FixedNeighborOrder.fixed_neighbor_order_likelihood"}
固定有限标号顶点集及度数函数 $d$。每个顶点 $v$ 的 $d(v)$ 个邻居各自取一个均匀次序，各顶点的选择相互独立。每次查询同一顶点都返回先前为该顶点选定的完整有序列表。固定一个确定性自适应协议，以及它在度数轮廓为 $d$ 的参考图与某组次序上实际产生的有序记录 $\tau$。记 $F_\tau$ 为记录返回的边构成的图，$Q_\tau$ 为其中不同的被查询标号所成集合。

对于具有相同度数轮廓的候选图 $G$，对其端口次序取样时，该记录的似然为
$$
\Pr(\tau\mid G)=\mathbf{1}_{\{F_\tau\le G\}}\left(\prod_{v\in Q_\tau}d(v)!\right)^{-1}.
$$
:::

::: proof
如果缺少任一条报告边，则该图不能产生所给记录。若所有报告边均存在，逐点度数确定每个已查询点报告的邻居恰为完整邻居集。每个不同的已查询标号因而指定了一个完整邻居排列。具备这些排列的次序表会使协议重现该记录。未查询顶点的次序可以任取，重复查询则读取该标号上已经固定的排列。将相容次序表的数量除以全部次序表的数量，即得上述似然。完整证明由 Lean 内核检查。
:::

在记录概率为正时，同一个因子乘到每张包含 $F_\tau$ 的候选图上，因此图的后验律为先验在该边延拓事件下的条件律。若每次查询都独立重新排列邻居，那是另一种实验，乘积按查询次数而非不同标号计。

在抽象探索树中，披露一条路径时，有些位置只观察到两个前向槽位之一。给每个抽象位置独立选取两个可用值的均匀排列。可用的两个值可以随底层图改变。

::: {.theorem #thm-partial-forward-order-likelihood title="部分前向顺序观察的似然" lean="D5/S3/Combinatorics/Graph/Queries/PartialForwardOrderLaw.partial_forward_order_likelihood"}
固定有限个位置，每个位置有两个互异的可用值。观察可以指定其中零个、一个或两个有序槽位。若每个指定的值在该位置可用，且同一位置的两个指定槽位取值不同，则称观察相容。若有 $s$ 个位置至少有一个槽位被指定，相容观察的概率为 $2^{-s}$，不相容观察的概率为零。
:::

::: proof
每个被观察的位置，第一个指定值已确定两个排列中的一个。若还指定第二个值，它必须是另一个可用值。因此，相容观察独立地固定每个被观察位置的一个排列，其余位置的排列保持自由。完整证明由 Lean 内核检查。
:::

把已经观察的位置固定之后，若下一段只读取尚未用过的位置，每个新位置仍贡献一个二分之一的因子。

::: {.theorem #thm-fresh-forward-suffix title="未使用位置上的槽位条件似然" lean="D5/S3/Combinatorics/Graph/Queries/ForwardSuffixLaw.suffix_after_prefix"}
在有限个位置各固定两个互异的可用值，并为各位置独立选取均匀次序。取两份固定的部分观察，要求它们所观察的位置集合没有交集。假设先前观察满足 [@thm-partial-forward-order-likelihood] 的相容条件。给定先前观察，后续观察相容时的概率为 $2^{-s}$，否则为零，其中 $s$ 为后续观察所涉及的位置数。
:::

::: proof
两份表所约束的位置没有交集，因此联合事件恰好匹配合并后的观察表。每个被任一份表观察的位置贡献一个二分之一的因子。如果后续观察不相容，联合似然为零。除以先前观察的正似然，约去先前位置的全部因子。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-partial-forward-order-posterior title="部分前向顺序观察下的后验" lean="D5/S3/Combinatorics/Graph/Queries/PartialForwardOrderLaw.partial_forward_order_posterior"}
从先验概率质量函数 $\pi$ 抽取一个世界，由它决定每个位置的两个可用值。在每个位置独立抛一枚公平硬币，决定保留还是交换两个索引。硬币独立于世界，排列后的值由世界给出的两个可用值决定。固定观察 $E$，设 $C$ 是与它相容的世界组成的集合。若 $E$ 的概率为正，则对任意世界集合 $B$，

$$
\Pr(B\mid E)=\frac{\pi(B\cap C)}{\pi(C)}.
$$

:::

::: proof
在每个世界中，被观察的位置相同。由 [@thm-partial-forward-order-likelihood]，世界落在 $B$ 且观察吻合的联合概率为 $2^{-s}\pi(B\cap C)$，观察的总概率为 $2^{-s}\pi(C)$。二者相除即得所述分布。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-world-mixed-forward-suffix title="图世界变化时的新位置后缀界" lean="D5/S3/Combinatorics/Graph/Queries/WorldMixedForwardSuffix.joint_fresh_suffix_bound"}
按任意离散先验抽取图世界 $w$。每个世界为有限的各位置提供两个不同的带索引值。在每个位置，等概率地保留或交换两个索引。各位置的随机选择彼此独立，也独立于世界。将这些置换应用于所抽世界给出的值。固定一张部分前缀表，令 $E$ 为所得槽位值与该表相符的事件。对每个世界指定一张部分后缀表，其位置与前缀表的位置不交。令 $F$ 为槽位值与所抽世界的后缀表相符的事件。

设 $B$ 是一组图世界，且 $B$ 中每个世界的后缀表都观察至少 $n$ 个不同位置。若 $\Pr(E)>0$，则

$$
\Pr(w\in B,\ F\mid E)\le \Pr(w\in B\mid E)\,2^{-n}.
$$

Lean 用非负扩展实数的概率比值表达该上界。前缀概率为零时，两个分子事件都是 $E$ 的子事件，概率也为零。按 $0/0=0$ 的约定，比值不等式此时等号成立。
:::

::: proof
固定一个世界。若该世界与前缀不相容，前缀事件及其子事件的概率都为零。若前缀相容，[@thm-fresh-forward-suffix] 给出后缀命中的条件概率。在 $B$ 内，每张后缀表至少指定 $n$ 个新位置，因此该概率至多为 $2^{-n}$。按先验对各世界的联合概率求和，再除以前缀的总概率。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-uniform-remaining-name-hit title="给定部分命名后猜中可用名字的概率" lean="D5/S3/Combinatorics/Probability/PartialNameAssignment.uniform_remaining_name_hit"}
从有限顶点集到有限名字集的所有单射中均匀选取一个。固定顶点子集 $K$ 上的单射命名，并取一个与所有已固定名字不相交的可用名字集 $A$。假设至少有一个单射符合固定命名，并将其余顶点的名字全部取自 $A$。在这些条件下，所有相容单射等概率。在同一个条件分布下，对每个 $a\in A$，它被分配给某个剩余顶点的概率等于剩余顶点数除以 $|A|$。
:::

::: proof
相容单射的先验质量相同，因此条件化后仍等概率。将相容单射限制到剩余顶点，便与取值于 $A$ 的单射建立双射。其逆操作补入固定命名，而固定名字都在 $A$ 之外，所以不破坏单射性。在任意一个剩余顶点上，交换 $A$ 中两个名字会交换在该点取这两个值的单射集合。因此该顶点取指定名字的概率是 $1/|A|$。单射中该名字至多出现一次，将各顶点互斥的命中概率相加即得公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-uniform-residual-naming-restriction title="一组指定剩余顶点的联合均匀命名律" lean="D5/S3/Combinatorics/Probability/NamingRestrictionLaw.uniform_residual_restriction"}
设顶点集与名字集 $N$ 都有限。固定部分顶点到 $N$ 的单射命名，取与固定名字不交的可用名字集 $A \subseteq N$。假设至少有一种单射命名延拓固定命名，并且其余顶点的名字都取自 $A$。从这些延拓中均匀抽样。

以单射 $\iota$ 将有限指标集 $Z$ 嵌入剩余顶点集。按 $\iota$ 读取的名字共同给出单射 $g\colon Z\hookrightarrow A$。该单射在所有从 $Z$ 到 $A$ 的单射上均匀分布，每个 $g$ 的概率为 $1/|\operatorname{Inj}(Z,A)|$。
:::

::: proof
按 [@thm-uniform-remaining-name-hit]，相容的完整命名与剩余顶点到 $A$ 的单射一一对应。任取两种限制命名，它们给出相应名字之间的双射。将这个双射扩张为 $A$ 上的置换，再把该置换复合到每种剩余命名上，即得两个延拓纤维间的双射。各纤维的概率相同，总和为一。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-uniform-naming-update title="扩充命名后的均匀完成律" lean="D5/S3/Combinatorics/Probability/NamingUpdate.uniform_after_reveal"}
设顶点集和名字集都有限。先在顶点子集 $K$ 上固定单射命名，要求其余顶点的名字取自集合 $A$。选定包含 $K$ 的集合 $L$，在 $L$ 上给出一个扩充单射命名。它保留 $K$ 上的固定名字，并给 $L\setminus K$ 中每个顶点分配一个 $A$ 中的名字。假设至少有一个原有完成与扩充命名相符。

与扩充命名相符的原有完成，和使用剩余可用名字完成扩充命名的单射，一一对应。剩余可用名字是从 $A$ 中删除扩充命名使用的全部名字所得的集合。对应保持同一全体顶点命名，因此原有均匀完成律在「与扩充命名相符」事件下的条件分布，正是扩充命名的均匀完成律，两边都视为全体顶点的命名分布。
:::

::: proof
原有完成在 $L$ 上与扩充命名相符时，单射性阻止 $L$ 以外的顶点使用任何扩充命名中的值。反过来，扩充命名的完成在新命名的顶点上满足原来的可用名字要求，在剩余顶点上也只使用 $A$ 中的值。两次转移只改变对同一个单射的约束描述。对有限均匀分布作条件化，就得到相容完成上的均匀分布。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ordered-naming-reply title="有序命名答复的概率" lean="D5/S3/Combinatorics/Probability/OrderedNamingReply.ordered_reply_mass"}
设顶点集 $V$ 和名字集 $N$ 都有限。固定部分顶点的单射命名，取与固定名字不交的可用名字集 $A\subseteq N$。假设至少有一种单射命名延拓固定命名，且其余顶点的名字都在 $A$ 中。从这些延拓中均匀抽样。

固定一个请求映射 $r\colon I\to V$，在位置 $i$ 返回顶点 $r(i)$ 的名字。令 $U$ 是请求选中的、尚未固定名字的不同顶点的集合。一个答复 $a\colon I\to N$ 相容，当且仅当它在已有固定名字的位置给出该名字，在其余位置给出 $A$ 中的名字，并满足对所有 $i,j$ 有 $a(i)=a(j)$ 当且仅当 $r(i)=r(j)$。每个相容答复的概率为 $1/|\operatorname{Inj}(U,A)|$，每个不相容答复的概率为零。
:::

::: proof
对 $U$ 中每个顶点，从该顶点的任一请求位置读取名字。相容条件使这个名字与位置的选择无关，并使不同顶点得到不同名字。于是每个相容答复唯一确定一个从 $U$ 到 $A$ 的单射。反过来，该单射连同固定名字恢复所有请求位置的名字。将 [@thm-uniform-residual-naming-restriction] 的均匀分布沿这个对应送到答复，即得公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-ordered-reply-completion title="有序答复与完整命名的联合分布" lean="D5/S3/Combinatorics/Probability/JointNamingReplyCompletion.joint_ordered_reply_completion"}
设有限顶点集 $V$ 的子集 $K$ 上已固定到有限名字集 $N$ 的单射命名。可用名字集 $A\subseteq N$ 与固定名字不交，且至少有一种单射完成在 $K$ 外只使用 $A$ 中的名字。固定请求映射 $r\colon I\to V$，令 $L=K\cup r(I)$，并令 $U=r(I)\setminus K$。

从所有这类完成中均匀抽取一个完整命名 $f$，读取答复 $a=f\circ r$。按 [@thm-ordered-naming-reply] 的相容条件，每个相容答复的概率为 $1/|\operatorname{Inj}(U,A)|$，其余答复的概率为零。对每个正概率答复，存在 $L$ 上的扩充单射命名，在所有请求位置给出该答复，并且至少有一种完整命名在 $L$ 外只使用 $A$ 中尚未被扩充命名使用的名字。存在一种条件抽样规则，在每个正概率答复下均匀抽取这样的完成。先抽答复再按此规则抽取完成，得到的 $(a,f)$ 与先抽完整命名再读取答复的联合分布相同。
:::

::: proof
在原有完成中，给定答复等价于在 $L$ 上与扩充命名一致。[@thm-uniform-naming-update] 将这个条件分布识别为使用剩余可用名字的均匀完成律。把每个答复的概率乘以相应的条件完成概率，就恢复每一对答复与完整命名的联合概率。完整证明由 Lean 内核检查。
:::

例如，两个尚未命名的顶点和五个可用名字，使任意指定可用名字的命中概率为 $2/5$。在自适应图查询后应用该公式，还需从实际回答确定对命名施加的约束。Childs 等人在 [quant-ph/0209131v2 第 IV 节](https://arxiv.org/abs/quant-ph/0209131v2) 利用稀疏名字空间控制猜中已知名字之外的名字的概率。

固定一张图和一个确定性策略，每次以名字查询。命中时，黑盒返回完整的无序邻居名字集，未命中时返回专用标记。在实际记录中，令 $S$ 包含最初给出的名字、成功查询使用的名字和回答给出的邻居名字。令 $B$ 为查询未命中的名字集合。尚可猜测的新名字构成 $A=N\setminus(S\cup B)$。

::: {.theorem #thm-named-neighborhood-history-fiber title="给定观察名字的顶点对应后，哪些命名与记录相容" lean="D5/S3/Combinatorics/Graph/Queries/NamedNeighborhoodHistory.history_fiber_iff"}
假设最初给出的名字都出现在参考命名中。在所有与参考命名于 $S$ 对应顶点处一致的单射中，能够重放完整参考记录的，恰为给其余每个顶点分配 $A$ 中名字的单射。
:::

::: proof
成功查询的名字及其全部邻居名字固定后，成功回答得以重现。避开 $B$ 使未命中的回答也得以重现。每次回答相同，确定性策略就作出相同的下一次查询。反过来，重现未命中的记录要求单射的值域避开这些名字，单射性也把 $S$ 留给已有名字的顶点。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-named-neighborhood-fresh-name-hit title="新名字命中顶点的条件概率" lean="D5/S3/Combinatorics/Graph/Queries/NamedNeighborhoodHistory.conditional_unseen_name_hit"}
设顶点集 $V$ 和名字集 $N$ 都有限。从所有单射中均匀选取命名，以实际参考记录及与最初给出的名字一致为条件。最初给出的名字都出现在参考命名中。对每个 $a\in A$，查询 $a$ 命中一个顶点的概率为
$$
\frac{|V|-|S|}{|A|}.
$$
:::

::: proof
参考命名本身属于条件事件，因此事件非空。每个相容命名恰好占用 $|V|-|S|$ 个新名字。交换任意两个新名字保持初始命名及所有记录回答，因此给出分别命中这两个名字的相容命名之间的双射。按名字和按相容命名对命中配对作两次计数，即得所求概率。完整证明由 Lean 内核检查。
:::

该公式采用策略能看到的记录和给定的初始命名。在不同相容命名中，后来看到的名字可以属于不同顶点。若有一个隐藏顶点和两个最初可用的名字，对其中一个名字查询未命中后，另一个名字必定命中。这里计算的是该黑盒下下一次查询的概率。Childs 等人的游戏转换还控制整个有界查询过程内猜中任一尚未揭露名字的事件，见 [quant-ph/0209131v2 第 IV 节引理 4](https://arxiv.org/abs/quant-ph/0209131v2)。

策略可以把未知名字的查询留在自己的计算里，并在模拟记录中填入未命中。只有查询已经知道的名字时，模拟器才调用黑盒。每个世界确定同一个查询黑盒，真实运行和模拟运行都使用它。

::: {.theorem #thm-known-name-simulation-budget title="只查询已知名字的模拟守住查询预算" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.simulated_sent_names_bound"}
给定返回完整邻居名字集或未命中标记的查询函数，以及初始已知名字集合。若确定性策略的每个分支最多发出 $q$ 次查询，则上述模拟实际调用黑盒的次数最多为 $q$。
:::

::: proof
每个模拟步骤都沿策略的一条分支推进，无论回答来自黑盒还是由模拟器填入。模拟记录最多有 $q$ 项，实际调用只计其中发给黑盒的查询。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-known-name-simulation-success title="模拟与真实运行的成功概率之差由猜中新名的事件控制" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.success_mass_le_simulated_add_guessed_hit"}
给定具有概率质量函数的世界集合。每个世界给出查询函数，成功条件可以依赖世界和整份记录。设 $E$ 为真实运行中至少一次查询命中当时未知的名字的事件，则
$$
\Pr(\text{真实运行成功})\le \Pr(\text{模拟运行成功})+\Pr(E).
$$
:::

::: proof
在 $E$ 的补集里，对已知名字的查询，两条运行接收同一回答。对未知名字的查询，真实黑盒也返回未命中。每步给出同一回答，因而递归地选中同一个后继，更新同一份已知名字集合。整个记录相同，所以真实运行成功的世界落在模拟成功事件与 $E$ 的并集中。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-known-name-exploration-size title="已知名字探索揭露的名字数" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameExplorationSize.known_names_card_bound"}
给定有限的名字空间及顶点到名字的注入。只给出一个根的名字。设根的度数至多为 $b$，所有顶点的度数至多为 $b+1$。运行 [@thm-known-name-simulation-success] 使用的已知名字模拟器，设它向真实黑盒发送了 $q$ 次完整无序邻居查询。每次实际发送的调用都计入 $q$，包括重复调用。运行结束时，已知的不同名字至多有 $1+bq$ 个。特别地，在根的度数为二、最大度数为三时，该上界为 $1+2q$。
:::

::: proof
第一个已知名字属于根。每个后来揭露的非根顶点都曾出现在一个已知邻居的回答中，所以查询它时，返回的至多 $b+1$ 个邻居中至少有一个名字已经知晓。查询根时至多得到 $b$ 个名字。模拟器拦截的查询不增加任何名字，也不给真实黑盒增加调用。完整证明由 Lean 内核检查。
:::

还可以在运行中途拿到下一次查询。对长度 $i$ 的真实前缀，沿每项回答重放策略。如果策略已经停止，下一次查询为空，否则它就是记录中从零开始编号为 $i$ 的查询。这一步由 [`nextQuery_of_prefix`](lean:D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.nextQuery_of_prefix) 给出。由此可以对每个前缀应用 [@thm-named-neighborhood-fresh-name-hit] 的单步概率，再研究整个预算内的 $\Pr(E)$。

现在把单步命中率合成整个运行的概率。仍固定有限简单图和初始给定的名字及其顶点对应，从保留这些对应的单射中均匀抽取命名。设名字总数为 $|N|$，顶点数为 $|V|$，初始已知名字集为 $S_0$。最初尚可猜测的名字有 $L=|N|-|S_0|$ 个，其中 $D=|N|-|V|$ 个未命名任何顶点。令 $r=\min(q,L)$。

::: {.theorem #thm-fresh-name-budget-survival title="自适应猜中新名字的超几何上界" lean="D5/S3/Combinatorics/Graph/Queries/FreshNameGuessBound.fresh_guess_survival_ge"}
在上述分布下，确定性策略可根据完整无序邻居回答或未命中标记选择下一次查询。将运行截断在至多 $q$ 次查询。每次成功查询的名字都在被查询前已经知晓的概率至少为
$$
\frac{\binom{D}{r}}{\binom{L}{r}}.
$$
因此，在该预算内猜中至少一个当时未知的名字的概率至多为一减去这个比值。
:::

::: proof
把此前尚未猜中新名字的命名按实际前缀分组。每组的下一次查询固定。若查询已经知晓的名字、重复查询已知无效的名字，或策略已经停止，该组在这一步全部保留。否则，若已有 $d$ 个起初未知的有效名字被揭露，且记录中有 $b$ 个不同的未命中名字，[@thm-named-neighborhood-fresh-name-hit] 给出的命中率为 $(L-D-d)/(L-d-b)$。走过 $i$ 次查询时有 $b\le i$。在 $i<D$ 时，该命中率至多为 $(L-D)/(L-i)$。对各组求和，每步的条件存活率至少为 $(D-i)/(L-i)$。将这些下界相乘得到所给比值。若 $r>D$，分子为零。若起初全部有效名字都已知，运行始终满足所求事件。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-fresh-name-budget-attainment title="依次试探互异名字达到上界" lean="D5/S3/Combinatorics/Graph/Queries/FreshNameGuessBound.exists_strategy_attaining_guess_survival"}
在 [@thm-fresh-name-budget-survival] 的同一模型和预算下，存在一个每条分支至多查询 $q$ 次的确定性策略，使该概率恰好等于 $\binom{D}{r}/\binom{L}{r}$。
:::

::: proof
选定 $r$ 个互异的初始未知名字，按固定顺序查询，首次命中即停止。所有查询都未命中的充要条件是所抽命名避开整个名单。未命名顶点的注入计数给出恰好上述比值。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-first-observed-cycle title="探索何时首次看到环" lean="D5/S3/Combinatorics/Graph/Queries/FirstObservedCycle.first_observed_cycle"}
从有限简单图的根出发，每次查询沿已暴露边从根可达的一个顶点的完整邻居集。某一时刻的暴露图恰由原图中至少有一个端点已经被查询的边组成。设查询 $x$ 之前的暴露图无环。这次回答产生环，当且仅当 $x$ 此前未被查询，且 $x$ 有一个也尚未被查询、在查询前已从根可达的邻居。
:::

::: proof
重复查询不增加边。首次查询 $x$ 时，新边恰好通向未查询的邻居。若其中某个邻居此前已经可达，这条边便闭合暴露图中的一条路径。否则，每个由新边触及的邻居原本都是孤立点，因为已暴露的每条边都接到某个先前查询过的顶点，而这些顶点都从根可达。新增边只接入叶子，暴露图仍然无环。完整证明由 Lean 内核检查。
:::

碰撞路径越过最后一条焊边后，还可能沿固定二叉树走若干步。下面的求和按树内距离归类这条焊边的落点，距离从两条路径相遇的顶点算起。

::: {.theorem #thm-binary-tree-weighted-leaf-distance title="完全二叉树所有叶子的二进权重和" lean="D5/S3/Combinatorics/Graph/Queries/BinaryTreeLeafDistance.weighted_leaf_distance"}
将深度为 $k$ 的完全二叉树的顶点标为长度至多为 $k$ 的二进制串，两个顶点相邻当且仅当其中一个串是另一个串的一位延拓。设 $z$ 的深度为 $d$，$d_{\mathrm{tree}}(z,y)$ 为 $z$ 到深度为 $k$ 的叶子 $y$ 的图距离。则

$$
\sum_{|y|=k} 2^{-d_{\mathrm{tree}}(z,y)}
=\frac32-2^{-(d+1)}.
$$

求和恰好计入每个长度为 $k$ 的二进制串一遍。
:::

::: proof
一条最短路径先回到最长公共前缀，再沿树边向下到目标。每条边至多改变剩余前缀距离一单位，这条路径也始终在深度限制内。在根处，$2^k$ 个叶子各贡献 $2^{-k}$。若 $d>0$，$z$ 所在分支的贡献等于深度 $k-1$ 的树中从深度 $d-1$ 出发的权重和。另一分支的 $2^{k-1}$ 个叶子距离都是 $k+d$，共贡献 $2^{-(d+1)}$。合并两项后归纳即得公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bounded-word-tree-cut title="删去父子边后的两个连通分支" lean="D5/S3/Combinatorics/Graph/Queries/WordTreeCut.bounded_reachable_after_extension_cut"}
在深度上限为 $k$ 的二叉词树中，选定父词 $p$ 及一个比特 $a$，要求把 $a$ 接到 $p$ 后得到的子词 $pa$ 的长度至多为 $k$。删去连接 $p$ 和 $pa$ 的边。两个顶点仍然相连，当且仅当它们同属以 $pa$ 为前缀的子树，或者都在该子树之外。
:::

::: proof
沿树边走一步，就是在词尾添加一个比特或删去最后一个比特。跨越「以 $pa$ 为前缀」的边界必须走过 $p$ 与 $pa$ 之间的边。该子树内的顶点逐步删去末尾比特即可到达 $pa$，该子树外的顶点则可一路到空词。两类路径都遵守深度限制，也都避开被删的边。完整证明由 Lean 内核检查。
:::

图本身随机时，实际记录也会改变图的分布。设图索引 $g$ 服从先验 $\pi$，所有候选图共用有限顶点集 $V$。独立地从符合最初给定赋名的单射中，均匀选取从 $V$ 到有限名字集 $N$ 的命名。固定一个确定性策略在一组符合初始赋名的参考图和命名上产生的实际记录 $\tau$，每次回答是完整无序邻居集或未命中。记 $S$ 为最初给出的名字与所有成功查询及其回答中出现的名字，$B$ 为查询未命中的名字集。

把单射 $S\hookrightarrow V$ 称为名字的顶点对应。若该对应与最初赋名一致，且将每条成功回答映成被查询顶点的整个邻居集，就称它在图 $g$ 上可行。记 $F_\tau(g)$ 为可行对应数。

::: {.theorem #thm-joint-named-transcript-count title="可行顶点对应有相同数量的命名延拓" lean="D5/S3/Combinatorics/Graph/Queries/JointNamedTranscript.transcript_naming_count"}
图 $g$ 上与最初赋名一致且能重放 $\tau$ 的单射命名数为

$$
F_\tau(g)\bigl(|N|-|S|-|B|\bigr)_{\underline{|V|-|S|}},
$$

其中 $a_{\underline b}$ 是下降阶乘。
:::

::: proof
每个相容命名在 $S$ 上取逆，便唯一确定一个可行对应。固定一个可行对应后，将不在其像中的顶点单射到 $N\setminus(S\cup B)$，即可补全命名。这样的补全保持所有成功回答的完整邻居集，也让 $B$ 中的名字继续未被使用。策略是确定性的，因此局部回答一致足以重放整份记录，包括停止位置。对剩余单射计数即得公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-named-transcript-posterior title="给定实际记录的图索引后验" lean="D5/S3/Combinatorics/Graph/Queries/JointNamedTranscript.graph_posterior"}
若 $\tau$ 在该联合试验中有正概率，则

$$
\Pr(g\mid \tau)=
\frac{\pi(g)F_\tau(g)}{\sum_h\pi(h)F_\tau(h)}.
$$

:::

::: proof
在每张图上，用相容命名数除以满足最初赋名的全部命名数，便得到记录的似然。总命名数与 [@thm-joint-named-transcript-count] 中的下降阶乘都对所有图索引相同。记录的概率为正，因此这两个因子可在条件概率的比值中约去。完整证明由 Lean 内核检查。
:::

例如，从顶点 $0,\ldots,4$ 上度数向量为 $(3,2,2,2,1)$ 的图中均匀选取一张，并固定顶点 $0$ 的名字为 $r$。顶点 $0$ 所在的连通分支至少有四个顶点，且所有顶点的度数都为正，因此每张图都连通。每张图有五条边，因而恰有一个环。按度数只有两种结构，各有三张标号图。一种是四边形外接边 $04$，另一种是三角形在顶点 $0$ 处接上一条通往 $4$ 的两边路径。

设查询 $r$ 得到 $\{a,b,c\}$，再查询 $a$ 得到 $\{r,d\}$，五个名字互异。在四边形中，$a$ 可以指向 $0$ 的任一个环上邻居，$b,c$ 可以按两种次序分给其余两个邻居。在三角形中，$a$ 必须指向所接路径的内部顶点，而 $b,c$ 仍有两种次序。因此两类图的可行对应数分别为四和二。每张四边形图的后验概率为 $2/9$，每张三角形图的后验概率为 $1/9$，尽管六张图的先验概率相同，且在每个顶点的度数也相同。

::: {.theorem #thm-alternating-weld-orientation title="黏合环及其方向的共同概率分布" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingWeldOrientationLaw.alternating_weld_orientation_law"}
在至少有三个顶点且染有两色的有限底集上，固定一个可补全为交替无向整圈的简单图 $F$。交替有向补全的均匀分布在忘掉方向后给出 $F$ 的交替无向补全的均匀分布。每个给定方向含有 $|F|$ 条弧，其中 $|F|$ 是无向边数。给定一个有正概率的方向，完整后继排列在补全该有向关系的所有交替有向整圈中均匀分布。将任一这样的有向补全放回原来的样本空间，保留给定边的方向及完整后继排列。
:::

::: proof
无向补全恰有两个互为反向的提升，且忘掉方向前后的交替条件等价。两种分布各自给定交替事件后仍保持投影关系。$F$ 的每条边恰好取得一个方向。固定这些方向后，纤维与该有向关系的交替补全一一对应，而双射保留均匀性。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-unordered-weld-transcript-law title="完整无序查询记录下的黏合环条件分布" lean="D5/S3/Combinatorics/Graph/Queries/UnorderedWeldTranscript.weld_transcript_law"}
用一个单射将两组互不相交的叶子嵌入固定有限图的顶点集，每组有 $n\ge2$ 个叶子。在叶子上均匀抽取一个交替无向整圈，并将其加入固定图。确定性自适应协议查询顶点，每次得到完整的无序邻居集。固定一个参考交替无向整圈，要求其嵌入后的边与固定图的边互不相交。从参考记录所报告的边中删去固定图的边，再沿单射拉回叶子集，得到图 $F$。

候选整圈产生参考记录的充要条件是它包含 $F$。设共有 $M$ 个无向交替整圈包含 $F$，则参考记录出现的概率是
$$
\frac{M}{n!(n-1)!/2}.
$$
若记录的概率为正，给定这份记录的黏合环在这些补全上均匀分布。
:::

::: proof
重放参考记录必须保留其中每条非固定边。这些边的两个端点都来自叶子集。反过来，包含 $F$ 保证并图包含记录中的所有边。参考整圈在每个叶子处增加两条固定图以外的边，在其他顶点处增加零条。因此候选并图在每个查询点的度数不超过参考并图。应用 [@thm-complete-neighborhood-history] 得到整份记录相同，再用 [@thm-alternating-undirected-completion-law] 计算概率并归一化。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-weld-completion-fresh-neighbor title="给定边集时黏合环的新邻居" lean="D5/S3/Combinatorics/Graph/Queries/AlternatingWeldQueryBound.weld_neighbor_mass_le"}
将至少含三个顶点的有限底集分为两组，每组有 $n$ 个顶点。设简单图 $F$ 可补全为一个交替无向整圈，记 $f=|E(F)|$，并设 $f+2\le n$。在这些补全中均匀抽样。对任意顶点 $x$ 及有限目标集 $S$，补全中存在一条从 $x$ 到 $S$ 且不属于 $F$ 的边，其概率至多为

$$
\frac{2|S|}{n-f-1}.
$$

:::

::: proof
用 [@thm-alternating-weld-orientation] 给补全定向，并以 $F$ 的边方向为条件。在每个方向纤维中，应用有向后继估计控制新出边命中 $S$ 的概率。反转整圈方向得到入边的同一上界。每条新无向边都落在两个事件的并集中。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-weld-query-prefix-bound title="完整无序查询记录下出现新黏合边的概率" lean="D5/S3/Combinatorics/Graph/Queries/AlternatingWeldQueryBound.weld_query_prefix_bound"}
沿用 [@thm-unordered-weld-transcript-law] 的均匀交替黏合和完整无序查询模型。固定一份包含 $q$ 次实际调用且概率为正的查询记录，参考环与固定图没有共同边。令 $F$ 为这份记录中的黏合边。若 $2q+2\le n$，则对任意固定叶子 $x$ 和叶子集合 $S$，给定这份记录，$x$ 通过一条不在 $F$ 中的黏合边连到 $S$ 中某个叶子的概率至多为

$$
\frac{2|S|}{n-2q-1}.
$$
:::

::: proof
每次调用至多新记录两条黏合边。给定参考记录，黏合环在 $F$ 的所有补全中均匀分布。给均匀补全定向，再对 $F$ 中给定边的方向取条件。$x$ 的新出弧连接所在分量的尾端和另一分量的首端。目标顶点至多分属 $|S|$ 个分量，所以 [@thm-alternating-forest-successor-bound] 约束每个方向纤维上的出弧概率。对方向取平均得到全部有向补全上的分布，反向后得到同样的入弧概率界。对两种事件取并集即得无向概率界。完整证明由 Lean 内核检查。
:::

观察到的槽位取值可以依赖先前的步。在非回溯游走中，前一个顶点决定了哪条相邻边要从前向选择中排除。

::: {.theorem #thm-graph-path-posterior title="披露路径后的图后验" lean="D5/S3/Combinatorics/Graph/Queries/ForwardPathPosterior.graph_path_posterior"}
从先验概率质量函数 $\pi$ 抽取一个世界。每个世界给出同一顶点集 $V$ 上的一张简单无向图，并包含同一条初始入边。所有入边端点和候选顶点均取自 $V$。固定有限个位置和一份按顺序请求位置与槽位的清单。每个世界、位置与入边端点对给出两个互异的候选顶点。每个位置独立抛一枚公平硬币来决定保留还是交换两个索引，抛掷也独立于世界。槽位返回一个顶点后，当前顶点与返回的顶点组成下一步的入边端点对。

固定一份概率为正的实际参考披露 $\tau$。其中每一行都不返回前驱顶点，同一个位置的每次出现都有相同的入边端点对。部分槽位表恰好记录参考各行的取值，观察位置集合恰好由至少记录了一个槽位的位置组成。在包含某行入边的每个世界中，该行记录的顶点是两个候选之一，当且仅当它与当前顶点相邻且不同于前驱顶点。

令 $C_\tau$ 为含有全部记录边的世界集合。每条记录边连接该行的当前顶点与返回顶点。对任意世界集合 $B$，

$$
\Pr(B\mid \tau)=\frac{\pi(B\cap C_\tau)}{\pi(C_\tau)}.
$$

:::

::: proof
按清单重放恰好再现参考各行，当且仅当在各行的参考入边端点对处匹配记录的槽位取值。第一条入边为所有世界共有，此后每条记录的出边都给下一行提供入边。沿路径归纳可知，所有记录顶点都是各行的候选，当且仅当所有记录边都存在。参考运行在同一位置始终使用同一个入边端点对。两个槽位经同一个二元排列选中两个互异候选，因此如果两个槽位都已观察，记录值也互异。这给出了槽位表相容的其余条件。由 [@thm-partial-forward-order-likelihood] 得到的公共似然因子在后验比值中约去。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-branching-path-posterior title="分叉披露后的图后验" lean="D5/S3/Combinatorics/Graph/Queries/BranchingPathPosterior.graph_branching_posterior"}
从先验 $\pi$ 抽取一个世界。每个世界给出同一顶点集上的简单图，所有图含同一条初始边。固定有限位置集合上的槽位查询清单。各位置独立选取一个均匀二槽置换，置换表与世界独立。每个世界、位置和入边三元组固定一对有序且互异的候选顶点。每次访问沿用该位置的置换，将它作用于这对候选顶点的索引，再选择回报值。

位置和当前记录长度决定从已有记录中选取哪条有向边作为入边。索引越界时使用初始边。每次回报将从入边终点到回报值的有向边加到记录首部。固定一份参考运行，要求同一位置的各参考行使用同一个入边，且回报值异于该入边的起点。观察表恰好记录参考各行的位置、槽位和回报值，已见位置恰好是表中有记录的位置。对含有某参考行入边 $(u,v)$ 的候选世界，要求该行的回报值 $y$ 在该行的候选对中，当且仅当 $y$ 邻接 $v$ 且 $y\ne u$。

令 $H$ 表示重放恰好得到参考披露的事件，令 $C$ 是含有全部参考回报边的世界集合。若 $H$ 的概率为正，则对任意世界事件 $B$，

$$
\Pr(B\mid H)=\frac{\pi(B\cap C)}{\pi(C)}.
$$
:::

::: proof
沿参考记录逐步检查重放。先前记录的边均存在时，选出的入边也存在，因而可由对应回报边是否存在判断该行回报值是否可用。同一位置的重复访问共用参考入边与置换，因此观察表记录两槽时，两值互异。相容世界的似然只取决于已见位置数，归一化时约去共同因子。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-meeting-arms-last-weld title="最后一次黏合跨越之后的森林尾段" lean="D5/S3/Combinatorics/Graph/Walks/LastWeldCrossing.meeting_arms_last_weld"}
设 $H$ 为森林，$W$ 为同一顶点集上的黏合图。取并图中两条从 $a$ 到 $b$ 的简单路径，要求总长度为正，且两条路径都有末边时末边不同。先走第一条，再反向走第二条，得到长度为 $L$ 的闭游走。这个游走至少有一条属于 $W$ 且不属于 $H$ 的边。将边从零编号，令 $j$ 为最后一条这样的边的编号。若该边抵达 $y$，则余下的游走与 $H$ 中一条从 $y$ 到 $a$ 的简单路径具有相同的有序顶点序列，并且

$$
L-(j+1)=d_H(y,a).
$$

:::

::: proof
两条路径都没有立即折返，末边互异排除了交接处的折返。森林中没有立即折返的游走是一条简单路径。因此，这样的非空闭游走必经过一条不属于 $H$ 的边。越过最后一条这样的边后，整个尾段都在 $H$ 中，并且仍不立即折返。它是两端之间唯一的简单路径，长度等于森林距离。完整证明由 Lean 内核检查。
:::

上面的长度等式给出一个求和办法。先固定跨越所抵达的叶子，它到目标的树距离就确定跨越步。下面把这一点与每片叶子的尾段概率界合在一起。

::: {.theorem #thm-weighted-tree-tail-bound title="按抵达叶子求和的跨越概率界" lean="D5/S3/Combinatorics/Graph/Queries/WeightedTreeTailBound.mass_of_weighted_tail"}
在高度为 $k$ 的完全二叉树中，固定深度为 $d$ 的目标顶点 $z$ 和路径总长度 $r$。共同上界 $\alpha$ 取扩展非负实数。对每个步编号 $j$ 和叶子 $y$，在同一概率质量函数的样本空间中给定跨越事件 $C_{j,y}$ 和尾段事件 $T_{j,y}$。用该质量函数诱导的外测度 $\mu$ 衡量事件。假设碰撞事件 $A$ 满足三个条件。

- $A$ 中每个结果都属于某个 $C_{j,y}\cap T_{j,y}$，且 $j+1+d_{\mathrm{tree}}(z,y)=r$。
- 每个跨越事件的质量至多为 $\alpha$。
- 每个交集 $C_{j,y}\cap T_{j,y}$ 的质量至多为 $\mu(C_{j,y})2^{-d_{\mathrm{tree}}(z,y)}$。

则

$$
\mu(A)\leq \alpha\left(\frac32-2^{-(d+1)}\right).
$$

:::

::: proof
若某个叶子出现在碰撞见证中，它到 $z$ 的距离确定了 $j$。应用次可加性时，每片叶子至多计入一个事件。将跨越界乘以该叶子的尾段权重，再应用 [@thm-binary-tree-weighted-leaf-distance] 求和。完整证明由 Lean 内核检查。
:::

将它用于具体黏合探索时，还需为给定查询前缀证明逐跨越与尾段联合质量的假设。

::: {.theorem #thm-fresh-meeting-arm title="第二条路径的下一条边尚未披露" lean="D5/S3/Combinatorics/Graph/Walks/FreshMeetingArm.fresh_edge_after_first_arm"}
在同一张简单无向图上，取两条从同一顶点出发的简单路径。若第一条路径非空，要求两条路径的首边不同。第二条路径的内部顶点都不在第一条路径上，终点可以落在第一条路径上。披露第一条路径的边以及第二条路径一个严格前缀的边。第二条路径的下一条边不在这些已披露的边中。
:::

::: proof
在共同起点，简单路径经过的相邻边只有它的首边。其后，第二条路径每一步的出发顶点都在第一条路径之外，因此该步的边也不在第一条路径上。第二条路径本身不会重复经过同一条边。完整证明由 Lean 内核检查。
:::

此处每步记录路径选中的边。完整的邻居回答还包括同一顶点的其他邻边。

**通向经典黑盒下界仍需哪些桥梁？** [@thm-directed-forest-cycle-completion] 给出普通有向模型的静态均匀律，[@thm-alternating-forest-classification] 给出交替模型的补全计数，[@thm-alternating-completion-law] 给出固定边集的条件律。它们与 [@rem-qsvt-walks-literature] 的黏合树结果之间还有三层区别：

1. **图的分布与方向。** Ben-David 等人（*SIAM Journal on Computing* **53**(6)，2024，[10.1137/23M1573975](https://doi.org/10.1137/23M1573975)，§6.3.2，Lemmas 6.11–6.13，PDF 第 37–39 页）在 self-weld 中使用每侧叶子上的一个均匀整圈，在 weld 中使用两侧叶子间的均匀交替整圈。[@thm-alternating-forest-classification] 给出交替补全的分类与基数，[@thm-alternating-completion-law] 给出固定延拓事件的概率和条件律。普通无向整圈的定向与表示重数现由 [@thm-undirected-cycle-orientation-fibers] 在同一实际完成图上给出：每个纤维恰为一对反向提升，并保留加边事件。[@thm-uniform-undirected-cycle-completion] 进一步给出固定 $F$ 下普通无向补全的均匀律。[@thm-alternating-connector-mass] 给出指定连接的条件概率，[@thm-alternating-successor-set-bound] 将它转化为整个候选后继集合的概率上界。[@thm-alternating-forest-successor-bound] 将这个上界写成给定有向边数的函数。[@thm-alternating-undirected-completion-law] 给出无向交替整圈的总数和固定边条件律。 [@thm-alternating-weld-orientation] 把有向与无向黏合补全放在同一个概率空间中。
2. **条件信息。** 固定边集的概率律以 $E$ 中的边全部出现为条件。标号固定且回答给出完整的无序邻居集合时，[@thm-complete-neighborhood-history] 把记录事件刻画为边包含与度数上界。当候选图逐点度数相同时，记录事件等同于固定边集出现。每个顶点使用固定次序时，有序记录的似然见 [@thm-fixed-neighbor-order-likelihood]。在固定图上，[@thm-uniform-remaining-name-hit] 给出固定部分命名下的命中概率，[@thm-named-neighborhood-fresh-name-hit] 给出实际无序记录下的新名字命中概率。图与名字同时随机时，[@thm-joint-named-transcript-posterior] 给出实际完整无序记录下的图后验。带颜色或同时使用端口与随机命名的条件律还需证明。 [@thm-unordered-weld-transcript-law] 给出实际无序回复前缀下的无向黏合环条件分布。
3. **查询、嵌入与成功事件。** Childs 等人 [quant-ph/0209131v2 第 IV 节](https://arxiv.org/abs/quant-ph/0209131v2) 先处理猜中新名字、颜色与已知名字查询的游戏转换，再转向树的随机嵌入，最后分别控制碰撞和 `EXIT` 事件，才得到原文 Theorem 9。[@thm-first-observed-cycle] 给出已知顶点探索中首次出现环的确定性判据，碰撞概率还取决于随机黏合图在实际查询记录下的条件分布。在入口度数为二、最大度数为三的模型中，[@thm-known-name-exploration-size] 给出 $q$ 次实际黑盒调用后的已知名字数上界 $1+2q$。Ben-David 等人脚注 14 特别说明：一次回答全部邻居的查询对应嵌入树中的 $O(t)$ 个顶点，并非严格 $t$ 个。其印刷论证中的分量下界 $2^k-2t$、配对界 $2/(2^k-2t)$ 与式 (6.4) 的 $O(t^2/(2^k-t))$ 各按原文保留；这里不将它们拼成未经证明的显式常数或参数范围。

因此，普通收缩律提供静态计数与条件概率环节，交替结果给出实际载体上的分类、计数和固定边集的条件律，[@thm-undirected-cycle-orientation-fibers] 则以书面证明给出普通无向整圈的同图定向纤维、反向取商与加边对应。普通无向补全律见 [@thm-uniform-undirected-cycle-completion]。实际命名记录给出固定图上的单步命中率。整个查询预算内的新名命中界见 [@thm-fresh-name-budget-survival]，[@thm-fresh-name-budget-attainment] 给出达到该界的策略。查询复杂度和完整经典 `EXIT` 下界仍待证明。[请求 #11](https://github.com/the-omega-institute/trureturing-requests/issues/11) 的更广范围仍未完成。下一节转到量子一侧，考察已经明确给定的加权路径及其端点概率。
