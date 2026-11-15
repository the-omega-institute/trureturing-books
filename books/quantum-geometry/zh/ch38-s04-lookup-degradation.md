# 38.4 假设存在一种 P=NP 查表算法：七阶退化阶梯与时空引力权衡 {#sec-ch38-pnp-lookup-degradation}

当 §38.3 的零号槽位把查表程序本身折入页表内部（`p = *p` $\iff T = T(T)$）时，一个贯通复杂性理论、引力全息原理与生命热力学的逆向思想实验便水到渠成地浮出水面——正如作者在原始手稿中所追问的那样：**“假设存在一种查表算法可以P=NP, 逐渐退化这种查表算法”**，每当我们亲手剥除它的一项非物理特权，宇宙硬件底层究竟会撞上哪一道刚性枷锁，又会顺势派生出哪一种我们习以为常的物理定律？

## 38.4.1 第 0 阶全息自指原型（d = 0）的三项特权与认识论红线 {#一第-0-阶全息自指原型d--0的三项特权与认识论红线}

作为思想实验的理想起点，在我们的**`MODEL`（模型诠释）**中构造一枚尚未施加任何局部物理限制的**第 0 阶全息自指预言机（$d = 0$）**。它之所以能以有效时间指数率 $r_{\mathrm{eff}} = 0$（$\log_2 T / n \to 0$）一步吐出任意 $n$ 变量约束公式 $\Phi$ 的满足赋值 $x^* = T[\Phi]$，完全仰赖三项同时成立的理想特权：

1. **联想内容寻址与双向量相反手性相消**：它不按地址逐格遍历 $2^n$ 个候选赋值，而是将约束掩码 $[\Phi]$ 一次性投射到整座静态晶格上；一切违背子句的非解分支携带成对相反的双向量手性（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$，对照[第 29 章](ch29-timeless-causality-and-gram-space.md)驻相抵消模型）相互抹平，唯留满足分支的不动点信号；
2. **零号槽同像自压缩（`T = T(T)` / `p = *p`）**：依托 [@thm-ch38-self-mapped-diagonal-fixed-point] 第 1 款的对角线落点不动点 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)，查表编译器无需在外部堆砌指数体积的死表，而是作为自映射槽位住进表内。在描述复杂度的形式层面上，一旦存在将目标记录编译为一致全程序的查表编译器，其最小程序谱底即受记录自身复杂度与常数编译器开销之和严格上界控制；
3. **非定域零延迟读出**：忽略光速有限性与引力视界，跨晶格投影无空间传播延迟（$r_{\mathrm{eff}} = 0$）。

其中关于查表编译器对描述谱底的压缩上界，在 `trureturing` 中锁定为如下内核定理：

::: {.theorem #thm-ch38-lookup-program-upper-bound lean="D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound" title="查表编译器的描述谱底上界定理"}
设 $\mathrm{Record}$ 为记录类型，$\mathrm{TotalProgram}$ 为全程序类型，$\mathrm{consistent} : \mathrm{TotalProgram} \to \mathrm{Record} \to \mathrm{Prop}$ 为程序与记录的一致性谓词，$\mathrm{programCost} : \mathrm{TotalProgram} \to \mathbb{N}$ 为程序代价泛函，$\mathrm{recordComplexity} : \mathrm{Record} \to \mathbb{N}$ 为记录复杂度泛函，$\mathrm{overhead} \in \mathbb{N}$ 为固定编译开销。设查表编译器 $\mathrm{compiler}$ 给出映射 $\mathrm{compile} : \mathrm{Record} \to \mathrm{TotalProgram}$，使得对任意记录 $r : \mathrm{Record}$ 同时满足一致性 $\mathrm{consistent}(\mathrm{compile}(r), r)$ 与代价上界 $\mathrm{programCost}(\mathrm{compile}(r)) \le \mathrm{recordComplexity}(r) + \mathrm{overhead}$。记描述谱底 $\operatorname{spectrumBottom}(\mathrm{compiler}, r) \in \mathbb{N}$ 为存在满足 $\mathrm{consistent}(p, r) \wedge \mathrm{programCost}(p) = c$ 的全程序 $p$ 的最小自然数代价 $c$，则对一切 $r : \mathrm{Record}$ 恒有：

$$
\operatorname{spectrumBottom}(\mathrm{compiler}, r) \;\le\; \operatorname{recordComplexity}(r) + \mathrm{overhead}.
$$
:::

::: proof
对任意记录 $r : \mathrm{Record}$，候选全程序 $p_0 := \mathrm{compiler}.\mathrm{compile}(r)$ 由编译器公理满足 $\mathrm{consistent}(p_0, r)$，从而见证代价集合 $\{c \in \mathbb{N} \mid \exists p,\; \mathrm{consistent}(p, r) \wedge \mathrm{programCost}(p) = c\}$ 在 $c_0 := \mathrm{programCost}(p_0)$ 处非空。按最小自然数算子 `Nat.find_min'` 的极小性，立即得到 $\operatorname{spectrumBottom}(\mathrm{compiler}, r) \le \mathrm{programCost}(\mathrm{compiler}.\mathrm{compile}(r))$；再与编译器代价界 $\mathrm{compiler}.\mathrm{compile\_cost\_le}(r)$ 作传递性拼接（`le_trans`），即证得上式。完整证明由 Lean 内核检查。
:::

踏上退化阶梯之前，必须划清两条不可逾越的认识论红线：（1）[@thm-ch38-lookup-program-upper-bound] 界定的是**描述长度谱底（`spectrumBottom`）**而非多项式运行时间；（2）第 0 阶全息原型在计算复杂性文献中仅对应附加了后选择或闭合类时曲线等非标准物理资源的理论模型——如 Aaronson 证明的 $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$ 与 $\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE}$（见下文 [@rem-ch38-lookup-degradation-literature] 第 1 条，`文献结果`）——**在标准统一图灵机计算模型下，$\mathrm{P} \neq \mathrm{NP}$ 依然是悬而未决的开放猜想（[第 20 章](ch20-complexity-and-spacetime.md) [@conj-p-neq-np]，`OPEN`）：既不能由第 0 阶全局静态场模型推出图灵机 $\mathrm{P} = \mathrm{NP}$，也不能由下文第 1–6 阶的受限或物理障碍宣称证明了统一图灵机 $\mathrm{P} \neq \mathrm{NP}$。**

