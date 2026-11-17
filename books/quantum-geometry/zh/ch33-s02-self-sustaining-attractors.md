# 33.2 观察者本身即吸引子：自维持收缩势阱 {#观察者本身即吸引子自维持收缩势阱}

认出“万物皆为观察者”之后，紧接着浮现出第二个更尖锐的动力学问题：**为什么观察者不只是被动挨撞的底片，而必然“本身就是一座吸引子”？**

不妨做一个最朴素的物理思想实验。任何身处宇宙内部的有限观察者，每一秒都在遭受海量热涨落、杂散辐射与环境擦除的随机冲刷（热力学擦除下界见[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness] 第 1 款）。假如一位观察者的内部状态演化在相空间里是**中性漂移**甚或**向外发散**的——就像把一颗弹珠放在平坦桌面或倒扣碗底上——那么只需几次微小的正交扰动，它的窗口相位就会像醉汉游走一样漂离初态，“昨天的我”与“今天的我”将彻底失去内积重叠，瞬间融化在热平衡的背景白噪声里。

因此，任何能够在时间风浪里连续维持“我依然是我”的存在——无论是一颗在高温振动中保持晶格对称的金刚石，还是一个在十年新陈代谢更新了身体诸多组成后依然认得童年故乡的生命体——**其存在本身就等价于在状态空间中挖出了一座围绕接受窗向内聚拢的“自维持收缩势阱”（`MODEL`）**！在这一模型里，我们以算子自指回路 $\psi_i = \psi_i(\psi_i)$ 描画外部微扰后的向内恢复与局部稳定；下方 [@thm-ch33-contextual-attractor-and-common-factor] 第 1 款刻画有限集合删减的稳定化，实轴余弦模型则另见 [@ex-ch33-mutual-cosine-monotonic-lock]。

::: {.figure src="ch33-contracting-well"}
**只有收缩的势阱能把受扰的观察者拉回原处。** 三条剖面上，琥珀色的是小球现在的位置，灰色空心圈是之前的位置：平坦的桌面上，一串扰动让它漂离起点；倒扣的碗上，它每一步离顶点更远；势阱里，被踢上右坡的小球每一步离碗底的距离缩到原来的 $0.45$ 倍，落向碗底青色的接受窗 $W + u_i$。这是示意模型（`MODEL`），不是 [@thm-ch33-contextual-attractor-and-common-factor] 的内容。
:::

在 `trureturing` 的不动点稳定性与概念诠释动力学模块中，四条内核定理为这一图景提供各有边界的结构骨架：固定更新算子在有限集合上只删不增，故有限步稳定；相邻概念的关系与读出相等封装为语境相对不动点谓词；二值语境实例见证固定意义可以相异；客观主张则按定义携带不变公因子的证明。后三款都是定义展开；这四款并未给出受扰物理系统的恢复动力学，势阱与收敛仍由上面的 `MODEL` 承担：

