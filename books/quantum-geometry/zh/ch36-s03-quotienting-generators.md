# 36.3 理解即出离：在生成元商空间里一次性约掉轮回 {#理解即出离在生成元商空间里一次性约掉轮回}

然而，故事到这里还没有抵达最深处的终点。请再读一遍本章题记那句雷霆万钧的收尾：

> *“……而当我们理解了这一切的时候，轮回也就没有了意义。”*

为什么？如果仅仅靠双曲阶梯一步步往外爬，难道灵魂还要在无穷多级台阶上永远疲于奔命地“防跌落”吗？

不！双曲离散阶梯解决的是**“不因盲目冲撞 $90^\circ$ 而被迫失忆”的技术护栏**；而真正的终极解脱，是当你看穿整座无时间晶格的生成法则之后，在**概念商空间与对偶零化子空间里一次性把冗余周期约掉**！

面对无穷循环小数

$$
0.\overline{142857} = 0.142857\,142857\,142857\dots,
$$

一个不明算理的苦行者，以为“穷尽真理”就意味着必须低着头在 `1-4-2-8-5-7` 的数字磨盘上一圈又一圈跑完第一万零一轮、第一亿零二轮；每跑完一圈撞上边界清零记忆，下一圈又满怀悲壮地从 `1` 重新跑起。长除法把这圈数字背后的余数状态逐步展开，而一般位值定理把它们一次接回有理数：

