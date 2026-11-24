# 24.3 代数自指的唯一黄金锁：$x = 1 + 1/x$ 与 $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

在进入余弦自指方程 $\cos\theta = \theta$（§24.4）之前，让我们先在实数轴 $(0, +\infty)$ 上看清最纯粹的**有理分式自指不动点**：

把最简单的算术操作“加 $1$”与“取倒数 $1/x$”组合成一架自指反馈机：

$$
x_{k+1} = 1 + \frac{1}{x_k}, \qquad x_0>0.
$$

有限步展开只包含有限层分式，底部仍是初值 $x_0$。无穷连分数 $1+1/(1+1/(\cdots))$ 则表示这些有限截断的极限，须另证收敛；不能把它等同于每个有限的 $x_{k+1}$。收敛可以手算（手工推导）：从任意 $x_0 > 0$ 出发有 $x_1 > 1$，此后各项都不小于 $1$，而 $\lvert x_{k+1} - \varphi\rvert = \lvert 1/x_k - 1/\varphi\rvert = \lvert x_k - \varphi\rvert/(x_k\varphi) \le \lvert x_k - \varphi\rvert/\varphi$，误差每步至少缩到原来的 $1/\varphi \approx 0.618$ 倍。

这正是我们在[第二十三章](ch23-diophantine-definability.md)研究黄金整数佩尔方程时遇到的连分数生成元！在 Lean 模块 `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint` 中，这一倒数残差自指映射被定义为 [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap)。

