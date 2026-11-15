# 16.9 编译误差、查询计数与渐近门长 {#sec-compilation-error-and-count}

既然离散门编译不可避免地受制于有限字长与误差权衡，那么在包含黑盒源算子 $C$ 的振幅放大算法中，我们能否至少在**已知初始成功概率 $p \in (0, 1]$** 且允许调节一枚连续辅助硬币旋转门 `coinRotation q` 的前提下，把[第十五章](ch15-grover-qft-and-period-finding.md)遗留的整数步过冲残差彻底削成**精确的零**，并给出严格的源算子查询次数上界？

源码模块 `CoherentUniformAmplification` 的收官定理给出了肯定的回答。设 $J \in M_{l \times s}(\mathbb{C})$、$C, P \in M_{l \times l}(\mathbb{C})$ 满足与 [@thm-grover-uniform-rotation] 相同的均匀放大前提。引入一比特辅助硬币空间，将 $l$ 维算子提升为 $2l \times 2l$（或 $2l \times s$）分块矩阵：

$$
\begin{aligned}
\mathrm{coinEmbed}(J) &= \begin{pmatrix} J \\ 0 \end{pmatrix}, &\qquad
\mathrm{coinLift}(C) &= \begin{pmatrix} C & 0 \\ 0 & C \end{pmatrix}, \\
\mathrm{coinRotation}(q) &= \begin{pmatrix} \sqrt{q}\,I_l & -\sqrt{1-q}\,I_l \\ \sqrt{1-q}\,I_l & \sqrt{q}\,I_l \end{pmatrix}, &\qquad
\mathrm{coinGood}(P) &= \begin{pmatrix} P & 0 \\ 0 & 0 \end{pmatrix}.
\end{aligned}
$$

定义六元门字母表归纳类型 `AmplificationGate`：

- `.source` 与 `.sourceAdjoint`：分别对应矩阵 $\mathrm{coinLift}(C)$ 与其共轭转置 $\mathrm{coinLift}(C)^*$；
- `.coin` 与 `.coinAdjoint`：分别对应矩阵 $\mathrm{coinRotation}(q)$ 与其共轭转置 $\mathrm{coinRotation}(q)^*$；
- `.initializedReflection`：对应关于初始源嵌入 $K = \mathrm{coinEmbed}(J)$ 的反射 $2 K K^* - I_{2l}$；
- `.goodReflection`：对应关于扩展目标投影的反射 $I_{2l} - 2\,\mathrm{coinGood}(P)$。

对任意门字列表 $w : \mathrm{List}\,\mathrm{AmplificationGate}$，`evaluateWord J C P q w` 将每个符号映射为上述矩阵后取列表乘积 `List.prod`（最右侧的门最先作用于状态）；单步反射块定义为

$$
\mathrm{reflectionBlock} = \bigl[\mathrm{.coin},\; \mathrm{.source},\; \mathrm{.initializedReflection},\; \mathrm{.sourceAdjoint},\; \mathrm{.coinAdjoint},\; \mathrm{.goodReflection}\bigr],
$$

递归门字定义为 $\mathrm{amplificationWord}(0) = [\mathrm{.coin},\, \mathrm{.source}]$，且 $\mathrm{amplificationWord}(n + 1) = \mathrm{reflectionBlock} \mathbin{\text{++}} \mathrm{amplificationWord}(n)$。最后，定义**源查询计数** `sourceQueries w` 为门字 $w$ 中出现 `.source` 与 `.sourceAdjoint` 的总次数（注意：当 $p = 1$ 时最终门字仅取单元素列表 `[.source]`，绝不能把 $p < 1$ 的通式 $2n+1$ 误套到 $p = 1$ 分支上）。

