# 第十五章 夹角平面旋转与赤道面积齿轮：Grover 搜索、QFT 与 Shor 大数分解 {#夹角平面旋转与赤道面积齿轮grover-搜索qft-与-shor-大数分解}

> *“这核心是各向同性如何从正交关系到达另外一个点,一个是正交一次,一个是正交两次,因为三元两两正交”*

在[第十三章](ch13-entanglement-and-chsh.md)与[第十四章](ch14-cloning-codes-and-braids.md)中，我们见证了高维球体如何接纳并保护量子信息。现在，我们要回答量子计算最激动人心的问题：**在这座指数级膨胀的高维球面上，量子算法究竟凭什么比经典枚举快得多？**

如果把近三十年来最重要的两大量子算法家族——以 Grover 为代表的**振幅放大（Amplitude Amplification）**与以 Shor 为代表的**量子傅里叶周期寻找（QFT Period Finding）**——剥去繁复的电路外衣，它们的几何内核正好对应题记中那句洗练的洞察：

- **Grover 搜索是“两次正交反射合成一次不变平面旋转”**：在各向同性的高维草堆里，初始叠加态与目标态之间张开一个二维公共平面；先对目标正交子空间作一次镜像反射（正交一次），再对初始子空间作第二次镜像反射（正交两次），两次反射自动把状态向量沿着这个二维平面向目标稳步拨转 $2\theta$ 角！
- **QFT 与周期寻找是“赤道相位齿轮上的正交字符干涉”**：通过有限 Weyl 位移算子的共轭相位反冲，把算术周期性刻进一套按二进制分母咬合的赤道相位齿轮；在有限循环群 $\mathrm{ZMod}\,m$（$m>0$）中，对位置子群 $H$ 上的归一化均匀叠加做 QFT，就是在 $H$ 上求字符和：非共振频率的相位箭头首尾相接、闭合归零，唯独对偶零化子 $H^\perp$ 上的共振频率同相累加，一举锁定隐藏周期！下文的对偶求和命题从相反方向在 $H^\perp$ 上求和，结果只在 $H$ 上非零。

::: {.figure src="ch15-overview"}
**图 15。** 本章地图：面板 I，$N = 4$ 时一步 Grover 迭代把箭头 $U$ 转过紫色的 $2\theta = 60^\circ$，琥珀色的 $QU$ 正好落在成功方向 $W$ 上；面板 II，$x = 5 = (101)_2$ 的三只相位齿轮，齿数 $2$、$4$、$8$，琥珀色的指针依次指向 $\pi$、$\pi/2$、$5\pi/4$；面板 III，$Q = 16$、$r = 4$ 的周期态做完 QFT 后，只有 $k = 0, 4, 8, 12$ 四处留下高 $1/4$ 的青色柱。
:::

## 15.1 Grover：两次反射的共同不变平面 {#sec-grover-invariant-plane}

想象在一座拥有 $l$ 个正交房间的巨大迷宫里寻找目标。经典搜寻者每次只能推开一扇门，平均要试 $O(l)$ 次；而量子搜索则从一开始就把单位 $\ell^2$ 范数均匀铺满所有房间（注意：量子态列向量的单位归一化始终是欧氏/希尔伯特 $\ell^2$ 范数 $\sum_i |\psi_i|^2 = 1$，而非函数空间上的上确界 $\sup$ 范数）。

为了将单目标 Grover 搜索与更一般的多列相干子空间放大统一收进同一座定理大厦，源码模块 `CoherentUniformAmplification` 采用了极为优美的块矩阵几何语言。设 $s$（源子空间指标）与 $l$（外部搜索空间指标）为有限可判等类型：

- $J \in M_{l \times s}(\mathbb{C})$ 为源子空间的等距嵌入矩阵（$J^* J = I_s$）；
- $C \in M_{l \times l}(\mathbb{C})$ 为幺正制备矩阵（$C^* C = I_l$），故制备后的源等距算子为 $U = C J \in M_{l \times s}(\mathbb{C})$（满足 $U^* U = J^* C^* C J = I_s$）；
- $P \in M_{l \times l}(\mathbb{C})$ 为标记目标子空间的自伴幂等正交投影矩阵（$P^* = P$，$P^2 = P$）。

何时源子空间中的每个单位叠加态经 $U$ 制备后，在目标投影 $P$ 下享有完全均匀的初始命中率 $p \in (0, 1]$？当且仅当成功投影块 $P U = P(CJ)$ 的格拉姆（Gram）矩阵等于标量矩阵 $p I_s$：

$$
\bigl(P(CJ)\bigr)^* \bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet I_s \qquad (0 < p \le 1).
$$

在此均匀成功条件下，我们将 $U = CJ$ 沿着目标投影 $P$ 与失败补投影 $I_l - P$ 分解为归一化成功等距块 $W$ 与归一化失败等距块 $B$：

$$
W = \mathrm{success}(U, P, p) = (\sqrt{p})^{-1}\,P U, \qquad
B = \mathrm{failure}(U, P, p) = (\sqrt{1 - p})^{-1}\,(I_l - P) U,
$$

并定义由“关于目标的相位反射 $I_l - 2P$”与“关于制备态的扩散反射 $2 U U^* - I_l$”复合而成的单步 Grover 迭代算子

$$
\mathrm{iterate}(U, P) = (2 U U^* - I_l)(I_l - 2P),
$$

记初始成功倾角为 $\theta = \arcsin(\sqrt{p})$（故 $\sin\theta = \sqrt{p}$，$\cos\theta = \sqrt{1 - p}$）。下面的定理证明：无论迭代多少步 $n \in \mathbb{N}$，甚至无论外部再张量耦合任何参考系统 $R$，演化始终严丝合缝地锁在由 $W$ 与 $B$ 张成的二维块平面内，每次精确旋转 $2\theta$ 角！

::: {.figure src="ch15-two-reflections"}
**两面镜子合成一次转动。** 取 $N = 8$：墨色的箭头 $U$ 与失败方向 $B$ 成 $\theta$。第一面镜子是 $B$ 轴（$I - 2P$），把 $U$ 翻到下方的灰色虚线箭头；第二面镜子是 $U$ 所在的线（$2UU^* - I$），再把它翻上去，成为琥珀色的 $QU$。两次翻折之后，箭头净转过紫色的 $2\theta$，见 [@thm-grover-uniform-rotation]。
:::

::: {.theorem #thm-grover-uniform-rotation title="相干均匀振幅放大的不变平面算子旋转定理" lean="D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation"}
设 $s, l$ 为有限可判等指标类型，$J \in M_{l \times s}(\mathbb{C})$、$C, P \in M_{l \times l}(\mathbb{C})$、$p \in \mathbb{R}$，满足

$$
J^* J = 1, \quad C^* C = 1, \quad P^* = P, \quad P^2 = P, \quad
\bigl(P(CJ)\bigr)^* \bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet (1 : M_s(\mathbb{C})), \quad 0 < p \le 1.
$$

令

$$
U := C J, \qquad W := \mathrm{success}(U, P, p), \qquad B := \mathrm{failure}(U, P, p), \qquad \theta := \arcsin(\sqrt{p}).
$$

若 $p = 1$，则 $U = W$；否则（当 $0 < p < 1$ 时），以下结论同时成立：

1. **成功块与失败块的正交等距性**：

   $$
   W^* W = 1, \qquad B^* B = 1, \qquad W^* B = 0;
   $$

2. **$n$ 步迭代的精确正弦—余弦旋转公式及克罗内克伴随不变性**：对一切自然数 $n \in \mathbb{N}$，

   $$
   \mathrm{iterate}(U, P)^n \cdot U = \bigl(\sin((2n + 1)\theta) : \mathbb{C}\bigr) \bullet W + \bigl(\cos((2n + 1)\theta) : \mathbb{C}\bigr) \bullet B,
   $$

   且对任意类型 $z$ 及任意复方阵 $R \in M_z(\mathbb{C})$，

   $$
   \bigl(\mathrm{iterate}(U, P)^n \cdot U\bigr) \otimes_{\mathrm{K}} R = \bigl(\sin((2n + 1)\theta) : \mathbb{C}\bigr) \bullet (W \otimes_{\mathrm{K}} R) + \bigl(\cos((2n + 1)\theta) : \mathbb{C}\bigr) \bullet (B \otimes_{\mathrm{K}} R).
   $$
:::

::: proof
当 $p = 1$ 时，$W = 1^{-1} P U = P U$，且失败块 $(I_l - P)U$ 的格拉姆矩阵为 $U^*(I_l - P)U = I_s - I_s = 0$，故 $(I_l - P)U = 0$，从而 $U = P U = W$。

当 $0 < p < 1$ 时，$\sqrt{p} > 0$ 且 $\sqrt{1 - p} > 0$。由 $(PU)^*(PU) = p I_s$ 立得 $W^* W = p^{-1}(PU)^*(PU) = I_s$；由 $U^* U = I_s$ 与 $P^* = P = P^2$ 得 $((I_l - P)U)^*((I_l - P)U) = U^* U - U^* P U = (1 - p)I_s$，除以 $1 - p$ 即得 $B^* B = I_s$；而 $P(I_l - P) = 0$ 直接给出 $W^* B = 0$（结论 1）。

注意到初始分解为 $U = P U + (I_l - P)U = \sin\theta\,W + \cos\theta\,B$（这对应 $n = 0$ 时 $(2n + 1)\theta = \theta$ 的基底情形）。因为 $P W = W$ 且 $P B = 0$，第一次反射 $(I_l - 2P)$ 将 $W$ 反号为 $-W$、保持 $B$ 不变；接着计算 $U^* W = \sin\theta\,I_s$ 与 $U^* B = \cos\theta\,I_s$，第二次反射 $(2U U^* - I_l)$ 将 $W$ 与 $B$ 变换为二倍角三角组合，合起来使单步算子 $Q = \mathrm{iterate}(U, P)$ 在 $\{W, B\}$ 上精确执行角度为 $2\theta$ 的平面旋转：

$$
Q W = \cos(2\theta)\,W - \sin(2\theta)\,B, \qquad Q B = \sin(2\theta)\,W + \cos(2\theta)\,B.
$$

对 $n \in \mathbb{N}$ 归纳并应用和角公式 $\sin((2n+1)\theta)\cos(2\theta) + \cos((2n+1)\theta)\sin(2\theta) = \sin((2n+3)\theta)$ 及余弦和角公式，即得 $Q^n U = \sin((2n+1)\theta)W + \cos((2n+1)\theta)B$。最后对等式两端右作 $\otimes_{\mathrm{K}} R$，由克罗内克积的线性分配律立即得出带参考矩阵 $R$ 的扩展恒等式（结论 2）。完整证明由 Lean 内核检查。
:::

请结合图 15 面板 I 体会 [@thm-grover-uniform-rotation] 的三条关键边界：

1. **必须保留 $p = 1$ 的独立分支**：当初始状态已经百分之百落在目标子空间内（$p = 1$）时，失败分母 $\sqrt{1 - p} = 0$，此时无须定义失败基向量 $B$，定理直接给出 $U = W$；而当 $0 < p < 1$ 时，$n = 0$ 自动还原初始正交分解 $U = \sin\theta\,W + \cos\theta\,B$。
2. **多源列时的块平面几何**：当源空间只有一列（$|s| = 1$，标准单初态 Grover 搜索）时，$W$ 与 $B$ 是两根正交单位列向量，张成一个二维平面；当 $|s| > 1$ 时，$W, B \in M_{l \times s}(\mathbb{C})$ 各自包含 $|s|$ 根正交列向量，第 $j$ 列的成功分量 $W_{\cdot, j}$ 与失败分量 $B_{\cdot, j}$ 张成属于该列的二维不变平面，全部 $|s|$ 个二维平面在 $\mathrm{iterate}(U, P)$ 下以完全相同的角速度 $2\theta$ 同步旋转（绝非把整个多列算子压进单一的二维希尔伯特空间）。
3. **整数步数 $n \in \mathbb{N}$ 的离散过冲（overshoot）**：因为步数 $n$ 只能取自然数，转角 $(2n + 1)\theta$ 是离散跳变的。当 $p = 1/N \ll 1$ 时，$\theta = \arcsin(1/\sqrt{N}) \approx 1/\sqrt{N}$，令 $(2n + 1)\theta \approx \pi/2$ 给出著名的 $n \approx \frac{\pi}{4}\sqrt{N}$ 步复杂度；但除 $N = 4$（$p = 1/4, \theta = \pi/6, n = 1$）等极少数特殊有理角外，整数步 $n$ 只能逼近 $\pi/2$ 而无法对任意 $N$ 精确命中 $\sin((2n+1)\theta) = 1$。

::: {.viz src="grover-reflections" preset="sqrt" height="500"}
**$\frac{\pi}{4}\sqrt{N}$ 步爬到顶。** $N = 256$ 时每一步只转 $2\theta \approx 7.17^\circ$，十二段紫色的小弧把琥珀色的箭头从 $3.6^\circ$ 送到 $89.6^\circ$，成功概率 $0.99995$；十二正是 $\frac{\pi}{4}\sqrt{256} \approx 12.57$ 附近第一个峰的步数。
:::

整数步只能逼近 $\pi/2$：走过了最佳步数，箭头就会转过头。

::: {.viz src="grover-reflections" preset="over" height="500"}
**整数步会转过头。** $N = 8$ 再走第 $3$ 步：箭头转到 $7\theta \approx 144.9^\circ$，青色的影子缩回 $0.575$，成功概率从 $0.945$ 掉到 $0.330$；右边的柱子先升后降，第 $2$ 根最高。
:::

如何在已知 $p$ 时借辅助硬币旋转彻底消除这一过冲残差，将在[第十六章](ch16-qsvt-walks-and-compilation.md) [@cor-exact-source-query-count] 中严格解决。

::: {.viz src="grover-reflections" height="560"}
Grover 两次反射的完整实验室：拖动镜 2 上的初始态改 $\theta$，换 $N$，用 ← → 一面一面地照镜子；右边的柱子是每一步之后的成功概率 $\sin^2((2n+1)\theta)$（[@thm-grover-uniform-rotation]）。查询下界 $\Omega(\sqrt{N})$ 是文献结果，未在本书形式化。
:::

## 15.2 相位反冲与 QFT 二进制齿轮 {#sec-qft-phase-gears}

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

## 15.3 有限字符正交与非共振相消 {#sec-period-frequency-cancellation}

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

## 15.4 有限周期采样与 Shor 阶重建 {#sec-shor-order-reconstruction}

将 [@prop-finite-character-cancellation] 的正交筛子应用于 $\mathrm{ZMod}\,m$ 上的任意复值函数 $f : \mathrm{ZMod}\,m \to \mathbb{C}$，便立即导出调和分析与量子周期寻找的共同枢纽——**有限泊松求和公式（Finite Poisson Summation Formula）**。

在阅读下面的推论之前，必须严格对齐源码所使用的 Mathlib 离散傅里叶变换规范：`ZMod.dft f` 定义为**带负指数且不含 $1/\sqrt{m}$ 归一化因子**的离散傅里叶变换：

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

这与物理教材中常见的正指数单位化 QFT $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ 相差一个归一化系数 $1/\sqrt{m}$ 以及指数符号 $k \leftrightarrow -k$（注意由于 $\mathrm{annihilator}(H)$ 是加法子群，$k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$，因此在对整个 $\mathrm{annihilator}(H)$ 求和时正负指数集合完全重合，但在计算单个频点的值时绝不能把两套规范混为一谈）。

::: {.corollary #cor-finite-poisson-period title="ZMod m 子群与零化子上的有限泊松求和推论" lean="D5/S3/Fourier/FinitePoisson.finite_poisson_summation"}
设 $m \in \mathbb{N}$ 且满足 `[NeZero m]`，$H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ 为 $\mathrm{ZMod}\,m$ 的加法子群，$f : \mathrm{ZMod}\,m \to \mathbb{C}$ 为任意复值函数。则 $f$ 在子群 $H$ 上的和恒等于其离散傅里叶变换 $\mathrm{ZMod.dft}\,f$ 在零化子 $\mathrm{annihilator}(H)$ 上的缩放和：

$$
\sum_{h : H} f(h.1) = \frac{(\mathrm{Fintype.card}\,H : \mathbb{C})}{(m : \mathbb{C})} \cdot \sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1.
$$
:::

::: proof
按 `ZMod.dft` 的定义将右端对 $k : \mathrm{annihilator}(H)$ 的求和展开，并交换有限求和次序（对 $x \in \mathrm{ZMod}\,m$ 与 $k \in \mathrm{annihilator}(H)$）：

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1
= \sum_{x \in \mathrm{ZMod}\,m} f(x) \sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(-k.1)(x).
$$

因为 $k \mapsto -k$ 是加法子群 $\mathrm{annihilator}(H)$ 上的双射，内层和式等于 $\sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(k.1)(x)$。代入 [@prop-finite-character-cancellation]，所有 $x \notin H$ 的项全部归零，仅保留 $x \in H$ 的项，每项乘以常数 $|\mathrm{annihilator}(H)|$：

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1 = \bigl(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C}\bigr) \sum_{h : H} f(h.1).
$$

最后利用有限循环群子群与零化子的拉格朗日基数恒等式 $\mathrm{Fintype.card}(H) \cdot \mathrm{Fintype.card}(\mathrm{annihilator}(H)) = m$，两边同乘 $\frac{\mathrm{Fintype.card}(H)}{m}$ 消去因子 $\frac{|H| \cdot |H^\perp|}{m} = 1$，即得左端 $\sum_{h : H} f(h.1)$。完整证明由 Lean 内核检查。
:::


在 $m = 32$、周期 $r = 8$ 的例子里，位置梳子 $H = \{0, 8, 16, 24\}$ 只有 $4$ 格，零化子 $H^\perp = \{0, 4, 8, \dots, 28\}$ 却有 $8$ 个频率，间距是 $m/r = 4$。

::: {.viz src="phase-gears" preset="dual" height="500"}
**峰距是 $Q/r$，不是 $r$。** $Q = 32$、周期 $r = 8$：寄存器上青色的梳子 $H = \{0, 8, 16, 24\}$ 只有 $4$ 格，间距 $8$；扫完之后谱上留下 $8$ 根等高的柱子，每根 $\frac{1}{8}$，落在 $0, 4, 8, \dots, 28$，正是 $H^\perp$ 的 $8$ 个频率，间距 $Q/r = 4$。看 $k = 4$ 时四支青色箭头全部朝右，链长 $4$；$\lvert H\rvert \cdot \lvert H^\perp\rvert = 4 \cdot 8 = 32$（[@cor-finite-poisson-period]）。例中的 $Q = 16$、$r = 4$ 恰好 $r = Q/r = 4$，两把梳子重合。
:::
::: {.remark #rem-shor-divisibility-boundary-literature title="有限泊松求和、条件候选与完整 Shor 算法的边界"}
**范围说明。** 在将 [@cor-finite-poisson-period] 与 Shor 大数分解算法对接时，先分清两条边界，再从实际输入推导非整除情形的计数寄存器分布。下面紧随冻结声明给出精确边缘分布；后面的推导解释这些陈述，完整算法的结论仍见 [@rem-grover-qft-shor-literature]。

1. **有限泊松恒等式不等于完整 Shor 算法的成功概率或多项式复杂度定理**：[@cor-finite-poisson-period] 是 $\mathrm{ZMod}\,m$ 上的精确调和分析恒等式，它本身并不包含模幂电路构造、连分数有理逼近恢复定理、欧拉函数互素概率下界或大数分解的多项式门复杂度（其中条件候选成员资格另见 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate]；下文将它们与实际边缘分布结合，在 $N^2\le Q$ 下推导单次候选列表包含真阶的事件下界；完整算法边界见 [@rem-grover-qft-shor-literature]）。
2. **整除情形（$r \mid Q$）与一般非整除情形（$r \nmid Q$）的本质区别**：当 $r \mid Q$ 时，完整的周期梳子是 $\mathrm{ZMod}\,Q$ 中子群的陪集，非共振频点按 [@prop-finite-character-cancellation] **精确为零**。当 $r \nmid Q$ 时，截在寄存器边界上的梳子不能这样套用子群恒等式。此时要计算有限几何和；得到某个峰附近的概率下界之后，从频率逼近得到候选仍是另一项数论任务；下面的条件候选定理完成其中的成员资格部分，再与实际相位混合组合，得到候选列表包含真阶的单次事件下界。这不改变条件梳子自身集中性质的文献边界。

:::

::: {.theorem #thm-shor-qpe-probability-mixture title="实际输入的 Shor 计数寄存器边缘分布" lean="D5/S3/Quantum/ShorCountingMarginal.shor_qpe_probability_mixture"}
对每个参数记录 $c$（其模数至少为 $2$、底数为与模数互素的自然数、目标宽度给出包含模数的维数 $D=2^{\mathrm{width}}$，且周期 $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$），每个控制宽度 $n\in\mathbb N$，以及每个 $y\in\mathrm{Fin}(2^n)$，都有

$$
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)
=\frac{1}{r}\sum_{s\in\mathrm{Fin}\,r}
\operatorname{probability}\!\left(2^n,\frac{s.\operatorname{val}}{r},y\right)。
$$

这里的 `normSquared` 对 $D$ 个物理工作坐标的平方模全部求和；输入是记录中坐标 $1$ 的计算基向量，等式给出对整个工作寄存器求和后，指定计数结果的边缘概率。
:::

::: proof
冻结声明把实际基态输入展开为模乘轨道的正交傅里叶本征态，施加受控幂与逆傅里叶变换，再用正交性消去交叉项。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-shor-distribution-normalized title="实际 Shor 计数边缘分布的归一化" lean="D5/S3/Quantum/ShorCountingMarginal.shor_distribution_normalized"}
对每个参数记录 $c$，记 $r=c.\operatorname{period}$，以及每个 $n\in\mathbb N$，都有

