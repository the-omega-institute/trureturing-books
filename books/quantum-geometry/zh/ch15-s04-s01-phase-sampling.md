# K.1 实际计数分布与相位采样 {#sec-ch15-s04-s01-phase-sampling}

::: {.corollary #cor-finite-poisson-period title="ZMod m 子群与零化子上的有限泊松求和推论" lean="D5/S3/Fourier/FinitePoisson.finite_poisson_summation"}
设 $m \in \mathbb{N}$ 且满足 `[NeZero m]`，$H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ 为 $\mathrm{ZMod}\,m$ 的加法子群，$f : \mathrm{ZMod}\,m \to \mathbb{C}$ 为任意复值函数。则 $f$ 在子群 $H$ 上的和恒等于其离散傅里叶变换 $\mathrm{ZMod.dft}\,f$ 在零化子 $\mathrm{annihilator}(H)$ 上的缩放和：

$$
\sum_{h : H} f(h.1) = \frac{(\mathrm{Fintype.card}\,H : \mathbb{C})}{(m : \mathbb{C})} \cdot \sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1.
$$
:::

::: proof
按 `ZMod.dft` 的定义将右端对 $k : \mathrm{annihilator}(H)$ 的求和展开，并交换有限求和次序（对 $x \in \mathrm{ZMod}\,m$ 与 $k \in \mathrm{annihilator}(H)$）：

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1
= \sum_{x \in \mathrm{ZMod}\,m} f(x) \sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(-k.1)(x).
$$

因为 $k \mapsto -k$ 是加法子群 $\mathrm{annihilator}(H)$ 上的双射，内层和式等于 $\sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(k.1)(x)$。代入 [@prop-finite-character-cancellation]，所有 $x \notin H$ 的项全部归零，仅保留 $x \in H$ 的项，每项乘以常数 $|\mathrm{annihilator}(H)|$：

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1 = \bigl(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C}\bigr) \sum_{h : H} f(h.1).
$$

最后利用有限循环群子群与零化子的拉格朗日基数恒等式 $\mathrm{Fintype.card}(H) \cdot \mathrm{Fintype.card}(\mathrm{annihilator}(H)) = m$，两边同乘 $\frac{\mathrm{Fintype.card}(H)}{m}$ 消去因子 $\frac{|H| \cdot |H^\perp|}{m} = 1$，即得左端 $\sum_{h : H} f(h.1)$。完整证明由 Lean 内核检查。
:::


在 $m = 32$、周期 $r = 8$ 的例子里，位置梳子 $H = \{0, 8, 16, 24\}$ 只有 $4$ 格，零化子 $H^\perp = \{0, 4, 8, \dots, 28\}$ 却有 $8$ 个频率，间距是 $m/r = 4$。

::: {.remark #rem-shor-divisibility-boundary-literature title="有限泊松求和、条件候选与完整 Shor 算法的边界"}
**范围说明。** 在将 [@cor-finite-poisson-period] 与 Shor 大数分解算法对接时，先分清两条边界，再从实际输入推导非整除情形的计数寄存器分布。下面紧随冻结声明给出精确边缘分布；后面的推导解释这些陈述，完整算法的结论仍见 [@rem-grover-qft-shor-literature]。

1. **有限泊松恒等式不等于完整 Shor 算法的成功概率或多项式复杂度定理**：[@cor-finite-poisson-period] 是 $\mathrm{ZMod}\,m$ 上的精确调和分析恒等式，它本身并不包含模幂电路构造、连分数有理逼近恢复定理、欧拉函数互素概率下界或大数分解的多项式门复杂度（其中条件候选成员资格另见 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate]；下文将它们与实际边缘分布结合，在 $N^2\le Q$ 下推导单次候选列表包含真阶的事件下界；完整算法边界见 [@rem-grover-qft-shor-literature]）。
2. **整除情形（$r \mid Q$）与一般非整除情形（$r \nmid Q$）的本质区别**：当 $r \mid Q$ 时，完整的周期梳子是 $\mathrm{ZMod}\,Q$ 中子群的陪集，非共振频点按 [@prop-finite-character-cancellation] **精确为零**。当 $r \nmid Q$ 时，截在寄存器边界上的梳子不能这样套用子群恒等式。此时要计算有限几何和；得到某个峰附近的概率下界之后，从频率逼近得到候选仍是另一项数论任务；下面的条件候选定理完成其中的成员资格部分，再与实际相位混合组合，得到候选列表包含真阶的单次事件下界。这不改变条件梳子自身集中性质的文献边界。

