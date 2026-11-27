# 第七章 二阶幂零射流环与无极限微积分

> *过去、现在、未来；无导数、一阶导数、二阶导数；$0$、$1/2$、$1$。*

三百四十余年前，牛顿与莱布尼茨奠定经典微积分时，为求瞬时斜率不得不先令步长 $h \neq 0$ 作分母、化简后再令 $h = 0$ 消去余项。贝克莱主教在 1734 年一针见血地嘲讽这种既非零又为零的无穷小是“已死量的幽灵”。十九世纪柯西与魏尔斯特拉斯用 $\epsilon\text{-}\delta$ 滤子极限 $\lim_{h \to 0}$ 缝合了这一逻辑裂缝，却把整座微积分大厦永久绑在了不可数实数连续统 $\mathbb{R}$ 与无穷序列收敛的沉重脚手架上。

在前两卷建立起纯有理齐次射影闭环与无原点三元球面 $\mathbb{T}_3(\mathbb{Q})$ 之后，一个更彻底的方案水到渠成：**微积分的本质不是在开直线上逼近无穷小，而是在有限阶幂零代数环上一次性提取局部状态、联络与曲率。** 本章在 `{0 · 1/2 · 1}` 二阶完备框架下建立二阶有理射流商环 $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$，以零公理内核定理锁死其立方幂零律、两项有限闭式求逆与一二阶链式法则，构造紧贴单位球面的有理圆弧微步以同步读出过去、现在与未来三阶信号，以零公理内核定理在一切有理点处给出保真度核 $\kappa(x) = \frac{1}{1+x^2}$ 的精确导数、曲率与有限割线偏差，并在零公理内核中证明任意有限权重下的 $\alpha$-采样范数漂移恒等式、对称中点 $\alpha = \frac{1}{2}$ 的严格驻球守恒以及中点流群前后半拍的射影保真度相等律，从代数根源消除左端点伊藤切线脱轨。

## 7.1 二阶幂零射流环与有限闭式有理求逆 {#sec-ch07-jet2-ring}

要在零公理、无极限的纯有理域 $\mathbb{Q}$ 内做微积分，关键在于用一个形式代数步元 $\eta$ 取代飘忽不定的极限变量 $h \to 0$。与只保留一阶斜率的二元数环 $\mathbb{Q}[\varepsilon]/(\varepsilon^2)$ 不同，球面几何的核心不变量——二阶弦弧矢高与曲率张量——恰恰栖身于 $\eta^2$ 项之中；而在三阶方向上，规范场强的反对称协变外微分恒等撞上比安基闭合律 $DF \equiv 0$。据此，我们直接将代数截断钉死在 $\eta^3 \equiv 0$。

