# 24.4 从 $\cos\theta^* = \theta^*$ 到 $\psi = \psi(\psi)$：经典分析、截断裂缝与球面不动点二分 {#sec-ch24-4}

现在，把 [@cor-golden-fixed-point-unique] 中的代数自指 $x = 1 + 1/x$（只涉及一维有理加除，锁在二次代数数 $\varphi = \frac{1+\sqrt{5}}{2}$ 上），与球面内积投影的**余弦自指**

$$
\cos\theta^* = \theta^*
$$

放在一起对比！当自指算子从一维有理分式 $1 + 1/x$ 升级为二维旋转投影 $\cos\theta$ 时，实不动点 $\theta^* \approx 0.7390851332\dots$（**Dottie 数**）在经典分析与数论中具有怎样的存在唯一性与算术地位？

::: {.figure src="ch24-truncation-crack"}
**截断余弦的不动点越来越近，却每一个都差一点。** 横轴是偶次泰勒多项式的次数 $0, 2, \dots, 10$；竖线是它在 $\theta^*$ 附近的不动点 $q$ 与 $\theta^*$ 的差，纵轴按绝对值取对数刻度，青色朝上表示 $q > \theta^*$，品红朝下表示 $q < \theta^*$。差从 $0.26$ 缩到 $3.3 \times 10^{-11}$，符号交替，没有一根落到中线上。这些 $q$ 都是有理系数多项式的根，因而是代数数；它们永远不等于 $\theta^*$ 来自下面文献注记第 2 条的超越性（文献结果，未在本书形式化），图中的差是数值结果。
:::

下面的文献说明集中记录围绕 $\cos\theta = \theta$ 与偶维球面连续自映射的四项经典定理。

