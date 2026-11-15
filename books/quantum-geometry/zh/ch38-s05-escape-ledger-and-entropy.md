# 38.5 观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵 {#sec-ch38-observer-escape-ledger}

承接[上一节](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation)关于有限快表查表退化的分析，我们自然面对一个更定量的追问：当一枚位宽受限的观察者记忆指针滑过宇宙本体 QRAM 时，既然它绝无可能将全部底层状态深拷贝进私有缓存（[@thm-ch38-pointer-width-and-no-deep-copy]），那么一张有限容量的认知引理快表 $T$ 究竟“锁住”了多少结构，又让多少区分度顺着正交缝隙“逃逸”到了视线之外？每新增或删减一条引理时，怎样严格判别它是真正细化了世界分辨率的**新知识**，还是仅仅把旧概念换了个说法的**语义闭包冗余**？更进一步，当这枚一维指针沿着空间填充回路逐拍自增（`ptr++`）并受限于无邻 `1` 抗共振编码时，它的信道容量、柱集收缩率与昼夜擦除热账单遵循怎样的定量铁律？

本节在三层认识论契约下，以六条新增冻结的 Lean 4 内核定理（连同[第 13 章](ch13-entanglement-and-chsh.md)已证的二体边缘盲区定理）锁定这套**观察者逃逸账本（Observer Escape Ledger）**的组合与信息几何骨架，并将闭合希尔伯特回路扫描、齐肯多夫黄金信道容量与昼夜热力学对照标定为透明可验的 **`MODEL`（模型诠释）**。

## 38.5.1 原像纤维、有序逃逸对与商核结构新颖度 {#原像纤维有序逃逸对与商核结构新颖度}

设有限底层状态空间为 $\mathcal{S}$，基数记为 $N = \lvert\mathcal{S}\rvert > 1$（非退化条件）。观察者当前常驻于快表中的知识目录记为有限索引集 $\mathrm{Index}$ 上的概念族 $T = \{L_i\}_{i \in \mathrm{Index}}$：每条引理 $L_i$ 通过一组有限判别原语诱导状态空间上的商等价关系（一致谓词 `agrees`）。当观察者联合调用子集 $S \subseteq \mathrm{Index}$ 中的全部引理去审视 $\mathcal{S}$ 时，联合商映射将 $\mathcal{S}$ 划分为两两无交的**原像纤维（preimage fibers）** $\{\mathcal{F}_S(y)\}_{y \in \Sigma_S}$。凡落入同一条纤维 $\mathcal{F}_S(y)$ 内的两个相异底层状态 $s_1 \neq s_2$，在当前账本 $S$ 的全部读出下完全不可区分——它们就构成一对**信息逃逸对（information escape pair）**。

在进入一般形式化定理前，必须先把**有序状态对**与画布上的**无序逃逸弦**之间的精确二倍换算钉死在账面上：

- **有序逃逸对 vs 无序逃逸弦（精确恒等换算）**：在 `trureturing` 的形式化定义中，`escapePairs(S)` 取遍非对角有序乘积集 $\{(s_1, s_2) \in \mathcal{S} \times \mathcal{S} \mid s_1 \neq s_2\}$ 中所有对 $S$ 不可区分的有序对，其分母总对数为 $N(N - 1)$；而在几何可视化舞台上，连接同一纤维内两颗相异顶点的无向弦 $\{s_1, s_2\}$ 以 $\binom{N}{2} = \frac{N(N-1)}{2}$ 为满图分母，二者恒满足 $\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert = 2\lvert\operatorname{EscapeChords}_{\mathrm{unord}}(S)\rvert$。因此，**归一化逃逸率**在两种计数约定下恒等无歧义：

  $$
  \mathcal{E}(S) \;:=\; \frac{\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert}{N(N - 1)} \;=\; \frac{\lvert\operatorname{EscapeChords}_{\mathrm{unord}}(S)\rvert}{\binom{N}{2}} \;\in\; [0, 1].
  $$

