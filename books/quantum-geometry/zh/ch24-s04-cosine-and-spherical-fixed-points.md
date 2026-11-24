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
   回到[第二十一章](ch21-diagonalization-and-escape.md) [@rem-hairy-ball-adams-literature] 中的庞加莱—布劳威尔毛球定理：在任意偶数维球面 $S^{2n}$（如单量子比特布洛赫球面 $S^2$）上，**任何连续自映射 $f : S^{2n} \to S^{2n}$ 必然至少在某一点 $x \in S^{2n}$ 处满足正演不动点 $f(x) = +x$ 或对跖反射点 $f(x) = -x$**！证明极其优美：若对一切 $x \in S^{2n}$ 均有 $f(x) \neq x$ 且 $f(x) \neq -x$，则 $f(x)$ 与 $x$ 处处不共线，将其正交投影到 $x$ 处的切平面即可构造出处处非零的连续切向量场 $v(x) = f(x) - \langle f(x), x\rangle x \neq 0$，直接违背毛球定理！与此同时，若把视野扩展到包含球心混合态的闭球体 $B^{2n+1} = \{\vv{r} \in \mathbb{R}^{2n+1} \mid \|\vv{r}\| \le 1\}$（$n = 1$ 时即闭布洛赫球体 $B^3$），布劳威尔不动点定理（Brouwer Fixed-Point Theorem）保证任何连续信道映射 $\Phi : B^{2n+1} \to B^{2n+1}$ 必在球体内部或球皮上拥有至少一个真正的不动点 $\Phi(\vv{r}^*) = \vv{r}^*$。（标准单纯形上的布劳威尔定理已由 Lean 验证，见 [@thm-brouwer-standard-simplex]；闭球与单纯形同胚，但把结论从单纯形转移到闭球的这一步未在本书形式化。）
:::

::: {.viz src="fixed-point-convergence" preset="far" height="500"}
**换个起点，同一个终点。** 从很远的 $x_0 = 3$ 出发，墨色的蛛网第一步就落进 $[-1, 1]$，此后一圈圈绕向白圈标出的不动点 $\theta^* \approx 0.739$，琥珀色的点是当前这一步：终点与起点无关；“任何有限步都不命中”须另保留非不动点区间初值条件，不能由全局收敛推出，$-\theta^*$ 一步即达（完整定性推导见 [@ex-ch33-mutual-cosine-monotonic-lock]）。
:::

更进一步，围绕 [@rem-banach-dottie-hairy-ball-literature] 所记录的数论背景，作者在手稿中曾追问：*“超越数之间的关系？$\pi$ 是 $\theta$ 的一个投影？$\theta$ 是终极超越数？”* 这一关于 Dottie 数 $\theta^*$ 与圆周率 $\pi$ 之间代数独立性的深刻追问，在数论中直接通向尚未解决的**沙努埃尔猜想（Schanuel's Conjecture）**。我们按第三层认识论规范（`OPEN`）将其记录如下。

