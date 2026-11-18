# 附录 H 有限视界观察者、预测深度、螺线管记忆与历史账本 {#sec-appendix-h}

在[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)（尤其是[第 36.3 节](ch36-s03-quotienting-generators.md)的生成元商化与复幂线程对数荷守恒 [@thm-solenoid-log-charge]、零荷单位模刻画 [@thm-solenoid-zero-charge]，以及[第 36.4 节](ch36-s04-padic-table-expansion.md)的黄金模态步射影缺陷倍率 [@thm-golden-projective-multiplier]）、[第 38.5 节](ch38-s05-escape-ledger-and-entropy.md)（观察者快表逃逸账本 [@thm-ch38-escape-pairs-and-structural-novelty]、逐坐标读出与置换更新交换子 [@thm-observer-read-update-commutator] 及有界整数幂迹模恢复唯一性 [@thm-bounded-power-trace-crt]）与[终章](coda.md)中，我们从几何、算术与信息论三条线索反复触及同一个核心张力：**一位只能透过粗糙窗口读取世界的观察者，究竟能凭有限步未来观测锁住多少内部结构，又有哪些深层纤维相位注定逃出可见投影之外，直到引入历史账本才使不可区分核严格收缩？**

本附录将这一追问收束为一个完全透明的纯代数问题：给定底层状态类型 $X$、确定性步进更新映射 $F : X \to X$ 以及粗糙读出映射 $q : X \to B$，完整未来读出轨迹的首坐标如何无条件还原当前读出？在有限状态空间上，有限步预测视界的等价核如何在精确定义的完备深度处稳定为完整未来轨迹核？任何同时承载读出与更新因子化的内部记忆映射 $r : X \to M$，其实际像如何唯一穿过极小预测完备商分解？当底层空间具体化为泛螺线管（`UniversalSolenoid`）时，具有相同可见圆周投影的三族提升如何由唯一的核纤维群元给出加法过渡余循环？最后，在加法群同态框架下，公开读出核与历史账本核的交集如何精确刻画隐藏状态的可恢复性与不可见位移子群的单调收缩？

遵循与[附录 E](appendix-e.md) 一致的三层认识论诚实契约（验证边界见[附录 C](appendix-c.md)）：以下五条核心定理全部对应所钉提交中经 Lean 4 内核检查的定理声明，在审计表中标为 `LEAN ✓`；各节配套的有限状态手算例与 H.6 节在同一泛螺线管上串联五条定理的综合算例均明确标定为**手工推导**，绝不将跨模块的实例化联系冒充为单条自动导出的总定理，亦不将代数核包含关系夸大为热力学时间箭头或有效重构算法。

---

## H.1 完整未来轨迹的首坐标与当前读出恢复 {#sec-appendix-h-1}

从最朴素的起点出发：观察者在时刻 $n = 0$ 站在底层状态 $x \in X$ 上，每经过一次离散更新 $F : X \to X$，系统推进到第 $n$ 步迭代态 $(F^{[n]})(x)$，而观察者只能看见粗糙读出 $q\bigl((F^{[n]})(x)\bigr) \in B$。在比较不同视界深度之前，首先必须确认“完整未来读出轨迹”没有遗漏“当下这一刻”的读数。

先算一个最简单的两态翻转手算例（手工推导）：取二元状态集 $X = \{0, 1\}$，令更新映射 $F : X \to X$ 为翻转 $F(0) = 1,\, F(1) = 0$，读出映射取恒等映射 $q = \mathrm{id}_X : \{0, 1\} \to \{0, 1\}$。从两个初态出发的无穷读出序列分别为

$$
x = 0 \;\longmapsto\; (0, 1, 0, 1, \dots), \qquad x = 1 \;\longmapsto\; (1, 0, 1, 0, \dots).
$$

提取无穷序列的第 $0$ 项（首坐标），立即还原出当前读数 $q(0) = 0$ 与 $q(1) = 1$。但若把读出换成常值映射 $q_0(0) = q_0(1) = 0$，两条完整轨迹便坍缩为同一条全零序列 $(0, 0, 0, \dots)$：此时取首坐标依然精确还原当前读出 $q_0(x) = 0$，却**绝不**还原底层状态 $x$ 本身。这提醒我们，“从完整未来轨迹恢复当前读出”是一条关于观测映射 $q$ 的精确函数分解恒等式，而非对底层状态 $X$ 的单射重构。

在冻结模块中，任意状态类型 $Y$、输出类型 $O$、更新映射 $\tau : Y \to Y$ 与读出 $q : Y \to O$ 的**完整未来读出轨迹** `completeItinerary` 定义为

$$
\operatorname{completeItinerary}(\tau, q)(y) \;:=\; \bigl(n \mapsto q\bigl((\tau^{[n]})(y)\bigr)\bigr) \quad (\mathbb{N} \to O),
$$

而无穷序列类型 $\mathbb{N} \to B$ 上的**轨迹首坐标算子** `itineraryHead` 定义为取第 $0$ 项求值：

$$
\operatorname{itineraryHead}(u) \;:=\; u(0) \qquad (u : \mathbb{N} \to B).
$$

定理 [`recover_current_readout`](lean:D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout) 将二者的复合关系确立为无需任何有限性或拓扑假设的普遍函数等式：

::: {.theorem #thm-apph-current-readout title="完整未来轨迹包含当前读出" lean="D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout"}
设 $X$ 与 $B$ 为任意类型，$F : X \to X$ 为更新映射，$q : X \to B$ 为读出映射。则函数复合恒等式成立：

$$
q \;=\; \operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q).
$$
:::

::: proof
由函数外延性（`funext`），对任意状态 $x \in X$ 计算右侧复合映射在 $x$ 处的值：按 `Function.comp`、`itineraryHead` 与 `completeItinerary` 的定义依次展开，有

$$
\bigl(\operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q)\bigr)(x) \;=\; \operatorname{completeItinerary}(F, q)(x)(0) \;=\; q\bigl((F^{[0]})(x)\bigr).
$$

由于自然数零次迭代算子 $F^{[0]}$ 按定义恒等于 $X$ 上的恒等映射 $\mathrm{id}_X$，上式化为 $q(x)$。完整证明由 Lean 内核检查。
:::

认识论边界说明：[@thm-apph-current-readout] 对任意类型 $X, B$ 均成立，不涉及观测噪声、随机过程或统计一致性；它严格表明当前读出 $q$ 通过完整未来轨迹的首坐标分解（因而完整轨迹等价核必细于当前读出核 $\operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q)) \le \operatorname{Setoid.ker}(q)$），但绝不允许反向宣称“仅凭当前读出 $q(x)$ 即可恢复完整未来轨迹或内部状态 $x$”。

---

## H.2 有限状态空间的预测视界与完备深度稳定化 {#sec-appendix-h-2}

既然单看时刻 $n = 0$ 的当前读出往往不足以区分未来命运迥异的状态，观察者自然要向未来多看几步。如果底层系统是有限状态空间，观察者是否真的需要观测无穷多步才能把所有“未来可区分”的状态彻底分开？