:::

::: {.theorem #thm-shor-qpe-probability-mixture title="实际输入的 Shor 计数寄存器边缘分布" lean="D5/S3/Quantum/ShorCountingMarginal.shor_qpe_probability_mixture"}
对每个参数记录 $c$（其模数至少为 $2$、底数为与模数互素的自然数、目标宽度给出包含模数的维数 $D=2^{\mathrm{width}}$，且周期 $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$），每个控制宽度 $n\in\mathbb N$，以及每个 $y\in\mathrm{Fin}(2^n)$，都有

$$
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)
=\frac{1}{r}\sum_{s\in\mathrm{Fin}\,r}
\operatorname{probability}\!\left(2^n,\frac{s.\operatorname{val}}{r},y\right)。
$$

这里的 `normSquared` 对 $D$ 个物理工作坐标的平方模全部求和；输入是记录中坐标 $1$ 的计算基向量，等式给出对整个工作寄存器求和后，指定计数结果的边缘概率。
:::

::: proof
冻结声明把实际基态输入展开为模乘轨道的正交傅里叶本征态，施加受控幂与逆傅里叶变换，再用正交性消去交叉项。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-shor-distribution-normalized title="实际 Shor 计数边缘分布的归一化" lean="D5/S3/Quantum/ShorCountingMarginal.shor_distribution_normalized"}
对每个参数记录 $c$，记 $r=c.\operatorname{period}$，以及每个 $n\in\mathbb N$，都有

$$
\sum_{y\in\mathrm{Fin}(2^n)}
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)=1。
$$

这包括边界情形 $n=0$：此时控制寄存器只有 $y=0$ 一个结果。
:::

::: proof
对实际输入的混合式在所有计数结果上求和，使用任意相位核的归一化；周期为正，因而混合权重恰好相消。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-shor-mixture-peak-lower-bound title="实际边缘分布的逐点最近格点下界" lean="D5/S3/Quantum/ShorCountingMarginal.shor_mixture_peak_lower_bound"}
对每个参数记录 $c$，记 $r=c.\operatorname{period}$，以及每个 $n\in\mathbb N$、每个 $s\in\mathrm{Fin}\,r$ 与 $b\in\mathrm{Fin}(2^n)$，假设

$$
\operatorname{Nearest}\!\left(2^n,\frac{s.\operatorname{val}}{r},b\right)。
$$

按定义，这个假设的含义是

$$
\exists z\in\mathbb Z,\ \left|\frac{s.\operatorname{val}}{r}-\frac{b.\operatorname{val}}{2^n}-z\right|\le\frac{1}{2\cdot2^n},
$$

则

$$
\frac{1}{r}\,\frac{4}{\pi^2}
\le
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,b\right)。
$$

这是所选相位与格点标签的逐点结论；不同相位可能选中同一标签，所以它不是总事件成功概率。
:::

::: proof
任意相位下界给出所选本征相位的 $4/\pi^2$；实际混合中该分量的权重是 $1/r$，其余平方范数均非负。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-qpe-arbitrary-phase-lower-bound title="单个相位的圆周最近格点下界" lean="D5/S3/Quantum/ShorCountingMarginal.qpe_arbitrary_phase_lower_bound"}
对每个满足 $0<N$ 的 $N\in\mathbb N$、每个实相位 $\theta$ 与 $b\in\mathrm{Fin}\,N$，假设

$$
\operatorname{Nearest}(N,\theta,b)。
$$

按定义，这个假设的含义是

$$
\exists z\in\mathbb Z,\ \left|\theta-\frac{b.\operatorname{val}}{N}-z\right|\le\frac{1}{2N},
$$