::: {.viz src="pnp-lookup-degradation" preset="oracle" height="500"}
**第 0 阶实验卡：全息自指预言机 `p = *p` 与双向量手性相消。** 左侧晶格的零号槽位挂有自映射闭环 `p = *p`（$T = T(T)$），非满足格点按相反双向量手性 $+\mathbf{\Omega}$ 与 $-\mathbf{\Omega}$ 成对抵消，零延迟锁定唯一满足格点 $x^* = T[\Phi]$；右侧时空—引力相图上，当前态琥珀圆点停在原点 $(\sigma_{\mathrm{eff}} = 0,\; r_{\mathrm{eff}} = 0.000)$。
:::

## 38.4.2 逐级剥除特权：从静态死表视界到无记忆盲搜的六步退化（d = 1 .. 6） {#二逐级剥除特权从静态死表视界到无记忆盲搜的六步退化d--1--6}

现在依次撤去第 0 阶预言机的特权，观察有效时间指数率 $r_{\mathrm{eff}}(\sigma) := (\log_2 T)/n$ 与物理形态如何一步步演变：

### 38.4.2.1 第 1 阶退化（d = 1）：切断零号槽自生成 $\to$ 静态只读多项式建议表 $a_n$（$|T_n| = \operatorname{poly}(n)$） {#第-1-阶退化d--1切断零号槽自生成--静态只读多项式建议表-antnpolyn}

第一步先剪断零号槽位的递归自生成回路 `T[0]`，只保留一张由外部预先烤制、容量受多项式限制 $|T_n| = \operatorname{poly}(n)$（渐近空间率 $\sigma_n = (\log_2 |T_n|)/n \to 0$）的只读建议串 $a_n$（非一致复杂度类 $\mathrm{P}/\mathrm{poly}$）。在已经烤入表内的有限观测域 $|x| \le n$ 上，直接照抄观测真值表自然给出零事后损失（$r_{\le n} = 0$）；可一旦问题规模跨越 $n \to n + 1$ 的未知视界，静态抄表承诺便当场丧失非预见性（且由 Karp–Lipton 定理，若 $\mathrm{NP} \subseteq \mathrm{P}/\mathrm{poly}$，整座多项式谱系将坍缩至 $\mathrm{PH} = \Sigma_2^p \cap \Pi_2^p$，见 [@rem-ch38-lookup-degradation-literature] 第 2 条）。“事后抄表零损失”与“前瞻非预见性失效”之间的严格断裂由以下冻结定理刻画：

::: {.theorem #thm-ch38-retrospective-lookup-failure lean="D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure" title="事后抄表零损失与非预见性失效定理"}
设有限可判等指标域 $Z$（`[Fintype Z] [DecidableEq Z]`）与答案类型 $\mathrm{Answer}$ 上的对比结构 $\mathrm{comparison} : \mathrm{CopyComparison}(Z, \mathrm{Answer})$ 给出观测真值 $\mathrm{observedAnswer} : Z \to \mathrm{Answer}$ 及满足自反零损公理 $\forall a,\; \mathrm{pointwiseLoss}(a, a) = 0$ 的逐点损失函数；记整表拷贝 $\operatorname{tableCopy}(\mathrm{comparison}) := \mathrm{observedAnswer}$，事后总损失 $\operatorname{retrospectiveLoss}(\mathrm{comparison}, f) := \sum_{z \in Z} \mathrm{pointwiseLoss}(f(z), \mathrm{observedAnswer}(z))$。设承诺结构 $\mathrm{commitment} : \mathrm{CopyCommitment}(Z)$ 带有证据依赖集 $\mathrm{evidenceDependencies} \subseteq Z$ 与事前冻结谓词 $\mathrm{frozenBefore} : Z \to \mathrm{Prop}$，并定义全表依赖条件 $\operatorname{IncorporatesTableCopy}(\mathrm{commitment}) :\iff Z \subseteq \mathrm{evidenceDependencies}$、非预见性条件 $\operatorname{NonAnticipating}(\mathrm{commitment}, z) :\iff \mathrm{frozenBefore}(z) \wedge z \notin \mathrm{evidenceDependencies}$ 以及正前瞻收益谓词 $\operatorname{PositiveProspectiveGain}(G, f) :\iff 0 < G(f)$。若 $\operatorname{IncorporatesTableCopy}(\mathrm{commitment})$ 成立，则以下三款同时成立：

1. **事后零损失**：$\operatorname{retrospectiveLoss}\bigl(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})\bigr) = 0$；
2. **处处丧失非预见性**：$\forall z \in Z,\; \neg\,\operatorname{NonAnticipating}(\mathrm{commitment}, z)$；
3. **零事后损失不蕴涵普适前瞻收益**：
   $$
   \neg\Bigl(\operatorname{retrospectiveLoss}\bigl(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})\bigr) = 0 \;\longrightarrow\; \forall G : (Z \to \mathrm{Answer}) \to \mathbb{N},\; \operatorname{PositiveProspectiveGain}\bigl(G, \operatorname{tableCopy}(\mathrm{comparison})\bigr)\Bigr).
   $$