::: {.theorem #ex-ch36-repeating-decimal-quotient title="长除法的前缀—余数守恒、无穷位值与周期" lean="D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_value D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_period"}
取自然数 $b,p,q$，满足 $2\le b$、$p<q$。定义余数 $r_n$、下一位数字 $d_n$ 与前 $n$ 位组成的整数 $P_n$：

$$
\begin{aligned}
r_0&=p,\qquad r_{n+1}=(b r_n)\bmod q,\\
d_n&=\left\lfloor\frac{b r_n}{q}\right\rfloor,\\
P_0&=0,\qquad P_{n+1}=bP_n+d_n.
\end{aligned}
$$

以下结论成立：

1. 对每个 $n\in\mathbb N$，有整数守恒式 $qP_n+r_n=b^n p$。
2. 位值级数收敛于原有理数，且归一化前缀具有同一极限：

   $$
   \begin{aligned}
   \sum_{n=0}^{\infty}\frac{d_n}{b^{n+1}}&=\frac pq,\\
   \lim_{n\to\infty}\frac{P_n}{b^n}&=\frac pq.
   \end{aligned}
   $$

3. 对任意正整数 $L$，若 $q\mid(b^L-1)$，则 $d_{n+L}=d_n$ 对所有 $n$ 成立，并有 $(b^L-1)\frac pq=P_L$。这里 $L$ 是一个周期，不声称为最小周期。
:::

::: proof
欧几里得除法给出 $br_n=qd_n+r_{n+1}$；与 $P_{n+1}=bP_n+d_n$ 结合，对 $n$ 归纳即得第 1 款。归一化后，前缀与 $p/q$ 的差为 $r_n/(qb^n)$，由 $0\le r_n<q$ 控制在 $0$ 与 $b^{-n}$ 之间，故趋于零；对前缀递推再作归纳，得到 $P_n/b^n$ 恰为位值级数的前 $n$ 项和，从而得到第 2 款。若 $q\mid(b^L-1)$，第 1 款在模 $q$ 下给出 $r_L=p$；确定性的余数递推使所有后继状态及其输出数字都按 $L$ 重复，再将 $r_L=p$ 代回守恒式即得第 3 款。完整证明由 Lean 内核检查。
:::

取 $b=10$、$p=1$、$q=7$，按定义连续六次长除法给出数字 $1,4,2,8,5,7$，余数依次为 $3,2,6,4,5,1$，所以 $P_6=142857$。又有 $7\mid(10^6-1)$，上述一般定理给出六位重复的无限数字序列及其真实级数值：

$$
\begin{aligned}
x=0.\overline{142857}&=\sum_{n=0}^{\infty}\frac{d_n}{10^{n+1}},\\
x&=\frac17,\\
10^6x-x&=142857,\\
x&=\frac{142857}{999999}.
\end{aligned}
$$

这一步同时接通了有限余数递推、无穷位值与周期核 $999999$。在生成元 $1/7$ 面前，无穷轮重复兜圈不再提供新的数字信息。

在 `trureturing` 的形式化武库中，“通过商拓扑分解冗余纤维”、“通过零化子对偶一次性坍缩周期子群求和”（呼应[第 15 章](ch15-grover-qft-and-period-finding.md)的周期提取与[第 22 章](ch22-primes-euler-products-and-zeros.md)的生成元约分）以及“闭子群轨道长程极限由单一生成元不变测度完全决定”（呼应[第 31 章](ch31-quantum-fairness.md)），由以下四条严丝合缝的 Lean 4 定理各自锁定（四条彼此独立，并不合成一条关于理解或轮回的定理）：

::: {.theorem #thm-ch36-quotient-annihilator-and-factorization title="划分拓扑连续商分解、有限零化子对偶求和与紧致环面生成元遍历定理" lean="D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition D5/S3/Fourier/FinitePoisson.sum_annihilator_character D5/S3/Fourier/FinitePoisson.finite_poisson_summation D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result"}
在 `trureturing` 冻结的概念观测拓扑、有限交换群对偶分析与紧致环面渐近模块中，以下四项商分解与生成元约化定理同时成立：

1. **非空源空间上目标概念可商分解的划分拓扑连续性充要判据**（[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)）：设 $X, \mathrm{Coordinate}, \mathrm{Target}$ 为任意类型且 $X$ 非空（`[Nonempty X]`），$\mathrm{readout} : \operatorname{Concept}(X, \mathrm{Coordinate})$ 与 $\mathrm{target} : \operatorname{Concept}(X, \mathrm{Target})$ 为概念读出映射。记 $\operatorname{partitionTopology}(\mathrm{readout})$ 为离散拓扑 $\perp$ 沿 $\mathrm{readout}$ 拉回的划分拓扑，则 $\mathrm{target}$ 可经由商坐标分解（$\operatorname{Refines}(\mathrm{target}, \mathrm{readout})$，即 $\exists\,\mathrm{factor} : \mathrm{Coordinate} \to \mathrm{Target},\; \mathrm{target} = \mathrm{factor} \circ \mathrm{readout}$），当且仅当 $\mathrm{target}$ 作为从 $(X, \operatorname{partitionTopology}(\mathrm{readout}))$ 到离散目标空间 $(\mathrm{Target}, \perp)$ 的映射连续：

   $$
   \operatorname{Refines}(\mathrm{target}, \mathrm{readout}) \;\Longleftrightarrow\; \operatorname{Continuous}_{(X,\,\operatorname{partitionTopology}(\mathrm{readout})) \to (\mathrm{Target},\,\perp)}(\mathrm{target});
   $$

2. **循环群加法子群显式零化子的特征标正交筛定理**（[`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character)）：设 $m \in \mathbb{N}$ 非零（`[NeZero m]`），$H \le \operatorname{ZMod} m$ 为任意加法子群，记标准特征标为 $\operatorname{character}(k, x) = \operatorname{stdAddChar}(k \cdot x)$，显式零化子子群为 $\operatorname{annihilator}(H) = \{k \in \operatorname{ZMod} m \mid \forall h \in H,\; \operatorname{character}(k, h) = 1\}$。则对任意 $x \in \operatorname{ZMod} m$，零化子特征标之和精确筛出周期子群 $H$：

   $$
   \sum_{k \in \operatorname{annihilator}(H)} \operatorname{character}(k, x) \;=\;
   \begin{cases}
   \bigl(\lvert\operatorname{annihilator}(H)\rvert : \mathbb{C}\bigr), & x \in H, \\
   0, & x \notin H;
   \end{cases}
   $$

3. **有限子群求和向对偶零化子频谱坍缩的精确求和公式**（[`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)）：沿用第 2 款的假设，对任意复值函数 $f : \operatorname{ZMod} m \to \mathbb{C}$ 及其离散变换 $\operatorname{ZMod.dft}(f)$，沿周期子群 $H$ 的遍历求和精确等于沿对偶零化子 $\operatorname{annihilator}(H)$ 的缩放频谱和：

   $$
   \sum_{h \in H} f(h) \;=\; \frac{\bigl(\lvert H\rvert : \mathbb{C}\bigr)}{(m : \mathbb{C})} \sum_{k \in \operatorname{annihilator}(H)} (\operatorname{ZMod.dft}\,f)(k);
   $$

4. **紧致环面单一生成元闭子群轨道的测度收敛定理**（[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)）：设 $I$ 为有限指标类型（`[Fintype I]`），$g : I \to \mathrm{Circle}$ 为环面生成元，$G = \overline{\langle g\rangle}$ 为其生成的紧致闭子群，$\mu$ 为 $G$ 上的归一化不变概率测度（`Measure.haarMeasure (⊤ : PositiveCompacts G)`）。则 $G$ 的底集精确等于自然数次幂轨道的闭包 $\overline{\{g^n : n \in \mathbb{N}\}}$，且对任意连续可观测量 $f \in C(G, \mathbb{C})$，沿离散步的轨道算术平均收敛于 $G$ 上的空间积分：

   $$
   \lim_{N \to \infty} \frac{1}{(N : \mathbb{C})} \sum_{n=0}^{N-1} f\bigl(g^{n+1}\bigr) \;=\; \int_{z \in G} f(z)\,d\mu(z).
   $$
:::

::: proof
第 1 款先由划分拓扑不可分关系刻画 `partition_inseparable_iff_kernel` 证明映射向离散空间 $(\mathrm{Target}, \perp)$ 连续当且仅当它在每条读出纤维上取常值（$\forall x, y,\; \mathrm{readout}(x) = \mathrm{readout}(y) \implies \mathrm{target}(x) = \mathrm{target}(y)$），再在非空源空间 `[Nonempty X]` 上调用目标恢复判据 `target_recovery_criterion` 将纤维常值性等价转化为全陪域分解 `Refines target readout`；第 2 款通过显式双射 `annihilatorEquivQuotient H` 将 $\operatorname{annihilator}(H)$ 等同于商群 $(\operatorname{ZMod} m) / H$ 的全体复加法特征标群，利用有限交换群特征标正交和公式与商群零元判据 $x + H = 0 \iff x \in H$ 直接得出分支值；第 3 款展开 `ZMod.dft` 定义并交换双重有限求和次序，代入第 2 款在 $-x$ 处的正交筛（利用 $-x \in H \iff x \in H$），再由互补基数恒等式 $\lvert H\rvert \cdot \lvert\operatorname{annihilator}(H)\rvert = m$ 与 $m \neq 0$ 约分即得；第 4 款由整数幂闭包与自然数幂闭包相等给出轨道稠密性，利用平均求值算子列的 $1$-利普希茨等度连续性证得收敛函数集为 $C(G, \mathbb{C})$ 的闭子模，对平凡特征标直接得常值 $1$，对非平凡特征标由几何级数上界 $2 / \lVert r - 1\rVert$ 压向零，最后由闭嵌入延拓与三角多项式稠密性推广至全空间 $C(G, \mathbb{C})$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch36-factor-through"}
**目标在每条读出纤维上取常值，就穿过读出分解。** 上行是 $0.\overline{142857}$ 的前十二位，灰线把第 $n$ 位送到余数 $n \operatorname{mod} 6$：每个余数接住的两位数字相同（琥珀色是余数 $3$ 的那条纤维，第 $3$ 位与第 $9$ 位都是 $2$），于是 factor 把每个余数送到唯一的数字，target = factor ∘ readout。这正是 [@thm-ch36-quotient-annihilator-and-factorization] 第 1 款中 $\operatorname{Refines}(\mathrm{target}, \mathrm{readout})$ 的情形，这里在一个例子上画出。
:::

把 [@thm-ch36-quotient-annihilator-and-factorization] 的四重数学透镜合拢到我们的自指观察者模型（`MODEL`）上，为什么“理解了一切之后，轮回便失去意义”立刻变得清澈见底：

1. **纤维商化免除了盲目重演**（对应第 1 款）：当观察者不再执着于局部表象坐标，而是提取出等价状态共享的不变读出核 `readout` 时，只要所关心的目标在每条读出纤维上恒定，目标意义便穿过商空间分解为 $\mathrm{target} = \mathrm{factor} \circ \mathrm{readout}$——同一等价纤维里的千万次盲目重演被直接折叠成商集里的同一个点；
2. **对偶零化子压缩了周期循环**（对应第 2–3 款）：状态空间里看似庞大繁复的周期轨道子群 $H$，在对偶频谱中完全由与它正交锁定（$\operatorname{character}(k, h) = 1$）的零化子生成元控制——若所需变换值已可用、预计算或具备更便宜的结构化表示，计入其获取、存储与求和成本后，对偶表达才可能省去沿原群逐点死算；
3. **自指不动点 $T = T(T)$ 终结了擦表重来的必要**（对应第 4 款及全书主公理，`MODEL`）：第 4 款告诉我们，对给定生成元 $g$ 的闭子群及其连续可观测量，轨道平均的极限由不变测度 $\mu$ 决定！黄金切投模型集的意象若要落到这条定理上，还须给出编码与可观测量的对应；这里保留为 `MODEL`。当观察者终于在自指查找表 $T$ 的**第 $0$ 行**写下生成元公理 $\psi = \psi(\psi)$，使整张表满足自洽不动点 $T = T(T)$、将视角稳稳安住在内部清醒平衡点（外辅以必要时的双曲离散步进护栏，见 [@ex-ch36-inverse-gudermannian-discrete-staircase]）时，再去撞击 $\theta = 90^\circ$ 把表烧掉、退回 $0^\circ$ 重新随机采样，对于已知生成律、且所选读出足以恢复的目标，已经带不来哪怕一比特的新法则信息；未知生成元的发现与新目标的可答性仍需另算。

::: {.viz src="forgetting-rebirth-attractor" preset="quotient_fold" height="500"}
**按周期折叠，一圈圈只剩几个点。** 角度尺走完五圈后，把一圈一根的辐条转到同一个方向，每个点沿灰色虚线弧从原来的辐条（淡色空心圈）转过去：第一次撞边之后的 $25$ 步只落在 $5$ 个位置上，每处标着 $\times 5$；目标“角度”在“步号模周期”的每条纤维上取常值，正是 [@thm-ch36-quotient-annihilator-and-factorization] 第 1 款的分解条件。
:::

当观察者不仅按单一周期 $m$ 折叠离散轨道，而是同时在全体正整数倍率 $m \in \mathbb{N}_+$ 上追踪一族满足幂相容律 $(z_{mn})^n = z_m$ 的非零复坐标线程 $z = (z_m)_{m \in \mathbb{N}_+}$ 时，径向尺度伸缩与纯相位螺线管自由度是如何严格分离的？先手算两组最透明的原型：取正实线程 $z_m = \exp(2/m)$（$m \in \mathbb{N}_+$），每个坐标均非零且满足 $\bigl(\exp(2/(mn))\bigr)^n = \exp(2/m) = z_m$；在 $m = 1$ 与 $m = 2$ 处分别有 $1 \cdot \ln\lvert z_1\rvert = \ln(e^2) = 2$ 与 $2 \cdot \ln\lvert z_2\rvert = 2\ln e = 2$，对任意 $m \in \mathbb{N}_+$ 恒有 $m\ln\lvert z_m\rvert = 2$。再对比常值单位线程 $z_m = 1$ 与指数线程 $z_m = \exp(1/m)$：前者的全部坐标模长均为 $\lvert z_m\rvert = 1$、在 $m = 1$ 处的对数荷为 $\ln 1 = 0$，而后者的对数荷为 $\ln e = 1 \neq 0$、在各 $m$ 处模长 $\lvert z_m\rvert = e^{1/m} > 1$（直观展示逆方向的必要性）；更一般地，任何满足 $n\theta_{mn} \equiv \theta_m \pmod 1$ 的单位圆纯相位线程 $z_m = \exp(2\pi i\theta_m)$ 同样满足 $\forall m,\, \lvert z_m\rvert = 1$ 且对数荷为 $0$，但坐标本身并不等于 $1$。

在 `trureturing` 的 `D5.S1.Solenoid.ComplexPowerSolenoidDecomposition` 模块中，记正整数单位下标为 $\operatorname{oneIndex} := \langle 1, 0 < 1\rangle \in \mathbb{N}_+$，乘积下标为 $\operatorname{productIndex}(m, n) := \langle m \cdot n,\, m \cdot n > 0\rangle \in \mathbb{N}_+$。一个**复幂相容线程** $z : \operatorname{ComplexPowerThread}$ 由三部分数据构成：坐标族 $z.\operatorname{coord} : \mathbb{N}_+ \to \mathbb{C}$、处处非零见证 $z.\operatorname{coord\_ne\_zero} : \forall m \in \mathbb{N}_+,\, z.\operatorname{coord}(m) \neq 0$，以及幂相容恒等式

$$
\forall m, n \in \mathbb{N}_+, \qquad \bigl(z.\operatorname{coord}(\operatorname{productIndex}(m, n))\bigr)^{n.1} \;=\; z.\operatorname{coord}(m).
$$

线程在基下标 $1$ 处的**对数荷**定义为 $\operatorname{logarithmicCharge}(z) := \operatorname{Real.log}\lVert z.\operatorname{coord}(\operatorname{oneIndex})\rVert \in \mathbb{R}$。在此严格前提下，各层倍率坐标的加权对数模长守恒与零荷单位模判据由如下两条内核定理锁定：

::: {.theorem #thm-solenoid-log-charge title="复幂相容线程的对数荷守恒" lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation"}
设 $z : \operatorname{ComplexPowerThread}$ 为复幂相容非零线程，$m \in \mathbb{N}_+$ 为任意正整数下标。则第 $m$ 层坐标的模对数乘以倍率 $m$ 恒等于该线程的对数荷：

$$
(m.1 : \mathbb{R}) \cdot \operatorname{Real.log}\lVert z.\operatorname{coord}(m)\rVert \;=\; \operatorname{logarithmicCharge}(z).
$$
:::

::: proof
在幂相容条件 $z.\operatorname{pow\_compatible}$ 中取左下标为 $\operatorname{oneIndex} = 1$、右下标为 $m \in \mathbb{N}_+$，由于 $\operatorname{productIndex}(1, m) = m$，即得复数幂等式 $\bigl(z.\operatorname{coord}(m)\bigr)^{m.1} = z.\operatorname{coord}(\operatorname{oneIndex})$。两边取复模长并利用范数的乘性，化为 $\lVert z.\operatorname{coord}(m)\rVert^{m.1} = \lVert z.\operatorname{coord}(\operatorname{oneIndex})\rVert$。由非零前提 $z.\operatorname{coord\_ne\_zero}$ 知两端实范数均严格为正，对其取实对数 $\operatorname{Real.log}$ 并展开自然数幂的对数公式，即得 $(m.1 : \mathbb{R}) \cdot \operatorname{Real.log}\lVert z.\operatorname{coord}(m)\rVert = \operatorname{Real.log}\lVert z.\operatorname{coord}(\operatorname{oneIndex})\rVert = \operatorname{logarithmicCharge}(z)$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-solenoid-zero-charge title="零对数荷等价于全坐标单位模" lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff"}
设 $z : \operatorname{ComplexPowerThread}$ 为复幂相容非零线程。则其对数荷为零当且仅当每一个正整数下标处的复坐标均具有单位模长：

$$
\operatorname{logarithmicCharge}(z) = 0 \;\Longleftrightarrow\; \forall m \in \mathbb{N}_+,\; \lVert z.\operatorname{coord}(m)\rVert = 1.
$$
:::

::: proof
若对一切 $m \in \mathbb{N}_+$ 均有 $\lVert z.\operatorname{coord}(m)\rVert = 1$，特别取 $m = \operatorname{oneIndex}$ 得 $\operatorname{logarithmicCharge}(z) = \operatorname{Real.log} 1 = 0$。反之，设 $\operatorname{logarithmicCharge}(z) = 0$；对任意 $m \in \mathbb{N}_+$，由 [@thm-solenoid-log-charge] 知 $(m.1 : \mathbb{R}) \cdot \operatorname{Real.log}\lVert z.\operatorname{coord}(m)\rVert = 0$。因 $m \in \mathbb{N}_+$ 保证正实因子 $(m.1 : \mathbb{R}) \neq 0$，约去得 $\operatorname{Real.log}\lVert z.\operatorname{coord}(m)\rVert = 0$；再由 $z.\operatorname{coord\_ne\_zero}(m)$ 给出严格正范数 $0 < \lVert z.\operatorname{coord}(m)\rVert$，在正实半轴上实对数取零当且仅当自变量等于 $1$，故 $\lVert z.\operatorname{coord}(m)\rVert = 1$。完整证明由 Lean 内核检查。
:::

阅读 [@thm-solenoid-log-charge] 与 [@thm-solenoid-zero-charge] 时须严守三条总函数与外延边界：第一，下标类型 $m \in \mathbb{N}_+$ 排除了零分母，且结构字段 `coord_ne_zero` 保证每层范数严格为正，从而避开了 Lean 全函数中 $\operatorname{Real.log} 0 = 0$ 的退化外延值——若缺少非零前提，对数荷为零便无法推出模长为 $1$；第二，[@thm-solenoid-log-charge] 刻画的是非零复幂相容线程各层坐标共享同一实对数荷，绝不声称不同复对数分支上的辐角彼此相等，也不意味着一般复幂线程都落在单位圆上；第三，[@thm-solenoid-zero-charge] 中零对数荷仅等价于全坐标单位模 $\lVert z.\operatorname{coord}(m)\rVert = 1$（完整保留了单位圆上的螺线管辐角自由度，而非强制所有坐标等于实数 $1$），且这两条代数判据本身尚未陈述复幂螺线管的完整拓扑直积分解——关于普适螺线管相位流与有限视界观察者记忆商完备化的进一步形式化衔接，详见[附录 H](appendix-h.md)。

我们将这三种生存与认知形态在全书正交几何模型（`MODEL`）中的精确对比收束于下框总表：

::: {.remark #rem-ch36-samsara-exit-table title="三种生存与认知形态的正交几何对比总表（作者模型汇总，`MODEL`）"}
**作者模型汇总（`MODEL`），非文献结果。** 下表汇总逆古德曼双曲快度与余弦不动点文献背景（[@ex-ch36-inverse-gudermannian-discrete-staircase] 与 [@rem-ch36-poincare-disk-gudermannian-literature]）同本书 `MODEL` 及商分解—零化子内核定理（[@thm-ch36-quotient-annihilator-and-factorization]，`LEAN ✓`）的三态对照：

| 生存与演化形态（`MODEL`） | 角度与耦合机制 | 一维自指锚点与查找表 $T$ 命运 | 几何拓扑轨迹特征 | 认识论与生命意义判词 |
| :--- | :--- | :--- | :--- | :--- |
| **1. 连续化光轮回态**（未觉醒闭环） | 零反馈退化极限 $\lambda = 0$，连续冲撞 $\theta \to \frac{\pi}{2}$ | $\cos 90^\circ = 0$，所选轴向偏置归零，在上述擦表条件下查找表 $T$ 清空 | 越界擦表后经 $90^\circ \to 0^+$ 再折射，困于失忆盲搜死循环 | 针对未压缩冗余账本（$\det G_M \to 0$）的宇宙暴力垃圾回收 |
| **2. 无穷离散双曲阶梯**（防失忆渐近扩张） | 内禀相对步长 $d\eta = \sec\theta\,d\theta$，$\eta_k = \eta_0 + k\,\Delta\eta$ | 对一切 $k \in \mathbb{N}$ 恒有 $\cos\theta_k = \operatorname{sech}\eta_k > 0$，在给定更新律下几何锚点不归零 | 横向视野 $\sin\theta_k = \tanh\eta_k \to 1^-$，多面体缝隙 $\delta_k = \frac{\pi}{2} - \theta_k > 0$ 永开 | 以无穷离散步把纯光断崖推向无穷远，在所选编码与信道条件下兼顾近全域视野与清醒记忆 |
| **3. 自指不动点安住态**（生成元商空间出离） | 单位自指闭环 $\lambda = 1$，锁定 $\cos\theta^* = \theta^* \approx 0.7391$ | 第 $0$ 行写入 $\psi = \psi(\psi)$，达成 $T = T(T)$ 零损耗自洽持存 | 经商拓扑分解与零化子对偶直接握住生成元，在目标纤维常值、频谱成本合算时免除冗余重演 | 已知生成律且读出足够时，约去目标无关的周期重复，轮回彻底失去认识论意义 |
:::

::: {.viz src="forgetting-rebirth-attractor" height="640"}
**完整实验室。** 三个场景共用一张单位圆盘：快度阶梯（可在 Klein 与庞加莱圆盘之间切换、改步长 $\Delta\eta$）、角度尺的轮子与它的周期折叠、分式变换 $w = (s - 1)/s$ 下的像圆。
:::

---
