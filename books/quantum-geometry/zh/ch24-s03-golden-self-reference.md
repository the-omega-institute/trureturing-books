# 24.3 代数自指的唯一黄金锁：$x = 1 + 1/x$ 与 $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

在进入余弦自指方程 $\cos\theta = \theta$（§24.4）之前，让我们先在实数轴 $(0, +\infty)$ 上看清最纯粹的**有理分式自指不动点**：

把最简单的算术操作“加 $1$”与“取倒数 $1/x$”组合成一架自指反馈机：

$$
x_{k+1} = 1 + \frac{1}{x_k}, \qquad x_0>0.
$$

有限步展开只包含有限层分式，底部仍是初值 $x_0$。无穷连分数 $1+1/(1+1/(\cdots))$ 则表示这些有限截断的极限，须另证收敛；不能把它等同于每个有限的 $x_{k+1}$。下文算例给出收敛的直接依据。

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

黄金自指是正五边形里的一条长度关系：单位边长的正五边形，对角线长为 $2\cos\frac{\pi}{5} = \varphi$。于是 $\varphi$ 也是余弦读数，读在 $\frac{\pi}{5}$ 处并落在二次代数数域 $\mathbb{Q}(\sqrt{5})$ 内；至于当角本身等于自己的余弦（$\cos\theta^* = \theta^*$）时，其算术性质与是否与 $\pi$ 可公度，将在下一节的文献注记 [@rem-banach-dottie-hairy-ball-literature] 与 [@rem-dottie-angle-incommensurable] 中给出。
