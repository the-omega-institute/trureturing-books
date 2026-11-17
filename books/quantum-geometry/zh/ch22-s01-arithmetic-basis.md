# 22.1 算术正交基与因式分解消除无穷 {#sec-ch22-1}

为什么作者在手稿中反复强调“**处理无穷问题的本质就是进行因式分解，看如何把无穷‘约掉’**”？

想象你面前摆着一个对全部自然数 $n = 1, 2, 3, \dots$ 求和的无穷级数。在加法视角下，每一项 $n^{-s}$ 都和其它无穷多项纠缠在一起，看不出谁是谁的生成元。但是，一旦我们利用“两两比较、顺序无关”的唯一素因子分解，将每一个合数 $n = p_1^{a_1} \cdots p_r^{a_r}$ 还原为它在各根素数正交轴上的独立分量乘积 $n^{-s} = p_1^{-a_1 s} \cdots p_r^{-a_r s}$，奇迹便发生了：**原本横跨所有自然数的全局无穷求和，当场分解（factorize）成了每一根独立素数轴上局部几何级数的无穷乘积！**

在每一根单独的素数轴 $p$ 上，沿着坐标刻度 $a = 0, 1, 2, 3, \dots$ 的一维求和不过是最简单的公比为 $p^{-s}$ 的等比级数（当 $\operatorname{Re}(s) > 1$ 时 $|p^{-s}| = p^{-\operatorname{Re}(s)} < 1$）：

$$
1 + p^{-s} + p^{-2s} + p^{-3s} + \cdots \;=\; \frac{1}{1 - p^{-s}} \;=\; (1 - p^{-s})^{-1}.
$$

你看，单根素数轴上的无穷多项之和 $1 + p^{-s} + p^{-2s} + \cdots$，被等比求和公式一口气“约掉”成了干净利落的单因子 $(1 - p^{-s})^{-1}$！把所有相互正交的素数轴 $p \in \mathrm{Primes}$ 乘在一起，由于乘法分配律在展开时恰好不重不漏地遍历每一个非负整数坐标向量 $(v_2, v_3, v_5, \dots)$（仅有限个坐标非零），全体自然数的狄利克雷级数便与全体素数的欧拉乘积严丝合缝地合二为一。

::: {.viz src="euler-product-sieve" preset="two" height="500"}
**一根素数轴。** 清单上只有 $2$：青色曲线是等比级数 $1 + 2^{-s} + 4^{-s} + \cdots = (1 - 2^{-s})^{-1}$，在琥珀色竖线 $s = 2$ 处等于 $\frac{4}{3}$，比墨色的 $\zeta(2)$ 低一截。下方的整数里只有 $2$ 的幂 $1, 2, 4, 8, 16, 32, 64$ 是青色，其余都是品红，第一个品红格是 $3$。
:::

为了在 Lean 4 中把这一经典桥梁铸成零歧义的形式化定理，我们首先对齐 `trureturing` 仓库中模块 `D5/S3/Weil/Convention` 所采用的黎曼 $\zeta$ 函数约定。

::: {.definition #def-classical-zeta title="黎曼 ζ 函数的形式化约定与简单极点谓词" lean="D5/S3/Weil/Convention.classicalZeta D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue"}
在复平面 $\mathbb{C}$ 上，记全函数 [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) $: \mathbb{C} \to \mathbb{C}$ 为 Mathlib 标准库中的黎曼 $\zeta$ 函数 `riemannZeta`。同时，对任意复变函数 $f : \mathbb{C} \to \mathbb{C}$、极点位置 $z \in \mathbb{C}$ 与留数 $\mathrm{residue} \in \mathbb{C}$，定义谓词 [`HasUniqueSimplePoleWithResidue`](lean:D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue) $f\ z\ \mathrm{residue}$ 为以下三项性质的合取：

1. **除极点外处处解析**：$f$ 在补集 $\{z\}^c = \mathbb{C} \setminus \{z\}$ 的开邻域上复解析（`AnalyticOnNhd ℂ f ({z}ᶜ)`）；
2. **一阶洛朗留数极限**：当 $s$ 在去心邻域滤子 $\mathcal{N}_{\neq}(z)$ 中趋近于 $z$ 时，$(s - z)f(s)$ 收敛于 $\mathrm{residue}$；
3. **非零留数**：$\mathrm{residue} \neq 0$。
:::
