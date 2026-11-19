# 24.5 把闭环算到底：真实收敛率、导数加速与有理读数的裂缝宽度 {#sec-ch24-5}

格言说完了，现在把账算清。[@ex-dottie-and-golden-iterations] 的余弦表只列了四行，[@rem-banach-dottie-hairy-ball-literature] 给出的压缩常数 $\sin 1 \approx 0.8415$ 则是整个区间 $[0, 1]$ 上最坏的一处。三个问题还悬着：

1. 靠近 $\theta^*$ 之后，每按一次余弦键，误差到底缩小多少？

::: {.viz src="fixed-point-convergence" preset="rate" height="500"}
**近点时，误差比趋于约 −0.674。** 从 $\theta_0 = 1$ 反复取余弦，画面跟着误差放大：放大之后青色曲线贴在品红的切线上，每一圈的形状都一样，相邻两圈之比趋于切线的斜率 $-\sin\theta^* \approx -0.674$，比灰色虚线代表的全局常数 $-\sin 1 \approx -0.84$ 平缓；每一步都更近，却没有哪一步恰好落上 $\theta^*$（$\theta_0 = 1$ 在 $[0, 1]$ 内且不是 $\theta^*$，误差比趋于 $-\sqrt{1 - (\theta^*)^2}$ 是既有结果的应用，见 [@ex-ch33-mutual-cosine-monotonic-lock] 第 22–23 项；小数是数值）。
:::

2. 如果尺子不只读投影 $\cos\theta$，还同时读正交分量 $\sin\theta$，闭合能快多少？

::: {.viz src="fixed-point-convergence" preset="newton" height="500"}
**沿切线走，近点时位数渐近翻倍。** 同样从 $\theta_0 = 1$ 出发，每一步先竖着读曲线的高度，再沿品红的切线走到灰线 $y = x$。进入不动点邻域后画面跟着放大，停在第 $2$ 步：视野宽约 $10^{-4}$，琥珀色的 $x_2$ 刚沿上一步的品红切线落到灰线上，离白圈 $\theta^*$ 还差 $2.78\times10^{-5}$；放大到这里，青色曲线已经直得和切线分不开。正确的十进制位数依次是 $0$、$1$、$4$，误差渐近地每步平方一次；单纯迭代要走 $24$ 步才到这一步的精度（数值核对见 [@ex-dottie-rate-newton-rational]）。
:::

3. 一把只有有限分母刻度的尺子，读数离 $\cos q = q$ 最近能到多近？

