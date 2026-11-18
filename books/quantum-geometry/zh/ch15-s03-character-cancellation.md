# 15.3 有限字符正交与非共振相消 {#sec-period-frequency-cancellation}

当第一寄存器通过模幂运算与相位反冲，把一个隐藏的周期子群 $H \le \mathrm{ZMod}\,m$（$m \in \mathbb{N}$，带 `[NeZero m]`）编码成等幅叠加态后，为什么做一次有限傅里叶变换就能把所有不属于对偶格点的杂散频率统统清零？

这就是有限阿贝尔群上最纯粹的几何干涉定律：**正交字符相消**（见图 15 面板 III）。在源码模块 `D5/S3/Fourier/FinitePoisson.lean` 中，对任意频率指标 $k \in \mathrm{ZMod}\,m$，加性特征标（character）定义为标准加性特征标 `ZMod.stdAddChar` 的平移 `character k = ZMod.stdAddChar.mulShift k`，其显式复数值为

$$
\mathrm{character}(k)(x) = \chi_k(x) = \exp\Bigl(+\frac{2\pi i k x}{m}\Bigr) \qquad (x \in \mathrm{ZMod}\,m).
$$

对 $\mathrm{ZMod}\,m$ 的任意加法子群 $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$，定义其**零化子子群（annihilator / 对偶共振子群）**为全体在 $H$ 上恒取 $+1$ 的频率集合：

$$
\mathrm{annihilator}(H) = H^\perp = \bigl\{k \in \mathrm{ZMod}\,m \;\big|\; \forall h \in H,\; \mathrm{character}(k)(h) = 1\bigr\}.
$$

（源码为 $H$、商群及 $\mathrm{annihilator}(H)$ 构造了完备的 `Fintype` 与 `DecidableEq` 实例。）现在，对任意固定位置 $x \in \mathrm{ZMod}\,m$，把落入对偶子群 $\mathrm{annihilator}(H)$ 中的所有特征标 $\mathrm{character}(k.1)(x)$ 加起来，会发生什么？下面的命题给出了非此即彼的精确 dichotomy。

::: {.proposition #prop-finite-character-cancellation title="有限零化子子群上的特征标正交相消命题" lean="D5/S3/Fourier/FinitePoisson.sum_annihilator_character"}
设 $m \in \mathbb{N}$ 且满足 `[NeZero m]`，$H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ 为 $\mathrm{ZMod}\,m$ 的任意加法子群，$x \in \mathrm{ZMod}\,m$。则对零化子子群 $\mathrm{annihilator}(H)$ 的全体元素求和恒有

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(k.1)(x) = \begin{cases} \bigl(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C}\bigr) & \text{若 } x \in H, \\ 0 & \text{若 } x \notin H. \end{cases}
$$
:::

::: proof
分两种情形讨论：

1. **共振情形（$x \in H$）**：对每个 $k \in \mathrm{annihilator}(H)$，由零化子的定义直接有 $\mathrm{character}(k.1)(x) = 1$。将常数 $1$ 在有限类型 $\mathrm{annihilator}(H)$ 上求和，结果恰为其基数 $(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C})$。
2. **非共振情形（$x \notin H$）**：映射 $k \mapsto \mathrm{character}(k.1)(x)$ 构成有限加法群 $\mathrm{annihilator}(H)$ 到复数乘法群 $\mathbb{C}^\times$ 的群同态。由有限循环群 $\mathrm{ZMod}\,m$ 上的对偶性（若 $x \notin H$，则存在 $k_0 \in \mathrm{annihilator}(H)$ 使得 $\mathrm{character}(k_0.1)(x) \neq 1$），在有限群 $\mathrm{annihilator}(H)$ 上对求和指标作平移双射 $k \mapsto k + k_0$，和式 $S = \sum_{k} \mathrm{character}(k.1)(x)$ 满足 $\mathrm{character}(k_0.1)(x) \cdot S = S$。移项得 $(\mathrm{character}(k_0.1)(x) - 1)S = 0$；因 $\mathrm{character}(k_0.1)(x) \neq 1$，必有 $S = 0$。完整证明由 Lean 内核检查。
:::

[@prop-finite-character-cancellation] 把波粒二象性在有限群上的运作机理展示得淋漓尽致：

- 当 $x \notin H$ 时，各频率分量 $\chi_k(x)$ 在复平面单位圆上均匀散开，相位箭头首尾相接形成闭合链，合振幅精确归零（**相消干涉**）；
- 当 $x \in H$ 时，所有频率分量全部指向正实轴 $+1$，合振幅同相叠加为 $|\mathrm{annihilator}(H)|$（**相长干涉**）。

::: {.viz src="phase-gears" preset="cancel" height="500"}
**不共振的箭头绕成一圈。** $Q = 16$、梳子 $\{0, 4, 8, 12\}$、$k = 1$：只有最慢的那只齿轮亮着，四支青色箭头 $1$、$i$、$-1$、$-i$ 首尾相接围成正方形，回到原点；谱上第 $1$ 根柱子扫描中先长出来，最后缩回 $0$（[@prop-finite-character-cancellation]）。
:::

**重要规范提醒**：[@prop-finite-character-cancellation] 右端在 $x \in H$ 时给出的是**未归一化**的子群基数 $|\mathrm{annihilator}(H)|$，绝不能把这股未归一化的代数和直接称作“概率 $1$”！这里求和的指标是 $k \in H^\perp$：若初态是零化子 $H^\perp$ 上的归一化均匀叠加，必须除以初态归一化因子 $\sqrt{|H^\perp|}$ 与幺正 QFT 的归一化因子 $\sqrt{m}$，得到 $x \in H$ 处的振幅 $\frac{|H^\perp|}{\sqrt{|H^\perp|}\sqrt{m}} = \frac{1}{\sqrt{|H|}}$，在 $H$ 外为零，其中用到 $|H|\,|H^\perp| = m$。玻恩概率是振幅的平方模，因此 $H$ 上每个位置的概率为 $1/|H|$，其余为零，总和为 $1$。相邻实验卡从相反方向出发：初态在位置子群 $H$ 上均匀叠加，初态归一化因子才是 $\sqrt{|H|}$；QFT 后在 $H^\perp$ 上各得振幅 $1/\sqrt{|H^\perp|}$、概率 $1/|H^\perp|$。

::: {.viz src="phase-gears" preset="four" height="500"}
**周期 4 留下四根峰。** $Q = 16$、梳子 $\{0, 4, 8, 12\}$：看 $k = 4$ 时四支青色箭头全部朝右，链长 $4$，这是未归一化的和，不是概率 $1$；扫完之后谱上只剩 $0$、$4$、$8$、$12$ 四根等高的柱子，每根 $\frac{1}{4}$，正落在品红的 $sQ/r$ 上，其余十二根都是 $0$。
:::
