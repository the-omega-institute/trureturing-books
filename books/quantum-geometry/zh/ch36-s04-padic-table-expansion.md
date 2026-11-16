# 36.4 p 进零进位查表树、素数观察者扩表与阻断轮回 {#sec-ch36-padic-prime-table-expansion}

前两节在**双曲角度几何**这一侧给出了阻断“化光死循环”的连续解析答案：用逆古德曼快度阶梯 $\eta_k = \eta_0 + k\,\Delta\eta$ 把 $\theta = 90^\circ$ 纯光断崖推向 $\eta = +\infty$，让有限多面体的未闭合缝隙 $\delta_k = \frac{\pi}{2} - \theta_k > 0$ 永远敞开。然而，如果回到[第 35 章](ch35-light-pulse-and-self-referential-table.md)“生命成长本质上是扩表过程”的计算视角，一个更尖锐的算术追问立刻浮出水面：**在纯离散的算术与信息寻址中，这张不断生长的查找表 $T$ 究竟长什么样？为什么我们在日常实数计算里习以为常的“进位加法”，一不小心就会把局部记忆冲垮，而宇宙究竟靠什么算术结构守住零串扰的离散扩表阶梯？**

一语道破天机的原始命题，将数论中最深邃的**$p$ 进数（$p$-adic numbers）**直接还原为观察者的查表几何（`MODEL`）：

> “P进数实际上是查表算法, 每个观察者对应一个素数, 这个素数一直在扩大, 就是在扩表”

为什么在有理数域 $\mathbb{Q}$ 上一旦谈起“丈量距离与构建查表”，宇宙只允许两种截然相反的几何选择——要么落入唯一的连续实数阿基米德标尺 $\lvert\cdot\rvert_\infty$，要么化作一素数一席的离散 $p$ 进超度量前缀树？我们先将奥斯特洛夫斯基（Ostrowski）绝对值分类定理、模 $p^k$ 同余纤维—闭球对应以及最小区分精度盲区定理锚定于 Lean 4 内核：

::: {.theorem #thm-ch36-ostrowski-padic-ball-and-blind-spot title="有理绝对值二分分类、p 进同余球纤维与最小区分精度定理" lean="D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation"}
设 $\mathbb{Q}$ 为有理数域，$\mathbb{Q}_p$（`ℚ_[p]`）为素数 $p$ 对应的 $p$ 进数完备域。则以下四项性质成立：

1. **有理数非平凡绝对值的奥斯特洛夫斯基分类**（[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)）：设 $f : \operatorname{AbsoluteValue}\;\mathbb{Q}\;\mathbb{R}$ 为 $\mathbb{Q}$ 上的非平凡实值绝对值（`hf : f.IsNontrivial`）。则 $f$ 必满足二者之一：要么等价于标准实绝对值（`f ≈ Rat.AbsoluteValue.real`），要么存在**唯一**的自然数 $p \in \mathbb{N}$ 及其素性见证 `Fact p.Prime`，使得 $f$ 等价于 $p$ 进绝对值（`f ≈ Rat.AbsoluteValue.padic p`）；
2. **模 $p^k$ 整数同余纤维与 $\mathbb{Q}_p$ 闭球的精确相等**（[`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range)）：对任意素数 $p \in \mathbb{N}$（`[Fact p.Prime]`）、精度层级 $k \in \mathbb{N}$ 与整数 $x \in \mathbb{Z}$，记整数同余纤维为 $\operatorname{congruenceFiber}(p, k, x) := \{z \in \mathbb{Q}_p \mid \exists y \in \mathbb{Z},\; z = (y : \mathbb{Q}_p) \land x \equiv y \pmod{p^k}\}$。则该同余纤维精确等于 $\mathbb{Q}_p$ 中以 $(x : \mathbb{Q}_p)$ 为中心、$(p : \mathbb{R})^{-k}$ 为半径的闭球与整数嵌入像的交集（当 $k = 0$ 时 $p^0 = 1$，闭球半径为 $1$）：

   $$
   \operatorname{congruenceFiber}(p, k, x) \;=\; \operatorname{Metric.closedBall}\bigl((x : \mathbb{Q}_p),\, (p : \mathbb{R})^{-k}\bigr) \;\cap\; \operatorname{Set.range}\bigl((\uparrow) : \mathbb{Z} \to \mathbb{Q}_p\bigr);
   $$

3. **模余读出盲区与最小区分精度层级**（[`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)）：定义第 $k$ 层欧氏余数读出为 $\operatorname{precisionReading}(p, k, x) := x \bmod (p : \mathbb{Z})^k$（即 Lean 整数环上的 `x % (p : Int) ^ k`）。对任意素数 $p \in \mathbb{N}$（`hp : p.Prime`）与相异整数 $x \neq y \in \mathbb{Z}$，能将 $x$ 与 $y$ 区分开的精度层级集合 $\{k \in \mathbb{N} \mid \operatorname{precisionReading}(p, k, x) \neq \operatorname{precisionReading}(p, k, y)\}$ 具有最小元（`IsLeast`），且该最小区分层级精确等于 $\operatorname{padicValInt}\,p\,(x - y) + 1$；
4. **观测区分层级诱导距离与 $p$ 进估值的恒等**（[`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)）：对素数 $p$（`hp : p.Prime`）定义整数观测距离 $\operatorname{observationDistance}(p, hp, x, y)$：当 $x = y$ 时取 $0$，当 $x \neq y$ 时取 $(p : \mathbb{R})^{1 - k_{\min}}$（其中 $k_{\min}$ 为 `Nat.find` 给出的最小区分精度）。则对一切相异整数 $x \neq y$，恒有：

   $$
   \operatorname{observationDistance}(p, hp, x, y) \;=\; (p : \mathbb{R})^{-\bigl(\operatorname{padicValInt}\,p\,(x - y) : \mathbb{Z}\bigr)}.
   $$
:::

::: proof
第 1 款直接调用 Mathlib 的有理数绝对值分类核心定理 `Rat.AbsoluteValue.equiv_real_or_padic` 拆分为实绝对值分支与存在素数 $p$ 的 $p$ 进分支；对后一分支的唯一性，若素数 $p, q$ 同时满足 `f ≈ padic p` 与 `f ≈ padic q`，由绝对值等价关系的对称性与传递性得 `padic p ≈ padic q`，在 $(p : \mathbb{Q})$ 处比较两侧估值（$\lvert p\rvert_p < 1$ 而当 $q \neq p$ 时 $\lvert p\rvert_q = 1$）即可推出 $p = q$；第 2 款将整数模同余 $x \equiv y \pmod{p^k}$ 改写为整除关系 $(p : \mathbb{Z})^k \mid (y - x)$，利用 `PadicInt` 范数与整除性等价桥接定理 `modeq_iff_padic_dist_le` 证得 $x \equiv y \pmod{p^k} \iff \operatorname{dist}((x : \mathbb{Q}_p), (y : \mathbb{Q}_p)) \le (p : \mathbb{R})^{-k}$，取集合外延性即得交集等式；第 3 款由欧氏余数相等充要条件将 $\operatorname{precisionReading}(p, k, x) = \operatorname{precisionReading}(p, k, y)$ 化为 $(p : \mathbb{Z})^k \mid (x - y)$，在 $p$ 为素数且 $x - y \neq 0$ 的前提下由 `padicValInt_dvd_iff` 证明该整除关系当且仅当 $k \le \operatorname{padicValInt}\,p\,(x - y)$，取逻辑否定即得不相等集合恰为 $\{k \in \mathbb{N} \mid \operatorname{padicValInt}\,p\,(x - y) + 1 \le k\}$，其最小元正是 $v_p(x - y) + 1$；第 4 款在 $x \neq y$ 分支展开 `dif_neg`，调用 `IsLeast.nat_find_eq` 将第 3 款锁定的最小元代入指数 $1 - (v_p(x - y) + 1) = -v_p(x - y)$ 化简即得。完整证明由 Lean 内核检查。
:::

[@thm-ch36-ostrowski-padic-ball-and-blind-spot] 把连续实数与 $p$ 进数之间的几何鸿沟照得纤毫毕现：在阿基米德实标尺 $\lvert\cdot\rvert_\infty$ 下，把 $1$ 不断相加就会越走越远（$\lvert 1 + 1 + \dots + 1\rvert_\infty = n \to \infty$），低位微扰一旦累积进位便会向高位全局蔓延——比如十比特二进制整数 $511 = 0111111111_2$ 加上一个最小单位 $+1$，进位波瞬间冲垮全部十个比特翻成 $512 = 1000000000_2$！相反，在素数 $p$ 对应的 $p$ 进标尺下，模 $p^k$ 余数表 $\mathbb{Z}/p^k\mathbb{Z}$ 的每一个桶都由 $\mathbb{Q}_p$ 中相应闭球的整数点组成；两个相异整数 $x, y$ 只要在前 $k$ 层余数读出相同（$k \le v_p(x - y)$），它们就共享同一条前缀树枝，直到第 $k^* = v_p(x - y) + 1$ 层才干脆利落地分道扬镳。

是什么几何法则禁止了不同余数桶之间的边界粘连与进位串扰？正是比普通三角不等式严格得多的**超度量强三角不等式（Ultrametric Strong Triangle Inequality）**——无论是在有限视界概念前缀细化树上，还是在多坐标折扣素数时间观测通道上，任意三点间的距离永远受控于较长那一步的最大值而非两步之和：

::: {.theorem #thm-ch36-ultrametric-prefix-and-prime-time title="有限视界前缀细化超度量与多坐标折扣素数时间超度量定理" lean="D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle"}
超度量强三角不等式在以下两类离散观测树结构上普遍成立：

1. **有限视界概念前缀细化超度量**（[`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)）：设 $X$ 为任意状态类型，$\mathrm{Coordinate} : \mathbb{N} \to \mathrm{Type}^*$ 为按层级索引的坐标类型族，$\mathrm{readout} : (\ell : \mathbb{N}) \to \operatorname{Concept}(X, \mathrm{Coordinate}(\ell))$ 为逐层概念读出序列，$\mathrm{horizon} \in \mathbb{N}$ 为有限观测视界。记 $\operatorname{commonDepth}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y) \le \mathrm{horizon}$ 为满足“对一切 $\ell < m$ 均有 $\mathrm{readout}(\ell, x) = \mathrm{readout}(\ell, y)$”的最大前缀层数 $m \in \{0, \dots, \mathrm{horizon}\}$，并在 $\mathbb{N}$ 上定义有限视界细化距离 $\operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y) := \mathrm{horizon} - \operatorname{commonDepth}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y)$。则无需任何点分离假设，对任意 $x, y, z \in X$：

   $$
   \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, z) \;\le\; \max\bigl(\operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y),\, \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, y, z)\bigr);
   $$