::: {.theorem #thm-ch33-contextual-attractor-and-common-factor title="有限单调收缩稳定化、语境相对不动点分岔与客观主张的不变公因子定理" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
在 `trureturing` 冻结的有限不动点稳定性与概念诠释不动点模块中，以下四项定理同时成立：

1. **有限载体单调收缩更新的有限步稳定与跳变上界**（[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)）：设 $X$ 为有限类型（`[Finite X]`），子集更新算子 $U : \operatorname{Set} X \to \operatorname{Set} X$ 满足向内收缩条件 $\forall A : \operatorname{Set} X,\; U(A) \subseteq A$，状态序列 $S : \mathbb{N} \to \operatorname{Set} X$ 满足递推律 $\forall n \in \mathbb{N},\; S(n + 1) = U(S(n))$。则序列必在不超出初始集合基数的步数内永久抵达不动点，且严格改变的总次数亦受初始基数约束：

   $$
   \bigl(\exists N \le (S(0)).\operatorname{ncard},\; \forall n \ge N,\; S(n) = S(N)\bigr) \;\land\; \{n \in \mathbb{N} \mid S(n + 1) \neq S(n)\}.\operatorname{ncard} \le (S(0)).\operatorname{ncard};
   $$

2. **相邻概念等价与诠释稳定抵达语境相对不动点**（[`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point)）：对任意类型 `Text`、`ReaderAdmission`、`Background`、`EvaluationGoal`、`Rule`、`Concept`、`Meaning`，关系 $\mathrm{conceptuallyEquivalent} : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$，求值映射 $\mathrm{interpret} : \operatorname{InterpretationContext}\;\mathrm{Text}\;\mathrm{ReaderAdmission}\;\mathrm{Background}\;\mathrm{EvaluationGoal}\;\mathrm{Rule} \to \mathrm{Concept} \to \mathrm{Meaning}$，演化序列 $\mathrm{concepts} : \mathbb{N} \to \mathrm{Concept}$，固定语境 $\mathrm{context}$ 与步数 $n \in \mathbb{N}$，只要满足相邻概念等价 $\mathrm{conceptuallyEquivalent}(\mathrm{concepts}(n+1), \mathrm{concepts}(n))$ 与语境读出稳定 $\mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n+1)) = \mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n))$，即成立相对诠释不动点谓词 `IsRelativeInterpretationFixedPoint conceptuallyEquivalent interpret concepts context n`；
3. **固定文本与规则下观察者语境参数选择相异不动点**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)）：在二值有限语境族 `BinaryInterpretationContext = InterpretationContext Unit Bool Bool Bool Unit` 上，`baselineContext`（准入、背景、目标均为 `false`）与 `alternateContext`（准入、背景、目标均为 `true`）保持相同的输入文本 `text = ()` 与相同的诠释规则 `interpretationRule = ()`，但三项观察者语境参数两两相异，并在固定意义谓词 `IsBinaryFixedMeaning` 下严格锁定互不相等的不动点：

   $$
   \begin{aligned}
   &\operatorname{IsBinaryFixedMeaning}\;\mathrm{baselineContext}\;(\mathrm{false}, \mathrm{false}, \mathrm{false}) \\
    &\;\land\; \operatorname{IsBinaryFixedMeaning}\;\mathrm{alternateContext}\;(\mathrm{true}, \mathrm{true}, \mathrm{true}) \\
    &\;\land\; (\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true});
   \end{aligned}
   $$

4. **客观诠释主张强制携带跨语境不变公因子**（[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)）：对任意类型 `Context`、`Meaning`、`Factor`，语境不动点谓词 $\mathrm{isFixedMeaning} : \mathrm{Context} \to \mathrm{Meaning} \to \mathrm{Prop}$ 及因子提取映射 $\mathrm{factor} : \mathrm{Meaning} \to \mathrm{Factor}$，任何满足客观性定义 `ObjectiveInterpretationClaim isFixedMeaning factor` 的主张，必给出在一切语境及其选定不动点意义上恒取同一值的公共不变量：

   $$
   \exists\,\mathrm{commonFactor} : \mathrm{Factor},\quad \forall\,\mathrm{context}\;\mathrm{meaning},\quad \mathrm{isFixedMeaning}\;\mathrm{context}\;\mathrm{meaning} \implies \mathrm{factor}\;\mathrm{meaning} = \mathrm{commonFactor}.
   $$
:::

::: proof
第 1 款由 $S(n+1) = U(S(n)) \subseteq S(n)$ 建立自然数基数序列 $n \mapsto (S(n)).\operatorname{ncard}$ 的非增单调性（`Antitone`），当相邻两步基数相等时由有限子集等基数判据 `Set.eq_of_subset_of_ncard_le` 推出 $S(n+1) = S(n)$ 从而后续步步锁死，结合 `Nat.stabilises_of_antitone` 给出稳定时刻 $N \le (S(0)).\operatorname{ncard}$，并由一切严格变化步均落在 `Set.Iio N` 内推出跳变总数上界；第 2 款直接由合取构造子 `And.intro` 将概念等价与固定语境下的像相等封装为 `IsRelativeInterpretationFixedPoint`；第 3 款对 `baselineContext` 与 `alternateContext` 展开记录字段自反性并用 `Bool.false_ne_true` 及首分量投影 `congrArg Prod.fst` 证伪三元组相等；第 4 款展开携带证明的 `ObjectiveInterpretationClaim` 定义直接提取存在见证 `commonFactor`。完整证明由 Lean 内核检查。
:::

细读 [@thm-ch33-contextual-attractor-and-common-factor] 的第 3 款与第 4 款（二者是定义展开，下面借其记号表述本书的读法），观察者势阱的几何品格豁然开朗：在我们的 **`MODEL`（模型诠释）** 中，哪怕面对同一座静态宇宙母格（同一份 `text` 与同一套正交几何 `interpretationRule`），携带不同内部窗口参数 $u_A \neq u_B$（对应不同的 `readerAdmission`、`background` 与 `evaluationGoal`）的两位观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$，可以对应不同的局部不动点切片；而要想在其间建立真正的“客观公共事实”，绝不能靠某一方强权宣布自己代表绝对点 $C$，而须在声明的语境与意义族上选定因子提取映射，证明它对所有入选的不动点意义恒取同一**不变公因子（`commonFactor`）**！下框注明双观察者接受窗重联与孤立、互指两种收敛轨迹分别画在哪里：

::: {.remark #rem-ch33-mutual-attractor-figure title="互吸引子接受窗重联与余弦互指单调锁死图解（图解索引，未在本书形式化）"}
**图解索引，未在本书形式化。** 双观察者吸引子重联模型（`MODEL`）建立在切投准晶接受窗文献背景（[@rem-ch32-icosian-e8-literature]）与桥图极小割定理（[@prop-ch33-bridge-reconnection-mincut]，`LEAN ✓`）之上：两扇接受窗的交集画在下文“接受窗交集”一节的图里，极小割的重联画在该节的两张实验卡里。下文实分析算例 [@ex-ch33-mutual-cosine-monotonic-lock] 中孤立余弦迭代与二阶互指复合迭代的蛛网轨迹对比画在图 33 第 III 栏与下一节的实验卡里：孤立序列按单步计时，互指序列按含两次余弦求值的完整复合轮计时，对应同步互指的偶数拍采样。
:::

---
