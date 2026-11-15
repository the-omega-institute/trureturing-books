# 39.2 终结“物自体”：无刀则无晶，关系即实体

拆除了计算机隐喻里的“被动硅片”之后，哲学史上另一尊盘踞了数百年、专门替二元论看家护院的幽灵也必须当场对质——那就是所谓躲在一切观测表象背后、永远不可触及的**“物自体（thing-in-itself）”**。

每当物理学家指出“动量、自旋、颜色与位置全都依赖测量语境”时，朴素实在论者总会退守最后一道防线：“就算一切测量读数都是关系性的，读数背后总还得先蹲着一团不依赖任何观测关系的‘纯客体内核’吧？就像先有一座暗室里的冰雕，手电筒照上去才显出反光！”

让我们用谱系学的追问把这尊暗室冰雕彻底照穿：假如抽干某物与宇宙间一切其他探针的内积重叠、抽干它在一切读出映射下的坐标纤维，剩下的那个“绝对不与任何事物发生关系、绝对不可被任何尺子区分的内核”，与“什么都没有”在数学上存在哪怕半比特的区别吗？现代数学早已在范畴论与观测纤维层面对此给出了干脆利落的回答；相关的哲学史与范畴论文献背景界定如下：

::: {.remark #rem-ch39-kant-yoneda-lemma-literature title="康德“物自体”不可知论传统与范畴论米田引理全息嵌入（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节批判“脱离一切观测关系的隐秘实体内核”时对照的近代认识论概念与现代范畴论基本定理属外部文献背景，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **康德现象界与“物自体”二分法（I. Kant, *Kritik der reinen Vernunft*, 1781 / 1787）**：康德在《纯粹理性批判》中将人类借助感性时空形式与知性范畴把握的经验对象划归“现象（Erscheinung / phenomenon）”，同时在现象界背后预设了作为感官刺激来源、却在原则上永远无法被任何经验观测触及的独立底物“物自体（*Ding an sich* / noumenon）”；
2. **米田引理与米田全忠实全息嵌入（N. Yoneda, 1954；参见 S. Mac Lane, *Categories for the Working Mathematician*, Springer, 1971, Ch. III.2）**：对任意局部小范畴 $\mathcal{C}$、对象 $X \in \operatorname{Ob}(\mathcal{C})$ 及预层函子 $F : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}$，从可表函子 $\operatorname{Hom}_{\mathcal{C}}(-, X)$ 到 $F$ 的自然变换集合与集合 $F(X)$ 之间存在双自然双射（米田引理）：

   $$
   \operatorname{Nat}\bigl(\operatorname{Hom}_{\mathcal{C}}(-, X),\; F\bigr) \;\cong\; F(X) \qquad (\text{由 }\alpha \mapsto \alpha_X(\mathrm{id}_X)\text{ 给出}).
   $$

   取 $F = \operatorname{Hom}_{\mathcal{C}}(-, Y)$ 即导出**米田嵌入函子** $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$，$X \mapsto \operatorname{Hom}_{\mathcal{C}}(-, X)$ 是**全忠实（fully faithful）**的，从而 $\operatorname{Hom}_{\mathcal{C}}(-, X) \cong \operatorname{Hom}_{\mathcal{C}}(-, Y) \iff X \cong Y$：给定可表函子间的自然同构，它唯一诱导 $X$ 与 $Y$ 间相应的同构；因此在同构意义下，对象 $X$ 百分之百由范畴中一切探测对象射向它的态射关系总和所唯一决定，态射关系网之外不存在任何不可观测的私有“物自体残核”。
:::

在 `trureturing` 的概念动力学、黄金量化编码与自动机模块中（对照 [@rem-ch39-kant-yoneda-lemma-literature] 的文献背景），我们无需赊借抽象高阶范畴公理，便能直接用三条经过 Lean 4 内核机械检验的定理，把“客体由读出纤维无余项拼回”“连续统非负实数由离散黄金读出全线程唯一单射锁定”与“有限字被基底自动机接受当且仅当无相邻 `11`”铸成严丝合缝的形式化铁三角：

