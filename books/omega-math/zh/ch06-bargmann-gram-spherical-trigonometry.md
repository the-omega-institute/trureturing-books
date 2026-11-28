# 第六章 球面有理三角基本定理：巴格曼—格拉姆闭合律

> *“单条射影边上的方向余弦带着无理根号，但只要沿三点闭环走完一圈，每个顶点的模长恰好成对相乘消尽一切根号与符号；于是整部球面三角学无需半个 $\sin$、$\cos$、$\arccos$ 与 $\pi$，全部凝结为一条纯有理多项式闭合律。”*

经过[第四章](ch04-heaps-and-lie-triple-curvature.md)的无原点流群与利雅三元曲率，以及[第五章](ch05-rational-cayley-rotations.md)的三维凯莱有理旋转与切比雪夫谐波，我们在第二卷的最后一章正面攻克古典几何中最顽固的超越壁垒：**球面三角学**。在传统教材中，球面三角形被写满 $\cos c = \cos a\cos b + \sin a\sin b\cos C$、$\arccos$ 反三角函数与吉拉尔角盈 $\Omega = A + B + C - \pi$；只要三个顶点取在普通的非平方模方整射线（如 `[1:0:0:0]`、`[1:1:0:0]`、`[1:0:1:0]`）上，连一条边的夹角余弦都立刻溅出无理根号 $\frac{1}{\sqrt{2}}$。

本章将证明，这些无理数与超越函数全都是强行拆解三点闭环留下的假象。一旦引入**尺度无关、符号无关的纯有理巴格曼三点环路不变量** $B(\mathbf{a}, \mathbf{b}, \mathbf{c}) \in \mathbb{Q}$ 与归一化的 $3 \times 3$ **巴格曼—格拉姆闭合行列式** $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$，整部球面三角学便彻底化为纯有理多项式代数：它在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中对一切非零整四元数普遍非负，在流群测地倍增三元组上精确归零并锁死整系数圆弧倍增律，直接导出普遍成立的有理球面正弦律与有理球面勾股定理，并在基准正交半步三元组 $(o, p_{\mathrm{Half}}, q_{\mathrm{Half}})$ 上给出精确零公理角盈见证 $\det\mathbf{G}_3 \equiv \frac{1}{4}$，全篇不见半个 $\sin$、$\cos$、$\arccos$ 或 $\pi$。

## 6.1 告别正弦与余弦：无根号巴格曼三点环路不变量

在任意维数 $d \ge 2$ 的有理内积空间 $\mathbb{Q}^d$（本书核心场景为 `ProjTernion` 所在的 $d = 4$ 齐次射影三元空间 $\mathbb{QP}^3$，亦无缝覆盖 $d = 3$ 球面几何 $\mathbb{QP}^2$）中，任取三条非零射线代表 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Q}^d \setminus \{\mathbf{0}\}$。回忆两射线之间的有理保真度与展开度：

$$
\kappa(\mathbf{a}, \mathbf{b}) := \frac{\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2} \in \mathbb{Q} \cap [0, 1], \qquad s(\mathbf{a}, \mathbf{b}) := 1 - \kappa(\mathbf{a}, \mathbf{b}) \in \mathbb{Q} \cap [0, 1].
$$

若单独试图提取有号方向余弦 $\frac{\langle\mathbf{a}, \mathbf{b}\rangle}{\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert}$，不仅当 $\lVert\mathbf{a}\rVert^2$ 或 $\lVert\mathbf{b}\rVert^2$ 非平方数时立刻落出有理数域 $\mathbb{Q}$，而且还会因 $\mathbf{a} \mapsto -\mathbf{a}$ 的射线符号翻转而失去良定性。然而，把三条边的内积沿闭合三点环路 $\mathbf{a} \to \mathbf{b} \to \mathbf{c} \to \mathbf{a}$ 首尾相乘时，奇迹发生了：**每一枚顶点都在分子中恰好出现两次（入边一次、出边一次），因而既成对抵消了全部平方根，又成对抵消了全部射线正负号！**

::: {.definition #def-ch06-bargmann-and-gram3 title="有理巴格曼三点环路不变量与巴格曼—格拉姆闭合行列式"}
对任意非零有理向量 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Q}^d \setminus \{\mathbf{0}\}$：

1. 定义**巴格曼三点环路不变量**（Bargmann 3-point loop invariant）：

   $$
   B(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \frac{\langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{b}, \mathbf{c}\rangle\langle\mathbf{c}, \mathbf{a}\rangle}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^2} \in \mathbb{Q}.
   $$

2. 记原始整数（或有理）格拉姆矩阵为 $G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \bigl[\langle\mathbf{u}_i, \mathbf{u}_j\rangle\bigr]_{i,j=1}^3$（其中 $(\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3) = (\mathbf{a}, \mathbf{b}, \mathbf{c})$），定义归一化**巴格曼—格拉姆闭合行列式**为

   $$
   \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \frac{\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^2} \in \mathbb{Q}.
   $$
:::

直接核对上述定义的四条纯有理结构律（手工推导）：

1. **尺度与符号双不变性**：令 $(\mathbf{a}, \mathbf{b}, \mathbf{c}) \mapsto (\lambda\mathbf{a}, \mu\mathbf{b}, \nu\mathbf{c})$（$\lambda, \mu, \nu \in \mathbb{Q}^\times$），$B$ 的分子与分母同乘 $\lambda^2\mu^2\nu^2 > 0$ 而精确约尽——**连三枚射线的任意负号翻转都完全不变**！因此 $B$ 与 $\det\mathbf{G}_3$ 皆为射影空间 $(\mathbb{QP}^{d-1})^3$ 上的严格良定函数。
2. **三边保真度之积的精确有理平方根**：直接平方立得

   $$
   B(\mathbf{a}, \mathbf{b}, \mathbf{c})^2 = \kappa(\mathbf{a}, \mathbf{b})\,\kappa(\mathbf{b}, \mathbf{c})\,\kappa(\mathbf{c}, \mathbf{a}).
   $$

   即便 $\sqrt{\kappa_{ab}}, \sqrt{\kappa_{bc}}, \sqrt{\kappa_{ca}}$ 各自皆为无理数，三者沿闭环相乘却自动回归有理数 $B \in \mathbb{Q}$，且保留了单独知道三条边长 $\kappa_{ab}, \kappa_{bc}, \kappa_{ca}$ 所丢失的内积乘积符号。