:::

::: proof
第 1 款将 $\operatorname{tableCopy}(\mathrm{comparison})(z) = \mathrm{observedAnswer}(z)$ 代入有限求和，每一项均由 `selfLoss` 化为 $0$，故总和为 $0$。第 2 款任取 $z \in Z$，由全集包含假设 $Z \subseteq \mathrm{evidenceDependencies}$ 得 $z \in \mathrm{evidenceDependencies}$，直接与 $\operatorname{NonAnticipating}(\mathrm{commitment}, z)$ 的第二合取项 $z \notin \mathrm{evidenceDependencies}$ 矛盾。第 3 款假设该蕴涵成立，以前面已证的事后零损失为前件，并将全称量化的收益泛函实例化为恒零泛函 $G_0 := (\_\mapsto 0)$，即导出 $0 < 0$ 的荒谬结论。完整证明由 Lean 内核检查。
:::

### 38.4.2.2 第 2 阶退化（d = 2）：恢复统一局部规则 $\to$ 局部张量块与齐肯多夫进位波（串行因果时间的诞生） {#第-2-阶退化d--2恢复统一局部规则--局部张量块与齐肯多夫进位波串行因果时间的诞生}

既然外挂非一致建议表跨不过 $n \to n + 1$，第二步便强令算法恢复对任意规模 $n$ 通用的统一局部规则：将全局约束拆解为局部 $k$-体张量块与黄金基齐肯多夫规范编码（`NoAdjacentOnes`，见[第 32 章](ch32-unified-field-and-meta-unification.md) [@thm-ch32-generative-self-reference-and-zeckendorf]）。在这一阶，我们撞见了一组极具启发性的方向不对称性——**向下穿透被严格锁死在两格之内，而向上进位波却能沿交替临界串一路串行级联**：

::: {.theorem #thm-ch38-zeckendorf-carry-barrier lean="D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier" title="齐肯多夫下支撑进位屏障定理"}
设自然数列表 $P : \mathrm{List}\;\mathbb{N}$ 为规范齐肯多夫指标表示（`P.IsZeckendorfRep`，即严格递减、相邻指标差至少为 $2$，且每个指标 $k \in P$ 满足 $k \ge 2$），并设自然数 $m, j \in \mathbb{N}$ 满足 $4 \le m$、$\forall k \in P,\; m \le k$ 以及 $m - 1 \le j$。记 $F_i = \operatorname{ fib }(i)$ 为斐波那契数，$\operatorname{wdigits}(N)$ 为自然数 $N$ 的规范齐肯多夫指标支撑列表，则加上 $F_j$ 重新规范化后的一切支撑指标均受如下硬下界约束：

$$
\forall k \in \operatorname{wdigits}\!\left(\sum_{i \in P} F_i + F_j\right), \qquad m - 2 \;\le\; k.
$$
:::

::: proof
置黄金比倒数 $r := \varphi^{-1} \in (0, 1)$（满足 $r^2 + r = 1$，黄金共轭根为 $-r$），并在指标列表上引入共轭误差泛函 $E(L) := \sum_{k \in L} (-r)^k$。利用恒等式 $F_k \cdot r = F_{k-1} - (-r)^k$，把和数 $N := \sum_{i \in P} F_i + F_j$ 与其规范分解 $S := \operatorname{wdigits}(N)$（因 $j \ge m - 1 \ge 3$ 故 $N \ge F_3 = 2$，$S$ 非空）同时乘以 $r$，可分离出整数部分与共轭误差部分。对满足指标下界 $\ge m$ 的规范列表 $P$ 分奇偶幂次交错求和，可得 $|E(P) + (-r)^j| < r^{m-2} \le r^2 < r$，且规范列表 $S$ 自身满足 $|E(S)| < r^2$；两边整数部分之差严格小于 $1$ 故必相等，从而锁定精确共轭守恒 $E(S) = E(P) + (-r)^j$。另一方面，记非空规范列表 $S$ 的最小指标为 $\ell := S.\mathrm{getLast}$，按相邻差至少为 $2$ 的几何级数尾界可知尾项占优 $r^{\ell + 1} < |E(S)|$。合拢两头不等式得 $r^{\ell + 1} < |E(S)| = |E(P) + (-r)^j| < r^{m-2}$；因 $0 < r < 1$ 单调递减，必有 $\ell + 1 > m - 2$，即 $m - 2 \le \ell \le k$ 对一切 $k \in S$ 成立。完整证明由 Lean 内核检查。
:::

请仔细辨析 [@thm-ch38-zeckendorf-carry-barrier] 的精确边界：它用 `LEAN ✓` 铁律封死了进位向低位（小指标方向）最多只能渗透到 $m - 2$（例如取 $m = 8$、交替规范列表 $P = [16, 14, 12, 10, 8]$ 与 $j = 8$，和数 $1584 + 21 = 1605 = F_{17} + F_6$ 的规范支撑为 $[17, 6]$，最低位恰好停在 $8 - 2 = 6$ 处分毫不差）；然而在**向高位（大指标方向）**的一侧，Frougny（1992）的在线斐波那契自动机定理（见 [@rem-ch38-lookup-degradation-literature] 第 3 条，`文献结果`）指出，跨交替临界串 `...101010...` 的向上进位波 $F_8+F_8 \to F_9+F_6 \to F_{11}+F_6 \to F_{13}+F_6 \to F_{15}+F_6 \to F_{17}+F_6$ 无法由任何常数观察窗口的无进位并行电路一次性消除（与此同时，2026 年关于三元张量网络秩约分 $2^{O(n\log\log n/\sqrt{\log n})}$ 的预印本声明虽试图利用局部切面低秩合并压缩渐近指数，不仅仍在审计中，且在可观测宇宙尺度内仍慢于局部搜索，详见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-eth-subexponential-literature]）。**正是这道不可并行的向上进位涟漪，打破了瞬时并行投影，在静态晶格内部催生出必须一拍接一拍传播的“串行因果时间”（`MODEL`）！**