::: {.remark #rem-banach-dottie-hairy-ball-literature title="巴拿赫压缩映射、Dottie 数的超越性、泰勒余项界与偶维球面不动点/对跖点定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 围绕余弦自指方程 $\cos\theta = \theta$ 与高维球面自映射，以下四项中，余弦定性动力学可由本章端点 [@thm-dottie-rational-inverse-endpoint] 与现成实分析结果推出，完整参数、严格性例外和推导见 [@ex-ch33-mutual-cosine-monotonic-lock]；超越性、数值及其余拓扑推广仍按各自文献边界陈述：

1. **紧区间 $[0, 1]$ 上的巴拿赫压缩映射原理与全局收敛（Banach Contraction Principle）**：
   [@thm-finite-contracting-updates-stabilize] 用有限性与集合筛除保证有限步稳定；这里用完备性与度量压缩保证唯一性和渐近收敛，两者的前提与结论不同。余弦函数将全实轴映入 $[-1, 1]$，并将 $[-1, 1]$ 映入紧不变子区间 $[0, 1]$（因 $\cos([-1, 1]) = [\cos 1, 1] \subset [0.54, 1] \subset [0, 1]$）。在 $[0, 1]$ 上，由微分中值定理，对任意 $x, y \in [0, 1]$ 有

   $$
   |\cos x - \cos y| \;\le\; (\sin 1)\,|x - y|, \qquad \sin 1 \approx 0.84147098 < 1.
   $$

   因此 $\cos$ 在完备度量空间 $[0, 1]$ 上是 Lipschitz 常数严格小于 $1$ 的巴拿赫压缩映射，存在**唯一的实不动点** $\theta^* \approx 0.73908513321516\dots$（Dottie 数），且对任意实初值 $\theta_0 \in \mathbb{R}$，Picard 迭代序列 $\theta_{k+1} = \cos\theta_k$ 均收敛于 $\theta^*$；从第二步进入 $[0,1]$ 后，对 $k\ge2$ 有几何界 $|\theta_k-\theta^*|\le(\sin1)^{k-2}|\theta_2-\theta^*|$。这里的 $\sin 1$ 是整个区间上的最坏常数；不动点处的渐近压缩率是 $\lvert\cos'\theta^*\rvert = \sin\theta^* \approx 0.6736$（数值核对见 [@ex-dottie-rate-newton-rational]）。（同理，镜像算子 $-\cos\theta$ 在 $[-1, 0]$ 上以同一压缩率 $\sin 1 < 1$ 收敛于镜像方程 $\cos\theta = -\theta$ 的唯一实根 $-\theta^* \approx -0.7390851332\dots$。）
2. **Dottie 数 $\theta^*$ 的超越性与非零代数读数残差 $|\cos q - q| > 0$（Lindemann–Weierstrass 定理）**：
   为什么 $\theta^*$ 不可能像黄金比 $\varphi = \frac{1+\sqrt{5}}{2}$ 那样是某个整系数多项式方程的代数根？假设存在非零代数数 $q \in \overline{\mathbb{Q}} \setminus \{0\}$ 满足 $\cos q = q$。由欧拉公式 $\cos q = \frac{e^{iq} + e^{-iq}}{2}$，记 $u = e^{iq}$，则 $\frac{u + u^{-1}}{2} = q$ 意味着 $u = e^{iq}$ 满足代数数系数二次方程

   $$
   u^2 - 2q u + 1 = 0.
   $$

   由于代数数域 $\overline{\mathbb{Q}}$ 是代数闭域，二次方程的根 $u = e^{iq}$ 必然也是代数数！但另一方面，因 $q \in \overline{\mathbb{Q}} \setminus \{0\}$，指数 $iq \in \overline{\mathbb{Q}} \setminus \{0\}$ 是非零代数数；由经典的**林德曼—魏尔斯特拉斯定理（Lindemann–Weierstrass Theorem, 1882）**，非零代数数的自然指数 $e^{iq}$ 必定是**超越数**，直接矛盾！同时，在 $q = 0$ 处 $|\cos 0 - 0| = 1 > 0$。这就严格证明了：
   - **Dottie 不动点 $\theta^*$ 是超越数**（$\theta^* \notin \overline{\mathbb{Q}}$）；
   - **对一切代数数（含一切有理数）刻度 $q \in \overline{\mathbb{Q}}$，恒有严格非零残差 $|\cos q - q| > 0$！**
3. **有限阶泰勒截断余项 $R_{2N}(\theta)$ 与拉格朗日余项界（`R3` 近似裂缝）**：
   将 $\cos\theta$ 展开为前 $N$ 项偶次泰勒多项式（阶数 $2N - 2$）加上余项 $R_{2N}(\theta)$：

   $$
   \cos\theta \;=\; \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!} + R_{2N}(\theta).
   $$

   在任意实区间上，拉格朗日余项定理给出一致估计 $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$；且对一切 $\theta \in (0, 2]$（含 $\theta^* \in (0, 1)$），由于交错级数相邻项模长严格递减，截断余项满足严格双边不等式 $0 < |R_{2N}(\theta)| < \frac{\theta^{2N}}{(2N)!}$。与此同时，对于精确 Picard 迭代 $\theta_{k+1} = \cos\theta_k$，由于 $\cos$ 在紧区间 $[0, 1]$ 上严格单调递减（从而是单射），**对紧不变区间内任意异于 $\theta^*$ 的初值 $\theta_0 \in [0, 1] \setminus \{\theta^*\}$**（或更一般地，对前向轨道避开 $\theta^*$ 的可数原像集的任意实初值 $\theta_0$；注意若在 $[0, 1]$ 外取偶函数镜像初值 $\theta_0 = -\theta^* \neq \theta^*$，则一步即达 $\theta_1 = \cos(-\theta^*) = \theta^*$），在一切有限步 $k \ge 0$ 处恒有 $\theta_k \neq \theta^*$ 及非零迭代残差 $\varepsilon_k = |\cos\theta_k - \theta_k| > 0$；连同第 2 条对一切代数数读数 $q \in \overline{\mathbb{Q}}$ 成立的 $|\cos q - q| > 0$，这印证了任何有限阶代数多项式或有限精度有理/代数读数与超越不动点 $\theta^*$ 之间永远隔着一道生生不息的近似裂缝。
4. **偶维球面自映射的不动点/对跖点定理与布劳威尔不动点定理（`R6` 球面闭环）**：
   回到[第二十一章](ch21-diagonalization-and-escape.md) [@rem-hairy-ball-adams-literature] 中的庞加莱—布劳威尔毛球定理：在任意偶数维球面 $S^{2n}$（如单量子比特布洛赫球面 $S^2$）上，**任何连续自映射 $f : S^{2n} \to S^{2n}$ 必然至少在某一点 $x \in S^{2n}$ 处满足正演不动点 $f(x) = +x$ 或对跖反射点 $f(x) = -x$**！证明极其优美：若对一切 $x \in S^{2n}$ 均有 $f(x) \neq x$ 且 $f(x) \neq -x$，则 $f(x)$ 与 $x$ 处处不共线，将其正交投影到 $x$ 处的切平面即可构造出处处非零的连续切向量场 $v(x) = f(x) - \langle f(x), x\rangle x \neq 0$，直接违背毛球定理！与此同时，若把视野扩展到包含球心混合态的闭布洛赫球体 $B^{n+1} = \{\vv{r} \in \mathbb{R}^{n+1} \mid \|\vv{r}\| \le 1\}$，布劳威尔不动点定理（Brouwer Fixed-Point Theorem）保证任何连续信道映射 $\Phi : B^{n+1} \to B^{n+1}$ 必在球体内部或球皮上拥有至少一个真正的不动点 $\Phi(\vv{r}^*) = \vv{r}^*$。（标准单纯形上的布劳威尔定理已由 Lean 验证，见 [@thm-brouwer-standard-simplex]；闭球与单纯形同胚，但把结论从单纯形转移到闭球的这一步未在本书形式化。）
