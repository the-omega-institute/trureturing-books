# 13.3 CHSH 平方：正交面积的换位子项 {#sec-chsh-commutator-area}

既然经典对角混合态 $\mathrm{classicalCorrelatedDensity}$ 也能把局部边缘态缩成 $\frac{1}{2}I_2$ 并在关联扇区里占有一格 $\sigma_Z \otimes \sigma_Z$，我们究竟怎样用 CHSH 实验，比对这个经典态的一维关联线与贝尔态 $\lvert\Phi^+\rangle$ 的多方向相干关联面？

1969 年，Clauser、Horne、Shimony 与 Holt（CHSH）提出了一把极其精巧的四向组合标尺：让 Alice 准备两把二值可观测量快门 $A_0, A_1$（满足自伴性且平方为单位阵 $A_0^2 = A_1^2 = I$），让 Bob 也准备两把二值可观测量快门 $B_0, B_1$（同样自伴且 $B_0^2 = B_1^2 = I$），构造 CHSH 算子

$$
S = A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1,
$$

其中 $\otimes_{\mathrm{K}}$ 表示矩阵的克罗内克积（Kronecker product）。

如果 $A_0, A_1$ 和 $B_0, B_1$ 只是普通的可交换数字 $\pm 1$，因式分解 $S = A_0(B_0 + B_1) + A_1(B_0 - B_1)$ 立刻逼出 $S^2 = 4$（因为 $B_0 = \pm B_1$ 必使其一为 $\pm 2$、另一为 $0$）。那么在非对易的矩阵世界里，把算子 $S$ 直接平方，多出来的到底是什么？1987 年 Landau 指出的算子平方恒等式给出了最透彻的几何答案：多出来的恰恰是 Alice 两把尺子的**换位子** $[A_0, A_1] = A_0 A_1 - A_1 A_0$ 与 Bob 两把尺子的**换位子** $[B_0, B_1] = B_0 B_1 - B_1 B_0$ 的负克罗内克积！

::: {.proposition #prop-landau-area-square title="CHSH 算子平方的 Landau 换位子恒等式" lean="D5/S3/QuantumBounds/LandauIdentity.landau_identity"}
设 $m, n$ 为任意有限可判等指标类型（`[Fintype m] [DecidableEq m] [Fintype n] [DecidableEq n]`），$A_0, A_1 \in M_m(\mathbb{C})$ 与 $B_0, B_1 \in M_n(\mathbb{C})$ 为复方阵，且四个矩阵均满足厄米性与对合性：

$$
\begin{aligned}
A_0.\mathrm{IsHermitian} \land A_0^2 = 1, &\qquad A_1.\mathrm{IsHermitian} \land A_1^2 = 1, \\
B_0.\mathrm{IsHermitian} \land B_0^2 = 1, &\qquad B_1.\mathrm{IsHermitian} \land B_1^2 = 1.
\end{aligned}
$$

定义克罗内克积组合算子 $S, C \in M_{m \times n}(\mathbb{C})$ 为

$$
\begin{aligned}
S &:= A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1, \\
C &:= -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr),
\end{aligned}
$$

则恒有

$$
S^2 = 4 \cdot (1 : M_{m \times n}(\mathbb{C})) + C.
$$
:::

::: proof
利用克罗内克积的乘法法则 $(X \otimes_{\mathrm{K}} Y)(X' \otimes_{\mathrm{K}} Y') = (XX') \otimes_{\mathrm{K}} (YY')$ 与双线性分配律，将 $S = A_0 \otimes_{\mathrm{K}} (B_0 + B_1) + A_1 \otimes_{\mathrm{K}} (B_0 - B_1)$ 展开平方，共得四组块项：