则

$$
\frac{4}{\pi^2}\le\operatorname{probability}(N,\theta,b)。
$$

整数移位使这个条件是圆周距离，包含 $0/1$ 接缝以及两种中点并列选择。
:::

::: proof
证明把相位按给定整数移位，计算有限几何和，在最近区间使用正弦不等式，再将 $2/\pi$ 的振幅估计平方。完整证明由 Lean 内核检查。
:::

最近格点下界只盯住一根柱子；若要控制一个窗口外所有柱子的总重量，就必须对尾部求和。沿用逆傅里叶规范，记

$$
\begin{aligned}
A_Q(\theta,j)&=\frac1Q\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-j.\operatorname{val}/Q)},\\
p_Q(\theta,j)&=|A_Q(\theta,j)|^2=\operatorname{probability}(Q,\theta,j),\\
d_Q(\theta,j)&=\left\|\left(\theta-\frac{j.\operatorname{val}}Q:\mathbb R/\mathbb Z\right)\right\|.
\end{aligned}
$$

最后一行精确对应 Lean 的 `UnitAddCircle` 范数，即误差模整数后的圆周距离，取值在 $[0,1/2]$。半径写作 $\varepsilon$，以区别于下文反射标号的 $\rho$。

::: {.theorem #thm-qpe-circular-tail title="单相位 QPE 的圆周窗口尾界" lean="D5/S3/Quantum/QPECircularTail.qpe_circular_tail_le"}
对每个 $n\in\mathbb N$、每个实相位 $\theta\in\mathbb R$ 和每个实半径 $\varepsilon>0$，令 $Q=2^n$，则

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\\varepsilon\le d_Q(\theta,j)}}p_Q(\theta,j)
\le\frac1{2Q\varepsilon}+\frac1{2(Q\varepsilon)^2}.
$$

坏事件包含距离恰等于 $\varepsilon$ 的标签；相位不必属于 $[0,1)$，不需要最近格点、阶或互素性假设。
:::

::: proof
把每个误差减去最近整数，使其绝对值不超过 $1/2$。几何和与正弦下界给出正距离处 $|A_Q(\theta,j)|\le1/(2Qd_Q(\theta,j))$。将标签提升为整数后，模 $Q$ 还原证明这些提升互异；平方并求和便归结为中心两侧的有限倒平方尾和。每侧保留首项，再用倒数差的望远镜和控制其余项，得到所述两个常数。完整证明由 Lean 内核检查。
:::

结合单相位核的[归一化](lean:D5/S3/Quantum/ShorCountingMarginal.qpe_probability_normalized)，把所有标签分成上述坏事件与严格好窗口，可得以下直接推论：

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\d_Q(\theta,j)<\varepsilon}}p_Q(\theta,j)
\ge1-\frac1{2Q\varepsilon}-\frac1{2(Q\varepsilon)^2}.
$$

这是对所引尾界与归一化的应用，不另设冻结声明。注意好窗口的严格不等号：若距离等于半径，它属于坏事件。$Q=128$、$\varepsilon=1/16$ 时，$Q\varepsilon=8$，尾界为 $1/16+1/128=9/128$，严格好窗口的质量至少为 $119/128$，对所有实相位都成立。$n=0$、负相位、整数移位、$0/1$ 接缝与中点并列均在定理范围内；$\varepsilon>1/2$ 时坏事件为空。上界可能大于 $1$，这只表示估计在该尺度不尖锐。