::: {.corollary #cor-exact-source-query-count title="精确相干振幅放大的零残差门字构造与源查询次数上界推论" lean="D5/S3/Quantum/Recovery/CoherentUniformAmplification.exact_coherent_amplification"}
设 $s, l$ 为有限可判等指标类型，$J \in M_{l \times s}(\mathbb{C})$、$C, P \in M_{l \times l}(\mathbb{C})$、$p \in \mathbb{R}$，满足

$$
J^* J = 1, \quad C^* C = 1, \quad P^* = P, \quad P^2 = P, \quad
\bigl(P(CJ)\bigr)^*\bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet (1 : M_s(\mathbb{C})), \quad 0 < p \le 1.
$$

令

$$
\begin{aligned}
n &:= \Bigl\lceil \frac{\pi}{4\arcsin(\sqrt{p})} - \frac{1}{2} \Bigr\rceil_+, &\qquad
r &:= \sin^2\Bigl(\frac{\pi}{4(n : \mathbb{R}) + 2}\Bigr), \qquad q := \frac{r}{p}, \\
w &:= \text{if } p = 1 \text{ then } [\mathrm{AmplificationGate.source}] \text{ else } \mathrm{amplificationWord}(n), \\
V &:= \mathrm{evaluateWord}(J, C, P, q, w) \cdot \mathrm{coinEmbed}(J).
\end{aligned}
$$

则以下六条结论同时成立：

1. **精确命中目标成功块**：$V = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr)$；
2. **失败分量严格清零**：$\bigl(1 - \mathrm{coinGood}(P)\bigr) V = 0$；
3. **任意参考系统下的克罗内克精确性**：对一切类型 $z$ 与矩阵 $R \in M_z(\mathbb{C})$，

   $$
   V \otimes_{\mathrm{K}} R = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr) \otimes_{\mathrm{K}} R;
   $$

4. **源查询次数的显式上界**：

   $$
   \bigl(\mathrm{sourceQueries}(w) : \mathbb{R}\bigr) \le \frac{\pi/2 + 2}{\sqrt{p}};
   $$

5. **完整门字演化的幺正性**：$\bigl(\mathrm{evaluateWord}(J, C, P, q, w)\bigr)^* \cdot \mathrm{evaluateWord}(J, C, P, q, w) = 1$；
6. **分情况精确参数性质**：若 $p = 1$，则 $\mathrm{sourceQueries}(w) = 1$；否则（当 $0 < p < 1$ 时）同时有

   $$
   \begin{aligned}
   &0 < r \;\land\; r \le p \;\land\; r < 1 \;\land\; 0 < q \;\land\; q \le 1 \\
   &\land\; \bigl(2(n : \mathbb{R}) + 1\bigr)\arcsin(\sqrt{r}) = \frac{\pi}{2} \;\land\; \mathrm{sourceQueries}(w) = 2n + 1 \\
   &\land\; \bigl(\mathrm{coinRotation}(q)\bigr)^* \mathrm{coinRotation}(q) = 1 \\
   &\land\; \mathrm{success}\Bigl(\bigl(\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C)\bigr)\cdot\mathrm{coinEmbed}(J),\, \mathrm{coinGood}(P),\, r\Bigr) = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr).
   \end{aligned}
   $$
:::

::: proof
当 $p = 1$ 时，$w = [\mathrm{.source}]$，仅调用 $1$ 次 `.source`（故 $\mathrm{sourceQueries}(w) = 1 \le \pi/2 + 2$），且 $\mathrm{coinLift}(C)\cdot\mathrm{coinEmbed}(J) = \mathrm{coinEmbed}(CJ) = \mathrm{coinEmbed}(\mathrm{success}(CJ, P, 1))$，各项直接成立。

