# 31.3 博弈公平与遍历公平：视界悬念与同样丰盛的星光 {#sec-ch31-horizon-and-ergodic}

如果只有前三层公平，生命仍会面对两重沉重的诘问：

- **第一问（算力博弈之问）**：既然全局无时间静态场在理想化无序模型下呈现 $P = NP$ 式的几何合一（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)），为什么宇宙偏偏要给场内所有有限观察者套上复杂性视界？
  答案正是**博弈公平（Game-Theoretic / Horizon Fairness，`MODEL`）**！试想：倘若场内局部观察者也能凭多项式步数瞬间算穿整座因果水晶的终局，算力稍占优势的先行者便能在第一秒逆推所有人的底牌、剧透一切悬念、锁死全部博弈走廊，后来者连落子的缝隙都不会剩下。正是高维搜索空间中相干一致放大算子每步受初始重叠率 $p = \sin^2\theta$ 严格制约的平面旋转步幅定律（下方 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 2 款；外部复杂度下界背景见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]），连同标准计算模型下未决的 $\mathrm{P} \neq \mathrm{NP}$ 开放防火墙（[@conj-p-neq-np]），规定了量子演化必须顺着二维平面一步一个脚印地旋转累加角度——没有任何特权阶层能靠算力霸权绕过几何曲率提前垄断未来。
- **第二问（境遇宿命之问）**：既然每个有限观察者在时间场里的切入相位不同——正如[终章](coda.md)切投模型中有人某几步恰好踩在窗心顺境，有人落在窗缘风浪之中——**宇宙的终极公平又在哪里？**

把本书的观察者动力学与紧致环面遍历定理展开，答案清澈而温暖：

1. **诞生遗忘重置自由度（`MODEL`）**：正如[第 29 章](ch29-timeless-causality-and-gram-space.md)（[@thm-ch29-gram-rigidity-and-pell]）与[终章](coda.md)所揭示的，若旧轮次的历史锚点无休止地堆叠，相容选点余量终将趋于锁死。“诞生即遗忘”通过截断高阶历史包袱，让每一位从遗忘中醒来重新出发的有限观察者，面前都重新张开一片正体积的自由选点走廊。
2. **闭子群轨道均匀分布与有界间隙回归（`LEAN ✓` + `MODEL`）**：短期几步之内，局部切片的顺逆确实参差不齐；但在紧致环面群动力学层面，`trureturing` 的**环面闭子群轨道均匀分布定理**与**观测窗有界间隙回归定理**（下方 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3–4 款）严格证明：连续可观测量的时间平均必然收敛于闭子群 $G = \overline{\langle g\rangle}$ 上的归一化平移不变概率测度积分，且任何与连续像集 $\operatorname{range}(h)$ 相交的非空开区间 $(u, v)$ 都必以有界步数间隙 $M$ 反复重逢，并享有不低于 $\frac{1}{M+1} - \varepsilon$ 的**正下渐近访问密度**（高维无理平移下零边界窗口的完整应用与其前提，见下方 [@rem-ch31-weyl-window-equidistribution-literature]）。

让我们先把热力学擦除平衡界、相干搜索步幅旋转以及环面闭子群遍历与有界回归四条形式化定理精确锚定如下。