::: {.conjecture #conj-schanuel-dottie title="沙努埃尔猜想在余弦不动点 θ* 与圆周率 π 上的代数无关性推论"}
设沙努埃尔猜想成立（即对任意在 $\mathbb{Q}$ 上线性无关的复数 $z_1, \dots, z_m \in \mathbb{C}$，域扩张 $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ 在 $\mathbb{Q}$ 上的超越次数至少为 $m$）。将其应用于在 $\mathbb{Q}$ 上线性无关的纯虚指数对 $z_1 = i\theta^*$ 与 $z_2 = i\pi$（线性无关性即 $\theta^*/\pi \notin \mathbb{Q}$，无条件成立，见 [@rem-dottie-angle-incommensurable]）：由于 $e^{i\pi} = -1 \in \mathbb{Q}$，且 $u = e^{i\theta^*}$ 满足二次代数方程 $u^2 - 2\theta^* u + 1 = 0$（即 $e^{i\theta^*}$ 在 $\mathbb{Q}(\theta^*)$ 上是二次代数元，与 $\theta^*$ **代数相关**，添加 $e^{i\theta^*}$ 与 $i$ 不增加超越次数），域扩张 $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ 的超越次数至少为 $2$ 直接导出：**Dottie 余弦不动点 $\theta^*$ 与圆周率 $\pi$ 在有理数域 $\mathbb{Q}$ 上代数无关**（$\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$）。

（开放的是沙努埃尔猜想本身与无条件的代数无关；本条目为**尚未解决的开放猜想**，故依规不附加 `lean` 形式化属性。）
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

## 24.4.1 偶次泰勒截断、有理压缩认证、超八面体毛球二分与帕德—凯莱模型 {#sec-ch24-4-1-taylor-rational-pade-octahedral-hairy-ball}

前文将偶次泰勒截断图、[@rem-banach-dottie-hairy-ball-literature] 的巴拿赫压缩以及偶维球面不动点二分主要作为经典分析与数值背景引出。然而，即使剥离连续完备性与超越数值估计，这几类现象在有限代数与有理算术中各自仍留有可精确核验的内核。为此，下文先确立偶次泰勒不动点多项式在 $[0, 1]$ 上实根的唯一性、严格交替包络、误差比极限与 $1 \le m \le 6$ 时的不可约性，并纯在 $\mathbb{Q}$ 内认证不变区间与压缩上界；随后在有理正交群与超八面体群中导出球面毛球二分的精确符号循环计数，最后将帕德与凯莱有理替代算子的不动点同有限代数次数障碍并排对照。

### 24.4.1.1 偶次泰勒截断不动点多项式 $C_{2m}(x) - x$ 的唯一性、交替包络与误差比律 {#sec-ch24-4-1-1-taylor-truncation-fixed-points}

对每个整数 $m \ge 0$，记余弦与正弦的偶次、奇次泰勒截断多项式为 $C_{2m}(x) = \sum_{k=0}^{m} (-1)^k \frac{x^{2k}}{(2k)!}$ 与 $S_{2m-1}(x) = \sum_{k=0}^{m-1} (-1)^k \frac{x^{2k+1}}{(2k+1)!}$（约定 $S_{-1}(x) = 0$）。由此定义残差多项式 $F_m(x) = C_{2m}(x) - x$，并记其去分母整系数多项式为 $\widetilde{F}_m(x) = (2m)!\,F_m(x) \in \mathbb{Z}[x]$。

在区间 $(0, 1]$ 上，余弦与正弦交错级数的非零项模长严格递减：余弦相邻两项模长之比不超过 $\frac{1}{2} < 1$，正弦相邻两项模长之比不超过 $\frac{1}{6} < 1$。对 $m \ge 1$，求导得 $C_{2m}'(x) = -S_{2m-1}(x)$；将 $S_{2m-1}(x)$ 自 $k = 2$ 起相邻成对分组（每对非负，且若末项为偶指标 $k$ 亦为正，而 $S_1(x) = x$），即知对一切 $x \in (0, 1]$ 有 $S_{2m-1}(x) \ge x - \frac{x^3}{6} > 0$，从而对一切 $m \ge 0$ 与 $x \in [0, 1]$ 恒有 $F_m'(x) = -1 - S_{2m-1}(x) \le -1 < 0$。

端点处恒有 $F_m(0) = 1 > 0$ 且 $F_0(1) = 0$；对 $m = 1$ 有 $C_2(1) = \frac{1}{2} < 1$，对 $m \ge 2$ 将 $C_{2m}(1)$ 自 $k = 3$ 起相邻成对分组 $(3, 4), (5, 6), \dots$（每对非正，且若末项为奇指标亦为负）即得 $C_{2m}(1) \le C_4(1) = \frac{13}{24} < 1$，故对一切 $m \ge 1$ 均有 $F_m(1) < 0$。在 $[0, 1]$ 上，每个 $F_m$ 因此都有唯一实根 $q_m$（其中 $q_0 = 1$，且 $q_m \in (0, 1)$ 对一切 $m \ge 1$ 成立）。

再看不同截断阶次间的顺序：对一切 $x \in (0, 1]$，交错余项严格定向且指标 $m$ 同奇偶的相邻截断满足 $C_{2m+4}(x) - C_{2m}(x) = (-1)^{m+1}\frac{x^{2m+2}}{(2m+2)!}\bigl(1 - \frac{x^2}{(2m+3)(2m+4)}\bigr)$，于是严格嵌套 $C_2(x) < C_6(x) < \cdots < \cos x < \cdots < C_8(x) < C_4(x) < C_0(x)$ 成立。因 $F_m$ 在 $[0, 1]$ 上严格递减，把上述嵌套依次代入 $\theta^*$ 与 $q_m$ 立得严格交替单调包络；进一步，由 $F_m(q_m) = 0$ 与 $F_m(\theta^*) = C_{2m}(\theta^*) - \cos\theta^* = -R_{2m+2}(\theta^*)$ 应用微分中值定理（取严格介于 $q_m$ 与 $\theta^*$ 之间的 $\xi_m$），立得精确误差比公式：

$$
\begin{aligned}
q_1 < q_3 < q_5 < \cdots &< \theta^* < \cdots < q_4 < q_2 < q_0 = 1, \\
\rho_m := \frac{q_m - \theta^*}{-R_{2m+2}(\theta^*)} &= \frac{1}{1 + S_{2m-1}(\xi_m)}, \\
\lvert q_m - \theta^*\rvert &\le \lvert R_{2m+2}(\theta^*)\rvert < \frac{(\theta^*)^{2m+2}}{(2m+2)!}.
\end{aligned}
$$

由最后一行误差界立知 $q_m \to \theta^*$ 且 $\xi_m \to \theta^*$；再结合 $S_{2m-1}$ 在 $[0, 1]$ 上一致收敛到 $\sin$，即证比值 $\rho_m$ 收敛于 $\frac{1}{1 + \sin\theta^*}$（四舍五入为 $0.597510$）。记首略项 $A_m = \frac{(\theta^*)^{2m+2}}{(2m+2)!}$，则交错余项的相对误差满足 $0 < \frac{A_m - \lvert R_{2m+2}(\theta^*)\rvert}{A_m} < \frac{(\theta^*)^2}{(2m+3)(2m+4)}$；这定量解释了截断裂缝图中为何竖线朝向给出 $q_m - \theta^*$ 的严格交替符号、竖线高度在对数刻度上编码其大小，而该大小本身渐近于 $\frac{(\theta^*)^{2m+2}}{(2m+2)!(1 + \sin\theta^*)}$。

对于 $m = 1$，$\widetilde{F}_1(x) = -x^2 - 2x + 2$ 给出精确二次根 $q_1 = \sqrt{3} - 1$；对于 $m = 2, 3, 4, 5, 6$，去分母整多项式 $\widetilde{F}_m(x)$ 的系数最大公约数均为 $1$（本身即本原多项式，如 $\widetilde{F}_2(x) = x^4 - 12x^2 - 24x + 24$ 与 $\widetilde{F}_3(x) = -x^6 + 30x^4 - 360x^2 - 720x + 720$）。对 $m \ge 1$，若存在不整除首项系数的素数 $p$ 使 $\widetilde{F}_m \bmod p$ 在多项式环 $\mathbb{F}_p[x]$ 中不可约，则 $\widetilde{F}_m$ 在 $\mathbb{Q}[x]$ 中不可约，从而 $q_m$ 的精确代数次数为 $2m$（绝非有理数）。

下表汇总 $m = 0, \dots, 6$ 的根值、误差与比值 $\rho_m$，并对 $1 \le m \le 6$ 列出拉宾判据证得多项式模其不可约的素数 $p$（$m = 0$ 为线性情形，不列素数；对 $m = 1, \dots, 5$，模 $p$ 不可约性与有理异号隔离区间均由无显式导入的独立 Lean 辅助校验核实，而 $m = 6$ 由 Python 核验）：

| $m$ | 次数 / 素数 | $q_m$ | $q_m - \theta^*$ | $\rho_m$ |
| ---: | :--- | ---: | ---: | ---: |
| $0$ | $1$（线性） | $1$ | $+0.260915$ | $1$ |
| $1$ | $2$ / $p = 5$ | $0.732051$ | $-7.034 \times 10^{-3}$ | $0.576180$ |
| $2$ | $4$ / $p = 13$ | $0.739219$ | $+1.341 \times 10^{-4}$ | $0.598141$ |
| $3$ | $6$ / $p = 7$ | $0.7390838$ | $-1.311 \times 10^{-6}$ | $0.597502$ |
| $4$ | $8$ / $p = 13$ | $0.739085141$ | $+7.975 \times 10^{-9}$ | $0.597510$ |
| $5$ | $10$ / $p = 17$ | $0.73908513318$ | $-3.304 \times 10^{-11}$ | $0.597510$ |
| $6$ | $12$ / $p = 71$ | $0.739085133215$ | $+9.924 \times 10^{-14}$ | $0.597510$ |

### 24.4.1.2 纯有理算术下的不变区间与收缩上界认证 {#sec-ch24-4-1-2-purely-rational-contraction}

在 [@rem-banach-dottie-hairy-ball-literature] 第 1 条中，把巴拿赫压缩映射原理（S. Banach，*Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales*，1922，§2, Théorème 6, p. 160，[10.4064/fm-3-1-133-181](https://doi.org/10.4064/fm-3-1-133-181)）应用于余弦函数时，不变区间 $[\cos 1, 1]$ 的左端点 $\cos 1$ 与 $[0, 1]$ 上的利普希茨常数 $\sin 1$（四舍五入为 $0.841471$）本身均是超越数。同样，`trureturing` 库中的定理 [`cos_iterate_tendsto`](lean:D5/S3/Analytic/PowerSeries/DottieIteration.cos_iterate_tendsto) 从任意实初值出发，证得自第 $2$ 步起以 $\sin 1$ 为公比、$1 - \theta^*$ 为前因子的几何误差界，并给出渐近有号误差比 $-\sin\theta^*$（在轨道始终不经过 $\theta^*$ 时）。仅凭有限多项式 $C_2, C_4, C_6, S_5$ 的有理估值，即可完全在 $\mathbb{Q}$ 内认证不变区间与利普希茨上界，并在收窄后的子区间上严格优于 $[0, 1]$ 上的上界 $\sin 1$。

对任意满足 $0 \le a < b \le 1$ 的有理端点，因 $\cos$ 在 $[0, 1]$ 上递减且交错截断给出双边夹逼，对一切 $x \in [a, b]$ 恒有 $C_6(b) \le \cos b \le \cos x \le \cos a \le C_4(a)$（其中 $a = 0$ 时右端取等，而在 $b = 1$ 处亦可用更简的 $C_2(1) = \frac{1}{2} < \cos 1$）。于是两条纯有理不等式 $C_6(b) \ge a$ 与 $C_4(a) \le b$ 足以认证 $\cos([a, b]) \subseteq [a, b]$。同时，因 $S_5'(x) = C_4(x) = 1 - \frac{x^2}{2} + \frac{x^4}{24} > 0$ 在 $[0, 1]$ 上恒正，对一切 $x \in [a, b]$ 均有 $0 \le \sin x \le S_5(x) \le S_5(b)$，直接给出纯有理利普希茨上界 $\kappa = S_5(b) \in \mathbb{Q}$：

$$
\begin{aligned}
\bigl(C_6(b) \ge a \;\land\; C_4(a) \le b\bigr) &\implies \cos([a, b]) \subseteq [a, b], \\
\lvert\cos x - \cos y\rvert &\le S_5(b)\,\lvert x - y\rvert \quad (\forall x, y \in [a, b]).
\end{aligned}
$$

以下三组逐级收窄的有理区间具体展示这一纯有理认证的收紧效果：

- 粗区间 $[\frac{1}{2}, 1]$（宽 $\frac{1}{2}$）：由 $C_2(1) = \frac{1}{2}$ 与 $C_4(\frac{1}{2}) = \frac{337}{384} < 1$ 认证不变性，给出有理利普希茨上界 $S_5(1) = \frac{101}{120}$（四舍五入为 $0.841667$）；
- 中区间 $[\frac{2}{3}, \frac{4}{5}]$（宽 $\frac{2}{15}$）：由 $C_6(\frac{4}{5}) = \frac{489869}{703125} > \frac{2}{3}$ 与 $C_4(\frac{2}{3}) = \frac{191}{243} < \frac{4}{5}$ 认证不变性，其精确有理利普希茨上界为 $S_5(\frac{4}{5}) = \frac{33628}{46875} < \frac{18}{25}$（四舍五入为 $0.717397$）；
- 窄区间 $[\frac{8}{11}, \frac{3}{4}]$（宽 $\frac{1}{44}$）：由 $C_6(\frac{3}{4}) = \frac{239759}{327680} > \frac{8}{11}$ 与 $C_4(\frac{8}{11}) = \frac{32819}{43923} < \frac{3}{4}$ 认证不变性，其精确有理利普希茨上界为 $S_5(\frac{3}{4}) = \frac{27921}{40960} < \frac{7}{10}$（四舍五入为 $0.681665$，仅比不动点处的真实渐近压缩率 $\sin\theta^* \approx 0.673612$ 高出 $0.008053$）。

按区间宽度给出的先验步数上界由此缩减逾半：对 $[\frac{8}{11}, \frac{3}{4}]$ 内任意初值，仅凭纯有理不等式 $\frac{1}{44}(\frac{27921}{40960})^k < 10^{-10}$ 即可在第 $k = 51$ 步内担保误差小于 $10^{-10}$。相比之下，用 $[0, 1]$ 上的公比 $\sin 1$ 按同一窄宽度 $\frac{1}{44}$ 给出的先验步数上界为 $112$ 步，而按全区间 $[0, 1]$ 宽度给出的先验上界为 $134$ 步。

### 24.4.1.3 球面毛球二分的有限代数内核：有理正交群与超八面体群 $B_m$ 的符号循环计数 {#sec-ch24-4-1-3-finite-algebraic-hairy-ball}

转向 [@rem-banach-dottie-hairy-ball-literature] 第 4 条的偶维球面不动点与对跖点二分（作为该推论基础的毛球定理分析证明见 J. Milnor，*Analytic proofs of the "hairy ball theorem" and the Brouwer fixed point theorem*，1978，pp. 521–524，[10.1080/00029890.1978.11994635](https://doi.org/10.1080/00029890.1978.11994635)）。在有理正交群 $O(m, \mathbb{Q})$ 及其有限整数子群上，这一维数奇偶分野无须连续拓扑或实数完备性，完全由一条简洁的行列式恒等式与有限组合决定。

对任意正交矩阵 $Q \in O(m)$（满足 $Q^\top Q = I$），将 $\lambda I - Q = (-Q)(I - \lambda Q^\top)$ 取行列式，并利用转置不变性对每行提取 $\lambda \neq 0$，即得互反特征方程：

$$
\begin{aligned}
\chi_Q(\lambda) &:= \det(\lambda I - Q) = (-\lambda)^m (\det Q)\,\chi_Q(\lambda^{-1}) \quad (\lambda \neq 0), \\
m = 2n + 1 &\implies \chi_Q(\det Q) = -\chi_Q(\det Q) = 0, \\
\bigl(m = 2n \;\land\; \det Q = -1\bigr) &\implies \chi_Q(+1) = \chi_Q(-1) = 0.
\end{aligned}
$$

两项推论直接在 $\mathbb{Q}$ 上成立。在奇数环境维数 $m = 2n + 1$（对应偶维球面 $S^{2n}$）中，$\lambda = \det Q \in \{+1, -1\}$ 必为特征值：当 $Q \in O(2n + 1, \mathbb{Q})$ 时，纯有理高斯消元立得非零有理轴向量 $v \in \mathbb{Q}^{2n+1} \setminus \{0\}$ 满足 $Qv = (\det Q)v$，即每个保定向有理旋转必固定一条有理轴，每个反定向有理正交变换必反号翻转一条有理轴（仅在将 $v$ 归一为单位长度时才可能引入平方根）。

在偶数环境维数 $m = 2n$（对应奇维球面 $S^{2n-1}$）中，若 $\det Q = -1$，则 $+1$ 与 $-1$ 同时是特征值，每个反定向有理正交变换同时拥有有理不动轴与有理对跖轴。因此避开全部不动轴与对跖轴必然要求 $m = 2n$ 为偶数且 $\det Q = +1$（例如整系数分块直角旋转 $J_{2n} = \bigoplus_{j=1}^{n}\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \in SO(2n, \mathbb{Z})$ 的特征多项式为 $(\lambda^2 + 1)^n$，在 $\lambda = \pm 1$ 处取值 $2^n \neq 0$）。

进一步收紧到 $m$ 维正交多胞体 $\lozenge^m$ 的有限整数对称群，便得到超八面体群 $B_m = \{\pm 1\}^m \rtimes S_m$，其阶数为 $\lvert B_m\rvert = 2^m m!$。其带号置换组合结构见 A. Björner & F. Brenti，*Combinatorics of Coxeter Groups*，2005，Chapter 8，[10.1007/3-540-27596-7](https://doi.org/10.1007/3-540-27596-7)；循环分解与生成函数方法见 R. P. Stanley，*Enumerative Combinatorics*，Volume 1，2nd ed.，2011，Chapter 1，[10.1017/CBO9781139058520](https://doi.org/10.1017/CBO9781139058520)。

将任一 $Q \in B_m$ 分解为不相交的带号循环：一条长度为 $L$、符号乘积为 $\varepsilon \in \{+1, -1\}$ 的循环向 $\chi_Q(\lambda)$ 贡献因子 $\lambda^L - \varepsilon$，向 $\det Q$ 贡献因子 $(-1)^{L-1}\varepsilon$。检查 $\lambda = \pm 1$ 的零点条件立见：$\lambda = +1$ 不为根当且仅当每条循环都有 $\varepsilon = -1$，而此时 $\lambda = -1$ 亦不为根当且仅当每条循环的长度 $L = 2r$ 均为偶数（且每条偶长负循环贡献的行列式因子恒为 $(-1)^{2r-1}(-1) = +1$）。因此，当 $m = 2n + 1$ 为奇数时，不存在全由偶长循环构成的划分，避开 $\pm 1$ 的元素个数恒为 $a_{2n+1} = 0$。当 $m = 2n$ 为偶数时，在 $2r$ 个标号上共有 $(2r - 1)!\,2^{2r-1}$ 条负号 $2r$-循环，由标号循环分解的指数生成函数直接给出精确闭式与占比：

$$
\begin{aligned}
\sum_{n=0}^{\infty} a_{2n}\,\frac{z^{2n}}{(2n)!}
&= \exp\!\left(\sum_{r=1}^{\infty} \frac{2^{2r-1}}{2r}\,z^{2r}\right)
= (1 - 4z^2)^{-1/4}, \\
a_{2n} &= \prod_{j=1}^{n} 2(2j - 1)(4j - 3), \qquad
\frac{a_{2n}}{\lvert B_{2n}\rvert} = \prod_{j=1}^{n} \frac{4j - 3}{4j}.
\end{aligned}
$$

下表按 $(\det = +1, \det = -1)$ 配对汇总 $B_1$ 至 $B_6$ 全部 $50362$ 个带号置换矩阵的精确特征值分类（其中 $B_1$ 至 $B_4$ 全部 $442$ 个矩阵的行列式与特征值判别均由无显式导入的独立 Lean 辅助校验穷举核实）：

| $m$ | $\lvert B_m\rvert$ | 同时含 $\pm 1$ | 仅含 $+1$ | 仅含 $-1$ | 皆无 | 皆无占比 |
| ---: | ---: | :---: | :---: | :---: | :---: | ---: |
| $1$ | $2$ | $(0, 0)$ | $(1, 0)$ | $(0, 1)$ | $(0, 0)$ | $0$ |
| $2$ | $8$ | $(0, 4)$ | $(1, 0)$ | $(1, 0)$ | $(2, 0)$ | $1/4$ |
| $3$ | $48$ | $(9, 9)$ | $(15, 0)$ | $(0, 15)$ | $(0, 0)$ | $0$ |
| $4$ | $384$ | $(42, 192)$ | $(45, 0)$ | $(45, 0)$ | $(60, 0)$ | $5/32$ |
| $5$ | $3840$ | $(975, 975)$ | $(945, 0)$ | $(0, 945)$ | $(0, 0)$ | $0$ |
| $6$ | $46080$ | $(7650, 23040)$ | $(4995, 0)$ | $(4995, 0)$ | $(5400, 0)$ | $15/128$ |

### 24.4.1.4 帕德与凯莱有理算子不动点及有限代数次数障碍 {#sec-ch24-4-1-4-pade-cayley-degree-obstruction}

最后，把多阶有理函数近似也放回整系数多项式框架下，与 [§24.4.1.1](#sec-ch24-4-1-1-taylor-truncation-fixed-points) 的偶次泰勒截断以及 [@rem-banach-dottie-hairy-ball-literature] 第 2 条的超越性障碍并排审视。余弦的对角帕德逼近（G. A. Baker Jr. & P. Graves-Morris，*Padé Approximants*，2nd ed.，1996，Chapter 1，[10.1017/CBO9780511530074](https://doi.org/10.1017/CBO9780511530074)）给出两条纯有理替代算子：

$$
\begin{aligned}
R_{2,2}(x) &= \frac{12 - 5x^2}{12 + x^2}, & \cos x - R_{2,2}(x) &= +\frac{x^6}{480} + O(x^8), \\
R_{4,4}(x) &= \frac{15120 - 6900x^2 + 313x^4}{15120 + 660x^2 + 13x^4}, & \cos x - R_{4,4}(x) &= -\frac{59\,x^{10}}{152409600} + O(x^{12}).
\end{aligned}
$$

两式分母在 $[0, 1]$ 上恒正，不动点方程去分母后分别化为本原整系数多项式 $P_{2,2}(x) = x^3 + 5x^2 + 12x - 12$ 与 $P_{4,4}(x) = 13x^5 - 313x^4 + 660x^3 + 6900x^2 + 15120x - 15120$。两者在 $[0, 1]$ 上导数恒正（对 $P_{4,4}'$，因 $1980x^2 - 1252x^3 \ge 728x^2$ 而其余项非负且常数项为 $15120 > 0$），且在端点 $0$ 与 $1$ 处异号，故在 $(0, 1)$ 内各自有唯一实根 $r_{2,2}$ 与 $r_{4,4}$。

按模素数拉宾判据，$P_{2,2}$ 在 $p = 7$ 下不可约，$P_{4,4}$ 在 $p = 29$ 下不可约，故 $r_{2,2}$ 与 $r_{4,4}$ 分别是精确三次与五次代数数。数值上，$r_{2,2}$（四舍五入为 $0.738896$，误差 $-1.892 \times 10^{-4}$）相对二次泰勒根 $q_1$ 满足绝对误差比 $\lvert q_1 - \theta^*\rvert / \lvert r_{2,2} - \theta^*\rvert > 37$；$r_{4,4}$（四舍五入为 $0.739085144$，误差 $+1.081 \times 10^{-8}$）相对六次泰勒根 $q_3$ 满足绝对误差比 $\lvert q_3 - \theta^*\rvert / \lvert r_{4,4} - \theta^*\rvert > 121$，仅以五次代数数就逼近八次泰勒根 $q_4$ 的量级。

在主支角域 $\theta \in (-\pi, \pi)$（尤其 $\theta \in [0, 1]$）上引入半角有理参数 $t = \tan(\theta/2)$，圆上的余弦便可精确写作凯莱有理式 $\cos\theta = \frac{1 - t^2}{1 + t^2}$。与此同时，弧角本身满足 $\theta = 2\arctan t$，在不动点处给出 $t^* = \tan(\theta^*/2)$（四舍五入为 $0.387337$）。

将 $2\arctan t$ 替换为它在原点处的一阶线性近似 $2t$，方程 $\frac{1 - t^2}{1 + t^2} = 2t$ 化为三次整多项式 $2t^3 + t^2 + 2t - 1 = 0$（模 $p = 3$ 不可约）；若直接令有理余弦等于斜率参数自身 $\frac{1 - t^2}{1 + t^2} = t$，方程化为 $t^3 + t^2 + t - 1 = 0$（模 $p = 3$ 不可约）。两条三次多项式在 $[0, 1]$ 上的导数分别为 $6t^2 + 2t + 2 > 0$ 与 $3t^2 + 2t + 1 > 0$，在 $t = 0$ 处均取 $-1 < 0$，在 $t = 1$ 处分别取 $+4 > 0$ 与 $+2 > 0$，故各自在 $(0, 1)$ 内有唯一实根：前者给出 $t_c$（$0.376086$）与 $2t_c \approx 0.752172$（相对 $\theta^*$ 偏高 $+0.013087$），后者唯一正实根经 $t = 1/\tau$ 恰为三波那契常数 $\tau > 1$（满足 $\tau^3 = \tau^2 + \tau + 1$，$\tau \approx 1.839287$）的倒数 $1/\tau \approx 0.543689$。

尽管 [§24.4.1.1](#sec-ch24-4-1-1-taylor-truncation-fixed-points) 的偶次泰勒族可将逼近误差压低至任意给定正容差（且上文计算的两个对角帕德模型在对比 $q_1$ 与 $q_3$ 时显著降低了低次误差），由林德曼定理（F. Lindemann，*Ueber die Zahl π*，1882，pp. 213–225，[10.1007/BF01446522](https://doi.org/10.1007/BF01446522)；系统表述见 A. Baker，*Transcendental Number Theory*，1975，Chapter 1，[10.1017/CBO9780511565977](https://doi.org/10.1017/CBO9780511565977)；Dottie 数综述见 S. R. Kaplan，*The Dottie Number*，2007，pp. 73–74，[10.1080/0025570X.2007.11953455](https://doi.org/10.1080/0025570X.2007.11953455)），$\theta^*$ 仍是超越数；又因 $\theta^* = \frac{1 - (t^*)^2}{1 + (t^*)^2}$ 是 $t^*$ 的有理函数，半角斜率 $t^*$ 亦必超越。于是任何非恒等、带有理系数的有限次多项式或有理替代算子（在极点外）都将实不动点锁在有界次数的代数数内，而精确不动点 $\theta^*$ 逃逸出一切有限代数次数，却始终被递增阶次的纯有理异号区间严密夹逼。

**证据边界与配套档案（`ARGUED` / `NUM`）。** 上述偶次泰勒截断根的存在唯一性、严格交替包络与误差比极限、纯有理不变区间与 $S_5$ 利普希茨上界认证、有理正交群互反特征方程与超八面体群 $B_m$ 负偶循环指数生成函数，以及帕德与凯莱不动点多项式的单调隔离和 $t^*$ 超越推论均由本小节书面论证（`ARGUED`）确立。经典分析、超越数论、帕德逼近与考克斯特群背景援引上列文献；[§24.4.1.2](#sec-ch24-4-1-2-purely-rational-contraction) 所引 `trureturing` 声明 [`cos_iterate_tendsto`](lean:D5/S3/Analytic/PowerSeries/DottieIteration.cos_iterate_tendsto) 则形式化了自第 $2$ 步起以 $\sin 1$ 为公比的实初值几何界，以及渐近比 $-\sin\theta^*$（针对始终不经过不动点 $\theta^*$ 的轨道）。

配套的计算复核证据分为 Python 数值核验与独立 Lean 辅助校验两部分，均不计入本书所钉 `trureturing` 账本的定理计数。其中，Python 脚本生成了 $147$ 组在 $256$ 位与 $320$ 位工作精度下严格嵌套的 Arb 区间包络、十条整多项式的模素数拉宾不可约证书，以及 $B_1$ 至 $B_6$ 全部 $50362$ 个带号置换矩阵的穷举分类表。上述全部结果连同独立 Lean 辅助校验均作为 `NUM` 证据由 `loning` 存于[议题 #1220](https://github.com/the-omega-institute/trureturing-books/issues/1220) 关联的[固化校验档案](https://gist.github.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/2261bcfb45d14c617134a56a8d484c2e40a36d70)：

- `cycle20_dottie_taylor_octahedral_check`（[`dottie_taylor_octahedral_check.lean`](https://gist.githubusercontent.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/raw/2261bcfb45d14c617134a56a8d484c2e40a36d70/dottie_taylor_octahedral_check.lean)）：无显式导入的独立 Lean 辅助声明，核验中区间与窄区间的有理压缩证书、九条多项式不可约与隔离证书及 $B_1$ 至 $B_4$ 全部 $442$ 个矩阵；
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/raw/2261bcfb45d14c617134a56a8d484c2e40a36d70/SHA256SUMS)：SHA-256 为 `3ce7349ee4cf92ebc27b3a00f09e9dd63162f741d1e48a568606bfc906281d47`。

至此有限代数框架与纯有理压缩认证皆已收束；关于迭代在 $\theta^*$ 附近的真实局部收缩率、牛顿二次加速及连分数渐近分数的残差宽度，将在 [§24.5](ch24-s05-convergence-and-acceleration.md#sec-ch24-5) 进一步展开。