1. **第 1 组（$A_0^2$ 项）**：$(A_0^2) \otimes_{\mathrm{K}} (B_0 + B_1)^2 = I_m \otimes_{\mathrm{K}} (B_0^2 + B_1^2 + B_0 B_1 + B_1 B_0) = 2 I_{m\times n} + I_m \otimes_{\mathrm{K}} (B_0 B_1 + B_1 B_0)$；
2. **第 2 组（$A_1^2$ 项）**：$(A_1^2) \otimes_{\mathrm{K}} (B_0 - B_1)^2 = I_m \otimes_{\mathrm{K}} (B_0^2 + B_1^2 - B_0 B_1 - B_1 B_0) = 2 I_{m\times n} - I_m \otimes_{\mathrm{K}} (B_0 B_1 + B_1 B_0)$；
   将前两组相加，含反换位子 $\{B_0, B_1\} = B_0 B_1 + B_1 B_0$ 的项正负抵消，精准给出标量主项 $4 I_{m\times n}$。
3. **第 3 与第 4 组（$A_0 A_1$ 与 $A_1 A_0$ 交叉项）**：计算 $(B_0 + B_1)(B_0 - B_1) = B_0^2 - B_1^2 - B_0 B_1 + B_1 B_0 = -(B_0 B_1 - B_1 B_0)$，以及 $(B_0 - B_1)(B_0 + B_1) = B_0^2 - B_1^2 + B_0 B_1 - B_1 B_0 = +(B_0 B_1 - B_1 B_0)$。因此交叉项之和化为

   $$
   A_0 A_1 \otimes_{\mathrm{K}} \bigl(-(B_0 B_1 - B_1 B_0)\bigr) + A_1 A_0 \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0) = -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr) = C.
   $$

合并标量主项与交叉项即得 $S^2 = 4 I_{m\times n} + C$。完整证明由 Lean 内核检查。
:::

请细细品味 [@prop-landau-area-square] 的普适性与几何深度：

首先，定理对指标类型 $m, n$ **完全没有作等于 $2$ 的限制**——无论 Alice 和 Bob 手里拿的是单量子比特（$2\times 2$）、双量子比特寄存器还是任意高维有限量子系统，只要四把测量尺是平方为 $1$ 的厄米对合算子，且两侧算子通过克罗内克提升在不同因子上天然对易（$(A_i \otimes_{\mathrm{K}} I_n)(I_m \otimes_{\mathrm{K}} B_j) = A_i \otimes_{\mathrm{K}} B_j = (I_m \otimes_{\mathrm{K}} B_j)(A_i \otimes_{\mathrm{K}} I_n)$），$S^2 = 4I - [A_0, A_1] \otimes_{\mathrm{K}} [B_0, B_1]$ 就恒等成立！

其次，当我们把目光放回单量子比特泡利方向 $A_0 = \vv{a}_0\cdot\vv{\sigma}$、$A_1 = \vv{a}_1\cdot\vv{\sigma}$ 与 $B_0 = \vv{b}_0\cdot\vv{\sigma}$、$B_1 = \vv{b}_1\cdot\vv{\sigma}$（其中 $\vv{a}_i, \vv{b}_j \in S^2$ 为三维单位实向量）时，我们可以亲手算出一座连接矩阵换位子与三维叉积面积的桥梁：利用泡利矩阵乘法 $(\vv{u}\cdot\vv{\sigma})(\vv{v}\cdot\vv{\sigma}) = (\vv{u}\cdot\vv{v})I_2 + i(\vv{u}\times\vv{v})\cdot\vv{\sigma}$，对称点积项在相减时消去，换位子恰好化为两向量所张平行四边形有向面积（叉积 $\vv{u}\times\vv{v}$）的两倍虚部：

$$
[A_0, A_1] = 2i(\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}, \qquad [B_0, B_1] = 2i(\vv{b}_0 \times \vv{b}_1)\cdot\vv{\sigma}.
$$

将这两个手算公式代入 $C = -[A_0, A_1] \otimes_{\mathrm{K}} [B_0, B_1]$，两个虚数因子 $-(2i)(2i) = +4$ 正好把负号翻正：

$$
S^2 = 4 I_4 + 4\bigl((\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}\bigr) \otimes_{\mathrm{K}} \bigl((\vv{b}_0 \times \vv{b}_1)\cdot\vv{\sigma}\bigr)!
$$