$$
\sum_{y\in\mathrm{Fin}(2^n)}
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)=1。
$$

这包括边界情形 $n=0$：此时控制寄存器只有 $y=0$ 一个结果。
:::

::: proof
对实际输入的混合式在所有计数结果上求和，使用任意相位核的归一化；周期为正，因而混合权重恰好相消。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-shor-mixture-peak-lower-bound title="实际边缘分布的逐点最近格点下界" lean="D5/S3/Quantum/ShorCountingMarginal.shor_mixture_peak_lower_bound"}
对每个参数记录 $c$，记 $r=c.\operatorname{period}$，以及每个 $n\in\mathbb N$、每个 $s\in\mathrm{Fin}\,r$ 与 $b\in\mathrm{Fin}(2^n)$，假设

$$
\operatorname{Nearest}\!\left(2^n,\frac{s.\operatorname{val}}{r},b\right)。
$$

按定义，这个假设的含义是

$$
\exists z\in\mathbb Z,\ \left|\frac{s.\operatorname{val}}{r}-\frac{b.\operatorname{val}}{2^n}-z\right|\le\frac{1}{2\cdot2^n},
$$

则

$$
\frac{1}{r}\,\frac{4}{\pi^2}
\le
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,b\right)。
$$

这是所选相位与格点标签的逐点结论；不同相位可能选中同一标签，所以它不是总事件成功概率。
:::

::: proof
任意相位下界给出所选本征相位的 $4/\pi^2$；实际混合中该分量的权重是 $1/r$，其余平方范数均非负。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-qpe-arbitrary-phase-lower-bound title="单个相位的圆周最近格点下界" lean="D5/S3/Quantum/ShorCountingMarginal.qpe_arbitrary_phase_lower_bound"}
对每个满足 $0<N$ 的 $N\in\mathbb N$、每个实相位 $\theta$ 与 $b\in\mathrm{Fin}\,N$，假设

$$
\operatorname{Nearest}(N,\theta,b)。
$$

按定义，这个假设的含义是

$$
\exists z\in\mathbb Z,\ \left|\theta-\frac{b.\operatorname{val}}{N}-z\right|\le\frac{1}{2N},
$$

则

$$
\frac{4}{\pi^2}\le\operatorname{probability}(N,\theta,b)。
$$

整数移位使这个条件是圆周距离，包含 $0/1$ 接缝以及两种中点并列选择。
:::

::: proof
证明把相位按给定整数移位，计算有限几何和，在最近区间使用正弦不等式，再将 $2/\pi$ 的振幅估计平方。完整证明由 Lean 内核检查。
:::

最近格点下界只盯住一根柱子；若要控制一个窗口外所有柱子的总重量，就必须对尾部求和。沿用逆傅里叶规范，记

$$
\begin{aligned}
A_Q(\theta,j)&=\frac1Q\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-j.\operatorname{val}/Q)},\\
p_Q(\theta,j)&=|A_Q(\theta,j)|^2=\operatorname{probability}(Q,\theta,j),\\
d_Q(\theta,j)&=\left\|\left(\theta-\frac{j.\operatorname{val}}Q:\mathbb R/\mathbb Z\right)\right\|.
\end{aligned}
$$

最后一行精确对应 Lean 的 `UnitAddCircle` 范数，即误差模整数后的圆周距离，取值在 $[0,1/2]$。半径写作 $\varepsilon$，以区别于下文反射标号的 $\rho$。

::: {.theorem #thm-qpe-circular-tail title="单相位 QPE 的圆周窗口尾界" lean="D5/S3/Quantum/QPECircularTail.qpe_circular_tail_le"}
对每个 $n\in\mathbb N$、每个实相位 $\theta\in\mathbb R$ 和每个实半径 $\varepsilon>0$，令 $Q=2^n$，则

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\\varepsilon\le d_Q(\theta,j)}}p_Q(\theta,j)
\le\frac1{2Q\varepsilon}+\frac1{2(Q\varepsilon)^2}.
$$

坏事件包含距离恰等于 $\varepsilon$ 的标签；相位不必属于 $[0,1)$，不需要最近格点、阶或互素性假设。
:::

::: proof
把每个误差减去最近整数，使其绝对值不超过 $1/2$。几何和与正弦下界给出正距离处 $|A_Q(\theta,j)|\le1/(2Qd_Q(\theta,j))$。将标签提升为整数后，模 $Q$ 还原证明这些提升互异；平方并求和便归结为中心两侧的有限倒平方尾和。每侧保留首项，再用倒数差的望远镜和控制其余项，得到所述两个常数。完整证明由 Lean 内核检查。
:::

结合单相位核的[归一化](lean:D5/S3/Quantum/ShorCountingMarginal.qpe_probability_normalized)，把所有标签分成上述坏事件与严格好窗口，可得以下直接推论：

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\d_Q(\theta,j)<\varepsilon}}p_Q(\theta,j)
\ge1-\frac1{2Q\varepsilon}-\frac1{2(Q\varepsilon)^2}.
$$

这是对所引尾界与归一化的应用，不另设冻结声明。注意好窗口的严格不等号：若距离等于半径，它属于坏事件。$Q=128$、$\varepsilon=1/16$ 时，$Q\varepsilon=8$，尾界为 $1/16+1/128=9/128$，严格好窗口的质量至少为 $119/128$，对所有实相位都成立。$n=0$、负相位、整数移位、$0/1$ 接缝与中点并列均在定理范围内；$\varepsilon>1/2$ 时坏事件为空。上界可能大于 $1$，这只表示估计在该尺度不尖锐。

尾界的供给证明来自 QudeLeap Team 的 [Lean-QuantumAlg 固定版本](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00)，保留来源与 Apache 2.0 许可；所用单次估计见 Lin Lin，*Lecture Notes on Quantum Algorithms for Scientific Computation*，[arXiv:2201.08309v1](https://arxiv.org/abs/2201.08309v1)，§3.5，式 (3.48)–(3.50)。这里仅对既有逆傅里叶单相位核求和；下文候选事件的下界另由实际混合、最近格点估计与数论恢复组合得到。这个尾界本身没有给出任意条件梳子的集中、重复采样规律或因子提取保证。若末端改用正指数 $\mathcal F_+$，须按下文的 $\rho(k)=(-k)\bmod Q$ 反射标号后再使用同一个相位。

::: {.remark #rem-shor-actual-input-marginal title="实际输入推导与 Shor 的剩余边界"}
下面的实际输入推导解释边缘分布、归一化与逐点下界的四条声明；其后的 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate] 给出有条件的连分数候选成员资格，再据此推导单次候选列表包含真阶的概率下界。精确选阶、重复采样、因子提取与完整算法复杂度的边界仍见 [@rem-grover-qft-shor-literature]。

**实际装入的是 $|1\rangle$。** 设模数 $N \ge 2$、自然数底数 $a$ 满足 $\gcd(a,N)=1$。工作寄存器有 $w$ 个比特，维数 $D=2^w$，只要求 $N\le D$；计数寄存器独立地取 $Q=2^n$，$n$ 为任意自然数，包括 $0$。工作基标号是 $t\in\mathrm{Fin}\,D$，补齐后的模乘置换及其线性作用为

$$
\begin{aligned}
\pi_a(t)&=\begin{cases}at\bmod N,&t<N,\\t,&N\le t<D,\end{cases}\\
U_a|t\rangle&=|\pi_a(t)\rangle.
\end{aligned}
$$

互素性使模 $N$ 的乘法成为置换，额外的补齐坐标则保持不动。取 $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$，记 $t_j=a^j\bmod N$，$0\le j<r$。这 $r$ 个基向量互异，且 $U_a|t_j\rangle=|t_{j+1\bmod r}\rangle$。电路输入是基向量 $|1\rangle=|t_0\rangle$，并不要求先知道 $r$ 或制备某个未知本征态；$r$ 只是分析这条实际模乘轨道的参数。

**均匀的相位混合从哪里来？** 在这条轨道上定义归一化的傅里叶向量

$$
\begin{aligned}
|u_s\rangle&=\frac{1}{\sqrt r}\sum_{j=0}^{r-1}e^{-2\pi i sj/r}|t_j\rangle,
\qquad 0\le s<r,\\
U_a|u_s\rangle&=e^{+2\pi i s/r}|u_s\rangle,\\
\langle u_s\mid u_{s'}\rangle&=\delta_{ss'},
\qquad |1\rangle=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}|u_s\rangle.
\end{aligned}
$$

