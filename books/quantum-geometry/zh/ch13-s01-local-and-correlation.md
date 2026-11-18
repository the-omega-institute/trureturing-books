# 13.1 局域线与关联面：6 + 9 = 15 {#sec-pauli-local-correlation}

为什么仅靠“Alice 球面上的箭头 $\vv{r} \in \mathbb{R}^3$”加上“Bob 球面上的箭头 $\vv{s} \in \mathbb{R}^3$”，永远拼不出两体量子态的真实版图？让我们先做一笔严格的实维数与正交子空间审计。

对任意正整数维数 $d \ge 1$，全体 $d \times d$ 复厄米矩阵在实数域 $\mathbb{R}$ 上构成一个 $d^2$ 维实向量空间，记作 `HermitianSpace d`。赋予它典范的实希尔伯特—施密特（Hilbert–Schmidt）内积

$$
\langle A, B\rangle_{\mathrm{HS}} = \operatorname{Re}\Tr(A^* B) = \operatorname{Re}\Tr(AB),
$$

则 `HermitianSpace d` 成为一个实内积空间。在其中，实标量倍单位矩阵张成 $1$ 维标量子空间 $\mathrm{scalarHermitian}\,d = \mathbb{R}\cdot I_d$，而全体迹为零的 $d\times d$ 厄米矩阵构成其 $(d^2 - 1)$ 维正交补空间 $\mathrm{traceZeroHermitian}\,d = \{A \in \mathrm{HermitianSpace}\,d \mid \Tr A = 0\}$（因为 $\langle A, I_d\rangle_{\mathrm{HS}} = \operatorname{Re}\Tr(A) = 0$）。

现在考察由 $m$ 维子系统 $A$ 与 $n$ 维子系统 $B$（$m, n \in \mathbb{N}$，$1 \le m$，$1 \le n$，$1 < mn$）复合而成的实张量积空间

$$
\mathcal{H}_{m,n}^{\mathrm{Herm}} = \mathrm{HermitianSpace}\,m \otimes_{\mathbb{R}} \mathrm{HermitianSpace}\,n,
$$

其上带有由两因子希尔伯特—施密特内积诱导的实张量内积。对因子空间中的任意实子空间 $P \le \mathrm{HermitianSpace}\,m$ 与 $Q \le \mathrm{HermitianSpace}\,n$，源码通过典范线性嵌入 `TensorProduct.mapIncl P Q` 的值域定义嵌入扇区 $\mathrm{tensorSector}(P, Q) = \operatorname{range}(\mathrm{TensorProduct.mapIncl}\,P\,Q) \le \mathcal{H}_{m,n}^{\mathrm{Herm}}$（注意这里的载体是嵌入到总张量空间 $\mathcal{H}_{m,n}^{\mathrm{Herm}}$ 后的实子空间，而非脱离母空间的外部抽象直积）。由此，两体无迹厄米空间 $\mathrm{bipartiteTraceZero}\,m\,n = (\mathrm{scalarSector}\,m\,n)^\perp$（即总恒等线 $\mathrm{scalarSector}\,m\,n = \mathrm{tensorSector}(\mathrm{scalarHermitian}\,m, \mathrm{scalarHermitian}\,n)$ 的正交补，实维数为 $m^2 n^2 - 1$）自然分解为三个具有清晰物理操作意义的扇区：

1. **局域 $A$ 扇区** $\mathrm{localASector}\,m\,n = \mathrm{tensorSector}(\mathrm{traceZeroHermitian}\,m,\, \mathrm{scalarHermitian}\,n)$：形如 $A_0 \otimes I_n$（$\Tr A_0 = 0$）的算子，仅对第 1 个子系统提问而对第 2 个子系统完全盲视，实维数为 $m^2 - 1$；
2. **局域 $B$ 扇区** $\mathrm{localBSector}\,m\,n = \mathrm{tensorSector}(\mathrm{scalarHermitian}\,m,\, \mathrm{traceZeroHermitian}\,n)$：形如 $I_m \otimes B_0$（$\Tr B_0 = 0$）的算子，仅对第 2 个子系统提问，实维数为 $n^2 - 1$；
3. **双体关联扇区** $\mathrm{correlationSector}\,m\,n = \mathrm{tensorSector}(\mathrm{traceZeroHermitian}\,m,\, \mathrm{traceZeroHermitian}\,n)$：由双边无迹算子张量 $A_0 \otimes B_0$（$\Tr A_0 = \Tr B_0 = 0$）张成的纯关联子空间，实维数为 $(m^2 - 1)(n^2 - 1)$。

与此同时，在双量子比特（$m = n = 2$，矩阵类型记作 $\mathrm{TwoQubitMatrix} = M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$）的具体矩阵层面上，定义最大纠缠贝尔态向量 $\mathrm{bellVector} = \lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$（按指标对 $(i, j) \in \mathrm{Fin}\,2 \times \mathrm{Fin}\,2$ 给出的分量为 $\delta_{ij}/\sqrt{2}$），其秩一外积密度矩阵为