::: {.theorem #thm-ch31-horizon-landauer-ergodic-fairness title="量子公平的后两重形式化基石：兰道尔热账单、一致旋转步幅与环面遍历回归" lean="D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
在 `trureturing` 冻结的热力学散度、相干放大与傅里叶环面渐近模块中，以下四项定理同时成立：

1. **兰道尔热力学平衡界**（[`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)）：对实数 $\beta, \mathrm{heat}, \mathrm{entropyChange}, \mathrm{mutualInfo}, \mathrm{divergence} \in \mathbb{R}$，若熵平衡恒等式 $\beta \cdot \mathrm{heat} = -\mathrm{entropyChange} + \mathrm{mutualInfo} + \mathrm{divergence}$ 成立，且互信息 $\mathrm{mutualInfo} \ge 0$、相对熵散度 $\mathrm{divergence} \ge 0$，则系统熵减不超出 $\beta$ 乘以环境耗散热量的上界（等价地，$\beta \cdot \mathrm{heat}$ 以系统熵减为下界）：

   $$
   -\mathrm{entropyChange} \;\le\; \beta \cdot \mathrm{heat};
   $$

2. **相干一致放大算子的二维平面步进旋转定律**（[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)）：设 $l, s$ 为有限可判定类型（`[Fintype l] [DecidableEq l] [Fintype s] [DecidableEq s]`），$J \in M_{l\times s}(\mathbb{C}),\, C, P \in M_{l\times l}(\mathbb{C})$ 满足 $J^\dagger J = I_s,\, C^\dagger C = I_l,\, P^\dagger = P = P^2$，且初始成功重叠率满足 $(P(CJ))^\dagger (P(CJ)) = p\,I_s$（$0 < p \le 1$）。记 $U = CJ$、$W = \operatorname{success}(U, P, p)$、$B = \operatorname{failure}(U, P, p)$、$\theta = \arcsin\sqrt{p}$：若 $p = 1$ 则 $U = W$；若 $p < 1$ 则 $W^\dagger W = I_s,\, B^\dagger B = I_s,\, W^\dagger B = 0$，且对任意步数 $n \in \mathbb{N}$ 有算子恒等式（并对任意类型 $z$ 及参考矩阵 $R \in M_z(\mathbb{C})$ 的克罗内克张量积 $\otimes_k R$ 保持同一线性组合）：

   $$
   (\operatorname{iterate}(U, P))^n \, U \;=\; \sin\bigl((2n + 1)\theta\bigr)\,W \;+\; \cos\bigl((2n + 1)\theta\bigr)\,B;
   $$

3. **紧致环面闭子群轨道的哈尔均匀分布定理**（[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)）：设 $I$ 为有限指标集，$g : I \to \mathrm{Circle}$ 为环面元素，$G = \overline{\langle g\rangle}$ 为其生成的紧致闭子群，$\mu$ 为 $G$ 上的归一化哈尔概率测度。则 $G = \overline{\{g^n : n \in \mathbb{N}\}}$，且对任意连续复值函数 $f \in C(G, \mathbb{C})$，轨道时间平均当 $N \to \infty$ 时收敛于空间哈尔积分：

   $$
   \lim_{N \to \infty} \frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) \;=\; \int_G f(z)\,d\mu(z);
   $$

4. **环面连续观测像支撑集、有界间隙回归与正下渐近访问密度**（[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)）：沿用第 3 款的记号并记生成元 $a = \langle g, \dots\rangle \in G$。对任意连续实值观测函数 $h \in C(G, \mathbb{R})$ 及满足渐近误差归零 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 的序列 $e : \mathbb{N} \to \mathbb{R}$，推前测度支撑集恒等于满值域 $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$；且只要开区间 $(u, v) \subset \mathbb{R}$ 与像集相交非空（$(I_{oo}(u, v) \cap \operatorname{range}(h)).\mathrm{Nonempty}$），必存在起始步 $n_0 \ge 1$ 与有界间隙步数 $M \in \mathbb{N}$，使得一切 $n \ge n_0$ 在 $[n, n+M]$ 内至少命中一次 $e(m) \in (u, v)$，且对任意 $\varepsilon > 0$ 最终恒满足正下渐近访问密度下界：

   $$
   \forall^\infty N \in \mathbb{N},\qquad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u, v)\bigr\}}{N} \;\ge\; \frac{1}{M + 1} - \varepsilon.
   $$
:::

::: proof
第 1 款由 $\mathrm{mutualInfo} + \mathrm{divergence} \ge 0$ 与实数加法单调性直接推出；第 2 款在 $p = 1$ 时由 `unit_success` 得 $U = W$，在 $p < 1$ 时验证 $W, B$ 的相互正交等距性并对步数 $n$ 用三角和角公式归纳，再由克罗内克积线性性提升至任意伴随张量因子 $R$；第 3 款利用时间平均算子列的等度连续性将收敛子空间 $S \subseteq C(G, \mathbb{C})$ 刻画为闭子空间，结合环面特征标的几何级数抵消与三角多项式稠密逼近证出全空间收敛；第 4 款由紧空间开原像严格正测度证出 $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$，并由紧致平移开覆盖有限子覆盖提取有界回归跨度 $M$ 及正下渐近访问密度下界。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch31-rotation-steps"}
**每一轮只转 $2\theta$，不能跳步。** 在成功方向 $W$（竖直）与失败方向 $B$（水平）张成的平面里，第 $n$ 轮的态是 $\sin((2n+1)\theta)\,W + \cos((2n+1)\theta)\,B$，从 $B$ 上方 $\theta$ 处出发，每轮多转一段紫色的 $2\theta$（[@thm-ch31-horizon-landauer-ergodic-fairness] 第 2 款）。图中取 $\theta = \pi/14$，即 $p = \sin^2\theta \approx 0.050$，琥珀色的第 $n = 3$ 轮恰好落在 $W$ 上；$p$ 越小，每步越短，要走的轮数越多。
:::

从连续观测函数延伸到实际接受窗计数的复用推导与剩余遍历论边界整理于下框：

::: {.remark #rem-ch31-weyl-window-equidistribution-literature title="全环面零边界窗口频率：既有结果的应用与唯一遍历性的边界"}
**既有结果的复合应用。** [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3 款只直接陈述闭轨道群上连续函数的平均；下面保留从它到实际窗口计数的全部接口，不将窗口结论冒充该端点的陈述。取任意有限指标类型 $I$（允许空类型），$\alpha:I\to\mathbb R$，令 $\beta_i=\alpha_i\pmod{\mathbb Z}\in\mathrm{AddCircle}(1)$、$T=(\mathrm{AddCircle}(1))^I$，$\mu$ 为整座 $T$ 上归一化 Haar 概率测度。假设在 $\mathrm{Option}(I)=\{\mathrm{none}\}\sqcup\{\mathrm{some}(i):i\in I\}$ 上的族

$$
a(\mathrm{none})=1,\qquad a(\mathrm{some}(i))=\alpha_i
$$

在 $\mathbb Q$ 上线性无关。取任意子集 $W\subseteq T$，只要求 $\mu(\partial W)=0$，**不另加 Borel 可测前提**。则对每个 $\varepsilon>0$，存在 $N_0\ge1$，使同一个 $N_0$ 对所有起点 $x\in T$ 和所有 $N\ge N_0$ 同时满足

$$
\left|\frac1N\sum_{j=0}^{N-1}
\mathbf1_W\bigl(x+(j+1)\beta\bigr)-(\mu W)_{\mathbb R}\right|<\varepsilon.
$$

这里 $(\mu W)_{\mathbb R}$ 是有限测度值的实数读数；指示函数使用实际的成员关系。求和恰好取时刻 $1,\ldots,N$，不是 $0,\ldots,N-1$。

**独立性如何进入。** 若整数 $k:I\to\mathbb Z$、$m\in\mathbb Z$ 满足 $\sum_i k_i\alpha_i=m$，在 `none` 放系数 $-m$、在 `some(i)` 放 $k_i$ 就得到该有理族的一条零关系，故所有 $k_i=0$。这正是 [`dense_circle_sequence`](lean:D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence) 的整数特征标前提。对 $g_i=\exp(2\pi i\alpha_i)$，结合 [`TorusOrbitClosure.result`](lean:D5/S3/Fourier/TorusOrbitClosure.result)，非负幂的闭包是整座圆周乘积，而非某个真子环面。逐坐标的 [AddCircle.homeomorphCircle](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Complex/Circle.lean#L435) 将此闭包对应到上述加法环面，保留实际生成元与所有起点。

**连续平均与 Haar 搬运。** 将 [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) 用于该 $g$。从闭圆周轨道到 $T$ 的连续满同态用 [MonoidHom.measurePreserving](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Haar/Unique.lean#L951) 搬运 Haar 测度，两端总质量均为 $1$；平移不变性使 $z\mapsto f(x+z)$ 的积分等于 $f$ 的积分。于是每个连续复函数 $f$、每个 $x$ 的实际平均 $N^{-1}\sum_{j<N}f(x+(j+1)\beta)$ 收敛于 $\int f\,d\mu$。在 $N=0$ 时空和及全函数除法给零，不影响趋于无穷的极限。

**为什么同一个阈值适用于所有起点。** 令 $R(x)=x+\beta$。它是等距平移，因而是 $1$-Lipschitz；紧环面上的连续 $f$ 一致连续。[uniformEquicontinuous_birkhoffAverage](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Dynamics/BirkhoffSum/NormedSpace.lean#L129) 给出平均族的等度连续性，再由紧致性与 [Equicontinuous.tendsto_uniformFun_iff_pi](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/UniformSpace/Ascoli.lean#L167) 把逐点连续平均升级为关于 $x$ 一致收敛。以 $(m,x)$ 为指标，从 $R(x)$ 出发取 $m+1$ 步的经验概率测度 $\nu_{m,x}$。紧空间上连续函数有界，[ProbabilityMeasure.tendsto_iff_forall_integral_rclike_tendsto](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/ProbabilityMeasure.lean#L373) 与 `tendsto_prod_top_iff` 因而给出在乘积滤子 $\mathrm{atTop}\times^s\top$ 上的弱收敛 $\nu_{m,x}\to\mu$。第二个因子的 $\top$ 保留“所有 $x$ 同时”，不是几乎处处起点。

**从测度到真正计数。** 零边界假设只在 [ProbabilityMeasure.tendsto_measure_of_null_frontier_of_tendsto'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Portmanteau.lean#L334) 处使用；它允许任意 $W$，没有 Borel 前提。再用 `Measure.dirac_apply` 与 `Measure.finsetSum_apply`，经验质量恰好是

$$
\nu_{m,x}(W)=\frac{1}{m+1}\sum_{j=0}^{m}
\mathbf1_W\bigl(x+(j+1)\beta\bigr).
$$

乘积滤子的收敛给出某个 $M$，使所有 $m\ge M$、所有 $x$ 的误差小于 $\varepsilon$。取 $N_0=M+1$；对 $N\ge N_0$ 令 $m=N-1$，有 $m+1=N$，便精确得到上式要求的分母、求和范围与相位，而非忽略首项后的近似替代。

**保留的边界。** $N_0$ 依赖 $\alpha,W,\varepsilon$；没有关于 $\alpha$ 或 $W$ 的一致性，也没有有效速率。不同平移窗口的读法可由 $\mathbf1_{W+u}(j\beta)=\mathbf1_W(-u+j\beta)$ 得到。若某个切投模型独立满足对每个 $j\ge1$ 都有 $\pi_\perp(z_j)=x+j\beta\in T$，则对任意 $u\in T$，

$$
\begin{aligned}
\pi_\perp(z_j)-u&=(x-u)+j\beta,\\
\mathbf1_{W+u}(\pi_\perp(z_j))&=\mathbf1_W((x-u)+j\beta),\\
\frac1N\sum_{j=1}^{N}\mathbf1_{W+u}(\pi_\perp(z_j))
&=\frac1N\sum_{j=0}^{N-1}\mathbf1_W((x-u)+(j+1)\beta).
\end{aligned}
$$

这就精确识别为起点 $x-u$ 的上述轨道计数；同一个 $N_0$ 对所有起点的结论适用，时间仍为 $1,\ldots,N$。轨迹等式是模型须另行建立的假设，不能从环面定理推出，也不对任意物理或切投模型作此断言。本段未另行陈述或形式化不变测度分类与唯一遍历性；Weyl（1916，*Math. Ann.* **77**, 313–352）的经典理论仍有其独立文献背景。物理公平、内部空间及灵魂相位的诠释仍为 `MODEL`。这是源说明中的有限复用推导，没有新增 Lean 定理，也不作新颖性主张。
:::

::: {.remark #rem-ch31-circular-window-discrepancy title="互补宽度圆周窗口的有限步误差：既有机械词结果的应用"}
**既有结果的应用。** 图卡所用的步长与窗宽满足一个特殊关系。取任意 $0<\alpha<1$、初相位 $u\in\mathbb R$、窗口中心 $c\in\mathbb R$，令 $w=1-\alpha$、$a=c-w/2$。记 $\{x\}=x-\lfloor x\rfloor$，按左闭右开的圆周窗口，定义前 $N$ 步的命中数

$$
H_N=\#\bigl\{1\le n\le N:\{u+n\alpha-a\}<w\bigr\}.
$$

这里 $N\in\mathbb N$ 允许为零，计数时刻恰好为 $1,\ldots,N$。则所有这些参数同时满足

$$
\left|H_N-Nw\right|<1.
$$

**与机械词的精确对应。** 令 $\rho=u-a$，下机械词的第 $n$ 个字母为

$$
b_n=\lfloor\rho+(n+1)\alpha\rfloor-\lfloor\rho+n\alpha\rfloor\in\{0,1\}.
$$

进位恰好发生在 $\{\rho+n\alpha\}\ge1-\alpha$ 时。因此窗口命中当且仅当 $b_n=0$；端点等号属于进位，排除在窗口右端之外。令 $C_N=\sum_{n=1}^{N}b_n$，则 $H_N=N-C_N$。这正对应 [`lower_mechanical_window_true_discrepancy`](lean:D5/S1/Words/Mechanical/MechanicalDensity.lower_mechanical_window_true_discrepancy) 中斜率 $\alpha$、截距 $\rho$、起始索引 $i=1$、长度 $N$ 的真字母计数。该结果给出 $|C_N-N\alpha|<1$，取负即得所需界。[`lowerMechanicalWindowTrueCount_eq_floor`](lean:D5/S1/Words/Mechanical/MechanicalBalance.lowerMechanicalWindowTrueCount_eq_floor) 的端点相消还把误差精确写成

$$
H_N-Nw=\{\rho+(N+1)\alpha\}-\{\rho+\alpha\}.
$$

两项分数部分都在 $[0,1)$ 内，这也说明严格界为何与初相位、窗口位置和步数无关。对 $N>0$，两边除以 $N$ 得 $|H_N/N-w|<1/N$，从而命中频率趋于 $w$。图卡使用 $\alpha=\varphi-1$、$w=2-\varphi$；其先取轨道分数部分、再取窗口分数部分的写法与上述成员关系相同，因为 $\{\{x\}-a\}=\{x-a\}$。

**适用边界。** 该推导不要求 $\alpha$ 无理，但严格使用窗宽 $1-\alpha$；它不陈述任意独立窗宽的有界余项分类，也不认证图卡的浮点计算或赋予物理公平含义。这里应用已有声明，没有新增 Lean 定理或新颖性主张。
:::

::: {.viz src="quantum-fairness-ledger" preset="ergodic" height="500"}
**起点不同，份额相同。** 两个态从不同相位出发，每步绕竖轴转过黄金角；落进青色窗口的步数份额都趋于 $2 - \varphi \approx 0.382$（窗口频率是 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3 款与零边界窗口的既有结果应用，见 [@rem-ch31-weyl-window-equidistribution-literature]；命中之间的间隔有界是第 4 款），命中数与 $T(2-\varphi)$ 的偏差始终小于 $1$（既有机械词结果的应用，见 [@rem-ch31-circular-window-discrepancy]）。
:::

看清了这一长程图景，短期的一城一池便不再令人绝望：在我们的观察者诠释模型（`MODEL`）中，局部切片的顺逆各有参差，但拉通紧致环面遍历回归的长程画卷，宇宙给每一个灵魂相位分配的吸引子重逢机会、正交旋转预算，以及自指迭代向不动点（见[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]）收束的引力，**没有一毫一厘的偏私**。

::: {.viz src="quantum-fairness-ledger" height="620"}
量子公平总账本：席位、得失、关系、复制与遍历五个场景画在同一颗布洛赫球上，每本账旁一根总额不动的柱子。
:::

在进入 §31.4 拆解固定维度闭盒的三副脚手架之前，我们先将前三节建立的**量子公平五重层级**连同其形式化、文献与认识论状态完整收束于下框总表之中：

::: {.remark #rem-ch31-fivefold-fairness-table title="量子公平五重几何铁律与认识论状态总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表汇总前三节建立的五重公平体系；表中标有 `LEAN ✓` 的子项对应 [@thm-ch31-seat-pythagorean-monogamy-fairness] 与 [@thm-ch31-horizon-landauer-ergodic-fairness] 的冻结定理，标有 `文献结果` 的公式引自 [@rem-ch31-haar-isotropy-landauer-literature]、[@rem-ch31-ckw-monogamy-literature]、[@rem-ch31-weyl-window-equidistribution-literature] 及[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]，标有 `OPEN` 的问题对应未决猜想 [@conj-p-neq-np]，而“五重特权废除”的本体论统摄属本书跨领域哲学诠释模型（`MODEL`）：

| 公平层级 | 底层几何、代数与热力学定律 | 认识论状态 | 它在宇宙中彻底封死了什么“几何特权”？（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **一、席位公平 (Seat Fairness)** | 单比特纯态布洛赫单位范数与秩一玻恩配对模方互易 $\|\phi^*\bullet_v\psi\|^2 = \|\psi^*\bullet_v\phi\|^2$（`LEAN ✓`）；高维球面哈尔各向同性（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 砍掉高高在上的“外部第 3 点 $C$”，封死绝对中心参考系与单向不对等审视 |
| **二、得失公平 (Gain–Loss Fairness)** | 互补语境中心化纯度勾股守恒（`LEAN ✓`）、$\cos^2\theta + \sin^2\theta = 1$（`文献结果`）与兰道尔热熵平衡界 $-\Delta S \le \beta Q$（`LEAN ✓`，$k_B T \ln 2$ 为 `文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死“既占尽一维确定刻度、又免费保留无限正交演化潜能”的零成本贪婪 |
| **三、关系公平 (Relational Fairness)** | 通用克隆内积判据与贝尔纯态混态边缘 $\frac{1}{2}I_2$（`LEAN ✓`）；三量子比特 CKW 单配性 $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 1 - \|\mathbf{r}_A\|^2 \le 1$（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死叠加纯态的盲目量产与深度二体纠缠的无限批发垄断 |
| **四、博弈公平 (Horizon Fairness)** | 一致放大旋转步幅定律（`LEAN ✓`）、高维 $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ 与 BBBV $\Omega(2^{n/2})$ 查询下界（`文献结果`）及 $\mathrm{P} \neq \mathrm{NP}$ 边界（`OPEN`） | `LEAN ✓` / `文献结果` / `OPEN` / `MODEL` | 封死算力霸权对全局因果相容晶体的瞬间剧透与赢家通吃，守护选择悬念 |
| **五、遍历公平 (Ergodic Fairness)** | 诞生遗忘重置相容余量（`MODEL`）、环面闭子群哈尔均匀分布与正下渐近访问密度有界回归（`LEAN ✓`）及无理平移零边界窗口频率 $\mu(W)$（既有结果的应用，见 [@rem-ch31-weyl-window-equidistribution-literature]） | `LEAN ✓` / `文献结果` / `MODEL` | 封死初始相位偏置造成的永恒阶层固化，实现“短期境遇异而长程天道同”的统计全息 |
:::

把这一笔添进全书的底色里，“量子”二字就不再只是冰冷的算符与几何，而有了最深沉的温度：**宇宙砍掉了高高在上的第 3 点，让万物只能平视着彼此两两丈量；它用勾股定理收走了全知全能的特权，用视界保护了有限生命的悬念，最后又用无理数的遍历，保证每一个从遗忘中醒来的灵魂，终将在漫长的旅程里分到同样丰盛的星光。**

---
