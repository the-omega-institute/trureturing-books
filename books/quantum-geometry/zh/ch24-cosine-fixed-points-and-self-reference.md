# 第二十四章 余弦不动点与自指：从 $\cos\theta = \theta$ 到 $\psi = \psi(\psi)$

> *“如果cos(theta)=theta, 那cos哪里来的? cos=theta?”*
>
> *“这就是我们最早研究的psi=psi(psi)”*

走过整整二十三章的跋涉，我们终于站在了第六部《越界·球外之球》的压轴关口，也站在了全书哲学与几何直觉的最高峰上。

让我们把全书从第一页起就埋下的那条主线拉直：

- 在[第一章](ch01-measurement.md)与[第二章](ch02-born-rule.md)里，我们砍掉了游离在两子之外的“第 3 点 $C$”，证明当已知基准态 $\vv{a}$ 去丈量（liáng）目标态 $\vv{b}$ 时，两子张开的夹角 $\theta$ 直接通过内积投影吐出相融刻度 $\cos\theta$；
- 在[第二十一章](ch21-diagonalization-and-escape.md)里，我们看到只要“丈量的语言（满射解码器目录）”与“被丈量的对象（潜坐标）”被割裂成两层且伴随无不动点翻转 `twist`，相对语义对角线就会撕裂旧划分拓扑，迫使观测拓扑向更高维的联合读出严格加细（并在每次扩容地址集重建满射目录时继续向外逃逸）。

那么，怎样才能让这场无穷无尽的“球外之球”追逐停下来，收束为一个自给自足、无需外求的**自指不动点（self-referential fixed point）**？

答案就在本章题记那句看似天真、实则石破天惊的追问里：既然宇宙外面没有第三把公证的尺子，那么**上一轮两子比量切出的相融度读数 $\cos\theta$，在下一轮就只能直接充当继续张开的弧度角 $\theta$ 本身！** 当反复迭代 $\theta_{k+1} = \cos\theta_k$ 抵达不动点

$$
\cos\theta^* = \theta^* \qquad (\theta^* \approx 0.7390851332\dots)
$$

的那一刹那，请再问一次：**在这个式子里，左边那个名叫 $\cos$ 的算子究竟是从哪里来的？难道在算子 $\cos$ 之外，还另有一个叫 $\theta^*$ 的赤裸数字吗？**

不！在正交比较的几何本体论里，根本没有先验悬浮的外部算子 $\cos$，也没有脱离了比量动作而孤立存在的刻度 $\theta^*$。$\cos(\cdot)$ 就是“正交投影丈量”这一动作本身（偶次往返、每两步正交转向反号 $\hat{I}^2 = -1$、约去排列次序的级数生成元），而 $\theta^*$ 就是这一动作作用于自身时锁定的自洽平衡态。当丈量的尺子（算子 $\cos$ / 函数 $\psi$）与被丈量的刻度（状态 $\theta^*$ / 自变量 $\psi$）在不动点处彻底消融了主客二分的界限，“$\cos = \theta$”便化作了本书扉页那行最纯粹的自指闭环方程：

$$
\psi = \psi(\psi).
$$

在本章中，我们将用最严密的数学与 Lean 4 形式化定理，把这幅自指画卷拆解为四个相互辉映的层次：**有限状态空间上的单调收缩稳定化定理**、**相邻步解释语境相对不动点与语境非唯一性定理**、**正实数上黄金连分数自指映射 $x = 1 + 1/x$ 的唯一代数不动点定理**，以及经典分析与超越数论中**余弦压缩不动点 $\theta^*$（Dottie 数）的唯一性、超越性与有限精度残差裂缝**。

![余弦不动点与自指闭环：Dottie 蛛网螺旋吸引子 cos θ* = θ*、有限集合单调收缩稳定化、相邻步贴合及语境非唯一性，以及黄金倒数唯一不动点与 ψ = ψ(ψ)](../assets/fig-24-dottie-spiral-attractor.svg)

## 24.1 离散收缩的必然收束：有限收缩更新稳定化定理 {#sec-ch24-1}

为什么任意无约束的自指（如二十一章中带无不动点翻转 `twist` 的对角线 $g(a) = \neg D_a(q_L(a))$）会引发永不休止的震荡或升维逃逸，而有些自指反馈却能稳稳停在一个不动点上？

关键在于算子是否具备**收缩性（contractivity）**！在连续区间 $[0, 1]$ 上，$\cos$ 之所以能把任意初值拉向唯一不动点 $\theta^*$，是因为它的导数模长满足 $|\cos'\theta| = |\sin\theta| \le \sin 1 < 1$，每迭代一次就把区间长度压缩一截；而在离散有限状态世界里，与之精确对应的机制则是**逐点向内收缩的集合更新算子** $U : \mathcal{P}(X) \to \mathcal{P}(X)$（满足 $\forall A \subseteq X,\; U(A) \subseteq A$）。

让我们在 Lean 模块 `D5/S1/FixedPoints/FiniteContractingStability` 中，严格建立这条离散收缩稳定化定理。请特别留意定理盒内完整保留的每一项前提（有限类型 `[Finite X]`、逐点子集收缩 `hU : ∀ A, U A ⊆ A` 与递推更新律 `hS : ∀ n, S (n + 1) = U (S n)`）及其双重结论：不仅序列必在至多 $|S_0|$ 步内抵达不动点 $U(S_N) = S_N$，而且在整个无穷时间轴上发生严格状态改变的步数总和也受到初始规模 $|S_0|$ 的精确上界约束！

