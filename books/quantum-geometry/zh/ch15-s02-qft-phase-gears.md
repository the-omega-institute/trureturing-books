# 15.2 相位反冲与 QFT 二进制齿轮 {#sec-qft-phase-gears}

如果说 Grover 搜索靠的是在实平面里一步旋转 $2\theta$，那么量子傅里叶变换（QFT）与相位估计靠的就是在复赤道圆周上拧转不同齿比的**相位齿轮**（见图 15 面板 II）。

::: {.viz src="phase-gears" preset="basis" height="500"}
**一排逐级减半转速的齿轮。** $Q = 8$、只有一格 $x = 5$：时间轴每走一格，三只紫色齿轮分别转 $\frac{1}{2}$、$\frac{1}{4}$、$\frac{1}{8}$ 圈，走到 $5$ 时停在 $\pi$、$\frac{\pi}{2}$、$\frac{5\pi}{4}$；频率 $k = 7$ 用上三只，链上唯一一支青色箭头指向它们的和 $\frac{3\pi}{4}$。谱是平的，每根柱子都是 $\frac{1}{8}$。实际电路的正指数作用见 [@thm-qft-circuit-action]；这里的齿轮动画是这一位序规范的教学演示。
:::

在代数底层，一切离散相位反冲（phase kickback）都源于有限循环群 $\mathrm{ZMod}\,M$（$M \in \mathbb{N}$，带 `[NeZero M]`）上平移算子与时钟算子的共轭对易律。在源码模块 `WeylDisplacementConjugation` 中，记 $M$ 次本原单位根为 $\omega_M = \mathrm{windowRoot}(M) = \exp(2\pi i / M)$，在 $M_{\mathrm{Fin}\,M}(\mathbb{C})$ 上定义：

- **对角时钟矩阵** $\mathrm{clockMatrix}(M) = \operatorname{diag}\bigl(j \mapsto \omega_M^{j.\mathrm{val}}\bigr)$；
- **循环移位矩阵** $\mathrm{shiftMatrix}(M) = \mathrm{circulant}\bigl(i \mapsto \text{if } i = 1 \text{ then } 1 \text{ else } 0\bigr)$，其对列向量的作用为向下循环移位 $(X\psi)_i = \psi_{i - 1}$；
- **Weyl 位移算子** $\mathrm{displacement}(M, e, f) = \mathrm{shiftMatrix}(M)^{e.\mathrm{val}} \cdot \mathrm{clockMatrix}(M)^{f.\mathrm{val}}$（$e, f \in \mathrm{ZMod}\,M$）。

当我们用位移算子 $D(a, b) = \mathrm{displacement}(M, a, b)$ 去共轭另一个位移算子 $D(c, d) = \mathrm{displacement}(M, c, d)$ 时，会发生什么？下面的引理给出了精确的共轭相位反冲公式。