用一个三状态延迟链手算例即可看清机制（手工推导）：取三元状态集 $Y = \{0, 1, 2\}$，定义确定性步进更新 $\tau : Y \to Y$ 与二值粗糙读出 $q : Y \to \{0, 1\}$ 为

$$
\tau(0) = 1, \quad \tau(1) = 2, \quad \tau(2) = 2; \qquad q(0) = 0, \quad q(1) = 0, \quad q(2) = 1.
$$

写出三个状态的完整未来读出轨迹：

$$
\begin{aligned}
\operatorname{completeItinerary}(\tau, q)(0) &= (0, 0, 1, 1, 1, \dots), \\
\operatorname{completeItinerary}(\tau, q)(1) &= (0, 1, 1, 1, 1, \dots), \\
\operatorname{completeItinerary}(\tau, q)(2) &= (1, 1, 1, 1, 1, \dots).
\end{aligned}
$$

对比前几步视界的等价类划分：

1. **零步视界（$m = 0$，仅含时刻 $k = 0$ 共 $1$ 个读数）**：读出字分别为 $(0)$、$(0)$、$(1)$。此时状态 $2$ 已与 $\{0, 1\}$ 分离，但状态 $0$ 与状态 $1$ 的当前读数同为 $0$，零步视界核将它们粘在同一等价类 $\{0, 1\}$ 中；
2. **一步视界（$m = 1$，含时刻 $k \in \{0, 1\}$ 共 $m + 1 = 2$ 个读数）**：读出字变为 $(0, 0)$、$(0, 1)$、$(1, 1)$。原本混淆的状态 $0$ 与状态 $1$ 在 $k = 1$ 处立刻分岔（$\tau(0) = 1$ 读出 $0$，而 $\tau(1) = 2$ 读出 $1$），等价划分细化为三个单点类 $\{\{0\}, \{1\}, \{2\}\}$，与完整无穷轨迹核完全重合！此后无论把视界延伸到多大的 $m \ge 1$，等价核再无变化。

为将这一现象严格形式化，需精确对齐冻结源码中的四个定义：

- **有限视界未来读出字 `futureReadoutWord`**：对任意类型 $Y, O$、映射 $\tau : Y \to Y$、$q : Y \to O$ 与自然数视界参数 $m \in \mathbb{N}$，定义

  $$
  \operatorname{futureReadoutWord}(\tau, q, m)(y) \;:=\; \bigl(k \mapsto q\bigl((\tau^{[k.1]})(y)\bigr)\bigr) \quad \bigl(\operatorname{Fin}(m + 1) \to O\bigr).
  $$

  务必注意索引域是 $\operatorname{Fin}(m + 1)$（即整数 $0 \le k \le m$），因此视界参数 $m$ 实际包含 **$m + 1$ 个读数**（$m = 0$ 即单次当前读出）；
- **有限视界等价核 `finiteHorizonKernel`**：定义为有限视界读出字诱导的等价关系（`Setoid Y`）：

  $$
  \operatorname{finiteHorizonKernel}(\tau, q, m) \;:=\; \operatorname{Setoid.ker}\bigl(\operatorname{futureReadoutWord}(\tau, q, m)\bigr);
  $$