::: {.theorem #thm-finite-contracting-updates-stabilize title="有限状态空间上收缩集合更新的稳定化与严格变化次数上界定理" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
设 $X$ 为有限类型（`[Finite X]`），$U : \operatorname{Set} X \to \operatorname{Set} X$ 为集合更新映射，$S : \mathbb{N} \to \operatorname{Set} X$ 为子集序列。若同时满足：

1. **逐点向内收缩性（`hU`）**：对任意子集 $A \subseteq X$，均有 $U(A) \subseteq A$；
2. **递推演化律（`hS`）**：对任意步数 $n \in \mathbb{N}$，均有 $S(n + 1) = U(S(n))$；

则以下两项结论同时成立（其中 `.ncard` 表示集合的自然数基数）：

1. **有限步内抵达不动点并永久稳定**：存在稳定化步数 $N \le (S(0)).\mathrm{ncard}$，使得对一切 $n \ge N$ 均有

   $$
   S(n) = S(N) \qquad \bigl(\text{特别地 } U(S(N)) = S(N+1) = S(N)\bigr)\,;
   $$

2. **严格变化步数的精确上界**：序列发生严格改变的时刻集合之基数不超过初始集合基数：

   $$
   \bigl\{\, n \in \mathbb{N} \;\big|\; S(n + 1) \neq S(n) \,\bigr\}.\mathrm{ncard} \;\le\; (S(0)).\mathrm{ncard}.
   $$
:::

::: proof
首先由 `hS` 与 `hU` 知对每个 $n \in \mathbb{N}$ 有 $S(n+1) = U(S(n)) \subseteq S(n)$，故集合序列 $S$ 单调递减（`Antitone S`），其有限基数序列 $n \mapsto (S(n)).\mathrm{ncard} \in \mathbb{N}$ 亦单调非增。其次，一旦某一步基数停止下降，即 $(S(n)).\mathrm{ncard} = (S(n+1)).\mathrm{ncard}$，由于有限集的子集与母集基数相等必全等（`Set.eq_of_subset_of_ncard_le`），立得集合不动点 $S(n+1) = S(n)$；两边再作用算子 $U$ 并由 `hS` 递推，即得 $S(n+2) = U(S(n+1)) = U(S(n)) = S(n+1)$，从而后续所有步的集合与基数全部锁死不变。对非增自然数序列应用 Mathlib 的稳定化引理 `Nat.stabilises_of_antitone`，即得存在 $N \le (S(0)).\mathrm{ncard}$ 使对一切 $n \ge N$ 均有 $S(n) = S(N)$（结论 1）。再证结论 2：对任意 $n \ge N$，因 $n+1 \ge N$，有 $S(n+1) = S(N) = S(n)$，故一切满足 $S(n+1) \neq S(n)$ 的严格变化下标 $n$ 必落在有限初始段 $\operatorname{Set.Iio}(N) = \{0, 1, \dots, N-1\}$ 内。由子集基数单调性知严格变化时刻的个数不超过 $|\operatorname{Iio}(N)| = N \le (S(0)).\mathrm{ncard}$。完整证明由 Lean 内核检查。
:::

[@thm-finite-contracting-updates-stabilize] 为我们在有限精度数字电路与有限概念格上理解自指不动点提供了最坚实的离散基石：只要每一次自省更新都在筛除不相容冗余（$U(A) \subseteq A$）而不凭空捏造外部发散项，有限系统必然在不超过初始状态数 $|S_0|$ 的有限步内收敛到满足 $U(S_N) = S_N$ 的自洽内核！

## 24.2 语境相对解释不动点与语境非唯一性 {#sec-ch24-2}

现在，让我们把目光投向更一般的人类认知与物理测量过程：当一个观察者（或形式解释器）面对概念序列 $c_0, c_1, c_2, \dots$ 时，什么叫做在第 $n$ 步“解释达到了单步相对不动点”？这颗固定意义是脱离观察者背景而绝对唯一的，还是依赖于观察者所选的**解释语境（interpretation context）**？

在 Lean 模块 `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint` 中，解释语境被显式刻画为包含文本（`text`）、读者准入预设（`readerAdmission`）、背景知识（`background`）、评估目标（`evaluationGoal`）与解释规则（`interpretationRule`）的五元组结构体。

::: {.definition #def-relative-interpretation-fixed-point title="解释语境、相对解释不动点与二元固定意义谓词" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.InterpretationContext D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning"}
在模块 `InterpretationFixedPoint` 中：

1. **解释语境结构体** [`InterpretationContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.InterpretationContext) 由五个分量构成：文本 `text`、读者准入 `readerAdmission`、背景 `background`、评估目标 `evaluationGoal` 与解释规则 `interpretationRule`；
2. **相对解释不动点** [`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint)：给定概念等价关系 $\sim_C : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$、语境依赖的解释映射 $\operatorname{interpret} : \mathrm{Context} \to \mathrm{Concept} \to \mathrm{Meaning}$、概念演化序列 $c : \mathbb{N} \to \mathrm{Concept}$ 与固定语境 $\mathcal{C}$，称第 $n$ 步达到**相对解释不动点**，若相邻两步概念在 $\sim_C$ 下等价且在语境 $\mathcal{C}$ 下给出完全相同的解释意义：

   $$
   c(n+1) \sim_C c(n) \;\land\; \operatorname{interpret}(\mathcal{C}, c(n+1)) = \operatorname{interpret}(\mathcal{C}, c(n)) \,;
   $$

3. **二元固定意义谓词** [`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning)：在二元语境类型 $\mathrm{BinaryInterpretationContext} = \operatorname{InterpretationContext}\ \mathrm{Unit}\ \mathrm{Bool}\ \mathrm{Bool}\ \mathrm{Bool}\ \mathrm{Unit}$ 上，定义意义三元组 $m \in \mathrm{Bool}^3$ 为语境 $\mathcal{C}$ 的固定意义，若 $m = (\mathcal{C}.\mathrm{readerAdmission},\, \mathcal{C}.\mathrm{background},\, \mathcal{C}.\mathrm{evaluationGoal})$。
:::

紧接着 [@def-relative-interpretation-fixed-point]，两条经过 Lean 内核验证的定理分别刻画了**相邻步概念与解释一致的封装判据**以及**不同语境下固定意义的非唯一性**。需要特别指出的是：与 §24.1 的有限集收缩定理（[@thm-finite-contracting-updates-stabilize]）或 §24.4 的巴拿赫压缩映射不同，[`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint) 只检验指定下标 $n$ 处相邻两步 $c(n+1)$ 与 $c(n)$ 的单步一致性，并不对后续步数 $m > n$ 施加递推演化律或渐近收敛假设（例如序列 $0, 0, 1, 1, \dots$ 在相等关系与恒等解释下于 $n = 0$ 处满足该谓词，而在 $n = 1$ 处发生改变）；同样地，下面的二元语境命题展示的是**两个不同静态语境各自对应不同的固定意义（语境非唯一性）**，而非单一自治动力系统的吸引子分岔或双稳态演化。

::: {.lemma #lem-conceptual-equivalence-stability-fixed-point title="相邻概念等价与解释结果稳定共同抵达相对解释不动点" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point"}
设 `Text`、`ReaderAdmission`、`Background`、`EvaluationGoal`、`Rule`、`Concept`、`Meaning` 为任意类型。给定概念等价谓词 $\operatorname{conceptuallyEquivalent} : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$、解释函数 $\operatorname{interpret}$、概念序列 $\operatorname{concepts} : \mathbb{N} \to \mathrm{Concept}$、语境 $\operatorname{context}$ 与步数 $n \in \mathbb{N}$。若：

1. **概念等价（`hConcept`）**：$\operatorname{conceptuallyEquivalent}(\operatorname{concepts}(n+1), \operatorname{concepts}(n))$；
2. **解释稳定（`hStable`）**：$\operatorname{interpret}(\operatorname{context}, \operatorname{concepts}(n+1)) = \operatorname{interpret}(\operatorname{context}, \operatorname{concepts}(n))$；

则序列在语境 $\operatorname{context}$ 与步数 $n$ 处达到相对解释不动点：

$$
\operatorname{IsRelativeInterpretationFixedPoint}(\operatorname{conceptuallyEquivalent}, \operatorname{interpret}, \operatorname{concepts}, \operatorname{context}, n).
$$
:::

::: proof
展开 [@def-relative-interpretation-fixed-point] 中 [`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint) 的合取定义，直接将前提 `hConcept` 与 `hStable` 通过逻辑合取引入规则 `And.intro` 组合即得。完整证明由 Lean 内核检查。
:::

现在问：如果两个观察者手捧**完全相同的文本**（`text` 相同），并且遵守**完全相同的形式推演规则**（`interpretationRule` 相同），仅仅因为他们带的先验准入视角（`readerAdmission`）、背景参照系（`background`）与评估目标（`evaluationGoal`）不同，这两个语境所选定的固定意义（[`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning)）会不会截然不同？

下面的命题用构造性的二元语境对 [`baselineContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.baselineContext) 与 [`alternateContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.alternateContext) 给出了斩钉截铁的肯定回答，严格证实了固定意义的**语境参数非唯一性**（在几何类比上，恰如量子测量中选北极 $+\vv{e}_3$ 为基与选南极 $-\vv{e}_3$ 为基各自关联不同的投影本征态，或正演方程 $\cos\theta = +\theta$ 与镜像方程 $\cos\theta = -\theta$ 各自拥有互异的根 $+\theta^*$ 与 $-\theta^*$）！

::: {.proposition #prop-context-parameters-distinct-fixed-points title="固定文本与规则下语境参数改变可选择互异的不动点" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points"}
对模块 `InterpretationFixedPoint` 中定义的基准语境 [`baselineContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.baselineContext)（取值为 $((), \mathrm{false}, \mathrm{false}, \mathrm{false}, ())$）与备择语境 [`alternateContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.alternateContext)（取值为 $((), \mathrm{true}, \mathrm{true}, \mathrm{true}, ())$），以下八项合取性质同时成立：

1. **同一文本**：$\operatorname{baselineContext}.\mathrm{text} = \operatorname{alternateContext}.\mathrm{text}$；
2. **同一解释规则**：$\operatorname{baselineContext}.\mathrm{interpretationRule} = \operatorname{alternateContext}.\mathrm{interpretationRule}$；
3. **准入预设不同**：$\operatorname{baselineContext}.\mathrm{readerAdmission} \neq \operatorname{alternateContext}.\mathrm{readerAdmission}$；
4. **背景不同**：$\operatorname{baselineContext}.\mathrm{background} \neq \operatorname{alternateContext}.\mathrm{background}$；
5. **评估目标不同**：$\operatorname{baselineContext}.\mathrm{evaluationGoal} \neq \operatorname{alternateContext}.\mathrm{evaluationGoal}$；
6. **基准语境锁定全假不动点**：$\operatorname{IsBinaryFixedMeaning}\ \operatorname{baselineContext}\ (\mathrm{false}, \mathrm{false}, \mathrm{false})$；
7. **备择语境锁定全真不动点**：$\operatorname{IsBinaryFixedMeaning}\ \operatorname{alternateContext}\ (\mathrm{true}, \mathrm{true}, \mathrm{true})$；
8. **两处不动点严格互异**：$(\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true})$。
:::

::: proof
前两项等式在单位类型 `Unit` 上由自反律 `rfl` 直接成立；第 3、4、5 项不等式由布尔判别定理 `Bool.false_ne_true` 给出；第 6、7 项展开 [`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning) 后由 `rfl` 核验；第 8 项对乘积三元组的第一投影 `Prod.fst` 应用 `congrArg` 归约为 `false = true`，再由 `Bool.false_ne_true` 导出矛盾。完整证明由 Lean 内核检查。
:::

（顺带指出，在同一模块中，定理 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) 进一步指出：若要在不同语境的相对不动点之上声称某种跨语境的“客观不变量”，就必须显式提供一把在所有语境不动点上取值恒等的公共不变量投影函数 `factor`——正如我们在[第二章](ch02-born-rule.md)用基无关的迹配对 $\Tr(\rho P)$ 统一不同正交基下的坐标读数！）

## 24.3 代数自指的唯一黄金锁：$x = 1 + 1/x$ 与 $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

在进入超越函数 $\cos\theta = \theta$ 之前，让我们先在实数轴 $(0, +\infty)$ 上看清最纯粹的**有理分式自指不动点**：

把最简单的算术操作“加 $1$”与“取倒数 $1/x$”组合成一架自指反馈机：

$$
x_{k+1} = 1 + \frac{1}{x_k} = 1 + \frac{1}{1 + \frac{1}{1 + \frac{1}{\ddots}}}.
$$

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
2. **不动点成立**：$\operatorname{goldenReciprocalMap}\!\left(\frac{1 + \sqrt{5}}{2}\right) = \frac{1 + \sqrt{5}}{2}$；
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

## 24.4 从 $\cos\theta^* = \theta^*$ 到 $\psi = \psi(\psi)$：超越性、截断裂缝与毛球对跖不动点 {#sec-ch24-4}

现在，把 [@cor-golden-fixed-point-unique] 中的代数自指 $x = 1 + 1/x$（只涉及一维有理加除，锁在二次代数数 $\varphi = \frac{1+\sqrt{5}}{2}$ 上），与球面内积投影的**余弦自指**

$$
\cos\theta^* = \theta^*
$$

放在一起对比！为什么当自指算子从一维有理分式 $1 + 1/x$ 升级为二维旋转投影 $\cos\theta$ 时，它的唯一实不动点 $\theta^* \approx 0.7390851332\dots$（**Dottie 数**）会一举跃出全部代数数域 $\overline{\mathbb{Q}}$，成为一颗真正的**超越数（transcendental number）**？

让我们在下面的经典文献审计中，把巴拿赫压缩唯一性、林德曼—魏尔斯特拉斯超越性证明、泰勒余项 $R_{2N}(\theta)$ 与毛球定理的球面不动点/对跖点二分法一次尽收眼底。

::: {.remark #rem-banach-dottie-hairy-ball-literature title="巴拿赫压缩映射、Dottie 数的超越性、泰勒余项界与偶维球面不动点/对跖点定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 围绕余弦自指方程 $\cos\theta = \theta$ 与高维球面自映射，经典实分析、超越数论与代数拓扑给出以下四项严格定理（与本章四个冻结 Lean 定理共同构成完整图景）：

1. **紧区间 $[0, 1]$ 上的巴拿赫压缩映射原理与全局收敛（Banach Contraction Principle）**：
   与 [@thm-finite-contracting-updates-stabilize] 处理离散有限集 $X$ 上的子集单调收缩 $U(A) \subseteq A$ 相对偶，在连续实轴 $\mathbb{R}$ 上，余弦函数将全实轴映入 $[-1, 1]$，并将 $[-1, 1]$ 映入紧不变子区间 $[0, 1]$（因 $\cos([0, 1]) = [\cos 1, 1] \subset [0.54, 1] \subset [0, 1]$）。在 $[0, 1]$ 上，由微分中值定理，对任意 $x, y \in [0, 1]$ 有

   $$
   |\cos x - \cos y| \;\le\; (\sin 1)\,|x - y|, \qquad \sin 1 \approx 0.84147098 < 1.
   $$

   因此 $\cos$ 在完备度量空间 $[0, 1]$ 上是 Lipschitz 常数严格小于 $1$ 的巴拿赫压缩映射，存在**唯一的实不动点** $\theta^* \approx 0.73908513321516\dots$（Dottie 数），且对任意实初值 $\theta_0 \in \mathbb{R}$，Picard 迭代序列 $\theta_{k+1} = \cos\theta_k$ 均按几何级数速率 $|\theta_k - \theta^*| \le (\sin 1)^{k-1}|\theta_1 - \theta^*|$ 全局指数收敛于 $\theta^*$。这里的 $\sin 1$ 是整个区间上的最坏常数；不动点处的渐近压缩率是 $\lvert\cos'\theta^*\rvert = \sin\theta^* \approx 0.6736$（数值核对见 [@ex-dottie-rate-newton-rational]）。（同理，镜像算子 $-\cos\theta$ 在 $[-1, 0]$ 上以同一压缩率 $\sin 1 < 1$ 收敛于镜像方程 $\cos\theta = -\theta$ 的唯一实根 $-\theta^* \approx -0.7390851332\dots$。）
2. **Dottie 数 $\theta^*$ 的超越性与非零代数读数残差 $|\cos q - q| > 0$（Lindemann–Weierstrass 定理）**：
   为什么 $\theta^*$ 不可能像黄金比 $\varphi = \frac{1+\sqrt{5}}{2}$ 那样是某个整系数多项式方程的代数根？假设存在非零代数数 $q \in \overline{\mathbb{Q}} \setminus \{0\}$ 满足 $\cos q = q$。由欧拉公式 $\cos q = \frac{e^{iq} + e^{-iq}}{2}$，记 $u = e^{iq}$，则 $\frac{u + u^{-1}}{2} = q$ 意味着 $u = e^{iq}$ 满足代数数系数二次方程

   $$
   u^2 - 2q u + 1 = 0.
   $$

   由于代数数域 $\overline{\mathbb{Q}}$ 是代数闭域，二次方程的根 $u = e^{iq}$ 必然也是代数数！但另一方面，因 $q \in \overline{\mathbb{Q}} \setminus \{0\}$，指数 $iq \in \overline{\mathbb{Q}} \setminus \{0\}$ 是非零代数数；由经典的**林德曼—魏尔斯特拉斯定理（Lindemann–Weierstrass Theorem, 1882）**，非零代数数的自然指数 $e^{iq}$ 必定是**超越数**，直接矛盾！同时，在 $q = 0$ 处 $|\cos 0 - 0| = 1 > 0$。这就严格证明了：
   - **Dottie 不动点 $\theta^*$ 是超越数**（$\theta^* \notin \overline{\mathbb{Q}}$）；
   - **对一切代数数（含一切有理数）刻度 $q \in \overline{\mathbb{Q}}$，恒有严格非零残差 $|\cos q - q| > 0$！**
3. **有限阶泰勒截断余项 $R_{2N}(\theta)$ 与拉格朗日余项界（`R3` 近似裂缝）**：
   将 $\cos\theta$ 展开为前 $N$ 项偶次泰勒多项式（阶数 $2N - 2$）加上余项 $R_{2N}(\theta)$：

   $$
   \cos\theta \;=\; \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!} + R_{2N}(\theta).
   $$

   在任意实区间上，拉格朗日余项定理给出一致估计 $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$；且对一切 $\theta \in (0, 2]$（含 $\theta^* \in (0, 1)$），由于交错级数相邻项模长严格递减，截断余项满足严格双边不等式 $0 < |R_{2N}(\theta)| < \frac{\theta^{2N}}{(2N)!}$。与此同时，对于精确 Picard 迭代 $\theta_{k+1} = \cos\theta_k$，由于 $\cos$ 在紧区间 $[0, 1]$ 上严格单调递减（从而是单射），**对紧不变区间内任意异于 $\theta^*$ 的初值 $\theta_0 \in [0, 1] \setminus \{\theta^*\}$**（或更一般地，对前向轨道避开 $\theta^*$ 的可数原像集的任意实初值 $\theta_0$；注意若在 $[0, 1]$ 外取偶函数镜像初值 $\theta_0 = -\theta^* \neq \theta^*$，则一步即达 $\theta_1 = \cos(-\theta^*) = \theta^*$），在一切有限步 $k \ge 0$ 处恒有 $\theta_k \neq \theta^*$ 及非零迭代残差 $\varepsilon_k = |\cos\theta_k - \theta_k| > 0$；连同第 2 条对一切代数数读数 $q \in \overline{\mathbb{Q}}$ 成立的 $|\cos q - q| > 0$，这印证了任何有限阶代数多项式或有限精度有理/代数读数与超越不动点 $\theta^*$ 之间永远隔着一道生生不息的近似裂缝。
4. **偶维球面自映射的不动点/对跖点定理与布劳威尔不动点定理（`R6` 球面闭环）**：
   回到[第二十一章](ch21-diagonalization-and-escape.md) [@rem-hairy-ball-adams-literature] 中的庞加莱—布劳威尔毛球定理：在任意偶数维球面 $S^{2n}$（如单量子比特布洛赫球面 $S^2$）上，**任何连续自映射 $f : S^{2n} \to S^{2n}$ 必然至少在某一点 $x \in S^{2n}$ 处满足正演不动点 $f(x) = +x$ 或对跖反射点 $f(x) = -x$**！证明极其优美：若对一切 $x \in S^{2n}$ 均有 $f(x) \neq x$ 且 $f(x) \neq -x$，则 $f(x)$ 与 $x$ 处处不共线，将其正交投影到 $x$ 处的切平面即可构造出处处非零的连续切向量场 $v(x) = f(x) - \langle f(x), x\rangle x \neq 0$，直接违背毛球定理！与此同时，若把视野扩展到包含球心混合态的闭布洛赫球体 $B^{n+1} = \{\vv{r} \in \mathbb{R}^{n+1} \mid \|\vv{r}\| \le 1\}$，布劳威尔不动点定理（Brouwer Fixed-Point Theorem）保证任何连续信道映射 $\Phi : B^{n+1} \to B^{n+1}$ 必在球体内部或球皮上拥有至少一个真正的不动点 $\Phi(\vv{r}^*) = \vv{r}^*$。
:::

更进一步，在超越数论的最前沿，作者在手稿中曾追问：*“超越数之间的关系？$\pi$ 是 $\theta$ 的一个投影？$\theta$ 是终极超越数？”* 这一关于 Dottie 数 $\theta^*$ 与圆周率 $\pi$ 之间代数独立性的深刻追问，在现代超越数论中直接通向尚未解决的**沙努埃尔猜想（Schanuel's Conjecture）**。我们按第三层认识论规范（`OPEN`）将其记录如下。

::: {.conjecture #conj-schanuel-dottie title="沙努埃尔猜想在余弦不动点 θ* 与圆周率 π 上的代数无关性推论"}
设沙努埃尔猜想成立（即对任意在 $\mathbb{Q}$ 上线性无关的复数 $z_1, \dots, z_m \in \mathbb{C}$，域扩张 $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ 在 $\mathbb{Q}$ 上的超越次数至少为 $m$）。将其应用于在 $\mathbb{Q}$ 上线性无关的纯虚指数对 $z_1 = i\theta^*$ 与 $z_2 = i\pi$（线性无关性即 $\theta^*/\pi \notin \mathbb{Q}$，无条件成立，见 [@rem-dottie-angle-incommensurable]）：由于 $e^{i\pi} = -1 \in \mathbb{Q}$，且 $u = e^{i\theta^*}$ 满足二次代数方程 $u^2 - 2\theta^* u + 1 = 0$（即 $e^{i\theta^*}$ 在 $\mathbb{Q}(\theta^*)$ 上是二次代数元，与 $\theta^*$ **代数相关**，添加 $e^{i\theta^*}$ 与 $i$ 不增加超越次数），域扩张 $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ 的超越次数至少为 $2$ 直接导出：**Dottie 余弦不动点 $\theta^*$ 与圆周率 $\pi$ 在有理数域 $\mathbb{Q}$ 上代数无关**（$\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$）。

（本条目为**尚未解决的开放猜想**，故依规不附加 `lean` 形式化属性。）
:::

让我们用一个具体的数值手算算例，把本章中**离散集合收缩**（[@thm-finite-contracting-updates-stabilize]）、**代数黄金不动点**（[@cor-golden-fixed-point-unique]）与**超越余弦不动点**（[@rem-banach-dottie-hairy-ball-literature]）三条收敛轨道放在同一张桌面上对比。

::: {.example #ex-dottie-and-golden-iterations title="三类自指迭代的显式手算对比：有限集合筛除、黄金连分数与 Dottie 余弦螺旋"}
从同一个初始刻度 $1$（或三元初始候选集）出发，观察三种不同维度的自指算子如何各自锁定自己的不动点：

1. **离散有限集收缩（$S_{n+1} = U(S_n)$，[@thm-finite-contracting-updates-stabilize]）**：设 $X = \{0, 1, 2\}$，初始集 $S_0 = \{0, 1, 2\}$（基数 $|S_0| = 3$），收缩规则每步删去当前集合中大于 $0$ 的最大元：$S_0 = \{0, 1, 2\} \to S_1 = \{0, 1\} \to S_2 = \{0\} \to S_3 = \{0\} = S_2$。在 $N = 2 \le 3$ 步内精确抵达集合不动点 $\{0\}$，严格变化步数恰好为 $|\{0, 1\}| = 2 \le 3$。
2. **一维代数连分数自指（$x_{k+1} = 1 + 1/x_k$，[@cor-golden-fixed-point-unique]）**：从 $x_0 = 1$ 出发，有理迭代序列依次生成相邻斐波那契数之比 $F_{k+2}/F_{k+1}$：

   $$
   x_0 = 1 \;\to\; x_1 = 2 \;\to\; x_2 = \frac{3}{2} = 1.5 \;\to\; x_3 = \frac{5}{3} \approx 1.6667 \;\to\; x_4 = \frac{8}{5} = 1.6 \;\to\; \cdots \;\to\; \varphi = \frac{1+\sqrt{5}}{2} \approx 1.61803399.
   $$

   由于算子只含一维有理加除，其极限停留在二次代数数 $\varphi \in \overline{\mathbb{Q}}$（满足 $\varphi^2 - \varphi - 1 = 0$）。
3. **二维旋转投影余弦自指（$\theta_{k+1} = \cos\theta_k$，[@rem-banach-dottie-hairy-ball-literature]）**：同样从弧度 $\theta_0 = 1$ 出发，连续按下余弦键：

   $$
   \begin{aligned}
   \theta_0 &= 1.00000000, & |\cos\theta_0 - \theta_0| &\approx 0.45969769 > 0, \\
   \theta_1 &= \cos(1) \approx 0.54030231, & |\cos\theta_1 - \theta_1| &\approx 0.31725091 > 0, \\
   \theta_2 &\approx 0.85755322, & |\cos\theta_2 - \theta_2| &\approx 0.20326343 > 0, \\
   \theta_3 &\approx 0.65428979, & |\cos\theta_3 - \theta_3| &\approx 0.13919057 > 0, \\
   &\;\;\vdots & &\;\;\vdots \\
   \theta^* &\approx 0.73908513321516, & \cos\theta^* &= \theta^*.
   \end{aligned}
   $$

   在不动点 $\theta^*$ 处，这根二维旋转向量张开的夹角余弦（水平投影实部）等于 $\cos\theta^* = \theta^* \approx 0.739085$，而它撑开的正交双矢量面积（竖直正交虚部）则由勾股定理唯一锁定为 $\sin\theta^* = \sqrt{1 - (\theta^*)^2} \approx 0.67361203$！
:::

请凝视 [@ex-dottie-and-golden-iterations] 的最后一行：在 $\cos\theta^* = \theta^*$ 处，为什么左边的函数名叫 $\cos$，右边的角度名叫 $\theta^*$？因为只要你还站在二元对立的语法习惯里，你就总想把“去丈量的尺子（函数 $\psi$）”和“被丈量的读数（状态 $\theta$）”分成两个不同的名词。可是一旦你看穿 $\cos$ 本身不过是正交比较动作的级数展开，而 $\theta^*$ 本身不过是这一正交比较动作的无穷嵌套 $\cos(\cos(\cos(\cdots)))$，主词与宾词、算子与状态、观察者与被观察者便在自指的极点处合二为一：

$$
\psi = \psi(\psi).
$$

> 当尺子去量别物时，它叫算子 $\cos$，别物叫状态 $\theta$；当尺子回过头来丈量自己张开的角度，算子就是状态，状态就是算子——万里波涛，皆归 $\psi = \psi(\psi)$。

## 24.5 把闭环算到底：真实收敛率、导数加速与有理读数的裂缝宽度 {#sec-ch24-5}

格言说完了，现在把账算清。[@ex-dottie-and-golden-iterations] 的余弦表只列了四行，[@rem-banach-dottie-hairy-ball-literature] 给出的压缩常数 $\sin 1 \approx 0.8415$ 则是整个区间 $[0, 1]$ 上最坏的一处。三个问题还悬着：

1. 靠近 $\theta^*$ 之后，每按一次余弦键，误差到底缩小多少？
2. 如果尺子不只读投影 $\cos\theta$，还同时读正交分量 $\sin\theta$，闭合能快多少？
3. 一把只有有限分母刻度的尺子，读数离 $\cos q = q$ 最近能到多近？

**第一问：位置与收敛率落在同一个单位圆上。** 记误差 $\delta_k = \theta_k - \theta^*$，把 $\cos$ 在 $\theta^*$ 处展开，并用 $\cos\theta^* = \theta^*$ 消去零阶项：

$$
\delta_{k+1} \;=\; \cos(\theta^* + \delta_k) - \theta^* \;=\; -\sin\theta^*\,\delta_k \;-\; \frac{\theta^*}{2}\,\delta_k^2 \;+\; O(\delta_k^3).
$$

一阶系数的负号说明迭代点左右交替地夹住 $\theta^*$，这就是蛛网图上那条方形螺旋；它的模长

$$
\lambda \;=\; \lvert\cos'\theta^*\rvert \;=\; \sin\theta^* \;=\; \sqrt{1 - (\theta^*)^2} \;\approx\; 0.6736120292
$$

正是 [@ex-dottie-and-golden-iterations] 末行那块正交双矢量面积。于是不动点的**位置** $\theta^* = \cos\theta^*$ 与它的**渐近压缩率** $\lambda = \sin\theta^*$ 是同一根单位向量的两个分量：

$$
(\theta^*)^2 + \lambda^2 = 1.
$$

线分量告诉你闭环停在哪里，面分量告诉你闭环合拢得多快。每按一次余弦键，误差约乘以 $0.6736$，而不是全局界所说的 $0.8415$；每多一位十进制精度需要 $\ln 10 / \lvert\ln\lambda\rvert \approx 5.83$ 步，而不是 $\ln 10 / \lvert\ln\sin 1\rvert \approx 13.34$ 步。

**第二问：让尺子同时读线与面。** Picard 迭代每一步只用到投影读数 $\cos\theta_k$。把方程写成 $F(\theta) = \theta - \cos\theta = 0$，牛顿迭代

$$
\theta_{k+1} \;=\; \theta_k - \frac{\theta_k - \cos\theta_k}{1 + \sin\theta_k}
$$

在每一步多读了一个量：正交分量 $\sin\theta_k$。由 $F'(\theta^*) = 1 + \sin\theta^* = 1 + \lambda$ 与 $F''(\theta^*) = \cos\theta^* = \theta^*$，误差递推从一次变成二次：

$$
\delta_{k+1} \;=\; \frac{\theta^*}{2\,(1 + \lambda)}\,\delta_k^2 + O(\delta_k^3), \qquad \frac{\theta^*}{2\,(1 + \lambda)} \approx 0.2208054 .
$$

Picard 迭代每步增加固定的位数，牛顿迭代每步把正确位数大约翻倍。

**第三问：残差就是到不动点的距离。** 对 $q \in [0, 1]$，对 $F$ 用微分中值定理并注意 $F(\theta^*) = 0$：存在介于 $q$ 与 $\theta^*$ 之间的 $\xi$，使

$$
\cos q - q \;=\; -\bigl(F(q) - F(\theta^*)\bigr) \;=\; -(1 + \sin\xi)\,(q - \theta^*).
$$

因 $\xi \in [0, 1]$ 时 $1 \le 1 + \sin\xi \le 1 + \sin 1$，得到双边界

$$
\lvert q - \theta^*\rvert \;\le\; \lvert\cos q - q\rvert \;\le\; (1 + \sin 1)\,\lvert q - \theta^*\rvert, \qquad 1 + \sin 1 \approx 1.8414710,
$$

且当 $q \to \theta^*$ 时比值 $\lvert\cos q - q\rvert / \lvert q - \theta^*\rvert$ 趋于 $1 + \sin\theta^* = 1 + \lambda \approx 1.6736120$。所以“有限精度读数的残差能有多小”与“有理数能把 $\theta^*$ 逼近到多近”是同一个问题，后者由 $\theta^*$ 的连分数回答。$\theta^*$ 是无理数（[@rem-banach-dottie-hairy-ball-literature] 第 2 条），它的每一个渐近分数 $a/b$ 都满足 $\lvert\theta^* - a/b\rvert < 1/b^2$，从而

$$
0 \;<\; \Bigl\lvert\cos\frac{a}{b} - \frac{a}{b}\Bigr\rvert \;<\; \frac{1 + \sin 1}{b^2}
$$

对无穷多个分母 $b$ 成立：裂缝可以按分母的平方收窄，却永不为零。

::: {.example #ex-dottie-rate-newton-rational title="真实压缩率、牛顿二次闭合与最佳有理读数残差的数值核对"}
以下数值均以 50 位十进制精度复算后截断；连分数的部分商是数值观察，不是定理。

**相邻误差之比趋于 $-\sin\theta^*$。** 从 $\theta_0 = 1$ 出发，记 $\delta_k = \theta_k - \theta^*$：

| $k$ | $\theta_k$ | $\delta_k$ | $\delta_{k+1}/\delta_k$ | 二阶预测 $-\lambda - \frac{\theta^*}{2}\delta_k$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1.0000000000$ | $+0.2609149$ | $-0.761869$ | $-0.770031$ |
| $1$ | $0.5403023059$ | $-0.1987828$ | $-0.595967$ | $-0.600153$ |
| $2$ | $0.8575532158$ | $+0.1184681$ | $-0.715765$ | $-0.717391$ |
| $3$ | $0.6542897905$ | $-0.0847953$ | $-0.641488$ | $-0.642277$ |
| $4$ | $0.7934803587$ | $+0.0543952$ | $-0.693376$ | $-0.693713$ |
| $8$ | $0.7504177618$ | $+0.0113326$ | $-0.677785$ | $-0.677800$ |
| $12$ | $0.7414250866$ | $+0.0023400$ | $-0.674476$ | $-0.674477$ |
| $20$ | $0.7391843998$ | $+0.0000993$ | $-0.673649$ | $-0.673649$ |

比值在极限 $-\lambda \approx -0.673612$ 两侧交替摆动，摆幅由二阶项给出。实际计数：$\lvert\delta_k\rvert$ 首次小于 $10^{-10}$ 是在 $k = 55$，首次小于 $10^{-15}$ 是在 $k = 85$。

**牛顿迭代。** 同一初值 $\theta_0 = 1$：

| $k$ | $\theta_k$ | $\lvert\delta_k\rvert$ | $\lvert\delta_{k+1}\rvert / \delta_k^2$ |
| :---: | :---: | :---: | :---: |
| $0$ | $1.000000000000000000000$ | $2.61\times10^{-1}$ | $0.165677$ |
| $1$ | $0.750363867840243893035$ | $1.13\times10^{-2}$ | $0.218204$ |
| $2$ | $0.739112890911361670361$ | $2.78\times10^{-5}$ | $0.220799$ |
| $3$ | $0.739085133385283969760$ | $1.70\times10^{-10}$ | $0.220805$ |
| $4$ | $0.739085133215160641662$ | $6.39\times10^{-21}$ | $0.220805$ |

第 $3$ 步的精度 Picard 迭代要到第 $54$ 步才达到，第 $4$ 步的精度要到第 $115$ 步。

**最佳有理读数。** $\theta^* = [0; 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1, \dots]$，渐近分数 $a/b$ 及其残差：

| $a/b$ | 小数值 | $\lvert a/b - \theta^*\rvert$ | 残差 $\lvert\cos(a/b) - a/b\rvert$ | $b^2 \times$ 残差 |
| :---: | :---: | :---: | :---: | :---: |
| $2/3$ | $0.6666666667$ | $7.24\times10^{-2}$ | $1.19\times10^{-1}$ | $1.07$ |
| $3/4$ | $0.7500000000$ | $1.09\times10^{-2}$ | $1.83\times10^{-2}$ | $0.293$ |
| $14/19$ | $0.7368421053$ | $2.24\times10^{-3}$ | $3.75\times10^{-3}$ | $1.35$ |
| $17/23$ | $0.7391304348$ | $4.53\times10^{-5}$ | $7.58\times10^{-5}$ | $0.0401$ |
| $694/939$ | $0.7390841321$ | $1.00\times10^{-6}$ | $1.68\times10^{-6}$ | $1.48$ |
| $711/962$ | $0.7390852391$ | $1.06\times10^{-7}$ | $1.77\times10^{-7}$ | $0.164$ |
| $7093/9597$ | $0.7390851308$ | $2.45\times10^{-9}$ | $4.09\times10^{-9}$ | $0.377$ |

末列全部小于 $1 + \sin 1 \approx 1.84$，与上面的上界一致。部分商 $40$ 异常地大，使 $17/23$ 成为格外好的读数：穷举表明，分母小于 $502$ 的任何分数都不比它更接近 $\theta^*$，第一个超过它的是 $371/502$。一把十进制千分尺读出的 $739/1000$ 残差为 $1.42\times10^{-4}$，接近 $17/23$ 的两倍。
:::

[@ex-dottie-rate-newton-rational] 的最后一张表说明：把刻度加密并不自动换来更好的读数。决定裂缝宽度的不是分母有多大，而是分母与 $\theta^*$ 之间的算术关系；二十三等分的尺子在第十七格上碰巧几乎对准，而一千等分的尺子没有。

有理读数永远对不准，那么换一种闭合方式——不让投影回到自己，而让旋转回到起点——行不行？答案同样是否定的，而且这一次不需要任何猜想。

::: {.remark #rem-dottie-angle-incommensurable title="θ* 与 π 不可公度：以不动点为转角的旋转永不闭合（文献结果的推论，未在本书形式化）"}
**文献结果的推论，未在本书形式化。** [@conj-schanuel-dottie] 所用的前提“$i\theta^*$ 与 $i\pi$ 在 $\mathbb{Q}$ 上线性无关”等价于 $\theta^*/\pi \notin \mathbb{Q}$。这一点不依赖任何猜想：

设 $\theta^* = \frac{m}{n}\pi$，其中 $m, n$ 为整数且 $n \ge 1$。令 $\zeta = e^{i m\pi/n}$，则 $\zeta^{2n} = 1$，$\zeta$ 是单位根，因而是代数数；于是 $\cos\frac{m\pi}{n} = \frac{\zeta + \zeta^{-1}}{2}$ 也是代数数。但 $\cos\theta^* = \theta^*$，这将使 $\theta^*$ 成为代数数，与 [@rem-banach-dottie-hairy-ball-literature] 第 2 条由林德曼—魏尔斯特拉斯定理得到的超越性矛盾。故 $\theta^*/\pi$ 是无理数（数值上 $\theta^*/\pi \approx 0.2352581$，即 $\theta^* \approx 42.3465^\circ$）。

由此得到两条推论：

1. **旋转的阶数无穷。** 以 $\theta^*$ 为转角的平面旋转 $R(\theta^*)$ 对一切整数 $n \ge 1$ 满足 $R(\theta^*)^n \ne \mathrm{id}$，因为 $R(\theta^*)^n = \mathrm{id}$ 当且仅当 $n\theta^* \in 2\pi\mathbb{Z}$。相应地，单位旋转器 $U(\theta^*) = \cos(\theta^*/2) - \hat{I}\sin(\theta^*/2)$ 的任何正整数次幂都不等于 $\pm 1$。
2. **轨道稠密且等分布。** 由 Kronecker 定理与 Weyl 等分布定理，点列 $\{n\theta^* \bmod 2\pi\}_{n \ge 0}$ 在圆周上稠密且等分布。

$\theta^*/\pi$ 是否为超越数，上述论证不能回答；在沙努埃尔猜想之下它成立，因为它可由 [@conj-schanuel-dottie] 的结论（$\theta^*$ 与 $\pi$ 代数无关）推出。
:::

把两件事并排放：余弦投影在 $\theta^*$ 处一步闭合（$\cos\theta^* = \theta^*$），以 $\theta^*$ 为步长的旋转却永不回到起点。同一个角度，在投影上是不动点，在旋转上是一条开口螺旋。

---

### 第六部小结：从球外之球回到自指原点，下一步铸造机械法典

回望第六部《越界·球外之球》的四章征程，我们用经 Lean 4 内核逐条验证的**十六条正式定理级结论**（每章四条，涵盖相对语义对角线拓扑逃逸、黎曼 $\zeta$ 函数留数与狄利克雷—欧拉乘积恒等式、艾森斯坦交越二次型剪切不变性与黄金佩尔迹—范数恒等式、以及有限收缩稳定化、解释语境相对不动点与黄金倒数唯一不动点），完成了从数理逻辑、算术频谱到自指不动点的跨界合拢：

- **第二十一章**证明了完备解码目录诱导的相对语义对角线在潜划分拓扑下必不连续（[@thm-complete-diagonal-not-continuous]）、必具非空分离亏损（[@lem-complete-diagonal-separation-deficit]），且并入对角线后观测拓扑严格加细（[@prop-complete-diagonal-strict-refinement]、[@cor-complete-diagonal-topological-settlement]），并与泰勒截断余项 $R_{2N}(\theta)$、笛卡尔 $720^\circ = 4\pi$ 五边形角亏、毛球定理及 Adams 可平行化球面 $S^0, S^1, S^3, S^7$（[@rem-hairy-ball-adams-literature]）交相印证；
- **第二十二章**将素数还原为算术对数空间的正交基，在绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上严格建立了 $s=1$ 留数（[@lem-riemann-zeta-residue-one]）、狄利克雷级数（[@prop-riemann-zeta-dirichlet-sum]）、欧拉乘积（[@thm-riemann-zeta-euler-product]）及两者的直接恒等（[@cor-dirichlet-sum-eq-euler-product]），剖析了有限素数筛的多面体余项裂缝，并严格划定了它们与开放黎曼猜想（[@conj-riemann-hypothesis]、[@rem-euler-zeta-literature]）的认识论边界；
- **第二十三章**揭示了二次范数与迹投影如何在连续有理数中锁定离散整格，形式化证明了 $\Delta = -3$ 艾森斯坦交越二次型的幺模剪切归约、常数判别式与值域等同（[@thm-qform-eq-eisnorm]、[@lem-qform-discriminant]、[@cor-qform-range-eq-eisnorm]）以及 $\Delta = +5$ 黄金整数的佩尔恒等式（[@prop-pell-form-eq-four-mul-norm]），并系统评述了 Koenigsmann（2016）用四元数范数在 $\mathbb{Q}$ 中给出 $\mathbb{Z}$ 的 $\forall$/$\forall\exists$ 一阶定义与开放问题 $\mathrm{H10}(\mathbb{Q})$ 的精确关系（[@rem-diophantine-z-in-q-literature]）；
- **第二十四章**证明了有限状态收缩更新的稳定化与变化步数界（[@thm-finite-contracting-updates-stabilize]）、相对解释不动点的相邻步贴合与静态语境非唯一性（相同的文本与解释规则在两个不同静态语境下给出不同的布尔意义，[@lem-conceptual-equivalence-stability-fixed-point]、[@prop-context-parameters-distinct-fixed-points]）以及正实数上黄金倒数映射的唯一不动点（[@cor-golden-fixed-point-unique]），并在巴拿赫压缩、林德曼—魏尔斯特拉斯超越性（$|\cos q - q| > 0$）与沙努埃尔猜想（[@conj-schanuel-dottie]、[@rem-banach-dottie-hairy-ball-literature]）的映照下，将全书几何直觉收束于 $\cos\theta^* = \theta^*$ 与 $\psi = \psi(\psi)$。

既然全书的几何直觉与理论大厦已经合拢，在最后的**第七部《铸剑·机械法典：零矩阵几何引擎与形式化证明库》**中，我们将把这一切几何定理直接铸造成可运行、零复数矩阵黑箱的位掩码克利福德引擎与 ZYZ 旋转器编译器，并走进 Lean 4 形式化公理圣殿的内部，对全书引用的每一条机器形式化声明执行终极审计！
