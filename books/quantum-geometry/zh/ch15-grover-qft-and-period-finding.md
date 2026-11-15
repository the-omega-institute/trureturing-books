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
**一排逐级减半转速的齿轮。** $Q = 8$、只有一格 $x = 5$：时间轴每走一格，三只紫色齿轮分别转 $\frac{1}{2}$、$\frac{1}{4}$、$\frac{1}{8}$ 圈，走到 $5$ 时停在 $\pi$、$\frac{\pi}{2}$、$\frac{5\pi}{4}$；频率 $k = 7$ 用上三只，链上唯一一支青色箭头指向它们的和 $\frac{3\pi}{4}$。谱是平的，每根柱子都是 $\frac{1}{8}$。QFT 的二进制乘积分解是文献结果，未在本书形式化。
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
3. **代数核心与完整 QFT 电路的边界**：[@lemma-phase-kickback-weyl] 给出了有限 Weyl 代数中“用位移共轭提取辛相位”的精确算子恒等式；而多比特受控相位门与 Hadamard 门如何拼装成多项式门数的量子傅里叶变换（QFT）电路，我们将在 [@ex-grover-four-shor-fifteen] 第二步中按显式二进制位序手算展开，并在 [@rem-grover-qft-shor-literature] 中说明其门数与输入输出边界。

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

1. **有限泊松恒等式不等于完整 Shor 算法的成功概率或多项式复杂度定理**：[@cor-finite-poisson-period] 是 $\mathrm{ZMod}\,m$ 上的精确调和分析恒等式，它本身并不包含模幂电路构造、连分数有理逼近恢复定理、欧拉函数互素概率下界或大数分解的多项式门复杂度（其中条件候选成员资格另见 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate]；完整算法边界见 [@rem-grover-qft-shor-literature]）。
2. **整除情形（$r \mid Q$）与一般非整除情形（$r \nmid Q$）的本质区别**：当 $r \mid Q$ 时，完整的周期梳子是 $\mathrm{ZMod}\,Q$ 中子群的陪集，非共振频点按 [@prop-finite-character-cancellation] **精确为零**。当 $r \nmid Q$ 时，截在寄存器边界上的梳子不能这样套用子群恒等式。此时要计算有限几何和；得到某个峰附近的概率下界之后，从频率逼近得到候选仍是另一项数论任务；下面的条件候选定理完成其中的成员资格部分。

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

::: {.remark #rem-shor-actual-input-marginal title="实际输入推导与 Shor 的剩余边界"}
下面的推导解释上述四条冻结声明；其后的 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate] 另行给出有条件的连分数候选成员资格。范围仍严格小于完整 Shor 算法：总事件成功概率、互素采样、因子提取与门复杂度仍见 [@rem-grover-qft-shor-literature]。

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

这一应用说明的范围是实际输入的边缘分布、归一化和最近格点的逐点下界。有条件的候选成员资格由下文单独处理；测量事件的总成功概率、互素采样、精确选阶、整数分解与门复杂度仍保留 [@rem-grover-qft-shor-literature] 的文献身份；也没有由此给出任意非二幂 $Q$、每一条条件后验梳子或硬件实现的保证。
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

怎样真正列出 $C(x)$？写 $a_0=\lfloor x\rfloor$、$f=x-a_0$。若 $f=0$，返回单项列表 $[a_0]$；否则先递归列出 $C(1/f)$，把其中每项 $z$ 变为 $a_0+1/z$，再在前端接上 $a_0$。例如 $21/64$ 的第一层给出 $a_0=0$，下一层计算 $64/21=3+1/21$，最终得到 $[0,1/3,21/64]$。递归时正的既约分母严格下降，故列表有限；这没有给出运算次数或位复杂度上界。源码的 [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) 对负有理数、零与整数同样有定义；候选定义也按有理数除法的全函数约定接收 $Q=0$，但下述应用始终有 $Q>0$。