3. **秩一投影巴格曼迹等同**：以[第四章](ch04-heaps-and-lie-triple-curvature.md)的秩一正交投影阵 $P(\mathbf{v}) = \frac{\mathbf{v}\mathbf{v}^\top}{\lVert\mathbf{v}\rVert^2} \in \operatorname{Sym}_d(\mathbb{Q})$ 写出三算符环路迹，立见 $\operatorname{Tr}\bigl(P(\mathbf{a})P(\mathbf{b})P(\mathbf{c})\bigr) = B(\mathbf{a}, \mathbf{b}, \mathbf{c})$。
4. **精确闭合展开式**：按三阶行列式萨吕法则展开 $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$ 并同除以恒正分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 > 0$，无需对任何向量开方归一，即得**巴格曼—格拉姆闭合方程**：

$$
\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) - \bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a})\bigr).
$$

## 6.2 普遍非负性：拉格朗日—格拉姆恒等式与柯西—比内体积平方

为何对一切非零三元组恒有 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$？答案既不需要特征值存在定理，也不需要实数开方，只须动用内核冻结的**拉格朗日—格拉姆平方和恒等式**即可一击证毕。

::: {.theorem #thm-ch06-lagrange-gram-identity title="拉格朗日—格拉姆二阶余子式平方和恒等式" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
设 $\iota$ 为有限指标集，$u, v : \iota \to \mathbb{R}$ 为实向量，则恒有纯多项式平方和恒等式：

$$
\left(\sum_{i \in \iota} u_i^2\right)\left(\sum_{j \in \iota} v_j^2\right) - \left(\sum_{i \in \iota} u_i v_i\right)^2 = \frac{1}{2}\sum_{i, j \in \iota} (u_i v_j - u_j v_i)^2.
$$

特别地，右端为非负平方和，立得柯西—施瓦茨不等式 $\langle u, v\rangle^2 \le \lVert u\rVert^2\lVert v\rVert^2$，且取等当且仅当对一切 $i, j$ 有 $u_i v_j = u_j v_i$（两向量线性相关）。
:::

::: {.proof}
展开右端双重求和：

$$
\frac{1}{2}\sum_{i, j} (u_i^2 v_j^2 - 2 u_i v_j u_j v_i + u_j^2 v_i^2) = \left(\sum_i u_i^2\right)\left(\sum_j v_j^2\right) - \left(\sum_i u_i v_i\right)^2.
$$

由于实数平方非负，右端恒 $\ge 0$，且等于 $0$ 当且仅当每一项 $u_i v_j - u_j v_i = 0$。完整证明由 Lean 内核检查。
:::

在一般维数 $d \ge 2$ 的有理空间 $\mathbb{Q}^d$ 中，只需将 $\mathbf{b}, \mathbf{c}$ 正交化到 $\mathbf{a}$ 的补空间并对所得向量施加 [@thm-ch06-lagrange-gram-identity]，即可纯多项式地推出 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$。在三元球面整数载体 `Quad4`（$\mathbb{Z}^4 \setminus \{\mathbf{0}\}$）上，这一球面有理三角基本闭合不等式彻底摆脱了实数连续统，直接落户于使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）的精确有号分数序 `Omega.IntRatio.Le` 之中：

::: {.theorem #thm-ch06-detgram3-nonneg title="四元巴格曼—格拉姆闭合行列式的普遍非负性" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg"}
设 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Z}^4$ 为 `Quad4` 中任意三枚非零整四元数（$\mathbf{a} \neq \mathbf{0}$、$\mathbf{b} \neq \mathbf{0}$、$\mathbf{c} \neq \mathbf{0}$）。在零公理有号分数类型 `Omega.IntRatio` 及其序关系 `IntRatio.Le` 下，归一化 $3 \times 3$ 巴格曼—格拉姆闭合行列式普遍非负：

$$
0 \;\le\; \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \;=\; 1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) - \bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a})\bigr).
$$
:::

::: {.proof}
在 $\mathbf{a}$ 的正交补方向构造两条不含除法的整四元数向量：

$$
\mathbf{w} := \lVert\mathbf{a}\rVert^2\mathbf{b} - \langle\mathbf{a}, \mathbf{b}\rangle\mathbf{a}, \qquad \mathbf{v} := \lVert\mathbf{a}\rVert^2\mathbf{c} - \langle\mathbf{a}, \mathbf{c}\rangle\mathbf{a}.
$$

易验 $\langle\mathbf{w}, \mathbf{a}\rangle = \langle\mathbf{v}, \mathbf{a}\rangle = 0$，且三项整内积为

$$
\lVert\mathbf{w}\rVert^2 = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2 - \langle\mathbf{a}, \mathbf{b}\rangle^2\bigr), \qquad \lVert\mathbf{v}\rVert^2 = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\lVert\mathbf{c}\rVert^2 - \langle\mathbf{a}, \mathbf{c}\rangle^2\bigr),
$$

$$
\langle\mathbf{w}, \mathbf{v}\rangle = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\langle\mathbf{b}, \mathbf{c}\rangle - \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle\bigr).
$$

代入 $\lVert\mathbf{w}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{w}, \mathbf{v}\rangle^2$，四次交叉项 $\langle\mathbf{a}, \mathbf{b}\rangle^2\langle\mathbf{a}, \mathbf{c}\rangle^2$ 精确抵消，余下 $\lVert\mathbf{a}\rVert^6\,\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$；再按二阶余子式平方和恒等式展开即得纯整数恒等式

$$
\lVert\mathbf{a}\rVert^6\,\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \lVert\mathbf{w}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{w}, \mathbf{v}\rangle^2 = \frac{1}{2}\sum_{i, j = 1}^4 (w_i v_j - w_j v_i)^2 \ge 0.
$$