- **状态对区分时刻 `distinguishingTime`**：在经典选择公理下，对任意状态对 $(y, y') \in Y \times Y$，若存在自然数 $n \in \mathbb{N}$ 使 $\operatorname{completeItinerary}(\tau, q)(y)(n) \neq \operatorname{completeItinerary}(\tau, q)(y')(n)$（记此存在命题见证为 $h$），则定义为经典选择算子取出的某个区分步数 $\operatorname{Classical.choose}(h) \in \mathbb{N}$；否则（两条无穷轨迹处处相等时）定义为 $0$。注意源码使用的是 `Classical.choose` 而非最小元搜索 `Nat.find`；
- **完备深度 `completionDepth`**：当状态空间具备有限类型实例 `[Fintype Y]` 时，遍历全体有序状态对的有限全集 $\operatorname{Finset.univ} \subseteq Y \times Y$ 取自然数上确界（最大值）：

  $$
  \operatorname{completionDepth}(\tau, q) \;:=\; \sup_{(y, y') \in \operatorname{Finset.univ}} \operatorname{distinguishingTime}(\tau, q, y, y').
  $$

定理 [`finite_horizon_stabilizes_at_completionDepth`](lean:D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth) 证明，在有限状态空间上，有限视界核在 $m = \operatorname{completionDepth}(\tau, q)$ 处精确稳定为完整无穷轨迹核：

::: {.theorem #thm-apph-finite-horizon-stability title="有限状态的预测视界稳定" lean="D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth"}
设 $Y$（宇宙层级 $u$）与 $O$（宇宙层级 $v$）为任意类型，且 $Y$ 具备有限类型实例 `[Fintype Y]`。设 $\tau : Y \to Y$ 为更新映射，$q : Y \to O$ 为读出映射。则在 $Y$ 的等价关系（`Setoid Y`）意义下恒有：

$$
\operatorname{finiteHorizonKernel}\bigl(\tau, q, \operatorname{completionDepth}(\tau, q)\bigr) \;=\; \operatorname{Setoid.ker}\bigl(\operatorname{completeItinerary}(\tau, q)\bigr).
$$
:::

::: proof
按 `Setoid` 外延性，只需证明对任意 $y, y' \in Y$，两者在左右两侧等价核中同类的充要条件一致。若 $(y, y')$ 属于右侧完整轨迹核，则对一切 $n \in \mathbb{N}$ 均有 $q((\tau^{[n]})(y)) = q((\tau^{[n]})(y'))$；特别地对所有 $k \in \operatorname{Fin}(\operatorname{completionDepth}(\tau, q) + 1)$ 成立，故 $\operatorname{futureReadoutWord}$ 在 $y$ 与 $y'$ 处相等，$(y, y')$ 属于左侧有限视界核。反之，设 $y, y'$ 在视界 $D := \operatorname{completionDepth}(\tau, q)$ 内的未来读出字相等，假设其完整轨迹在某步不相等，即存在 $n \in \mathbb{N}$ 使 $\operatorname{completeItinerary}(\tau, q)(y)(n) \neq \operatorname{completeItinerary}(\tau, q)(y')(n)$。由 `distinguishingTime` 的条件分支定义与 `Classical.choose_spec`，所选步数 $t_* := \operatorname{distinguishingTime}(\tau, q, y, y')$ 必满足 $\operatorname{completeItinerary}(\tau, q)(y)(t_*) \neq \operatorname{completeItinerary}(\tau, q)(y')(t_*)$。又因 `[Fintype Y]` 保证有序对 $(y, y') \in \operatorname{Finset.univ}$，有限上确界性质 `Finset.le_sup` 给出 $t_* \le D$，从而 $t_* < D + 1$，可将 $t_*$ 封装为下标 $\langle t_*,\, t_* < D + 1\rangle \in \operatorname{Fin}(D + 1)$；这与 $y, y'$ 在 $\operatorname{Fin}(D + 1)$ 上读出字处处相等矛盾。故完整轨迹必处处相等。完整证明由 Lean 内核检查。
:::

有限性边界警示：`[Fintype Y]` 是不可删去的硬前提。若将状态空间换成可数无穷延迟链 $Y = \mathbb{N}$，令 $\tau(0) = 0$、$\tau(n + 1) = n$，读出取零点指示函数 $q(0) = 1$、$q(n + 1) = 0$（手工推导），则初态 $n$ 需经整整 $n$ 步才抵达读数 $1$；对任意固定的有限视界 $m \in \mathbb{N}$，状态 $m + 1$ 与 $m + 2$ 在前 $m + 1$ 个时刻（$0 \le k \le m$）的读数全为 $(0, 0, \dots, 0)$，永远无法在单一有限视界内一次性分清全体自然数状态。此外，`completionDepth` 由非构造性的 `Classical.choose` 上确界定义，定理亦不引入任何概率测度、条件熵收敛率或物理钟表时间上界。

---

## H.3 预测完备商的泛因子化与最小记忆商 {#sec-appendix-h-3}

回到一般（不必有限的）状态空间 $X$：当两个底层状态 $x, x' \in X$ 给出完全相同的无穷未来读出序列 $\operatorname{completeItinerary}(F, q)(x) = \operatorname{completeItinerary}(F, q)(x')$ 时，对于一切只关心未来读出预测的任务而言，区分 $x$ 与 $x'$ 纯属冗余。将这类“预测等价”的状态粘合在一起，便得到**预测完备商状态空间** `CompletedState` 及其典范商投影 `completionProjection`：

$$
\operatorname{CompletedState}(F, q) \;:=\; \operatorname{Quotient}\bigl(\operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q))\bigr),
$$

$$
\operatorname{completionProjection}(F, q) : X \to \operatorname{CompletedState}(F, q), \qquad x \longmapsto [x].
$$

现在追问：怎样的内部记忆表示 $r : X \to M$ 才算“预测充分”的记忆？答案由两条代数相容条件刻画：(1) **读出可因子化**（`readout_factors`），即当前读出 $q$ 只依赖记忆值 $r(x)$，存在 $\mathrm{factor} : M \to B$ 使 $q = \mathrm{factor} \circ r$；(2) **更新可因子化**（`update_factors`），即记忆自身可以闭环演化而不必回头查阅底层全态，存在诱导更新 $\mathrm{induced} : M \to M$ 使 $r \circ F = \mathrm{induced} \circ r$。

为了精准把握这两条前提以及结论中“定义在值域子集 $\operatorname{Set.range}(r)$ 上且允许冗余记忆”的微妙之处，我们构造一个四态空间上的三组对照记忆算例（手工推导）：取 $X' = \{0_L, 0_R, 1, 2\}$，令 $F'(0_L) = F'(0_R) = 1$、$F'(1) = 2$、$F'(2) = 2$，读出 $q'(0_L) = q'(0_R) = q'(1) = 0$、$q'(2) = 1$。易见 $0_L$ 与 $0_R$ 共享同一完整未来轨迹 $(0, 0, 1, 1, \dots)$，故 $\operatorname{CompletedState}(F', q')$ 恰有三个等价类 $[0_L] = [0_R]$、$[1]$、$[2]$：

1. **极小忠实记忆**：取 $M_1 = \{s_0, s_1, s_2\}$，令 $r_1(0_L) = r_1(0_R) = s_0$、$r_1(1) = s_1$、$r_1(2) = s_2$。读出与更新均因子化，且唯一商映射 $\theta_1 : \operatorname{Set.range}(r_1) \to \operatorname{CompletedState}(F', q')$ 是双射；
2. **带冗余区分与不可达标签的记忆**：取五元记忆集 $M_2 = \{a_0, b_0, c_1, d_2, u_{\mathrm{idle}}\}$，令 $r_2(0_L) = a_0$、$r_2(0_R) = b_0$、$r_2(1) = c_1$、$r_2(2) = d_2$，诱导更新把 $a_0, b_0 \mapsto c_1 \mapsto d_2 \mapsto d_2$ 且 $u_{\mathrm{idle}} \mapsto u_{\mathrm{idle}}$，读出因子将 $a_0, b_0, c_1 \mapsto 0$、$d_2, u_{\mathrm{idle}} \mapsto 1$。此时两条因子化前提依然严格成立！但请注意两点：(i) 标签 $u_{\mathrm{idle}} \notin \operatorname{Set.range}(r_2)$ 从未被底层状态命中，$r_2$ 对 $\theta_2$ 在 $u_{\mathrm{idle}}$ 处的取值毫无约束，因此唯一因子映射必须定义在实际像 $\operatorname{Set.range}(r_2) = \{a_0, b_0, c_1, d_2\}$ 上而非整个 $M_2$ 上；(ii) 在 $\operatorname{Set.range}(r_2)$ 上，$\theta_2(a_0) = \theta_2(b_0) = [0_L]$ **不是单射**——因为 $r_2$ 保留了预测无关的冗余区分 $a_0 \neq b_0$，而 $\theta_2$ 恰恰负责把这份冗余折叠到极小预测商上；
3. **过度粗粒化的失效记忆**：取二元集 $M_3 = \{m_{01}, m_2\}$，令 $r_3(0_L) = r_3(0_R) = r_3(1) = m_{01}$、$r_3(2) = m_2$。虽然当前读出仍可因子化（$m_{01} \mapsto 0,\, m_2 \mapsto 1$），但 $r_3(F'(0_L)) = r_3(1) = m_{01} \neq m_2 = r_3(2) = r_3(F'(1))$，两个同记忆态一步之后走向不同记忆态，违反 `update_factors`，因而不存在到预测完备商的分解映射。

记值域类型 $\operatorname{Set.range}(r) := \{m \in M \mid \exists x \in X,\; r(x) = m\}$，值域限制映射 $\operatorname{Set.rangeFactorization}(r) : X \to \operatorname{Set.range}(r)$ 为 $x \mapsto \langle r(x),\, \langle x, \mathrm{rfl}\rangle\rangle$。定理 [`predictive_memory_minimal_quotient`](lean:D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient) 给出了预测完备商作为一切合法预测记忆共同极小商目标的泛性质：

::: {.theorem #thm-apph-predictive-minimal-quotient title="预测完备商的最小记忆因子" lean="D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient"}
设 $X, B, M$ 为任意类型，$F : X \to X$ 为更新映射，$q : X \to B$ 为读出映射，$r : X \to M$ 为记忆映射。若同时满足：

1. **读出可因子化**（`readout_factors`）：存在映射 $\mathrm{factor} : M \to B$，使得 $q = \mathrm{factor} \circ r$；
2. **更新可因子化**（`update_factors`）：存在映射 $\mathrm{induced} : M \to M$，使得 $r \circ F = \mathrm{induced} \circ r$。

则存在**唯一**的映射 $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$，使得：

$$
\operatorname{completionProjection}(F, q) \;=\; \theta \circ \operatorname{Set.rangeFactorization}(r).
$$
:::

::: proof
取前提给出的见证映射 $\mathrm{factor} : M \to B$ 与 $\mathrm{induced} : M \to M$。先对步数 $n \in \mathbb{N}$ 归纳证明：对一切 $x \in X$ 均有 $r\bigl((F^{[n]})(x)\bigr) = (\mathrm{induced}^{[n]})(r(x))$（$n = 0$ 为恒等，归纳步直接代换 $r \circ F = \mathrm{induced} \circ r$）。两侧同左复合 $\mathrm{factor}$ 并代入 $q = \mathrm{factor} \circ r$，即得对一切 $n \in \mathbb{N}$：

$$
q\bigl((F^{[n]})(x)\bigr) \;=\; \mathrm{factor}\bigl((\mathrm{induced}^{[n]})(r(x))\bigr).
$$

由此可见，凡满足 $r(x) = r(x')$ 的两个状态必有 $\operatorname{completeItinerary}(F, q)(x) = \operatorname{completeItinerary}(F, q)(x')$，即等价核满足包含关系 $\operatorname{Setoid.ker}(r) \le \operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q))$。因 $\operatorname{Set.rangeFactorization}(r) : X \to \operatorname{Set.range}(r)$ 是满射且其核恰为 $\operatorname{Setoid.ker}(r)$，$\operatorname{completionProjection}(F, q)$ 在每条值域纤维上取常值，故下推得到满足复合等式的映射 $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$；若另有 $\theta'$ 满足同一复合等式，由 $\operatorname{Set.rangeFactorization}(r)$ 的满射性（每个子类型元素形如 $\operatorname{Set.rangeFactorization}(r)(x)$）立得 $\theta' = \theta$。完整证明由 Lean 内核检查。
:::

