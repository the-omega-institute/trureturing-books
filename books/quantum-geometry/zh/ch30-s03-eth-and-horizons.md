# 26.3 指数时间假设（ETH）、2026 亚指数 3-SAT 预印本与宇宙学视界：上界曲线的尺度与诠释边界 {#sec-coda-eth-tensor-rank-and-cosmic-horizon}

> *“把指数时间假设（ETH）的原始结构与 2026 年 10 月下旬张量网络秩约分亚指数前沿放进‘场（$P$）与线（$NP$）、多面体近似之球与有限观察者视界’的几何体系中审视：渐近硬地板的动摇不仅没有否定有限观察者视角下的 $P \neq NP$，反而用一组跨越宇宙学尺度的渐近对比，为‘局部三体切面拼不出绝对刚性的真球’与‘观察者视界不可逾越’提供了生动的几何注脚。”*

题记把两篇预印本统称为“张量网络秩约分”；按下文文献注记，只有其中一篇以张量网络收缩与秩界为核心步骤。为了严格区分外部复杂性理论文献与本书构建的正交几何模型（`MODEL`），我们先将细粒度复杂性理论（Fine-Grained Complexity）的经典假设与 2026 年 10 月前沿预印本完整归入以下文献注记，随后展开几何与尺度剖析：