:::

::: {.viz src="fixed-point-convergence" preset="far" height="500"}
**换个起点，同一个终点。** 从很远的 $x_0 = 3$ 出发，墨色的蛛网第一步就落进 $[-1, 1]$，此后一圈圈绕向白圈标出的不动点 $\theta^* \approx 0.739$，琥珀色的点是当前这一步：终点与起点无关；“任何有限步都不命中”须另保留非不动点区间初值条件，不能由全局收敛推出，$-\theta^*$ 一步即达（完整定性推导见 [@ex-ch33-mutual-cosine-monotonic-lock]）。
:::

更进一步，围绕 [@rem-banach-dottie-hairy-ball-literature] 所记录的数论背景，作者在手稿中曾追问：*“超越数之间的关系？$\pi$ 是 $\theta$ 的一个投影？$\theta$ 是终极超越数？”* 这一关于 Dottie 数 $\theta^*$ 与圆周率 $\pi$ 之间代数独立性的深刻追问，在数论中直接通向尚未解决的**沙努埃尔猜想（Schanuel's Conjecture）**。我们按第三层认识论规范（`OPEN`）将其记录如下。

::: {.conjecture #conj-schanuel-dottie title="沙努埃尔猜想在余弦不动点 θ* 与圆周率 π 上的代数无关性推论"}
设沙努埃尔猜想成立（即对任意在 $\mathbb{Q}$ 上线性无关的复数 $z_1, \dots, z_m \in \mathbb{C}$，域扩张 $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ 在 $\mathbb{Q}$ 上的超越次数至少为 $m$）。将其应用于在 $\mathbb{Q}$ 上线性无关的纯虚指数对 $z_1 = i\theta^*$ 与 $z_2 = i\pi$（线性无关性即 $\theta^*/\pi \notin \mathbb{Q}$，无条件成立，见 [@rem-dottie-angle-incommensurable]）：由于 $e^{i\pi} = -1 \in \mathbb{Q}$，且 $u = e^{i\theta^*}$ 满足二次代数方程 $u^2 - 2\theta^* u + 1 = 0$（即 $e^{i\theta^*}$ 在 $\mathbb{Q}(\theta^*)$ 上是二次代数元，与 $\theta^*$ **代数相关**，添加 $e^{i\theta^*}$ 与 $i$ 不增加超越次数），域扩张 $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ 的超越次数至少为 $2$ 直接导出：**Dottie 余弦不动点 $\theta^*$ 与圆周率 $\pi$ 在有理数域 $\mathbb{Q}$ 上代数无关**（$\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$）。

（本条目为**尚未解决的开放猜想**，故依规不附加 `lean` 形式化属性。）
:::

让我们用一个具体的数值手算算例，把本章中**离散集合收缩**（[@thm-finite-contracting-updates-stabilize]）、**代数黄金不动点**（[@cor-golden-fixed-point-unique]）与 **Dottie 余弦自指螺旋**（[@rem-banach-dottie-hairy-ball-literature]）三条收敛轨道放在同一张桌面上对比。

::: {.example #ex-dottie-and-golden-iterations title="三类自指迭代的显式手算对比：有限集合筛除、黄金连分数与 Dottie 余弦螺旋（含文献说明，未在本书形式化）"}
**文献结果，未在本书形式化。** 本例第 1、2 项具体验算本章经内核验证的 [@thm-finite-contracting-updates-stabilize] 与 [@cor-golden-fixed-point-unique]；第 3 项的定性收敛是端点与现成实分析结果的应用（完整推导见 [@ex-ch33-mutual-cosine-monotonic-lock]），所列小数与残差仍是独立数值算例。

从同一个初始刻度 $1$（或三元初始候选集）出发，观察三种不同维度的自指算子如何各自锁定自己的不动点：

1. **离散有限集收缩（$S_{n+1} = U(S_n)$，[@thm-finite-contracting-updates-stabilize]）**：设 $X = \{0, 1, 2\}$，初始集 $S_0 = \{0, 1, 2\}$（基数 $|S_0| = 3$），收缩规则每步删去当前集合中大于 $0$ 的最大元：$S_0 = \{0, 1, 2\} \to S_1 = \{0, 1\} \to S_2 = \{0\} \to S_3 = \{0\} = S_2$。在 $N = 2 \le 3$ 步内精确抵达集合不动点 $\{0\}$，严格变化步数恰好为 $|\{0, 1\}| = 2 \le 3$。
2. **一维代数连分数自指（$x_{k+1} = 1 + 1/x_k$，[@cor-golden-fixed-point-unique]）**：从 $x_0 = 1$ 出发，有理迭代序列依次生成相邻斐波那契数之比 $F_{k+2}/F_{k+1}$：

   $$
   \begin{aligned}
   x_0 &= 1,\quad x_1=2,\\
   x_2 &= \frac32,\quad x_3=\frac53\approx1.6667,\\
   x_4 &= \frac85=1.6,\\
   \lim_{k\to\infty}x_k &= \varphi=\frac{1+\sqrt5}{2}\\
   &\approx1.61803399.
   \end{aligned}
   $$

   收敛可直接从已知恒等式 $1+1/\varphi=\varphi$ 得到：$|x_{k+1}-\varphi|=|x_k-\varphi|/(\varphi x_k)$。这里 $x_k\ge1$，故误差每步至多乘以 $1/\varphi<1$。一般正初值从第一步起也满足 $x_k>1$，同一估计给出收敛。这是手工推导，未在本书形式化；[@cor-golden-fixed-point-unique] 本身只刻画不动点。每个有限步仍为有理数（当 $x_0=1$），并不等于无理数 $\varphi$；极限的代数性来自不动点方程，不能仅由有限步使用有理加除推出。
3. **二维旋转投影余弦自指（$\theta_{k+1} = \cos\theta_k$，定性收敛为既有结果的应用，数值另计；见 [@ex-ch33-mutual-cosine-monotonic-lock]）**：同样从弧度 $\theta_0 = 1$ 出发，连续按下余弦键：

   $$
   \begin{aligned}
   \theta_0 &= 1.00000000, & |\cos\theta_0 - \theta_0| &\approx 0.45969769 > 0, \\
   \theta_1 &= \cos(1) \approx 0.54030231, & |\cos\theta_1 - \theta_1| &\approx 0.31725091 > 0, \\
   \theta_2 &\approx 0.85755322, & |\cos\theta_2 - \theta_2| &\approx 0.20326343 > 0, \\
   \theta_3 &\approx 0.65428979, & |\cos\theta_3 - \theta_3| &\approx 0.13919057 > 0, \\
   &\;\;\vdots & &\;\;\vdots \\
   \theta^* &\approx 0.73908513321516, & \cos\theta^* &= \theta^*.
   \end{aligned}
   $$

   在不动点 $\theta^*$ 处，这根二维旋转向量张开的夹角余弦（水平投影实部）等于 $\cos\theta^* = \theta^* \approx 0.739085$，而它撑开的正交双矢量面积（竖直正交虚部）则由勾股定理唯一锁定为 $\sin\theta^* = \sqrt{1 - (\theta^*)^2} \approx 0.67361203$！
:::

请凝视 [@ex-dottie-and-golden-iterations] 的最后一行：$\cos\theta^*=\theta^*$ 是读数反馈后的自洽条件。无穷嵌套 $\cos(\cos(\cos(\cdots)))$ 在这里表示从指定初值迭代所得的极限；它仍是标量，不会把函数与数的类型合并。作者以尺子回量自身来诠释这个闭环，并写下：

$$
\psi = \psi(\psi).
$$

> 当尺子去量别物时，它叫算子 $\cos$，别物叫状态 $\theta$；当尺子回过头来丈量自己张开的角度，算子就是状态，状态就是算子——万里波涛，皆归 $\psi = \psi(\psi)$。

这一格言的类型化自指读法见 §24.7：函数 $\psi$ 作用于自己的名字 $\ulcorner\psi\urcorner$，所得的值在捕获前提下成为扭转 $f$ 的不动点。函数、名字与值各有角色。