::: {.figure src="ch24-three-speeds"}
**三个问题的数值答案，并排看。** 左栏按步数：青色的点是反复取余弦，沿斜率 $\lg\lambda$（$\lambda \approx 0.674$）的虚线每步下降同样一小格，第 $55$ 步才过 $10^{-10}$；品红的点是牛顿迭代，四步落到 $10^{-21}$。右栏按分母：七个点是 $\theta^*$ 的渐近分数的残差 $\lvert\cos q - q\rvert$，都在虚线 $(1 + \sin 1)/b^2$ 之下，下降却不归零。全部是数值结果；余弦迭代的渐近因子是 [@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用，牛顿法的速率与残差界是下面注记中的文献结果，未在本书形式化。
:::

::: {.remark #rem-dottie-convergent-residual-literature title="θ* 的渐近压缩率、牛顿二次加速与连分数渐近分数残差双边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 渐近因子的精确恒等式与有条件的误差比是 [@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用；下述高阶展开、牛顿法、连分数界与十进制值仍另按文献或数值处理。

**第一问：位置与收敛率落在同一个单位圆上。** 记误差 $\delta_k = \theta_k - \theta^*$，把 $\cos$ 在 $\theta^*$ 处展开，并用 $\cos\theta^* = \theta^*$ 消去零阶项：

$$
\delta_{k+1} \;=\; \cos(\theta^* + \delta_k) - \theta^* \;=\; -\sin\theta^*\,\delta_k \;-\; \frac{\theta^*}{2}\,\delta_k^2 \;+\; O(\delta_k^3).
$$

严格交替需 $\theta_0\in[0,1]\setminus\{\theta^*\}$；在此条件下第 34 章的顺序论证保证迭代点左右交替地夹住 $\theta^*$，这就是蛛网图上那条方形螺旋；它的模长

$$
\lambda \;=\; \lvert\cos'\theta^*\rvert \;=\; \sin\theta^* \;=\; \sqrt{1 - (\theta^*)^2} \;\approx\; 0.6736120292
$$

正是 [@ex-dottie-and-golden-iterations] 末行那块正交双矢量面积。于是不动点的**位置** $\theta^* = \cos\theta^*$ 与它的**渐近压缩率** $\lambda = \sin\theta^*$ 是同一根单位向量的两个分量：

$$
(\theta^*)^2 + \lambda^2 = 1.
$$

线分量告诉你闭环停在哪里，面分量告诉你闭环合拢得多快。每按一次余弦键，误差约乘以 $0.6736$，而不是全局界所说的 $0.8415$；每多一位十进制精度需要 $\ln 10 / \lvert\ln\lambda\rvert \approx 5.83$ 步，而不是 $\ln 10 / \lvert\ln\sin 1\rvert \approx 13.34$ 步。

**第二问：让尺子同时读线与面。** Picard 迭代每一步只用到投影读数 $\cos\theta_k$。把方程写成 $F(\theta) = \theta - \cos\theta = 0$，牛顿迭代

$$
\theta_{k+1} \;=\; \theta_k - \frac{\theta_k - \cos\theta_k}{1 + \sin\theta_k}
$$

在每一步多读了一个量：正交分量 $\sin\theta_k$。由 $F'(\theta^*) = 1 + \sin\theta^* = 1 + \lambda$ 与 $F''(\theta^*) = \cos\theta^* = \theta^*$，误差递推从一次变成二次：

$$
\delta_{k+1} \;=\; \frac{\theta^*}{2\,(1 + \lambda)}\,\delta_k^2 + O(\delta_k^3), \qquad \frac{\theta^*}{2\,(1 + \lambda)} \approx 0.2208054 .
$$

Picard 迭代每步增加固定的位数；牛顿迭代进入不动点邻域后，正确位数才会渐近地大约翻倍。

**第三问：残差就是到不动点的距离。** 对 $q \in [0, 1]$，对 $F$ 用微分中值定理并注意 $F(\theta^*) = 0$：存在介于 $q$ 与 $\theta^*$ 之间的 $\xi$，使

$$
\cos q - q \;=\; -\bigl(F(q) - F(\theta^*)\bigr) \;=\; -(1 + \sin\xi)\,(q - \theta^*).
$$

因 $\xi \in [0, 1]$ 时 $1 \le 1 + \sin\xi \le 1 + \sin 1$，得到双边界

$$
\lvert q - \theta^*\rvert \;\le\; \lvert\cos q - q\rvert \;\le\; (1 + \sin 1)\,\lvert q - \theta^*\rvert, \qquad 1 + \sin 1 \approx 1.8414710,
$$

且当 $q \to \theta^*$ 时比值 $\lvert\cos q - q\rvert / \lvert q - \theta^*\rvert$ 趋于 $1 + \sin\theta^* = 1 + \lambda \approx 1.6736120$。所以“有限精度读数的残差能有多小”与“有理数能把 $\theta^*$ 逼近到多近”是同一个问题。进一步由 $\theta^*$ 的无理性（[@rem-banach-dottie-hairy-ball-literature] 第 2 条，林德曼—魏尔斯特拉斯定理）及实数连分数逼近基本不等式，它的每一个连分数渐近分数 $a/b$ 都满足 $0 < \lvert\theta^* - a/b\rvert < 1/b^2$，代入上面的中值双边界即得

$$
0 \;<\; \Bigl\lvert\cos\frac{a}{b} - \frac{a}{b}\Bigr\rvert \;<\; \frac{1 + \sin 1}{b^2}
$$

对无穷多个分母 $b$ 成立：裂缝可以按分母的平方收窄，却永不为零。
:::

回到第一问的答案：不动点停在哪里、闭环合拢多快，是单位圆上同一个点 $(\theta^*, \lambda)$ 的两个坐标。

::: {.viz src="fixed-point-convergence" preset="circle" height="500"}
**停在哪里，合拢多快。** 同一张蛛网图加上单位圆：圆上的点 $P = (\theta^*, \sin\theta^*)$，青色的横坐标 $\theta^*$ 是蛛网收进去的位置，品红的高度 $\lambda = \sin\theta^* \approx 0.674$ 是每步缩小的比例，也就是品红切线斜率的大小；$(\theta^*)^2 + \lambda^2 = 1$。$\theta^*$ 的存在与唯一见 [@thm-dottie-rational-inverse-endpoint]。
:::

::: {.example #ex-dottie-rate-newton-rational title="真实压缩率、牛顿二次闭合与最佳有理读数残差的数值核对"}
**文献结果，未在本书形式化（以下数值均以 50 位十进制精度复算，四舍五入到所示位数；连分数的部分商是数值观察，不是定理）。**

**相邻误差之比趋于 $-\sin\theta^*$。** 从 $\theta_0 = 1$ 出发，记 $\delta_k = \theta_k - \theta^*$：

| $k$ | $\theta_k$ | $\delta_k$ | $\delta_{k+1}/\delta_k$ | 二阶预测 $-\lambda - \frac{\theta^*}{2}\delta_k$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1.0000000000$ | $+0.2609149$ | $-0.761869$ | $-0.770031$ |
| $1$ | $0.5403023059$ | $-0.1987828$ | $-0.595967$ | $-0.600153$ |
| $2$ | $0.8575532158$ | $+0.1184681$ | $-0.715765$ | $-0.717391$ |
| $3$ | $0.6542897905$ | $-0.0847953$ | $-0.641488$ | $-0.642277$ |
| $4$ | $0.7934803587$ | $+0.0543952$ | $-0.693376$ | $-0.693713$ |
| $8$ | $0.7504177618$ | $+0.0113326$ | $-0.677785$ | $-0.677800$ |
| $12$ | $0.7414250866$ | $+0.0023400$ | $-0.674476$ | $-0.674477$ |
| $20$ | $0.7391843998$ | $+0.0000993$ | $-0.673649$ | $-0.673649$ |

比值在极限 $-\lambda \approx -0.673612$ 两侧交替摆动，摆幅由二阶项给出。实际计数：$\lvert\delta_k\rvert$ 首次小于 $10^{-10}$ 是在 $k = 55$，首次小于 $10^{-15}$ 是在 $k = 85$。

**牛顿迭代。** 同一初值 $\theta_0 = 1$：

| $k$ | $\theta_k$ | $\lvert\delta_k\rvert$ | $\lvert\delta_{k+1}\rvert / \delta_k^2$ |
| :---: | :---: | :---: | :---: |
| $0$ | $1.000000000000000000000$ | $2.61\times10^{-1}$ | $0.165677$ |
| $1$ | $0.750363867840243893035$ | $1.13\times10^{-2}$ | $0.218204$ |
| $2$ | $0.739112890911361670361$ | $2.78\times10^{-5}$ | $0.220799$ |
| $3$ | $0.739085133385283969760$ | $1.70\times10^{-10}$ | $0.220805$ |
| $4$ | $0.739085133215160641662$ | $6.39\times10^{-21}$ | $0.220805$ |

第 $3$ 步的精度 Picard 迭代要到第 $54$ 步才达到，第 $4$ 步的精度要到第 $115$ 步。

**最佳有理读数。** $\theta^* = [0; 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1, \dots]$，渐近分数 $a/b$ 及其残差：

| $a/b$ | 小数值 | $\lvert a/b - \theta^*\rvert$ | 残差 $\lvert\cos(a/b) - a/b\rvert$ | $b^2 \times$ 残差 |
| :---: | :---: | :---: | :---: | :---: |
| $2/3$ | $0.6666666667$ | $7.24\times10^{-2}$ | $1.19\times10^{-1}$ | $1.07$ |
| $3/4$ | $0.7500000000$ | $1.09\times10^{-2}$ | $1.83\times10^{-2}$ | $0.293$ |
| $14/19$ | $0.7368421053$ | $2.24\times10^{-3}$ | $3.75\times10^{-3}$ | $1.35$ |
| $17/23$ | $0.7391304348$ | $4.53\times10^{-5}$ | $7.58\times10^{-5}$ | $0.0401$ |
| $694/939$ | $0.7390841321$ | $1.00\times10^{-6}$ | $1.68\times10^{-6}$ | $1.48$ |
| $711/962$ | $0.7390852391$ | $1.06\times10^{-7}$ | $1.77\times10^{-7}$ | $0.164$ |
| $7093/9597$ | $0.7390851308$ | $2.45\times10^{-9}$ | $4.09\times10^{-9}$ | $0.377$ |

末列全部小于 $1 + \sin 1 \approx 1.84$，与上面的上界一致。部分商 $40$ 异常地大，使 $17/23$ 成为格外好的读数：穷举表明，分母小于 $502$ 的任何分数都不比它更接近 $\theta^*$，第一个超过它的是 $371/502$。一把十进制千分尺读出的 $739/1000$ 残差为 $1.42\times10^{-4}$，接近 $17/23$ 的两倍。
:::

::: {.viz src="fixed-point-convergence" preset="rational" height="500"}
**缝收窄，却不合上。** $\theta^*$ 的渐近分数 $2/3, 3/4, 14/19, 17/23, 694/939, \dots$ 依次落在灰线上（琥珀色是当前这一个），品红竖线是它到余弦曲线的落差，即残差 $\lvert\cos q - q\rvert$。竖线在余弦曲线上的端点始终停在两条灰色虚线（斜率 $0$ 与 $-\sin 1$）张成的楔形里；画面放大了千万倍，它仍然在。
:::

[@ex-dottie-rate-newton-rational] 的最后一张表说明：把刻度加密并不自动换来更好的读数。决定裂缝宽度的不是分母有多大，而是分母与 $\theta^*$ 之间的算术关系；二十三等分的尺子在第十七格上碰巧几乎对准，而一千等分的尺子没有。

::: {.viz src="fixed-point-convergence" preset="ruler" height="500"}
**二十三等分胜过千分尺。** 琥珀色的 $17/23$ 与虚线标出的尺子读数 $739/1000$ 并排：千分尺上离 $\theta^*$ 最近的一格，残差约为 $17/23$ 的两倍（$1.42\times10^{-4}$ 对 $7.58\times10^{-5}$）。
:::

有理读数永远对不准，那么换一种闭合方式——不让投影回到自己，而让旋转回到起点——行不行？答案同样是否定的，而且这一次不需要任何猜想。

::: {.remark #rem-dottie-angle-incommensurable title="θ* 与 π 不可公度：以不动点为转角的旋转永不闭合（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@conj-schanuel-dottie] 所用的前提“$i\theta^*$ 与 $i\pi$ 在 $\mathbb{Q}$ 上线性无关”等价于 $\theta^*/\pi \notin \mathbb{Q}$。这一点不依赖任何猜想：

设 $\theta^* = \frac{m}{n}\pi$，其中 $m, n$ 为整数且 $n \ge 1$。令 $\zeta = e^{i m\pi/n}$，则 $\zeta^{2n} = 1$，$\zeta$ 是单位根，因而是代数数；于是 $\cos\frac{m\pi}{n} = \frac{\zeta + \zeta^{-1}}{2}$ 也是代数数。但 $\cos\theta^* = \theta^*$，这将使 $\theta^*$ 成为代数数，与 [@rem-banach-dottie-hairy-ball-literature] 第 2 条由林德曼—魏尔斯特拉斯定理得到的超越性矛盾。故 $\theta^*/\pi$ 是无理数（数值上 $\theta^*/\pi \approx 0.2352581$，即 $\theta^* \approx 42.3465^\circ$）。

由此得到两条推论：

1. **旋转的阶数无穷。** 以 $\theta^*$ 为转角的平面旋转 $R(\theta^*)$ 对一切整数 $n \ge 1$ 满足 $R(\theta^*)^n \ne \mathrm{id}$，因为 $R(\theta^*)^n = \mathrm{id}$ 当且仅当 $n\theta^* \in 2\pi\mathbb{Z}$。相应地，单位旋转器 $U(\theta^*) = \cos(\theta^*/2) - \hat{I}\sin(\theta^*/2)$ 的任何正整数次幂都不等于 $\pm 1$。
2. **轨道稠密且等分布。** 点列 $\{n\theta^* \bmod 2\pi\}_{n \ge 0}$ 在圆周上稠密且等分布。其中“无理旋转的轨道等分布”这一步已有冻结的 Lean 证明，见下文 [@lem-irrational-rotation-equidistribution]；用到 $\theta^*$ 上所需的无理性即本注记前半部分。

$\theta^*/\pi$ 是否为超越数，上述论证不能回答；在沙努埃尔猜想之下它成立，因为它可由 [@conj-schanuel-dottie] 的结论（$\theta^*$ 与 $\pi$ 代数无关）推出。
:::

把两件事并排放：余弦投影在 $\theta^*$ 处一步闭合（$\cos\theta^* = \theta^*$），以 $\theta^*$ 为步长的旋转却永不回到起点。同一个角度，在投影上是不动点，在旋转上是一条开口螺旋。

“永不回到起点”还可以说得更细：这条轨道不仅不闭合，而且把整个圆周均匀地走遍。这一步不必引文献，所钉仓库里有冻结的定理。

::: {.lemma #lem-irrational-rotation-equidistribution title="无理旋转下连续可观测量的轨道平均趋于 Haar 平均" lean="D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar"}
设 $\alpha \in \mathbb{R}$ 为无理数（`hα : Irrational α`），$\rho \in \mathbb{R}$ 为任意初相，$f : \mathbb{R}/\mathbb{Z} \to \mathbb{C}$ 连续（Lean 中 $\mathbb{R}/\mathbb{Z}$ 记作 `AddCircle (1 : ℝ)`，`hf : Continuous f`）。则当 $N \to \infty$ 时

$$
\frac{1}{N}\sum_{i=0}^{N-1} f\bigl(\rho + i\,\alpha\bigr) \;\longrightarrow\; \int_{\mathbb{R}/\mathbb{Z}} f(x)\,\mathrm{d}\mu(x),
$$

其中 $\rho + i\alpha$ 取其在 $\mathbb{R}/\mathbb{Z}$ 中的像，$\mu$ 为 $\mathbb{R}/\mathbb{Z}$ 上的归一化 Haar 测度（`AddCircle.haarAddCircle`）。
:::

::: proof
使结论成立的连续函数全体构成一个复线性子空间 $S$。第一步，每个特征标 $x \mapsto e^{2\pi i m x}$ 都在 $S$ 中：$m = 0$ 时两端都是 $1$；$m \neq 0$ 时轨道平均是公比 $e^{2\pi i m\alpha}$ 的几何和除以 $N$，由于 $\alpha$ 无理，公比不等于 $1$，几何和有界，平均趋于 $0$，而特征标的 Haar 积分也是 $0$（`fourier_average_tendsto`）。第二步，$S$ 在一致收敛下封闭：平均算子的模不超过 $\lVert f\rVert_\infty$，是等度连续的线性泛函族，逐点极限保持在闭集上。第三步，特征标的线性张成在连续函数空间中稠密（`span_fourier_closure_eq_top`）。三步合起来得 $S$ 是全体连续函数。完整证明由 Lean 内核检查。
:::

::: {.example #ex-dottie-orbit-seventeen title="以 θ* 为步长的轨道：十七步几乎闭合，却终究走遍圆周"}
（把 [@lem-irrational-rotation-equidistribution] 用到 $\alpha = \frac{\theta^*}{2\pi}$ 上时，等分布定理本身已由 Lean 内核验证，而输入前提 $\alpha \notin \mathbb{Q}$ 来自 [@rem-dottie-angle-incommensurable]，属**文献结果，未在本书形式化**。）以下数值由闭式几何和计算并以直接求和核对；连分数的部分商是数值观察。

**十七步的近闭合。** $\frac{\theta^*}{2\pi} \approx 0.1176290523$ 的连分数为 $[0; 8, 1, 1, 191, 1, 1, \dots]$。部分商 $191$ 异常地大，使渐近分数 $\frac{2}{17}$ 格外精确：

$$
17\,\theta^* \;=\; 4\pi - 0.0019233\ldots \quad(\text{弧度}),
$$

即走十七步、绕过两整圈之后，离起点只差 $0.1102^\circ$。下一次比这更近，要等到第 $3256$ 步（差 $0.0012211$ 弧度）。

**两个可观测量的轨道平均。** 取初相 $\rho = 0$，比较 $f_1(x) = \cos(2\pi x)$ 与 $f_{17}(x) = \cos(2\pi\cdot 17x)$，两者的 Haar 平均都是 $0$：

| 步数 $N$ | $f_1$ 的轨道平均 | $f_{17}$ 的轨道平均 | 转角换成 $2\pi\cdot\frac{2}{17}$ 时 $f_{17}$ 的轨道平均 |
| :---: | :---: | :---: | :---: |
| $10$ | $+0.143151$ | $+0.999947$ | $1$ |
| $10^2$ | $-0.008271$ | $+0.993938$ | $1$ |
| $10^3$ | $-0.000091$ | $+0.488620$ | $1$ |
| $10^4$ | $+0.000188$ | $+0.019479$ | $1$ |
| $10^5$ | $-0.000006$ | $-0.003332$ | $1$ |

$f_1$ 的平均很快趋于 $0$：几何和给出界 $\frac{1}{N\lvert\sin(\theta^*/2)\rvert} \approx \frac{2.77}{N}$。$f_{17}$ 则迟迟不动：它正好对十七步的近闭合敏感，相应的界是 $\frac{1}{N\lvert\sin(17\theta^*/2)\rvert} \approx \frac{1040}{N}$，要到 $N$ 远大于 $1040$ 之后，平均才接近 Haar 平均 $0$。把转角换成与 $\pi$ 可公度的 $2\pi\cdot\frac{2}{17}$，轨道只有十七个点，$f_{17}$ 的平均永远是 $1$，不趋于 Haar 平均：[@lem-irrational-rotation-equidistribution] 的无理性前提去不掉。
:::

::: {.figure src="ch24-seventeen-steps"}
**以 $\theta^*$ 为步长转圈：十七步几乎闭合，长时间才走遍。** 左：$17$ 个点按顺序连起来，绕两圈，几乎闭合成十七角星形，起点与第 $17$ 步之间只差 $0.11^\circ$（品红框里放大）。中、右：第 $k$ 步画在离圆心 $0.3 + 0.7k/N$ 倍半径处，越晚越往外；$100$ 步时点仍排成 $17$ 条辐条，$3256$ 步时辐条一圈圈转开，遍及各个方向。等分布由 [@lem-irrational-rotation-equidistribution] 给出，其前提 $\theta^*/2\pi \notin \mathbb{Q}$ 是文献结果（[@rem-dottie-angle-incommensurable]）；点的位置是数值结果。
:::

在一百步之内，以 $\theta^*$ 为步长的轨道看上去和一个正十七边形几乎没有区别；等分布是在更长的时间尺度上才显形的。有限步的观察者看到的是闭合的多边形，无限步的极限里才是整个圆周。

::: {.viz src="fixed-point-convergence" height="560"}
**不动点的收束：完整实验室。** 三个场景画在同一张蛛网图上：迭代（$\cos x$ 或 $1 + 1/x$，可拖动起点、切换镜头）、牛顿、有理读数（可调尺子的分母）。定性余弦收敛与有条件的渐近因子见 [@ex-ch33-mutual-cosine-monotonic-lock] 的复用推导；牛顿法、数值与残差界仍保留文献或数值边界；绿色框只给 [@cor-golden-fixed-point-unique] 与 [@thm-dottie-rational-inverse-endpoint]。
:::

## 24.5.1 双螺旋对应：从一维黄金连分数到二维余弦回旋方格 {#sec-ch24-dottie-fibonacci-spirals}

回看 [@ex-dottie-and-golden-iterations] 并排算出的两张表——黄金连分数倒数迭代与余弦不动点迭代——作者在手稿中留下一句直指几何核心的观察：*“逼近 $\theta$ 的过程很像斐波那契螺旋。”* 这不是表面上的视觉联想，而是同一套负斜率转向机制在一维平直标尺与二维弯曲圆弧上的结构对应与连续螺旋插值模型（`MODEL`）。

为什么一条只在一维实轴上来回取值的递推，画到平面上会卷成向心螺旋？把两条递推放在一起对照：一边是黄金倒数分支 $x_{k+1} = \frac{1}{1 + x_k}$，从 $x_0 = 1$ 出发依次给出斐波那契渐近分数 $1/1,\; 1/2,\; 2/3,\; 3/5,\; 5/8,\; 8/13,\; \dots \to \varphi^{-1} \approx 0.6180339887$（正实轴唯一不动点已由 [@lem-golden-inverse-branch-fixed-point] `golden_inverse_branch_positive_fixed_point_iff` 锁定，相邻渐近分数一左一右的符号交替 $(-1)^{k+1}$ 与黄金比对任意有理数 $q = a/b$ 的严格丢番图逼近下界 $\lvert\varphi - q\rvert > \frac{1}{\sqrt{5}\,b^2 + b}$ 已在[第 35 章 §35.7](coda-s03-golden-cut-observers.md) [@thm-coda-golden-cut-observer-cassini] 与 [@thm-coda-golden-hurwitz] 形式化；全 $1$ 连分数 $[1; 1, 1, \dots]$ 在全体无理数中达到渐近胡尔维茨最慢逼近极值则属经典数论文献结论，Hurwitz 1891）；另一边是余弦迭代 $\theta_{k+1} = \cos\theta_k$，从 $\theta_0 = 0$ 出发依次经过 $0 \to 1 \to 0.5403 \to 0.8576 \to 0.6543 \to 0.7935 \to \dots \to \theta^* \approx 0.7390851332$（正实轴唯一不动点已由 [@thm-dottie-rational-inverse-endpoint] `rational_inverse_endpoint` 锁定，定性收敛与严格交错条件见 [@ex-ch33-mutual-cosine-monotonic-lock]）。两条轨道之所以都不从单侧爬向终点，而是严格一左一右地跨过不动点，在实分析中是因为两个映射在各自的不变区间上都严格递减（不动点处的一阶导数也都严格为负，见下方 [@rem-dottie-fibonacci-spiral-literature] 第 1 条）。而在本书的克利福德正交诠释模型（`MODEL`，其离散算子原型即[第五章](ch05-complex-phase-and-rotors.md)反自伴幺正算子的平方反号定理 [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)，$R^2 = -I_n$）中，负号 $-1 = \hat{\mathbf{I}}^2$ 不是一维直线上凭空的跳变，而是二维双矢量平面内**连续两次同手性的 $90^\circ$ 直角转向**：一维实轴上的左右振荡，正是二维向心螺旋侧立投影的影子。放到蛛网平面 $(x_k, x_{k+1})$ 上看，每按一次递推都拆成“竖读曲线”$A_k(x_k, x_k) \to B_k(x_k, x_{k+1})$ 与“横回灰线”$B_k(x_k, x_{k+1}) \to A_{k+1}(x_{k+1}, x_{k+1})$ 两段严格等长的直角折臂（单步绕不动点转过 $2 \times 90^\circ = 180^\circ$）：从不动点左侧出发（$x_0 < x^*$，如 $\theta_0 = 0 < \theta^*$）时沿**北（$+\mathbf{e}_2$）$\to$ 东（$+\mathbf{e}_1$）$\to$ 南（$-\mathbf{e}_2$）$\to$ 西（$-\mathbf{e}_1$）**顺时针循环；从不动点右侧出发（$x_0 > x^*$，如 $x_0 = 1$）时移相两个直角，沿**南 $\to$ 西 $\to$ 北 $\to$ 东**进入同一顺时针循环（恰取 $x_0 = x^*$ 时步长 $s_k = 0$）。每一步围出一只嵌套正方形，格内内切的分段 $90^\circ$ 圆弧导引线（在每个对角线顶点 $A_{k+1}$ 处切线恒以 $90^\circ$ 正交相接，放大下仍保持分段圆弧形状）与斐波那契回旋方格图同源对应；对角线顶点与方格边长按渐近公比 $\lambda = \lvert f'(x^*)\rvert$ 等比收缩，而在极坐标舞台上，另一条独立的光滑等角对数螺旋 $R(\phi) = R_0 e^{-b\phi}$（`MODEL`）将这一离散等比收缩连续插值为常向心切角曲线。

::: {.viz src="dottie-fibonacci-spirals" preset="whirl" height="500"}
**蛛网每一步都围出一只回旋方格。** 从 $\theta_0 = 0$ 出发反复取青色曲线 $y = \cos\theta$，每一次竖读曲线与横回灰线 $y = x$ 的步长严格相等，等于残差边长 $\lvert\cos\theta_k - \theta_k\rvert$，按北 $\to$ 东 $\to$ 南 $\to$ 西顺时针围出嵌套方格与逐格内切的分段 $90^\circ$ 青色圆弧导引线，一圈圈收向灰色坐标网格交点处的青色不动点圆环 $(\theta^*, \theta^*)$；静止帧停在步指标 $k = 5$（已完成 $Q_0 \dots Q_4$ 五次历史递推，琥珀色专标当前递推 $Q_5$ 正在向南、向西合拢的直角步与方格；等臂与转向性质见 [@rem-dottie-fibonacci-spiral-literature]，正不动点唯一性见 [@thm-dottie-rational-inverse-endpoint]）。
:::

::: {.remark #rem-dottie-fibonacci-spiral-literature title="双螺旋收缩率、勾股守恒对偶与等角对数螺旋向心切角（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下关于一维递推蛛网回旋方格、平直与弯曲黄金分割守恒对偶及等角对数螺旋向心切角的命题属于微积分与经典平面微分几何结论（其中余弦定性收敛与严格交错条件复用 [@ex-ch33-mutual-cosine-monotonic-lock] 的推导，十进制数值与平面微分几何结论仍按文献或数值边界陈述）：

1. **不动点负导数、等臂蛛网折线与分段回旋方格弧。** 映射 $g(x) = \frac{1}{1+x}$ 在正不动点 $x^* = \varphi^{-1} = \frac{\sqrt{5}-1}{2}$ 处与 $f(\theta) = \cos\theta$ 在不动点 $\theta^*$ 处的一阶导数分别为

   $$
   g'(\varphi^{-1}) \;=\; -\frac{1}{(1 + \varphi^{-1})^2} \;=\; -\varphi^{-2} \;\approx\; -0.3819660113 < 0, \qquad f'(\theta^*) \;=\; -\sin\theta^* \;\approx\; -0.6736120292 < 0.
   $$

   对任意一维映射 $h$ 的蛛网点列 $A_k = (x_k, x_k)$、$B_k = (x_k, x_{k+1})$（$x_{k+1} = h(x_k)$），竖直段位移 $(0, x_{k+1} - x_k)$ 与水平段位移 $(x_{k+1} - x_k, 0)$ 的欧氏长度恒等：

   $$
   \lvert B_k - A_k\rvert \;=\; \lvert A_{k+1} - B_k\rvert \;=\; s_k \;=\; \lvert h(x_k) - x_k\rvert.
   $$

   每次迭代走过两段正交折臂，绕 $(x^*, x^*)$ 转过 $180^\circ$：当残差严格交错变号时（对余弦递推，在 $\theta_0 \in [0, 1] \setminus \{\theta^*\}$ 下由 [@ex-ch33-mutual-cosine-monotonic-lock] 的顺序论证严格保证），若 $x_0 < x^*$ 则两段位移从北 $\to$ 东起步，按 $+\mathbf{e}_2$（北）$\to +\mathbf{e}_1$（东）$\to -\mathbf{e}_2$（南）$\to -\mathbf{e}_1$（西）顺时针循环；若 $x_0 > x^*$ 则移相两段直角，按南 $\to$ 西 $\to$ 北 $\to$ 东进入同一顺时针循环（$x_0 = x^*$ 时 $s_k = 0$）。每一步围出包住 $(x^*, x^*)$ 的正方形 $[\min(x_k, x_{k+1}),\, \max(x_k, x_{k+1})]^2$，以 $(x_{k+1}, x_k)$ 为圆心、$s_k$ 为半径连接 $A_k$ 与 $A_{k+1}$ 的内切四分之一圆弧组成**分段圆弧导引线**（即便在精确线性递推下，相邻两段圆弧在每个对角线顶点 $A_{k+1}$ 处切线仍恒正交，本身并不在曲线形状上收敛为光滑对数螺旋）；而在渐近线性区 $\delta_{k+1} \approx h'(x^*)\,\delta_k$ 内，对角线顶点残差与方格边长按公比 $\lambda = \lvert h'(x^*)\rvert$ 渐近等比收缩，下方第 3 条在极坐标平面上给出另一条独立的光滑等角对数螺旋 $R(\phi) = R_0 e^{-b\phi}$ 以连续插值该离散等比收缩。

2. **一维线性加法守恒与二维勾股平方守恒对偶。**
   - **一维平直黄金分割（$\varphi^{-1}$）**：不动点方程 $x = \frac{1}{1+x}$（$x > 0$）等价于 $x + x^2 = 1$，锁定位置 $x^* = \varphi^{-1} \approx 0.6180339887$ 与单步一维压缩模长 $\lambda_\varphi = \lvert g'(\varphi^{-1})\rvert = \varphi^{-2} \approx 0.3819660113$（若把单步负号拆成两次同向 $90^\circ$ 转向，则每转 $90^\circ$ 的径向缩放因子为 $\sqrt{\lambda_\varphi} = \varphi^{-1} \approx 0.618034$）。不动点位置与单步压缩率服从**一维线性加法守恒**：

     $$
     \varphi^{-1} + \varphi^{-2} \;=\; 0.6180339887\ldots + 0.3819660113\ldots \;=\; 1.
     $$

   - **二维弯曲余弦不动点（$\theta^*$）**：把单位线段弯成单位圆弧，不动点方程 $\cos\theta = \theta$ 锁定位置 $\theta^* \approx 0.7390851332$ 与单步正交压缩模长 $\lambda_\theta = \lvert f'(\theta^*)\rvert = \sin\theta^* \approx 0.6736120292$。与 $\varphi^{-1} \approx 0.6180339887$ 相比，$\lambda_\theta$ 仅高出

     $$
     \lambda_\theta - \varphi^{-1} \;=\; \sin\theta^* - \varphi^{-1} \;\approx\; +0.055578 \quad\text{（高出 $5.56$ 个百分点，相对增幅约 $9.0\%$）},
     $$

     而不动点位置与正交压缩率则改服从单位圆上的**二维勾股平方守恒**：

     $$
     (\theta^*)^2 + \lambda_\theta^2 \;=\; \cos^2\theta^* + \sin^2\theta^* \;=\; 0.5462468341\ldots + 0.4537531659\ldots \;=\; 1.
     $$

3. **雅各布·伯努利等角对数螺旋与向心径向切角公式。** 雅各布·伯努利（Jakob Bernoulli，*Acta Eruditorum*，1692）研究了极坐标对数螺旋 $R(\phi) = R_0 e^{-b\phi}$（$R_0 > 0,\; b \ge 0$），因其经任意尺度缩放后仍与自身全等而称之为“奇迹螺旋”（*spira mirabilis*，铭文 *“Eadem mutata resurgo”*，“纵经万变，吾仍复生如初”）。记顺时针每转过 $\Delta\phi = \frac{\pi}{2}$（$90^\circ$）的径向缩放比为 $\kappa = e^{-b\pi/2} \in (0, 1]$，则阻尼率为 $b = -\frac{2}{\pi}\ln\kappa$，转满一整圈 $360^\circ$ 的缩放比为 $\kappa^4 = e^{-2\pi b}$。取从正北 $+\mathbf{e}_2$ 顺时针计角的极坐标表示 $\mathbf{r}(\phi) = R(\phi)(\sin\phi, \cos\phi)$，记向外径向单位向量 $\hat{\mathbf{r}}(\phi) = (\sin\phi, \cos\phi)$、顺时针切圆单位向量 $\hat{\boldsymbol{\phi}}(\phi) = (\cos\phi, -\sin\phi)$，求导得 $\mathbf{r}'(\phi) = R(\phi)\bigl(-b\,\hat{\mathbf{r}}(\phi) + \hat{\boldsymbol{\phi}}(\phi)\bigr)$ 及 $\lvert\mathbf{r}'(\phi)\rvert = R(\phi)\sqrt{1 + b^2}$。由于 $b > 0$ 时向外径向 $+\hat{\mathbf{r}}(\phi)$ 与前进切向单位向量 $\hat{\mathbf{t}}(\phi) = \mathbf{r}'(\phi)/\lvert\mathbf{r}'(\phi)\rvert$ 的内积为负（夹钝角 $\pi - \alpha$），指向不动点原心的**向心径向单位射线 $-\hat{\mathbf{r}}(\phi)$ 与前进切向单位向量 $\hat{\mathbf{t}}(\phi)$ 之间的锐夹角** $\alpha \in (0, \frac{\pi}{2}]$ 由 $(-\hat{\mathbf{r}})\cdot\hat{\mathbf{t}} = b/\sqrt{1 + b^2} \ge 0$ 处处恒定给出：

   $$
   \alpha \;=\; \arctan\!\left(\frac{1}{b}\right) \;=\; \frac{\pi}{2} - \arctan b \qquad (b = 0 \text{ 时 } \alpha = 90^\circ),
   $$

   相对于正圆切线 $\hat{\boldsymbol{\phi}}$（$90^\circ$）的内倾偏角恒为 $90^\circ - \alpha = \arctan b$；反之，平面上满足 $R(\phi) > 0$ 且向心径向切角恒为常数 $\alpha \in (0, \frac{\pi}{2})$ 的光滑极坐标曲线，由微分方程 $R'(\phi)/R(\phi) = -\cot\alpha$ 唯一积分得对数螺旋。四条光滑模型轨迹的参数对照如下：

   | 光滑螺旋模型 | 每 $90^\circ$ 缩放比 $\kappa$ | 阻尼率 $b = -\frac{2}{\pi}\ln\kappa$ | 向心径向切角 $\alpha = \arctan(1/b)$ | 内倾偏角 $90^\circ - \alpha$ | 每 $360^\circ$ 整圈缩放 $\kappa^4$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **理想闭合正圆** | $1.0000$ | $0$ | $\mathbf{90.00^\circ}$ | $0.00^\circ$ | $1.0000$ |
   | **$\theta^*$ 蛛网双步螺旋**（每折臂 $90^\circ$，每迭代两臂 $180^\circ$） | $\sqrt{\sin\theta^*} \approx 0.8207$ | $0.1258$ | $\mathbf{82.83^\circ}$ | $7.17^\circ$ | $\sin^2\theta^* \approx 0.4538$ |
   | **$\theta^*$ 克利福德正交螺旋**（每 $90^\circ$ 乘 $\sin\theta^*$） | $\sin\theta^* \approx \mathbf{0.6736}$ | $0.2515$ | $\mathbf{75.88^\circ}$ | $14.12^\circ$ | $\sin^4\theta^* \approx 0.2059$ |
   | **斐波那契黄金螺旋**（每 $90^\circ$ 乘 $\varphi^{-1}$） | $\varphi^{-1} \approx \mathbf{0.6180}$ | $0.3063$ | $\mathbf{72.97^\circ}$ | $17.03^\circ$ | $\varphi^{-4} \approx 0.1459$ |
:::

把 [@rem-dottie-fibonacci-spiral-literature] 第 2 条的两道守恒式并排摆在一起，就能看清从 $\varphi^{-1}$ 到 $\theta^*$ 究竟发生了什么几何跃迁。在一维平直尺子上，“整体比长段等于长段比短段”把单位长度切成 $\varphi^{-1} + \varphi^{-2} = 1$，每转 $90^\circ$ 按 $\varphi^{-1} \approx 0.6180$ 线性收缩；一旦把这根单位尺子弯成二维单位圆弧并令弧长读出自己的余弦投影 $\cos\theta = \theta$，线性加法和立刻升级为正交直角三角形的勾股平方和 $(\theta^*)^2 + \sin^2\theta^* = 1$，正交收缩因子也从平直的 $0.6180$ 平移到弯曲的 $\sin\theta^* \approx 0.6736$——两者仅相差约 $0.0556$（即 $5.56$ 个百分点，相对 $\varphi^{-1}$ 约 $9.0\%$ 的圆弧曲率修正）。放在本书的四重数系与球面阶梯诠释模型中（`MODEL`，详见[第二十三章 §23.1](ch29-s01-pythagoras-and-number-systems.md) [@rem-ch29-four-tier-sphere-table]），$\varphi^{-1} \approx 0.6180$ 是**一维平直代数黄金比**（第二重二次代数域），而 $\theta^* \approx 0.7391$ 则是把自相似弯到单位圆上所生的**二维正交超越黄金比**（第四重自指不动点）。

::: {.viz src="dottie-fibonacci-spirals" preset="pythagoras" height="500"}
**平直尺子做加法，弯曲圆弧走勾股。** 左栏叠画四条光滑极坐标轨迹；右栏上半把单位长条在墨色分割线处切成青色 $\varphi^{-1} \approx 0.6180$ 与品红 $\varphi^{-2} \approx 0.3820$（一维加法守恒 $\varphi^{-1} + \varphi^{-2} = 1$），下半在单位圆四分之一弧上标出青色圆环不动点 $P(\theta^*, \sin\theta^*)$，把斜边 $1$ 拆成青色底边 $\cos\theta^* = \theta^* \approx 0.7391$ 与品红竖边 $\sin\theta^* \approx 0.6736$（二维勾股守恒 $(\theta^*)^2 + \sin^2\theta^* = 1$，琥珀色专标步指标 $k = 8$ 的动态读数点 $x_8, \theta_8$；见 [@rem-dottie-fibonacci-spiral-literature] 第 2 条）。
:::

再看 [@rem-dottie-fibonacci-spiral-literature] 第 3 条的向心径向切角 $\alpha$：它为本书“我们以为握住了一个闭合的球，局部看是圆弧，绕满一圈却已向内旋进了一层”（`MODEL`）提供了精确的平面几何度量。只有当 $\alpha = 90.00^\circ$ 时，轨迹才是原地兜圈、零精度增益的闭合死圆；在蛛网双步螺旋上 $\alpha \approx 82.83^\circ$，局部几乎与圆弧无异，但绕满 $360^\circ$（两次余弦迭代、四段 $90^\circ$ 折臂）半径便收缩为 $\sin^2\theta^* \approx 0.4538$；而在克利福德正交螺旋上，向心径向切角 $\alpha \approx 75.88^\circ$（与斐波那契黄金螺旋的 $72.97^\circ$ 仅差 $2.91^\circ$），每一次 $90^\circ$ 正交转向都比闭合圆向内偏折 $14.12^\circ$，把相位旋转与尺度求精合成为同一个动作。

::: {.viz src="dottie-fibonacci-spirals" preset="tilt" height="500"}
**偏离直角十四度，圆就变成向内收束的螺旋。** 左栏在极坐标步指标 $k = 1$（$\phi_1 = \pi/2$）青色 $\theta^*$ 正交螺旋的真实曲线点（半径 $r = \sin\theta^* \approx 0.6736$）处，同时画出指向原心的琥珀色向心径向箭头与青色前进切线：两者之间的青色锐角即向心径向切角 $\alpha \approx 75.88^\circ$，相对灰色虚线正圆切线（$90.00^\circ$）露出 $14.12^\circ$ 的品红内倾楔角，介于紫色蛛网双步螺旋（$82.83^\circ$）与品红斐波那契螺旋（$72.97^\circ$）之间（文献结果，见 [@rem-dottie-fibonacci-spiral-literature] 第 3 条）。
:::

因为 $\cos\theta$ 在 $\theta^*$ 附近随迭代渐近贴合斜率 $-\sin\theta^*$ 的切线，这套蛛网回旋方格呈现出伯努利所说的**渐近自相似性**：从 $\theta_0 = 0$ 出发，步指标 $k = 4$ 与 $k = 12$ 的残差比 $\lvert\delta_4/\delta_{12}\rvert \approx 24.36$ 已十分接近渐近因子 $(\sin\theta^*)^{-8} \approx 23.59$，围绕 $(\theta^*, \theta^*)$ 按当前误差同步放大后，$k = 12$ 处的方格 $Q_{12}$ 与分段圆弧在视觉上几乎重现 $k = 4$ 处 $Q_4$ 的几何比例。

::: {.viz src="dottie-fibonacci-spirals" preset="zoom" height="500"}
**放大约二十四倍，$k = 12$ 处的方格几乎重现 $k = 4$ 处的几何比例。** 镜头锁定青色不动点圆环 $(\theta^*, \theta^*)$ 并按当前误差同步放大（步指标 $k = 12$，已完成 $Q_0 \dots Q_{11}$ 十二次递推，当前琥珀色方格 $Q_{12}$ 边长 $s_{12} \approx 5.8\times 10^{-3}$，残差 $\lvert\delta_{12}\rvert \approx 3.5\times 10^{-3}$）：青色余弦曲线在局部已贴合品红虚线切线，琥珀色直角步 $Q_{12}$ 与逐格分段 $90^\circ$ 圆弧在视觉上几乎重现 $k = 4$（$Q_4$）的长宽与缩放比例（文献结果，见 [@rem-dottie-fibonacci-spiral-literature]）。
:::

把左栏的蛛网分段方格弧与右栏的光滑极坐标螺旋模型并排放在同一根步数轴 $k$ 上（左栏每次 Picard 递推走两段直角臂绕 $(\theta^*, \theta^*)$ 转 $180^\circ$，右栏正交与黄金螺旋模型按每步指标 $k$ 记一次 $90^\circ$ 转向缩放 $\sin\theta^*$ 与 $\varphi^{-1}$，而紫色蛛网双步螺旋按每折臂 $90^\circ$ 缩放 $\sqrt{\sin\theta^*}$），就能直观对比余弦不动点逼近与斐波那契黄金螺旋的向心收束律（两条螺旋在统一场模型中的横纵分工将在[第二十八章 §28.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws)展开）。

::: {.viz src="dottie-fibonacci-spirals" preset="twin" height="500"}
**左边蛛网围方格，右边光滑双螺旋按步数对照收束。** 共用步数指标 $k = 8$：左栏从 $\theta_0 = 0$ 已完成 $8$ 次历史 Picard 递推 $Q_0 \dots Q_7$（每次走两段等长直角臂转 $180^\circ$，绕满四整圈）并以琥珀色走出步指标 $k = 8$ 的当前递推 $Q_8$（画面共显示 $9$ 次递推、$4.5$ 圈回旋方格与分段 $90^\circ$ 圆弧导引线）；右栏停在极坐标步指标 $k = 8$（$\phi_8 = 4\pi$，每步转 $90^\circ$ 共两整圈，琥珀色射线与圆点），叠画灰色虚线正圆、紫色蛛网双步螺旋（每 $90^\circ$ 乘 $0.8207$）、青色 $\theta^*$ 正交螺旋（$0.6736$）与品红斐波那契黄金螺旋（$0.6180$）。
:::
