# 第十五章 无复数赫克—拉马努金有理正定判据与模方 5 谱隙

[第十四章](ch14-adelic-closure-and-hurwitz-primes.md)为模 $4$ 余 $1$ 的奇素数 $p$ 选出一组规范的、共轭配对的模方 $p$ 素旋子。到了 $p=5$，六枚素旋子 $S_5$ 通过有理旋转自由生成 $F_3$。自由生成保证既约词永不碰撞。要衡量取平均之后三维球面上的函数混合有多快，还得考察球面赫克算子的谱。

把拉马努金界平方，便得到一条有理半正定判据。对实本征值，有限托普利茨判据又把它接到单位圆上。回到规范的 $S_5$，零公理定理给出 $\chi_1$ 的逐点本征值 $-2/5$ 和裕度 $496/25$、所有整数自旋的标量特征标递推，以及对称幂次数 $1$ 至 $4$ 的精确矩阵数据。本章把特征标递推接到谐波算子的迹上，再逐层核验六个整数自旋壳，最后转向有限双分图 $X^{5,13}$。

## 15.1 球面赫克算子与无复数有理拉马努金半正定判据

沿用[第十章](ch10-peter-weyl-rational-spin-shells.md)和[第十一章](ch11-pi-free-haar-integration.md)，在实单位三维球面 $S^3$ 上取归一化哈尔测度。有理系数多项式的限制构成各次谐波壳层 $\mathcal H_j(\mathbb Q)$ 的代数直和，其中次数为 $2j$。阶乘哈尔公式给出有理内积。$j=0$ 的壳层由常值函数组成。正次数壳层的函数均值为零，其实线性张成在 $L^2(S^3)$ 的零均值子空间中稠密。偶次数可沿 $q\sim -q$ 下降到射影空间。奇次数能区分两种提升，例如一次坐标 $w$。