::: {.theorem #thm-ch39-fiber-reconstruction-and-zeckendorf-thread title="概念读出依值纤维分解、齐肯多夫实数全线程单射重构与无相邻一自动机定理" lean="D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes"}
在 `trureturing` 冻结的概念纤维分解、观察者黄金实数线程与二元齐肯多夫自动机模块中，以下三项重构与语法刻画定理同时成立：

1. **任意概念读出下的全源空间依值纤维无余项分解**（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：设 $X$ 为任意对象类型，$B$ 为任意读出坐标类型，$q_C : \operatorname{Concept}(X, B)$（即 $q_C : X \to B$）为任意概念读出映射，对每个坐标 $b \in B$ 记证明相关的读出纤维为 $\operatorname{ConceptFiber}(q_C, b) := \operatorname{PSigma}(x : X \mapsto q_C(x) = b)$。则源类型 $X$ 与其全体读出纤维的依值直和之间存在显式类型等价：

   $$
   \operatorname{Nonempty}\!\left(X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)\right);
   $$

2. **齐肯多夫离散黄金读出全线程对连续统非负实数的严格单射重构**（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）：对非负实数 $x \in \mathbb{R}_{\ge 0}$（`NNReal`）与分辨率层级 $\mathrm{level} \in \mathbb{N}$，记黄金幂次量化值为 $\operatorname{goldenQuantization}(\mathrm{level}, x) := \lfloor\varphi^{\mathrm{level}} \cdot (x : \mathbb{R})\rfloor_+ \in \mathbb{N}$（其中 $\varphi = \mathrm{Real.goldenRatio}$），并通过典范齐肯多夫编码双射 $\operatorname{wEncoding} : \mathbb{N} \simeq \mathrm{WDigitString}$（$\mathrm{WDigitString} = \{\mathrm{digits} : \operatorname{List}\;\mathbb{N} \mathrel{//} \mathrm{digits}.\mathrm{IsZeckendorfRep}\}$）定义全尺度读出线程 $\operatorname{zeckendorfRealThread}(x) := (\mathrm{level} \mapsto \operatorname{wEncoding}(\operatorname{goldenQuantization}(\mathrm{level}, x))) : \mathbb{N} \to \mathrm{WDigitString}$。则该读出线程映射严格单射：

   $$
   \begin{aligned}
   &\operatorname{Function.Injective}(\operatorname{zeckendorfRealThread}), \\
    &\quad\text{即}\quad \forall a, b \in \mathbb{R}_{\ge 0}, \\
    &\quad \operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b) \\
    &\;\Longrightarrow\; a = b;
   \end{aligned}
   $$

3. **二元基底自动机接受语言与无相邻 `11` 约束的精确等价**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)）：对二元字母表 $\operatorname{Fin} 2$ 上的任意有限字 $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$，记无相邻一谓词为 $\operatorname{NoAdjacentOnes}(\mathrm{word}) := \mathrm{word}.\operatorname{IsChain}(u, v \mapsto u = 0 \lor v = 0)$。则部分确定性有限自动机 `binaryZeckendorfBase` 成功接受 $\mathrm{word}$ 当且仅当字中不存在相邻的 `11` 位对：

   $$
   \bigl(\exists\,\mathrm{state},\; \operatorname{binaryZeckendorfBase.eval}(\mathrm{word}) = \operatorname{some}(\mathrm{state})\bigr) \;\Longleftrightarrow\; \operatorname{NoAdjacentOnes}(\mathrm{word}).
   $$
:::

