# 15.4 有限周期采样与 Shor 阶重建 {#sec-shor-order-reconstruction}

将 [@prop-finite-character-cancellation] 的正交筛子应用于 $\mathrm{ZMod}\,m$ 上的任意复值函数 $f : \mathrm{ZMod}\,m \to \mathbb{C}$，便立即导出调和分析与量子周期寻找的共同枢纽——**有限泊松求和公式（Finite Poisson Summation Formula）**。

在阅读下面的推论之前，必须严格对齐源码所使用的 Mathlib 离散傅里叶变换规范：`ZMod.dft f` 定义为**带负指数且不含 $1/\sqrt{m}$ 归一化因子**的离散傅里叶变换：

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

这与物理教材中常见的正指数单位化 QFT $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ 相差一个归一化系数 $1/\sqrt{m}$ 以及指数符号 $k \leftrightarrow -k$（注意由于 $\mathrm{annihilator}(H)$ 是加法子群，$k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$，因此在对整个 $\mathrm{annihilator}(H)$ 求和时正负指数集合完全重合，但在计算单个频点的值时绝不能把两套规范混为一谈）。

- [15.4.1 实际计数分布与相位采样](ch15-s04-s01-phase-sampling.md)
- [15.4.2 连分数候选与观察事件](ch15-s04-s02-continued-fraction-candidates.md)
- [15.4.3 可执行取阶与因子证书](ch15-s04-s03-executable-order.md)
- [15.4.4 Grover、QFT 与 Shor 的完整手算](ch15-s04-s04-worked-algorithms.md)