尾界的供给证明来自 QudeLeap Team 的 [Lean-QuantumAlg 固定版本](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00)，保留来源与 Apache 2.0 许可；所用单次估计见 Lin Lin，*Lecture Notes on Quantum Algorithms for Scientific Computation*，[arXiv:2201.08309v1](https://arxiv.org/abs/2201.08309v1)，§3.5，式 (3.48)–(3.50)。这里仅对既有逆傅里叶单相位核求和；下文候选事件的下界另由实际混合、最近格点估计与数论恢复组合得到。这个尾界本身没有给出任意条件梳子的集中、重复采样规律或因子提取保证。若末端改用正指数 $\mathcal F_+$，须按下文的 $\rho(k)=(-k)\bmod Q$ 反射标号后再使用同一个相位。

::: {.remark #rem-shor-actual-input-marginal title="实际输入推导与 Shor 的剩余边界"}
下面的实际输入推导解释边缘分布、归一化与逐点下界的四条声明；其后的 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate] 给出有条件的连分数候选成员资格，再据此推导单次候选列表包含真阶的概率下界。精确选阶、重复采样、因子提取与完整算法复杂度的边界仍见 [@rem-grover-qft-shor-literature]。

**实际装入的是 $|1\rangle$。** 设模数 $N \ge 2$、自然数底数 $a$ 满足 $\gcd(a,N)=1$。工作寄存器有 $w$ 个比特，维数 $D=2^w$，只要求 $N\le D$；计数寄存器独立地取 $Q=2^n$，$n$ 为任意自然数，包括 $0$。工作基标号是 $t\in\mathrm{Fin}\,D$，补齐后的模乘置换及其线性作用为

$$
\begin{aligned}
\pi_a(t)&=\begin{cases}at\bmod N,&t<N,\\t,&N\le t<D,\end{cases}\\
U_a|t\rangle&=|\pi_a(t)\rangle.
\end{aligned}
$$

互素性使模 $N$ 的乘法成为置换，额外的补齐坐标则保持不动。取 $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$，记 $t_j=a^j\bmod N$，$0\le j<r$。这 $r$ 个基向量互异，且 $U_a|t_j\rangle=|t_{j+1\bmod r}\rangle$。电路输入是基向量 $|1\rangle=|t_0\rangle$，并不要求先知道 $r$ 或制备某个未知本征态；$r$ 只是分析这条实际模乘轨道的参数。

**均匀的相位混合从哪里来？** 在这条轨道上定义归一化的傅里叶向量

$$
\begin{aligned}
|u_s\rangle&=\frac{1}{\sqrt r}\sum_{j=0}^{r-1}e^{-2\pi i sj/r}|t_j\rangle,
\qquad 0\le s<r,\\
U_a|u_s\rangle&=e^{+2\pi i s/r}|u_s\rangle,\\
\langle u_s\mid u_{s'}\rangle&=\delta_{ss'},
\qquad |1\rangle=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}|u_s\rangle.
\end{aligned}
$$

第一行的负号与第二行的正号配套：把轨道指标从 $j$ 平移到 $j+1$，系数就提出 $e^{+2\pi i s/r}$。正交性来自 $r$ 次单位根之和；再对 $s$ 求和，只有 $j=0$ 留下，给出最后一个等式。这是纯态的相干分解，并未假设工作寄存器起初随机选取了一个相位。它们只张成轨道子空间，也不是整个 $D$ 维工作空间的本征基声明。

**两次 $1/\sqrt Q$，合成振幅中的 $1/Q$。** 计数寄存器均匀制备后，按二进制位受控施加 $U_a^{2^j}$；分支 $x=\sum_j x_j2^j$ 上的乘积就是 $U_a^x$。于是傅里叶变换之前的实际联合态为

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle U_a^x|1\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle.
$$

先用源文的逆变换 $\mathcal F_- =\mathcal F_+^{-1}$，其矩阵元是 $Q^{-1/2}e^{-2\pi i kx/Q}$。把变换后计数结果 $k$ 对应的工作向量记为 $v_-(k)$，便有

$$
\begin{aligned}
v_-(k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{-2\pi i kx/Q}|a^x\bmod N\rangle\\
&=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}A_Q(s/r,k)|u_s\rangle,\\
A_Q(\theta,k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-k/Q)},\\
p_Q(\theta,k)&=|A_Q(\theta,k)|^2.
\end{aligned}
$$

这里的 $1/Q$ 同时包含均匀输入的 $1/\sqrt Q$ 与逆傅里叶变换的 $1/\sqrt Q$，不能漏掉任何一个。

**实际概率要对全部工作结果求和。** 计数寄存器的无条件边缘概率是

