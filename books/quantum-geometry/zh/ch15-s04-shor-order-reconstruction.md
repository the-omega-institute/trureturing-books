# 15.4 有限周期采样与 Shor 阶重建 {#sec-shor-order-reconstruction}

将 [@prop-finite-character-cancellation] 的正交筛子应用于 $\mathrm{ZMod}\,m$ 上的任意复值函数 $f : \mathrm{ZMod}\,m \to \mathbb{C}$，便立即导出调和分析与量子周期寻找的共同枢纽——**有限泊松求和公式（Finite Poisson Summation Formula）**。

在阅读下面的推论之前，必须严格对齐源码所使用的 Mathlib 离散傅里叶变换规范：`ZMod.dft f` 定义为**带负指数且不含 $1/\sqrt{m}$ 归一化因子**的离散傅里叶变换：

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

这与物理教材中常见的正指数单位化 QFT $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ 相差一个归一化系数 $1/\sqrt{m}$ 以及指数符号 $k \leftrightarrow -k$（注意由于 $\mathrm{annihilator}(H)$ 是加法子群，$k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$，因此在对整个 $\mathrm{annihilator}(H)$ 求和时正负指数集合完全重合，但在计算单个频点的值时绝不能把两套规范混为一谈）。

当周期 $r$ 恰好整除寄存器长度 $Q$ 时，有限泊松求和公式（[@cor-finite-poisson-period]）把位置寄存器上间距为 $r$ 的稀疏梳子 $H$ 精确映成频率域中间距为 $Q/r$ 的对偶梳子 $H^\perp$：所有落在 $H^\perp$ 之外的频点相消为零，测量概率均匀集中在 $r$ 根等高峰上。在 $Q = 32$、周期 $r = 8$ 的例子里，位置梳子 $H = \{0, 8, 16, 24\}$ 只有 $4$ 格，零化子 $H^\perp = \{0, 4, 8, \dots, 28\}$ 却有 $8$ 个频率，间距是 $Q/r = 4$。

::: {.viz src="phase-gears" preset="dual" height="500"}
**峰距是 $Q/r$，不是 $r$。** $Q = 32$、周期 $r = 8$：寄存器上青色的梳子 $H = \{0, 8, 16, 24\}$ 只有 $4$ 格，间距 $8$；扫完之后谱上留下 $8$ 根等高的柱子，每根 $\frac{1}{8}$，落在 $0, 4, 8, \dots, 28$，正是 $H^\perp$ 的 $8$ 个频率，间距 $Q/r = 4$。看 $k = 4$ 时四支青色箭头全部朝右，链长 $4$；$\lvert H\rvert \cdot \lvert H^\perp\rvert = 4 \cdot 8 = 32$（[@cor-finite-poisson-period]）。例中的 $Q = 16$、$r = 4$ 恰好 $r = Q/r = 4$，两把梳子重合。
:::

而一旦周期 $r$ 不整除 $Q$，理想频率 $sQ/r$ 不再落在整数格点上，相位箭头首尾不再完全闭合，原本尖锐的峰会向邻近整数格点摊开——不过绝大部分概率仍紧抱在最靠近 $sQ/r$ 的几格之内，再用连分数展开就能从观测比值 $k/Q$ 逼近并筛出周期候选。

::: {.viz src="phase-gears" preset="leak" height="500"}
**不整除时峰摊开。** $Q = 64$、周期 $6$：品红的 $sQ/r$ 落在 $10.67$、$21.33$ 等整数之间，峰摊到相邻的格，$k = 11$ 高 $0.115$、$k = 10$ 只有 $0.026$，离 $sQ/r$ 最近的六格合计 $0.80$；琥珀色框住的 $k = 11$ 用连分数读出 $\frac{1}{6}$。本卡没有指定实际模数与底数，不能据此核对 $N^2\le Q$，所以这里的集中与读数保持教学数值演示的身份；[附录 K](appendix-k.md) 中的条件成员定理不认证本卡“取最后一个渐近分数”的读法，也不把这些条件梳子的峰高认作实际边缘概率。
:::

关于非整除情形下的精确计数边缘分布、连分数渐近分母的条件观察事件，以及可执行取阶与因子证书的全部形式化定理，完整证明收录于[附录 K](appendix-k.md)（[§K.1](ch15-s04-s01-phase-sampling.md)–[§K.3](ch15-s04-s03-executable-order.md)）。下面我们直接进入完整手算，亲手走通 Grover、QFT 与 Shor 的每一步数值演练：

- [15.4.1 Grover、QFT 与 Shor 的完整手算](ch15-s04-s04-worked-algorithms.md)