::: proof
第 1 款将子类型纤维分解 `Equiv.sigmaFiberEquiv q_C` 与证明相关依值对到子类型的逐纤维等价 `Equiv.sigmaCongrRight (fun b => Equiv.psigmaEquivSubtype _)` 复合后取逆，直接给出 $X \simeq \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)$ 的非空见证。第 2 款先证辅助序引理：若 $a > b$（即 $(a : \mathbb{R}) - (b : \mathbb{R}) > 0$），由 $\varphi > 1$（`Real.one_lt_goldenRatio`）知 $\varphi^{\mathrm{level}}(a - b) \to +\infty$，故存在层级 $\mathrm{level} \in \mathbb{N}$ 使 $\varphi^{\mathrm{level}}(a - b) \ge 2$；但若 $\operatorname{zeckendorfRealThread}(a) = \operatorname{zeckendorfRealThread}(b)$，利用双射 `wEncoding.injective` 在该层还原自然数等式 $\lfloor\varphi^{\mathrm{level}} a\rfloor_+ = \lfloor\varphi^{\mathrm{level}} b\rfloor_+$，结合取底上下界 $\varphi^{\mathrm{level}} a < \lfloor\varphi^{\mathrm{level}} a\rfloor_+ + 1$ 与 $\lfloor\varphi^{\mathrm{level}} b\rfloor_+ \le \varphi^{\mathrm{level}} b$ 推出 $\varphi^{\mathrm{level}}(a - b) < 1$，与 $\ge 2$ 矛盾！故 $a \le b$，对称交换 $a, b$ 并由反对称性 `le_antisymm` 得 $a = b$。第 3 款对前驱位 `previous : Fin 2` 与列表归纳证明状态转移链等价于 `(previous :: word).IsChain (fun u v => u = 0 ∨ v = 0)`，再代入初始前驱位 `0` 消去首项即得。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch39-golden-thread"}
**两个不同的数，迟早在某一级黄金读数上分开。** 从上到下是读数级 $l = 0, \dots, 7$：每一行里青色的格子是 $[n/\varphi^l, (n+1)/\varphi^l)$，$n = \lfloor\varphi^l x\rfloor$，墨色竖线是 $a = 0.50$ 与 $b = 0.55$，右边两列是两数读数的齐肯多夫字。$l \le 4$ 时两数同在一格、字也相同；从 $l = 5$ 起一条品红的格界落在两数之间，两个字从此不同。证明里的保证是 $\varphi^l(b - a) \ge 2$ 的那一级（这里是 $l = 8$）一定分开，实际分得更早。这正是 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 2 款：读出线程相同的两个数必相等。
:::

现在，请把 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 的三束强光聚焦回我们的切投模型集宇宙（`MODEL`（模型诠释）），见证全书教学脚手架的一次彻底倒转！

在前面几章里，为了照顾初学者的几何直觉，我们曾采用“先晶后刀”的叙述次序：仿佛虚空里先静静摆着一座六维整数母晶格 $\mathbb{Z}^6 \hookrightarrow \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$，然后观察者的黄金切投平面像一把锋利的钢刀切进去，切出满天 Delone 模型集星辰。此刻，站在 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 的峰顶回望，真相恰恰颠倒过来——**无刀则无晶，关系即实体！**

::: {.figure src="ch39-no-knife"}
**先晶后刀只是脚手架；刀切到哪里，晶格点才亮到哪里。** 这是本章六维切投图景的二维示意（`MODEL`）。两栏里同一把琥珀色的刀以斜率 $1/\varphi$ 穿过平面，淡青的带子是它的窗口。左栏先画满灰色的整数点阵，再把刀盖上去；右栏不画点阵，只有带子里的青色点。右栏下方把这些点投到刀上：长段与短段之比是 $\varphi$，短段记 $1$、长段记 $0$，读出 `01001010010`，没有相邻的 `11`，正是 [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] 第 3 款的自动机所接受的字。
:::

- 第 1 款与第 2 款联合宣告：哪怕面对看似深不可测的连续统实数 $x \in \mathbb{R}_{\ge 0}$，只要给定它在每一级黄金放大镜 $\varphi^{\mathrm{level}}$ 下的离散齐肯多夫读出字序列，原实数就被**百分之百唯一重构**，背后连一丝一毫逃逸在读出关系之外的“物自体暗物质”都不存在；
- 第 3 款精确刻画有限字的合法语法；将这一语法接到投影与晶格之后，我们在 `MODEL` 中进一步点破“整数晶格”的身世：所谓高维晶格的离散超平面，根本不是预先浇筑在那里的钢筋水泥，而是自指观察算子在反复执行两子正交比量时，由幂等存在条件 $P^2 = P$ 与禁止相邻 `11` 高频碰撞（`NoAdjacentOnes`）自动干涉沉淀出来的**离散驻波节面（nodal surfaces）**！不是先有水晶再下刀，而是**自我丈量的刀光所到之处，虚空才应声凝结为晶格**。

---