::: {.definition #def-ch15-spherical-hecke-psd title="一般奇素数球面赫克算子与有理拉马努金半正定二次型"}
设 $p$ 为奇素数，从 $p+1$ 个赫维茨左单位相伴类中各取一枚模方 $p$ 的代表元，组成集合 $A$。对 $p\equiv1\pmod4$ 的规范构造，取 [@def-ch14-hurwitz-prime-spinors] 的 $A=S_p$。作用在**单位**三维球面上时，用单位四元数 $s_\pi=\pi/\sqrt p$ 定义和算子与平均算子：

$$
(\widehat T_p f)(q):=\sum_{\pi\in A}f(qs_\pi),\qquad T_p:=\frac{\widehat T_p}{p+1}.
$$

取总质量为 $1$ 的哈尔测度。在限制到球面上的非零阶有理调和多项式的有限和上，**有理拉马努金判据**要求对每个这样的 $f$ 均有 $Q_p(f)\ge0$，其中

$$
Q_p(f):=4p\,\langle f,f\rangle_{\mathrm{Haar}}-\langle\widehat T_p f,\widehat T_p f\rangle_{\mathrm{Haar}}.
$$

在次数 $d=2j$ 的齐次壳层上，未缩放的代换 $q\mapsto q\pi$ 保持系数有理。球面代换使这一和式乘上 $p^{-d/2}$，平方范数中只留下有理因子 $p^{-d}$。不同次数的壳层仍正交，因此对有限和也有 $Q_p(f)\in\mathbb Q$。
:::

右平移保持哈尔测度与各次调和壳层。代入常值 $1$ 得 $Q_p(1)=-(p-1)^2$，故须在零均值正交补上检验。判据等价于该补空间上的算子范数界 $\|\widehat T_p\|\le2\sqrt p$。有理调和多项式在每一次数上张成实调和空间，其有限和在实零均值 $L^2$ 空间中稠密。若 $A=\overline A$，则 $s_\pi^{-1}=s_{\overline\pi}$ 保证 $\widehat T_p$ 自伴，此时判据等价于每个非常值壳层上的本征值满足 $\widehat\lambda^2\le4p$。换成平均算子的本征值 $\lambda=\widehat\lambda/(p+1)$，一次平均后的能量比至多为 $4p/(p+1)^2$。在 $p=5$ 处即 $9\lambda^2\le5$，能量比至多为 $5/9$。偶次壳层下降到 $\mathrm{SO}(3)$。奇次壳层还要保留单位四元数提升的符号。

剥离常值之后，仍须证明不等式。取 $p=3$，令四枚代表元为 $\pi_{s,t}=(3,1,s,t)/2$，其中 $s,t\in\{1,-1\}$。各元模方皆为 $3$。对两个不同的符号组合，$\pi_{s',t'}\pi_{s,t}^{-1}$ 的实部在恰有一个符号不同时为 $5/6$，两个都不同时为 $2/3$。赫维茨单位的实部只能取 $\{0,\pm1/2,\pm1\}$，所以这四枚代表元分属四个不同的左相伴类。此集没有共轭配对。在零均值的一次谐波 $f(w,x,y,z)=w$ 上，四次归一化右平移之和是 $(6w-2x)/\sqrt3$。哈尔测度下各坐标平方的积分为 $1/4$，且 $\langle w,x\rangle_{\mathrm{Haar}}=0$，故

$$
Q_3(f)=12\cdot\frac14-\frac{6^2+2^2}{3\cdot4}=-\frac13.
$$

## 15.2 单位圆托普利茨正定等价与临界谱的认识论边界

为什么一个形如 $4p - \widehat{\lambda}^2 \ge 0$ 的二次型半正定不等式，在现代数论中与“谱参数精确落于临界线／单位圆之上”息息相关？所钉 `trureturing` 冻结库中的**有限幂和托普利茨单位圆判据**以绝对精确的充要条件揭示了这层底层同构：

::: {.theorem #thm-ch15-toeplitz-circle title="有限幂和托普利茨矩阵半正定与单位圆定位等价定理" lean="D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one"}
设 $u : \operatorname{Fin} m \to \mathbb{C}$ 为一组有限个非零复数（对一切 $j$ 有 $u_j \neq 0$），且带重数地在单位圆反演 $z \mapsto (\bar{z})^{-1}$ 下闭合：存在置换 $\sigma \in S_m$ 使对一切 $j$ 满足 $u_{\sigma(j)} = (\overline{u_j})^{-1}$。对每个整数 $k \in \mathbb{Z}$ 定义幂和 $p_k := \sum_{j} u_j^k$，并记 $(N + 1) \times (N + 1)$ 托普利茨矩阵 $T_N(u) := [p_{a - b}]_{0 \le a, b \le N}$。则对任意满足 $N + 1 \ge |\{u_j : j \in \operatorname{Fin} m\}|$（即矩阵阶数不小于 $u$ 的互异取值个数）的自然数 $N$，以下两者等价：

$$
T_N(u) \succeq 0 \quad \Longleftrightarrow \quad \forall j \in \operatorname{Fin} m,\; |u_j| = 1.
$$

:::

::: {.proof}
充分性：若一切 $|u_j| = 1$，则各幂和 $p_k = \sum_j u_j^k$ 恰好是单位圆上有限狄拉克测度 $\mu = \sum_j \delta_{u_j^{-1}}$ 的圆周矩，由此直接诱导任意阶托普利茨矩阵的半正定性（由 `circle_moment_toeplitz_posSemidef` 给出）。必要性：利用对称置换 $\sigma$ 可将二次型写成 $x^* T_N(u) x = \sum_j \overline{P(\overline{u_j})}\,P(\overline{u_{\sigma(j)}})$，其中 $P$ 是以 $x$ 为系数的次数严格小于 $N + 1$ 的多项式。若反设存在某项 $|u_i| \neq 1$，则 $a := \overline{u_i}$ 与 $b := u_i^{-1} = \overline{u_{\sigma(i)}}$ 是互异复数。因为互异共轭节点集 $s = \{\overline{u_j}\}$ 的基数不超过 $N + 1$，拉格朗日插值构造出次数 $< N + 1$ 的多项式 $P$ 在 $a$ 处取 $1$、在 $b$ 处取 $-1$、在 $s$ 的其余节点全取 $0$；代入二次型后每一项实部非正且第 $i$ 项恰为 $-1$，于是 $\operatorname{Re}(x^* T_N(u) x) \le -1 < 0$，与半正定矛盾。完整证明由 Lean 内核检查。
:::

把 [@thm-ch15-toeplitz-circle] 直接特化到一颗赫克本征值 $\widehat{\lambda} \in \mathbb{R}$ 的局部佐武（Satake）二次因子上，有理正定判据与单位圆定位的等价关系瞬间纤毫毕现（`手工推导`）：分解 $1 - \widehat{\lambda} X + p X^2 = (1 - \alpha X)(1 - \beta X)$，令归一化佐武参数 $u_1 := \alpha / \sqrt{p},\; u_2 := \beta / \sqrt{p}$。由于 $u_1 u_2 = 1$ 且 $u_1 + u_2 = \widehat{\lambda}/\sqrt{p} \in \mathbb{R}$，二元族 $(u_1, u_2)$ 天然在单位圆反演 $z \mapsto (\bar{z})^{-1}$ 下闭合（当 $|\widehat{\lambda}| \le 2\sqrt{p}$ 时 $u_j$ 各自落在单位圆上满足 $u_j = (\overline{u_j})^{-1}$；当 $|\widehat{\lambda}| > 2\sqrt{p}$ 时 $u_1, u_2 \in \mathbb{R}^\times$ 且由对换 $\sigma = (1\;2)$ 满足 $u_2 = u_1^{-1} = (\overline{u_1})^{-1}$）。计算其 $2 \times 2$ 幂和托普利茨矩阵（$N = 1$，$N + 1 = 2$）：

$$
p_0 = 2, \qquad p_1 = p_{-1} = u_1 + u_2 = \frac{\widehat{\lambda}}{\sqrt{p}}, \qquad
T_1(u) = \begin{pmatrix} 2 & \widehat{\lambda}/\sqrt{p} \\ \widehat{\lambda}/\sqrt{p} & 2 \end{pmatrix}.
$$

由主子式判据，$T_1(u) \succeq 0$ 当且仅当 $\det T_1(u) = 4 - \frac{\widehat{\lambda}^2}{p} = \frac{4p - \widehat{\lambda}^2}{p} \ge 0$，恰与有理不等式 **$4p - \widehat{\lambda}^2 \ge 0$** 丝毫不差等价！

::: {.remark #rem-ch15-rh-epistemology title="认识论边界：四元赫克—拉马努金界与经典黎曼猜想及高阶自守谱的严格区分"}
经典 RH 与全体狄利克雷 $L$ 函数的 GRH 在本书中作为**外部已核验形式化事实**使用：Levent Alpöge 的终端声明见[固定版本的 `Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean)，五条终端定理的标准公理闭包见[独立核验记录](https://math.mit.edu/~drew/grh/audit.log)。这项外部成果与本卷的有理赫克判据须分别归属；它不等于在零公理 `OmegaMath` 内部重构了解析谱理论。以下四类陈述各有自己的证据边界：

1. **内核冻结锚点**：经典层 [@thm-ch15-toeplitz-circle] 严格证明了有限反演闭合复族的托普利茨半正定性与单位圆定位等价（抽象判据桥，而非具体 $L$ 函数零点位置的证明）；使用 `OmegaInit` 与 `OmegaMath` 的严格端 D5 结果（`strict_omega.axioms: []`）中，[@thm-ch15-hecke-t5-chi1-eigenvalue] 与 [@thm-ch15-hecke-t5-ramanujan-margin] 对**一切**非零整四元数 $\mathbf{q} \in \mathbb{Z}^4 \setminus \{0\}$ 无公理锁死了模方 $5$ 自旋 $1$ 特征标本征值 $-\frac{2}{5}$ 与严格正定裕度 $\frac{496}{25} > 0$，而 [@thm-ch15-lps-hecke-trace-formula]、[@thm-ch15-lps-hecke-traces]、[@thm-ch15-lps-ramanujan-margins] 与 [@thm-ch15-lps-degree-four-eigenbasis] 进一步无公理锁死了各整数自旋的标量特征标递推及其前六项有理值、$d = 1, 2, 3, 4$（自旋 $j = \frac{1}{2}, 1, \frac{3}{2}, 2$）四层低自旋对称幂整数矩阵与正定裕度以及四次对称幂壳层的完整五条整数本征基。
2. **规范 LPS 构造的全谱界（文献结果，未在本书形式化）。** 对 $p\equiv1\pmod4$ 的规范集 $S_p$，Lubotzky、Phillips 与 Sarnak 证明了 $\mathrm{SO}(3)$ 的非常值谐波上的界 $|\widehat\lambda|\le2\sqrt p$（*Comm. Pure Appl. Math.* **40**, 401–420, 1987）。他们构造的有限凯莱图 $X^{p,q}$ 的非平凡邻接谱满足同一界，双分情形须去掉 $\pm(p+1)$（*Combinatorica* **8**, 261–277, 1988）。下文 $V_3,\dots,V_6$ 的逐壳计算与 $X^{5,13}$ 的有限移位核验使用精确算术。
3. **结构内化诠释（`MODEL`）**：将 $4p\,\langle f, f\rangle_{\mathrm{Haar}} - \langle \widehat{T}_p f, \widehat{T}_p f\rangle_{\mathrm{Haar}} \ge 0$（配合 [@thm-ch15-toeplitz-circle] 的 $2 \times 2$ 佐武桥接）读作临界谱最优性在无复数、无对数有理球面 $\mathbb{T}_3(\mathbb{Q})$ 上的纯代数内化形态，属本书的统一框架建构，它**并不逻辑蕴含**经典黎曼 $\zeta(s)$ 或一般狄利克雷 $L$ 函数的零点定理。
4. **严格保持开放的前沿问题（`OPEN`）**：一般非全纯马斯（Maass）波形与高秩群 $\mathrm{GL}_n$（$n \ge 3$）自守表示的拉马努金—彼得松猜想、一般代数数域戴德金 $\zeta_K$ 函数的扩展黎曼猜想（ERH）、高阶自守 $L$ 函数的全广义黎曼猜想（Grand RH），以及在零公理 `OmegaMath` 内部不依赖经典实复分析而独立重构 $\zeta(s)$ 谱理论的纲领，在本书中全部严格标为 **`OPEN`**。

**同一半径，两种有限读数（手工代数推导）。** 姊妹卷的 [Nyman–Beurling 距离与 Li 曲率比较](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch34-s31-arc-calculus-riemann-and-hermite-biehler.md) 使用 Cayley 坐标 $z(s)=1-1/s$：若有右半带非平凡零点 $\rho$，则 $r=|z(\rho)|\in(0,1)$ 给出所有有限 Nyman 距离的统一下界 $d_N^2\ge r^2(1-r^2)>0$；同一假设又迫使某个有限阶的典范 Li 曲率托普利茨矩阵不半正定。前者检验逼近余项能否趋零，后者检验矩阵的符号。

取有理半径 $r=3/5$，则正多项式与反演闭合族 $(r,r^{-1})$ 的二阶矩阵可同时手算：

$$
\begin{aligned}
r^2(1-r^2)&=\frac{144}{625}>0,\\
T_1(r,r^{-1})&=\begin{pmatrix}2&34/15\\34/15&2\end{pmatrix},
\qquad \det T_1=-\frac{256}{225}<0.
\end{aligned}
$$

矩阵一侧正是 [@thm-ch15-toeplitz-circle] 在两个互异实节点上的特例；正数 $144/625$ 只是距离下界多项式的有理读数，不是某个实际 $d_N^2$。这一算例没有构造 $\zeta$ 零点，也没有把全体零点的无穷解析问题化成一个二阶矩阵。它说明有理算术可以保留桥梁的代数形状；从有限证书到全局解析对象的传递仍须单独证明。

:::

单位圆判据把注意力放在谱的位置；要比较真正不同的证明机制，还须问：哪个对象的哪一个估计，迫使谱落到那里？而位置确定以后，谱点的重数仍是另一份信息。

::: {.remark #rem-ch15-independent-rh-routes title="独立 RH 路线的证明义务与重数边界（源码比较、文献结果与手工推导）"}
**先区分证明的改写与机制的独立。** Alpöge 的 Stepanov 型路线以算术整性约束 theta-lift 的大小。[`lsernau/grh-lean` 的固定紧凑版导读](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh-compact/GUIDE.md)说明，约七万六千行的紧凑版沿用这一方法，不能计为第二条独立证明。其 [主干源码](https://github.com/lsernau/grh-lean/blob/72fead102f663d5c7a407964a13dc0cf9d977207/grh-compact/src/New/Main.lean)用 A「短形式」、B「足够多形式」产生 theta-lift 族的协体积上界，用 C「整形式必须长」给出下界；比较的是同一协体积。消去共同主项后得到 `star_inequality`，再经单侧素数误差界与 Landau 型不消失判据得到 `New.grh`。这是算术大小与整性的冲突，并未构造以 ζ 零点为谱的自伴算子。

以下各行比较独立证明仍须直接完成的数学义务；经典判据及其研究纲领不因与 RH 等价而自动成为另一份完成的证明。

| 路线 | 承担关键估计的对象 | 独立闭合所需的那一步 |
| --- | --- | --- |
| Stepanov／theta-lift | 自守形式、整格与 theta-lift 协体积 | A、B 的上界与 C 的下界给出素数误差的幂次节省；上述外部形式化已完成此链 |
| Masullo 的泛函分析／迹公式草稿 | 阿代尔函数空间、谱投影与全局及局部迹 | 核对全局到 $S$-局部的比较，以及窄谱带外被省略零点的贡献；固定版本仍有未证义务，详见下段 |
| Weil 正性 | 显式公式的测试函数二次型 | 从素数项、极点项与无穷位项直接证明整个测试类上的正性；仅把谱侧写成正平方和会预先使用零点定位 |
| Connes | 阿代尔类空间的迹与谱实现 | 完成所需的全局迹比较，核对正则化与测试函数域；局部迹公式不自动完成全局论证 |
| Nyman／Burnol | Mellin／Fourier 希尔伯特空间中的逼近距离与零点障碍 | 对实际算术函数直接给出趋零的逼近误差上界；有限格拉姆矩阵正定本身不控制这个极限 |
| de Branges／Hermite–Biehler | 整函数结构函数与再生核 | 为匹配 ζ 的具体结构函数直接建立所需核正性，并核对定义域；不能把 RH 等价的正性条件当作输入 |
| de Bruijn–Newman | 向后热方程族 $H_t$ 的实零点 | 独立证明 $H_0$ 全部零点为实数，即 $\Lambda\le0$；Rodgers–Tao 的 $\Lambda\ge0$ 控制另一方向 |

**Masullo 路线的具体接口。** Alessandro Maria Masullo，*The Music of the Primes*（[2026 年 11 月 20 日草稿](https://math216.wordpress.com/wp-content/uploads/2026/11/the-music-of-the-primes.pdf)），§12.3、§12.5 与第 13 章，尝试由泛函分析与迹公式走向一般数域的 Hecke GRH。这里的「theta」函数和 Alpöge 的 theta-lift 协体积估计不能仅凭名称等同。`mccorvie/riemann-masullo` 的 [固定版本状态说明](https://github.com/mccorvie/riemann-masullo/blob/ef8ada3cd3b5ce8002f5f2d8bcbc20cec85752d7/README.md#comparator)报告，终端定理仍依赖未证的 `traceFormula_exteriorZeros`；其 [§12.5 源码](https://github.com/mccorvie/riemann-masullo/blob/ef8ada3cd3b5ce8002f5f2d8bcbc20cec85752d7/RiemannMasullo/Ch12_TraceGeometric/Sec5.lean)明确保留了该缺口：对每个正带宽与合格测试函数，带外零点项之和须为零，带边界上的零点也计入带外。这一归属是对所链版本的源码与状态说明的引用，不是本书重放或对所有可能修补的否定。特别是，一个没有局部 `sorry` 的终端文件仍可能在依赖闭包中使用未证声明。

**其余路线的来源与身份。** Connes，*Trace formula in noncommutative geometry and the zeros of the Riemann zeta function*（1999，[arXiv:math/9811068v1](https://arxiv.org/abs/math/9811068v1)），把临界零点解释为吸收谱，可能的非临界零点解释为共振；这比「找到了一个谱」更精确。Burnol，*A lower bound in an approximation problem involving the zeros of the Riemann zeta function*（2002，[arXiv:math/0103058v2](https://arxiv.org/abs/math/0103058v2)）给出逼近障碍；Báez-Duarte，*A strengthening of the Nyman–Beurling criterion for the Riemann Hypothesis*（2003，[arXiv:math/0202141v2](https://arxiv.org/abs/math/0202141v2)，Theorem 1.1）给出自然数伸缩的闭包判据。这些是文献结果，不是这里新增的独立 RH 证明。de Branges 核、Weil 型零点二次型与热流的具体判据及来源见姊妹卷 [§31.3](https://github.com/the-omega-institute/trureturing-books/blob/main/books/quantum-geometry/zh/ch34-s31-arc-calculus-riemann-and-hermite-biehler.md)；其中 Conrey–Li 对额外正性条件的分析提醒我们核对具体条件（[arXiv:math/9812166v1](https://arxiv.org/abs/math/9812166v1)），Rodgers–Tao 的下界见 *The de Bruijn–Newman constant is non-negative*（2020，§1，[10.1017/fmp.2020.6](https://doi.org/10.1017/fmp.2020.6)）。上述外部源码与文献均不由本注记获得本书的冻结验证徽章。

**位置与重数的分离可以手算。** 取单位圆上的同一个点两次，$u_1=u_2=u$，则对每个 $N\ge0$，

$$
\begin{aligned}
p_k&=2u^k,\\
T_N&=[2u^{a-b}]_{0\le a,b\le N}=2vv^*,\\
v&=(1,u,\ldots,u^N)^{\mathsf T}.
\end{aligned}
$$

所以 $x^*T_Nx=2|v^*x|^2\ge0$；[@thm-ch15-toeplitz-circle] 的定位判据完全允许重复节点。类似地，对实数 $\gamma$ 取自伴矩阵 $A=\gamma I_2$，在 $z\ne\gamma$ 时，

$$
\begin{aligned}
\det(zI_2-A)&=(z-\gamma)^2,\\
(zI_2-A)^{-1}&=\frac{I_2}{z-\gamma},\\
\operatorname{Tr}(zI_2-A)^{-1}&=\frac{2}{z-\gamma}.
\end{aligned}
$$

预解式只有一阶极点，而留数投影的秩为 $2$；其迹的留数也为 $2$。因此「预解式的极点是一阶」不能替代「特征值单重」。对正整数 $m$，局部解析分解 $f(s)=(s-\rho)^m g(s)$、$g(\rho)\ne0$ 给出 $f'/f=m/(s-\rho)+g'/g$，故 $(s-\rho)f'(s)/f(s)\to m$，这才是记录重数的标量读数。以上均为手工代数或局部解析推导，未在本注记形式化。

这也指出从谱路线走向单重性所需的新输入：先有**保留重数的**算术零点与谱的对应，再有排除多维特征空间的条件。例如有限维自伴算子若有循环向量 $b$，即 $b,Ab,A^2b,\ldots$ 张成全空间，则在任一特征空间 $E_\gamma$ 上，这些向量的投影都是 $\gamma^kP_\gamma b$，只能张成至多一维；于是 $\dim E_\gamma=1$。构造这样的算术对应与循环性仍须证明。这个有限维推导没有构造 ζ 的谱算子。
:::

::: {.problem #prob-ch15-post-grh-simplicity title="临界线定位之后：非平凡零点是否全部单重？"}
对每个满足 $0<\operatorname{Re}\rho<1$ 与 $\zeta(\rho)=0$ 的 $\rho$，证明 $\zeta'(\rho)\ne0$，即 $m(\rho)=1$。经典 RH 与狄利克雷 GRH 确定零点位置，尚未解决这个问题；上面的正性与自伴性算例说明，单靠这两种抽象性质不能排除重数。
:::

跨越函数族的推广也须区分已覆盖的特例与一般前沿。对有限阿贝尔扩张 $K/\mathbb Q$，经典分解 $\zeta_K(s)=\prod_\chi L(s,\chi)$（$\chi$ 遍历 $\operatorname{Gal}(K/\mathbb Q)$ 的各特征所对应的本原狄利克雷特征）已把临界带零点定位归于狄利克雷 GRH（文献结果，见 L. C. Washington，*Introduction to Cyclotomic Fields*，第 2 版，第 4 章，1997，[10.1007/978-1-4612-1934-7](https://doi.org/10.1007/978-1-4612-1934-7)）；不能把这类戴德金函数重新列为未解。仍开放的是一般数域的戴德金 GRH、一般酉归一化 Hecke $L$ 函数的 GRH（包括虚二次域上不归于狄利克雷族的特征），以及一般 $\mathrm{GL}_2$ 自守 $L$ 函数的 GRH。高维 Artin $L$ 函数还须分别处理全纯性与零点定位。它们既未由上述狄利克雷终端声明覆盖，也不由本章有限 Hecke 壳层的拉马努金界推出。

## 15.3 普适模方 5 本征值恒等式的完整初等代数证明

现在把抽象判据拉回最透明、最可触摸的纯整数算术现场。在三维旋转群的基础自旋 $j = 1$ 壳层 $V_1$（对应[第十章](ch10-peter-weyl-rational-spin-shells.md)的切比雪夫球面特征标）中，相对基准态 $\mathbf{o} = (1, 0, 0, 0)$ 的齐次射线保真度为

$$
\kappa(\mathbf{q}, \mathbf{o}) = \frac{w^2}{w^2 + x^2 + y^2 + z^2} = \frac{w^2}{\|\mathbf{q}\|^2},
$$

而基础自旋特征标 $\chi_1$ 直接由整系数多项式 $U_2(\sqrt{\kappa}) = 4\kappa - 1$ 给出：

$$
\chi_1(\mathbf{q}) := 4\kappa(\mathbf{q}, \mathbf{o}) - 1 = \frac{3w^2 - x^2 - y^2 - z^2}{w^2 + x^2 + y^2 + z^2}.
$$

令人惊叹的是，对**任意**非零整四元数 $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$（在 `OmegaMath` 中记为整四元组 `q : Quad4`，`q ≠ 0`），模方 $5$ 球面赫克算子 $\widehat{T}_5$ 作用在 $\chi_1$ 上根本不需要积分或矩阵对角化——四步纯多项式展开就在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中以有号精确比值等价（`Omega.IntRatio.Equivalent`）锁死了普适本征值：

::: {.theorem #thm-ch15-hecke-t5-chi1-eigenvalue title="模方 5 球面赫克算子自旋 1 特征标普适本征值定理" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。对任意非零整四元数 $\mathbf{q} : \mathrm{Quad4}$（$\mathbf{q} \neq 0$，即 $\mathbf{q} = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$），模方 $5$ 球面赫克和算子作用 $\operatorname{heckeT5Chi1}(\mathbf{q}) = (\widehat{T}_5 \chi_1)(\mathbf{q}) = \sum_{r \in S_5}\chi_1(\mathbf{q}\cdot r)$ 与缩放特征标 $-\frac{2}{5}\operatorname{evalChi1}(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$ 在有号精确比值等价 `Equivalent`（`Omega.IntRatio.Equivalent`）下普适成立：

$$
(\widehat{T}_5 \chi_1)(\mathbf{q}) \;\equiv\; -\frac{2}{5}\,\chi_1(\mathbf{q}).
$$

:::

::: {.proof}
分四步执行零公理整环展开。第一步，由哈密顿乘积 $(\mathbf{q}\cdot(a, b, c, d))_w = w a - x b - y c - z d$，让 $r$ 遍取 $S_5 = \{(1, \pm 2, 0, 0), (1, 0, \pm 2, 0), (1, 0, 0, \pm 2)\}$，六枚乘积的标量分量成三对共轭线性型：

$$
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm x})_w = w \mp 2x, \qquad
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm y})_w = w \mp 2y, \qquad
(\mathbf{q}\cdot\boldsymbol{\pi}_{5,\pm z})_w = w \mp 2z.
$$

第二步，将六个标量分量平方相加，交叉项 $\mp 4wx, \mp 4wy, \mp 4wz$ 逐对精确抵消：

$$
\begin{aligned}
\sum_{r \in S_5} (\mathbf{q}\cdot r)_w^2
&= (w - 2x)^2 + (w + 2x)^2 + (w - 2y)^2 + (w + 2y)^2 + (w - 2z)^2 + (w + 2z)^2 \\
&= (2w^2 + 8x^2) + (2w^2 + 8y^2) + (2w^2 + 8z^2) \\
&= 6w^2 + 8(x^2 + y^2 + z^2)
= 8\|\mathbf{q}\|^2 - 2w^2.
\end{aligned}
$$

第三步，因 $\mathbf{q} \neq 0$ 故 $\|\mathbf{q}\|^2 > 0$，且每枚 $r \in S_5$ 模方均为 $5$，由四元数模方乘性得 $\|\mathbf{q}\cdot r\|^2 = 5\|\mathbf{q}\|^2 > 0$。两边同除以 $5\|\mathbf{q}\|^2$，在 `Omega.IntRatio.Equivalent` 下给出普适保真度求和收缩律：

$$
\sum_{r \in S_5} \kappa(\mathbf{q}\cdot r, \mathbf{o})
\equiv \frac{8\|\mathbf{q}\|^2 - 2w^2}{5\|\mathbf{q}\|^2}
\equiv \frac{8}{5} - \frac{2}{5}\kappa(\mathbf{q}, \mathbf{o}).
$$

第四步，代入 $(\widehat{T}_5 \chi_1)(\mathbf{q}) = \sum_{r \in S_5}\bigl(4\kappa(\mathbf{q}\cdot r, \mathbf{o}) - 1\bigr)$ 即得

$$
(\widehat{T}_5 \chi_1)(\mathbf{q})
\equiv 4\left(\frac{8}{5} - \frac{2}{5}\kappa(\mathbf{q}, \mathbf{o})\right) - \frac{30}{5}
\equiv \frac{2}{5} - \frac{8}{5}\kappa(\mathbf{q}, \mathbf{o})
\equiv -\frac{2}{5}\bigl(4\kappa(\mathbf{q}, \mathbf{o}) - 1\bigr)
= -\frac{2}{5}\chi_1(\mathbf{q}).
$$

完整证明由 Lean 内核检查。
:::

由 [@thm-ch15-hecke-t5-chi1-eigenvalue] 锁定普适本征值 $\widehat{\lambda}_1 = -\frac{2}{5}$ 后，将之代入 $p = 5$ 处的无复数有理拉马努金二次型门槛 $4p - \widehat{\lambda}_1^2 = 20 - (-2/5)^2$，其精确正定裕度同样在使用 `OmegaInit` 与 `OmegaMath` 的 D5 声明中冻结（`strict_omega.axioms: []`）：

::: {.theorem #thm-ch15-hecke-t5-ramanujan-margin title="模方 5 自旋 1 壳层有理拉马努金正定裕度定理" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_ramanujan_margin"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。模方 $5$ 自旋 $1$ 壳层的无复数有理拉马努金裕度在 `Omega.IntRatio` 等价与严格序下同时满足

$$
20 - \left(-\frac{2}{5}\right)^2 \;\equiv\; \frac{496}{25}
\qquad \text{且} \qquad
0 < \frac{496}{25}.
$$

:::

::: {.proof}
在有号精确比值 `Omega.IntRatio` 中，直接由整数算术算出 $(-2/5)^2 \equiv 4/25$，进而 $20 - 4/25 = (20 \cdot 25 - 4)/25 = 496/25$，交叉相乘即证等价；又因分子 $496 > 0$、分母 $25 > 0$，由有号比值严格序定义立得 $0 < 496/25$。完整证明由 Lean 内核检查。
:::

换算为归一化算子 $T_5 = \frac{1}{6}\widehat{T}_5$，自旋 $1$ 壳层的归一化本征值为 $\lambda_1 = -\frac{1}{15}$，对应归一化裕度 $5 - 9\lambda_1^2 = 5 - \frac{1}{25} = \frac{124}{25} > 0$；甚至连 $V_1$ 上的 $3 \times 3$ 伴随矩阵求和 $\sum_{r \in S_5} R(r) = -\frac{2}{5} I_3$（由[第十四章](ch14-adelic-closure-and-hurwitz-primes.md) [@ex-ch14-mod5-rank1-free-group] 的三对矩阵对角和 $10 - 6 - 6 = -2$ 直接读出，`手工推导`）都与 [@thm-ch15-hecke-t5-chi1-eigenvalue] 丝丝入扣！

::: {.example #ex-ch15-pointwise-chi1-check title="逐点整数验算：在一般四元数 q = (3, 1, −2, 4) 上复核模方 5 特征标恒等式"}
任取不含对称性的非零整四元数 $\mathbf{q} = (3, 1, -2, 4) \in \mathbb{Z}^4$，逐项直观核验 [@thm-ch15-hecke-t5-chi1-eigenvalue]（`手工推导`）：

- 原态模方 $\|\mathbf{q}\|^2 = 3^2 + 1^2 + (-2)^2 + 4^2 = 30$，射线保真度 $\kappa(\mathbf{q}, \mathbf{o}) = \frac{9}{30} = \frac{3}{10}$，特征标 $\chi_1(\mathbf{q}) = 4\cdot\frac{3}{10} - 1 = \frac{1}{5}$。
- 六枚右乘标量分量分别为：$w - 2x = 1$、$w + 2x = 5$、$w - 2y = 7$、$w + 2y = -1$、$w - 2z = -5$、$w + 2z = 11$。
- 平方和：$1^2 + 5^2 + 7^2 + (-1)^2 + (-5)^2 + 11^2 = 1 + 25 + 49 + 1 + 25 + 121 = 222$，与公式 $8(30) - 2(9) = 240 - 18 = 222$ 完全吻合。
- 除以 $5\|\mathbf{q}\|^2 = 150$ 得 $\sum_{r\in S_5}\kappa(\mathbf{q}\cdot r, \mathbf{o}) = \frac{222}{150} = \frac{37}{25}$，进而

$$
(\widehat{T}_5\chi_1)(\mathbf{q}) = 4 \cdot \frac{37}{25} - 6 = \frac{148 - 150}{25} = -\frac{2}{25} = -\frac{2}{5} \cdot \frac{1}{5} = -\frac{2}{5}\chi_1(\mathbf{q}).
$$

:::

## 15.4 模方 5 球面谐波壳层迹表与双分拉马努金凯莱图 $X^{5,13}$

在整数自旋 $\ell$ 处，记 $V_\ell=\operatorname{Sym}^{2\ell}(\mathbb C^2)$ 为一份维数 $2\ell+1$ 的不可约表示。右平移在球面矩阵系数的一侧作用，因此这份表示的每个本征值在三维球面的整个 $2\ell$ 次谐波空间中重复 $2\ell+1$ 次。六枚归一化提升的标量坐标同为 $1/\sqrt5$（[@thm-ch14-lps-norm-five]）。标量偶次切比雪夫序列从 $E_0(\kappa)=1$、$E_1(\kappa)=4\kappa-1$ 开始，并满足 $E_{n+2}(\kappa)=(4\kappa-2)E_{n+1}(\kappa)-E_n(\kappa)$。在 $\kappa=1/5$ 处，以下冻结等式给出其整数分子递推。

::: {.theorem #thm-ch15-lps-hecke-trace-formula title="模方 5 标量特征标整数递推" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_trace_formula"}
这条 D5 声明的严格端记录为 `strict_omega.axioms: []`，官方端记录为 `axioms: ["propext"]`。记 $\mathrm{S5.averageCharacter}(n) := E_n(\tfrac{1}{5})$ 为偶次切比雪夫特征标在 $\kappa = \frac{1}{5}$ 处的 `FiniteRatio` 递推值，并记纯整数分子递推 $a_0 := 1$、$a_1 := -1$、$a_{n+2} := -6 a_{n+1} - 25 a_n$ 诱导的缩放比值代表元为 $\mathrm{S5.traceRepresentative}(n) := \mathrm{IntRatio.value}(a_n, 5^n)$。则对一切自然数 $n \in \mathbb{N}$，有号精确比值等价 `Omega.IntRatio.Equivalent` 普适成立：

$$
\bigl(\mathrm{S5.averageCharacter}(n)\bigr).\mathrm{toRatio}
\;\equiv\;
\mathrm{S5.traceRepresentative}(n) = \frac{a_n}{5^n}.
$$

:::

::: {.proof}
对自然数 $n$ 施行成对数学归纳，同时保持相邻两阶 $(n, n+1)$ 的等价归纳假设。初始两步 $n = 0$（$1 \equiv 1/5^0$）与 $n = 1$（$-1/5 \equiv -1/5^1$）均由定义直接闭合。归纳步中，利用递推系数 $4\cdot\frac{1}{5} - 2 \equiv -\frac{6}{5}$ 并将 $a_k / 5^k$ 分子分母同乘 $5^2 = 25$ 对齐至公分母 $5^{k+2}$，由 `Omega.IntRatio` 乘减同余即得 $(-\frac{6}{5})\frac{a_{k+1}}{5^{k+1}} - \frac{a_k}{5^k} \equiv \frac{-6 a_{k+1} - 25 a_k}{5^{k+2}} = \frac{a_{k+2}}{5^{k+2}}$。完整证明由 Lean 内核检查。
:::

将 [@thm-ch15-lps-hecke-trace-formula] 的无分母膨胀整数递推显式展开至前六个非平凡阶数 $n = 1, \dots, 6$，便得到下列六个标量递推值。

::: {.theorem #thm-ch15-lps-hecke-traces title="零公理模方 5 前六阶特征标递推值" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。前六阶特征标迹代表元 $\mathrm{S5.traceRepresentative}(n)$ 在 `Omega.IntRatio` 下精确等于下列六枚有号分数（合取记为 `S5.traceTable`）：

$$
\begin{aligned}
\mathrm{S5.traceRepresentative}(1) &= -\frac{1}{5}, &
\mathrm{S5.traceRepresentative}(2) &= -\frac{19}{25}, &
\mathrm{S5.traceRepresentative}(3) &= \frac{139}{125}, \\
\mathrm{S5.traceRepresentative}(4) &= -\frac{359}{625}, &
\mathrm{S5.traceRepresentative}(5) &= -\frac{1321}{3125}, &
\mathrm{S5.traceRepresentative}(6) &= \frac{16901}{15625}.
\end{aligned}
$$

:::

::: {.proof}
按 $a_0 = 1$、$a_1 = -1$、$a_{n+2} = -6 a_{n+1} - 25 a_n$ 依次算出分子序列 $-1, -19, 139, -359, -1321, 16901$，并配以分母幂次 $5^1 = 5$ 至 $5^6 = 15625$，六条 `Omega.IntRatio` 等式逐条由定义归约直接闭合。完整证明由 Lean 内核检查。
:::

**从标量值到算子迹。** 冻结的递推和表格涉及精确比值。要把比值认作矩阵迹，取归一化生成元的二维定义表示的两个本征值 $\alpha,\beta$，有 $\alpha+\beta=2/\sqrt5$、$\alpha\beta=1$。它在 $\operatorname{Sym}^d(\mathbb C^2)$ 上的迹是 $\sum_{r=0}^d\alpha^{d-r}\beta^r=:h_d$。这串和从 $1,\alpha+\beta$ 起步，满足 $h_{d+2}=(\alpha+\beta)h_{d+1}-h_d$，因此 $h_d=U_d(1/\sqrt5)$。当 $d=2\ell$ 时，每枚生成元的迹都是 $E_\ell(1/5)$。由迹的线性性，$\operatorname{Tr}(T_5|_{V_\ell})=E_\ell(1/5)$，$\operatorname{Tr}(\widehat T_5|_{V_\ell})=6E_\ell(1/5)$。这一步表示论推导给出了所有整数自旋上的迹等式。

::: {.figure src="ch15-hecke-p5-gap"}
**模方 5 的特征标恒等式与六个壳层的谱半径。** 左图的六项和作用在 $\chi_1$ 上，本征值为 $-2/5$，裕度为 $496/25$。右图是六项平均在 $V_1,\dots,V_6$ 上的谱半径，均低于虚线 $\sqrt5/3$。图上的值来自齐次多项式模 $x^2+y^2+z^2$ 的作用矩阵所给出的有理夹界。
:::

由上面的迹推导和冻结的六个标量值可得两列迹。最后一列的谱界另由下文的矩阵验算给出。

| 自旋壳 $V_\ell$ | 维数 $2\ell + 1$ | 归一化迹 $\operatorname{Tr}(T_5|_{V_\ell}) = E_\ell(1/5)$ | 赫克和迹 $\operatorname{Tr}(\widehat{T}_5|_{V_\ell})$ | 谱结构与有理界 $9\lambda^2 < 5$ 核验 |
| :---: | :---: | :---: | :---: | :--- |
| $V_1$ | $3$ | $-\dfrac{1}{5}$ | $-\dfrac{6}{5}$ | 三重 $\lambda = -\frac{1}{15}$（$\widehat{\lambda} = -\frac{2}{5}$），$9\lambda^2 = \frac{1}{25} < 5$（见 [@thm-ch15-hecke-t5-chi1-eigenvalue]、[@thm-ch15-lps-ramanujan-margins]） |
| $V_2$ | $5$ | $-\dfrac{19}{25}$ | $-\dfrac{114}{25}$ | 三重 $\lambda = -\frac{37}{75}$（$\widehat{\lambda} = -\frac{74}{25}$）与二重 $\lambda = \frac{9}{25}$（$\widehat{\lambda} = \frac{54}{25}$），$9\lambda^2 \in \{\frac{1369}{625}, \frac{729}{625}\} < 5$（见 [@thm-ch15-lps-ramanujan-margins]、[@thm-ch15-lps-degree-four-eigenbasis]） |
| $V_3$ | $7$ | $\dfrac{139}{125}$ | $\dfrac{834}{125}$ | 递推 $-\frac{6}{5}(-\frac{19}{25}) - (-\frac{1}{5}) = \frac{139}{125}$；全部本征值严格满足 $9\lambda^2 < 5$ |
| $V_4$ | $9$ | $-\dfrac{359}{625}$ | $-\dfrac{2154}{625}$ | 递推 $-\frac{6}{5}(\frac{139}{125}) - (-\frac{19}{25}) = -\frac{359}{625}$；全部本征值严格满足 $9\lambda^2 < 5$ |
| $V_5$ | $11$ | $-\dfrac{1321}{3125}$ | $-\dfrac{7926}{3125}$ | 递推 $-\frac{6}{5}(-\frac{359}{625}) - \frac{139}{125} = -\frac{1321}{3125}$；全部本征值严格满足 $9\lambda^2 < 5$ |
| $V_6$ | $13$ | $\dfrac{16901}{15625}$ | $\dfrac{101406}{15625}$ | 递推 $-\frac{6}{5}(-\frac{1321}{3125}) - (-\frac{359}{625}) = \frac{16901}{15625}$；全部本征值严格满足 $9\lambda^2 < 5$ |

进一步地，不仅整数壳 $V_1, V_2$，连包含半整数自旋在内的全部前四层非平凡对称幂壳层 $\mathrm{Sym}^d(\mathbb{C}^2)$（次数 $d = 1, 2, 3, 4$，对应自旋 $j = \frac{d}{2} \in \{\frac{1}{2}, 1, \frac{3}{2}, 2\}$ 与维数 $d + 1 \in \{2, 3, 4, 5\}$）也都在零公理内核中被彻底算清。方法极为巧夺天工：暂不除以 $\sqrt{5}$，让每枚生成元 $g = (w, x, y, z) \in S_5$ 以高斯整矩阵 $M_g = \bigl(\begin{smallmatrix} w + ix & y + iz \\ -y + iz & w - ix \end{smallmatrix}\bigr)$（迹为 $2$、行列式为 $5$）作用在齐次单项式基 $u^{d-r} v^r$ 上；六枚生成元求和后全部虚部精确对消为纯整数矩阵，而归一化因子的平方 $(\sqrt{5})^{2d} = 5^d$ 恰好成为纯整数分母！

::: {.theorem #thm-ch15-lps-ramanujan-margins title="模方 5 低自旋对称幂整数矩阵与拉马努金正定裕度定理" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_ramanujan_margins"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。设 `shell : S5.Shell` 遍取前四层非平凡对称幂壳层 `degreeOne`、`degreeTwo`、`degreeThree`、`degreeFour`（次数 $d = 1, 2, 3, 4$，对应自旋 $j = \frac{1}{2}, 1, \frac{3}{2}, 2$），`branch : Bool` 标记谱分支（在 $d = 4$ 处区分正负两支）。则对每一组 `(shell, branch)`，以下两项同时成立。

**（一）整数矩阵精确匹配（`S5.MatrixMatches shell`）。** 在单项式基下，六枚未归一化高斯整矩阵 $M_g$（$g \in S_5$）诱导的对称幂之和的每个矩阵元都严格等于虚部为零的纯整数矩阵元 `S5.matrixEntry shell`，四层壳矩阵依次为 $6 I_2$（$d = 1$）、$-2 I_3$（$d = 2$）、$-18 I_4$（$d = 3$）以及四次壳 $5 \times 5$ 对称整矩阵

$$
M^{(4)} = \begin{pmatrix}
-10 & 0 & 0 & 0 & 64 \\
0 & -74 & 0 & 0 & 0 \\
0 & 0 & 54 & 0 & 0 \\
0 & 0 & 0 & -74 & 0 \\
64 & 0 & 0 & 0 & -10
\end{pmatrix}.
$$

**（二）严格有理拉马努金正定裕度。** 记缩放整本征值为 $\lambda_{\mathrm{sc}} \in \{6, -2, -18\}$（分别对应 $d = 1, 2, 3$），并在 $d = 4$ 上按 `branch = false` 取 $+54$、按 `branch = true` 取 $-74$，则球面和算子的平方本征值 $\mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}) = \lambda_{\mathrm{sc}}^2 / 5^d$（依次为 $\frac{36}{5}, \frac{4}{25}, \frac{324}{125}, \frac{2916}{625}, \frac{5476}{625}$）在 `Omega.IntRatio` 严格序下恒满足

$$
0 \;<\; 20 - \mathrm{S5.squaredEigenvalue}(\mathrm{shell}, \mathrm{branch}).
$$

:::

::: {.proof}
第一项通过 `S5.matrices_match` 对四层壳的全部 $2^2 + 3^2 + 4^2 + 5^2 = 54$ 个高斯整矩阵元逐一分情形展开，由六枚生成元共轭配对后的精确整数算术归约闭合。第二项先经通分恒等式 `S5.margin_eq_difference` 将 $20 - \lambda_{\mathrm{sc}}^2 / 5^d$ 写成公分母分数 $(20 \cdot 5^d - \lambda_{\mathrm{sc}}^2) / 5^d$，五条分支依次算出精确正定裕度 $\frac{64}{5}$、$\frac{496}{25}$、$\frac{2176}{125}$、$\frac{9584}{625}$ 与 $\frac{7024}{625}$，再由分子分母皆为正整数在 `Omega.IntRatio.Lt` 下逐支证正。完整证明由 Lean 内核检查。
:::

观察 [@thm-ch15-lps-ramanujan-margins] 呈现的奇妙分界：前三层壳（$j = \frac{1}{2}, 1, \frac{3}{2}$）的六生成元和矩阵都是纯数量矩阵（$6 I_2, -2 I_3, -18 I_4$），每个向量天然都是本征向量；唯有到了四次对称幂壳层 $d = 4$（对应五维自旋 $j = 2$ 壳层 $V_2$，在八面体对称下裂为 $E \oplus T_2$，$5 = 2 + 3$），首尾单项式 $u^4$ 与 $v^4$ 通过非对角元 $64$ 发生耦合。为在零公理内核中无遗漏地锁死 $+54$（二重）与 $-74$（三重）确已穷尽全部五维方向，库中显式构造了全部五条整数本征线以及无须除以 $2$ 的双倍整数基变换：

::: {.theorem #thm-ch15-lps-degree-four-eigenbasis title="四次对称幂壳层五条整数本征线与双倍基变换定理" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_degree_four_eigenbasis"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。记 $M^{(4)}$ 在 $\mathbb{Z}^5$（类型 `S5.DegreeFourVector`）上的线性作用为 `S5.degreeFourAction`。则以下两条结论同时成立。

**（一）五条精确整数本征线。** 对五元归纳类型 `S5.DegreeFourLine` 的全部五个构造子，对应的五条整向量均为 $M^{(4)}$ 的精确本征向量——`outerSum` $= (1, 0, 0, 0, 1)$ 与 `middle` $= (0, 0, 1, 0, 0)$ 属于分支 `false`（缩放本征值 $+54$）；`outerDifference` $= (1, 0, 0, 0, -1)$、`firstInterior` $= (0, 1, 0, 0, 0)$ 与 `lastInterior` $= (0, 0, 0, 1, 0)$ 属于分支 `true`（缩放本征值 $-74$）：

$$
\mathrm{S5.degreeFourAction}(\mathrm{line}.\mathrm{vector})
= \mathrm{S5.scaledEigenvalue}(\mathrm{degreeFour}, \mathrm{line}.\mathrm{negativeBranch}) \cdot \mathrm{line}.\mathrm{vector}.
$$

**（二）双向双倍基变换闭环。** 定义两个整线性映射 $D(v) := (v_0 + v_4,\, 2v_1,\, 2v_2,\, 2v_3,\, v_0 - v_4)$（`S5.doubledEigenCoordinates`）与 $F(v) := (v_0 + v_4,\, v_1,\, v_2,\, v_3,\, v_0 - v_4)$（`S5.fromEigenCoordinates`），则对任意整数五元组 $v = (v_0, v_1, v_2, v_3, v_4) \in \mathbb{Z}^5$ 均有

$$
F\bigl(D(v)\bigr) = 2v
\qquad \text{且} \qquad
D\bigl(F(v)\bigr) = 2v.
$$

:::

::: {.proof}
第一项对 `S5.DegreeFourLine` 的五条整向量逐一代入 $M^{(4)}$ 运算：首尾对称和与差分别给出 $-10 + 64 = +54$ 与 $-10 - 64 = -74$，三条内部坐标轴直接读出对角元 $-74, +54, -74$，五条等式均由定义归约闭合。第二项中，中间三个分量在两种复合下都直接变为 $2v_1, 2v_2, 2v_3$，而第 $0$ 与第 $4$ 分量在整环多项式求值器下分别化为 $(v_0 + v_4) + (v_0 - v_4) = 2v_0$ 与 $(v_0 + v_4) - (v_0 - v_4) = 2v_4$，从而双向复合严格等于 $2v$。完整证明由 Lean 内核检查。
:::

在 $V_2$ 上，球面和算子的本征值是二重的 $54/25$ 与三重的 $-74/25$，相加得 $-114/25=6(-19/25)$，恰好复核了上面的迹。对 $V_3,\dots,V_6$，把六枚未缩放的矩阵在 $d=2\ell$ 次单项式基下展开并相加，得 $H_d$。对称幂内积在该基下为 $W_d=\operatorname{diag}_{r=0}^d(1/\binom dr)$，球面和算子为 $5^{-d/2}H_d$。对 $d=6,8,10,12$，有理矩阵 $20\cdot 5^d W_d-H_d^{\mathsf T}W_dH_d$ 的顺序主子式逐个严格为正（精确 `NUM` 核验）。由 Sylvester 判据得到这四壳的严格谱界。

这六枚生成元还给出一个有限算例。把 $S_5$ 模 $13$ 约化，经射影矩阵作用得到 **$2184$ 顶双分凯莱图 $X^{5,13}$**。

::: {.example #ex-ch15-x513-certificate title="2184 顶双分拉马努金凯莱图 $X^{5,13}$：围长 8 与精确有理正定移位证书"}
在有限域 $\mathbb{F}_{13}$ 中，存在满足 $i^2 \equiv -1 \pmod{13}$ 的元素（如 $i \equiv 5 \pmod{13}$，因 $5^2 = 25 \equiv -1$），将每个四元数 $(a, b, c, d)$ 映为矩阵 $\bigl(\begin{smallmatrix} a + b i & c + d i \\ -c + d i & a - b i \end{smallmatrix}\bigr) \in \mathrm{PGL}_2(\mathbb{F}_{13})$，其行列式恰为模方 $a^2 + b^2 + c^2 + d^2 = 5$。检验勒让德符号：$\mathbb{F}_{13}^\times$ 的非零平方元为 $\{1, 3, 4, 9, 10, 12\}$，不含 $5$，故 $\bigl(\frac{5}{13}\bigr) = -1$。由此逐项锁定 $X^{5,13} = \operatorname{Cay}(\mathrm{PGL}_2(\mathbb{F}_{13}), S_5)$ 的三大精确指标（`手工推导` / `NUM`）。

**双分结构与顶点数。** 因为 $\det = 5$ 为模 $13$ 二次非剩余，每枚生成元都在指数为 $2$ 的子群 $\mathrm{PSL}_2(\mathbb{F}_{13})$ 与其非平方陪集之间严格互换，从而生成一座 **$6$-正则双分图**，总顶点数为

$$
|\mathrm{PGL}_2(\mathbb{F}_{13})| = 13(13^2 - 1) = 13 \times 168 = 2184.
$$

左右两部各有 $|\mathrm{PSL}_2(\mathbb{F}_{13})| = 1092$ 个顶点，邻接矩阵具双分块形式 $A = \bigl(\begin{smallmatrix} 0 & B \\ B^\top & 0 \end{smallmatrix}\bigr)$，其中 $B \in \{0, 1\}^{1092 \times 1092}$ 满足每行每列和恒为 $6$。

**精确围长为 $8$ 的初等整数证明。** 图中的 $2k$ 长简单闭圈对应 $S_5$ 中长度为 $2k$ 的非空既约词，其整四元乘积 $(w, 13 x', 13 y', 13 z')$ 须满足 $w$ 为奇数、$x', y', z'$ 均为偶数且不全为零，故 $w^2 + 676(u^2 + v^2 + t^2) = 5^{2k}$（其中 $u^2 + v^2 + t^2 \ge 1$，因 $4 \cdot 13^2 = 676$）：

- $k = 1, 2$：$5^2 = 25 < 676$ 且 $5^4 = 625 < 676$，绝无 $2$-圈或 $4$-圈；
- $k = 3$：$5^6 = 125^2 = 15625$，须令 $169 \mid (125 - w)(125 + w)$（$0 < w < 125$）。由于 $\gcd(125 - w, 125 + w) \mid 250$ 与 $13$ 互素，只能 $169 \mid 125 + w$，唯一解 $w = 169 - 125 = 44$ 为**偶数**，与 $w$ 必为奇数矛盾，故绝无 $6$-圈；
- $k = 4$：$5^8 = 625^2 = 390625$，取奇数 $w = 625 - 2 \cdot 169 = 287$，得 $625^2 - 287^2 = 338 \cdot 912 = 676 \cdot 456 = 676(16^2 + 14^2 + 2^2)$，给出显式 $8$-圈见证 $(287, 416, 364, 52)$（模方精确等于 $390625 = 5^8$ 且不被 $5$ 整除）。因此 $X^{5,13}$ 的围长**精确等于 $8$**。

**精确有理正定移位证书。** $A$ 的本征值为 $\pm\sigma_i$，其中 $\sigma_i^2$ 是 $C:=B^\top B$ 的本征值。常值向量 $\mathbf{1} \in \mathbb{Q}^{1092}$ 对应平凡本征值 $\sigma_0^2 = 6^2 = 36$，而拉马努金界要求一切非平凡本征值满足 $\sigma_i^2 \le 4p = 20$。构造对称有理移位矩阵

$$
M := 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092},
$$

其中 $J_{1092} = \mathbf{1}\mathbf{1}^\top$。在平凡方向 $\mathbf{1}$ 上，由于 $J_{1092}\mathbf{1} = 1092\,\mathbf{1}$，精确移位为

$$
M\mathbf{1} = \left(20 - 36 + \frac{17}{1092}\cdot 1092\right)\mathbf{1} = (20 - 36 + 17)\mathbf{1} = \mathbf{1};
$$

在全部正交非平凡子空间 $\mathbf{1}^\perp$ 上，$J_{1092} v = 0$，故对本征值为 $\sigma_i^2$ 的 $C$ 的本征向量 $v$，有 $M v = (20 - \sigma_i^2) v$。精确核验先从恒等元遍历凯莱图，恰好遍历全部 $2184$ 个顶点，故图连通，$C$ 的本征值 $36$ 为单根。求 $e_0,Ce_0,C^2e_0,\dots$ 的首个有理线性关系，得到在 $e_0$ 上消去 $C$ 的 $28$ 次首一多项式。$\mathrm{PSL}_2(\mathbb F_{13})$ 在非平方侧的左平移可交换于 $C$，并且在该侧传递，故多项式消去全矩阵。除去单因子 $t-36$ 后，斯图姆根计数给出 $[19,\infty)$ 上零个根。由此得到移位不等式

$$
M = 20 I_{1092} - B^\top B + \frac{17}{1092} J_{1092} \;\succeq\; I_{1092}
$$

$B$ 的 $1091$ 个非平凡平方奇异值均满足 $\sigma_i^2<19$，对应的邻接本征值绝对值小于 $\sqrt{19}<2\sqrt5$。
:::

## 15.5 卷五收束与交互工作台检视

第五卷从有限算术走到自由旋转生成元 $S_5$。这六枚旋子在球面上给出检验混合谱界的有理判据。冻结的标量与低阶矩阵等式、更高的有限壳层计算、有限图的移位证书，各自钉住同一图景中的一处精确读数。

::: {.film src="the-norm-five-gap"}
**六枚模方为 5 的整四元数，一条平方后的有理不等式，一道用分数就能核验的谱隙（2 分 52 秒）。** 青色与品红的六枚旋子 $1\pm2i$、$1\pm2j$、$1\pm2k$ 围绕琥珀色的点 $q$，把拉马努金界平方成 $20-\widehat\lambda^2\ge0$。佐武参数对 $u_1,u_2$ 随 $\widehat\lambda$ 在单位圆上滑动，越过 $2\sqrt5$ 时离开圆周，$2\times2$ 托普利茨行列式 $(20-\widehat\lambda^2)/5$ 随之变号（手工推导）；绿色标签对应一般判据 [@thm-ch15-toeplitz-circle]。边界一幕分出已冻结结论、文献中的全谱界与本书的模型诠释（紫色），以及开放问题（红色），对应 [@rem-ch15-rh-epistemology]。在 $q=(2,1,3,-1)$ 处，六个标量部分 $0,4,-4,8,4,0$ 的平方和为 $112$，得 $\widehat T_5\chi_1(q)=-2/75=-\tfrac25\chi_1(q)$（屏幕计算），绿色标签指向 [@thm-ch15-hecke-t5-chi1-eigenvalue] 与 [@thm-ch15-hecke-t5-ramanujan-margin]。柱状图给出 $E_\ell(1/5)$ 的六个精确分数（[@thm-ch15-lps-hecke-trace-formula]、[@thm-ch15-lps-hecke-traces]），把它们认作壳层迹的一步标为论证；四次矩阵首尾两角的 $64$ 以琥珀色标出，五条本征线与裕度见 [@thm-ch15-lps-ramanujan-margins]、[@thm-ch15-lps-degree-four-eigenbasis]。最后一幕画出 $X^{5,13}$ 半径 $3$ 的树状邻域与一条琥珀色 $8$ 圈（屏幕计算），平方奇异值小于 $19$ 取自 [@ex-ch15-x513-certificate] 的精确证书。
:::

至此，一个呼之欲出的跃迁已摆在眼前：**既然 $S_5$ 这六枚整四元数旋子既能在空间中自由生成永不碰撞的非阿贝尔词树 $F_3$，又携带着最优有理谱隙，那么当观察者直接把这六枚旋子的有理分式当作计算指令运行时，会发生什么？** 这将直接开启第六卷的[第十六章](ch16-omega-fractran-and-nonabelian-stack.md)——把康威标量 FRACTRAN 升维为三维非阿贝尔旋子机 $\Omega\text{-FRACTRAN}$。读者可先在下方的交互工作台实验卡中同步检视模方 $5$ 赫克谱隙与 $\Omega\text{-FRACTRAN}$ 旋子指令栈之间的无缝衔接。

::: {.viz src="omega-math-workbench" preset="hecke-p5-and-omega-fractran" height="520"}
**模方 5 赫克谱隙与 $\Omega\text{-FRACTRAN}$ 旋子栈联动实验卡（`hecke-p5-and-omega-fractran`）。** 交互调节任意非零整四元数测试态 $\mathbf{q} = (w, x, y, z)$（默认 `(2, 1, 3, -1)`），观察六枚模方 $5$ 赫维茨素旋子 $S_5$ 跃迁与精确本征恒等 $(\widehat{T}_5 \chi_1)(\mathbf{q}) = -\frac{2}{5}\chi_1(\mathbf{q})$、拉马努金有理正定裕度 $4\cdot 5 - (-\frac{2}{5})^2 = \frac{496}{25} > 0$（以及 $\chi_2$ 在六跃迁和下分裂为多条比值而非单一标量本征函数的对照）；一键切换至 $\Omega\text{-FRACTRAN}$ 整除门模式，即可现场核对同模方非对易态 `XY` 放行与 `YX` 阻断，直接衔接第五卷与第六卷。
:::