因为 $\mathbf{a}, \mathbf{b}, \mathbf{c}$ 均非零，其平方范数 $\lVert\mathbf{a}\rVert^2, \lVert\mathbf{b}\rVert^2, \lVert\mathbf{c}\rVert^2$ 皆严格为正，从而 $\lVert\mathbf{a}\rVert^6 > 0$ 与公有分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 > 0$ 皆严格为正，分子 $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$ 遂直接给出 `IntRatio.Le 0 (detGram3 a b c)`，全程在 `OmegaInit` 与 `OmegaMath` 中零公理完成。完整证明由 Lean 内核检查。
:::

从一般维数 $d \ge 2$ 的矩阵几何侧看（手工推导），令 $A = [\mathbf{a}, \mathbf{b}, \mathbf{c}] \in \mathbb{Q}^{d \times 3}$，柯西—比内公式（Cauchy–Binet）把同一非负量改写为全部三阶子式的平方和：

$$
\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{\det(A^\top A)}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2} = \frac{\sum_{1 \le i < j < k \le d}(\det A_{ijk})^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2} \ge 0.
$$

当 $d = 3$ 时它化为单一有向平行六面体体积平方 $\frac{(\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}))^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2}$；当 $d = 4$（`ProjTernion` 空间）时它是 $\binom{4}{3} = 4$ 枚三阶子式的平方和，即归一化外积三矢量体积平方 $\lVert\hat{\mathbf{a}} \wedge \hat{\mathbf{b}} \wedge \hat{\mathbf{c}}\rVert^2$。

::: {.figure src="ch06-bargmann-triad"}
**大圆弧加倍与球面三角形。** 左图的青色弧在同一大圆上加倍，格拉姆行列式为零。右图的两条正交半步围出品红三角形，格拉姆行列式为 $1/4$。
:::

## 6.3 大圆共线定理与整系数圆弧倍增律

由上一节的精确平方和公式，等号成立条件一目了然：**$\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 0$ 当且仅当 $\mathbf{w}$ 与 $\mathbf{v}$ 线性相关，即当且仅当 $\dim\operatorname{span}_{\mathbb{Q}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) \le 2$——三条射线共处于同一张二维平面（投射到球面上即共处于同一条大圆测地线）！**

在大圆共线情形下，闭合方程精确锁死为线性巴格曼关系

$$
1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a}).
$$

将 $2B$ 单独留在等式一侧并两边平方、代入 $B^2 = \kappa_{ab}\kappa_{bc}\kappa_{ca}$，便立即消去 $B$ 而得到仅含三条边保真度的**有理共线多项式方程**（代数等价于怀尔德伯格三重展开度公式 $(s_{ab} + s_{bc} + s_{ca})^2 = 2(s_{ab}^2 + s_{bc}^2 + s_{ca}^2) + 4 s_{ab} s_{bc} s_{ca}$）：

$$
\bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a}) - 1\bigr)^2 = 4\,\kappa(\mathbf{a}, \mathbf{b})\,\kappa(\mathbf{b}, \mathbf{c})\,\kappa(\mathbf{c}, \mathbf{a}).
$$

保留 $B$ 的一次方程记录了有号内积的乘积关系。平方只保留乘积的模方。$B$ 对任意顶点置换和共同正交变换都不变，因此不记录大圆的行进方向。

现在将这套大圆共线律施于[第四章](ch04-heaps-and-lie-triple-curvature.md)的等步流群自平行延拓：对任意两枚非零整四元数 $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$，令 $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}] = \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$（`triad b a b`）。在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中，以下两条冻结定理依次确立了倍增三元组的大圆共线归零律与整系数圆弧倍增保真度律。

::: {.theorem #thm-ch06-geodesic-doubling-detgram3-zero title="流群测地倍增三元组的巴格曼—格拉姆行列式恒为零" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.geodesic_doubling_detGram3_zero"}
设 $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4$ 为 `Quad4` 中任意两枚非零整四元数（$\mathbf{a} \neq \mathbf{0}$、$\mathbf{b} \neq \mathbf{0}$），记流群测地倍增延拓为 $[\mathbf{b}, \mathbf{a}, \mathbf{b}] := \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$（`triad b a b`）。则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，三元组 $(\mathbf{a}, \mathbf{b}, [\mathbf{b}, \mathbf{a}, \mathbf{b}])$ 的巴格曼—格拉姆闭合行列式恒为零：

$$
\det\mathbf{G}_3\bigl(\mathbf{a},\, \mathbf{b},\, [\mathbf{b}, \mathbf{a}, \mathbf{b}]\bigr) \;\equiv\; 0.
$$
:::

::: {.proof}
由四元数反射恒等式 $\mathbf{b}\bar{\mathbf{a}} + \mathbf{a}\bar{\mathbf{b}} = 2\langle\mathbf{a}, \mathbf{b}\rangle\mathbf{1}$ 右乘 $\mathbf{b}$，立得 $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}]$ 的整线性组合表示：

$$
\mathbf{c} = \mathbf{b}\bar{\mathbf{a}}\mathbf{b} = 2\langle\mathbf{a}, \mathbf{b}\rangle\,\mathbf{b} - \lVert\mathbf{b}\rVert^2\,\mathbf{a}.
$$

由欧拉—拉格朗日四平方范数乘性恒等式，$\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^4 > 0$，故分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2$ 严格为正；同时，因 $\mathbf{c}$ 落在 $\mathbf{a}, \mathbf{b}$ 的线性张成之内，原始三阶格拉姆阵的第三行为前两行的线性组合，从而 $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 0$。据此 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, [\mathbf{b}, \mathbf{a}, \mathbf{b}]) \equiv 0$ 在 `Omega.IntRatio.Equivalent` 下零公理成立。完整证明由 Lean 内核检查。
:::