$$
\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix},
$$

并定义退去相干项的经典对角关联混合态

$$
\mathrm{classicalCorrelatedDensity} = \frac{1}{2}\bigl(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert\bigr) = \operatorname{diag}\Bigl(\frac{1}{2},\, 0,\, 0,\, \frac{1}{2}\Bigr).
$$

记消去第 2 个因子的偏迹为 $\mathrm{traceEnvironment}(\rho)_{i,j} = \sum_a \rho_{(i,a),(j,a)}$，消去第 1 个因子的偏迹为 $\mathrm{traceFirstFactor}(\rho)_{i,j} = \sum_a \rho_{(a,i),(a,j)}$。下面的定理将一般 $(m, n)$ 维数的正交扇区分解与双比特边缘盲区见证完整地合取在同一个形式化声明中。

::: {.theorem #thm-local-correlation-sectors title="局域边缘扇区与关联扇区的正交分解及边缘盲区定理" lean="D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot"}
设 $m, n \in \mathbb{N}$ 满足 $1 \le m$、$1 \le n$ 且 $1 < mn$。在赋予实希尔伯特—施密特内积的实张量积空间 $\mathrm{HermitianSpace}\,m \otimes_{\mathbb{R}} \mathrm{HermitianSpace}\,n$ 及双比特密度矩阵见证上，以下结论同时成立：

1. **无迹空间的三扇区完备生成**：

   $$
   \mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n \sqcup \mathrm{correlationSector}\,m\,n = \mathrm{bipartiteTraceZero}\,m\,n;
   $$

2. **局域合成扇区的实维数**：

   $$
   \operatorname{finrank}_{\mathbb{R}}\bigl(\mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n\bigr) = (m^2 - 1) + (n^2 - 1);
   $$

3. **关联扇区的实维数**：

   $$
   \operatorname{finrank}_{\mathbb{R}}\bigl(\mathrm{correlationSector}\,m\,n\bigr) = (m^2 - 1)(n^2 - 1);
   $$

4. **关联扇区占总无迹空间的维数比**：在由自然数嵌入实数 $\mathbb{R}$ 后，

   $$
   \frac{\operatorname{finrank}_{\mathbb{R}}(\mathrm{correlationSector}\,m\,n)}{\operatorname{finrank}_{\mathbb{R}}(\mathrm{bipartiteTraceZero}\,m\,n)} = \frac{((m^2 - 1)(n^2 - 1) : \mathbb{N})}{((m^2 n^2 - 1) : \mathbb{N})};
   $$

5. **局域扇区与关联扇区严格正交**：在实内积意义下，

   $$
   \operatorname{IsOrtho}_{\mathbb{R}}\bigl(\mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n,\; \mathrm{correlationSector}\,m\,n\bigr);
   $$

6. **贝尔密度矩阵的纯态性质**：$\mathrm{bellDensity}$ 半正定、$\Tr(\mathrm{bellDensity}) = 1$ 且 $\operatorname{rank}(\mathrm{bellDensity}) = 1$；
7. **经典关联密度矩阵的混合态性质**：$\mathrm{classicalCorrelatedDensity}$ 半正定、$\Tr(\mathrm{classicalCorrelatedDensity}) = 1$，且非幂等

   $$
   \mathrm{classicalCorrelatedDensity} \cdot \mathrm{classicalCorrelatedDensity} \neq \mathrm{classicalCorrelatedDensity};
   $$

8. **双侧局部边缘态完全重合而全局态不同**：

   $$
   \begin{aligned}
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) &= \mathrm{traceEnvironment}(\mathrm{classicalCorrelatedDensity}), \\
   \mathrm{traceFirstFactor}(\mathrm{bellDensity}) &= \mathrm{traceFirstFactor}(\mathrm{classicalCorrelatedDensity}), \\
   \mathrm{bellDensity} &\neq \mathrm{classicalCorrelatedDensity}.
   \end{aligned}
   $$
:::