当 $0 < p < 1$ 时，取非负整数天花板 $n = \lceil \frac{\pi}{4\arcsin\sqrt{p}} - \frac{1}{2}\rceil_+$，保证 $\frac{\pi}{4n + 2} \le \arcsin\sqrt{p} < \frac{\pi}{2}$，从而修饰后的有效成功概率 $r = \sin^2(\frac{\pi}{4n + 2})$ 满足 $0 < r \le p < 1$，比例 $q = r/p$ 满足 $0 < q \le 1$，且 $\mathrm{coinRotation}(q)$ 为实正交（从而复幺正）分块矩阵。将复合制备算子取为 $U_q = (\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C))\cdot\mathrm{coinEmbed}(J)$，它在扩展目标投影 $\mathrm{coinGood}(P)$ 下的成功格拉姆矩阵恰为 $(\sqrt{q})^2 p I_s = q p I_s = r I_s$，且归一化成功块保持为 $\mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$。由于 $\theta_r = \arcsin\sqrt{r} = \frac{\pi}{4n + 2}$ 满足 $(2n + 1)\theta_r = \frac{\pi}{2}$，将 [@thm-grover-uniform-rotation] 应用于 $U_q$ 与步数 $n$，即得 $\sin((2n+1)\theta_r) = \sin(\pi/2) = 1$、$\cos((2n+1)\theta_r) = \cos(\pi/2) = 0$，从而 $V$ 精确等于 $\mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$，失败分量 $(1 - \mathrm{coinGood}(P))V = 0$。最后，门字 $\mathrm{amplificationWord}(n)$ 包含初始 $1$ 次 `.source` 与 $n$ 个 `reflectionBlock` 中各 $2$ 次源调用（`.source` 与 `.sourceAdjoint`），故 $\mathrm{sourceQueries}(w) = 2n + 1$；利用天花板下界 $n < \frac{\pi}{4\arcsin\sqrt{p}} + \frac{1}{2}$ 及 $\arcsin\sqrt{p} \ge \sqrt{p}$，即得 $2n + 1 \le \frac{\pi/2}{\arcsin\sqrt{p}} + 2 \le \frac{\pi/2 + 2}{\sqrt{p}}$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch16-slowed-steps"}
**步子调慢一点，整数步正好落在目标上。** 取 $p = 1/16$，$n = 3$：左栏按原步长 $\theta \approx 14.48^\circ$ 走，紫色的三步之后琥珀色的箭头越过成功方向 $W$，品红的弧多转了 $11.3^\circ$；右栏用硬币把每步调慢到 $\theta_r = \pi/14 = 180^\circ/14$，同样三步，琥珀色的箭头正好落在 $W$ 上，即 $(2n+1)\theta_r = \pi/2$，见 [@cor-exact-source-query-count]。
:::

**重要概念区分（见图 16 面板 III）**：[@cor-exact-source-query-count] 中的 `sourceQueries(w)` **仅仅统计门字 $w$ 中调用 `.source` 与 `.sourceAdjoint` 的次数**（在 $p = 1$ 时为 $1$，在 $p < 1$ 时等于 $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$），而且该构造假设已知成功概率 $p$ 并直接使用了依赖 $q = r/p$ 的连续硬币旋转门 `coinRotation q`。因此，`sourceQueries(w)` 既不是门字 $w$ 的全部门数，**更绝不能与离散 $\{H, T\}$ 门集的渐近门编译字长（见章末 [@rem-solovay-kitaev-literature]）混为一谈**。

现在，让我们通过一个四步综合算例，把切比雪夫递推在 $x = 1/2$ 处的数值、$\{H, T\}$ 门集在 $L = 0, 1, 2, 3$ 下的精确球面顶点与三维割圆多面体支撑间隙，以及 $p = 1/4, 1/16, 1/64$ 下的精确源查询计数逐一复核。