结合 [@thm-ch06-geodesic-doubling-detgram3-zero] 与大圆共线二次方程，记 $\kappa_1 := \kappa(\mathbf{a}, \mathbf{b})$ 与 $\kappa_2 := \kappa(\mathbf{a}, [\mathbf{b}, \mathbf{a}, \mathbf{b}])$。由 $\langle\mathbf{b}, \mathbf{c}\rangle = \lVert\mathbf{b}\rVert^2\langle\mathbf{a}, \mathbf{b}\rangle$ 知 $\kappa(\mathbf{b}, \mathbf{c}) = \kappa_1$，代入共线二次方程立得整系数精确因式分解：

$$
\bigl(2\kappa_1 + \kappa_2 - 1\bigr)^2 - 4\kappa_1^2\kappa_2 \equiv (\kappa_2 - 1)\Bigl(\kappa_2 - (2\kappa_1 - 1)^2\Bigr) = 0.
$$

两种构造分别是回到起点射线（$\mathbf{c}=\mathbf{a}$，$B=\kappa_1$，$\kappa_2=1$）与测地倍增。将 $\mathbf{c}=2\langle\mathbf{a},\mathbf{b}\rangle\mathbf{b}-\lVert\mathbf{b}\rVert^2\mathbf{a}$ 代入内积乘积，可得倍增时 $B=\kappa_1(2\kappa_1-1)$。因此一次方程给出 $\kappa_2=(2\kappa_1-1)^2$。当 $0<\kappa_1<1$ 时，两种构造的完整读数不同。当 $\kappa_1=0$ 或 $1$ 时，两支重合，倍增点也落回起点射线。整系数倍增律同样由零公理内核证得：

::: {.theorem #thm-ch06-geodesic-doubling-kappa title="测地圆弧倍增的整系数保真度律" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.geodesic_doubling_kappa"}
设 $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4$ 为 `Quad4` 中任意两枚非零整四元数（$\mathbf{a} \neq \mathbf{0}$、$\mathbf{b} \neq \mathbf{0}$）。则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，起点 $\mathbf{a}$ 与测地倍增点 $[\mathbf{b}, \mathbf{a}, \mathbf{b}] = \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$（`triad b a b`）之间的射影保真度满足

$$
\kappa\bigl(\mathbf{a},\, [\mathbf{b}, \mathbf{a}, \mathbf{b}]\bigr) \;\equiv\; \bigl(2\kappa(\mathbf{a}, \mathbf{b}) - 1\bigr)^2.
$$
:::

::: {.proof}
由 $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}] = 2\langle\mathbf{a}, \mathbf{b}\rangle\,\mathbf{b} - \lVert\mathbf{b}\rVert^2\,\mathbf{a}$ 与 $\mathbf{a}$ 取整数内积，得 $\langle\mathbf{a}, \mathbf{c}\rangle = 2\langle\mathbf{a}, \mathbf{b}\rangle^2 - \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$。再由四平方范数乘性 $\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^4$，分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^4\lVert\mathbf{b}\rVert^4 = (\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2)^2$ 严格为正，从而

$$
\kappa(\mathbf{a}, \mathbf{c}) = \frac{\bigl(2\langle\mathbf{a}, \mathbf{b}\rangle^2 - \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\bigr)^2}{\lVert\mathbf{a}\rVert^4\lVert\mathbf{b}\rVert^4} \;\equiv\; \left(\frac{2\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2} - 1\right)^2 = \bigl(2\kappa(\mathbf{a}, \mathbf{b}) - 1\bigr)^2
$$

在 `Omega.IntRatio.Equivalent` 下零公理成立。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch06-collinear-doubling title="正、负巴格曼不变量下的大圆共线倍增双算例"}
1. **正环路不变量情形**：取 $\mathbf{a} = [1:0:0:0]$、$\mathbf{b} = [2:1:0:0]$（$\kappa_1 = \frac{4}{5}$），流群自平行一步得 $\mathbf{c} = (2 + \mathbf{i})\cdot 1\cdot(2 + \mathbf{i}) = [3:4:0:0]$（$\lVert\mathbf{c}\rVert^2 = 25$）。直接核验 $\kappa_{ab} = \frac{4}{5}$、$\kappa_{bc} = \frac{10^2}{5 \cdot 25} = \frac{4}{5}$、$\kappa_{ca} = \frac{9}{25} = (2\cdot\frac{4}{5} - 1)^2$，且 $B = \frac{2 \cdot 10 \cdot 3}{1 \cdot 5 \cdot 25} = +\frac{12}{25} = \frac{4}{5}\cdot\frac{3}{5}$；闭合行列式 $\det\mathbf{G}_3 = 1 + \frac{24}{25} - (\frac{4}{5} + \frac{4}{5} + \frac{9}{25}) = 0$。
2. **负环路不变量与符号不变性情形**：取 $\mathbf{a} = [1:0:0:0]$、$\mathbf{b} = [1:2:0:0]$（$\kappa_1 = \frac{1}{5}$），流群延拓给出 $(1 + 2\mathbf{i})^2 = [-3:4:0:0]$，在规范代表元约定下写为 $\mathbf{c}' = [3:-4:0:0]$。算得 $\langle\mathbf{a}, \mathbf{b}\rangle = 1$、$\langle\mathbf{b}, \mathbf{c}'\rangle = 3 - 8 = -5$、$\langle\mathbf{c}', \mathbf{a}\rangle = 3$，于是巴格曼不变量取负值 $B = \frac{1 \cdot (-5) \cdot 3}{1 \cdot 5 \cdot 25} = -\frac{3}{25} < 0$（用未翻号的 $[-3:4:0:0]$ 计算同样得 $\frac{1 \cdot 5 \cdot (-3)}{125} = -\frac{3}{25}$！），而 $\kappa_{ab} = \kappa_{bc} = \frac{1}{5}$、$\kappa_{ca} = \frac{9}{25} = (2\cdot\frac{1}{5} - 1)^2$，依然精确给出 $\det\mathbf{G}_3 = 1 - \frac{6}{25} - (\frac{1}{5} + \frac{1}{5} + \frac{9}{25}) = 0$。
3. **同号的倍增与折返**：仍取 $\mathbf{a}=1$、$\mathbf{b}=2+\mathbf{i}$，但令 $\mathbf{c}=\mathbf{a}$。此时 $B=2\cdot2\cdot1/(1\cdot5\cdot1)=4/5$，与倍增时的 $12/25$ 同号，且两者的格拉姆行列式都为零。若同时把倍增算例的 $\mathbf{b},\mathbf{c}$ 共轭，弧的定向反转，$B$ 与三条边保真度却全部保留。
:::

