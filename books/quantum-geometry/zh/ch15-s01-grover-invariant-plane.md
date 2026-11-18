# 15.1 Grover：两次反射的共同不变平面 {#sec-grover-invariant-plane}

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