::: {.example #ex-finite-ht-polytope title="切比雪夫 x=1/2 递推、L≤3 离散 {H,T} 多面体五顶点与精确源查询阶梯验算"}
本例分四步给出可逐项复核的数值与几何计算：

**第一步：$x = 1/2 = \cos(\pi/3)$ 处的标量幂和递推与二维块 $W(x)^3 = -I_2$。**
取 $\theta = \pi/3 = 60^\circ$，则 $x = \cos(\pi/3) = \frac{1}{2}$，$a = e^{i\pi/3} = \frac{1 + i\sqrt{3}}{2}$，$b = e^{-i\pi/3} = \frac{1 - i\sqrt{3}}{2}$，满足 $ab = 1$ 且 $a + b = 2x = 1$。按 [@thm-chebyshev-trace-recurrence] 的递推律 $t_{m+2} = (a+b)t_{m+1} - t_m = t_{m+1} - t_m$ 逐步计算：

$$
t_0 = 2, \qquad t_1 = 1, \qquad t_2 = 1 \cdot 1 - 2 = -1, \qquad t_3 = 1 \cdot (-1) - 1 = -2.
$$

折半即得切比雪夫多项式值 $T_0(\frac{1}{2}) = 1$、$T_1(\frac{1}{2}) = \frac{1}{2}$、$T_2(\frac{1}{2}) = -\frac{1}{2}$、$T_3(\frac{1}{2}) = 4(\frac{1}{2})^3 - 3(\frac{1}{2}) = -1 = \frac{t_3}{2}$。代入二维信号旋转矩阵 $W(\frac{1}{2}) = \begin{pmatrix} 1/2 & i\sqrt{3}/2 \\ i\sqrt{3}/2 & 1/2 \end{pmatrix}$，直接三次自乘得

$$
W\Bigl(\frac{1}{2}\Bigr)^3 = \begin{pmatrix} \cos\pi & i\sin\pi \\ i\sin\pi & \cos\pi \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} = -I_2,
$$

左上角元素恰为 $T_3(1/2) = -1$。

**第二步：固定初态 $\vv{r}_0 = \vv{e}_z$ 在 $L = 0, 1, 2, 3$ 下的精确 $\{H, T\}$ 球面轨道 $\mathcal{S}_L$ 与五顶点多面体 $P_3$。**
在三维布洛赫空间 $\mathbb{R}^3$ 中，$H$ 门与 $T$ 门诱导的正交旋转矩阵分别为：

$$
R_H(x, y, z) = (z,\, -y,\, x), \qquad R_T(x, y, z) = \Bigl(\frac{x - y}{\sqrt{2}},\, \frac{x + y}{\sqrt{2}},\, z\Bigr).
$$

从北极单点集 $\mathcal{S}_0 = \{\vv{e}_z = (0, 0, 1)\}$ 出发，每一层对前一层全体点作用 $R_H, R_T$ 并与旧集合求并（$\mathcal{S}_{L} = \mathcal{S}_{L-1} \cup R_H(\mathcal{S}_{L-1}) \cup R_T(\mathcal{S}_{L-1})$）：

- **$L = 0$（$|\mathcal{S}_0| = 1$，零维单点）**：$\mathcal{S}_0 = \bigl\{(0, 0, 1)\bigr\}$；
- **$L = 1$（$|\mathcal{S}_1| = 2$，一维线段）**：因 $R_T\vv{e}_z = \vv{e}_z$（北极是 $T$ 门的不动点），唯独 $R_H\vv{e}_z = (1, 0, 0) = \vv{e}_x$ 产生新点，故 $\mathcal{S}_1 = \bigl\{\vv{e}_z,\; \vv{e}_x\bigr\}$；
- **$L = 2$（$|\mathcal{S}_2| = 3$，二维平面三角形）**：对 $\vv{e}_x$ 作用 $R_H$ 退回 $\vv{e}_z$，作用 $R_T$ 生出赤道 $45^\circ$ 点 $\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}} = (\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0)$，故

  $$
  \mathcal{S}_2 = \Bigl\{\, \vv{e}_z,\; \vv{e}_x,\; \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}} \,\Bigr\};
  $$