看！这句话把量子破缺的几何机制交代得一清二楚（注意：此泡利叉积展开是针对单比特泡利方向的手算几何解释，并不改写 [@prop-landau-area-square] 对任意有限维厄米对合矩阵的一般假设；同时 [@prop-landau-area-square] 本身是算子代数恒等式，而非经典局域隐变量概率上界的证明）：$S^2$ 超出 $4$ 的那一部分，是 Alice 的有向面积乘以 Bob 的有向面积。于是立刻冒出三个问题：一侧面积为零时，$S^2$ 是什么？两侧面积都只张开一部分时，$S$ 的特征值落在哪里？面积张满时，有没有天花板？下面三条冻结定理在任意有限维上回答这三个问题，用不着泡利矩阵。

**一侧面积为零。** 在单比特图像里，Alice 的两次提问共线（$\vv{a}_0 \parallel \vv{a}_1$）意味着 $A_1 = \pm A_0$，两把尺子可交换，换位子当场归零。一般维数下，“共线”换成“可交换”，结论照样成立。

::: {.corollary #cor-chsh-local-commuting-collapse title="一侧局域观测量可交换时 CHSH 算子的平方为 4I" lean="D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes"}
设 $m, n$ 为有限可判等指标类型，$A_0, A_1 \in M_m(\mathbb{C})$ 与 $B_0, B_1 \in M_n(\mathbb{C})$ 均为厄米矩阵且平方为单位阵（即 [@prop-landau-area-square] 的四条假设），$S = A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1$。若

$$
A_0 A_1 = A_1 A_0 \qquad \text{或} \qquad B_0 B_1 = B_1 B_0,
$$

则

$$
S^2 = 4 \cdot (1 : M_{m \times n}(\mathbb{C})).
$$
:::

::: proof
源码先用 [@prop-landau-area-square] 把 $S^2$ 改写为 $4 \cdot 1 + C$，再分两种情形：若 $A_0 A_1 = A_1 A_0$，Alice 的换位子 $A_0 A_1 - A_1 A_0$ 化为 $A_1 A_0 - A_1 A_0 = 0$；若 $B_0 B_1 = B_1 B_0$，Bob 的换位子同样为零。零矩阵与任何矩阵的克罗内克积为零，取负仍为零，于是 $C = 0$，只剩 $S^2 = 4 \cdot 1$。完整证明由 Lean 内核检查。
:::

这条推论是算子恒等式；Lean 文件的说明明确写着，它不陈述任何期望值上界。要由它走到“经典门槛”，还需一段手工推导：$S$ 是厄米矩阵的克罗内克积之和与差，本身厄米；$S^2 = 4I$ 迫使每个特征值 $\lambda$ 满足 $\lambda^2 = 4$，即 $\lambda = \pm 2$；于是 $2I - S$ 与 $2I + S$ 都半正定，对任意密度矩阵 $\rho$ 有 $-2 \le \operatorname{Re}\Tr(\rho S) \le 2$。**只要有一方的两次提问不分先后，量子关联就跨不过经典门槛。**

::: {.viz src="chsh-dial" preset="collinear" height="500"}
**一侧的两次提问重合，S 就越不过 2。** Alice 的两支实线箭头重合在 $Z$ 上，她那块品红面积缩成一条线，量尺上品红的刻度落到 $2$，与经典上界的虚线重合；时间轴转动 Bob 的一对虚线箭头，琥珀色的横线按 $2\cos\varphi$ 起落，最高只碰到 $2$；图停在 $\varphi = -40^\circ$，横线在 $2\cos 40^\circ \approx 1.53$，品红的刻度在它上方（[@cor-chsh-local-commuting-collapse]）。
:::

**两侧面积都只张开一部分。** 回到单比特：设 Alice 两轴的夹角为 $\alpha$、Bob 两轴的夹角为 $\beta$，则 $\norm{\vv{a}_0 \times \vv{a}_1} = \sin\alpha$，$\norm{\vv{b}_0 \times \vv{b}_1} = \sin\beta$。泡利方向算子 $\vv{u}\cdot\vv{\sigma}$ 的特征值是 $\pm\norm{\vv{u}}$，所以由上面的手算公式，$C$ 只有两个特征值 $\pm 4\sin\alpha\sin\beta$（手工推导）。换位子项只取一对相反的值，这正是下面这条命题的前提。

::: {.proposition #prop-chsh-four-point-spectrum title="换位子项的谱落在 ±N 上时 CHSH 算子的实谱落在四个平方根上" lean="D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum"}
设 $N \in \mathbb{R}$ 满足 $0 < N < 4$；$m, n$ 为有限可判等指标类型，$A_0, A_1 \in M_m(\mathbb{C})$ 与 $B_0, B_1 \in M_n(\mathbb{C})$ 均为厄米矩阵且平方为单位阵；$S$ 与 $C$ 同 [@prop-landau-area-square]：

$$
\begin{aligned}
S &= A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1, \\
C &= -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr).
\end{aligned}
$$

对复方阵 $M$，记 $\operatorname{spectrum}_{\mathbb{R}} M$ 为使 $r \cdot 1 - M$ 不可逆的全体实数 $r$。若 $\operatorname{spectrum}_{\mathbb{R}} C \subseteq \{N, -N\}$，则

$$
\operatorname{spectrum}_{\mathbb{R}} S \subseteq \bigl\{\sqrt{4 + N},\; -\sqrt{4 + N},\; \sqrt{4 - N},\; -\sqrt{4 - N}\bigr\}.
$$
:::

::: proof
源码先证 $S$ 是厄米矩阵：厄米矩阵的克罗内克积仍是厄米的（私有引理 `hermitian_kronecker`），厄米矩阵的和与差也是。于是 $S$ 的实谱恰好是它的特征值集合。任取特征值 $x$：由谱的幂映射（Mathlib 的 `spectrum.pow_mem_pow`），$x^2$ 属于 $S^2$ 的谱；由 [@prop-landau-area-square]，$S^2 = 4 \cdot 1 + C$，标量平移把谱整体平移（`spectrum.add_mem_add_iff`），故 $x^2 - 4$ 属于 $C$ 的谱。按假设 $x^2 - 4 = N$ 或 $x^2 - 4 = -N$，即 $x^2 = 4 + N$ 或 $x^2 = 4 - N$；两数都为正，所以 $x$ 是对应平方根的正值或负值。完整证明由 Lean 内核检查。
:::

这条命题有两处要读准。其一，它只给包含关系：$S$ 的特征值逃不出这四个点，但它没有说四个点都会出现。其二，前提是严格的 $0 < N < 4$。单比特情形 $N = 4\sin\alpha\sin\beta$，前提等于说两侧都不共线、且两侧不同时正交；两侧都正交时 $N = 4$，落在命题之外。那时手算得 $S^2$ 的特征值为 $8, 8, 0, 0$（下一节 [@cor-fixed-chsh-tsirelson] 的证明对固定算子算出的也是这组值），$S$ 的谱为 $\{2\sqrt{2}, -2\sqrt{2}, 0\}$。

::: {.figure src="ch13-spectrum"}
**CHSH 算子的谱只随面积参数 $N$ 走。** 四条品红的曲线是 $\pm\sqrt{4 + N}$ 与 $\pm\sqrt{4 - N}$：$N = 0$ 时汇成暗色虚线上的 $\pm 2$，$N$ 增大时外侧两条张向 $\pm 2\sqrt{2}$，内侧两条收向 $0$。实心点是下例表中 $N = 1, 2, 3$ 三行的谱（$N = 3$ 处是 $\pm\sqrt{7}$ 与 $\pm 1$），落在 [@prop-chsh-four-point-spectrum] 的四个点上；两端的空心点超出命题的前提 $0 < N < 4$，$N = 0$ 由 [@cor-chsh-local-commuting-collapse] 与 $\lambda^2 = 4$ 的手工推导给出，$N = 4$ 由 [@prop-landau-area-square] 手算。
:::

::: {.example #ex-chsh-spectrum-angle-table title="五组夹角下的面积参数 N、CHSH 谱与贝尔态上的期望值"}
四根轴都放在 $(Z, X)$ 平面内，角度从 $Z$ 轴量起。Alice 取 $A_0 = Z$、$A_1 = \cos\alpha\,Z + \sin\alpha\,X$；Bob 取 $B_0 = Z$、$B_1 = \cos\beta\,Z - \sin\beta\,X$（向另一侧转）。手工推导：由 $[Z, X] = 2iY$ 得 $[A_0, A_1] = 2i\sin\alpha\,Y$、$[B_0, B_1] = -2i\sin\beta\,Y$，故

$$
C = -(2i\sin\alpha)(-2i\sin\beta)\,Y \otimes_{\mathrm{K}} Y = -4\sin\alpha\sin\beta\;Y \otimes_{\mathrm{K}} Y.
$$

$Y \otimes_{\mathrm{K}} Y$ 在 $\lvert\Phi^+\rangle, \lvert\Psi^-\rangle$ 上取 $-1$，在 $\lvert\Phi^-\rangle, \lvert\Psi^+\rangle$ 上取 $+1$，所以 $C$ 的谱是 $\{N, -N\}$，其中 $N = 4\sin\alpha\sin\beta$。

以 $\alpha = \beta = 60^\circ$ 为例：$A_1 = \frac{1}{2}Z + \frac{\sqrt{3}}{2}X$，$B_1 = \frac{1}{2}Z - \frac{\sqrt{3}}{2}X$，$[A_0, A_1] = i\sqrt{3}\,Y$，$[B_0, B_1] = -i\sqrt{3}\,Y$，$C = -3\,Y \otimes_{\mathrm{K}} Y$，$N = 3$。[@prop-chsh-four-point-spectrum] 把 $S$ 的谱关进 $\{\pm\sqrt{7}, \pm 1\}$；直接展开 $4\times 4$ 矩阵 $S$ 的特征多项式得 $(\lambda - 1)(\lambda + 1)(\lambda^2 - 7)$，四个点各出现一次。贝尔态 $\lvert\Phi^+\rangle$ 上，两根同平面轴的关联就是夹角余弦：$E_{00} = 1$，$E_{01} = \cos 60^\circ = \frac{1}{2}$，$E_{10} = \frac{1}{2}$，$E_{11} = \cos 120^\circ = -\frac{1}{2}$，于是 $\langle S\rangle_{\Phi^+} = 1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{2} = \frac{5}{2}$：已越过 $2$，但没到 $\sqrt{7} \approx 2.6458$。最大值藏在 $\operatorname{span}\{\lvert\Phi^+\rangle, \lvert\Psi^-\rangle\}$ 里，$S$ 在这个平面上的矩阵是

$$
\begin{pmatrix} 5/2 & -\sqrt{3}/2 \\ -\sqrt{3}/2 & -5/2 \end{pmatrix},
$$

特征值为 $\pm\sqrt{25/4 + 3/4} = \pm\sqrt{7}$。

五组夹角汇总如下。末列按 $\langle S\rangle_{\Phi^+} = 1 + \cos\beta + \cos\alpha - \cos(\alpha + \beta)$ 计算，数值四舍五入到四位小数：

| $\alpha$ | $\beta$ | $N = 4\sin\alpha\sin\beta$ | $S$ 的谱 | 冻结依据 | $\langle S\rangle_{\Phi^+}$ |
| :---: | :---: | :---: | :--- | :--- | :---: |
| $0^\circ$ | $60^\circ$ | $0$ | $\pm 2$（各两重） | [@cor-chsh-local-commuting-collapse] | $2$ |
| $30^\circ$ | $30^\circ$ | $1$ | $\pm\sqrt{5} \approx \pm 2.2361$，$\pm\sqrt{3} \approx \pm 1.7321$ | [@prop-chsh-four-point-spectrum] | $\frac{1}{2} + \sqrt{3} \approx 2.2321$ |
| $60^\circ$ | $60^\circ$ | $3$ | $\pm\sqrt{7} \approx \pm 2.6458$，$\pm 1$ | [@prop-chsh-four-point-spectrum] | $\frac{5}{2} = 2.5$ |
| $90^\circ$ | $30^\circ$ | $2$ | $\pm\sqrt{6} \approx \pm 2.4495$，$\pm\sqrt{2} \approx \pm 1.4142$ | [@prop-chsh-four-point-spectrum] | $\frac{3}{2} + \frac{\sqrt{3}}{2} \approx 2.3660$ |
| $90^\circ$ | $90^\circ$ | $4$ | $\pm 2\sqrt{2} \approx \pm 2.8284$，$0$（两重） | 无（$N = 4$ 超出命题前提；由 [@prop-landau-area-square] 手算） | $2$ |

“冻结依据”一栏只说明哪条冻结结论把谱限制在所列的点上（第一行还要接上前面 $\lambda^2 = 4$ 那段手工推导）；所列的点是否都出现、出现几重，以及末列，都是手工推导，并经数值核对。谱只通过 $N$ 依赖两个夹角；只要两侧面积都不为零，最大特征值 $\sqrt{4 + N}$ 就超过 $2$。末行的谱已经顶到 $2\sqrt{2}$，贝尔态上的期望值却只有 $2$：Bob 的十字架摆错了位置。怎么摆，是下一节 $45^\circ$ 的问题。
:::

::: {.viz src="chsh-dial" preset="sixty" height="500"}
**两侧各张 60°：越过 2，停在 √7 之下。** 青色的四段 $1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{2}$ 在贝尔态上叠到 $\frac{5}{2}$，越过了虚线 $2$；外侧品红的刻度在 $\pm\sqrt{7}$，内侧的品红点线在 $\pm 1$，正是 [@prop-chsh-four-point-spectrum] 给出的四个点。把 Bob 的一对方向转到约 $19.1^\circ$，琥珀色的横线正好碰到 $\sqrt{7}$。
:::

**面积张满时的天花板。** 上表中最大的数是 $2\sqrt{2}$。换别的维数、别的观测量，能不能更大？模块 `PeritoTsirelson` 证明了一条更一般的代数上界：Alice 两个设置、Bob $d$ 个设置，局域矩阵只要求幺正；$d = 2$ 时正是 CHSH 的代数组合。

::: {.theorem #thm-unitary-bell-bound title="有限维幺正策略的贝尔值上界 $2/\sin(\pi/(2d))$" lean="D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le"}
设 $d, n, m \in \mathbb{N}$，$d \ge 2$。设 $A_0, A_1$ 为 $n \times n$ 复幺正矩阵，$B_0, \dots, B_{d-1}$ 为 $m \times m$ 复幺正矩阵（行列指标分别为 $\mathrm{Fin}\,n$ 与 $\mathrm{Fin}\,m$），$\rho$ 为 $\mathrm{Fin}\,n \times \mathrm{Fin}\,m$ 上的密度态 `DensityState`（半正定且 $\Tr\rho = 1$）。记 $\omega_d = \exp(2\pi i/d)$（源码中的 $\mathrm{windowRoot}\,d$），定义

$$
\begin{aligned}
\mathrm{bellOperator}_d(A, B) &= \sum_{x = 0}^{1}\sum_{y = 0}^{d - 1} \omega_d^{\,xy}\, A_x \otimes_{\mathrm{K}} B_y, \\
\mathrm{bellValue}_d(A, B, \rho) &= \operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{bellOperator}_d(A, B)\bigr).
\end{aligned}
$$

则

$$
\mathrm{bellValue}_d(A, B, \rho) \le \frac{2}{\sin\bigl(\pi/(2d)\bigr)}.
$$
:::

::: proof
源码分四步。第一步（私有引理 `density_trace_re_le_norm`）：对密度态 $\rho$ 与任意矩阵 $M$，$\operatorname{Re}\Tr(\rho M) \le \norm{M}$（算子范数）。做法是把 $M$ 换成厄米部分 $H = \frac{1}{2}(M + M^*)$，实部迹不变、范数不增；$\norm{H} \cdot 1 - H$ 半正定，与 $\rho$ 配对的迹非负，再用 $\Tr\rho = 1$。第二步（私有引理 `bell_operator_factor`）：从左边提出 $A_0 \otimes_{\mathrm{K}} 1$，

$$
\mathrm{bellOperator}_d(A, B) = (A_0 \otimes_{\mathrm{K}} 1) \sum_{y = 0}^{d - 1} \bigl(1 + \omega_d^{\,y}\, U\bigr) \otimes_{\mathrm{K}} B_y, \qquad U = A_0^* A_1,
$$

左乘幺正矩阵不改变算子范数。第三步（`PeritoTensorBlockBound.tensor_block_bound`）：把幺正矩阵 $U$ 酉对角化为 $\operatorname{diag}(z_1, \dots, z_n)$，$\lvert z_i\rvert = 1$；用 $P \otimes_{\mathrm{K}} 1$ 共轭后，算子拆成 $n$ 个互相正交的 Bob 块 $\sum_y (1 + \omega_d^{\,y} z_i) B_y$，由三角不等式与 $B_y$ 的幺正性，每块的范数不超过 $\sum_y \lvert 1 + \omega_d^{\,y} z_i\rvert$，整个算子的范数也就不超过这些块界的公共上界。第四步（`PeritoUnitCircleSum.unit_circle_sum_le`）：写 $z = e^{2is}$，则 $\lvert 1 + \omega_d^{\,y} z\rvert = 2\lvert\cos(s + \pi y/d)\rvert$，而 $d$ 个等距余弦的绝对值之和不超过 $1/\sin(\pi/(2d))$。完整证明由 Lean 内核检查。
:::

取 $d = 2$ 是一段手工推导：$\omega_2 = e^{i\pi} = -1$，四个系数依次为 $1, 1, 1, -1$，$\mathrm{bellOperator}_2$ 正是 CHSH 算子 $S$，上界为 $2/\sin(\pi/4) = 2\sqrt{2}$。若把局域矩阵解释为结果取 $\pm 1$ 的锐测量可观测量，就须取厄米对合矩阵；这样的矩阵是幺正的（$A^* A = A^2 = 1$）；把 $A_0, A_1$ 同时取负，它们仍是幺正的，而 $S$ 变号。所以对任意有限维、任意四个厄米对合观测量与任意密度态，都有 $\lvert\operatorname{Re}\Tr(\rho S)\rvert \le 2\sqrt{2}$：这就是有限维张量积情形的 Tsirelson 界；无穷维与只要求对易的一般形式仍见章末 [@rem-bell-chsh-literature]。证明第四步在 $d = 2$ 时是 $\lvert 1 + z\rvert + \lvert 1 - z\rvert \le 2\sqrt{2}$，等号只在 $z = \pm i$ 时成立。对单比特泡利方向，$U = A_0^* A_1 = A_0 A_1 = \cos\alpha\, I + i(\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}$ 的特征值是 $e^{\pm i\alpha}$，块界成为 $2\lvert\cos(\alpha/2)\rvert + 2\lvert\sin(\alpha/2)\rvert = 2\sqrt{1 + \sin\alpha}$（$0^\circ \le \alpha \le 180^\circ$）；与 [@prop-chsh-four-point-spectrum] 允许的最大特征值 $\sqrt{4 + N} = 2\sqrt{1 + \sin\alpha\sin\beta}$ 相比，只是把 Bob 的 $\sin\beta$ 放大成了 $1$。它在 $\alpha = 90^\circ$ 时达到 $2\sqrt{2}$：天花板，就钉在 Alice 张满一个正交十字架的地方。

::: {.figure src="ch13-unit-circle-bound"}
**块界在单位圆的直角处顶到天花板。** 左边是单位圆，琥珀色的点是 $z = e^{i\alpha}$（图中 $\alpha = 60^\circ$），两条青色的弦从它连到 $+1$ 与 $-1$，在 $z$ 处成直角，长度分别是 $\lvert 1 - z\rvert = 2\sin(\alpha/2)$ 与 $\lvert 1 + z\rvert = 2\cos(\alpha/2)$；圆顶的空心点是 $z = i$，两弦在那里等长。右边青色的曲线是两弦长之和 $2\sqrt{1 + \sin\alpha}$：两端是 $2$，琥珀色的点在 $60^\circ$ 处是 $2.732$，只在 $\alpha = 90^\circ$ 碰到绿色虚线 $2\sqrt{2}$。绿色虚线是 [@thm-unitary-bell-bound] 取 $d = 2$ 的上界（代入是手工推导）；曲线是正文的手算。
:::