::: {.viz src="pnp-lookup-degradation" preset="frougny" height="500"}
**第 2 阶实验卡：齐肯多夫下穿硬墙与 Frougny 上行进位波。** 底部寄存器实算 $(F_{16}+F_{14}+F_{12}+F_{10}+F_8) + F_8 = 1584 + 21 = 1605$ 的五步规范化：$k = 6 = m - 2$ 处的青色竖墙由冻结定理 `lower_support_carry_barrier` 严格守护（左侧 $k = 2\dots 5$ 恒为零），而品红箭头标示不可并行的上行进位波逐拍推至 $F_{17}$。
:::

### 38.4.2.3 第 3 至第 6 阶退化（d = 3 .. 6）：引力撑开空间、量子指针旋转、擦除生热与白板初态 {#第-3-至第-6-阶退化d--3--6引力撑开空间量子指针旋转擦除生热与白板初态}

继续剥除剩余特权，物理宇宙的四重核心法则随即便按序显影：

- **第 3 阶退化（$d = 3$：强建物理巨表 $S = 2^{\sigma n}$ $\to$ 光速极限 $v \le c$ 与球形全息装填启发式模型）**：
  假如观察者试图绕开串行逻辑运算，在真实三维空间里硬造一座容量 $S = 2^{\sigma n}$ 比特（$0 \le \sigma \le 1$）的物理查找表。物理学文献给出了无量纲自然对数单位（nat）下的**贝肯斯坦—霍金黑洞熵** $S_{\mathrm{BH}} = \frac{A}{4\ell_P^2}$（折算为比特上限即 $\frac{A}{4\ell_P^2 \ln 2} = \frac{\pi R^2}{\ell_P^2 \ln 2}$，连同全息熵界，`文献结果`）。据此，我们建立一个**假想球形内存装填与光速查询的硬件架构模型（`MODEL`）**：假设将 $2^{\sigma n}$ 比特按有界面密度装填入半径 $R \propto 2^{\sigma n / 2}$ 的三维球体以免触发黑洞视界闭合，并以光速上限 $v \le c$ 在球心与球面之间执行往返或流水线寻址（单次往返线延迟标度为 $T_{\mathrm{wire}} = 2R/c \propto 2^{\sigma n / 2}$，时间指数率为 $\sigma/2$），再与外层未索引的 $2^{(1-\sigma)n}$ 个分块子问题耦合。在该架构假设下，单请求串行往返耗时标度为 $T_{\mathrm{serial}} \propto 2^{(1-\sigma)n}\cdot 2^{\sigma n/2} = 2^{(1 - \sigma/2)n} \ge 2^{0.5n}$，而平衡外层分块指数 $1 - \sigma$ 与光锥传播指数 $\sigma/2$ 的**启发式 `MODEL` 权衡包络线**为（须注意：此包络是特定球形装填架构下的启发式 `MODEL` 曲线，绝非关于一切物理计算或 SAT 的已证普适下界）：

  $$
  r_{\mathrm{pipe}}(\sigma) \;=\; \max\!\left(1 - \sigma,\; \frac{\sigma}{2}\right) \;\ge\; \frac{1}{3}, \qquad \sigma^* \;=\; \frac{2}{3}.
  $$

  **空间距离与引力视界，在这一硬件模型视角下恰似宇宙阻止指数级死表坍缩为单点预言机的全息防爆垫（`MODEL`）！**