## 6.4 有理球面角盈定理、正弦与勾股律及精确算例

一旦三射线 $\mathbf{a}, \mathbf{b}, \mathbf{c}$ 不共大圆（线性无关），$\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) > 0$ 便严格为正，量化出三点在弯曲球面上围出的有理曲率体积平方。更重要的是，这单一的闭合行列式直接统一了球面正弦定理、余弦定理与球面勾股定理的纯有理版本。

::: {.definition #def-ch06-vertex-spread title="有理边展开度与有理顶点展开度"}
对任意非零有理向量（特别地，对 `Quad4` 中任意非零整四元数）$\mathbf{a}, \mathbf{b}, \mathbf{c}$，记各边**有理展开度**（rational spread）为 $s(\mathbf{a}, \mathbf{b}) := 1 - \kappa(\mathbf{a}, \mathbf{b})$。当三条射线两两不重合（$s(\mathbf{a}, \mathbf{b}), s(\mathbf{b}, \mathbf{c}), s(\mathbf{c}, \mathbf{a}) \not\equiv 0$）时，定义顶点 $\mathbf{a}$ 处的**有理顶点展开度**（rational vertex spread，对应两邻边所在大圆切平面夹角的正弦平方）为

$$
S_a \;:=\; \operatorname{vertexSpread}(\mathbf{a}, \mathbf{b}, \mathbf{c}) \;:=\; \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \cdot \bigl(s(\mathbf{a}, \mathbf{b})\,s(\mathbf{c}, \mathbf{a})\bigr)^{-1},
$$

并对顶点 $\mathbf{b}, \mathbf{c}$ 轮换定义 $S_b := \operatorname{vertexSpread}(\mathbf{b}, \mathbf{c}, \mathbf{a})$ 与 $S_c := \operatorname{vertexSpread}(\mathbf{c}, \mathbf{a}, \mathbf{b})$。
:::

核验 $S_a \in \mathbb{Q} \cap [0, 1]$ 仅需一行纯有理配平方（手工推导）：展开 $s_{ab} s_{ca} - \det\mathbf{G}_3 = (1 - \kappa_{ab})(1 - \kappa_{ca}) - (1 + 2B - \kappa_{ab} - \kappa_{bc} - \kappa_{ca}) = \kappa_{bc} - 2B + \kappa_{ab}\kappa_{ca}$，通分立得完全平方

$$
s(\mathbf{a}, \mathbf{b})\,s(\mathbf{c}, \mathbf{a}) - \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{\bigl(\lVert\mathbf{a}\rVert^2\langle\mathbf{b}, \mathbf{c}\rangle - \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle\bigr)^2}{\lVert\mathbf{a}\rVert^4\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^2} \ge 0.
$$

由此立见有理球面交叉律 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = s(\mathbf{a}, \mathbf{b})\,s(\mathbf{c}, \mathbf{a})\,S_a$。在三元球面整四元数载体 `Quad4` 上，古典球面正弦定理与球面勾股定理的纯有理版本均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中直接证毕。先看轮换对称的有理球面正弦律：

::: {.theorem #thm-ch06-rational-spherical-sine-law title="有理球面正弦律" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.rational_spherical_sine_law"}
设 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Z}^4$ 为 `Quad4` 中任意三枚非零整四元数（$\mathbf{a} \neq \mathbf{0}$、$\mathbf{b} \neq \mathbf{0}$、$\mathbf{c} \neq \mathbf{0}$），且三条边展开度在 `Omega.IntRatio` 中均不等价于零：$s(\mathbf{a}, \mathbf{b}) \not\equiv 0$、$s(\mathbf{b}, \mathbf{c}) \not\equiv 0$、$s(\mathbf{c}, \mathbf{a}) \not\equiv 0$。则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，三处有理顶点展开度与各自对边展开度之比在轮换下完全相等：

$$
S_a \cdot s(\mathbf{b}, \mathbf{c})^{-1} \;\equiv\; S_b \cdot s(\mathbf{c}, \mathbf{a})^{-1} \;\equiv\; S_c \cdot s(\mathbf{a}, \mathbf{b})^{-1},
$$

其中 $S_a = \operatorname{vertexSpread}(\mathbf{a}, \mathbf{b}, \mathbf{c})$、$S_b = \operatorname{vertexSpread}(\mathbf{b}, \mathbf{c}, \mathbf{a})$、$S_c = \operatorname{vertexSpread}(\mathbf{c}, \mathbf{a}, \mathbf{b})$。
:::

::: {.proof}
按原始三阶格拉姆行列式展开，分子 $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$ 与恒正分母 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2$ 在轮换 $(\mathbf{a}, \mathbf{b}, \mathbf{c}) \mapsto (\mathbf{b}, \mathbf{c}, \mathbf{a})$ 下均严格不变，故 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \equiv \det\mathbf{G}_3(\mathbf{b}, \mathbf{c}, \mathbf{a})$。由于 $\mathbf{a}, \mathbf{b}, \mathbf{c}$ 非零且三条边展开度 $s(\mathbf{a}, \mathbf{b}), s(\mathbf{b}, \mathbf{c}), s(\mathbf{c}, \mathbf{a})$ 均有限且不等价于 $0$，三者及其两两乘积在 `Omega.IntRatio` 中皆可逆；将目标比值两边同乘公分母 $s(\mathbf{a}, \mathbf{b})\,s(\mathbf{b}, \mathbf{c})\,s(\mathbf{c}, \mathbf{a})$ 后，等式精确化归为 $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \equiv \det\mathbf{G}_3(\mathbf{b}, \mathbf{c}, \mathbf{a})$。将该单步轮换恒等式分别施于 $(\mathbf{a}, \mathbf{b}, \mathbf{c})$ 与 $(\mathbf{b}, \mathbf{c}, \mathbf{a})$，即得三比轮换全等，全程零公理。完整证明由 Lean 内核检查。
:::

回到上述配平方差式：当分子在顶点 $\mathbf{a}$ 处归零，即满足纯整数直角条件 $\langle\mathbf{a}, \mathbf{a}\rangle\langle\mathbf{b}, \mathbf{c}\rangle = \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle$ 时，投射到 $\mathbf{a}^\perp$ 的两切向向量 $\mathbf{w} = \lVert\mathbf{a}\rVert^2\mathbf{b} - \langle\mathbf{a}, \mathbf{b}\rangle\mathbf{a}$ 与 $\mathbf{v} = \lVert\mathbf{a}\rVert^2\mathbf{c} - \langle\mathbf{a}, \mathbf{c}\rangle\mathbf{a}$ 精确正交（在邻边展开度非零时恰对应球面直角 $S_a = 1$）。此时甚至无需任何边展开度非零假设，对边保真度便直接分解为两邻边保真度之积：

::: {.theorem #thm-ch06-rational-spherical-pythagorean title="有理球面勾股定理" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.rational_spherical_pythagorean"}
设 $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Z}^4$ 为 `Quad4` 中任意三枚非零整四元数（$\mathbf{a} \neq \mathbf{0}$、$\mathbf{b} \neq \mathbf{0}$、$\mathbf{c} \neq \mathbf{0}$），在顶点 $\mathbf{a}$ 处满足整数球面直角条件

$$
\langle\mathbf{a}, \mathbf{a}\rangle\langle\mathbf{b}, \mathbf{c}\rangle \;=\; \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle.
$$

则在零公理等价关系 `Omega.IntRatio.Equivalent` 下，对边保真度精确等于两邻边保真度之积：

$$
\kappa(\mathbf{b}, \mathbf{c}) \;\equiv\; \kappa(\mathbf{a}, \mathbf{b}) \cdot \kappa(\mathbf{c}, \mathbf{a}).
$$
:::

::: {.proof}
由整数内积对称性 $\langle\mathbf{a}, \mathbf{c}\rangle = \langle\mathbf{c}, \mathbf{a}\rangle$ 及 $\langle\mathbf{a}, \mathbf{a}\rangle = \lVert\mathbf{a}\rVert^2$，将直角假设 $\langle\mathbf{b}, \mathbf{c}\rangle\lVert\mathbf{a}\rVert^2 = \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{c}, \mathbf{a}\rangle$ 两边平方，立得纯整数恒等式 $\langle\mathbf{b}, \mathbf{c}\rangle^2\lVert\mathbf{a}\rVert^4 = \langle\mathbf{a}, \mathbf{b}\rangle^2\langle\mathbf{c}, \mathbf{a}\rangle^2$。再同乘正整数 $\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2$，恰好验证分数 $\kappa(\mathbf{b}, \mathbf{c}) = \frac{\langle\mathbf{b}, \mathbf{c}\rangle^2}{\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2}$ 与乘积 $\kappa(\mathbf{a}, \mathbf{b})\,\kappa(\mathbf{c}, \mathbf{a}) = \frac{\langle\mathbf{a}, \mathbf{b}\rangle^2\langle\mathbf{c}, \mathbf{a}\rangle^2}{(\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2)(\lVert\mathbf{c}\rVert^2\lVert\mathbf{a}\rVert^2)}$ 的交叉相乘相等；因 $\mathbf{a}, \mathbf{b}, \mathbf{c}$ 均非零，各分母严格为正，从而在 `Omega.IntRatio.Equivalent` 下零公理成立。完整证明由 Lean 内核检查。
:::

以 $\kappa = 1 - s$ 代入 [@thm-ch06-rational-spherical-pythagorean]（手工推导），立得与之等价的展开度勾股律 $s(\mathbf{b}, \mathbf{c}) = s(\mathbf{a}, \mathbf{b}) + s(\mathbf{c}, \mathbf{a}) - s(\mathbf{a}, \mathbf{b})\,s(\mathbf{c}, \mathbf{a})$。下面我们在三组具体整四元数三元组上逐项检验 [@thm-ch06-rational-spherical-sine-law]、[@thm-ch06-rational-spherical-pythagorean] 与球面角盈读数。

::: {.example #ex-ch06-spherical-excess-triads title="有理球面角盈三联算例：[1:0:0:0], [1:1:0:0], [1:0:1:0] 给出精确 det G₃ = 1/4"}
1. **基准直角球面三元组 $\mathbf{a} = [1:0:0:0]$、$\mathbf{b} = [1:1:0:0]$、$\mathbf{c} = [1:0:1:0]$**：
   先算整数模方 $\lVert\mathbf{a}\rVert^2 = 1$、$\lVert\mathbf{b}\rVert^2 = 2$、$\lVert\mathbf{c}\rVert^2 = 2$，以及三项两两内积 $\langle\mathbf{a}, \mathbf{b}\rangle = \langle\mathbf{b}, \mathbf{c}\rangle = \langle\mathbf{c}, \mathbf{a}\rangle = 1$。无需开方即一步读出三条边保真度与巴格曼环路不变量：

   $$
   \kappa_{ab} = \frac{1}{2}, \qquad \kappa_{bc} = \frac{1}{4}, \qquad \kappa_{ca} = \frac{1}{2}, \qquad B(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{1 \cdot 1 \cdot 1}{1 \cdot 2 \cdot 2} = \frac{1}{4}.
   $$

   代入巴格曼—格拉姆闭合律，得到精确正有理曲率体积平方：

   $$
   \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 1 + 2\left(\frac{1}{4}\right) - \left(\frac{1}{2} + \frac{1}{4} + \frac{1}{2}\right) = \frac{3}{2} - \frac{5}{4} = \frac{1}{4} > 0!
   $$

   （用原始格拉姆阵直接验算：$\det\bigl(\begin{smallmatrix} 1 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{smallmatrix}\bigr) = 1$，除以 $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 = 4$ 同样得 $\frac{1}{4}$。）由三边展开度 $(s_{ab}, s_{bc}, s_{ca}) = (\frac{1}{2}, \frac{3}{4}, \frac{1}{2})$ 算得三顶点展开度：

   $$
   S_a = \frac{1/4}{(1/2)(1/2)} = 1, \qquad S_b = S_c = \frac{1/4}{(1/2)(3/4)} = \frac{2}{3}.
   $$

   顶点 $\mathbf{a}$ 满足 $\langle\mathbf{a}, \mathbf{a}\rangle\langle\mathbf{b}, \mathbf{c}\rangle = 1 = \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle$，为精确球面直角，直接验证 [@thm-ch06-rational-spherical-pythagorean]：$\kappa_{bc} = \frac{1}{4} = \frac{1}{2}\cdot\frac{1}{2} = \kappa_{ab}\kappa_{ca}$；而平直等腰直角三角形的两个锐角展开度本为 $\frac{1}{2}$，在此却膨胀至 $S_b = S_c = \frac{2}{3} > \frac{1}{2}$，纯有理地显影出正球面角盈！三边正弦比同时验证 [@thm-ch06-rational-spherical-sine-law]：$\frac{S_a}{s_{bc}} = \frac{S_b}{s_{ca}} = \frac{S_c}{s_{ab}} = \frac{4}{3}$。
2. **球面等边三元组 $[1:1:0:0]$、$[1:0:1:0]$、$[1:0:0:1]$**：三边全满足 $\kappa = \frac{1}{4}$、$s = \frac{3}{4}$，巴格曼不变量 $B = \frac{1}{8}$，故 $\det\mathbf{G}_3 = 1 + \frac{2}{8} - \frac{3}{4} = \frac{1}{2} > 0$，三枚顶点展开度皆为 $S_a = S_b = S_c = \frac{1/2}{(3/4)^2} = \frac{8}{9}$，严格高出平直等边三角形的顶点展开度 $\frac{3}{4}$（有理盈余 $\frac{8}{9} - \frac{3}{4} = \frac{5}{36} > 0$）。
3. **满秩三正交卦限 $[1:0:0:0]$、$[0:1:0:0]$、$[0:0:1:0]$**：所有 $\kappa = 0$、$B = 0$，闭合行列式达到全局最大值 $\det\mathbf{G}_3 = 1$，三个顶点展开度全部等于 $1$（三直角球面三角形）。
:::

上例第 1 款的基准正交半步三元组 $(o, p_{\mathrm{Half}}, q_{\mathrm{Half}})$ 给出的严格正球面角盈 $\det\mathbf{G}_3 \equiv \frac{1}{4}$ 已作为零公理见证定理直接冻结在 `OmegaInit` 与 `OmegaMath` 内核之中：

::: {.theorem #thm-ch06-orthogonal-triad-excess-quarter title="基准正交半步三元组的精确有理球面角盈见证（零公理内核定理）" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter"}
在零公理基础库 `OmegaInit` 与 `OmegaMath`（传递公理闭包为空集）中，取 `Quad4` 中的三枚基准整四元数 $o := \mathrm{Quad4.one} = (1, 0, 0, 0)$、$p_{\mathrm{Half}} := (1, 1, 0, 0)$ 与 $q_{\mathrm{Half}} := (1, 0, 1, 0)$。则在有号分数等价关系 `Omega.IntRatio.Equivalent` 下，归一化 $3 \times 3$ 巴格曼—格拉姆闭合行列式精确等于 $\frac{1}{4}$：

$$
\det\mathbf{G}_3(o,\, p_{\mathrm{Half}},\, q_{\mathrm{Half}}) \;\equiv\; \frac{1}{4}.
$$
:::

::: {.proof}
按定义直接求值平方范数 $\lVert o\rVert^2 = 1$、$\lVert p_{\mathrm{Half}}\rVert^2 = 2$、$\lVert q_{\mathrm{Half}}\rVert^2 = 2$ 及两两整内积 $\langle o, p_{\mathrm{Half}}\rangle = \langle p_{\mathrm{Half}}, q_{\mathrm{Half}}\rangle = \langle q_{\mathrm{Half}}, o\rangle = 1$，立得 $\kappa(o, p_{\mathrm{Half}}) = \frac{1}{2}$、$\kappa(p_{\mathrm{Half}}, q_{\mathrm{Half}}) = \frac{1}{4}$、$\kappa(q_{\mathrm{Half}}, o) = \frac{1}{2}$ 与 $B(o, p_{\mathrm{Half}}, q_{\mathrm{Half}}) = \frac{1}{4}$。将其代入 `detGram3` 的定义式 $1 + 2B - (\kappa_{ab} + \kappa_{bc} + \kappa_{ca})$，在 `Omega.IntRatio` 中与目标分数 $\frac{1}{4}$（`IntRatio.value 1 4`）交叉相乘后在定义上直接相等（`Eq.refl`）。本声明仅依赖 `OmegaInit` 与 `OmegaMath`，传递公理闭包为空集。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch06-classical-shadow title="古典超越三角作为单向实阴影与有理三角学文献"}
在单向投射到实数连续统 $\mathbb{R}$ 时，令单位向量夹角为 $\alpha, \beta, \gamma$、顶点 $\mathbf{c}$ 处球面内角为 $C$，则 $\kappa_{bc} = \cos^2\alpha$、$\kappa_{ca} = \cos^2\beta$、$\kappa_{ab} = \cos^2\gamma$、$B = \cos\alpha\cos\beta\cos\gamma$，于是 $\det\mathbf{G}_3 = 1 + 2\cos\alpha\cos\beta\cos\gamma - \cos^2\alpha - \cos^2\beta - \cos^2\gamma = \sin^2\alpha\sin^2\beta\sin^2 C$，而有理顶点展开度 $S_c = \sin^2 C$ 精确收回古典球面正弦与余弦定律。在欧氏与球面几何中以展开度与方距取代角度与三角函数的系统纲领可参阅 N. J. Wildberger（*Divine Proportions: Rational Trigonometry to Universal Geometry*，2005；文献结果）。而在 `OmegaMath` 内部，巴格曼—格拉姆闭合律与零公理定理 [@thm-ch06-rational-spherical-sine-law]、[@thm-ch06-rational-spherical-pythagorean] 无需依赖这些实阴影，本身即构成完整的零超越数球面三角公理引擎。
:::

## 6.5 交互工作台：巴格曼—格拉姆有理球面三角实验

读者可在下方交互工作台实验卡中以过去锚 $\mathbf{a} = \mathbf{o} = [1:0:0:0]$ 为基点，直接调节其余两枚有理射线顶点 $\mathbf{b}, \mathbf{c}$：将三点切至大圆倍弧构造核对 [@thm-ch06-geodesic-doubling-detgram3-zero] 的 $\det\mathbf{G}_3 = 0$ 与 [@thm-ch06-geodesic-doubling-kappa] 的整系数倍增律 $\kappa_2 = (2\kappa_1 - 1)^2$，再将第三点抬离大圆进入正交三元组 `[1:0:0:0], [1:1:0:0], [1:0:1:0]`（[@thm-ch06-orthogonal-triad-excess-quarter]），亲眼核对 [@thm-ch06-rational-spherical-sine-law] 与 [@thm-ch06-rational-spherical-pythagorean]，观察巴格曼环路不变量 $B \in \mathbb{Q}$ 如何保留内积乘积的符号、以及 [@thm-ch06-detgram3-nonneg] 所保证的非负曲率体积平方 $\det\mathbf{G}_3 > 0$ 如何同步跃升至精确值 $\frac{1}{4}$。

::: {.film src="closing-a-spherical-triangle"}
**沿三点闭环走一圈，根号与符号成对消尽，整部球面三角学收束为一条有理闭合律（2 分 49 秒）。** 紫色球面上，整四元数射线 $a = 1$、$b = 1 + \mathbf{i}$、$c = 1 + \mathbf{j}$ 的单条边余弦 $1/\sqrt{2}$ 为无理数，且随 $a \mapsto -a$ 变号，而巴格曼环路数 $B = 1/4$ 不变；原始格拉姆行列式 $1$ 除以模方之积 $4$，品红三角形的闭合数 $\det\mathbf{G}_3 = 1 + 2B - (\kappa_{ab} + \kappa_{bc} + \kappa_{ca}) = 1/4$，绿色标签对应 [@thm-ch06-orthogonal-triad-excess-quarter]。等边三元组 $1 + \mathbf{i}, 1 + \mathbf{j}, 1 + \mathbf{k}$ 的四个三阶子式 $1, -1, 1, 1$ 平方和为 $4$，得 $\det\mathbf{G}_3 = 4/8 = 1/2$（屏幕计算；柯西—比内恒等式为本章手工推导），普遍非负性对应 [@thm-ch06-detgram3-nonneg]。青色大圆上 $a = 1$、$b = 2 + \mathbf{i}$、$c = b\bar{a}b = 3 + 4\mathbf{i}$ 给出 $\kappa = 4/5, 4/5, 9/25$、$B = 12/25$ 与 $\det\mathbf{G}_3 = 0$，取 $b = 1 + 2\mathbf{i}$ 时 $B = -3/25$（屏幕计算，[@ex-ch06-collinear-doubling]）；归零律与倍增律 $\kappa_2 = (2\kappa_1 - 1)^2$ 分别对应 [@thm-ch06-geodesic-doubling-detgram3-zero] 与 [@thm-ch06-geodesic-doubling-kappa]，琥珀色的当前一行依次演示 $4/5 \to 9/25$、$9/10 \to 16/25$、$1/2 \to 0$。顶点展开度 $1, 2/3, 2/3$ 与正弦律比值 $4/3$ 为屏幕计算，绿色标签对应 [@thm-ch06-rational-spherical-sine-law] 与 [@thm-ch06-rational-spherical-pythagorean]。四组三元组并列读出 $0, 1/4, 1/2, 1$；$1$ 为最大值与紫色的实数影子 $\det\mathbf{G}_3 = \sin^2\alpha\sin^2\beta\sin^2 C$ 按 [@rem-ch06-classical-shadow] 标为论证。
:::

至此，第二卷已用无原点流群、利雅三元曲率、有理凯莱旋转、切比雪夫谐波与巴格曼—格拉姆闭合律完成了弯曲三维球面的全套纯有理代数与三角重构。下一步的追问水到渠成：**既然代数与三角都能彻底告别实无穷与超越数，微积分中的导数、曲率与积分能否也一并摆脱 $\lim_{h \to 0}$ 极限？**让我们携带这套球面有理引擎，翻开第三卷的序幕——[第七章 二阶幂零射流环与无极限微积分](ch07-second-order-jet-calculus.md)。

::: {.viz src="omega-math-workbench" preset="bargmann-gram-triad" height="520"}
**巴格曼—格拉姆有理球面三角实验卡（`bargmann-gram-triad`）。** 以 $\mathbf{a} = \mathbf{o} = [1:0:0:0]$ 为固定基点，在紫色球面上交互调节有理射线顶点 $\mathbf{b}, \mathbf{c}$，实时读出无根号巴格曼环路不变量 $B(\mathbf{a}, \mathbf{b}, \mathbf{c}) \in \mathbb{Q}$、三条边保真度 $\kappa_{ab}, \kappa_{bc}, \kappa_{ca}$ 与闭合行列式 $\det\mathbf{G}_3 = 1 + 2B - (\kappa_{ab} + \kappa_{bc} + \kappa_{ca}) \ge 0$，对照青色大圆共线归零轨迹（$\det\mathbf{G}_3 = 0$）与 `[1:0:0:0], [1:1:0:0], [1:0:1:0]` 的品红有理球面角盈基准 $\det\mathbf{G}_3 = 1/4$。
:::