认识论边界说明：[@thm-apph-predictive-minimal-quotient] 不要求 $X, B, M$ 有限；存在唯一性是商空间的泛分解性质，不提供构造极小自动机的计算复杂度上界；尤其不能把“唯一映射 $\theta$”误读为“$\theta$ 必是单射”或“任意满足前提的 $r$ 本身已是极小记忆”——恰恰因为冗余记忆都是向同一个 $\operatorname{CompletedState}(F, q)$ 唯一坍缩，才体现出 $\operatorname{CompletedState}(F, q)$ 的极小性。

---

## H.4 泛螺线管上同可见投影提升的隐藏纤维余循环 {#sec-appendix-h-4}

前三条定理站在预测商的一侧，告诉我们相同未来读出的底层状态如何被折叠为同一个预测等价类；现在我们转到商投影的**纤维内部**，追问：那些在可见投影下完全重合的底层状态，彼此之间究竟隐藏着怎样的代数结构？

在[第 36.3 节](ch36-s03-quotienting-generators.md)中，我们看到非零复幂相容线程在零对数荷条件下（[@thm-solenoid-log-charge]、[@thm-solenoid-zero-charge]）所有层级的坐标均落在复平面单位圆周上。纯相位一侧对应的加法逆向极限群正是冻结动力学模块中的**泛螺线管** `UniversalSolenoid`：以正自然数类型 $\mathbb{N}_+$（`ℕ+`，每个元素 $m = \langle m.1,\, 0 < m.1\rangle$ 严格为正，从根源上避开分母为零）为层级索引，以周期为 $1$ 的实数加法圆周群 $\operatorname{AddCircle}(1) := \mathbb{R}/\mathbb{Z}$ 为坐标群，定义为相容线程构成的子类型：

$$
\operatorname{UniversalSolenoid} \;:=\; \bigl\{\theta : \mathbb{N}_+ \to \operatorname{AddCircle}(1) \;\colon\; \forall m, n \in \mathbb{N}_+,\; n.1 \cdot \theta_{\langle m.1 \cdot n.1,\; \dots\rangle} = \theta_m\bigr\},
$$

其中群加法与零元逐坐标继承自 $\mathbb{N}_+ \to \operatorname{AddCircle}(1)$，$n.1 \cdot (\cdot)$ 表示加法阿贝尔群中的自然数倍乘（`nsmul`）。其上两个基本映射定义为：

- **可见基圆投影同态 `UniversalSolenoid.projection`**：加法群同态 $\operatorname{UniversalSolenoid} \to_+ \operatorname{AddCircle}(1)$，取出第 $1$ 层坐标 $\theta \mapsto \theta_{\langle 1,\, 0 < 1\rangle}$；
- **实流嵌入 `UniversalSolenoid.realFlow`**：对任意实参数 $t \in \mathbb{R}$，定义线程 $\operatorname{realFlow}(t) \in \operatorname{UniversalSolenoid}$，其第 $m \in \mathbb{N}_+$ 层坐标为实数商 $(t / m.1 : \mathbb{R})$ 在 $\operatorname{AddCircle}(1)$ 中的同余类。因 $m.1 \ge 1 > 0$，实数除法 $t / m.1$ 处处非退化，且在 $\mathbb{R}$ 上恒有 $n \cdot \frac{t}{mn} = \frac{t}{m}$，故自动满足全层级相容关系。

动手算一个极具启发性的核元素例子（手工推导）：取 $k := \operatorname{realFlow}(1)$ 与 $l := \operatorname{realFlow}(2)$。逐层检查它们在 $\operatorname{AddCircle}(1) = \mathbb{R}/\mathbb{Z}$ 中的坐标：

$$
\begin{aligned}
k = \operatorname{realFlow}(1) &: \quad k_1 = \Bigl[\frac{1}{1}\Bigr] = 0, \quad k_2 = \Bigl[\frac{1}{2}\Bigr] = \frac{1}{2} \neq 0, \quad k_3 = \Bigl[\frac{1}{3}\Bigr], \quad k_6 = \Bigl[\frac{1}{6}\Bigr]; \\
l = \operatorname{realFlow}(2) &: \quad l_1 = \Bigl[\frac{2}{1}\Bigr] = 0, \quad l_2 = \Bigl[\frac{2}{2}\Bigr] = 0, \quad l_3 = \Bigl[\frac{2}{3}\Bigr] \neq 0.
\end{aligned}
$$

看！在可见的第 $1$ 层圆周投影下，$\operatorname{projection}(k) = k_1 = 0$，意味着实流绕基圆走满一整圈回到原点，仅看基圆的观察者认为系统纹丝未动；但在第 $2$ 层半倍覆盖坐标上，$k_2 = \frac{1}{2}$ 却实实在在地翻转了半圈！如果在任意参数集 $U$ 上给定三组提升 $s_\alpha(u) = 0$、$s_\beta(u) = k$、$s_\gamma(u) = k + l = \operatorname{realFlow}(3)$，三者的可见基圆投影恒等于 $0$，而两两之间的隐藏纤维差恰为 $k_{\alpha\beta} = k$、$k_{\beta\gamma} = l$、$k_{\alpha\gamma} = k + l$，闭合为 $k_{\alpha\gamma} = k_{\alpha\beta} + k_{\beta\gamma}$。

定理 [`three_lift_difference_cocycle`](lean:D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle) 对任意参数类型 $U$ 上的三组同投影提升严格证明了唯一隐藏差的存在性与加法余循环恒等式：