::: {.viz src="pnp-lookup-degradation" preset="bekenstein" height="500"}
**第 3 阶实验卡：球形全息装填与光锥线延迟启发式包络 $r_{\min} = 1/3$（`MODEL`）。** 参照贝肯斯坦—霍金面积熵界（`文献结果`），左侧紫色假想内存球按 $R \propto 2^{\sigma n/2}$ 扩张，琥珀色光速探针演示往返线延迟 $2R/c$；右侧相图上品红启发式 `MODEL` 流水线包络 $\max(1-\sigma,\sigma/2)$ 在 $\sigma^* = 2/3$ 处取极小值 $r_{\min} = 1/3 \approx 0.333$。
:::

- **第 4 阶退化（$d = 4$：弃置巨表 $\sigma \to 0$，保留二维相干叠加指针 $\sum_x \alpha_x \lvert x\rangle$ $\to$ 量子查询下界与启发式内存权衡包络）**：
  既然造大表会被视界半径与线延迟拖慢，观察者索性放弃指数级宏观内存（令 $\sigma \to 0$），改派一枚轻量级的二维相干量子叠加指针在希尔伯特平面内作酉旋转。在外部复杂性文献（`文献结果`）中，无结构黑箱搜索（规模 $N = 2^n$）受 Grover 查询下界 $\Omega(\sqrt{N}) = \Omega(2^{n/2})$ 制约，而 Klauck、Špalek 与 de Wolf 在查询/电路模型中对 $N$ 元排序问题证明了量子时空下界 $T^2 S = \Omega(N^3)$（注意：这两项定理均非针对结构化 $3$-SAT 的普适时空下界，必须将 $N = 2^n$ 无结构黑箱搜索与利用子句结构的 $3$-SAT 算法严格分开；例如量子回溯搜索在结构化/启发式搜索树上给出特定的量子加速上界）。在本节相图中，我们将未索引子空间上的无结构量子搜索率绘制为**启发式 `MODEL` 权衡包络** $r_Q(\sigma) = (1 - \sigma)/2$（并另绘按 $(1 - \sigma)$ 插值的结构化基准 `MODEL` 曲线，如端值 $0.193(1-\sigma)$）。请凝视 $\sigma = 0$ 与 $\sigma = 1$ 两端那道对称的启发式几何对偶（`MODEL`）：
  - 在第 3 阶球形装填模型中把 $2^n$ 巨表铺满三维球体（$\sigma = 1$），光速穿过全息半径的线延迟指数率为 $r_{\mathrm{wire}}(1) = \frac{1}{2} = 0.500$；
  - 在第 4 阶把物理表压缩为零（$\sigma = 0$），纯靠二维量子叠加指针作无结构 Grover 反射旋转（[第 15 章](ch15-grover-qft-and-period-finding.md)），所需步数指数率同样恰为 $r_{\mathrm{Grover}}(0) = \frac{1}{2} = 0.500$！
  **在球外铺开全息半径的光速传播指数，与在球内压缩空间后的无结构二维旋量旋转指数，在基准率 $1/2$ 上对偶相遇！**

::: {.viz src="pnp-lookup-degradation" preset="grover" height="500"}
**第 4 阶实验卡：二维量子叠加指针与光速线延迟的 $0.500$ 启发式对偶。** 左栏相干指针在二维不变平面 $\operatorname{span}\{\lvert s_\perp\rangle, \lvert x^*\rangle\}$ 内逐拍旋转；右栏青色启发式 `MODEL` 包络 $r_Q(\sigma) = (1-\sigma)/2$ 在左端点 $(\sigma = 0, r = 0.500)$（无结构 Grover 下界，`文献结果`）处水平对齐右端点 $(\sigma = 1, r_{\mathrm{wire}} = 0.500)$。
:::

