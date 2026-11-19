# 35.6.2 $K$-Bonacci 广义禁戒与皮索共轭圆盘收缩 {#sec-ch39-p2e-kbonacci}

对任意整数阶 $K \ge 2$，令 $K$-Bonacci 特征多项式为

$$
P_K(X) = X^K - \sum_{j=0}^{K-1} X^j.
$$

将 $P_K(X)$ 同乘 $(X - 1)$ 可得恒等式 $(X - 1)P_K(X) = X^{K+1} - 2X^K + 1$，因此任何满足 $x \neq 1$ 的根都等价地满足自指代数方程 $x = 2 - x^{-K}$。在实轴区间 $(1, 2)$ 内，$P_K$ 存在唯一实主根 $\beta_K = \operatorname{dbonacciPerronRoot}(K)$；而在复平面上，其余全部 $K - 1$ 个共轭根无一例外地被严格压入开单位圆盘内部：

::: {.theorem #thm-ch39-p2e-kbonacci-pisot title="K-Bonacci 特征多项式的复根定位与共轭单位圆盘收缩" lean="D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location"}
设整数阶数满足 $q \ge 2$，$z \in \mathbb{C}$ 为复系数特征多项式 $X^q - \sum_{i=0}^{q-1} X^i \in \mathbb{C}[X]$ 的任意复根。则

$$
1 \le \|z\| \iff z = \beta_q,
$$

其中 $\beta_q = \operatorname{dbonacciPerronRoot}(q)$ 为嵌入 $\mathbb{C}$ 的实佩龙主根。等价地，一切满足 $z \neq \beta_q$ 的复共轭根均严格满足 $\|z\| < 1$。
:::

::: proof
由实主根恒等式 [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow)，对一切 $q \ge 2$ 有 $2 - \beta_q = \beta_q^{-q}$，故 $\beta_q \in (1, 2)$ 且满足 $\|(\beta_q : \mathbb{C})\| = \beta_q \ge 1$（并由 [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two) 知当 $q \to \infty$ 时 $\beta_q \to 2$）。反之，设复根 $z$ 满足 $1 \le \|z\|$，将其代入辅助乘积式 $(z - 1)(z^q - \sum_{i=0}^{q-1} z^i) = z^{q+1} - 2z^q + 1 = 0$，等价改写为 $z^q(2 - z) = 1$。若 $\|z\| > 1$，一方面由 $z^q = \sum_{i=0}^{q-1} z^i$ 取三角不等式得 $\|z\|^q \le \sum_{i=0}^{q-1} \|z\|^i$，结合实特征多项式在 $(\beta_q, \infty)$ 上严格为正推出 $\|z\| \le \beta_q < 2$；另一方面由反向三角不等式及 $z^q(2 - z) = 1$ 得 $0 < 2 - \beta_q \le 2 - \|z\| \le \|2 - z\| = \|z\|^{-q}$，即 $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$。在 $(0, \infty)$ 上定义实函数 $f(t) := t - 2 + t^{-q}$：由于 $f(1) = 0$、$f(\beta_q) = 0$（因 $\beta_q^q(2 - \beta_q) = 1$），且对一切 $t > 0$ 有 $f''(t) = q(q + 1)t^{-q - 2} > 0$，故 $f$ 在 $[1, \beta_q]$ 上**严格凸**；因此任意内点 $t = (1 - \lambda)\cdot 1 + \lambda\beta_q \in (1, \beta_q)$（$0 < \lambda < 1$）均满足 $f(t) < (1 - \lambda)f(1) + \lambda f(\beta_q) = 0$，即 $2 - t > t^{-q}$，从而 $t^q(2 - t) > 1$。于是若 $1 < \|z\| < \beta_q$，必有 $\|z\|^q(2 - \|z\|) > 1$，与 $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$ 矛盾；结合 $\|z\| \le \beta_q$ 即迫使 $\|z\| = \beta_q$，再代回 $2 - \|z\| \le \|2 - z\| = \beta_q^{-q} = 2 - \beta_q$ 锁定等号 $\|2 - z\| = 2 - \|z\|$，配合 $\|z\| < 2$ 迫使 $z$ 落在正实轴上，故 $z = \|z\| = \beta_q$。若 $\|z\| = 1$，由 $2z^q = z^{q+1} + 1$ 与 $\|z^{q+1}\| = 1$ 知单位圆上两点之和模长等于 $2$ 迫使 $z^{q+1} = 1$ 进而 $z = 1$，但这与 $1^q - q = 1 - q \neq 0$（$q \ge 2$）矛盾。结合整系数与有理系数双重不可约性定理 [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible)，$P_q(X)$ 在 $\mathbb{Z}[X]$ 与 $\mathbb{Q}[X]$ 上均不可约。完整证明由 Lean 内核检查。
:::

除上述单位圆盘判据外，冻结模块还逐项锁定了 $\beta_2 = \varphi$（[`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio)）、$\beta_3 = \operatorname{tribonacciConstant}$（[`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant)）、阶数上的严格单调递增性 $\beta_2 < \beta_3 < \beta_4 < \cdots$（[`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn)）以及主根处导数非零的单根性质（[`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple)）。这组代数结论共同证明：每个 $\beta_K$（$K \ge 2$）都是次数恰为 $K$ 的皮索—维贾雅拉加万数（Pisot–Vijayaraghavan number）。双精度数值求根（`NUM`）给出前三个主根为 $\beta_2 \approx 1.618034$、$\beta_3 \approx 1.839287$、$\beta_4 \approx 1.927562$，余差 $2 - \beta_K = \beta_K^{-K}$ 渐近等价于 $2^{-K}$。需要注意，这些结论是纯粹的多项式代数与根分布定理，本身并不自动推出一般皮索替代系统的几何拼砖定理。

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="kbonacci" height="500"}
**$K$-Bonacci 皮索根谱卡（`kbonacci`）**：复平面上画出单位圆、实轴区间 $(1, 2)$ 内的青色佩龙主根 $\beta_K$，以及严格落在开单位圆盘内部的共轭根簇；品红标记标示 $1^K$ 禁戒阈值，琥珀色标出当前选定的阶数 $K$。多项式不可约与共轭根模长严格小于 $1$ 属 `LEAN ✓`，具体根坐标小数属 `NUM`。
:::

当 $K \to \infty$ 时，禁戒窗口 $1^K$ 退向无穷深处，主根 $\beta_K \nearrow 2$ 逼近最小素数基数 $2$。为了严格理解离散查表树的纵向度量结构，我们接下来审视素数幂同余读出与一般有限视界细化超度量。