::: {.theorem #thm-apph-hidden-fiber-cocycle title="同可见投影提升的隐藏纤维余循环" lean="D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle"}
设 $U$ 为任意类型，$s_\alpha, s_\beta, s_\gamma : U \to \operatorname{UniversalSolenoid}$ 为三族泛螺线管映射，满足可见投影相等条件：

$$
\operatorname{UniversalSolenoid.projection} \circ s_\alpha \;=\; \operatorname{UniversalSolenoid.projection} \circ s_\beta,
$$

$$
\operatorname{UniversalSolenoid.projection} \circ s_\beta \;=\; \operatorname{UniversalSolenoid.projection} \circ s_\gamma.
$$

则存在三族隐藏差映射 $k_{\alpha\beta}, k_{\beta\gamma}, k_{\alpha\gamma} : U \to \operatorname{UniversalSolenoid}$，同时满足以下四款性质：

1. **$(\alpha, \beta)$ 唯一核纤维差**：对一切 $u \in U$，有 $\operatorname{UniversalSolenoid.projection}(k_{\alpha\beta}(u)) = 0$ 且 $s_\beta(u) = s_\alpha(u) + k_{\alpha\beta}(u)$；并且对任意满足这两条逐点性质的映射 $k : U \to \operatorname{UniversalSolenoid}$，必有 $k = k_{\alpha\beta}$；
2. **$(\beta, \gamma)$ 唯一核纤维差**：对一切 $u \in U$，有 $\operatorname{UniversalSolenoid.projection}(k_{\beta\gamma}(u)) = 0$ 且 $s_\gamma(u) = s_\beta(u) + k_{\beta\gamma}(u)$；并且对任意满足这两条逐点性质的映射 $k : U \to \operatorname{UniversalSolenoid}$，必有 $k = k_{\beta\gamma}$；
3. **$(\alpha, \gamma)$ 唯一核纤维差**：对一切 $u \in U$，有 $\operatorname{UniversalSolenoid.projection}(k_{\alpha\gamma}(u)) = 0$ 且 $s_\gamma(u) = s_\alpha(u) + k_{\alpha\gamma}(u)$；并且对任意满足这两条逐点性质的映射 $k : U \to \operatorname{UniversalSolenoid}$，必有 $k = k_{\alpha\gamma}$；
4. **逐点加法过渡余循环恒等式**：对一切 $u \in U$，恒有

   $$
   k_{\alpha\gamma}(u) \;=\; k_{\alpha\beta}(u) + k_{\beta\gamma}(u).
   $$
:::

::: proof
在加法交换群 $\operatorname{UniversalSolenoid}$ 上逐点定义三族差映射 $k_{\alpha\beta}(u) := s_\beta(u) - s_\alpha(u)$、$k_{\beta\gamma}(u) := s_\gamma(u) - s_\beta(u)$ 与 $k_{\alpha\gamma}(u) := s_\gamma(u) - s_\alpha(u)$（其中由 $h_{\alpha\beta}$ 与 $h_{\beta\gamma}$ 的传递性同样有 $\operatorname{projection} \circ s_\alpha = \operatorname{projection} \circ s_\gamma$）。由于 $\operatorname{UniversalSolenoid.projection}$ 是加法群同态，保持加减法与零元，由逐点投影相等 $\operatorname{projection}(s_\alpha(u)) = \operatorname{projection}(s_\beta(u))$ 立得 $\operatorname{projection}(k_{\alpha\beta}(u)) = \operatorname{projection}(s_\beta(u)) - \operatorname{projection}(s_\alpha(u)) = 0$；群加减消去给出 $s_\alpha(u) + (s_\beta(u) - s_\alpha(u)) = s_\beta(u)$，而若任一映射 $k$ 在每个 $u$ 处满足 $s_\beta(u) = s_\alpha(u) + k(u)$，两边同减 $s_\alpha(u)$ 并应用函数外延性 `funext` 即唯一定出 $k = k_{\alpha\beta}$。同法证得 $(\beta, \gamma)$ 与 $(\alpha, \gamma)$ 两款。最后在每个 $u \in U$ 处消去中间项 $-s_\beta(u) + s_\beta(u) = 0$，即得 $(s_\beta(u) - s_\alpha(u)) + (s_\gamma(u) - s_\beta(u)) = s_\gamma(u) - s_\alpha(u)$，证毕第 4 款。完整证明由 Lean 内核检查。
:::

认识论边界说明：定理中的参数类型 $U$ 完全任意，不附带开覆盖或连续截面假设；隐藏差 $k_{\alpha\beta}(u)$ 是 $\ker(\operatorname{UniversalSolenoid.projection})$ 中的相容线程群元（按 $\mathbb{N}_+$ 索引），不能混同于单个实数辐角差。更关键的是，[@thm-apph-hidden-fiber-cocycle] 恰恰说明仅凭同一圆周投影**无法**反推出隐藏螺线管线程，且绝不能宣称任意抽象系统的预测完备商 $\operatorname{CompletedState}(F, q)$ 都会自动同构于泛螺线管。

---

## H.5 伴随历史账本的公开恢复加法核判据 {#sec-appendix-h-5}

既然单靠公开可见读出无法穿过非平凡核纤维还原隐藏变量，如果观察者额外维护一本**历史账本（history ledger）**，何时才能从公开读出唯一恢复目标隐藏量？即使账本尚不足以实现完全恢复，添入账本对“潜伏在视线盲区里的隐藏位移集”又起到了怎样的精确代数作用？

先用二维整数格 $\mathbb{Z}^2$ 作一个一目了然的线性手算例（手工推导）：取控制群 $\mathrm{Control} = \mathbb{Z}^2$，公开群 $\mathrm{Public} = \mathbb{Z}$，隐藏目标群 $\mathrm{Hidden} = \mathbb{Z}$，账本群 $\mathrm{Ledger} = \mathbb{Z}$，定义加法同态

$$
H(x, y) = x, \qquad K(x, y) = y.
$$

此时公开核为 $\ker H = \{0\} \times \mathbb{Z}$，而隐藏目标核为 $\ker K = \mathbb{Z} \times \{0\}$。因为 $(0, 1) \in \ker H$ 却有 $K(0, 1) = 1 \neq 0$，核包含关系 $\ker H \le \ker K$ 不成立——公开不可见子群在 $K$ 下的像为 $(\ker H).\operatorname{map}(K) = \mathbb{Z} \neq \{0\}$，故绝不可能仅由公开读数 $x$ 恢复出 $y$。现在引入加法账本同态 $L : \mathbb{Z}^2 \to_+ \mathbb{Z}$：

- 若取完整互补账本 $L(x, y) = y$，则联合核收缩为 $\ker H \cap \ker L = \{(0, 0)\}$，其在 $K$ 下的像坍缩为平凡子群 $\{0\}$，遗漏彻底消除；
- 若取偶倍粗糙账本（例如在 $\mathrm{Ledger} = \mathbb{Z}/2\mathbb{Z}$ 上记录奇偶性 $L_{\mathrm{par}}(x, y) = y \bmod 2$），则联合不可见子群从 $\{0\} \times \mathbb{Z}$ 严格缩小为 $\{0\} \times 2\mathbb{Z}$，其在 $K$ 下的不可见隐藏位移像从 $\mathbb{Z}$ 缩小为 $2\mathbb{Z} \le \mathbb{Z}$——虽未彻底清零，但盲区子群严格受限于原盲区子群之内。

在冻结模块中，这一结构被提炼为四个一般（不必交换的）加法群 `AddGroup` 及其加法群同态（`→+`，即 `AddMonoidHom`）之间的核判据定理 [`public_recovery_criterion`](lean:D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion)。这里对同态 $H : \mathrm{Control} \to_+ \mathrm{Public}$，$H.\mathrm{range}$ 表示值域加法子群，$H.\mathrm{rangeRestrict} : \mathrm{Control} \to_+ H.\mathrm{range}$ 表示陪域限制到值域上的满同态，$H.\mathrm{ker}$ 表示核子群，$\operatorname{map}(K)$ 表示子群在同态 $K$ 下的像子群，$\sqcap$ 表示子群交集，$\bot$ 表示仅含零元 $\{0\}$ 的平凡子群：

::: {.theorem #thm-apph-ledger-recovery-kernel title="公开读出与历史账本的核恢复准则" lean="D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion"}
设 $\mathrm{Control}, \mathrm{Public}, \mathrm{Hidden}, \mathrm{Ledger}$ 为四个装备加法群结构 `[AddGroup ...]` 的类型，且

$$
H : \mathrm{Control} \to_+ \mathrm{Public}, \qquad K : \mathrm{Control} \to_+ \mathrm{Hidden}, \qquad L : \mathrm{Control} \to_+ \mathrm{Ledger}
$$

为加法群同态。则以下四项结论同时成立：

1. **值域同态恢复与核包含充要判据**：

   $$
   \bigl(\exists\,\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden},\; K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})\bigr) \;\Longleftrightarrow\; H.\mathrm{ker} \le K.\mathrm{ker};
   $$