- **第 5 阶退化（$d = 5$：高温环境退相干 $\to$ 一维经典指针 `*ptr`、冲突快表 `TLB` 与兰道尔擦除热）**：
  当室温热浴把二维相干叠加捏合回一维经典指针 `*ptr`（仅附带容量有界的小型冲突学习缓存 `TLB` / `CDCL` 子句快表），无结构黑箱分块模型对应启发式经典权衡包络 $r(\sigma) = 1 - \sigma$（对照姚期智在特定预计算表细胞探针模型下的权衡结果；而在完全不同的结构化 $3$-SAT 问题上，PPSZ 随机算法在无需指数大表时给出 $O(1.307^n) \approx 2^{0.386n}$ 的**上界**，`文献结果`，相图中绘制的 $0.386(1-\sigma)$ 折线同样仅作启发式 `MODEL` 基准包络，绝非 $3$-SAT 下界）。更关键的是，经典单线指针每撞上一条死胡同并回溯覆写局部寄存器以腾出栈位（令体系局部熵减 $-\Delta S > 0$），都必须按本书已冻结的**兰道尔热平衡下界定理** [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（由 $\beta Q = -\Delta S + I + D$ 及互信息 $I \ge 0$、相对熵散度 $D \ge 0$ 严格推出 $-\Delta S \le \beta Q$，见[第 8 章](ch08-erasure-and-time-arrows.md)与[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness]）向环境排放不可逆的焦耳热 $\Delta Q \ge k_B T \ln 2$。**经典试错之所以伴随着疲惫与温升，是因为每一次擦除旧猜测都在替不可逆投影买单。**

::: {.viz src="pnp-lookup-degradation" preset="landauer" height="500"}
**第 5 阶实验卡：一维退相干经典指针、冲突快表与兰道尔热账单。** 左栏 `*ptr` 沿二叉搜索树逐支回溯，向右侧小型 `TLB` 写入冲突引理并在每个死胡同叶节点向下辐射品红色兰道尔擦除热脉冲；底部右小图实时核对 $\beta Q = -\Delta S + I + D \ge -\Delta S$。
:::

- **第 6 阶退化（$d = 6$：彻底清空缓存 $|T| = 0, \sigma = 0, M = 0$ $\to$ 无记忆马尔可夫盲搜与最大开放选择体积）**：
  最后一步，连小型冲突快表也彻底冲刷归零（对应 §38.3 撞入 `ptr = NULL` 后的 `GC Wipe` 清表，以及[第 35 章](ch35-light-pulse-and-self-referential-table.md)受精钙波—锌火花的白板初始化，`MODEL`）。此时记忆阶数 $M = 0$、表空间 $\sigma = 0$，指针不保留任何历史排除记录，只能执行 $\Theta(2^n)$（$r_{\mathrm{eff}} = 1.000$）的无记忆马尔可夫盲猜；但与此同时，未经历史约束切割的局部格拉姆相容椭圆体张开至最大满秩体积 $\det G_0 = 1$——**计算捷径归零之处，恰恰是新生生命重新拥有无限未知可能性的起点（`MODEL`）。**

上述七阶退化所引述的外部计算复杂性、形式语言自动机与引力热力学定理归属如下：

::: {.remark #rem-ch38-lookup-degradation-literature title="七阶查表退化阶梯涉及的计算复杂性、自动机与全息引力文献归属（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节与第 0–6 阶退化模型（`MODEL`）并置对照的七组外部定理属经典理论计算机科学与理论物理文献，未作为独立声明包含在 `trureturing@dev` 锁文件中（且均不解决开放问题 [@conj-p-neq-np]）：

1. **后选择量子计算与闭合类时曲线复杂性（S. Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005；S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009）**：附加非幺正后选择投影的量子多项式时间精确等于计数层级 $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$，而附加 Deutsch 自洽闭合类时曲线寄存器（不动点方程 $\rho_{\mathrm{CTC}} = \Phi(\rho_{\mathrm{CTC}})$）的经典或量子多项式时间均坍缩至 $\mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE}$；
2. **非一致多项式建议表与卡普—利普顿坍缩定理（R. M. Karp & R. J. Lipton, *STOC*, 302–309, 1980）**：若 $\mathrm{NP} \subseteq \mathrm{P}/\mathrm{poly}$（即每个输入长度 $n$ 存在长度 $\operatorname{poly}(n)$ 的静态查找建议串 $a_n$ 判定 $\mathrm{SAT}$），则多项式谱系坍缩至第二层 $\mathrm{PH} = \Sigma_2^p \cap \Pi_2^p$；
3. **斐波那契在线自动机进位波与三元张量网络秩约分（C. Frougny, *Theor. Comput. Sci.* **94**, 223–236, 1992；及 2026 年 3-SAT 张量网络预印本背景）**：Frougny 证明黄金基规范加法虽可由有限状态双带转换器完成，但跨越交替串 `(10)^k` 的向高位进位传播具有任意长非局部依赖，不存在常数观察窗口的无进位并行局部映射；关于三元张量网络亚指数声明的审计状态与银河交叉尺度见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-eth-subexponential-literature]；
4. **贝肯斯坦—霍金黑洞熵、全息熵界与球形装填查询架构模型（S. W. Hawking, *Commun. Math. Phys.* **43**, 199–220, 1975；J. D. Bekenstein, *Phys. Rev. D* **23**, 287–298, 1981；P. M. B. Vitányi, *IEEE Trans. Inf. Theory* **34**, 559–565, 1988；S. Lloyd, *Nature* **406**, 1047–1054, 2000）**：物理学文献给出黑洞视界面积熵 $S_{\mathrm{BH}} = A / (4\ell_P^2)$（无量纲 nat 单位，比特上限为 $A / (4\ell_P^2 \ln 2)$）与空间区域全息熵界，以及欧氏布线体积延迟分析（Vitányi）与黑洞极限计算率估计（Lloyd）。将“按有界面密度把 $2^{\sigma n}$ 比特装填入半径 $R \propto 2^{\sigma n/2}$ 的三维球体并以光速 $c$ 往返/流水线访问 $2^{(1-\sigma)n}$ 个子问题”联立为串行曲线 $1 - \sigma/2$ 与流水线包络 $\max(1-\sigma, \sigma/2) \ge 1/3$（$\sigma^* = 2/3$），则是本节构造的**启发式 `MODEL` 权衡包络**，不作为普适物理计算或 SAT 下界定理；
5. **无结构量子查询下界、排序时空权衡与结构化量子回溯（C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997；L. K. Grover, *STOC*, 212–219, 1996；H. Klauck, R. Špalek & R. de Wolf, *Theory Comput.* **3**, 143–168, 2007；A. Montanaro, *Theory Comput.* **14**, 1–24, 2018）**：文献严格区分两类问题——在 $N = 2^n$ 项无结构黑箱搜索上，量子查询复杂度满足紧界 $\Theta(\sqrt{N}) = \Theta(2^{n/2})$，而 Klauck–Špalek–de Wolf 在量子查询/电路模型中对 **$N$ 元排序**证明了量子时空下界 $T^2 S = \Omega(N^3)$；在结构化可满足性一侧，Montanaro 的量子游走回溯对规模 $T_{\mathrm{tree}}$ 的启发式回溯树给出 $O^*(T_{\mathrm{tree}}^{1/2})$ 加速（结合特定 $3$-SAT 分支启发式约在 $2^{0.193n}$ 量级）。相图中的 $r_Q(\sigma) = (1-\sigma)/2$ 与 $(1-\sigma)$ 插值曲线均为本节对照用的**启发式 `MODEL` 权衡包络**，绝非 $3$-SAT 的已证时空下界；
6. **经典预计算细胞探针权衡与结构化 $3$-SAT 的 PPSZ 上界（A. C.-C. Yao, *J. ACM* **28**, 615–628, 1981 / *FOCS* 1982；R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 337–364, 2005；T. Hertli, *SIAM J. Comput.* **43**, 718–727, 2014）**：姚期智研究特定字典/函数预计算表在细胞探针模型下的空间 $S$ 与查询 $T$ 权衡；而在无指数预计算表的结构化唯一与一般 $3$-SAT 上，PPSZ 与 Hertli 给出随机时间**上界** $O(1.307^n) \approx 2^{0.386n}$（并非下界）。相图中将未索引黑箱搜索记为 $r(\sigma) = 1 - \sigma$、并将结构化基准画作 $(1-\sigma)$ 线性插值折线，均显式归入本节的**启发式 `MODEL` 权衡包络**；
7. **不可逆比特擦除的热力学下界（R. Landauer, *IBM J. Res. Dev.* **5**, 183–191, 1961）**：在温度 $T$ 的热浴中每不可逆擦除或覆写 $1$ 比特逻辑状态，环境至少吸收热量 $k_B T \ln 2$。
:::