::: {.definition #def-golden-reciprocal-map title="黄金倒数自指映射 goldenReciprocalMap" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap"}
在实数域 $\mathbb{R}$ 上，定义**黄金倒数自指映射** [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap) $: \mathbb{R} \to \mathbb{R}$ 为

$$
\operatorname{goldenReciprocalMap}(x) \;:=\; 1 + \frac{1}{x}.
$$
:::

下面的推论严格证明：在全体正实数 $x > 0$ 的广阔天地里，无需任何外部预设，自指方程 $\operatorname{goldenReciprocalMap}(x) = x$ **存在且仅存在唯一的一颗正实数不动点**——黄金分割比 $\varphi = \frac{1 + \sqrt{5}}{2}$！

::: {.corollary #cor-golden-fixed-point-unique title="黄金分割比是倒数自指映射在正实数上的唯一不动点" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique"}
对 [@def-golden-reciprocal-map] 中的映射 $\operatorname{goldenReciprocalMap}(x) = 1 + 1/x$，记显式根式常数为 $\varphi = \frac{1 + \sqrt{5}}{2} \in \mathbb{R}$，则以下三项性质同时成立：

1. **正性**：$0 < \frac{1 + \sqrt{5}}{2}$；
2. **不动点成立**：$\operatorname{goldenReciprocalMap}\left(\frac{1 + \sqrt{5}}{2}\right) = \frac{1 + \sqrt{5}}{2}$；
3. **正实数域上的唯一性充要刻画**：对任意正实数 $x \in \mathbb{R}$（$0 < x$），

   $$
   \operatorname{goldenReciprocalMap}(x) = x \quad\Longleftrightarrow\quad x = \frac{1 + \sqrt{5}}{2}.
   $$
:::

::: proof
首先利用 [`golden_ratio_spec`](lean:D5/S0/Carrier/GoldenRatio.golden_ratio_spec) 将 $\frac{1 + \sqrt{5}}{2}$ 改写为 Mathlib 的 `Real.goldenRatio`。结论 1 直接由 `Real.goldenRatio_pos` 给出；结论 2 由倒数不动点恒等式 `golden_ratio_reciprocal_fixed_point`（$1 + 1/\varphi = \varphi$）给出。对结论 3，任取 $x > 0$（从而 $x \neq 0$）：若 $x = \varphi$，代入结论 2 即得不动点方程；反之，若 $1 + 1/x = x$，两边同乘非零实数 $x$（调用 `quadratic_fixed_point_iff`）等价转化为二次代数方程 $x^2 = x + 1$。结合 $\varphi^2 = \varphi + 1$，将两式相减作因式分解：

$$
(x - \varphi)(x + \varphi - 1) = x^2 - \varphi^2 - (x - \varphi) = (x + 1) - (\varphi + 1) - x + \varphi = 0.
$$

由实数域无零因子性知 $x - \varphi = 0$ 或 $x + \varphi - 1 = 0$。但因 $x > 0$ 且 $\varphi > 1$（`Real.one_lt_goldenRatio`），第二个因子严格为正：$x + \varphi - 1 > 0 + 1 - 1 = 0$，绝不可能为零！故必有 $x = \varphi = \frac{1 + \sqrt{5}}{2}$。完整证明由 Lean 内核检查。
:::

::: {.viz src="fixed-point-convergence" preset="golden" height="500"}
**一左一右，夹住 φ。** 从 $x_0 = 1$ 反复按 $1 + 1/x$，折线依次落在 $2, \frac{3}{2}, \frac{5}{3}, \frac{8}{5}, \dots$，左右交替地收进青色曲线 $y = 1 + 1/x$ 与灰线 $y = x$ 的交点 $\varphi$；每一圈的宽度约为上一圈的 $1/\varphi^2 \approx 0.382$ 倍，正是品红虚线（不动点处的切线）斜率的大小。交点是唯一的正不动点，由 [@cor-golden-fixed-point-unique] 保证；收敛与速率是页面的数值演示。
:::

[@cor-golden-fixed-point-unique] 回答了“$1 + 1/x$ 的不动点是什么”，却绕过了一个更靠前的问题：**为什么是 $1 + 1/x$？** 说它是“最简单的加一与取倒数的组合”只是印象。要把印象变成定理，就得把同类映射全部列出来，逐个检查。

“同类”指系数只取 $0$ 与 $1$ 的分式线性映射 $x \mapsto \frac{ax + b}{cx + d}$。令它等于 $x$ 并通分，得到不动点方程

$$
c\,x^2 + (d - a)\,x - b \;=\; 0,
$$

其判别式为 $(d - a)^2 + 4bc$。Lean 模块 `D5/S0/Diagonal/SelfApplicationFates` 把这些量逐一定义出来，并按方程的样子给每个映射判一种“自作用命运”。

::: {.definition #def-binary-fractional-map-fates title="二元分式映射、不动点系数、判别式与四种自作用命运" lean="D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap D5/S0/Diagonal/SelfApplicationFates.determinant D5/S0/Diagonal/SelfApplicationFates.Nondegenerate D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients D5/S0/Diagonal/SelfApplicationFates.discriminant D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate D5/S0/Diagonal/SelfApplicationFates.HasFate D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily"}
在模块 `SelfApplicationFates` 中：

1. **二元分式映射** [`BinaryFractionalMap`](lean:D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap) 是由四个取值于 $\operatorname{Fin} 2 = \{0, 1\}$ 的分量 $a, b, c, d$ 构成的结构体；
2. **行列式** [`determinant`](lean:D5/S0/Diagonal/SelfApplicationFates.determinant) 定义为整数 $\operatorname{determinant} m = a\,d - b\,c$；称 $m$ **非退化**（[`Nondegenerate`](lean:D5/S0/Diagonal/SelfApplicationFates.Nondegenerate)），若 $\operatorname{determinant} m \neq 0$；
3. **不动点系数** [`fixedCoefficients`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients) 定义为整数三元组 $\operatorname{fixedCoefficients} m = (c,\; d - a,\; -b)$；
4. **判别式** [`discriminant`](lean:D5/S0/Diagonal/SelfApplicationFates.discriminant) 定义为整数 $\operatorname{discriminant} m = (d - a)^2 + 4\,b\,c$；
5. **自作用命运** [`SelfApplicationFate`](lean:D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate) 是恰有四个构造子 `empty`、`dead`、`collapse`、`live` 的归纳类型；谓词 [`HasFate`](lean:D5/S0/Diagonal/SelfApplicationFates.HasFate) $m$ 在四个构造子上分别定义为：
   - `empty`：$\operatorname{fixedCoefficients} m = (0, 0, 0)$；
   - `dead`：$\operatorname{fixedCoefficients} m = (0, 0, -1)$；
   - `collapse`：$\operatorname{discriminant} m = 0$ 或 $\operatorname{discriminant} m = 4$，并且 $\operatorname{fixedCoefficients} m \neq (0, 0, 0)$，并且 $\operatorname{fixedCoefficients} m \neq (0, 0, -1)$；
   - `live`：$\operatorname{discriminant} m = 5$；
6. **$\varphi$ 族** [`IsPhiFamily`](lean:D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily) $m$ 定义为 $(a, b, c, d) = (1, 1, 1, 0)$ 或 $(a, b, c, d) = (0, 1, 1, 1)$。
:::

把四个比特 $(a, b, c, d)$ 读成映射 $x \mapsto \frac{ax+b}{cx+d}$ 是本书的解读；[@def-binary-fractional-map-fates] 中的 Lean 定义只涉及这四个比特和由它们算出的整数。（同一模块另有 [`fixedPolynomial`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedPolynomial)，它在有理数 $x$ 处取值 $c\,x^2 + (d - a)\,x - b$，正是上面那条不动点方程的左端。）四种命运的名字各有所指：`empty` 是方程 $0 = 0$，每个点都是不动点，方程不含任何信息；`dead` 是方程 $-1 = 0$，没有不动点；`collapse` 是判别式为完全平方数 $0$ 或 $4$ 的情形，根落回有理数；`live` 是判别式为 $5$ 的情形，根是无理数。

::: {.theorem #thm-self-application-four-fates title="非退化二元分式映射的四种自作用命运与 φ 族的刻画" lean="D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates"}
设 $m$ 为二元分式映射（[@def-binary-fractional-map-fates]），且 $m$ 非退化（`hm : Nondegenerate m`）。则以下四项同时成立：

1. **命运存在且唯一**：存在唯一的 $\mathrm{fate}$ 使 $\operatorname{HasFate}\ m\ \mathrm{fate}$ 成立；
2. **`live` 当且仅当属于 $\varphi$ 族**：

   $$
   \operatorname{HasFate}\ m\ \mathtt{live} \quad\Longleftrightarrow\quad \operatorname{IsPhiFamily}\ m\,;
   $$

3. **`live` 时的不动点系数**：若 $\operatorname{HasFate}\ m\ \mathtt{live}$，则 $\operatorname{fixedCoefficients} m = (1, -1, -1)$ 或 $\operatorname{fixedCoefficients} m = (1, 1, -1)$；
4. **`live` 时的判别式**：若 $\operatorname{HasFate}\ m\ \mathtt{live}$，则 $\operatorname{discriminant} m = 1^2 + 4$。
:::

::: proof
`BinaryFractionalMap` 只有 $2^4 = 16$ 个元素。证明先把 $m$ 拆成四个分量并对每个分量分 $0$、$1$ 两种情形（`fin_cases`），用 `norm_num` 化简前提 `hm`，退化的情形随即被排除。在余下的每个情形里，结论 1 的存在性由直接给出对应的构造子并用 `decide` 判定得到，唯一性则对四个构造子逐一分情形、展开 `HasFate`、`fixedCoefficients` 与 `discriminant` 后化简得到；结论 2、3、4 都是有限情形上的可判定命题，由 `decide` 判定。完整证明由 Lean 内核检查。
:::

非退化的二元分式映射一共只有六个，可以全部摆上桌面。

::: {.example #ex-six-binary-fractional-maps title="六个非退化二元分式映射的逐一枚举"}
行列式 $ad - bc \neq 0$ 且 $a, b, c, d \in \{0, 1\}$ 的四元组恰有六个：$a = d = 1$ 且 $bc = 0$ 的三个，以及 $b = c = 1$ 且 $ad = 0$ 的三个。逐一计算 [@def-binary-fractional-map-fates] 中的量：

| $(a, b, c, d)$ | 映射 $x \mapsto \frac{ax+b}{cx+d}$ | 不动点方程 | 判别式 | 命运 | 实不动点 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(1, 0, 0, 1)$ | $x \mapsto x$ | $0 = 0$ | $0$ | `empty` | 每个 $x$ |
| $(1, 1, 0, 1)$ | $x \mapsto x + 1$ | $-1 = 0$ | $0$ | `dead` | 无 |
| $(1, 0, 1, 1)$ | $x \mapsto \frac{x}{x+1}$ | $x^2 = 0$ | $0$ | `collapse` | $0$ |
| $(0, 1, 1, 0)$ | $x \mapsto \frac{1}{x}$ | $x^2 - 1 = 0$ | $4$ | `collapse` | $\pm 1$ |
| $(1, 1, 1, 0)$ | $x \mapsto 1 + \frac{1}{x}$ | $x^2 - x - 1 = 0$ | $5$ | `live` | $\varphi,\ -\varphi^{-1}$ |
| $(0, 1, 1, 1)$ | $x \mapsto \frac{1}{1+x}$ | $x^2 + x - 1 = 0$ | $5$ | `live` | $\varphi^{-1},\ -\varphi$ |

每一行恰有一种命运，与 [@thm-self-application-four-fates] 的结论 1 一致；`live` 的两行正是 $\varphi$ 族，不动点系数分别为 $(1, -1, -1)$ 与 $(1, 1, -1)$，与结论 2、3 一致。两个 `live` 映射互为共轭：若 $x = 1 + 1/x$，则 $y = 1/x$ 满足 $y = 1/(1 + y)$。
:::

所以 $1 + 1/x$ 不是随手挑的。在用 $0$ 和 $1$ 能写出的全部六个非退化分式映射里，一个什么都没说，一个无处可停，两个停在有理数上，只有 $1 + 1/x$ 和它的共轭 $1/(1+x)$ 停在有理数够不到的地方。[@cor-golden-fixed-point-unique] 已经算出前者在正实数上的唯一不动点；后者的对应结论同样有冻结的 Lean 证明。

::: {.figure src="ch24-six-maps"}
**六个映射与对角线的交点。** 每个小图是上表的一行：墨色曲线是 $x \mapsto \frac{ax+b}{cx+d}$，灰色虚线是 $y = x$，交点就是实不动点。`empty` 的曲线与对角线重合；`dead` 与它平行；两个 `collapse` 交在青色的有理点 $0$ 与 $\pm 1$；只有两个 `live` 交在品红的无理点 $\varphi, -\varphi^{-1}$ 与 $\varphi^{-1}, -\varphi$（[@thm-self-application-four-fates]）。
:::

::: {.lemma #lem-golden-inverse-branch-fixed-point title="映射 1/(1+x) 在正实数上的唯一不动点是黄金比的倒数" lean="D5/S3/Analytic/Characterizations/GoldenInverseBranchFixedPoint.golden_inverse_branch_positive_fixed_point_iff"}
对任意实数 $x$，若 $0 < x$，则

$$
\frac{1}{x + 1} = x \quad\Longleftrightarrow\quad x = \varphi^{-1},
$$

其中 $\varphi$ 为 Mathlib 的 `Real.goldenRatio`。
:::

::: proof
先从 `golden_transfer_triangle` 取出恒等式 $\varphi - 1 = \varphi^{-1}$。正向：由 $x > 0$ 知 $x + 1 \neq 0$，于是 $\frac{1}{x+1} = x$ 等价于 $1 = x\,(x + 1)$；结合 $\varphi^2 = \varphi + 1$（`Real.goldenRatio_sq`）与 $\varphi > 1$（`Real.one_lt_goldenRatio`），非线性算术给出 $x = \varphi - 1 = \varphi^{-1}$。反向：代入 $x = \varphi^{-1}$，由 $\varphi^{-1} + 1 = \varphi$ 得 $\frac{1}{\varphi^{-1} + 1} = \frac{1}{\varphi} = \varphi^{-1}$。完整证明由 Lean 内核检查。
:::

到这里，黄金自指还是一件纯代数的事：加法、除法、一个二次方程。§24.4 将把它与余弦自指 $\cos\theta = \theta$ 放在一起对比（后者的经典分析与算术性质见 §24.4 的文献注记）。但这两种自指并非互不相干。黄金比本身就是一个余弦读数，读的是正五边形的角。

::: {.proposition #prop-pentagon-golden-cosines title="正五边形的倍余弦读出黄金比、它的倒数与 √5" lean="D5/S3/Constants/PentagonCosines.pentagon_golden_cosines"}
记 $\varphi$ 为 Mathlib 的 `Real.goldenRatio`。以下四项同时成立：

1. $2\cos\dfrac{\pi}{5} = \varphi$；
2. $2\cos\dfrac{2\pi}{5} = \varphi^{-1}$；
3. $2\cos\dfrac{\pi}{5} + 2\cos\dfrac{2\pi}{5} = \sqrt{5}$；
4. $2\cos\dfrac{2\pi}{5}$ 是无理数。
:::

::: proof
结论 1 由 Mathlib 的闭式 `Real.cos_pi_div_five`（$\cos\frac{\pi}{5} = \frac{1 + \sqrt5}{4}$）乘以 $2$ 得到。对结论 2，把 $\frac{2\pi}{5}$ 写成 $2\cdot\frac{\pi}{5}$，用倍角公式 $\cos 2\alpha = 2\cos^2\alpha - 1$ 与同一闭式算出 $\cos\frac{2\pi}{5} = \frac{\sqrt5 - 1}{4}$（其中用到 $(\sqrt5)^2 = 5$），再由 `Real.inv_goldenRatio` 把 $\varphi^{-1}$ 改写为 $-\frac{1 - \sqrt5}{2}$ 对上。结论 3 把前两项相加，由 `Real.goldenRatio_sub_goldenConj` 得 $\sqrt5$。结论 4 由 $\varphi$ 的无理性（`Real.goldenRatio_irrational`）经取倒数保持无理性得到。完整证明由 Lean 内核检查。
:::

把 [@prop-pentagon-golden-cosines] 的前两项代入黄金不动点方程 $1 + \varphi^{-1} = \varphi$（[@cor-golden-fixed-point-unique] 的结论 2），它就变成一条三角恒等式：

$$
1 + 2\cos\frac{2\pi}{5} \;=\; 2\cos\frac{\pi}{5}.
$$

黄金自指是正五边形里的一条长度关系：单位边长的正五边形，对角线长为 $2\cos\frac{\pi}{5} = \varphi$。于是 $\varphi$ 也是 $\frac{\pi}{5}$ 处余弦值的两倍，并落在二次代数数域 $\mathbb{Q}(\sqrt{5})$ 内。

## 24.3.1 射影莫比乌斯精确收缩、平衡三元分式分类、赫尔维茨逼近屏障与五角切比雪夫—展开度闭环 {#sec-ch24-3-1-golden-mobius-ternary-hurwitz-chebyshev}

承接前文关于 $1 + 1/x$ 与 $1/(1 + x)$ 唯一正不动点、二元系数集 $\{0, 1\}^4$ 上非退化映射四种命运以及正五边形倍余弦读数的结论，下文补全四项基础代数结构。前两小节先将开篇 $1/\varphi$ 误差界推进为射影交比乘子 $-\varphi^{-2}$ 与原坐标步进收缩律，并检验系数集从二元 $\{0, 1\}^4$ 扩至平衡三元 $\{-1, 0, 1\}^4$ 后黄金家族的唯一性。后两小节则不借无穷连分数极限，直接从 $\mathbb{Z}[\varphi]$ 与 $\mathbb{Z}[\sqrt{2}]$ 的二次范数确立黄金比与银比的 $\sqrt{5}$ 和 $2\sqrt{2}$ 逼近屏障，再将 [@prop-pentagon-golden-cosines] 的五角代数内核抽离为纯整系数切比雪夫与展开度多项式恒等式。

### 24.3.1.1 射影 $\mathrm{GL}(2, \mathbb{Z})$ 迭代、乘子为 $-\varphi^{-2}$ 的交比线性化与倒数共轭分支移位对偶 {#sec-ch24-3-1-1-projective-mobius-contraction}

在实射影直线 $\mathbb{RP}^1$ 上，幺模整矩阵 $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \in \mathrm{GL}(2, \mathbb{Z}) \subset \mathrm{GL}(2, \mathbb{R})$ 在 $\mathbb{R}$ 上线性作用于齐次坐标，并保持有理射影直线 $\mathbb{QP}^1 \subset \mathbb{RP}^1$ 不变（A. F. Beardon，*The Geometry of Discrete Groups*，1983，Sections 4.2–4.3，[10.1007/978-1-4612-1146-4](https://doi.org/10.1007/978-1-4612-1146-4)）。限制到有限仿射图 $(x, 1)^\top$（$x \neq 0$）上，该作用即给出反馈映射 $x \mapsto 1 + 1/x$，并同时覆盖任意正实初值 $x_0 > 0$ 与两个无理不动点 $\varphi, \varphi'$。

记斐波那契数列 $F_0 = 0, F_1 = 1, F_{n+2} = F_{n+1} + F_n$：由 $A^2 = A + I$ 归纳立得对一切 $n \ge 1$ 有幂次 $A^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$，取行列式（$\det A = -1$）直接给出卡西尼恒等式 $F_{n+1} F_{n-1} - F_n^2 = (-1)^n$。将逆幂 $A^{-n} = (-1)^n \begin{pmatrix} F_{n-1} & -F_n \\ -F_n & F_{n+1} \end{pmatrix}$ 代入 $A^{m-n} = A^m A^{-n}$ 并比较 $(1, 2)$ 元（$n = 0$ 时直接核对 $F_m \cdot 1 - F_{m+1} \cdot 0 = F_m$），导出多卡涅恒等式 $F_m F_{n+1} - F_{m+1} F_n = (-1)^n F_{m-n}$（对一切 $m \ge n \ge 0$）。

对任意正初值 $x_0 > 0$ 与一切 $n \ge 1$，第 $n$ 步迭代精确写为 $x_n = \frac{F_{n+1} x_0 + F_n}{F_n x_0 + F_{n-1}}$（分母恒正）。由 $\varphi^2 = \varphi + 1$ 与 $\varphi' = 1 - \varphi = -\varphi^{-1}$ 归纳得 $F_{n+1} - \varphi F_n = (-\varphi^{-1})^n$（$n \ge 0$），继而 $(F_{n+1} x_0 + F_n) - \varphi(F_n x_0 + F_{n-1}) = (-\varphi^{-1})^n (x_0 - \varphi)$；结合单步残差恒等式 [`golden_mobius_sub_golden`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenCrossRatioLinearization.golden_mobius_sub_golden) 及两步乘积 $x_n x_{n+1} = x_n(1 + 1/x_n) = x_n + 1$，立得精确误差公式与两步收缩恒等式：

$$
\begin{aligned}
x_n - \varphi &= \frac{(-1)^n (x_0 - \varphi)}{\varphi^n (F_n x_0 + F_{n-1})} \quad (n \ge 1), \\
x_{n+1} - \varphi &= -\frac{x_n - \varphi}{\varphi x_n}, \\
x_{n+2} - \varphi &= \frac{x_n - \varphi}{\varphi^2 (x_n + 1)}.
\end{aligned}
$$

记射影交比坐标 $\chi(x) = (x - \varphi)/(x - \varphi')$；每步迭代都将 $\chi(x)$ 乘以 $-\varphi^{-2}$，给出线性化公式 $\chi(x_n) = (-\varphi^{-2})^n \chi(x_0)$（见 [`golden_cross_ratio_iterate`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenCrossRatioLinearization.golden_cross_ratio_iterate) 与 [`golden_projective_multiplier_eq_neg_conjugate_sq`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenMobiusMap.golden_projective_multiplier_eq_neg_conjugate_sq)）。

回到原坐标，只要 $x_0 \neq \varphi$，单步有号误差比恒为 $-\frac{1}{\varphi x_n}$。凡初值落在开区间 $(0, \varphi^{-1})$ 内，均有 $\varphi x_0 < 1$，故首步必严格放大误差；但从 $n \ge 1$ 起恒有 $x_n > 1$，既保证一致单步收缩因子 $\frac{1}{\varphi x_n} < \frac{1}{\varphi}$，又使两步因子满足 $\frac{1}{\varphi^2(x_n + 1)} < \frac{1}{2\varphi^2}$（档案包络四舍五入为 $0.190983$）。又因对一切 $n \ge 2$ 有 $x_n \in (1, 2)$，故对一切 $n \ge 3$ 恒有 $x_n \in (\frac{3}{2}, 2)$，两步因子严格低于 $\frac{2}{5\varphi^2}$（$0.152786$）。

取实验卡初值 $x_0 = 1$ 时，全部迭代 $x_n = F_{n+2}/F_{n+1}$（$n \ge 1$）已落入 $[\frac{3}{2}, 2]$（并在 $n = 2$ 恰取到两步上界 $\frac{2}{5\varphi^2}$），精确误差为 $x_n - \varphi = \frac{(-1)^{n+1}}{\varphi^{n+1} F_{n+1}}$。单步有号误差比 $-\frac{F_{n+1}}{\varphi F_{n+2}}$ 的模长在 $\varphi^{-2} = \frac{3 - \sqrt{5}}{2}$（$0.381966$）两侧严格交替收拢：在 $n = 1$（$0.309017$）与 $n = 2$（$0.412023$）之后，至 $n = 12$（$x_{12} = \frac{377}{233}$，误差模长四舍五入为 $0.000008$）已收至 $0.381968$，至 $n = 14$（$x_{14} = \frac{987}{610}$）六位小数与 $\varphi^{-2}$ 吻合。

对 [@lem-golden-inverse-branch-fixed-point] 的倒数共轭分支 $y_{n+1} = \frac{1}{1 + y_n}$（它与 $x \mapsto 1 + 1/x$ 经 $y = 1/x$ 共轭，并非后者的函数逆映射 $y \mapsto 1/(y - 1)$）取 $y_0 = 1/x_0 > 0$，归纳给出对一切 $n \ge 0$ 成立 $y_n = 1/x_n = x_{n+1} - 1$；减去 $\varphi^{-1} = \varphi - 1$ 即得精确移位对偶 $y_n - \varphi^{-1} = x_{n+1} - \varphi$（例如 $x_0 = 1, n = 1$ 时，$y_1 = \frac{1}{2}$ 与 $x_2 = \frac{3}{2}$ 与各自不动点的有号差值均为 $\frac{3}{2} - \varphi$）。

### 24.3.1.2 平衡三元系数集 $\{-1, 0, 1\}^4$ 上非退化分式映射的分类与幺模黄金唯一性 {#sec-ch24-3-1-2-balanced-ternary-classification}

将 [@def-binary-fractional-map-fates] 与 [@thm-self-application-four-fates] 的系数集从二元 $\{0, 1\}^4$ 扩至对称的平衡三元系数集 $\{-1, 0, 1\}^4$，记其中的整矩阵为 $M = (a, b, c, d) \in \{-1, 0, 1\}^4$（共 $3^4 = 81$ 个）。对有序对 $(a, d) \in \{-1, 0, 1\}^2$，乘积 $ad$ 取 $+1$、$-1$、$0$ 的情形分别恰有 $2, 2, 5$ 种，故奇异条件 $\det M = ad - bc = 0$ 恰在 $2^2 + 2^2 + 5^2 = 33$ 个矩阵上成立，余下 $48$ 个非退化矩阵。

模去整体符号 $M \sim -M$（选取首个非零元为 $+1$ 的规范代表），这 $48$ 个非退化矩阵构成 $24$ 个非退化射影分式变换（全部 $40$ 个非零符号类中余下 $16$ 个为奇异类）。在这 $24$ 个非退化射影类中，$\lvert\det M\rvert = 2$ 仅当 $\{ad, bc\} = \{+1, -1\}$ 时出现（$2 \cdot 2 + 2 \cdot 2 = 8$ 个矩阵，即 $4$ 个射影类），其余 $20$ 个射影类（$40$ 个矩阵）均为幺模变换（$\lvert\det M\rvert = 1$）。

射影直线上的齐次不动点方程 $c X^2 + (d - a) X Y - b Y^2 = 0$ 在有限图 $x = X/Y$ 上化为 $c x^2 + (d - a) x - b = 0$（而无穷远点 $[1 : 0]$ 对应 $Y = 0$，是不动点当且仅当 $c = 0$），其判别式为 $\Delta = (d - a)^2 + 4bc = (a + d)^2 - 4\det M$。因 $(d - a)^2 \in \{0, 1, 4\}$ 且 $4bc \in \{-4, 0, 4\}$，凡 $\Delta = 1$ 必有 $(d - a)^2 = 1$ 与 $bc = 0$，使 $a, d$ 之一为零而 $\det M = ad - bc = 0$（奇异）；因此非退化射影类仅取 $\Delta \in \{-4, -3, 0, 4, 5, 8\}$。

在带符号系数集上，命运谓词按多项式系数 $(c, d - a, -b)$ 显式延拓为：`empty` 指 $(0, 0, 0)$；`dead` 指两条非零常数情形 $(0, 0, \pm 1)$（无有限仿射不动点，仅固定 $[1 : 0]$）；`elliptic` 指 $\Delta < 0$（无实不动点）；其余按平方判别式 $\Delta \in \{0, 4\}$（`collapse`）与正非平方 $\Delta \in \{5, 8\}$（`live`）划分。

记射影阶 $k$ 为最小使 $M^k$ 成为非零标量阵的正整数，并设 $t = a + d$、$D = \det M$，由凯莱—哈密顿方程 $M^2 - t M + D I = 0$ 可直接确定全部椭圆类的射影阶：$\Delta = -4, D = 1$ 迫使 $t = 0$，得 $M^2 = -I$（$2$ 阶）；$\Delta = -4, D = 2$ 迫使 $t = \pm 2$，得 $M^2 = \pm 2M - 2I$ 与 $M^3 = 2M \mp 4I$ 非标量而 $M^4 = -4I$（$4$ 阶）；$\Delta = -3$ 迫使 $D = 1, t = \pm 1$，得 $M^2 = \pm M - I$ 非标量而 $M^3 = \mp I$（$3$ 阶）。

各行非 `live` 射影类计数可直接按判别式推出。当 $\Delta = 0$ 时 $4bc = -(d - a)^2$，其中 $bc = -1$ 迫使 $(d - a)^2 = 4$ 从而 $ad = -1$、$\det M = 0$（奇异），故必有 $bc = 0$ 且规范取 $a = d = 1$，按 $b = c = 0$（`empty`，$1$ 类）、$c = 0, b = \pm 1$（`dead`，$2$ 类）与 $b = 0, c = \pm 1$（`collapse`，$2$ 类）穷尽。

当 $\Delta = 4$ 时，若 $bc = 0$ 则规范取 $a = 1, d = -1$，给出 $c = 0, b \in \{-1, 0, 1\}$（$3$ 类，齐次不动点方程改写为 $Y(-2X - b Y) = 0$，各含一个有限有理不动点与 $[1 : 0]$）及 $b = 0, c = \pm 1$（$2$ 类，各含两个相异有限有理不动点）；若 $bc = 1$ 则 $a = d$ 结合非退化性迫使 $a = d = 0$，再添 $(0, 1, 1, 0)$（$1$ 类，两个相异有限不动点 $\pm 1$），共 $6$ 类。

当 $\Delta < 0$ 时必有 $bc = -1$，其中 $a = d = 0$ 得 $1$ 类，$a = d = 1$ 配 $b = -c = \pm 1$ 得 $2$ 类，而 $(d - a)^2 = 1$ 由非零对角元位置、其符号与 $b = -c = \pm 1$ 的选取共得 $8$ 个矩阵（模整体符号恰为 $4$ 类）。下表汇总全部 $24$ 个非退化射影类（按 `empty`、`dead`、`collapse`、`elliptic`、`live` 依次占 $1, 2, 8, 7, 6$ 类，对应 $2, 4, 16, 14, 12$ 个矩阵）：

| 命运 | $\Delta$ | $\lvert\det\rvert$ | 射影类 | 阶 / 结构 |
| :--- | ---: | ---: | ---: | :--- |
| `empty` | $0$ | $1$ | $1$ | 恒等映射 $x \mapsto x$ |
| `dead` | $0$ | $1$ | $2$ | 平移 $x \mapsto x \pm 1$（仅固定 $[1 : 0]$） |
| `collapse` | $0$ | $1$ | $2$ | 有理重根 $0$（$(1, 0, \pm 1, 1)$） |
| `collapse` | $4$ | $1$ | $6$ | $3$ 类 $c = 0$（一个有限不动点与 $[1 : 0]$），$3$ 类 $c \neq 0$（两个相异有限不动点） |
| `elliptic` | $-4$ | $1$ | $1$ | $2$ 阶（$(0, 1, -1, 0)$，$\mathbb{Q}(i)$） |
| `elliptic` | $-4$ | $2$ | $2$ | $4$ 阶（$(1, \mp 1, \pm 1, 1)$，$\mathbb{Q}(i)$） |
| `elliptic` | $-3$ | $1$ | $4$ | $3$ 阶（如 $(1, -1, 1, 0)$，$\mathbb{Q}(\sqrt{-3})$） |
| `live` | $5$ | $1$ | $4$ | 黄金族 $\mathbb{Q}(\sqrt{5})$（恒满足 $\det = -1$） |
| `live` | $8$ | $2$ | $2$ | 银比族 $\mathbb{Q}(\sqrt{2})$（恒满足 $\det = -2$） |

最关键的结构差异落在两个 `live` 家族之间：要使 $\Delta = (d - a)^2 + 4bc$ 为正非平方数，必有 $bc = 1$ 且 $(d - a)^2 \in \{1, 4\}$，从而仅有 $\Delta = 5$ 与 $\Delta = 8$ 两种可能。当 $\Delta = 5$ 时，$(d - a)^2 = 1$ 迫使 $a, d$ 恰有一者为零，于是 $ad = 0$ 且恒有 $\det M = -1$（四类为 $(1, 1, 1, 0), (0, 1, 1, -1)$ 对应 $x^2 - x - 1 = 0$，以及 $(0, 1, 1, 1), (1, -1, -1, 0)$ 对应 $x^2 + x - 1 = 0$）。

当 $\Delta = 8$ 时，$(d - a)^2 = 4$ 迫使 $\{a, d\} = \{-1, 1\}$，于是 $ad = -1$ 且恒有 $\det M = -2$（两类为 $(1, 1, 1, -1)$ 对应 $x^2 - 2x - 1 = 0$、根 $1 \pm \sqrt{2}$，以及 $(1, -1, -1, -1)$ 对应 $x^2 + 2x - 1 = 0$、根 $-1 \pm \sqrt{2}$，直接呼应第 23 章的银斜率 $s = \sqrt{2} - 1$）。因此，在平衡三元系数集 $\{-1, 0, 1\}^4$ 内附加幺模条件 $\lvert\det M\rvert = 1$ 后，银比族即被完全排除，**$\Delta = 5$ 依然是唯一的双曲实二次自指判别式**。

### 24.3.1.3 二次域 `QPhi`、`QSqrt2` 及整数环 $\mathbb{Z}[\varphi]$、$\mathbb{Z}[\sqrt{2}]$ 的范数与赫尔维茨逼近屏障 {#sec-ch24-3-1-3-hurwitz-norm-barrier}

在 [§32.8.4.2](ch39-s36-lean4-zero-axiom-omega-math-architecture.md#sec-ch39-finite-algebraic-rings-qsqrt2-qphi) 中，零公理二次域 `QPhi` 与 `QSqrt2` 及其整数环 $\mathbb{Z}[\varphi]$ 与 $\mathbb{Z}[\sqrt{2}]$ 提供了纯代数舞台，使我们无需借助无穷连分数极限，即可直接由二次范数推出黄金比与银比两版的逼近屏障，并与一般无理数的赫尔维茨定理（A. Hurwitz，*Ueber die angenäherte Darstellung der Irrationalzahlen durch rationale Brüche*，1891，Satz I–II and pp. 279–282，[10.1007/BF01206656](https://doi.org/10.1007/BF01206656)）以及第 23 章银斜率最佳逼近 [@thm-ch29-silver-best-approximation] 相呼应。

对 $\alpha \in \{\varphi, \sigma, s\}$（其中 $\sigma = 1 + \sqrt{2}$、$s = \sqrt{2} - 1$），记其伽罗瓦共轭为 $\alpha'$、根距为 $L = \alpha - \alpha'$（其中 $\varphi$ 对应 $L = \sqrt{5}$，$\sigma, s$ 同对应 $L = 2\sqrt{2}$），并取整二次范数 $N_\varphi(p, q) = p^2 - pq - q^2$（于 $\mathbb{Q}(\sqrt{5})$）以及 $N_\sigma(p, q) = (p - q)^2 - 2q^2$、$N_s(p, q) = (p + q)^2 - 2q^2$（于 $\mathbb{Q}(\sqrt{2})$）。

对任一非零整对 $(p, q)$，若 $q = 0$，则 $p \neq 0$ 直接给出 $N_\alpha(p, 0) = p^2 \ge 1$。若 $q \neq 0$，对 $4 N_\varphi(p, q) = (2p - q)^2 - 5q^2$，当 $2p = q$ 时化为 $-5q^2 \neq 0$，否则 $(2p - q)^2$ 与 $5q^2$ 均非零且两项的 $5$-进赋值一偶一奇；对 $N_\sigma(p, q) = (p - q)^2 - 2q^2$（当 $p = q$ 时为 $-2q^2 \neq 0$）与 $N_s(p, q) = (p + q)^2 - 2q^2$（当 $p = -q$ 时为 $-2q^2 \neq 0$），其余情形两项的 $2$-进赋值同样一偶一奇，故恒有 $\lvert N_\alpha(p, q)\rvert \ge 1$。

于是对任一有理数 $r = p/q$（$q \ge 1$），展开 $N_\alpha(p, q) = q^2(r - \alpha)(r - \alpha')$ 即得非渐近单侧严格屏障与强常数下的显式分母上界：

$$
\begin{aligned}
q^2 \lvert r - \alpha\rvert \cdot \lvert r - \alpha'\rvert &= \lvert N_\alpha(p, q)\rvert \ge 1, \\
r < \alpha &\implies \lvert r - \alpha\rvert > \frac{1}{L\,q^2}, \\
\bigl(C > L \;\land\; \lvert r - \alpha\rvert < \tfrac{1}{C q^2}\bigr) &\implies q < \frac{1}{\sqrt{C(C - L)}}.
\end{aligned}
$$

两项推论可直接导出：若 $r < \alpha$，当 $\alpha' < r < \alpha$ 时 $0 < r - \alpha' < L$ 直接给出 $q^2\lvert r - \alpha\rvert > 1/L$，而当 $r \le \alpha'$ 时已有 $\lvert r - \alpha\rvert \ge L > \frac{1}{L q^2}$（因 $L^2 \in \{5, 8\}$ 推出 $L^2 > 1$）。若 $C > L$ 且 $q^2\lvert r - \alpha\rvert < 1/C$，则将三角不等式 $\lvert r - \alpha'\rvert \le L + \lvert r - \alpha\rvert < L + \frac{1}{C q^2}$ 乘以 $q^2\lvert r - \alpha\rvert$ 得 $1 < \frac{L}{C} + \frac{1}{C^2 q^2}$，整理即得 $q < \frac{1}{\sqrt{C(C - L)}}$。

这一全称下界与本书所钉 `trureturing` 库中的两条定理相互印证：

- [`golden_hurwitz_bound`](lean:D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound)：证得 $\frac{1}{\sqrt{5}\,\operatorname{den}(q)^2 + \operatorname{den}(q)} < \lvert\varphi - q\rvert$（对一切有理数 $q$）；
- [`golden_fibonacci_approximation_constant_tendsto`](lean:D5/S3/AnalyticClosure/GoldenApproximationConstant.golden_fibonacci_approximation_constant_tendsto)：给出斐波那契渐近分数的精确渐近极限 $\lim_{n\to\infty} F_n^2 \lvert\varphi - F_{n+1}/F_n\rvert = \frac{1}{\sqrt{5}}$。

指定 $C$ 即可在 $\mathbb{Q}$ 上锁定精确例外集。对 $\varphi$（$L = \sqrt{5}$ 四舍五入为 $2.236068$，$1/\sqrt{5}$ 为 $0.447214$），取 $C = \frac{5}{2}$ 时分母上界四舍五入为 $1.231073$，故只须检验分母 $q = 1$ 的整数；由 $5 > \frac{121}{25}$ 与 $5 > \frac{81}{25}$ 知 $2 - \varphi < \frac{2}{5} < \varphi - 1$，从而 **$2/1$ 是 $\mathbb{Q}$ 中的唯一有理例外**。取 $C = 3$ 时，因 $3(3 - \sqrt{5}) > 1$（等价于 $64 > 45$），分母上界为 $0.660560 < 1$，证明 **$\mathbb{Q}$ 中零例外**。

对照 $\sigma$ 与 $s$（$L = 2\sqrt{2}$ 四舍五入为 $2.828427$，$1/(2\sqrt{2})$ 为 $0.353553$），取 $C = 3$ 时分母上界为 $1.393847$，同样只须检验分母 $q = 1$ 的整数；而任一整数距两数至少 $\sqrt{2} - 1 > \frac{1}{3}$（因 $2 > \frac{16}{9}$），故在 $C = 3$ 下已**无任何有理例外**。

为检验临界阈值 $1/(L q^2)$ 的紧致性，考察斐波那契渐近分数 $F_{n+1}/F_n$ 以及由 $Q_n + P_n\sqrt{2} = (1 + \sqrt{2})^n$（$n \ge 1$）定义的佩尔渐近分数 $(Q_n + P_n)/P_n$（对应 $\sigma$）与 $(Q_n - P_n)/P_n$（对应 $s$）。对斐波那契分数，卡西尼恒等式给出 $N_\varphi(F_{n+1}, F_n) = F_{n+1} F_{n-1} - F_n^2 = (-1)^n$；对佩尔分数，将 $Q_n + P_n\sqrt{2} = (1 + \sqrt{2})^n$ 与共轭式 $Q_n - P_n\sqrt{2} = (1 - \sqrt{2})^n$ 相乘得 $Q_n^2 - 2P_n^2 = (-1)^n$，代入 $N_\sigma$ 与 $N_s$ 亦均得 $(-1)^n$。

因任何公约数 $d$ 均满足 $d^2 \mid N_\alpha(p_n, q_n) = (-1)^n$，故三族渐近分数皆为既约分数。斐波那契分母自 $F_1 = F_2 = 1$ 起从 $n = 2$ 开始严格递增（对 $n \ge 2$ 有 $F_{n+1} \ge F_n + 1$）；而将 $Q_n + P_n\sqrt{2}$ 乘以 $1 + \sqrt{2}$ 得递推 $Q_{n+1} = Q_n + 2P_n$ 与 $P_{n+1} = Q_n + P_n$，由初值 $Q_1 = P_1 = 1$ 归纳立得对一切 $n \ge 1$ 均有 $Q_n \ge P_n \ge 1$ 且 $P_{n+1} > P_n$，故三族分母皆趋于无穷。

对一切 $n \ge 1$，由 $F_{n+1}/F_n \ge 1 > \varphi'$ 与 $Q_n \ge P_n$（给出 $(Q_n + P_n)/P_n \ge 2 > \sigma'$ 及 $(Q_n - P_n)/P_n \ge 0 > s'$）知 $r_n > \alpha'$，从而 $r_n - \alpha$ 与 $(-1)^n$ 同号；同时 $\lvert F_{n+1}/F_n - \varphi\rvert < 1/F_n^2$ 与 $\lvert Q_n/P_n - \sqrt{2}\rvert = (\sqrt{2} - 1)^n / P_n$ 给出 $r_n \to \alpha$。于是偶指标渐近分数从上方逼近 $\alpha$ 且误差严格小于 $1/(L q_n^2)$，奇指标渐近分数从下方逼近 $\alpha$ 且误差严格大于 $1/(L q_n^2)$。

配套穷举扫描三个区间各自全部 $19025$ 个满足 $q \le 250$ 的既约分数证实：在 $[1, 2]$ 中误差严格小于临界线的仅有六个偶指标斐波那契渐近分数 $\frac{2}{1}, \frac{5}{3}, \frac{13}{8}, \frac{34}{21}, \frac{89}{55}, \frac{233}{144}$，在 $[2, 3]$（$\frac{5}{2}, \frac{29}{12}, \frac{169}{70}$）与 $[0, 1]$（$\frac{1}{2}, \frac{5}{12}, \frac{29}{70}$）中各有三个偶指标佩尔渐近分数，三组来自下方的突破数皆为 $0$。

对每个 $\alpha \in \{\varphi, \sigma, s\}$，记渐近逼近常数为 $L(\alpha) = \bigl(\liminf_{q \to \infty} q^2 \lvert p/q - \alpha\rvert\bigr)^{-1}$（下极限遍历全体既约分数 $p/q$）。一方面，上述显式分母上界对一切 $C > L$ 仅允有限多个例外，故双侧皆满足 $\liminf_{q \to \infty} q^2 \lvert p/q - \alpha\rvert \ge 1/L$；另一方面，沿上述既约渐近分数 $r_n = p_n/q_n \to \alpha$（$q_n \to \infty$）有 $\lvert r_n - \alpha'\rvert \to L$ 且 $q_n^2 \lvert r_n - \alpha\rvert = 1/\lvert r_n - \alpha'\rvert \to 1/L$，故精确确立 $L(\varphi) = \sqrt{5}$ 与 $L(\sigma) = L(s) = 2\sqrt{2}$。

因 $2\sqrt{2} > \sqrt{5}$，在黄金比与上述银比两版之间，$\varphi$ 的渐近逼近常数严格更小，恰好贴合赫尔维茨普遍阈值 $\sqrt{5}$；对整数平移 $\varphi + 1$，映射 $p/q \mapsto (p + q)/q$ 因 $\gcd(p + q, q) = \gcd(p, q)$ 在全体既约分数上构成双射，同时保持既约分母 $q$ 与残差 $\lvert(p + q)/q - (\varphi + 1)\rvert = \lvert p/q - \varphi\rvert$ 不变，因而 $\varphi + 1$ 共享同一渐近常数 $\sqrt{5}$。

### 24.3.1.4 $T_5(x) \pm 1$ 的双因式分解与正五边形展开度的有理多项式闭环 {#sec-ch24-3-1-4-pentagon-chebyshev-spread}

最后，在不引入 $\pi$ 与三角求值的前提下，[@prop-pentagon-golden-cosines] 背后的纯代数关系完全归结为整系数多项式分解（并与 [§32.8.4.2](ch39-s36-lean4-zero-axiom-omega-math-architecture.md#sec-ch39-finite-algebraic-rings-qsqrt2-qphi) 的 `QPhi` 检验衔接），而将其根识别为五角余弦，只需最后一步结合 $T_5(\cos\theta) = \cos(5\theta)$ 与角区间定位。

在整数多项式环上，按 J. C. Mason & D. C. Handscomb（*Chebyshev Polynomials*，2002，Chapter 2，[10.1201/9781420036114](https://doi.org/10.1201/9781420036114)）的标准切比雪夫递推 $T_0 = 1, T_1 = x, T_{n+1} = 2x T_n - T_{n-1}$ 与 $U_0 = 1, U_1 = 2x, U_{n+1} = 2x U_n - U_{n-1}$，直接算出 $T_5(x) = 16x^5 - 20x^3 + 5x$ 与 $U_4(x) = 16x^4 - 12x^2 + 1$。

在有理三角理论中，展开度及其多项式由 N. J. Wildberger 引入（*A Rational Approach to Trigonometry*，2007，[10.1080/10724117.2007.11974738](https://doi.org/10.1080/10724117.2007.11974738)，[作者稿](https://web.maths.unsw.edu.au/~norman/papers/RationalTrig.pdf)，Sections 3 and 6 给出展开度定义与算例）。

采用 J. Cigler & H.-C. Herbig（*Factorization of spread polynomials*，2026，Sections 1–2，[10.61091/ars166-01](https://doi.org/10.61091/ars166-01)）的一般展开度递推 $S_0(s) = 0, S_1(s) = s, S_{n+1}(s) = 2(1 - 2s)\,S_n(s) - S_{n-1}(s) + 2s$，算得 $S_5(s) = 256s^5 - 640s^4 + 560s^3 - 200s^2 + 25s$。在代换 $s = 1 - x^2$ 下，逐系数展开在 $\mathbb{Z}[x]$ 与 $\mathbb{Z}[s]$ 中直接确立五条精确恒等式：

$$
\begin{aligned}
T_5(x) + 1 &= (x + 1)(4x^2 - 2x - 1)^2, \\
T_5(x) - 1 &= (x - 1)(4x^2 + 2x - 1)^2, \\
U_4(x) &= (4x^2 - 2x - 1)(4x^2 + 2x - 1), \\
1 - T_5(x)^2 &= (1 - x^2)\,U_4(x)^2 = S_5(1 - x^2), \\
S_5(s) &= s(16s^2 - 20s + 5)^2.
\end{aligned}
$$

令 $y = 2x$，两个平方项内的二次因式 $4x^2 - 2x - 1$ 与 $4x^2 + 2x - 1$ 即化为 [@thm-self-application-four-fates] 的两条 `live` 不动点多项式 $y^2 - y - 1$ 与 $y^2 + y - 1$（其平方项则相应化为两者的平方）；两者又由纯代数平移 $(y - 1)^2 + (y - 1) - 1 = y^2 - y - 1$ 严格相连——这正是上文三角等式 $1 + 2\cos\frac{2\pi}{5} = 2\cos\frac{\pi}{5}$ 褪去 $\pi$ 后的纯多项式内核。

由 $T_5(\cos\theta) = \cos(5\theta)$ 同步推出 $S_5(\sin^2\theta) = \sin^2(5\theta)$。据此，五角余弦 $x_1 = \cos\frac{\pi}{5} = \frac{\varphi}{2}$（四舍五入为 $0.809017$）与 $x_2 = \cos\frac{2\pi}{5} = \frac{\varphi - 1}{2}$（$0.309017$）分别由区间 $(\frac{1}{2}, 1)$ 与 $(0, \frac{1}{2})$ 唯一锁定，对应的两个五角展开度恰为 $S_5(s) = 0$ 的非零二重根 $s_1 = 1 - x_1^2 = \frac{3 - \varphi}{4} = \frac{5 - \sqrt{5}}{8}$（$0.345492$）与 $s_2 = 1 - x_2^2 = \frac{2 + \varphi}{4} = \frac{5 + \sqrt{5}}{8}$（$0.904508$）。

它们满足纯有理基本对称不变量 $s_1 + s_2 = \frac{5}{4}$、$s_1 s_2 = \frac{5}{16}$ 与倍角线性关系 $1 - 2s_1 = x_2$、$1 - 2s_2 = -x_1$；由 $(3 - \varphi)(\varphi + 1) = 2 + \varphi$ 立得精确展开度比 $s_2 / s_1 = \varphi + 1 = \varphi^2$（$2.618034$，倒数 $s_1 / s_2 = \varphi^{-2}$ 为 $0.381966$）。

因为二次因式 $16s^2 - 20s + 5$ 的判别式为 $80 = 16 \cdot 5$（在 $\mathbb{Q}$ 中非平方），无需三角求值即证非平凡五角余弦与非平凡五角展开度均不落入 $\mathbb{Q}$，精确受限于二次扩张域 $\mathbb{Q}(\sqrt{5}) = \mathbb{Q}(\varphi)$。

由此可见，五角余弦仍停留在二次代数域内；至于当角本身等于自己的余弦（$\cos\theta^* = \theta^*$）时，这一不动点的超越性文献注记见第 24.4 节 [@rem-banach-dottie-hairy-ball-literature]，其与 $\pi$ 不可公度的推论见第 24.5 节 [@rem-dottie-angle-incommensurable]。

**证据边界与配套档案（`ARGUED` / `NUM`）。** 上述矩阵幂与卡西尼—多卡涅恒等式、误差闭式与倒数共轭分支移位对偶、平衡三元分类计数、幺模唯一性与椭圆阶证明、二次范数屏障与渐近常数比较，以及切比雪夫与五次展开度恒等式，均由本小节书面论证（`ARGUED`）确立。经典背景取自上列文献，而单步残差、交比线性化、统一赫尔维茨下界与斐波那契渐近极限见 §24.3.1.1 与 §24.3.1.3 所引五条 `trureturing` 声明。

配套有限穷举、双工作精度 Arb 区间包络与独立 Lean 辅助校验（不计入本书所钉 `trureturing` 账本的定理计数）均作为 `NUM` 证据由 `loning` 存于 [Issue #1190](https://github.com/the-omega-institute/trureturing-books/issues/1190) 关联的[固化校验档案](https://gist.github.com/loning/855b1541c06856ebc2014216057f1d30/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e)：

- `cycle19_golden_self_reference_check`（[`golden_self_reference_check.lean`](https://gist.githubusercontent.com/loning/855b1541c06856ebc2014216057f1d30/raw/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e/golden_self_reference_check.lean)）：无显式导入的独立 Lean 辅助声明；
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/855b1541c06856ebc2014216057f1d30/raw/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e/SHA256SUMS)：SHA-256 为 `5f112bb611452a3aea5f1da0277e05a9b8f507dbc85376ba4733f0054f6d8302`。