2. **核包含与盲区隐藏像平凡化充要判据**：

   $$
   H.\mathrm{ker} \le K.\mathrm{ker} \;\Longleftrightarrow\; H.\mathrm{ker}.\operatorname{map}(K) = \bot;
   $$

3. **盲区隐藏像平凡化与值域同态恢复充要判据**：

   $$
   H.\mathrm{ker}.\operatorname{map}(K) = \bot \;\Longleftrightarrow\; \bigl(\exists\,\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden},\; K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})\bigr);
   $$

4. **添入历史账本后的隐藏盲区子群单调收缩律**：

   $$
   (H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \;\le\; H.\mathrm{ker}.\operatorname{map}(K).
   $$
:::

::: proof
先证第 1 款。若存在加法同态 $\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden}$ 使 $K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})$，任取 $c \in H.\mathrm{ker}$，则 $H(c) = 0$，故子类型元素 $H.\mathrm{rangeRestrict}(c) = 0$，由同态保零元性质得 $K(c) = \mathrm{recover}(0) = 0$，即 $c \in K.\mathrm{ker}$。反之，设 $H.\mathrm{ker} \le K.\mathrm{ker}$：若 $c_1, c_2 \in \mathrm{Control}$ 满足 $H(c_1) = H(c_2)$，则在（未必交换的）加法群中有 $H(-c_1 + c_2) = -H(c_1) + H(c_2) = 0$，即 $-c_1 + c_2 \in H.\mathrm{ker} \le K.\mathrm{ker}$，故 $-K(c_1) + K(c_2) = K(-c_1 + c_2) = 0$，推出 $K(c_1) = K(c_2)$。于是对每个 $y \in H.\mathrm{range}$ 选取原像 $c_y$ 令 $\mathrm{recover}(y) := K(c_y)$ 与原像选取无关；对任意 $y_1 = H(c_1),\, y_2 = H(c_2) \in H.\mathrm{range}$，因 $H(c_1 + c_2) = y_1 + y_2$，有 $\mathrm{recover}(y_1 + y_2) = K(c_1 + c_2) = K(c_1) + K(c_2) = \mathrm{recover}(y_1) + \mathrm{recover}(y_2)$，故 $\mathrm{recover}$ 是良定义的加法群同态且满足 $K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})$。次证第 2 款：子群像 $H.\mathrm{ker}.\operatorname{map}(K) = \bot$ 当且仅当对每个 $c \in H.\mathrm{ker}$ 均有 $K(c) = 0$，按核定义这恰好等价于 $\forall c \in H.\mathrm{ker},\; c \in K.\mathrm{ker}$，即 $H.\mathrm{ker} \le K.\mathrm{ker}$。第 3 款直接由第 2 款的对称方向与第 1 款传递合成。第 4 款由下确界包含关系 $H.\mathrm{ker} \sqcap L.\mathrm{ker} \le H.\mathrm{ker}$ 及子群像的单调性 `AddSubgroup.map_mono` 直接得出。完整证明由 Lean 内核检查。
:::

认识论边界说明：[@thm-apph-ledger-recovery-kernel] 纯粹工作在四个 `AddGroup` 与加法同态层面上（且恢复映射 $\mathrm{recover}$ 本身被限定在 $H.\mathrm{range}$ 上的加法同态类中），不包含范数界、香农/冯·诺依曼熵或时序演化算子。可将其与[第 38.5 节](ch38-s05-escape-ledger-and-entropy.md)的两条结果作结构对照：有限集合目录上的 [@thm-ch38-escape-pairs-and-structural-novelty] 刻画的是一般等价核交集对非对角逃逸对的削减，而整数矩阵上的 [@thm-bounded-power-trace-crt] 则展示了当模投影同态本身具有非平凡核 $M\mathbb{Z}$ 时，如何改借外部严格幅度界 $\lvert\operatorname{powerTrace}(A, j)\rvert < B$（$2B < M$）在单个模同余类内部选出唯一代表元。绝不可单凭第 4 款的子群单调不等式宣称“任意历史账本都能完全恢复隐藏状态”或“群核收缩自动导出热力学不可逆性”。

---

## H.6 同一螺线管系统的五步贯穿实例与认识论边界审计 {#sec-appendix-h-6}

H.1 至 H.5 的五条定理分别来自轨迹首项、有限状态视界细化、预测完备商泛性质、泛螺线管过渡余循环与加法群核判据五个模块。正如前文反复强调的，不同模块共享的是“在观测核上是否可区分”这一因子化骨架，并不能不给映射就把后一条定理说成前一条定理的自动推论。为了展示五条定理如何在**同一个具体数学对象**上严丝合缝地协同运作，同时把每一处边界照得纤毫毕现，我们在泛螺线管上完整推演如下五步贯穿算例：