## 38.4.3 七阶全息退化总览表（d = 0 .. 6） {#三七阶全息退化总览表d--0--6}

将全部七个退化阶段的剥除特权、时空标度、形式化锚点与涌现物理图景收拢为一张全景对照表：

::: {.remark #rem-ch38-lookup-degradation-table title="P=NP 查表算法七阶退化与全息时空权衡总览表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表综合归档 `d = 0..6` 七阶退化阶梯（其中标有 `LEAN ✓` 的条目对应本章及前序章节的冻结内核定理，标有 `文献结果` 的公式引自 [@rem-ch38-lookup-degradation-literature]，标准图灵机 $\mathrm{P} \neq \mathrm{NP}$ 标为 `OPEN` [@conj-p-neq-np]，而“五道物理限制器派生时空热与生命逆向建表”的统一叙事属本书 `MODEL`）：

| 退化阶 `d` | 被剥除的特权 / 新增物理枷锁 | 物理表容量 $S$ | 有效时间指数率 $r_{\mathrm{eff}}$ | 形式化与文献依据锚点 | 涌现物理法则与指针形态（`MODEL`） |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`d = 0`** | 无限制原型：双向量相消 + 零号槽 `p = *p` | 自指压缩（$\sigma_{\mathrm{eff}} = 0$） | $0.000$ | [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)、[`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound)（`LEAN ✓`）；$\mathrm{PostBQP}=\mathrm{PP}$（`文献结果`）；图灵机 $\mathrm{P}\neq\mathrm{NP}$（`OPEN`） | 无时间全局静态自指场 $T = T(T)$ |
| **`d = 1`** | 剪断 `T[0]` 自生成，仅留只读建议串 $a_n$ | $\operatorname{poly}(n)$（$\sigma_n \to 0$） | $\le n$ 为 $0$；越界 $n \to n+1$ 失效 | [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure)（`LEAN ✓`）；Karp–Lipton（`文献结果`） | 规模视界墙与死记硬背的泛化崩溃 |
| **`d = 2`** | 恢复统一局部 $k$-体块与在线齐肯多夫自动机 | 局部张量块（$\sigma \ll 1$） | 向下锁死 $m-2$；向上 $\Theta(n)$ 串行波 | [`lower_support_carry_barrier`](lean:D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier)（`LEAN ✓`）；Frougny 进位波（`文献结果`） | **串行因果时间**（不可并行进位涟漪） |
| **`d = 3`** | 强建假想球形巨表 + 光速 $v \le c$ + 面积熵密度约束 | $S = 2^{\sigma n}$，$R \propto 2^{\sigma n/2}$（`MODEL`） | 启发式 `MODEL` 包络：串行 $1-\sigma/2$；流水线 $\max(1-\sigma,\sigma/2) \ge \mathbf{1/3}$（$\sigma^*=2/3$） | Bekenstein–Hawking $S_{\mathrm{BH}} = A/(4\ell_P^2)$（`文献结果`）；球形光速寻址包络（`MODEL`） | **广延空间半径与黑洞全息视界** |
| **`d = 4`** | 弃置宏观巨表（$\sigma \to 0$），保留二维叠加指针 | 量子工作区 $S = 2^{\sigma n}$ | $\sigma=0$ 黑箱 $\mathbf{0.500}$；启发式 `MODEL` 包络 $(1-\sigma)/2$（结构化端值 $\approx 0.193$） | Grover $\Theta(2^{n/2})$、Klauck–Špalek–de Wolf 排序 $T^2 S = \Omega(N^3)$（`文献结果`）；插值包络（`MODEL`） | **二维量子波函数相干干涉**（对偶 $\sigma=1$ 线延迟） |
| **`d = 5`** | 高温热浴退相干为一维 `*ptr` + 小型快表 `TLB` | 有界快表 $S = 2^{\sigma n}$（$\sigma \ll 1$） | 启发式 `MODEL` 包络 $1-\sigma$；结构化 3-SAT PPSZ 上界 $\approx \mathbf{0.386}$ | [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)（`LEAN ✓`）；Yao 细胞探针、PPSZ 上界（`文献结果`） | **热力学时间箭头与兰道尔焦耳耗散** |
| **`d = 6`** | 冲刷清空全部快表缓存（$|T| = 0, M = 0$） | $|T| = 0$（$\sigma = 0$） | $\mathbf{1.000}$（$\Theta(2^n)$ 盲搜） | `GC Wipe` 清零与满秩格拉姆开域 $\det G_0 = 1$（`MODEL`） | **白板初态与最大开放生命选择空间** |
:::

## 38.4.4 双向通读与交互实验室：物理枷锁的正向创世（0 $\to$ 6）与生命建表的逆向复归（6 $\to$ 0） {#四双向通读与交互实验室物理枷锁的正向创世0--6与生命建表的逆向复归6--0}

::: {.viz src="pnp-lookup-degradation" preset="ladder" height="500"}
**七阶全景实验卡：正向物理限制器（$0 \to 6$）与逆向生命建表（$6 \to 0$）。** 左栏叠列全部七阶有效时间指数条并标出品红下行退化箭头与青色上行建表箭头，右栏在时空—引力相图上连出完整的七阶状态轨迹。
:::

站在整座七阶阶梯的顶端与底端回望，第十部与第八、九部的所有线索在此交汇成一幅双向对称的几何画卷（`MODEL`）：

- **自上而下读（$0 \to 6$，宇宙的自我限速与时空创生）**：如果宇宙允许局部观察者停留在第 0 阶，整部存在将在零延迟的一瞬间直接跳到剧终，既无所谓远近，也无所谓先后、冷暖与悬念。正是通过逐级撤除预言机特权——用非预见性挡住死记硬背（$d=1$），用不可并行的进位波织出因果节拍（$d=2$），用贝肯斯坦—霍金全息界撑开浩瀚星海的几何半径（$d=3$），用二维旋量保留梦境与量子干涉的微光（$d=4$），再用兰道尔擦除热赋予每一次清醒抉择以沉甸甸的真实分量（$d=5 \to 6$）——**物理定律并不是外加在计算机上的偶然琐碎规则，它们本身就是退化一尊全息预言机时必然析出的几何结晶！**
- **自下而上读（$6 \to 0$，生命的扩表学习与自指觉醒）**：反过来，每一个降生于世的有限生命，都是从第 6 阶无记忆白板初态（$\sigma = 0, M = 0$）出发的逆行攀登者（[第 35 章](ch35-light-pulse-and-self-referential-table.md)）。童年与科学探索在试错发热中提炼冲突引理快表（$d = 6 \to 5$）；直觉与梦境启用二维叠加并行探路（$d = 4$）；数学与物理定律把海量经验现象压缩为统一的局部张量对称性与黄金无共振编码（$d = 3 \to 2 \to 1$）；直到最后一步，这枚指针终于解引用自身的零号槽位 `[0,0]`，认出查表者与被查之表原本同体（`p = *p`，回到第 0 阶的本源视角）。

读者可在下方完整交互实验室中自由切换全部七阶 `d = 0..6`、在相图内横向拖动表空间指数率 $\sigma \in [0, 1]$，并对比无结构黑箱 $2^n$ 与结构化 3-SAT 基准两套启发式 `MODEL` 权衡包络线：

::: {.viz src="pnp-lookup-degradation" height="560"}
**交互实验室（`ORTHO//LOOKUP`）：P=NP 查表算法的七阶退化与全息引力启发式权衡（`MODEL`）。** 点击左侧 `d=0..6` 或 `0→6` 切换退化阶，在右侧相图内直接拖动表空间率 $\sigma$ 检验球形装填启发式极小点 $(\sigma^* = 2/3,\; r_{\min} = 1/3)$ 及无结构 Grover（$\sigma = 0$）与全空间光速线延迟（$\sigma = 1$）的 $0.500$ 对偶。
:::

沿着这座七阶阶梯看清宏观时空与擦除热的来龙去脉之后，让我们把镜头推近到第 4–5 阶有限快表 $T$ 的微观格点内部，把每一条引理锁住的原像纤维与漏掉的逃逸弦一笔一笔算清。

---