::: proof
在两因子空间 $\mathrm{HermitianSpace}\,m$ 与 $\mathrm{HermitianSpace}\,n$ 中，标量子空间 $\mathbb{R}\cdot I$ 与无迹子空间 $\mathrm{traceZeroHermitian}$ 构成正交直和，故总张量空间分解为四个两两正交的嵌入张量扇区：标量扇区、局域 $A$ 扇区、局域 $B$ 扇区与关联扇区。去掉一维标量扇区后，其余三个两两正交扇区的上确界恰好等于正交补 $\mathrm{bipartiteTraceZero}\,m\,n$，且局域合成扇区 $\mathrm{localASector} \sqcup \mathrm{localBSector}$ 与 $\mathrm{correlationSector}$ 保持正交（结论 1 与 5）。由正交直和与张量积的实维数公式，$\operatorname{finrank}_{\mathbb{R}}(\mathrm{traceZeroHermitian}\,d) = d^2 - 1$，从而局域两扇区直和维数为 $(m^2 - 1) + (n^2 - 1)$，关联扇区维数为 $(m^2 - 1)(n^2 - 1)$，总无迹空间维数为 $m^2 n^2 - 1$，相除即得维数比公式（结论 2、3、4）。对于双比特具体矩阵，$\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert$ 作为单位向量的秩一自伴外积自然满足半正定、迹一与秩一（结论 6）；对角矩阵 $\mathrm{classicalCorrelatedDensity} = \operatorname{diag}(1/2, 0, 0, 1/2)$ 对角元非负且和为 $1$，但其平方 $\operatorname{diag}(1/4, 0, 0, 1/4) \neq \mathrm{classicalCorrelatedDensity}$（结论 7）。最后直接按偏迹定义对第二个或第一个指标求和，两者的两个约化边缘态均等于 $\frac{1}{2}I_2$，而在右上角元素 $((0,0),(1,1))$ 处 $\mathrm{bellDensity}$ 取 $1/2$、$\mathrm{classicalCorrelatedDensity}$ 取 $0$，故两全局矩阵不等（结论 8）。完整证明由 Lean 内核检查。
:::

把 [@thm-local-correlation-sectors] 代入最基础的双量子比特情形 $m = n = 2$，一幅令人豁然开朗的几何账本立刻呈现在眼前（见图 13 面板 I）：

- Alice 的单比特无迹方向（$\sigma_X \otimes I_2,\, \sigma_Y \otimes I_2,\, \sigma_Z \otimes I_2$）只有 $2^2 - 1 = 3$ 维；
- Bob 的单比特无迹方向（$I_2 \otimes \sigma_X,\, I_2 \otimes \sigma_Y,\, I_2 \otimes \sigma_Z$）也只有 $2^2 - 1 = 3$ 维；
- 两人各自能独立看到的**局域线总维数**不过是 $3 + 3 = 6$ 维；
- 然而整个双比特无迹厄米空间共有 $4^2 - 1 = 15$ 维！剩下的 $(2^2 - 1)(2^2 - 1) = 3 \times 3 = 9$ 个正交维度（占比 $\frac{9}{15} = 60\%$），全部落在由九个双体泡利乘积 $\{\sigma_i \otimes \sigma_j\}_{i,j \in \{X,Y,Z\}}$ 张成的**关联扇区** $\mathrm{correlationSector}\,2\,2$ 之中！

这就是为什么题记中说“一条确定的量子态只能确定一条线，一组量子态才能对应一个面积”。在单颗球上，你只能看到局域方向线 $\vv{r}$ 与 $\vv{s}$（合共 $6$ 个实参数）；而在两颗球之间，还横亘着一张 $3 \times 3 = 9$ 格的关联张量棋盘 $T_{ij} = \Tr\bigl(\rho(\sigma_i \otimes \sigma_j)\bigr)$。

在解读 [@thm-local-correlation-sectors] 时，必须严格守住两条数学边界：

1. **关联扇区包含经典关联，绝不能笼统改称“纠缠子空间”**：算子扇区 $\mathrm{correlationSector}\,m\,n$ 是测量算子空间的正交直和分量，而不是纯纠缠态的集合。事实上，定理结论 7 与 8 中的经典关联混合态 $\mathrm{classicalCorrelatedDensity} = \frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert) = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$ 没有任何量子纠缠，但它的非平凡无迹部分 $\frac{1}{4}\sigma_Z \otimes \sigma_Z$ 同样百分之百落在 $\mathrm{correlationSector}\,2\,2$ 的 $(Z, Z)$ 格子里！
2. **算子张量扇区不是两个局部布洛赫向量的普通外积**：如果两颗比特处于无关联乘积态 $\rho_A \otimes \rho_B$，其关联矩阵退化为秩至多为 $1$ 的普通实向量外积 $T_{ij} = r_i s_j$（完全受限于 $6$ 个局域参数）；唯有一般的双体态才能在 $\mathrm{correlationSector}\,2\,2$ 中独立激发秩大于 $1$ 的多维对角元（如 $\lvert\Phi^+\rangle$ 同时激发 $\sigma_X \otimes \sigma_X$、$-\sigma_Y \otimes \sigma_Y$ 与 $\sigma_Z \otimes \sigma_Z$ 三格）。

::: {.figure src="ch13-two-states"}
**边缘一样，关联格不一样。** 每格是 $\Tr\bigl(\rho(\sigma_p \otimes \sigma_q)\bigr)$，由两个 $4\times 4$ 密度矩阵算出。左边的经典关联态与右边的贝尔态 $\lvert\Phi^+\rangle$，第一行与第一列的六格青色局域格全都空着，两边的边缘态都是 $\frac{1}{2}I_2$；品红的关联格里，经典关联态只占 $(Z, Z)$ 一格，贝尔态占 $(X, X)$、$(Y, Y)$、$(Z, Z)$ 三格，取 $+1$、$-1$、$+1$（[@thm-local-correlation-sectors] 结论 7、8）。
:::