::: {.example #ex-apph-unified-solenoid title="泛螺线管上的反演更新、四态预测记忆、隐藏余循环与二阶历史账本贯穿算例（手工推导）"}
**手工推导（对 [@thm-apph-current-readout]–[@thm-apph-ledger-recovery-kernel] 的显式联合实例化，不新增额外冻结声明）。** 固定底层状态空间为不可数紧阿贝尔群 $X := \operatorname{UniversalSolenoid}$，可见圆周投影记为 $\pi := \operatorname{UniversalSolenoid.projection} : X \to_+ \operatorname{AddCircle}(1)$（即 $\pi(x) = x_1$）。在 $X$ 上设定如下确定性更新与二值半圆读出：

- **反演更新 $F : X \to X$**：令 $F(x) := -x$。因群反演是对合映射，恒有 $F^{[2]}(x) = -(-x) = x$，即 $F^2 = \mathrm{id}_X$；
- **半圆二值读出 $q : X \to \{0, 1\}$**：将每个圆周相位 $\pi(x) \in \operatorname{AddCircle}(1) = \mathbb{R}/\mathbb{Z}$ 唯一表为半开区间代表元 $t(\pi(x)) \in [0, 1)$，定义

  $$
  q(x) \;:=\; \begin{cases} 1, & \text{若 } t(\pi(x)) \in [0, 1/2), \\ 0, & \text{若 } t(\pi(x)) \in [1/2, 1). \end{cases}
  $$

现在沿同一系统依次走通全部五个环节：

1. **首坐标还原当前读出（实例化 [@thm-apph-current-readout]）**：
   因 $F^2 = \mathrm{id}_X$，对任意螺线管状态 $x \in X$，其完整未来二值读出轨迹都是周期为 $2$（或常值周期 $1$）的交替序列：

   $$
   \operatorname{completeItinerary}(F, q)(x) \;=\; \bigl(q(x),\, q(-x),\, q(x),\, q(-x),\, \dots\bigr),
   $$

   作用 `itineraryHead` 取第 $0$ 项即无损给出 $q(x)$。
2. **四态商空间 $Y = \{0, 1\}^2$ 上的一步视界稳定化（实例化 [@thm-apph-finite-horizon-stability]）**：
   定义二比特记忆映射 $r : X \to Y := \{0, 1\}^2$ 为 $r(x) := \bigl(q(x),\, q(-x)\bigr)$，并在有限四态集合 $Y = \{0, 1\}^2$（`[Fintype Y]`，$\lvert Y\rvert = 4$）上配备坐标交换更新 $\tau(a, b) := (b, a)$ 与首坐标读出 $\bar{q}(a, b) := a$。先核验 $r$ 在 $\operatorname{UniversalSolenoid}$ 上的实际像确实铺满全部四个二元对：
   - 取 $x^{(1,1)} = \operatorname{realFlow}(0) = 0$：$t(\pi(0)) = 0 \in [0, 1/2)$ 且 $t(\pi(-0)) = 0 \in [0, 1/2)$，故 $r(x^{(1,1)}) = (1, 1)$；
   - 取 $x^{(0,0)} = \operatorname{realFlow}(1/2)$：$t(\pi(x^{(0,0)})) = 1/2 \in [1/2, 1)$ 且 $-1/2 \equiv 1/2 \pmod 1$，故 $r(x^{(0,0)}) = (0, 0)$；
   - 取 $x^{(1,0)} = \operatorname{realFlow}(1/4)$：$t = 1/4 \in [0, 1/2)$ 而 $t(\pi(-x^{(1,0)})) = 3/4 \in [1/2, 1)$，故 $r(x^{(1,0)}) = (1, 0)$；
   - 取 $x^{(0,1)} = \operatorname{realFlow}(3/4)$：$t = 3/4 \in [1/2, 1)$ 而 $t(\pi(-x^{(0,1)})) = 1/4 \in [0, 1/2)$，故 $r(x^{(0,1)}) = (0, 1)$。

   注意这里的维度边界：**满足有限性 `[Fintype Y]` 的是四状态记忆商 $Y = \{0, 1\}^2$，底层泛螺线管 $X$ 本身并未变成有限空间！** 在四态系统 $(Y, \tau, \bar{q})$ 上，零步视界 $m = 0$ 仅按首坐标分成两块 $\{(1,1),(1,0)\}$ 与 $\{(0,0),(0,1)\}$；一旦推进到一步视界 $m = 1$（读取 $k = 0, 1$ 两项），四个状态的读出前缀分别为 $(1,1), (1,0), (0,1), (0,0)$，已两两互异并彻底决定后续无穷周期序列，在 $\operatorname{completionDepth}(\tau, \bar{q})$ 处有限视界核精确等于完整轨迹核。
3. **穿过 $r$ 向极小预测完备商的唯一分解（实例化 [@thm-apph-predictive-minimal-quotient]）**：
   在底层空间 $X$ 上，$q(x) = \bar{q}(r(x))$ 满足 `readout_factors`，且 $r(F(x)) = (q(-x), q(x)) = \tau(r(x))$ 满足 `update_factors`（利用 $-(-x) = x$）。由 [@thm-apph-predictive-minimal-quotient]，存在唯一映射 $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ 使 $\operatorname{completionProjection}(F, q) = \theta \circ \operatorname{Set.rangeFactorization}(r)$。因上述第 2 步已验证 $\operatorname{Set.range}(r) = \{0, 1\}^2$ 且四组交替轨迹互不相同，此例中的 $\theta$ 恰将不可数泛螺线管在 $(F, q)$ 下的极小预测完备商精确识别为这 $4$ 个预测状态类。
4. **同一预测类内部的隐藏纤维过渡余循环（实例化 [@thm-apph-hidden-fiber-cocycle]）**：
   取两个非零投影核元素 $k := \operatorname{realFlow}(1)$ 与 $l := \operatorname{realFlow}(2)$，在参数空间 $U = X$ 上考察三族提升

   $$
   s_\alpha(x) = x, \qquad s_\beta(x) = x + k, \qquad s_\gamma(x) = x + k + l.
   $$

   由于 $\pi(k) = 0$ 且 $\pi(l) = 0$，三族提升不仅具有完全相同的正演可见相位 $\pi(s_\alpha(x)) = \pi(s_\beta(x)) = \pi(s_\gamma(x)) = \pi(x)$，连反演后的可见相位 $\pi(-s_\bullet(x)) = -\pi(x)$ 也逐点全同！因此在上述半圆更新系统 $(F, q)$ 下，$x$、$x + k$ 与 $x + k + l$ 拥有**一模一样的完整无穷二值读出轨迹**，在预测完备商 $\operatorname{CompletedState}(F, q)$ 中坍缩为同一个点。然而在底层螺线管纤维内部，[@thm-apph-hidden-fiber-cocycle] 锁定的三段唯一隐藏差分别为常值群元 $k_{\alpha\beta}(x) = k$、$k_{\beta\gamma}(x) = l$、$k_{\alpha\gamma}(x) = k + l = \operatorname{realFlow}(3)$，严格满足加法余循环 $k_{\alpha\gamma}(x) = k_{\alpha\beta}(x) + k_{\beta\gamma}(x)$，并在高阶线程坐标上携带非零相位（如 $k_2 = 1/2$、$l_3 = 2/3$）。
5. **添入二阶历史账本使核严格缩小却仍未完全恢复（实例化 [@thm-apph-ledger-recovery-kernel]）**：
   最后令四个加法群分别为

   $$
   \mathrm{Control} = \mathrm{Hidden} := \operatorname{UniversalSolenoid}, \qquad \mathrm{Public} = \mathrm{Ledger} := \operatorname{AddCircle}(1),
   $$

   取公开同态 $H(x) := \pi(x) = x_1$、隐藏目标同态 $K(x) := x$（恒等同态 $\mathrm{id}_X$），并添入记录第 $2$ 层半圈线程相位的加法账本同态 $L(x) := x_{\langle 2,\, 0 < 2\rangle}$：
   - **未加账本前**：非零元 $k = \operatorname{realFlow}(1)$ 满足 $H(k) = k_1 = 0$ 而 $K(k) = k \neq 0$（因 $k_2 = 1/2 \neq 0$），故 $k \in H.\mathrm{ker} \setminus K.\mathrm{ker}$，无法由公开圆周相位恢复螺线管全态；
   - **添入二阶账本 $L(x) = x_2$ 后**：因 $L(k) = k_2 = 1/2 \neq 0$，元素 $k$ 被排除在联合核 $H.\mathrm{ker} \sqcap L.\mathrm{ker}$ 之外！盲区子群严格缩小：$(H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \subsetneq H.\mathrm{ker}.\operatorname{map}(K)$；
   - **为何仍未达成完全恢复**：考察二倍元 $2k = k + k = \operatorname{realFlow}(2) = l$！计算它的前三层坐标：

     $$
     (2k)_1 = \Bigl[\frac{2}{1}\Bigr] = 0 \;\Longrightarrow\; 2k \in H.\mathrm{ker}, \qquad (2k)_2 = \Bigl[\frac{2}{2}\Bigr] = 0 \;\Longrightarrow\; 2k \in L.\mathrm{ker},
     $$

     然而在第 $3$ 层坐标上，

     $$
     (2k)_3 = \Bigl[\frac{2}{3}\Bigr] = \frac{2}{3} \neq 0 \in \operatorname{AddCircle}(1) \;\Longrightarrow\; K(2k) = 2k \neq 0!
     $$

     因此 $0 \neq 2k \in (H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K)$，联合盲区仍非平凡子群 $\bot$！更一般地，对任意单个固定层级 $m \in \mathbb{N}_+$ 的坐标账本 $L_m(x) = x_m$，元素 $\operatorname{realFlow}(m)$ 在第 $1$ 层与第 $m$ 层均归零（$[m/1] = [m/m] = 0$），却在第 $m + 1$ 层留下非零残差 $\bigl[\frac{m}{m+1}\bigr] \neq 0$。这在纯群论层面生动印证了全书的一贯洞见：**有限阶账本能实打实地压缩不可区分核，而单层坐标账本却总在更高阶互素或倍分纤维里留下一道有待下一轮扩表去照亮的余项。**
:::

我们将本附录五条内核验证定理的精确签名假设、有效结论边界与严禁越界外推红线汇总于下框审计总表：

::: {.remark #rem-apph-epistemic-audit title="附录 H 五条形式化定理的适用域与认识论边界审计总表"}
**形式化范围与反夸大审计台账。**

| 定理环境与内核声明 | 核心类型与代数前提 | 严格证出的数学结论 | 严禁越界外推的认识论红线 |
| :--- | :--- | :--- | :--- |
| [@thm-apph-current-readout]（[`recover_current_readout`](lean:D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout)，`LEAN ✓`） | 任意类型 $X, B$，任意映射 $F : X \to X$、$q : X \to B$（无有限性假设） | 函数恒等式 $q = \operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q)$ | 严禁反向宣称单凭当前读出 $q(x)$ 可恢复完整未来轨迹或底层状态 $x$；不涉及统计估计或观测噪声 |
| [@thm-apph-finite-horizon-stability]（[`finite_horizon_stabilizes_at_completionDepth`](lean:D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth)，`LEAN ✓`） | 任意类型 $Y, O$ 且必须具备 `[Fintype Y]`；参数 $m$ 覆盖 $0 \le k \le m$ 共 $m + 1$ 个读数 | 在 $m = \operatorname{completionDepth}(\tau, q)$ 处，有限视界等价核精确等于完整无穷轨迹核 | 严禁省去 `[Fintype Y]` 推广至一般无限状态系统，或将基于 `Classical.choose` 上确界的 `completionDepth` 当作物理时钟上界 |
| [@thm-apph-predictive-minimal-quotient]（[`predictive_memory_minimal_quotient`](lean:D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient)，`LEAN ✓`） | 任意类型 $X, B, M$；记忆 $r : X \to M$ 同时满足读出因子化与更新因子化 | 存在唯一映射 $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ 分解典范预测商投影 | $\theta$ 仅在值域 $\operatorname{Set.range}(r)$ 上唯一，未必定义于全空间 $M$；严禁断言 $\theta$ 必为单射或 $r$ 已无冗余，亦不给出状态压缩算法复杂度 |
| [@thm-apph-hidden-fiber-cocycle]（[`three_lift_difference_cocycle`](lean:D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle)，`LEAN ✓`） | 任意参数类型 $U$；三族映射 $s_\alpha, s_\beta, s_\gamma : U \to \operatorname{UniversalSolenoid}$ 具有相同基圆投影 | 存在唯一核纤维差 $k_{\alpha\beta}, k_{\beta\gamma}, k_{\alpha\gamma}$ 落入 $\ker(\operatorname{projection})$ 且满足 $k_{\alpha\gamma}(u) = k_{\alpha\beta}(u) + k_{\beta\gamma}(u)$ | 无连续截面假设；隐藏差是 $\mathbb{N}_+$ 索引相容线程而非单个实角度；严禁由同圆周投影反推隐藏线程或将任意预测商等同于螺线管 |
| [@thm-apph-ledger-recovery-kernel]（[`public_recovery_criterion`](lean:D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion)，`LEAN ✓`） | 四个 `AddGroup` 及三个加法群同态 $H, K, L$（不假定交换性、范数或测度） | 值域同态恢复 $\Longleftrightarrow H.\mathrm{ker} \le K.\mathrm{ker} \Longleftrightarrow H.\mathrm{ker}.\operatorname{map}(K) = \bot$，且 $(H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \le H.\mathrm{ker}.\operatorname{map}(K)$ | 严禁宣称任意历史账本必能实现完全恢复（如 [@ex-apph-unified-solenoid] 中 $2k \neq 0$ 仍逃逸），或宣称纯群同态核包含已导出热力学不可逆定律 |
:::

纵览从首坐标提取（[@thm-apph-current-readout]）、有限状态视界稳定化（[@thm-apph-finite-horizon-stability]）、极小预测商泛分解（[@thm-apph-predictive-minimal-quotient]）到螺线管隐藏纤维余循环（[@thm-apph-hidden-fiber-cocycle]）与历史账本核判据（[@thm-apph-ledger-recovery-kernel]）的五级代数阶梯，“有限观察者认识世界”的精确数学骨架已清晰呈现：在可见预测一侧，商化把一切同未来轨迹的状态无损压缩到极小记忆核上；在隐藏纤维一侧，每一本新增的历史账本都通过子群核交集把盲区向内挤压，而未被账本覆盖的高阶纤维相位则以余循环差的形式诚实地标记着已知与未知的边界。
