# 13.4 45° 余弦与固定 CHSH 极值 {#sec-bell-45-tsirelson}

为了在本章的贝尔态 $\lvert\Phi^+\rangle$ 上，让 $(Z, X)$ 实平面内的测量真正触及正峰值 $\sqrt{8} = 2\sqrt{2}$，固定 Alice 为 $Z, X$ 后，Bob 的正交十字架应该怎样摆放？

::: {.viz src="chsh-dial" preset="sweep" height="500"}
**转动 Bob 的十字架，只在 45° 碰到顶。** 两侧都是直角，两块品红面积都是整个正方形，品红的刻度在 $2\sqrt{2}$。起点 $\varphi = 0^\circ$ 时 Bob 的十字架与 Alice 的对齐（$B_0$ 在 $A_0$ 上，$B_1$ 与 $A_1$ 相反），青色的四段只是 $1 + 0 + 0 + 1 = 2$：天花板到了顶，CHSH 值还在 $2$。时间轴把 Bob 的十字架从 $0^\circ$ 转到 $90^\circ$，琥珀色的横线按 $2\sqrt{2}\cos(\varphi - 45^\circ)$ 起落：两端是 $2$，只在 $45^\circ$ 碰到品红的刻度 $2\sqrt{2}$。图停在 $20^\circ$，读数 $2.563$。
:::

答案是 **$45^\circ$（$\pi/4$）**——正交十字架之间的对称四分角！在源码模块 `CHSHWitness` 中，Alice 将两把快门定在正交的 $Z$ 轴与 $X$ 轴上，而 Bob 将自己的正交十字架在 $(Z, X)$ 平面内旋转 $45^\circ$，定在两条对角角平分线上：

$$
B_0 = \mathrm{bobObservable0} = \frac{Z + X}{\sqrt{2}}, \qquad B_1 = \mathrm{bobObservable1} = \frac{Z - X}{\sqrt{2}},
$$

由此固定双比特 CHSH 见证算子

$$
\mathrm{CHSHWitness.chshOperator} = Z \otimes_{\mathrm{K}} B_0 + Z \otimes_{\mathrm{K}} B_1 + X \otimes_{\mathrm{K}} B_0 - X \otimes_{\mathrm{K}} B_1.
$$

下面的推论在全体 $4\times 4$ 合法双比特密度矩阵（半正定且迹为 $1$ 的子类型）上，严格确立了该固定 CHSH 算子期望值集合具有最大元 $2\sqrt{2}$。

::: {.corollary #cor-fixed-chsh-tsirelson title="固定双比特 CHSH 算子在全体量子态上的最大期望值为 2√2" lean="D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest"}
记双比特量子态子类型为 $\mathcal{S}_2 = \{\rho : \mathrm{CHSHWitness.TwoQubitMatrix} \mid \rho.\mathrm{PosSemidef} \land \Tr(\rho) = 1\}$。则实期望值映射

$$
\rho \longmapsto \operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{CHSHWitness.chshOperator}\bigr)
$$

在 $\mathcal{S}_2$ 上的值域集合以 $2\sqrt{2}$ 为最大元（`IsGreatest`）：即一方面存在合法量子态 $\rho \in \mathcal{S}_2$ 使 $\operatorname{Re}\Tr(\rho \cdot \mathrm{CHSHWitness.chshOperator}) = 2\sqrt{2}$，另一方面对一切 $\rho \in \mathcal{S}_2$ 恒有

$$
\operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{CHSHWitness.chshOperator}\bigr) \le 2\sqrt{2}.
$$
:::

::: proof
在 Mathlib 中，`IsGreatest s a` 定义为 $a \in s \land \forall x \in s,\, x \le a$。源码分两步完成验证：