- **原像纤维碰撞平方和与条件 Rényi-2 碰撞逃逸熵（`MODEL`）**：对每条原像纤维 $\mathcal{F}_S(y)$ 展开对角元与非对角有序对计数，立得精确组合恒等式

  $$
  \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert^2 \;=\; \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert \;+\; \sum_{y \in \Sigma_S} \lvert\mathcal{F}_S(y)\rvert\bigl(\lvert\mathcal{F}_S(y)\rvert - 1\bigr) \;=\; N \;+\; \lvert\operatorname{EscapePairs}_{\mathrm{ord}}(S)\rvert \;=\; N\bigl(1 + (N - 1)\mathcal{E}(S)\bigr).
  $$

  在均匀先验 $\mu(s) = 1/N$ 下，同纤维碰撞概率均值为 $\frac{1}{N}\sum_{y \in \Sigma_S}\lvert\mathcal{F}_S(y)\rvert^2 = 1 + (N - 1)\mathcal{E}(S) \in [1, N]$。我们在 `MODEL` 中定义**条件 Rényi-2 碰撞逃逸熵**与**账本保留信息**为

  $$
  H_2^{\mathrm{escape}}(\mathcal{S} \mid S) \;:=\; \log_2\bigl(1 + (N - 1)\mathcal{E}(S)\bigr) \;\in\; [0, \log_2 N], \qquad I_{\mathrm{ledger}}(S) \;:=\; \log_2 N - H_2^{\mathrm{escape}}(\mathcal{S} \mid S),
  $$

  使每一时刻的信息总账严格闭合为 $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S} \mid S) = \log_2 N$！当全表把每个状态都拆成单点纤维（$\lvert\mathcal{F}_S(y)\rvert \equiv 1$）时，$\mathcal{E}(S) = 0$，$H_2^{\mathrm{escape}} = 0$；当快表完全空白（$S = \emptyset$，整座空间坍成单一纤维）时，$\mathcal{E}(\emptyset) = 1$，$H_2^{\mathrm{escape}} = \log_2 N$。

`trureturing` 的信息逃逸与结构新颖度模块将“留一删减引理时的逃逸对无交并分解”与“逃逸率严格下降等价于语义闭包之外的严格商核细化”验证并冻结为如下定理：