第一行的负号与第二行的正号配套：把轨道指标从 $j$ 平移到 $j+1$，系数就提出 $e^{+2\pi i s/r}$。正交性来自 $r$ 次单位根之和；再对 $s$ 求和，只有 $j=0$ 留下，给出最后一个等式。这是纯态的相干分解，并未假设工作寄存器起初随机选取了一个相位。它们只张成轨道子空间，也不是整个 $D$ 维工作空间的本征基声明。

**两次 $1/\sqrt Q$，合成振幅中的 $1/Q$。** 计数寄存器均匀制备后，按二进制位受控施加 $U_a^{2^j}$；分支 $x=\sum_j x_j2^j$ 上的乘积就是 $U_a^x$。于是傅里叶变换之前的实际联合态为

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle U_a^x|1\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle.
$$

先用源文的逆变换 $\mathcal F_- =\mathcal F_+^{-1}$，其矩阵元是 $Q^{-1/2}e^{-2\pi i kx/Q}$。把变换后计数结果 $k$ 对应的工作向量记为 $v_-(k)$，便有

$$
\begin{aligned}
v_-(k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{-2\pi i kx/Q}|a^x\bmod N\rangle\\
&=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}A_Q(s/r,k)|u_s\rangle,\\
A_Q(\theta,k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-k/Q)},\\
p_Q(\theta,k)&=|A_Q(\theta,k)|^2.
\end{aligned}
$$

这里的 $1/Q$ 同时包含均匀输入的 $1/\sqrt Q$ 与逆傅里叶变换的 $1/\sqrt Q$，不能漏掉任何一个。

**实际概率要对全部工作结果求和。** 计数寄存器的无条件边缘概率是

$$
\begin{aligned}
P_-(k)&=\sum_{t=0}^{D-1}|v_-(k)(t)|^2\\
&=\frac{1}{r}\sum_{s=0}^{r-1}p_Q(s/r,k).
\end{aligned}
$$

左边包括全部 $D$ 个坐标；轨道外的坐标（包括补齐坐标）在此输入下振幅为零。右边的均匀权重 $1/r$ 是由 $\langle u_s\mid u_{s'}\rangle=\delta_{ss'}$ 消去交叉项后得到的。它既不是某一个本征相位的概率，也不是条件测得某个工作输出后的梳子分布。对任意实相位 $\theta$，展开平方并使用 $Q$ 次单位根正交性可直接验算