$$
\begin{aligned}
P_-(k)&=\sum_{t=0}^{D-1}|v_-(k)(t)|^2\\
&=\frac{1}{r}\sum_{s=0}^{r-1}p_Q(s/r,k).
\end{aligned}
$$

左边包括全部 $D$ 个坐标；轨道外的坐标（包括补齐坐标）在此输入下振幅为零。右边的均匀权重 $1/r$ 是由 $\langle u_s\mid u_{s'}\rangle=\delta_{ss'}$ 消去交叉项后得到的。它既不是某一个本征相位的概率，也不是条件测得某个工作输出后的梳子分布。对任意实相位 $\theta$，展开平方并使用 $Q$ 次单位根正交性可直接验算

$$
\begin{aligned}
\sum_{k=0}^{Q-1}p_Q(\theta,k)
&=\frac{1}{Q^2}\sum_{x,x'=0}^{Q-1}e^{2\pi i(x-x')\theta}
  \sum_{k=0}^{Q-1}e^{-2\pi i k(x-x')/Q}\\
&=\frac{1}{Q^2}\sum_{x=0}^{Q-1}Q=1,\\
\sum_{k=0}^{Q-1}P_-(k)&=\frac{1}{r}\sum_{s=0}^{r-1}1=1.
\end{aligned}
$$

此处 $x,x'$ 都在 $0,\ldots,Q-1$，所以内层和仅在 $x=x'$ 时为 $Q$。当 $n=0$ 时，$Q=1$，受控幂序列为空，$A_1(\theta,0)=1$，唯一计数结果的实际概率仍为 $P_-(0)=1$。当 $r=1$ 时，轨道只有 $|1\rangle$，混合中也只有相位 $0$ 一项，故 $P_-(0)=1$，其余计数结果的概率为零。以上没有用到 $r\mid Q$、$Q>r^2$ 或 $n>0$。

**本章正指数约定的输出要反射。** 令 $e:\mathrm{Fin}\,Q\simeq\mathrm{ZMod}\,Q$ 为按最小非负代表元识别标号的 `ZMod.finEquiv`，并记 $\rho(k)=e^{-1}(-e(k))$，即 $(-k)\bmod Q$。对按此识别的任意坐标函数 $f$，本节的负指数未归一化 `ZMod.dft` 满足

$$
\begin{aligned}
(\mathcal F_-f)(k)&=\frac{1}{\sqrt Q}(\mathrm{ZMod.dft}\,f)(e(k)),\\
(\mathcal F_+f)(\rho(k))&=(\mathcal F_-f)(k).
\end{aligned}
$$

因此若末端沿用本章的 $\mathcal F_+$，相同工作向量出现在反射后的标号：$v_+(\rho(k))=v_-(k)$，从而 $P_+(\rho(k))=P_-(k)$。相位仍标为 $s/r$；逆变换中靠近 $sQ/r$ 的标号，在正变换中对应 $\rho(k)$，不能在切换傅里叶符号时悄悄保留同一个峰标号。

**最近格点下界是逐点的。** 固定任意 $s\in\mathrm{Fin}\,r$ 与 $b\in\mathrm{Fin}\,Q$，假设圆周最近条件

$$
\exists z\in\mathbb Z,\qquad
\left|\frac{s}{r}-\frac{b}{Q}-z\right|\le\frac{1}{2Q}.
$$

这允许中点两侧的任一选择，也包括跨过 $0/1$ 接缝的情形。令 $\delta=s/r-b/Q-z$；整数移相不改变 $A_Q$。若 $\delta=0$，则 $A_Q(s/r,b)=1$。否则有限几何和给出

$$
|A_Q(s/r,b)|
=\frac{|\sin(\pi Q\delta)|}{Q|\sin(\pi\delta)|}
\ge\frac{2Q|\delta|}{Q\pi|\delta|}
=\frac{2}{\pi}.
$$

不等式使用 $|\pi Q\delta|\le\pi/2$ 上的 $|\sin u|\ge2|u|/\pi$，以及 $|\sin u|\le|u|$；分母在这一非零分支严格为正。平方后，相位分量与实际边缘概率分别满足

$$
\begin{aligned}
p_Q(s/r,b)&\ge\frac{4}{\pi^2},\\
P_-(b)&\ge\frac{1}{r}p_Q(s/r,b)\ge\frac{4}{r\pi^2},\\
P_+(\rho(b))&\ge\frac{4}{r\pi^2}.
\end{aligned}
$$

量词是任意 $n\ge0$、任意相位指标 $s<r$、任意满足该最近条件的 $b<Q$。不同 $s$ 可能选中同一个 $b$，尤其在 $Q<r$ 时；不能把这些逐点下界不加分析地累加成互异测量事件的成功概率。

**一个不整除的小算例：$N=7,a=2,D=8,Q=4,r=3$。** 模乘轨道是 $1,2,4$，变换前的态为

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac12\bigl(|0\rangle|1\rangle+|1\rangle|2\rangle
+|2\rangle|4\rangle+|3\rangle|1\rangle\bigr).
$$

在 $k=0$，$v_-(0)=(2|1\rangle+|2\rangle+|4\rangle)/4$，所以实际概率是 $(4+1+1)/16=3/8$。相位核也给出 $p_4(0,0)=1$、$p_4(1/3,0)=p_4(2/3,0)=1/16$，均匀混合为 $(1+1/16+1/16)/3=3/8$。但若在末端傅里叶变换前条件测得工作输出 $2$，计数态仅剩 $|1\rangle$，傅里叶变换后四个结果各占 $1/4$。逐个展开可见整个区别：

| 计数标号 $k$ | 实际 $P_-(k)$ | 条件概率 $P_-(k\mid t=2)$ |
| --- | --- | --- |
| $0$ | $3/8$ | $1/4$ |
| $1$ | $1/4$ | $1/4$ |
| $2$ | $1/8$ | $1/4$ |
| $3$ | $1/4$ | $1/4$ |

工作输出 $1,2,4$ 的概率依次为 $1/2,1/4,1/4$；把各自的条件分布按这些权重平均才得到实际边缘分布。这里 $3\nmid4$ 且 $Q<r^2$，仍满足上述公式；这个算例不承担连分数恢复或分解整数的结论。

冻结的数学来源是合入后的 trureturing 提交 `0ee6636c21a9d8fb2bafd11c91a8fb6247154a25` 中的 [`D5/S3/Quantum/ShorCountingMarginal.lean`](https://github.com/the-omega-institute/trureturing/blob/0ee6636c21a9d8fb2bafd11c91a8fb6247154a25/D5/S3/Quantum/ShorCountingMarginal.lean)：上面的 `Parameters.shor_qpe_probability_mixture`、`shor_distribution_normalized`、`shor_mixture_peak_lower_bound`，以及提供单相位估计的 `QuantumPhaseEstimationGeneral.qpe_arbitrary_phase_lower_bound`。源码参数 `modulus, base, width, dimension, period` 分别对应 $N,a,w,D,r$；`runQPE` 使用 $\mathcal F_-$，`normSquared` 对整个工作寄存器的坐标平方模求和。移植保留 Lean 源文件中的 Apache 2.0 许可与来源注记。周边算法讨论的文献依据是 R. Cleve、A. Ekert、C. Macchiavello 与 M. Mosca，*Quantum Algorithms Revisited*，[arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016)，§§5–6，式 (5.2)–(5.4)、(6.1)–(6.4)。

上述推导给出实际输入的边缘分布、归一化和最近格点的逐点下界。下文增加 $N^2\le Q$，先处理条件候选成员资格，再通过各相位分量上的同一事件求和，得到单次列表成员概率下界，并在显式独立重置前提下推导恰好两次观察的全配对最小公倍数列表事件下界；逐次精确选阶认证、整数分解、任意相关重复与完整门复杂度仍保留 [@rem-grover-qft-shor-literature] 的边界。这里也没有给出任意非二幂 $Q$、每一条条件后验梳子或硬件实现的保证。
:::
