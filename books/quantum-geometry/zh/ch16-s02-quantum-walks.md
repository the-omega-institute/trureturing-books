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
**文献结果，未在本书形式化。** 这里登记完整 QSVT 与图游走的文献结论。Theorem 3 在旋转约定下的充分性，以及同一补全的有符号圆分解，已在下文 [@thm-polynomial-phase-synthesis]、[@thm-signed-circle-phase-factorization] 中单独形式化；以下完整充要刻画、实部电路与查询语义仍按文献边界陈述；任意原始投影酉算子的复多项式提升另见 [@thm-projected-unitary-polynomial-lifting]、[@thm-native-phase-projected-lifting]。

1. **量子奇异值变换（QSVT）的复幺正补全与实目标多项式提取定理**（A. Gilyén, Y. Su, G. H. Low, and N. Wiebe, *Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics*, Proc. 51st ACM STOC, 193–204, 2019, doi:10.1145/3313276.3316366，Theorem 3 与 Theorem 17 / Corollary 18）：设矩阵 $A$ 通过块编码（block encoding）嵌入幺正算子 $U$ 的投影块 $\tilde{\Pi} U \Pi = A$（$\norm{A}_{\mathrm{op}} \le 1$）。文献严格区分两层可实现性定理：
   - **直接二维复多项式量子信号处理（QSP，Theorem 3）**：复多项式对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 能直接作为单一交替相位序列算子 $U_{\Phi}(x)$ 的二维矩阵元实现，当且仅当 $\deg(P_{\mathrm{c}}) \le d$、$\deg(Q_{\mathrm{c}}) \le d - 1$，$P_{\mathrm{c}}$ 具有确定奇偶性 $d \bmod 2$，$Q_{\mathrm{c}}$ 具有相反奇偶性 $(d-1) \bmod 2$，且在一切 $x \in [-1, 1]$ 上满足复模方幺正归一恒等式 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。
   - **一般有界实多项式 QSVT 的复补全与实部投影实现（Theorem 17 / Corollary 18）**：对于一般有界实目标多项式 $P_{\mathrm{target}} \in \mathbb{R}[x]$——满足 (i) $\deg(P_{\mathrm{target}}) \le d$；(ii) 具有确定奇偶性 $d \bmod 2$；(iii) 在区间 $[-1, 1]$ 上满足一致范数界 $|P_{\mathrm{target}}(x)| \le 1$（例如奇一次实多项式 $P_{\mathrm{target}}(x) = x/2$，其在端点 $x = 1$ 处 $P_{\mathrm{target}}(1)^2 = 1/4 < 1$，因此不可能直接用实多项式配成 $P_{\mathrm{target}}(x)^2 + (1 - x^2)Q(x)^2 = 1$）——由 Fejér–Riesz 因式分解定理，总存在满足上述 Theorem 3 条件的复多项式补全对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 使得 $\operatorname{Re} P_{\mathrm{c}}(x) = P_{\mathrm{target}}(x)$ 且 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。在电路上引入一颗额外的 $\lvert +\rangle$ 控制辅助比特，相干叠加相位序列 $U_{\Phi}$ 与相位取负的序列 $U_{-\Phi}$ 得到实部组合 $\frac{1}{2}(U_{\Phi} + U_{-\Phi})$，最后配合辅助比特向 $\langle +\rvert$ 的投影以及依奇偶性选取的块投影（$d$ 为奇时取 $\tilde{\Pi}(\cdot)\Pi$，$d$ 为偶时取 $\Pi(\cdot)\Pi$），即仅调用 $d$ 次 $U$ 与 $U^*$ 精确实现奇异值实多项式变换 $P_{\mathrm{target}}^{(\mathrm{SV})}(A)$。

   **从整条 Laurent 环到有序因子。** 上述 QSP 序列还有一种直接以矩阵系数表述的分解层：J. Haah, *Product Decomposition of Periodic Functions in Quantum Signal Processing*, Quantum **3**, 190 (2019), [doi:10.22331/q-2019-10-07-190](https://doi.org/10.22331/q-2019-10-07-190)，[arXiv:1806.10236v4，Definition 1 与 Theorem 2](https://arxiv.org/html/1806.10236v4#Thmlemma1)。以下陈述与归纳思路均为该文的**文献结果，未在本书形式化**。

   给定任意整数指标上的有限支撑系数族 $C:\mathbb{Z}\to M_2(\mathbb{C})$，写成形式 Laurent 多项式 $F(t)=\sum_{j\in\mathbb{Z}}C_jt^j$。Haah 的 $\mathcal{P}_n$ 要求 $C_j=0$（$|j|>n$），且对每个 $|\eta|=1$ 都有 $F(\eta)\in\mathrm{SU}(2)$，即 $F(\eta)^*F(\eta)=I$、$\det F(\eta)=1$；其中星号是求值后矩阵的共轭转置。子集 $\mathcal{E}_n$ 另要求支撑落在 $\{-n,-n+2,\ldots,n\}$，即非零项的指数与 $n$ 同奇偶。**实际次数为 $n$** 的条件是 $C_n\ne0$ **或** $C_{-n}\ne0$，不是只有次数上界。

   对秩一正交投影 $P$（$P^*=P$、$P^2=P$、$\operatorname{rank}P=1$），定义原始因子

   $$
   E_P(t)=tP+t^{-1}(I-P).
   $$

   它在投影线及其正交补上分别乘以 $t$ 与 $t^{-1}$；例如 $P=\operatorname{diag}(1,0)$ 时就是 $\operatorname{diag}(t,t^{-1})$。在单位圆上，这两个特征值模长均为 $1$、乘积为 $1$，故 $E_P\in\mathcal{E}_1$。Haah 的 Theorem 2 说明：对每个 $n\ge0$、每个实际次数为 $n$ 的 $F\in\mathcal{E}_n$，存在唯一的 $E_0\in\mathrm{SU}(2)$ 与**长度恰为 $n$ 的有序**秩一正交投影列表 $(P_1,\ldots,P_n)$，使

   $$
   F(t)=E_0\prod_{k=1}^{n}\bigl(tP_k+t^{-1}(I-P_k)\bigr).
   $$

   乘积按 $k=1,\ldots,n$ 从左到右排列，等式是逐系数的 Laurent 多项式恒等式。$n=0$ 时，$F=C_0$ 是任意的 $\mathrm{SU}(2)$ 常矩阵，$E_0=C_0$、投影列表为空；这里从不对 $t=0$ 求值。反方向，任意 $n$ 个原始因子的乘积都属于 $\mathcal{E}_n$，但实际次数可能小于 $n$。例如直接展开并用 $P(I-P)=0$ 得 $E_P(t)E_{I-P}(t)=I$：人为补长的列表不具有上述唯一性。

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

   两条消去条件使 $t^{n+1}$ 与 $t^{-n-1}$ 项消失，奇偶支撑再把次数上界降至 $n-1$；单位圆上的 $\mathrm{SU}(2)$ 性质仍保留。次数恰为 $n-1$：否则由 $F=GE_P$、$\deg F\le\deg G+1$ 会与 $F$ 的实际次数 $n$ 矛盾。这样可对 $G\in\mathcal{E}_{n-1}$ 归纳，再在右侧接回 $P_n=P$。任一长度恰为 $n$ 的分解，其末端投影都必须满足同样的端点消去条件，因而被非零端点唯一确定；逐步剥离便得到整个有序列表及剩余常矩阵的唯一性。这是 Haah 纸面证明的骨架，不是本书新增的内核证明。

   **精确合成的边界。** Theorem 2 分解的是已经给定、在整个单位圆上取值于 $\mathrm{SU}(2)$ 且满足上述奇偶条件的完整矩阵环。把有界实目标多项式补全到这样的环、选定 $t$ 与信号变量的相位约定、以及在特定 QSP 约定下由反演对称性限制各 $P_k$ 到布洛赫赤道，仍需额外条件与论证（见 Haah §3.1 及本条前述 Gilyén 等人的补全结果）。再把二维信号作用提升为矩阵奇异值变换，还需块编码与投影桥梁。因此这里的有序投影唯一性不等于实角代表的唯一性，不覆盖补长列表，也不单独给出数值稳定性、效率或硬件实现保证。

2. **量子游走指数加速的图结构与黑盒边界**（A. M. Childs, R. Cleve, E. Deotto, E. Farhi, S. Gutmann, and D. A. Spielman, *Exponential algorithmic speedup by a quantum walk*, Proc. 35th ACM STOC, 59–68, 2003, doi:10.1145/780542.780552, arXiv:quant-ph/0209131）：在两棵深度为 $n$ 的二叉树在叶节点随机交错黏合而成的“黏合树（glued trees）”图族上，给定邻接表黑盒（oracle）访问，从入口根顶点出发的连续时间量子游走因在每一层等距列子空间上保持对称均匀叠加，把指数多顶点的图坍缩为长度为 $2n+2$ 的一维链，从而在 $\mathrm{poly}(n)$ 时间内以有界概率穿透到出口根顶点 `EXIT`；而 Childs 等人证明，任何最多执行 $2^{n/6}$ 次黑盒查询的经典算法找到 `EXIT` 顶点的概率至多为 $4\cdot 2^{-n/6}$（即要达到常数成功概率必须付出 $2^{\Omega(n)}$ 次经典黑盒查询）。这一指数优势严格依赖于图族的层对称约简、黑盒访问模型与特定穿行任务定义；对于缺乏此类对称结构的任意一般图或无结构迷宫，量子游走的干涉相消并不能自动把所有回头路径清零。

:::

## 16.2.1 静态有向森林：怎样补成一个整圈 {#sec-directed-forest-cycle-completion}

经典黏合树论证里有一个容易被“随机接到尚未使用的端点”掩盖的约束：目标是一个覆盖全部叶子的圈，不能提前把一个小分量封口。先把这个约束放在一个静态、有方向的模型里看清楚。设已知边为 $a\to b$、$c\to d$，另有孤立点 $e$。三个分量是 $(a,b)$、$(c,d)$、$(e)$；补成一个有向整圈只有 $(a\ b\ c\ d\ e)$ 与 $(a\ b\ e\ c\ d)$ 两种置换。于是 $b$ 的后继在 $c,e$ 之间各占一半，接回 $a$ 的概率为零。$b\to a$ 虽不破坏入度、出度上界，却会把其余顶点留在圈外。

这里用到的是经典的置换收缩对应。Gessel，*Generalized Rook Polynomials and Orthogonal Polynomials*（1989，159–176，[doi:10.1007/978-1-4684-0637-5_13](https://doi.org/10.1007/978-1-4684-0637-5_13)，[作者原文](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)）第 2 节将相容条件定义为不重复行、列，第 3 节第 5 页以满足条件集合的实际交集定义 $T_n^A$，第 8 节第 11 页给出置换收缩双射，并说明循环数相差所规定边中的有向循环数。

更贴近下面端点、计数与概率表述的出处是 Boaz Tsaban，*Permutation graphs, fast forward permutations, and sampling the cycle structure of a permutation*，*Journal of Algorithms* **47**（2003），104–121，[doi:10.1016/S0196-6774(03)00017-8](https://doi.org/10.1016/S0196-6774(03)00017-8)。该文第 107–109 页的 Lemma 1.1 从无有向循环的部分置换图得到路径分量及其唯一最小、最大端点；Lemma 1.2 通过连接这些端点穷尽单环补全，给出阶乘计数；Lemma 1.3 区分同分量封口与异分量合并；Definition 1.4 与 Lemma 1.5 则给出正、逆向置换查询中的均匀端点选择与查询序列概率。这些端点、计数与概率规律已有文献依据，并非始于本书。

下面将这些经典结果写成同一顶点集上的实际补全集、端点双射与静态条件分布，并保留完整书面证明。Tsaban 的查询模型只涉及置换及逆置换的取值，并不直接覆盖黏合树的完整自适应查询历史。不主张数学新颖性；形式化需求登记于[请求 #11](https://github.com/the-omega-institute/trureturing-requests/issues/11)；下文先给出端点补全的 Lean 核心，再列出范围更广的书面结论。

把每个弱连通分量缩成一点，补全后的整圈就对应分量之间的一个整圈。下面直接从原始边关系定义分量、头尾和补全集；这里的整圈是顶点集上只有一个轨道的置换。

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

下面书面结论中的边数恒等式 $|E|=N-c$ 与显式事件概率比值 $(c-1)!/(N-1)!$ 未在所引 Lean 声明中陈述或核验，仍由后面的完整书面证明承担。交替约束下的静态分类与计数见下一小节；普通无向整圈的实际定向纤维与同图对应见 [@thm-undirected-cycle-orientation-fibers]。交替条件分布、无向概率分布、自适应历史、查询或 `EXIT` 的桥梁仍另需相应的分布与对应证明。

::: {.theorem #thm-directed-forest-cycle-completion title="有向森林的单环补全与静态均匀律" status="written-proof" proof="pf-directed-forest-cycle-completion" doi="10.1007/978-1-4684-0637-5_13" source="Section 8, p. 11" request="https://github.com/the-omega-institute/trureturing-requests/issues/11"}
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

最后，$c\ge2$ 时单轨道的 $\pi$ 不能固定 $A$，故同分量的端点事件为空。若 $A\ne B$，从 $A$ 开始书写分量循环并要求下一个为 $B$，余下 $c-2$ 个分量可任意排列，恰有 $(c-2)!$ 种。因此端点概率为 $(c-2)!/(c-1)!=1/(c-1)$，包括 $c=2$ 时的 $0!=1$。以上为书面证明，由作者与评审负责。
:::

**边界与障碍。** 孤立点必须参与分量计数：若 $E=\varnothing$，则 $c=N$，定理还原为全部单环上的均匀律。特别地，$N=c=2$ 时唯一补全是交换两个顶点的置换；这是有向二循环，不是无向简单图中的二边形。$c=2$ 时每个尾必接到另一个分量的头。$c=1$ 的最后封口不属于本定理的概率公式：那时只有一条覆盖全部顶点的路径，将其尾接回自己的头才是完成整圈。正是“尚有其他分量”使提前封口成为障碍，而非入度、出度约束本身。

Frieze–Suen，*Counting the Number of Hamilton Cycles in Random Digraphs*（[doi:10.1002/rsa.3240030303](https://doi.org/10.1002/rsa.3240030303)，[原文第 4–5 页](https://www.math.cmu.edu/~af1p/Texfiles/hamsuen.pdf)）也用有向路径收缩唯一识别所有包含规定边的 Hamilton 圈，并得到 $(n-t-1)!$ 的计数。他们从一个已给定 Hamilton 圈上的 $t$ 条边出发；这里先从任意满足假设的原始 $E$ 证明延伸存在，再以 $c=N-|E|$ 得到相同计数，不能反过来把延伸存在当作前提。

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

上述无界库存计数的直接源码入口是 [`compatible_cycle_card`](lean:D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.compatible_cycle_card)。正交叉分支有经典 BEST 谱系：Paidi Creed 与 Mary Cryan，*The number of Euler tours of random directed graphs*，*Electronic Journal of Combinatorics* **20**(3)（2013），P13，[doi:10.37236/2377](https://doi.org/10.37236/2377)，Theorem 1，第 2–3 页（[原文](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v20i3p13/pdf)）。原文第 1–2 页只按循环旋转识别 Euler 游程，定理后的说明与脚注允许自环、平行弧。$m>0$ 时上述双色辅助图强连通；向任一根汇入的生成树有 $m$ 种，两点的出度为 $m+p,m+q$，所以 BEST 给出同一正库存公式。这里的形式证明使用实际删插与首次返回，不以一个通用 BEST 定理作黑箱。普通森林收缩沿用前述 Tsaban 与 Gessel 的出处；空载体、断开的零交叉库存、端点平衡和原始森林的完整综合陈述不声称逐字见于这些文献，也不主张文献新颖性。

可行与不可行边界都能手算：$E=\varnothing,n=2$ 时，四个孤立点给出 $a=b=2,p=q=0$，计数 $2$，为 $(r_1\ b_1\ r_2\ b_2)$ 与 $(r_1\ b_2\ r_2\ b_1)$；一条 $r_1\to b_1$ 覆盖全体时，$m=q=0,p=1$，分量恒等圈给出唯一封口；本节开头的反向两路径给出 $m=0,p=q=1$，计数零。因此本定理不预设补全存在、正计数、给定路径分解或强连通性。

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

简单整圈的两个置换表示有经典先例：Greenhill、Janson、Kim 与 Wormald，*Permutation pseudographs and contiguity*，[doi:10.1017/S0963548301005065](https://doi.org/10.1017/S0963548301005065)，原文第 3 页给出二正则伪图的置换重数。本节使用至少三个顶点的普通简单整圈；两顶点时逆置换相同，断开的多个圈也不是一个整圈置换的影图。该出处说明经典重数的谱系，不单独承担本节全部增强的对应与加边结论。这里没有推出无向概率分布、交替计数、随机名字或端口规律，也没有推出自适应查询与 `EXIT` 下界。

**通向经典黑盒下界仍需哪些桥梁？** [@thm-directed-forest-cycle-completion] 给出普通有向模型的静态均匀律，[@thm-alternating-forest-classification] 给出交替模型全部实际补全的分类与计数。它们与 [@rem-qsvt-walks-literature] 的黏合树结果之间还有三层区别：

1. **图的分布与方向。** Ben-David 等人（*SIAM Journal on Computing* **53**(6)，2024，[doi:10.1137/23M1573975](https://doi.org/10.1137/23M1573975)，§6.3.2，Lemmas 6.11–6.13，PDF 第 37–39 页）在 self-weld 中使用每侧叶子上的一个均匀整圈，在 weld 中使用两侧叶子间的均匀交替整圈。交替的有向静态分类与基数现由 [@thm-alternating-forest-classification] 给出；它没有陈述交替条件概率质量或显式事件概率比值。普通无向整圈的定向与表示重数现由 [@thm-undirected-cycle-orientation-fibers] 在同一实际完成图上给出：每个纤维恰为一对反向提升，并保留加边事件。该静态对应没有给出无向概率律或交替扩展；要得到交替约束下的条件补全分布，仍须另证相应概率接口，不能直接搬用普通模型的 $1/(c-1)$。
2. **条件信息。** 普通有向定理只条件化于固定的 $E$ 边全部成立；交替定理本身只陈述分类与计数。自适应算法看到的完整查询历史还涉及随机名字、查询选择、全部邻居的回答及可能的颜色信息。必须在同一个随机图实现上证明这些历史条件恰好留下所声称的均匀补全集，或给出其他准确的条件律；把历史简写成 $E$ 并不能证明这一点。Ben-David 等人的上述引理只允许查询知识图中已有的名字，知识图外查询另有论证；随机稀疏名字是否提供额外信息也不由此定理回答。
3. **查询、嵌入与成功事件。** Childs 等人 [quant-ph/0209131v2 第 IV 节](https://arxiv.org/abs/quant-ph/0209131v2) 先处理猜中新名字、颜色与已知名字查询的游戏转换，再转向树的随机嵌入，最后分别控制碰撞和 `EXIT` 事件，才得到原文 Theorem 9。Ben-David 等人脚注 14 特别说明：一次回答全部邻居的查询对应嵌入树中的 $O(t)$ 个顶点，并非严格 $t$ 个。其印刷论证中的分量下界 $2^k-2t$、配对界 $2/(2^k-2t)$ 与式 (6.4) 的 $O(t^2/(2^k-t))$ 各按原文保留；这里不将它们拼成未经证明的显式常数或参数范围。

因此，普通收缩律提供静态计数与条件概率环节，交替定理补上静态实际载体的分类与计数，[@thm-undirected-cycle-orientation-fibers] 则以书面证明给出普通无向整圈的同图定向纤维、反向取商与加边对应。无向概率律、交替条件律及其无向扩展、名字与端口及历史条件化、查询复杂度与完整经典 `EXIT` 下界仍依赖各自的模型与证明。[请求 #11](https://github.com/the-omega-institute/trureturing-requests/issues/11) 的更广范围仍未完成。下一节转到量子一侧，考察已经明确给定的加权路径及其端点概率。