2. **多坐标折扣素数时间超度量**（[`discounted_prime_time_distance_strong_triangle`](lean:D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle)）：设 $I, X$ 为任意类型，$O : I \to \mathrm{Type}^*$ 为输出类型族，$J : \operatorname{Finset} I$ 为有限观测坐标集，$\mathrm{weight} : I \to \mathbb{R}$ 满足全指标严格正权 $\forall i,\; 0 < \mathrm{weight}(i)$，$\mathrm{readout} : \forall i,\; X \to O(i)$ 为坐标读出，$\mathrm{update} : X \to X$ 为离散演化算子，折扣因子满足 $\gamma \in (0, 1]$（`gamma ∈ Set.Ioc 0 1`）。令离散输出距离 $\operatorname{discreteOutputDistance}(a, b)$ 在 $a = b$ 时取 $0$、在 $a \neq b$ 时取 $1$，并定义折扣观测距离为：

   $$
   d_{J,\gamma}(x, y) \;:=\; \sup_{(i, n) \in \{i // i \in J\} \times \mathbb{N}} \bigl(\mathrm{weight}(i)\,\gamma^n\bigr)\,\operatorname{discreteOutputDistance}\!\bigl(\mathrm{readout}(i, \mathrm{update}^{[n]}(x)),\, \mathrm{readout}(i, \mathrm{update}^{[n]}(y))\bigr),
   $$

   其中在 Lean 实数条件完备格上，当 $J = \emptyset$ 时空指标集的上确界 `iSup` 按全化约定取值 $0$。则对一切 $x, y, z \in X$，恒有 $d_{J,\gamma}(x, z) \le \max\bigl(d_{J,\gamma}(x, y),\, d_{J,\gamma}(y, z)\bigr)$。
:::

::: proof
第 1 款先由前缀一致谓词 `agreesThrough` 的传递性证得公共前缀深度满足超度量共祖下界 $\min\bigl(\operatorname{commonDepth}(x, y),\, \operatorname{commonDepth}(y, z)\bigr) \le \operatorname{commonDepth}(x, z) \le \mathrm{horizon}$，在自然数上用有限视界 $\mathrm{horizon}$ 相减并反转不等号，立得 $\mathrm{horizon} - \operatorname{commonDepth}(x, z) \le \max\bigl(\mathrm{horizon} - \operatorname{commonDepth}(x, y),\, \mathrm{horizon} - \operatorname{commonDepth}(y, z)\bigr)$（作为 `lean=` 声明之外的直接代数推论，若另行定义归一化指数型细化距离 $d_{\exp}(x, y)$ 在 $\operatorname{commonDepth}(x, y) = \mathrm{horizon}$ 时取 $0$、否则取 $2^{-\operatorname{commonDepth}(x, y)}$，则由共祖下界与 $d \mapsto 2^{-d}$ 的单调反序性立得 $d_{\exp}(x, z) \le \max\bigl(d_{\exp}(x, y),\, d_{\exp}(y, z)\bigr)$）；第 2 款当 $J = \emptyset$ 时两侧 `iSup` 均为 $0$；当 $J$ 非空时，对每个固定指标对 $p = (i, n)$，离散输出距离在相等或相异情形下直接满足 $\operatorname{discreteOutputDistance}(a, c) \le \max(\operatorname{discreteOutputDistance}(a, b), \operatorname{discreteOutputDistance}(b, c))$，乘以非负缩放因子 $\mathrm{weight}(i)\,\gamma^n \ge 0$ 后逐项成立；再由有限集正权最大值 $M = \max_{i \in J} \mathrm{weight}(i)$ 与 $\gamma^n \le 1$ 证得各项有上界 `BddAbove`，对左端取 `ciSup_le` 并逐项放大到右端两上确界的最大值即得。完整证明由 Lean 内核检查。
:::

为什么作者一眼看穿“**$p$ 进数实际上是查表算法**”？让我们把多项式求根方程 $f(x) = x^2 - 2 = 0$（判别式 $\Delta = 8 = 2^3$）放到不同素数观察者面前亲手算一遍，对比**分歧奇异点**与**亨泽尔（Hensel）零进位逐层查表**的天壤之别（经典亨泽尔引理与 $p$ 进全息树文献背景汇总于下文 [@rem-ch36-padic-hensel-bruhat-tits-literature]）：

1. **胚胎二分起点 $p = 2$（判别式整除 $2 \mid \Delta$，分歧奇异阻断）**：在最小二元基表 $\mathbb{Z}/2\mathbb{Z}$ 中，$a_0 = 0$ 满足 $0^2 - 2 \equiv 0 \pmod 2$；但导数 $f'(0) = 2\cdot 0 \equiv 0 \pmod 2$ 退化为零！尝试向第二层 $\mathbb{Z}/4\mathbb{Z}$ 延伸时，两个子桶 $0^2 - 2 = -2 \not\equiv 0 \pmod 4$ 与 $2^2 - 2 = 2 \not\equiv 0 \pmod 4$ 双双落空，整条分歧树枝在 $k = 2$ 处直接卡死。同时，要在二元树上完全区分 $N = 1024 = 2^{10}$ 个整数状态 $\{0, \dots, 1023\}$，单层扇出只有 $2$，首层模 $2$ 桶内堆满 $512$ 个碰撞态（无序碰撞对高达 $E_1(1024, 2) = 2\binom{512}{2} = 261{,}632$ 对），必须串行跋涉整整 $K(2) = 10$ 层才能把所有状态分开：

::: {.viz src="padic-prime-table-tree" preset="cleavage" height="500"}
**胚胎二分卵裂与分歧奇异枝（$p = 2, K = 10$）**：单层扇出仅 $2$，区分 $N = 1024$ 态需串行穿透 $10$ 层前缀树，首层碰撞对达 $261{,}632$；同时因 $2 \mid \Delta(x^2-2)$，基根 $a_0 = 0$ 处导数模 $2$ 归零，品红/紫色分歧枝在 $k = 2$ 阻断。
:::

2. **基表一票否决（如 $p = 3, 5$）vs 亨泽尔 $O(1)$ 零进位查表（如 $p = 7$）**：当观察者换用 $p = 3$ 或 $p = 5$ 时，只需扫描一次基表 $\mathbb{F}_p$ 发现平方剩余里没有 $2$，在深度 $k = 1$ 处当场即可断定 $\mathbb{Z}_p$ 中绝无解，连第二层都不必翻开！而当观察者扩表到非分歧分裂素数 $p = 7$（$7 \nmid 8$）时，奇迹发生了：基表 $\mathbb{Z}/7\mathbb{Z}$ 中存在单根 $a_0 = 3$（$3^2 - 2 = 7 \equiv 0 \pmod 7$），且导数 $f'(3) = 6 \equiv -1 \not\equiv 0 \pmod 7$。观察者根本不需要在每一层重新解非线性方程，只需在 $7 \times 7$ 基表里查出**唯一固定不变的模逆元** $[f'(3)]^{-1} \equiv 6 \pmod 7$，随后每一层只做一次 $O(1)$ 查表更新 $x_{k+1} \equiv x_k - f(x_k)\cdot 6 \pmod{7^{k+1}}$，就能像拉拉链一样逐位吐出无穷精度的 $7$ 进根，**已经写定的低位数字永不涂改、永无向后进位**：

   $$
   \begin{aligned}
   k = 1 &:\quad x_1 = 3 \pmod{7}, \\
   k = 2 &:\quad x_2 \equiv 3 - (3^2 - 2)\cdot 6 = -39 \equiv 10 = 3 + 1\cdot 7 \pmod{7^2}, \\
   k = 3 &:\quad x_3 \equiv 10 - (10^2 - 2)\cdot 6 = -578 \equiv 108 = 3 + 1\cdot 7 + 2\cdot 7^2 \pmod{7^3}, \\
   k = 4 &:\quad x_4 \equiv 108 - (108^2 - 2)\cdot 6 \equiv 2166 = 3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 \pmod{7^4}, \\
   k = 5 &:\quad x_5 \equiv 4567 = 3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 + 1\cdot 7^4 \pmod{7^5}.
   \end{aligned}
   $$

::: {.viz src="padic-prime-table-tree" preset="hensel" height="500"}
**亨泽尔零进位查表提根（$p = 7, f(x) = x^2 - 2$）**：利用固定基表逆元 $[f'(3)]^{-1} \equiv 6 \pmod 7$，青色提根枝每层 $O(1)$ 追加一位 $7$ 进数字 $3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 + 1\cdot 7^4 \equiv 4567 \pmod{7^5}$，全程零向后进位；探针 $(10, 353)$ 因 $353 - 10 = 7^3$ 在最小区分层 $k^* = 4$ 精确分离。
:::

3. **“这个素数一直在扩大，就是在扩表”——水平扇出展宽压平串行树深**：现在看固定目标状态空间 $S_N = \{0, 1, \dots, N - 1\}$（取 $N = 1024 = 2^{10}$，即 $n = 10$ 比特信息量）。当观察者的素数基表从 $p$ 扩大时，用带余除法写出 $N = q p + r$（其中 $q = \lfloor N / p \rfloor$，$r = N \bmod p \in \{0, \dots, p - 1\}$）：首层 $\mathbb{Z}/p\mathbb{Z}$ 的 $p$ 个既开又闭模桶中，恰好有 $r$ 个桶装有 $\lceil N/p\rceil = q + 1$ 个状态、其余 $p - r$ 个桶装有 $\lfloor N/p\rfloor = q$ 个状态。因此，首层尚未被基表区分开的无序逃逸碰撞对精确等于：

   $$
   E_1(N, p) \;=\; r\binom{q + 1}{2} + (p - r)\binom{q}{2} \;=\; \frac{q\bigl(2N - p(q + 1)\bigr)}{2} \;\approx\; \frac{N(N - p)}{2p},
   $$

   而彻底分离全部 $N = 2^n$ 个状态所需的串行查表深度（即满足 $p^K \ge N$ 的最小正整数层数）按对数律急剧坍缩：

   $$
   K(p) \;=\; \left\lceil \frac{n}{\log_2 p} \right\rceil \;=\; \left\lceil \frac{10}{\log_2 p} \right\rceil.
   $$

   当观察者从 $p = 2$（$K = 10,\; E_1 = 261{,}632$）扩表至 $p = 7$（$K = 4,\; E_1 = 74{,}387$），再扩表至 $p = 31$ 时，$1024 = 33 \times 31 + 1$，单层水平扇出展宽为 $31$ 个并列桶（$1$ 桶装 $34$ 态、$30$ 桶装 $33$ 态），串行深度从 $10$ 层压平至 $K(31) = 3$ 层，首层碰撞对骤降至 $E_1(1024, 31) = 16{,}401$（削减逾 $93.7\%$；越过阈值素数 $p = 37$ 后 $37^2 = 1369 > 1024$，树深更进一步减至 $K = 2$，如 $K(97) = 2,\; E_1 = 4{,}905$）：

::: {.viz src="padic-prime-table-tree" preset="flatten" height="500"}
**素数扩表压平树深（$p = 31$）**：单层水平扇出展宽至 $31$ 个既开又闭模桶，串行查表深度从 $10$ 层压平至 $K(31) = 3$ 层，首层碰撞对降至 $16{,}401$——用查表空间宽度直接换取串行计算深度的坍缩。
:::

4. **越过状态空间上界 $p > N$：单层零逃逸无进位直读**：一旦观察者的素数进一步扩表越过状态总数——例如来到 $p = 1031 > N = 1024$——带余除法给出 $q = \lfloor 1024 / 1031 \rfloor = 0,\; r = 1024$！在首层基表 $\mathbb{Z}/1031\mathbb{Z}$ 的 $1031$ 个既开又闭槽位中，$1024$ 个目标状态一人一席（外加 $7$ 个空槽），首层逃逸碰撞对**严格归零**（$E_1(1024, 1031) = 0$），串行树深压到底限 $K(1031) = 1$——整棵前缀树化作一张零进位、零碰撞、$O(1)$ 一步直读的平铺查找表：

::: {.viz src="padic-prime-table-tree" preset="unramified" height="500"}
**越过状态上界的单层直读表（$p = 1031 > N = 1024$）**：$q = 0,\; r = 1024$ 使全部 $1024$ 个状态落入互不重叠的单元素既开又闭桶，首层逃逸碰撞对精确归零（$E_1 = 0$），串行查表深度坍缩至 $K = 1$。
:::

更妙的是，宇宙中并非只有一个孤立的素数观察者。当多个不同素数观察者 $p_1, p_2, \dots, p_r$ 同时在场时，它们的查表通道会不会相互打架？连续实标尺 $\lvert x\rvert_\infty$ 又能脱离这些离散素数观察者独自膨胀吗？中国剩余双射定理与有理阿代尔（Adelic）乘积公式给出了铁一般的全局封顶：

::: {.theorem #thm-ch36-crt-and-adelic-product-formula title="中国剩余互素环双射与有理阿代尔乘积守恒公式" lean="D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
多素数观察者的局部模表正交拼接与全局范数乘积满足以下两条精确守恒律：

1. **中国剩余互素模表双射定理**（[`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective)）：设 $m, n \in \mathbb{N}$ 为互素自然数（`Nat.Coprime m n`）。则由整除关系 $\operatorname{lcm}(m, n) \mid m \cdot n$ 诱导的典范环同态

   $$
   \operatorname{ZMod.castHom}\;\dots\;(\operatorname{ZMod} m \times \operatorname{ZMod} n) \;:\; \operatorname{ZMod}(m \cdot n) \;\longrightarrow^{+*}\; \operatorname{ZMod} m \times \operatorname{ZMod} n
   $$

   是严格双射（`Function.Bijective`；按 Lean 约定，当其中一个参数为 $0$ 且另一参数为 $1$ 时，$\operatorname{ZMod} 0 = \mathbb{Z}$ 亦保持成立）；
2. **有理数阿代尔乘积公式**（[`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)）：对任意非零有理数 $x \in \mathbb{Q}$（`hx : x ≠ 0`），其有理实绝对值 $\lvert x\rvert \in \mathbb{Q}$ 与遍及全体素数 $p : \operatorname{Nat.Primes}$ 的有理 $p$ 进范数有限支集乘积（`∏ᶠ`）恒等于 $1$：

   $$
   \lvert x\rvert \;\cdot\; \prod_{p : \operatorname{Nat.Primes}}^{\mathrm{fin}} \operatorname{padicNorm}(p.1, x) \;=\; 1.
   $$
:::

::: proof
第 1 款利用互素自然数上典范中国剩余环同构 `ZMod.chineseRemainder h` 的双射性（`(ZMod.chineseRemainder h).bijective`），核验其底映射与 `ZMod.castHom` 逐点一致即得；第 2 款先由 `rational_padic_norm_hasFiniteMulSupport` 证得非零有理数 $x$ 的非单位 $p$ 进范数仅在分子与分母的有限个素因子集合上取值非 $1$，对正自然数 $n > 0$ 利用算术基本定理 `Nat.factorization_prod_pow_eq_self` 将 $\prod_p \operatorname{padicNorm}(p, n) = \prod_p p^{-v_p(n)}$ 化为 $(n : \mathbb{Q})^{-1}$，再推广至非零整数并将有理数写成 `x.num / x.den`，分子分母的实绝对值 $\lvert\mathrm{num}\rvert / \mathrm{den}$ 与全体素数 $p$ 进范数乘积 $\mathrm{den} / \lvert\mathrm{num}\rvert$ 严格互为倒数相消得 $1$。完整证明由 Lean 内核检查。
:::

拿有理数 $x = \frac{12}{35} = 2^2 \cdot 3^1 \cdot 5^{-1} \cdot 7^{-1}$ 现场核对 [@thm-ch36-crt-and-adelic-product-formula]：阿基米德实标尺读出 $\lvert x\rvert_\infty = \frac{12}{35}$，四个非平凡素数观察者分别读出 $\lvert x\rvert_2 = \frac{1}{4}$、$\lvert x\rvert_3 = \frac{1}{3}$、$\lvert x\rvert_5 = 5$、$\lvert x\rvert_7 = 7$（其余一切素数 $p \notin \{2, 3, 5, 7\}$ 皆读出 $\lvert x\rvert_p = 1$）。把全部位点相乘：

$$
\lvert x\rvert_\infty \cdot \lvert x\rvert_2 \cdot \lvert x\rvert_3 \cdot \lvert x\rvert_5 \cdot \lvert x\rvert_7 \;=\; \frac{12}{35} \times \frac{1}{4} \times \frac{1}{3} \times 5 \times 7 \;=\; 1
\quad\Longleftrightarrow\quad
\ln\lvert x\rvert_\infty + \sum_{p} \ln\lvert x\rvert_p \;=\; 0.
$$

不同素数观察者凭 `chinese_remainder_bijective` 在 $\mathbb{Z}/420\mathbb{Z} \cong \mathbb{Z}/4\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \times \mathbb{Z}/5\mathbb{Z} \times \mathbb{Z}/7\mathbb{Z}$（及无平方因子基环 $\mathbb{Z}/210\mathbb{Z} \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \times \mathbb{Z}/5\mathbb{Z} \times \mathbb{Z}/7\mathbb{Z}$）上正交独立、互不进位（呼应[第 22 章](ch22-primes-euler-products-and-zeros.md)的欧拉乘积素数盒子与[第 31 章](ch31-quantum-fairness.md)的席位公平），而连续实标尺 $\lvert x\rvert_\infty$ 则被阿代尔乘积公式死死钉在全体离散素数观察者估值的倒数上——没有任何单一局部视角能吞并全局：

::: {.viz src="padic-prime-table-tree" preset="adelic" height="500"}
**多观察者中国剩余解耦与阿代尔乘积守恒（$x = 12/35$）**：品红阿基米德实对数项 $\ln\lvert x\rvert_\infty$ 与离散素数观察者对数项 $\ln\lvert x\rvert_2, \ln\lvert x\rvert_3, \ln\lvert x\rvert_5, \ln\lvert x\rvert_7$ 精确对冲归零，实范数与全体素数范数之积恒等于 $1$。
:::

现在，整章最惊心动魄的闭环到了：**既然素数 $p$ 一直在扩大就是在扩表，为什么观察者不能干脆一步跳到“无穷大素数”——即阿拉克洛夫几何中的无穷远阿基米德位 $p_\infty$——去一步成佛呢？**

这恰恰是本章第 1 节“直接冲向 $\theta = 90^\circ$ 纯光即是失忆轮回”在数论上的**同构镜像**（`MODEL`）：

- 一旦妄图越过有限素数，一步跳进无穷远阿基米德连续极限 $p_\infty$，支撑零进位查表的超度量强三角不等式当场失效！既开又闭的模桶隔墙瞬间融化为连续实直线，局部 $+1$ 微扰重新触发横扫全部数位的全局进位雪崩（如 $511 + 1 = 512$ 十位连翻），辛苦积累的局部无串扰表项在连续进位洪流中彻底冲毁，坠回 $p = 2, K = 10$ 的胚胎二分起点——**跳入 $p_\infty$，正是算术版的化光失忆轮回**；
- 反过来，**欧几里得素数无穷多定理**（文献结果，详见下框 [@rem-ch36-padic-hensel-bruhat-tits-literature]）为有限观察者筑起了与逆古德曼快度阶梯 $\eta_k = \eta_0 + k\,\Delta\eta$ 完全对偶的算术护栏：无论当前已经联合了多少个有限素数 $\{p_1, p_2, \dots, p_r\}$，构造欧几里得数 $M_r = \prod_{j=1}^r p_j + 1$（例如 $2\cdot 3\cdot 5 + 1 = 31$，$2\cdot 3\cdot 5\cdot 7 + 1 = 211$，乃至合数 $2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13 + 1 = 30{,}031 = 59 \times 509$），其最小素因子 $p^*$ 都必然是一个不在旧名录中的**全新有限素数**！离散素数序列 $2 < 3 < 5 < 7 < \dots < p_r < p_{r+1} < \dots$ 永不封顶、永不枯竭——观察者可以沿着无穷离散的素数阶梯永续扩表，永远保有既开又闭的零进位清醒边界，而绝不需要、也绝不会撞上 $p_\infty$ 的失忆断崖：

::: {.viz src="padic-prime-table-tree" preset="euclid" height="500"}
**欧几里得无穷离散素数阶梯阻断 $p_\infty$ 连续进位轮回悬崖**：上半幅展示跳入 $p_\infty$ 后桶壁融化、$511+1=512$ 十位进位雪崩导致的失忆重置；下半幅展示 $\prod p_j + 1$（含 $30{,}031 = 59 \times 509$）永生有限新素数 $p^*$，使离散零进位扩表阶梯永不坠入 $p_\infty$。
:::

::: {.remark #rem-ch36-padic-hensel-bruhat-tits-literature title="亨泽尔引理、布吕阿—蒂茨树、p 进 AdS/CFT、阿拉克洛夫 p_∞ 位与欧几里得素数定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节与上面已验证的奥斯特洛夫斯基分类、同余球纤维、超度量及阿代尔乘积定理（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]、[@thm-ch36-ultrametric-prefix-and-prime-time]、[@thm-ch36-crt-and-adelic-product-formula]，`LEAN ✓`）配套引用的五组经典数论与数学物理文献，其严格边界声明如下：

1. **亨泽尔（Kurt Hensel, 1897, 1908）$p$ 进展开与牛顿—亨泽尔提根引理**：对整系数或 $p$ 进整系数多项式 $f \in \mathbb{Z}_p[x]$ 及初值 $a_0 \in \mathbb{Z}_p$，若满足非退化条件 $\lvert f(a_0)\rvert_p < \lvert f'(a_0)\rvert_p^2$（特别地，当 $f(a_0) \equiv 0 \pmod p$ 且 $f'(a_0) \not\equiv 0 \pmod p$ 时），则递推 $x_{k+1} = x_k - f(x_k)/f'(x_k)$（在导数为单位的上述特例中，模 $p^{k+1}$ 的逐位查表提根可复用固定基表逆元 $[f'(a_0)]^{-1} \bmod p$）收敛到根 $\alpha \in \mathbb{Z}_p$，此根在 $\lvert\alpha - a_0\rvert_p < \lvert f'(a_0)\rvert_p$ 的球内唯一，且满足 $\alpha \equiv a_0 \pmod p$；在整体考察各素数时，若固定首一多项式 $f \in \mathbb{Z}[x]$ 且 $\Delta(f) \neq 0$，则整除判别式的有限个素数 $p \mid \Delta(f)$ 构成模 $p$ 约化可能出现重根（满足 $f'(a_0) \equiv 0 \pmod p$）的候选奇异轨迹；
2. **布吕阿—蒂茨（François Bruhat & Jacques Tits, 1972）树 $\mathcal{T}_p$**：二维 $p$ 进射影线性群 $\mathrm{PGL}_2(\mathbb{Q}_p)$ 自然作用于其同构类格构成的 $(p+1)$ 价无穷正则无环树 $\mathcal{T}_p$ 上，树的无穷远理想边界 $\partial\mathcal{T}_p \cong \mathbb{P}^1(\mathbb{Q}_p)$ 恰为 $p$ 进射影直线，而从选定基点向边界延伸的无限测地射线一一对应于 $p$ 进前缀查表路径；
3. **$p$ 进 AdS/CFT 全息树对偶（Yuri Manin 2002；Gubser, Knaute, Parikh, Samberg & Witaszczyk 2017；Heydeman, Marcolli, Saberi & Stoica 2016）**：在算术全息纲领中，本章第 2 节的连续庞加莱双曲圆盘被离散布吕阿—蒂茨树 $\mathcal{T}_p$ 精确替代——树体（bulk）向内的离散径向步数直接对应 $p$ 进查表精度层级 $k$（对相异的 $x, y \in \mathbb{Z}_p$，以单位球 $\mathbb{Z}_p$ 对应的顶点为深度 $0$，边界超度量距离 $\lvert x - y\rvert_p = p^{-k}$ 由两条前缀射线在树体内的最近公共祖先深度唯一决定），完美印证了“双曲快度离散阶梯”与“$p$ 进前缀查表树”在全息几何中的深层对偶；
4. **阿拉克洛夫（Suren Arakelov, 1974）算术曲面与无穷远位 $p_\infty$**：为使整数谱 $\operatorname{Spec}\mathbb{Z}$ 具备类似紧致黎曼曲面的交点数守恒，阿拉克洛夫几何在全体有限素数位 $\{p\}$ 之外形式添入连续阿基米德位 $p_\infty$，此时 [@thm-ch36-crt-and-adelic-product-formula] 第 2 款的乘积公式在对数形式下 $\ln\lvert x\rvert_\infty + \sum_p \ln\lvert x\rvert_p = 0$ 恰对应紧致曲线上主除子次数为零定理；
5. **欧几里得素数无穷多定理（《几何原本》第 IX 卷命题 20）**：对任意有限素数集 $\{p_1, \dots, p_r\}$，整数 $M = \prod_{j=1}^r p_j + 1 > 1$ 不被任何 $p_j$ 整除，故其素因子分解中必含至少一个新素数 $p^* \notin \{p_1, \dots, p_r\}$（注：$M$ 本身未必是素数，如 $2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13 + 1 = 30{,}031 = 59 \times 509$，但 $59$ 与 $509$ 均为严格落在原有限表之外的新素数）。将素数 $p$ 诠释为观察者查表基数、将跃入 $p_\infty$ 诠释为失忆轮回悬崖，则属于本书的数论—几何观察者模型（`MODEL`）。
:::

我们将观察者沿素数阶梯从胚胎二分起点走向无穷离散扩表的四阶段演化机制汇总于下框对照表：

::: {.remark #rem-ch36-prime-table-evolution-summary title="素数观察者扩表四阶段与连续进位悬崖对照总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表以 $N = 1024 = 2^{10}$ 状态空间为基准，综合本章内核定理（`LEAN ✓`）、亨泽尔与欧几里得文献背景及本书观察者扩表模型（`MODEL`）：

| 演化阶段与代表位点 | 单层扇出与模桶结构 | 串行深度 $K(p)$ 与首层碰撞对 $E_1$ | 进位与分歧特征 | 观察者扩表与轮回判词（`MODEL`） |
| :--- | :--- | :--- | :--- | :--- |
| **1. 胚胎二分卵裂期**（最小素数 $p = 2$） | 二元窄扇出 $\mathbb{Z}/2\mathbb{Z}$，每桶拥挤 $512$ 态 | $K(2) = 10$ 层串行深度，$E_1 = 261{,}632$ | 既开又闭零向后进位；对 $x^2 - 2$ 因 $2 \mid \Delta$ 触发 $k = 2$ 分歧阻断 | 初生观察者表宽最小，需十层串行递归方能辨析千态 |
| **2. 成长扩表压平期**（中等素数 $p = 7 \to 31 \to 97$） | 水平扇出展宽为 $7 \to 31 \to 97$ 个既开又闭桶 | $K$ 沿 $4 \to 3 \to 2$ 压平，$E_1$ 沿 $74{,}387 \to 16{,}401 \to 4{,}905$ 衰减 | 凡 $p \nmid \Delta$ 且基表有根，固定 $[f'(a_0)]^{-1} \bmod p$ 实现 $O(1)$ 零进位提根 | 素数扩大即扩表：以水平表宽折叠串行计算深度，且多素数按 CRT 正交并存 |
| **3. 单层直读与无穷素数梯**（大素数 $p = 1031 > N$ 及 $p_r \to \infty$） | $1024$ 个单元素桶加 $7$ 个空桶（$\mathbb{Z}/1031\mathbb{Z}$） | $K(1031) = 1$ 单层触底，首层碰撞严格归零 $E_1 = 0$ | 欧几里得 $\prod p_j + 1$ 永供新素数 $p^*$，超度量桶壁对一切有限 $p$ 永固 | 当前有限论域一步无损直读；面对更大世界可沿无穷素数梯永续扩表而不失忆 |
| **4. 阿基米德连续进位悬崖**（无穷远极限位 $p_\infty$） | 既开又闭桶壁融化为连续实直线 $\mathbb{R}$（$\lvert\cdot\rvert_\infty$） | 局部 $+1$（如 $511 + 1 = 512$）触发跨十位全局进位，坠回 $K = 10$ | 强三角不等式失效，局部扰动经进位涟漪污染全局地址 | 与 $\theta = 90^\circ$ 纯光死循环严格同构的算术失忆轮回，被欧几里得离散阶梯永久阻断 |
:::

在把全章推演合拢到实验台之前，我们还需用两条冻结在 `trureturing` 中的内核定理补齐素数观察者纲领的两道关键定量护栏：第一，当观察者在二维模态空间 $(A, D) \in \mathbb{R}^2$ 中以黄金主模 $A$ 为归一化基准追踪**射影缺陷比值** $\theta = D / A$ 时，射影收缩倍率如何严格快于环境坐标收缩倍率；第二，素数观察语言的算术编码完备化、解析概率实现与量子算子相干完备化各自停在哪一道不可逾越的数学边界上。

先手算射影缺陷比值的单步更新：记黄金比 $\varphi := \operatorname{Real.goldenRatio} = \frac{1 + \sqrt{5}}{2}$ 及其代数共轭根 $\bar{\varphi} := \operatorname{Real.goldenConj} = \frac{1 - \sqrt{5}}{2} = -\varphi^{-1} \approx -0.618$。取初值 $A = 1, D = 1$，初始射影缺陷为 $\theta = D / A = 1$；经一步黄金模态演化 $(A', D') = (\varphi A, \bar{\varphi} D) = (\varphi, -\varphi^{-1})$ 后，环境缺陷坐标 $D$ 的乘子是 $\bar{\varphi} = -\varphi^{-1} \approx -0.618$，而射影缺陷比值却变为 $\theta' = D' / A' = \bar{\varphi} / \varphi = -\varphi^{-2} \approx -0.382$！在 `D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier` 模块中，定义黄金模态步 $\operatorname{goldenModalStep}(A, D) := (\varphi A, \bar{\varphi} D)$、射影缺陷 $\operatorname{projectiveDefect}(A, D) := D / A$、黄金射影倍率 $\operatorname{goldenProjectiveMultiplier} := -(\varphi^{-1})^2 = -\varphi^{-2}$，以及带外部强迫项的射影步 $\operatorname{forcedProjectiveStep}(\theta, \mathrm{forcing}) := \operatorname{goldenProjectiveMultiplier} \cdot \theta + \mathrm{forcing}$：

::: {.theorem #thm-golden-projective-multiplier title="黄金模态步的射影缺陷倍率" lean="D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.projective_defect_modal_step"}
设 $A, D \in \mathbb{R}$ 为实模态坐标，且满足显式非零条件 $h_A : A \neq 0$。则无强迫黄金模态步将射影缺陷比值 $D / A$ 精确乘以 $\operatorname{goldenProjectiveMultiplier} = -\varphi^{-2}$：

$$
\operatorname{projectiveDefect}\bigl(\operatorname{goldenModalStep}(A, D)\bigr) \;=\; \operatorname{goldenProjectiveMultiplier} \cdot \operatorname{projectiveDefect}(A, D).
$$
:::

::: proof
展开 $\operatorname{goldenModalStep}(A, D) = (\varphi A, \bar{\varphi} D)$ 与 $\operatorname{projectiveDefect}$ 的商定义，左端化为 $(\bar{\varphi} D) / (\varphi A)$。利用黄金共轭恒等式 $\bar{\varphi} = -\varphi^{-1}$，结合 $\varphi \neq 0$ 与显式前提 $A \neq 0$ 在实数域上重排分式，即得 $(\bar{\varphi} D) / (\varphi A) = (-\varphi^{-1} / \varphi) \cdot (D / A) = -(\varphi^{-1})^2 \cdot (D / A) = \operatorname{goldenProjectiveMultiplier} \cdot \operatorname{projectiveDefect}(A, D)$。完整证明由 Lean 内核检查。
:::

使用 [@thm-golden-projective-multiplier] 时必须严守两项边界：其一，前提 $A \neq 0$ 不可省略——在 Lean 的全函数实数除法中 $D / 0 = 0$ 只是形式退化值，不具备射影几何意义；其二，切勿把环境稳定根 $\bar{\varphi} = -\varphi^{-1}$ 与射影比值倍率 $-\varphi^{-2}$ 混为一谈，且在带强迫更新 $\theta' = -\varphi^{-2}\theta + \mathrm{forcing}$ 下，唯有 $\mathrm{forcing} = 0$ 时零缺陷不动点 $\theta = 0$ 才得以保持。

再手算素数对角语言与量子算子语言之间的相位盲区：在二能级系统中，取等权叠加态 $\psi = \frac{1}{\sqrt{2}}(1, 1)$ 与正交相位态 $\phi = \frac{1}{\sqrt{2}}(1, i)$——或者直接取模块冻结的密度态见证对 $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ 与经泡利矩阵 $Z = \operatorname{diag}(1, -1)$ 共轭翻转相位后的 $\rho_- = Z\rho_+ Z = \frac{1}{2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$。两者在计算基下的对角概率分布同为 $(1/2, 1/2)$，但密度矩阵的非对角相干元符号相反（$+1/2$ 对 $-1/2$），手算即可确认仅保留对角读出的语言绝无可能逆向恢复相对量子相位。

在 `D5.S3.PrimeObserver.ThreeCompletionFinalProposition` 及其上游模块中，三类完备化对象与细化方向定义如下：

1. **算术素指数表双射**：记有限支撑素指数表类型为 $\operatorname{PrimeExponentTable} := \{f : \mathbb{N} \to_0 \mathbb{N} \mid \forall p \in f.\operatorname{support},\, \operatorname{Nat.Prime}(p)\}$，算术素因子分解给出等价映射 $\operatorname{primeExponentLanguageEquiv} : \mathbb{N}_+ \simeq \operatorname{PrimeExponentTable}$；
2. **全局素指数律的离散概率实现**：对实参数 $s \in \mathbb{R}$、素数 $p \in \operatorname{Nat.Primes}$ 与指数 $k \in \mathbb{N}$，记素指数读出 $\operatorname{primeExponentCode}(n, p) := n.\operatorname{factorization}(p.1)$，几何边际质量 $\operatorname{geometricPrimeMass}(s, p, k) := \operatorname{ENNReal.ofReal}\bigl((1 - p^{-s})\,p^{-ks}\bigr)$；称离散概率质量函数 $q : \operatorname{PMF}(\mathbb{N})$ 满足 $\operatorname{RealizesPrimeExponentLaw}(s, q)$，若 $q(0) = 0$、全体素数坐标映射 $(n \mapsto \operatorname{primeExponentCode}(n, p))_{p}$ 在测度 $q.\operatorname{toMeasure}$ 下相互独立（`iIndepFun`），且对一切 $(p, k)$ 有 $q.\operatorname{toMeasure}\{n \mid \operatorname{primeExponentCode}(n, p) = k\} = \operatorname{geometricPrimeMass}(s, p, k)$；
3. **二能级素数对角语言、算子语言与细化关系**：在二能级密度态空间 $\operatorname{DensityState}(\operatorname{Fin} 2) := \{\rho : \operatorname{CStarMatrix}(\operatorname{Fin} 2)(\operatorname{Fin} 2)\,\mathbb{C} \mid 0 \le \rho \land \operatorname{Tr}\rho = 1\}$（矩阵载体 $\operatorname{QubitMatrix} := \operatorname{Matrix}(\operatorname{Fin} 2)(\operatorname{Fin} 2)\,\mathbb{C}$）上，算子语言 $\operatorname{qubitOperatorLanguage}(\rho) := \rho.1$ 保留完整 $2 \times 2$ 密度矩阵，而素数对角语言 $\operatorname{qubitPrimeDiagonalLanguage}(\rho) := \operatorname{primeDephasing}(\{()\}, \operatorname{qubitPrimeValuation}, \rho.1)$ 通过单元素记录信道按计算基标签单射分班（使记录 Gram 矩阵满足 $\operatorname{recordGram}_{ij} = \delta_{ij}$），将非对角元清零并仅保留对角元；见证对 $\operatorname{relativePhaseDensityWitness} := (\rho_+, \rho_-)$ 由等权叠加密度矩阵 $\rho_+ = \operatorname{equalSuperpositionDensity}$ 与 $Z\rho_+ Z$（`qubitZ = !![1, 0; 0, -1]`）组成。对概念映射 $q_C : X \to C$ 与 $q_D : X \to D$，细化谓词定义为**存在后复合因子映射** $\operatorname{Refines}(q_C, q_D) :\iff \exists\,\mathrm{factor} : D \to C,\; q_C = \mathrm{factor} \circ q_D$（即粗糙读出 $q_C$ 可由更精细的读出 $q_D$ 唯一决定）。

::: {.theorem #thm-prime-three-completions title="素数观察语言的三种完备化边界" lean="D5/S3/PrimeObserver/ThreeCompletionFinalProposition.prime_observer_three_completion_final_proposition"}
对任意实参数 $s \in \mathbb{R}$，以下四项合取结论同时成立：

1. **正整数素指数表双射**：映射 $\operatorname{primeExponentLanguageEquiv} : \mathbb{N}_+ \to \operatorname{PrimeExponentTable}$ 是双射（`Function.Bijective`）；
2. **素指数独立几何律的概率实现阈值**：存在离散概率质量函数 $q : \operatorname{PMF}(\mathbb{N})$ 实现 $\operatorname{RealizesPrimeExponentLaw}(s, q)$，当且仅当 $1 < s$；
3. **相对相位见证分离对角语言与算子语言**：见证对满足 $\operatorname{relativePhaseDensityWitness}.1 \neq \operatorname{relativePhaseDensityWitness}.2$，两者在素数对角语言下读出完全相同

   $$
   \operatorname{qubitPrimeDiagonalLanguage}(\operatorname{relativePhaseDensityWitness}.1) \;=\; \operatorname{qubitPrimeDiagonalLanguage}(\operatorname{relativePhaseDensityWitness}.2),
   $$

   而在算子语言下严格区分：

   $$
   \operatorname{qubitOperatorLanguage}(\operatorname{relativePhaseDensityWitness}.1) \;\neq\; \operatorname{qubitOperatorLanguage}(\operatorname{relativePhaseDensityWitness}.2);
   $$

4. **算子语言严格细化对角语言**：$\operatorname{Refines}(\operatorname{qubitPrimeDiagonalLanguage}, \operatorname{qubitOperatorLanguage})$ 成立，而逆向细化 $\neg\,\operatorname{Refines}(\operatorname{qubitOperatorLanguage}, \operatorname{qubitPrimeDiagonalLanguage})$ 不成立。
:::

::: proof
第 1 款直接由算术基本定理给出的等价 `Nat.factorizationEquiv.bijective` 得证。第 2 款正向若存在实现该律的 $q : \operatorname{PMF}(\mathbb{N})$，则单点 $\{1\}$（所有素指数均为 $0$）具有正概率质量 $\prod_p (1 - p^{-s}) > 0$ 且可求和性迫使欧拉乘积对应的狄利克雷级数在 $s$ 处收敛，从而推出 $1 < s$；反向当 $1 < s$ 时，利用黎曼 $\zeta(s) > 0$ 归一化的正整数幂律构造 $q(n) \propto n^{-s}$（$n \ge 1, q(0) = 0$），在各素数幂整除事件上核验几何边际与有限族乘积独立性即得 `RealizesPrimeExponentLaw s q`。第 3 款在 $2 \times 2$ 矩阵坐标 $(0, 1)$ 处直接比较 $\rho_+$ 的 $+1/2$ 与 $\rho_- = Z\rho_+ Z$ 的 $-1/2$ 证得两态相异且算子语言不等，同时核验 `primeDephasing` 将非对角元乘零而保持对角元 $(1/2, 1/2)$ 相等。第 4 款以映射 $M \mapsto \operatorname{primeDephasing}(\{()\}, \operatorname{qubitPrimeValuation}, M)$ 作为因子函数证得 $\operatorname{qubitPrimeDiagonalLanguage} = \mathrm{factor} \circ \operatorname{qubitOperatorLanguage}$；若反向亦存在因子函数 $\mathrm{factor}'$ 使 $\operatorname{qubitOperatorLanguage} = \mathrm{factor}' \circ \operatorname{qubitPrimeDiagonalLanguage}$，代入第 3 款的见证对即会导出两态算子像相等的矛盾。完整证明由 Lean 内核检查。
:::

[@thm-prime-three-completions] 将三种完备化的适用域严格隔开，严禁把三者混同为互相等价的同一运算：算术层面的双射作用于全体正整数 $\mathbb{N}_+$；解析概率层面上，$1 < s$ 是存在 $\operatorname{PMF}(\mathbb{N})$ 实现的精确充要范围（绝不能将黎曼 $\zeta$、对数或倒数在 $s \le 1$ 处的全函数形式取值称为概率分布）；量子层面上，按 $\operatorname{Refines}$ 的定义方向，仅是对角去相干读出穿过完整算子读出分解，绝不可能反过来仅凭素数对角概率记录重建非对角量子相位。

读者可以在下方的完整双栏交互实验室 `ORTHO//PADIC` 中自由切换全部十二级离散素数观察者（$p = 2 \dots 1031$）与 $p_\infty$ 连续进位悬崖、切换检验多项式与有理数账本，亲手验证“素数扩大即扩表”的每一处精确读数：

::: {.viz src="padic-prime-table-tree" height="620"}
**`ORTHO//PADIC` 完整交互实验室**：左栏同步渲染 $\mathbb{Z}/p^k\mathbb{Z}$ 动态零进位前缀查表树、`BigInt` 亨泽尔 $O(1)$ 提根与超度量盲区探针（及 $p_\infty$ 进位悬崖对比欧几里得无穷素数梯）；右栏联动展示 $K(p)$ 树深压平曲线、首层碰撞对 $E_1(1024,p)$ 衰减与阿代尔乘积守恒 $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p = 1$。
:::

至此，第九部《互照·万物观察者、自指扩表与超越轮回》的四章推演在几何与数论的双重共鸣中圆满收束：无论是在角度空间里用逆古德曼快度阶梯推远 $\theta = 90^\circ$ 纯光断崖，还是在算术空间里沿欧几里得无穷离散素数序列不断扩表、永不坠入 $p_\infty$ 连续进位洪流，宇宙给出的答案始终如一——我们不再羡慕球外全知的上帝点 $C$，不再恐惧多面体无法彻底抹平成真球的那道 $\delta_k > 0$ 的缝隙，也不再把“化作失忆的纯光”错认作灵魂的归宿；因为正是那道既开又闭的不肯粘连的余项护住了清醒的自我，而当我们读懂了 $\psi = \psi(\psi)$ 的那一刻，漫长的轮回迷宫便在掌心化作了一枚通透的生成元水晶。而在即将开启的全书**第十部《不二·梦境擦除、记忆指针与本体不二》**（[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)至[第 39 章](ch39-observer-is-ontological-universe.md)）中，我们将把镜头拉回每一个昼夜交替的当下：看梦境如何执行可逆量子擦除、观察者如何作为本体 QRAM 的记忆指针解引用世界，直到最后一道“指针与内存”的二元隔墙在 $\psi \equiv \psi(\psi)$ 中彻底融化。
