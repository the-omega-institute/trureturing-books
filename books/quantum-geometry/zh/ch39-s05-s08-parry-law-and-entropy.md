# 39.5.8 帕里平稳律、逃逸对计数与分形视界熵问题 {#sec-ch39-p2e-entropy}

在讨论“熵”这一极易发生概念滑移的词之前，我们必须先把 `trureturing` 中已由内核锁定的有限/马尔可夫定律，与遍历论文献中的移位拓扑熵及尚未解决的分形纠缠标度猜想逐一拆开。

在马尔可夫链侧，对任意阶数 $k \ge 2$，令互反帕里参数为 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。在带绝对符号位与当前连续 `1` 游程长度的有向状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上，定义后缀权重 $w_j = \operatorname{suffixWeight}(k, p, j) = \sum_{a=0}^{k-j-1} p^{a+1}$、归一化常数 $Z_k = \sum_{j=0}^{k-1} p^j w_j$、符号翻转对合 $\operatorname{flip}(b, j) = (!b, j)$，以及重置转移核 $P_k = \operatorname{kernel}(k, p)$：从状态 $s = (b, j)$ 出发，以概率 $p / w_j$ 翻转符号并重置游程至 $(!b, 0)$，当 $j + 1 < k$ 时以概率 $p\, w_{j+1} / w_j$ 保持符号并推进游程至 $(b, j + 1)$，其余转移概率为 $0$。对应状态分布定义为

$$
\pi_k(b, j) = \operatorname{parryLaw}\bigl(k, (b, j)\bigr) = \frac{p^j w_j}{2 Z_k}.
$$

这组有向重置核的随机性、归一化、平稳不变性与正负号对称性已由 Lean 内核完整验证：

::: {.theorem #thm-ch39-p2e-parry-escape-laws title="有向 K-Bonacci 重置链的帕里随机核、平稳分布与符号翻转对称律" lean="D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law"}
对任意满足 $k \ge 2$ 的自然数阶，令 $p = \operatorname{parryParameter}(k) = \beta_k^{-1}$。则在上述状态空间 $\operatorname{State}(k) = \mathrm{Bool} \times \operatorname{Fin} k$ 上同时成立：

1. **互反主根范围与幂和归一**：$1/2 < p \le \varphi^{-1}$，且 $\sum_{a=1}^k p^a = 1$；
2. **后缀权重与归一化界**：对一切 $j \in \operatorname{Fin} k$ 有 $p \le w_j \le 1$，且归一化因子满足 $1 \le Z_k$；
3. **非负行随机核**：对一切 $s, t \in \operatorname{State}(k)$ 有 $P_k(s, t) \ge 0$，且每一行概率之和满足 $\sum_t P_k(s, t) = 1$；
4. **平稳不变性与符号翻转公平性**：对一切 $s \in \operatorname{State}(k)$ 有 $\pi_k(s) \ge 0$，$\sum_s \pi_k(s) = 1$；对一切目标态 $t \in \operatorname{State}(k)$ 成立平稳方程 $\sum_s \pi_k(s) P_k(s, t) = \pi_k(t)$；且对一切 $s$ 成立符号翻转不变性 $\pi_k(\operatorname{flip}(s)) = \pi_k(s)$。
:::

::: proof
因 $\beta_k$ 在 $k \ge 2$ 上自 $\beta_2 = \varphi$ 严格递增趋向 $2$，其倒数 $p = \beta_k^{-1}$ 严格落在 $(1/2, \varphi^{-1}]$ 内；将特征方程 $\beta_k^k = \sum_{i=0}^{k-1} \beta_k^i$ 两边同乘 $\beta_k^{-k}$ 即得 $\sum_{a=1}^k p^a = 1$。由此可知每个后缀部分和 $w_j = \sum_{a=1}^{k-j} p^a$ 至少包含首项 $p > 0$ 且不超过全和 $1$，并满足末端值 $w_{k-1} = p$ 与向后递推 $w_j = p + p w_{j+1}$（$j + 1 < k$），故 $P_k$ 各元素非负且每行重置项与递增项之和恰为 $(p + p w_{j+1})/w_j = 1$（末端行重置项恰为 $p/p = 1$）。再把左特征幂 $p^j$ 与右特征权重 $w_j$ 相乘并均分给正负两个符号页，流入 $(b, 0)$ 的平稳总质量等于 $\sum_j \frac{p^j w_j}{2 Z_k} \cdot \frac{p}{w_j} = \frac{p}{2 Z_k}\sum_{j=0}^{k-1} p^j = \frac{w_0}{2 Z_k} = \pi_k(b, 0)$，流入 $(b, j+1)$ 的质量亦精确等于 $\frac{p^j w_j}{2 Z_k}\cdot\frac{p w_{j+1}}{w_j} = \pi_k(b, j+1)$，且对合 $\operatorname{flip}$ 仅翻转不影响公式的符号分量。完整证明由 Lean 内核检查。
:::

在这一平稳律旁，还有两条各自独立的形式化定量定律共同约束边界碰撞与观测盲区：其一是帕里边界柱集上界定理 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)，它对给定的 $n \ge 1$ 组正游程对集合 $C$（每段 `1` 游程 $< k$ 且编码长度不超过视界 $R$）证明，左右边界选定前缀的平稳质量分别不超过 $\operatorname{stationaryWordMass}(10)\cdot(1 - S + M)$ 与 $\operatorname{stationaryWordMass}(01)\cdot(1 - S + M)$（这是精确概率不等式，而非分形维数或熵值公式）；其二是与[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) §38.5 一脉相承的有限竞技场信息逃逸率判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)，它证明在基数 $q \ge 2$ 的非退化有限状态集上，观测目录 $S$ 无法区分的有序相异状态对集合 $E(S)$ 定义出归一化有理逃逸率 $e(S) = |E(S)|/[q(q-1)]$，而某项观测 $i$ 严格降低逃逸率当且仅当其唯一捕获对计数 $|U_i| > 0$（且差值恰为 $|U_i|/[q(q-1)]$）。有限有序逃逸对比例 $e(S)$、量子态冯·诺依曼熵 $S(\sigma_b)$ 与无限移位系统的遍历熵在数学定义上彼此独立，绝不可混为一谈。