这份列表与真正的实连分数相连，而非另造一个近似列表。[`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) 给出的精确对应是：对任意有理数 $x,z$，$z\in C(x)$ 当且仅当存在 $k\in\mathbb N$ 使 $\operatorname{Real.convergent}(x,k)=z$。实数版本在有理数终止之后重复末项；有限列表只需保留这个值。以下用 [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) 记有理数 $s/r$；当 $r>0$ 时，其分母公式 [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) 为 $d=r/\gcd(s,r)$。

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

零有理数的分母为 $1$，所以 $s=0$ 仍在第一条定理范围内；$r=1$ 时唯一相位是 $s=0$，且 $\gcd(0,1)=1$，第二条同样适用。恢复条件 $N\ge2$、$N^2\le2^n$ 排除了 $n=0$，而前面的边缘分布允许 $n=0$。两条候选定理均不要求 $r\mid Q$，也不把工作宽度 $w$ 与计数宽度 $n$ 等同。若实验末端使用本章的正指数 $\mathcal F_+$，对观察标号 $k_+$ 应先取 $y=\rho(k_+)=(-k_+)\bmod Q$，再检查针对同一相位 $s/r$ 的最近条件并计算这里的候选；直接保留原标号会改变所逼近的相位。

这些结论取自所钉源码的 `ShorContinuedFractions` 与 `FiniteRationalConvergents`；两模块保留供给源 *Finite-register phase estimation and spectral Shor order finding*（[solanaqubits/leanbook，固定版本](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)）的来源与 Apache 2.0 许可。来源审计 [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) 仍为三项已验证、一项未完成：更一般的时钟结论与独立理想采样乘积律没有因本节的模数界特化而一并解决。此前实际边缘分布的独立来源审计 [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) 仍为三项已验证、五十九项未完成。这些审计状态描述覆盖范围，不是否定上述数学证明。总成功概率、随机互素率、重复采样独立性、精确选择器、因子提取、经典位复杂度、量子门复杂度与硬件表现均未由候选成员资格推出，仍须保留 [@rem-grover-qft-shor-literature] 的边界。

::: {.viz src="phase-gears" preset="leak" height="500"}
**不整除时峰摊开。** $Q = 64$、周期 $6$：品红的 $sQ/r$ 落在 $10.67$、$21.33$ 等整数之间，峰摊到相邻的格，$k = 11$ 高 $0.115$、$k = 10$ 只有 $0.026$，离 $sQ/r$ 最近的六格合计 $0.80$；琥珀色框住的 $k = 11$ 用连分数读出 $\frac{1}{6}$。本卡没有指定实际模数与底数，不能据此核对 $N^2\le Q$，所以这里的集中与读数保持教学数值演示的身份；上述条件成员定理不认证本卡“取最后一个渐近分数”的读法，也不把这些条件梳子的峰高认作实际边缘概率。
:::

下面，让我们通过一个四步完整手算算例，把 $N=4$ 与 $N=8$ 的 Grover 搜索、$3$ 比特 QFT 的二进制相位齿轮、$N=15$ 的 Shor 周期寻找以及 $\mathrm{ZMod}\,16$ 上的字符和与泊松公式逐一验算到底。

::: {.example #ex-grover-four-shor-fifteen title="Grover N=4/N=8 搜索、3 比特 QFT 相位齿轮与 Shor N=15 阶寻找完整验算（含文献说明，未在本书形式化）"}
**文献结果，未在本书形式化。** 本例第一步与第四步具体验算本章经内核验证的 [@thm-grover-uniform-rotation]、[@prop-finite-character-cancellation] 与 [@cor-finite-poisson-period]；而第二步中含末端位反转 SWAP 门的二进制张量积 QFT 分解，以及第三步中 Shor 阶寻找与最大公因数分解归约 $\gcd(a^{r/2} \pm 1, N)$，均属量子算法文献内容（详见下文 [@rem-grover-qft-shor-literature]），未在本书形式化。

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

::: {.remark #rem-grover-qft-shor-literature title="Grover 查询下界、QFT 电路分解与 Shor 大数分解完整算法定理（文献结果，未在本书形式化）"}
<!-- alias: #rem-shor-factoring-literature -->
**文献结果，未在本书形式化。** 本章的形式化定理严格覆盖了均匀振幅放大的不变平面旋转恒等式（[@thm-grover-uniform-rotation]）、有限 Weyl 位移算子的共轭相位反冲（[@lemma-phase-kickback-weyl]）、零化子特征标正交相消（[@prop-finite-character-cancellation]）与有限泊松求和公式（[@cor-finite-poisson-period]）。本章还给出了实际输入的边缘分布及逐点下界（[@thm-shor-qpe-probability-mixture]–[@thm-qpe-arbitrary-phase-lower-bound]），并在 [@thm-shor-nearest-candidate] 与 [@thm-shor-coprime-candidate] 中给出条件候选成员资格；这些不提供精确选择器。围绕这些结果的完整算法与复杂度结论仍来自以下文献：

1. **Grover 搜索与黑盒查询复杂度下界**（L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, doi:10.1145/237814.237866；G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, arXiv:quant-ph/0005055）：在已知解数 $M$、承诺 $1 \le M \le N/4$ 的 $N$ 元无结构搜索中，从均匀叠加态出发，按已知初始成功概率 $p = M/N$ 选取迭代步数，振幅放大以 $O(\sqrt{N/M})$ 次标记黑盒查询将成功概率提升至 $\ge 1 - M/N$。这一稀疏解承诺下，任何量子黑盒算法要以常数有界误差找到解，都需要 $\Omega(\sqrt{N/M})$ 次查询（由 Bennett–Bernstein–Brassard–Vazirani (1997) 的单解黑盒下界归约得到），证实这一黑盒任务中的二次加速已达量子几何极限。
2. **量子傅里叶变换（QFT）的多项式门分解**：在 $q$ 比特寄存器（$Q = 2^q$）上，将正指数单位化 QFT 展开为 [@ex-grover-four-shor-fifteen] 第二步中的二进制乘积形式后，每一层输出比特仅需 $1$ 个 Hadamard 门与至多 $q - 1$ 个受控二进相位门 $R_k = \operatorname{diag}(1, e^{2\pi i / 2^k})$，加上末端 $\lfloor q/2\rfloor$ 个 SWAP 门，按这些理想门计数，总门数为 $\frac{q(q+1)}{2} + \lfloor\frac{q}{2}\rfloor = O(q^2) = O((\log Q)^2)$。这里的输入是已制备的量子态，输出的傅里叶系数仍编码在量子振幅中；任意输入数据的装载、全部系数的经典读出，以及将理想相位门综合到有限离散门集的成本，都不包含在这一门数中。
3. **Shor 大数分解与阶寻找的完整正确性条件**（P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, doi:10.1137/S0097539795293172）：对于一般合数 $N$（非偶、非素数幂）与随机互素底数 $a$，乘法阶 $r$ 通常不整除 $Q = 2^q$。Shor 算法选取 $N^2 \le Q < 2N^2$，通过可逆模幂电路在 $O((\log N)^3)$ 基本门内制备周期叠加态，再经 QFT 采样频点 $k$。利用有限几何级数（Dirichlet 核）下界，落入满足 $\bigl|\frac{k}{Q} - \frac{s}{r}\bigr| \le \frac{1}{2Q} < \frac{1}{2r^2}$ 的最近整数频点 $k$ 的总概率满足常数下界，其中，在实际参数与最近条件下，既约相位属于有限候选的部分现已由 [@thm-shor-nearest-candidate] 覆盖；从候选认证精确选择仍是额外任务。当 $\gcd(s, r) = 1$（其概率由欧拉函数下界 $\varphi(r)/r = \Omega(1/\log\log r)$ 保证）时即可获得真阶 $r$，结合经典数论引理（奇素因子幂相异时 $\Pr[r \text{ 为偶且 } a^{r/2} \not\equiv -1 \pmod N] \ge 1 - 2^{-(k-1)} \ge 1/2$）完成多项式时间随机化分解。（注：将周期提取比作“把无穷周期因式约分到 $1$”属于启发式几何直觉，绝非已形式化的数学结论。）
:::

::: {.viz src="phase-gears" height="560"}
相位齿轮与周期的完整实验室：换寄存器大小 $Q$、周期 $r$ 与起点，点谱上的柱子选频率 $k$，看它的相位箭头首尾相接；$r$ 整除 $Q$ 且梳子构成完整陪集（起点 $x_0<r$）时，不共振的链闭合为零（[@prop-finite-character-cancellation]）。本页梳子不绕回，边界截短会改变峰高并留下不共振的权重。$r$ 不整除 $Q$ 时谱仍是梳子实际各格箭头的有限和：在 Shor 的设定下（起点 $x_0<r$、梳子铺到寄存器末端，$Q \ge N^2 > r^2$），峰集中在 $sQ/r$ 附近，这种总集中保持文献身份，页面连分数读数仍要检验；[@thm-shor-nearest-candidate] 只在实际参数、分辨率和最近条件成立时保证候选成员资格；截短的梳子可以没有这种集中，只剩一格时谱是平的。
:::

看着 Grover 的二维平面旋转与 QFT 的傅里叶相消，一个更宏大的问题油然而生：**为什么这两类看似风马牛不相及的量子算法，背后都在反复交替调用“酉算子嵌入”与“相位反射/旋转”？有没有一套更高维的几何母框架，能够把搜索、相位估计、哈密顿量模拟乃至矩阵求逆统统收编为同一个二维块上的切比雪夫多项式递推？而在走下理想算法的云端、把连续旋转编译成有限个离散量子门 $\{H, T\}$ 时，我们手里的球体又会露出怎样棱角分明的多面体真相？** 让我们迈入第四部的收官之章——[第十六章](ch16-qsvt-walks-and-compilation.md)。