$$
\begin{aligned}
\sum_{k=0}^{Q-1}p_Q(\theta,k)
&=\frac{1}{Q^2}\sum_{x,x'=0}^{Q-1}e^{2\pi i(x-x')\theta}
  \sum_{k=0}^{Q-1}e^{-2\pi i k(x-x')/Q}\\
&=\frac{1}{Q^2}\sum_{x=0}^{Q-1}Q=1,\\
\sum_{k=0}^{Q-1}P_-(k)&=\frac{1}{r}\sum_{s=0}^{r-1}1=1.
\end{aligned}
$$

此处 $x,x'$ 都在 $0,\ldots,Q-1$，所以内层和仅在 $x=x'$ 时为 $Q$。当 $n=0$ 时，$Q=1$，受控幂序列为空，$A_1(\theta,0)=1$，唯一计数结果的实际概率仍为 $P_-(0)=1$。当 $r=1$ 时，轨道只有 $|1\rangle$，混合中也只有相位 $0$ 一项，故 $P_-(0)=1$，其余计数结果的概率为零。以上没有用到 $r\mid Q$、$Q>r^2$ 或 $n>0$。

**本章正指数约定的输出要反射。** 令 $e:\mathrm{Fin}\,Q\simeq\mathrm{ZMod}\,Q$ 为按最小非负代表元识别标号的 `ZMod.finEquiv`，并记 $\rho(k)=e^{-1}(-e(k))$，即 $(-k)\bmod Q$。对按此识别的任意坐标函数 $f$，本节的负指数未归一化 `ZMod.dft` 满足

$$
\begin{aligned}
(\mathcal F_-f)(k)&=\frac{1}{\sqrt Q}(\mathrm{ZMod.dft}\,f)(e(k)),\\
(\mathcal F_+f)(\rho(k))&=(\mathcal F_-f)(k).
\end{aligned}
$$

因此若末端沿用本章的 $\mathcal F_+$，相同工作向量出现在反射后的标号：$v_+(\rho(k))=v_-(k)$，从而 $P_+(\rho(k))=P_-(k)$。相位仍标为 $s/r$；逆变换中靠近 $sQ/r$ 的标号，在正变换中对应 $\rho(k)$，不能在切换傅里叶符号时悄悄保留同一个峰标号。

**最近格点下界是逐点的。** 固定任意 $s\in\mathrm{Fin}\,r$ 与 $b\in\mathrm{Fin}\,Q$，假设圆周最近条件

$$
\exists z\in\mathbb Z,\qquad
\left|\frac{s}{r}-\frac{b}{Q}-z\right|\le\frac{1}{2Q}.
$$

这允许中点两侧的任一选择，也包括跨过 $0/1$ 接缝的情形。令 $\delta=s/r-b/Q-z$；整数移相不改变 $A_Q$。若 $\delta=0$，则 $A_Q(s/r,b)=1$。否则有限几何和给出

$$
|A_Q(s/r,b)|
=\frac{|\sin(\pi Q\delta)|}{Q|\sin(\pi\delta)|}
\ge\frac{2Q|\delta|}{Q\pi|\delta|}
=\frac{2}{\pi}.
$$

不等式使用 $|\pi Q\delta|\le\pi/2$ 上的 $|\sin u|\ge2|u|/\pi$，以及 $|\sin u|\le|u|$；分母在这一非零分支严格为正。平方后，相位分量与实际边缘概率分别满足

$$
\begin{aligned}
p_Q(s/r,b)&\ge\frac{4}{\pi^2},\\
P_-(b)&\ge\frac{1}{r}p_Q(s/r,b)\ge\frac{4}{r\pi^2},\\
P_+(\rho(b))&\ge\frac{4}{r\pi^2}.
\end{aligned}
$$

量词是任意 $n\ge0$、任意相位指标 $s<r$、任意满足该最近条件的 $b<Q$。不同 $s$ 可能选中同一个 $b$，尤其在 $Q<r$ 时；不能把这些逐点下界不加分析地累加成互异测量事件的成功概率。

**一个不整除的小算例：$N=7,a=2,D=8,Q=4,r=3$。** 模乘轨道是 $1,2,4$，变换前的态为

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac12\bigl(|0\rangle|1\rangle+|1\rangle|2\rangle
+|2\rangle|4\rangle+|3\rangle|1\rangle\bigr).
$$

在 $k=0$，$v_-(0)=(2|1\rangle+|2\rangle+|4\rangle)/4$，所以实际概率是 $(4+1+1)/16=3/8$。相位核也给出 $p_4(0,0)=1$、$p_4(1/3,0)=p_4(2/3,0)=1/16$，均匀混合为 $(1+1/16+1/16)/3=3/8$。但若在末端傅里叶变换前条件测得工作输出 $2$，计数态仅剩 $|1\rangle$，傅里叶变换后四个结果各占 $1/4$。逐个展开可见整个区别：

| 计数标号 $k$ | 实际 $P_-(k)$ | 条件概率 $P_-(k\mid t=2)$ |
| --- | --- | --- |
| $0$ | $3/8$ | $1/4$ |
| $1$ | $1/4$ | $1/4$ |
| $2$ | $1/8$ | $1/4$ |
| $3$ | $1/4$ | $1/4$ |

工作输出 $1,2,4$ 的概率依次为 $1/2,1/4,1/4$；把各自的条件分布按这些权重平均才得到实际边缘分布。这里 $3\nmid4$ 且 $Q<r^2$，仍满足上述公式；这个算例不承担连分数恢复或分解整数的结论。

冻结的数学来源是合入后的 trureturing 提交 `0ee6636c21a9d8fb2bafd11c91a8fb6247154a25` 中的 [`D5/S3/Quantum/ShorCountingMarginal.lean`](https://github.com/the-omega-institute/trureturing/blob/0ee6636c21a9d8fb2bafd11c91a8fb6247154a25/D5/S3/Quantum/ShorCountingMarginal.lean)：上面的 `Parameters.shor_qpe_probability_mixture`、`shor_distribution_normalized`、`shor_mixture_peak_lower_bound`，以及提供单相位估计的 `QuantumPhaseEstimationGeneral.qpe_arbitrary_phase_lower_bound`。源码参数 `modulus, base, width, dimension, period` 分别对应 $N,a,w,D,r$；`runQPE` 使用 $\mathcal F_-$，`normSquared` 对整个工作寄存器的坐标平方模求和。移植保留 Lean 源文件中的 Apache 2.0 许可与来源注记。周边算法讨论的文献依据是 R. Cleve、A. Ekert、C. Macchiavello 与 M. Mosca，*Quantum Algorithms Revisited*，[arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016)，§§5–6，式 (5.2)–(5.4)、(6.1)–(6.4)。

上述推导给出实际输入的边缘分布、归一化和最近格点的逐点下界。下文增加 $N^2\le Q$，先处理条件候选成员资格，再通过各相位分量上的同一事件求和，得到单次列表成员概率下界，并在显式独立重置前提下推导恰好两次观察的全配对最小公倍数列表事件下界；逐次精确选阶认证、整数分解、任意相关重复与完整门复杂度仍保留 [@rem-grover-qft-shor-literature] 的边界。这里也没有给出任意非二幂 $Q$、每一条条件后验梳子或硬件实现的保证。
:::

从分布到后处理，还要跨过一道数论桥。上面的 $N=7,Q=4,r=3$ 算例只有边缘分布的意义：$N^2=49>4$，不能用于下面的恢复结论。现在增加分辨率条件 $N^2\le Q$，只问一个确定性问题：给定测到的整数，哪个有限列表保证包含所需分式？

::: {.definition #def-shor-observable-candidates title="可观察输入的有限连分数候选" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.candidates"}
对自然数 $y,Q,N$，令 $C(x)$ 为有理数 $x$ 的有限连分数渐近分数列表，并定义

$$
\operatorname{candidates}(y,Q,N)
=\bigl[z\in C(y/Q)\mid\operatorname{den}(z)<N\bigr]。
$$

列表只接收测量整数 $y$、计数容量 $Q$ 与模数 $N$；不接收未知阶 $r$ 或相位指标 $s$。每个有理数都按正分母的既约形式表示。
:::

怎样真正列出 $C(x)$？写 $a_0=\lfloor x\rfloor$、$f=x-a_0$。若 $f=0$，返回单项列表 $[a_0]$；否则先递归列出 $C(1/f)$，把其中每项 $z$ 变为 $a_0+1/z$，再在前端接上 $a_0$。例如 $21/64$ 的第一层给出 $a_0=0$，下一层计算 $64/21=3+1/21$，最终得到 $[0,1/3,21/64]$。递归时正的既约分母严格下降，故列表有限；下文进一步给出列表长度界，并区分阶段数与实际运算成本。源码的 [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) 对负有理数、零与整数同样有定义；候选定义也按有理数除法的全函数约定接收 $Q=0$，但下述应用始终有 $Q>0$。

这份列表与真正的实连分数相连，而非另造一个近似列表。[`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) 给出的精确对应是：对任意有理数 $x,z$，$z\in C(x)$ 当且仅当存在 $k\in\mathbb N$ 使 $\operatorname{Real.convergent}(x,k)=z$。实数版本在有理数终止之后重复末项；有限列表只需保留这个值。以下用 [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) 记有理数 $s/r$；当 $r>0$ 时，其分母公式 [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) 为 $d=r/\gcd(s,r)$。

有限性之外，还可以控制列表有多长。记 $d=\operatorname{den}(x)$ 为有理数 $x$ 的规范正既约分母，并把 $\operatorname{Nat.log}(2,d)$ 读作 $\lfloor\log_2d\rfloor$；这里总有 $d\ge1$。

::: {.theorem #thm-rational-convergents-log-length title="有理渐近分数列表的对数长度界" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
对每个有理数 $x\in\mathbb Q$，

$$
\operatorname{length}(C(x))\le2\operatorname{Nat.log}(2,\operatorname{den}(x))+1.
$$

这包括负有理数、零与整数。整数的分母为 $1$，其列表为单项，等号成立。
:::

::: proof
对正既约分母作强归纳。整数直接终止；若倒数小数部分仍非整数，连续两次递归后的分母与一次递归后的分母之和不超过原分母，且前者严格小于后者，所以两步后的分母不超过原分母的一半。自然数对数的单调性与乘二公式支付这两项列表长度，再用归纳假设。完整证明由 Lean 内核检查。
:::

应用到可观察候选，只需 $y,Q,N\in\mathbb N$ 与 $Q>0$。过滤不能增加列表长度，且

$$
\operatorname{den}(y/Q)=\frac{Q}{\gcd(y,Q)}\le Q.
$$

于是由 [@thm-rational-convergents-log-length] 与自然数对数的单调性得到

$$
\begin{aligned}
\operatorname{length}(\operatorname{candidates}(y,Q,N))
&\le2\operatorname{Nat.log}(2,Q)+1,\\
\operatorname{length}(\operatorname{candidates}(y,2^n,N))&\le2n+1
\quad(n\in\mathbb N).
\end{aligned}
$$

这是所引长度界的应用，不要求 $y<Q$，也不要求 $N>0$；$n=0$ 时上界为 $1$，$N=0$ 时过滤后的列表为空。所计的是列表项数或欧几里得递归阶段数；递归定义中逐层 `map` 的总工作量、算术位复杂度与门复杂度没有由此给出。较短的列表也没有认证精确选择器，更没有使每个候选分母都整除真阶。下面的恢复结论仍须保留各自的实际参数、分辨率、最近条件与互素性假设。

::: {.theorem #thm-shor-nearest-candidate title="最近样本的条件候选成员资格" lean="D5/S3/Quantum/ShorContinuedFractions.shor_nearest_candidate"}
对每个实际补齐模乘的参数记录 $c:\operatorname{Parameters}$，记模数 $N=c.\operatorname{modulus}\ge2$、自然数底数 $a=c.\operatorname{base}$，其中 $\gcd(a,N)=1$；工作宽度 $w=c.\operatorname{width}$ 满足 $N\le2^w$，真阶 $r=c.\operatorname{period}=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)$ 满足 $0<r<N$。对任意独立选取的计数宽度 $n\in\mathbb N$，令 $Q=2^n$。对每个 $s\in\mathrm{Fin}\,r$ 与 $y\in\mathrm{Fin}\,Q$，假设

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right)。
$$

则

$$
\begin{aligned}
\operatorname{reduced}(s.\operatorname{val},r)
&\in\operatorname{candidates}(y.\operatorname{val},Q,N),\\
\operatorname{den}\bigl(\operatorname{reduced}(s.\operatorname{val},r)\bigr)&\mid r。
\end{aligned}
$$
:::

::: proof
圆周最近条件排除绕回后给出普通绝对误差至多 $1/(2Q)$。令 $d$ 为约分后的分母；由 $d\le r<N$ 与 $N^2\le Q$ 得 $d^2<Q$，因此误差严格小于 $1/(2d^2)$。Legendre 逼近定理给出一个实渐近分数指标，上述有限列表对应把它转为实际成员；$d<N$ 使其通过候选过滤。分母公式 $d=r/\gcd(s.\operatorname{val},r)$ 给出 $d\mid r$。完整证明由 Lean 内核检查。
:::

这里的假设就是 $\operatorname{Nearest}$ 本身。沿用前面的定义，它表示存在整数 $z$ 使

$$
\left|\frac{s.\operatorname{val}}r-\frac{y.\operatorname{val}}Q-z\right|\le\frac1{2Q}。
$$

为什么此处不会绕回？记 $\theta=s.\operatorname{val}/r$、$u=y.\operatorname{val}/Q$，则 $0\le\theta\le1-1/r$、$0\le u\le1-1/Q$。非零整数平移的最近两种可能是 $z=1$ 与 $z=-1$；它们的误差分别至少为 $1/r$ 与 $1/Q$，都严格大于 $1/(2Q)$，更远的整数也不可能。因此 $z=0$。非严格的最近格点条件仍允许两边的舍入并列；转成严格 Legendre 半径靠的是分母平方的余量：

$$
\left|\frac{y.\operatorname{val}}Q-\frac{s.\operatorname{val}}r\right|
\le\frac1{2Q}<\frac1{2d^2},
\qquad d\le r<N,\quad N^2\le Q。
$$

::: {.theorem #thm-shor-coprime-candidate title="互素相位下真阶的条件成员资格" lean="D5/S3/Quantum/ShorContinuedFractions.shor_coprime_candidate"}
对每个上述实际参数记录 $c$（$N\ge2$、$\gcd(a,N)=1$、$N\le2^w$、$0<r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)<N$），每个独立计数宽度 $n\in\mathbb N$、$Q=2^n$、$s\in\mathrm{Fin}\,r$ 与 $y\in\mathrm{Fin}\,Q$，假设

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right),\qquad
\gcd(s.\operatorname{val},r)=1。
$$

则真阶出现在候选分母列表中：

$$
r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)。
$$
:::

::: proof
[@thm-shor-nearest-candidate] 给出约分相位的候选成员资格；互素性使其分母 $r/\gcd(s.\operatorname{val},r)$ 等于 $r$。完整证明由 Lean 内核检查。
:::

$r,s$ 是刻画测量结果的潜在假设参数，读者运行候选计算时并不知道它们。第二条结论只说真阶在有限列表里，没有认证如何选中它；第一条的整除性只属于那个被指定的约分相位，绝不覆盖所有候选。以下是独立精确有理数计算，不为算例另加 Lean 验证标记：

| $N,a,Q;r,s,y$ | 最近误差与上界 | $\operatorname{candidates}(y,Q,N)$ |
| --- | --- | --- |
| $7,2,64;3,1,21$ | $1/192\le1/128$ | $[0,1/3]$ |
| $13,4,256;6,1,43$ | $1/768\le1/512$ | $[0,1/5,1/6]$ |
| $7,2,64;3,0,0$ | $0\le1/128$ | $[0]$ |

第一行刚才已经按欧几里得递归算出全列表；$21/64$ 的分母不小于 $7$，被过滤掉。第二行的全列表是 $[0,1/5,1/6,21/125,43/256]$；过滤后既包含正确分母 $6$，也包含不整除 $6$ 的 $5$。因此不能把“取最后一个候选”或“通过一次模幂检验”写成这里已证明的精确选阶算法。即使检验 $a^d\equiv1\pmod N$ 通过，它本身只说明 $r\mid d$，即 $d$ 是阶的倍数，不能保证 $d=r$。

零有理数的分母为 $1$，所以 $s=0$ 仍在第一条定理范围内；$r=1$ 时唯一相位是 $s=0$，且 $\gcd(0,1)=1$，第二条同样适用。恢复条件 $N\ge2$、$N^2\le2^n$ 已排除了 $n=0,1$，而前面的边缘分布允许这些宽度。两条候选定理均不要求 $r\mid Q$，也不把工作宽度 $w$ 与计数宽度 $n$ 等同。若实验末端使用本章的正指数 $\mathcal F_+$，对观察标号 $k_+$ 应先取 $y=\rho(k_+)=(-k_+)\bmod Q$，再检查针对同一相位 $s/r$ 的最近条件并计算这里的候选；直接保留原标号会改变所逼近的相位。

**一次实际测量，候选列表包含真阶的概率。** 现在把条件恢复与实际边缘分布接起来。固定上述任意实际参数记录 $c$，仍取 $N=c.\operatorname{modulus}\ge2$、$r=c.\operatorname{period}$、$0<r<N$，并令 $Q=2^n$、$N^2\le Q$。使用的恰是 $c.\operatorname{modularOperator}$ 与 $c.\operatorname{input}$：模乘在补齐坐标上不动，工作输入为 $|1\rangle$，工作宽度与计数宽度独立。定义有限测量事件

$$
\begin{aligned}
E=\bigl\{y\in\mathrm{Fin}\,Q:\;&r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)\bigr\},\\
p(y)&=\operatorname{normSquared}\!\left(
\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right),\\
k(s,y)&=p_Q(s.\operatorname{val}/r,y),\qquad A=\frac4{\pi^2}.
\end{aligned}
$$

$E$ 对应源码的 `r ∈ (candidates y.val Q N).map Rat.den`。未知的 $r$ 只定义成功事件，候选计算的输入仍然只有 $y.\operatorname{val},Q,N$。所有比值均在把自然数转为实数后计算。由 [@thm-shor-distribution-normalized]，$\Pr_-(E)=\sum_{y\in E}p(y)$ 确实是这次实际计数测量的事件概率。下面逐步得到

$$
\Pr_-(E)\ge\frac4{\pi^2}\frac{\varphi(r)}r,
\qquad \varphi(r)=\operatorname{Nat.totient}(r).
$$

这个界由已引用结果结合有限计数得到。

**先为每个相位找一个合法的最近标号。** 对 $s\in\mathrm{Fin}\,r$，取实数 $x=Qs.\operatorname{val}/r$ 的最近整数 $m$；最近整数估计 `abs_sub_round` 给出 $|x-m|\le1/2$。因为 $0<r<N$、$N^2\le Q$，有 $r<Q$，故

$$
\begin{aligned}
0\le x&\le Q-\frac Qr<Q-1,\\
-\frac12\le m&\le x+\frac12<Q-\frac12.
\end{aligned}
$$

$m$ 是整数，所以 $0\le m<Q$，可取 $y_s\in\mathrm{Fin}\,Q$ 满足 $y_s.\operatorname{val}=m$。除以 $Q>0$ 得

$$
\left|\frac{s.\operatorname{val}}r-\frac{y_s.\operatorname{val}}Q\right|
\le\frac1{2Q}.
$$

这以整数平移 $z=0$ 满足 $\operatorname{Nearest}$。只需存在一个这样的标号；若恰有中点并列，两边的非严格最近选择都满足同一估计。$s=0$ 也包括在内。

**再在每个分量内界定同一事件的质量。** 记

$$
\mathcal C=\{s\in\mathrm{Fin}\,r:\gcd(s.\operatorname{val},r)=1\}.
$$

对每个 $s\in\mathcal C$，[@thm-shor-coprime-candidate] 把所选 $y_s$ 放进 $E$；[@thm-qpe-arbitrary-phase-lower-bound] 则给出 $k(s,y_s)\ge A$。每个 $k(s,y)$ 都是复振幅的平方模，非负，因此

$$
\begin{aligned}
\sum_{y\in E}k(s,y)&\ge k(s,y_s)\ge A
&& (s\in\mathcal C),\\
\sum_{y\in E}k(s,y)&\ge0
&& (s\notin\mathcal C).
\end{aligned}
$$

这里先对各分量中的事件 $E$ 求和；没有把可能重合的 $y_s$ 当作互异测量结果相加，也无需证明所选标号互异。

**最后用实际混合与互素计数合并。** [@thm-shor-qpe-probability-mixture] 给出 $p(y)=r^{-1}\sum_{s\in\mathrm{Fin}\,r}k(s,y)$。交换有限和，再使用上面的分量事件下界与正权重 $1/r$，得到

$$
\begin{aligned}
\Pr_-(E)
&=\sum_{y\in E}\frac1r\sum_{s\in\mathrm{Fin}\,r}k(s,y)\\
&=\frac1r\sum_{s\in\mathrm{Fin}\,r}\sum_{y\in E}k(s,y)\\
&\ge\frac1r\sum_{s\in\mathcal C}A\\
&=\frac{|\mathcal C|}{r}\,A
=\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

最后一步是有限计数：`Fin.sum_univ_eq_sum_range` 将 $\mathrm{Fin}\,r$ 的求和改写为 $0\le s<r$ 的求和，`Nat.coprime_comm` 将互素谓词的顺序与 `Nat.totient` 的定义对齐，故 $|\mathcal C|=\#\{a\in\mathbb N:a<r,\ \gcd(r,a)=1\}=\varphi(r)$。这个比值来自同一实际输入的谱混合权重与互素相位的个数，不是假设另有一次均匀抽取隐含相位的随机实验。$r=1$ 时 $\mathcal C=\{0\}$、$\varphi(1)=1$，唯一相位为零，唯一有非零概率的计数结果也为零，且零候选的分母为 $1$；实际事件概率为 $1$，下界仍适用。整个推导不要求 $r\mid Q$，也没有在既有分辨率条件之外另加宽度限制。

**正指数输出用反射事件。** 若末端采用 $\mathcal F_+$，令 $b$ 为观察标号，使用前文的对合置换 $\rho(b)=(-b)\bmod Q$，则事件应写为

$$
\begin{aligned}
E_+&=\{b\in\mathrm{Fin}\,Q:\rho(b)\in E\},\\
\Pr_+(E_+)&=\sum_{\rho(b)\in E}P_+(b)\\
&=\sum_{y\in E}P_-(y)
\ge\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

等式使用 $P_+(b)=P_-(\rho(b))$ 与 $\rho^2=\mathrm{id}$。最近条件和候选计算均作用于反射后的 $\rho(b)$，即计算 `candidates (rho b).val Q N`；这里没有把未反射的正指数候选事件换成 $E$。

这个下界保证一次实际测量所得的有限候选列表含有真阶的概率，不认证从列表中选出精确阶，也不说明所有候选分母都整除真阶。它本身没有指定两次测量的联合律；下面的应用显式加入两次独立重置的采样前提。理想相位采样的精确最小公倍数乘积律、因子提取、完整位复杂度或门复杂度、硬件实现与实测性能仍不在这一单次推导内；条件后验梳子的集中也没有随实际边缘事件一并得到证明。

**应用：两次独立重置，把两份分母补成真阶。** 一次约分可能丢掉真阶的某些素因子；另一份分母可以把它们补回来。这里沿用 `ShorContinuedFractions` 源文的两次重置应用，所问的是从两个可观察整数算出的全配对最小公倍数列表是否含有真阶。

固定同一个实际参数记录 $c$，令

$$
N=c.\operatorname{modulus}\ge2,\qquad
r=c.\operatorname{period}>0,\qquad
Q=2^n,\qquad N^2\le Q.
$$

仍有 $r<N$。两次都从原计数初态与原工作输入 $c.\operatorname{input}=|1\rangle$ 重新制备，使用同一个 $c.\operatorname{modularOperator}$ 与末端逆傅里叶变换；底数、模数、工作宽度和计数宽度都相同。记

$$
\begin{aligned}
A_-(y)&=\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y,\\
p(y)&=\operatorname{normSquared}(A_-(y))
=\sum_{u\in\mathrm{Fin}\,c.\operatorname{dimension}}|A_-(y)(u)|^2.
\end{aligned}
$$

这是对全部工作坐标（包括补齐坐标）求和的实际边缘概率。**独立重置是本应用明确采用的模型与采样前提**：两次完整制备和测量的输出 $Y_1,Y_2$ 服从

$$
\Pr_-(Y_1=y,Y_2=z)=p(y)p(z).
$$

两份相同的边缘分布本身不蕴含这个联合律；例如让第二个结果总是复制第一个，边缘仍可相同而联合律通常不同。保留未重置的工作寄存器或允许任意相关重复，也不能直接套用这里的乘积律。由平方范数的非负性与 [@thm-shor-distribution-normalized]，

$$
p(y)p(z)\ge0,\qquad
\sum_{y,z\in\mathrm{Fin}\,Q}p(y)p(z)
=\left(\sum_y p(y)\right)\left(\sum_z p(z)\right)=1.
$$

**解码只看两个观察整数。** 定义分母列表与全配对列表

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

源码写法分别为 `(candidates y.val Q N).map Rat.den` 与 `(D y).flatMap (fun d => (D z).map (fun e => Nat.lcm d e))`：依次取第一份列表的每个 $d$，列出它与第二份列表全部 $e$ 的最小公倍数，再把这些小列表接起来。计算只使用 $y,z,Q,N$，既不接收未知 $r$，也不接收潜在相位指标。定义成功事件

$$
E_2(y,z)\ \Longleftrightarrow\ r\in L(y,z),\qquad
\Pr_-^{(2)}(E_2)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}\,p(y)p(z).
$$

指示函数 $\mathbf1_{E_2(y,z)}$ 在成员资格成立时为 $1$，否则为 $0$。同一观察对只计一次，哪怕候选列表含重复项，或者有好几对候选分母都给出 $r$。未知真阶只用于数学上判断成功，不用于构造列表。以下逐步得到

$$
\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
$$

**条件恢复：两份分母分别丢掉了什么？** 对每个 $s,t\in\mathrm{Fin}\,r$，前文的最近整数构造分别给出 $y_s,y_t\in\mathrm{Fin}\,Q$，满足针对 $s.\operatorname{val}/r$ 与 $t.\operatorname{val}/r$ 的 $\operatorname{Nearest}$ 条件。具体说，把 $Qs.\operatorname{val}/r$ 四舍五入到某个整数 $m$，误差至多 $1/2$；$r<Q$ 保证 $0\le m<Q$。这只要求最近标号存在，包含零相位和中点两侧的非严格并列选择。

[@thm-shor-nearest-candidate] 分别把两个约分相位放入对应候选列表；原有的 [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) 给出被指定的两个分母

$$
d_s=\frac r{\gcd(s.\operatorname{val},r)}\in D(y_s),\qquad
d_t=\frac r{\gcd(t.\operatorname{val},r)}\in D(y_t).
$$

两个最大公因数都整除 $r$。应用 `Nat.div_lcm_eq_div_gcd` 与 `Nat.gcd_gcd_gcd_right`，得到精确恒等式

$$
\operatorname{lcm}(d_s,d_t)
=\frac r{\gcd\bigl(\gcd(s.\operatorname{val},t.\operatorname{val}),r\bigr)}.
$$

因此，只要相位对是**联合本原的**，即 $\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1$，便有 $r\in L(y_s,y_t)$。它不要求两个分子各自与 $r$ 互素，也不说明其他候选分母都整除 $r$。

例如取实际模数 $N=13$、底数 $a=4$、工作宽度 $w=4$、$Q=256$；真阶是 $r=6$。对相位分子 $s=2,t=3$，最近观察可取 $y=85,z=128$，误差分别为 $1/768\le1/512$ 与 $0$。直接按可观察输入计算，

$$
\begin{aligned}
\operatorname{candidates}(85,256,13)&=[0,1/3],& D(85)&=[1,3],\\
\operatorname{candidates}(128,256,13)&=[0,1/2],& D(128)&=[1,2],\\
L(85,128)&=[1,2,3,6].
\end{aligned}
$$

这里 $\gcd(2,6)=2$、$\gcd(3,6)=3$，两份被恢复的分母分别为 $3$ 与 $2$，单独都不是真阶，最小公倍数却是 $6$。相位和真阶解释了这个观察对为什么成功；实际列举列表时并未使用它们。本例只是确定性的手算，不以这一个观察对的概率代替整个事件的概率。

**联合本原相位对至少占一半。** 令

$$
H_r=\#\{(s,t)\in\mathrm{Fin}\,r\times\mathrm{Fin}\,r:
\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1\}.
$$

若一对不满足这个条件，便有某个素数 $p\mid r$ 同时整除两个分子。对每个这样的 $p$，把 $p\mid s.\operatorname{val}$ 的标号送到 $s.\operatorname{val}/p$，得到到 $\mathrm{Fin}(r/p)$ 的单射；这里 $p\mid r$，整数除法没有余数。零分子也在这个集合中。因此，同时被 $p$ 整除的有序相位对至多有 $(r/p)^2$ 个。对不同素数取并集上界，得到

$$
\begin{aligned}
r^2-H_r&\le\sum_{p\in\operatorname{primeFactors}(r)}(r/p)^2,\\
\frac{r^2-H_r}{r^2}&\le
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}.
\end{aligned}
$$

这里按不同素因子求和，重复素因子不重复计数；不同坏集合重叠只会使这个上界更宽松。比值在转为实数后计算。

为控制最后的和，先分出 $2,3,5$；其余素因子都是至少 $7$、至多 $r$ 的奇数，所以属于 $\{7+2k:0\le k<r\}$。使用原有的有限尾和估计 [`reciprocal_square_shifted_finite_tail_le`](lean:D5/S3/Quantum/QPECircularTail.reciprocal_square_shifted_finite_tail_le)：对任意实数 $b>0$、任意 $m\in\mathbb N$，

$$
\sum_{k=0}^{m-1}\frac1{(b+k)^2}\le\frac1{b^2}+\frac1b.
$$

它保留完整的正性假设与整个倒平方数列。其机制是先保留首项，再用

$$
\frac1{(x+1)^2}\le\frac1x-\frac1{x+1}\qquad(x>0)
$$

控制余项；有限望远镜和的末端倒数非负，丢掉后得到所示上界。$m=0$ 时左边是空和。取 $b=7/2,m=r$，便有

$$
\begin{aligned}
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}
&\le\frac14+\frac19+\frac1{25}
 +\frac14\sum_{k=0}^{r-1}\frac1{(7/2+k)^2}\\
&\le\frac14+\frac19+\frac1{25}
 +\frac14\left(\frac4{49}+\frac27\right)\\
&=\frac{21739}{44100}<\frac12.
\end{aligned}
$$

好坏相位对合计为 $r^2$，所以充分得到 $2H_r\ge r^2$。这里只需要这个半密度界。理想独立均匀相位模型中的精确密度 $\prod_{p\mid r}(1-p^{-2})$ 是另一个文献量；上述并集估计没有证明那条精确乘积公式，也没有把它认作有限时钟的实际候选事件概率。这些标准计数与尾和的组合不承担数学原创性的主张。

**先固定相位对，界定整个事件的分量质量。** 沿用 $k(s,y)=p_Q(s.\operatorname{val}/r,y)$ 与 $A=4/\pi^2$，对固定的 $(s,t)$ 定义

$$
\begin{aligned}
K_{s,t}(y,z)&=k(s,y)k(t,z)\ge0,\\
M_{s,t}&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}K_{s,t}(y,z).
\end{aligned}
$$

若 $(s,t)$ 联合本原，上面的条件恢复给出 $E_2(y_s,y_t)$。[@thm-qpe-arbitrary-phase-lower-bound] 在实际模乘相位上的[特化](lean:D5/S3/Quantum/ShorCountingMarginal.shor_phase_accuracy_bound) 给出 $k(s,y_s)\ge A$、$k(t,y_t)\ge A$。其余被求和的项非负，故

$$
\begin{aligned}
M_{s,t}&\ge K_{s,t}(y_s,y_t)\ge A^2
&&\text{若 }\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1,\\
M_{s,t}&\ge0&&\text{对其余相位对}.
\end{aligned}
$$

这是一个固定分量中**整个成员事件**的质量下界，不能换成把不同潜在相位对应的实际观察点概率反复相加。

**再展开实际乘积律，按 $1/r^2$ 合并。** 由 [@thm-shor-qpe-probability-mixture]，每个实际边缘都是 $p(y)=r^{-1}\sum_s k(s,y)$。在已经明确采用的独立重置律下，

$$
\begin{aligned}
p(y)p(z)&=\frac1{r^2}
\sum_{s,t\in\mathrm{Fin}\,r}K_{s,t}(y,z),\\
\Pr_-^{(2)}(E_2)
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}
\sum_{y,z\in\mathrm{Fin}\,Q}\mathbf1_{E_2(y,z)}K_{s,t}(y,z)\\
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}M_{s,t}\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

第二行只交换有限求和。潜在相位对是实际乘积分布的谱展开指标，不是解码输入，也不是额外测量的随机变量。即使不同相位对选到了同一观察对，该观察对始终只有一个指示函数；被展开的是它自身的实际质量。因此候选重复和最近标号碰撞都不会把事件重复计数。

**正指数与原生正指数电路：同一受控态，两个标号都反射。** 保留同一个实际傅里叶变换前的受控态

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}.
$$

对每个工作坐标 $u$，令 $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$；这里 $\operatorname{QFT}$ 就是本章的正指数 $\mathcal F_+$。把前文 $\rho$ 的同一个标号反射记为 $\nu$：

$$
\begin{aligned}
e&=(\operatorname{ZMod.finEquiv}\,Q).\operatorname{toEquiv},&
\nu(y)&=e^{-1}(-e(y)),\\
\nu(0)&=0,&\nu(\nu(y))&=y,\\
\nu(y).\operatorname{val}
&=\begin{cases}0,&y=0,\\Q-y.\operatorname{val},&y\ne0.\end{cases}
\end{aligned}
$$

零分支不可省略：标号 $0$ 的反射仍为 $0$，不能把超出 $\mathrm{Fin}\,Q$ 的整数 $Q$ 当成结果。对同一 $V$ 的每个列向量，正指数核等于反射标号处的负指数核。非零分支中，两者的相位相差整数频率 $k.\operatorname{val}$；零分支直接相等。这正是原有 `phase_conj` 与 `phase_shift_int` 的应用，给出整个工作向量的精确等式

$$
A_+(y)=A_-(\nu(y)).
$$

这不是只比较轨道上某一个振幅。定义 $p_+(y)=\operatorname{normSquared}(A_+(y))$，对完整工作载体求平方模和便有

$$
p_+(y)=p(\nu(y))\ge0,\qquad
\sum_y p_+(y)=\sum_y p(\nu(y))=1.
$$

最后一步按对合置换 $\nu$ 重排求和。对于任意观察对谓词 $F$，按两个坐标的乘积置换重排得到

$$
\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(\nu(y),\nu(z))}p_+(y)p_+(z)
=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p(y)p(z).
$$

所以，两次正指数实验同样明确假设独立重置、联合质量为 $p_+(y)p_+(z)$ 时，正确的成功事件与下界是

$$
\begin{aligned}
E_{2,+}(y,z)&\ \Longleftrightarrow\ r\in L(\nu(y),\nu(z)),\\
\Pr_+^{(2)}(E_{2,+})&=\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

这个正指数乘积律也非负且归一化。两个观察标号都要先反射，再送入候选计算；这里不对未反射的正指数事件 $r\in L(y,z)$ 宣称同一下界。整个论证反射的是实际观察值，不假设某个最近标号选择规则在反射下等变。

[@thm-qft-circuit-action] 还把同一结论接到实际原生正指数电路。对任意 `OracleModel` 及其 `Interpretation`，令 $M_n$ 为 `Source.circuit oracles n` 经该解释的 `onBinaryLabels` 矩阵。所引声明在每个向量上把 $M_n$ 的作用等同于 $\operatorname{QFT}\,Q$，因此逐个作用于同一实际受控态的列 $k\mapsto V(k)(u)$，得到

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

对全部 $u$ 求平方模和，便是同一个 $p_+$；归一化、双坐标反射的事件等式与两次独立重置下的 $8/\pi^4$ 下界随之适用。这没有更换受控模乘、工作输入或傅里叶变换前的联合态。

**边界情形与所获结论。** 恢复只要求既定的 $N^2\le2^n$，不要求 $r\mid Q$。$r=1$ 时唯一相位对是 $(0,0)$，它联合本原，$H_1=1$，素因子集合为空；两次实际结果都是 $0$，$D(0)=[1]$，$L(0,0)=[1]$，实际成功概率为 $1$。对任意 $r>0$，零分子、一个或两个零观察标号以及重复素因子都没有从定义中删去；例如 $s=0$ 时被指定的约分分母为 $1$。两侧中点并列均适用，不要求最近标号唯一。反射和原生电路等式本身包含 $n=0,Q=1$；恢复的 $N\ge2,N^2\le Q$ 则已排除 $n=0,1$。有限尾和估计在求和范围为空时同样成立。

这个组合应用保证的恰是：在同一实际模乘模型的两次独立重置采样下，从两个观察值生成的完整全配对列表包含共同真阶的概率至少为 $8/\pi^4$。它没有给出从完整候选最小公倍数列表中认证精确阶的选择器，也没有认证把整份列表的所有项一起取最小公倍数就等于真阶；其他候选仍可能混入额外因子。任意相关重复、高效均匀单位采样、递归素因子分解、位或门复杂度、硬件表现均不由此给出。下文均匀单位群中的 Good 比例与同事件双侧 gcd 提取属于另一种抽样；若没有明确的共同联合律，不能把它与这里的量子事件概率直接相乘。

连分数候选与列表长度结论取自所钉源码的 `ShorContinuedFractions`、`FiniteRationalConvergents` 与 `FiniteRationalConvergentsLength`；有理列表与长度证明由 aicyberg 提供，模块保留供给源 *Finite-register phase estimation and spectral Shor order finding*（[solanaqubits/leanbook，固定版本](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)）的来源与 Apache 2.0 许可。来源审计 [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) 仍为三项已验证、一项未完成：更一般的时钟结论与独立理想采样乘积律没有因本节的模数界特化而一并解决。此前实际边缘分布的独立来源审计 [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) 仍为三项已验证、五十九项未完成。这些审计状态描述覆盖范围，不是否定上述数学证明。上述单次列表成员事件的下界由条件成员资格、实际混合与互素计数组合得到；两次全配对列表事件则在显式独立重置前提下使用联合本原相位对的充分半密度界。下文另从有限循环群计数推导均匀单位底数的 Good 比例与同事件双侧因子证书。独立性始终是采样前提；任意相关重复、逐次精确性认证、经典位复杂度、完整量子门复杂度与硬件表现仍须保留 [@rem-grover-qft-shor-literature] 的边界。

**应用：只凭观察列表，选出通过检验的最小指数。** 前一应用把两份分母补成一张有限菜单，并给出了“真阶在菜单里”的概率下界。现在给这张菜单加一道确定的选择规则：先逐项做模幂检验，再在通过者中取最小值。下面沿用 `ShorContinuedFractions` 源文的选择器应用，用既有列表性质与乘法阶性质给出书面推导。

对任意自然数 $a,N$ 与任意有限自然数列表 $L$，约定

```text
select a N L =
  List.argmin id
    (L.filter (fun d => decide (0 < d ∧ Nat.powMod a d N = 1)))
```

这是既有函数的组合：`filter` 保留正的、模幂检验通过的指数，`List.argmin id` 返回其中数值最小的 `some m`；若过滤后为空，返回 `none`。输入只有 $a,N,L$，没有未知真阶 $r$、潜在相位或“本次是否精确”的标志。列表的顺序、重复项与空列表都保留在定义域内，不先改成集合，也不假定列表里每项都整除真阶。

**先把可执行检验接到实际乘法阶。** 要解释输出的阶意义，固定任意实际参数记录 $c:\operatorname{QuantumShorOrderFindingCore.Parameters}$，取

$$
\begin{aligned}
a&=c.\operatorname{base},&N&=c.\operatorname{modulus}\ge2,\\
r&=c.\operatorname{period}
=\operatorname{orderOf}(a:\operatorname{ZMod}N)>0.
\end{aligned}
$$

记录还给出 $\gcd(a,N)=1$ 与容纳模数的工作宽度；因此这里的 $r$ 是同一个底数、同一个模数的实际阶。以下列表论证与计数宽度、分辨率及 $L$ 的来历无关。由 `Nat.powMod_def`，检验计算的是自然数余数 $a^d\bmod N$。由于 $1<N$，余数 $1$ 正是标准代表元；`ZMod.natCast_eq_natCast_iff'` 与 `Nat.cast_pow` 给出

$$
\operatorname{Nat.powMod}(a,d,N)=1
\quad\Longleftrightarrow\quad
(a:\operatorname{ZMod}N)^d=1.
$$

记过滤后的列表为 $S$。若 $\operatorname{select}(a,N,L)=\operatorname{some}(m)$，`List.argmin_mem` 把 $m$ 放进 $S$，于是

$$
m\in L,\qquad m>0,\qquad
\operatorname{Nat.powMod}(a,m,N)=1,\qquad r\mid m.
$$

最后一项来自 `orderOf_dvd_of_pow_eq_one`。对每个 $d\in L$，若 $d>0$ 且模幂检验通过，则 $d\in S$；`List.le_of_mem_argmin` 因而给出

$$
\forall d\in L,\quad
\bigl(d>0\ \land\ \operatorname{Nat.powMod}(a,d,N)=1\bigr)
\ \Longrightarrow\ m\le d.
$$

这是**给定列表内通过者的最小性**。任何正的通过指数都是 $r$ 的正倍数，所以 $r\le m$；也可直接用 `orderOf_le_of_pow_eq_one` 得到这个不等式。未通过的项不参加比较，未出现的指数不被搜索。返回值由此认证正性、通过性、列表成员资格、列表内最小性以及 $r\mid m$；它本身没有给出 $m=r$ 的识别标志，也没有搜索列表之外更小的正返回指数。

**真阶在菜单里，当且仅当选择器返回真阶。** 对上述每个实际 $c$ 与每个有限 $L$，有精确对应

$$
\operatorname{select}(a,N,L)=\operatorname{some}(r)
\quad\Longleftrightarrow\quad r\in L.
$$

先看从左到右：返回的 $r$ 属于过滤列表 $S$，自然也属于原列表 $L$。

再看从右到左。若 $r\in L$，则 $r>0$ 且 $(a:\operatorname{ZMod}N)^r=1$，所以模幂检验通过，$r\in S$。`List.argmin_eq_none` 说明仅当 $S=[]$ 才会返回 `none`；这里 $S$ 非空，故返回某个 `some m`。这个 $m$ 是正的通过指数，由阶的性质有 $r\le m$；另一方面，$r$ 本身是列表中的通过项，最小值性质给出 $m\le r$。两个不等式夹住同一个数，迫使 $m=r$。这里连接的是两个最小值：$r$ 是所有正返回指数的最小值，$m$ 是菜单内正返回指数的最小值；$r\in L$ 使它们重合。

失败返回也有完整的等价式：

$$
\operatorname{select}(a,N,L)=\operatorname{none}
\quad\Longleftrightarrow\quad
\forall d\in L,\ \neg\bigl(d>0\ \land\
\operatorname{Nat.powMod}(a,d,N)=1\bigr).
$$

因为 `argmin` 返回 `none` 当且仅当 $S$ 为空，而过滤列表为空当且仅当原列表没有正的通过项。`none` 报告这份菜单失败；在实际参数记录下，真阶仍然存在。空列表直接返回 `none`，零指数被正性条件排除；重复的通过项仍是重复项。`argmin` 对并列最小值保留先出现者，但这里分数函数是自然数上的 `id`，并列者就是同一个指数值，所以不影响上述契约。$r=1$ 也包括在内。

**把成员概率逐项改写成精确输出概率。** 回到前一应用的同一个实际 $c$ 与同一个计数宽度 $n$，保持 $Q=2^n$、$N^2\le Q$。两次仍使用同一个 $c.\operatorname{modularOperator}$、同一个 $c.\operatorname{input}=|1\rangle$ 和同样的完整工作载体，包括补齐坐标。为明确选择器读到什么，重写前面的列表定义：

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

也就是 `(D y).flatMap (fun d => (D z).map (Nat.lcm d))`，保留所有配对及重复值。定义精确输出事件

$$
X_2(y,z)\ \Longleftrightarrow\
\operatorname{select}(a,N,L(y,z))=\operatorname{some}(r).
$$

通用列表契约逐点给出 $X_2(y,z)\Longleftrightarrow E_2(y,z)$，其中 $E_2(y,z)$ 仍是 $r\in L(y,z)$。选择过程从观察整数构造菜单并执行检验，未知 $r$ 只出现在数学上的成功谓词中。

令 $p_-(y)=p(y)=\operatorname{normSquared}(A_-(y))$。继续明确假设两次完整制备与测量独立重置，联合质量为 $p_-(y)p_-(z)$。这个乘积非负，总和为 $1$。对任意事件 $F$，以

$$
\Pr_-^{(2)}(F)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p_-(y)p_-(z)
$$

定义其概率。由于 $X_2$ 与 $E_2$ 的指示函数在每个观察对上相等，有限和中的每项都不变，故

$$
\begin{aligned}
\Pr_-^{(2)}(X_2)&=\Pr_-^{(2)}(E_2)\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

下界仍来自上面的实际相位混合、每个联合本原分量中的整个事件质量与 $2H_r\ge r^2$。没有另加独立抽取潜在相位的实验，也无需把最近标号的见证选成单射。一个观察对无论产生多少个 $r$、多少对成功分母，都只有一个精确输出指示函数。分辨率、工作补齐和实际输入均未改变，仍不要求 $r\mid Q$；一个或两个零观察标号同样适用。

**原生正指数电路：先反射两个观察值，再选择。** 使用前面同一个

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}
$$

以及 $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$、$p_+(y)=\operatorname{normSquared}(A_+(y))$。反射仍为通过 $\operatorname{ZMod.finEquiv}\,Q$ 实现的取负对合 $\nu$，包含 $\nu(0)=0$ 与 $\nu(\nu(y))=y$。同一受控态上的完整工作向量等式给出

$$
A_+(y)=A_-(\nu(y)),\qquad p_+(y)=p_-(\nu(y)).
$$

因此应定义

$$
X_{2,+}(y,z)\ \Longleftrightarrow\
\operatorname{select}\bigl(a,N,L(\nu(y),\nu(z))\bigr)=\operatorname{some}(r).
$$

两个标号都先反射，零标号仍送到零。两次正指数实验也明确采用独立重置律 $p_+(y)p_+(z)$。按对合置换 $(y,z)\mapsto(\nu(y),\nu(z))$ 重排有限和，得到

$$
\begin{aligned}
\Pr_+^{(2)}(X_{2,+})
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(\nu(y),\nu(z))}p_+(y)p_+(z)\\
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(y,z)}p_-(y)p_-(z)\\
&=\Pr_-^{(2)}(X_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

[@thm-qft-circuit-action] 对任意 `OracleModel` 及其 `Interpretation`，把原生正指数电路的 `onBinaryLabels` 矩阵 $M_n$ 作用于同一个列向量 $k\mapsto V(k)(u)$ 的结果等同于 $\operatorname{QFT}\,Q$。因而逐个工作坐标有

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

对完整载体求平方模和便是同一个 $p_+$，所以上述反射后的选择事件适用于这同一原生电路。这个概率等式依靠双坐标对合重排；它没有给未反射的正指数菜单 $L(y,z)$ 同一下界。未重置目标、相关重复或未指定的相关态也不能借用这里的乘积律。

**菜单里没有真阶，取最小值也补不出来。** 做一个有限的确定性计算。取

$$
N=21,\qquad a=2,\qquad Q=512,\qquad y=z=43.
$$

这里 $21^2=441\le512$。有理数 $43/512$ 的欧几里得展开依次用到

$$
\begin{aligned}
512&=11\cdot43+39,\\
43&=1\cdot39+4,\\
39&=9\cdot4+3,\\
4&=1\cdot3+1.
\end{aligned}
$$

最后 $3=3\cdot1$；相应全列表为 $[0,1/11,1/12,10/119,11/131,43/512]$。按分母严格小于 $21$ 过滤，得到

$$
\begin{aligned}
\operatorname{candidates}(43,512,21)&=[0,1/11,1/12],\\
D(43)&=[1,11,12],\\
L(43,43)&=[1,11,12,11,11,132,12,132,12].
\end{aligned}
$$

最后一行逐行拼接 $[1,11,12]$、$[11,11,132]$ 与 $[12,132,12]$，没有去重。模 $21$ 的前六个正幂余数是

$$
2,\ 4,\ 8,\ 16,\ 11,\ 1,
$$

所以真阶是 $r=6$。菜单中的不同数值 $1,11,12,132$ 的模幂余数分别为 $2,11,1,1$；正的通过项最小值是 $12$，故

$$
\operatorname{select}(2,21,L(43,43))=\operatorname{some}(12),\qquad
\operatorname{Nat.powMod}(2,12,21)=1.
$$

真阶 $6$ 根本不在这份菜单里，返回值仍是它的两倍。这个算例只说明给定整数上的候选计算与选择结果；这里没有断言观察对 $(43,43)$ 在实际量子实验中具有正概率。

若把返回的 $12$ 直接冒充真阶，半指数会变成 $12/2=6$；真正的半阶却是 $6/2=3$。两者给出不同余数：

$$
2^{12/2}\bmod21=1,\qquad
2^{6/2}\bmod21=8.
$$

前者给出的两个 gcd 是 $\gcd(63,21)=21$、$\gcd(65,21)=1$，后者则是 $\gcd(7,21)=7$、$\gcd(9,21)=3$。模幂检验通过，不能替换下文经典因子提取中的真阶前提。全配对也不保证补出菜单缺失的真阶；列表内最小化的精确性来自“真阶一旦在场就会被选中”，并非每份菜单都完整。

**概率保证与逐次证书。** 在明确的实际输入、分辨率及独立重置律下，返回值等于真阶的概率至少为 $8/\pi^4$。这是有界错误的精确输出概率保证。一次 `some m` 没有附带识别本次是否精确的标志；它可能是较大的正倍数，`none` 则只表示没有正的通过菜单项。这里没有得到每次返回都认证精确、每次失败都可识别的 Las Vegas 过程。仅仅重复这种返回也没有给出精确性证书；本应用不据此宣称成功概率的放大。

若另有额外资源，可以检验精确性。既有 `orderOf_eq_of_pow_and_pow_div_prime` 说：对正的通过指数 $m$，若每个素因子 $p\mid m$ 都满足

$$
(a:\operatorname{ZMod}N)^{m/p}\ne1
\quad\Longleftrightarrow\quad
\operatorname{Nat.powMod}(a,m/p,N)\ne1
$$

则 $\operatorname{orderOf}(a:\operatorname{ZMod}N)=m$。机制也可直接看见：已知 $r\mid m$，写 $m=rk$；若 $k>1$，取某个素因子 $p\mid k$，则 $r\mid m/p$，该素数除法检验必返回 $1$，与要求矛盾。所以只能 $k=1$。要把这些检验作为有限证书使用，必须有 $m$ 的**完整且经过核验的素因子分解**，足以穷尽全部不同素因子；只试几个素数不够。$m=1$ 时素因子检验为空，正的通过性本身已迫使真阶为 $1$。取得完整分解与核验给定分解是两项不同任务，选择器并不提供前者；这里没有声称能高效取得这些因子。

取阶倍数中的最小值这一思路，可直接参见 Ekerå，*On the success probability of quantum order finding*，[arXiv:2201.07791v2，§4.1.7](https://arxiv.org/html/2201.07791v2#S4.SS1.SSS7)：当处理后的值全是正的阶倍数，且至少一个就是真阶，最小值便是真阶。这里引用的是这个最小值论证；该文的偏移搜索与基于光滑性的处理不同于本节的全配对菜单，它们的算法与性能估计不随这条引用转移。

有限列表和可执行模幂检验给出了一项明确的计算。前面的对数长度界只数渐近分数项或欧几里得阶段，不自动涵盖全部递归列表操作与有理数运算的位代价；这里也没有端到端位复杂度、量子门复杂度、高效完整因子获取、递归分解或硬件表现的结论。精确输出事件针对固定实际底数的计数观察，下文的经典 Good 事件则针对另一个单位群抽样律。把二者放在同一概率计算中，仍须先指定共同的联合采样构造。

::: {.viz src="phase-gears" preset="leak" height="500"}
**不整除时峰摊开。** $Q = 64$、周期 $6$：品红的 $sQ/r$ 落在 $10.67$、$21.33$ 等整数之间，峰摊到相邻的格，$k = 11$ 高 $0.115$、$k = 10$ 只有 $0.026$，离 $sQ/r$ 最近的六格合计 $0.80$；琥珀色框住的 $k = 11$ 用连分数读出 $\frac{1}{6}$。本卡没有指定实际模数与底数，不能据此核对 $N^2\le Q$，所以这里的集中与读数保持教学数值演示的身份；上述条件成员定理不认证本卡“取最后一个渐近分数”的读法，也不把这些条件梳子的峰高认作实际边缘概率。
:::

**从真阶到因子：哪些底数会失败？** 先看 $N=15$、$a=2$：模 $3$ 的阶为 $2$，模 $5$ 的阶为 $4$，全局真阶为 $r=\operatorname{lcm}(2,4)=4$。半阶幂 $2^2$ 在两个局部分量中分别为 $1$ 与 $-1$，所以在模 $15$ 下既非 $1$ 也非 $-1$。关键不是两个局部阶是否相等，而是它们各自含有多少个因子 $2$：这里是 $1$ 个与 $2$ 个。下面先数任意有限循环群族中的失败元组，再把同一个事件搬回实际单位群。

::: {.theorem #thm-half-order-family-failure-count title="有限循环群族的半阶失败计数" lean="D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.failure_count_le"}
对任意非空有限指标类型 $I$、任意群族 $(G_i)_{i\in I}$，若每个 $G_i$ 都是有限循环群，并给定 $\epsilon_i\in G_i$ 满足 $\operatorname{ord}(\epsilon_i)=2$，令

$$
\begin{aligned}
P&=\prod_{i\in I}G_i,\qquad k=|I|,\qquad \epsilon=(\epsilon_i)_{i\in I},\\
\operatorname{Good}_{\epsilon}(x)
&\Longleftrightarrow \operatorname{Even}(\operatorname{ord}(x))
\ \land\ x^{\operatorname{ord}(x)/2}\ne\epsilon,\\
\operatorname{Bad}&=\{x\in P:\neg\operatorname{Good}_{\epsilon}(x)\}.
\end{aligned}
$$

这里 $\operatorname{ord}$ 是群元素的真阶（Lean 的 `orderOf`），$/2$ 是自然数除法。则

$$
|\operatorname{Bad}|\,2^{k-1}\le |P|.
$$

各群的大小可以不同，乘积群 $P$ 无须循环；计数遍及全部元组，包括单位元与奇数阶元组，也包括 $k=1$ 的情形。
:::

::: proof
记 $d_i=\operatorname{ord}(x_i)>0$、$r=\operatorname{ord}(x)>0$，并以 $v_2(d)$ 表示正整数 $d$ 中素因子 $2$ 的指数，即 `d.factorization 2`。乘积中的阶是局部阶的最小公倍数，所以 $v_2(r)=\max_i v_2(d_i)$。

先在一个循环群内取阶为 $d$ 的元素 $z$，设 $M>0$ 为偶数且 $d\mid M$。$(z^{M/2})^2=1$；循环群只有一个阶为 $2$ 的元素 $\epsilon$，因而这个半幂只能是 $1$ 或 $\epsilon$。又有

$$
z^{M/2}=1\ \Longleftrightarrow\ d\mid M/2
\ \Longleftrightarrow\ 2d\mid M
\ \Longleftrightarrow\ v_2(d)<v_2(M).
$$

最后一步中，其余素因子的指数不等式已由 $d\mid M$ 保证。因此 $z^{M/2}=\epsilon$ 恰好等价于 $v_2(d)=v_2(M)$。把 $M=r$ 代入各坐标可知：偶数阶时，失败恰是所有 $v_2(d_i)$ 都达到同一个最大值；奇数阶时，它们全为 $0$，也失败。于是

$$
x\in\operatorname{Bad}\ \Longleftrightarrow\ \exists t\in\mathbb N,\ \forall i\in I,\ v_2(d_i)=t.
$$

为每个循环群选满阶生成元 $g_i$。若 $n_i=|G_i|$，则 $n_i$ 为偶数且 $g_i^{n_i/2}=\epsilon_i$。映射 $z\mapsto zg_i$ 把 $z^{n_i/2}$ 在 $1$ 与 $\epsilon_i$ 之间切换。由刚才的判据，$v_2(\operatorname{ord}(zg_i))\ne v_2(\operatorname{ord}(z))$：若切换前后赋值相同，它们是否等于 $v_2(n_i)$ 也相同，与半幂切换矛盾。

固定一个锚坐标 $i_0\in I$。将失败元组 $x$ 与其余 $k-1$ 个坐标上的布尔位 $b_i$ 编码为元组 $y$：保留 $y_{i_0}=x_{i_0}$；其余坐标在 $b_i=0$ 时取 $x_i$，在 $b_i=1$ 时取 $x_i g_i$。锚坐标给出原元组的共同赋值 $t$；其余编码坐标的赋值等于 $t$ 当且仅当 $b_i=0$。因此从编码可恢复每个布尔位，再消去生成元即可恢复 $x$。这给出从 $\operatorname{Bad}\times\{0,1\}^{I\setminus\{i_0\}}$ 到 $P$ 的注入，比较基数即得结论。$k=1$ 时没有布尔位，且每个元组都失败，故计数界为等式。完整证明由 Lean 内核检查。
:::

这个共同赋值计数来自 Shor（1997）第 5 节、PDF 第 16 页的经典论证，不主张新的数学优先权。以下应用按所钉源码的 `Blueprint/D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.md`、`Blueprint/D5/S3/Quantum/ShorContinuedFractions.md` 及 `Library/QuantumChannels/shor1997gateorbits.md` 的文献归属展开；它是上述计数与阶、同余、互素消去事实的推导，不把整个分解过程归入该 GID。

::: {.example #ex-shor-actual-unit-factors title="实际单位群的 CRT 计数与同事件双侧因子证书"}
**实际素数幂，而非无平方因子的替身。** 取任意奇数 $N>1$，令 $I$ 为 $N$ 的不同素因子集，$k=|I|$，并取

$$
e_p=N.\operatorname{factorization}(p),\qquad
G_p=(\mathbb Z/p^{e_p}\mathbb Z)^\times,\qquad
U_N=(\mathbb Z/N\mathbb Z)^\times.
$$

$I$ 非空，每个 $e_p>0$，每个 $p$ 为奇素数。奇素数幂的完整单位群 $G_p$ 循环；其中字面的单位 $-1$ 的平方为 $1$ 且不等于 $1$，所以阶为 $2$。后一不等式可直接由模数 $p^{e_p}\ge p\ge3$ 看出：模 $n$ 的 $-1=1$ 只可能在 $n=1$ 或 $2$ 时发生。

中国剩余环同构提升为单位群同构

$$
\mathcal E:U_N\ \simeq\ \prod_{p\in I}G_p.
$$

所钉构造是将 `Units.mapEquiv` 作用于 `ZMod.equivPi N hN` 的乘法同构，再复合 `MulEquiv.piUnits`（$h_N$ 为 $N\ne0$）。它保留真阶、每个自然数幂，并把字面的 $-1$ 送到逐坐标的 $-1$。因此，令

$$
\operatorname{Good}(u)\ \Longleftrightarrow\
\operatorname{Even}(\operatorname{ord}(u))\ \land\
u^{\operatorname{ord}(u)/2}\ne-1,
$$

就有 $\operatorname{Good}(u)\Longleftrightarrow\operatorname{Good}_{(-1)_p}(\mathcal E(u))$。限制 $\mathcal E$ 到失败子类型，得到实际失败单位与失败元组的双射；`Nat.card_congr` 将两者的基数相等连同整个载体的基数相等一起搬运。特别地，若

$$
\begin{aligned}
T&=|U_N|=\prod_{p\in I}|G_p|,\\
F&=|\{u\in U_N:\neg\operatorname{Good}(u)\}|,\qquad
S=|\{u\in U_N:\operatorname{Good}(u)\}|,
\end{aligned}
$$

则 [@thm-half-order-family-failure-count] 给出 $F\,2^{k-1}\le T$。这里 $T>0$（载体含单位元）、$2^{k-1}>0$，且 $S+F=T$。在实数或有理数中除以这些正数，得到

$$
\Pr_{u\sim\operatorname{Unif}(U_N)}[\operatorname{Good}(u)]
=\frac ST=1-\frac FT\ge1-\frac1{2^{k-1}}.
$$

这是在**完整实际单位群上均匀抽样**的概率。单位元仍被抽到；其阶为 $1$，所以 Good 为假。若 $N$ 不是素数幂，素因子集非空且基数不为 $1$（`isPrimePow_iff_card_primeFactors_eq_one`），故 $k\ge2$，上界中的失败比例至多 $1/2$，成功比例至少 $1/2$。素数幂的 $k=1$ 情形仍在上述计数范围内，只给出成功比例至少 $0$；没有删去重复素因子，也没有要求 $N$ 无平方因子。

**同一个 Good 同时给出两个真因子。** 这一确定性步骤只需自然数 $N>2$ 与 $\gcd(a,N)=1$，不要求 $N$ 为奇数。令 $u$ 为 $a$ 对应的单位，$r=\operatorname{ord}(u)$，并假设 $\operatorname{Good}(u)$。有限单位群给出 $r>0$；偶性给出 $m=r/2$ 满足 $0<m<r$。真阶的最小性排除 $u^m=1$，Good 排除 $u^m=-1$，而

$$
(u^m)^2=u^{2m}=u^r=1.
$$

这一步使用真阶；任意偶数周期不能代替它。互素性与 $N>2$ 排除 $a=0$，所以 $a\ge1$，自然数 $x=a^m\ge1$。将单位幂投到 $\mathbb Z/N\mathbb Z$，$x$ 的剩余类就是 $u^m$；有了 $1\le x$，自然数减法 $x-1$ 才能按 `Nat.cast_sub` 转成环中的差。于是

$$
\begin{aligned}
N&\mid(x-1)(x+1),\\
N&\nmid x-1,\qquad N\nmid x+1.
\end{aligned}
$$

第一行来自 $(x-1)(x+1)=x^2-1$ 的剩余类为零；第二行分别来自 $u^m\ne1$ 与 $u^m\ne-1$。若 $\gcd(x-1,N)=1$，从第一行作互素消去会得 $N\mid x+1$，矛盾；对称地，若 $\gcd(x+1,N)=1$，则得 $N\mid x-1$，也矛盾。两侧 gcd 都是正的且至多为 $N$；若某侧等于 $N$，又会迫使 $N$ 整除该侧。因此同时有

$$
\begin{aligned}
1&<\gcd(a^m-1,N)<N,\qquad \gcd(a^m-1,N)\mid N,\\
1&<\gcd(a^m+1,N)<N,\qquad \gcd(a^m+1,N)\mid N.
\end{aligned}
$$

**代表元变了，gcd 对不变。** 仍取 $N>2$；对实际单位 $u$，令 $m=\operatorname{ord}(u)/2$，记 $b$ 为 $u$ 的标准自然数代表元，$t$ 为 $u^m$ 的标准自然数代表元。二者均与 $N$ 互素，故 $b,t\ge1$。任意自然数代表元 $a$ 满足 $(a:\mathbb Z/N\mathbb Z)=u$ 时，也与 $N$ 互素且 $a\ge1$。单位幂与剩余类相容给出

$$
a^m\equiv t\pmod N,\qquad b^m\equiv t\pmod N.
$$

这是同余，并非自然数等式。因 $a^m,b^m,t$ 均至少为 $1$，可以用 `Nat.ModEq.sub` 同减 $1$；加 $1$ 则直接保持同余。再用 `Nat.ModEq.gcd_eq` 得到

$$
\begin{aligned}
\bigl(\gcd(a^m-1,N),\gcd(a^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr),\\
\bigl(\gcd(b^m-1,N),\gcd(b^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr).
\end{aligned}
$$

所以双侧证书同时适用于原代表元的幂、标准底数的幂与标准半阶幂代表元。以 $\operatorname{Both}_N(z)$ 表示 $\gcd(z-1,N)$ 与 $\gcd(z+1,N)$ 各自整除 $N$ 且严格介于 $1$ 与 $N$。明确写出带证书的事件：

$$
\begin{aligned}
C(u)\ \Longleftrightarrow\ &\operatorname{Good}(u)\ \land\ \operatorname{Both}_N(b^m)\ \land\ \operatorname{Both}_N(t)\\
&\land\ \bigl(\forall a\in\mathbb N,\ (a:\mathbb Z/N\mathbb Z)=u
\Rightarrow\operatorname{Both}_N(a^m)\bigr).
\end{aligned}
$$

上述确定性推导证明 $\operatorname{Good}(u)\Rightarrow C(u)$，投影到首个合取项证明反向蕴含。恒等映射因而限制为成功子类型之间的双射，故

$$
|\{u\in U_N:C(u)\}|=S.
$$

回到奇数 $N>1$ 的均匀单位抽样，带双侧证书的同一事件概率恰为 $S/T$，继承 $1-1/2^{k-1}$ 的下界；若 $N$ 非素数幂，便至少为 $1/2$。证书没有另换成功事件或抽样载体。
:::

经典单位抽样与前文固定底数下的实际量子测量是两种随机选择。前者的 Good 比例不能直接与后者的候选列表概率相乘；组合需要明确的共同抽样律及相应条件概率。上文已在显式独立重置前提下给出恰好两次实际观察的全配对最小公倍数列表成员事件下界，并用最小通过项选择规则得到相同的精确输出事件下界；以上仍没有给出高效均匀单位采样器、从完整候选最小公倍数列表认证精确阶的选择器、任意相关重复的保证、完整递归素因子分解实现或位／门复杂度。条件后验梳子的集中仍保持前文的文献边界。

下面，让我们通过一个四步完整手算算例，把 $N=4$ 与 $N=8$ 的 Grover 搜索、$3$ 比特 QFT 的二进制相位齿轮、$N=15$ 的 Shor 周期寻找以及 $\mathrm{ZMod}\,16$ 上的字符和与泊松公式逐一验算到底。

::: {.example #ex-grover-four-shor-fifteen title="Grover N=4/N=8 搜索、3 比特 QFT 相位齿轮与 Shor N=15 阶寻找手算及证据边界"}
本例第一步与第四步具体验算本章的 [@thm-grover-uniform-rotation]、[@prop-finite-character-cancellation] 与 [@cor-finite-poisson-period]；第二步按 [@thm-qft-circuit-action] 的正指数、大端、含末端位反转规范展开三比特相位。手算的张量乘积式用于解释这一规范，不额外认证所有张量恒等式。第三步由真阶的 Good 条件得到双侧 $\gcd(a^{r/2} \pm 1,N)$ 真因子的步骤已在 [@ex-shor-actual-unit-factors] 推导；完整 Shor 阶寻找与递归分解实现仍保留 [@rem-grover-qft-shor-literature] 的文献与算法边界。

本例分四步完成本章全部核心公式的具体数值检验：

**第一步：Grover 搜索在 $N = 4$ 上的单步精确命中与 $N = 8$ 的整数步残差。**
取四维搜索空间 $l = \mathrm{Fin}\,4$、单列源 $s = \mathrm{Fin}\,1$，设唯一标记目标为 $|0\rangle$，即 $P = |0\rangle\langle 0|$。取源嵌入 $J = |0\rangle$，制备幺正阵 $C = H \otimes H$，故制备态为均匀叠加态

$$
U = C J = |s\rangle = \frac{1}{2}\bigl(|0\rangle + |1\rangle + |2\rangle + |3\rangle\bigr).
$$

计算成功格拉姆矩阵：$(PU)^*(PU) = |\langle 0\mid s\rangle|^2 = \frac{1}{4}$，故初始成功概率 $p = \frac{1}{4}$，初始倾角为

$$
\alpha = \arcsin\Bigl(\sqrt{\frac{1}{4}}\Bigr) = \arcsin\Bigl(\frac{1}{2}\Bigr) = \frac{\pi}{6} = 30^\circ.
$$

此时归一化成功块与失败块分别为 $W = |0\rangle$ 与 $B = \frac{1}{\sqrt{3}}(|1\rangle + |2\rangle + |3\rangle)$。作用一次 Grover 迭代算子 $Q = (2|s\rangle\langle s| - I_4)(I_4 - 2P)$（取 $n = 1$），由 [@thm-grover-uniform-rotation] 得：

$$
Q U = \sin(3\alpha)\,W + \cos(3\alpha)\,B = \sin\Bigl(\frac{\pi}{2}\Bigr)|0\rangle + \cos\Bigl(\frac{\pi}{2}\Bigr)B = 1 \cdot |0\rangle + 0 \cdot B = |0\rangle!
$$

仅需 $n = 1$ 步，状态向量从 $30^\circ$ 再转 $2\alpha = 60^\circ$，分毫不差地垂直立在目标 $|0\rangle$ 上（成功率 $100\%$）。

作为对比，若将搜索空间扩大到 $N = 8$（仍含 $1$ 个标记项），则 $p = \frac{1}{8}$，$\theta = \arcsin(1/\sqrt{8}) \approx 20.7048^\circ$。利用三倍角公式 $\sin(3\theta) = 3\sin\theta - 4\sin^3\theta = \frac{3}{\sqrt{8}} - \frac{4}{8\sqrt{8}} = \frac{5}{2\sqrt{8}} = \frac{5}{\sqrt{32}}$，迭代 $n = 1$ 步后的成功概率为

$$
P_{\mathrm{succ}}(N=8,\, n=1) = \sin^2\Bigl(3\arcsin\frac{1}{\sqrt{8}}\Bigr) = \frac{25}{32} = 0.78125,
$$

而迭代 $n = 2$ 步后的成功概率为 $\sin^2(5\theta) = \frac{121}{128} = 0.9453125 < 1$。这直观展示了当 $\frac{\pi}{4\theta} - \frac{1}{2} \notin \mathbb{N}$ 时，标准整数步 Grover 迭代必然留有非零的离散角度残差。

**第二步：$3$ 比特量子傅里叶变换（QFT）的位序规范与 $x = 5 = (101)_2$ 相位齿轮验算。**
在 $3$ 比特空间（$m = 8$）中，我们明确采用**输出从最高有效位（MSB）到最低有效位（LSB）排列**的张量因子顺序（即标准 QFT 电路末端显式包含位反转 SWAP 门）。将输入整数 $x \in \{0, \dots, 7\}$ 写为二进制 $x = x_2 x_1 x_0 = 4x_2 + 2x_1 + x_0$，并记二进制小数 $0.b_1 b_2 \cdots b_r = \sum_{j=1}^r b_j 2^{-j}$。则正指数单位化 QFT $\mathcal{F}_+|x\rangle = \frac{1}{\sqrt{8}}\sum_{k=0}^7 e^{+2\pi i k x / 8}|k_2 k_1 k_0\rangle$ 精确分解为三个单比特赤道态的张量积：

$$
\mathcal{F}_+|x_2 x_1 x_0\rangle = \frac{|0\rangle + e^{2\pi i (0.x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_1 x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_2 x_1 x_0)}|1\rangle}{\sqrt{2}}.
$$

请特别注意位序对应关系：各因子的相位由输入低位逐步向高位扩展（$0.x_0 \to 0.x_1 x_0 \to 0.x_2 x_1 x_0$），但**输出的第 1 个张量因子对应频率 $k = 4k_2 + 2k_1 + k_0$ 的最高位 $k_2$**（因为 $4k_2 \cdot x / 8 \equiv k_2 \cdot (0.x_0) \pmod 1$），绝不能把做完末端 SWAP 前后的相反位序画成同一个公式！

取具体输入 $x = 5 = (101)_2$（即 $x_2 = 1, x_1 = 0, x_0 = 1$），三只赤道相位齿轮的转角依次为：

1. **首因子（对应输出最高位 $k_2$）**：二进制小数 $0.x_0 = 0.1_2 = \frac{1}{2}$，相位角 $\phi_1 = 2\pi \cdot \frac{1}{2} = \pi$（$e^{i\pi} = -1$）；
2. **中因子（对应输出中位 $k_1$）**：二进制小数 $0.x_1 x_0 = 0.01_2 = \frac{1}{4}$，相位角 $\phi_2 = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$（$e^{i\pi/2} = i$）；
3. **末因子（对应输出最低位 $k_0$）**：二进制小数 $0.x_2 x_1 x_0 = 0.101_2 = \frac{5}{8}$，相位角 $\phi_3 = 2\pi \cdot \frac{5}{8} = \frac{5\pi}{4}$；

三因子合并后总归一化因子恰为 $\frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}} = \frac{1}{\sqrt{8}}$。

**第三步：Shor 阶寻找算例 $N = 15$、底数 $a = 2$、寄存器容量 $Q = 16$。**
考察待分解合数 $N = 15$，选与 $15$ 互素的底数 $a = 2$。模幂序列 $2^x \bmod 15$（$x = 0, 1, 2, 3, 4, \dots$）依次为

$$
1,\; 2,\; 4,\; 8,\; 1,\; 2,\; 4,\; 8,\; \dots,
$$

其乘法阶（最小正周期）为 $r = 4$。取第一寄存器大小 $Q = 16$（这是一个 $r \mid Q$ 的精确整除教学算例）。在制备均匀叠加 $\frac{1}{4}\sum_{x=0}^{15}|x\rangle|2^x \bmod 15\rangle$ 并条件测得第二寄存器函数值为 $1$ 后，第一寄存器坍缩到以 $r = 4$ 为步长的周期态：

$$
|\psi_{\mathrm{per}}\rangle = \frac{1}{2}\bigl(|0\rangle + |4\rangle + |8\rangle + |12\rangle\bigr).
$$

对其作用 $16$ 点单位化 QFT $\mathcal{F}_+$，输出在第 $k$ 个频点（$k \in \{0, \dots, 15\}$）上的振幅为

$$
\alpha_k = \frac{1}{2\sqrt{16}}\sum_{j=0}^3 e^{2\pi i k (4j) / 16} = \frac{1}{8}\sum_{j=0}^3 \bigl(e^{2\pi i k / 4}\bigr)^j = \begin{cases} \frac{1}{2} & \text{若 } k \in \{0, 4, 8, 12\}, \\ 0 & \text{若 } k \notin \{0, 4, 8, 12\}. \end{cases}
$$

于是测量仅以各 $\bigl|\frac{1}{2}\bigr|^2 = \frac{1}{4}$ 的概率落在四个共振频点 $k \in \{0, 4, 8, 12\}$ 上，其余 $12$ 个频点概率严格为 $0$。逐一核查这四个测量结果的后处理结局：

- **测得 $k = 4$ 或 $k = 12$（共占概率 $1/2$）**：频率比 $k/Q$ 分别为 $4/16 = 1/4$ 或 $12/16 = 3/4$，既约分母均直接给出真实阶 $r = 4$。因 $r = 4$ 为偶数且 $2^{r/2} = 2^2 = 4 \not\equiv -1 \pmod{15}$，计算最大公因数立即分解成功：

  $$
  \gcd(2^{4/2} - 1,\, 15) = \gcd(3, 15) = 3, \qquad \gcd(2^{4/2} + 1,\, 15) = \gcd(5, 15) = 5 \qquad (15 = 3 \times 5)!
  $$

- **测得 $k = 0$（概率 $1/4$）**：给出 $k/Q = 0$，不含周期信息，需重新采样；
- **测得 $k = 8$（概率 $1/4$）**：给出 $k/Q = 8/16 = 1/2$，既约分母为 $d = 2$（仅是真阶 $r = 4$ 的真因子）；代入验证 $2^2 = 4 \not\equiv 1 \pmod{15}$ 可发现 $d = 2$ 尚非完整周期，需倍增检验 $2d = 4$ 或重新运行采样。（因此绝不能声称单次量子采样以 $100\%$ 概率直接吐出周期 $r$！）

**第四步：用 [@prop-finite-character-cancellation] 与 [@cor-finite-poisson-period] 在 $\mathrm{ZMod}\,16$ 上交叉验算。**
在 $m = 16$ 的循环群 $\mathrm{ZMod}\,16$ 中，取加法子群 $H = \{0, 4, 8, 12\}$（基数 $|H| = 4$）。由于 $k \cdot 4 \equiv 0 \pmod{16} \iff 4 \mid k$，其零化子子群恰为自身：

$$
\mathrm{annihilator}(H) = H^\perp = \{0, 4, 8, 12\}, \qquad \mathrm{Fintype.card}\bigl(\mathrm{annihilator}(H)\bigr) = 4.
$$

1. **核对 [@prop-finite-character-cancellation]**：当 $x \in H$ 时，$\sum_{k \in H^\perp} \chi_k(x) = 1 + 1 + 1 + 1 = 4 = |H^\perp|$；当 $x \notin H$（例如 $x = 1$）时，$\sum_{k \in H^\perp} \chi_k(1) = 1 + i + (-1) + (-i) = 0$。
2. **核对 [@cor-finite-poisson-period]**：取子群示性函数 $f = \mathbf{1}_H$。按 Mathlib 负号未归一化定义，对每个 $k \in H^\perp$，有 $(\mathrm{ZMod.dft}\,\mathbf{1}_H)(k) = \sum_{h \in H} e^{-2\pi i h k / 16} = 4$（对 $k \notin H^\perp$ 则为 $0$）。代入 [@cor-finite-poisson-period]：左端为 $\sum_{h : H} \mathbf{1}_H(h.1) = 4$；右端为

   $$
   \frac{|H|}{16} \sum_{k : \mathrm{annihilator}(H)} (\mathrm{ZMod.dft}\,\mathbf{1}_H)(k.1) = \frac{4}{16} \times (4 + 4 + 4 + 4) = \frac{1}{4} \times 16 = 4,
   $$

   两侧分毫不差！
:::

回看例中第一步：$N = 4$ 时只需一步，箭头就立在目标上。

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$：一步立在目标上。** $\theta = 30^\circ$，一步转 $60^\circ$，琥珀色的箭头正好落在目标轴 $W$ 上：青色的影子长 $1$，品红的影子消失，第 $1$ 根柱子顶到 $1$。
:::

$N = 8$ 时走两步仍差一点，成功概率停在 $\frac{121}{128}$。

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$：两步之后还差一点。** 第 $1$ 步后成功概率 $\frac{25}{32}$，第 $2$ 步后 $\frac{121}{128}$：箭头停在 $5\theta \approx 103.5^\circ$，略过竖轴，品红的影子还剩 $-0.234$。
:::

第三步的周期态经过 QFT，只在 $k \in \{0, 4, 8, 12\}$ 四个频点上留下峰。

再由峰读阶：$k = 4$ 与 $12$ 直接给出阶 $4$，$k = 8$ 只给出它的真因子 $2$，$k = 0$ 不含信息。

::: {.viz src="phase-gears" preset="read" height="500"}
**由峰读出阶。** 同一个谱：$k = 4$ 与 $12$ 给出 $\frac{4}{16} = \frac{1}{4}$、$\frac{12}{16} = \frac{3}{4}$，分母是阶 $4$；琥珀色框住的 $k = 8$ 只给出 $\frac{1}{2}$，分母 $2$ 是阶的真因子，要再检验；$k = 0$ 不含信息。
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover 查询下界、QFT 理想计数与完整 Shor 算法的边界"}
<!-- alias: #rem-shor-factoring-literature -->
本章的 Lean 引用覆盖均匀振幅放大、Weyl 共轭、字符相消与有限泊松恒等式，以及实际 QFT 电路作用与原生事件计数（[@thm-qft-circuit-action]、[@thm-qft-native-event-count]）、单相位圆周尾界（[@thm-qpe-circular-tail]）、实际输入边缘分布与逐点下界、有理列表长度和条件候选成员资格。上文将实际混合、最近格点下界与候选恢复组合，推导了 $N^2\le Q$ 下单次列表成员事件的 $\frac4{\pi^2}\frac{\varphi(r)}r$ 下界，并在显式独立重置前提下得到恰好两次观察的全配对最小公倍数列表事件下界 $8/\pi^4$；后者使用联合本原相位对的充分半密度界。正指数规范须反射两次观察的两个标号，原生正指数电路作用于同一受控态时也使用这个修正事件。[@thm-half-order-family-failure-count] 另给出任意非空有限循环群族的失败计数，[@ex-shor-actual-unit-factors] 将其经实际单位 CRT 搬运为均匀 Good 下界，并在同一事件上证明双侧 gcd 真因子。本章的列表选择规则还给出真阶在完整菜单中时返回真阶的精确对应，并将两次独立观察的成员下界转为精确输出概率下界；每次返回是否精确仍无识别证书。以下第 1 项和第 3 项的其余完整算法结论仍是**文献结果，未在本书形式化**；第 2 项只总结上述电路的理想计数及其成本边界。

1. **Grover 搜索与黑盒查询复杂度下界**（L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, doi:10.1145/237814.237866；G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, arXiv:quant-ph/0005055）：在已知解数 $M$、承诺 $1 \le M \le N/4$ 的 $N$ 元无结构搜索中，从均匀叠加态出发，按已知初始成功概率 $p = M/N$ 选取迭代步数，振幅放大以 $O(\sqrt{N/M})$ 次标记黑盒查询将成功概率提升至 $\ge 1 - M/N$。这一稀疏解承诺下，任何量子黑盒算法要以常数有界误差找到解，都需要 $\Omega(\sqrt{N/M})$ 次查询（由 Bennett–Bernstein–Brassard–Vazirani (1997) 的单解黑盒下界归约得到），证实这一黑盒任务中的二次加速已达量子几何极限。
2. **同一 QFT 电路的理想原生门数**：[@thm-qft-native-event-count] 给出 $q$ 个 Hadamard、$q(q-1)/2$ 个受控相位和 $\lfloor q/2\rfloor$ 个 SWAP，合计 $\frac{q(q+1)}2+\lfloor q/2\rfloor$ 次理想原生门出现。由此作通常的渐近计数，得到 $O(q^2)=O((\log Q)^2)$（$Q=2^q$）；电路对已制备复向量的精确正指数作用由 [@thm-qft-circuit-action] 给出。任意输入数据的装载、全部傅里叶系数的经典读出、理想相位门到有限离散门集的综合及硬件性能，都不包含在这个计数中。
3. **Shor 大数分解与阶寻找的完整正确性条件**（P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, doi:10.1137/S0097539795293172）：对于一般合数 $N$（非偶、非素数幂）与随机互素底数 $a$，乘法阶 $r$ 通常不整除 $Q=2^q$。完整算法选取 $N^2\le Q<2N^2$，通过可逆模幂电路在 $O((\log N)^3)$ 基本门内制备相应联合态，再经 QFT 采样。上述单次候选事件与两次独立重置的全配对最小公倍数事件推导覆盖实际模乘模型中的相应列表成员概率；它们没有认证可逆模幂的门实现。后续列表选择应用保证真阶在菜单中时必被选中，并给出精确输出事件的概率下界；模幂通过的任意返回值仍可能是真阶的较大倍数。欧拉函数比值的渐近估计 $\varphi(r)/r=\Omega(1/\log\log r)$ 仍按文献使用，不能把混合中的计数比例改称额外随机相位实验。经典部分现由 [@thm-half-order-family-failure-count] 与 [@ex-shor-actual-unit-factors] 覆盖：对奇数 $N>1$，在完整单位群上均匀抽样的 Good 概率至少为 $1-2^{-(k-1)}$；非素数幂时 $k\ge2$，故至少为 $1/2$，且同事件中的每个自然数底数代表元都给出双侧真因子。这保留全部实际素数幂指数，单位元也留在抽样载体内。该经典概率与固定底数下的量子候选事件使用不同抽样律，尚未在此组成一个共同实验的端到端概率。高效单位采样、从完整候选最小公倍数列表认证精确阶、任意相关重复的保证、理想相位采样的精确欧拉乘积律、完整递归分解实现与位／门复杂度仍不由这些结果给出。两次重置的独立性是明确采用的联合采样前提，不能由两份边缘分布相同而推出。（注：将周期提取比作“把无穷周期因式约分到 $1$”属于启发式几何直觉，绝非已形式化的数学结论。）
:::

::: {.viz src="phase-gears" height="560"}
相位齿轮与周期的完整实验室：换寄存器大小 $Q$、周期 $r$ 与起点，点谱上的柱子选频率 $k$，看它的相位箭头首尾相接；$r$ 整除 $Q$ 且梳子构成完整陪集（起点 $x_0<r$）时，不共振的链闭合为零（[@prop-finite-character-cancellation]）。本页梳子不绕回，边界截短会改变峰高并留下不共振的权重。$r$ 不整除 $Q$ 时谱仍是梳子实际各格箭头的有限和：在 Shor 的设定下（起点 $x_0<r$、梳子铺到寄存器末端，$Q \ge N^2 > r^2$），峰集中在 $sQ/r$ 附近，这种总集中保持文献身份，页面连分数读数仍要检验；[@thm-shor-nearest-candidate] 只在实际参数、分辨率和最近条件成立时保证候选成员资格；截短的梳子可以没有这种集中，只剩一格时谱是平的。
:::

看着 Grover 的二维平面旋转与 QFT 的傅里叶相消，一个更宏大的问题油然而生：**为什么这两类看似风马牛不相及的量子算法，背后都在反复交替调用“酉算子嵌入”与“相位反射/旋转”？有没有一套更高维的几何母框架，能够把搜索、相位估计、哈密顿量模拟乃至矩阵求逆统统收编为同一个二维块上的切比雪夫多项式递推？而在走下理想算法的云端、把连续旋转编译成有限个离散量子门 $\{H, T\}$ 时，我们手里的球体又会露出怎样棱角分明的多面体真相？** 让我们迈入第四部的收官之章——[第十六章](ch16-qsvt-walks-and-compilation.md)。