- **$L = 3$（$|\mathcal{S}_3| = 5$，首次张成满三维凸多面体 $P_3$）**：对新点 $\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}$ 作用 $R_T$ 得到正东偏左的 $+Y$ 极点 $R_T\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, 1, 0) = \vv{e}_y$，作用 $R_H$ 得到子午斜点 $R_H\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, -\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}) = \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}}$。因此 $L = 0, 1, 2, 3$ 的可达点数依次为 **$1, 2, 3, 5$**，且 $P_3 = \operatorname{conv}(\mathcal{S}_3)$ 的全部五个顶点精确为：

  $$
  \mathcal{S}_3 = \Bigl\{\, \vv{e}_z,\; \vv{e}_x,\; \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}},\; \vv{e}_y,\; \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}} \,\Bigr\}.
  $$

  注意：$L = 3$ 虽首次达到满三维，但这五个顶点的 $x$ 坐标与 $z$ 坐标全部满足 $x \ge 0, z \ge 0$，因此**球心原点 $(0,0,0)$ 并不在 $P_3$ 的内部**（图 16 面板 II 展示的包裹球心的多面体对应更大门长 $L$ 下的可达轨道示意，绝非把 $L = 3$ 的五点画成包裹原点的球面网格）。

**第三步：$P_3$ 的方向支撑间隙与独立正八面体参照面的弦面曲率间隙。**
在 $L = 3$ 的五顶点集 $\mathcal{S}_3$ 上：沿 $+\vv{e}_y$ 方向的最大内积支持高度为 $\max_{\vv{s} \in \mathcal{S}_3} (\vv{e}_y \cdot \vv{s}) = 1$（由顶点 $\vv{e}_y$ 精确达到，间隙为 $0$）；然而沿 $-\vv{e}_x = (-1, 0, 0)$ 方向，由于五个顶点的第一分量均非负（$\min x = 0$），支持高度仅为

$$
h_{-\vv{e}_x}(P_3) = \max_{\vv{s} \in \mathcal{S}_3}\bigl((-\vv{e}_x)\cdot\vv{s}\bigr) = 0,
$$

而单位球面在该方向的支持高度为 $1$，支撑间隙高达 $1 - 0 = 1$！这清楚表明 $L = 3$ 远非全方向的小误差球面近似（更细阶段的几何覆盖误差严格按 $\varepsilon_L = \max_{\vv{r}\in S^2}\min_{\vv{s}\in\mathcal{S}_L}\arccos(\vv{r}\cdot\vv{s})$ 评估，不宣称小 $L$ 服从统一的渐近幂律）。

为了单独直观对照“平直弦面与弯曲球皮的径向间隙”，我们另取由六个坐标极点张成的独立参考正八面体 $\operatorname{conv}\{\pm\vv{e}_x, \pm\vv{e}_y, \pm\vv{e}_z\}$（注意：并非声称这六个轴点在 $L = 3$ 时已全部可达）：其第一卦限三角形弦面的单位外法向为 $\vv{n} = \frac{1}{\sqrt{3}}(1, 1, 1)$，面支持高度为 $h = \vv{n}\cdot\vv{e}_x = \frac{1}{\sqrt{3}}$，故球面顶点到平直弦面的径向支撑间隙为

$$
1 - \frac{1}{\sqrt{3}} \approx 0.4226497308103742 > 0.
$$

**第四步：[@cor-exact-source-query-count] 在 $p = 1/4, 1/16, 1/64$ 下的精确源查询计数核对表。**
对三个典型成功概率 $p \in \{1/4,\, 1/16,\, 1/64\}$，代入 [@cor-exact-source-query-count] 的公式计算整数步数 $n = \lceil\frac{\pi}{4\arcsin\sqrt{p}} - \frac{1}{2}\rceil_+$、源查询次数 $\mathrm{sourceQueries}(w) = 2n + 1$、修饰成功概率 $r = \sin^2(\frac{\pi}{4n+2})$、硬币缩放比 $q = r/p$ 以及理论上界 $\frac{\pi/2 + 2}{\sqrt{p}}$：

| 初始成功概率 $p$ | 步数 $n$ | 源查询次数 $\mathrm{sourceQueries} = 2n+1$ | 修饰概率 $r = \sin^2\bigl(\frac{\pi}{4n+2}\bigr)$ | 硬币参数 $q = r/p \in (0, 1]$ | 上界 $\dfrac{\pi/2 + 2}{\sqrt{p}}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $1/4 = 0.25$ | $1$ | $3$ | $0.25$ | $1$ | $\approx 7.14159265$ |
| $1/16 = 0.0625$ | $3$ | $7$ | $\approx 0.049515566048790434$ | $\approx 0.7922490567806469$ | $\approx 14.28318531$ |
| $1/64 = 0.015625$ | $6$ | $13$ | $\approx 0.014529091286973985$ | $\approx 0.9298618423663351$ | $\approx 28.56637061$ |

