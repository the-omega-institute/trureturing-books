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

关于经典黏合树随机补边中的静态有向森林、交替森林与无向整圈组合计数，以及从中央缺陷路径、区间平方和补全到有符号圆相位分解与原始投影酉算子提升的完整形式化证明链，统一收录于[附录 L](appendix-l.md)（[§L.1](appendix-l-s01-forest-cycle-counting.md)–[§L.6](ch16-s07-native-phase-witness.md)）。读者可先在下方完整游走实验室中自由调节步数、硬币权重与圈长，再进入[§16.3](ch16-s08-finite-gate-polytopes.md)考察有限门字的三维割圆多面体。

::: {.viz src="walk-spreading" height="560"}
**游走扩散实验室。** 拖时间轴改步数，改硬币的份额 $w$ 与相位 $\varphi$，或把圈变短：上方青色是量子游走，下方灰色是经典随机游走，品红是量子分布比它的镜像多出的部分。绿色框是 [@lemma-symmetric-coin-walk]；宽度与失衡都是页面的数值。
:::