::: {.remark #rem-ch39-p2e-abramov-literature title="文献结果：帕里最大熵马尔可夫测度与阿布拉莫夫诱导回归熵公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 据 M. Pollicott 等人的综述 *The mathematical research of William Parry FRS*（[机构存档 PDF](https://wrap.warwick.ac.uk/id/eprint/682/1/WRAP_pollicott_Parry_research.pdf)，§2.3，pp. 323–324；DOI：[10.1017/S0143385708000102](https://doi.org/10.1017/S0143385708000102)），W. Parry（*Trans. Amer. Math. Soc.* **112**, 1964, 55–66）证明非周期有限型双向子移位存在唯一最大熵测度，且该测度为内禀马尔可夫测度。对这里的禁 $1^K$ 子移位，最大熵是在其上所有移位不变 Borel 概率测度中比较的，竞争测度无需满足马尔可夫性或遍历性；唯一性指只有帕里测度达到最大值，其余不变概率测度的熵均严格更小。采用自然对数时，单步拓扑熵（亦即最大柯尔莫哥洛夫—西奈度量熵）为 $\ln\beta_K = -\ln p$，其中 $p = \beta_K^{-1}$；换成比特单位须除以 $\ln 2$，即 $h_{\mathrm{top}}(\Sigma_K) = \log_2 \beta_K\;\text{bits/step}$（数值计算 `NUM` 给出 $K = 2, 3, 4$ 时依次约为 $0.69424$、$0.87915$、$0.94678\;\text{bits/step}$，随 $\beta_K \nearrow 2$ 单调趋向 $1\;\text{bit/step}$）。

另一方面，L. M. Abramov（*Dokl. Akad. Nauk SSSR* **128**, 1959, 647–650）证明：在保概率遍历动力系统 $(X, \mathcal{B}, \mu, T)$ 中，若可测回访集 $A \in \mathcal{B}$ 满足 $\mu(A) > 0$，记 $T_A$ 为 $A$ 上的首次回归诱导映射、$\mu_A$ 为归一化条件测度，则每次回归的诱导熵满足

$$
h_{\mu_A}(T_A) = \frac{h_\mu(T)}{\mu(A)}.
$$

引用这两条文献定理时必须区分单位与前提：[@thm-ch39-p2e-parry-escape-laws] 仅在有向重置状态空间上验证了随机核与平稳分布，并未在当前锁定的源码中形式化柯尔莫哥洛夫—西奈移位熵或阿布拉莫夫公式；而将阿布拉莫夫公式用于每次重置回访事件时，必须区分“每次回归熵 $h_{\mu_A}(T_A)$”与“原始每步熵 $h_\mu(T)$”，不能凭类比直接套用到不可逆读出过程或有限 $p$ 进余数树上。
:::

至于横向内部空间的劳齐分形边界维数 $D_F = \dim_H(\partial\mathcal{R}_K)$ 是否会在量子多体切投态中诱导出反常的分形边界纠缠标度，在严格数学物理中仍是一道悬而未决的开放问题：

::: {.problem #prob-ch39-p2e-fractal-horizon title="开放问题：皮索切投量子多体系统的劳齐分形视界纠缠标度"}
设阶数 $K \ge 3$ 的皮索切投点集或局域受约束多体哈密顿量，其内部接受窗 $\mathcal{R}_K$ 具有豪斯多夫维数严格大于整数余维的拓扑分形边界（例如 $K = 3$ 时文献结果给出 $D_F = \dim_H(\partial\mathcal{R}_3) \approx 1.09336 > 1$）。是否存在严格构造的一族局域有能隙基态或切投编码量子态，当区域特征尺度 $R \to \infty$ 时，其跨边界双体纠缠熵 $S_{\mathrm{ent}}(R)$ 严格服从由内部劳齐边界维数 $D_F$ 支配的反常标度律（如主项 $S_{\mathrm{ent}}(R) \asymp R^{D_F}$ 或精确锁定系数的对数/次主导分形修正项），并能给出标准余维一面积律失效或保持的充要谱间隙与局域性判据？在本书框架内，任何诸如 $S_{\mathrm{ent}} \propto R^{D_F}$ 的“分形视界面积律”表述均作为待证开放问题（`OPEN`）与启发性物理构想（`MODEL`）列出，绝不作为已证形式定理或引力面积律定理宣称。
:::

::: {.remark #rem-ch39-p2e-physical-tribonacci-interface title="物理 Tribonacci 跃迁链与有限开链接口（文献模型，未在本书形式化）"}
**文献模型，未在本书形式化。** 一个可供研究的具体物理对象是零在位势的最近邻跃迁链。依 Kolehmainen–Lado–Moustaj，*One-dimensional quasicrystals with tensor-network finite-state automata*（[arXiv:2609.06040v1](https://arxiv.org/pdf/2609.06040v1)，§III 式 (2)–(3)、附录 B.2），取替代规则 $\sigma(A)=AB$、$\sigma(B)=AC$、$\sigma(C)=A$，以及从 $A$ 出发的不动无限词 $W=\lim_{j\to\infty}\sigma^j(A)$，字母从 $W_0$ 编号。固定 $0<\rho<1$，以 $t_C=1$ 为能量单位，令 $t_A=\rho^2$、$t_B=\rho$，即 $t_A/t_B=t_B/t_C=\rho$。对每个整数 $N\ge2$，在单粒子格点空间 $\mathbb{C}^N$ 的基 $\{\lvert i\rangle:0\le i<N\}$ 上定义

$$
h_N=\sum_{i=0}^{N-2}t_{W_i}\bigl(\lvert i\rangle\langle i+1\rvert+\lvert i+1\rangle\langle i\rvert\bigr).
$$

这里使用 $W$ 的前 $N-1$ 个字母标记键，端点 $0$ 与 $N-1$ 不相连。该文张量中的数位编码的是这个单粒子格点指标；沿二进制或 Tribonacci 地址数位切分张量指标，并未指定实空间多体二分。这一区别也限制了与 §39.5.7 的直接编码纠缠秩之间的类比：不能据此把合法字的等权叠加认作该跃迁链的 Slater 基态。

**指定偶数开前缀的谱距离。** 令

$$
\begin{aligned}
L_j&=\lvert\sigma^j(A)\rvert,\qquad N_j=2\lfloor L_j/2\rfloor,\\
h_{\rho,j}&=h_{N_j}\quad(j\ge1).
\end{aligned}
$$

对每个固定的 $\rho\in(0,1)$，下文将证明沿上述确定的偶数格点开前缀有

$$
\delta_{\rho,j}:=\min\{\lvert\lambda\rvert:\lambda\in\operatorname{Spec}(h_{\rho,j})\}\longrightarrow0\qquad(j\to\infty).
$$

下文 [@ex-ch39-p2e-tribonacci-prefix-rate] 给出这一极限的纸面定量推导，并说明收敛对 $0<\rho<1$ 一致成立；整条应用在本书仍以纸面证明呈现，不带独立 Lean 验证徽章，也不声称解决外部新猜想。有限矩阵的可逆性、无限体积谱中零点的归属、有限分辨率态密度或 Anderson 局域化意义下的临界性，都不能直接替代这一指定边界与前缀序列的极限问题。Krebbekx–Moustaj–Dajani–Morais Smith 的 *Multifractal Properties of Tribonacci Chains*（[*Phys. Rev. B* **108**, 104204](https://doi.org/10.1103/PhysRevB.108.104204)，§II.B.1、§III.A.1、§V）采用周期逼近与微扰重整化研究物理谱及临界性；本书不将其解释为上述对所有 $\rho\in(0,1)$ 的有限开链结论。

要讨论物理空间切口的熵，还须指定多体哈密顿量、填充及态；若选择粒子数守恒的 Slater 基态，须构造其实际占据投影 $P_{\mathrm{occ}}$，并对选定格点子集 $I$ 取关联矩阵压缩 $\chi_I P_{\mathrm{occ}}\chi_I$，其中 $\chi_I$ 投影到这些格点。Moustaj–Krebbekx–Morais Smith 的 *Anomalous Polarization in One-dimensional Aperiodic Insulators*（[doi:10.3390/condmat10010003](https://doi.org/10.3390/condmat10010003)，§IV–V、§V.C 与附录 B）讨论含在位项的泵浦族及指定填充，其关联矩阵方法依赖所选 Slater／高斯态与子系统，不能直接移用于任意编码态。$\delta_{\rho,j}$ 只是单粒子能量到零的距离；多体激发隙还需填充、粒子数扇区与间隙约定。上述极限只处理这一单粒子谱距离：物理长度 $R$ 与内部窗坐标的对应、空间切口与劳齐边界的联系及熵标度，仍需另外建立；[@prob-ch39-p2e-fractal-horizon] 的完整问题仍然保留。
:::

在这个实际词上，普通字母计数的平衡性与按位置奇偶加权的和是不同的量。沿用 $A=0$、$B=1$、$C=2$ 的字母编码，取整数权重

$$
\begin{aligned}
w(A)&=2,\qquad w(B)=1,\qquad w(C)=0,\\
F(v)&=\sum_{r=0}^{|v|-1}(-1)^r w(v_r),\\
W_{[s,s+m)}&=W_sW_{s+1}\cdots W_{s+m-1}.
\end{aligned}
$$

这里 $s,m\in\mathbb N$，位置从零编号；空字 $\varepsilon$ 满足 $F(\varepsilon)=0$。每个区段的首项都取正号，与全局起点 $s$ 的奇偶无关。前面的跃迁恰为 $t_X=\rho^{w(X)}$，故有限乘积满足

$$
\prod_{r=0}^{m-1}t_{W_{s+r}}^{\,(-1)^r}
=\rho^{F(W_{[s,s+m)})}.
$$

这说明交替电荷为什么会进入跃迁比值的估计，却尚未给出谱界。下面的精确陈述与构造来自 [Tribonacci 前缀反例的源证明](https://github.com/the-omega-institute/trureturing/pull/30577)。

::: {.theorem #thm-ch39-p2e-tribonacci-prefix-log-refutation title="实际 Tribonacci 词的统一对数区段界不成立" lean="D5/S1/Words/TribonacciPrefixRefutation.result"}
对上述固定的实际词 $W$ 与整数权重 $w$，有

$$
\neg\left(
\begin{aligned}
&\exists K\in\mathbb R,\quad 0<K\ \land\\
&\forall s,m\in\mathbb N,\quad
\left|F(W_{[s,s+m)})\right|
\le K\log(m+2)
\end{aligned}
\right).
$$

不等式中的整数电荷与自然数长度均视为实数，$\log$ 为自然对数；量词包含 $m=0$，没有长度下限或起点限制。
:::

::: proof
取 $\tau=\sigma^4$，将其逐字延伸到有限字。四次实际替代给出

$$
\begin{aligned}
\tau(A)&=ABACABAABACAB,&|\tau(A)|&=13,\\
\tau(B)&=ABACABAABAC,&|\tau(B)|&=11,\\
\tau(C)&=ABACABA,&|\tau(C)|&=7.
\end{aligned}
$$

每个 $\tau^n(X)$ 的长度都为奇数：$n=0$ 时长度为一；下一层分别拼接 $13$、$11$ 或 $7$ 个前层奇长块，故可对所有字母同时归纳。任意有限字的拼接恒等式为

$$
F(uv)=F(u)+(-1)^{|u|}F(v).
$$

因此，展开 $\tau^{n+1}(X)$ 时，每个前层块都翻转下一块的符号。令 $a_n=F(\tau^n(A))$、$b_n=F(\tau^n(B))$、$c_n=F(\tau^n(C))$。在上述三个实际像中逐块交替取号，得到对每个 $n\in\mathbb N$ 都成立的递推

$$
\begin{aligned}
(a_0,b_0,c_0)&=(2,1,0),\\
a_{n+1}&=a_n,\\
b_{n+1}&=2a_n-b_n,\\
c_{n+1}&=4a_n-2b_n-c_n.
\end{aligned}
$$

由 $a_{n+1}=a_n$ 与初值知 $a_n=2$，于是 $b$ 的递推化为 $b_{n+1}-2=-(b_n-2)$。再令 $d_n=(-1)^n(c_n-2)$，$c$ 的递推化为 $d_{n+1}=d_n-2$，且 $d_0=-2$。于是全层数的解为

$$
\begin{aligned}
a_n&=2,\\
b_n&=2-(-1)^n,\\
c_n&=2-(2n+2)(-1)^n.
\end{aligned}
$$

整块 $A$ 像的电荷恒为 $2$，却不能控制它内部的前缀。定义具体的有限字族

$$
U_0=\varepsilon,\qquad
U_{n+1}=\tau^{n+1}(C)U_n,\qquad m_n=|U_n|.
$$

新块接在前面。逐字恒等式 $\tau(A)=\tau(C)\,A\,BACAB$ 给出

$$
\tau^{n+1}(A)=
\tau^{n+1}(C)\,\tau^n(A)\,\tau^n(BACAB).
$$

空字 $U_0$ 是 $A$ 的前缀；若 $\tau^n(A)=U_nR_n$，则上式变成

$$
\tau^{n+1}(A)=
U_{n+1}R_n\,\tau^n(BACAB).
$$

归纳可知 $U_n$ 是 $\tau^n(A)=\sigma^{4n}(A)$ 的实际前缀，因而

$$
W_{[0,m_n)}=U_n.
$$

这一步使用的正是从 $A$ 出发的原始无限词，没有另设出现位置假设，也没有循环闭合或位置平移。三个四步像都非空，故 $m_n>0$（$n\ge1$）；对所有字母同时归纳，每层至多拼接十三个前层像，得到 $|\tau^n(X)|\le13^n$。结合前缀包含关系，

$$
0<m_n\le|\tau^n(A)|\le13^n\qquad(n\ge1).
$$

令 $q_n=F(U_n)$。新接在前面的 $\tau^{n+1}(C)$ 长为奇数，所以

$$
q_0=0,\qquad q_{n+1}=c_{n+1}-q_n.
$$

为显式解出这次累积，令 $r_n=(-1)^n(q_n-1)$。代入 $c_{n+1}$ 的公式，得到 $r_0=-1$ 与 $r_{n+1}=r_n-(2n+4)$。求和即得

$$
\begin{aligned}
q_n&=1-(-1)^n(n^2+3n+1)\\
&=\begin{cases}
-n(n+3),&n\text{ 为偶数},\\
(n+1)(n+2),&n\text{ 为奇数}.
\end{cases}
\end{aligned}
$$

故 $|q_n|\ge n^2$，包括 $n=0$。另一方面，当 $n\ge1$ 时，$13^n\ge1$ 且 $3\le3^n$，故 $m_n+2\le13^n+2\le3\cdot13^n\le39^n$，从而

$$
\log(m_n+2)\le n\log39.
$$

现在假设定理中被否定的统一界成立，取其常数 $K>0$，再取自然数 $n>K\log39$。因 $K\log39>0$，有 $n\ge1$。在真正从零开始的前缀上，

$$
\begin{aligned}
\left|F(W_{[0,m_n)})\right|
&=|q_n|\ge n^2\\
&>Kn\log39
\ge K\log(m_n+2),
\end{aligned}
$$

与 $s=0$、$m=m_n$ 时的统一界矛盾。这个反证覆盖每个正实数 $K$；从零开始的具体反例族是证明中的构造，不是另加假设，也不是由有限样本外推的结论。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-p2e-tribonacci-refutation-boundaries title="交替偏差、谱文献与物理适用边界"}
**文献背景与适用边界，未作为本书的物理形式化结论。** 上面的平方是替代层数 $n$ 的平方。该反证没有给出所有长度上的最优上界，也没有否定或证明 $O((\log(m+2))^2)$ 的统一上界。$m_n$ 是键字的前缀长度，不能直接等同于前面指定的偶数格点数 $N_j$。

Adamczewski，*Symbolic discrepancy and self-similar dynamics*（[doi:10.5802/aif.2079](https://doi.org/10.5802/aif.2079)，定理 1、命题 10–11）提供替代系统偏差与临界谱消去的一般框架。其加权下界中存在合适零均值字母权重的结论，并不自动指定这里随位置交替的权重；若把位置奇偶性编码进扩充字母表，还须另行核对本原性、频率、权重与消去条件。上面的证明直接计算原始字，既不借用该存在性结论来指定权重，也不据此主张机制或具体公式的文献新颖性。

对物理谱量，Juhász 从开边界横场 Ising 链得到辅助矩阵方法（[doi:10.1103/PhysRevB.106.064204](https://doi.org/10.1103/PhysRevB.106.064204)，arXiv:2206.11575v2）：式 (6) 的 $2L\times2L$ 零对角开链矩阵（$L>1$，相邻耦合均非零）的正本征值，等于式 (7) 双对角矩阵的奇异值；式 (18)、(28) 给出最小正值的有限链上下界。其附录 B 式 (B4) 将常用近似能隙放在严格下界之下，该近似因而不能充作真能隙的上界。这里可比较的是辅助矩阵的谱问题，不能直接把原 Ising 多体能隙认作本跃迁链的多体能隙。

Hermisson 对多字母替代的边缘重整化特征值与无穷动力学指数的讨论（[doi:10.1088/0305-4470/33/1/304](https://doi.org/10.1088/0305-4470/33/1/304)，arXiv:cond-mat/9808238，第 11 页）没有在该处给出本字的特定标度。Hida 的 Fibonacci XXZ 分析（[doi:10.1143/JPSJ.73.2296](https://doi.org/10.1143/JPSJ.73.2296)，arXiv:cond-mat/0404606v2）中，式 (38) 的 $\Delta E\sim\exp[-\kappa(\log N)^2]$ 属于强弱耦合分离下的相互作用各向同性模型的微扰重整化；式 (28) 的自由 XY 情形给出的是有限指数幂律 $\Delta E\sim N^{-z}$。这些结论不替代对本链实际有限矩阵、端点、奇偶截断与所求谱量的核对。

[@thm-ch39-p2e-tribonacci-prefix-log-refutation] 排除了把该统一对数区段界当作逆矩阵估计前提的路线；它没有反驳某个多项式谱隙界，没有决定指定偶数开前缀的 $\delta_{\rho,j}$ 及其速率，也没有构造多体态或证明空间纠缠标度。后面的奇数重复窗口与完整逆矩阵质量路线仍须按各自前提拼接；[@prob-ch39-p2e-fractal-horizon] 的物理态、空间切口与劳齐边界对应仍需独立建立。
:::

::: {.remark #rem-ch39-p2e-tridiagonal-localization title="保留端点残差的三对角局部化（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 将一个整轴向量硬截成有限区段，会在区段两端留下残差；逐渐收窄的正弦权窗可以定量控制这项代价。Chandler-Wilde–Chonchaiya–Lindner，*On spectral inclusion sets and computing the spectra and pseudospectra of bounded linear operators*（[*J. Spectr. Theory* **14**, 719–804](https://doi.org/10.4171/JST/514)，§5.1，推论 5.2、5.4）给出如下工具。设 $A$ 是 $\ell^2(\mathbb{Z})$ 上的有界三对角算子，$M_\pm=\sup_{i\in\mathbb{Z}}|A_{i,i\pm1}|$；对任意非零定义域的有界算子 $B$，记 $\nu(B)=\inf_{\|x\|_2=1}\|Bx\|_2$。对每个整数 $n\ge1$，令 $E_{n,k}$ 为仅支撑在站点 $k+1,\ldots,k+n$ 上的向量空间，则

$$
\begin{aligned}
\inf_{k\in\mathbb{Z}}\nu\!\left(A|_{E_{n,k}}\right)
&\le \nu(A)+\varepsilon_n,\\
\varepsilon_n&=2(M_-+M_+)\sin\frac{\pi}{2(n+1)}.
\end{aligned}
$$

这里仅限制输入支撑，输出仍在整轴上：对应的 $(n+2)\times n$ 矩阵保留两条向外的残差行，不能将它换成丢弃这两行的 $n\times n$ 压缩。该式对位置取下确界；选取实际区段与单位向量时可保留任意正余量。它提供了 $1/n$ 量级的 $\ell^2$ 局部化工具，却尚未闭合前面的 Tribonacci 开链问题：还须证明相应整轴模型的零谱前提，并把连同一层邻接站点的实际词区段转植进指定的有限开前缀，核对长度比例与小尺度情形。这些接口在本书中仍未验证。
:::

另一条有限矩阵路线利用奇数长度的重复：奇数平移把偶数键与奇数键互换，前代入中的两串跃迁比值因而可以配对。下面的下界把这一抵消机制写成实际逆矩阵的定量结论。

::: {.theorem #thm-ch39-p2e-odd-repeat-inverse-mass title="奇数重复段的逆矩阵质量下界" lean="D5/S3/Quantum/Dynamics/OddSquareGreenMass.odd_square_inverse_paired_mass"}
设 $q\in\mathbb{N}$，$t:\mathbb{N}\to\mathbb{R}$ 满足对每个 $i\in\mathbb{N}$ 都有 $0<t(i)\le1$，并且

$$
t(i+2q+1)=t(i)\qquad(0\le i<2q).
$$

令 $n=2q+1$。下双对角矩阵 $L\in\mathbb{R}^{n\times n}$ 从零编号，其非零位置为

$$
\begin{aligned}
L_{i,i}&=t(2i) &&(0\le i<n),\\
L_{i+1,i}&=-t(2i+1) &&(0\le i<n-1).
\end{aligned}
$$

其余位置为零。记 $G=L^{-1}$；对 $0\le l<q$、$0\le d<q-l$，定义成对质量

$$
\begin{aligned}
P_{l,d}&=G_{l+d+1,l}\\
&\quad+G_{q+l+d+1,q+l+1}.
\end{aligned}
$$

则所有这些矩阵指标都在 $0,\ldots,2q$ 内，且

$$
q(q+1)\le\sum_{l=0}^{q-1}\sum_{d=0}^{q-l-1}P_{l,d}.
$$

$q=0$ 时两重求和为空，按零计。
:::

::: proof
正的对角元保证前代入给出实际逆矩阵。奇数重复使每对中的两个正项之积恰为 $1/[t(2l)t(2(l+d+1))]\ge1$，所以每对之和至少为 $2$。三角形指标域共有 $q(q+1)/2$ 对，求和即得下界。完整证明由 Lean 内核检查。
:::

若 $m=2q+1$、$s$ 为偶数，实际词满足 $W_{s+i+m}=W_{s+i}$（$0\le i<m-1$），且 $s+2m\le N_j$，则可取 $t(i)=t_{W_{s+i}}$ 来匹配这一矩阵模型及前缀内的 $2m$ 站点窗口。下面的定理从替代词本身给出所需窗口及其与前缀长度的统一比较。

::: {.theorem #thm-ch39-p2e-aligned-tribonacci-windows title="实际 Tribonacci 前缀中的均匀奇数重复窗口" lean="D5/S1/Words/TribonacciAlignedWindows.aligned_windows"}
对上述实际词 $W$、替代长度 $L_j=|\sigma^j(A)|$ 与偶数前缀长度 $N_j=2\lfloor L_j/2\rfloor$，存在自然数 $K>0$、$J\ge1$，使每个自然数 $j\ge J$ 都有自然数 $m,s$ 满足

$$
\begin{aligned}
m&\ge3,\qquad m\text{ 为奇数},\quad s\text{ 为偶数},\\
N_j&\le Km,\qquad s+2m\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

最后一行对范围内的每个自然数 $i$ 成立；常数 $K,J$ 不随 $j$ 改变。
:::

::: proof
形式证明取 $K=128$、$J=4$。第四次替代中的两份 $ABA$ 提供重复块，四步替代保持三个字母像长度的奇性，从而给出奇数块长与偶数起点。非空尾段保证向下取偶数后仍包含整个窗口，七步长度增长给出因子 $128$。下面的例子展开这一构造；完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch39-p2e-aligned-tribonacci-windows title="奇数重复窗口的显式构造"}
对每个 $j\ge4$，令 $r=\lfloor(j-4)/4\rfloor$、$k=4r$，于是 $k+4\le j\le k+7$。将第四次替代写成四段：

$$
\sigma^4(A)=ABAC\,\vert\,ABA\,\vert\,ABA\,\vert\,CAB.
$$

记 $a=\sigma^k(A)$、$b=\sigma^k(B)$、$c=\sigma^k(C)$，竖线表示拼接而非额外字母。再施加 $k$ 次替代，得到

$$
\sigma^{k+4}(A)=(abac)\,(aba)\,(aba)\,(cab).
$$

取 $s=|abac|$、$m=|aba|$。在每个四的倍数层，$a,b,c$ 的长度均为奇数：零层长度都是 $1$；第四次替代的三个字母像分别含 $13,11,7$ 个字母，故四步替代保持这三个长度的奇性。于是 $s$ 为偶数，$m\ge3$ 为奇数，且两份 $aba$ 给出所需的重复等式。尾段 $cab$ 非空，故将前缀长度向下取偶数仍保留整个重复窗口。每步替代至多使长度翻倍，因此

$$
\begin{aligned}
N_j&\le L_j\le L_{k+7}\le128L_k\le128m,\\
s+2m&\le N_j,\\
W_{s+i+m}&=W_{s+i}\qquad(0\le i<m-1).
\end{aligned}
$$

这里 $s,m$ 都是非负整数；常数 $128$ 与 $j$ 及跃迁参数 $\rho$ 无关。这给出 [@thm-ch39-p2e-aligned-tribonacci-windows] 中常数与窗口的具体选择。
:::

::: {.example #ex-ch39-p2e-full-inverse-euclidean title="从局部质量到完整逆矩阵的欧氏估计"}
取正且不超过 $1$ 的跃迁序列 $t$，令 $G=L(t,n)^{-1}$ 为上述双对角块的完整逆矩阵。设整数 $q\ge1$、$a\ge0$ 满足 $a+2q+1\le n$，并且

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

令 $x=(1,\ldots,1)\in\mathbb R^n$，$v=x/\sqrt n$。所有范数都取欧氏范数，则

$$
\|v\|_2=1,\qquad q(q+1)\le 2n\|Gv\|_2.
$$

这里的逆矩阵保留窗口两侧的所有外部站点。前代入给出的逆元公式说明：把局部逆矩阵的行、列同时平移 $a$，恰得到 $G$ 中对应的元素。由于 $G$ 的所有元素非负，[@thm-ch39-p2e-odd-repeat-inverse-mass] 的两个三角区域各自嵌入全矩阵后，给出

$$
q(q+1)\le2\sum_{i,j=0}^{n-1}G_{ij}.
$$

因子 $2$ 允许分别控制这两个区域，无须额外证明它们互不重叠。另一方面，柯西—施瓦茨不等式给出

$$
\begin{aligned}
\sum_{i,j=0}^{n-1}G_{ij}&=\langle x,Gx\rangle,\\
&\le\|x\|_2\|Gx\|_2,\\
&=n\|Gv\|_2.
\end{aligned}
$$

合并即得所示估计。对前述窗口，参数对应为 $m=2q+1$、$s=2a$、$N_j=2n$。这是既有逆矩阵质量结论、前代入公式和欧氏不等式的应用推导，不新增形式化声明，本例不带独立的 Lean 验证徽章。
:::

::: {.example #ex-ch39-p2e-open-chain-residual title="从完整逆矩阵到有限开链的谱残差界"}
对整数 $n\ge1$，取实跃迁序列 $t:\mathbb N\to\mathbb R$，满足每个 $k\in\mathbb N$ 都有 $t_k>0$。在按自然数从零编号的 $2n$ 个站点上，定义实际开链矩阵 $H\in\mathbb R^{2n\times2n}$：

$$
H_{ij}=\begin{cases}
t_i,&i+1=j,\\
t_j,&j+1=i,\\
0,&\text{其他情形},
\end{cases}
\qquad 0\le i,j<2n.
$$

它的对角线为零，最后一条物理键为 $t_{2n-2}$，没有首尾闭合键；$n=1$ 时就是仅含键 $t_0$ 的两个站点。同一逐项公式也定义作用在 $\mathbb C^{2n}$ 上的厄米矩阵。实对称矩阵的实正交特征基同时是复空间的正交特征基，特征值保持相同的实数；因此以下谱距离估计也适用于前面定义的复数开链。令 $B=L(t,n)$ 为前述下双对角块，即

$$
\begin{aligned}
B_{i,i}&=t_{2i} &&(0\le i<n),\\
B_{i,i-1}&=-t_{2i-1} &&(1\le i<n),
\end{aligned}
$$

其余元素为零。下三角性给出 $\det B=\prod_{i=0}^{n-1}t_{2i}>0$，故普通矩阵逆 $G=B^{-1}$ 存在。对每个欧氏单位向量 $v\in\mathbb R^n$，都存在实数 $\lambda$ 和非零实向量 $z\in\mathbb R^{2n}$，使

$$
\begin{aligned}
Hz&=\lambda z,\\
|\lambda|\,\|Gv\|_2&\le1.
\end{aligned}
$$

具体地，按偶站点、奇站点重排坐标，写 $C_{ij}=H_{2i,2j+1}$。矩阵 $C$ 的对角元为 $t_{2i}$，次对角元为 $t_{2i-1}$，其余元素为零。取 $D=\operatorname{diag}((-1)^i)_{i=0}^{n-1}$，则 $D^2=I$，且逐项计算得到

$$
\begin{aligned}
H&=\begin{pmatrix}0&C\\C^{\mathsf T}&0\end{pmatrix},\\
DCD&=B,\qquad CD=DB.
\end{aligned}
$$

第一行表示重排后的矩阵。构造辅助向量 $u$，令 $u_{\mathrm{even}}=0$、$u_{\mathrm{odd}}=DGv$。由 $BG=I$，

$$
\begin{aligned}
(Hu)_{\mathrm{even}}&=CDGv=DBGv=Dv,\\
(Hu)_{\mathrm{odd}}&=0,\\
\|u\|_2&=\|Gv\|_2,\qquad \|Hu\|_2=1.
\end{aligned}
$$

这里 $D$ 只改变坐标符号，保持欧氏范数；$BGv=v\ne0$ 还保证 $u\ne0$。由于 $H$ 是有限维实对称矩阵，取它的实正交归一特征基 $e_k$，对应实特征值 $\lambda_k$（$0\le k<2n$）。令 $\alpha=\min_{0\le k<2n}|\lambda_k|$，将 $u=\sum_k c_ke_k$ 代入 Parseval 恒等式，得到

$$
\begin{aligned}
\alpha^2\|u\|_2^2
&=\alpha^2\sum_{k=0}^{2n-1}c_k^2,\\
&\le\sum_{k=0}^{2n-1}\lambda_k^2c_k^2
=\|Hu\|_2^2=1.
\end{aligned}
$$

有限的非空特征值集合中存在 $k_0$ 使 $|\lambda_{k_0}|=\alpha$。取 $\lambda=\lambda_{k_0}$、$z=e_{k_0}$，开平方即得所示不等式。$z$ 是选出的特征向量，辅助向量 $u$ 一般并不是特征向量。本例不要求跃迁有上界。

若还满足 [@ex-ch39-p2e-full-inverse-euclidean] 的上界与重复窗口假设，使用其中同一个单位向量 $v$，便有

$$
\begin{aligned}
|\lambda|q(q+1)
&\le2n|\lambda|\,\|Gv\|_2\le2n,\\
\delta:=\min_{\mu\in\operatorname{Spec}(H)}|\mu|
&=|\lambda|\le\frac{2n}{q(q+1)}.
\end{aligned}
$$

这把完整逆矩阵的质量估计转成同一有限开链到零能量的谱距离界。
:::

::: {.example #ex-ch39-p2e-tribonacci-prefix-rate title="指定偶数开前缀的纸面谱界"}
回到实际词 $W$，固定 $0<\rho<1$，令 $t(i)=t_{W_i}$，其中 $t_A=\rho^2$、$t_B=\rho$、$t_C=1$。这些跃迁在所有位置都满足 $0<t(i)\le1$。对每个 $j\ge4$，采用 [@ex-ch39-p2e-aligned-tribonacci-windows] 的显式窗口，写

$$
\begin{aligned}
m&=2q+1,\qquad s=2a,\qquad N_j=2n,\\
q&\ge1,\qquad a+m\le n,\qquad N_j\le128m.
\end{aligned}
$$

这里 $q,a,n$ 都是自然数。相同字母具有相同跃迁，所以窗口中的字等式给出

$$
t\bigl(2a+i+(2q+1)\bigr)=t(2a+i)\qquad(0\le i<2q).
$$

因此前两个例子适用于这同一条 $N_j$ 站点开链：局部矩阵是移位跃迁 $t(2a+\cdot)$ 的块，完整逆矩阵仍取全前缀的 $L(t,n)^{-1}$，没有删除窗口外的站点，也没有添加闭合键。取其中同一个单位向量 $v$，得到 $\delta_{\rho,j}q(q+1)\le N_j$。由 $q\ge1$，

$$
\begin{aligned}
9q(q+1)-2(2q+1)^2&=(q-1)(q+2)\ge0,\\
N_j\delta_{\rho,j}
&\le\frac{N_j^2}{q(q+1)}
\le\frac{128^2(2q+1)^2}{q(q+1)}
\le73728.
\end{aligned}
$$

常数 $73728=128^2\cdot9/2$ 与 $j$ 和 $\rho$ 无关，不声称最优。每个替代迭代都以 $A$ 开头；替代不擦除字母，而这个首字母至少增加一个字母，所以 $L_{j+1}\ge L_j+1$、$L_j\ge j+1$，进而 $N_j\ge L_j-1\ge j$。故 $\delta_{\rho,j}\le73728/N_j\to0$。这一尾段结论不要求另行估计 $j=1,2,3$。

这个界还给出对跃迁参数的一致收敛。对任意 $\varepsilon>0$，取

$$
J=\max\left\{4,\left\lfloor\frac{73728}{\varepsilon}\right\rfloor+1\right\}.
$$

由于 $N_j\ge j$，对每个 $j\ge J$ 和每个 $0<\rho<1$ 都有

$$
0\le\delta_{\rho,j}\le\frac{73728}{N_j}\le\frac{73728}{j}<\varepsilon.
$$

这里 $J$ 与 $\rho$ 无关；结论覆盖整个开区间，不把端点 $\rho=0$ 的退化模型纳入假设。

这是所列窗口构造、完整逆矩阵质量估计与有限维谱转换的纸面应用推导，不带独立 Lean 验证徽章；其参数对应与形式化来源见[形式化接口](https://github.com/the-omega-institute/trureturing/issues/30166)。有限开链的这一谱界不构造多体基态，也不确定空间切口的纠缠熵或劳齐边界的维数。
:::

上例给出指定偶数开前缀的纸面 $1/N_j$ 界与趋零结论。分形熵标度仍需独立的物理态与空间切口论证；[@prob-ch39-p2e-fractal-horizon] 的这些部分保持开放。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entropy" height="500"}
**帕里平稳权重、有限逃逸对与回归熵对照卡（`entropy`）**：分栏呈现有向重置链的青色帕里平稳分布权重 $\pi_K$、有限观测竞技场中被品红标出的未区分逃逸对 $E(S)$，以及单独标注依据等级的移位熵 $\log_2\beta_K$ 与诱导回归熵读数；琥珀色标出当前选定的阶数 $K$，红色标签标示分形视界标度开放问题（[@prob-ch39-p2e-fractal-horizon]）。平稳律与逃逸对计数属 `LEAN ✓`，移位熵与阿布拉莫夫公式属 `文献结果`，分形面积律属 `OPEN`。
:::

至此，我们可以把本节审视的全部八项概念汇总在一张无折行认识论总表之中，使每一环的形式内核、文献依托与诠释边界清晰对齐：

| 八概念环节 | 精确数学对象与代表性冻结声明 | 认识论等级与边界定位 |
| :--- | :--- | :--- |
| **1. 齐肯多夫禁邻语言** | $K = 2$ 禁相邻 `11` 自动机 [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)（[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款）与合法字计数 [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card)（$F_{Q+2}$）及短前缀全满律 [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) | `LEAN ✓`（注意 `List (Fin 2)` 与 `Fin Q → Bool` 载体转换） |
| **2. $K$-Bonacci 皮索谱** | 特征多项式 $P_K(X)$ 整/有理不可约 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)、主根恒等式 $2-\beta_K=\beta_K^{-K}$ [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)、极限 $\beta_K \to 2$ [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 与复共轭单位圆盘收缩 [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location)（[@thm-ch39-p2e-kbonacci-pisot]） | `LEAN ✓`（代数根定位定理）；具体小数 $\beta_3 \approx 1.839287$ 属 `NUM` |
| **3. $p$ 进余数树与超度量** | 模 $p^k$ 首次区分精度 $v_p(x-y)+1$ [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)、观测距离 [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)、同余纤维交集 [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range) 与有限视界细化超度量 [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)（[@thm-ch39-p2e-padic-readout]） | `LEAN ✓`（各自独立成立）；$p$ 进树与 $K$-Bonacci 树的跨系统并置属 `MODEL` |
| **4. $K=3$ 劳齐分形内窗** | 零次幂内窗非空内点 [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty)、正则闭集 [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior)、三支前缀精确自覆盖 [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover)（[@thm-ch39-p2e-rauzy-regular-window]）与二维零测边界 [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero)（[@thm-ch39-p2e-rauzy-null-boundary]） | `LEAN ✓`（集合与平面面积零测）；拼砖、圆盘连通性与 $\dim_H \partial\mathcal{R}_3 \approx 1.09336$ 属 `文献结果` + `NUM`（[@rem-ch39-p2e-rauzy-literature]） |
| **5. 克利福德线—面分解** | 三次闵可夫斯基实线性坐标嵌入 $E_\parallel^1 \oplus E_\perp^2$ 与内部复平面缩放旋子 $\beta_3^{-1/2}(\cos\vartheta + B_\perp\sin\vartheta)$ | `MODEL`（需显式声明基与度规，观察者线—面词典见 [@rem-ch39-p2e-unification-model]） |
| **6. 自指收缩尺度对照** | 正实轴余弦端点 $\cos\theta^* = \theta^*$ [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint) 与三阶共轭范数 $|\alpha| = \beta_3^{-1/2}$ [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate) | `LEAN ✓`（各自端点与恒等式）+ `文献结果`（$\theta^*$ 超越性）+ `NUM`（$\approx 0.234\%$ 数值邻近，严格不等）+ `MODEL`（$\psi=\psi(\psi)$ 母题，[@ex-ch39-p2e-pisot-dottie-numerics]） |
| **7. 跨切口编码纠缠秩** | 跨切口条件 $\tau(x)+\iota(y)<K$ 下的可达页秩充要矩形 $1 \le r_b \le R_b$ 与最大页熵 $\ln R_b$ [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy)（[@thm-ch39-p2e-direct-encoder-ranks]）及谱阻塞 [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction) | `LEAN ✓`（秩等于 $K$ 仅在 $K \le R_b$ 时条件可达，非普适恒等）+ `NUM`（如 $R_0=6, R_1=5$）+ `文献结果`（黄金链与里德堡实验，[@rem-ch39-p2e-rydberg-anyon-literature]） |
| **8. 平稳核、逃逸对与熵** | 有向重置链帕里平稳律 [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law)（[@thm-ch39-p2e-parry-escape-laws]）、边界柱集不等式 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound) 与有限逃逸对判据 [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos) | `LEAN ✓`（有限与马尔可夫定律）+ `文献结果`（$\log_2\beta_K$ 与阿布拉莫夫公式，[@rem-ch39-p2e-abramov-literature]）+ `OPEN`（分形视界纠缠标度，[@prob-ch39-p2e-fractal-horizon]） |

当我们在下面的综合实验室中把阶数从 $K = 2$ 拨向 $K = 3$ 再继续上推时，整章自指本体论 $\psi \equiv \psi(\psi)$ 的多切面几何结构便清清楚楚地浮现出来：$K = 2$ 时内部收缩空间还只是一条实轴线段；跨入 $K = 3$ 的瞬间，复共轭根在二维正交平面上旋出三支精确自覆盖、平面边界零测的劳齐分形内窗；而在每一个阶数上，已被 Lean 内核锁定的离散计数、多项式根圆盘、细化超度量、可达纠缠秩矩形与帕里平稳核构成了坚硬的绿色骨架，支撑起周围明确标界的经典文献、数值实验与跨学科几何诠释。至此，全书正文三十九章的攀登已至峰顶——让我们推开最后一道门扉，步入[终章](coda.md)《在所有的球之外》。

::: {.viz src="pisot-clifford-rauzy-sandtable" height="640"}
**交互实验室 `ORTHO//RAUZY`**：齐肯多夫、皮索与劳齐八概念综合沙盘。自由切换上表对应的八个预设场景、调节阶数 $K$、素数基数 $p$、字长视界与三维观察视角，并直接拖拽物理轴与内部平面上的分解点：实时核对禁 $1^K$ 合法字计数、皮索共轭根单位圆盘收缩、模 $p^k$ 余数树首次区分层级、$K = 3$ 劳齐内窗三支仿射覆盖（及 $K = 4$ 内部坐标采样云）、$\theta^*$ 与 $|\alpha|_{K=3}$ 的数值比对、跨切口可达秩矩形 $[1, R_0] \times [1, R_1]$，以及帕里平稳分布与有限逃逸对账本。绿色依据框严格对应 Lean 已验证定理，文献结论、数值计算、诠释模型与开放问题分别按各自标签独立标示。
:::