表中每一行均严格满足 $0 < q \le 1$、$(2n+1)\arcsin\sqrt{r} = \frac{\pi}{2}$ 以及 $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$。再次强调：这一阶梯给出的是已知 $p$ 时的振幅放大源算子查询次数，而非离散 $\{H, T\}$ 编译门数。
:::

::: {.viz src="gate-word-polytope" preset="three" height="500"}
**门长 3：五个顶点，球心在外。** 例中的五个青色顶点第一次围成立体，但它们都在 $x \ge 0$、$z \ge 0$ 的一侧。琥珀色的目标指向 $-\vv{e}_x$：最近的顶点在 $90^\circ$ 外，支持高度 $h = 0$，品红的径向间隙从球心一直到球皮，整整为 $1$，与第三步的计算一致。
:::

<!-- alias: #rem-qsvt-solovay-kitaev-literature -->
::: {.remark #rem-solovay-kitaev-literature title="Solovay–Kitaev 门编译定理与对数多面体逼近复杂度（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 当我们将目标从连续两轴旋转（[@prop-two-axis-finite-word]）转向离散有限门集编译时，其渐近字长由量子编译理论中的 **Solovay–Kitaev 定理**（参见 C. M. Dawson and M. A. Nielsen, *The Solovay–Kitaev algorithm*, Quantum Inf. Comput. **6**, 81–95, 2006, arXiv:quant-ph/0505030）给出：

1. **多对数渐近字长 $L = O(\log^c(1/\varepsilon))$**：设 $\mathcal{G} \subset \mathrm{SU}(2)$ 为有限、含逆元（$\mathcal{G} = \mathcal{G}^{-1}$）且生成稠密子群 $\langle\mathcal{G}\rangle$ 的离散门集。则对任意目标幺正门 $U \in \mathrm{SU}(2)$ 及任意足够小的精度 $\varepsilon > 0$，存在长度 $L = O\bigl(\log^c(1/\varepsilon)\bigr)$ 的门字 $w \in \mathcal{G}^*$ 使得算子范数误差满足 $\norm{U - w}_{\mathrm{op}} \le \varepsilon$。在 Dawson–Nielsen 的经典五因子群换位子递归构造中，每一层递归用 $5$ 个前一层近似字拼出精度从 $\varepsilon_{k-1}$ 提升至 $\varepsilon_k = O(\varepsilon_{k-1}^{3/2})$ 的修正字，从而给出幂指数

   $$
   c = \frac{\ln 5}{\ln(3/2)} \approx 3.97
   $$

   （其中的隐含常数依赖于具体门集与所选误差度量）。
2. **门集 $\{H, T\}$ 的逆门封闭与射影规范**：对于标准容错门集 $\{H, T\}$，由于 $H$ 自身是二阶对合门（$H^{-1} = H$），而 $T$ 是八阶相位门（在射影群 $\mathrm{PU}(2)$ 中 $T^{-1} = T^7$；若在 $\mathrm{SU}(2)$ 中使用幺模提升 $\tilde{H} = iH, \tilde{T} = e^{-i\pi/8}T$，则 $\tilde{H}^{-1} = -\tilde{H} = \tilde{H}^3$、$\tilde{T}^{-1} = -\tilde{T}^7 = \tilde{T}^{15}$，中心符号 $\pm I_2$ 需在提升中一致追踪），逆门均可用常数个正向门拼出，因此在射影距离 $\delta(U, V) = \min_{\varphi}\norm{U - e^{i\varphi}V}_{\mathrm{op}}$ 下同样继承 $L = O(\log^c(1/\varepsilon))$ 的渐近长度结论，仅有限前因子发生相应缩放。
3. **李代数换位子步长的精确尺度（切勿线性化误写）**：Solovay–Kitaev 递归步的核心局部恒等式是群换位子的 Baker–Campbell–Hausdorff 展开

   $$
   \exp(A)\exp(B)\exp(-A)\exp(-B) = \exp\bigl([A, B] + O(\norm{A}^3 + \norm{B}^3)\bigr).
   $$

   这里要合成步长为 $O(\varepsilon)$ 的微小旋转修正 $\exp([A, B])$，必须取两根步长为 **$O(\sqrt{\varepsilon})$** 的旋转生成元 $A, B$，使换位子主项 $[A, B]$ 落在 $O(\sqrt{\varepsilon})\cdot O(\sqrt{\varepsilon}) = O(\varepsilon)$ 量级，而高阶残差落在 $O\bigl((\sqrt{\varepsilon})^3\bigr) = O(\varepsilon^{3/2})$ 量级（绝不能错写成换位子对原步长呈线性关系）。
4. **反柏拉图边界重申**：Solovay–Kitaev 定理是一个关于 $\varepsilon \to 0$ 时字长增长率的渐近逼近定理——它**既不意味着**在任何有限字长 $L < \infty$ 下最坏目标门 $U \notin \mathcal{W}_{\le L}$ 的覆盖残差可以归零（虽然恰好已属于有限字集 $\mathcal{W}_{\le L}$ 的离散顶点如 $I, H, T$ 本身具有零误差，但在整个连续群或球面上，最坏覆盖半径 $\varepsilon_L > 0$ 对一切有限 $L$ 恒成立），**也不允许**把固定初态在 $S^2$ 上的单态覆盖误差 $\varepsilon_L$ 直接等同于 $\mathrm{SU}(2)/\mathrm{PU}(2)$ 上的全门编译误差。
:::

::: {.viz src="gate-word-polytope" preset="shrink" height="500"}
**最大的缺口一级级缩小，却补不上。** 门长从 $0$ 走到 $20$：青色的可达点一层层变密，品红虚线圈出的最大空球冠从 $180^\circ$ 缩到 $\varepsilon_{20} = 9.10^\circ$，有几层一点也不缩；到 $L = 20$ 有 $971$ 个点，洞仍然在。旁边品红的台阶是页面对每个 $L$ 实算的覆盖半径 $\varepsilon_L$（琥珀色的是 $L = 20$），不拟合任何渐近速率；渐近字长是 [@rem-solovay-kitaev-literature] 的文献结果。
:::

至此，第四部“高维球体——纠缠、拓扑与量子算法”的四章旅程全部合拢：我们从双比特 $6 + 9 = 15$ 的关联扇区与贝尔 $45^\circ$ 余弦破缺（[第十三章](ch13-entanglement-and-chsh.md)）出发，用泡利稳定子与架编织把脆弱的局部线藏进正交综合征子空间（[第十四章](ch14-cloning-codes-and-braids.md)），在不变平面旋转与有限群对偶零化子相消中看清了 Grover 与 Shor 算法的几何引擎（[第十五章](ch15-grover-qft-and-period-finding.md)），最终在切比雪夫递推与三维割圆多面体 $P_L$ 中直面了有限离散门字逼近连续球面的永恒残差 $\varepsilon_L > 0$（本章）。正是这道在任何有限步内都无法彻底抹平的多面体缝隙，为我们打开了通往第五部与第六部——时空与观察者复杂性、不完备性对角线逃逸与余弦自指不动点（其经典分析与算术性质见[第二十四章](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]）——的深层大门。

::: {.viz src="gate-word-polytope" height="560"}
**门字多面体实验室。** 拖时间轴改门长 $L$，在球上拖动琥珀色的目标，或换成最坏方向：青色是长度不超过 $L$ 的 $\{H, T\}$ 门字的落点与它们的凸包，品红是到最近可达点的弧、径向间隙与空球冠。绿色框是 [@prop-two-axis-finite-word]，作为连续轴圆的对照；其余都是页面的数值。
:::