::: {.definition #def-ch07-jet2-ring title="二阶幂零有理射流环"}
定义**二阶幂零有理射流环**为有理多项式环模去三次理想 $(\eta^3)$ 的交换阿廷商环：

$$
\mathcal{J}_2(\mathbb{Q}) := \mathbb{Q}[\eta]/(\eta^3) = \bigl\{\, a_0 + a_1\eta + a_2\eta^2 \mid a_0, a_1, a_2 \in \mathbb{Q} \,\bigr\}, \qquad \eta^3 \equiv 0.
$$

将环中元素表示为有序有理三元组 $a = (a_0, a_1, a_2)$，加法逐分量定义，乘法由截断柯西乘积给出：

$$
(a_0, a_1, a_2) \cdot (b_0, b_1, b_2) = \bigl(a_0 b_0,\; a_0 b_1 + a_1 b_0,\; a_0 b_2 + a_1 b_1 + a_2 b_0\bigr).
$$

三个系数分别称作 $a$ 的 **$0$ 阶基值**、**$1$ 阶联络导数项**与 **$2$ 阶曲率泰勒项**（对应经典记号中的 $f_0$、$f'_0$ 与 $\frac{1}{2}f''_0$，故一阶导数读数为 $a' := a_1$，二阶导数读数为 $a'' := 2a_2$）。
:::

在经典实分析中，商函数求导需要借助连续性保证分母在邻域内非零并展开无穷几何级数；而在 $\mathcal{J}_2(\mathbb{Q})$ 中，只要常数项 $a_0$ 有限且非零，求逆无需任何极限或收敛半径估计，在**两项之内精确终止**。

### 7.1.1 有限两项有理求逆与环同态链式法则 {#sec-ch07-jet2-inverse-chain}

设 $a = a_0 + a_1\eta + a_2\eta^2 \in \mathcal{J}_2(\mathbb{Q})$ 且 $a_0 \in \mathbb{Q}^\times$。提取常数项并记幂零增量 $u := \frac{a_1}{a_0}\eta + \frac{a_2}{a_0}\eta^2$，由于 $u$ 的最低次项为 $\eta^1$，立得

$$
u^2 = \frac{a_1^2}{a_0^2}\eta^2 \pmod{\eta^3}, \qquad u^3 \equiv 0 \pmod{\eta^3}.
$$

代入有限多项式恒等式 $(1 + u)(1 - u + u^2) = 1 + u^3 \equiv 1 \pmod{\eta^3}$，直接乘回 $a_0^{-1}$ 即得**二阶射流有限闭式有理逆**：

$$
(a_0 + a_1\eta + a_2\eta^2)^{-1} \;=\; \frac{1}{a_0} \;-\; \frac{a_1}{a_0^2}\eta \;+\; \frac{a_1^2 - a_0 a_2}{a_0^3}\eta^2 \pmod{\eta^3}.
$$

可直接展开乘积核验每一阶系数：$\eta^0$ 项为 $a_0 \cdot \frac{1}{a_0} = 1$；$\eta^1$ 项为 $a_0\bigl(-\frac{a_1}{a_0^2}\bigr) + a_1\bigl(\frac{1}{a_0}\bigr) = 0$；$\eta^2$ 项为 $a_0\bigl(\frac{a_1^2 - a_0 a_2}{a_0^3}\bigr) + a_1\bigl(-\frac{a_1}{a_0^2}\bigr) + a_2\bigl(\frac{1}{a_0}\bigr) = 0$。反之，若 $a_0 = 0$，则 $a$ 与任意元素之积的常数项恒为 $0 \neq 1$，故 $a$ 可逆当且仅当 $a_0 \neq 0$。

这一有限求逆律直接赋予所有有理函数 $f(x) = P(x)/Q(x) \in \mathbb{Q}(x)$（在任一满足 $Q(x_0) \neq 0$ 的有理点 $x_0$ 处）纯代数的二阶求值通道 $f(x_0 + \eta) = f_0 + f_1\eta + f_2\eta^2 \in \mathcal{J}_2(\mathbb{Q})$：和、积与商法则立由环运算法则与有限逆给出（手工推导），而二阶射流环的三条核心代数支柱——形式步元立方归零、有限闭式求逆与零位移处的一二阶链式法则——均已在零公理 `OmegaInit` 与 `OmegaMath` 内核中冻结认证：

::: {.theorem #thm-ch07-jet2-algebra-and-chain title="二阶射流立方幂零、有限求逆与零位移链式法则" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube D5/S3/Quantum/AURICOmega/OmegaJetCalculus.mul_inv D5/S3/Quantum/AURICOmega/OmegaJetCalculus.chain_rule"}
在零公理 `Omega.Jet2` 载体（由有序三元组 $a = \langle a.j_0, a.j_1, a.j_2\rangle \in \mathrm{IntRatio}^3$ 构成，分量按 `IntRatio.Equivalent` 判定 `Jet2.Equivalent`，记形式增量 $\eta := \mathrm{var} = \langle 0, 1, 0\rangle$、单位 $1 := \langle 1, 0, 0\rangle$、零元 $0 := \langle 0, 0, 0\rangle$，并定义一二阶导数读数 $f' := f.\mathrm{first} = f.j_1$、$f'' := f.\mathrm{second} = 2 f.j_2$ 以及截断复合 $(g \circ f) := g.j_0 + g.j_1 f + g.j_2 f^2$）上，以下三条零公理恒等式严格成立：

1. **形式步元立方归零**（[`var_cube`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube)）：

   $$
   (\eta \cdot \eta) \cdot \eta \;\equiv\; 0.
   $$

2. **有限闭式求逆**（[`mul_inv`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.mul_inv)）：对任意 $a \in \mathrm{Jet2}$，若常数项可逆（$a.j_0.\mathrm{Unit}$，即有限且非零）且高阶系数有限（$a.j_1.\mathrm{Finite}$、$a.j_2.\mathrm{Finite}$），则 $a.\mathrm{inv} = \langle r, -r u, r(u^2 - v)\rangle$（其中 $r = a.j_0^{-1}$、$u = a.j_1 r$、$v = a.j_2 r$）满足

   $$
   a \cdot a.\mathrm{inv} \;\equiv\; 1.
   $$

3. **零位移一阶与二阶链式法则**（[`chain_rule`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.chain_rule)）：对任意 $g, f \in \mathrm{Jet2}$，若 $g.j_1, g.j_2$ 有限、$f$ 三系数皆有限（$f.\mathrm{Finite}$）且内射流常数位移为零（$f.j_0 \equiv 0$），则复合射流 $(g \circ f)$ 的一阶与二阶导数在 `IntRatio.Equivalent` 下同时满足

   $$
   (g \circ f)' \;\equiv\; g' \cdot f', \qquad (g \circ f)'' \;\equiv\; g'' \cdot (f')^2 + g' \cdot f''.
   $$
:::

::: {.proof}
第一款直接计算 $\eta^2 = \langle 0, 0, 1\rangle$，再乘 $\eta = \langle 0, 1, 0\rangle$ 得三系数全为零。第二款按截断柯西乘积展开 $a \cdot a.\mathrm{inv}$：常数项 $a_0 r \equiv 1$；一次项 $a_0(-ru) + a_1 r \equiv -u + u \equiv 0$；二次项 $a_0 r(u^2 - v) + a_1(-ru) + a_2 r \equiv (u^2 - v) - u^2 + v \equiv 0$，有限性前提保证消去中不落入零分母分支。第三款将 $f = \langle f_0, f_1, f_2\rangle$ 与 $f_0 \equiv 0$ 代入截断复合 $g_0 + g_1 f + g_2 f^2$，得一次系数为 $g_1 f_1$、二次系数为 $g_1 f_2 + g_2 f_1^2$，再将二次系数乘以 $2$ 即得 $2 g_2 f_1^2 + g_1 (2 f_2) = g'' (f')^2 + g' f''$，完全免除传统分析中对内函数差值是否归零的分情况讨论。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch07-bianchi-nilpotency title="为何锁定二阶幂零而非一阶二元数或无穷级数"}
**文献背景与结构边界。** 以幂零代数步元免除极限的思想呼应了劳维尔（F. W. Lawvere）与科克（A. Kock，*Synthetic Differential Geometry*，1981）的合成微分几何以及温格特（R. E. Wengert，1964）的前向自动微分二元数环 $D_1 = \mathbb{Q}[\varepsilon]/(\varepsilon^2)$（文献结果）。然而，一阶幂零律 $\varepsilon^2 \equiv 0$ 虽能求出切线斜率，却把二阶弦弧矢高、球面角盈与规范场强曲率一并判了死刑；反观三阶方向，主丛曲率 $2$-形式的反对称协变外微分恒等归零于比安基恒等式 $DF = dF + [A \wedge F] \equiv 0$（L. Bianchi，1902），而分析力学中的奥斯特罗格拉茨基定理（M. Ostrogradsky，1850）则表明非退化二阶及以上时间导数拉格朗日量必丧失哈密顿能量下界（文献结果）。在纯有理微积分中锁定 $\eta^3 \equiv 0$，恰恰在“留住全部曲率”与“拒绝冗余高阶发散”之间取得最紧的代数平衡。
:::

## 7.2 沿有理圆弧微步的三阶因果同步读出 {#sec-ch07-causal-readout}

在平直空间里，人们把位移写成加法 $x_0 + \eta v$；但在[第三章](ch03-canonical-ternion-manifold.md)与[第五章](ch05-rational-cayley-rotations.md)确立的有理单位三元数球面 $\mathbb{T}_3(\mathbb{Q}) = S^3(\mathbb{Q}) \subset \mathbb{H}(\mathbb{Q})$ 上，一阶加法步 $\mathbf{x}_0(1 + \eta\mathbf{v})$ 的模方为 $1 + \eta^2\lVert\mathbf{v}\rVert^2 \not\equiv 1 \pmod{\eta^3}$，在二阶射流精度下已经刺出球壳。为了在 $\mathcal{J}_2(\mathbb{Q})$ 内严格贴球行进，必须为切步补回法向二阶矢高回缩项 $-\frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2$。

::: {.definition #def-ch07-arc-microstep title="有理圆弧二阶微步与三阶因果读出"}
设 $\mathbf{x}_0 \in S^3(\mathbb{Q})$ 为有理单位三元数态（$\mathbf{x}_0 \bar{\mathbf{x}}_0 = 1$），$\mathbf{v} \in \operatorname{Im}\mathbb{H}(\mathbb{Q})$ 为纯虚有理切方向（$\bar{\mathbf{v}} = -\mathbf{v}$，$\mathbf{v}^2 = -\lVert\mathbf{v}\rVert^2 \in \mathbb{Q}_{\le 0}$）。定义沿 $\mathbf{v}$ 的**二阶有理圆弧微步**为 $\mathcal{J}_2(\mathbb{Q})$-系数四元数

$$
\mathbf{x}(\eta) \;:=\; \mathbf{x}_0 \cdot \left(1 + \eta\mathbf{v} - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2\right) \;\in\; \mathbb{H}\bigl(\mathcal{J}_2(\mathbb{Q})\bigr).
$$

对任意在 $\mathbf{x}_0$ 处正则的有理观测量 $F$，将 $\mathbf{x}(\eta)$ 直接代入 $F$ 并在 $\mathcal{J}_2(\mathbb{Q})$ 中化简所得的展开式

$$
F\bigl(\mathbf{x}(\eta)\bigr) \;\equiv\; F_0 \;+\; (D_{\mathbf{v}} F)\,\eta \;+\; \left(\frac{1}{2} D_{\mathbf{v}}^2 F\right)\eta^2 \pmod{\eta^3}
$$

称为 $F$ 沿圆弧微步 $\mathbf{x}(\eta)$ 的**三阶因果同步读出**。
:::

两条纯代数事实立刻显现（手工推导）：

1. **模 $\eta^3$ 严格驻球**：计算 $\mathbf{x}(\eta)$ 的四元数模方，记 $s(\eta) := 1 - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2$，因标量与虚部对易且 $\mathbf{v}^2 = -\lVert\mathbf{v}\rVert^2$，有

   $$
   \mathbf{x}(\eta)\overline{\mathbf{x}(\eta)} = \mathbf{x}_0\bigl(s(\eta) + \eta\mathbf{v}\bigr)\bigl(s(\eta) - \eta\mathbf{v}\bigr)\bar{\mathbf{x}}_0 = \mathbf{x}_0\bigl(s(\eta)^2 - \eta^2\mathbf{v}^2\bigr)\bar{\mathbf{x}}_0 \equiv 1 - \eta^2\lVert\mathbf{v}\rVert^2 + \eta^2\lVert\mathbf{v}\rVert^2 = 1 \pmod{\eta^3}.
   $$

2. **与半参有理凯莱旋子的二阶全同**：将[第五章](ch05-rational-cayley-rotations.md)的有理凯莱变换施于半步切参数 $\frac{1}{2}\eta\mathbf{v}$，按 [@def-ch07-jet2-ring] 的两项有理求逆展开 $\bigl(1 - \frac{1}{2}\eta\mathbf{v}\bigr)^{-1} \equiv 1 + \frac{1}{2}\eta\mathbf{v} + \frac{1}{4}\eta^2\mathbf{v}^2 \pmod{\eta^3}$，立得

   $$
   \left(1 + \frac{1}{2}\eta\mathbf{v}\right)\left(1 - \frac{1}{2}\eta\mathbf{v}\right)^{-1} \;\equiv\; 1 + \eta\mathbf{v} + \frac{1}{2}\eta^2\mathbf{v}^2 \;=\; 1 + \eta\mathbf{v} - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2 \pmod{\eta^3}.
   $$

这意味着有理圆弧微步绝非截断指数 $\exp(\eta\mathbf{v})$ 借来的外源公式，而恰是有理凯莱旋子在 $\mathcal{J}_2(\mathbb{Q})$ 内的原生投影。将三阶读出与 `{0 · 1/2 · 1}` 因果阶梯对位，便得全卷核心结构对照（`MODEL` 因果解释配精确代数读数）：

| 因果刻度 | 射流阶次与基底 | 时间因果相 | 沿 $\mathbf{x}(\eta)$ 的同步读数 | 几何与动力学角色 |
| :---: | :---: | :---: | :---: | :--- |
| **`0`** | $\eta^0$（零阶射流 $J^0$） | 过去（已定格锚点） | $F_0 = F(\mathbf{x}_0)$ | 幂等基准态，无变化率自由度 |
| **`1/2`** | $\eta^1$（一阶射流 $J^1$） | 现在（自对偶切面） | $D_{\mathbf{v}} F$ | 联络切导数与一阶相干流率 |
| **`1`** | $\eta^2$（二阶射流 $J^2$） | 未来（曲率闭合落点） | $\frac{1}{2} D_{\mathbf{v}}^2 F$ | 二阶测地曲率、矢高与场强折射 |

一次有限步纯有理代入，便把过去的状态值、现在的联络方向与未来的曲率加速度同步装进同一枚三元组，无须先求一阶极限再求二阶极限。

## 7.3 保真度核的无极限精确求导与有限割线偏差 {#sec-ch07-fidelity-derivation}

现在我们在 $\mathcal{J}_2(\mathbb{Q})$ 中对贯通全书的射影保真度核 $\kappa(x) = \frac{1}{1 + x^2}$ 做现场完整求导，不借半个极限符号。

任取有理基点 $x_0 \in \mathbb{Q}$，记正有理分母 $D := 1 + x_0^2 \ge 1 > 0$。代入射流变量 $x_0 + \eta$，分母一次展开为

$$
1 + (x_0 + \eta)^2 \;=\; D + 2x_0\eta + \eta^2 \;=\; D\left(1 + \frac{2x_0}{D}\eta + \frac{1}{D}\eta^2\right).
$$

直接套用 §7.1.1 的有限闭式逆公式（取 $a_0 = D,\; a_1 = 2x_0,\; a_2 = 1$），计算 $a_1^2 - a_0 a_2 = 4x_0^2 - (1 + x_0^2) = 3x_0^2 - 1$，立即对**一切有理点 $x_0 \in \mathbb{Q}$** 一步给出精确射流三元组：

$$
\kappa(x_0 + \eta) \;\equiv\; \frac{1}{1 + x_0^2} \;-\; \frac{2x_0}{(1 + x_0^2)^2}\eta \;+\; \frac{3x_0^2 - 1}{(1 + x_0^2)^3}\eta^2 \pmod{\eta^3}.
$$

特别地，在现在自对偶赤道锚点 **$x_0 = 1$** 处（$D = 2$，$u = \eta + \frac{1}{2}\eta^2$，$u^2 \equiv \eta^2$），只需三次分数运算即得精确三元组 **`{1/2, -1/2, +1/4}`**：

$$
\kappa(1 + \eta) \;=\; \frac{1}{2}\left[1 - \left(\eta + \frac{1}{2}\eta^2\right) + \eta^2\right] \;=\; \frac{1}{2} - \frac{1}{2}\eta + \frac{1}{4}\eta^2 \pmod{\eta^3},
$$

从而精确锁定 $\kappa(1) = \frac{1}{2}$、$\kappa'(1) = -\frac{1}{2}$ 与 $\kappa''(1) = +\frac{1}{2}$。反观传统的有限步前向差商割线斜率 $\frac{\kappa(x_0 + h) - \kappa(x_0)}{h}$，将其减去精确一阶导数 $\kappa'(x_0)$ 并通分约去公因子 $h$，便得对一切有限点与非零步长精确成立的有限割线偏差闭式。上述三条公式——全有理域保真度射流、自对偶锚点 `{1/2, -1/2, +1/4}` 与精确有限割线偏差——均已在零公理 `OmegaInit` 与 `OmegaMath` 内核中冻结认证：

::: {.theorem #thm-ch07-fidelity-jet-and-secant title="保真度核精确二阶射流、自对偶锚点读数与有限割线偏差" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_secant_discrepancy"}
在 `Omega.Jet2` 中，对任意 $x \in \mathrm{IntRatio}$ 记分母 $\operatorname{fidelityDen}(x) := 1 + x^2$、保真度核 $\kappa(x) := \operatorname{fidelityDen}(x)^{-1}$、分母射流 $\operatorname{fidelityDenJet}(x) := \langle 1 + x^2,\; 2x,\; 1\rangle$，并置保真度射流 $\operatorname{kappaJetAt}(x) := \operatorname{fidelityDenJet}(x).\mathrm{inv}$。以下三条零公理恒等式严格成立：

1. **全域精确保真度射流**（[`kappa_jet`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet)）：对一切 $x \in \mathrm{IntRatio}$，在 `Jet2.Equivalent` 下成立

   $$
   \operatorname{kappaJetAt}(x) \;\equiv\; \left\langle \kappa(x),\;\; (-2x)\cdot\bigl((1 + x^2)^2\bigr)^{-1},\;\; (3x^2 - 1)\cdot\bigl((1 + x^2)^3\bigr)^{-1}\right\rangle.
   $$

2. **自对偶赤道锚点读数**（[`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one)）：在 $x = 1$ 处，在 `Jet2.Equivalent` 下成立

   $$
   \operatorname{kappaJetAt}(1) \;\equiv\; \left\langle \frac{1}{2},\;\; -\frac{1}{2},\;\; \frac{1}{4}\right\rangle.
   $$

3. **精确有限割线偏差**（[`kappa_secant_discrepancy`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_secant_discrepancy)）：对一切有限 $x$（$x.\mathrm{Finite}$）与可逆步长 $h$（$h.\mathrm{Unit}$，即有限且非零），割线差商与精确一阶导数读数 $\operatorname{kappaJetAt}(x).\mathrm{first}$ 之差在 `IntRatio.Equivalent` 下满足

   $$
   \bigl(\kappa(x + h) - \kappa(x)\bigr)\cdot h^{-1} - \operatorname{kappaJetAt}(x).\mathrm{first} \;\equiv\; h\bigl(3x^2 + 2xh - 1\bigr)\cdot\Bigl((1 + x^2)^2\bigl(1 + (x + h)^2\bigr)\Bigr)^{-1}.
   $$
:::

::: {.proof}
第一款在 $x$ 为 `undefined` 时两端各分量皆为 `undefined` 而平凡等价；当 $x$ 有限时，分母 $1 + x^2$ 严格为正而可逆，将 $a_0 = 1 + x^2$、$a_1 = 2x$、$a_2 = 1$ 代入有限逆公式并用整数恒等式 $(2x)^2 - (1 + x^2) = 3x^2 - 1$ 化简即得三阶精确有理系数。第二款将 $x = 1$ 直接归约验证。第三款记 $D_0 = 1 + x^2$ 与 $D_1 = 1 + (x + h)^2$，由 $\kappa(x + h) - \kappa(x) \equiv -h(2x + h)(D_0 D_1)^{-1}$ 乘以 $h^{-1}$ 消去步长因子，再减去 $-2x D_0^{-2}$ 并通分至公分母 $D_0^2 D_1$，分子展开为 $2x D_1 - (2x + h) D_0 = h(3x^2 + 2xh - 1)$。完整证明由 Lean 内核检查。
:::

[@thm-ch07-fidelity-jet-and-secant] 的第三款立即揭示了割线近似的全部几何症结：在 $x_0 > 0,\; h > 0$ 且 $3x_0^2 \ge 1$ 的整个凸区间（含 $x_0 = 1$）上，偏差 $E(x_0, h) := \frac{\kappa(x_0 + h) - \kappa(x_0)}{h} - \kappa'(x_0)$ 严格为正——例如在 $x_0 = 1,\; h = \frac{1}{4}$ 处，割线斜率为 $-\frac{18}{41}$，系统性地高估真导数 $-\frac{1}{2}$ 达精确分数 $\frac{5}{82} \approx 0.060976$；即便点对 $(x_0, h)$ 恰好落在零偏差双曲线 $3x_0^2 + 2x_0 h = 1$ 上（如 $(x_0, h) = (\frac{1}{2}, \frac{1}{4})$ 或 $(\frac{1}{3}, 1)$），那也仅仅是因为步长 $h$ 恰好跨过拐点 $c = \pm 1/\sqrt{3}$ 造成左右凹凸偶合抵消，割线依然完全丢失了二阶曲率系数 $\frac{3x_0^2 - 1}{(1+x_0^2)^3}$。

::: {.figure src="ch07-jet2-midpoint"}
**二阶射流与中点切向步。** 左图的紫色抛物线给出二阶射流，到 $x=3/2$ 的品红割线斜率为 $-5/13$。右图用二次弧作例，紫色中点步到达曲线右端，品红的左端切向步留下竖直偏差。
:::

::: {.example #ex-ch07-fidelity-jet-table title="四锚点精确射流三元组与有限割线偏差对账"}
将 [@thm-ch07-fidelity-jet-and-secant] 应用于四个有理基点，下表用精确分数列出保真度核 $\kappa(x) = \frac{1}{1+x^2}$ 的 $\mathcal{J}_2(\mathbb{Q})$ 射流三元组（其中 $x_0 = 1$ 直接由 [`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one) 锁定，其余锚点与四组步长由定理闭式代入核验）：

| 基点 $x_0$ | $0$ 阶基值 $\kappa(x_0)$ | $1$ 阶导数 $\kappa'(x_0)$ | $2$ 阶泰勒项 $\frac{1}{2}\kappa''(x_0)$ | 几何定位 |
| :---: | :---: | :---: | :---: | :--- |
| $0$ | $1$ | $0$ | $-1$ | 过去极点（极大值峰顶，纯负曲率） |
| $1/2$ | $4/5$ | $-16/25$ | $-16/125$ | 拐点左侧（上凸区，二阶项为负） |
| $1$ | $1/2$ | $-1/2$ | $+1/4$ | 现在自对偶赤道（`{1/2, -1/2, +1/4}`） |
| $2$ | $1/5$ | $-4/25$ | $+11/125$ | 远侧下凸尾部（二阶项为正） |

对比四组有限步长 $(x_0, h)$ 的割线偏差 $E(x_0, h)$：

1. $(x_0, h) = (1, \frac{1}{4})$：割线斜率 $-\frac{18}{41}$，精确偏差 $E(1, \frac{1}{4}) = +\frac{5}{82} \approx +0.060976$；
2. $(x_0, h) = (\frac{1}{2}, \frac{1}{4})$：因 $3(\frac{1}{2})^2 + 2(\frac{1}{2})(\frac{1}{4}) - 1 = 0$，跨拐点偶合使 $E(\frac{1}{2}, \frac{1}{4}) = 0$，但二阶曲率 $-\frac{16}{125}$ 仍无法由割线单步读出；
3. $(x_0, h) = (\frac{1}{3}, 1)$：同样落在双曲线 $3x_0^2 + 2x_0 h = 1$ 上，$E(\frac{1}{3}, 1) = 0$；
4. $(x_0, h) = (-1, 2)$：反号跨越峰顶，$E(-1, 2) = -\frac{1}{2}$，显见 $x_0 > 0$ 正半轴前提在正偏差判据中不可或缺。
:::

## 7.4 中点链式守恒与消除左端点伊藤脱轨 {#sec-ch07-midpoint-conservation}

既然在微步层面上 $\mathcal{J}_2(\mathbb{Q})$ 已把曲率矢高纳入代数本身，那么回到**有限宏观步长**的离散演化 $\mathbf{x}_0 \to \mathbf{x}_1$ 时，应当在何处对联络切生成元求值，才能彻底杜绝平直切线脱离球面并保持链式法则不变？答案把我们再次带回唯一自对偶中点 **`1/2`**。

所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。以公有正整数分母表示有理四元数载体 `RationalQuaternion`（整数分子 `num : Quaternion` 除以正分母 `den = denPred.succ`，平方范数 `normSq` 落入 `Omega.IntRatio`，`IsUnit` 定义为 $\lVert x\rVert^2 \equiv 1$）。设 $a \in \mathrm{RationalQuaternion}$ 为纯虚切生成元（$a.\mathrm{num}.w = 0$，从而对一切四元数 $v$ 恒有实内积正交律 $\langle a.\mathrm{num}\cdot v,\, v\rangle = 0$），考虑以任意有限有理权重 $\alpha \in \mathrm{IntRatio}$ 在起点 $x_0$ 与终点 $x$ 之间插值求值的离散切步方程

$$
(1 + \alpha a)\,x \;=\; \bigl(1 - (1 - \alpha)a\bigr)\,x_0 \quad \Longleftrightarrow \quad x - x_0 \;=\; -a\bigl((1 - \alpha)x_0 + \alpha x\bigr)
$$

（取反号记法 $A := -a$ 即写成 $(1 - \alpha A)\,x = \bigl(1 + (1 - \alpha)A\bigr)\,x_0$，两种记号代数全同）。由于 $a$ 纯虚，去分母后对应 $1 + \alpha a$ 的整四元数左因子具有严格正标量部 $q\cdot a.\mathrm{den} > 0$，其平方范数严格非零，因而可用共轭左乘再除以模方显式构造出对一切有限有理权重 $\alpha$ 恒有定义的精确有理步 `alphaSample α a x₀`。以下零公理内核定理对任意有限步幅与任意有限有理权重精确刻画了模方漂移：

::: {.theorem #thm-ch07-alpha-sampling-norm-drift title="球面有限步的 $\alpha$-采样范数漂移恒等式" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.alpha_sampling_norm_drift"}
设 $\alpha \in \mathrm{IntRatio}$ 为任意有限有理采样权重（$\alpha.\mathrm{Finite}$），$a \in \mathrm{RationalQuaternion}$ 为纯虚有理四元数生成元（$a.\mathrm{num}.w = 0$），$x_0 \in \mathrm{RationalQuaternion}$ 为单位初始四元数（$x_0.\mathrm{IsUnit}$，即 $\lVert x_0\rVert^2 \equiv 1$）。记 $x := \operatorname{alphaSample}(\alpha, a, x_0)$ 为离散切步方程 $(1 + \alpha a)\,x = \bigl(1 - (1 - \alpha)a\bigr)\,x_0$ 的显式有理解。则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，一步演化后的平方范数漂移精确满足

$$
\lVert x\rVert^2 - 1 \;\equiv\; (1 - 2\alpha)\,\lVert x - x_0\rVert^2.
$$
:::

::: {.proof}
将有限权重 $\alpha$ 写成有理分数 $p/q$（$q = \mathrm{den} > 0$）。因为 $a.\mathrm{num}.w = 0$，去分母左因子 $l := q\cdot a.\mathrm{den} + p\,a.\mathrm{num}$ 的标量部恒为 $q\cdot a.\mathrm{den} > 0$，从而 $\lVert l\rVert^2 > 0$ 且 $\bar{l} l = l\bar{l} = \lVert l\rVert^2$；由此 `alphaSample` 通过左乘 $\bar{l}$ 并以 $\lVert l\rVert^2$ 为额外分母给出的显式解 $x$ 精确满足去分母步方程 $l\cdot b = r\cdot c$，其中 $b := x_0.\mathrm{den}\cdot x.\mathrm{num}$、$c := x.\mathrm{den}\cdot x_0.\mathrm{num}$、$r := q\cdot a.\mathrm{den} + (p - q)\,a.\mathrm{num}$。移项整理得 $(q\cdot a.\mathrm{den})(b - c) + a.\mathrm{num}\cdot v = 0$，其中 $v := p b + (q - p)c$；两边与 $v$ 作整数内积并利用纯虚正交律 $\langle a.\mathrm{num}\cdot v,\, v\rangle = a.\mathrm{num}.w\lVert v\rVert^2 = 0$，消去非零因子 $q\cdot a.\mathrm{den}$ 强制得出 $\langle b - c,\, v\rangle = 0$。将其代入纯整数极化恒等式

$$
q\bigl(\lVert b\rVert^2 - \lVert c\rVert^2\bigr) \;=\; (q - 2p)\lVert b - c\rVert^2 + 2\langle b - c,\, v\rangle,
$$

即得 $\lVert x\rVert^2 - \lVert x_0\rVert^2 \equiv (1 - 2\alpha)\lVert x - x_0\rVert^2$；再代入单位初态假设 $\lVert x_0\rVert^2 \equiv 1$，全程零公理证毕。完整证明由 Lean 内核检查。
:::

由 [@thm-ch07-alpha-sampling-norm-drift]，对任何非静止步（$x \neq x_0$），系数 $1 - 2\alpha$ 的符号直接决定全部几何行为：

1. **左端点伊藤 / 前向欧拉采样（$\alpha = 0$）**：$1 - 2\alpha = +1 > 0$，每走一步模方严格外漂 $\lVert x\rVert^2 \equiv 1 + \lVert x - x_0\rVert^2 > 1$，轨迹沿平直切线步步脱轨飞离球壳；
2. **右端点隐式欧拉采样（$\alpha = 1$）**：$1 - 2\alpha = -1 < 0$，每走一步模方严格内缩 $\lVert x\rVert^2 < 1$，轨迹向球心耗散坍缩；
3. **对称中点采样（$\alpha = \frac{1}{2}$）**：漂移系数 $1 - 2\alpha \equiv 0$ 精确归零。

将 $\alpha = \frac{1}{2}$ 处的显式步记为 $\operatorname{midpointStep}(a, x_0) := \operatorname{alphaSample}(\frac{1}{2}, a, x_0)$，对称中点对一切有限步幅严格保持单位球面：

::: {.theorem #thm-ch07-midpoint-unit-norm title="对称中点凯莱步的严格单位球面守恒" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.midpoint_unit_norm"}
对任意纯虚有理四元数生成元 $a \in \mathrm{RationalQuaternion}$（$a.\mathrm{num}.w = 0$）与任意单位初始四元数 $x_0 \in \mathrm{RationalQuaternion}$（$x_0.\mathrm{IsUnit}$），对称中点步 $\operatorname{midpointStep}(a, x_0)$ 严格保持单位模方（$\operatorname{midpointStep}(a, x_0).\mathrm{IsUnit}$），即在 `Omega.IntRatio.Equivalent` 下成立

$$
\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 \;\equiv\; 1.
$$
:::

::: {.proof}
在 [@thm-ch07-alpha-sampling-norm-drift] 中取 $\alpha = \frac{1}{2}$：系数 $1 - 2\cdot\frac{1}{2}$ 在 `Omega.IntRatio` 中等价于 $0$，而平方弦差 $\lVert\operatorname{midpointStep}(a, x_0) - x_0\rVert^2$ 恒为有限有理数，故右端等价于 $0$，得 $\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 - 1 \equiv 0$；两边加 $1$ 立即收回 $\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 \equiv 1$。完整证明由 Lean 内核检查。
:::

更进一步，令 $a = -2\boldsymbol{\sigma}$（$\boldsymbol{\sigma} \in \mathbb{Q}^3$，对应前文反号生成元 $A = 2\boldsymbol{\sigma}$），中点步的精确解 $\mathbf{x}_{1/2} = (1 - \boldsymbol{\sigma})^{-1}(1 + \boldsymbol{\sigma})\mathbf{x}_0 = Q(\boldsymbol{\sigma})\mathbf{x}_0$ 字面上就是有理凯莱驻球旋子步！将起点与中点整分子 $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$ 经由[第四章](ch04-heaps-and-lie-triple-curvature.md)的无原点三元流群倍增延拓至 $[h, x_0.\mathrm{num}, h] = h\overline{x_0.\mathrm{num}}h$，前半拍与后半拍的射影保真度同样在零公理内核中精确锁死：

::: {.theorem #thm-ch07-midpoint-half-step-fidelity title="中点流群三元组的前后半拍射影保真度守恒" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.midpoint_half_step_fidelity"}
对任意纯虚有理四元数生成元 $a \in \mathrm{RationalQuaternion}$（$a.\mathrm{num}.w = 0$）与任意单位初始四元数 $x_0 \in \mathrm{RationalQuaternion}$（$x_0.\mathrm{IsUnit}$），令 $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$。则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，初态分子 $x_0.\mathrm{num}$ 至中点分子 $h$ 的射影保真度 `Ternion.kappa` 与中点分子 $h$ 至流群三元延拓 $[h, x_0.\mathrm{num}, h]$（`Ternion.triad h x₀.num h`）的射影保真度精确相等：

$$
\kappa\bigl(x_0.\mathrm{num},\, h\bigr) \;\equiv\; \kappa\bigl(h,\, [h, x_0.\mathrm{num}, h]\bigr).
$$
:::

::: {.proof}
由初态假设 $x_0.\mathrm{IsUnit}$ 与 [@thm-ch07-midpoint-unit-norm] 知两整四元数分子 $u := x_0.\mathrm{num}$ 与 $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$ 均非零。置非零四元数 $p := \bar{u} h$ 及正整数 $n := \lVert u\rVert^2 > 0$，由四元数结合律与 $u\bar{u} = n$ 直接算得 $u p = n h$ 且 $h p = h\bar{u}h = [h, u, h]$。依次施用射影保真度 `Ternion.kappa` 的右乘不变性与左标量缩放不变性，即得

$$
\kappa(u, h) \;\equiv\; \kappa(u p,\, h p) \;=\; \kappa\bigl(n h,\, [h, u, h]\bigr) \;\equiv\; \kappa\bigl(h,\, [h, u, h]\bigr),
$$

全程零公理。完整证明由 Lean 内核检查。
:::

取 $a = -2\boldsymbol{\sigma}$ 时（手工推导），上述两半拍射影保真度同等于 $\bigl(\frac{1 - \lVert\boldsymbol{\sigma}\rVert^2}{1 + \lVert\boldsymbol{\sigma}\rVert^2}\bigr)^2$，而在有号自旋核 $\kappa_{\mathrm{spin}}(u, v) = \frac{1 + \langle u, v\rangle}{2}$ 下两半拍同样相等为 $\frac{1}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in \mathbb{Q} \cap (0, 1]$。由于左右两半拍把法向矢高对称吸收进弯曲圆弧内部，离散跃迁在对称中点处求值时彻底消除了左端点伊藤切线脱轨，使弯曲球面上的链式法则恢复纯代数协调。

::: {.example #ex-ch07-midpoint-drift-audit title="三维有理切步的五档采样漂移与中点链式守恒核验"}
取单位起点 $\mathbf{x}_0 = (1, 0, 0, 0)$ 与纯有理三维参数 $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\bigr)$，则 $\lVert\boldsymbol{\sigma}\rVert^2 = \frac{7}{18}$，反号生成元 $A = -a = 2\boldsymbol{\sigma} = \bigl(0, 1, \frac{2}{3}, \frac{1}{3}\bigr)$ 满足 $\lVert a\rVert^2 = \lVert A\rVert^2 = \frac{14}{9}$。按 [@thm-ch07-alpha-sampling-norm-drift]，五档采样权重 $\alpha$ 给出精确有理模方 $\lVert\mathbf{x}(\alpha)\rVert^2 = \frac{1 + (1-\alpha)^2\lVert a\rVert^2}{1 + \alpha^2\lVert a\rVert^2}$：

| 采样权重 $\alpha$ | 模方 $\lVert\mathbf{x}(\alpha)\rVert^2$（精确分数） | 小数近似 | 漂移 $(1 - 2\alpha)\lVert\Delta\mathbf{x}\rVert^2$ | 几何行为 |
| :---: | :---: | :---: | :---: | :--- |
| $0$ | $23/9$ | $2.555556$ | $+14/9$ | 伊藤左端点切线剧烈外漂 |
| $1/4$ | $135/79$ | $1.708861$ | $+56/79$ | 偏左过冲外漂 |
| $1/2$ | $1/1$ | $1.000000$ | $0$ | 对称中点凯莱步精确驻球 |
| $3/4$ | $79/135$ | $0.585185$ | $-56/135$ | 偏右向内耗散 |
| $1$ | $9/23$ | $0.391304$ | $-14/23$ | 隐式右端点向球心坍缩 |

唯在 $\alpha = \frac{1}{2}$ 处得到精确有理单位三元数 $\mathbf{x}_{1/2} = \bigl(\frac{11}{25}, \frac{18}{25}, \frac{12}{25}, \frac{6}{25}\bigr)$（$\lVert\mathbf{x}_{1/2}\rVert^2 = 1$，验证 [@thm-ch07-midpoint-unit-norm]）与流群满拍落点 $\mathbf{x}_1 = [\mathbf{x}_{1/2}, \mathbf{x}_0, \mathbf{x}_{1/2}] = \bigl(-\frac{383}{625}, \frac{396}{625}, \frac{264}{625}, \frac{132}{625}\bigr)$（$\lVert\mathbf{x}_1\rVert^2 = 1$）。前后两半拍射影保真度精确守恒为 $\frac{121}{625}$（验证 [@thm-ch07-midpoint-half-step-fidelity]），有号自旋保真度同为 $\frac{18}{25} = \frac{1}{1 + 7/18}$，且有限弦差与中点内积 $\langle \mathbf{x}_1 - \mathbf{x}_0, \mathbf{x}_0 + \mathbf{x}_1\rangle_{\mathbb{R}} = 0$。
:::

::: {.remark #rem-ch07-ito-stratonovich-boundary title="有理中点守恒与连续随机分析的文献边界"}
**文献结果与证据分层。** 上述 $\alpha$-采样范数漂移恒等式（[@thm-ch07-alpha-sampling-norm-drift]）、对称中点严格单位球面守恒（[@thm-ch07-midpoint-unit-norm]）与中点流群前后半拍射影保真度守恒（[@thm-ch07-midpoint-half-step-fidelity]）均已在零公理内核 `OmegaInit` 与 `OmegaMath` 中直接证毕，全程不涉及概率测度或极限。在连续随机微分几何中，左端点非预见求和诱导带二阶漂移修正的伊藤积分（K. Itô，1944），而对称中点求和诱导保持流形坐标不变性与经典链式法则的斯特拉托诺维奇积分（R. L. Stratonovich，1966；光滑路径逼近收敛定理见 E. Wong 与 M. Zakai，1965；文献结果）。本章的纯有理机制表明：伊藤脱轨在代数根源上正是 $\alpha = 0$ 处 $1 - 2\alpha = +1$ 的有限弦模方外溢。
:::

::: {.film src="a-symbol-whose-square-vanishes"}
**一个立方为零的形式符号 η，把求导、求逆与球面上的一步都变成精确的有理运算（2 分 52 秒）。** 片中每个量是三格有理数（值、斜率、弯曲的一半），截断乘法让第四格落下；常数格非零的射流两项之内求逆，在 $a = (2, 2, 1)$ 上逐阶乘回得 $(1, 0, 0)$，零位移链式法则在 $g = (1, 2, 3)$、$f = (0, \frac{1}{2}, \frac{1}{4})$ 上演示（绿色标签对应 [@thm-ch07-jet2-algebra-and-chain] 的 `mul_inv` 与 `chain_rule`，例子为屏幕计算）。按比例绘制的圆上，品红色平直切向步刺出球壳，青色圆弧步模 $\eta^3$ 驻球（手工推导），实际步长 $\frac{1}{2}$ 时两者模方为 $\frac{5}{4}$ 与 $\frac{65}{64}$（屏幕计算），过去、现在、未来的三阶读法标为模型诠释。青色射流在 $x_0 = 1$ 读出 `{1/2, -1/2, +1/4}`，品红割线在 $(1, \frac{1}{4})$ 高出 $\frac{5}{82}$、在 $(\frac{1}{2}, \frac{1}{4})$ 碰巧零偏差却看不见 $-\frac{16}{125}$（绿色标签对应 [@thm-ch07-fidelity-jet-and-secant] 的 `kappa_jet_one` 与 `kappa_secant_discrepancy`）。最后五档权重 $\alpha$ 的模方 $\frac{23}{9}$、$\frac{135}{79}$、$1$、$\frac{79}{135}$、$\frac{9}{23}$ 以精确四元数运算复算，琥珀色中点 $(11, 18, 12, 6)/25$ 留在球面上，前后两个半拍保真度同为 $\frac{121}{625}$（绿色标签对应 [@thm-ch07-alpha-sampling-norm-drift]、[@thm-ch07-midpoint-unit-norm] 与 [@thm-ch07-midpoint-half-step-fidelity]）；伊藤与斯特拉托诺维奇按 [@rem-ch07-ito-stratonovich-boundary] 标为文献结果。
:::

在下面的交互工作台卡片中，读者可以拖动琥珀色锚点与采样权重，在同一只紫色三元吻合球面上实时对比 $\mathcal{J}_2(\mathbb{Q})$ 的青色精确射流三元组 `{1/2, -1/2, +1/4}`、品红色有限割线偏差以及 $\alpha = \frac{1}{2}$ 中点步对比 $\alpha = 0$ 伊藤切线脱轨的几何差异；下一章，我们将把二阶射流推广到任意截断阶 $N$ 的 D-有限微分射流环 $J_N(\mathbb{Q})$，并在纯有理环内完成凯莱参数化与三角函数的代数大一统。

::: {.viz src="omega-math-workbench" preset="jet2-osculating-sphere" height="520"}
**二阶幂零射流与吻合球中点实验卡。** 在玻璃单位球壳包覆的紫色三元核心上，拖动琥珀色有理焦点 $x_0 = P/Q$（默认停在自对偶中点 $x_0 = 1$）并切换采样权重 $\alpha \in \{0, \frac{1}{4}, \frac{1}{2}, \frac{3}{4}, 1\}$：青色精确射流吻合弧直接读出 `{1/2, -1/2, +1/4}` 并由 $\alpha = \frac{1}{2}$ 中点凯莱步严守单位球壳，对比品红色有限割线偏差（完整工作台底部附带割线误差曲线）与 $\alpha = 0$ 左端点伊藤切线外漂。
:::