::: {.remark #rem-ch30-eth-subexponential-literature title="指数时间假设（ETH / SETH）与 2026 年 10 月亚指数 3-SAT 预印本的文献说明"}
**文献结果，未在本书形式化。** 本节讨论的细粒度复杂性假设、传统算法上界及 2026 年 10 月亚指数预印本均属外部研究文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **指数时间假设（ETH）、强指数时间假设（SETH）与稀疏化引理（R. Impagliazzo & R. Paturi, *J. Comput. Syst. Sci.* **62**, 367–375, 2001，会议版 *CCC* 1999；R. Impagliazzo, R. Paturi & F. Zane, *J. Comput. Syst. Sci.* **63**, 512–530, 2001）**：固定子句宽度 $k \ge 3$，输入含 $n$ 个变量与 $m$ 条子句。考虑所有使某个确定性 $k$-SAT 算法具有下列时间上界的实数 $\delta\ge0$：

   $$
   2^{\delta n}(n+m)^{O(1)}.
   $$

   将这些指数率的下确界记作 $s_k$。**ETH** 假设 $s_3 > 0$（因而排除时间为 $2^{o(n)}(n+m)^{O(1)}$ 的确定性算法）；**SETH** 假设 $\lim_{k \to \infty} s_k = 1$。其伴随的**稀疏化引理（Sparsification Lemma）**证明：对任意固定 $\varepsilon > 0$ 与 $k \ge 3$，任意 $n$ 变量 $k$-SAT 公式均可在 $2^{\varepsilon n}(n+m)^{O(1)}$ 时间内归约为至多 $2^{\varepsilon n}$ 个稀疏 $k$-SAT 公式（每个公式至多含 $c(k, \varepsilon)\,n = O_{k,\varepsilon}(n)$ 条子句）的析取。此外，标准 **Tseitin 变换**将规模为 $S$ 的布尔电路线性归约为变量数 $N = \Theta(S)$ 的 3-SAT 公式；PPSZ 框架（R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 2005）及其后续随机算法改进提供约为 $1.307^n \approx 2^{0.386 n}$ 的时间上界（这里仅以 $r \approx 0.386$ 作随机算法比较基准，不与确定性 ETH 混同）。
2. **已定位的原始论文与各自形式化范围**：OpenAI 的 67 页 [*The Exponential Time Hypothesis Is False*](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf)（10 月 17 日、10 月 25 日修订）定理 1.1 对每个固定 $k\ge2$ 声明精确计数 $k$-CNF 满足赋值的确定性位复杂度

   $$
   (n+m)^{O_k(1)}2^{O_k(n\log\log n/\sqrt{\log n})},
   $$

   并给出多项式位空间界；[配套形式化范围说明](https://github.com/openai/math/blob/4eaee87548250b2682affda7d05d947c05554bae/lean/docs/378.md)针对规范编码长度 $L$，发布的是较弱的 $(L+1)^{O_k(1)}2^{O_k(n(\log\log n)^2/\sqrt{\log n})}$ 时间与多项式已访问带格数界。两种指数不能混写。Anthropic 的 49 页 [*A $2^{o(n)}$ Time Algorithm for 3-SAT*](https://github.com/anthropics/formal-math/blob/16a5ce41304fcdaea4e0be7c132e1c361dc26da5/eth/paper.pdf)（10 月 26 日）定理 1 在 word RAM 模型给出 $2^{O(\min\{k^2n\log\log n/\sqrt{\log n},\,km/\sqrt{\log m}\})}$ 上界；附录 E 区分 Mathlib 多栈图灵机命题、编码承诺与纸面模型之间未形式化的输入编码及模拟步骤；据其仓库说明，这一篇以张量网络收缩与分组算子的秩界为核心步骤。这些是外部发布的论文与形式化范围声明，本书未独立重建两套证明，也未将其纳入冻结定理。
3. **可核查的审读归属**：Impagliazzo、Paturi、Williams 的[社区原始说明](https://ethdiscussion.blog/2026/10/26/eth-refutation-examination-and-discussion/)邀请独立检查，并明确表示其参与不等于认证；不能把“正在审读”写成认可结论。Fortnow 的 [10 月 28 日文章](https://blog.computationalcomplexity.org/2026/10/the-exponential-time-refutation.html)链接上述论文，同时说明一般多项式规约可能放大变量数，$2^{o(n)}$ 上界不自动传给所有 NP 问题。本节的几何类比与示意曲线也不判定标准 $P$ vs. $NP$。

:::

## 26.3.1 从“一维赋值线”升维到“张量关联场”的低秩约分与多面体近似之球（`MODEL`） {#1-从一维赋值线升维到张量关联场的低秩约分与多面体近似之球model}

将 [@rem-ch30-eth-subexponential-literature] 中的数学机制与本书的正交几何体系对表，可以看到两层深刻的结构呼应（`MODEL`）：

- **从“一维赋值线”升维到“张量关联场”的低秩约分（`MODEL`）**：传统的回溯与局部随机游走本质上都在一维布尔赋值线上逐点试探；而张量网络方法将离散布尔子句网络嵌入高维线性空间，转化为多线性张量缩并问题。在本书锁定的 `trureturing@dev` 形式化库中，第 19 章针对特定离散桥图在维度假设下证明的**张量网络量子最大流最小割定理**（[`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 及其多面体割锥刻画 [`cone_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut)）与第 3 章在迹约束下界定高权重模态数的**有限秩集中模态上界**（[`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound)），给出了有限维原型（注：这些 Lean 定理刻画的是特定桥图流割对偶与有限秩迹集中，并非形式化 [@rem-ch30-eth-subexponential-literature] 中的 3-SAT 亚指数算法本身）：它们在概念模型（`MODEL`）上说明，跨割界面传递信息的有效瓶颈受控于**代数秩（Rank）**。当局部变量成块缩并时，一维布尔视角下看似独立的约束块在高维张量面上展现出**线性相关与秩亏损（冗余寄生面积正负相消）**——这与第 16 章及[铸器与圣殿 · 单量子比特旋转器编译](ch26-single-qubit-rotor-compilation.md)中旋量编译器消去冗余旋转门、以及第 23 章丢番图范数型压缩变量维度的代数约分思想同源。
- **“球永远只是多面体近似”：三体局部切面与渐近缝隙（`MODEL`）**：作者以局部三体切面（$\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$）拼接整体的图像，诠释指数率上界随规模变化的可能性。若 [@rem-ch30-eth-subexponential-literature] 中预印本宣称的上界经审计成立，其有效单变量指数率将趋于 $0$；这一条件性算法主张不能由多面体比喻或上述有限维 Lean 原型推出。

::: {.viz src="eth-horizon-crossover" preset="bridge" height="500"}
**流矩阵的秩等于最小割。** 桥图 $(a, b, c, d) = (2, 3, 2, 3)$：两道外割都是 $6$（品红虚线），三条桥能过 $12$。右边是一个随机整数实例的 $6 \times 6$ 流矩阵（青色为正项，灰色为负项），下面六根奇异值都不为零：秩 $6$，恰等于最小割。这只是一个实例；Lean 验证的 [@thm-bridge-quantum-maxflow-mincut] 表明：在其完整维数假设下，这类桥图的最大可达秩等于最小割，单次抽样的秩则可能更低。这条定理只讲桥图上的流与割，与上文转述的亚指数 3-SAT 预印本无关：它既不检验、也不支持那里的算法主张（[@rem-ch30-eth-subexponential-literature]，本书未独立重建）。
:::

## 26.3.2 银河算法（Galactic Algorithm）与宇宙视界：上界比较能说明什么？（`MODEL` 与认识论边界） {#2-银河算法galactic-algorithm与宇宙视界上界比较能说明什么model-与认识论边界}

::: {.example #ex-ch30-galactic-crossover-scale title="亚指数上界曲线与局部搜索基准的跨宇宙尺度对比及二次编码膨胀"}
**文献结果背景与数值示意（`MODEL`），未在本书形式化。** 单变量渐近指数率曲线缓慢趋零是否意味着场内有限观察者能在现实物理尺度上跨越复杂度壁垒？为了直观审视 [@rem-ch30-eth-subexponential-literature] 中上界表达式的尺度行为，考察以 $2$ 为底的示意性单变量指数曲线 $r_{\mathrm{new}}(n) = c \cdot \frac{\log_2(\log_2 n)}{\sqrt{\log_2 n}}$（对应运行时间上界形如 $2^{r_{\mathrm{new}}(n)\cdot n}$，此处取理想归一化常数 $c = 1$ 仅作文献渐近上界曲线的数值示意，而非对任意算法或物理观察者的严格下界证明），并与 [@rem-ch30-eth-subexponential-literature] 中的传统 PPSZ 上界基准 $0.386$（$1.307^n \approx 2^{0.386 n}$）对表：

| 观察者与系统尺度 $n$ | 对数尺度 $\log_2 n$ | 示意上界指数率 $r_{\mathrm{new}}(n)$（取 $c=1$） | 传统 PPSZ 上界基准（[@rem-ch30-eth-subexponential-literature]） | 尺度对比与几何模型解读（`MODEL`） |
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
- **形式内核核验与顶层规约审计的哥德尔—语义边界（`MODEL` 映照）**：[@rem-ch30-eth-subexponential-literature] 中提供了一个认识论问题：形式证明内核检查给定形式命题的推演；具体耗时取决于证明项、归约与实现。社区审读仍须追问“顶层形式化命题的定义是否忠实刻画了目标图灵机复杂度命题”。在本书第 21 章中，经 Lean 4 内核验证的**相对语义对角线与定义逃逸定理**严格证明：在给定无不动点扭转映射（`∀ v, twist v ≠ v`）的条件下，相对语义对角线构造必然逃出任何已编目解码族（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)），且当解码目录覆盖潜坐标上的全部解码函数时，该对角线目标相对于给定潜映射不满足语义完备性 `TargetAdequate`（[`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)）。将这一形式定理作为认识论原型（`MODEL`）来观照顶层规约审计，可以说明本书的写作准则：**形式内核核验给定定义、公理与规则下的推演；顶层定义是否表达目标问题仍须单独审查。这不等于证明整个公理系统的一致性。**

::: {.viz src="eth-horizon-crossover" height="640"}
**交互实验室 `ORTHO//HORIZON`**：本节的三个场景。指数率：示意曲线 $r(n)$ 与 PPSZ 的 $0.386$ 在哪里相交，以及常数 $c$ 怎样把交叉点挪进或挪出阴影；桥图：单次抽样的流矩阵秩与四道割，冻结量 $\operatorname{QMinCut} = \min(3ac, ad, bc)$，第四道 $3bd$ 割由手工矩阵分解给出；自然数维数满足 $0 < a \le b$、$0 < c \le d$、$a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$ 时，可达最大秩等于 $\operatorname{QMinCut} = \min(ad, bc)$（Lean 已验证），单次抽样仍可更低，锥域外须比较四道割；模态：谱里不小于阈值 $\tau$ 的模态数不超过 $RW/(\pi\tau)$（Lean 已验证）。取 $c = 1$ 的曲线只是示意，不是任何算法的实测。
:::

## 26.3.3 朗伯 $W$ 交叉律、桥图黄金锥割与有限见证 {#sec-ch26-3-3-lambert-bridge-cone-tseitin-diagonal}

前两节通过表格与交互场景呈现了亚指数 3-SAT 示意曲线、桥图流割原型与有限资源界。一旦将渐近 $O$-记号换作显式常数与精确不等式，四个核心问题便浮出水面：示意曲线的交叉点究竟位于何处并对前置常数有多敏感？桥图黄金锥与完整四割相图之间差着哪一层结构？多项式规约膨胀到多快才会破坏 $2^{o(n)}$ 尺度，有限资源界又在何种见证上取等？形式内核核验与顶层规约审计的边界如何在最小有限空间中显形？下文依次解答这四个问题。

### 26.3.3.1 示意上界曲线的朗伯 $W_{-1}$ 交叉、超二次弹性与纯整数幂夹逼 {#sec-ch26-3-3-1-lambert-crossover-and-integer-brackets}

记 $u := \log_2 n > 1$ 与归一化剖面 $f(u) := \frac{\log_2 u}{\sqrt{u}}$，则 [@ex-ch30-galactic-crossover-scale] 的示意单变量指数曲线写作 $r_c(n) = c\,f(u)$（常数 $c > 0$）。对 $u$ 求导得 $f'(u) = \frac{2 - \ln u}{2(\ln 2)\,u^{3/2}}$，其符号仅在 $u_* = e^2$（四舍五入为 $7.389056$，对应 $n_* = 2^{e^2} \approx 167.620652$）处由正转负，而剖面在两端 $u \to 1^+$ 与 $u \to +\infty$ 均满足 $f(u) \to 0$。因此 $f$ 在 $u_* = e^2$ 处取唯一全局极大值 $f_{\max} = \frac{2}{e\ln 2}$（四舍五入为 $1.061476$）；又因整数恒等式 $4^2 = 2^4$ 与 $16^4 = 2^{16}$ 给出 $f(4) = f(16) = 1$，曲线 $r_1(n)$ 严格高出朴素穷举率 $1$ 当且仅当 $16 < n < 65536$。

为求下降支 $u > e^2$ 与给定正水平 $\theta > 0$ 的交点，令 $t := \frac{1}{2}\ln u > 1$，方程 $c\,f(u) = \theta$ 精确化为 $t e^{-t} = \frac{\theta\ln 2}{2c}$。当且仅当 $c > c_{\mathrm{crit}}(\theta) := \frac{\theta\,e\ln 2}{2}$ 时，右端严格落入 $(0, e^{-1})$，由朗伯 $W$ 函数的实下支 $W_{-1}$（R. M. Corless, G. H. Gonnet, D. E. G. Hare, D. J. Jeffrey & D. E. Knuth，*On the Lambert W Function*，1996，§1，pp. 330–331，[10.1007/BF02124750](https://doi.org/10.1007/BF02124750)）给出唯一下降交点；当 $c = c_{\mathrm{crit}}(\theta)$ 时，曲线与水平 $\theta$ 恰在极大值点 $u_* = e^2$ 处相切；当 $c < c_{\mathrm{crit}}(\theta)$ 时，整条曲线处处严格低于 $\theta$。进一步，由 $\frac{d\ln c}{dt} = 1 - \frac{1}{t}$ 与 $\ln u_{\mathrm{cross}} = 2t$ 立得交叉对数规模关于常数 $c$ 的精确对数弹性：

$$
\begin{aligned}
f(u) &:= \frac{\log_2 u}{\sqrt{u}}, \qquad f'(u) = \frac{2 - \ln u}{2(\ln 2)\,u^{3/2}}, \qquad f_{\max} = f(e^2) = \frac{2}{e\ln 2}, \\
u_{\mathrm{cross}}(c, \theta) &= \exp\!\left(-2\,W_{-1}\!\left(-\frac{\theta\ln 2}{2c}\right)\right) \qquad \left(c > c_{\mathrm{crit}}(\theta) := \frac{\theta\,e\ln 2}{2}\right), \\
\frac{c}{u_{\mathrm{cross}}}\,\frac{\partial u_{\mathrm{cross}}}{\partial c} &= \frac{2t}{t - 1} > 2 \qquad \left(t := \frac{1}{2}\ln u_{\mathrm{cross}} > 1\right).
\end{aligned}
$$

在随机算法比较基准方面，Paturi 等人（R. Paturi, P. Pudlák, M. E. Saks & F. Zane，*An Improved Exponential-Time Algorithm for $k$-SAT*，2005，摘要 p. 337 与 Theorem 1(ii)，p. 342，[10.1145/1066100.1066101](https://doi.org/10.1145/1066100.1066101)）针对唯一 3-SAT 确立了分析指数 $2\ln 2 - 1 \approx 0.386$；下文沿用 [@ex-ch30-galactic-crossover-scale] 所取的精确十进制比较水平 $\theta = 0.386 = \frac{193}{500}$。在此水平下，临界常数为 $c_{\mathrm{crit}} \approx 0.363645$；在可观测宇宙原子数尺度 $u = 266$ 处有 $f(266) \approx 0.493901$，故恰在 $n = 2^{266}$ 处交叉的临界系数为 $c_{\mathrm{horizon}} = 0.386 / f(266) \approx 0.781533$。而在 $c = 1$ 处，精确下降交点位于 $u_{\mathrm{cross}}(1, 0.386) \approx 559.078227$（因 $f(558) \approx 0.386255 > f(559) \approx 0.386018 > 0.386 > f(560) \approx 0.385783$），比前文表格的粗略读数 $2^{558}$ 高出略逾 $1$ 个 $\log_2 n$ 单位；在 $c = \frac{1}{2}$ 处，交点位于 $u_{\mathrm{cross}}(\frac{1}{2}, 0.386) \approx 57.171127$（$\frac{1}{2}f(57) \approx 0.386293 > 0.386 > \frac{1}{2}f(58) \approx 0.384595$），与前文交互卡读数吻合。

因弹性 $\frac{2t}{t - 1}$ 恒大于 $2$（在 $c = 1$ 处约为 $2.924580$，在 $c = \frac{1}{2}$ 处约为 $3.954987$），对数尺度 $u_{\mathrm{cross}}$ 随 $c$ 呈超二次增长；更精确地，在固定 $\theta$ 下由交叉方程得 $t - \ln t = \ln c + \ln\frac{2}{\theta\ln 2}$ 与 $e^t = \frac{2ct}{\theta\ln 2}$，故 $t \sim \ln c$ 且 $u_{\mathrm{cross}} = \bigl(\frac{2ct}{\theta\ln 2}\bigr)^2$，从而变量规模 $n = 2^{u_{\mathrm{cross}}}$ 按 $\exp(\Theta(c^2 \ln^2 c))$ 呈超指数增长：把 $c$ 从 $1$ 减半至 $\frac{1}{2}$，交叉规模便从 $10^{168.30}$ 骤降至 $10^{17.21}$，跨度逾 $151$ 个数量级。下表按六位小数舍入汇总 $\theta = 0.386$ 下八组系数 $c$ 的下降交叉点、上取整阈值、十进制指数与弹性：

| $c$ | 下降交叉 $u_{\mathrm{cross}}$ | $\lceil u_{\mathrm{cross}}\rceil$ | $\log_{10} n$ | 弹性 $\frac{2t}{t - 1}$ |
| ---: | ---: | ---: | ---: | ---: |
| $0.4$ | $20.176278$ | $21$ | $6.073665$ | $5.982051$ |
| $0.5$ | $57.171127$ | $58$ | $17.210224$ | $3.954987$ |
| $0.6$ | $111.940327$ | $112$ | $33.697396$ | $3.471689$ |
| $0.75$ | $233.763430$ | $234$ | $70.369804$ | $3.157974$ |
| $1.0$ | $559.078227$ | $560$ | $168.299316$ | $2.924580$ |
| $1.25$ | $1058.831701$ | $1059$ | $318.740102$ | $2.805652$ |
| $1.5$ | $1753.605069$ | $1754$ | $527.887726$ | $2.731338$ |
| $2.0$ | $3795.332890$ | $3796$ | $1142.509043$ | $2.640869$ |

更进一步，上述整数夹逼不必依赖超越函数或浮点对数，仅凭纯整数幂比较即可确立。将不等式 $c\,f(u) > \frac{193}{500}$ 写成 $f(u) > \frac{p}{500}$（$c = 1$ 时取 $p = 193$，$c = \frac{1}{2}$ 时取 $p = 386$）并改写为 $u > 2^{(p/500)\sqrt{u}}$：对平方数 $u = 23^2 = 529$ 与 $u = 24^2 = 576$，两条整数幂不等式 $23^{1000} > 2^{4439}$ 与 $24^{1000} < 2^{4632}$ 一步确立粗区间 $529 < u_{\mathrm{cross}}(1, 0.386) < 576$。对非平方整数 $u$，若正整数比 $a/b$ 满足 $u b^2 < a^2$ 且 $u^{500b} > 2^{pa}$（约去指数公因子后同理），则得 $\log_2 u > \frac{p}{500}\frac{a}{b} > \frac{p}{500}\sqrt{u}$，即 $f(u) > \frac{p}{500}$；反向取 $a^2 < u b^2$ 与 $u^{500b} < 2^{pa}$ 则证得 $f(u) < \frac{p}{500}$。结合 $u > e^2$ 上的严格递减性，下表四组最小正分母 $b$ 的纯整数证书直接确定精确单位区间 $559 < u_{\mathrm{cross}}(1, 0.386) < 560$ 与 $57 < u_{\mathrm{cross}}(\frac{1}{2}, 0.386) < 58$：

| $u$ | 最小分母 $b$ | 平方根比较 | 纯整数幂不等式 |
| ---: | ---: | :--- | :--- |
| $559$ | $59$ | $559 \cdot 59^2 < 1395^2$ | $559^{5900} > 2^{53847}$ |
| $560$ | $23$ | $544^2 < 560 \cdot 23^2$ | $560^{2875} < 2^{26248}$ |
| $57$ | $9$ | $57 \cdot 9^2 < 68^2$ | $57^{1125} > 2^{6562}$ |
| $58$ | $5$ | $38^2 < 58 \cdot 5^2$ | $58^{625} < 2^{3667}$ |

### 26.3.3.2 桥图黄金锥的隔项斐波那契边界与四割相图 {#sec-ch26-3-3-2-bridge-golden-cone-and-four-cuts}

转向 §26.3.1 的离散桥图原型，其四项正整数维数满足有序条件 $0 < a \le b$ 与 $0 < c \le d$，四道割容量依次为 $C_1 = 3ac$、$C_2 = ad$、$C_3 = bc$ 与 $C_4 = 3bd$。在锥假设 [`cone_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut) 中，两条二次约束为 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$。记纵横比 $r := b/a \ge 1$ 与 $s := d/c \ge 1$，将 $a^2 + b^2 \le 3ab$ 除以 $a^2$ 即化为 $r^2 - 3r + 1 \le 0$：因较小根 $\frac{3 - \sqrt{5}}{2} < 1$，有序锥条件恰好等价于 $1 \le r, s \le \varphi^2$，其中 $\varphi^2 = \frac{3 + \sqrt{5}}{2}$（四舍五入为 $2.618034$）正是黄金比的平方！

这条无理纵横比边界被整数斐波那契序列以单位绝对缺陷 $1$ 精确夹在两侧。定义二次多项式 $P(x, y) := x^2 + y^2 - 3xy$，直接展开即得整多项式恒等式 $P(x, x + y) = -x^2 - xy + y^2 = -P(y, x + 2y)$。取初值 $F_1 = 1, F_2 = 1, F_3 = 2$ 的斐波那契数列并令 $(x, y) = (F_k, F_{k+1})$，则有 $x + y = F_{k+2}$ 与 $x + 2y = F_{k+3}$。从 $P(1, 2) = -1$ 归纳即得对一切正整数 $k \ge 1$ 恒有 $P(F_k, F_{k+2}) = (-1)^k$：所有奇数指标隔项对 $(1, 2), (2, 5), (5, 13), \dots$ 以缺陷 $-1$ 严格落入黄金锥内，而所有偶数指标隔项对 $(1, 3), (3, 8), (8, 21), \dots$ 以缺陷 $+1$ 严格落在锥外。

同时，四道割容量之间的大小关系完全由纯有理比值 $(r, s)$ 决定。由 $a \le b$ 与 $c \le d$ 恒有 $C_4 = 3bd \ge 3\max(ad, bc) > \min(ad, bc)$，故第四割 $3bd$ 永不可能是唯一最小割；将四道割同除以 $ac > 0$，最小割比值恒等于 $\min(3, r, s)$：

$$
\begin{aligned}
P(x, y) &:= x^2 + y^2 - 3xy, \qquad P(x, x + y) = -P(y, x + 2y), \\
P(F_k, F_{k+2}) &= (-1)^k \qquad (\forall k \ge 1), \\
\frac{\min(C_1, C_2, C_3, C_4)}{ac} &= \min(3, r, s) \qquad \left(r := \frac{b}{a} \ge 1,\; s := \frac{d}{c} \ge 1\right).
\end{aligned}
$$

由此立刻分清黄金锥与四割相图的层次差异。只要 $(a, b, c, d)$ 落入黄金锥（$r, s \le \varphi^2 < 3$），必有 $C_1 = 3ac > \max(ad, bc) \ge \min(ad, bc)$，不仅推出 $\min(C_1, C_2, C_3) = \min(ad, bc)$，而且满足 `trureturing` 桥图最大流最小割定理的完整维数前提，使最大可达流秩等于 $\min(ad, bc)$。而在锥外区域，割值本身按 $(r, s)$ 与 $3$ 的比较划出三片相区：只要 $\min(r, s) < 3$（例如 $(3, 8, 3, 8)$，纵横比 $\frac{8}{3} \in (\varphi^2, 3)$），较小的外割 $\min(ad, bc)$ 仍严格低于桥割 $3ac$；当 $\min(r, s) = 3$ 时，桥割 $3ac$ 与达到最小值的外割并列（若 $r = s = 3$ 则三者同为最小）；桥割 $3ac$ 严格胜出当且仅当同时满足 $b > 3a$ 与 $d > 3c$（锥外相图只比较四道割容量本身，不自动延拓锥内的最大流等于最小割结论）。下表汇总 $1 \le a \le b \le 12$ 与 $1 \le c \le d \le 12$ 全部 $6084$ 个有序四元组的相区分类与代表见证：

| 相区 | 计数（共 $6084$） | 见证 $(a, b, c, d)$ | 四割 $(C_1, C_2, C_3, C_4)$ |
| :--- | ---: | :---: | :---: |
| 黄金锥内 | $2916$ | $(2, 3, 2, 3)$ | $(12, 6, 6, 27)$ |
| 锥外且外割胜出 | $2684$ | $(3, 8, 3, 8)$ | $(27, 24, 24, 192)$ |
| 锥外且桥外并列 | $160$ | $(1, 3, 1, 4)$ | $(3, 4, 3, 36)$ |
| 锥外且桥割胜出 | $324$ | $(1, 4, 1, 4)$ | $(3, 4, 4, 48)$ |

### 26.3.3.3 编码阈值、四门 Tseitin 双射与有限资源界 {#sec-ch26-3-3-3-encoding-threshold-tseitin-and-resources}

接下来检验 [@rem-ch30-eth-subexponential-literature] 与 [@ex-ch30-galactic-crossover-scale] 提出的多项式规约膨胀与 Tseitin 编码，并核对 §26.3.1 与 §26.3.2 引入的三项有限资源界。在细粒度复杂性理论中，Impagliazzo 与 Paturi 针对 $k\text{-SAT}$ 提出 ETH 与指数下确界 $s_k$（R. Impagliazzo & R. Paturi，*On the Complexity of $k$-SAT*，2001，pp. 367–368，[10.1006/jcss.2000.1727](https://doi.org/10.1006/jcss.2000.1727)），而稀疏化引理将任意 $n$ 变量 $k\text{-SAT}$ 公式归约为至多 $2^{\varepsilon n}$ 个稀疏 $k\text{-SAT}$ 公式的析取，每个公式的子句数为 $n$ 的线性倍（R. Impagliazzo, R. Paturi & F. Zane，*Which Problems Have Strongly Exponential Complexity?*，2001，§2，Corollary 1，p. 523，[10.1006/jcss.2001.1774](https://doi.org/10.1006/jcss.2001.1774)）。相反，若规约将自然参数 $n$ 膨胀为 $N = \alpha n^\beta$（固定 $\alpha > 0, \beta > 1$），在固定 $c > 0$ 下代入示意指数 $c\,G(N)$（其中 $G(x) := x\,f(\log_2 x)$），折算回原变量 $n$ 的有效指数率 $\widetilde{r}(n) = c\,G(N)/n$ 必然发散至 $+\infty$。例如取 $\beta = 2$、$\alpha = c = 1$，在 $n = 16, 256, 2^{16}, 2^{133}$ 处，$\widetilde{r}(n)$ 依次取为约 $16.970563$、精确整数 $256$、约 $57926.187515$ 与约 $5.378106 \times 10^{39}$。

一般地，对任意满足 $N(n) > 2$ 的编码规模函数，记临界尺度 $L(n) := \frac{n\sqrt{\log_2 n}}{\log_2\log_2 n}$。一方面，令 $u = \log_2 x > 1$，因 $\frac{d}{du}\ln G(2^u) = \ln 2 + \frac{1}{u\ln u} - \frac{1}{2u} > \ln 2 - \frac{1}{2} > 0$，函数 $G(x)$ 在 $x > 2$ 上严格递增；另一方面，对任意固定 $\lambda > 0$，由 $\log_2(\lambda L(n)) / \log_2 n \to 1$ 立得 $G(\lambda L(n)) / n \to \lambda$。将 $N(n)$ 与任意小的 $\lambda L(n)$ 双向比较，即证固定 $c > 0$ 下示意指数保持次线性增长的充要阈值（实际运行时间转移另须计入规约本身的时间开销）：

$$
\begin{aligned}
\widetilde{r}(n) &= c\alpha\,n^{\beta - 1}\,f\bigl(\log_2\alpha + \beta\log_2 n\bigr) \qquad \bigl(N = \alpha n^\beta\bigr), \\
c\,G\bigl(N(n)\bigr) = o(n) &\iff N(n) = o\bigl(L(n)\bigr), \qquad L(n) := \frac{n\sqrt{\log_2 n}}{\log_2\log_2 n}.
\end{aligned}
$$

在线性编码一端，Tseitin 变换（G. S. Tseitin，*On the Complexity of Derivation in Propositional Calculus*，1983 年英译重印，pp. 466–483，[10.1007/978-3-642-81955-1_28](https://doi.org/10.1007/978-3-642-81955-1_28)）为每道扇入至多为 $2$ 的布尔门引入一个辅助变量，并将门等价关系化为至多四条宽至多为 $3$ 的子句：与门 $z \leftrightarrow x \land y$ 写成 $3$ 条子句 $(x \lor \neg z)$、$(y \lor \neg z)$ 与 $(\neg x \lor \neg y \lor z)$，异或门 $z \leftrightarrow x \oplus y$ 则由排斥其 $4$ 组反例的 $4$ 条三文字子句给出。以全加器四门片段为例：三路输入 $(x_1, x_2, x_3)$ 决定四道门变量 $s_1 = x_1 \oplus x_2$、$\mathrm{sum} = s_1 \oplus x_3$、$c_1 = x_1 \land x_2$ 与 $c_2 = s_1 \land x_3$（两路进位项之析取 $c_1 \lor c_2$ 给出进位输出；若另设显式或门变量，则会再增 $1$ 个变量与 $3$ 条子句）。在该四门片段的全部 $7$ 个变量上，所得 $14$ 条宽至多为 $3$ 的子句在全部 $2^7 = 128$ 组赋值中恰有 $8$ 组满足赋值，与该片段的 $2^3 = 8$ 组输入向量构成双射，从而保持精确解数。

同样，前文引用的三项 `trureturing` 有限资源界均可直接核验其精确前提与取等见证。对于有限秩集中模态界，任意非负可和谱序列 $\lambda_j \ge 0$ 若满足总迹 $\sum_{j=0}^{\infty} \lambda_j = \frac{RW}{\pi}$ 且阈值 $\tau > 0$，则每个满足 $\lambda_j \ge \tau$ 的有限子集至少向总和贡献其基数倍的 $\tau$，故高权重模态集有限且基数不超过 $\frac{RW}{\pi\tau}$；在抽象标量谱 $(\frac{1}{4}, \frac{1}{4}, \frac{1}{4}, 0, \dots)$ 与参数 $(R, W, \tau) = (\pi, \frac{3}{4}, \frac{1}{4})$ 处，左右两端同为 $3$ 而精确取等。对于有限记忆历史容量定理，在 $N$ 个迹为 $1$ 的 $d \times d$ 半正定矩阵态 $\rho_i$ 配有完美区分 POVM 算子 $E_j$（满足 $\sum_j E_j = I$ 与 $\operatorname{Tr}(E_j\rho_i) = \delta_{ij}$）的前提下，必有 $N \le d$，且在计算基态与其秩一投影测量上精确取等 $N = d$。

第三项是开放可积电路最小深度定理：在前提 $1 \le \kappa$ 与 $2\kappa \le N$ 下，$D_{\min}(N, \kappa) = \lfloor N/(\kappa + 1)\rfloor + 1$。在从 $0$ 到 $N$ 的路径上，相邻门的冲突产生 $N$ 条连续边，每条边按右端点是否入选 $\kappa$ 个选定位置而定向，而长度为 $m$ 的同向有向边链至少需要 $m + 1$ 层。将 $N - \kappa$ 条未选边分配到 $\kappa + 1$ 段被 $\kappa$ 条选中边隔开的间隔中，最长未选边链至少为 $\lceil (N - \kappa)/(\kappa + 1)\rceil = \lfloor N/(\kappa + 1)\rfloor$；同时由 $2\kappa \le N$ 得 $N - \kappa \ge \kappa > \kappa - 1$，足以使全部 $\kappa - 1$ 个内部间隔皆非空，从而把每条选中边孤立为长度为 $1 \le \lfloor N/(\kappa + 1)\rfloor$ 的单边，使平衡放置精确达到下界 $\lfloor N/(\kappa + 1)\rfloor + 1$（配套脚本已对全部允许对 $(N, \kappa)$（$2 \le N \le 12$）独立复核最早层调度）。

### 26.3.3.4 有限语义对角线实例与规范审读边界 {#sec-ch26-3-3-4-finite-semantic-diagonal-instance}

最后把 §26.3.2 末尾关于形式内核复核与顶层规约审计的认识论边界落到一个四元有限实例上。在有限坐标空间 $\mathrm{Fin}\,4 = \{0, 1, 2, 3\}$ 上，取恒等潜映射 $\mathrm{id}$、无不动点循环扭转 $\operatorname{twist}(v) = (v + 1) \bmod 4$，以及由四行循环移位组成的解码器目录 $(0, 1, 2, 3)$、$(1, 2, 3, 0)$、$(2, 3, 0, 1)$ 与 $(3, 0, 1, 2)$。读取四行在各自对角下标处的输出得对角序列 $(0, 2, 0, 2)$，经 $\operatorname{twist}$ 逐位偏移后得到相对语义对角目标轮廓 $(1, 3, 1, 3)$。对每个目录地址 $i \in \{0, 1, 2, 3\}$，该目标在坐标 $i$ 处的值均严格异于第 $i$ 行解码器，具体实例化了前文引用的相对语义对角分离定理。

这里必须同时守住两道界限。一方面，在函数空间 $\mathrm{Fin}\,4 \to \mathrm{Fin}\,4$ 全部 $4^4 = 256$ 个可能映射中，上述四行目录仅涵盖 $4$ 行，而前文同模块的目标不充分性定理要求目录满射枚举全部 $256$ 个解码器，因此单个有限清单的逃逸与满射前提下的不充分性分属不同强度的命题。另一方面，正如前文 [@rem-ch30-eth-subexponential-literature] 与 [@conj-p-neq-np] 所划定的边界，本小节的交叉曲线、四割相图、编码阈值与有限对角实例均只刻画给定数学模型内部的结构性质，既不构成对外部 3-SAT 预印本的独立审计，也不判定 ETH 或 $P$ vs. $NP$。

**证据边界与配套档案（`ARGUED` / `NUM`）。** 本小节书面论证（`ARGUED`）确立朗伯 $W_{-1}$ 交叉公式、弹性下界与纯整数幂夹逼归约，桥图黄金锥纵横比 $\varphi^2$、隔项斐波那契缺陷恒等式与四割相区划分，次线性编码规模阈值，以及三项有限资源界的取等见证与间隔计数论证。外部复杂性与算法背景援引上列五篇文献；§26.3.1 与 §26.3.2 所引七条 `trureturing` 声明均在 `origin/dev` 上核对过精确类型与前提。

配套计算复核（Python 数值核验与无显式导入的独立 Lean 辅助校验）均不计入本书所钉 `trureturing` 账本的定理计数，而是作为 `NUM` 证据由 `loning` 存于[议题 #1233](https://github.com/the-omega-institute/trureturing-books/issues/1233) 关联的[固化校验档案](https://gist.github.com/loning/4b941a0aed0a9fc0610e212430f8ea34/5a7e57d3b9e8723246f39529d28e4845823a6d51)：

- [`verify_cycle21_eth_horizon.py`](https://gist.githubusercontent.com/loning/4b941a0aed0a9fc0610e212430f8ea34/raw/5a7e57d3b9e8723246f39529d28e4845823a6d51/verify_cycle21_eth_horizon.py)：生成全部 $43$ 组在 $256$ 位与 $320$ 位工作精度下严格嵌套的 Arb 区间包络，并复核最小分母 $b$、$6084$ 组桥图四割分类、允许对 $(N, \kappa)$（$2 \le N \le 12$）的最早层调度与 $256$ 组抽象谱测试；
- `cycle21_eth_horizon_cone_tseitin_check`（[`eth_horizon_cone_tseitin_check.lean`](https://gist.githubusercontent.com/loning/4b941a0aed0a9fc0610e212430f8ea34/raw/5a7e57d3b9e8723246f39529d28e4845823a6d51/eth_horizon_cone_tseitin_check.lean)）：核验十二条整数交叉检查（两条整幂恒等式与十条严格不等式）、$1 \le k \le 20$ 隔项斐波那契恒等式、全部 $6084$ 组桥图四割分类、四门 Tseitin 片段全部 $128$ 组赋值中 $8$ 组满足赋值与 $8$ 组输入的双射，以及 `Fin 4` 对角逃逸实例；
- Lean 校验文件 SHA-256：`48e94139dd220aca1c560683f284167eef1cfe2bcaad57d209d23c6bf9157571`；
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/4b941a0aed0a9fc0610e212430f8ea34/raw/5a7e57d3b9e8723246f39529d28e4845823a6d51/SHA256SUMS)：SHA-256 为 `d5df1a06e111ac40b0c03fce8f071d7ec3d9acbea5636b90fb4fc3cdf37214dd`。

离散布尔编码、桥图低秩割与视界尺度的定量刻画至此收束，它们共同说明全局约束的压缩瓶颈如何受控于有限维代数秩与编码尺度的精确阈值。带着这组“导向场与见证线”的定量对照，下文 [§26.4](ch30-s04-navier-stokes.md#sec-coda-navier-stokes-and-p-vs-np) 转向连续流体场，检验同一对几何角色如何在不可压缩纳维—斯托克斯方程的兰姆双向量分解与三维涡管拉伸中重现。

---