1. **可达到性（$2\sqrt{2} \in \operatorname{range}$）**：取 [@thm-local-correlation-sectors] 与 [@lemma-bell-mixed-marginal] 中的合法双比特密度态 $\rho = \mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert \in \mathcal{S}_2$。将 $\mathrm{chshOperator}$ 合并同类项化简为 $\sqrt{2}(Z \otimes_{\mathrm{K}} Z + X \otimes_{\mathrm{K}} X)$，因 $\lvert\Phi^+\rangle$ 同时满足 $(Z \otimes_{\mathrm{K}} Z)\lvert\Phi^+\rangle = \lvert\Phi^+\rangle$ 与 $(X \otimes_{\mathrm{K}} X)\lvert\Phi^+\rangle = \lvert\Phi^+\rangle$，直接计算矩阵迹即得 $\operatorname{Re}\Tr(\mathrm{bellDensity} \cdot \mathrm{chshOperator}) = \sqrt{2}(1 + 1) = 2\sqrt{2}$。
2. **全体量子态上的上界（$\le 2\sqrt{2}$）**：对任意 $\rho \in \mathcal{S}_2$，手算可利用半正定上界差矩阵分解 $2\sqrt{2}I_4 - \mathrm{chshOperator} = \sqrt{2}(I_4 - Z\otimes_{\mathrm{K}} Z) + \sqrt{2}(I_4 - X\otimes_{\mathrm{K}} X) \ge 0$（因为 $Z \otimes_{\mathrm{K}} Z$ 与 $X \otimes_{\mathrm{K}} X$ 均为厄米对合矩阵，故 $I_4 - Z\otimes_{\mathrm{K}} Z \ge 0$ 且 $I_4 - X\otimes_{\mathrm{K}} X \ge 0$；与此同时，由 [@prop-landau-area-square] 的 Landau 平方公式，由于 $[Z, X] = 2iY$ 且 $[B_0, B_1] = -2iY$，该算子的平方精确等于 $(\mathrm{chshOperator})^2 = 4(I_4 - Y \otimes_{\mathrm{K}} Y) \le 8 I_4$，本征谱为 $\{8, 8, 0, 0\}$——在 $\operatorname{span}\{\lvert\Phi^+\rangle, \lvert\Psi^-\rangle\}$ 上取本征值 $8$，而在 $\operatorname{span}\{\lvert\Phi^-\rangle, \lvert\Psi^+\rangle\}$ 上取本征值 $0$）。半正定态 $\rho$ 与半正定差算子乘积的实迹非负，故 $\operatorname{Re}\Tr(\rho \cdot \mathrm{chshOperator}) \le 2\sqrt{2}\operatorname{Re}\Tr(\rho) = 2\sqrt{2}$。完整证明由 Lean 内核检查。
:::

::: {.viz src="chsh-dial" preset="tsirelson" height="500"}
**Bob 转过 45°，四个余弦叠到 2√2。** $B_0$ 在 $A_0$ 与 $A_1$ 正中，$B_1$ 在 $-45^\circ$；三对方向夹 $45^\circ$，第四对 $A_1$、$B_1$ 夹 $135^\circ$。青色的四段各长 $0.707$，最后一段的余弦为负、前面又是减号，也往上叠，合计 $2\sqrt{2} \approx 2.828$，顶到品红的刻度与量尺顶上的线（[@cor-fixed-chsh-tsirelson]；任意有限维的上界见 [@thm-unitary-bell-bound]）。
:::

请注意 [@cor-fixed-chsh-tsirelson] 的精确量词边界：该冻结声明固定了具体的双比特算子 `CHSHWitness.chshOperator`（即固定 Alice 为 $Z, X$、Bob 为 $(Z\pm X)/\sqrt{2}$），并在全体 $4\times 4$ 半正定迹一密度矩阵 $\rho$ 上求极值，**并未包含对任意可变测量方向的量词，也未在任意维希尔伯特空间上作全称量化**（可变观测量、任意有限维下的上界见 [@thm-unitary-bell-bound] 取 $d = 2$；无穷维与对易算子框架下的一般 Tsirelson 定理归入章末 [@rem-bell-chsh-literature]）。

[@cor-fixed-chsh-tsirelson] 把量子一侧的山顶钉在了 $2\sqrt{2}$。要说这是“击败”，还得把经典一侧的天花板同样钉死。经典对手的规则是：Alice 与 Bob 事先共享一个隐变量 $\lambda$（Lean 中称为纤维地址 `Fiber`），四组测量设置使用同一个、不依赖设置的分布 $\mu$；此后各自只看自己的测量设置与 $\lambda$，给出答案 $\pm 1$，谁也看不到对方选了哪个设置。

