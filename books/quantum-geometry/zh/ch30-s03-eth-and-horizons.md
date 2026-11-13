# 30.3 指数时间假设（ETH）、2026 张量网络秩约分与宇宙学视界：上界曲线的尺度与诠释边界 {#sec-coda-eth-tensor-rank-and-cosmic-horizon}

> *“把指数时间假设（ETH）的原始结构与 2026 年 10 月下旬张量网络秩约分亚指数前沿放进‘场（$P$）与线（$NP$）、多面体近似之球与有限观察者视界’的几何体系中审视：渐近硬地板的动摇不仅没有否定有限观察者视角下的 $P \neq NP$，反而用一组跨越宇宙学尺度的渐近对比，为‘局部三体切面拼不出绝对刚性的真球’与‘观察者视界不可逾越’提供了生动的几何注脚。”*

为了严格区分外部复杂性理论文献与本书构建的正交几何模型（`MODEL`），我们先将细粒度复杂性理论（Fine-Grained Complexity）的经典假设与 2026 年 10 月前沿预印本完整归入以下文献注记，随后展开几何与尺度剖析：

::: {.remark #rem-ch30-eth-subexponential-literature title="指数时间假设（ETH / SETH）与 2026 年 10 月亚指数 3-SAT 预印本的文献说明"}
**文献结果，未在本书形式化。** 本节讨论的细粒度复杂性假设、传统算法上界及 2026 年 10 月亚指数预印本均属外部研究文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **指数时间假设（ETH）、强指数时间假设（SETH）与稀疏化引理（R. Impagliazzo & R. Paturi, *CCC* 1999；R. Impagliazzo, R. Paturi & F. Zane, *J. Comput. Syst. Sci.* **62**, 367–375, 2001）**：固定子句宽度 $k \ge 3$，输入含 $n$ 个变量与 $m$ 条子句。考虑所有使某个确定性 $k$-SAT 算法具有下列时间上界的实数 $\delta\ge0$：

   $$
   2^{\delta n}(n+m)^{O(1)}.
   $$

   将这些指数率的下确界记作 $s_k$。**ETH** 假设 $s_3 > 0$（因而排除时间为 $2^{o(n)}(n+m)^{O(1)}$ 的确定性算法）；**SETH** 假设 $\lim_{k \to \infty} s_k = 1$。其伴随的**稀疏化引理（Sparsification Lemma）**证明：对任意固定 $\varepsilon > 0$ 与 $k \ge 3$，任意 $n$ 变量 $k$-SAT 公式均可在 $2^{\varepsilon n}(n+m)^{O(1)}$ 时间内归约为至多 $2^{\varepsilon n}$ 个稀疏 $k$-SAT 公式（每个公式至多含 $c(k, \varepsilon)\,n = O_{k,\varepsilon}(n)$ 条子句）的析取。此外，标准 **Tseitin 变换**将规模为 $S$ 的布尔电路线性归约为变量数 $N = \Theta(S)$ 的 3-SAT 公式；PPSZ 框架（R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 2005）及其后续随机算法改进提供约为 $1.307^n \approx 2^{0.386 n}$ 的时间上界（这里仅以 $r \approx 0.386$ 作随机算法比较基准，不与确定性 ETH 混同）。
2. **已定位的原始论文与各自形式化范围**：OpenAI 的 67 页 [*The Exponential Time Hypothesis Is False*](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf)（10 月 17 日、10 月 25 日修订）定理 1.1 对每个固定 $k\ge2$ 声明精确计数 $k$-CNF 满足赋值的确定性位复杂度

   $$
   (n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})},
   $$

   并给出多项式位空间界；[配套形式化范围说明](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/lean/docs/378.md)针对规范编码长度 $L$，发布的是较弱的 $(L+1)^{O_k(1)}2^{O_k(n(\log\log n)^2/\sqrt{\log n})}$ 时间与多项式已访问带格数界。两种指数不能混写。Anthropic 的 49 页 [*A $2^{o(n)}$ Time Algorithm for 3-SAT*](https://github.com/anthropics/formal-math/blob/16a5ce41304fcdaea4e0be7c132e1c361dc26da5/eth/paper.pdf)（10 月 26 日）定理 1 在 word RAM 模型给出 $2^{O(\min\{k^2n\log\log n/\sqrt{\log n},\,km/\sqrt{\log m}\})}$ 上界；附录 E 区分 Mathlib 多栈图灵机命题、编码承诺与纸面模型之间未形式化的输入编码及模拟步骤。这些是外部发布的论文与形式化范围声明，本书未独立重建两套证明，也未将其纳入冻结定理。
3. **可核查的审读归属**：Impagliazzo、Paturi、Williams 的[社区原始说明](https://ethdiscussion.blog/2026/10/26/eth-refutation-examination-and-discussion/)邀请独立检查，并明确表示其参与不等于认证；不能把“正在审读”写成认可结论。Fortnow 的 [10 月 28 日文章](https://blog.computationalcomplexity.org/2026/10/the-exponential-time-refutation.html)链接上述论文，同时说明一般多项式规约可能放大变量数，$2^{o(n)}$ 上界不自动传给所有 NP 问题。本节的几何类比与示意曲线也不判定标准 $P$ vs. $NP$。

:::

## 30.3.1 从“一维赋值线”升维到“张量关联场”的低秩约分与多面体近似之球（`MODEL`） {#1-从一维赋值线升维到张量关联场的低秩约分与多面体近似之球model}

将 [@rem-ch30-eth-subexponential-literature] 中的数学机制与本书的正交几何体系对表，可以看到两层深刻的结构呼应（`MODEL`）：

- **从“一维赋值线”升维到“张量关联场”的低秩约分（`MODEL`）**：传统的回溯与局部随机游走本质上都在一维布尔赋值线上逐点试探；而张量网络方法将离散布尔子句网络嵌入高维线性空间，转化为多线性张量缩并问题。在本书锁定的 `trureturing@dev` 形式化库中，第 19 章针对特定离散桥图在维度假设下证明的**张量网络量子最大流最小割定理**（[`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 及其多面体割锥刻画 [`cone_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut)）与第 3 章在迹约束下界定高权重模态数的**有限秩集中模态上界**（[`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound)），给出了有限维原型（注：这些 Lean 定理刻画的是特定桥图流割对偶与有限秩迹集中，并非形式化 [@rem-ch30-eth-subexponential-literature] 中的 3-SAT 亚指数算法本身）：它们在概念模型（`MODEL`）上说明，跨割界面传递信息的有效瓶颈受控于**代数秩（Rank）**。当局部变量成块缩并时，一维布尔视角下看似独立的约束块在高维张量面上展现出**线性相关与秩亏损（冗余寄生面积正负相消）**——这与第 16、27 章旋量编译器消去冗余旋转门、以及第 23 章丢番图范数型压缩变量维度的代数约分思想同源。
- **“球永远只是多面体近似”：三体局部切面与渐近缝隙（`MODEL`）**：作者以局部三体切面（$\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$）拼接整体的图像，诠释指数率上界随规模变化的可能性。若 [@rem-ch30-eth-subexponential-literature] 中预印本宣称的上界经审计成立，其有效单变量指数率将趋于 $0$；这一条件性算法主张不能由多面体比喻或上述有限维 Lean 原型推出。

::: {.viz src="eth-horizon-crossover" preset="bridge" height="500"}
**流矩阵的秩等于最小割。** 桥图 $(a, b, c, d) = (2, 3, 2, 3)$：两道外割都是 $6$（品红虚线），三条桥能过 $12$。右边是一个随机整数实例的 $6 \times 6$ 流矩阵（青色为正项，灰色为负项），下面六根奇异值都不为零：秩 $6$，恰等于最小割。这只是一个实例；Lean 验证的 [@thm-bridge-quantum-maxflow-mincut] 表明：在其完整维数假设下，这类桥图的最大可达秩等于最小割，单次抽样的秩则可能更低。这条定理只讲桥图上的流与割，与上文转述的亚指数 3-SAT 预印本无关：它既不检验、也不支持那里的算法主张（[@rem-ch30-eth-subexponential-literature]，本书未独立重建）。
:::

## 30.3.2 银河算法（Galactic Algorithm）与宇宙视界：上界比较能说明什么？（`MODEL` 与认识论边界） {#2-银河算法galactic-algorithm与宇宙视界上界比较能说明什么model-与认识论边界}

::: {.example #ex-ch30-galactic-crossover-scale title="亚指数上界曲线与局部搜索基准的跨宇宙尺度对比及二次编码膨胀"}
**文献结果背景与数值示意（`MODEL`），未在本书形式化。** 单变量渐近指数率曲线缓慢趋零是否意味着场内有限观察者能在现实物理尺度上跨越复杂度壁垒？为了直观审视 [@rem-ch30-eth-subexponential-literature] 中上界表达式的尺度行为，考察以 $2$ 为底的示意性单变量指数曲线 $r_{\mathrm{new}}(n) = c \cdot \frac{\log_2(\log_2 n)}{\sqrt{\log_2 n}}$（对应运行时间上界形如 $2^{r_{\mathrm{new}}(n)\cdot n}$，此处取理想归一化常数 $c = 1$ 仅作文献渐近上界曲线的数值示意，而非对任意算法或物理观察者的严格下界证明），并与 [@rem-ch30-eth-subexponential-literature] 中的传统 PPSZ 局部搜索上界基准 $0.386$（$1.307^n \approx 2^{0.386 n}$）对表：

| 观察者与系统尺度 $n$ | 对数尺度 $\log_2 n$ | 示意上界指数率 $r_{\mathrm{new}}(n)$（取 $c=1$） | 传统局部搜索上界基准（[@rem-ch30-eth-subexponential-literature]） | 尺度对比与几何模型解读（`MODEL`） |
| :--- | :---: | :---: | :---: | :--- |
| **人类工程尺度**（$n = 65{,}536 = 2^{16}$） | $16$ | $\dfrac{\log_2 16}{\sqrt{16}} = \mathbf{1.000}$ | $\mathbf{0.386}$ | 在 $6.5$ 万变量处，$c=1$ 的示意曲线才刚刚降到与朴素 $2^n$ 穷举相当的指数率 $1.000$ |
| **可观测宇宙原子总数**（$n \approx 10^{80} \approx 2^{266}$） | $\approx 266$ | $\dfrac{\log_2 266}{\sqrt{266}} \approx \mathbf{0.494}$ | $\mathbf{0.386}$ | 即使在 $n \approx 10^{80}$ 的宇宙重子尺度上，$c=1$ 示意曲线（$\approx 0.494$）仍高于 $0.386$ |
| **超越交叉临界点**（$n = 2^{558}$） | $\mathbf{558}$ | $\dfrac{\log_2 558}{\sqrt{558}} \approx \mathbf{0.386}$ | $\mathbf{0.386}$ | 在 $c=1$ 示意归一化下，需等到 **$n \approx 2^{558}$**（远超可观测宇宙尺度），曲线才下穿 $0.386$ |

此外，$g(n)=n\log\log n/\sqrt{\log n}$ 比 $\log n$ 增长快，因此对固定 $c>0$，比较函数 $2^{c g(n)}$ 超过每个固定次多项式。但 $T(n)=2^{O(g(n))}$ 只是上界，允许更快甚至多项式时间的算法，并不证明 $P\neq NP$。对于自然参数为 $n$、所用电路编码规模为 $S=\Theta(n^2)$ 的问题，若 Tseitin 转换产生 $N=\Theta(n^2)$ 个变量，代入所讨论的公式得到上界 $2^{O(n^2\log\log n/\sqrt{\log n})}$。这是该编码与该上界表达式的尺度变化，不是最优算法必须付出的超指数成本。表中的 $c=1$ 曲线既不固定大 $O$ 中的真实常数与适用阈值，也不据此判定现实算法的快慢。
:::

::: {.viz src="eth-horizon-crossover" preset="atoms" height="500"}
**交叉点在视界之外。** 青色是取 $c = 1$ 的示意曲线 $r(n) = \log_2(\log_2 n)/\sqrt{\log_2 n}$，品红是 PPSZ 的 $0.386$，阴影是可观测宇宙原子数 $2^{266}$ 以内的规模。琥珀色的读数停在 $n = 2^{266}$：曲线还在 $0.494$，要到 $n \approx 2^{558}$ 才降到 $0.386$（示意曲线的数值对比，`MODEL`）。
:::

[@ex-ch30-galactic-crossover-scale] 中跨越宇宙尺度的数值与规约对比，为本书“球内有限观察者 vs. 球外之球”的认识论图景（`MODEL`）提供了三点深刻启示：

- **银河算法与有限观察者的物理尺度边界（`MODEL`）**：[@ex-ch30-galactic-crossover-scale] 的归一化示意曲线展示了超天文尺度才交叉的可能性，与“银河算法”的尺度图像呼应。**有限记忆历史容量定理**（[`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)，约束可区分历史数）与**开放可积电路最小深度定理**（[`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)，在其局部性前提下给出最小深度 $\lfloor N/(\kappa+1)\rfloor+1$）各自刻画特定模型的资源限制。它们与上界曲线并置可用于作者的有限观察者诠释，但不能组合成所有 SAT 算法的下界或有限观察者必然难解的证明；标准 $P\neq NP$ 仍为 `OPEN`（[@conj-p-neq-np]）。

::: {.viz src="eth-horizon-crossover" preset="constant" height="500"}
**常数减半，交叉点回到视界之内。** 取 $c = 1/2$：青色示意曲线与品红的 $0.386$ 交在 $n \approx 2^{57}$，落进阴影（可观测宇宙原子数以内的规模）。大 O 记号不给出常数 $c$，交叉点落在视界的哪一边全看它（示意曲线的数值对比，`MODEL`）。
:::

- **$P$（场）与 $NP$（线）的认识论对照（`MODEL`）**：导向结构与见证检查表现出不同的任务角色；它们可以在同一个问题中并存，因为 $P\subseteq NP$。上界曲线和编码尺度比较不把两类问题分开。
- **形式内核核验与顶层规约审计的哥德尔—语义边界（`LEAN ✓` 原型与 `MODEL` 映照）**：[@rem-ch30-eth-subexponential-literature] 中提供了一个认识论问题：形式证明内核检查给定形式命题的推演；具体耗时取决于证明项、归约与实现。社区审读仍须追问“顶层形式化命题的定义是否忠实刻画了目标图灵机复杂度命题”。在本书第 21 章中，经 Lean 4 内核验证的**相对语义对角线与定义逃逸定理**严格证明：在给定无不动点扭转映射（`∀ v, twist v ≠ v`）的条件下，相对语义对角线构造必然逃出任何已编目解码族（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)），且当解码目录覆盖潜坐标上的全部解码函数时，该对角线目标相对于给定潜映射不满足语义完备性 `TargetAdequate`（[`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)）。将这一形式定理作为认识论原型（`MODEL`）来观照顶层规约审计，可以说明本书的写作准则：**形式内核核验给定定义、公理与规则下的推演；顶层定义是否表达目标问题仍须单独审查。这不等于证明整个公理系统的一致性。**

::: {.viz src="eth-horizon-crossover" height="640"}
**交互实验室 `ORTHO//HORIZON`**：本节的三个场景。指数率：示意曲线 $r(n)$ 与 PPSZ 的 $0.386$ 在哪里相交，以及常数 $c$ 怎样把交叉点挪进或挪出阴影；桥图：单次抽样的流矩阵秩与四道割，冻结量 $\operatorname{QMinCut} = \min(3ac, ad, bc)$，第四道 $3bd$ 割由手工矩阵分解给出；自然数维数满足 $0 < a \le b$、$0 < c \le d$、$a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$ 时，可达最大秩等于 $\operatorname{QMinCut} = \min(ad, bc)$（Lean 已验证），单次抽样仍可更低，锥域外须比较四道割；模态：谱里不小于阈值 $\tau$ 的模态数不超过 $RW/(\pi\tau)$（Lean 已验证）。取 $c = 1$ 的曲线只是示意，不是任何算法的实测。
:::

---