::: {.lemma #lemma-phase-kickback-weyl title="有限 Weyl 位移算子的共轭相位反冲引理" lean="D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation"}
设 $M \in \mathbb{N}$ 且满足 `[NeZero M]`。对任意四个模 $M$ 剩余类元素 $a, b, c, d \in \mathrm{ZMod}\,M$，恒有

$$
\begin{aligned}
&\mathrm{displacement}(M, a, b) \cdot \mathrm{displacement}(M, c, d) \cdot \mathrm{star}\bigl(\mathrm{displacement}(M, a, b)\bigr) \\
&= \mathrm{windowRoot}(M)^{(b \cdot c - a \cdot d).\mathrm{val}} \bullet \mathrm{displacement}(M, c, d).
\end{aligned}
$$
:::

::: proof
记 $X = \mathrm{shiftMatrix}(M)$、$Z = \mathrm{clockMatrix}(M)$。因为 $X$ 与 $Z$ 均为幺正矩阵，每个 $\mathrm{displacement}(M, a, b) = X^{a.\mathrm{val}} Z^{b.\mathrm{val}}$ 亦为幺正矩阵，满足 $D(a, b) \cdot \mathrm{star}(D(a, b)) = I_M$。利用基本 Weyl 交换关系 $Z^b X^c = \omega_M^{(b \cdot c).\mathrm{val}} X^c Z^b$ 与 $X^a Z^d = \omega_M^{(-a \cdot d).\mathrm{val}} Z^d X^a$，将左端内部的 $X^{c.\mathrm{val}} Z^{d.\mathrm{val}}$ 逐步移到最右侧的 $\mathrm{star}(D(a, b))$ 之后：跨过 $Z^{b.\mathrm{val}}$ 产生相位因子 $\omega_M^{(b \cdot c).\mathrm{val}}$，跨过 $X^{a.\mathrm{val}}$ 产生相位因子 $\omega_M^{(-a \cdot d).\mathrm{val}}$。两个相位在 $\mathrm{ZMod}\,M$ 中合并为 $\omega_M^{(b \cdot c - a \cdot d).\mathrm{val}}$，而左侧剩余的 $D(a, b) \cdot \mathrm{star}(D(a, b))$ 缩并为单位阵 $I_M$，留下 $\omega_M^{(b \cdot c - a \cdot d).\mathrm{val}} \bullet D(c, d)$。完整证明由 Lean 内核检查。
:::


::: {.figure src="ch15-weyl-area"}
**共轭只留下一个相位，由两次位移张成的面积决定。** 取 $M = 8$。左边是 $\mathrm{ZMod}\,8 \times \mathrm{ZMod}\,8$ 的格点，横轴是平移次数 $a$，纵轴是时钟次数 $b$；两支青色箭头 $(a, b) = (2, 1)$ 与 $(c, d) = (1, 3)$ 张出品红的平行四边形，有向面积 $ad - bc = 5$。右边是 $8$ 格的相位钟，琥珀色的指针停在 $\omega_8^{3}$，因为 $bc - ad = -5 \equiv 3 \pmod 8$（[@lemma-phase-kickback-weyl]）。把指数读成有向面积的相反数，只是对 $bc - ad$ 这个行列式的几何读法；指针的位置由 $8 \times 8$ 矩阵直接核对。
:::
在使用 [@lemma-phase-kickback-weyl] 时，请务必核对三处符号与边界细节：

1. **模 $M$ 减法先于 `.val` 取值**：指数 $(b \cdot c - a \cdot d).\mathrm{val}$ 是先在环 $\mathrm{ZMod}\,M$ 内部完成乘法与减法，再通过 `.val` 取出 $\{0, 1, \dots, M-1\}$ 中的代表元整数作为 $\mathrm{windowRoot}(M)$ 的自然数幂次。
2. **共轭转置 `star` 与相位正号规范**：式中的 $\mathrm{star}$ 表示矩阵共轭转置 $(\cdot)^*$；由于源码定义 $\mathrm{windowRoot}(M) = \exp(+2\pi i / M)$ 且移位作用为 $(X\psi)_i = \psi_{i-1}$、算子次序为 $X^{e.\mathrm{val}} Z^{f.\mathrm{val}}$，共轭后指数恰好是正号 $(b \cdot c - a \cdot d).\mathrm{val}$。
3. **适用范围**：[@lemma-phase-kickback-weyl] 只给出有限 Weyl 共轭的代数相位反冲；实际多比特 QFT 电路的作用与原生事件计数分别由 [@thm-qft-circuit-action] 与 [@thm-qft-native-event-count] 单独给出，不能从 Weyl 共轭式直接推出。

把齿轮图变成电路等式，必须同时固定门的次序与二进制标号。这里使用源码 `QuantumAlg.QuantumFourierTransform.Source.circuit` 的同一个递归电路：每层先作首位 Hadamard，再作按间距排列的受控相位门，随后执行嵌入的尾部递归，最后作互不相交的位反转 SWAP。`onBinaryLabels` 将其执行矩阵按大端二进制标号（最高有效位在前）对应到整数 $0,\ldots,2^q-1$。

::: {.theorem #thm-qft-circuit-action title="实际 QFT 电路对任意复向量的精确作用" lean="D5/S3/Quantum/FourierCircuit/Correctness.circuit_action"}
对任意 $\operatorname{oracles}:\operatorname{OracleModel}$、任意自然数宽度 $q$、任意解释 $\operatorname{environment}:\operatorname{oracles.Interpretation}$ 及任意复向量 $v:\mathrm{Fin}(2^q)\to\mathbb C$，令 $U$ 为上述电路经 `onBinaryLabels` 对应后的执行矩阵，则

$$
\begin{aligned}
U v&=\mathcal F_+(v),\\
(\mathcal F_+(v))(k)&=\frac{1}{\sqrt{2^q}}
\sum_{x\in\mathrm{Fin}(2^q)}e^{+2\pi i k.\operatorname{val}\,x.\operatorname{val}/2^q}v(x)
\quad(k\in\mathrm{Fin}(2^q)).
\end{aligned}
$$

等式是复向量的精确相等，包括整体相位；不要求 $v$ 归一化，也不要求 $q>0$。
:::

::: proof
按宽度归纳计算未作末端交换的实际电路矩阵元，其中输出标号带有位反转；末端 SWAP 网络的执行恰好消去这次反转。所得矩阵元是正指数傅里叶核乘 $1/\sqrt{2^q}$，对输入坐标求和便得到任意向量的等式。完整证明由 Lean 内核检查。
:::

执行与计数观察的是同一个 `circuit`，不能给另一个抽象傅里叶算子直接贴上电路成本。记 $\delta(g,e)$ 在原生门事件 $g$ 等于事件 $e$ 时为 $1$，否则为 $0$。

::: {.theorem #thm-qft-native-event-count title="同一 QFT 电路的全部原生事件计数" lean="D5/S3/Quantum/FourierCircuit/Primitives/QFT/Source/Resources.qftSource_circuit_event_count"}
对任意 $\operatorname{oracles}:\operatorname{OracleModel}$、任意事件 $e:\operatorname{Resource.Event}(\operatorname{quantum}(\operatorname{FourierGate.model},\operatorname{oracles}))$ 与任意 $q\in\mathbb N$，上述电路 $\operatorname{circuit}(\operatorname{oracles},q)$ 的 `eventCost` 满足

$$
\begin{aligned}
\operatorname{count}(e,\operatorname{eventCost})
&=q\,\delta(H,e)+\binom q2\delta(\operatorname{controlledPhase},e)\\
&\quad+\lfloor q/2\rfloor\,\delta(\operatorname{SWAP},e).
\end{aligned}
$$

这里 $H$、$\operatorname{controlledPhase}$、$\operatorname{SWAP}$ 均指对应的原生门事件。因此其出现次数分别为 $q$、$\binom q2$、$\lfloor q/2\rfloor$；所有其他事件（包括 oracle 事件）出现次数为零，$q=0$ 时全部为零。
:::

::: proof
每层实际指令贡献一个 Hadamard 与指定前缀中的受控相位门；嵌入尾部保持事件计数，宽度归纳累加出 $q$ 与 $\binom q2$。末端反转包含 $\lfloor q/2\rfloor$ 个 SWAP，两部分顺序复合给出对任意事件坐标的公式。完整证明由 Lean 内核检查。
:::

例如 $q=3$ 时是 $3$ 个 Hadamard、$3$ 个受控相位与 $1$ 个 SWAP，共 $7$ 次理想原生门出现；$q=0$ 的单坐标变换是恒等变换，门数为零。这些计数不包括输入装载、全部傅里叶系数的经典读出、有限离散门集综合或硬件成本。后面的三比特乘积式是这一大端、正指数规范的手算解释，不把页面的全部几何张量恒等式或交互行为一并纳入验证。

上述实际递归电路证明与事件计数来自 QudeLeap Team 的 [Lean-QuantumAlg 固定版本](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00)，移植源码保留 Apache 2.0 许可与来源注记。来源审计 [#30752](https://github.com/the-omega-institute/trureturing/issues/30752) 仍为三项已验证、七项待解决、五十六项未完成；这两条引用不代表供给库的其余内容已通过审计。