::: {.definition #def-deterministic-fiber-model title="确定性局域纤维模型与经典 CHSH 值" lean="D5/S3/QuantumBounds/ClassicalFiberBound.boolValue D5/S3/QuantumBounds/ClassicalFiberBound.DeterministicFiberModel D5/S3/QuantumBounds/ClassicalFiberBound.observable D5/S3/QuantumBounds/ClassicalFiberBound.chshAt D5/S3/QuantumBounds/ClassicalFiberBound.classicalCHSH"}
在模块 `ClassicalFiberBound` 中：

1. [`boolValue`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.boolValue) $: \mathrm{Bool} \to \mathbb{R}$ 把 `false` 读作 $-1$，把 `true` 读作 $+1$；
2. **确定性纤维模型** [`DeterministicFiberModel`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.DeterministicFiberModel) $\mathrm{Fiber}$ 是由两张应答表 $\mathrm{alice},\ \mathrm{bob} : \operatorname{Fin} 2 \to \mathrm{Fiber} \to \mathrm{Bool}$ 构成的结构体：对两个测量设置中的每一个、对每个纤维地址，各给出一个布尔答案；
3. [`observable`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.observable) 把一张答案表 $\mathrm{answer} : \mathrm{Fiber} \to \mathrm{Bool}$ 变成实值函数 $\lambda \mapsto \operatorname{boolValue}(\mathrm{answer}(\lambda))$；
4. 单个纤维地址上的 CHSH 值 [`chshAt`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.chshAt) 定义为

   $$
   \operatorname{chshAt}(\mathrm{model}, \lambda) \;=\; A_0 B_0 + A_0 B_1 + A_1 B_0 - A_1 B_1,
   $$

   其中 $A_x = \operatorname{observable}(\mathrm{model.alice}\ x)(\lambda)$，$B_y = \operatorname{observable}(\mathrm{model.bob}\ y)(\lambda)$；
5. 对有限类型 $\mathrm{Fiber}$ 与权重 $\mu : \mathrm{Fiber} \to \mathbb{R}$，**经典 CHSH 值** [`classicalCHSH`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classicalCHSH) 定义为

   $$
   \operatorname{classicalCHSH}(\mu, \mathrm{model}) \;=\; \sum_{\lambda \in \mathrm{Fiber}} \mu(\lambda)\,\operatorname{chshAt}(\mathrm{model}, \lambda).
   $$
:::

::: {.theorem #thm-classical-chsh-bound-exact title="有限确定性局域纤维模型的 CHSH 绝对值上界恰为 2" lean="D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two"}
设 $\mathrm{Fiber}$ 为有限类型（`[Fintype Fiber]`），权重 $\mu : \mathrm{Fiber} \to \mathbb{R}$ 满足非负性（`hmu_nonneg`：对一切 $\lambda$ 有 $0 \le \mu(\lambda)$）与归一性（`hmu_sum`：$\sum_\lambda \mu(\lambda) = 1$）。则：

1. 对每个确定性纤维模型 $\mathrm{model}$（[@def-deterministic-fiber-model]），

   $$
   \bigl\lvert \operatorname{classicalCHSH}(\mu, \mathrm{model}) \bigr\rvert \;\le\; 2 ;
   $$

2. 集合 $\bigl\{\, \lvert\operatorname{classicalCHSH}(\mu, \mathrm{model})\rvert \;\big|\; \mathrm{model} : \operatorname{DeterministicFiberModel}\ \mathrm{Fiber} \,\bigr\}$ 以 $2$ 为最大元（`IsGreatest`）：$2$ 属于这个集合，并且集合中的每个元素都不超过 $2$。
:::

::: proof
先看单个纤维地址。四个取值 $\pm 1$ 的实数两两可交换且平方为 $1$，满足 Mathlib 的交换 CHSH 不等式 `CHSH_inequality_of_comm`，于是 $\operatorname{chshAt} \le 2$。把 Alice 的两个答案同时取反会使 $\operatorname{chshAt}$ 变号，对取反后的模型再用一次同一不等式，得 $-2 \le \operatorname{chshAt}$。然后用非负权重 $\mu(\lambda)$ 逐项相乘并求和，代入 $\sum_\lambda \mu(\lambda) = 1$，得 $-2 \le \operatorname{classicalCHSH} \le 2$，这是结论 1（`classical_chsh_abs_le_two`）。可达性取 Alice 与 Bob 在一切设置、一切纤维地址上都回答 `true` 的常值模型：每个地址上 $\operatorname{chshAt} = 1 + 1 + 1 - 1 = 2$，加权和等于 $2$（`classical_chsh_eq_two_exists`）。两者合起来即结论 2。完整证明由 Lean 内核检查。
:::

单个地址上的那一步可以直接用手数完。

::: {.example #ex-sixteen-deterministic-chsh-tables title="十六张确定性应答表的 CHSH 值：八张取 +2，八张取 −2"}
在一个固定的纤维地址上，Alice 的两个答案 $a_0, a_1$ 与 Bob 的两个答案 $b_0, b_1$ 各取 $\pm 1$，共 $2^4 = 16$ 种组合。把 CHSH 值改写为

$$
a_0 b_0 + a_0 b_1 + a_1 b_0 - a_1 b_1 \;=\; a_0\,(b_0 + b_1) + a_1\,(b_0 - b_1).
$$

Bob 的两个答案只有两种关系：

| Bob 的答案 | $b_0 + b_1$ | $b_0 - b_1$ | CHSH 值 | 组合数 |
| :---: | :---: | :---: | :---: | :---: |
| $b_0 = b_1$ | $\pm 2$ | $0$ | $2\,a_0 b_0 = \pm 2$ | $8$ |
| $b_0 = -b_1$ | $0$ | $\pm 2$ | $2\,a_1 b_0 = \pm 2$ | $8$ |

每一行里，决定符号的那个乘积取 $+1$ 与 $-1$ 的组合各占一半，所以十六种组合中恰有八种取 $+2$、八种取 $-2$，没有任何一种落在闭区间 $[-2, 2]$ 之外，也没有任何一种落在它的内部。任何概率混合都只是在 $-2$ 与 $+2$ 之间取加权平均，于是 $\lvert S\rvert \le 2$，与 [@thm-classical-chsh-bound-exact] 一致。
:::

::: {.viz src="chsh-dial" preset="hidden" height="500"}
**每个隐方向只给 ±2，平均出不了 2。** 同样两个十字架，对手换成 360 个等距隐方向、权重各 $1/360$ 的经典模型（[@ex-bell-chsh-45deg] 第三步的均匀隐方向玩具模型，取有限个方向），它是一个有限确定性纤维模型。环上每个刻度是一个隐方向：青色给 $+2$，品红给 $-2$。Bob 的十字架从 $0^\circ$ 转到 $180^\circ$：到 $90^\circ$ 为止 360 个刻度全是青色，琥珀色的横线钉在 $2$；再往后品红的刻度越来越多，横线跟着往下落，到 $180^\circ$ 是 $-2$，始终不出 $[-2, 2]$（[@thm-classical-chsh-bound-exact]）。图停在 $120^\circ$：$240$ 个青色、$120$ 个品红，横线在 $(240 \cdot 2 - 120 \cdot 2)/360 = 2/3 \approx 0.667$。点线是贝尔态上的 $\langle S\rangle$，在 $45^\circ$ 升到 $2.828$，在 $120^\circ$ 是 $0.732$。
:::

现在两端都钉住了：有限确定性局域模型的 CHSH 值出不了线段 $[-2, 2]$（[@thm-classical-chsh-bound-exact]），而固定 CHSH 算子在量子态上的期望值可以到达 $2\sqrt{2}$（[@cor-fixed-chsh-tsirelson]）。两者之比为 $\sqrt{2}$，这就是 $45^\circ$ 圆弧超出折线的倍数。需要留意各条定理的量词范围：经典一侧针对的是有限纤维集合上的确定性 $\pm 1$ 应答表；量子一侧的可达性针对的是一个固定的双比特算子，上界 $2\sqrt{2}$ 则对一切有限维幺正策略成立（[@thm-unitary-bell-bound] 取 $d = 2$）；一般形式见章末 [@rem-bell-chsh-literature]。

::: {.film src="chsh-45-degrees"}
**45°：余弦弧高出玩具经典折线（2 分 23 秒）。** 在 $Z$–$X$ 平面内，夹角 $\theta$ 从 $0^\circ$ 扫到 $180^\circ$，青色的余弦弧与玩具模型的折线 $1 - 2\theta/\pi$ 在 $0^\circ$、$90^\circ$、$180^\circ$ 重合，在 $45^\circ$ 弧高出 $0.207$；Bob 的一对方向转过 $45^\circ$，四段余弦一段段叠到 $2\sqrt{2}$，折线只叠到 $2$；再把 Bob 的一对从 $0^\circ$ 转到 $90^\circ$，值按 $2\sqrt{2}\cos(\varphi - 45^\circ)$ 起落。十六张确定性应答表每张都只给 $\pm 2$，加权平均出不了 $[-2, 2]$（[@thm-classical-chsh-bound-exact]）；$S^2$ 多出的那一项来自两侧的换位子（[@prop-landau-area-square]），两侧都张成直角、Bob 转过 $45^\circ$ 时，贝尔态上的值顶到 $2\sqrt{2}$，任何态都超不过（[@cor-fixed-chsh-tsirelson]）。
:::

为什么 CHSH 实验偏偏选定 $\theta = 45^\circ$ 作为对称工作角？在对称四方向设置（三段相邻夹角为 $\theta$、第四段跨越角为 $3\theta$）下，四项余弦组合为 $3\cos\theta - \cos(3\theta)$，其一阶导数 $-3\sin\theta + 3\sin(3\theta) = 0$ 恰在 $\theta = 45^\circ$（$\pi/4$）处取得全局最大值 $2\sqrt{2}$！（注意区分两个不同的优化问题：$\theta = 45^\circ$ 最大化的是四项对称 CHSH 组合 $3\cos\theta - \cos(3\theta)$；若单独考察单根弦上的差函数 $g(\theta) = \cos\theta - (1 - 2\theta/\pi)$，其逐点导数 $-\sin\theta + 2/\pi = 0$ 的极大值点在 $\theta = \arcsin(2/\pi) \approx 39.5402^\circ$ 处，单弦差约为 $0.2105$，而在对称 CHSH 工作角 $\theta = 45^\circ$ 处单弦差为 $\frac{\sqrt{2}-1}{2} \approx 0.2071$，四段累加得 $2\sqrt{2} - 2 \approx 0.8284$。）让我们通过下面的综合算例，把 $\rho_{\Phi^+}$ 与 $\rho_{\Psi^-}$ 的关联张量、四项 CHSH 期望值以及 $45^\circ$ 余弦与特定玩具模型的几何对比逐一算清。

::: {.figure src="ch13-symmetric"}
**对称四方向的组合只在 $45^\circ$ 顶到 $2\sqrt{2}$。** 横轴是相邻两方向的夹角 $\theta$，青色的曲线是贝尔态上的 $3\cos\theta - \cos(3\theta)$：从 $\theta = 0^\circ$ 的 $2$ 起步，在 $45^\circ$ 升到 $2\sqrt{2}$，约在 $68.5^\circ$ 落回 $2$，到 $90^\circ$ 降为 $0$。绿色虚线是有限确定性局域模型的上界 $2$（[@thm-classical-chsh-bound-exact]），曲线高出它的部分涂成品红；曲线上的数值按公式算出。
:::

::: {.example #ex-bell-chsh-45deg title="贝尔态关联张量、CHSH 45° 极值 2√2 与余弦圆弧手算全表"}
本例分三步给出双比特贝尔态与 $45^\circ$ CHSH 检验的完整手算核对表：

**第一步：$\rho_{\Phi^+}$ 与 $\rho_{\Psi^-}$ 的偏迹、关联矩阵 $T$ 及纯度验算。**
在标准基 $\{\lvert 00\rangle, \lvert 01\rangle, \lvert 10\rangle, \lvert 11\rangle\}$ 下，固定贝尔态 $\rho_{\Phi^+} = \mathrm{bellDensity}$ 的显式 $4\times 4$ 矩阵为

$$
\rho_{\Phi^+} = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix}.
$$

对其求两侧偏迹，均得球心最大混合态 $\Tr_B(\rho_{\Phi^+}) = \Tr_A(\rho_{\Phi^+}) = \frac{1}{2}I_2$，故局部布洛赫向量为 $\vv{r} = \vv{s} = (0, 0, 0)$。计算 $3\times 3$ 关联张量 $T_{ij} = \Tr\bigl(\rho(\sigma_i \otimes \sigma_j)\bigr)$（$i, j \in \{X, Y, Z\}$）：

- 对 $\rho_{\Phi^+}$：$T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$，平方和为 $\norm{T_{\Phi^+}}_{\mathrm{F}}^2 = \sum_{i,j} T_{ij}^2 = 1^2 + (-1)^2 + 1^2 = 3$；
- 对自旋单态 $\rho_{\Psi^-} = \lvert\Psi^-\rangle\langle\Psi^-\rvert$：由于 $\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle)$，三个对角关联全部为负，$T_{\Psi^-} = -I_3 = \operatorname{diag}(-1, -1, -1)$，平方和同样为 $\norm{T_{\Psi^-}}_{\mathrm{F}}^2 = (-1)^2 + (-1)^2 + (-1)^2 = 3$（切勿将 $\Phi^+$ 的 $+X, -Y, +Z$ 符号照搬到 $\Psi^-$ 上！）。

将两者代入任意双比特态 $\rho = \frac{1}{4}\bigl(I_4 + \sum_i r_i \sigma_i \otimes I_2 + \sum_j s_j I_2 \otimes \sigma_j + \sum_{i,j} T_{ij}\sigma_i \otimes \sigma_j\bigr)$ 的希尔伯特—施密特纯度公式（因 $16$ 个泡利张量基满足 $\Tr((P_\alpha)(P_\beta)) = 4\delta_{\alpha\beta}$）：

$$
\Tr(\rho^2) = \frac{1}{4}\bigl(1 + \norm{\vv{r}}^2 + \norm{\vv{s}}^2 + \norm{T}_{\mathrm{F}}^2\bigr) = \frac{1 + 0 + 0 + 3}{4} = 1,
$$

验证了在最大混合基线 $\frac{1}{4}I_4$ 贡献的 $\frac{1}{4}$ 之上，局部布洛赫项贡献为 $\frac{1}{4}(\norm{\vv{r}}^2 + \norm{\vv{s}}^2) = 0$，而整整 $100\%$ 的**非单位阵纯度盈余** $\Tr(\rho^2) - \frac{1}{4} = \frac{3}{4}$ 悉数由关联矩阵项 $\frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$（$\norm{T}_{\mathrm{F}}^2 = 3$）承载。（注：图中用“共享关联面”直观展示 $T_{ij}$ 的 $3\times 3$ 关联系数分布，这是一种几何可视化手段，而非一般混合态上的单调纠缠度量。）

**第二步：$45^\circ$ 测量配置下的四项关联与 $2\sqrt{2}$ 极值。**
在 $\rho_{\Phi^+}$ 上，Alice 取 $A_0 = Z$、$A_1 = X$，Bob 取 $B_0 = \frac{Z + X}{\sqrt{2}}$、$B_1 = \frac{Z - X}{\sqrt{2}}$。利用 $\langle Z \otimes Z\rangle_{\Phi^+} = +1$、$\langle X \otimes X\rangle_{\Phi^+} = +1$ 与交叉项 $\langle Z \otimes X\rangle_{\Phi^+} = \langle X \otimes Z\rangle_{\Phi^+} = 0$，逐项算出四个双体期望值 $E_{ij} = \Tr\bigl(\rho_{\Phi^+}(A_i \otimes B_j)\bigr)$：

$$
\begin{aligned}
E_{00} &= \frac{1}{\sqrt{2}}\bigl(\langle Z\otimes Z\rangle + \langle Z\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, &\qquad
E_{01} &= \frac{1}{\sqrt{2}}\bigl(\langle Z\otimes Z\rangle - \langle Z\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, \\
E_{10} &= \frac{1}{\sqrt{2}}\bigl(\langle X\otimes Z\rangle + \langle X\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, &\qquad
E_{11} &= \frac{1}{\sqrt{2}}\bigl(\langle X\otimes Z\rangle - \langle X\otimes X\rangle\bigr) = -\frac{1}{\sqrt{2}}.
\end{aligned}
$$

注意 $A_1 = X$ 与 $B_1 = \frac{Z - X}{\sqrt{2}}$ 之间在 $(Z, X)$ 平面上张开 $135^\circ$ 钝角（$\cos 135^\circ = -1/\sqrt{2}$），恰好配合 CHSH 公式第 4 项前面的负号实现负负得正：

$$
\langle S\rangle_{\Phi^+} = E_{00} + E_{01} + E_{10} - E_{11} = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} - \Bigl(-\frac{1}{\sqrt{2}}\Bigr) = \frac{4}{\sqrt{2}} = 2\sqrt{2} \approx 2.8284271247461903.
$$

与经典局域隐变量上界 $|S_{\mathrm{cl}}| \le 2$ 相比，量子几何在 $45^\circ$ 处净胜出 $2\sqrt{2} - 2 \approx 0.8284271247461903$。

**第三步：余弦圆弧 $C_{\mathrm{q}}(\theta) = \cos\theta$ 与均匀方向玩具折线 $C_{\mathrm{cl}}(\theta) = 1 - \frac{2\theta}{\pi}$ 的数值对比。**
在图 13 面板 III 中，我们采用同向正相关绘图规范 $C_{\mathrm{q}}(\theta) = \cos\theta$（$\theta \in [0, \pi]$）：对于 $\rho_{\Phi^+}$，当 Alice 与 Bob 的测量方向 $\vv{a}, \vv{b}$ 均取在 $(Z, X)$ 实平面内且夹角为 $\theta$ 时，双体关联直接等于 $\langle(\vv{a}\cdot\vv{\sigma})\otimes(\vv{b}\cdot\vv{\sigma})\rangle_{\Phi^+} = \cos\theta$；若改用自旋单态 $\rho_{\Psi^-}$，其原始关联为 $E_{\Psi^-}(\theta) = -\cos\theta$，需先将 Bob 的读出标签整体翻号（$b \mapsto -b$）后，方才化为同一条正余弦曲线 $C_{\mathrm{q}}(\theta) = \cos\theta$。

作为直观对照，考察一个特定的经典均匀隐方向玩具模型：每对粒子出发时携带均匀分布在单位圆（或球面）上的隐向量 $\vv{\lambda}$，Alice 按符号函数输出 $\operatorname{sgn}(\vv{a}\cdot\vv{\lambda}) \in \{\pm 1\}$，Bob 按相同规则输出 $\operatorname{sgn}(\vv{b}\cdot\vv{\lambda}) \in \{\pm 1\}$。当 $\vv{a}$ 与 $\vv{b}$ 夹角为 $\theta \in [0, \pi]$ 时，两个半圆判别区不重合的两块楔形角之和为 $2\theta$（占半周长 $\pi$ 的比例为 $\frac{\theta}{\pi}$），故该特定玩具模型给出分段线性折线

$$
C_{\mathrm{cl}}(\theta) = \Bigl(1 - \frac{\theta}{\pi}\Bigr)(+1) + \Bigl(\frac{\theta}{\pi}\Bigr)(-1) = 1 - \frac{2\theta}{\pi} \qquad (0 \le \theta \le \pi).
$$

（注意：这只是某一特定各向同性玩具模型的关联函数，绝非声称所有经典局域模型都只能给出这条折线！）将两者在四个标志角度下逐点对比：

| 测量夹角 $\theta$ | 量子余弦关联 $C_{\mathrm{q}}(\theta) = \cos\theta$ | 均匀隐方向玩具模型 $C_{\mathrm{cl}}(\theta) = 1 - 2\theta/\pi$ | 差值 $C_{\mathrm{q}}(\theta) - C_{\mathrm{cl}}(\theta)$ | 几何表现 |
| :---: | :---: | :---: | :---: | :--- |
| $0^\circ$ ($0$) | $+1$ | $+1$ | $0$ | 共线同轴，完全正相关重合 |
| $45^\circ$ ($\pi/4$) | $\frac{\sqrt{2}}{2} \approx 0.7071067811865476$ | $0.5$ | $+0.2071067811865476$ | **圆弧高高拱起于弦线之上（CHSH 工作点）** |
| $90^\circ$ ($\pi/2$) | $0$ | $0$ | $0$ | 正交赤道盲区，无相关重合 |
| $135^\circ$ ($3\pi/4$) | $-\frac{\sqrt{2}}{2} \approx -0.7071067811865476$ | $-0.5$ | $-0.2071067811865476$ | 圆弧向负向深拱（对应 $E_{11}$ 项） |
| $180^\circ$ ($\pi$) | $-1$ | $-1$ | $0$ | 反向对跖，完全反相关重合 |

在 $0^\circ, 90^\circ, 180^\circ$ 三个正交主轴节点上，量子余弦与经典折线严丝合缝地钉死在同一点 $(+1, 0, -1)$；唯有走到半途的 $45^\circ$ 与 $135^\circ$，勾股二次范数支撑起的圆弧 $\cos 45^\circ \approx 0.7071$ 越过了平直切割的线性折线 $0.5$，四处鼓包累加起来，正好把 $4 \times 0.5 = 2$ 顶上了 $4 \times 0.70710678\dots = 2\sqrt{2}$！
:::

::: {.viz src="chsh-dial" preset="arc" height="500"}
**四段鼓包累加成 2√2 − 2。** 横轴是两方向的夹角。三对方向落在 $45^\circ$，青色的余弦弧比暗色的折线高 $0.207$；第四对落在 $135^\circ$，弧比折线低 $0.207$，这一项带着减号，也算 $+0.207$。四段品红合计 $2\sqrt{2} - 2 \approx 0.828$：弧上的四个点叠成 $2.828$，折线上的叠成 $2$。在 $0^\circ$、$90^\circ$、$180^\circ$ 弧与折线重合；这条折线只属于这个玩具模型。
:::

::: {.remark #rem-bell-chsh-literature title="一般经典局域隐变量上界、一般 Tsirelson 定理与无超光速通信边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在将本章的形式化定理与量子基础物理文献对照时，应当严格区分以下三个层面的经典与量子结论：

1. **一般经典局域隐变量模型的 $|S_{\mathrm{LHV}}| \le 2$ 凸包定理**（J. F. Clauser, M. A. Horne, A. Shimony, and R. A. Holt, *Proposed experiment to test local hidden-variable theories*, Phys. Rev. Lett. **23**, 880–884, 1969, doi:10.1103/PhysRevLett.23.880）：[@ex-bell-chsh-45deg] 第三步中的折线 $C_{\mathrm{cl}}(\theta) = 1 - 2\theta/\pi$ 仅是一个特定的均匀隐方向玩具模型，其本身并不等同于贝尔定理。真正的贝尔—CHSH 定理对**任意**局域随机隐变量分布 $p(\lambda)$ 及任意局域响应函数 $\bar{A}_i(\lambda), \bar{B}_j(\lambda) \in [-1, 1]$ 成立，前提是四组设置使用同一个与设置无关的分布，且给定 $\lambda$ 后联合响应分解为两侧局域响应的乘积：因为区间 $[-1, 1]^4$ 上的双线性泛函在极点 $a_0, a_1, b_0, b_1 \in \{\pm 1\}$ 处达到极值，而对任意 $\pm 1$ 赋值，$b_0 + b_1$ 与 $b_0 - b_1$ 中必有一项为 $0$、另一项为 $\pm 2$，故确定性组合 $a_0(b_0 + b_1) + a_1(b_0 - b_1) \in \{-2, +2\}$；对任意隐变量概率测度求凸平均后，必然服从 $|S_{\mathrm{LHV}}| \le 2$。其中有限隐变量集合、确定性 $\pm 1$ 应答的情形已由 [@thm-classical-chsh-bound-exact] 验证；任意概率测度 $p(\lambda)$ 与取值于 $[-1, 1]$ 的随机应答函数的一般形式仍属文献结果：从前者到后者需要把随机应答写成确定性应答的凸组合，并把有限和换成积分，这两步未在本书形式化。
2. **任意希尔伯特空间与对易观测量框架下的一般 Tsirelson 界**（B. S. Cirel'son, *Quantum generalizations of Bell's inequality*, Lett. Math. Phys. **4**, 93–100, 1980, doi:10.1007/BF00417500）：有限维张量积情形已经形式化。[@thm-unitary-bell-bound] 对任意有限维 $n, m$、任意局域幺正矩阵（用于二值锐测量的厄米对合矩阵是其特例）与任意密度态给出贝尔值上界；取 $d = 2$ 并对 $A_0, A_1$ 同时取负，得 $\lvert\operatorname{Re}\Tr(\rho S)\rvert \le 2\sqrt{2}$（这两步是手工推导）；[@cor-fixed-chsh-tsirelson] 说明固定双比特算子 `CHSHWitness.chshOperator` 在贝尔态上达到 $2\sqrt{2}$。仍属文献结果的是 Cirel'son (1980) 定理的一般形式：希尔伯特空间 $\mathcal{H}$ 可以是无穷维的，Alice 与 Bob 的观测量作用在同一个 $\mathcal{H}$ 上，只要求 $A_i^* = A_i$、$B_j^* = B_j$、$A_i^2 = I$、$B_j^2 = I$ 与 $[A_i, B_j] = 0$，不要求张量积结构。一条简短的论证是：把算子范数估计 $\norm{[A_0, A_1]}_{\mathrm{op}} \le 2\norm{A_0}\norm{A_1} = 2$ 与 $\norm{[B_0, B_1]}_{\mathrm{op}} \le 2$ 代入 Landau 恒等式 $S^2 = 4I - [A_0, A_1][B_0, B_1]$，得 $\norm{S^2}_{\mathrm{op}} \le 8$，从而 $|\langle S\rangle| \le 2\sqrt{2}$。这一一般形式与这条论证都未在本书形式化（[@prop-landau-area-square] 只对有限维克罗内克积成立）。
3. **非定域关联绝不蕴涵可控超光速通信（无信令原则）**：贝尔不等式的违背以及实验上的无漏洞贝尔检验，揭示的是联合测量结果在事后放到一起比对时呈现的非经典关联面积。[@thm-local-correlation-sectors] 与 [@lemma-bell-mixed-marginal] 给出这里贝尔态的静态边缘态 $\mathrm{traceFirstFactor}(\mathrm{bellDensity}) = \frac{1}{2}I_2$。测量选择之后的不变性还要用到局域操作的文献结果（J. Watrous, *The Theory of Quantum Information*, 2018, 定理 2.26 与 §2.3.2）：Alice 只在本地施加保迹量子信道；若执行测量，就对全部结果求平均，不按结果筛选。该信道的对偶保持单位算符，因此 Bob 的任意局域读数、从而无条件边缘态保持不变，在这个贝尔例子中仍是 $\frac{1}{2}I_2$。按 Alice 的结果分组得到的条件子样本可以有不同的边缘态（条件导引），但 Bob 需要她传来的经典结果记录才能识别这些子样本。因此量子纠缠绝不能用于传递可控超光速信号。
:::

::: {.viz src="chsh-dial" height="560"}
完整实验室：拖动角度盘上的四支箭头，改两侧的张角，用时间轴转动 Bob 的一对方向；三个场景是角度盘、隐方向、弧与折线。量尺上的虚线 $\pm 2$ 与顶上的 $\pm 2\sqrt{2}$ 分别由 [@thm-classical-chsh-bound-exact] 与 [@thm-unitary-bell-bound]（取 $d = 2$ 为手工推导）担保；页面上的其余数字是数值演示。
:::

至此，我们从贝尔纯态看清了纠缠的第一重几何面貌：单比特的局部信息可以被完全掏空（$\vv{r} = \vv{s} = \vv{0}$），而把整整 $100\%$ 的非单位阵纯度盈余（$\Tr(\rho^2) - \frac{1}{4} = \frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$，连同单位阵基线的 $\frac{1}{4}$ 共计纯度 $1$）藏进高维关联扇区 $T_{ij}$ 的“球外之球”里。这立刻启发了一个关乎所有量子计算机生死存亡的工程点子：**如果在局域噪声模型中，环境噪声像小偷一样挨个袭击局部的“线”（单比特泡利错误），我们能不能故意把宝贵的逻辑量子态从脆弱的局部线上撤下来，藏进多比特纠缠织就的高维关联“面”与拓扑编织死结里？** 让我们进入[第十四章](ch14-cloning-codes-and-braids.md)。