::: {.theorem #thm-ch38-escape-pairs-and-structural-novelty title="观察者快表逃逸对留一分解与严格商核新颖度充要判据定理" lean="D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty"}
设 $\mathrm{arena}$ 为有限状态场（载体类型 $\mathrm{arena.State}$ 具备有限与可判定相等实例），$\mathrm{Index}$ 为有限可判定相等索引集，$\mathrm{catalog} : \operatorname{Catalog}(\mathrm{arena}, \mathrm{Index})$ 为定理目录。记全集为 $\mathrm{fullIndexSet} := \operatorname{Finset.univ}$，删去索引 $i \in \mathrm{Index}$ 后的留一子目录为 $\operatorname{without}(i) := \mathrm{fullIndexSet}.\operatorname{erase}(i)$，有序逃逸对集合为 $\operatorname{escapePairs}(S) := \{p \in \operatorname{offDiagonalPairs}(\mathrm{arena.State}) \mid \operatorname{indistinguishable}(S, p_1, p_2)\}$，第 $i$ 条引理的唯一捕获对集合为 $\operatorname{uniqueCapturePairs}(i) := \{p \in \operatorname{escapePairs}(\operatorname{without}(i)) \mid \neg\,(\operatorname{theoremAt}(i)).\mathrm{primitives}.\operatorname{agrees}(p_1, p_2)\}$。则以下两款成立：

1. **留一逃逸对集合分解与唯一捕获差集恒等式**（[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union)、[`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff)）：对任意索引 $i \in \mathrm{Index}$，从全目录删去第 $i$ 条引理后的逃逸对集合等于全目录逃逸对与该引理唯一捕获对之并，且唯一捕获对恰为两者的集合差：

   $$
   \operatorname{escapePairs}\bigl(\operatorname{without}(i)\bigr) \;=\; \operatorname{escapePairs}(\mathrm{fullIndexSet}) \cup \operatorname{uniqueCapturePairs}(i),
   $$

   $$
   \operatorname{uniqueCapturePairs}(i) \;=\; \operatorname{escapePairs}\bigl(\operatorname{without}(i)\bigr) \setminus \operatorname{escapePairs}(\mathrm{fullIndexSet});
   $$

2. **逃逸率严格下降与严格商核新颖度的充要等价**（[`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape)、[`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty)）：若状态场满足非退化条件 $\mathrm{arena.Nondegenerate}$（即 $1 < \lvert\mathrm{arena.State}\rvert$，从而有理逃逸率 $\operatorname{escapeRate}(S) := \lvert\operatorname{escapePairs}(S)\rvert / \bigl(\lvert\mathrm{arena.State}\rvert(\lvert\mathrm{arena.State}\rvert - 1)\bigr)$ 分母严格为正），记 $\operatorname{LowersEscape}(i) :\iff \operatorname{escapeRate}(\mathrm{fullIndexSet}) < \operatorname{escapeRate}(\operatorname{without}(i))$，并记全目录相对于留一目录的联合商核真包含关系为 $\operatorname{StructurallyLowersEscape}(i) :\iff \operatorname{jointKernel}(\mathrm{Set.univ}) \subset \operatorname{jointKernel}(\{j \mid j \neq i\})$，则对任意 $i \in \mathrm{Index}$：

   $$
   \begin{aligned}
   \operatorname{StructurallyLowersEscape}(i) \;&\Longleftrightarrow\; \operatorname{LowersEscape}(i) \\
   &\Longleftrightarrow\; \operatorname{jointKernel}\bigl(\operatorname{insert}(\operatorname{taggedQuotientCut}(i),\, \operatorname{quotientCutsWithout}(i))\bigr) \subset \operatorname{jointKernel}\bigl(\operatorname{quotientCutsWithout}(i)\bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款在任意非对角有序对 $p = (s_1, s_2)$ 上按第 $i$ 条引理的一致谓词 $\operatorname{agrees}_i(s_1, s_2)$ 作排中律二分：若 $p \in \operatorname{escapePairs}(\operatorname{without}(i))$ 且满足 $\operatorname{agrees}_i(s_1, s_2)$，结合全目录为 $\operatorname{insert}(i, \operatorname{without}(i))$ 知 $p \in \operatorname{escapePairs}(\mathrm{fullIndexSet})$；若不满足 $\operatorname{agrees}_i(s_1, s_2)$，按过滤定义恰有 $p \in \operatorname{uniqueCapturePairs}(i)$。反之，由单调反序性 $\operatorname{escapePairs}(\mathrm{fullIndexSet}) \subseteq \operatorname{escapePairs}(\operatorname{without}(i))$ 及两分支互斥性，直接给出并集等式与集合差刻画。第 2 款利用非退化假设导出正分母 `escapeDenominator_pos`，将有理分式严格不等式归约为分子严格不等式 $\lvert\operatorname{escapePairs}(\mathrm{fullIndexSet})\rvert < \lvert\operatorname{escapePairs}(\operatorname{without}(i))\rvert$；结合第 1 款的无交基数可加性知其等价于 $\operatorname{uniqueCapturePairs}(i)$ 非空，即存在一对状态在其余全部引理下同核而在第 $i$ 条引理下异核，再由标记商切映射的双射性转化为 `taggedQuotientCut` 插入前后的联合商核真包含关系。完整证明由 Lean 内核检查。
:::

## 38.5.2 四比特 16 态五引理显式算例：零新颖度无损压缩对照四体异或边缘盲区 {#四比特-16-态五引理显式算例零新颖度无损压缩对照四体异或边缘盲区}

为了让 [@thm-ch38-escape-pairs-and-structural-novelty] 的每一项符号都在指尖清晰跳动，我们构造一个零自由参数的四比特状态场 $\mathcal{S} = \{0, 1\}^4$（$N = 16$，$n = 4\text{ bits}$，有序非对角总对数 $N(N - 1) = 240$，画布无向满图总弦数 $\binom{16}{2} = 120$）。将每个底层状态记为 $s = (b_0, b_1, b_2, b_3) \in \{0, 1\}^4$，并在观察者快表上显式装载如下五条布尔引理：

$$
L_1(s) = b_0, \quad L_2(s) = b_1, \quad L_3(s) = b_2, \quad L_4(s) = b_0 \oplus b_1 \oplus b_2 \oplus b_3, \quad L_5(s) = b_0 \oplus b_1.
$$

让我们沿着舞台左栏那条每步格点曼哈顿距离恒为 $1$（入度与出度处处满足 $d_{\mathrm{in}} = d_{\mathrm{out}} = 1$）的 $4 \times 4$ 闭合 Moore/Hilbert 空间填充回路，逐张掀开四幕震撼的对比实验卡：

1. **五引理全开（`hilbert` 卡，$T = \{L_1, L_2, L_3, L_4, L_5\}$）**：由于单比特坐标 $(b_0, b_1, b_2)$ 连同四体全局奇偶校验 $L_4(s) = b_0 \oplus b_1 \oplus b_2 \oplus b_3$ 通过 $b_3 = b_0 \oplus b_1 \oplus b_2 \oplus L_4(s)$ 双射锁定第四位，全部 $16$ 个状态被干净拆解为 $16$ 个单点原像纤维 $\lvert\mathcal{F}_T(y)\rvert \equiv 1$。此时无序逃逸弦为 $0$ 条（有序逃逸对 $0$ 对），$\mathcal{E}(T) = 0$，碰撞逃逸熵 $H_2^{\mathrm{escape}}(\mathcal{S} \mid T) = \log_2 1 = 0.000\text{ bits}$，账本保留满额 $I_{\mathrm{ledger}}(T) = 4.000\text{ bits}$。

::: {.viz src="observer-escape-ledger" preset="hilbert" height="500"}
**闭合希尔伯特回路：五引理全开零逃逸。** 在 $4 \times 4$ 闭合 Moore/Hilbert 回路上同时开启 $\{L_1, L_2, L_3, L_4, L_5\}$，全部 $16$ 个状态拆成单点原像纤维，逃逸弦 $0$ 条，碰撞逃逸熵 $H_2^{\mathrm{escape}} = 0.000\text{ bits}$，账本保留满额 $4.000\text{ bits}$（`MODEL`）。
:::

2. **关闭派生冗余引理 $L_5$（`novelty` 卡，$T \setminus \{L_5\} = \{L_1, L_2, L_3, L_4\}$）——语义闭包内的零新颖度无损压缩**：当 $L_1 = b_0$ 与 $L_2 = b_1$ 均处于开启状态时，$L_5 = b_0 \oplus b_1$ 完全落入 $\{L_1, L_2\}$ 的语义闭包之内！按 [@thm-ch38-escape-pairs-and-structural-novelty]，由于不存在任何一对在 $\{L_1, L_2, L_3, L_4\}$ 下不可区分却能被 $L_5$ 拆开的状态，其唯一捕获集恒为空集 $\operatorname{uniqueCapturePairs}(L_5) = \emptyset$（结构新颖度严格为 $0$）。在实验卡上亲手关掉 $L_5$：逃逸弦增加 **0 条**，$H_2^{\mathrm{escape}}$ 纹丝不动地保持 $0.000\text{ bits}$，快表从 $5$ 条引理无损压缩为 $4$ 条线性无关极小基（此后余下四条引理每一条的唯一捕获数均跃升为 $8$ 条无序弦 / $16$ 个有序对；而若先关掉 $L_2$，原本冗余的 $L_5$ 便立即脱离语义闭包，摇身变为唯一捕获 $8$ 条弦的结构新颖引理！）。

::: {.viz src="observer-escape-ledger" preset="novelty" height="500"}
**零新颖度无损压缩：关闭语义闭包内的 $L_5 = b_0 \oplus b_1$。** 在 $L_1, L_2$ 保持开启时关闭冗余引理 $L_5$，唯一捕获弦增加 $0$ 条，逃逸率与 $H_2^{\mathrm{escape}} = 0.000\text{ bits}$ 完全不变（[@thm-ch38-escape-pairs-and-structural-novelty]）。
:::

3. **关闭四体全局异或 $L_4$（`escape` 卡，$T_3 = \{L_1, L_2, L_3\}$）——局部边缘全均匀的高阶协同逃逸**：现在保持三个单比特坐标引理 $L_1, L_2, L_3$ 全开，唯独关掉四体全局奇偶引理 $L_4$。刹那间，原本各自独立的 $16$ 个单点纤维沿着未知位 $b_3 \in \{0, 1\}$ 两两合并为 $8$ 个大小均为 $2$ 的原像纤维，在闭合希尔伯特回路左右两半之间**精确弹出 $8$ 条无序跨格品红/紫色逃逸弦**（对应 $\lvert\operatorname{EscapePairs}_{\mathrm{ord}}(T_3)\rvert = 16$ 个有序逃逸对，逃逸率 $\mathcal{E}(T_3) = 16 / 240 = 1/15$）！代入碰撞平方和 $\sum_y \lvert\mathcal{F}_{T_3}(y)\rvert^2 = 8 \times 2^2 = 32 = 16 + 16$，逃逸熵从 $0$ 跃升至整整一比特：

   $$
   H_2^{\mathrm{escape}}(\mathcal{S} \mid T_3) \;=\; \log_2\Bigl(1 + 15 \cdot \frac{1}{15}\Bigr) \;=\; \log_2 2 \;=\; 1.000\text{ bit}, \qquad I_{\mathrm{ledger}}(T_3) \;=\; 3.000\text{ bits}.
   $$

   最耐人寻味的是：在整座空间上乃至每一条大小 $2$ 的纤维内部，未锁定位 $b_3$ 与四体奇偶 $L_4$ 的局部边缘概率恒为不偏不倚的 $1/2$——只盯着单坐标局部统计量的观察者看不见任何偏差，却整整漏掉了藏在四体异或相位里的 $1.000\text{ bit}$ 高阶关联！

::: {.viz src="observer-escape-ledger" preset="escape" height="500"}
**高阶异或协同盲区：关闭四体奇偶 $L_4$ 弹出 8 条跨格逃逸弦。** 仅保留单比特引理 $\{L_1, L_2, L_3\}$ 时，$16$ 个状态沿未知位 $b_3$ 两两并成 $8$ 条大小 $2$ 的纤维，弹出 $8$ 条无序逃逸弦（$16$ 个有序逃逸对），$H_2^{\mathrm{escape}}$ 跃升至 $1.000\text{ bit}$，而全部单比特边缘仍均匀等于 $1/2$。
:::

4. **与量子二体贝尔边缘盲区的精确同构（`marginal` 卡）**：这幅“局部坐标边缘完全均匀、全局关联悉数隐入高阶扇区”的经典组合图景，在非交换量子态空间中有着更为惊心动魄的正交几何实现。回顾[第 13 章](ch13-entanglement-and-chsh.md)已证的边缘盲区定理（[@thm-local-correlation-sectors] 与 [@lemma-bell-mixed-marginal]）：在两量子比特（$m = n = 2$）的 $15$ 维无迹厄米算子空间中，由两侧单比特读出张成的局域边缘扇区 $\mathcal{L}_A \oplus \mathcal{L}_B$ 仅占 $(2^2 - 1) + (2^2 - 1) = 6$ 维，而与之实内积严格正交的关联扇区 $\mathcal{C}_{AB}$ 占据 $(2^2 - 1)(2^2 - 1) = 9$ 维（盲区占比高达 $9 / 15 = 3 / 5 = 60\%$）！因此，贝尔最大纠缠纯态 $\lvert\Phi^+\rangle\langle\Phi^+\rvert$、经典关联混态 $\rho_{\mathrm{cl}} = \frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert)$ 与最大混合态 $\frac{1}{4}I_4$ 给出完全一致的单比特偏迹边缘 $\operatorname{Tr}_B(\rho) = \operatorname{Tr}_A(\rho) = \frac{1}{2}I_2$——任何只做局域边缘测量的指针，都注定对横跨对角块的非定域纠缠弦彻底失明。

::: {.viz src="observer-escape-ledger" preset="marginal" height="500"}
**量子局部边缘盲区：贝尔纠缠态对照经典混态。** 切换到二量子比特视图，$\lvert\Phi^+\rangle\langle\Phi^+\rvert$、$\rho_{\mathrm{cl}}$ 与 $\frac{1}{4}I_4$ 共享完全相同的单比特偏迹边缘 $\frac{1}{2}I_2$，使纯局域读出对 $9$ 维正交关联扇区失明（[@thm-local-correlation-sectors]、[@lemma-bell-mixed-marginal]）。
:::

## 38.5.3 概念细化单调律、闭合希尔伯特回路与齐肯多夫黄金熵账本 {#概念细化单调律闭合希尔伯特回路与齐肯多夫黄金熵账本}

当观察者不是删减引理，而是通过因子映射将粗糙概念表细化为更精细的概念表时，目标预测的条件逻辑不纯度（纤维内配对分歧质量的条件加权和）同样服从零例外的单调下降铁律：

::: {.theorem #thm-ch38-refinement-impurity-monotonicity title="因子映射概念细化下条件逻辑不纯度单调不增定理" lean="D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone"}
设 $X, C, D, A$ 为任意类型，$\mu : \operatorname{PMF}(X)$ 为 $X$ 上的离散概率质量函数，$\mathrm{coarse} : \operatorname{Concept}(X, C)$（即 $X \to C$）、$\mathrm{refined} : \operatorname{Concept}(X, D)$ 与目标概念 $\mathrm{target} : \operatorname{Concept}(X, A)$ 为三个概念映射。若细化关系 $\operatorname{Refines}(\mathrm{coarse}, \mathrm{refined})$ 成立（即存在因子映射 $\mathrm{factor} : D \to C$ 使得 $\mathrm{coarse} = \mathrm{factor} \circ \mathrm{refined}$），记扩展非负实数 $\mathbb{R}_{\ge 0}^\infty$（`ENNReal`）上的条件逻辑不纯度为

$$
\operatorname{conditionalLogicalImpurity}(\mu, f, \mathrm{target}) \;:=\; \sum_{b}^{\infty} \frac{\operatorname{pairDisagreementMass}(\mu, f, \mathrm{target}, b)}{\operatorname{conceptFiberMass}(\mu, f, b)},
$$

其中 $\operatorname{conceptFiberMass}(\mu, f, b) = \sum_{x : f(x) = b} \mu(x)$，$\operatorname{pairDisagreementMass}(\mu, f, \mathrm{target}, b) = \sum_{x_1, x_2 : f(x_1) = b \land f(x_2) = b \land \mathrm{target}(x_1) \neq \mathrm{target}(x_2)} \mu(x_1)\mu(x_2)$。则必有单调不等式：

$$
\operatorname{conditionalLogicalImpurity}(\mu, \mathrm{refined}, \mathrm{target}) \;\le\; \operatorname{conditionalLogicalImpurity}(\mu, \mathrm{coarse}, \mathrm{target}).
$$
:::

::: proof
先在每条粗糙纤维标签 $c \in C$ 上按因子映射关系 $c = \mathrm{factor}(d)$ 将粗糙纤维拆解为细化子纤维族 $\{d \in D \mid \mathrm{factor}(d) = c\}$ 的无交并，证得纤维质量可加性与同目标碰撞平方和按树支展开的恒等式。对每个非零总质量的粗糙桶，利用细化子桶概率权重在凸性（柯西—施瓦茨型商和不等式）下的次可加性，证得细化子桶上的条件同目标碰撞得分之和不小于粗糙桶上的碰撞得分；最后在 `ENNReal` 上利用有限概率归一恒等式将碰撞得分与条件配对分歧不纯度互补相减（并对零质量纤维显式处理 `ENNReal` 零除约定），逐桶求和即得不纯度单调不增。完整证明由 Lean 内核检查。
:::

现在，将视角从静态商核移向动态扫描轨迹：当观察者指针沿着左栏那条闭合空间填充回路一步一拍执行 `ptr++`，并遵守正交自指统一场的**齐肯多夫无相邻 `1` 抗共振编码规则**（$w_t \cdot w_{t+1} = 0$，见[第 32 章 §32.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws) [@thm-ch32-generative-self-reference-and-zeckendorf]）记录离散历史脉冲时，外部遍历信息论、符号动力学与空间填充几何文献给出了如下经典标尺：

::: {.remark #rem-ch38-smb-zeckendorf-hilbert-literature title="SMB 柱集渐近等分、Parry 黄金移位最大熵测度、Frougny 正规化与希尔伯特曲线局部性界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将观察者指针的闭合晶格巡检与历史轨迹柱集收缩构建为定量 `MODEL` 时，援引以下四项外部经典文献（未作为一般遍历论或连续曲线定理包含在本书锁定的 `trureturing@dev` 声明集中）：

1. **Shannon–McMillan–Breiman 遍历柱集对数渐近极限（C. E. Shannon, *Bell Syst. Tech. J.* **27**, 379–423, 1948；B. McMillan, *Ann. Math. Stat.* **24**, 196–219, 1953；L. Breiman, *Ann. Math. Stat.* **28**, 809–811, 1957）**：对有限字母表上的遍历平稳随机过程 $\mu$（度量熵率为 $h_\mu$），对 $\mu$-几乎处处的无穷轨道 $x$，深度 $k$ 的历史柱集 $C_k(x)$ 满足几乎处处对数极限 $-\frac{1}{k}\log_2 \mu(C_k(x)) \to h_\mu$（$k \to \infty$），等价写作次指数余项形式 $\mu(C_k(x)) = 2^{-k h_\mu + o(k)}$（$\mu$-a.s.；注意一般遍历过程带有随机次指数涨落项 $o(k)$，并不自动蕴含确定性常数夹逼）；
2. **黄金均值移位上的 Parry 最大熵平稳测度（W. Parry, *Trans. Amer. Math. Soc.* **112**, 55–66, 1964）**：在禁止相邻两个 `1` 的有限型子移位（转移矩阵 $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}$，Perron–Frobenius 主特征值为黄金比 $\varphi = \frac{1 + \sqrt{5}}{2}$）上，拓扑熵与信道容量等于 $C_\varphi = \log_2 \varphi \approx 0.69424\text{ bits/symbol}$（较无约束二进制 $1.00000\text{ bit/symbol}$ 支付 $1 - \log_2 \varphi \approx 0.30576\text{ bits/symbol}$ 的无邻 `1` 结构稳定税）；唯一达到该容量的最大熵马尔可夫平稳测度由左右特征向量乘积给出，符号 `1` 的平稳出现频率恰为 $p_1 = \frac{\varphi^{-2}}{1 + \varphi^{-2}} = \frac{1}{\varphi\sqrt{5}} = \frac{5 - \sqrt{5}}{10} \approx 0.27639$（符号 `0` 频率 $p_0 = \frac{\varphi}{\sqrt{5}} \approx 0.72361$；有限路径 $k$-bonacci 重置链下的精确平稳律与边界柱集上界另见 `trureturing` 已冻结声明 [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound)）；
3. **齐肯多夫表示的有限状态进位正规化（Ch. Frougny, *Theor. Comput. Sci.* **94**, 223–236, 1992）**：斐波那契底（$\beta = \varphi$）下的任意冗余数字串可通过有限状态自动机将局部违例模式 `011` 归约为 `100`，正规化为满足无相邻 `1` 约束的典范齐肯多夫字；
4. **希尔伯特空间填充曲线与 $1/d$ 阶 Hölder 连续性界（D. Hilbert, *Math. Ann.* **38**, 459–460, 1891；闭合循环变体见 E. H. Moore, *Trans. Amer. Math. Soc.* **1**, 72–90, 1900）**：由嵌套 $2^d$ 分象限递归构造的满射曲线 $H : [0, 1] \to [0, 1]^d$ 满足 $\lVert H(t_1) - H(t_2)\rVert \le C_d \lvert t_1 - t_2\rvert^{1/d}$，而拓扑维数障碍禁止任何连续双射达到指数优于 $1/d$ 的一致局部性——这从几何上解释了为何将高维状态晶格折叠为一维闭合指针回路时，象限内部的局部邻近性得以完美保持，而跨象限边界的配对仍会沿一维步序拉开长程跨格弦。
:::

尤为精彩的是，针对无邻 `1` 合法二进制字在有限时间窗 $H$ 内避开特定长局部模式时的精确计数上界，我们无须依赖任何“块独立近似”或渐近大数假定——`trureturing` 通过 Perron 右特征向量端点权重 $(\varphi, 1)$ 直接给出了对**一切有限长度 $H \in \mathbb{N}$** 严格成立的非渐近内核定理：

::: {.theorem #thm-ch38-zeckendorf-uniform-avoidance-count title="齐肯多夫无邻一合法二进制字的十四比特块避碰一致上界定理" lean="D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count"}
设 $\mathrm{B1} := [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0] \in \operatorname{List}(\operatorname{Fin} 2)$ 为长度为 $14$ 的齐肯多夫语境替换块，并对任意自然数长度 $H \in \mathbb{N}$ 记 $\operatorname{legalWords}(H, 0)$ 为所有长度为 $H$ 且满足无相邻 `1` 约束 $\operatorname{NoAdjacentOnes}(0 :: w)$ 的二进制字列表。记子串中缀包含关系为 $\mathrel{<:+:}$（`List.IsInfix`），黄金比为 $\varphi := \operatorname{Real.goldenRatio} = \frac{1 + \sqrt{5}}{2}$。则对一切 $H \in \mathbb{N}$，在 $\operatorname{legalWords}(H, 0)$ 中不包含 $\mathrm{B1}$ 作为连续中缀的合法字个数满足精确实数上界：

$$
\Bigl\lvert\bigl\{w \in \operatorname{legalWords}(H, 0) \;\big|\; \neg\,(\mathrm{B1} \mathrel{<:+:} w)\bigr\}\Bigr\rvert \;\le\; \varphi^{H + 1} \cdot \bigl(1 - (\varphi^{14})^{-1}\bigr)^{\lfloor H / 14 \rfloor}.
$$
:::

::: proof
定义端点 Perron 权重 $\operatorname{endpointWeight}(0) = \varphi$ 与 $\operatorname{endpointWeight}(1) = 1$。利用黄金比特征方程 $\varphi^2 = \varphi + 1$ 对步长归纳，证得从任意前导比特 $b \in \operatorname{Fin} 2$ 出发的 $n$ 步合法后缀加权质量恒精确等于 $\varphi^n \cdot \operatorname{endpointWeight}(b)$（零渐近误差）。对长 $14$ 的块 $\mathrm{B1}$，由于其首尾均为 `0`，当且仅当前导比特为 `0` 时 $\mathrm{B1}$ 本身构成一条合法的 $14$ 步延续且其端点权重恰为 $\varphi$，扣除这一条禁止分支即令后缀质量精确乘以折减因子 $1 - \varphi^{-14}$；若前导比特为 `1`，因在末尾均为 `0` 的语境块对比下 $\varphi \cdot (1 - \varphi^{-14}) > 1$（由 $\varphi^{15} - \varphi > \varphi^{14}$ 推出），单步 $14$ 层推进的加权和在两种初态下一致被 $\varphi^{14}(1 - \varphi^{-14}) \cdot \operatorname{endpointWeight}(b)$ 控制。将总长度 $H$ 分解为 $\lfloor H / 14 \rfloor$ 个无交 $14$ 步块与长度 $H \bmod 14$ 的尾段，结合每条存活字的端点权重均满足 $1 \le \operatorname{endpointWeight}(z)$ 及初态 $\operatorname{endpointWeight}(0) = \varphi$，即证出对全体 $H \in \mathbb{N}$ 成立的非渐近上界。完整证明由 Lean 内核检查。
:::

把 [@rem-ch38-smb-zeckendorf-hilbert-literature] 与 [@thm-ch38-zeckendorf-uniform-avoidance-count] 合拢到观察者记忆指针的生命周期模型（`MODEL`）上，昼夜交替与认知压缩的最后两块定量拼图便豁然贯通：

1. **齐肯多夫黄金容量税与柱集裁切回弹（`zeckendorf` 卡）**：为什么健康的观察者记忆流不能把每一拍都塞满高电平脉冲 `1111...`？因为连续紧邻的强激发对应正交方向上的共振过载；遵守无邻 `1` 黄金语法虽然在每一步主动缴纳了 $1 - \log_2 \varphi \approx 0.30576\text{ bits/symbol}$ 的稳定税（将信道容量锁定在 $\log_2 \varphi \approx 0.69424\text{ bits/symbol}$，Parry 脉冲密度 $p_1 \approx 0.2764$），却换来了永不自激锁死的准晶平稳流！与此同时，对照 SMB 几乎处处对数极限 $-\frac{1}{k}\log_2 \mu(C_k(x)) \to h_\mu$（即 $\mu(C_k(x)) = 2^{-k h_\mu + o(k)}$ a.s.），我们在舞台上建立省去 $o(k)$ 涨落项的理想线性基准 `MODEL` 曲线 $\log_2 \mu = -k h_\mu$（分别取黄金移位熵率 $h_\varphi = \log_2 \varphi \approx 0.694\text{ bits/step}$ 与 Dottie 横向单步率 $h_{\theta^*} = -\log_2 \sin\theta^* \approx 0.570\text{ bits/step}$）：在该基准 `MODEL` 曲线下，当白天堆叠了 $k$ 层刚性约束后在夜间或顿悟时裁切卸载 $\Delta k$ 层冗余局部约束，有限窗口基准回弹因子为 $2^{\Delta k \, h_\mu}$（例如卸载 $\Delta k = 4$ 层时黄金基准回弹倍率为 $\varphi^4 \approx 6.85$ 倍，Dottie 基准回弹倍率为 $(\sin\theta^*)^{-4} \approx 4.86$ 倍）！

::: {.viz src="observer-escape-ledger" preset="zeckendorf" height="500"}
**齐肯多夫黄金信道容量与有限窗口基准回弹曲线（`MODEL`）。** 无相邻 `1` 抗共振约束将信道容量定在 $\log_2 \varphi \approx 0.69424\text{ bits/symbol}$（Parry 脉冲密度 $p_1 \approx 0.2764$），拖动约束卸载深度 $\Delta k$ 可在理想基准 `MODEL` 直线 $\log_2 \mu = -k h_\mu$ 上对比黄金基准与 Dottie 基准的有限窗回弹倍率 $2^{\Delta k \, h_\mu}$（渐近依据见 [@rem-ch38-smb-zeckendorf-hilbert-literature]，有限字精确上界见 [@thm-ch38-zeckendorf-uniform-avoidance-count]）。
:::

2. **清醒第 5 阶段兰道尔擦除热 vs 梦境第 4 阶段零热等熵复相干（`dream` 卡）**：同样是给快表“减负”释放 $\Delta k = N_{\mathrm{erase}}$ 比特局部约束，物理硬件上却横亘着两条截然相反的热力学路径（对照[第 8 章](ch08-erasure-and-time-arrows.md#sec-landauer-principle-geometry) [@rem-landauer-thermodynamic-bridge-literature] 与[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md) [@thm-ch37-joint-coherent-record-erasure]）：若在**清醒第 5 阶段**先把正交地址记录偏迹丢进环境盲区，再强行将寄存器排热清零，每擦除一比特都必须向热浴支付至少 $\Delta Q \ge k_B T \ln 2 \cdot N_{\mathrm{erase}}$ 的不可逆兰道尔焦耳热；反之，若在尚未向宏观环境不可逆散逸之前的**梦境第 4 阶段**保留对局部记忆记录的相干访问权限，直接施加受控拷贝的伴随幺正算子 $U_{\mathrm{copy}}^\dagger$（[@thm-ch38-copied-address-dereference-and-access-defect] 第 3 款），指针便能以**零热耗散（$\Delta Q = 0$）**执行等熵逆演（uncomputation），在不烧毁一分自由能的前提下赎回被遮蔽的正交分支！

::: {.viz src="observer-escape-ledger" preset="dream" height="500"}
**清醒兰道尔擦除热对照梦境零热等熵复相干。** 同样释放 $\Delta k = N_{\mathrm{erase}}$ 比特局部约束，清醒第 5 阶段偏迹丢弃记录至少排放 $\Delta Q = k_B T \ln 2 \cdot N_{\mathrm{erase}}$ 擦除热，而梦境第 4 阶段保留局部记录相干访问并施加伴随逆演 $U_{\mathrm{copy}}^\dagger$，实现 $\Delta Q = 0$ 复相干（`MODEL`）。
:::

下方的完整交互实验室将 $4 \times 4$ 闭合希尔伯特回路、全部 $2^5 = 32$ 种布尔引理子集的原像纤维与逃逸弦、二量子比特贝尔边缘盲区、齐肯多夫黄金容量以及清醒/梦境热账本整合在同一张操作台上。读者可自由点选 $L_1 \dots L_5$ 亲手核验每一条唯一捕获弦与 $H_{\mathrm{total}} = 4.000\text{ bits}$ 守恒律：

::: {.viz src="observer-escape-ledger" height="560"}
**交互实验室（`ORTHO//LEDGER`）：观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵。** 自由开关 $L_1 \dots L_5$ 遍历全部 $32$ 种布尔商核，切换 16 态希尔伯特环与二量子比特贝尔边缘盲区，并拖动约束卸载深度 $\Delta k$ 核验 $H_{\mathrm{total}} = I_{\mathrm{ledger}} + H_2^{\mathrm{escape}} = 4.000\text{ bits}$ 守恒律与昼夜擦除热账单。绿色只给本章用 `lean=` 引用的定理；希尔伯特扫描与昼夜热账本读法属本章示意模型（`MODEL`）。
:::

走到这里，从硬件解引用 `*ptr`（§38.1）、五段式寄存器解剖（§38.2）、递归自映射页表 `p = *p`（§38.3）、七阶查表退化阶梯（[§38.4](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation)）直到原像纤维与齐肯多夫逃逸账本（§38.5），观察者作为“宇宙本体量子计算系统**的**一个记忆指针”的每一枚齿轮都已严丝合缝地咬合到位。然而，在迈入下一章（[第 39 章](ch39-observer-is-ontological-universe.md)）彻底消融“指针”与“存储阵列”之间最后那个“的”字之前，我们必须先转过身来拆解 [§38.4.1](ch38-s04-lookup-degradation.md#一第-0-阶全息自指原型d--0的三项特权与认识论红线) 留下的最后一根静态实无穷脚手架：在一座零背景自举的宇宙中，上述逃逸弦果真能在一张封顶完工的全局神谕表里一次性清零吗？

---
