# 24.2 语境相对解释不动点与语境非唯一性 {#sec-ch24-2}

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

::: {.figure src="ch24-two-contexts"}
**同一文本、同一规则，只换三格，固定意义就换了。** 两列是 `baselineContext` 与 `alternateContext` 的五个字段：文本与解释规则都是 $()$，虚线连着表示相同；中间三格左列全是 F、右列全是 T。箭头下方是各自的固定意义 $(\mathrm{F}, \mathrm{F}, \mathrm{F}) \neq (\mathrm{T}, \mathrm{T}, \mathrm{T})$（[@prop-context-parameters-distinct-fixed-points]）。
:::

（顺带指出，在同一模块中，定理 [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) 进一步指出：若要在不同语境的相对不动点之上声称某种跨语境的“客观不变量”，就必须显式提供一把在所有语境不动点上取值恒等的公共不变量投影函数 `factor`——正如我们在[第二章](ch02-born-rule.md)用基无关的迹配对 $\Tr(\rho P)$ 统一不同正交基下的坐标读数！）
